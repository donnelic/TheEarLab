var App = window.App || (window.App = {});
App.core = App.core || {};
const BUILD_ID = "20260305162535";
App.buildId = BUILD_ID;

const dom = {
    settingsToggle: document.getElementById("settings-toggle"),
    settingsPanel: document.getElementById("settings-panel"),
    themeToggle: document.getElementById("theme-toggle"),
    appEl: document.querySelector(".app"),
    noteCountInput: document.getElementById("note-count"),
    noteCountValue: document.getElementById("note-count-value"),
    segmentedButtons: Array.from(document.querySelectorAll(".segmented-btn")),
    primaryActionButton: document.getElementById("primary-action"),
    playSelectedButton: document.getElementById("play-selected"),
    volumeSlider: document.getElementById("piano-volume"),
    volumeValue: document.getElementById("volume-value"),
    pianoTrigger: document.getElementById("piano-trigger"),
    pianoLabel: document.getElementById("piano-label"),
    pianoPanel: document.getElementById("piano-panel"),
    pianoPreviewMain: document.getElementById("piano-preview-main"),
    lengthSlider: document.getElementById("note-length"),
    lengthValue: document.getElementById("length-value"),
    blindToggle: document.getElementById("blind-mode"),
    niceNotesToggle: document.getElementById("nice-notes"),
    resetSettingsButton: document.getElementById("reset-settings"),
    keyCountSlider: document.getElementById("key-count"),
    keyCountValue: document.getElementById("key-count-value"),
    startNoteDownButton: document.getElementById("start-note-down"),
    startNoteUpButton: document.getElementById("start-note-up"),
    startNoteDownOctButton: document.getElementById("start-note-down-oct"),
    startNoteUpOctButton: document.getElementById("start-note-up-oct"),
    startNoteValue: document.getElementById("start-note-value"),
    hintButton: document.getElementById("hint-button"),
    hintFlag: document.getElementById("hint-flag"),
    optionsTrigger: document.getElementById("options-trigger"),
    optionsPanel: document.getElementById("options-panel"),
    advancedTrigger: document.getElementById("advanced-trigger"),
    advancedPanel: document.getElementById("advanced-panel"),
    instrumentBrowserTrigger: document.getElementById("instrument-browser-trigger"),
    instrumentBrowserPanel: document.getElementById("instrument-browser-panel"),
    testEnvelopeButton: document.getElementById("test-envelope"),
    attackSlider: document.getElementById("attack-time"),
    attackLabelValue: document.getElementById("attack-label-value"),
    attackValue: document.getElementById("attack-value"),
    attackGhost: document.getElementById("attack-ghost"),
    decaySlider: document.getElementById("decay-rate"),
    decayLabelValue: document.getElementById("decay-label-value"),
    decayValue: document.getElementById("decay-value"),
    decayGhost: document.getElementById("decay-ghost"),
    releaseSlider: document.getElementById("release-rate"),
    releaseLabelValue: document.getElementById("release-label-value"),
    releaseValue: document.getElementById("release-value"),
    releaseGhost: document.getElementById("release-ghost"),
    sustainSlider: document.getElementById("sustain-length"),
    sustainLabelValue: document.getElementById("sustain-label-value"),
    sustainValue: document.getElementById("sustain-value"),
    sustainGhost: document.getElementById("sustain-ghost"),
    profileSearch: document.getElementById("profile-search"),
    profileList: document.getElementById("profile-list"),
    profileApply: document.getElementById("profile-apply"),
    profileSave: document.getElementById("profile-save"),
    profileMeta: document.getElementById("profile-meta"),
    chordRoundsToggle: document.getElementById("chord-rounds"),
    practiceModeSelect: document.getElementById("practice-mode"),
    trainingModeSelect: document.getElementById("training-mode"),
    chordDifficultySelect: document.getElementById("chord-difficulty"),
    chordExtraHelpersToggle: document.getElementById("chord-extra-helpers"),
    typingShowPianoToggle: document.getElementById("typing-show-piano"),
    typingShowTypedToggle: document.getElementById("typing-show-typed"),
    typingZone: document.getElementById("typing-zone"),
    chordAnswerInput: document.getElementById("chord-answer"),
    typingHelpToggle: document.getElementById("typing-help-toggle"),
    typingHelpText: document.getElementById("typing-help-text"),
    chordTutorialOpen: document.getElementById("chord-tutorial-open"),
    chordTutorialModal: document.getElementById("chord-tutorial-modal"),
    chordTutorialBackdrop: document.getElementById("chord-tutorial-backdrop"),
    chordTutorialClose: document.getElementById("chord-tutorial-close"),
    chordTutorialPrev: document.getElementById("chord-tutorial-prev"),
    chordTutorialNext: document.getElementById("chord-tutorial-next"),
    chordTutorialStep: document.getElementById("chord-tutorial-step"),
    chordTutorialProgress: document.getElementById("chord-tutorial-progress"),
    chordTutorialCurrent: document.getElementById("chord-tutorial-current"),
    chordTutorialRootList: document.getElementById("chord-tutorial-root-list"),
    chordTutorialQualityList: document.getElementById("chord-tutorial-quality-list"),
    chordTutorialExamples: document.getElementById("chord-tutorial-examples"),
    chordTutorialPiano: document.getElementById("chord-tutorial-piano"),
    chordTutorialPlay: document.getElementById("chord-tutorial-play"),
    chordReadout: document.getElementById("chord-readout"),
    statusPanel: document.getElementById("status-panel"),
    instrumentPresetSearch: document.getElementById("instrument-preset-search"),
    instrumentPresetList: document.getElementById("instrument-preset-list"),
    instrumentPresetApply: document.getElementById("instrument-preset-apply"),
    instrumentPresetMeta: document.getElementById("instrument-preset-meta"),
    roundCountEl: document.getElementById("round-count"),
    selectedListEl: document.getElementById("selected-list"),
    goalCountEl: document.getElementById("goal-count"),
    goalLabelEl: document.getElementById("goal-label"),
    modeLabelEl: document.getElementById("mode-label"),
    resultEl: document.getElementById("result"),
    revealEl: document.getElementById("reveal"),
    pedalTip: document.getElementById("pedal-tip"),
    whiteKeysContainer: document.getElementById("white-keys"),
    blackKeysContainer: document.getElementById("black-keys"),
    keyboardEl: document.getElementById("keyboard"),
    pedalIcon: document.getElementById("pedal-icon"),
    pianoOptionsContainer: document.getElementById("piano-options")
};

const {
    settingsToggle,
    settingsPanel,
    themeToggle,
    appEl,
    noteCountInput,
    noteCountValue,
    segmentedButtons,
    primaryActionButton,
    playSelectedButton,
    volumeSlider,
    volumeValue,
    pianoTrigger,
    pianoLabel,
    pianoPanel,
    pianoPreviewMain,
    lengthSlider,
    lengthValue,
    blindToggle,
    niceNotesToggle,
    resetSettingsButton,
    keyCountSlider,
    keyCountValue,
    startNoteDownButton,
    startNoteUpButton,
    startNoteDownOctButton,
    startNoteUpOctButton,
    startNoteValue,
    hintButton,
    hintFlag,
    optionsTrigger,
    optionsPanel,
    advancedTrigger,
    advancedPanel,
    instrumentBrowserTrigger,
    instrumentBrowserPanel,
    testEnvelopeButton,
    attackSlider,
    attackLabelValue,
    attackValue,
    attackGhost,
    decaySlider,
    decayLabelValue,
    decayValue,
    decayGhost,
    releaseSlider,
    releaseLabelValue,
    releaseValue,
    releaseGhost,
    sustainSlider,
    sustainLabelValue,
    sustainValue,
    sustainGhost,
    profileSearch,
    profileList,
    profileApply,
    profileSave,
    profileMeta,
    chordRoundsToggle,
    practiceModeSelect,
    trainingModeSelect,
    chordDifficultySelect,
    chordExtraHelpersToggle,
    typingShowPianoToggle,
    typingShowTypedToggle,
    typingZone,
    chordAnswerInput,
    typingHelpToggle,
    typingHelpText,
    chordTutorialOpen,
    chordTutorialModal,
    chordTutorialBackdrop,
    chordTutorialClose,
    chordTutorialPrev,
    chordTutorialNext,
    chordTutorialStep,
    chordTutorialProgress,
    chordTutorialCurrent,
    chordTutorialRootList,
    chordTutorialQualityList,
    chordTutorialExamples,
    chordTutorialPiano,
    chordTutorialPlay,
    chordReadout,
    statusPanel,
    instrumentPresetSearch,
    instrumentPresetList,
    instrumentPresetApply,
    instrumentPresetMeta,
    roundCountEl,
    selectedListEl,
    goalCountEl,
    goalLabelEl,
    modeLabelEl,
    resultEl,
    revealEl,
    pedalTip,
    whiteKeysContainer,
    blackKeysContainer,
    keyboardEl,
    pedalIcon,
    pianoOptionsContainer
} = dom;

let pianoOptions = [];
let pianoPreviewButtons = [];

const uiState = {
    get pianoOptions() {
        return pianoOptions;
    },
    set pianoOptions(value) {
        pianoOptions = value;
    },
    get pianoPreviewButtons() {
        return pianoPreviewButtons;
    },
    set pianoPreviewButtons(value) {
        pianoPreviewButtons = value;
    }
};

App.dom = dom;
App.uiState = uiState;

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
const DEFAULT_RULE_TYPING_SHOW_PIANO = true;
const DEFAULT_RULE_TYPING_SHOW_TYPED = true;
const PRACTICE_MODE_IDS = ["random", "nice", "chord"];
const createDefaultPracticeProfile = (modeId) => ({
    mode: DEFAULT_RULE_MODE,
    blindMode: DEFAULT_RULE_BLIND,
    trainingMode: modeId === "chord" ? DEFAULT_RULE_TRAINING_MODE : "keyboard",
    chordDifficulty: DEFAULT_RULE_CHORD_DIFFICULTY,
    chordExtraHelpers: DEFAULT_RULE_CHORD_EXTRA_HELPERS,
    typingShowPiano: DEFAULT_RULE_TYPING_SHOW_PIANO,
    typingShowTyped: DEFAULT_RULE_TYPING_SHOW_TYPED
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
        typingShowPiano: profile.typingShowPiano !== false,
        typingShowTyped: profile.typingShowTyped !== false
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
const getEffectivePracticeModeFromState = (sourceState = state) => {
    if (sourceState.practiceMode === "chord" || sourceState.chordMode || sourceState.trainingMode === "type" || sourceState.trainingMode === "both") {
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
        typingShowPiano: sourceState.typingShowPiano !== false,
        typingShowTyped: sourceState.typingShowTyped !== false
    };
    return sourceState.practiceProfiles[safeMode];
};
const DEFAULTS = {
    noteCount: 2,
    mode: "simultaneous",
    volume: 0.75,
    noteDuration: DEFAULT_NOTE_DURATION,
    keyCount: 24,
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
    typingShowPiano: true,
    typingShowTyped: true,
    practiceProfiles: createDefaultPracticeProfiles()
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
    typingShowPiano: DEFAULTS.typingShowPiano,
    typingShowTyped: DEFAULTS.typingShowTyped,
    practiceProfiles: createDefaultPracticeProfiles(),
    targetChord: null,
    selectedChordLabel: "",
    typedAnswer: "",
    typedPreviewNotes: [],
    submissionSource: null,
    submittedComparisonNotes: []
};
App.defaults = DEFAULTS;
App.state = state;

const SETTINGS_KEY = "piano_trainer_settings";
App.storageKey = SETTINGS_KEY;

const saveSettings = () => {
    const payload = {
        noteCount: state.noteCount,
        mode: state.mode,
        volume: state.volume,
        noteDuration: state.noteDuration,
        keyCount: state.keyCount,
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
        typingShowPiano: state.typingShowPiano,
        typingShowTyped: state.typingShowTyped
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
        state.typingShowPiano = data.typingShowPiano !== false;
        state.typingShowTyped = data.typingShowTyped !== false;
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
    state.typingShowPiano = DEFAULTS.typingShowPiano;
    state.typingShowTyped = DEFAULTS.typingShowTyped;
    state.practiceProfiles = createDefaultPracticeProfiles();
    state.targetChord = null;
    state.selectedChordLabel = "";
    state.typedAnswer = "";
    state.typedPreviewNotes = [];
    state.submissionSource = null;
    state.submittedComparisonNotes = [];
};

let audioContext;
let masterGain;
let masterHighpass;
let masterCompressor;
let masterOutputGain;
const activeVoices = new Set();
const activeVoicesById = new Map();
const activeKeyTimers = new Set();
const keyTimersByNote = new Map();
let revealPlaying = false;
let revealTimer = null;
const holdState = {
    active: false,
    holding: false,
    pressAt: 0,
    holdTimer: null,
    noteIds: [],
    stopAt: 0
};
const pointerActiveNotes = new Map();
const manualNoteState = new Map();
let lastReveal = null;
let keyboardUnlockTimer = null;
const keyActiveCounts = new Map();
const revealTimers = [];
let revealSequenceId = 0;
const pedalState = {
    active: false,
    pending: new Set(),
    keysDown: new Set()
};
const noteMap = new Map();
const keyMap = new Map();
const previewState = {
    playing: false,
    timers: new Set(),
    pedalActive: false,
    pendingNotes: new Set(),
    activeNotes: new Set(),
    pedalOffTimer: null,
    pedalOnAt: 0,
    pedalOffAt: 0,
    pedalOnTimer: null,
    preset: null
};

const buildNotes = (count) => {
    const notes = [];
    const maxStart = Math.max(MIN_START_MIDI, MAX_MIDI - count + 1);
    const startMidi = Math.min(Math.max(state.startMidi, MIN_START_MIDI), maxStart);
    state.startMidi = startMidi;
    const endMidi = startMidi + count - 1;
    for (let midi = startMidi; midi <= endMidi; midi += 1) {
        const name = NOTE_NAMES[midi % 12];
        const octave = Math.floor(midi / 12) - 1;
        const id = `${name}${octave}`;
        const frequency = 440 * Math.pow(2, (midi - 69) / 12);
        const isBlack = name.includes("#");
        notes.push({ id, name, octave, frequency, isBlack, midi });
    }
    return notes;
};

const getNoteIdByMidi = (midi) => {
    if (!notes.length) return null;
    const minMidi = notes[0].midi;
    const maxMidi = notes[notes.length - 1].midi;
    const clamped = clamp(Math.round(midi), minMidi, maxMidi);
    const index = clamped - minMidi;
    return notes[index]?.id ?? notes[notes.length - 1].id;
};

let notes = buildNotes(state.keyCount);
notes.forEach((note) => noteMap.set(note.id, note));
noteCountInput.max = notes.length;

const CONSONANT_INTERVALS = new Set([0, 3, 4, 5, 7, 8, 9, 12]);
const recentNiceCombos = [];
const MAX_NICE_HISTORY = 8;
const recentTargets = [];
const MAX_TARGET_HISTORY = 3;

const isConsonant = (a, b) => {
    const interval = Math.abs(a.midi - b.midi) % 12;
    return CONSONANT_INTERVALS.has(interval);
};

const getNicePool = () => notes;

const getNoteCountMax = () => {
    const poolSize = getNicePool().length;
    const base = Math.max(1, Math.floor(poolSize / 3));
    return Math.min(6, Math.max(2, base));
};

const updateNoteCountMax = () => {
    const max = getNoteCountMax();
    noteCountInput.max = String(max);
    if (state.noteCount > max) {
        state.noteCount = max;
    }
    noteCountInput.value = String(state.noteCount);
    noteCountValue.textContent = `${state.noteCount} notes`;
};

const getCssNumber = (value) => Number.parseFloat(value.replace("px", "")) || 0;
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const getMaxStartMidi = () => Math.max(MIN_START_MIDI, MAX_MIDI - state.keyCount + 1);
const clampStartMidi = (value) => clamp(value, MIN_START_MIDI, getMaxStartMidi());
const getMidiLabel = (midi) => {
    const name = NOTE_NAMES[midi % 12];
    const octave = Math.floor(midi / 12) - 1;
    return `${name}${octave}`;
};
const getPanelBottomGap = () => {
    const rootStyles = getComputedStyle(document.documentElement);
    return getCssNumber(rootStyles.getPropertyValue("--panel-bottom-gap")) || 24;
};

const normalizeSoundfontDefinition = (entry) => {
    if (!entry || typeof entry !== "object") return null;
    const id = String(entry.id ?? "").trim();
    if (!id) return null;
    return {
        ...entry,
        id,
        label: String(entry.label ?? id),
        description: String(entry.description ?? entry.desc ?? ""),
        baseAdsr: {
            attack: Number.isFinite(entry.baseAdsr?.attack) ? entry.baseAdsr.attack : 0.016,
            decay: Number.isFinite(entry.baseAdsr?.decay) ? entry.baseAdsr.decay : 0.95,
            sustain: Number.isFinite(entry.baseAdsr?.sustain) ? entry.baseAdsr.sustain : 0.75,
            release: Number.isFinite(entry.baseAdsr?.release) ? entry.baseAdsr.release : 1.2
        },
        volume: Number.isFinite(entry.volume) ? entry.volume : 1,
        velocityCurve: Number.isFinite(entry.velocityCurve) ? entry.velocityCurve : 1.6
    };
};

const setSoundfontCatalog = (items = []) => {
    const nextCatalog = {};
    Object.values(BUILTIN_SOUNDFONTS).forEach((entry) => {
        const normalized = normalizeSoundfontDefinition(entry);
        if (normalized) nextCatalog[normalized.id] = normalized;
    });
    Object.values(PIANO_PRESETS).forEach((entry) => {
        if (!entry?.advancedOnly) return;
        const normalized = normalizeSoundfontDefinition(entry);
        if (normalized) nextCatalog[normalized.id] = normalized;
    });
    items.forEach((entry) => {
        const normalized = normalizeSoundfontDefinition(entry);
        if (!normalized) return;
        nextCatalog[normalized.id] = normalized;
    });
    PIANO_PRESETS = nextCatalog;
    App.presets = PIANO_PRESETS;
    if (!PIANO_PRESETS[state.pianoTone]) {
        state.pianoTone = PIANO_PRESETS[DEFAULT_PIANO] ? DEFAULT_PIANO : Object.keys(PIANO_PRESETS)[0];
    }
};

const getSoundfontList = () => Object.values(PIANO_PRESETS);

function renderPianoOptions() {
    if (!pianoOptionsContainer) return;
    pianoOptionsContainer.innerHTML = "";
    const fragment = document.createDocumentFragment();
    Object.entries(PIANO_PRESETS).forEach(([key, preset]) => {
        if (preset.advancedOnly) return;
        const option = document.createElement("div");
        option.className = "piano-option";
        if (preset.simple) {
            option.classList.add("simple");
        }
        option.dataset.piano = key;
        option.tabIndex = 0;

        const info = document.createElement("div");
        info.className = "piano-info";

        const name = document.createElement("div");
        name.className = "piano-name";
        name.textContent = preset.label ?? key;

        const desc = document.createElement("div");
        desc.className = "piano-desc";
        desc.textContent = preset.description ?? "";

        info.appendChild(name);
        if (desc.textContent) {
            info.appendChild(desc);
        }

        const preview = document.createElement("button");
        preview.className = "piano-preview";
        preview.type = "button";
        preview.dataset.piano = key;
        preview.setAttribute("aria-label", `Play ${name.textContent} preview`);

        option.appendChild(info);
        option.appendChild(preview);
        fragment.appendChild(option);
    });

    pianoOptionsContainer.appendChild(fragment);
    pianoOptions = Array.from(pianoOptionsContainer.querySelectorAll(".piano-option"));
    pianoPreviewButtons = Array.from(pianoOptionsContainer.querySelectorAll(".piano-preview"));
}

const createKey = (note, variant) => {
    const key = document.createElement("button");
    key.type = "button";
    key.className = `key ${variant}`;
    key.dataset.note = note.id;
    key.setAttribute("aria-pressed", "false");
    const label = document.createElement("span");
    label.textContent = note.id;
    key.appendChild(label);
    keyMap.set(note.id, key);
    return key;
};

const renderKeyboard = () => {
    whiteKeysContainer.innerHTML = "";
    blackKeysContainer.innerHTML = "";
    keyMap.clear();

    const rootStyles = getComputedStyle(document.documentElement);
    const whiteWidth = getCssNumber(rootStyles.getPropertyValue("--white-width"));
    const blackWidth = getCssNumber(rootStyles.getPropertyValue("--black-width"));

    let whiteCount = 0;
    notes.forEach((note) => {
        if (note.isBlack) {
            const key = createKey(note, "black");
            const left = whiteCount * whiteWidth - blackWidth / 2;
            key.style.left = `${left}px`;
            blackKeysContainer.appendChild(key);
        } else {
            const key = createKey(note, "white");
            whiteKeysContainer.appendChild(key);
            whiteCount += 1;
        }
    });

    keyboardEl.style.setProperty("--white-count", whiteCount);
    document.documentElement.style.setProperty("--white-count", whiteCount);
    appEl.style.setProperty("--keyboard-width", `${whiteCount * whiteWidth}px`);
    const lastNote = notes[notes.length - 1];
    const keyboardWrapper = keyboardEl.closest(".keyboard-wrapper");
    if (keyboardWrapper) {
        keyboardWrapper.classList.toggle("ends-black", Boolean(lastNote?.isBlack));
    }
    updateKeyboardScale();
};

const rebuildKeyboard = () => {
    noteMap.clear();
    notes = buildNotes(state.keyCount);
    notes.forEach((note) => noteMap.set(note.id, note));
    updateNoteCountMax();
    renderKeyboard();
    updateKeyStates();
};

