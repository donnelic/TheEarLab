const settingsToggle = document.getElementById("settings-toggle");
const settingsPanel = document.getElementById("settings-panel");
const themeToggle = document.getElementById("theme-toggle");
const appEl = document.querySelector(".app");
const noteCountInput = document.getElementById("note-count");
const noteCountValue = document.getElementById("note-count-value");
const segmentedButtons = Array.from(document.querySelectorAll(".segmented-btn"));
const primaryActionButton = document.getElementById("primary-action");
const playSelectedButton = document.getElementById("play-selected");
const volumeSlider = document.getElementById("piano-volume");
const volumeValue = document.getElementById("volume-value");
const pianoTrigger = document.getElementById("piano-trigger");
const pianoLabel = document.getElementById("piano-label");
const pianoPanel = document.getElementById("piano-panel");
const pianoPreviewMain = document.getElementById("piano-preview-main");
const lengthSlider = document.getElementById("note-length");
const lengthValue = document.getElementById("length-value");
const blindToggle = document.getElementById("blind-mode");
const niceNotesToggle = document.getElementById("nice-notes");
const resetSettingsButton = document.getElementById("reset-settings");
const keyCountSlider = document.getElementById("key-count");
const keyCountValue = document.getElementById("key-count-value");
const startNoteDownButton = document.getElementById("start-note-down");
const startNoteUpButton = document.getElementById("start-note-up");
const startNoteDownOctButton = document.getElementById("start-note-down-oct");
const startNoteUpOctButton = document.getElementById("start-note-up-oct");
const startNoteValue = document.getElementById("start-note-value");
const hintButton = document.getElementById("hint-button");
const hintFlag = document.getElementById("hint-flag");
const homeButton = document.getElementById("home-button");
const advancedTrigger = document.getElementById("advanced-trigger");
const advancedPanel = document.getElementById("advanced-panel");
const testEnvelopeButton = document.getElementById("test-envelope");
const attackSlider = document.getElementById("attack-time");
const attackValue = document.getElementById("attack-value");
const decaySlider = document.getElementById("decay-rate");
const decayValue = document.getElementById("decay-value");
const releaseSlider = document.getElementById("release-rate");
const releaseValue = document.getElementById("release-value");
const sustainSlider = document.getElementById("sustain-length");
const sustainValue = document.getElementById("sustain-value");
const roundCountEl = document.getElementById("round-count");
const selectedListEl = document.getElementById("selected-list");
const goalCountEl = document.getElementById("goal-count");
const modeLabelEl = document.getElementById("mode-label");
const resultEl = document.getElementById("result");
const revealEl = document.getElementById("reveal");
const pedalTip = document.getElementById("pedal-tip");
const whiteKeysContainer = document.getElementById("white-keys");
const blackKeysContainer = document.getElementById("black-keys");
const keyboardEl = document.getElementById("keyboard");
const pedalIcon = document.getElementById("pedal-icon");
const pianoOptionsContainer = document.getElementById("piano-options");
let pianoOptions = [];
let pianoPreviewButtons = [];

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
const PIANO_PRESETS = {
    classical: {
        label: "Classical",
        // Lower filter to warm up the new "Even" harmonics
        filterFrequency: 1100,
        noiseLevel: 0.15,
        noiseDecay: 0.1,
        oscillators: [
            // OSC 1: The Body (Triangle) -> Provides Odd Harmonics (1, 3, 5...)
            { type: "triangle", ratio: 1.0, detune: 0, gain: 0.55 },

            // OSC 2: The Unison (Triangle) -> Adds movement
            { type: "triangle", ratio: 1.002, detune: -3, gain: 0.25 },

            // OSC 3: The Octave Fix (Sine) -> Provides Even Harmonic (2)
            // CRITICAL: We use a Sine here, not a Triangle. 
            // A Triangle at ratio 2 would sound like ratio 2, 6, 10. We need a pure 2.
            { type: "sine", ratio: 2.005, detune: 1, gain: 0.35 },

            // OSC 4: The Texture Fix (Sine) -> Provides Even Harmonic (4)
            // This fills the specific "Organ Gap" at the double octave.
            { type: "sine", ratio: 4.01, detune: 0, gain: 0.08 }
        ]
    },
    grand: {
        label: "Grand Piano",
        // Lower filter to remove "toy synth" fizz, but keep Q low for warmth
        filterFrequency: 2200,
        filterQ: 0.5,
        noiseLevel: 0.02,             // Very subtle noise, hammer handles the rest
        noiseDecay: 0.1,              // Multiplier: Short noise burst
        unison: { voices: 3, detuneCents: [-2, 0, 2], stereoSpread: 0.1 }, // Tighter unison to reduce phasing
        oscillators: [
            // OSC 1: THE BODY (Fundamental)
            // Gain increased to ensure this is the dominant pitch (fixing the "high note" feeling)
            {
                type: "sine", ratio: 1.0, detune: 0, gain: 1.0,
                // Decay x1.0 means it follows your master decay setting exactly.
                // Sustain x0.0 forces the piano "fade out" behavior.
                adsr: { attack: 1.0, decay: 1.0, sustain: 1.0, release: 1.0, peak: 1.0 }
            },
            // OSC 2: THE WARMTH (Octave)
            // Lower gain so it doesn't overpower the fundamental
            {
                type: "triangle", ratio: 2.0, detune: 0.5, gain: 0.3,
                // Decay x0.7: Harmonics die faster than the fundamental
                adsr: { attack: 1.0, decay: 0.7, sustain: 0.6, release: 0.8, peak: 0.8 }
            },
            // OSC 3: THE COLOR (Fifth)
            // Very quiet, just for timbre
            {
                type: "sine", ratio: 3.0, detune: -1, gain: 0.15,
                // Decay x0.5: Dies away quickly leaving just the pure note
                adsr: { attack: 1.0, decay: 0.5, sustain: 0.0, release: 0.6, peak: 0.6 }
            },
            // OSC 4: THE METALLIC ATTACK (High Harmonic)
            // Replaces the "click" with a tonal "ping"
            {
                type: "sine", ratio: 8.0, detune: 0, gain: 0.03,
                adsr: { attack: 0.0, decay: 0.1, sustain: 0.0, release: 0.1, peak: 0.5 }
            }
        ],
        hammerTransient: {
            level: 0.15,             // Drastically reduced from 0.9/1.2
            shape: "noise+lowpass",  // Lowpass removes the high-pitch "digital click"
            centerFreq: 150,         // 150Hz = A deep wooden thud, not a plastic snap
            decay: 0.05,             // Very fast thud
            velocityScale: 3.0       // Only becomes audible when you hit keys hard
        },
        stringResonators: [
            { ratio: 1.0, gain: 0.15, decay: 1.5 },
            { ratio: 2.0, gain: 0.05, decay: 1.0 }
        ],
        bodyResonance: {
            gain: 0.25,
            lowShelfFreq: 150,
            lowShelfGain: 5.0,       // Boosts the 150Hz range to add "weight" to the sound
            reverbPreDelay: 0.01,
            reverbDecay: 1.2
        },
        velocityCurve: 2.0,
        masterGain: 1.3
    },

    organ: {
        label: "Organ",
        filterFrequency: 5200,
        noiseLevel: 0.02,
        noiseDecay: 0.02,
        oscillators: [
            { type: "sine", ratio: 1, detune: 0, gain: 0.7 },
            { type: "sine", ratio: 2, detune: 0, gain: 0.42 },
            { type: "sine", ratio: 4, detune: 0, gain: 0.25 },
            { type: "sine", ratio: 8, detune: 0, gain: 0.12 }
        ]
    },
    felt: {
        label: "Felt",
        filterFrequency: 3200,
        noiseLevel: 0.08,
        noiseDecay: 0.07,
        oscillators: [
            { type: "triangle", ratio: 1, detune: -6, gain: 0.85 },
            { type: "sine", ratio: 2, detune: 0, gain: 0.35 },
            { type: "sine", ratio: 0.5, detune: 4, gain: 0.18 }
        ]
    },
    bright: {
        label: "Bright",
        filterFrequency: 5800,
        noiseLevel: 0.22,
        noiseDecay: 0.05,
        oscillators: [
            { type: "sine", ratio: 1, detune: -2, gain: 0.85 },
            { type: "square", ratio: 2, detune: 1, gain: 0.24 },
            { type: "sawtooth", ratio: 3, detune: 4, gain: 0.2 }
        ]
    },
    bell: {
        label: "Bell",
        filterFrequency: 7000,
        noiseLevel: 0.05,
        noiseDecay: 0.03,
        oscillators: [
            { type: "sine", ratio: 1, detune: 0, gain: 0.85 },
            { type: "sine", ratio: 2.01, detune: 2, gain: 0.38 },
            { type: "sine", ratio: 3.02, detune: -3, gain: 0.22 },
            { type: "sine", ratio: 5.01, detune: 1, gain: 0.12 }
        ]
    }
};
const DEFAULT_PIANO = "classical";
const DEFAULT_NOTE_DURATION = 1.2;
const DEFAULTS = {
    noteCount: 2,
    mode: "simultaneous",
    volume: 0.45,
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

const SETTINGS_KEY = "piano_trainer_settings";

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

loadSettings();
renderPianoOptions();

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

