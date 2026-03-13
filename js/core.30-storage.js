const SETTINGS_KEY = "piano_trainer_settings";
App.storageKey = SETTINGS_KEY;

const saveSettings = () => {
    const payload = {
        noteCount: state.noteCount,
        mode: state.mode,
        volume: state.volume,
        noteDuration: state.noteDuration,
        keyCount: state.keyCount,
        keyCountPreference: state.keyCountPreference,
        startMidi: state.startMidi,
        blindMode: state.blindMode,
        niceMode: state.niceMode,
        theme: state.theme,
        pianoTone: state.pianoTone,
        adsrTrim: { ...state.adsrTrim },
        responseProfileId: state.responseProfileId,
        customResponseProfiles: { ...state.customResponseProfiles },
        practiceMode: state.practiceMode,
        chordMode: state.chordMode,
        trainingMode: state.trainingMode,
        chordDifficulty: state.chordDifficulty,
        chordExtraHelpers: state.chordExtraHelpers,
        chordRootHint: state.chordRootHint,
        customCursorEnabled: state.customCursorEnabled,
        typingShowPiano: state.typingShowPiano,
        typingShowTyped: state.typingShowTyped,
        hideLivePreview: state.hideLivePreview,
        relativeKeyMode: state.relativeKeyMode,
        relativeKeyRootPc: state.relativeKeyRootPc
    };
    const modeId = getEffectivePracticeModeFromState(state);
    state.practiceProfiles = normalizePracticeProfiles(state.practiceProfiles);
    capturePracticeProfileFromState(modeId, state);
    payload.practiceProfiles = normalizePracticeProfiles(state.practiceProfiles);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(payload));
};

const loadSettings = () => {
    try {
        const raw = localStorage.getItem(SETTINGS_KEY);
        if (!raw) return;
        const data = JSON.parse(raw);
        state.noteCount = Number.isFinite(data.noteCount) ? data.noteCount : DEFAULTS.noteCount;
        state.mode = data.mode === "ascending" ? "ascending" : DEFAULTS.mode;
        state.volume = Number.isFinite(data.volume) ? data.volume : DEFAULTS.volume;
        state.noteDuration = Number.isFinite(data.noteDuration) ? data.noteDuration : DEFAULTS.noteDuration;
        state.keyCount = Number.isFinite(data.keyCount) ? data.keyCount : DEFAULTS.keyCount;
        state.keyCountPreference = Number.isFinite(data.keyCountPreference)
            ? data.keyCountPreference
            : state.keyCount;
        state.startMidi = Number.isFinite(data.startMidi) ? data.startMidi : DEFAULTS.startMidi;
        state.blindMode = Boolean(data.blindMode);
        state.niceMode = Boolean(data.niceMode);
        state.theme = data.theme === "dark" ? "dark" : DEFAULTS.theme;
        state.pianoTone = typeof data.pianoTone === "string" ? data.pianoTone : DEFAULTS.pianoTone;
        state.responseProfileId = typeof data.responseProfileId === "string" && data.responseProfileId.trim()
            ? data.responseProfileId.trim()
            : DEFAULTS.responseProfileId;
        const savedPracticeMode = String(data.practiceMode ?? "").trim();
        state.practiceMode = ["random", "nice", "chord"].includes(savedPracticeMode)
            ? savedPracticeMode
            : (Boolean(data.chordMode) ? "chord" : (Boolean(data.niceMode) ? "nice" : DEFAULTS.practiceMode));
        state.chordMode = Boolean(data.chordMode);
        const trainingMode = String(data.trainingMode ?? "").trim();
        state.trainingMode = ["keyboard", "type", "both"].includes(trainingMode)
            ? trainingMode
            : DEFAULTS.trainingMode;
        const difficulty = String(data.chordDifficulty ?? "").trim().toLowerCase();
        state.chordDifficulty = difficulty === "playful"
            ? "voiced"
            : (["easy", "medium", "voiced", "hard"].includes(difficulty) ? difficulty : DEFAULTS.chordDifficulty);
        state.chordExtraHelpers = Boolean(data.chordExtraHelpers);
        state.chordRootHint = Boolean(data.chordRootHint);
        state.customCursorEnabled = data.customCursorEnabled !== false;
        state.typingShowPiano = data.typingShowPiano !== false;
        state.typingShowTyped = data.typingShowTyped !== false;
        state.hideLivePreview = Boolean(data.hideLivePreview);
        state.relativeKeyMode = data.relativeKeyMode === "target" ? "target" : DEFAULTS.relativeKeyMode;
        state.relativeKeyRootPc = Number.isFinite(data.relativeKeyRootPc)
            ? ((Math.round(data.relativeKeyRootPc) % 12) + 12) % 12
            : DEFAULTS.relativeKeyRootPc;
        state.practiceProfiles = normalizePracticeProfiles(data.practiceProfiles);
        const trim = data.adsrTrim ?? {};
        state.adsrTrim = {
            attack: Number.isFinite(trim.attack) ? Math.min(Math.max(trim.attack, -1), 1) : DEFAULTS.adsrTrim.attack,
            decay: Number.isFinite(trim.decay) ? Math.min(Math.max(trim.decay, -1), 1) : DEFAULTS.adsrTrim.decay,
            release: Number.isFinite(trim.release) ? Math.min(Math.max(trim.release, -1), 1) : DEFAULTS.adsrTrim.release,
            length: Number.isFinite(trim.length) ? Math.min(Math.max(trim.length, -1), 1) : DEFAULTS.adsrTrim.length
        };
        if (data.customResponseProfiles && typeof data.customResponseProfiles === "object") {
            state.customResponseProfiles = { ...data.customResponseProfiles };
        } else {
            state.customResponseProfiles = {};
        }
        capturePracticeProfileFromState(getEffectivePracticeModeFromState(state), state);
        state.responseProfileDirty = false;
    } catch (error) {
        // Ignore corrupted settings
    }
};

const resetAllSettings = () => {
    state.noteCount = DEFAULTS.noteCount;
    state.mode = DEFAULTS.mode;
    state.volume = DEFAULTS.volume;
    state.noteDuration = DEFAULTS.noteDuration;
    state.keyCount = DEFAULTS.keyCount;
    state.keyCountPreference = DEFAULTS.keyCountPreference;
    state.startMidi = DEFAULTS.startMidi;
    state.blindMode = DEFAULTS.blindMode;
    state.niceMode = DEFAULTS.niceMode;
    state.theme = DEFAULTS.theme;
    state.pianoTone = DEFAULTS.pianoTone;
    state.adsrTrim = { ...DEFAULTS.adsrTrim };
    state.responseProfileId = DEFAULTS.responseProfileId;
    state.customResponseProfiles = {};
    state.responseProfileDirty = DEFAULTS.responseProfileDirty;
    state.practiceMode = DEFAULTS.practiceMode;
    state.chordMode = DEFAULTS.chordMode;
    state.trainingMode = DEFAULTS.trainingMode;
    state.chordDifficulty = DEFAULTS.chordDifficulty;
    state.chordExtraHelpers = DEFAULTS.chordExtraHelpers;
    state.chordRootHint = DEFAULTS.chordRootHint;
    state.customCursorEnabled = DEFAULTS.customCursorEnabled;
    state.typingShowPiano = DEFAULTS.typingShowPiano;
    state.typingShowTyped = DEFAULTS.typingShowTyped;
    state.hideLivePreview = DEFAULTS.hideLivePreview;
    state.relativeKeyMode = DEFAULTS.relativeKeyMode;
    state.relativeKeyRootPc = DEFAULTS.relativeKeyRootPc;
    state.practiceProfiles = createDefaultPracticeProfiles();
    state.targetChord = null;
    state.selectedChordLabel = "";
    state.typedAnswer = "";
    state.typedPreviewNotes = [];
    state.submissionSource = null;
    state.submittedComparisonNotes = [];
    state.rootHintSuppressed = DEFAULTS.rootHintSuppressed;
};

