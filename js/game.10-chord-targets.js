const getConsistentPreviewDuration = (minimumDuration = 0) => {
    const safeMinimum = Number.isFinite(minimumDuration) ? minimumDuration : 0;
    return Math.max(safeMinimum, state.noteDuration);
};

const getConsistentAnimationHoldMs = (durationSeconds = state.noteDuration) => (
    Math.max(MIN_KEY_ANIM_MS, durationSeconds * 1000)
);

const playConsistentPreview = (noteIds, mode = "simultaneous", options = {}) => {
    if (!noteIds?.length) return 0;
    const {
        minimumDuration = 0,
        animate = true,
        animationHoldMs,
        startTime,
        ...passThrough
    } = options;
    const durationOverride = Number.isFinite(passThrough.durationOverride)
        ? Math.max(minimumDuration, passThrough.durationOverride)
        : getConsistentPreviewDuration(minimumDuration);
    return playNotes(noteIds, mode, startTime, {
        ...passThrough,
        animate,
        durationOverride,
        ...(animate ? { animationHoldMs: animationHoldMs ?? getConsistentAnimationHoldMs(durationOverride) } : {})
    });
};

const beginInteractivePressSession = ({
    noteIds,
    mode = "simultaneous",
    playSound = true,
    behavior = getInteractivePressBehavior(),
    preset,
    startDelaySeconds = KEY_PRESS_DELAY
} = {}) => {
    const ids = Array.isArray(noteIds) ? [...noteIds] : [];
    if (!ids.length) return null;
    const now = performance.now();
    if (playSound) {
        const ctx = ensureAudio();
        playNotes(ids, mode, ctx.currentTime + startDelaySeconds, {
            animate: false,
            durationOverride: state.noteDuration + HOLD_MAX_EXTRA,
            preset
        });
    }
    ids.forEach((noteId) => activateKey(noteId));
    const entry = {
        noteIds: ids,
        pressAt: now,
        stopAt: now + state.noteDuration * 1000,
        playSound,
        behavior,
        holdTimer: null,
        holding: false
    };
    entry.holdTimer = setTimeout(() => {
        entry.holding = true;
    }, HOLD_THRESHOLD * 1000);
    return entry;
};

const releaseInteractivePressSession = (entry, options = {}) => {
    if (!entry) return;
    const { pedalAware = false, pedalNoteId = null } = options;
    if (entry.holdTimer) {
        clearTimeout(entry.holdTimer);
        entry.holdTimer = null;
    }
    const now = performance.now();
    const remainingMs = entry.behavior === PRESS_BEHAVIOR.HOLD_WHILE_PRESSED
        ? 0
        : Math.max(0, entry.stopAt - now);
    const elapsedMs = Math.max(0, now - entry.pressAt);
    const animDelayMs = state.active ? Math.max(0, MIN_KEY_ANIM_MS - elapsedMs) : SHORT_PRESS_ANIM_MS;

    if (pedalAware && pedalState.active && pedalNoteId) {
        pedalState.pending.add(pedalNoteId);
        scheduleKeyRelease(pedalNoteId, animDelayMs);
        return;
    }

    entry.noteIds.forEach((noteId) => {
        scheduleKeyRelease(noteId, animDelayMs);
    });
    if (entry.playSound && audioContext && entry.noteIds.length) {
        setTimeout(() => {
            stopNotesById(entry.noteIds);
        }, remainingMs);
    }
};

const getReplayNoteIds = () => {
    if (isTypingEnabled()) {
        const parsed = updateTypedPreviewFromInput();
        if (parsed) {
            const typedNoteIds = getTypedPreviewNoteIds(parsed);
            if (typedNoteIds.length) {
                return {
                    noteIds: typedNoteIds,
                    mode: "simultaneous",
                    source: "typed",
                    label: parsed.label
                };
            }
        }
    }
    const keyboardSelection = getEffectiveKeyboardSelection(state.selectedNotes);
    if (keyboardSelection.length) {
        return {
            noteIds: keyboardSelection,
            mode: state.mode,
            source: "selected"
        };
    }
    return null;
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

const resolveQualityFromToken = (qualityToken, fallbackQualityId = null) => {
    const normalized = normalizeQualityToken(qualityToken || "");
    const qualityId = CHORD_QUALITY_ALIASES.get(normalized) ?? fallbackQualityId;
    if (!qualityId) return null;
    return CHORD_QUALITY_BY_ID.get(qualityId) ?? null;
};

const parseBassToken = (token) => {
    const normalizeSymbols = App.chords?.normalizeSymbols;
    const normalized = typeof normalizeSymbols === "function"
        ? normalizeSymbols(token)
        : String(token ?? "");
    const match = normalized.match(/^\s*([A-Ga-g])\s*([#b]?)\s*$/);
    if (!match) return null;
    const rootToken = `${match[1].toUpperCase()}${(match[2] || "").toUpperCase()}`;
    const bassPc = CHORD_ROOT_ALIASES[rootToken];
    if (!Number.isFinite(bassPc)) return null;
    return {
        bassPc,
        bassName: getRootName(bassPc)
    };
};

const splitQualityAndBass = (rawQuality) => {
    const raw = String(rawQuality ?? "");
    if (!raw.includes("/")) {
        return { qualityToken: raw, bass: null };
    }
    const normalized = normalizeQualityToken(raw);
    if (normalized && CHORD_QUALITY_ALIASES.has(normalized)) {
        return { qualityToken: raw, bass: null };
    }
    const [before, after] = raw.split("/");
    const normalizedBefore = normalizeQualityToken(before);
    const hasBeforeQuality = CHORD_QUALITY_ALIASES.has(normalizedBefore);
    if (!hasBeforeQuality && before.trim()) {
        return { qualityToken: raw, bass: null };
    }
    const bass = parseBassToken(after);
    if (!bass) {
        return { qualityToken: raw, bass: null };
    }
    return { qualityToken: before, bass };
};

const buildChordLabelWithBass = (rootPc, quality, bass) => {
    const base = buildChordLabel(rootPc, quality);
    if (!bass?.bassName || bass.bassName === getRootName(rootPc)) {
        return base;
    }
    return `${base}/${bass.bassName}`;
};

const parseChordInput = (raw, options = {}) => {
    const input = String(raw ?? "").trim();
    if (!input) return null;
    const normalizeSymbols = App.chords?.normalizeSymbols;
    const normalizedInput = typeof normalizeSymbols === "function" ? normalizeSymbols(input) : input;
    const match = normalizedInput.match(/^(-?\d+)?\s*([A-Ga-g])\s*([#b]?)\s*(.*)$/);
    if (!match) return null;

    const rootToken = `${match[2].toUpperCase()}${(match[3] || "").toUpperCase()}`;
    const rootPc = CHORD_ROOT_ALIASES[rootToken];
    if (!Number.isFinite(rootPc)) return null;
    const rootOctave = match[1] !== undefined ? Number.parseInt(match[1], 10) : null;
    const rootMidi = Number.isFinite(rootOctave) ? ((rootOctave + 1) * 12) + rootPc : null;

    const { qualityToken, bass } = splitQualityAndBass(match[4] || "");
    const fallbackQuality = qualityToken.trim() ? null : "maj";
    const quality = resolveQualityFromToken(qualityToken, fallbackQuality);
    if (!quality) return null;

    if (Array.isArray(options.allowedQualityIds) && options.allowedQualityIds.length) {
        if (!options.allowedQualityIds.includes(quality.id)) return null;
    }

    const label = buildChordLabelWithBass(rootPc, quality, bass);
    return {
        rootPc,
        rootName: getRootName(rootPc),
        rootOctave: Number.isFinite(rootOctave) ? rootOctave : null,
        rootMidi: Number.isFinite(rootMidi) ? rootMidi : null,
        quality,
        label,
        displayLabel: label,
        inputLabel: input,
        inputType: "absolute",
        bassPc: bass?.bassPc ?? null,
        bassName: bass?.bassName ?? null
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
        applyRoundStatePatch({
            targetChord: null,
            targetNotes: []
        }, "round/create-chord-target-empty");
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
        applyRoundStatePatch({
            targetChord: null,
            targetNotes: []
        }, "round/create-chord-target-fallback-empty");
        return;
    }

    recentChordTargets.unshift(picked.signature);
    if (recentChordTargets.length > CHORD_HISTORY_LIMIT) {
        recentChordTargets.pop();
    }

    applyRoundStatePatch({
        targetChord: picked,
        targetNotes: [...picked.noteIds]
    }, "round/create-chord-target");
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

    applyRoundStatePatch({
        targetNotes: next,
        targetChord: null
    }, "round/create-note-target");
};

const createTarget = () => {
    applyRoundStatePatch({ rootHintSuppressed: false }, "round/reset-root-hint-suppressed");
    if (getIsChordRound()) {
        createChordTarget();
        return;
    }
    createNoteTarget();
};

