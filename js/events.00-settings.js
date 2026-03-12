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
        openGameSettingsModalUi(optionsTrigger, { skipReturnFocus: wasPointerActivated(optionsTrigger) });
    });
}

if (gameSettingsOpen) {
    gameSettingsOpen.addEventListener("click", (event) => {
        event.preventDefault();
        openGameSettingsModalUi(gameSettingsOpen, { skipReturnFocus: wasPointerActivated(gameSettingsOpen) });
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
let tutorialSkipReturnFocus = false;
let suppressChordBubbleTimer = null;

