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
    { id: "add9", suffix: "add9", intervals: [0, 2, 4, 7], aliases: ["add9"] },
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
const recentChordTargets = [];
let typingAutoNextTimer = null;
let roundStartInProgress = false;
let roundStartToken = 0;
const UI_COPY = App.uiCopy || {};
const CHORD_READOUT_COPY = UI_COPY.chordReadout || {};
const PROMPT_COPY = UI_COPY.prompts || {};
const MODE_COPY = UI_COPY.modes || {};
const ACTION_COPY = UI_COPY.actions || {};
const FEEDBACK_COPY = UI_COPY.feedback || {};
const REVEAL_COPY = UI_COPY.reveal || {};
const HELPER_COPY = UI_COPY.helpers || {};
const HELPER_LABELS = {
    chordSize: HELPER_COPY.chordSize || "Chord size",
    chordType: HELPER_COPY.chordType || "Chord type",
    voicing: HELPER_COPY.voicing || "Voicing",
    pitchSpan: HELPER_COPY.pitchSpan || "Pitch span"
};

const normalizeQualityToken = (value) => {
    return String(value ?? "")
        .replace(/[♯]/g, "#")
        .replace(/[♭]/g, "b")
        .replace(/major/gi, "maj")
        .replace(/minor/gi, "min")
        .replace(/dominant/gi, "dom")
        .replace(/\s+/g, "")
        .replace(/_/g, "")
        .replace(/-/g, "")
        .replace(/[^a-zA-Z0-9#b+/]/g, "")
        .toLowerCase();
};

CHORD_QUALITIES.forEach((quality) => {
    quality.aliases.forEach((alias) => {
        const normalizedAlias = normalizeQualityToken(alias);
        if (!normalizedAlias) return;
        CHORD_QUALITY_ALIASES.set(normalizedAlias, quality.id);
    });
    const normalizedSuffix = normalizeQualityToken(quality.suffix);
    if (normalizedSuffix) {
        CHORD_QUALITY_ALIASES.set(normalizedSuffix, quality.id);
    }
});

const isTypingEnabled = () => state.trainingMode === "type" || state.trainingMode === "both";
const isTypingOnlyMode = () => state.trainingMode === "type";
const getIsChordRound = () => isTypingEnabled() || state.chordMode;
const getEffectiveBlindMode = () => state.blindMode;
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

const getChordDifficultyId = (value = state.chordDifficulty) => {
    const normalized = String(value ?? "").trim().toLowerCase();
    if (normalized === "playful") return "voiced";
    if (CHORD_DIFFICULTY_ORDER.includes(normalized)) return normalized;
    return "easy";
};

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

const getVoicingHintLabel = (voicing) => {
    if (voicing === "advanced") return "spread + inversion";
    if (voicing === "spread") return "spread voicing";
    return "root position";
};

const randomSample = (array, count) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
};

const getNiceTarget = (count) => {
    const pool = getNicePool();
    if (pool.length <= count) {
        return pool.map((note) => note.id);
    }

    for (let attempt = 0; attempt < 200; attempt += 1) {
        const root = pool[Math.floor(Math.random() * pool.length)];
        const shuffled = randomSample(pool, pool.length);
        const picked = [root];

        for (const note of shuffled) {
            if (picked.length >= count) break;
            if (picked.some((existing) => existing.id === note.id)) {
                continue;
            }
            if (picked.every((existing) => isConsonant(existing, note))) {
                picked.push(note);
            }
        }

        if (picked.length === count) {
            const signature = picked
                .map((note) => note.id)
                .sort()
                .join("-");
            if (!recentNiceCombos.includes(signature)) {
                recentNiceCombos.unshift(signature);
                if (recentNiceCombos.length > MAX_NICE_HISTORY) {
                    recentNiceCombos.pop();
                }
                return picked.map((note) => note.id);
            }
        }
    }

    return randomSample(pool, count).map((note) => note.id);
};

const getQualityPitchClassSet = (rootPc, quality) => {
    const set = new Set();
    quality.intervals.forEach((interval) => {
        set.add(normalizePitchClass(rootPc + interval));
    });
    return set;
};

const parseChordInput = (raw, options = {}) => {
    const input = String(raw ?? "").trim();
    if (!input) return null;
    const normalizedInput = input.replace(/♯/g, "#").replace(/♭/g, "b");
    const match = normalizedInput.match(/^(-?\d+)?\s*([A-Ga-g])\s*([#b]?)\s*(.*)$/);
    if (!match) return null;

    const rootToken = `${match[2].toUpperCase()}${(match[3] || "").toUpperCase()}`;
    const rootPc = CHORD_ROOT_ALIASES[rootToken];
    if (!Number.isFinite(rootPc)) return null;
    const rootOctave = match[1] !== undefined ? Number.parseInt(match[1], 10) : null;
    const rootMidi = Number.isFinite(rootOctave) ? ((rootOctave + 1) * 12) + rootPc : null;

    const qualityToken = normalizeQualityToken(match[4] || "");
    const fallbackQuality = qualityToken ? null : "maj";
    const qualityId = CHORD_QUALITY_ALIASES.get(qualityToken) ?? fallbackQuality;
    if (!qualityId) return null;

    const quality = CHORD_QUALITY_BY_ID.get(qualityId);
    if (!quality) return null;

    if (Array.isArray(options.allowedQualityIds) && options.allowedQualityIds.length) {
        if (!options.allowedQualityIds.includes(quality.id)) return null;
    }

    return {
        rootPc,
        rootName: getRootName(rootPc),
        rootOctave: Number.isFinite(rootOctave) ? rootOctave : null,
        rootMidi: Number.isFinite(rootMidi) ? rootMidi : null,
        quality,
        label: buildChordLabel(rootPc, quality)
    };
};

const detectChordFromNoteIds = (noteIds, qualities = CHORD_QUALITIES) => {
    if (!noteIds.length) return null;
    const pitchClassSet = getPitchClassSetFromNoteIds(noteIds);
    if (pitchClassSet.size < 2) return null;

    const lowestMidi = noteIds
        .map((noteId) => getMidiFromNoteId(noteId))
        .filter(Number.isFinite)
        .sort((a, b) => a - b)[0];
    const bassPc = Number.isFinite(lowestMidi) ? normalizePitchClass(lowestMidi) : null;

    let best = null;
    qualities.forEach((quality) => {
        for (let rootPc = 0; rootPc < 12; rootPc += 1) {
            const expected = getQualityPitchClassSet(rootPc, quality);
            if (expected.size !== pitchClassSet.size) continue;
            const matches = Array.from(expected).every((pc) => pitchClassSet.has(pc));
            if (!matches) continue;

            const rootInBass = bassPc === rootPc ? 2 : 0;
            const rootPresent = pitchClassSet.has(rootPc) ? 1 : 0;
            const compactness = 1 / Math.max(2, quality.intervals.length);
            const score = rootInBass + rootPresent + compactness;
            if (!best || score > best.score) {
                best = {
                    rootPc,
                    quality,
                    label: buildChordLabel(rootPc, quality),
                    pitchClasses: expected,
                    score
                };
            }
        }
    });

    return best ? { ...best } : null;
};

const normalizeIntervals = (intervals) => {
    return Array.from(new Set(intervals.map((value) => Math.max(0, Math.round(value))))).sort((a, b) => a - b);
};

const fitIntervalsToAvailableRange = (intervals) => {
    if (!notes.length) return intervals;
    const keySpan = Math.max(12, notes[notes.length - 1].midi - notes[0].midi - 1);
    const next = [...intervals];
    let guard = 0;
    while (Math.max(...next) > keySpan && guard < 30) {
        guard += 1;
        let changed = false;
        for (let index = next.length - 1; index > 0; index -= 1) {
            const lowered = next[index] - 12;
            if (lowered > next[index - 1]) {
                next[index] = lowered;
                changed = true;
                break;
            }
        }
        next.sort((a, b) => a - b);
        if (!changed) break;
    }
    return next;
};

const buildVoicedIntervals = (quality, difficultyId = state.chordDifficulty) => {
    const config = getChordDifficultyConfig(difficultyId);
    const voicingMode = config.voicing ?? "root";
    const base = normalizeIntervals(quality.intervals);
    if (!base.length) return base;
    if (voicingMode === "root") return base;

    const intervals = [...base];
    const maxInversion = Math.min(intervals.length - 1, Math.max(0, Number(config.maxInversion ?? 0)));
    const inversionCount = maxInversion > 0 ? Math.floor(Math.random() * (maxInversion + 1)) : 0;
    for (let i = 0; i < inversionCount; i += 1) {
        intervals[0] += 12;
        intervals.sort((a, b) => a - b);
    }

    const keySpan = notes.length ? (notes[notes.length - 1].midi - notes[0].midi) : 24;
    const spacingChance = Number.isFinite(config.spacingChance) ? config.spacingChance : 0;
    const allowDoubleOct = voicingMode === "advanced" && keySpan >= 28;
    for (let index = 1; index < intervals.length; index += 1) {
        if (Math.random() >= spacingChance) continue;
        let extra = 12;
        if (allowDoubleOct && Math.random() < 0.35) {
            extra = 24;
        }
        intervals[index] += extra;
    }

    return fitIntervalsToAvailableRange(normalizeIntervals(intervals));
};

const chooseRootCandidatesForIntervals = (intervals) => {
    if (!notes.length || !intervals.length) return [];
    const maxMidi = notes[notes.length - 1].midi;
    const maxInterval = Math.max(...intervals);
    const base = notes.filter((note) => note.midi + maxInterval <= maxMidi);
    if (!base.length) return [];
    if (!state.niceMode) return base;
    const whiteOnly = base.filter((note) => !note.name.includes("#"));
    return whiteOnly.length ? whiteOnly : base;
};

const buildChordFromRoot = (rootNote, quality, intervals, difficultyId) => {
    const normalizedIntervals = normalizeIntervals(intervals);
    if (!normalizedIntervals.length) return null;
    const targetMidis = normalizedIntervals.map((interval) => rootNote.midi + interval);
    const noteIds = targetMidis.map((midi) => getNoteIdByMidi(midi)).filter(Boolean);
    const uniqueIds = Array.from(new Set(noteIds));
    if (uniqueIds.length !== noteIds.length) return null;
    if (!uniqueIds.length) return null;

    const rootPc = normalizePitchClass(rootNote.midi);
    const pitchClasses = getQualityPitchClassSet(rootPc, quality);
    const difficultyKey = getChordDifficultyId(difficultyId);
    const voicing = getChordDifficultyConfig(difficultyKey).voicing ?? "root";
    const intervalSpan = normalizedIntervals[normalizedIntervals.length - 1] - normalizedIntervals[0];
    return {
        rootPc,
        rootMidi: rootNote.midi,
        rootName: getRootName(rootPc),
        quality,
        noteIds: uniqueIds,
        pitchClasses: Array.from(pitchClasses).sort((a, b) => a - b),
        label: buildChordLabel(rootPc, quality),
        signature: `${difficultyKey}-${rootPc}-${quality.id}-${normalizedIntervals.join(".")}`,
        noteCount: uniqueIds.length,
        intervalSpan,
        voicing,
        qualityHint: getChordQualityHint(quality.id)
    };
};

const createChordTarget = () => {
    const difficultyId = getChordDifficultyId(state.chordDifficulty);
    const qualities = getAllowedChordQualities(difficultyId);
    if (!qualities.length || !notes.length) {
        state.targetChord = null;
        state.targetNotes = [];
        return;
    }

    let picked = null;
    for (let attempt = 0; attempt < 220; attempt += 1) {
        const quality = qualities[Math.floor(Math.random() * qualities.length)];
        const intervals = buildVoicedIntervals(quality, difficultyId);
        const roots = chooseRootCandidatesForIntervals(intervals);
        if (!roots.length) continue;
        const root = roots[Math.floor(Math.random() * roots.length)];
        const candidate = buildChordFromRoot(root, quality, intervals, difficultyId);
        if (!candidate) continue;
        if (recentChordTargets.includes(candidate.signature)) continue;
        picked = candidate;
        break;
    }

    if (!picked) {
        const fallbackQuality = qualities[0];
        const fallbackIntervals = buildVoicedIntervals(fallbackQuality, difficultyId);
        const roots = chooseRootCandidatesForIntervals(fallbackIntervals);
        const fallbackRoot = roots[0];
        picked = fallbackRoot ? buildChordFromRoot(fallbackRoot, fallbackQuality, fallbackIntervals, difficultyId) : null;
    }

    if (!picked) {
        state.targetChord = null;
        state.targetNotes = [];
        return;
    }

    recentChordTargets.unshift(picked.signature);
    if (recentChordTargets.length > CHORD_HISTORY_LIMIT) {
        recentChordTargets.pop();
    }

    state.targetChord = picked;
    state.targetNotes = [...picked.noteIds];
};

const createNoteTarget = () => {
    let next;
    if (state.niceMode && state.noteCount > 1) {
        next = getNiceTarget(state.noteCount);
    } else if (state.niceMode) {
        next = randomSample(getNicePool().map((note) => note.id), state.noteCount);
    } else {
        next = randomSample(notes.map((note) => note.id), state.noteCount);
    }

    let signature = next.slice().sort().join("-");
    if (recentTargets.includes(signature)) {
        for (let attempt = 0; attempt < 6; attempt += 1) {
            const candidate = randomSample(
                state.niceMode ? getNicePool().map((note) => note.id) : notes.map((note) => note.id),
                state.noteCount
            );
            const candidateSig = candidate.slice().sort().join("-");
            if (!recentTargets.includes(candidateSig)) {
                next = candidate;
                signature = candidateSig;
                break;
            }
        }
    }

    recentTargets.unshift(signature);
    if (recentTargets.length > MAX_TARGET_HISTORY) {
        recentTargets.pop();
    }

    state.targetNotes = next;
    state.targetChord = null;
};

const createTarget = () => {
    if (getIsChordRound()) {
        createChordTarget();
        return;
    }
    createNoteTarget();
};

const clearTypingAutoNext = () => {
    if (!typingAutoNextTimer) return;
    clearTimeout(typingAutoNextTimer);
    typingAutoNextTimer = null;
};

const getTypedPreviewNoteIds = (parsed) => {
    if (!parsed || !notes.length) return [];
    const maxMidi = notes[notes.length - 1].midi;
    const minMidi = notes[0].midi;
    const maxInterval = Math.max(...parsed.quality.intervals);
    const centerMidi = Math.round((minMidi + maxMidi) / 2);

    const roots = notes.filter((note) =>
        normalizePitchClass(note.midi) === parsed.rootPc &&
        note.midi + maxInterval <= maxMidi
    );
    if (!roots.length) return [];

    let preferredRootMidi = centerMidi;
    if (Number.isFinite(parsed.rootMidi)) {
        preferredRootMidi = parsed.rootMidi;
    }
    if (
        !Number.isFinite(parsed.rootMidi) &&
        state.active &&
        getIsChordRound() &&
        state.targetChord &&
        parsed.rootPc === state.targetChord.rootPc &&
        Number.isFinite(state.targetChord.rootMidi)
    ) {
        preferredRootMidi = state.targetChord.rootMidi;
    }

    roots.sort((a, b) => Math.abs(a.midi - preferredRootMidi) - Math.abs(b.midi - preferredRootMidi));
    const root = roots[0];
    return parsed.quality.intervals
        .map((interval) => getNoteIdByMidi(root.midi + interval))
        .filter(Boolean);
};

const updateTypedPreviewFromInput = () => {
    if (!isTypingEnabled()) {
        state.typedPreviewNotes = [];
        return null;
    }
    const raw = chordAnswerInput?.value ?? "";
    state.typedAnswer = raw;
    const parsed = parseChordInput(raw);
    state.typedPreviewNotes = (state.typingShowTyped && parsed) ? getTypedPreviewNoteIds(parsed) : [];
    return parsed;
};

const updateChordReadout = () => {
    if (!chordReadout) return;
    const hasKeyboardSelection = state.selectedNotes.length >= 2;
    const hasTypedInput = Boolean(state.typedAnswer?.trim());
    const hideLivePreview = Boolean(state.hideLivePreview) && !state.submitted;
    const shouldShow = state.active && getIsChordRound() && !hideLivePreview
        && (hasKeyboardSelection || (isTypingEnabled() && hasTypedInput));
    chordReadout.hidden = !shouldShow;
    chordReadout.style.display = shouldShow ? "" : "none";
    if (!shouldShow) return;

    if (isTypingOnlyMode()) {
        if (!state.typedAnswer?.trim()) {
            chordReadout.textContent = CHORD_READOUT_COPY.typedNone || "Typed chord: none";
            return;
        }
        const parsed = parseChordInput(state.typedAnswer);
        chordReadout.textContent = parsed
            ? (CHORD_READOUT_COPY.typedPreview?.(parsed.label) ?? `Typed chord: ${parsed.label} (preview)`)
            : (CHORD_READOUT_COPY.typedUnrecognized || "Typed chord: unrecognized");
        return;
    }

    const selectedDetected = state.selectedNotes.length ? detectChordFromNoteIds(state.selectedNotes) : null;
    state.selectedChordLabel = selectedDetected?.label ?? "";

    if (state.trainingMode === "both") {
        const parsed = hasTypedInput ? parseChordInput(state.typedAnswer) : null;
        const typedLabel = hasTypedInput ? (parsed?.label ?? "unrecognized") : "";
        if (state.selectedChordLabel && typedLabel) {
            chordReadout.textContent = CHORD_READOUT_COPY.selectedAndTyped?.(state.selectedChordLabel, typedLabel)
                ?? `Selected chord: ${state.selectedChordLabel} | Typed chord: ${typedLabel}`;
            return;
        }
        if (typedLabel) {
            chordReadout.textContent = CHORD_READOUT_COPY.typed?.(typedLabel) ?? `Typed chord: ${typedLabel}`;
            return;
        }
        if (state.selectedChordLabel) {
            chordReadout.textContent = CHORD_READOUT_COPY.selected?.(state.selectedChordLabel) ?? `Selected chord: ${state.selectedChordLabel}`;
            return;
        }
        chordReadout.textContent = state.selectedNotes.length
            ? (CHORD_READOUT_COPY.selectedUnknown || "Selected chord: unknown")
            : (CHORD_READOUT_COPY.selectedNone || "Selected chord: none");
        return;
    }

    if (!state.selectedNotes.length) {
        chordReadout.textContent = CHORD_READOUT_COPY.selectedNone || "Selected chord: none";
        return;
    }
    chordReadout.textContent = state.selectedChordLabel
        ? (CHORD_READOUT_COPY.selected?.(state.selectedChordLabel) ?? `Selected chord: ${state.selectedChordLabel}`)
        : (CHORD_READOUT_COPY.selectedUnknown || "Selected chord: unknown");
};

const updateModeVisibility = () => {
    const typingVisible = state.active && !state.submitted && getIsChordRound() && isTypingEnabled();
    if (typingZone) {
        typingZone.hidden = !typingVisible;
        typingZone.style.display = typingVisible ? "" : "none";
    }
    if (statusPanel) {
        statusPanel.hidden = !state.active;
        statusPanel.style.display = state.active ? "" : "none";
    }
    if (chordReadout) {
        chordReadout.style.display = chordReadout.hidden ? "none" : "";
    }
    const keyboardZone = getKeyboardZoneEl();
    if (keyboardZone) {
        keyboardZone.hidden = state.active && isTypingOnlyMode() && !state.typingShowPiano;
    }
};

const updatePrimaryAction = () => {
    const label = isTypingOnlyMode()
        ? (state.active && !state.submitted ? "Check Chord (Enter)" : "New Round (Enter)")
        : (state.active && !state.submitted ? "Submit (Enter)" : "New Round (Enter)");
    primaryActionButton.textContent = label;
};

const updateReplayAvailability = () => {
    const allowReplay = isTypingOnlyMode()
        ? state.active
        : state.active && (!getEffectiveBlindMode() || state.submitted);
    playSelectedButton.hidden = !allowReplay;
    playSelectedButton.textContent = isTypingOnlyMode()
        ? "Replay Chord (Space)"
        : "Play Selected (Space)";
    return allowReplay;
};

const getChordHelperHints = () => {
    if (!state.targetChord) return [];
    const hints = [
        { label: HELPER_LABELS.chordSize, value: `${state.targetChord.noteCount} notes` },
        { label: HELPER_LABELS.chordType, value: state.targetChord.qualityHint },
        { label: HELPER_LABELS.voicing, value: getVoicingHintLabel(state.targetChord.voicing) }
    ];
    if (Number.isFinite(state.targetChord.intervalSpan)) {
        hints.push({ label: HELPER_LABELS.pitchSpan, value: `${state.targetChord.intervalSpan} semitones` });
    }
    return hints;
};

const HELPER_MASK_LENGTHS = {
    [HELPER_LABELS.chordSize]: 12,
    [HELPER_LABELS.chordType]: 12,
    [HELPER_LABELS.voicing]: 13,
    [HELPER_LABELS.pitchSpan]: 14
};

const createDeterministicHelperMask = (label) => {
    const baseLength = HELPER_MASK_LENGTHS[label] ?? 12;
    const rootPc = Number.isFinite(state.targetChord?.rootPc) ? state.targetChord.rootPc : 0;
    const span = Number.isFinite(state.targetChord?.intervalSpan) ? state.targetChord.intervalSpan : 0;
    const seedSource = `${label}|${state.round}|${rootPc}|${span}|${state.targetChord?.qualityHint ?? ""}`;

    let seed = 2166136261;
    for (let i = 0; i < seedSource.length; i += 1) {
        seed ^= seedSource.charCodeAt(i);
        seed = Math.imul(seed, 16777619);
    }

    const chars = "abcdefghijklmnopqrstuvwxyz";
    let out = "";
    for (let i = 0; i < baseLength; i += 1) {
        seed ^= seed << 13;
        seed ^= seed >>> 17;
        seed ^= seed << 5;
        const idx = Math.abs(seed) % chars.length;
        out += chars[idx];
    }
    return out;
};

const renderChordHelperBox = () => {
    const hints = getChordHelperHints();
    if (!hints.length) return "";
    const rows = hints.map((hint) => `
        <div class="helper-item" tabindex="0">
            <div class="helper-label">${hint.label}</div>
            <div class="helper-value">
                <span class="helper-mask" aria-hidden="true">${createDeterministicHelperMask(hint.label)}</span>
                <span class="helper-real">${hint.value}</span>
            </div>
        </div>
    `).join("");
    return `
        <div class="helper-card">
            <div class="helper-title">${HELPER_COPY.title || "Chord helper"}</div>
            <div class="helper-list">${rows}</div>
        </div>
    `;
};

const updateStatus = () => {
    const chordRound = getIsChordRound();
    const hideLivePreview = Boolean(state.hideLivePreview) && !state.submitted;
    goalCountEl.textContent = chordRound ? "1" : String(state.noteCount);
    if (goalLabelEl) {
        goalLabelEl.textContent = chordRound ? "chord" : "notes";
    }

    if (isTypingOnlyMode()) {
        modeLabelEl.textContent = MODE_COPY.typingOnly || "Type Chord";
    } else if (state.trainingMode === "both" && chordRound) {
        modeLabelEl.textContent = MODE_COPY.chordBoth || "Chord + Both";
    } else if (chordRound && getEffectiveBlindMode()) {
        modeLabelEl.textContent = MODE_COPY.chordBlind || "Chord + Blind";
    } else if (chordRound) {
        modeLabelEl.textContent = MODE_COPY.chord || "Chord";
    } else {
        modeLabelEl.textContent = getEffectiveBlindMode()
            ? (MODE_COPY.blind || "Blind")
            : (MODE_COPY.normal || "Normal");
    }

    updateModeVisibility();
    document.body.classList.toggle("landing", !state.active);
    if (pedalTip) {
        pedalTip.hidden = state.active;
    }
    if (state.active && pedalState.active) {
        pedalState.active = false;
        pedalState.keysDown.clear();
        pedalState.pending.clear();
        pedalIcon.classList.remove("active");
    }

    if (!state.active) {
        // Landing page is always free-play regardless of saved chord answer mode.
        setKeyboardEnabled(true);
        roundCountEl.textContent = "Not started";
        selectedListEl.textContent = "None";
        resultEl.textContent = isTypingOnlyMode()
            ? (PROMPT_COPY.landingTyping || "Press New Round to hear a chord, then type your answer.")
            : (state.trainingMode === "both" && chordRound)
                ? (PROMPT_COPY.landingBoth || "Press New Round to hear a chord, then play it, type it, or both.")
            : (PROMPT_COPY.landingDefault || "Press New Round to begin.");
        revealEl.textContent = "";
        if (helperSlotEl) {
            helperSlotEl.innerHTML = "";
            helperSlotEl.hidden = true;
        }
        hintFlag.hidden = true;
        hintButton.hidden = true;
        updateReplayAvailability();
        updateChordReadout();
        updatePrimaryAction();
        return;
    }

    roundCountEl.textContent = String(state.round);
    const typedSubmissionFinal = state.submitted && chordRound && state.submissionSource === "typing";
    if (hideLivePreview) {
        selectedListEl.textContent = "Hidden";
    } else if (typedSubmissionFinal) {
        const parsed = parseChordInput(state.typedAnswer);
        selectedListEl.textContent = parsed?.label ? `${parsed.label} (typed)` : "Typed answer";
    } else if (isTypingOnlyMode()) {
        const parsed = parseChordInput(state.typedAnswer);
        selectedListEl.textContent = parsed?.label || state.typedAnswer?.trim() || "None";
    } else if (state.trainingMode === "both" && chordRound) {
        const selectedChord = detectChordFromNoteIds(state.selectedNotes);
        state.selectedChordLabel = selectedChord?.label ?? "";
        const parsed = state.typedAnswer?.trim() ? parseChordInput(state.typedAnswer) : null;
        const typedLabel = state.typedAnswer?.trim() ? (parsed?.label || state.typedAnswer.trim()) : "";
        if (state.selectedChordLabel && typedLabel) {
            selectedListEl.textContent = `${state.selectedChordLabel} | ${typedLabel} (typed)`;
        } else if (typedLabel) {
            selectedListEl.textContent = `${typedLabel} (typed)`;
        } else if (state.selectedChordLabel) {
            selectedListEl.textContent = state.selectedChordLabel;
        } else {
            selectedListEl.textContent = state.selectedNotes.length ? state.selectedNotes.join(", ") : "None";
        }
    } else if (chordRound) {
        const selectedChord = detectChordFromNoteIds(state.selectedNotes);
        state.selectedChordLabel = selectedChord?.label ?? "";
        selectedListEl.textContent = state.selectedChordLabel || (state.selectedNotes.length ? state.selectedNotes.join(", ") : "None");
    } else {
        selectedListEl.textContent = state.selectedNotes.length ? state.selectedNotes.join(", ") : "None";
    }
    hintButton.hidden = state.submitted;
    hintFlag.hidden = !(state.submitted && state.hintUsed);
    updateReplayAvailability();

    const shouldShowHelpers = !state.submitted
        && getIsChordRound()
        && Boolean(state.chordExtraHelpers)
        && Boolean(state.targetChord);
    if (helperSlotEl) {
        helperSlotEl.hidden = !shouldShowHelpers;
        helperSlotEl.innerHTML = shouldShowHelpers ? renderChordHelperBox() : "";
    }
    if (!state.submitted) {
        revealEl.textContent = "";
    }
    updateChordReadout();
    updatePrimaryAction();
};

const updateKeyStates = () => {
    const evaluationNotes = state.submitted
        ? (state.submittedComparisonNotes?.length ? state.submittedComparisonNotes : state.selectedNotes)
        : state.selectedNotes;
    const selectedSet = new Set(evaluationNotes);
    const liveSelectedSet = new Set(state.selectedNotes);
    const targetSet = new Set(state.targetNotes);
    const typedPreviewSet = new Set(
        isTypingEnabled() && state.typingShowTyped ? state.typedPreviewNotes : []
    );

    keyMap.forEach((key, id) => {
        key.classList.remove("selected", "correct", "wrong", "missed", "typed-preview");

        if (!state.active) {
            key.setAttribute("aria-pressed", "false");
            if (typedPreviewSet.has(id) && isTypingEnabled()) {
                key.classList.add("typed-preview");
            }
            return;
        }

        if (state.submitted) {
            if (targetSet.has(id) && selectedSet.has(id)) {
                key.classList.add("correct");
            } else if (!targetSet.has(id) && selectedSet.has(id)) {
                key.classList.add("wrong");
            } else if (targetSet.has(id) && !selectedSet.has(id)) {
                key.classList.add("missed");
            }
        } else if (selectedSet.has(id)) {
            key.classList.add("selected");
        }

        if (typedPreviewSet.has(id)) {
            key.classList.add("typed-preview");
        }
        key.setAttribute("aria-pressed", liveSelectedSet.has(id) ? "true" : "false");
    });
};

const setKeyboardEnabled = (enabled) => {
    const effectiveEnabled = !(isTypingOnlyMode() && state.active) && enabled;
    keyboardEl.classList.toggle("disabled", !effectiveEnabled);
};

const updateKeyboardScale = () => {
    const root = document.documentElement;
    const rootStyles = getComputedStyle(root);
    const zone = keyboardEl.closest(".keyboard-zone");
    const zoneWidth = zone?.clientWidth || 1;
    const stack = keyboardEl.closest(".keyboard-stack");
    const stackWidth = stack?.scrollWidth || stack?.getBoundingClientRect().width || 1;
    const padding = getCssNumber(rootStyles.getPropertyValue("--layout-extra")) || 0;
    const totalWidth = Math.max(1, stackWidth + padding);
    const scale = Math.min(1, zoneWidth / totalWidth);
    root.style.setProperty("--stack-scale", scale.toFixed(3));
};

const lockKeyboardForPlayback = (noteIds, mode) => {
    if (isTypingOnlyMode()) return;
    if (!noteIds.length) return;
    if (keyboardUnlockTimer) {
        clearTimeout(keyboardUnlockTimer);
        keyboardUnlockTimer = null;
    }
    setKeyboardEnabled(false);
    const duration = getPlaybackSpan(noteIds, mode) + (getIsChordRound() ? 0.5 : 0);
    keyboardUnlockTimer = setTimeout(() => {
        setKeyboardEnabled(true);
        keyboardUnlockTimer = null;
    }, duration * 1000);
};

const setSubmitted = (value) => {
    state.submitted = value;
    if (!value) {
        resultEl.textContent = "";
        revealEl.textContent = "";
    }
    updatePrimaryAction();
};

const goHome = () => {
    abortPlayback();
    clearTypingAutoNext();

    if (keyboardUnlockTimer) {
        clearTimeout(keyboardUnlockTimer);
        keyboardUnlockTimer = null;
    }

    if (holdState.holdTimer) {
        clearTimeout(holdState.holdTimer);
        holdState.holdTimer = null;
    }
    if (holdState.noteIds.length) {
        stopNotesById(holdState.noteIds);
        holdState.noteIds.forEach((noteId) => scheduleKeyRelease(noteId, 0));
    }
    holdState.active = false;
    holdState.holding = false;
    holdState.noteIds = [];

    if (pedalState.active || pedalState.keysDown.size || pedalState.pending.size) {
        pedalState.active = false;
        pedalState.keysDown.clear();
        releasePedalNotes();
        pedalIcon.classList.remove("active");
    }

    state.active = false;
    state.hintUsed = false;
    state.selectedNotes = [];
    state.selectedChordLabel = "";
    state.submissionSource = null;
    state.submittedComparisonNotes = [];
    state.targetNotes = [];
    state.targetChord = null;
    state.typedAnswer = "";
    state.typedPreviewNotes = [];
    if (chordAnswerInput) {
        chordAnswerInput.value = "";
    }

    setSubmitted(false);
    setKeyboardEnabled(true);
    updateStatus();
    updateKeyStates();
};

const refreshTarget = () => {
    if (!state.active) {
        updateStatus();
        updateKeyStates();
        return;
    }
    state.selectedNotes = [];
    state.selectedChordLabel = "";
    state.submissionSource = null;
    state.submittedComparisonNotes = [];
    setSubmitted(false);
    createTarget();
    if (isTypingEnabled()) {
        state.typedAnswer = "";
        state.typedPreviewNotes = [];
        if (chordAnswerInput) {
            chordAnswerInput.value = "";
        }
    }
    updateStatus();
    updateKeyStates();
};

const startRound = async (shouldPlay = false) => {
    if (shouldPlay && roundStartInProgress) {
        return;
    }
    const token = ++roundStartToken;
    if (shouldPlay) {
        roundStartInProgress = true;
    }
    abortPlayback();
    clearTypingAutoNext();
    state.round = state.active ? state.round + 1 : 1;
    state.active = true;
    state.hintUsed = false;
    state.selectedNotes = [];
    state.selectedChordLabel = "";
    state.submissionSource = null;
    state.submittedComparisonNotes = [];
    setSubmitted(false);
    createTarget();
    if (isTypingEnabled()) {
        state.typedAnswer = "";
        state.typedPreviewNotes = [];
        if (chordAnswerInput) {
            chordAnswerInput.value = "";
            if (state.active) {
                chordAnswerInput.focus();
            }
        }
    }
    setKeyboardEnabled(!isTypingOnlyMode());
    updateStatus();
    updateKeyStates();
    pendingCriticalRestart = false;
    if (shouldPlay) {
        if (typeof ensureSoundfontReady === "function") {
            try {
                await ensureSoundfontReady(state.pianoTone);
            } catch (_error) {
                // Keep flow moving; playNotes has its own readiness gate too.
            }
        }
        if (token !== roundStartToken || !state.active) {
            if (token === roundStartToken) {
                roundStartInProgress = false;
            }
            return;
        }
        const ctx = ensureAudio();
        if (!isTypingOnlyMode()) {
            lockKeyboardForPlayback(state.targetNotes, state.mode);
        }
        playNotes(state.targetNotes, state.mode, ctx.currentTime + ROUND_START_DELAY, { animate: false });
        if (token === roundStartToken) {
            roundStartInProgress = false;
        }
    } else {
        setKeyboardEnabled(!isTypingOnlyMode());
    }
};

const ensureRound = () => {
    if (!state.active) {
        updateStatus();
        return false;
    }
    if (!state.targetNotes.length) {
        refreshTarget();
    }
    return true;
};

const playTarget = () => {
    if (!state.active) {
        void startRound(true);
        return;
    }
    state.hintUsed = true;
    updateStatus();
    if (!isTypingOnlyMode()) {
        lockKeyboardForPlayback(state.targetNotes, state.mode);
    }
    playNotes(state.targetNotes, state.mode, undefined, {
        animate: state.submitted,
        animationHoldMs: ROUND_ANIM_HOLD_MS
    });
};

const startManualNote = (noteId, options = {}) => {
    const { playSound = true } = options;
    const key = keyMap.get(noteId);
    if (!key) return;
    if (manualNoteState.has(noteId)) return;

    activateKey(noteId);

    const now = performance.now();
    const durationMs = state.noteDuration * 1000;
    if (playSound) {
        const ctx = ensureAudio();
        const durationOverride = state.noteDuration + HOLD_MAX_EXTRA;
        playNotes([noteId], "simultaneous", ctx.currentTime, {
            animate: false,
            durationOverride
        });
    } else if (getEffectiveBlindMode() && state.active && !state.submitted) {
        resultEl.textContent = "Blind mode: notes are muted while selecting.";
    }
    const entry = {
        pressAt: now,
        stopAt: now + durationMs,
        playSound,
        holdTimer: null
    };
    entry.holdTimer = setTimeout(() => {
        entry.held = true;
    }, HOLD_THRESHOLD * 1000);
    manualNoteState.set(noteId, entry);
};

const releaseManualNote = (noteId) => {
    const entry = manualNoteState.get(noteId);
    if (!entry) return;
    if (entry.holdTimer) {
        clearTimeout(entry.holdTimer);
        entry.holdTimer = null;
    }
    const now = performance.now();
    const remainingMs = Math.max(0, entry.stopAt - now);
    const elapsedMs = Math.max(0, now - entry.pressAt);
    const animDelayMs = state.active ? Math.max(0, MIN_KEY_ANIM_MS - elapsedMs) : SHORT_PRESS_ANIM_MS;

    const key = keyMap.get(noteId);
    if (pedalState.active) {
        pedalState.pending.add(noteId);
        scheduleKeyRelease(noteId, animDelayMs);
        manualNoteState.delete(noteId);
        return;
    }
    const releaseDelayMs = remainingMs > 0 ? remainingMs : 0;
    scheduleKeyRelease(noteId, animDelayMs);
    if (entry.playSound && audioContext) {
        setTimeout(() => {
            stopNotesById([noteId]);
        }, releaseDelayMs);
    }

    manualNoteState.delete(noteId);
};

const releasePedalNotes = (delaySeconds = HOLD_BUFFER) => {
    if (!pedalState.pending.size) return;
    const noteIds = Array.from(pedalState.pending);
    pedalState.pending.clear();
    noteIds.forEach((noteId) => {
        scheduleKeyRelease(noteId, delaySeconds * 1000);
    });
    setTimeout(() => {
        stopNotesById(noteIds);
    }, delaySeconds * 1000);
};

const startPedalHold = () => {
    pedalState.keysDown.add("pedal-click");
    if (!pedalState.active) {
        pedalState.active = true;
        pedalIcon.classList.add("active");
    }
};

const stopPedalHold = () => {
    pedalState.keysDown.delete("pedal-click");
    if (!pedalState.keysDown.size) {
        pedalState.active = false;
        pedalIcon.classList.remove("active");
        releasePedalNotes();
    }
};

const toggleSelection = (noteId) => {
    if (isTypingOnlyMode()) {
        return;
    }
    if (!state.active) {
        updateStatus();
        return;
    }
    if (state.submitted) {
        return;
    }
    const index = state.selectedNotes.indexOf(noteId);
    if (index !== -1) {
        state.selectedNotes.splice(index, 1);
        setSubmitted(false);
        updateStatus();
        updateKeyStates();
        return;
    }

    const maxSelection = getIsChordRound()
        ? Math.max(6, state.targetNotes.length || 3)
        : state.noteCount;
    while (state.selectedNotes.length >= maxSelection) {
        state.selectedNotes.pop();
    }

    state.selectedNotes.push(noteId);
    setSubmitted(false);
    updateStatus();
    updateKeyStates();
};

const isSelectionCorrect = () => {
    if (getIsChordRound()) {
        if (!state.targetChord) return false;
        const selectedPcs = getPitchClassSetFromNoteIds(state.selectedNotes);
        const targetPcs = new Set(state.targetChord.pitchClasses);
        if (!selectedPcs.size) return false;
        return (
            Array.from(targetPcs).every((pc) => selectedPcs.has(pc)) &&
            Array.from(selectedPcs).every((pc) => targetPcs.has(pc))
        );
    }

    const selectedSet = new Set(state.selectedNotes);
    return (
        state.selectedNotes.length === state.targetNotes.length &&
        state.targetNotes.every((noteId) => selectedSet.has(noteId))
    );
};

const getPlaybackSpan = (noteIds, mode) => {
    if (!noteIds.length) return 0;
    const arpSpan = mode === "ascending" ? ARP_STEP * Math.max(0, noteIds.length - 1) : 0;
    const gap = 0.45;
    return arpSpan + state.noteDuration + gap;
};

const renderNotePills = (label, notes, toneClass) => {
    if (!notes.length) return "";
    const pills = notes
        .map((note) => `<span class="note-pill ${toneClass}">${note}</span>`)
        .join("");
    return `<div class="reveal-label">${label}</div><div class="note-pills">${pills}</div>`;
};

const renderChordPill = (label, chordLabel, toneClass) => {
    if (!chordLabel) return "";
    return `<div class="reveal-label">${label}</div><div class="note-pills"><span class="note-pill ${toneClass}">${chordLabel}</span></div>`;
};

const renderTonePills = (items, toneClassOrResolver = "good") => {
    if (!items.length) return "";
    return items.map((item) => {
        const toneClass = typeof toneClassOrResolver === "function"
            ? toneClassOrResolver(item)
            : toneClassOrResolver;
        return `<span class="note-pill ${toneClass}">${item}</span>`;
    }).join("");
};

const renderRevealCell = (label, pillsHtml) => {
    if (!pillsHtml) return "";
    return `<div class="reveal-cell"><div class="reveal-label">${label}</div><div class="note-pills">${pillsHtml}</div></div>`;
};

const renderChordRevealGrid = (entries) => {
    const cells = entries.filter(Boolean).join("");
    return `<div class="reveal-grid compact">${cells}</div>`;
};

const renderChordDetectionMeta = (label, noteIds, toneClass = "good") => {
    const detected = detectChordFromNoteIds(noteIds);
    if (!detected) return "";
    return renderChordPill(label, detected.label, toneClass);
};

const renderPressedPills = () => {
    if (!state.selectedNotes.length) return "";
    const targetSet = new Set(state.targetNotes);
    const pills = renderTonePills(state.selectedNotes, (note) => (targetSet.has(note) ? "good" : "bad"));
    return `<div>${REVEAL_COPY.yourNotes || "Your notes"}</div><div class="note-pills">${pills}</div>`;
};

const buildNoteComparison = (targetNotes, answerNotes) => {
    const targetSet = new Set(targetNotes);
    const answerSet = new Set(answerNotes);
    const correct = answerNotes.filter((note) => targetSet.has(note));
    const wrong = answerNotes.filter((note) => !targetSet.has(note));
    const missed = targetNotes.filter((note) => !answerSet.has(note));
    return { correct, wrong, missed };
};

const renderNoteComparisonCells = (targetNotes, answerNotes) => {
    const comparison = buildNoteComparison(targetNotes, answerNotes);
    const correctCell = renderRevealCell(
        REVEAL_COPY.correctNotes || "Correct notes",
        comparison.correct.length ? renderTonePills(comparison.correct, "good") : '<span class="note-pill neutral">None</span>'
    );
    const wrongCell = renderRevealCell(
        REVEAL_COPY.wrongNotes || "Wrong notes",
        comparison.wrong.length ? renderTonePills(comparison.wrong, "bad") : '<span class="note-pill neutral">None</span>'
    );
    const missedCell = renderRevealCell(
        REVEAL_COPY.missedNotes || "Missed notes",
        comparison.missed.length ? renderTonePills(comparison.missed, "missed") : '<span class="note-pill neutral">None</span>'
    );
    return [correctCell, wrongCell, missedCell];
};

const playRevealSequence = (options = {}) => {
    if (!state.active || !state.targetNotes.length) {
        return;
    }
    revealTimers.forEach((timer) => clearTimeout(timer));
    revealTimers.length = 0;
    revealSequenceId += 1;
    const seqId = revealSequenceId;
    revealPlaying = true;
    const snapshot = options.snapshot ?? lastReveal ?? {
        target: [...state.targetNotes],
        selected: [...state.selectedNotes]
    };
    const targetNotes = snapshot.target ?? [];
    const selectedNotes = snapshot.selected ?? [];
    const isCorrect = options.isCorrect ?? (
        targetNotes.length === selectedNotes.length &&
        targetNotes.every((noteId) => selectedNotes.includes(noteId))
    );
    const revealDelayMs = (options.delay ?? 0.55) * 1000;
    const targetSpanMs = getPlaybackSpan(targetNotes, state.mode) * 1000;
    const playSelectedAfterTarget = Boolean(options.alwaysPlaySelected) || !isCorrect;
    const selectedSpanMs = (playSelectedAfterTarget ? getPlaybackSpan(selectedNotes, state.mode) : 0) * 1000;

    const playTargetTimer = setTimeout(() => {
        if (seqId !== revealSequenceId) return;
        playNotes(targetNotes, state.mode, undefined, {
            animate: true,
            animationDelay: 0,
            animationHoldMs: ROUND_ANIM_HOLD_MS
        });
    }, revealDelayMs);
    revealTimers.push(playTargetTimer);

    if (playSelectedAfterTarget && selectedNotes.length) {
        const playSelectedTimer = setTimeout(() => {
            if (seqId !== revealSequenceId) return;
            playNotes(selectedNotes, state.mode, undefined, {
                animate: true,
                animationDelay: 0,
                animationHoldMs: ROUND_ANIM_HOLD_MS
            });
        }, revealDelayMs + targetSpanMs);
        revealTimers.push(playSelectedTimer);
    }

    const doneTimer = setTimeout(() => {
        if (seqId !== revealSequenceId) return;
        revealPlaying = false;
        revealTimer = null;
    }, revealDelayMs + targetSpanMs + selectedSpanMs);
    revealTimers.push(doneTimer);
};

const playSelectedChord = () => {
    if (!state.active) {
        updateStatus();
        return;
    }
    if (isTypingOnlyMode()) {
        if (!playTypedInputChord()) {
            resultEl.textContent = ACTION_COPY.typeValidChordFirst || "Type a valid chord first.";
        }
        return;
    }
    if (state.submitted) {
        abortPlayback();
        playRevealSequence({ delay: 0, snapshot: lastReveal });
        return;
    }
    if (!state.selectedNotes.length) {
        resultEl.textContent = ACTION_COPY.selectNotesFirst || "Select some notes first.";
        return;
    }
    playNotes(state.selectedNotes, state.mode, undefined, {
        animate: true,
        animationDelay: 0,
        animationHoldMs: ROUND_ANIM_HOLD_MS
    });
};

const playTypedInputChord = () => {
    if (!state.active || state.submitted || !isTypingEnabled()) return false;
    if (getEffectiveBlindMode()) return false;
    const parsed = updateTypedPreviewFromInput();
    if (!parsed) return false;
    const noteIds = getTypedPreviewNoteIds(parsed);
    if (!noteIds.length) return false;
    playNotes(noteIds, "simultaneous", undefined, {
        animate: true,
        animationDelay: 0,
        animationHoldMs: ROUND_ANIM_HOLD_MS
    });
    resultEl.textContent = ACTION_COPY.previewChord?.(parsed.label) ?? `Preview: ${parsed.label}`;
    return true;
};

const startHeldPlayback = () => {
    if (!state.active) return;
    if (getEffectiveBlindMode() && !state.submitted) return;
    if (isTypingOnlyMode()) {
        if (!playTypedInputChord()) {
            resultEl.textContent = ACTION_COPY.typeValidChordFirst || "Type a valid chord first.";
        }
        return;
    }
    if (state.submitted) {
        const replayNotes = (lastReveal?.selected?.length
            ? [...lastReveal.selected]
            : (state.selectedNotes.length ? [...state.selectedNotes] : [...state.targetNotes]));
        if (!replayNotes.length) {
            resultEl.textContent = ACTION_COPY.noReplayNotes || "No notes available to replay.";
            return;
        }
        if (revealPlaying) {
            abortPlayback();
        }
        const ctx = ensureAudio();
        const durationOverride = state.noteDuration + HOLD_MAX_EXTRA;
        playNotes(replayNotes, state.mode, ctx.currentTime + KEY_PRESS_DELAY, {
            animate: false,
            durationOverride
        });
        replayNotes.forEach((noteId) => {
            activateKey(noteId);
        });
        holdState.active = true;
        holdState.holding = false;
        holdState.pressAt = performance.now();
        holdState.noteIds = replayNotes;
        holdState.stopAt = holdState.pressAt + state.noteDuration * 1000;
        if (holdState.holdTimer) clearTimeout(holdState.holdTimer);
        holdState.holdTimer = setTimeout(() => {
            holdState.holding = true;
        }, HOLD_THRESHOLD * 1000);
        return;
    }
    if (!state.selectedNotes.length) {
        resultEl.textContent = ACTION_COPY.selectNotesFirst || "Select some notes first.";
        return;
    }

    const ctx = ensureAudio();
    const durationOverride = state.noteDuration + HOLD_MAX_EXTRA;
    playNotes(state.selectedNotes, state.mode, ctx.currentTime + KEY_PRESS_DELAY, {
        animate: false,
        durationOverride
    });
    state.selectedNotes.forEach((noteId) => {
        activateKey(noteId);
    });

    holdState.active = true;
    holdState.holding = false;
    holdState.pressAt = performance.now();
    holdState.noteIds = [...state.selectedNotes];
    holdState.stopAt = holdState.pressAt + state.noteDuration * 1000;

    if (holdState.holdTimer) clearTimeout(holdState.holdTimer);

    holdState.holdTimer = setTimeout(() => {
        holdState.holding = true;
    }, HOLD_THRESHOLD * 1000);
};

const releaseHeldPlayback = () => {
    if (isTypingOnlyMode()) {
        return;
    }
    if (!holdState.active) return;
    if (holdState.holdTimer) {
        clearTimeout(holdState.holdTimer);
        holdState.holdTimer = null;
    }

    const now = performance.now();
    const remainingMs = Math.max(0, holdState.stopAt - now);
    const elapsedMs = Math.max(0, now - holdState.pressAt);
    const animDelayMs = Math.max(0, MIN_KEY_ANIM_MS - elapsedMs);

    holdState.noteIds.forEach((noteId) => {
        scheduleKeyRelease(noteId, animDelayMs);
    });
    if (holdState.noteIds.length) {
        setTimeout(() => {
            stopNotesById(holdState.noteIds);
        }, remainingMs);
    }

    holdState.active = false;
    holdState.holding = false;
    holdState.noteIds = [];
};

const buildTypingRevealDetail = (parsed) => {
    if (!state.targetChord) return "";
    if (!parsed) {
        return "<div class=\"reveal-label\">Your answer could not be parsed.</div>";
    }
    const mismatches = [];
    if (parsed.rootPc !== state.targetChord.rootPc) {
        mismatches.push(`root should be ${state.targetChord.rootName}`);
    }
    if (parsed.quality.id !== state.targetChord.quality.id) {
        mismatches.push(`quality should be ${state.targetChord.quality.suffix || "major"}`);
    }
    if (Number.isFinite(parsed.rootMidi) && Number.isFinite(state.targetChord.rootMidi) && parsed.rootMidi !== state.targetChord.rootMidi) {
        const expectedOctave = Math.floor(state.targetChord.rootMidi / 12) - 1;
        mismatches.push(`root octave should be ${state.targetChord.rootName}${expectedOctave}`);
    }
    if (!mismatches.length) return "";
    return `<div class="reveal-label">${REVEAL_COPY.differencePrefix || "Difference"}: ${mismatches.join(", ")}.</div>`;
};

const submitTypedAnswer = () => {
    if (!ensureRound()) {
        return;
    }
    abortPlayback();
    clearTypingAutoNext();
    const parsed = updateTypedPreviewFromInput();
    const target = state.targetChord;
    if (!target) {
        resultEl.textContent = ACTION_COPY.noTargetChord || "No target chord available. Start a new round.";
        return;
    }
    const answerNotes = parsed ? getTypedPreviewNoteIds(parsed) : [];
    const octaveValid = !parsed
        || !Number.isFinite(parsed.rootMidi)
        || !Number.isFinite(target.rootMidi)
        || parsed.rootMidi === target.rootMidi;

    const isCorrect = Boolean(
        parsed &&
        parsed.rootPc === target.rootPc &&
        parsed.quality.id === target.quality.id &&
        octaveValid
    );
    state.submissionSource = "typing";
    state.submittedComparisonNotes = isCorrect ? [...state.targetNotes] : [...answerNotes];
    setSubmitted(true);
    if (isCorrect) {
        resultEl.textContent = ACTION_COPY.correctChord?.(target.label) ?? `Correct: ${target.label}`;
        const targetChordCell = renderRevealCell(
            REVEAL_COPY.targetChord || "Target chord",
            renderTonePills([target.label], "good")
        );
        const targetNotesCell = renderRevealCell(
            REVEAL_COPY.targetNotes || "Target notes",
            renderTonePills(state.targetNotes, "good")
        );
        revealEl.innerHTML = renderChordRevealGrid([targetChordCell, targetNotesCell]);
        lastReveal = {
            target: [...state.targetNotes],
            selected: answerNotes.length ? [...answerNotes] : [...state.targetNotes]
        };
        playRevealSequence({ snapshot: lastReveal, isCorrect: true, alwaysPlaySelected: true });
        updateStatus();
        updateKeyStates();
        typingAutoNextTimer = setTimeout(() => {
            typingAutoNextTimer = null;
            if (isTypingOnlyMode()) {
                void startRound(true);
            }
        }, TYPE_SUCCESS_FLASH_MS);
        return;
    }

    const answerLabel = parsed?.label || (state.typedAnswer?.trim() || "No answer");
    const targetChordCell = renderRevealCell(
        REVEAL_COPY.targetChord || "Target chord",
        renderTonePills([target.label], "good")
    );
    const targetNotesCell = renderRevealCell(
        REVEAL_COPY.targetNotes || "Target notes",
        renderTonePills(state.targetNotes, "good")
    );
    const answerChordCell = renderRevealCell(
        REVEAL_COPY.yourChord || "Your chord",
        renderTonePills([answerLabel], "bad")
    );
    const detail = buildTypingRevealDetail(parsed);
    revealEl.innerHTML = `${renderChordRevealGrid([targetChordCell, targetNotesCell, answerChordCell])}${detail}`;
    resultEl.textContent = FEEDBACK_COPY.wrongChordName || "Not quite. Compare the chord name and quality.";
    lastReveal = {
        target: [...state.targetNotes],
        selected: [...answerNotes]
    };
    playRevealSequence({ snapshot: lastReveal, isCorrect: false, alwaysPlaySelected: true });
    updateStatus();
    updateKeyStates();
};

const submitAnswer = () => {
    if (isTypingOnlyMode()) {
        submitTypedAnswer();
        return;
    }
    if (state.trainingMode === "both") {
        const hasTyped = Boolean(state.typedAnswer?.trim());
        const typingFocused = document.activeElement === chordAnswerInput;
        if (hasTyped && (typingFocused || !state.selectedNotes.length)) {
            submitTypedAnswer();
            return;
        }
    }
    if (!ensureRound()) {
        return;
    }
    abortPlayback();
    state.submissionSource = "keyboard";
    state.submittedComparisonNotes = [...state.selectedNotes];
    setSubmitted(true);
    const isCorrect = isSelectionCorrect();

    if (getIsChordRound()) {
        const selectedChord = detectChordFromNoteIds(state.selectedNotes);
        const targetLabel = state.targetChord?.label ?? "Unknown";
        const selectedLabel = selectedChord?.label ?? "Unknown";
        resultEl.textContent = isCorrect
            ? (FEEDBACK_COPY.correctChord || "Correct chord. Great ear.")
            : (FEEDBACK_COPY.wrongChordQuality || "Not quite. Compare the chord quality.");
        const targetSet = new Set(state.targetNotes);
        const targetChordCell = renderRevealCell(
            REVEAL_COPY.targetChord || "Target chord",
            renderTonePills([targetLabel], "good")
        );
        const targetNotesCell = renderRevealCell(
            REVEAL_COPY.targetNotes || "Target notes",
            renderTonePills(state.targetNotes, "good")
        );
        const selectedChordCell = renderRevealCell(
            REVEAL_COPY.yourChord || "Your chord",
            renderTonePills([selectedLabel], isCorrect ? "good" : "bad")
        );
        const selectedNotesCell = renderRevealCell(
            REVEAL_COPY.yourNotes || "Your notes",
            state.selectedNotes.length
                ? renderTonePills(state.selectedNotes, (note) => (targetSet.has(note) ? "good" : "bad"))
                : '<span class="note-pill bad">None</span>'
        );
        const noteComparisonCells = renderNoteComparisonCells(state.targetNotes, state.selectedNotes);
        revealEl.innerHTML = renderChordRevealGrid([targetChordCell, targetNotesCell, selectedChordCell, selectedNotesCell, ...noteComparisonCells]);
    } else {
        resultEl.textContent = isCorrect
            ? (FEEDBACK_COPY.correctNotes || "Correct. Great ear.")
            : (FEEDBACK_COPY.wrongNotes || "Not quite. Listen closely.");
        const targetHtml = renderNotePills(REVEAL_COPY.targetNotes || "Target notes", state.targetNotes, "good");
        const pressedHtml = renderPressedPills();
        const targetChordMeta = renderChordDetectionMeta("Detected target chord", state.targetNotes, "good");
        const selectedChordMeta = renderChordDetectionMeta("Detected your chord", state.selectedNotes, isCorrect ? "good" : "bad");
        revealEl.innerHTML = `${targetHtml}${pressedHtml}${targetChordMeta}${selectedChordMeta}`;
    }

    lastReveal = {
        target: [...state.targetNotes],
        selected: [...state.selectedNotes]
    };
    playRevealSequence({
        snapshot: lastReveal,
        isCorrect,
        alwaysPlaySelected: getIsChordRound()
    });
    updateKeyStates();
    updatePrimaryAction();
    updateStatus();
};

Object.assign(App.game, {
    createTarget,
    startRound,
    goHome,
    playTarget,
    playSelectedChord,
    playTypedInputChord,
    startManualNote,
    releaseManualNote,
    startHeldPlayback,
    releaseHeldPlayback,
    submitTypedAnswer,
    updateTypedPreviewFromInput,
    submitAnswer,
    updateStatus,
    updateKeyStates,
    setKeyboardEnabled,
    clearTypingAutoNext
});


