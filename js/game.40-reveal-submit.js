const renderNotePills = (label, notes, toneClass) => {
    if (!notes.length) return "";
    const pills = notes
        .map((note) => `<span class="note-pill ${toneClass}">${escapeHtml(note)}</span>`)
        .join("");
    return `<div class="reveal-label">${escapeHtml(label)}</div><div class="note-pills">${pills}</div>`;
};

const renderChordPill = (label, chordLabel, toneClass, className = "") => {
    if (!chordLabel) return "";
    const chordMarkup = renderChordLink(chordLabel, { className: `note-pill ${toneClass} chord-pill` });
    return renderRevealCell(label, chordMarkup, className);
};

const renderTonePills = (items, toneClassOrResolver = "good") => {
    if (!items.length) return "";
    return items.map((item) => {
        const toneClass = typeof toneClassOrResolver === "function"
            ? toneClassOrResolver(item)
            : toneClassOrResolver;
        return `<span class="note-pill ${toneClass}">${escapeHtml(item)}</span>`;
    }).join("");
};

const renderRevealCell = (label, pillsHtml, className = "") => {
    if (!pillsHtml) return "";
    const classes = ["reveal-cell"];
    if (className) classes.push(className);
    return `<div class="${classes.join(" ")}"><div class="reveal-label">${escapeHtml(label)}</div><div class="note-pills">${pillsHtml}</div></div>`;
};

const renderChordRevealGrid = (entries) => {
    const cells = entries.filter(Boolean).join("");
    return `<div class="reveal-grid compact">${cells}</div>`;
};

const renderChordDetectionMeta = (label, noteIds, toneClass = "good") => {
    const detected = detectChordFromNoteIds(noteIds);
    if (!detected) return "";
    return renderChordPill(label, detected.label, toneClass);
};

const renderPressedPills = () => {
    if (!state.selectedNotes.length) return "";
    const targetSet = new Set(state.targetNotes);
    const pills = renderTonePills(state.selectedNotes, (note) => (targetSet.has(note) ? "good" : "bad"));
    return `<div>${REVEAL_COPY.yourNotes || "Your notes"}</div><div class="note-pills">${pills}</div>`;
};

const pulseFeedback = (elements, className = "pulse-once") => {
    if (document.body?.dataset?.reducedMotion === "true") return;
    const list = Array.isArray(elements) ? elements : [elements];
    list.forEach((el) => {
        if (!el) return;
        el.classList.remove(className);
        void el.offsetWidth;
        el.classList.add(className);
    });
};

const buildNoteComparison = (targetNotes, answerNotes) => {
    const targetSet = new Set(targetNotes);
    const answerSet = new Set(answerNotes);
    const correct = answerNotes.filter((note) => targetSet.has(note));
    const wrong = answerNotes.filter((note) => !targetSet.has(note));
    const missed = targetNotes.filter((note) => !answerSet.has(note));
    return { correct, wrong, missed };
};

const buildAnswerNoteCell = (answerNotes, targetNotes, { emptyTone = "bad", className = "" } = {}) => {
    const targetSet = new Set(targetNotes);
    return renderRevealCell(
        REVEAL_COPY.yourNotes || "Your notes",
        answerNotes.length
            ? renderTonePills(answerNotes, (note) => (targetSet.has(note) ? "good" : "bad"))
            : `<span class="note-pill ${emptyTone}">None</span>`,
        className
    );
};

const buildTargetNoteCell = (targetNotes, answerNotes, className = "") => {
    if (!targetNotes.length) return "";
    const answerSet = new Set(answerNotes);
    return renderRevealCell(
        REVEAL_COPY.targetNotes || "Target notes",
        targetNotes.map((note) => {
            const isMissed = !answerSet.has(note);
            const toneClass = isMissed ? "missed" : "good";
            const label = isMissed ? `${note} (missed)` : note;
            return `<span class="note-pill ${toneClass}">${escapeHtml(label)}</span>`;
        }).join(""),
        className
    );
};

const buildChordRevealEntries = ({
    targetChordLabel = "",
    targetNotes = [],
    answerChordLabel = "",
    answerChordTone = "bad",
    answerNotes = [],
    includeAnswerNotes = true
} = {}) => {
    const entries = [];
    if (targetChordLabel) {
        entries.push(renderChordPill(REVEAL_COPY.targetChord || "Target chord", targetChordLabel, "good", "reveal-target-chord"));
    }
    entries.push(buildTargetNoteCell(targetNotes, answerNotes, "reveal-target-notes"));
    if (answerChordLabel) {
        entries.push(renderChordPill(REVEAL_COPY.yourChord || "Your chord", answerChordLabel, answerChordTone, "reveal-your-chord"));
    }
    if (includeAnswerNotes) {
        entries.push(buildAnswerNoteCell(answerNotes, targetNotes, { className: "reveal-your-notes" }));
    }
    return entries;
};

const getSubmittedReplaySnapshot = () => {
    const snapshot = lastReveal ?? {
        target: [...state.targetNotes],
        selected: [...(state.submittedComparisonNotes?.length ? state.submittedComparisonNotes : state.selectedNotes)]
    };
    const targetNotes = snapshot.target ?? [];
    const answerNotes = snapshot.selected ?? [];
    const comparison = buildNoteComparison(targetNotes, answerNotes);
    const isCorrect = comparison.wrong.length === 0 && comparison.missed.length === 0;
    return {
        target: [...targetNotes],
        selected: isCorrect ? [] : [...answerNotes],
        isCorrect
    };
};

const playSubmittedReplaySequence = (delay = 0) => {
    const snapshot = getSubmittedReplaySnapshot();
    if (!snapshot.target.length) {
        resultEl.textContent = ACTION_COPY.noReplayNotes || "No notes available to replay.";
        return;
    }
    abortPlayback();
    playRevealSequence({
        delay,
        snapshot,
        isCorrect: snapshot.isCorrect,
        alwaysPlaySelected: snapshot.selected.length > 0
    });
};

const playRevealSequence = (options = {}) => {
    if (!state.active || !state.targetNotes.length) {
        return;
    }
    revealTimers.forEach((timer) => clearTimeout(timer));
    revealTimers.length = 0;
    revealSequenceId += 1;
    const seqId = revealSequenceId;
    revealPlaying = true;
    const snapshot = options.snapshot ?? lastReveal ?? {
        target: [...state.targetNotes],
        selected: [...state.selectedNotes]
    };
    const targetNotes = snapshot.target ?? [];
    const selectedNotes = snapshot.selected ?? [];
    const isCorrect = options.isCorrect ?? (
        targetNotes.length === selectedNotes.length &&
        targetNotes.every((noteId) => selectedNotes.includes(noteId))
    );
    const revealDelayMs = (options.delay ?? 0.55) * 1000;
    const targetSpanMs = getPlaybackSpan(targetNotes, state.mode) * 1000;
    const playSelectedAfterTarget = Boolean(options.alwaysPlaySelected) || !isCorrect;
    const selectedSpanMs = (playSelectedAfterTarget ? getPlaybackSpan(selectedNotes, state.mode) : 0) * 1000;

    const playTargetTimer = setTimeout(() => {
        if (seqId !== revealSequenceId) return;
        playConsistentPreview(targetNotes, state.mode, {
            animate: true,
            animationDelay: 0
        });
    }, revealDelayMs);
    revealTimers.push(playTargetTimer);

    if (playSelectedAfterTarget && selectedNotes.length) {
        const playSelectedTimer = setTimeout(() => {
            if (seqId !== revealSequenceId) return;
            playConsistentPreview(selectedNotes, state.mode, {
                animate: true,
                animationDelay: 0
            });
        }, revealDelayMs + targetSpanMs);
        revealTimers.push(playSelectedTimer);
    }

    const doneTimer = setTimeout(() => {
        if (seqId !== revealSequenceId) return;
        revealPlaying = false;
        revealTimer = null;
    }, revealDelayMs + targetSpanMs + selectedSpanMs);
    revealTimers.push(doneTimer);
};

const playSelectedChord = () => {
    if (!state.active) {
        updateStatus();
        return;
    }
    if (isTypingOnlyMode()) {
        if (!playTypedInputChord()) {
            resultEl.textContent = ACTION_COPY.typeValidChordFirst || "Type a valid chord first.";
        }
        return;
    }
    if (state.submitted) {
        playSubmittedReplaySequence(0);
        return;
    }
    const keyboardSelection = getEffectiveKeyboardSelection(state.selectedNotes);
    if (!keyboardSelection.length) {
        resultEl.textContent = ACTION_COPY.selectNotesFirst || "Select some notes first.";
        return;
    }
    playConsistentPreview(keyboardSelection, state.mode, {
        animate: true,
        animationDelay: 0
    });
};

const playTypedInputChord = () => {
    if (!state.active || state.submitted || !isTypingEnabled()) return false;
    if (getEffectiveBlindMode()) return false;
    const parsed = updateTypedPreviewFromInput();
    if (!parsed) return false;
    const noteIds = getTypedPreviewNoteIds(parsed);
    if (!noteIds.length) return false;
    playConsistentPreview(noteIds, "simultaneous", {
        animate: true,
        animationDelay: 0
    });
    resultEl.textContent = ACTION_COPY.previewChord?.(parsed.label) ?? `Preview: ${parsed.label}`;
    return true;
};

const startHeldPlayback = () => {
    if (!state.active) return;
    if (getEffectiveBlindMode() && !state.submitted) return;
    if (state.submitted) {
        playSubmittedReplaySequence(0);
        return;
    }
    const replay = getReplayNoteIds();
    if (!replay?.noteIds?.length) {
        resultEl.textContent = isTypingEnabled()
            ? (ACTION_COPY.typeValidChordFirst || "Type a valid chord first.")
            : (ACTION_COPY.selectNotesFirst || "Select some notes first.");
        return;
    }
    const session = beginInteractivePressSession({
        noteIds: replay.noteIds,
        mode: replay.mode,
        behavior: PRESS_BEHAVIOR.MIN_LENGTH_OR_HELD
    });
    if (!session) return;
    holdState.active = true;
    holdState.holding = session.holding;
    holdState.pressAt = session.pressAt;
    holdState.noteIds = session.noteIds;
    holdState.stopAt = session.stopAt;
    holdState.holdTimer = session.holdTimer;
};

const releaseHeldPlayback = () => {
    if (!holdState.active) return;
    releaseInteractivePressSession({
        noteIds: [...holdState.noteIds],
        pressAt: holdState.pressAt,
        stopAt: holdState.stopAt,
        playSound: true,
        behavior: PRESS_BEHAVIOR.MIN_LENGTH_OR_HELD,
        holdTimer: holdState.holdTimer
    });
    holdState.active = false;
    holdState.holding = false;
    holdState.holdTimer = null;
    holdState.noteIds = [];
};

const normalizePitchClassLocal = (value) => ((Math.round(value) % 12) + 12) % 12;
const getPitchClassLabel = (pc) => App.chords?.rootNames?.[normalizePitchClassLocal(pc)] ?? "C";
const getBassPcFromNoteIds = (noteIds) => {
    if (!Array.isArray(noteIds) || !noteIds.length) return null;
    const lowestMidi = noteIds
        .map((noteId) => getMidiFromNoteId(noteId))
        .filter(Number.isFinite)
        .sort((a, b) => a - b)[0];
    return Number.isFinite(lowestMidi) ? normalizePitchClassLocal(lowestMidi) : null;
};

const buildTypingRevealDetail = (parsed) => {
    if (!state.targetChord) return "";
    if (!parsed) {
        return `<div class="reveal-label">${escapeHtml("Your answer could not be parsed.")}</div>`;
    }
    const targetLabel = state.targetChord.label || `${state.targetChord.rootName}${state.targetChord.quality?.suffix || ""}`;
    const targetLink = renderChordLink(targetLabel);
    const mismatches = [];
    if (parsed.rootPc !== state.targetChord.rootPc) {
        mismatches.push(`root should be ${escapeHtml(state.targetChord.rootName)}`);
    }
    if (parsed.quality.id !== state.targetChord.quality.id) {
        mismatches.push(`quality should be ${escapeHtml(getChordQualityDisplaySuffix(state.targetChord.quality))}`);
    }
    if (Number.isFinite(parsed.bassPc)) {
        const targetBassPc = getBassPcFromNoteIds(state.targetNotes);
        if (Number.isFinite(targetBassPc) && parsed.bassPc !== targetBassPc) {
            mismatches.push(`bass should be ${escapeHtml(getPitchClassLabel(targetBassPc))}`);
        }
    }
    if (Number.isFinite(parsed.rootMidi) && Number.isFinite(state.targetChord.rootMidi) && parsed.rootMidi !== state.targetChord.rootMidi) {
        const expectedOctave = Math.floor(state.targetChord.rootMidi / 12) - 1;
        mismatches.push(`root octave should be ${escapeHtml(`${state.targetChord.rootName}${expectedOctave}`)}`);
    }
    if (!mismatches.length) return "";
    return `<div class="reveal-label">${escapeHtml(REVEAL_COPY.differencePrefix || "Difference")}: ${targetLink}. ${mismatches.join(", ")}.</div>`;
};

const submitTypedAnswer = () => {
    if (!ensureRound()) {
        return;
    }
    abortPlayback();
    clearTypingAutoNext();
    const parsed = updateTypedPreviewFromInput();
    const target = state.targetChord;
    if (!target) {
        resultEl.textContent = ACTION_COPY.noTargetChord || "No target chord available. Start a new round.";
        return;
    }
    const targetDisplayLabel = getChordDisplayLabel(target.label, target.quality?.id);
    const answerNotes = parsed ? getTypedPreviewNoteIds(parsed) : [];
    const octaveValid = !parsed
        || !Number.isFinite(parsed.rootMidi)
        || !Number.isFinite(target.rootMidi)
        || parsed.rootMidi === target.rootMidi;
    const targetBassPc = getBassPcFromNoteIds(state.targetNotes);
    const bassValid = !parsed
        || !Number.isFinite(parsed.bassPc)
        || (Number.isFinite(targetBassPc) && parsed.bassPc === targetBassPc);

    const isCorrect = Boolean(
        parsed &&
        parsed.rootPc === target.rootPc &&
        parsed.quality.id === target.quality.id &&
        octaveValid &&
        bassValid
    );
    applySubmissionStatePatch({
        submissionSource: "typing",
        submittedComparisonNotes: isCorrect ? [...state.targetNotes] : [...answerNotes]
    }, "submission/typed-answer");
    setSubmitted(true);
    if (isCorrect) {
        resultEl.textContent = ACTION_COPY.correctChord?.(targetDisplayLabel) ?? `Correct: ${targetDisplayLabel}`;
        const answerLabel = parsed?.displayLabel ?? parsed?.label ?? "";
        revealEl.innerHTML = renderChordRevealGrid(buildChordRevealEntries({
            targetChordLabel: target.label,
            targetNotes: state.targetNotes,
            answerChordLabel: answerNotes.length ? answerLabel : "",
            answerChordTone: "good",
            answerNotes: answerNotes.length ? answerNotes : state.targetNotes,
            includeAnswerNotes: false
        }));
        pulseFeedback([resultEl, revealEl]);
        lastReveal = {
            target: [...state.targetNotes],
            selected: []
        };
        playRevealSequence({ snapshot: lastReveal, isCorrect: true, alwaysPlaySelected: false });
        updateStatus();
        updateKeyStates();
        typingAutoNextTimer = setTimeout(() => {
            typingAutoNextTimer = null;
            if (isTypingOnlyMode()) {
                void startRound(true);
            }
        }, TYPE_SUCCESS_FLASH_MS);
        return;
    }

    const answerLabel = parsed?.displayLabel || parsed?.label || (state.typedAnswer?.trim() || "No answer");
    const detail = buildTypingRevealDetail(parsed);
    revealEl.innerHTML = `${renderChordRevealGrid(buildChordRevealEntries({
        targetChordLabel: target.label,
        targetNotes: state.targetNotes,
        answerChordLabel: answerLabel,
        answerChordTone: "bad",
        answerNotes,
        includeAnswerNotes: false
    }))}${detail}`;
    resultEl.textContent = FEEDBACK_COPY.wrongChordName || "Not quite. Compare the chord name and quality.";
    pulseFeedback([resultEl, revealEl]);
    lastReveal = {
        target: [...state.targetNotes],
        selected: [...answerNotes]
    };
    playRevealSequence({ snapshot: lastReveal, isCorrect: false, alwaysPlaySelected: true });
    updateStatus();
    updateKeyStates();
};

const submitAnswer = () => {
    if (isTypingOnlyMode()) {
        submitTypedAnswer();
        return;
    }
    if (state.trainingMode === "both") {
        const hasTyped = Boolean(state.typedAnswer?.trim());
        const typingFocused = document.activeElement === chordAnswerInput;
        if (hasTyped && (typingFocused || !state.selectedNotes.length)) {
            submitTypedAnswer();
            return;
        }
    }
    if (!ensureRound()) {
        return;
    }
    abortPlayback();
    const keyboardSelection = getEffectiveKeyboardSelection(state.selectedNotes);
    applySubmissionStatePatch({
        submissionSource: "keyboard",
        submittedComparisonNotes: [...keyboardSelection]
    }, "submission/keyboard-answer");
    setSubmitted(true);
    const isCorrect = isSelectionCorrect(keyboardSelection);

    if (getIsChordRound()) {
        const selectedChord = detectChordFromNoteIds(keyboardSelection);
        const targetLabel = state.targetChord?.label ?? "Unknown";
        const selectedLabel = selectedChord?.label ?? "Unknown";
        resultEl.textContent = isCorrect
            ? (FEEDBACK_COPY.correctChord || "Correct chord. Great ear.")
            : (FEEDBACK_COPY.wrongChordQuality || "Not quite. Compare the chord quality.");
        revealEl.innerHTML = renderChordRevealGrid(buildChordRevealEntries({
            targetChordLabel: targetLabel,
            targetNotes: state.targetNotes,
            answerChordLabel: selectedLabel,
            answerChordTone: isCorrect ? "good" : "bad",
            answerNotes: keyboardSelection,
            includeAnswerNotes: true
        }));
    } else {
        resultEl.textContent = isCorrect
            ? (FEEDBACK_COPY.correctNotes || "Correct. Great ear.")
            : (FEEDBACK_COPY.wrongNotes || "Not quite. Listen closely.");
        const targetHtml = renderNotePills(REVEAL_COPY.targetNotes || "Target notes", state.targetNotes, "good");
        const pressedHtml = renderPressedPills();
        const targetChordMeta = renderChordDetectionMeta("Detected target chord", state.targetNotes, "good");
        const selectedChordMeta = renderChordDetectionMeta("Detected your chord", keyboardSelection, isCorrect ? "good" : "bad");
        revealEl.innerHTML = `${targetHtml}${pressedHtml}${targetChordMeta}${selectedChordMeta}`;
    }
    pulseFeedback([resultEl, revealEl]);

    lastReveal = {
        target: [...state.targetNotes],
        selected: [...keyboardSelection]
    };
    playRevealSequence({
        snapshot: lastReveal,
        isCorrect,
        alwaysPlaySelected: getIsChordRound()
    });
    updateKeyStates();
    updatePrimaryAction();
    updateStatus();
};

const sanitizeRoundStateForKeyboardRange = () => {
    state.selectedNotes = sanitizeKnownNoteIds(state.selectedNotes);
    state.targetNotes = sanitizeKnownNoteIds(state.targetNotes);
    state.typedPreviewNotes = sanitizeKnownNoteIds(state.typedPreviewNotes);
    state.submittedComparisonNotes = sanitizeKnownNoteIds(state.submittedComparisonNotes);

    if (state.targetChord) {
        const chordNoteIds = sanitizeKnownNoteIds(state.targetChord.noteIds);
        const hasRootPitchClass = chordNoteIds.some((noteId) => {
            const midi = getMidiFromNoteId(noteId);
            return Number.isFinite(midi) && normalizePitchClass(midi) === state.targetChord.rootPc;
        });
        if (!chordNoteIds.length || !hasRootPitchClass) {
            state.targetChord = null;
            state.targetNotes = [];
        } else {
            state.targetChord = {
                ...state.targetChord,
                noteIds: chordNoteIds,
                noteCount: chordNoteIds.length
            };
            state.targetNotes = [...chordNoteIds];
        }
    }

    if (lastReveal) {
        lastReveal = {
            target: sanitizeKnownNoteIds(lastReveal.target),
            selected: sanitizeKnownNoteIds(lastReveal.selected)
        };
    }

    if (state.active && !state.submitted && !state.targetNotes.length) {
        createTarget();
    }
    if (!state.active || !state.chordRootHint || !getIsChordRound()) {
        state.rootHintSuppressed = false;
    }
    updateStatus();
    updateKeyStates();
};

Object.assign(App.game, {
    createTarget,
    startRound,
    goHome,
    getConsistentPreviewDuration,
    playConsistentPreview,
    playTarget,
    playSelectedChord,
    playTypedInputChord,
    startManualNote,
    releaseManualNote,
    startHeldPlayback,
    releaseHeldPlayback,
    submitTypedAnswer,
    updateTypedPreviewFromInput,
    submitAnswer,
    toggleHelperPinLocal: toggleHelperPinnedLocalLabel,
    toggleHelperPinGlobal: toggleHelperPinnedGlobalLabel,
    setRootHelperPinned,
    getHelperPinFlags,
    updateStatus,
    updateKeyStates,
    setKeyboardEnabled,
    clearTypingAutoNext,
    sanitizeRoundStateForKeyboardRange
});




