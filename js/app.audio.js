const ensureAudio = () => {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)({
            latencyHint: "interactive"
        });
    }
    if (!masterGain) {
        masterGain = audioContext.createGain();
        masterGain.gain.value = Math.pow(state.volume, 2.2);
        masterGain.connect(audioContext.destination);
    }
    if (audioContext.state === "suspended") {
        audioContext.resume();
    }
    return audioContext;
};

const ABORT_RELEASE_RATE = 25;

const releaseVoices = (voices, releaseRateOverride = null) => {
    if (!audioContext) return;
    const now = audioContext.currentTime;
    const Kr = Math.max(1, releaseRateOverride ?? state.adsr.releaseRate);
    const tau = Math.max(0.02, 1 / Kr);

    voices.forEach((voice) => {
        try {
            voice.oscGains.forEach((oscGain) => {
                const param = oscGain.gainNode.gain;
                const releaseMult = Number.isFinite(oscGain.adsrMults?.release) ? oscGain.adsrMults.release : 1;
                const localKr = Math.max(1, (releaseRateOverride ?? state.adsr.releaseRate) * releaseMult);
                const localTau = Math.max(0.02, 1 / localKr);
                param.cancelScheduledValues(now);
                const currentValue =
                    typeof param.getValueAtTime === "function" ? param.getValueAtTime(now) : param.value;
                const current = Math.max(ENVELOPE_EPS, currentValue);
                param.setValueAtTime(current, now);
                param.setTargetAtTime(ENVELOPE_EPS, now, localTau);
            });
            const releaseDuration = Math.max(0.05, Math.log(1 / ENVELOPE_EPS) / Kr);
            const stopAt = now + releaseDuration;
            voice.oscs.forEach((osc) => osc.stop(stopAt));
        } catch (error) {
            // Ignore already-stopped nodes
        }
    });
    voices.forEach((voice) => {
        if (voice.stopTimer) {
            clearTimeout(voice.stopTimer);
            voice.stopTimer = null;
        }
        if (voice.noteId) {
            activeVoicesById.delete(voice.noteId);
        }
    });
};

const stopAllNotes = (options = {}) => {
    if (!audioContext) return;
    const { releaseRateOverride = null, excludeIds = [] } = options;
    const excluded = new Set(excludeIds);
    const voicesToStop = Array.from(activeVoices).filter((voice) => {
        if (!voice.noteId) return true;
        return !excluded.has(voice.noteId);
    });

    releaseVoices(voicesToStop, releaseRateOverride);
    voicesToStop.forEach((voice) => activeVoices.delete(voice));

    activeKeyTimers.forEach((timer) => {
        clearTimeout(timer);
    });
    activeKeyTimers.clear();
    keyTimersByNote.clear();
    if (excluded.size) {
        const preserved = new Map();
        excluded.forEach((noteId) => {
            if (keyActiveCounts.has(noteId)) {
                preserved.set(noteId, keyActiveCounts.get(noteId));
            }
        });
        keyActiveCounts.clear();
        preserved.forEach((value, noteId) => keyActiveCounts.set(noteId, value));
    } else {
        keyActiveCounts.clear();
    }
    const releaseTimer = setTimeout(() => {
        keyMap.forEach((key, id) => {
            if (!excluded.has(id)) {
                key.classList.remove("active");
            }
        });
        activeKeyTimers.delete(releaseTimer);
    }, 80);
    activeKeyTimers.add(releaseTimer);

    if (revealTimer) {
        clearTimeout(revealTimer);
        revealTimer = null;
    }
    revealTimers.forEach((timer) => clearTimeout(timer));
    revealTimers.length = 0;
    revealSequenceId += 1;
    revealPlaying = false;
};

const stopNotesById = (noteIds, options = {}) => {
    if (!audioContext || !noteIds.length) return;
    const include = new Set(noteIds);
    const voicesToStop = [];

    activeVoices.forEach((voice) => {
        if (voice.noteId && include.has(voice.noteId)) {
            voicesToStop.push(voice);
        }
    });

    releaseVoices(voicesToStop, options.releaseRateOverride ?? null);
    voicesToStop.forEach((voice) => activeVoices.delete(voice));
};

const abortPlayback = (excludeIds = []) => {
    stopAllNotes({ releaseRateOverride: ABORT_RELEASE_RATE, excludeIds });
};

const createNoise = (ctx, duration = 0.03) => {
    const buffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) {
        const t = 1 - i / data.length;
        data[i] = (Math.random() * 2 - 1) * t;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    return noise;
};

const ENVELOPE_EPS = 0.0001;
const PULSE_FALLBACK = "square";

const getEnvelopeState = (noteLength, adsrMult = {}) => {
    const attackMult = Number.isFinite(adsrMult.attack) ? adsrMult.attack : 1;
    const decayMult = Number.isFinite(adsrMult.decay) ? adsrMult.decay : 1;
    const releaseMult = Number.isFinite(adsrMult.release) ? adsrMult.release : 1;
    const peakMult = Number.isFinite(adsrMult.peak) ? adsrMult.peak : 1;
    const sustainMult = Number.isFinite(adsrMult.sustain) ? adsrMult.sustain : 1;
    const A = Math.max(0.005, state.adsr.attack * attackMult);
    const Ks = Math.max(0.03, state.adsr.decayRate * decayMult);
    const Kr = Math.max(0.5, state.adsr.releaseRate * releaseMult);
    const V = Math.max(0.05, state.adsr.peak * peakMult);
    const L = Math.max(0.01, noteLength);
    const baseLevelAtL = L <= A ? (V / A) * L : V * Math.exp(-Ks * (L - A));
    const levelAtL = Math.max(ENVELOPE_EPS, baseLevelAtL * sustainMult);
    const releaseDuration = Math.max(
        0,
        Math.log(Math.max(levelAtL, ENVELOPE_EPS) / ENVELOPE_EPS) / Kr
    );
    return { A, Ks, Kr, V, L, levelAtL, releaseDuration };
};

const scheduleEnvelope = (gainParam, startTime, duration, levelScale, fromCurrent = false, adsrMult = {}) => {
    const env = getEnvelopeState(duration, adsrMult);
    const tAttackEnd = startTime + Math.min(env.A, env.L);
    const tHoldEnd = startTime + env.L;
    const levelAtA = Math.max(
        ENVELOPE_EPS,
        (env.L <= env.A ? env.levelAtL : env.V) * levelScale
    );
    const levelAtL = Math.max(ENVELOPE_EPS, env.levelAtL * levelScale);
    const releaseEnd = tHoldEnd + env.releaseDuration;
    const now = Math.max(startTime, audioContext?.currentTime ?? startTime);

    gainParam.cancelScheduledValues(now);
    if (fromCurrent) {
        const currentValue =
            typeof gainParam.getValueAtTime === "function"
                ? gainParam.getValueAtTime(now)
                : gainParam.value;
        gainParam.setValueAtTime(Math.max(ENVELOPE_EPS, currentValue), now);
    } else {
        gainParam.setValueAtTime(ENVELOPE_EPS, startTime);
    }
    gainParam.linearRampToValueAtTime(levelAtA, tAttackEnd);

    if (env.L > env.A) {
        gainParam.exponentialRampToValueAtTime(levelAtL, tHoldEnd);
    }

    if (env.releaseDuration > 0) {
        gainParam.exponentialRampToValueAtTime(ENVELOPE_EPS, releaseEnd);
    } else {
        gainParam.setValueAtTime(ENVELOPE_EPS, tHoldEnd);
    }

    return { env, releaseEnd };
};

const getOscType = (type) => (type === "pulse" ? PULSE_FALLBACK : type);

const applyNoiseBurst = (ctx, ampNode, startTime, level, decay, options = {}) => {
    if (!level) return;
    const noise = createNoise(ctx, Math.max(0.02, decay * 2));
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(level, startTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, startTime + Math.max(0.01, decay));
    let destination = noiseGain;
    if (options.filterType) {
        const filter = ctx.createBiquadFilter();
        filter.type = options.filterType;
        if (Number.isFinite(options.centerFreq)) {
            filter.frequency.value = options.centerFreq;
        }
        if (Number.isFinite(options.q)) {
            filter.Q.value = options.q;
        }
        noiseGain.connect(filter);
        destination = filter;
    }
    noise.connect(noiseGain);
    destination.connect(ampNode);
    noise.start(startTime);
    noise.stop(startTime + Math.max(0.08, decay * 2.5));
};

const retriggerVoice = (voice, startTime, duration, volume) => {
    const ctx = ensureAudio();
    const now = Math.max(ctx.currentTime, startTime);
    const env = getEnvelopeState(duration);
    const releaseEnd = now + env.L + env.releaseDuration;

    voice.oscGains.forEach((oscGain) => {
        const levelScale = volume * oscGain.baseGain;
        scheduleEnvelope(
            oscGain.gainNode.gain,
            now,
            duration,
            levelScale,
            true,
            oscGain.adsrMults
        );
    });

    if (voice.stopTimer) {
        clearTimeout(voice.stopTimer);
    }
    const stopDelay = Math.max(0, (releaseEnd - ctx.currentTime) * 1000 + 120);
    voice.stopTimer = setTimeout(() => {
        voice.oscs.forEach((osc) => {
            try {
                osc.stop();
            } catch (error) {
                // Ignore already-stopped nodes
            }
        });
    }, stopDelay);
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
    if (noteId && activeVoicesById.has(noteId)) {
        retriggerVoice(activeVoicesById.get(noteId), startTime, duration, volume);
        return;
    }
    const amp = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    const preset = PIANO_PRESETS[presetKey] ?? PIANO_PRESETS[state.pianoTone] ?? PIANO_PRESETS[DEFAULT_PIANO];
    filter.type = "lowpass";
    filter.frequency.value = preset.filterFrequency;
    if (Number.isFinite(preset.filterQ)) {
        filter.Q.value = preset.filterQ;
    }

    const velocityCurve = Number.isFinite(preset.velocityCurve) ? preset.velocityCurve : 1;
    const masterScale = Number.isFinite(preset.masterGain) ? preset.masterGain : 1;
    const scaledVolume = Math.pow(volume, velocityCurve) * masterScale;
    const env = getEnvelopeState(duration);
    const releaseEnd = startTime + env.L + env.releaseDuration;
    amp.gain.setValueAtTime(1, startTime);

    const unisonVoices = Math.max(1, Math.round(preset.unison?.voices ?? 1));
    const detuneCents = Array.isArray(preset.unison?.detuneCents)
        ? preset.unison.detuneCents
        : Array.from({ length: unisonVoices }, (_, idx) => (idx - (unisonVoices - 1) / 2) * 4);
    const stereoSpread = Number.isFinite(preset.unison?.stereoSpread) ? preset.unison.stereoSpread : 0;

    const oscillators = preset.oscillators.flatMap((oscSpec) => {
        const entries = [];
        for (let i = 0; i < unisonVoices; i += 1) {
            const osc = ctx.createOscillator();
            const oscGain = ctx.createGain();
            const adsrMults = {
                attack: oscSpec.adsr?.attack,
                decay: oscSpec.adsr?.decay,
                release: oscSpec.adsr?.release,
                sustain: oscSpec.adsr?.sustain,
                peak: oscSpec.adsr?.peak ?? oscSpec.adsrMult
            };
            osc.type = getOscType(oscSpec.type);
            osc.frequency.value = frequency * oscSpec.ratio;
            const detune = Number.isFinite(detuneCents[i]) ? detuneCents[i] : 0;
            osc.detune.value = oscSpec.detune + detune;
            const levelScale = scaledVolume * oscSpec.gain * (1 / unisonVoices);
            scheduleEnvelope(oscGain.gain, startTime, duration, levelScale, false, adsrMults);
            osc.connect(oscGain);
            let destination = oscGain;
            if (stereoSpread > 0) {
                const panner = ctx.createStereoPanner();
                const pan = unisonVoices === 1 ? 0 : (i / (unisonVoices - 1)) * 2 - 1;
                panner.pan.value = pan * stereoSpread;
                oscGain.connect(panner);
                destination = panner;
            }
            destination.connect(amp);
            entries.push({ osc, oscGain, adsrMults, baseGain: oscSpec.gain });
        }
        return entries;
    });

    const noise = createNoise(ctx);
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(preset.noiseLevel ?? 0, startTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, startTime + (preset.noiseDecay ?? 0.05));
    noise.connect(noiseGain);
    noiseGain.connect(amp);

    amp.connect(filter);
    filter.connect(masterGain);
    if (preset.bodyResonance) {
        const bodyFilter = ctx.createBiquadFilter();
        bodyFilter.type = "lowshelf";
        if (Number.isFinite(preset.bodyResonance.lowShelfFreq)) {
            bodyFilter.frequency.value = preset.bodyResonance.lowShelfFreq;
        }
        if (Number.isFinite(preset.bodyResonance.lowShelfGain)) {
            bodyFilter.gain.value = preset.bodyResonance.lowShelfGain;
        }
        const bodyGain = ctx.createGain();
        bodyGain.gain.value = Number.isFinite(preset.bodyResonance.gain) ? preset.bodyResonance.gain : 1;
        filter.connect(bodyFilter);
        bodyFilter.connect(bodyGain);
        bodyGain.connect(masterGain);
    }

    oscillators.forEach(({ osc }) => osc.start(startTime));
    noise.start(startTime);

    if (preset.keyClickLevel) {
        applyNoiseBurst(ctx, amp, startTime, preset.keyClickLevel * scaledVolume, preset.keyClickDecay ?? 0.02, {
            filterType: "highpass",
            centerFreq: 1800,
            q: 0.7
        });
    }
    if (preset.hammerTransient?.level) {
        const centerFreq = Number.isFinite(preset.hammerTransient.centerFreq)
            ? preset.hammerTransient.centerFreq
            : 2500;
        const decay = preset.hammerTransient.decay ?? 0.02;
        const level = preset.hammerTransient.level * (preset.hammerTransient.velocityScale ?? 1) * scaledVolume;
        applyNoiseBurst(ctx, amp, startTime, level, decay, {
            filterType: preset.hammerTransient.shape?.includes("bandpass") ? "bandpass" : "highpass",
            centerFreq,
            q: 1.2
        });
    }

    if (Array.isArray(preset.stringResonators)) {
        preset.stringResonators.forEach((res) => {
            if (!Number.isFinite(res.ratio) || !Number.isFinite(res.gain)) return;
            const osc = ctx.createOscillator();
            const oscGain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.value = frequency * res.ratio;
            oscGain.gain.setValueAtTime(res.gain * scaledVolume, startTime);
            oscGain.gain.exponentialRampToValueAtTime(ENVELOPE_EPS, startTime + Math.max(0.05, res.decay ?? 0.8));
            osc.connect(oscGain);
            oscGain.connect(amp);
            osc.start(startTime);
            osc.stop(startTime + Math.max(0.2, (res.decay ?? 0.8) * 2));
            oscillators.push({
                osc,
                oscGain,
                adsrMults: {},
                baseGain: res.gain
            });
        });
    }

    const stopTime = releaseEnd + 0.1;
    oscillators.forEach(({ osc }) => osc.stop(stopTime));
    noise.stop(startTime + 0.08);

    const voice = {
        gain: amp,
        oscs: oscillators.map(({ osc }) => osc),
        oscGains: oscillators.map(({ oscGain, adsrMults, baseGain }) => ({
            gainNode: oscGain,
            adsrMults,
            baseGain
        })),
        remaining: oscillators.length,
        noteId
    };
    activeVoices.add(voice);
    if (noteId) {
        activeVoicesById.set(noteId, voice);
    }
    voice.oscs.forEach((osc) => {
        osc.addEventListener("ended", () => {
            voice.remaining -= 1;
            if (voice.remaining <= 0) {
                activeVoices.delete(voice);
                if (voice.noteId) {
                    activeVoicesById.delete(voice.noteId);
                }
            }
        });
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
    const ids = [...noteIds];
    const { animate = true, animationDelay, animationHoldMs, preset } = options;
    const noteDuration = options.durationOverride ?? state.noteDuration;
    const volumeScale = 0.9 / Math.max(1, Math.cbrt(ids.length)); // gentler drop per added note
    const gainScale = Math.max(ENVELOPE_EPS, volumeScale);
    const holdMs = animationHoldMs ?? Math.max(120, noteDuration * 1000);

    if (mode === "ascending") {
        ids.sort((a, b) => noteMap.get(a).midi - noteMap.get(b).midi);
        ids.forEach((id, index) => {
            const note = noteMap.get(id);
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

const clearPreviewTimers = () => {
    previewState.timers.forEach((timer) => clearTimeout(timer));
    previewState.timers.clear();
};

const stopPreviewPlayback = () => {
    clearPreviewTimers();
    previewState.playing = false;
    previewState.pedalActive = false;
    if (previewState.pedalOffTimer) {
        clearTimeout(previewState.pedalOffTimer);
        previewState.pedalOffTimer = null;
    }
    if (previewState.pedalOnTimer) {
        clearTimeout(previewState.pedalOnTimer);
        previewState.pedalOnTimer = null;
    }
    pedalIcon.classList.remove("active");

    const pending = Array.from(previewState.pendingNotes);
    if (pending.length) {
        stopNotesById(pending, { releaseRateOverride: ABORT_RELEASE_RATE });
    }
    previewState.pendingNotes.clear();

    const active = Array.from(previewState.activeNotes);
    if (active.length) {
        stopNotesById(active, { releaseRateOverride: ABORT_RELEASE_RATE });
        active.forEach((noteId) => scheduleKeyRelease(noteId, 0));
    }
    previewState.activeNotes.clear();
};

const schedulePreviewEvent = (delayMs, fn) => {
    const timer = setTimeout(() => {
        previewState.timers.delete(timer);
        fn();
    }, delayMs);
    previewState.timers.add(timer);
};

const previewNoteOn = (noteId) => {
    if (!noteId) return;
    const ctx = ensureAudio();
    const durationOverride = state.noteDuration + HOLD_MAX_EXTRA;
    playNotes([noteId], "simultaneous", ctx.currentTime + SCHEDULE_LEAD, {
        animate: false,
        durationOverride,
        preset: previewState.preset
    });
    activateKey(noteId);
    previewState.activeNotes.add(noteId);
};

const previewNoteOff = (noteId) => {
    if (!noteId) return;
    scheduleKeyRelease(noteId, SHORT_PRESS_ANIM_MS);
    if (previewState.pedalActive) {
        previewState.pendingNotes.add(noteId);
    } else {
        stopNotesById([noteId]);
    }
    previewState.activeNotes.delete(noteId);
};

const previewPedalOn = () => {
    const now = performance.now();
    const minUpMs = 160;
    const timeSinceOff = now - previewState.pedalOffAt;
    const activate = () => {
        previewState.pedalActive = true;
        previewState.pedalOnAt = performance.now();
        previewState.pedalOnTimer = null;
        pedalIcon.classList.add("active");
    };
    if (previewState.pedalOnTimer) {
        clearTimeout(previewState.pedalOnTimer);
        previewState.pedalOnTimer = null;
    }
    if (timeSinceOff < minUpMs) {
        previewState.pedalOnTimer = setTimeout(activate, minUpMs - timeSinceOff);
        return;
    }
    activate();
};

const previewPedalOff = () => {
    if (!previewState.pedalActive) return;
    if (previewState.pedalOffTimer) {
        clearTimeout(previewState.pedalOffTimer);
        previewState.pedalOffTimer = null;
    }
    previewState.pedalActive = false;
    previewState.pedalOffAt = performance.now();
    pedalIcon.classList.remove("active");
    const pending = Array.from(previewState.pendingNotes);
    if (pending.length) {
        stopNotesById(pending);
    }
    previewState.pendingNotes.clear();
};

const buildPreviewSequence = () => {
    if (!notes.length) return { events: [], totalTime: 0 };
    const tempo = 108;
    const beat = 60 / tempo;
    const step = beat / 2;
    const minMidi = notes[0].midi;
    const maxMidi = notes[notes.length - 1].midi;
    const baseMidi = clamp(
        state.startMidi + Math.floor(state.keyCount * 0.55),
        minMidi + 4,
        maxMidi - 7
    );

    const melodyOffsets = [0, 2, 4, 7, 9, 7, 5, 2, 0, 2, 4, 7, 5, 4, 2, 0];
    const chordRoots = [0, 7, 9, 5];
    const events = [];

    melodyOffsets.forEach((offset, index) => {
        const t = index * step;
        const noteId = getNoteIdByMidi(baseMidi + offset);
        if (!noteId) return;
        events.push({ t, type: "on", noteId });
        events.push({ t: t + step * 1.9, type: "off", noteId });
    });

    chordRoots.forEach((rootOffset, index) => {
        const chordStart = index * 2 * beat;
        if (index > 0) {
            events.push({ t: Math.max(0, chordStart - 0.04), type: "pedalOff" });
        }
        events.push({ t: chordStart, type: "pedalOn" });
        const chordBase = baseMidi - 12 + rootOffset;
        const chordMidis = [chordBase, chordBase + 4, chordBase + 7];
        chordMidis.forEach((midi) => {
            const noteId = getNoteIdByMidi(midi);
            if (!noteId) return;
            events.push({ t: chordStart, type: "on", noteId });
            events.push({ t: chordStart + beat * 1.9, type: "off", noteId });
        });
    });

    const totalTime = melodyOffsets.length * step + step;
    events.push({ t: totalTime + 0.1, type: "pedalOff" });
    return { events, totalTime };
};

