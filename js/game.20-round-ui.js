const clearTypingAutoNext = () => {
    if (!typingAutoNextTimer) return;
    clearTimeout(typingAutoNextTimer);
    typingAutoNextTimer = null;
};

const waitForMs = (delayMs = 0) => new Promise((resolve) => {
    const ms = Number.isFinite(delayMs) ? delayMs : 0;
    if (ms <= 0) {
        resolve();
        return;
    }
    setTimeout(resolve, ms);
});

const ensureRoundPlaybackReady = async () => {
    const ensureReady = App.audio?.ensureSoundfontReady;
    if (typeof ensureReady !== "function") return true;
    let entry = await ensureReady(state.pianoTone);
    if (entry?.ready) return true;

    const refreshCatalog = App.audio?.refreshSoundfontCatalog;
    if (typeof refreshCatalog === "function") {
        try {
            await refreshCatalog({ loadAllPacks: false });
        } catch (_error) {
            // Ignore here; readiness check below determines whether playback can proceed.
        }
        entry = await ensureReady(state.pianoTone);
    }

    return Boolean(entry?.ready);
};

const getTypedPreviewNoteIds = (parsed) => {
    if (!parsed || !notes.length) return [];
    const maxMidi = notes[notes.length - 1].midi;
    const minMidi = notes[0].midi;
    const maxInterval = Math.max(...parsed.quality.intervals);
    const centerMidi = Math.round((minMidi + maxMidi) / 2);

    const roots = notes.filter((note) =>
        normalizePitchClass(note.midi) === parsed.rootPc &&
        note.midi + maxInterval <= maxMidi
    );
    if (!roots.length) return [];

    let preferredRootMidi = Number.isFinite(parsed.rootMidi) ? parsed.rootMidi : centerMidi;
    if (
        !Number.isFinite(parsed.rootMidi) &&
        state.active &&
        getIsChordRound() &&
        state.targetChord &&
        Number.isFinite(state.targetChord.rootMidi)
    ) {
        preferredRootMidi = state.targetChord.rootMidi;
    }

    roots.sort((a, b) => {
        const distanceDelta = Math.abs(a.midi - preferredRootMidi) - Math.abs(b.midi - preferredRootMidi);
        if (distanceDelta !== 0) return distanceDelta;
        return b.midi - a.midi;
    });
    const root = roots[0];

    return parsed.quality.intervals
        .map((interval) => getNoteIdByMidi(root.midi + interval))
        .filter(Boolean);
};

const updateTypedPreviewFromInput = () => {
    if (!isTypingEnabled()) {
        applySubmissionStatePatch({ typedPreviewNotes: [] }, "submission/typed-preview-disabled");
        return null;
    }
    const raw = chordAnswerInput?.value ?? "";
    const parsed = parseChordInput(raw);
    const nextTypedPreview = (state.typingShowTyped && parsed) ? getTypedPreviewNoteIds(parsed) : [];
    applySubmissionStatePatch({
        typedAnswer: raw,
        typedPreviewNotes: nextTypedPreview
    }, "submission/update-typed-preview");
    return parsed;
};

const updateChordReadout = () => {
    if (!chordReadout) return;
    const keyboardSelection = getEffectiveKeyboardSelection(state.selectedNotes);
    const hasKeyboardSelection = keyboardSelection.length >= 2;
    const hasTypedInput = Boolean(state.typedAnswer?.trim());
    const hideLivePreview = Boolean(state.hideLivePreview) && !state.submitted;
    const canShowContainer = state.active && getIsChordRound() && !hideLivePreview;
    const shouldShow = canShowContainer && (hasKeyboardSelection || (isTypingEnabled() && hasTypedInput));
    chordReadout.hidden = !canShowContainer;
    chordReadout.style.display = canShowContainer ? "" : "none";
    if (!canShowContainer) return;
    chordReadout.classList.toggle("is-ghost", !shouldShow);
    if (!shouldShow) {
        chordReadout.innerHTML = "";
        return;
    }

    if (isTypingOnlyMode()) {
        if (!state.typedAnswer?.trim()) {
            chordReadout.textContent = CHORD_READOUT_COPY.typedNone || "Typed chord: none";
            return;
        }
        const parsed = parseChordInput(state.typedAnswer);
        if (parsed) {
            const typedHtml = renderChordLink(parsed.label);
            chordReadout.innerHTML = CHORD_READOUT_COPY.typedPreview?.(typedHtml)
                ?? `Typed chord: ${typedHtml} (preview)`;
        } else {
            chordReadout.textContent = CHORD_READOUT_COPY.typedUnrecognized || "Typed chord: unrecognized";
        }
        return;
    }

    const selectedDetected = keyboardSelection.length ? detectChordFromNoteIds(keyboardSelection) : null;
    state.selectedChordLabel = selectedDetected?.label ?? "";

    if (state.trainingMode === "both") {
        const parsed = hasTypedInput ? parseChordInput(state.typedAnswer) : null;
        const typedLabel = hasTypedInput ? (parsed?.label ?? "unrecognized") : "";
        if (state.selectedChordLabel && typedLabel) {
            const selectedHtml = renderChordLink(state.selectedChordLabel);
            const typedHtml = renderChordLink(typedLabel);
            chordReadout.innerHTML = CHORD_READOUT_COPY.selectedAndTyped?.(selectedHtml, typedHtml)
                ?? `Selected chord: ${selectedHtml} | Typed chord: ${typedHtml}`;
            return;
        }
        if (typedLabel) {
            const typedHtml = renderChordLink(typedLabel);
            chordReadout.innerHTML = CHORD_READOUT_COPY.typed?.(typedHtml) ?? `Typed chord: ${typedHtml}`;
            return;
        }
        if (state.selectedChordLabel) {
            const selectedHtml = renderChordLink(state.selectedChordLabel);
            chordReadout.innerHTML = CHORD_READOUT_COPY.selected?.(selectedHtml) ?? `Selected chord: ${selectedHtml}`;
            return;
        }
        chordReadout.textContent = keyboardSelection.length
            ? (CHORD_READOUT_COPY.selectedUnknown || "Selected chord: unknown")
            : (CHORD_READOUT_COPY.selectedNone || "Selected chord: none");
        return;
    }

    if (!keyboardSelection.length) {
        chordReadout.textContent = CHORD_READOUT_COPY.selectedNone || "Selected chord: none";
        return;
    }
    if (state.selectedChordLabel) {
        const selectedHtml = renderChordLink(state.selectedChordLabel);
        chordReadout.innerHTML = CHORD_READOUT_COPY.selected?.(selectedHtml) ?? `Selected chord: ${selectedHtml}`;
        return;
    }
    chordReadout.textContent = CHORD_READOUT_COPY.selectedUnknown || "Selected chord: unknown";
};

const updateModeVisibility = () => {
    const typingVisible = state.active && !state.submitted && getIsChordRound() && isTypingEnabled();
    if (typingZone) {
        typingZone.hidden = !typingVisible;
        typingZone.style.display = typingVisible ? "" : "none";
    }
    if (statusPanel) {
        statusPanel.hidden = !state.active;
        statusPanel.style.display = state.active ? "" : "none";
    }
    if (chordReadout) {
        chordReadout.style.display = chordReadout.hidden ? "none" : "";
    }
    const keyboardZone = getKeyboardZoneEl();
    if (keyboardZone) {
        keyboardZone.hidden = state.active && isTypingOnlyMode() && !state.typingShowPiano;
    }
};

const updatePrimaryAction = () => {
    const label = isTypingOnlyMode()
        ? (state.active && !state.submitted ? "Check Chord (Enter)" : "New Round (Enter)")
        : (state.active && !state.submitted ? "Submit (Enter)" : "New Round (Enter)");
    primaryActionButton.textContent = label;
};

const updateReplayAvailability = () => {
    const allowReplay = state.active && (!getEffectiveBlindMode() || state.submitted);
    playSelectedButton.hidden = !allowReplay;
    playSelectedButton.textContent = isTypingOnlyMode()
        ? "Replay Chord (Space)"
        : "Play Selected (Space)";
    return allowReplay;
};

const getChordHelperHints = () => {
    if (!state.targetChord || !state.chordExtraHelpers) return [];
    const hints = [];
    hints.push({
        label: HELPER_LABELS.rootNote,
        value: state.targetChord.rootName
    });
    hints.push(
        { label: HELPER_LABELS.chordSize, value: `${state.targetChord.noteCount} notes` },
        { label: HELPER_LABELS.chordType, value: state.targetChord.qualityHint },
        { label: HELPER_LABELS.voicing, value: getVoicingHintLabel(state.targetChord.voicing) }
    );
    if (Number.isFinite(state.targetChord.intervalSpan)) {
        hints.push({ label: HELPER_LABELS.pitchSpan, value: `${state.targetChord.intervalSpan} semitones` });
    }
    return hints;
};

const HELPER_MASK_LENGTHS = {
    [HELPER_LABELS.rootNote]: 10,
    [HELPER_LABELS.chordSize]: 12,
    [HELPER_LABELS.chordType]: 12,
    [HELPER_LABELS.voicing]: 13,
    [HELPER_LABELS.pitchSpan]: 14
};

const HELPER_MASK_PROFILES = {
    [HELPER_LABELS.rootNote]: { length: 5, spacesAt: [] },
    [HELPER_LABELS.chordSize]: { length: 11, spacesAt: [5] },
    [HELPER_LABELS.chordType]: { length: 13, spacesAt: [6] },
    [HELPER_LABELS.voicing]: { length: 14, spacesAt: [5, 10] },
    [HELPER_LABELS.pitchSpan]: { length: 16, spacesAt: [7] }
};

const createDeterministicHelperMask = (label) => {
    const profile = HELPER_MASK_PROFILES[label] ?? null;
    const baseLength = profile?.length ?? HELPER_MASK_LENGTHS[label] ?? 12;
    const spacesAt = new Set((profile?.spacesAt ?? []).filter((value) => value > 0 && value < baseLength));
    const rootPc = Number.isFinite(state.targetChord?.rootPc) ? state.targetChord.rootPc : 0;
    const span = Number.isFinite(state.targetChord?.intervalSpan) ? state.targetChord.intervalSpan : 0;
    const seedSource = `${label}|${state.round}|${rootPc}|${span}|${state.targetChord?.qualityHint ?? ""}`;

    let seed = 2166136261;
    for (let i = 0; i < seedSource.length; i += 1) {
        seed ^= seedSource.charCodeAt(i);
        seed = Math.imul(seed, 16777619);
    }

    const chars = "abcdefghijklmnopqrstuvwxyz";
    let out = "";
    for (let i = 0; i < baseLength; i += 1) {
        if (spacesAt.has(i)) {
            out += " ";
            continue;
        }
        seed ^= seed << 13;
        seed ^= seed >>> 17;
        seed ^= seed << 5;
        const idx = Math.abs(seed) % chars.length;
        out += chars[idx];
    }
    return out;
};

const renderChordHelperBox = () => {
    const hints = getChordHelperHints();
    if (!hints.length) return "";
    const helperHint = HELPER_COPY.revealHint || "Hover or focus to reveal";
    const rows = hints.map((hint) => {
        const isRoot = hint.label === HELPER_LABELS.rootNote;
        const label = escapeHtml(hint.label);
        const pinned = isHelperPinnedLabel(hint.label);
        const pinnedGlobal = isHelperPinnedGlobalLabel(hint.label);
        const pinnedLocal = !pinnedGlobal && isHelperPinnedLocalLabel(hint.label);
        return `
        <div class="helper-item${pinnedGlobal ? " pinned" : ""}${pinnedLocal ? " latched" : ""}" tabindex="0" role="button"
            data-helper-label="${label}"${isRoot ? " data-helper-root=\"true\"" : ""} aria-pressed="${pinned}">
            <div class="helper-label">${label}</div>
            <div class="helper-value">
                <span class="helper-mask" aria-hidden="true">${createDeterministicHelperMask(hint.label)}</span>
                <span class="helper-real">${escapeHtml(hint.value)}</span>
            </div>
        </div>
    `;
    }).join("");
    return `
        <div class="helper-card">
            <div class="helper-head">
                <div class="helper-title">${escapeHtml(HELPER_COPY.title || "Chord helper")}</div>
                <div class="helper-meta">${escapeHtml(helperHint)}</div>
            </div>
            <div class="helper-list">${rows}</div>
        </div>
    `;
};

const updateStatus = () => {
    const chordRound = getIsChordRound();
    if (!chordRound || !state.chordRootHint) {
        state.rootHintSuppressed = false;
    }
    const hideLivePreview = Boolean(state.hideLivePreview) && !state.submitted;
    goalCountEl.textContent = chordRound ? "1" : String(state.noteCount);
    if (goalLabelEl) {
        goalLabelEl.textContent = chordRound ? "chord" : "notes";
    }

    if (isTypingOnlyMode()) {
        modeLabelEl.textContent = MODE_COPY.typingOnly || "Type Chord";
    } else if (state.trainingMode === "both" && chordRound) {
        modeLabelEl.textContent = MODE_COPY.chordBoth || "Chord + Both";
    } else if (chordRound && getEffectiveBlindMode()) {
        modeLabelEl.textContent = MODE_COPY.chordBlind || "Chord + Blind";
    } else if (chordRound) {
        modeLabelEl.textContent = MODE_COPY.chord || "Chord";
    } else {
        modeLabelEl.textContent = getEffectiveBlindMode()
            ? (MODE_COPY.blind || "Blind")
            : (MODE_COPY.normal || "Normal");
    }

    updateModeVisibility();
    document.body.classList.toggle("landing", !state.active);
    if (pedalTip) {
        pedalTip.hidden = state.active;
    }
    if (state.active && pedalState.active) {
        pedalState.active = false;
        pedalState.keysDown.clear();
        pedalState.pending.clear();
        pedalIcon.classList.remove("active");
    }

    if (!state.active) {
        // Landing page is always free-play regardless of saved chord answer mode.
        setKeyboardEnabled(true);
        roundCountEl.textContent = "Not started";
        selectedListEl.textContent = "None";
        resultEl.textContent = isTypingOnlyMode()
            ? (PROMPT_COPY.landingTyping || "Press New Round to hear a chord, then type your answer.")
            : (state.trainingMode === "both" && chordRound)
                ? (PROMPT_COPY.landingBoth || "Press New Round to hear a chord, then play it, type it, or both.")
            : (PROMPT_COPY.landingDefault || "Press New Round to begin.");
        revealEl.textContent = "";
        if (helperSlotEl) {
            helperSlotEl.innerHTML = "";
            helperSlotEl.hidden = true;
        }
        hintFlag.hidden = true;
        hintButton.hidden = true;
        updateReplayAvailability();
        updateChordReadout();
        updatePrimaryAction();
        return;
    }

    roundCountEl.textContent = String(state.round);
    const keyboardSelection = getEffectiveKeyboardSelection(state.selectedNotes);
    const typedSubmissionFinal = state.submitted && chordRound && state.submissionSource === "typing";
    if (hideLivePreview) {
        selectedListEl.textContent = "Hidden";
    } else if (typedSubmissionFinal) {
        const parsed = parseChordInput(state.typedAnswer);
        if (parsed?.label) {
            selectedListEl.innerHTML = `${renderChordLink(parsed.label)} <span class="chord-label-suffix">(typed)</span>`;
        } else {
            selectedListEl.textContent = "Typed answer";
        }
    } else if (isTypingOnlyMode()) {
        const parsed = parseChordInput(state.typedAnswer);
        if (parsed?.label) {
            selectedListEl.innerHTML = renderChordLink(parsed.label);
        } else {
            selectedListEl.textContent = state.typedAnswer?.trim() || "None";
        }
    } else if (state.trainingMode === "both" && chordRound) {
        const selectedChord = detectChordFromNoteIds(keyboardSelection);
        state.selectedChordLabel = selectedChord?.label ?? "";
        const parsed = state.typedAnswer?.trim() ? parseChordInput(state.typedAnswer) : null;
        const typedLabel = state.typedAnswer?.trim() ? (parsed?.label || state.typedAnswer.trim()) : "";
        if (state.selectedChordLabel && typedLabel) {
            const selectedHtml = renderChordLink(state.selectedChordLabel);
            const typedHtml = renderChordLink(typedLabel);
            selectedListEl.innerHTML = `${selectedHtml} <span class="chord-divider">|</span> ${typedHtml} <span class="chord-label-suffix">(typed)</span>`;
        } else if (typedLabel) {
            const typedHtml = renderChordLink(typedLabel);
            selectedListEl.innerHTML = `${typedHtml} <span class="chord-label-suffix">(typed)</span>`;
        } else if (state.selectedChordLabel) {
            selectedListEl.innerHTML = renderChordLink(state.selectedChordLabel);
        } else {
            selectedListEl.textContent = keyboardSelection.length ? keyboardSelection.join(", ") : "None";
        }
    } else if (chordRound) {
        const selectedChord = detectChordFromNoteIds(keyboardSelection);
        state.selectedChordLabel = selectedChord?.label ?? "";
        if (state.selectedChordLabel) {
            selectedListEl.innerHTML = renderChordLink(state.selectedChordLabel);
        } else {
            selectedListEl.textContent = keyboardSelection.length ? keyboardSelection.join(", ") : "None";
        }
    } else {
        selectedListEl.textContent = state.selectedNotes.length ? state.selectedNotes.join(", ") : "None";
    }
    hintButton.hidden = state.submitted;
    hintFlag.hidden = !(state.submitted && state.hintUsed);
    updateReplayAvailability();

    const shouldShowHelpers = !state.submitted
        && getIsChordRound()
        && Boolean(state.chordExtraHelpers)
        && Boolean(state.targetChord);
    if (helperSlotEl) {
        helperSlotEl.hidden = !shouldShowHelpers;
        helperSlotEl.innerHTML = shouldShowHelpers ? renderChordHelperBox() : "";
    }
    if (!state.submitted) {
        revealEl.textContent = "";
    }
    updateChordReadout();
    updatePrimaryAction();
};

const updateKeyStates = () => {
    const evaluationNotes = state.submitted
        ? (state.submittedComparisonNotes?.length ? state.submittedComparisonNotes : state.selectedNotes)
        : getEffectiveKeyboardSelection(state.selectedNotes);
    const selectedSet = new Set(evaluationNotes);
    const liveSelectedSet = new Set(
        state.submitted ? state.selectedNotes : getEffectiveKeyboardSelection(state.selectedNotes)
    );
    const targetSet = new Set(state.targetNotes);
    const rootGuideNoteId = getRootGuideNoteId();
    let typingRootMissing = false;
    if (!state.submitted && rootGuideNoteId && isTypingEnabled() && state.typedAnswer?.trim()) {
        const parsed = parseChordInput(state.typedAnswer);
        if (parsed) {
            const typedNoteIds = getTypedPreviewNoteIds(parsed);
            typingRootMissing = !typedNoteIds.includes(rootGuideNoteId);
        }
    }
    const typedPreviewSet = new Set(
        isTypingEnabled() && state.typingShowTyped ? state.typedPreviewNotes : []
    );

    keyMap.forEach((key, id) => {
        key.classList.remove("selected", "correct", "wrong", "missed", "typed-preview");

        if (!state.active) {
            key.setAttribute("aria-pressed", "false");
            if (typedPreviewSet.has(id) && isTypingEnabled()) {
                key.classList.add("typed-preview");
            }
            return;
        }

        if (state.submitted) {
            if (targetSet.has(id) && selectedSet.has(id)) {
                key.classList.add("correct");
            } else if (!targetSet.has(id) && selectedSet.has(id)) {
                key.classList.add("wrong");
            } else if (targetSet.has(id) && !selectedSet.has(id)) {
                key.classList.add("missed");
            }
        } else {
            if (selectedSet.has(id)) {
                key.classList.add("selected");
            }
            if (rootGuideNoteId && id === rootGuideNoteId) {
                if (state.rootHintSuppressed || typingRootMissing) {
                    key.classList.remove("selected");
                    key.classList.add("missed");
                } else {
                    key.classList.remove("selected");
                    key.classList.add("correct");
                }
            }
        }

        if (typedPreviewSet.has(id)) {
            key.classList.add("typed-preview");
        }
        key.setAttribute("aria-pressed", liveSelectedSet.has(id) ? "true" : "false");
    });
};

const setKeyboardEnabled = (enabled) => {
    const effectiveEnabled = !(isTypingOnlyMode() && state.active) && enabled;
    keyboardEl.classList.toggle("disabled", !effectiveEnabled);
};

const updateKeyboardScale = () => {
    const root = document.documentElement;
    const rootStyles = getComputedStyle(root);
    const zone = keyboardEl.closest(".keyboard-zone");
    const zoneWidth = zone?.clientWidth || 1;
    const stack = keyboardEl.closest(".keyboard-stack");
    const stackWidth = stack?.scrollWidth || stack?.getBoundingClientRect().width || 1;
    const padding = getCssNumber(rootStyles.getPropertyValue("--layout-extra")) || 0;
    const totalWidth = Math.max(1, stackWidth + padding);
    const scale = Math.min(1, zoneWidth / totalWidth);
    root.style.setProperty("--stack-scale", scale.toFixed(3));
};

const lockKeyboardForPlayback = (noteIds, mode) => {
    if (isTypingOnlyMode()) return;
    if (!noteIds.length) return;
    if (keyboardUnlockTimer) {
        clearTimeout(keyboardUnlockTimer);
        keyboardUnlockTimer = null;
    }
    setKeyboardEnabled(false);
    const duration = getPlaybackSpan(noteIds, mode) + (getIsChordRound() ? 0.5 : 0);
    keyboardUnlockTimer = setTimeout(() => {
        setKeyboardEnabled(true);
        keyboardUnlockTimer = null;
    }, duration * 1000);
};

