var App = window.App || (window.App = {});
App.events = App.events || {};

let audioPrimedFromGesture = false;
const primeAudioFromGesture = () => {
    if (audioPrimedFromGesture) return;
    audioPrimedFromGesture = true;
    if (typeof App.audio?.ensureAudio === "function") {
        App.audio.ensureAudio({ resume: true });
    }
    document.removeEventListener("pointerdown", primeAudioFromGesture, true);
    document.removeEventListener("keydown", primeAudioFromGesture, true);
    document.removeEventListener("touchstart", primeAudioFromGesture, true);
};

document.addEventListener("pointerdown", primeAudioFromGesture, true);
document.addEventListener("keydown", primeAudioFromGesture, true);
document.addEventListener("touchstart", primeAudioFromGesture, true);

const ROUND_RESTART_POLICY_BY_SETTING = Object.freeze({
    playbackOrder: () => state.active,
    trainingMode: () => state.active && getEventsChordRound(),
    chordDifficulty: () => state.active && getEventsChordRound(),
    chordRootHint: () => false,
    customCursorEnabled: () => false
});

const shouldRestartRoundForSetting = (settingKey) => {
    const resolver = ROUND_RESTART_POLICY_BY_SETTING[settingKey];
    return typeof resolver === "function" ? Boolean(resolver()) : false;
};

const patchSettingsState = (patch, mutation = "events/settings-patch") => {
    if (typeof App.settings?.applySettingsStatePatch === "function") {
        App.settings.applySettingsStatePatch(patch, mutation);
        return;
    }
    Object.assign(state, patch || {});
};

const applySettingMutationEffects = (
    settingKey,
    {
        save = true,
        refreshStatus = true,
        refreshKeys = true,
        restartOverride = null,
        restartDelayMs = 200
    } = {}
) => {
    if (refreshStatus) {
        updateStatus();
    }
    if (refreshKeys) {
        updateKeyStates();
    }
    const shouldRestart = restartOverride === null
        ? shouldRestartRoundForSetting(settingKey)
        : Boolean(restartOverride);
    if (shouldRestart) {
        handleCriticalSettingChange(restartDelayMs);
    }
    if (save) {
        saveSettings();
    }
};

const ROOT_HELPER_LABEL = (App.uiCopy?.helpers?.rootNote || "Root note");

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
        const nextMode = button.dataset.mode === "ascending" ? "ascending" : "simultaneous";
        if (state.mode === nextMode && button.classList.contains("active")) {
            return;
        }
        segmentedButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        patchSettingsState({ mode: nextMode }, "events/playback-order");
        applySettingMutationEffects("playbackOrder", {
            refreshKeys: false
        });
    });
});

quickModeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const mode = String(button.dataset.quickMode ?? "").trim();
        if (!["random", "nice", "chord"].includes(mode)) return;
        setPracticeMode(mode);
        void startRound(true);
    });
});

blindToggle.addEventListener("change", (event) => {
    patchSettingsState({ blindMode: event.target.checked }, "events/blind-mode");
    applySettingMutationEffects("blindMode", {
        refreshKeys: false,
        restartOverride: false
    });
});

if (hideLivePreviewToggle) {
    hideLivePreviewToggle.addEventListener("change", (event) => {
        patchSettingsState({ hideLivePreview: Boolean(event.target.checked) }, "events/hide-live-preview");
        applySettingMutationEffects("hideLivePreview", {
            refreshKeys: false,
            restartOverride: false
        });
    });
}

niceNotesToggle.addEventListener("change", (event) => {
    if (event.target.checked) {
        setPracticeMode("nice");
    } else if (getEffectivePracticeMode() === "nice") {
        setPracticeMode("random");
    } else {
        patchSettingsState({ niceMode: false }, "events/nice-mode");
        updateNoteCountMax();
        applySettingMutationEffects("niceMode", {
            refreshKeys: false,
            restartOverride: false
        });
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
        patchSettingsState({
            trainingMode: getEffectivePracticeMode() === "chord" ? next : "keyboard"
        }, "events/training-mode");
        refreshOptionsModeVisibility();
        if (typeof App.game?.clearTypingAutoNext === "function") {
            App.game.clearTypingAutoNext();
        }
        applySettingMutationEffects("trainingMode");
    });
}

if (chordDifficultySelect) {
    chordDifficultySelect.addEventListener("change", (event) => {
        const value = String(event.target.value ?? "").trim().toLowerCase();
        patchSettingsState({
            chordDifficulty: value === "playful"
            ? "voiced"
            : (["easy", "medium", "voiced", "hard"].includes(value)
                ? value
                : DEFAULTS.chordDifficulty)
        }, "events/chord-difficulty");
        setKeyCount(state.keyCount, { preview: true, source: "system" });
        applySettingMutationEffects("chordDifficulty", {
            refreshKeys: false
        });
    });
}

if (chordExtraHelpersToggle) {
    chordExtraHelpersToggle.addEventListener("change", (event) => {
        patchSettingsState({ chordExtraHelpers: Boolean(event.target.checked) }, "events/chord-extra-helpers");
        applySettingMutationEffects("chordExtraHelpers", {
            refreshKeys: false,
            restartOverride: false
        });
    });
}

if (chordRootHintToggle) {
    chordRootHintToggle.addEventListener("change", (event) => {
        const nextValue = Boolean(event.target.checked);
        patchSettingsState({
            chordRootHint: nextValue,
            rootHintSuppressed: false
        }, "events/chord-root-hint");
        if (typeof App.game?.setRootHelperPinned === "function") {
            App.game.setRootHelperPinned();
        }
        applySettingMutationEffects("chordRootHint", {
            restartOverride: false
        });
    });
}

if (customCursorToggle) {
    customCursorToggle.addEventListener("change", (event) => {
        patchSettingsState({ customCursorEnabled: Boolean(event.target.checked) }, "events/custom-cursor");
        applySettingMutationEffects("customCursorEnabled", {
            refreshStatus: false,
            refreshKeys: false,
            restartOverride: false
        });
        applyCustomCursorMediaState();
    });
}

if (typingShowPianoToggle) {
    typingShowPianoToggle.addEventListener("change", (event) => {
        patchSettingsState({ typingShowPiano: Boolean(event.target.checked) }, "events/typing-show-piano");
        refreshOptionsModeVisibility();
        applySettingMutationEffects("typingShowPiano", {
            restartOverride: false
        });
    });
}

if (typingShowTypedToggle) {
    typingShowTypedToggle.addEventListener("change", (event) => {
        patchSettingsState({ typingShowTyped: Boolean(event.target.checked) }, "events/typing-show-typed");
        refreshOptionsModeVisibility();
        if (typeof App.game?.updateTypedPreviewFromInput === "function") {
            App.game.updateTypedPreviewFromInput();
        }
        applySettingMutationEffects("typingShowTyped", {
            restartOverride: false
        });
    });
}

resetSettingsButton.addEventListener("click", () => {
    resetAllSettings();
    rebuildKeyboard();
    updateNoteCountMax();
    applyUiFromState();
    setVolume(state.volume);
    void setPianoTone(state.pianoTone, { save: false, skipProfilePrompts: true });
    setNoteLength(state.noteDuration);
    setKeyCount(state.keyCount, { preview: true });
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
    patchSettingsState({
        theme: state.theme === "dark" ? "light" : "dark"
    }, "events/theme");
    document.body.classList.toggle("theme-dark", state.theme === "dark");
    themeToggle.setAttribute("aria-pressed", state.theme === "dark");
    saveSettings();
});

if (homeToggle) {
    homeToggle.addEventListener("click", (event) => {
        event.stopPropagation();
        closeSettings();
        if (typeof App.game?.goHome === "function") {
            App.game.goHome();
        }
    });
}

settingsPanel.addEventListener("click", (event) => {
    const openPanelKey = typeof getOpenFloatingPanelKey === "function"
        ? getOpenFloatingPanelKey()
        : null;
    if (openPanelKey) {
        const panelRefs = {
            advanced: { panel: advancedPanel, trigger: advancedTrigger },
            piano: { panel: pianoPanel, trigger: pianoTrigger },
            instrument: { panel: instrumentBrowserPanel, trigger: instrumentBrowserTrigger }
        };
        const refs = panelRefs[openPanelKey];
        if (refs?.panel && refs?.trigger) {
            const clickedInsideOpenPanel = refs.panel.contains(event.target) || refs.trigger.contains(event.target);
            if (!clickedInsideOpenPanel) {
                closeAllFloatingPanels();
            }
        }
    }
    event.stopPropagation();
});

if (optionsTrigger) {
    optionsTrigger.addEventListener("click", (event) => {
        event.stopPropagation();
        openGameSettingsModalUi(optionsTrigger);
    });
}

if (gameSettingsOpen) {
    gameSettingsOpen.addEventListener("click", (event) => {
        event.preventDefault();
        openGameSettingsModalUi(gameSettingsOpen);
    });
}

if (gameSettingsBackdrop) {
    gameSettingsBackdrop.addEventListener("click", (event) => {
        event.preventDefault();
        closeGameSettingsModalUi();
    });
}

if (gameSettingsClose) {
    gameSettingsClose.addEventListener("click", (event) => {
        event.preventDefault();
        closeGameSettingsModalUi();
    });
}

document.addEventListener("click", () => {
    closeSettings();
});

window.addEventListener("resize", () => {
    updateKeyboardScale();
    if (typeof repositionOpenFloatingPanels === "function") {
        repositionOpenFloatingPanels();
    }
    if (isChordTutorialOpen()) {
        fitTutorialLayout({ recompute: false });
        fitTutorialProgressTabs();
    }
    markHelperIndicatorDirty();
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

const adjustKeyCount = (delta) => {
    const base = Number.isFinite(state.keyCount) ? state.keyCount : DEFAULTS.keyCount;
    setKeyCount(base + delta);
};

const bindKeyCountStepper = (down, up, downOct, upOct) => {
    if (down) down.addEventListener("click", () => adjustKeyCount(-1));
    if (up) up.addEventListener("click", () => adjustKeyCount(1));
    if (downOct) downOct.addEventListener("click", () => adjustKeyCount(-12));
    if (upOct) upOct.addEventListener("click", () => adjustKeyCount(12));
};

bindKeyCountStepper(keyCountDown, keyCountUp, keyCountDownOct, keyCountUpOct);
bindKeyCountStepper(gameKeyCountDown, gameKeyCountUp, gameKeyCountDownOct, gameKeyCountUpOct);

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
        tabLabel: "Notes",
        bodyHtml: `
            <p>A semitone is one adjacent key on the piano. Chords are built by stacking semitone distances above a root.</p>
            <p>Start on root <strong>C</strong> and try a few basic chord qualities to hear how one changed note changes the sound.</p>
        `,
        unlockedRootPcs: [0],
        unlockedQualityIds: ["maj", "min", "power5", "sus2", "sus4"]
    },
    {
        title: "2. Scales and Comparison",
        tabLabel: "Scales",
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
        tabLabel: "Triads",
        bodyHtml: `
            <p>A triad is the simplest full chord: root + 3rd + 5th, stacked by skipping one scale tone at a time.</p>
            <p><strong>Major</strong> uses a major 3rd (4 semitones) + perfect 5th (7). It feels bright and settled.</p>
            <p><strong>Minor</strong> lowers the 3rd by one semitone (0, 3, 7), giving a darker, more tense color.</p>
            <p>Use the newly enabled roots to hear how the quality stays the same while the key changes.</p>
        `,
        unlockedRootPcs: [0, 1, 2, 4, 7],
        unlockedQualityIds: ["maj", "min"]
    },
    {
        title: "4. Suspended and Power Chords",
        tabLabel: "Sus/Power",
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
        tabLabel: "Dim/Aug",
        bodyHtml: `
            <p><strong>Diminished (dim)</strong>: 0, b3, b5. Example: Cdim = C-Eb-Gb.</p>
            <p><strong>Augmented (aug)</strong>: 0, 4, 8 (R, 3, #5). Example: Caug = C-E-G#.</p>
            <p>These are tense colors used for motion and resolution.</p>
        `,
        unlockedRootPcs: [0, 1, 2, 4, 5, 7, 9, 11],
        unlockedQualityIds: ["maj", "min", "sus2", "sus4", "power5", "dim", "aug"]
    },
    {
        title: "6. 6th and 7th Chords",
        tabLabel: "6th/7th",
        bodyHtml: `
            <p><strong>6</strong> adds scale degree 6. <strong>maj7</strong>, <strong>m7</strong>, and <strong>7</strong> add different 7ths.</p>
            <p>All root notes are now available so you can transpose every formula across the keyboard.</p>
        `,
        unlockedRootPcs: [...TUTORIAL_ALL_ROOT_PCS],
        unlockedQualityIds: ["maj", "min", "sus2", "sus4", "power5", "dim", "aug", "six", "m6", "maj7", "m7", "dom7"]
    },
    {
        title: "7. Extensions (9th)",
        tabLabel: "9ths",
        bodyHtml: `
            <p><strong>9</strong> keeps the dominant 7 shell and adds the 9th on top.</p>
            <p>Example: C9 = C-E-G-Bb-D. Try different roots and compare the added color.</p>
        `,
        unlockedRootPcs: [...TUTORIAL_ALL_ROOT_PCS],
        unlockedQualityIds: [...TUTORIAL_ALL_QUALITY_IDS]
    },
    {
        title: "8. Chord Name Format",
        tabLabel: "Naming",
        bodyHtml: `
            <p>Write chords as <strong>Root + Quality</strong>.</p>
            <p>Examples: C, Cm, C7, Cmaj7, Csus4, Cdim, Caug, F#m7, Bbmaj7.</p>
            <p>Optional: add octave as a prefix (example: <strong>3A#m</strong>, <strong>4Cmaj7</strong>). If included, octave is checked.</p>
            <p>Buttons are grouped by chord family for clarity; full theory includes extra variants like <strong>m6</strong> and <strong>m9</strong>.</p>
            <p>Typing mode accepts compact forms and spaced forms. Enter submits. Space previews typed input when blind mode is off.</p>
        `,
        unlockedRootPcs: [...TUTORIAL_ALL_ROOT_PCS],
        unlockedQualityIds: [...TUTORIAL_ALL_QUALITY_IDS]
    }
];

const TUTORIAL_QUALITY_STEP_INDEX = Object.freeze({
    maj: 2,
    min: 2,
    power5: 3,
    sus2: 3,
    sus4: 3,
    dim: 4,
    aug: 4,
    six: 5,
    m6: 5,
    maj7: 5,
    m7: 5,
    dom7: 5,
    nine: 6,
    maj9: 6,
    m9: 6,
    add9: 6
});

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
let suppressChordBubbleTimer = null;

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
    const fallback = cameFromChordLink
        ? (typingHelpToggle ?? chordTutorialOpenOptions)
        : (tutorialReturnFocusEl ?? typingHelpToggle ?? chordTutorialOpenOptions);
    if (fallback && typeof fallback.focus === "function") {
        fallback.focus();
    }
    tutorialReturnFocusEl = null;
};

const openChordTutorial = (stepIndex = 0, sourceEl = null, options = {}) => {
    if (!chordTutorialModal) return;
    const { qualityId = null, rootPc = null } = options;
    tutorialReturnFocusEl = sourceEl && typeof sourceEl.focus === "function" ? sourceEl : null;
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

const registerTutorialOpenTrigger = (triggerEl, stepIndex = 0) => {
    if (!triggerEl) return;
    triggerEl.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        openChordTutorial(stepIndex, triggerEl);
    });
};

const openChordTutorialForChordLink = (linkEl) => {
    if (!linkEl) return;
    const qualityId = String(linkEl.dataset.qualityId || "");
    if (!qualityId) return;
    const rootPc = Number.parseInt(linkEl.dataset.rootPc, 10);
    const stepIndex = getTutorialStepIndexForQuality(qualityId);
    openChordTutorial(stepIndex, linkEl, {
        qualityId,
        rootPc: Number.isFinite(rootPc) ? rootPc : null
    });
};

const handleChordLinkActivation = (event) => {
    const isKeyboard = event.type === "keydown";
    if (isKeyboard && !["Enter", " "].includes(event.key)) return;
    const linkEl = event.target.closest(".chord-link");
    if (!linkEl) return;
    event.preventDefault();
    openChordTutorialForChordLink(linkEl);
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

const syncHelperPinnedUi = (helperItem) => {
    if (!helperItem) return;
    const label = helperItem.dataset?.helperLabel;
    if (!label || typeof App.game?.getHelperPinFlags !== "function") return;
    const flags = App.game.getHelperPinFlags(label);
    helperItem.classList.toggle("pinned", Boolean(flags.pinnedGlobal));
    helperItem.classList.toggle("latched", Boolean(flags.pinnedLocal));
    helperItem.setAttribute("aria-pressed", flags.pinned ? "true" : "false");
    return flags;
};

const shouldBlurAfterUnpin = (event) => {
    if (!event) return false;
    if (event.type === "keydown") return false;
    if (typeof event.clientX === "number" || typeof event.pointerType === "string") return true;
    return ["click", "contextmenu"].includes(event.type);
};

const toggleRootHintFromHelper = () => {
    const nextValue = !state.chordRootHint;
    patchSettingsState({
        chordRootHint: nextValue,
        rootHintSuppressed: false
    }, "events/chord-root-hint-helper");
    if (chordRootHintToggle) {
        chordRootHintToggle.checked = nextValue;
    }
    if (typeof App.game?.setRootHelperPinned === "function") {
        App.game.setRootHelperPinned();
    }
    applySettingMutationEffects("chordRootHint", {
        refreshStatus: false,
        restartOverride: false
    });
    return true;
};

const toggleHelperPinned = (helperItem, { persistent = false, event = null } = {}) => {
    if (!helperItem) return false;
    const label = helperItem.dataset?.helperLabel;
    if (!label) return false;
    let toggled = false;
    if (persistent && label === ROOT_HELPER_LABEL) {
        toggled = toggleRootHintFromHelper();
    } else {
        const toggleFn = persistent ? App.game?.toggleHelperPinGlobal : App.game?.toggleHelperPinLocal;
        if (typeof toggleFn !== "function") return false;
        toggled = toggleFn(label);
    }
    if (toggled) {
        const flags = syncHelperPinnedUi(helperItem);
        const shouldBlur = flags
            && !flags.pinned
            && shouldBlurAfterUnpin(event)
            && document.activeElement === helperItem;
        if (shouldBlur) {
            helperItem.blur();
        }
    }
    return toggled;
};

const handleHelperPinEvent = (event, { persistent = false } = {}) => {
    const helperItem = event.target?.closest?.(".helper-item");
    if (!helperItem) return;
    if (toggleHelperPinned(helperItem, { persistent, event })) {
        event.preventDefault();
    }
};

document.addEventListener("click", (event) => handleHelperPinEvent(event));

document.addEventListener("keydown", (event) => {
    if (!["Enter", " "].includes(event.key)) return;
    handleHelperPinEvent(event);
});

document.addEventListener("contextmenu", (event) => handleHelperPinEvent(event, { persistent: true }));

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

const EVENTS_MODE_POLICY = App.modePolicy || {};
const EVENTS_ACTION_COPY = App.uiCopy?.actions || {};
const isEventsTypingEnabled = () => EVENTS_MODE_POLICY.isTypingEnabledFromState
    ? EVENTS_MODE_POLICY.isTypingEnabledFromState(state)
    : (state.trainingMode === "type" || state.trainingMode === "both");
const isEventsTypingOnlyMode = () => EVENTS_MODE_POLICY.isTypingOnlyModeFromState
    ? EVENTS_MODE_POLICY.isTypingOnlyModeFromState(state)
    : state.trainingMode === "type";
const getEventsChordRound = () => EVENTS_MODE_POLICY.getIsChordRoundFromState
    ? EVENTS_MODE_POLICY.getIsChordRoundFromState(state)
    : (isEventsTypingEnabled() || state.chordMode);

const isChordTypingCaptureActive = () => {
    if (!state.active || state.submitted) return false;
    if (!typingZone || typingZone.hidden) return false;
    if (!getEventsChordRound()) return false;
    return isEventsTypingEnabled();
};

const insertTypedCharacter = (character) => {
    if (!chordAnswerInput) return;
    chordAnswerInput.focus();
    const start = Number.isFinite(chordAnswerInput.selectionStart) ? chordAnswerInput.selectionStart : chordAnswerInput.value.length;
    const end = Number.isFinite(chordAnswerInput.selectionEnd) ? chordAnswerInput.selectionEnd : chordAnswerInput.value.length;
    chordAnswerInput.setRangeText(character, start, end, "end");
    chordAnswerInput.dispatchEvent(new Event("input", { bubbles: true }));
};

let lastPrimaryActionAt = 0;
const triggerPrimaryAction = () => {
    const now = performance.now();
    if (now - lastPrimaryActionAt < 140) return;
    lastPrimaryActionAt = now;
    if (state.active && !state.submitted) {
        submitAnswer();
    } else {
        void startRound(true);
    }
};

let pointerActivatedControl = null;
const getButtonLikeTarget = (target) => target?.closest?.("button,[role=\"button\"],a[href]") ?? null;
const blurPointerActivatedControl = () => {
    if (!pointerActivatedControl) return;
    const control = pointerActivatedControl;
    pointerActivatedControl = null;
    if (document.activeElement === control && typeof control.blur === "function") {
        control.blur();
    }
};
const CUSTOM_CURSOR_QUERY = window.matchMedia("(hover: hover) and (pointer: fine)");
const SYSTEM_CURSOR_HIDE_CLASS = "system-cursor-hidden";
const HELPER_INDICATOR_RADIUS = 60;
let customCursorEnabled = false;
let customCursorEl = null;
let customCursorX = -100;
let customCursorY = -100;
let customCursorRenderX = -100;
let customCursorRenderY = -100;
let customCursorSmoothing = 0.35;
let customCursorVisible = false;
let customCursorPressed = false;
let customCursorMode = "default";
let customCursorFrame = null;
let customCursorMotionFrame = null;
const helperIndicatorState = {
    items: [],
    cache: null,
    dirty: true,
    frame: null,
    lastX: null,
    lastY: null,
    active: false,
    observer: null
};
let helperZoneActive = false;

const markHelperIndicatorDirty = () => {
    helperIndicatorState.dirty = true;
    helperIndicatorState.cache = null;
};

const getHelperIndicatorItems = () => {
    if (!helperSlotEl) {
        helperIndicatorState.items = [];
        return helperIndicatorState.items;
    }
    const items = helperIndicatorState.items;
    if (items.length && items.every((item) => item?.isConnected)) {
        return items;
    }
    helperIndicatorState.items = Array.from(helperSlotEl.querySelectorAll(".helper-item"));
    markHelperIndicatorDirty();
    return helperIndicatorState.items;
};

const setHelperIndicatorActive = (active, items = getHelperIndicatorItems()) => {
    if (!items.length) {
        helperIndicatorState.active = false;
        return;
    }
    const opacity = active ? "1" : "0";
    items.forEach((item) => {
        item.style.setProperty("--helper-cursor-opacity", opacity);
    });
    helperIndicatorState.active = active;
};

const ensureHelperIndicatorObserver = () => {
    if (helperIndicatorState.observer || !helperSlotEl) return;
    helperIndicatorState.observer = new MutationObserver(markHelperIndicatorDirty);
    helperIndicatorState.observer.observe(helperSlotEl, { childList: true, subtree: true });
};

const getHelperIndicatorCache = () => {
    ensureHelperIndicatorObserver();
    const items = getHelperIndicatorItems();
    if (!items.length) return null;
    if (!helperIndicatorState.dirty && helperIndicatorState.cache) {
        return helperIndicatorState.cache;
    }
    const list = helperSlotEl?.querySelector(".helper-list");
    if (!list) return null;
    const listRect = list.getBoundingClientRect();
    if (!listRect.width || !listRect.height) return null;
    const listStyle = window.getComputedStyle(list);
    const gapValue = Number.parseFloat(listStyle.columnGap || listStyle.gap || listStyle.rowGap || 0);
    const gapMargin = Number.isFinite(gapValue) ? gapValue : 0;
    const rects = items.map((item) => item.getBoundingClientRect());
    const expandedRect = {
        left: listRect.left - HELPER_INDICATOR_RADIUS,
        right: listRect.right + HELPER_INDICATOR_RADIUS,
        top: listRect.top - HELPER_INDICATOR_RADIUS,
        bottom: listRect.bottom + HELPER_INDICATOR_RADIUS
    };
    const cursorHoldRect = {
        left: listRect.left - gapMargin,
        right: listRect.right + gapMargin,
        top: listRect.top - gapMargin,
        bottom: listRect.bottom + gapMargin
    };
    helperIndicatorState.cache = {
        items,
        rects,
        expandedRect,
        cursorHoldRect
    };
    helperIndicatorState.dirty = false;
    return helperIndicatorState.cache;
};

const updateHelperIndicatorPositions = (cache, x, y) => {
    if (!cache) return;
    cache.items.forEach((item, index) => {
        const rect = cache.rects[index];
        if (!rect || !rect.width || !rect.height) return;
        const localX = x - rect.left;
        const localY = y - rect.top;
        item.style.setProperty("--helper-cursor-x", `${Math.round(localX)}px`);
        item.style.setProperty("--helper-cursor-y", `${Math.round(localY)}px`);
    });
};

const scheduleHelperIndicatorUpdate = (cache, event) => {
    helperIndicatorState.lastX = event.clientX;
    helperIndicatorState.lastY = event.clientY;
    if (helperIndicatorState.frame !== null) return;
    helperIndicatorState.frame = requestAnimationFrame(() => {
        helperIndicatorState.frame = null;
        if (!helperIndicatorState.active) return;
        const latestCache = getHelperIndicatorCache() || cache;
        if (!latestCache) return;
        if (helperIndicatorState.lastX === null || helperIndicatorState.lastY === null) return;
        updateHelperIndicatorPositions(latestCache, helperIndicatorState.lastX, helperIndicatorState.lastY);
    });
};

const isPointerInsideRect = (event, rect) => {
    if (!rect || !event) return false;
    return event.clientX >= rect.left
        && event.clientX <= rect.right
        && event.clientY >= rect.top
        && event.clientY <= rect.bottom;
};

const handleHelperIndicatorProximity = (event) => {
    if (!event || typeof event.clientX !== "number" || typeof event.clientY !== "number") return;
    const cache = getHelperIndicatorCache();
    if (!cache) {
        if (helperIndicatorState.active) setHelperIndicatorActive(false);
        helperZoneActive = false;
        if (customCursorEnabled) {
            const nextMode = getCustomCursorMode(event.target);
            if (nextMode !== customCursorMode) {
                customCursorMode = nextMode;
                scheduleCustomCursorRender();
            }
        } else {
            document.body.classList.remove(SYSTEM_CURSOR_HIDE_CLASS);
        }
        return;
    }
    const insideIndicatorRect = isPointerInsideRect(event, cache.expandedRect);
    const insideCursorRect = isPointerInsideRect(event, cache.cursorHoldRect);
    helperZoneActive = insideIndicatorRect;
    if (insideIndicatorRect) {
        if (!helperIndicatorState.active) setHelperIndicatorActive(true, cache.items);
        scheduleHelperIndicatorUpdate(cache, event);
    } else if (helperIndicatorState.active) {
        setHelperIndicatorActive(false, cache.items);
    }
    if (!customCursorEnabled) {
        document.body.classList.toggle(SYSTEM_CURSOR_HIDE_CLASS, insideCursorRect);
    } else {
        const nextMode = getCustomCursorMode(event.target);
        if (nextMode !== customCursorMode) {
            customCursorMode = nextMode;
            scheduleCustomCursorRender();
        }
    }
};

const ensureCustomCursorEl = () => {
    if (customCursorEl?.isConnected) return customCursorEl;
    const cursor = document.createElement("div");
    cursor.className = "app-cursor";
    cursor.setAttribute("aria-hidden", "true");

    const ring = document.createElement("div");
    ring.className = "app-cursor-ring";
    cursor.appendChild(ring);

    const dot = document.createElement("div");
    dot.className = "app-cursor-dot";
    cursor.appendChild(dot);

    document.body.appendChild(cursor);
    customCursorEl = cursor;
    return cursor;
};
const getCustomCursorMode = (target) => {
    if (helperZoneActive) return "helper";
    if (!(target instanceof Element)) return "default";
    if (target.closest("input[type=\"text\"], input[type=\"search\"], input[type=\"email\"], input[type=\"password\"], textarea, [contenteditable=\"true\"]")) {
        return "text";
    }
    if (target.closest("button, [role=\"button\"], a[href], input, select, label.switch, .key, .piano-option, .sf2-row, .profile-row, .tutorial-chip, [tabindex]:not([tabindex=\"-1\"])")) {
        return "interactive";
    }
    return "default";
};
const syncCustomCursorState = () => {
    if (!customCursorEnabled || !customCursorEl) return;
    customCursorEl.classList.toggle("is-interactive", customCursorMode === "interactive");
    customCursorEl.classList.toggle("is-text", customCursorMode === "text");
    customCursorEl.classList.toggle("is-helper", customCursorMode === "helper");
    customCursorEl.classList.toggle("is-pressed", customCursorPressed);
};
const renderCustomCursor = () => {
    customCursorFrame = null;
    if (!customCursorEnabled) return;
    const cursor = ensureCustomCursorEl();
    cursor.classList.toggle("visible", customCursorVisible);
    syncCustomCursorState();
};
const scheduleCustomCursorRender = () => {
    if (customCursorFrame !== null) return;
    customCursorFrame = requestAnimationFrame(renderCustomCursor);
};

const scheduleCursorMotion = () => {
    if (customCursorMotionFrame !== null) return;
    customCursorMotionFrame = requestAnimationFrame(stepCursorMotion);
};

const stepCursorMotion = () => {
    customCursorMotionFrame = null;
    if (!customCursorEnabled) return;
    const cursor = ensureCustomCursorEl();
    const dx = customCursorX - customCursorRenderX;
    const dy = customCursorY - customCursorRenderY;
    const ease = Math.min(Math.max(customCursorSmoothing, 0.08), 1);
    if (ease >= 0.98) {
        customCursorRenderX = customCursorX;
        customCursorRenderY = customCursorY;
    } else {
        customCursorRenderX += dx * ease;
        customCursorRenderY += dy * ease;
    }
    cursor.style.transform = `translate3d(${customCursorRenderX}px, ${customCursorRenderY}px, 0)`;
    if (Math.abs(dx) > 0.2 || Math.abs(dy) > 0.2) {
        scheduleCursorMotion();
    }
};
const setCustomCursorEnabled = (enabled) => {
    customCursorEnabled = Boolean(enabled);
    document.body.classList.toggle("custom-cursor-enabled", customCursorEnabled);
    if (customCursorEnabled) {
        document.body.classList.remove(SYSTEM_CURSOR_HIDE_CLASS);
        if (helperIndicatorState.active) {
            setHelperIndicatorActive(false);
        }
    }
    if (!customCursorEnabled) {
        customCursorVisible = false;
        customCursorPressed = false;
        customCursorMotionFrame = null;
        if (customCursorEl) {
            customCursorEl.classList.remove("visible", "is-interactive", "is-text", "is-pressed");
        }
        return;
    }
    ensureCustomCursorEl();
    scheduleCustomCursorRender();
};
const updateCustomCursorPosition = (event) => {
    if (!customCursorEnabled) return;
    customCursorX = event.clientX;
    customCursorY = event.clientY;
    const cursor = ensureCustomCursorEl();
    if (customCursorSmoothing >= 0.98) {
        customCursorRenderX = customCursorX;
        customCursorRenderY = customCursorY;
        cursor.style.transform = `translate3d(${customCursorRenderX}px, ${customCursorRenderY}px, 0)`;
    } else {
        if (!customCursorVisible) {
            customCursorRenderX = customCursorX;
            customCursorRenderY = customCursorY;
            cursor.style.transform = `translate3d(${customCursorRenderX}px, ${customCursorRenderY}px, 0)`;
        }
        scheduleCursorMotion();
    }
    if (!customCursorVisible) {
        customCursorVisible = true;
        cursor.classList.add("visible");
        scheduleCustomCursorRender();
    }
};

const handleHelperPointerEnter = (event) => {
    const helperItem = event.target?.closest?.(".helper-item");
    if (!helperItem) return;
    if (event.relatedTarget && helperItem.contains(event.relatedTarget)) return;
    handleHelperIndicatorProximity(event);
};

const handleHelperPointerLeave = (event) => {
    const helperItem = event.target?.closest?.(".helper-item");
    if (!helperItem) return;
    if (event.relatedTarget && helperItem.contains(event.relatedTarget)) return;
    handleHelperIndicatorProximity(event);
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
    pendingKeyCount = null;
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
    toggleFloatingPanel("advanced");
});

advancedPanel.addEventListener("click", (event) => {
    event.stopPropagation();
});

if (pianoTrigger) {
    pianoTrigger.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleFloatingPanel("piano");
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
        toggleFloatingPanel("instrument");
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
        void setPianoTone(tone);
    });

    pianoOptionsContainer.addEventListener("keydown", (event) => {
        const option = event.target.closest(".piano-option");
        if (!option) return;
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        const tone = option.dataset.piano;
        void setPianoTone(tone);
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
    const isTypingOnly = isEventsTypingOnlyMode();
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

document.addEventListener("pointerdown", (event) => {
    pointerActivatedControl = getButtonLikeTarget(event.target);
    customCursorPressed = true;
    updateCustomCursorPosition(event);
}, true);

document.addEventListener("click", () => {
    requestAnimationFrame(blurPointerActivatedControl);
}, true);

const handlePointerUpdate = (event) => {
    if (!customCursorEnabled) {
        if (event.type === "pointerrawupdate") return;
        handleHelperIndicatorProximity(event);
        return;
    }
    const events = typeof event.getCoalescedEvents === "function"
        ? event.getCoalescedEvents()
        : null;
    const latest = events && events.length ? events[events.length - 1] : event;
    updateCustomCursorPosition(latest);
    if (event.type !== "pointerrawupdate") {
        handleHelperIndicatorProximity(latest);
    }
};

if ("onpointerrawupdate" in window) {
    document.addEventListener("pointerrawupdate", handlePointerUpdate, { passive: true, capture: true });
}
document.addEventListener("pointermove", handlePointerUpdate, { passive: true, capture: true });

document.addEventListener("pointerup", (event) => {
    customCursorPressed = false;
    updateCustomCursorPosition(event);
}, true);

document.addEventListener("pointercancel", () => {
    customCursorPressed = false;
    scheduleCustomCursorRender();
}, true);

document.addEventListener("pointerover", (event) => {
    if (!customCursorEnabled) return;
    customCursorMode = getCustomCursorMode(event.target);
    scheduleCustomCursorRender();
}, true);

document.addEventListener("pointerout", (event) => {
    if (!customCursorEnabled) return;
    if (!event.relatedTarget) {
        customCursorVisible = false;
        customCursorPressed = false;
        scheduleCustomCursorRender();
    }
}, true);

document.addEventListener("pointerover", handleHelperPointerEnter, true);
document.addEventListener("pointerout", handleHelperPointerLeave, true);

window.addEventListener("blur", () => {
    customCursorVisible = false;
    customCursorPressed = false;
    scheduleCustomCursorRender();
});

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        customCursorVisible = false;
        customCursorPressed = false;
        scheduleCustomCursorRender();
    }
});

const applyCustomCursorMediaState = () => {
    const allowCustomCursor = CUSTOM_CURSOR_QUERY.matches && state.customCursorEnabled !== false;
    setCustomCursorEnabled(allowCustomCursor);
};
if (typeof CUSTOM_CURSOR_QUERY.addEventListener === "function") {
    CUSTOM_CURSOR_QUERY.addEventListener("change", applyCustomCursorMediaState);
} else if (typeof CUSTOM_CURSOR_QUERY.addListener === "function") {
    CUSTOM_CURSOR_QUERY.addListener(applyCustomCursorMediaState);
}
applyCustomCursorMediaState();

keyboardEl.addEventListener("click", (event) => {
    event.preventDefault();
});

let gameSettingsReturnFocusEl = null;
const FOCUSABLE_SELECTOR = "button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])";

const isElementVisible = (el) => {
    if (!el) return false;
    if (el.hasAttribute("hidden")) return false;
    if (el.getAttribute("aria-hidden") === "true") return false;
    const style = window.getComputedStyle(el);
    return style.display !== "none" && style.visibility !== "hidden";
};

const getFocusableElements = (root) => {
    if (!root) return [];
    return Array.from(root.querySelectorAll(FOCUSABLE_SELECTOR))
        .filter((el) => !el.disabled && el.tabIndex !== -1 && isElementVisible(el));
};

const getModalFocusRoot = (modalEl) => (
    modalEl?.querySelector(".game-settings-card, .tutorial-card, .app-dialog-card") ?? modalEl
);

const focusFirstInModal = (modalEl) => {
    const root = getModalFocusRoot(modalEl);
    const focusables = getFocusableElements(root);
    if (focusables.length) {
        focusables[0].focus({ preventScroll: true });
    }
};

const trapModalFocus = (modalEl, event) => {
    if (event.code !== "Tab") return false;
    const root = getModalFocusRoot(modalEl);
    const focusables = getFocusableElements(root);
    if (!focusables.length) return false;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;
    if (event.shiftKey) {
        if (active === first || !root.contains(active)) {
            event.preventDefault();
            last.focus({ preventScroll: true });
            return true;
        }
        return false;
    }
    if (active === last || !root.contains(active)) {
        event.preventDefault();
        first.focus({ preventScroll: true });
        return true;
    }
    return false;
};

const isTextEditableTarget = (target) => {
    if (!target) return false;
    const tag = target.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
    return Boolean(target.isContentEditable);
};

const getActiveModalEl = () => {
    if (App.dialog?.isOpen?.()) return appDialog;
    if (gameSettingsModal && !gameSettingsModal.hidden) return gameSettingsModal;
    if (isChordTutorialOpen()) return chordTutorialModal;
    return null;
};

const closeGameSettingsModalUi = () => {
    if (typeof App.settings?.closeGameSettingsModal === "function") {
        App.settings.closeGameSettingsModal({ restoreFocus: false });
    }
    const fallback = gameSettingsReturnFocusEl ?? gameSettingsOpen ?? optionsTrigger;
    if (fallback && typeof fallback.focus === "function") {
        fallback.focus({ preventScroll: true });
    }
    gameSettingsReturnFocusEl = null;
};

const openGameSettingsModalUi = (sourceEl = null) => {
    gameSettingsReturnFocusEl = sourceEl ?? document.activeElement;
    if (typeof App.settings?.openGameSettingsModal === "function") {
        App.settings.openGameSettingsModal();
    }
    focusFirstInModal(gameSettingsModal);
};

const closeActiveModal = () => {
    if (App.dialog?.isOpen?.()) {
        App.dialog.close();
        return true;
    }
    if (gameSettingsModal && !gameSettingsModal.hidden) {
        closeGameSettingsModalUi();
        return true;
    }
    if (isChordTutorialOpen()) {
        closeChordTutorial();
        return true;
    }
    return false;
};

const moveFocusInPanel = (panelEl, direction) => {
    if (!panelEl) return false;
    const focusables = getFocusableElements(panelEl);
    if (!focusables.length) return false;
    const active = document.activeElement;
    const index = focusables.indexOf(active);
    const nextIndex = index === -1
        ? 0
        : (index + direction + focusables.length) % focusables.length;
    focusables[nextIndex].focus({ preventScroll: true });
    return true;
};

document.addEventListener("keydown", (event) => {
    const tag = event.target.tagName;
    const chordInputFocused = event.target === chordAnswerInput;
    if ((event.code === "Enter" || event.code === "Space") && event.repeat) {
        event.preventDefault();
        return;
    }
    const activeModal = getActiveModalEl();
    if (activeModal) {
        if (event.code === "Escape") {
            event.preventDefault();
            closeActiveModal();
            return;
        }
        if (trapModalFocus(activeModal, event)) {
            return;
        }
        if (activeModal === chordTutorialModal) {
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
        }
        return;
    }

    const openPanelKey = typeof getOpenFloatingPanelKey === "function"
        ? getOpenFloatingPanelKey()
        : null;
    if (openPanelKey) {
        const panelMap = {
            advanced: advancedPanel,
            piano: pianoPanel,
            instrument: instrumentBrowserPanel
        };
        const openPanel = panelMap[openPanelKey] ?? null;
        if (event.code === "Escape") {
            event.preventDefault();
            closeFloatingPanel(openPanelKey, { restoreFocus: true });
            return;
        }
        if (event.code === "Tab" && openPanel && !openPanel.contains(event.target)) {
            event.preventDefault();
            const focusables = getFocusableElements(openPanel);
            if (!focusables.length) return;
            const target = event.shiftKey ? focusables[focusables.length - 1] : focusables[0];
            target.focus({ preventScroll: true });
            return;
        }
        if (openPanel && !isTextEditableTarget(event.target)) {
            if (event.code === "ArrowUp" || event.code === "ArrowLeft") {
                event.preventDefault();
                moveFocusInPanel(openPanel, -1);
                return;
            }
            if (event.code === "ArrowDown" || event.code === "ArrowRight") {
                event.preventDefault();
                moveFocusInPanel(openPanel, 1);
                return;
            }
        }
    }

    if (event.code === "Escape") {
        closeSettings();
    }

    if (chordInputFocused && event.code === "Space") {
        event.preventDefault();
        triggerReplayAction(event);
        if (!holdState.active) {
            resultEl.textContent = (state.blindMode && !state.submitted)
                ? "Blind mode is on: replay is disabled until you submit."
                : (EVENTS_ACTION_COPY.typeOrSelectFirst || "Type a valid chord or select notes first.");
        }
        return;
    }

    if (chordInputFocused && event.code === "Enter") {
        event.preventDefault();
        triggerPrimaryAction();
        return;
    }

    if (
        (event.code === "Enter" || event.code === "Space")
        && (event.target.closest("button,[role=\"button\"],a[href]"))
    ) {
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
    applyCustomCursorMediaState();
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
