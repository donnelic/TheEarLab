const findNearestSample = (samples, midi) => {
    if (!samples.length) return null;
    let best = samples[0];
    let bestDist = Math.abs(best.midi - midi);
    for (let i = 1; i < samples.length; i += 1) {
        const candidate = samples[i];
        const dist = Math.abs(candidate.midi - midi);
        if (dist < bestDist) {
            best = candidate;
            bestDist = dist;
        }
    }
    return best;
};

const scheduleSf2Note = (cacheEntry, soundfont, midi, startTime, duration, volume, noteId) => {
    if (!cacheEntry?.ready || cacheEntry.type !== "sf2") return;
    const synth = cacheEntry.synth ?? sf2Runtime.synth;
    if (!synth) return;

    synth.midiProgramSelect(SF2_CHANNEL, cacheEntry.sfontId, cacheEntry.bank, cacheEntry.program);
    applySf2TrimGenerators(synth);

    const velocityCurve = Number.isFinite(soundfont.velocityCurve) ? soundfont.velocityCurve : AUDIO_DEFAULT_VELOCITY_CURVE;
    const volumeScale = Number.isFinite(soundfont.volume) ? soundfont.volume : 1;
    const velocity = clampValue(
        Math.round(Math.pow(clampValue(volume, 0, 1), velocityCurve) * volumeScale * 127),
        1,
        110
    );
    const holdSeconds = getSf2NoteDuration(duration);
    const releaseTrim = state.adsrTrim?.release ?? 0;
    const releaseSeconds = clampValue(0.22 * (1 + releaseTrim * 0.9), 0.05, 1.8);
    const ctx = ensureAudio();
    const startDelayMs = Math.max(0, Math.round((startTime - ctx.currentTime) * 1000));

    const voice = {
        type: "sf2",
        synth,
        channel: SF2_CHANNEL,
        key: midi,
        noteId,
        releaseSeconds,
        releasing: false,
        stopTimer: null,
        disposed: false,
        started: false,
        onTimer: null,
        offTimer: null
    };

    activeVoices.add(voice);
    if (noteId) {
        getSourceEntry(noteId).add(voice);
    }

    const noteOff = () => {
        if (voice.disposed || !voice.started) return;
        voice.synth.midiNoteOff(voice.channel, voice.key);
        voice.started = false;
        const ttl = Math.max(40, Math.round(releaseSeconds * 1000) + 80);
        voice.stopTimer = setTimeout(() => removeVoice(voice), ttl);
    };

    voice.onTimer = setTimeout(() => {
        if (voice.disposed || voice.releasing) return;
        voice.started = true;
        voice.synth.midiNoteOn(voice.channel, voice.key, velocity);
        voice.offTimer = setTimeout(noteOff, Math.max(20, Math.round(holdSeconds * 1000)));
    }, startDelayMs);
};

const playPianoNote = (
    frequency,
    startTime,
    duration = state.noteDuration,
    volume = 0.8,
    noteId = null,
    presetKey = null
) => {
    const ctx = ensureAudio();
    const soundfont = getSelectedSoundfont(presetKey);
    if (!soundfont) return;

    if (noteId && activeVoicesById.has(noteId)) {
        stopNotesById([noteId], { releaseRateOverride: ABORT_RELEASE_RATE });
    }

    const start = Math.max(ctx.currentTime, startTime ?? ctx.currentTime);
    const targetMidi = noteId && noteMap.has(noteId) ? noteMap.get(noteId).midi : frequencyToMidi(frequency);

    const scheduleWithEntry = (cacheEntry, scheduledStart) => {
        if (cacheEntry?.type === "sf2") {
            scheduleSf2Note(cacheEntry, soundfont, targetMidi, scheduledStart, duration, volume, noteId);
            return;
        }
        if (!cacheEntry?.ready || !cacheEntry.samples.length) return;
        const sample = findNearestSample(cacheEntry.samples, targetMidi);
        if (!sample) return;

        const source = ctx.createBufferSource();
        source.buffer = sample.buffer;
        source.playbackRate.value = Math.pow(2, (targetMidi - sample.midi) / 12);

        const gainNode = ctx.createGain();
        const velocityCurve = Number.isFinite(soundfont.velocityCurve) ? soundfont.velocityCurve : AUDIO_DEFAULT_VELOCITY_CURVE;
        const volumeScale = Number.isFinite(soundfont.volume) ? soundfont.volume : 1;
        const peakLevel = Math.max(MIN_ENVELOPE_GAIN, Math.pow(clampValue(volume, 0, 1), velocityCurve) * volumeScale);

        const envelope = getSoundfontEnvelope(soundfont, duration);
        const releaseEnd = scheduleSampleEnvelope(gainNode, scheduledStart, peakLevel, envelope);

        source.connect(gainNode);
        gainNode.connect(masterGain);

        source.start(scheduledStart);
        source.stop(releaseEnd + 0.05);

        const voice = {
            source,
            gainNode,
            noteId,
            releaseSeconds: envelope.release,
            releasing: false,
            stopTimer: null,
            disposed: false
        };

        activeVoices.add(voice);
        if (noteId) {
            getSourceEntry(noteId).add(voice);
        }

        source.addEventListener("ended", () => {
            removeVoice(voice);
        });
    };

    const cached = soundfontCache.get(soundfont.id);
    if (cached?.ready) {
        scheduleWithEntry(cached, start);
        return;
    }

    ensureSoundfontReady(soundfont.id).then((entry) => {
        if (!entry?.ready) return;
        const safeStart = Math.max(ensureAudio().currentTime + SCHEDULE_LEAD, start);
        scheduleWithEntry(entry, safeStart);
    });
};

const registerKeyTimer = (noteId, timerId) => {
    activeKeyTimers.add(timerId);
    if (!noteId) return;
    if (!keyTimersByNote.has(noteId)) {
        keyTimersByNote.set(noteId, new Set());
    }
    keyTimersByNote.get(noteId).add(timerId);
};

const unregisterKeyTimer = (noteId, timerId) => {
    activeKeyTimers.delete(timerId);
    if (!noteId) return;
    const timers = keyTimersByNote.get(noteId);
    if (!timers) return;
    timers.delete(timerId);
    if (!timers.size) {
        keyTimersByNote.delete(noteId);
    }
};

const clearKeyTimersForNote = (noteId) => {
    const timers = keyTimersByNote.get(noteId);
    if (!timers) return;
    timers.forEach((timerId) => {
        clearTimeout(timerId);
        activeKeyTimers.delete(timerId);
    });
    keyTimersByNote.delete(noteId);
};

const activateKey = (noteId) => {
    const key = keyMap.get(noteId);
    if (!key) return;
    key.classList.add("active");
    const count = keyActiveCounts.get(noteId) ?? 0;
    keyActiveCounts.set(noteId, count + 1);
};

const scheduleKeyRelease = (noteId, delayMs) => {
    const timer = setTimeout(() => {
        const current = (keyActiveCounts.get(noteId) ?? 1) - 1;
        if (current <= 0) {
            keyActiveCounts.delete(noteId);
            const key = keyMap.get(noteId);
            if (key) key.classList.remove("active");
        } else {
            keyActiveCounts.set(noteId, current);
        }
        unregisterKeyTimer(noteId, timer);
    }, delayMs);
    registerKeyTimer(noteId, timer);
};

const scheduleKeyAnimation = (noteId, delaySeconds = 0, holdMs = 360) => {
    const key = keyMap.get(noteId);
    if (!key) return;
    const timer = setTimeout(() => {
        requestAnimationFrame(() => {
            activateKey(noteId);
            scheduleKeyRelease(noteId, holdMs);
            unregisterKeyTimer(noteId, timer);
        });
    }, delaySeconds * 1000);
    registerKeyTimer(noteId, timer);
};

const playNotes = (noteIds, mode, startTime, options = {}) => {
    const ctx = ensureAudio();
    const now = Math.max(ctx.currentTime, startTime ?? ctx.currentTime);
    const ids = Array.from(new Set((Array.isArray(noteIds) ? noteIds : []).filter((id) => noteMap.has(id))));
    if (!ids.length) return 0;
    const { animate = true, animationDelay, animationHoldMs, preset, _skipReadyGate = false } = options;
    const noteDuration = options.durationOverride ?? state.noteDuration;
    const gainScale = 1;
    const holdMs = animationHoldMs ?? Math.max(MIN_KEY_ANIM_MS, noteDuration * 1000);

    const selectedSoundfont = getSelectedSoundfont(preset);
    if (selectedSoundfont && !_skipReadyGate) {
        const cached = soundfontCache.get(selectedSoundfont.id);
        if (!cached?.ready) {
            void ensureSoundfontReady(selectedSoundfont.id).then((entry) => {
                if (!entry?.ready) return;
                const gateStart = Math.max(ensureAudio().currentTime + SCHEDULE_LEAD, now + 0.02);
                playNotes(ids, mode, gateStart, {
                    ...options,
                    _skipReadyGate: true
                });
            });
            const arpSpan = mode === "ascending" ? ARP_STEP * Math.max(0, ids.length - 1) : 0;
            return noteDuration + arpSpan;
        }
    }

    if (mode === "ascending") {
        ids.sort((a, b) => noteMap.get(a).midi - noteMap.get(b).midi);
        ids.forEach((id, index) => {
            const note = noteMap.get(id);
            if (!note) return;
            const t = now + index * ARP_STEP;
            playPianoNote(note.frequency, t, noteDuration, gainScale, id, preset);
            if (animate) {
                const delay = animationDelay !== undefined ? animationDelay + index * ARP_STEP : t - ctx.currentTime;
                scheduleKeyAnimation(id, delay, holdMs);
            }
        });
        return noteDuration + ARP_STEP * Math.max(0, ids.length - 1);
    }

    ids.forEach((id) => {
        const note = noteMap.get(id);
        if (!note) return;
        playPianoNote(note.frequency, now, noteDuration, gainScale, id, preset);
        if (animate) {
            const delay = animationDelay !== undefined ? animationDelay : now - ctx.currentTime;
            scheduleKeyAnimation(id, delay, holdMs);
        }
    });

    return noteDuration;
};

const playNotesNow = (noteIds, mode, options = {}) => {
    const ctx = ensureAudio();
    return playNotes(noteIds, mode, ctx.currentTime + SCHEDULE_LEAD, options);
};

