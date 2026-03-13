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

App.runtimeRefs = {
    noteMap,
    keyMap,
    getNotes: () => notes
};

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
App.utils = App.utils || {};
App.utils.clamp = clamp;
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

const motionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)") ?? null;
const syncReducedMotionPreference = () => {
    const reduced = Boolean(motionQuery?.matches);
    if (document.body) {
        document.body.dataset.reducedMotion = reduced ? "true" : "false";
    }
};
if (motionQuery) {
    if (typeof motionQuery.addEventListener === "function") {
        motionQuery.addEventListener("change", syncReducedMotionPreference);
    } else if (typeof motionQuery.addListener === "function") {
        motionQuery.addListener(syncReducedMotionPreference);
    }
}
syncReducedMotionPreference();
App.motion = App.motion || {};
App.motion.isReduced = () => document.body?.dataset?.reducedMotion === "true";

