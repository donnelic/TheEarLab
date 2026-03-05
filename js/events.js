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

if (hideLivePreviewToggle) {
    hideLivePreviewToggle.addEventListener("change", (event) => {
        state.hideLivePreview = Boolean(event.target.checked);
        updateStatus();
        saveSettings();
    });
}

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

if (typingRequireOctaveToggle) {
    typingRequireOctaveToggle.addEventListener("change", (event) => {
        state.typingRequireOctave = Boolean(event.target.checked);
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
    if (isChordTutorialOpen()) {
        fitTutorialLayout({ recompute: false });
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
    { id: "power5", label: "Power chord", suffix: "5", intervals: [0, 7], roles: ["R", "5"] },
    { id: "maj7", label: "Major 7", suffix: "maj7", intervals: [0, 4, 7, 11], roles: ["R", "3", "5", "7"] },
    { id: "m7", label: "Minor 7", suffix: "m7", intervals: [0, 3, 7, 10], roles: ["R", "b3", "5", "b7"] },
    { id: "dom7", label: "Dominant 7", suffix: "7", intervals: [0, 4, 7, 10], roles: ["R", "3", "5", "b7"] },
    { id: "nine", label: "Dominant 9", suffix: "9", intervals: [0, 4, 7, 10, 14], roles: ["R", "3", "5", "b7", "9"] },
    { id: "maj9", label: "Major 9", suffix: "maj9", intervals: [0, 4, 7, 11, 14], roles: ["R", "3", "5", "7", "9"] },
    { id: "m9", label: "Minor 9", suffix: "m9", intervals: [0, 3, 7, 10, 14], roles: ["R", "b3", "5", "b7", "9"] },
    { id: "six", label: "Major 6", suffix: "6", intervals: [0, 4, 7, 9], roles: ["R", "3", "5", "6"] },
    { id: "m6", label: "Minor 6", suffix: "m6", intervals: [0, 3, 7, 9], roles: ["R", "b3", "5", "6"] },
    { id: "add9", label: "Add9", suffix: "add9", intervals: [0, 2, 4, 7], roles: ["R", "2", "3", "5"] },
    { id: "sus2", label: "Sus2", suffix: "sus2", intervals: [0, 2, 7], roles: ["R", "2", "5"] },
    { id: "sus4", label: "Sus4", suffix: "sus4", intervals: [0, 5, 7], roles: ["R", "4", "5"] },
    { id: "dim", label: "Diminished", suffix: "dim", intervals: [0, 3, 6], roles: ["R", "b3", "b5"] },
    { id: "aug", label: "Augmented", suffix: "aug", intervals: [0, 4, 8], roles: ["R", "3", "#5"] }
];

const TUTORIAL_QUALITY_BY_ID = new Map(TUTORIAL_QUALITIES.map((entry) => [entry.id, entry]));
const TUTORIAL_ALL_ROOT_PCS = TUTORIAL_ROOTS.map((entry) => entry.pc);
const TUTORIAL_ALL_QUALITY_IDS = TUTORIAL_QUALITIES.map((entry) => entry.id);
const TUTORIAL_QUALITY_GROUPS = [
    { label: "Core Triads", ids: ["maj", "min", "power5"] },
    { label: "Suspended", ids: ["sus2", "sus4"] },
    { label: "6th / 7th", ids: ["six", "m6", "maj7", "m7", "dom7"] },
    { label: "9th / Add", ids: ["nine", "maj9", "m9", "add9"] },
    { label: "Altered", ids: ["dim", "aug"] }
];
const TUTORIAL_MIDI_START = 48; // C3
const TUTORIAL_MIDI_END = 86; // D6 (keeps C4-B4 roots stable while still fitting 9th extensions)
const TUTORIAL_FIXED_ROOT_PC = 0; // C
const TUTORIAL_FIXED_ROOT_MIDI = 60; // C4

const CHORD_TUTORIAL_STEPS = [
    {
        title: "1. Notes and Semitones",
        bodyHtml: `
            <p>A semitone is one adjacent key on the piano. Chords are built by stacking semitone distances above a root.</p>
            <p>Start on root <strong>C</strong> and try a few basic chord qualities to hear how one changed note changes the sound.</p>
        `,
        unlockedRootPcs: [0],
        unlockedQualityIds: ["maj", "min", "power5", "sus2", "sus4"]
    },
    {
        title: "2. Scales and Comparison",
        bodyHtml: `
            <p><strong>W</strong> means a whole step (2 keys/semitones). <strong>H</strong> means a half step (1 key/semitone).</p>
            <p>A major scale follows the pattern <strong>W-W-H-W-W-W-H</strong>, which means: move 2, 2, 1, 2, 2, 2, 1 keys.</p>
            <p>In C major, this lines up with the white keys: C, D, E, F, G, A, B.</p>
            <p>Now compare roots <strong>C</strong>, <strong>C#</strong>, and <strong>D</strong> with the same quality to hear transposition clearly.</p>
        `,
        unlockedRootPcs: [0, 1, 2],
        unlockedQualityIds: ["maj", "min", "power5", "sus2", "sus4"]
    },
    {
        title: "3. Major and Minor Triads",
        bodyHtml: `
            <p>A triad is root + 3rd + 5th.</p>
            <p><strong>Major</strong>: 0, 4, 7 semitones. <strong>Minor</strong>: 0, 3, 7 semitones.</p>
            <p>Use the newly enabled roots to compare how the same formula sounds in different keys.</p>
        `,
        unlockedRootPcs: [0, 1, 2, 4, 7],
        unlockedQualityIds: ["maj", "min"]
    },
    {
        title: "4. Suspended and Power Chords",
        bodyHtml: `
            <p><strong>Sus2</strong> replaces the 3rd with a 2nd: 0, 2, 7.</p>
            <p><strong>Sus4</strong> replaces the 3rd with a 4th: 0, 5, 7.</p>
            <p><strong>Power chord</strong> keeps only root and 5th: 0, 7.</p>
        `,
        unlockedRootPcs: [0, 1, 2, 4, 5, 7, 9],
        unlockedQualityIds: ["maj", "min", "sus2", "sus4", "power5"]
    },
    {
        title: "5. Diminished and Augmented",
        bodyHtml: `
            <p><strong>Diminished (dim)</strong>: 0, b3, b5. Example: Cdim = C-Eb-Gb.</p>
            <p><strong>Augmented (aug)</strong>: 0, 3, #5. Example: Caug = C-E-G#.</p>
            <p>These are tense colors used for motion and resolution.</p>
        `,
        unlockedRootPcs: [0, 1, 2, 4, 5, 7, 9, 11],
        unlockedQualityIds: ["maj", "min", "sus2", "sus4", "power5", "dim", "aug"]
    },
    {
        title: "6. 6th and 7th Chords",
        bodyHtml: `
            <p><strong>6</strong> adds scale degree 6. <strong>maj7</strong>, <strong>m7</strong>, and <strong>7</strong> add different 7ths.</p>
            <p>All root notes are now available so you can transpose every formula across the keyboard.</p>
        `,
        unlockedRootPcs: [...TUTORIAL_ALL_ROOT_PCS],
        unlockedQualityIds: ["maj", "min", "sus2", "sus4", "power5", "dim", "aug", "six", "m6", "maj7", "m7", "dom7"]
    },
    {
        title: "7. Extensions (9th)",
        bodyHtml: `
            <p><strong>9</strong> keeps the dominant 7 shell and adds the 9th on top.</p>
            <p>Example: C9 = C-E-G-Bb-D. Try different roots and compare the added color.</p>
        `,
        unlockedRootPcs: [...TUTORIAL_ALL_ROOT_PCS],
        unlockedQualityIds: [...TUTORIAL_ALL_QUALITY_IDS]
    },
    {
        title: "8. Chord Name Format",
        bodyHtml: `
            <p>Write chords as <strong>Root + Quality</strong>.</p>
            <p>Examples: C, Cm, C7, Cmaj7, Csus4, Cdim, Caug, F#m7, Bbmaj7.</p>
            <p>Buttons are grouped by chord family for clarity; full theory includes extra variants like <strong>m6</strong> and <strong>m9</strong>.</p>
            <p>Typing mode accepts compact forms and spaced forms. Enter submits. Space previews typed input when blind mode is off.</p>
        `,
        unlockedRootPcs: [...TUTORIAL_ALL_ROOT_PCS],
        unlockedQualityIds: [...TUTORIAL_ALL_QUALITY_IDS]
    }
];

const tutorialState = {
    stepIndex: 0,
    previousStepIndex: 0,
    rootPc: 0,
    qualityId: "maj",
    hoverSpec: null,
    previousUnlockedRootPcs: new Set(),
    previousUnlockedQualityIds: new Set(),
    pendingNewRoots: new Set(),
    pendingNewQualities: new Set(),
    keySpecs: [],
    keyElsByMidi: new Map(),
    previewToken: 0,
    fitClass: ""
};
let tutorialReturnFocusEl = null;

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
    if (typeof App.audio?.playPianoNote === "function" && typeof App.audio?.ensureAudio === "function") {
        const ctx = App.audio.ensureAudio();
        const start = ctx.currentTime + (SCHEDULE_LEAD || 0.02);
        const duration = Math.max(0.8, state.noteDuration);
        rendered.midis.forEach((midi, index) => {
            const frequency = 440 * Math.pow(2, (midi - 69) / 12);
            App.audio.playPianoNote(frequency, start, duration, 1, `tutorial-preview-${previewToken}-${index}`);
        });
        return;
    }
    if (typeof App.audio?.playNotes === "function" && rendered.noteIds.length) {
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
    refreshTutorialVisuals();
    fitTutorialLayout({ recompute: false });
};

const closeChordTutorial = () => {
    if (!chordTutorialModal) return;
    chordTutorialModal.hidden = true;
    chordTutorialModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("tutorial-open");
    const fallback = tutorialReturnFocusEl ?? chordTutorialOpen ?? typingHelpToggle ?? chordTutorialOpenOptions;
    if (fallback && typeof fallback.focus === "function") {
        fallback.focus();
    }
    tutorialReturnFocusEl = null;
};

const openChordTutorial = (stepIndex = 0, sourceEl = null) => {
    if (!chordTutorialModal) return;
    tutorialReturnFocusEl = sourceEl && typeof sourceEl.focus === "function" ? sourceEl : null;
    tutorialState.stepIndex = Number.isFinite(stepIndex) ? stepIndex : 0;
    tutorialState.previousStepIndex = tutorialState.stepIndex;
    tutorialState.hoverSpec = null;
    tutorialState.rootPc = TUTORIAL_FIXED_ROOT_PC;
    tutorialState.previousUnlockedRootPcs = new Set();
    tutorialState.previousUnlockedQualityIds = new Set();
    tutorialState.pendingNewRoots = new Set();
    tutorialState.pendingNewQualities = new Set();
    tutorialState.fitClass = "";
    chordTutorialModal.hidden = false;
    chordTutorialModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("tutorial-open");
    renderChordTutorialStep();
    requestAnimationFrame(() => fitTutorialLayout({ recompute: true }));
};

const registerTutorialOpenTrigger = (triggerEl, stepIndex = 0) => {
    if (!triggerEl) return;
    triggerEl.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        openChordTutorial(stepIndex, triggerEl);
    });
};

registerTutorialOpenTrigger(chordTutorialOpen, 0);
registerTutorialOpenTrigger(chordTutorialOpenOptions, 0);
registerTutorialOpenTrigger(typingHelpToggle, 0);

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
    chordTutorialRootList.addEventListener("mouseover", (event) => {
        const chip = event.target.closest("[data-root-pc]");
        if (!chip) return;
        const rootPc = Number.parseInt(chip.dataset.rootPc, 10);
        if (!isTutorialRootEnabled(rootPc)) return;
        const qualityId = TUTORIAL_QUALITY_BY_ID.has(tutorialState.qualityId) ? tutorialState.qualityId : "maj";
        setTutorialHoverSpec(rootPc, qualityId);
    });
    chordTutorialRootList.addEventListener("mouseleave", () => {
        clearTutorialHoverSpec();
    });
    chordTutorialRootList.addEventListener("focusin", (event) => {
        const chip = event.target.closest("[data-root-pc]");
        if (!chip) return;
        const rootPc = Number.parseInt(chip.dataset.rootPc, 10);
        if (!isTutorialRootEnabled(rootPc)) return;
        const qualityId = TUTORIAL_QUALITY_BY_ID.has(tutorialState.qualityId) ? tutorialState.qualityId : "maj";
        setTutorialHoverSpec(rootPc, qualityId);
    });
    chordTutorialRootList.addEventListener("focusout", () => {
        clearTutorialHoverSpec();
    });
    chordTutorialRootList.addEventListener("click", (event) => {
        const chip = event.target.closest("[data-root-pc]");
        if (!chip) return;
        const rootPc = Number.parseInt(chip.dataset.rootPc, 10);
        if (!Number.isFinite(rootPc)) return;
        if (!isTutorialRootEnabled(rootPc)) return;
        tutorialState.pendingNewRoots.delete(((rootPc % 12) + 12) % 12);
        tutorialState.rootPc = ((rootPc % 12) + 12) % 12;
        tutorialState.hoverSpec = null;
        syncTutorialRootChipStates();
        refreshTutorialVisuals();
        playTutorialChordSpec({ rootPc: tutorialState.rootPc, qualityId: tutorialState.qualityId });
    });
}

if (chordTutorialQualityList) {
    chordTutorialQualityList.addEventListener("mouseover", (event) => {
        const chip = event.target.closest("[data-quality-id]");
        if (!chip) return;
        const qualityId = String(chip.dataset.qualityId ?? "");
        if (!isTutorialQualityEnabled(qualityId)) return;
        setTutorialHoverSpec(tutorialState.rootPc, qualityId);
    });
    chordTutorialQualityList.addEventListener("mouseleave", () => {
        clearTutorialHoverSpec();
    });
    chordTutorialQualityList.addEventListener("focusin", (event) => {
        const chip = event.target.closest("[data-quality-id]");
        if (!chip) return;
        const qualityId = String(chip.dataset.qualityId ?? "");
        if (!isTutorialQualityEnabled(qualityId)) return;
        setTutorialHoverSpec(tutorialState.rootPc, qualityId);
    });
    chordTutorialQualityList.addEventListener("focusout", () => {
        clearTutorialHoverSpec();
    });
    chordTutorialQualityList.addEventListener("click", (event) => {
        const chip = event.target.closest("[data-quality-id]");
        if (!chip) return;
        const qualityId = String(chip.dataset.qualityId ?? "");
        if (!TUTORIAL_QUALITY_BY_ID.has(qualityId) || !isTutorialQualityEnabled(qualityId)) return;
        tutorialState.pendingNewQualities.delete(qualityId);
        tutorialState.qualityId = qualityId;
        tutorialState.hoverSpec = null;
        syncTutorialQualityChipStates();
        refreshTutorialVisuals();
        playTutorialChordSpec({ rootPc: tutorialState.rootPc, qualityId: tutorialState.qualityId });
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
            const canReplaySelection = state.trainingMode === "both" && state.selectedNotes.length > 0;
            if (canReplaySelection) {
                triggerReplayAction(event);
            } else {
                resultEl.textContent = "Type a valid chord or select notes first.";
            }
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
    refreshResponseProfileBrowser();
    setVolume(state.volume);
    setNoteLength(state.noteDuration);
    setKeyCount(state.keyCount, { delayOverrideMs: 0 });
    updateStatus();
    updateKeyStates();
    updateKeyboardScale();

    const runDeferredCatalogLoad = () => {
        void (async () => {
            try {
                await refreshSoundfontCatalog({ loadAllPacks: false });
                void ensureSoundfontReady(state.pianoTone);
            } catch (error) {
                console.warn("Deferred soundfont load failed:", error);
            }
        })();
    };

    if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(() => runDeferredCatalogLoad(), { timeout: 1200 });
    } else {
        setTimeout(runDeferredCatalogLoad, 60);
    }
};

init().catch((error) => {
    console.error("App initialization failed:", error);
});

Object.assign(App.events, { bindPianoOptionEvents, init, setRandomBackgroundAngle });
