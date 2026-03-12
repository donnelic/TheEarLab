const isChordTutorialOpen = () => Boolean(chordTutorialModal && !chordTutorialModal.hidden);
const TUTORIAL_FIXED_FIT_CLASS = "tutorial-fit-2";

const fitTutorialLayout = ({ recompute = false } = {}) => {
    if (!isChordTutorialOpen()) return;
    const tutorialCard = chordTutorialModal?.querySelector(".tutorial-card");
    if (!tutorialCard) return;
    const tutorialLab = tutorialCard.querySelector(".tutorial-lab");

    const clearFitClasses = () => {
        ["tutorial-fit-1", "tutorial-fit-2", "tutorial-fit-3"].forEach((className) => tutorialCard.classList.remove(className));
        tutorialCard.classList.remove("tutorial-overflow-scroll");
    };

    const applyFitClass = (fitClass) => {
        clearFitClasses();
        if (fitClass) {
            tutorialCard.classList.add(fitClass);
        }
    };

    if (recompute || !tutorialState.fitClass) {
        tutorialState.fitClass = TUTORIAL_FIXED_FIT_CLASS;
    }
    applyFitClass(tutorialState.fitClass);

    const cardOverflow = tutorialCard.scrollHeight > tutorialCard.clientHeight + 1;
    const labOverflow = Boolean(tutorialLab && (tutorialLab.scrollHeight > tutorialLab.clientHeight + 1));
    if (cardOverflow || labOverflow) {
        tutorialCard.classList.add("tutorial-overflow-scroll");
    }
};

const getTutorialStep = () => {
    const total = CHORD_TUTORIAL_STEPS.length;
    const safeIndex = Math.min(Math.max(tutorialState.stepIndex, 0), Math.max(0, total - 1));
    tutorialState.stepIndex = safeIndex;
    return CHORD_TUTORIAL_STEPS[safeIndex];
};

const getStepUnlockedRootSet = () => {
    const step = getTutorialStep();
    const rootPcs = Array.isArray(step?.unlockedRootPcs) ? step.unlockedRootPcs : [TUTORIAL_FIXED_ROOT_PC];
    const normalized = rootPcs
        .map((value) => ((Math.round(Number(value)) % 12) + 12) % 12)
        .filter((value) => Number.isFinite(value));
    if (!normalized.length) return new Set([TUTORIAL_FIXED_ROOT_PC]);
    return new Set(normalized);
};

const getStepUnlockedQualitySet = () => {
    const step = getTutorialStep();
    const qualityIds = Array.isArray(step?.unlockedQualityIds) ? step.unlockedQualityIds : ["maj"];
    const filtered = qualityIds.filter((qualityId) => TUTORIAL_QUALITY_BY_ID.has(qualityId));
    if (!filtered.length) return new Set(["maj"]);
    return new Set(filtered);
};

const isTutorialRootEnabled = (rootPc) => getStepUnlockedRootSet().has(((Math.round(Number(rootPc)) % 12) + 12) % 12);
const isTutorialQualityEnabled = (qualityId) => getStepUnlockedQualitySet().has(String(qualityId ?? ""));

const getTutorialRootLabel = (pitchClass) => {
    const normalized = ((Math.round(pitchClass) % 12) + 12) % 12;
    return TUTORIAL_ROOTS.find((entry) => entry.pc === normalized)?.label ?? "C";
};

const midiToTutorialLabel = (midi) => {
    const pitch = NOTE_NAMES[((Math.round(midi) % 12) + 12) % 12] ?? "C";
    const octave = Math.floor(Math.round(midi) / 12) - 1;
    return `${pitch}${octave}`;
};

const getClosestNoteIdFromMidi = (midi) => {
    if (!Array.isArray(notes) || !notes.length) return null;
    const minMidi = notes[0].midi;
    const maxMidi = notes[notes.length - 1].midi;
    const clampedMidi = Math.min(maxMidi, Math.max(minMidi, Math.round(midi)));
    const index = clampedMidi - minMidi;
    return notes[index]?.id ?? null;
};

const getTutorialRenderedChord = (spec) => {
    if (!spec) return null;
    const quality = TUTORIAL_QUALITY_BY_ID.get(spec.qualityId);
    if (!quality) return null;
    const requestedRootPc = ((Math.round(Number(spec.rootPc ?? TUTORIAL_FIXED_ROOT_PC)) % 12) + 12) % 12;
    const rootPc = isTutorialRootEnabled(requestedRootPc) ? requestedRootPc : TUTORIAL_FIXED_ROOT_PC;

    // Keep root start position stable: C4..B4 for all qualities.
    const rootMidi = TUTORIAL_FIXED_ROOT_MIDI + rootPc;

    const midis = quality.intervals
        .map((interval) => rootMidi + interval)
        .filter((midi) => midi >= TUTORIAL_MIDI_START && midi <= TUTORIAL_MIDI_END);
    const noteIds = Array.from(new Set(midis.map((midi) => getClosestNoteIdFromMidi(midi)).filter(Boolean)));
    return {
        rootPc,
        rootMidi,
        quality,
        label: `${getTutorialRootLabel(rootPc)}${quality.suffix}`,
        midis,
        noteIds
    };
};

const ensureTutorialKeyboard = () => {
    if (!chordTutorialPiano) return;
    if (tutorialState.keySpecs.length) return;

    const keySpecs = [];
    let whiteIndex = 0;
    for (let midi = TUTORIAL_MIDI_START; midi <= TUTORIAL_MIDI_END; midi += 1) {
        const isBlack = NOTE_NAMES[midi % 12].includes("#");
        keySpecs.push({
            midi,
            isBlack,
            whiteIndex: isBlack ? Math.max(0, whiteIndex - 1) : whiteIndex
        });
        if (!isBlack) {
            whiteIndex += 1;
        }
    }
    tutorialState.keySpecs = keySpecs;
    chordTutorialPiano.style.setProperty("--tutorial-white-count", String(whiteIndex));
    const whiteMarkup = keySpecs
        .filter((entry) => !entry.isBlack)
        .map((entry, idx) =>
            `<div class="tutorial-key white" data-midi="${entry.midi}" style="--w-index:${idx}" title="${midiToTutorialLabel(entry.midi)}"></div>`
        )
        .join("");
    const blackMarkup = keySpecs
        .filter((entry) => entry.isBlack)
        .map((entry) =>
            `<div class="tutorial-key black" data-midi="${entry.midi}" style="--w-index:${entry.whiteIndex}" title="${midiToTutorialLabel(entry.midi)}"></div>`
        )
        .join("");
    chordTutorialPiano.innerHTML = `${whiteMarkup}${blackMarkup}`;
    tutorialState.keyElsByMidi.clear();
    chordTutorialPiano.querySelectorAll(".tutorial-key").forEach((keyEl) => {
        const midi = Number.parseInt(keyEl.dataset.midi, 10);
        if (!Number.isFinite(midi)) return;
        tutorialState.keyElsByMidi.set(midi, keyEl);
    });
};

const getStepAllowedQualityIds = () => {
    return TUTORIAL_ALL_QUALITY_IDS.filter((qualityId) => TUTORIAL_QUALITY_BY_ID.has(qualityId));
};

const getTutorialActiveSpec = () => {
    return tutorialState.hoverSpec ?? { rootPc: tutorialState.rootPc, qualityId: tutorialState.qualityId };
};

const renderTutorialCurrentText = () => {
    if (!chordTutorialCurrent) return;
    const activeSpec = getTutorialActiveSpec();
    const rendered = getTutorialRenderedChord(activeSpec);
    if (!rendered) {
        chordTutorialCurrent.textContent = "Current chord: unavailable";
        return;
    }
    const qualityLabel = rendered.quality.label;
    const notesText = rendered.midis.map((midi) => midiToTutorialLabel(midi)).join(" - ");
    chordTutorialCurrent.textContent = `Current chord: ${rendered.label} (${qualityLabel}) | Notes: ${notesText}`;
};

const renderTutorialPianoHighlight = () => {
    if (!chordTutorialPiano) return;
    const activeSpec = getTutorialActiveSpec();
    const rendered = getTutorialRenderedChord(activeSpec);
    const nextRolesByMidi = new Map();
    let rootMidi = null;

    if (rendered) {
        rendered.midis.forEach((midi, index) => {
            if (!nextRolesByMidi.has(midi)) {
                nextRolesByMidi.set(midi, rendered.quality.roles[index] ?? "");
                if (rootMidi === null) rootMidi = midi;
            }
        });
    }

    tutorialState.keyElsByMidi.forEach((keyEl, midi) => {
        const shouldTone = nextRolesByMidi.has(midi);
        const shouldRoot = shouldTone && midi === rootMidi;
        keyEl.classList.toggle("tone", shouldTone);
        keyEl.classList.toggle("root", shouldRoot);

        if (!shouldTone) {
            if (keyEl.hasAttribute("data-role")) {
                keyEl.removeAttribute("data-role");
            }
            return;
        }

        const nextRole = nextRolesByMidi.get(midi) ?? "";
        if (keyEl.getAttribute("data-role") !== nextRole) {
            keyEl.setAttribute("data-role", nextRole);
        }
    });
};

const renderTutorialRootOptions = () => {
    if (!chordTutorialRootList) return;
    const unlockedRoots = getStepUnlockedRootSet();
    if (!unlockedRoots.has(tutorialState.rootPc)) {
        tutorialState.rootPc = unlockedRoots.values().next().value ?? TUTORIAL_FIXED_ROOT_PC;
    }
    chordTutorialRootList.innerHTML = TUTORIAL_ROOTS.map((entry) => {
        const unlocked = unlockedRoots.has(entry.pc);
        const active = unlocked && entry.pc === tutorialState.rootPc;
        const classes = [
            "tutorial-chip",
            unlocked ? "unlocked" : "locked",
            active ? "active" : "",
            unlocked ? "" : "muted",
            tutorialState.pendingNewRoots.has(entry.pc) ? "newly-unlocked" : ""
        ].filter(Boolean).join(" ");
        return `<button class="${classes}" type="button" data-root-pc="${entry.pc}" ${unlocked ? "" : 'aria-disabled="true" disabled'}>${entry.label}</button>`;
    }).join("");
};

const renderTutorialQualityOptions = () => {
    if (!chordTutorialQualityList) return;
    const unlockedQualities = getStepUnlockedQualitySet();
    if (!unlockedQualities.has(tutorialState.qualityId)) {
        tutorialState.qualityId = unlockedQualities.values().next().value ?? "maj";
    }
    const allowed = new Set(getStepAllowedQualityIds());
    const grouped = TUTORIAL_QUALITY_GROUPS.map((group) => ({
        label: group.label,
        ids: group.ids.filter((qualityId) => allowed.has(qualityId) && TUTORIAL_QUALITY_BY_ID.has(qualityId))
    })).filter((group) => group.ids.length);
    const covered = new Set(grouped.flatMap((group) => group.ids));
    const remaining = Array.from(allowed).filter((qualityId) => !covered.has(qualityId));
    if (remaining.length) {
        grouped.push({ label: "Other", ids: remaining });
    }

    const rows = grouped.map((group) => {
        const chips = group.ids.map((qualityId) => {
            const quality = TUTORIAL_QUALITY_BY_ID.get(qualityId);
            if (!quality) return "";
            const unlocked = unlockedQualities.has(qualityId);
            const active = unlocked && qualityId === tutorialState.qualityId;
            const classes = [
                "tutorial-chip",
                unlocked ? "unlocked" : "locked",
                active ? "active" : "",
                unlocked ? "" : "muted",
                tutorialState.pendingNewQualities.has(qualityId) ? "newly-unlocked" : ""
            ].filter(Boolean).join(" ");
            return `<button class="${classes}" type="button" data-quality-id="${qualityId}" ${unlocked ? "" : 'aria-disabled="true" disabled'}>${quality.label}</button>`;
        }).join("");
        return `
            <tr>
                <th scope="row">${group.label}</th>
                <td><div class="tutorial-chip-group-list">${chips}</div></td>
            </tr>
        `;
    }).join("");

    chordTutorialQualityList.innerHTML = `
        <table class="tutorial-quality-table">
            <tbody>${rows}</tbody>
        </table>
    `;
};

const syncTutorialRootChipStates = () => {
    if (!chordTutorialRootList) return;
    const unlockedRoots = getStepUnlockedRootSet();
    chordTutorialRootList.querySelectorAll("[data-root-pc]").forEach((chip) => {
        const rootPc = Number.parseInt(chip.dataset.rootPc ?? "", 10);
        const unlocked = Number.isFinite(rootPc) && unlockedRoots.has(rootPc);
        const active = unlocked && rootPc === tutorialState.rootPc;
        chip.classList.toggle("unlocked", unlocked);
        chip.classList.toggle("locked", !unlocked);
        chip.classList.toggle("muted", !unlocked);
        chip.classList.toggle("active", active);
        chip.classList.toggle("newly-unlocked", unlocked && tutorialState.pendingNewRoots.has(rootPc));
        chip.disabled = !unlocked;
        if (!unlocked) {
            chip.setAttribute("aria-disabled", "true");
        } else {
            chip.removeAttribute("aria-disabled");
        }
    });
};

const syncTutorialQualityChipStates = () => {
    if (!chordTutorialQualityList) return;
    const unlockedQualities = getStepUnlockedQualitySet();
    chordTutorialQualityList.querySelectorAll("[data-quality-id]").forEach((chip) => {
        const qualityId = String(chip.dataset.qualityId ?? "");
        const unlocked = unlockedQualities.has(qualityId);
        const active = unlocked && qualityId === tutorialState.qualityId;
        chip.classList.toggle("unlocked", unlocked);
        chip.classList.toggle("locked", !unlocked);
        chip.classList.toggle("muted", !unlocked);
        chip.classList.toggle("active", active);
        chip.classList.toggle("newly-unlocked", unlocked && tutorialState.pendingNewQualities.has(qualityId));
        chip.disabled = !unlocked;
        if (!unlocked) {
            chip.setAttribute("aria-disabled", "true");
        } else {
            chip.removeAttribute("aria-disabled");
        }
    });
};

const setTutorialHoverSpec = (rootPc, qualityId) => {
    if (!Number.isFinite(rootPc) || !TUTORIAL_QUALITY_BY_ID.has(qualityId)) return;
    tutorialState.hoverSpec = {
        rootPc: ((Math.round(rootPc) % 12) + 12) % 12,
        qualityId
    };
    refreshTutorialVisuals();
};

const clearTutorialHoverSpec = () => {
    tutorialState.hoverSpec = null;
    refreshTutorialVisuals();
};

const refreshTutorialVisuals = () => {
    ensureTutorialKeyboard();
    renderTutorialCurrentText();
    renderTutorialPianoHighlight();
};

const playTutorialChordSpec = (spec = getTutorialActiveSpec()) => {
    const rendered = getTutorialRenderedChord(spec);
    if (!rendered || !rendered.midis.length) return;
    tutorialState.previewToken += 1;
    const previewToken = tutorialState.previewToken;
    if (typeof App.audio?.stopAllNotes === "function") {
        App.audio.stopAllNotes();
    }
    const consistentDuration = typeof App.game?.getConsistentPreviewDuration === "function"
        ? App.game.getConsistentPreviewDuration(0.8)
        : Math.max(0.8, state.noteDuration);
    if (typeof App.audio?.playPianoNote === "function" && typeof App.audio?.ensureAudio === "function") {
        const ctx = App.audio.ensureAudio();
        const start = ctx.currentTime + (SCHEDULE_LEAD || 0.02);
        rendered.midis.forEach((midi, index) => {
            const frequency = 440 * Math.pow(2, (midi - 69) / 12);
            App.audio.playPianoNote(frequency, start, consistentDuration, 1, `tutorial-preview-${previewToken}-${index}`);
        });
        return;
    }
    if (typeof App.game?.playConsistentPreview === "function" && rendered.noteIds.length) {
        App.game.playConsistentPreview(rendered.noteIds, "simultaneous", {
            animate: false,
            minimumDuration: 0.8
        });
    }
};

const getTutorialStepIndexForQuality = (qualityId) => {
    const mapped = TUTORIAL_QUALITY_STEP_INDEX[qualityId];
    if (Number.isFinite(mapped)) return mapped;
    const index = CHORD_TUTORIAL_STEPS.findIndex((step) => Array.isArray(step.unlockedQualityIds)
        && step.unlockedQualityIds.includes(qualityId));
    return index >= 0 ? index : 0;
};

const renderChordTutorialTabs = () => {
    if (!chordTutorialTabs) return;
    const total = CHORD_TUTORIAL_STEPS.length;
    const clampedTotal = Math.max(1, total);
    const isLastStep = tutorialState.stepIndex >= clampedTotal - 1;
    const progress = total > 1 ? tutorialState.stepIndex / (total - 1) : 1;
    const fill = total > 0
        ? Math.min(1, isLastStep ? 1 : (tutorialState.stepIndex + 0.5) / clampedTotal)
        : 0;
    chordTutorialTabs.style.setProperty("--tutorial-step-count", `${clampedTotal}`);
    chordTutorialTabs.style.setProperty("--tutorial-progress", progress.toFixed(3));
    chordTutorialTabs.style.setProperty("--tutorial-progress-fill", fill.toFixed(3));
    const tabs = CHORD_TUTORIAL_STEPS.map((step, index) => {
        const label = step.tabLabel || step.title || `Step ${index + 1}`;
        const classes = ["tutorial-progress-tab"];
        if (index === tutorialState.stepIndex) classes.push("active");
        if (index < tutorialState.stepIndex) classes.push("complete");
        return `
            <button class="${classes.join(" ")}" type="button" data-step-index="${index}"
                role="tab" aria-selected="${index === tutorialState.stepIndex ? "true" : "false"}"
                aria-label="Step ${index + 1}: ${label}" ${index === tutorialState.stepIndex ? "aria-current=\"step\"" : ""}>
                <span class="tutorial-progress-step">${index + 1}</span>
                <span class="tutorial-progress-label">${label}</span>
            </button>
        `;
    }).join("");
    chordTutorialTabs.innerHTML = tabs;
    fitTutorialProgressTabs();
};

const fitTutorialProgressTabs = () => {
    if (!chordTutorialTabs) return;
    const total = Math.max(1, CHORD_TUTORIAL_STEPS.length);
    const stepWidth = chordTutorialTabs.clientWidth / total;
    chordTutorialTabs.classList.toggle("compact", stepWidth < 66);
};

const renderChordTutorialStep = () => {
    if (!chordTutorialStep || !chordTutorialProgress) return;
    const total = CHORD_TUTORIAL_STEPS.length;
    const step = getTutorialStep();
    if (!step) return;

    chordTutorialStep.innerHTML = `
        <div class="tutorial-step-kicker">Read this first</div>
        <div class="tutorial-step-title">${step.title}</div>
        <div class="tutorial-step-body">${step.bodyHtml ?? step.body ?? ""}</div>
    `;
    chordTutorialStep.classList.remove("focus-flash");
    void chordTutorialStep.offsetWidth;
    chordTutorialStep.classList.add("focus-flash");
    chordTutorialProgress.textContent = `Step ${tutorialState.stepIndex + 1}/${total}`;
    if (chordTutorialPrev) chordTutorialPrev.disabled = tutorialState.stepIndex <= 0;
    if (chordTutorialNext) chordTutorialNext.textContent = tutorialState.stepIndex >= total - 1 ? "Done" : "Next";
    const unlockedRoots = getStepUnlockedRootSet();
    const unlockedQualities = getStepUnlockedQualitySet();
    const stepChanged = tutorialState.stepIndex !== tutorialState.previousStepIndex;
    if (stepChanged) {
        const newRoots = new Set(
            Array.from(unlockedRoots).filter((rootPc) =>
                tutorialState.stepIndex > 0 && !tutorialState.previousUnlockedRootPcs.has(rootPc)
            )
        );
        const newQualities = new Set(
            Array.from(unlockedQualities).filter((qualityId) =>
                tutorialState.stepIndex > 0 && !tutorialState.previousUnlockedQualityIds.has(qualityId)
            )
        );
        tutorialState.pendingNewRoots = newRoots;
        tutorialState.pendingNewQualities = newQualities;
    }
    renderTutorialRootOptions();
    renderTutorialQualityOptions();
    if (tutorialRowRoot) {
        const allRootsUnlocked = unlockedRoots.size >= TUTORIAL_ALL_ROOT_PCS.length;
        tutorialRowRoot.classList.toggle("locked", !allRootsUnlocked);
        const newlyUnlocked = Array.from(unlockedRoots).some((rootPc) => !tutorialState.previousUnlockedRootPcs.has(rootPc))
            && tutorialState.stepIndex > 0;
        tutorialRowRoot.classList.toggle("newly-unlocked", newlyUnlocked);
    }
    if (tutorialRowQuality) {
        const allQualitiesUnlocked = unlockedQualities.size >= TUTORIAL_ALL_QUALITY_IDS.length;
        tutorialRowQuality.classList.toggle("locked", !allQualitiesUnlocked);
        const newlyUnlocked = Array.from(unlockedQualities).some((qualityId) => !tutorialState.previousUnlockedQualityIds.has(qualityId))
            && tutorialState.stepIndex > 0;
        tutorialRowQuality.classList.toggle("newly-unlocked", newlyUnlocked);
    }
    tutorialState.previousUnlockedRootPcs = new Set(unlockedRoots);
    tutorialState.previousUnlockedQualityIds = new Set(unlockedQualities);
    tutorialState.previousStepIndex = tutorialState.stepIndex;
    renderChordTutorialTabs();
    refreshTutorialVisuals();
    fitTutorialLayout({ recompute: false });
};

const closeChordTutorial = () => {
    if (!chordTutorialModal) return;
    chordTutorialModal.hidden = true;
    chordTutorialModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("tutorial-open");
    if (typeof App.settings?.syncModalOpenClass === "function") {
        App.settings.syncModalOpenClass();
    }
    const cameFromChordLink = Boolean(tutorialReturnFocusEl?.classList?.contains("chord-link"));
    if (cameFromChordLink && typeof document?.body?.classList?.add === "function") {
        document.body.classList.add("suppress-chord-bubbles");
        if (suppressChordBubbleTimer) {
            clearTimeout(suppressChordBubbleTimer);
        }
        const clearSuppress = () => {
            document.body.classList.remove("suppress-chord-bubbles");
            window.removeEventListener("pointermove", clearSuppress);
            window.removeEventListener("pointerdown", clearSuppress);
            window.removeEventListener("keydown", clearSuppress);
            suppressChordBubbleTimer = null;
        };
        suppressChordBubbleTimer = setTimeout(clearSuppress, 400);
        window.addEventListener("pointermove", clearSuppress, { once: true });
        window.addEventListener("pointerdown", clearSuppress, { once: true });
        window.addEventListener("keydown", clearSuppress, { once: true });
        if (document.activeElement === tutorialReturnFocusEl && typeof document.activeElement.blur === "function") {
            document.activeElement.blur();
        }
    }
    if (!tutorialSkipReturnFocus) {
        const fallback = cameFromChordLink
            ? (typingHelpToggle ?? chordTutorialOpenOptions)
            : (tutorialReturnFocusEl ?? typingHelpToggle ?? chordTutorialOpenOptions);
        if (fallback && typeof fallback.focus === "function") {
            fallback.focus();
        }
    }
    tutorialReturnFocusEl = null;
    tutorialSkipReturnFocus = false;
};

const openChordTutorial = (stepIndex = 0, sourceEl = null, options = {}) => {
    if (!chordTutorialModal) return;
    const { qualityId = null, rootPc = null, skipReturnFocus = false } = options;
    tutorialSkipReturnFocus = Boolean(skipReturnFocus);
    tutorialReturnFocusEl = !tutorialSkipReturnFocus && sourceEl && typeof sourceEl.focus === "function"
        ? sourceEl
        : null;
    tutorialState.stepIndex = Number.isFinite(stepIndex) ? stepIndex : 0;
    tutorialState.previousStepIndex = tutorialState.stepIndex;
    tutorialState.hoverSpec = null;
    if (Number.isFinite(rootPc)) {
        tutorialState.rootPc = ((rootPc % 12) + 12) % 12;
    } else {
        tutorialState.rootPc = TUTORIAL_FIXED_ROOT_PC;
    }
    if (qualityId && TUTORIAL_QUALITY_BY_ID.has(qualityId)) {
        tutorialState.qualityId = qualityId;
    } else {
        tutorialState.qualityId = "maj";
    }
    tutorialState.previousUnlockedRootPcs = new Set();
    tutorialState.previousUnlockedQualityIds = new Set();
    tutorialState.pendingNewRoots = new Set();
    tutorialState.pendingNewQualities = new Set();
    tutorialState.fitClass = "";
    chordTutorialModal.hidden = false;
    chordTutorialModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("tutorial-open");
    if (typeof App.settings?.syncModalOpenClass === "function") {
        App.settings.syncModalOpenClass();
    }
    renderChordTutorialStep();
    requestAnimationFrame(() => fitTutorialLayout({ recompute: true }));
    if (chordTutorialClose) {
        chordTutorialClose.focus({ preventScroll: true });
    } else {
        focusFirstInModal(chordTutorialModal);
    }
};

function wasPointerActivated(element) {
    return Boolean(
        element
        && lastPointerDownTarget === element
        && (Date.now() - lastPointerDownAt) < 1200
    );
}

const registerTutorialOpenTrigger = (triggerEl, stepIndex = 0) => {
    if (!triggerEl) return;
    triggerEl.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        openChordTutorial(stepIndex, triggerEl, { skipReturnFocus: wasPointerActivated(triggerEl) });
    });
};

const openChordTutorialForChordLink = (linkEl, { skipReturnFocus = false } = {}) => {
    if (!linkEl) return;
    const qualityId = String(linkEl.dataset.qualityId || "");
    if (!qualityId) return;
    const rootPc = Number.parseInt(linkEl.dataset.rootPc, 10);
    const stepIndex = getTutorialStepIndexForQuality(qualityId);
    openChordTutorial(stepIndex, linkEl, {
        qualityId,
        rootPc: Number.isFinite(rootPc) ? rootPc : null,
        skipReturnFocus
    });
};

const handleChordLinkActivation = (event) => {
    const isKeyboard = event.type === "keydown";
    if (isKeyboard && !["Enter", " "].includes(event.key)) return;
    const linkEl = event.target.closest(".chord-link");
    if (!linkEl) return;
    event.preventDefault();
    openChordTutorialForChordLink(linkEl, { skipReturnFocus: !isKeyboard });
};

document.addEventListener("click", handleChordLinkActivation);
document.addEventListener("keydown", handleChordLinkActivation);

registerTutorialOpenTrigger(chordTutorialOpenOptions, 0);
registerTutorialOpenTrigger(typingHelpToggle, 0);

if (chordTutorialTabs) {
    chordTutorialTabs.addEventListener("click", (event) => {
        const tab = event.target.closest("[data-step-index]");
        if (!tab) return;
        const index = Number.parseInt(tab.dataset.stepIndex, 10);
        if (!Number.isFinite(index)) return;
        tutorialState.stepIndex = Math.min(Math.max(index, 0), Math.max(0, CHORD_TUTORIAL_STEPS.length - 1));
        tutorialState.hoverSpec = null;
        renderChordTutorialStep();
    });
}

if (chordTutorialClose) {
    chordTutorialClose.addEventListener("click", (event) => {
        event.preventDefault();
        closeChordTutorial();
    });
}

if (chordTutorialBackdrop) {
    chordTutorialBackdrop.addEventListener("click", () => {
        closeChordTutorial();
    });
}

if (chordTutorialPrev) {
    chordTutorialPrev.addEventListener("click", () => {
        tutorialState.stepIndex = Math.max(0, tutorialState.stepIndex - 1);
        tutorialState.hoverSpec = null;
        renderChordTutorialStep();
    });
}

if (chordTutorialNext) {
    chordTutorialNext.addEventListener("click", () => {
        if (tutorialState.stepIndex >= CHORD_TUTORIAL_STEPS.length - 1) {
            closeChordTutorial();
            return;
        }
        tutorialState.stepIndex += 1;
        tutorialState.hoverSpec = null;
        renderChordTutorialStep();
    });
}

