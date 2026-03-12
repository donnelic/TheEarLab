var App = window.App || (window.App = {});
App.game = App.game || {};

const CHORD_ROOT_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const CHORD_ROOT_ALIASES = {
    C: 0,
    "B#": 0,
    "C#": 1,
    DB: 1,
    D: 2,
    "D#": 3,
    EB: 3,
    E: 4,
    FB: 4,
    F: 5,
    "E#": 5,
    "F#": 6,
    GB: 6,
    G: 7,
    "G#": 8,
    AB: 8,
    A: 9,
    "A#": 10,
    BB: 10,
    B: 11,
    CB: 11
};

const CHORD_QUALITIES = [
    { id: "maj", suffix: "", intervals: [0, 4, 7], aliases: ["", "maj", "major", "mjr"] },
    { id: "min", suffix: "m", intervals: [0, 3, 7], aliases: ["m", "min", "minor", "-"] },
    { id: "sus2", suffix: "sus2", intervals: [0, 2, 7], aliases: ["sus2", "2sus"] },
    { id: "sus4", suffix: "sus4", intervals: [0, 5, 7], aliases: ["sus", "sus4", "4sus"] },
    { id: "sus47", suffix: "7sus4", intervals: [0, 5, 7, 10], aliases: ["7sus4", "sus47", "domsus4"] },
    { id: "power5", suffix: "5", intervals: [0, 7], aliases: ["5", "power", "powerchord"] },
    { id: "maj7", suffix: "maj7", intervals: [0, 4, 7, 11], aliases: ["maj7", "major7", "ma7", "M7"] },
    { id: "min7", suffix: "m7", intervals: [0, 3, 7, 10], aliases: ["m7", "min7", "minor7", "-7"] },
    { id: "dom7", suffix: "7", intervals: [0, 4, 7, 10], aliases: ["7", "dom7", "dominant7"] },
    { id: "dim", suffix: "dim", intervals: [0, 3, 6], aliases: ["dim", "diminished", "o"] },
    { id: "aug", suffix: "aug", intervals: [0, 4, 8], aliases: ["aug", "augmented", "+"] },
    { id: "m7b5", suffix: "m7b5", intervals: [0, 3, 6, 10], aliases: ["m7b5", "min7b5", "halfdim", "half-diminished"] },
    { id: "dim7", suffix: "dim7", intervals: [0, 3, 6, 9], aliases: ["dim7", "diminished7", "o7"] },
    { id: "six", suffix: "6", intervals: [0, 4, 7, 9], aliases: ["6", "maj6", "major6"] },
    { id: "min6", suffix: "m6", intervals: [0, 3, 7, 9], aliases: ["m6", "min6", "minor6", "-6"] },
    { id: "sixNine", suffix: "6/9", intervals: [0, 4, 7, 9, 14], aliases: ["6/9", "69", "sixnine"] },
    { id: "nine", suffix: "9", intervals: [0, 4, 7, 10, 14], aliases: ["9", "dom9", "dominant9"] },
    { id: "maj9", suffix: "maj9", intervals: [0, 4, 7, 11, 14], aliases: ["maj9", "major9", "ma9", "M9"] },
    { id: "min9", suffix: "m9", intervals: [0, 3, 7, 10, 14], aliases: ["m9", "min9", "minor9", "-9"] },
    { id: "add9", suffix: "add9", intervals: [0, 2, 4, 7], aliases: ["add9", "add2"] },
    { id: "add11", suffix: "add11", intervals: [0, 4, 5, 7], aliases: ["add11"] },
    { id: "mMaj7", suffix: "mMaj7", intervals: [0, 3, 7, 11], aliases: ["mmaj7", "minmaj7", "minormajor7"] },
    { id: "maj7#11", suffix: "maj7#11", intervals: [0, 4, 6, 11], aliases: ["maj7#11", "major7#11", "lydian"] },
    { id: "7b9", suffix: "7b9", intervals: [0, 1, 4, 7, 10], aliases: ["7b9", "dom7b9", "dominant7b9"] }
];

const CHORD_QUALITY_BY_ID = new Map(CHORD_QUALITIES.map((entry) => [entry.id, entry]));
const CHORD_QUALITY_ALIASES = new Map();
const CHORD_DIFFICULTY_CONFIG = {
    easy: {
        qualityIds: ["maj", "min", "power5", "sus2", "sus4"],
        voicing: "root",
        spacingChance: 0
    },
    medium: {
        qualityIds: ["maj", "min", "power5", "sus2", "sus4", "sus47", "maj7", "min7", "dom7", "add9", "six", "min6", "dim", "aug"],
        voicing: "root",
        spacingChance: 0
    },
    voiced: {
        qualityIds: ["maj", "min", "power5", "sus2", "sus4", "sus47", "maj7", "min7", "dom7", "add9", "six", "min6"],
        voicing: "spread",
        spacingChance: 0.55,
        maxInversion: 1
    },
    hard: {
        qualityIds: ["maj7", "min7", "dom7", "sus47", "dim", "aug", "m7b5", "dim7", "six", "min6", "sixNine", "nine", "maj9", "min9", "add9", "add11", "mMaj7", "maj7#11", "7b9"],
        voicing: "advanced",
        spacingChance: 0.8,
        maxInversion: 2
    }
};
const CHORD_DIFFICULTY_ORDER = ["easy", "medium", "voiced", "hard"];
const CHORD_QUALITY_HINTS = {
    maj: "major",
    min: "minor",
    power5: "power chord",
    sus2: "suspended 2",
    sus4: "suspended 4",
    sus47: "dominant suspended 4",
    maj7: "major 7",
    min7: "minor 7",
    dom7: "dominant 7",
    dim: "diminished",
    aug: "augmented",
    m7b5: "half-diminished",
    dim7: "diminished 7",
    six: "major 6",
    min6: "minor 6",
    sixNine: "6/9",
    nine: "dominant 9",
    maj9: "major 9",
    min9: "minor 9",
    add9: "add 9",
    add11: "add 11",
    mMaj7: "minor major 7",
    "maj7#11": "major 7 sharp 11",
    "7b9": "dominant 7 flat 9"
};
const TYPE_SUCCESS_FLASH_MS = 700;
const CHORD_HISTORY_LIMIT = 8;
const ROUND_TRANSITION_PAUSE_MS = 90;
const recentChordTargets = [];
let typingAutoNextTimer = null;
let roundStartInProgress = false;
let roundStartToken = 0;
const GAME_MODE_POLICY = App.modePolicy || {};
const GAME_UI_COPY = App.uiCopy || {};
const CHORD_READOUT_COPY = GAME_UI_COPY.chordReadout || {};
const PROMPT_COPY = GAME_UI_COPY.prompts || {};
const MODE_COPY = GAME_UI_COPY.modes || {};
const ACTION_COPY = GAME_UI_COPY.actions || {};
const FEEDBACK_COPY = GAME_UI_COPY.feedback || {};
const REVEAL_COPY = GAME_UI_COPY.reveal || {};
const HELPER_COPY = GAME_UI_COPY.helpers || {};
const HELPER_LABELS = {
    rootNote: HELPER_COPY.rootNote || "Root note",
    chordSize: HELPER_COPY.chordSize || "Chord size",
    chordType: HELPER_COPY.chordType || "Chord type",
    voicing: HELPER_COPY.voicing || "Voicing",
    pitchSpan: HELPER_COPY.pitchSpan || "Pitch span"
};
const helperPinState = {
    round: null,
    localLabels: new Set(),
    globalLabels: new Set()
};

const getHelperPinRound = () => (Number.isFinite(state.round) ? state.round : 0);

const syncHelperPinRound = () => {
    const round = getHelperPinRound();
    if (helperPinState.round !== round) {
        helperPinState.round = round;
        helperPinState.localLabels.clear();
    }
};

const getLocalPinnedHelperLabels = () => {
    syncHelperPinRound();
    return helperPinState.localLabels;
};

const getGlobalPinnedHelperLabels = () => helperPinState.globalLabels;

const isHelperPinnedGlobalLabel = (label) => {
    if (!label) return false;
    if (label === HELPER_LABELS.rootNote) return Boolean(state.chordRootHint);
    return getGlobalPinnedHelperLabels().has(label);
};

const isHelperPinnedLocalLabel = (label) => getLocalPinnedHelperLabels().has(label);

const isHelperPinnedLabel = (label) => (
    isHelperPinnedGlobalLabel(label) || isHelperPinnedLocalLabel(label)
);

const toggleHelperPinnedLocalLabel = (label) => {
    if (!label) return false;
    if (isHelperPinnedGlobalLabel(label)) return false;
    const labels = getLocalPinnedHelperLabels();
    if (labels.has(label)) {
        labels.delete(label);
    } else {
        labels.add(label);
    }
    return true;
};

const toggleHelperPinnedGlobalLabel = (label) => {
    if (!label) return false;
    if (label === HELPER_LABELS.rootNote) return false;
    const labels = getGlobalPinnedHelperLabels();
    if (labels.has(label)) {
        labels.delete(label);
    } else {
        labels.add(label);
    }
    getLocalPinnedHelperLabels().delete(label);
    return true;
};

const setHelperPinnedGlobalLabel = (label, pinned) => {
    if (!label) return false;
    if (label === HELPER_LABELS.rootNote) return false;
    const labels = getGlobalPinnedHelperLabels();
    const has = labels.has(label);
    if (pinned) {
        if (!has) {
            labels.add(label);
            getLocalPinnedHelperLabels().delete(label);
            return true;
        }
        return false;
    }
    if (has) {
        labels.delete(label);
        return true;
    }
    return false;
};

const setRootHelperPinned = () => {
    getGlobalPinnedHelperLabels().delete(HELPER_LABELS.rootNote);
    getLocalPinnedHelperLabels().delete(HELPER_LABELS.rootNote);
    return true;
};

const getHelperPinFlags = (label) => {
    const pinnedGlobal = isHelperPinnedGlobalLabel(label);
    const pinnedLocal = !pinnedGlobal && isHelperPinnedLocalLabel(label);
    return {
        pinned: pinnedGlobal || pinnedLocal,
        pinnedGlobal,
        pinnedLocal
    };
};
const PRESS_BEHAVIOR = {
    MIN_LENGTH_OR_HELD: "min-length-or-held",
    HOLD_WHILE_PRESSED: "hold-while-pressed"
};

const applyRoundStatePatch = (patch, mutation = "round/patch") => {
    if (typeof App.features?.round?.applyRoundPatch === "function") {
        App.features.round.applyRoundPatch(patch, {
            mutation,
            source: "game.js"
        });
        return;
    }
    Object.assign(state, patch || {});
};

const applySubmissionStatePatch = (patch, mutation = "submission/patch") => {
    if (typeof App.features?.round?.applySubmissionPatch === "function") {
        App.features.round.applySubmissionPatch(patch, {
            mutation,
            source: "game.js"
        });
        return;
    }
    Object.assign(state, patch || {});
};

const normalizeQualityToken = (value) => {
    let normalized = String(value ?? "")
        .replace(/\u266f/g, "#")
        .replace(/\u266d/g, "b")
        .replace(/♯/g, "#")
        .replace(/♭/g, "b")
        .replace(/\u266F/g, "#")
        .replace(/\u266D/g, "b")
        .replace(/^\s*M(?=\d|aj)/, "maj")
        .replace(/major/gi, "maj")
        .replace(/minor/gi, "min")
        .replace(/dominant/gi, "dom")
        .replace(/\s+/g, "")
        .replace(/_/g, "")
        .replace(/[^a-zA-Z0-9#b+/\-]/g, "")
        .toLowerCase();
    return normalized;
};

const escapeHtml = (value) => String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const renderChordLink = (label, { className = "" } = {}) => {
    if (!label) return "";
    const parsed = parseChordInput(label);
    const displayLabel = escapeHtml(parsed?.label ?? label);
    const classes = [];
    const hasChordMeta = Boolean(parsed?.quality?.id);
    if (hasChordMeta) {
        classes.push("chord-link");
    }
    if (className) {
        classes.push(className);
    }
    if (!classes.length) return displayLabel;
    const classAttr = escapeHtml(classes.join(" "));
    if (!hasChordMeta) {
        return `<span class="${classAttr}">${displayLabel}</span>`;
    }
    const qualityId = escapeHtml(parsed.quality.id);
    const rootPcAttr = Number.isFinite(parsed.rootPc) ? ` data-root-pc="${parsed.rootPc}"` : "";
    const labelAttr = escapeHtml(parsed.label ?? label);
    return `<span class="${classAttr}" role="button" tabindex="0" data-quality-id="${qualityId}"${rootPcAttr} data-chord-label="${labelAttr}">
        ${displayLabel}
        <span class="chord-link-bubble" aria-hidden="true">?</span>
    </span>`;
};

CHORD_QUALITIES.forEach((quality) => {
    quality.aliases.forEach((alias) => {
        const normalizedAlias = normalizeQualityToken(alias);
        if (!normalizedAlias) return;
        if (!CHORD_QUALITY_ALIASES.has(normalizedAlias)) {
            CHORD_QUALITY_ALIASES.set(normalizedAlias, quality.id);
        }
    });
    const normalizedSuffix = normalizeQualityToken(quality.suffix);
    if (normalizedSuffix && !CHORD_QUALITY_ALIASES.has(normalizedSuffix)) {
        CHORD_QUALITY_ALIASES.set(normalizedSuffix, quality.id);
    }
});

const isTypingEnabled = () => GAME_MODE_POLICY.isTypingEnabledFromState
    ? GAME_MODE_POLICY.isTypingEnabledFromState(state)
    : (state.trainingMode === "type" || state.trainingMode === "both");
const isTypingOnlyMode = () => GAME_MODE_POLICY.isTypingOnlyModeFromState
    ? GAME_MODE_POLICY.isTypingOnlyModeFromState(state)
    : state.trainingMode === "type";
const getIsChordRound = () => GAME_MODE_POLICY.getIsChordRoundFromState
    ? GAME_MODE_POLICY.getIsChordRoundFromState(state)
    : (isTypingEnabled() || state.chordMode);
const getEffectiveBlindMode = () => GAME_MODE_POLICY.getEffectiveBlindModeFromState
    ? GAME_MODE_POLICY.getEffectiveBlindModeFromState(state)
    : state.blindMode;
const getKeyboardZoneEl = () => document.querySelector(".keyboard-zone");
const normalizePitchClass = (value) => ((Math.round(value) % 12) + 12) % 12;
const getRootName = (pitchClass) => CHORD_ROOT_NAMES[normalizePitchClass(pitchClass)];
const getMidiFromNoteId = (noteId) => noteMap.get(noteId)?.midi;
const buildChordLabel = (rootPc, quality) => `${getRootName(rootPc)}${quality?.suffix ?? ""}`;

const getPitchClassSetFromNoteIds = (noteIds) => {
    const set = new Set();
    noteIds.forEach((noteId) => {
        const midi = getMidiFromNoteId(noteId);
        if (!Number.isFinite(midi)) return;
        set.add(normalizePitchClass(midi));
    });
    return set;
};

const sanitizeKnownNoteIds = (noteIds) => Array.from(new Set(
    (Array.isArray(noteIds) ? noteIds : []).filter((noteId) => noteMap.has(noteId))
));

const getRootGuideNoteId = () => {
    if (!state.active || state.submitted || !getIsChordRound() || !state.chordRootHint || !state.targetChord) {
        return null;
    }
    if (Number.isFinite(state.targetChord.rootMidi)) {
        const rooted = getNoteIdByMidi(state.targetChord.rootMidi);
        if (rooted && noteMap.has(rooted)) {
            return rooted;
        }
    }
    const fallback = (state.targetNotes ?? []).find((noteId) => {
        const midi = getMidiFromNoteId(noteId);
        return Number.isFinite(midi) && normalizePitchClass(midi) === state.targetChord.rootPc;
    });
    return fallback ?? null;
};

const getEffectiveKeyboardSelection = (noteIds = state.selectedNotes, options = {}) => {
    const { includeRootGuide = true } = options;
    const ids = sanitizeKnownNoteIds(noteIds);
    if (!includeRootGuide) return ids;
    const rootNoteId = getRootGuideNoteId();
    if (!rootNoteId || state.rootHintSuppressed) {
        return ids;
    }
    if (ids.includes(rootNoteId)) {
        return ids;
    }
    return [...ids, rootNoteId];
};

const getChordDifficultyId = (value = state.chordDifficulty) => {
    const normalized = String(value ?? "").trim().toLowerCase();
    if (normalized === "playful") return "voiced";
    if (CHORD_DIFFICULTY_ORDER.includes(normalized)) return normalized;
    return "easy";
};

const getChordDisplayLabel = (label) => label;

const getChordQualityDisplaySuffix = (quality) => quality?.suffix || "major";

const getChordDifficultyConfig = (difficulty = state.chordDifficulty) => {
    const id = getChordDifficultyId(difficulty);
    return CHORD_DIFFICULTY_CONFIG[id] ?? CHORD_DIFFICULTY_CONFIG.easy;
};

const getAllowedChordQualities = (difficulty = state.chordDifficulty) => {
    const config = getChordDifficultyConfig(difficulty);
    return (config.qualityIds ?? [])
        .map((id) => CHORD_QUALITY_BY_ID.get(id))
        .filter(Boolean);
};

const getChordQualityHint = (qualityId) => {
    if (!qualityId) return "unknown quality";
    return CHORD_QUALITY_HINTS[qualityId] ?? qualityId;
};

const getInteractivePressBehavior = () => (
    state.active
        ? PRESS_BEHAVIOR.MIN_LENGTH_OR_HELD
        : PRESS_BEHAVIOR.HOLD_WHILE_PRESSED
);

