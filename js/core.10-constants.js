const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const DEFAULT_START_MIDI = 48; // C3
const MIN_START_MIDI = 36; // C2
const MAX_MIDI = 96; // C7
const ARP_STEP = 0.28;

const ROUND_START_DELAY = 0.04;
const KEY_PRESS_DELAY = 0;
const SCHEDULE_LEAD = 0.02;
const HOLD_THRESHOLD = 0.16;
const HOLD_MAX_EXTRA = 30;
const HOLD_BUFFER = 0.05;
const ROUND_ANIM_HOLD_MS = 60;
const MIN_KEY_ANIM_MS = 120;
const SHORT_PRESS_ANIM_MS = 140;
const CONSTANTS = {
    NOTE_NAMES,
    DEFAULT_START_MIDI,
    MIN_START_MIDI,
    MAX_MIDI,
    ARP_STEP,
    ROUND_START_DELAY,
    KEY_PRESS_DELAY,
    SCHEDULE_LEAD,
    HOLD_THRESHOLD,
    HOLD_MAX_EXTRA,
    HOLD_BUFFER,
    ROUND_ANIM_HOLD_MS,
    MIN_KEY_ANIM_MS,
    SHORT_PRESS_ANIM_MS
};
App.constants = CONSTANTS;
const UI_COPY = {
    chordReadout: {
        typedNone: "Typed chord: none",
        typedUnrecognized: "Typed chord: unrecognized",
        typedPreview: (label) => `Typed chord: ${label} (preview)`,
        selectedNone: "Selected chord: none",
        selectedUnknown: "Selected chord: unknown",
        selected: (label) => `Selected chord: ${label}`,
        typed: (label) => `Typed chord: ${label}`,
        selectedAndTyped: (selectedLabel, typedLabel) => `Selected chord: ${selectedLabel} | Typed chord: ${typedLabel}`
    },
    prompts: {
        landingTyping: "Press New Round to hear a chord, then type your answer.",
        landingBoth: "Press New Round to hear a chord, then play it, type it, or both.",
        landingDefault: "Press New Round to begin."
    },
    modes: {
        typingOnly: "Type Chord",
        chordBoth: "Chord + Both",
        chordBlind: "Chord + Blind",
        chord: "Chord",
        blind: "Blind",
        normal: "Normal"
    },
    actions: {
        typeValidChordFirst: "Type a valid chord first.",
        typeOrSelectFirst: "Type a valid chord or select notes first.",
        selectNotesFirst: "Select some notes first.",
        noReplayNotes: "No notes available to replay.",
        noTargetChord: "No target chord available. Start a new round.",
        previewChord: (label) => `Preview: ${label}`,
        correctChord: (label) => `Correct: ${label}`
    },
    feedback: {
        correctChord: "Correct chord. Great ear.",
        wrongChordName: "Not quite. Compare the chord name and quality.",
        wrongChordQuality: "Not quite. Compare the chord quality.",
        correctNotes: "Correct. Great ear.",
        wrongNotes: "Not quite. Listen closely."
    },
    reveal: {
        targetChord: "Target chord",
        targetNotes: "Target notes",
        yourChord: "Your chord",
        yourNotes: "Your notes",
        correctNotes: "Correct notes",
        wrongNotes: "Wrong notes",
        missedNotes: "Missed notes",
        differencePrefix: "Difference"
    },
    helpers: {
        title: "Chord helper",
        revealHint: "Click to latch, right-click to pin",
        rootNote: "Root note",
        rootHidden: "Hidden",
        chordSize: "Chord size",
        chordType: "Chord type",
        voicing: "Voicing",
        pitchSpan: "Pitch span"
    },
    browsers: {
        instrumentMetaIdle: "Select a preset to preview details. Apply to switch instrument.",
        profileMetaIdle: "Select a profile to preview. Apply to use it.",
        noInstrumentPresets: "No presets match this filter.",
        noProfiles: "No profiles match this filter.",
        appliedNow: "Applied now.",
        selectedPending: "Selected only, not applied yet.",
        applied: "Applied."
    }
};
App.uiCopy = UI_COPY;
const SOUNDFONT_DIR = "soundfonts";
const SOUNDFONT_MANIFEST = `${SOUNDFONT_DIR}/index.json`;

const BUILTIN_SOUNDFONTS = {};
const SF2_SIMPLE_PROGRAMS = [0, 4, 5, 9, 24, 33, 105, 11, 19, 72];
App.sf2SimplePrograms = SF2_SIMPLE_PROGRAMS;

let PIANO_PRESETS = {};
App.presets = PIANO_PRESETS;
const DEFAULT_PIANO = `gm-program-${SF2_SIMPLE_PROGRAMS[0]}`;
const ADSR_TRIM_DEFAULTS = {
    attack: 0,
    decay: 0,
    release: 0,
    length: 0
};
const DEFAULT_NOTE_DURATION = 1.2;
const DEFAULT_RULE_MODE = "simultaneous";
const DEFAULT_RULE_BLIND = false;
const DEFAULT_RULE_TRAINING_MODE = "keyboard";
const DEFAULT_RULE_CHORD_DIFFICULTY = "easy";
const DEFAULT_RULE_CHORD_EXTRA_HELPERS = false;
const DEFAULT_RULE_CHORD_ROOT_HINT = false;
const DEFAULT_RULE_TYPING_SHOW_PIANO = true;
const DEFAULT_RULE_TYPING_SHOW_TYPED = true;
const DEFAULT_RULE_HIDE_LIVE_PREVIEW = false;
const PRACTICE_MODE_IDS = ["random", "nice", "chord"];
const createDefaultPracticeProfile = (modeId) => ({
    mode: DEFAULT_RULE_MODE,
    blindMode: DEFAULT_RULE_BLIND,
    trainingMode: modeId === "chord" ? DEFAULT_RULE_TRAINING_MODE : "keyboard",
    chordDifficulty: DEFAULT_RULE_CHORD_DIFFICULTY,
    chordExtraHelpers: DEFAULT_RULE_CHORD_EXTRA_HELPERS,
    chordRootHint: DEFAULT_RULE_CHORD_ROOT_HINT,
    typingShowPiano: DEFAULT_RULE_TYPING_SHOW_PIANO,
    typingShowTyped: DEFAULT_RULE_TYPING_SHOW_TYPED,
    hideLivePreview: DEFAULT_RULE_HIDE_LIVE_PREVIEW
});
const createDefaultPracticeProfiles = () => ({
    random: createDefaultPracticeProfile("random"),
    nice: createDefaultPracticeProfile("nice"),
    chord: createDefaultPracticeProfile("chord")
});
const normalizePracticeProfile = (value, modeId) => {
    const fallback = createDefaultPracticeProfile(modeId);
    const profile = value && typeof value === "object" ? value : {};
    const rawDifficulty = String(profile.chordDifficulty ?? "").trim().toLowerCase();
    const chordDifficulty = rawDifficulty === "playful"
        ? "voiced"
        : (["easy", "medium", "voiced", "hard"].includes(rawDifficulty) ? rawDifficulty : fallback.chordDifficulty);
    return {
        mode: profile.mode === "ascending" ? "ascending" : fallback.mode,
        blindMode: Boolean(profile.blindMode),
        trainingMode: ["keyboard", "type", "both"].includes(profile.trainingMode)
            ? profile.trainingMode
            : fallback.trainingMode,
        chordDifficulty,
        chordExtraHelpers: Boolean(profile.chordExtraHelpers),
        chordRootHint: Boolean(profile.chordRootHint),
        typingShowPiano: profile.typingShowPiano !== false,
        typingShowTyped: profile.typingShowTyped !== false,
        hideLivePreview: Boolean(profile.hideLivePreview)
    };
};
const normalizePracticeProfiles = (value) => {
    const source = value && typeof value === "object" ? value : {};
    return {
        random: normalizePracticeProfile(source.random, "random"),
        nice: normalizePracticeProfile(source.nice, "nice"),
        chord: normalizePracticeProfile(source.chord, "chord")
    };
};
const isTypingEnabledFromState = (sourceState = state) => (
    sourceState.trainingMode === "type" || sourceState.trainingMode === "both"
);
const isTypingOnlyModeFromState = (sourceState = state) => sourceState.trainingMode === "type";
const getIsChordRoundFromState = (sourceState = state) => (
    isTypingEnabledFromState(sourceState) || Boolean(sourceState.chordMode)
);
const getEffectiveBlindModeFromState = (sourceState = state) => Boolean(sourceState.blindMode);
const getEffectivePracticeModeFromState = (sourceState = state) => {
    if (sourceState.practiceMode === "chord" || getIsChordRoundFromState(sourceState)) {
        return "chord";
    }
    if (sourceState.practiceMode === "nice" || sourceState.niceMode) {
        return "nice";
    }
    return "random";
};
const capturePracticeProfileFromState = (modeId, sourceState = state) => {
    const safeMode = PRACTICE_MODE_IDS.includes(modeId) ? modeId : "random";
    if (!sourceState.practiceProfiles || typeof sourceState.practiceProfiles !== "object") {
        sourceState.practiceProfiles = createDefaultPracticeProfiles();
    }
    sourceState.practiceProfiles[safeMode] = {
        mode: sourceState.mode === "ascending" ? "ascending" : "simultaneous",
        blindMode: Boolean(sourceState.blindMode),
        trainingMode: ["keyboard", "type", "both"].includes(sourceState.trainingMode)
            ? sourceState.trainingMode
            : "keyboard",
        chordDifficulty: ["easy", "medium", "voiced", "hard", "playful"].includes(sourceState.chordDifficulty)
            ? (sourceState.chordDifficulty === "playful" ? "voiced" : sourceState.chordDifficulty)
            : DEFAULT_RULE_CHORD_DIFFICULTY,
        chordExtraHelpers: Boolean(sourceState.chordExtraHelpers),
        chordRootHint: Boolean(sourceState.chordRootHint),
        typingShowPiano: sourceState.typingShowPiano !== false,
        typingShowTyped: sourceState.typingShowTyped !== false,
        hideLivePreview: Boolean(sourceState.hideLivePreview)
    };
    return sourceState.practiceProfiles[safeMode];
};
const DEFAULTS = {
    noteCount: 2,
    mode: "simultaneous",
    volume: 0.75,
    noteDuration: DEFAULT_NOTE_DURATION,
    keyCount: 24,
    keyCountPreference: 24,
    startMidi: DEFAULT_START_MIDI,
    blindMode: false,
    niceMode: false,
    theme: "light",
    pianoTone: DEFAULT_PIANO,
    adsrTrim: { ...ADSR_TRIM_DEFAULTS },
    responseProfileId: "instrument-default",
    customResponseProfiles: {},
    responseProfileDirty: false,
    practiceMode: "random",
    chordMode: false,
    trainingMode: "keyboard",
    chordDifficulty: "easy",
    chordExtraHelpers: false,
    chordRootHint: false,
    customCursorEnabled: true,
    typingShowPiano: true,
    typingShowTyped: true,
    hideLivePreview: false,
    practiceProfiles: createDefaultPracticeProfiles(),
    rootHintSuppressed: false
};

const state = {
    noteCount: DEFAULTS.noteCount,
    mode: DEFAULTS.mode,
    round: 0,
    targetNotes: [],
    selectedNotes: [],
    submitted: false,
    active: false,
    volume: DEFAULTS.volume,
    noteDuration: DEFAULTS.noteDuration,
    keyCount: DEFAULTS.keyCount,
    keyCountPreference: DEFAULTS.keyCount,
    startMidi: DEFAULTS.startMidi,
    hintUsed: false,
    blindMode: DEFAULTS.blindMode,
    niceMode: DEFAULTS.niceMode,
    theme: DEFAULTS.theme,
    pianoTone: DEFAULTS.pianoTone,
    adsrTrim: { ...DEFAULTS.adsrTrim },
    responseProfileId: DEFAULTS.responseProfileId,
    customResponseProfiles: {},
    responseProfileDirty: DEFAULTS.responseProfileDirty,
    practiceMode: DEFAULTS.practiceMode,
    chordMode: DEFAULTS.chordMode,
    trainingMode: DEFAULTS.trainingMode,
    chordDifficulty: DEFAULTS.chordDifficulty,
    chordExtraHelpers: DEFAULTS.chordExtraHelpers,
    chordRootHint: DEFAULTS.chordRootHint,
    customCursorEnabled: DEFAULTS.customCursorEnabled,
    typingShowPiano: DEFAULTS.typingShowPiano,
    typingShowTyped: DEFAULTS.typingShowTyped,
    hideLivePreview: DEFAULTS.hideLivePreview,
    practiceProfiles: createDefaultPracticeProfiles(),
    targetChord: null,
    selectedChordLabel: "",
    typedAnswer: "",
    typedPreviewNotes: [],
    submissionSource: null,
    submittedComparisonNotes: [],
    rootHintSuppressed: DEFAULTS.rootHintSuppressed
};
App.defaults = DEFAULTS;
App.state = state;
App.modePolicy = {
    isTypingEnabledFromState,
    isTypingOnlyModeFromState,
    getIsChordRoundFromState,
    getEffectiveBlindModeFromState,
    getEffectivePracticeModeFromState
};

