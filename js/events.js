var App = window.App || (window.App = {});
App.events = App.events || {};

noteCountInput.addEventListener("input", (event) => {
    const next = clampNoteCount(event.target.value);
    pendingNoteCount = next;
    noteCountInput.value = String(next);
    noteCountValue.textContent = `${next} notes`;
});

noteCountInput.addEventListener("change", () => {
    commitNoteCountChange();
});

noteCountInput.addEventListener("pointerup", () => {
    commitNoteCountChange();
});

segmentedButtons.forEach((button) => {
    button.addEventListener("click", () => {
        segmentedButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        state.mode = button.dataset.mode;
        saveSettings();
    });
});

blindToggle.addEventListener("change", (event) => {
    state.blindMode = event.target.checked;
    handleCriticalSettingChange(200);
    updateStatus();
    saveSettings();
});

niceNotesToggle.addEventListener("change", (event) => {
    if (event.target.checked) {
        setPracticeMode("nice");
    } else if (getEffectivePracticeMode() === "nice") {
        setPracticeMode("random");
    } else {
        state.niceMode = false;
        updateNoteCountMax();
        handleCriticalSettingChange(200);
        updateStatus();
        saveSettings();
    }
});

if (chordRoundsToggle) {
    chordRoundsToggle.addEventListener("change", (event) => {
        setPracticeMode(event.target.checked ? "chord" : "random");
    });
}

if (practiceModeSelect) {
    practiceModeSelect.addEventListener("change", (event) => {
        const value = String(event.target.value ?? "");
        setPracticeMode(value);
    });
}

if (trainingModeSelect) {
    trainingModeSelect.addEventListener("change", (event) => {
        const value = String(event.target.value ?? "");
        const next = ["keyboard", "type", "both"].includes(value) ? value : "keyboard";
        state.trainingMode = next;
        if (getEffectivePracticeMode() !== "chord") {
            state.trainingMode = "keyboard";
        }
        refreshOptionsModeVisibility();
        if (typeof App.game?.clearTypingAutoNext === "function") {
            App.game.clearTypingAutoNext();
        }
        handleCriticalSettingChange(200);
        updateStatus();
        updateKeyStates();
        saveSettings();
    });
}

if (chordDifficultySelect) {
    chordDifficultySelect.addEventListener("change", (event) => {
        const value = String(event.target.value ?? "").trim().toLowerCase();
        state.chordDifficulty = value === "playful"
            ? "voiced"
            : (["easy", "medium", "voiced", "hard"].includes(value)
                ? value
                : DEFAULTS.chordDifficulty);
        if (getIsChordRound()) {
            handleCriticalSettingChange(200);
        }
        updateStatus();
        saveSettings();
    });
}

if (chordExtraHelpersToggle) {
    chordExtraHelpersToggle.addEventListener("change", (event) => {
        state.chordExtraHelpers = Boolean(event.target.checked);
        if (getIsChordRound()) {
            handleCriticalSettingChange(200);
        }
        updateStatus();
        saveSettings();
    });
}

if (typingShowPianoToggle) {
    typingShowPianoToggle.addEventListener("change", (event) => {
        state.typingShowPiano = Boolean(event.target.checked);
        refreshOptionsModeVisibility();
        updateStatus();
        updateKeyStates();
        saveSettings();
    });
}

if (typingShowTypedToggle) {
    typingShowTypedToggle.addEventListener("change", (event) => {
        state.typingShowTyped = Boolean(event.target.checked);
        refreshOptionsModeVisibility();
        if (typeof App.game?.updateTypedPreviewFromInput === "function") {
            App.game.updateTypedPreviewFromInput();
        }
        updateStatus();
        updateKeyStates();
        saveSettings();
    });
}

resetSettingsButton.addEventListener("click", () => {
    resetAllSettings();
    rebuildKeyboard();
    updateNoteCountMax();
    applyUiFromState();
    setVolume(state.volume);
    setPianoTone(state.pianoTone, { save: false, skipProfilePrompts: true });
    setNoteLength(state.noteDuration);
    setKeyCount(state.keyCount, { delayOverrideMs: 0 });
    saveSettings();
    handleCriticalSettingChange(200);
    updateStatus();
});

settingsToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    if (settingsPanel.classList.contains("open")) {
        closeSettings();
    } else {
        openSettings();
    }
});

themeToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    state.theme = state.theme === "dark" ? "light" : "dark";
    document.body.classList.toggle("theme-dark", state.theme === "dark");
    themeToggle.setAttribute("aria-pressed", state.theme === "dark");
    saveSettings();
});

settingsPanel.addEventListener("click", (event) => {
    if (!optionsPanel?.contains(event.target) && !optionsTrigger?.contains(event.target)) {
        closeOptionsPanel();
    }
    if (!advancedPanel.contains(event.target) && !advancedTrigger.contains(event.target)) {
        closeAdvanced();
    }
    if (!pianoPanel?.contains(event.target) && !pianoTrigger?.contains(event.target)) {
        closePianoPanel();
    }
    if (!instrumentBrowserPanel?.contains(event.target) && !instrumentBrowserTrigger?.contains(event.target)) {
        closeInstrumentBrowser();
    }
    event.stopPropagation();
});

if (optionsTrigger) {
    optionsTrigger.addEventListener("click", (event) => {
        event.stopPropagation();
        if (!optionsPanel) return;
        if (optionsPanel.classList.contains("open")) {
            closeOptionsPanel();
        } else {
            openOptionsPanel();
        }
    });
}

if (optionsPanel) {
    optionsPanel.addEventListener("click", (event) => {
        event.stopPropagation();
    });
}

document.addEventListener("click", () => {
    closeSettings();
    closeOptionsPanel();
    closeAdvanced();
    closePianoPanel();
    closeInstrumentBrowser();
});

window.addEventListener("resize", () => {
    updateKeyboardScale();
    if (optionsPanel?.classList.contains("open")) {
        positionOptionsPanel();
    }
    if (advancedPanel?.classList.contains("open")) {
        positionFloatingPanel(advancedPanel, advancedTrigger);
    }
    if (pianoPanel?.classList.contains("open")) {
        positionPianoPanel();
    }
    if (instrumentBrowserPanel?.classList.contains("open")) {
        positionInstrumentBrowserPanel();
    }
});

playSelectedButton.addEventListener("click", () => {
    playSelectedChord();
});

playSelectedButton.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    startHeldPlayback();
});

playSelectedButton.addEventListener("pointerup", () => {
    releaseHeldPlayback();
});

playSelectedButton.addEventListener("pointerleave", () => {
    releaseHeldPlayback();
});

primaryActionButton.addEventListener("click", () => {
    if (state.active && !state.submitted) {
        submitAnswer();
    } else {
        startRound(true);
    }
});

volumeSlider.addEventListener("input", (event) => {
    const raw = Number.parseFloat(event.target.value);
    const next = Number.isFinite(raw) ? raw : state.volume;
    setVolume(next);
});

lengthSlider.addEventListener("input", (event) => {
    const raw = Number.parseFloat(event.target.value);
    const next = Number.isFinite(raw) ? raw : state.noteDuration;
    setNoteLength(next);
});

attackSlider.addEventListener("input", (event) => {
    const raw = Number.parseInt(event.target.value, 10);
    const next = Number.isFinite(raw) ? raw : Math.round(state.adsrTrim.attack * 100);
    setAdsrTrim("attack", next / 100);
});

decaySlider.addEventListener("input", (event) => {
    const raw = Number.parseInt(event.target.value, 10);
    const next = Number.isFinite(raw) ? raw : Math.round(state.adsrTrim.decay * 100);
    setAdsrTrim("decay", next / 100);
});

releaseSlider.addEventListener("input", (event) => {
    const raw = Number.parseInt(event.target.value, 10);
    const next = Number.isFinite(raw) ? raw : Math.round(state.adsrTrim.release * 100);
    setAdsrTrim("release", next / 100);
});

sustainSlider.addEventListener("input", (event) => {
    const raw = Number.parseInt(event.target.value, 10);
    const next = Number.isFinite(raw) ? raw : Math.round(state.adsrTrim.length * 100);
    setAdsrTrim("length", next / 100);
});

keyCountSlider.addEventListener("input", (event) => {
    const raw = Number.parseInt(event.target.value, 10);
    const next = Number.isFinite(raw) ? raw : state.keyCount;
    pendingKeyCount = next;
    setKeyCount(next, { preview: true });
});

keyCountSlider.addEventListener("change", () => {
    commitCriticalChange();
});

keyCountSlider.addEventListener("pointerup", () => {
    commitCriticalChange();
});

hintButton.addEventListener("click", () => {
    playTarget();
});

if (chordAnswerInput) {
    chordAnswerInput.addEventListener("input", () => {
        if (typeof App.game?.updateTypedPreviewFromInput === "function") {
            App.game.updateTypedPreviewFromInput();
        }
        updateStatus();
        updateKeyStates();
    });
    chordAnswerInput.addEventListener("keydown", (event) => {
        if (event.code === "Enter" || event.code === "Space") {
            event.preventDefault();
        }
    });
}

if (typingHelpToggle && typingHelpText) {
    typingHelpToggle.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        const show = typingHelpText.hidden;
        typingHelpText.hidden = !show;
        typingHelpToggle.setAttribute("aria-expanded", show ? "true" : "false");
    });
}

const TUTORIAL_ROOTS = [
    { pc: 0, label: "C" },
    { pc: 1, label: "C#" },
    { pc: 2, label: "D" },
    { pc: 3, label: "Eb" },
    { pc: 4, label: "E" },
    { pc: 5, label: "F" },
    { pc: 6, label: "F#" },
    { pc: 7, label: "G" },
    { pc: 8, label: "Ab" },
    { pc: 9, label: "A" },
    { pc: 10, label: "Bb" },
    { pc: 11, label: "B" }
];

const TUTORIAL_QUALITIES = [
    { id: "maj", label: "Major", suffix: "", intervals: [0, 4, 7], roles: ["R", "3", "5"] },
    { id: "min", label: "Minor", suffix: "m", intervals: [0, 3, 7], roles: ["R", "b3", "5"] },
    { id: "maj7", label: "Major 7", suffix: "maj7", intervals: [0, 4, 7, 11], roles: ["R", "3", "5", "7"] },
    { id: "m7", label: "Minor 7", suffix: "m7", intervals: [0, 3, 7, 10], roles: ["R", "b3", "5", "b7"] },
    { id: "dom7", label: "Dominant 7", suffix: "7", intervals: [0, 4, 7, 10], roles: ["R", "3", "5", "b7"] },
    { id: "nine", label: "Dominant 9", suffix: "9", intervals: [0, 4, 7, 10, 14], roles: ["R", "3", "5", "b7", "9"] },
    { id: "six", label: "Major 6", suffix: "6", intervals: [0, 4, 7, 9], roles: ["R", "3", "5", "6"] },
    { id: "sus2", label: "Sus2", suffix: "sus2", intervals: [0, 2, 7], roles: ["R", "2", "5"] },
    { id: "sus4", label: "Sus4", suffix: "sus4", intervals: [0, 5, 7], roles: ["R", "4", "5"] },
    { id: "dim", label: "Diminished", suffix: "dim", intervals: [0, 3, 6], roles: ["R", "b3", "b5"] },
    { id: "aug", label: "Augmented", suffix: "aug", intervals: [0, 4, 8], roles: ["R", "3", "#5"] },
    { id: "power5", label: "Power chord", suffix: "5", intervals: [0, 7], roles: ["R", "5"] }
];

const TUTORIAL_QUALITY_BY_ID = new Map(TUTORIAL_QUALITIES.map((entry) => [entry.id, entry]));
const TUTORIAL_DEFAULT_QUALITY_IDS = ["maj", "min", "maj7", "m7", "dom7", "sus2", "sus4", "dim", "aug", "power5"];
const TUTORIAL_MIDI_START = 48; // C3
const TUTORIAL_MIDI_END = 72; // C5

const CHORD_TUTORIAL_STEPS = [
    {
        title: "1. Root Note",
        body: "The first part of a chord name is the root note (A-G). Pick roots below and compare how the same quality moves on the piano.",
        qualityIds: ["maj"],
        examples: [
            { rootPc: 0, qualityId: "maj" },
            { rootPc: 9, qualityId: "maj" },
            { rootPc: 5, qualityId: "maj" }
        ]
    },
    {
        title: "2. Accidentals",
        body: "After the root, you can add accidentals: # (sharp) or b (flat). They shift the root by one semitone.",
        qualityIds: ["maj", "min"],
        examples: [
            { rootPc: 6, qualityId: "maj" },
            { rootPc: 10, qualityId: "maj" },
            { rootPc: 1, qualityId: "min" },
            { rootPc: 3, qualityId: "min" }
        ]
    },
    {
        title: "3. Major vs Minor",
        body: "No suffix means major. Use m for minor. The big difference is the 3rd (major 3 vs minor 3).",
        qualityIds: ["maj", "min"],
        examples: [
            { rootPc: 0, qualityId: "maj" },
            { rootPc: 0, qualityId: "min" },
            { rootPc: 6, qualityId: "min" }
        ]
    },
    {
        title: "4. Common Extensions",
        body: "Then you can extend the chord: 7, maj7, m7, 9, 6 and more. Hover examples to preview the chord tones.",
        qualityIds: ["maj7", "m7", "dom7", "nine", "six"],
        examples: [
            { rootPc: 7, qualityId: "dom7" },
            { rootPc: 0, qualityId: "maj7" },
            { rootPc: 2, qualityId: "m7" },
            { rootPc: 9, qualityId: "nine" }
        ]
    },
    {
        title: "5. Color Chords",
        body: "Other common colors are sus2/sus4, diminished, augmented, and power chords.",
        qualityIds: ["sus2", "sus4", "dim", "aug", "power5"],
        examples: [
            { rootPc: 2, qualityId: "sus4" },
            { rootPc: 11, qualityId: "dim" },
            { rootPc: 4, qualityId: "aug" },
            { rootPc: 9, qualityId: "power5" }
        ]
    },
    {
        title: "6. Input Tips",
        body: "Accepted input is flexible: Cmaj7, C major 7, Bb min7, and F sharp minor are all valid. Enter submits; Space previews typed chord (when blind mode is off).",
        qualityIds: TUTORIAL_DEFAULT_QUALITY_IDS,
        examples: [
            { rootPc: 0, qualityId: "maj7" },
            { rootPc: 10, qualityId: "m7" },
            { rootPc: 6, qualityId: "min" },
            { rootPc: 5, qualityId: "sus2" }
        ]
    }
];

const tutorialState = {
    stepIndex: 0,
    rootPc: 0,
    qualityId: "maj",
    hoverSpec: null,
    keySpecs: [],
    keyElsByMidi: new Map()
};

const isChordTutorialOpen = () => Boolean(chordTutorialModal && !chordTutorialModal.hidden);

const getTutorialStep = () => {
    const total = CHORD_TUTORIAL_STEPS.length;
    const safeIndex = Math.min(Math.max(tutorialState.stepIndex, 0), Math.max(0, total - 1));
    tutorialState.stepIndex = safeIndex;
    return CHORD_TUTORIAL_STEPS[safeIndex];
};

const getTutorialRootLabel = (pitchClass) => {
    const normalized = ((Math.round(pitchClass) % 12) + 12) % 12;
    return TUTORIAL_ROOTS.find((entry) => entry.pc === normalized)?.label ?? "C";
};

const getTutorialChordLabel = (spec) => {
    if (!spec) return "C";
    const quality = TUTORIAL_QUALITY_BY_ID.get(spec.qualityId);
    const rootLabel = getTutorialRootLabel(spec.rootPc);
    return `${rootLabel}${quality?.suffix ?? ""}`;
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
    const rootPc = ((Math.round(spec.rootPc) % 12) + 12) % 12;
    let rootMidi = 60 + rootPc;
    while (rootMidi > 66) rootMidi -= 12;
    while (rootMidi < 52) rootMidi += 12;
    const midis = quality.intervals.map((interval) => rootMidi + interval);
    while (Math.max(...midis) > TUTORIAL_MIDI_END) {
        for (let i = 0; i < midis.length; i += 1) midis[i] -= 12;
    }
    while (Math.min(...midis) < TUTORIAL_MIDI_START) {
        for (let i = 0; i < midis.length; i += 1) midis[i] += 12;
    }
    const noteIds = Array.from(new Set(midis.map((midi) => getClosestNoteIdFromMidi(midi)).filter(Boolean)));
    return {
        rootPc,
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
    const step = getTutorialStep();
    const qualityIds = Array.isArray(step?.qualityIds) && step.qualityIds.length
        ? step.qualityIds.filter((id) => TUTORIAL_QUALITY_BY_ID.has(id))
        : TUTORIAL_DEFAULT_QUALITY_IDS;
    return qualityIds.length ? qualityIds : ["maj"];
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
    const tones = rendered.midis.map((midi) => midiToTutorialLabel(midi)).join(" - ");
    const hoverSuffix = tutorialState.hoverSpec ? " (hover preview)" : "";
    chordTutorialCurrent.textContent = `Current chord: ${rendered.label} (${qualityLabel}) | Tones: ${tones}${hoverSuffix}`;
};

const renderTutorialPianoHighlight = () => {
    if (!chordTutorialPiano) return;
    tutorialState.keyElsByMidi.forEach((keyEl) => {
        keyEl.classList.remove("tone", "root");
        keyEl.removeAttribute("data-role");
    });
    const activeSpec = getTutorialActiveSpec();
    const rendered = getTutorialRenderedChord(activeSpec);
    if (!rendered) return;
    rendered.midis.forEach((midi, index) => {
        const keyEl = tutorialState.keyElsByMidi.get(midi);
        if (!keyEl) return;
        keyEl.classList.add("tone");
        if (index === 0) {
            keyEl.classList.add("root");
        }
        keyEl.setAttribute("data-role", rendered.quality.roles[index] ?? "");
    });
};

const renderTutorialRootOptions = () => {
    if (!chordTutorialRootList) return;
    chordTutorialRootList.innerHTML = TUTORIAL_ROOTS.map((entry) => {
        const active = entry.pc === tutorialState.rootPc;
        return `<button class="tutorial-chip ${active ? "active" : ""}" type="button" data-root-pc="${entry.pc}">${entry.label}</button>`;
    }).join("");
};

const renderTutorialQualityOptions = () => {
    if (!chordTutorialQualityList) return;
    const allowed = getStepAllowedQualityIds();
    if (!allowed.includes(tutorialState.qualityId)) {
        tutorialState.qualityId = allowed[0];
    }
    chordTutorialQualityList.innerHTML = allowed.map((qualityId) => {
        const quality = TUTORIAL_QUALITY_BY_ID.get(qualityId);
        if (!quality) return "";
        const active = qualityId === tutorialState.qualityId;
        return `<button class="tutorial-chip ${active ? "active" : ""}" type="button" data-quality-id="${qualityId}">${quality.label}</button>`;
    }).join("");
};

const renderTutorialExampleOptions = () => {
    if (!chordTutorialExamples) return;
    const step = getTutorialStep();
    const examples = Array.isArray(step?.examples) ? step.examples : [];
    if (!examples.length) {
        chordTutorialExamples.innerHTML = '<span class="tutorial-chip muted">No examples for this step.</span>';
        return;
    }
    chordTutorialExamples.innerHTML = examples.map((entry) => {
        const safeQualityId = TUTORIAL_QUALITY_BY_ID.has(entry.qualityId) ? entry.qualityId : "maj";
        const label = getTutorialChordLabel({ rootPc: entry.rootPc, qualityId: safeQualityId });
        return `<button class="tutorial-chip example" type="button" data-root-pc="${entry.rootPc}" data-quality-id="${safeQualityId}">${label}</button>`;
    }).join("");
};

const refreshTutorialVisuals = () => {
    ensureTutorialKeyboard();
    renderTutorialCurrentText();
    renderTutorialPianoHighlight();
};

const playTutorialChordSpec = (spec = getTutorialActiveSpec()) => {
    const rendered = getTutorialRenderedChord(spec);
    if (!rendered || !rendered.noteIds.length) return;
    if (typeof App.audio?.stopAllNotes === "function") {
        App.audio.stopAllNotes();
    }
    if (typeof App.audio?.playNotes === "function") {
        App.audio.playNotes(rendered.noteIds, "simultaneous", undefined, {
            animate: false,
            durationOverride: Math.max(0.8, state.noteDuration)
        });
    }
};

const renderChordTutorialStep = () => {
    if (!chordTutorialStep || !chordTutorialProgress) return;
    const total = CHORD_TUTORIAL_STEPS.length;
    const step = getTutorialStep();
    if (!step) return;

    chordTutorialStep.innerHTML = `
        <div class="tutorial-step-title">${step.title}</div>
        <div class="tutorial-step-body">${step.body}</div>
    `;
    chordTutorialProgress.textContent = `Step ${tutorialState.stepIndex + 1}/${total}`;
    if (chordTutorialPrev) chordTutorialPrev.disabled = tutorialState.stepIndex <= 0;
    if (chordTutorialNext) chordTutorialNext.textContent = tutorialState.stepIndex >= total - 1 ? "Done" : "Next";
    renderTutorialRootOptions();
    renderTutorialQualityOptions();
    renderTutorialExampleOptions();
    refreshTutorialVisuals();
};

const closeChordTutorial = () => {
    if (!chordTutorialModal) return;
    chordTutorialModal.hidden = true;
    chordTutorialModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("tutorial-open");
    if (chordTutorialOpen && typeof chordTutorialOpen.focus === "function") {
        chordTutorialOpen.focus();
    }
};

const openChordTutorial = (stepIndex = 0) => {
    if (!chordTutorialModal) return;
    tutorialState.stepIndex = Number.isFinite(stepIndex) ? stepIndex : 0;
    tutorialState.hoverSpec = null;
    renderChordTutorialStep();
    chordTutorialModal.hidden = false;
    chordTutorialModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("tutorial-open");
};

if (chordTutorialOpen) {
    chordTutorialOpen.addEventListener("click", (event) => {
        event.preventDefault();
        openChordTutorial(0);
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

if (chordTutorialRootList) {
    chordTutorialRootList.addEventListener("click", (event) => {
        const chip = event.target.closest("[data-root-pc]");
        if (!chip) return;
        const rootPc = Number.parseInt(chip.dataset.rootPc, 10);
        if (!Number.isFinite(rootPc)) return;
        tutorialState.rootPc = ((rootPc % 12) + 12) % 12;
        tutorialState.hoverSpec = null;
        renderTutorialRootOptions();
        refreshTutorialVisuals();
    });
}

if (chordTutorialQualityList) {
    chordTutorialQualityList.addEventListener("click", (event) => {
        const chip = event.target.closest("[data-quality-id]");
        if (!chip) return;
        const qualityId = String(chip.dataset.qualityId ?? "");
        if (!TUTORIAL_QUALITY_BY_ID.has(qualityId)) return;
        tutorialState.qualityId = qualityId;
        tutorialState.hoverSpec = null;
        renderTutorialQualityOptions();
        refreshTutorialVisuals();
    });
}

if (chordTutorialExamples) {
    chordTutorialExamples.addEventListener("mouseover", (event) => {
        const chip = event.target.closest("[data-root-pc][data-quality-id]");
        if (!chip) return;
        const rootPc = Number.parseInt(chip.dataset.rootPc, 10);
        const qualityId = String(chip.dataset.qualityId ?? "");
        if (!Number.isFinite(rootPc) || !TUTORIAL_QUALITY_BY_ID.has(qualityId)) return;
        tutorialState.hoverSpec = { rootPc, qualityId };
        refreshTutorialVisuals();
    });
    chordTutorialExamples.addEventListener("mouseleave", () => {
        tutorialState.hoverSpec = null;
        refreshTutorialVisuals();
    });
    chordTutorialExamples.addEventListener("focusin", (event) => {
        const chip = event.target.closest("[data-root-pc][data-quality-id]");
        if (!chip) return;
        const rootPc = Number.parseInt(chip.dataset.rootPc, 10);
        const qualityId = String(chip.dataset.qualityId ?? "");
        if (!Number.isFinite(rootPc) || !TUTORIAL_QUALITY_BY_ID.has(qualityId)) return;
        tutorialState.hoverSpec = { rootPc, qualityId };
        refreshTutorialVisuals();
    });
    chordTutorialExamples.addEventListener("focusout", () => {
        tutorialState.hoverSpec = null;
        refreshTutorialVisuals();
    });
    chordTutorialExamples.addEventListener("click", (event) => {
        const chip = event.target.closest("[data-root-pc][data-quality-id]");
        if (!chip) return;
        const rootPc = Number.parseInt(chip.dataset.rootPc, 10);
        const qualityId = String(chip.dataset.qualityId ?? "");
        if (!Number.isFinite(rootPc) || !TUTORIAL_QUALITY_BY_ID.has(qualityId)) return;
        tutorialState.rootPc = ((rootPc % 12) + 12) % 12;
        tutorialState.qualityId = qualityId;
        tutorialState.hoverSpec = null;
        renderTutorialRootOptions();
        renderTutorialQualityOptions();
        refreshTutorialVisuals();
        playTutorialChordSpec({ rootPc: tutorialState.rootPc, qualityId: tutorialState.qualityId });
    });
}

if (chordTutorialPlay) {
    chordTutorialPlay.addEventListener("click", () => {
        playTutorialChordSpec();
    });
}

const isChordTypingCaptureActive = () => {
    if (!state.active || state.submitted) return false;
    if (!typingZone || typingZone.hidden) return false;
    if (!getIsChordRound()) return false;
    return state.trainingMode === "type" || state.trainingMode === "both";
};

const insertTypedCharacter = (character) => {
    if (!chordAnswerInput) return;
    chordAnswerInput.focus();
    const start = Number.isFinite(chordAnswerInput.selectionStart) ? chordAnswerInput.selectionStart : chordAnswerInput.value.length;
    const end = Number.isFinite(chordAnswerInput.selectionEnd) ? chordAnswerInput.selectionEnd : chordAnswerInput.value.length;
    chordAnswerInput.setRangeText(character, start, end, "end");
    chordAnswerInput.dispatchEvent(new Event("input", { bubbles: true }));
};

const tryPlayTypedChordPreview = () => {
    if (typeof App.game?.playTypedInputChord !== "function") return false;
    return App.game.playTypedInputChord();
};

const triggerPrimaryAction = () => {
    if (state.active && !state.submitted) {
        submitAnswer();
    } else {
        startRound(true);
    }
};

const triggerReplayAction = (event) => {
    if (updateReplayAvailability()) {
        if (!event.repeat && !holdState.active) {
            startHeldPlayback();
        }
    }
};

if (homeButton) {
    homeButton.addEventListener("click", () => {
        if (typeof App.settings?.goHome === "function") {
            App.settings.goHome();
        }
    });
}

const heroTitle = document.querySelector(".hero h1");
if (heroTitle) {
    heroTitle.setAttribute("role", "button");
    heroTitle.setAttribute("tabindex", "0");
    heroTitle.classList.add("hero-link");
    const goHomeAction = () => {
        if (typeof App.settings?.goHome === "function") {
            App.settings.goHome();
        }
    };
    heroTitle.addEventListener("click", goHomeAction);
    heroTitle.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            goHomeAction();
        }
    });
}

volumeSlider.addEventListener("dblclick", () => {
    setVolume(DEFAULTS.volume);
});

lengthSlider.addEventListener("dblclick", () => {
    setNoteLength(DEFAULTS.noteDuration);
});

keyCountSlider.addEventListener("dblclick", () => {
    pendingKeyCount = DEFAULTS.keyCount;
    setKeyCount(DEFAULTS.keyCount);
});

if (startNoteDownButton && startNoteUpButton && startNoteValue) {
    startNoteDownButton.addEventListener("click", () => {
        setStartMidi(state.startMidi - 1);
    });
    startNoteUpButton.addEventListener("click", () => {
        setStartMidi(state.startMidi + 1);
    });
}

if (startNoteDownOctButton && startNoteUpOctButton) {
    startNoteDownOctButton.addEventListener("click", () => {
        setStartMidi(state.startMidi - 12);
    });
    startNoteUpOctButton.addEventListener("click", () => {
        setStartMidi(state.startMidi + 12);
    });
}

noteCountInput.addEventListener("dblclick", () => {
    state.noteCount = DEFAULTS.noteCount;
    noteCountInput.value = String(DEFAULTS.noteCount);
    noteCountValue.textContent = `${DEFAULTS.noteCount} notes`;
    handleCriticalSettingChange();
    saveSettings();
});

attackSlider.addEventListener("dblclick", () => {
    setAdsrTrim("attack", 0);
});

decaySlider.addEventListener("dblclick", () => {
    setAdsrTrim("decay", 0);
});

releaseSlider.addEventListener("dblclick", () => {
    setAdsrTrim("release", 0);
});

sustainSlider.addEventListener("dblclick", () => {
    setAdsrTrim("length", 0);
});

if (profileSearch) {
    profileSearch.addEventListener("input", () => {
        renderResponseProfileBrowser();
    });
}

if (profileList) {
    profileList.addEventListener("click", (event) => {
        const row = event.target.closest(".profile-row");
        if (!row) return;
        setResponseProfileSelection(row.dataset.key);
    });
    profileList.addEventListener("dblclick", () => {
        applyResponseProfileSelection();
    });
    profileList.addEventListener("keydown", (event) => {
        const row = event.target.closest(".profile-row");
        if (!row) return;
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        setResponseProfileSelection(row.dataset.key);
        applyResponseProfileSelection();
    });
}

if (profileApply) {
    profileApply.addEventListener("click", () => {
        applyResponseProfileSelection();
    });
}

if (profileSave) {
    profileSave.addEventListener("click", () => {
        void promptSaveCurrentResponseProfile();
    });
}

if (instrumentPresetSearch) {
    instrumentPresetSearch.addEventListener("input", () => {
        renderInstrumentPresetBrowser();
    });
}

if (instrumentPresetList) {
    instrumentPresetList.addEventListener("click", (event) => {
        const row = event.target.closest(".sf2-row");
        if (!row) return;
        setInstrumentPresetSelection(row.dataset.key);
    });
    instrumentPresetList.addEventListener("dblclick", () => {
        void applyInstrumentPresetSelection();
    });
    instrumentPresetList.addEventListener("keydown", (event) => {
        const row = event.target.closest(".sf2-row");
        if (!row) return;
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        setInstrumentPresetSelection(row.dataset.key);
        void applyInstrumentPresetSelection();
    });
}

if (instrumentPresetApply) {
    instrumentPresetApply.addEventListener("click", () => {
        void applyInstrumentPresetSelection();
    });
}

advancedTrigger.addEventListener("click", (event) => {
    event.stopPropagation();
    if (advancedPanel.classList.contains("open")) {
        closeAdvanced();
    } else {
        openAdvanced();
    }
});

advancedPanel.addEventListener("click", (event) => {
    event.stopPropagation();
});

if (pianoTrigger) {
    pianoTrigger.addEventListener("click", (event) => {
        event.stopPropagation();
        if (pianoPanel.classList.contains("open")) {
            closePianoPanel();
        } else {
            closeAdvanced();
            openPianoPanel();
        }
    });
}

if (pianoPanel) {
    pianoPanel.addEventListener("click", (event) => {
        event.stopPropagation();
    });
}

if (instrumentBrowserTrigger) {
    instrumentBrowserTrigger.addEventListener("click", (event) => {
        event.stopPropagation();
        if (instrumentBrowserPanel.classList.contains("open")) {
            closeInstrumentBrowser();
        } else {
            closeAdvanced();
            closePianoPanel();
            openInstrumentBrowser();
        }
    });
}

if (instrumentBrowserPanel) {
    instrumentBrowserPanel.addEventListener("click", (event) => {
        event.stopPropagation();
    });
}

const bindPianoOptionEvents = () => {
    if (!pianoOptionsContainer) return;

    pianoOptionsContainer.addEventListener("click", (event) => {
        const previewButton = event.target.closest(".piano-preview");
        if (previewButton) {
            event.stopPropagation();
            const tone = previewButton.dataset.piano;
            playPianoPreview(tone);
            return;
        }
        const option = event.target.closest(".piano-option");
        if (!option) return;
        const tone = option.dataset.piano;
        setPianoTone(tone);
    });

    pianoOptionsContainer.addEventListener("keydown", (event) => {
        const option = event.target.closest(".piano-option");
        if (!option) return;
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        const tone = option.dataset.piano;
        setPianoTone(tone);
    });
};

if (pianoPreviewMain) {
    pianoPreviewMain.addEventListener("click", (event) => {
        event.stopPropagation();
        playPianoPreview(state.pianoTone);
    });
}

if (testEnvelopeButton) {
    testEnvelopeButton.addEventListener("click", () => {
        playPianoPreview(state.pianoTone);
    });
}

keyboardEl.addEventListener("pointerdown", (event) => {
    if (isChordTutorialOpen()) {
        event.preventDefault();
        return;
    }
    const key = event.target.closest(".key");
    if (!key) return;
    const noteId = key.dataset.note;
    pointerActiveNotes.set(event.pointerId, noteId);
    event.preventDefault();

    if (keyboardEl.classList.contains("disabled")) {
        return;
    }

    if (!state.active) {
        startManualNote(noteId, { playSound: true });
        return;
    }

    const willDeselect = !state.submitted && state.selectedNotes.includes(noteId);
    if (willDeselect) {
        toggleSelection(noteId);
        return;
    }
    const isTypingOnly = state.trainingMode === "type";
    const playSound = state.submitted || (!(state.blindMode || isTypingOnly) && !willDeselect);
    if (state.submitted && revealPlaying) {
        abortPlayback([noteId]);
    }
    startManualNote(noteId, { playSound });
    if (!state.submitted) {
        toggleSelection(noteId);
    }
});

document.addEventListener("pointerup", (event) => {
    const noteId = pointerActiveNotes.get(event.pointerId);
    if (!noteId) return;
    releaseManualNote(noteId);
    pointerActiveNotes.delete(event.pointerId);
});

document.addEventListener("pointercancel", (event) => {
    const noteId = pointerActiveNotes.get(event.pointerId);
    if (!noteId) return;
    releaseManualNote(noteId);
    pointerActiveNotes.delete(event.pointerId);
});

keyboardEl.addEventListener("click", (event) => {
    event.preventDefault();
});

document.addEventListener("keydown", (event) => {
    const tag = event.target.tagName;
    const chordInputFocused = event.target === chordAnswerInput;
    if (event.code === "Escape" && isChordTutorialOpen()) {
        event.preventDefault();
        closeChordTutorial();
        return;
    }
    if (isChordTutorialOpen()) {
        const insideTutorial = chordTutorialModal?.contains(event.target);
        if (event.code === "ArrowLeft" && insideTutorial) {
            event.preventDefault();
            if (chordTutorialPrev && !chordTutorialPrev.disabled) {
                chordTutorialPrev.click();
            }
            return;
        }
        if (event.code === "ArrowRight" && insideTutorial) {
            event.preventDefault();
            if (chordTutorialNext && !chordTutorialNext.disabled) {
                chordTutorialNext.click();
            }
            return;
        }
        if (!insideTutorial) {
            event.preventDefault();
            return;
        }
        return;
    }
    if (event.code === "Escape") {
        closeSettings();
        closeOptionsPanel();
        closeAdvanced();
        closePianoPanel();
        closeInstrumentBrowser();
    }

    if (chordInputFocused && event.code === "Space") {
        event.preventDefault();
        if (!tryPlayTypedChordPreview()) {
            triggerReplayAction(event);
        }
        return;
    }

    if (chordInputFocused && event.code === "Enter") {
        event.preventDefault();
        triggerPrimaryAction();
        return;
    }

    if (tag === "INPUT" || tag === "TEXTAREA") return;

    if (isChordTypingCaptureActive() && event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey && event.code !== "Space") {
        event.preventDefault();
        insertTypedCharacter(event.key);
        return;
    }

    if (!state.active && (event.code === "ShiftLeft" || event.code === "ShiftRight" || event.code === "ControlLeft" || event.code === "ControlRight")) {
        if (previewState.playing) {
            return;
        }
        pedalState.keysDown.add(event.code);
        if (!pedalState.active) {
            pedalState.active = true;
            pedalIcon.classList.add("active");
        }
    }

    if (event.code === "Space") {
        event.preventDefault();
        triggerReplayAction(event);
    }

    if (event.code === "Enter") {
        event.preventDefault();
        triggerPrimaryAction();
    }
});

document.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
        releaseHeldPlayback();
    }
    if (!state.active && (event.code === "ShiftLeft" || event.code === "ShiftRight" || event.code === "ControlLeft" || event.code === "ControlRight")) {
        if (previewState.playing) {
            return;
        }
        pedalState.keysDown.delete(event.code);
        if (!pedalState.keysDown.size) {
            pedalState.active = false;
            pedalIcon.classList.remove("active");
            releasePedalNotes();
        }
    }
});

const pedalBox = document.querySelector(".pedal-box");
if (pedalBox) {
    pedalBox.addEventListener("pointerdown", (event) => {
        if (isChordTutorialOpen()) return;
        if (state.active || previewState.playing) return;
        event.preventDefault();
        if (typeof pedalBox.setPointerCapture === "function") {
            pedalBox.setPointerCapture(event.pointerId);
        }
        startPedalHold();
    });
    pedalBox.addEventListener("pointerup", (event) => {
        if (isChordTutorialOpen()) return;
        if (state.active || previewState.playing) return;
        event.preventDefault();
        stopPedalHold();
        if (typeof pedalBox.releasePointerCapture === "function") {
            pedalBox.releasePointerCapture(event.pointerId);
        }
    });
    pedalBox.addEventListener("pointercancel", (event) => {
        if (isChordTutorialOpen()) return;
        if (state.active || previewState.playing) return;
        stopPedalHold();
        if (typeof pedalBox.releasePointerCapture === "function") {
            pedalBox.releasePointerCapture(event.pointerId);
        }
    });
    pedalBox.addEventListener("pointerleave", () => {
        if (isChordTutorialOpen()) return;
        if (state.active || previewState.playing) return;
        stopPedalHold();
    });
}

const setRandomBackgroundAngle = () => {
    const angle = Math.floor(Math.random() * 360);
    document.documentElement.style.setProperty("--bg-angle", `${angle}deg`);
};

const init = async () => {
    loadSettings();
    bindPianoOptionEvents();
    setRandomBackgroundAngle();
    renderKeyboard();
    setKeyboardEnabled(true);
    updateNoteCountMax();
    renderPianoOptions();
    applyUiFromState();
    if (typeof App.game?.updateTypedPreviewFromInput === "function") {
        App.game.updateTypedPreviewFromInput();
    }
    setPianoTone(state.pianoTone, { save: false, skipProfilePrompts: true });
    await refreshSoundfontCatalog();
    await refreshInstrumentPresetBrowser();
    refreshResponseProfileBrowser();
    setVolume(state.volume);
    setNoteLength(state.noteDuration);
    setKeyCount(state.keyCount, { delayOverrideMs: 0 });
    updateStatus();
    updateKeyStates();
    updateKeyboardScale();
    void ensureSoundfontReady(state.pianoTone);
};

init().catch((error) => {
    console.error("App initialization failed:", error);
});

Object.assign(App.events, { bindPianoOptionEvents, init, setRandomBackgroundAngle });
