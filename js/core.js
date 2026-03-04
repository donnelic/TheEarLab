var App = window.App || (window.App = {});
App.core = App.core || {};

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
    homeButton: document.getElementById("home-button"),
    advancedTrigger: document.getElementById("advanced-trigger"),
    advancedPanel: document.getElementById("advanced-panel"),
    testEnvelopeButton: document.getElementById("test-envelope"),
    attackSlider: document.getElementById("attack-time"),
    attackValue: document.getElementById("attack-value"),
    decaySlider: document.getElementById("decay-rate"),
    decayValue: document.getElementById("decay-value"),
    releaseSlider: document.getElementById("release-rate"),
    releaseValue: document.getElementById("release-value"),
    sustainSlider: document.getElementById("sustain-length"),
    sustainValue: document.getElementById("sustain-value"),
    roundCountEl: document.getElementById("round-count"),
    selectedListEl: document.getElementById("selected-list"),
    goalCountEl: document.getElementById("goal-count"),
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
    homeButton,
    advancedTrigger,
    advancedPanel,
    testEnvelopeButton,
    attackSlider,
    attackValue,
    decaySlider,
    decayValue,
    releaseSlider,
    releaseValue,
    sustainSlider,
    sustainValue,
    roundCountEl,
    selectedListEl,
    goalCountEl,
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
const PIANO_PRESETS = {
    felt: {
        label: "Felt Piano",
        engine: "modal",
        masterGain: 1.0,
        velocityCurve: 2.0,
        filterFrequency: 5800,
        filterQ: 0.7,
        attackNoise: { level: 0.08, decay: 0.03, hp: 1600 },
        partials: [
            { type: "sine", ratio: 1, gain: 1.0, adsr: { decay: 1.0, sustain: 0.7 } },
            { type: "triangle", ratio: 2, gain: 0.32, adsr: { decay: 0.8, sustain: 0.4 } },
            { type: "sine", ratio: 3, gain: 0.16, adsr: { decay: 0.6, sustain: 0.25 } }
        ],
        resonators: [
            { ratio: 1.0, q: 18, decay: 2.4, gain: 0.45 },
            { ratio: 1.7, q: 12, decay: 1.9, gain: 0.28 },
            { ratio: 2.4, q: 9, decay: 1.3, gain: 0.18 }
        ],
        bodyResonance: { gain: 0.25, lowShelfFreq: 150, lowShelfGain: 3.0 }
    },
    piano: {
        label: "Studio Piano",
        engine: "modal",
        masterGain: 1.0,
        velocityCurve: 2.0,
        filterFrequency: 7600,
        filterQ: 0.8,
        attackNoise: { level: 0.12, decay: 0.025, hp: 1400 },
        partials: [
            { type: "sine", ratio: 1, gain: 1.0, adsr: { decay: 1.1, sustain: 0.85 } },
            { type: "triangle", ratio: 2, gain: 0.35, adsr: { decay: 0.9, sustain: 0.55 } },
            { type: "sine", ratio: 3.01, gain: 0.2, adsr: { decay: 0.75, sustain: 0.35 } },
            { type: "sine", ratio: 4.8, gain: 0.12, adsr: { decay: 0.55, sustain: 0.2 } }
        ],
        resonators: [
            { ratio: 1.0, q: 20, decay: 2.6, gain: 0.55 },
            { ratio: 1.6, q: 14, decay: 2.0, gain: 0.32 },
            { ratio: 2.3, q: 12, decay: 1.5, gain: 0.22 },
            { ratio: 3.8, q: 9, decay: 1.1, gain: 0.14 }
        ],
        bodyResonance: { gain: 0.3, lowShelfFreq: 140, lowShelfGain: 3.5 }
    },
    classical: {
        label: "Concert Grand",
        engine: "modal",
        masterGain: 1.0,
        velocityCurve: 2.0,
        filterFrequency: 8200,
        filterQ: 0.95,
        attackNoise: { level: 0.1, decay: 0.02, hp: 1700 },
        partials: [
            { type: "sine", ratio: 1, gain: 1.0, adsr: { decay: 1.2, sustain: 0.9 } },
            { type: "triangle", ratio: 2, gain: 0.28, adsr: { decay: 0.9, sustain: 0.45 } },
            { type: "sine", ratio: 3.02, gain: 0.18, adsr: { decay: 0.7, sustain: 0.28 } },
            { type: "sine", ratio: 5.1, gain: 0.1, adsr: { decay: 0.55, sustain: 0.18 } }
        ],
        resonators: [
            { ratio: 1.0, q: 22, decay: 3.0, gain: 0.6 },
            { ratio: 1.9, q: 16, decay: 2.2, gain: 0.35 },
            { ratio: 2.7, q: 13, decay: 1.6, gain: 0.24 },
            { ratio: 4.2, q: 10, decay: 1.2, gain: 0.16 }
        ],
        bodyResonance: { gain: 0.32, lowShelfFreq: 130, lowShelfGain: 4.0 }
    },
    nylon: {
        label: "Nylon Guitar",
        engine: "modal",
        masterGain: 1.0,
        velocityCurve: 2.0,
        filterFrequency: 6400,
        attackNoise: { level: 0.09, decay: 0.035, hp: 2200 },
        partials: [
            { type: "sine", ratio: 1, gain: 0.95, adsr: { decay: 1.0, sustain: 0.82 } },
            { type: "triangle", ratio: 2, gain: 0.22, adsr: { decay: 0.8, sustain: 0.4 } },
            { type: "sine", ratio: 3, gain: 0.12, adsr: { decay: 0.6, sustain: 0.2 } }
        ],
        resonators: [
            { ratio: 1.0, q: 16, decay: 2.6, gain: 0.45 },
            { ratio: 2.0, q: 12, decay: 1.8, gain: 0.28 },
            { ratio: 3.1, q: 10, decay: 1.3, gain: 0.18 }
        ],
        bodyResonance: { gain: 0.22, lowShelfFreq: 180, lowShelfGain: 2.6 }
    },
    ep: {
        label: "Electric Piano",
        engine: "fm",
        masterGain: 1.0,
        velocityCurve: 2.0,
        fm: { carrierType: "sine", modType: "sine", modRatio: 2.0, modIndex: 3.2, feedback: 0.1 },
        tremolo: { rate: 5.2, depth: 0.05 },
        filter: { frequency: 2400, q: 0.9 },
        attackNoise: { level: 0.05, decay: 0.03, hp: 1200 }
    },
    bell: {
        label: "Bell Pad",
        engine: "modal",
        masterGain: 1.0,
        velocityCurve: 2.0,
        filterFrequency: 9200,
        partials: [
            { type: "sine", ratio: 1, gain: 0.8, adsr: { decay: 1.9, sustain: 0.4 } },
            { type: "sine", ratio: 2.7, gain: 0.42, adsr: { decay: 1.7, sustain: 0.32 } },
            { type: "sine", ratio: 5.1, gain: 0.25, adsr: { decay: 1.4, sustain: 0.2 } },
            { type: "sine", ratio: 7.2, gain: 0.14, adsr: { decay: 1.1, sustain: 0.12 } }
        ],
        resonators: [
            { ratio: 1.0, q: 14, decay: 3.0, gain: 0.5 },
            { ratio: 2.5, q: 12, decay: 2.2, gain: 0.3 },
            { ratio: 4.0, q: 10, decay: 1.6, gain: 0.2 }
        ],
        attackNoise: { level: 0.07, decay: 0.04, hp: 2000 }
    }
};
App.presets = PIANO_PRESETS;
const DEFAULT_PIANO = "felt";
const DEFAULT_NOTE_DURATION = 1.2;
const DEFAULTS = {
    noteCount: 2,
    mode: "simultaneous",
    volume: 0.65,
    noteDuration: DEFAULT_NOTE_DURATION,
    keyCount: 24,
    startMidi: DEFAULT_START_MIDI,
    blindMode: false,
    niceMode: false,
    theme: "light",
    pianoTone: DEFAULT_PIANO,
    adsr: {
        attack: 0.02,
        decayRate: 0.5,
        releaseRate: 15,
        sustainLength: DEFAULT_NOTE_DURATION,
        peak: 1
    }
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
    adsr: { ...DEFAULTS.adsr }
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
        adsr: { ...state.adsr }
    };
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
        state.pianoTone = PIANO_PRESETS[data.pianoTone] ? data.pianoTone : DEFAULTS.pianoTone;
        state.adsr = {
            attack: Number.isFinite(data.adsr?.attack) ? data.adsr.attack : DEFAULTS.adsr.attack,
            decayRate: Number.isFinite(data.adsr?.decayRate) ? data.adsr.decayRate : DEFAULTS.adsr.decayRate,
            releaseRate: Number.isFinite(data.adsr?.releaseRate) ? data.adsr.releaseRate : DEFAULTS.adsr.releaseRate,
            sustainLength: Number.isFinite(data.adsr?.sustainLength)
                ? data.adsr.sustainLength
                : DEFAULTS.adsr.sustainLength,
            peak: Number.isFinite(data.adsr?.peak) ? data.adsr.peak : DEFAULTS.adsr.peak
        };
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
    state.adsr = { ...DEFAULTS.adsr };
};

let audioContext;
let masterGain;
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

function renderPianoOptions() {
    if (!pianoOptionsContainer) return;
    pianoOptionsContainer.innerHTML = "";
    const fragment = document.createDocumentFragment();
    Object.entries(PIANO_PRESETS).forEach(([key, preset]) => {
        const option = document.createElement("div");
        option.className = "piano-option";
        option.dataset.piano = key;
        option.tabIndex = 0;

        const info = document.createElement("div");
        info.className = "piano-info";

        const name = document.createElement("div");
        name.className = "piano-name";
        name.textContent = preset.label ?? key;

        const desc = document.createElement("div");
        desc.className = "piano-desc";
        desc.textContent = preset.desc ?? preset.description ?? "";

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

