var App = window.App || (window.App = {});
App.audio = App.audio || {};

const ABORT_RELEASE_RATE = 28;
const MIN_ENVELOPE_GAIN = 0.0001;
const AUDIO_ENVELOPE_API = App.envelope || {};
const AUDIO_DEFAULT_SOUNDFONT_ENVELOPE = AUDIO_ENVELOPE_API.DEFAULT_SOUNDFONT_ENVELOPE || {
    attack: 0.016,
    decay: 0.95,
    sustain: 0.75,
    release: 1.2
};
const AUDIO_ADSR_TRIM_STRENGTH = AUDIO_ENVELOPE_API.ADSR_TRIM_STRENGTH || {
    attack: 0.55,
    decay: 0.55,
    release: 0.6,
    length: 0.6
};
const AUDIO_DEFAULT_VELOCITY_CURVE = AUDIO_ENVELOPE_API.DEFAULT_VELOCITY_CURVE || 1.6;
const SF2_CHANNEL = 0;
const SF2_ATTACK_GEN = 34;
const SF2_DECAY_GEN = 36;
const SF2_RELEASE_GEN = 38;
const SF2_ATTACK_TIMECENTS_TRIM = 320;
const SF2_DECAY_TIMECENTS_TRIM = 260;
const SF2_RELEASE_TIMECENTS_TRIM = 360;
const GM_PROGRAM_ENVELOPES = [
    { min: 0, max: 7, adsr: { attack: 0.012, decay: 0.9, sustain: 0.72, release: 1.15 } },
    { min: 8, max: 15, adsr: { attack: 0.005, decay: 0.7, sustain: 0.62, release: 0.9 } },
    { min: 16, max: 23, adsr: { attack: 0.006, decay: 0.42, sustain: 0.96, release: 0.65 } },
    { min: 24, max: 31, adsr: { attack: 0.008, decay: 0.68, sustain: 0.58, release: 0.95 } },
    { min: 32, max: 39, adsr: { attack: 0.006, decay: 0.5, sustain: 0.67, release: 0.75 } },
    { min: 40, max: 47, adsr: { attack: 0.045, decay: 1.2, sustain: 0.84, release: 1.7 } },
    { min: 48, max: 55, adsr: { attack: 0.03, decay: 1.0, sustain: 0.82, release: 1.4 } },
    { min: 56, max: 63, adsr: { attack: 0.02, decay: 0.85, sustain: 0.74, release: 1.05 } },
    { min: 64, max: 71, adsr: { attack: 0.018, decay: 0.78, sustain: 0.78, release: 1.1 } },
    { min: 72, max: 79, adsr: { attack: 0.012, decay: 0.9, sustain: 0.8, release: 1.15 } },
    { min: 80, max: 87, adsr: { attack: 0.008, decay: 0.48, sustain: 0.86, release: 0.75 } },
    { min: 88, max: 95, adsr: { attack: 0.06, decay: 1.5, sustain: 0.88, release: 1.8 } },
    { min: 96, max: 103, adsr: { attack: 0.02, decay: 0.9, sustain: 0.65, release: 1.2 } },
    { min: 104, max: 111, adsr: { attack: 0.014, decay: 0.8, sustain: 0.66, release: 1.0 } },
    { min: 112, max: 119, adsr: { attack: 0.004, decay: 0.35, sustain: 0.45, release: 0.6 } },
    { min: 120, max: 127, adsr: { attack: 0.012, decay: 0.75, sustain: 0.7, release: 1.1 } }
];

const soundfontCache = new Map();
let soundfontRefreshPromise = null;
let soundfontRefreshRunLoadsAll = false;
let soundfontRefreshNeedsFullPass = false;
let sf2BrowserIsComplete = false;
const sf2BrowserPresets = [];
const sf2ToneToPreset = new Map();
const sf2Runtime = {
    readyPromise: null,
    synth: null,
    node: null,
    byPath: new Map()
};
const RUNNING_FROM_FILE_PROTOCOL = window.location?.protocol === "file:";
let didWarnFileProtocol = false;

const clampValue = (value, min, max) => Math.min(Math.max(value, min), max);
const releaseRateToSeconds = (releaseRate) => Math.max(0.03, 0.8 / Math.max(1, releaseRate));
const getBaseAdsrForProgram = (program = 0) => {
    const normalized = clampValue(Math.round(program), 0, 127);
    const matched = GM_PROGRAM_ENVELOPES.find((entry) => normalized >= entry.min && normalized <= entry.max);
    if (!matched) return { ...AUDIO_DEFAULT_SOUNDFONT_ENVELOPE };
    return { ...matched.adsr };
};
const slugify = (value) =>
    String(value ?? "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "soundfont";

const toUnixPath = (value) => String(value ?? "").replace(/\\/g, "/");

const getDirectoryPath = (path) => {
    const normalized = toUnixPath(path);
    const index = normalized.lastIndexOf("/");
    return index === -1 ? "" : normalized.slice(0, index + 1);
};

const resolveRelativePath = (baseDir, relativePath) => {
    const base = toUnixPath(baseDir);
    const rel = toUnixPath(relativePath);
    if (/^https?:\/\//i.test(rel) || rel.startsWith("/")) {
        return rel;
    }
    return `${base}${rel}`;
};

const normalizeManifestPath = (value) => {
    const normalized = toUnixPath(value).replace(/^\.\//, "").replace(/^\/+/, "");
    if (!normalized) return "";
    const withConfig = normalized.endsWith(".json")
        ? normalized
        : `${normalized.replace(/\/+$/, "")}/soundfont.json`;
    if (/^https?:\/\//i.test(withConfig) || withConfig.startsWith("/")) {
        return withConfig;
    }
    if (withConfig.startsWith(`${SOUNDFONT_DIR}/`)) {
        return withConfig;
    }
    return `${SOUNDFONT_DIR}/${withConfig}`;
};

const fetchTextSafe = async (url) => {
    if (RUNNING_FROM_FILE_PROTOCOL) {
        if (!didWarnFileProtocol) {
            console.warn("Local file mode detected. Soundfont discovery needs an http(s) local server.");
            didWarnFileProtocol = true;
        }
        return null;
    }
    try {
        const response = await fetch(url, { cache: "no-store" });
        if (!response.ok) return null;
        return await response.text();
    } catch (error) {
        return null;
    }
};

const fetchJsonSafe = async (url) => {
    if (RUNNING_FROM_FILE_PROTOCOL) {
        if (!didWarnFileProtocol) {
            console.warn("Local file mode detected. Soundfont discovery needs an http(s) local server.");
            didWarnFileProtocol = true;
        }
        return null;
    }
    try {
        const response = await fetch(url, { cache: "no-store" });
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        return null;
    }
};

const parseDirectoryListing = (html) => {
    if (!html) return [];
    const links = [];
    const regex = /href\s*=\s*"([^"]+)"/gi;
    let match;
    while ((match = regex.exec(html)) !== null) {
        const href = match[1].trim();
        if (!href || href === "../" || href.startsWith("?")) continue;
        links.push(href);
    }
    return links;
};

const NOTE_TO_SEMITONE = {
    C: 0,
    "C#": 1,
    Db: 1,
    D: 2,
    "D#": 3,
    Eb: 3,
    E: 4,
    F: 5,
    "F#": 6,
    Gb: 6,
    G: 7,
    "G#": 8,
    Ab: 8,
    A: 9,
    "A#": 10,
    Bb: 10,
    B: 11
};

const noteIdToMidi = (noteId) => {
    if (typeof noteId !== "string") return null;
    const match = noteId.trim().match(/^([A-Ga-g])([#b]?)(-?\d+)$/);
    if (!match) return null;
    const letter = match[1].toUpperCase();
    const accidental = match[2] || "";
    const octave = Number.parseInt(match[3], 10);
    const key = `${letter}${accidental}`;
    const semitone = NOTE_TO_SEMITONE[key];
    if (!Number.isFinite(semitone) || !Number.isFinite(octave)) return null;
    return (octave + 1) * 12 + semitone;
};

const frequencyToMidi = (frequency) => {
    if (!Number.isFinite(frequency) || frequency <= 0) return 60;
    return Math.round(69 + 12 * Math.log2(frequency / 440));
};

