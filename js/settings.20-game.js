const normalizeChordDifficultyId = (value) => {
    const normalized = String(value ?? "").trim().toLowerCase();
    if (normalized === "playful") return "voiced";
    if (["easy", "medium", "voiced", "hard"].includes(normalized)) return normalized;
    return "easy";
};

const SETTINGS_MODE_POLICY = App.modePolicy;

const getKeyCountMinimum = (nextState = state) => {
    const mode = getEffectivePracticeMode();
    if (mode !== "chord") return KEY_COUNT_GLOBAL_MIN;
    const difficultyId = normalizeChordDifficultyId(nextState.chordDifficulty);
    return CHORD_KEY_COUNT_MIN_BY_DIFFICULTY[difficultyId] ?? KEY_COUNT_GLOBAL_MIN;
};

const clampKeyCountPreference = (value) => Math.min(
    Math.max(Math.round(value), KEY_COUNT_GLOBAL_MIN),
    KEY_COUNT_GLOBAL_MAX
);

const getKeyCountPreference = () => (
    Number.isFinite(state.keyCountPreference) ? state.keyCountPreference : state.keyCount
);

const resolveKeyCountForPreference = (preference, nextState = state) => {
    const min = getKeyCountMinimum(nextState);
    const safePreference = Number.isFinite(preference) ? preference : state.keyCount;
    return Math.min(Math.max(Math.round(safePreference), min), KEY_COUNT_GLOBAL_MAX);
};

const clampStartMidiForKeyCount = (value, keyCount) => {
    const maxStart = Math.max(MIN_START_MIDI, MAX_MIDI - keyCount + 1);
    return clamp(value, MIN_START_MIDI, maxStart);
};

const updateKeyCountDisplay = (value) => {
    if (keyCountValue) {
        keyCountValue.textContent = `${value} keys`;
    }
    if (gameKeyCountValue) {
        gameKeyCountValue.textContent = `${value} keys`;
    }
    if (keyCountSlider) {
        keyCountSlider.value = String(value);
    }
};

const setKeyCount = (value, options = {}) => {
    const { delayOverrideMs = null, preview = false, source = "user" } = options;
    const preferred = source === "user" ? clampKeyCountPreference(value) : getKeyCountPreference();
    const clamped = resolveKeyCountForPreference(preferred);
    const clampedStartMidi = clampStartMidiForKeyCount(state.startMidi, clamped);
    applySettingsStatePatch({
        keyCount: clamped,
        keyCountPreference: preferred,
        startMidi: clampedStartMidi
    }, "settings/key-count");
    updateKeyCountDisplay(clamped);
    if (startNoteValue) {
        startNoteValue.textContent = getMidiLabel(state.startMidi);
    }
    rebuildKeyboard();
    if (!preview) {
        handleCriticalSettingChange(delayOverrideMs);
        saveSettings();
    }
};

const setStartMidi = (value, delayOverrideMs = null) => {
    const next = clampStartMidi(Math.round(value));
    applySettingsStatePatch({ startMidi: next }, "settings/start-midi");
    if (startNoteValue) {
        startNoteValue.textContent = getMidiLabel(next);
    }
    rebuildKeyboard();
    handleCriticalSettingChange(delayOverrideMs);
    saveSettings();
};

const setKeyCountVisual = (value) => {
    const clamped = clampKeyCountPreference(value);
    updateKeyCountDisplay(clamped);
};

const getEffectivePracticeMode = () => SETTINGS_MODE_POLICY.getEffectivePracticeModeFromState(state);
const isSettingsTypingEnabled = () => SETTINGS_MODE_POLICY.isTypingEnabledFromState(state);

const refreshOptionsModeVisibility = () => {
    const mode = getEffectivePracticeMode();
    const showChord = mode === "chord";
    const showTyping = showChord && isSettingsTypingEnabled();
    const showNoteCount = mode !== "chord";

    document.querySelectorAll('[data-option-group="notes"]').forEach((el) => {
        el.hidden = !showNoteCount;
    });
    document.querySelectorAll('[data-option-group="chord"]').forEach((el) => {
        el.hidden = !showChord;
    });
    document.querySelectorAll('[data-option-group="typing"]').forEach((el) => {
        el.hidden = !showTyping;
    });

    if (practiceModeSelect) {
        practiceModeSelect.value = mode;
    }
};

const setPracticeMode = (mode, options = {}) => {
    const previousMode = getEffectivePracticeMode();
    const workingState = {
        ...state,
        practiceProfiles: typeof normalizePracticeProfiles === "function"
            ? normalizePracticeProfiles(state.practiceProfiles)
            : (state.practiceProfiles || {})
    };
    if (typeof capturePracticeProfileFromState === "function") {
        capturePracticeProfileFromState(previousMode, workingState);
    }

    const normalized = ["random", "nice", "chord"].includes(mode) ? mode : "random";
    const profiles = typeof normalizePracticeProfiles === "function"
        ? normalizePracticeProfiles(workingState.practiceProfiles)
        : (workingState.practiceProfiles || {});
    const restored = profiles[normalized] ?? {};
    const nextTrainingMode = ["keyboard", "type", "both"].includes(restored.trainingMode)
        ? restored.trainingMode
        : DEFAULTS.trainingMode;
    const nextDifficulty = ["easy", "medium", "voiced", "hard"].includes(restored.chordDifficulty)
        ? restored.chordDifficulty
        : DEFAULTS.chordDifficulty;
    applySettingsStatePatch({
        practiceMode: normalized,
        niceMode: normalized === "nice",
        chordMode: normalized === "chord",
        practiceProfiles: profiles,
        mode: restored.mode === "ascending" ? "ascending" : DEFAULTS.mode,
        blindMode: Boolean(restored.blindMode),
        trainingMode: normalized === "chord" ? nextTrainingMode : "keyboard",
        chordDifficulty: nextDifficulty,
        chordExtraHelpers: Boolean(restored.chordExtraHelpers),
        chordRootHint: Boolean(restored.chordRootHint),
        typingShowPiano: restored.typingShowPiano !== false,
        typingShowTyped: restored.typingShowTyped !== false,
        hideLivePreview: Boolean(restored.hideLivePreview),
        rootHintSuppressed: false
    }, "settings/practice-mode");

    if (blindToggle) {
        blindToggle.checked = state.blindMode;
    }
    if (hideLivePreviewToggle) {
        hideLivePreviewToggle.checked = state.hideLivePreview;
    }
    if (trainingModeSelect) {
        trainingModeSelect.value = state.trainingMode;
    }
    if (chordDifficultySelect) {
        chordDifficultySelect.value = state.chordDifficulty;
    }
    if (chordExtraHelpersToggle) {
        chordExtraHelpersToggle.checked = state.chordExtraHelpers;
    }
    if (chordRootHintToggle) {
        chordRootHintToggle.checked = state.chordRootHint;
    }
    if (customCursorToggle) {
        customCursorToggle.checked = state.customCursorEnabled !== false;
    }
    if (typingShowPianoToggle) {
        typingShowPianoToggle.checked = state.typingShowPiano;
    }
    if (typingShowTypedToggle) {
        typingShowTypedToggle.checked = state.typingShowTyped;
    }
    segmentedButtons.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.mode === state.mode);
    });

    refreshOptionsModeVisibility();
    updateNoteCountMax();
    setKeyCount(state.keyCount, { preview: true, source: "system" });
    updateStatus();
    updateKeyStates();

    if (options.triggerRestart !== false) {
        handleCriticalSettingChange(200);
    }
    if (options.save !== false) {
        saveSettings();
    }
};

const applyUiFromState = () => {
    normalizeCustomProfiles();
    if (!state.responseProfileId) {
        state.responseProfileId = DEFAULTS.responseProfileId;
    }
    state.practiceMode = getEffectivePracticeMode();

    noteCountInput.value = String(state.noteCount);
    noteCountValue.textContent = `${state.noteCount} notes`;
    volumeSlider.value = state.volume.toFixed(2);
    lengthSlider.value = state.noteDuration.toFixed(1);
    lengthValue.textContent = `${state.noteDuration.toFixed(1)}s`;
    state.keyCountPreference = Number.isFinite(state.keyCountPreference) ? state.keyCountPreference : state.keyCount;
    setKeyCount(state.keyCountPreference, { preview: true, source: "system" });
    state.startMidi = clampStartMidi(state.startMidi);
    if (startNoteValue) {
        startNoteValue.textContent = getMidiLabel(state.startMidi);
    }
    blindToggle.checked = state.blindMode;
    if (hideLivePreviewToggle) {
        hideLivePreviewToggle.checked = state.hideLivePreview;
    }
    if (pianoLabel) {
        const preset = getTonePreset(state.pianoTone);
        pianoLabel.textContent = preset?.label ?? "No presets";
    }
    pianoOptions.forEach((option) => {
        option.classList.toggle("active", option.dataset.piano === state.pianoTone);
    });
    if (trainingModeSelect) {
        trainingModeSelect.value = state.trainingMode;
    }
    if (chordDifficultySelect) {
        chordDifficultySelect.value = state.chordDifficulty;
    }
    if (chordExtraHelpersToggle) {
        chordExtraHelpersToggle.checked = state.chordExtraHelpers;
    }
    if (chordRootHintToggle) {
        chordRootHintToggle.checked = state.chordRootHint;
    }
    if (customCursorToggle) {
        customCursorToggle.checked = state.customCursorEnabled !== false;
    }
    if (typingShowPianoToggle) {
        typingShowPianoToggle.checked = state.typingShowPiano;
    }
    if (typingShowTypedToggle) {
        typingShowTypedToggle.checked = state.typingShowTyped;
    }
    if (practiceModeSelect) {
        practiceModeSelect.value = getEffectivePracticeMode();
    }
    segmentedButtons.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.mode === state.mode);
    });
    document.body.classList.toggle("theme-dark", state.theme === "dark");
    themeToggle.setAttribute("aria-pressed", state.theme === "dark");
    refreshOptionsModeVisibility();

    refreshResponseProfileBrowser();
    syncDirtyFromApplied();
    applyAdsrTrimUi();
};

let pendingKeyCount = null;
let pendingNoteCount = null;
let criticalChangeTimer = null;
let pendingCriticalRestart = false;

const commitCriticalChange = (delayOverrideMs = null) => {
    if (pendingKeyCount === null) return;
    const nextValue = pendingKeyCount;
    pendingKeyCount = null;
    setKeyCount(nextValue, { delayOverrideMs });
};

const commitNoteCountChange = (delayOverrideMs = null) => {
    if (pendingNoteCount === null) return;
    const nextValue = pendingNoteCount;
    pendingNoteCount = null;
    applySettingsStatePatch({ noteCount: nextValue }, "settings/note-count");
    noteCountInput.value = String(nextValue);
    noteCountValue.textContent = `${nextValue} notes`;
    handleCriticalSettingChange(delayOverrideMs);
    saveSettings();
};

const handleCriticalSettingChange = (delayOverrideMs = null) => {
    if (state.active) {
        clearPendingCriticalRestart();
        pendingCriticalRestart = true;
        const delayMs = delayOverrideMs ?? 700;
        criticalChangeTimer = setTimeout(() => {
            criticalChangeTimer = null;
            pendingCriticalRestart = false;
            startRound(true);
        }, delayMs);
    } else {
        updateStatus();
        updateKeyStates();
    }
};

