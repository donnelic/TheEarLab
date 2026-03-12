const ensureAudio = (options = {}) => {
    const { resume = true } = options;
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)({
            latencyHint: "interactive"
        });
    }
    if (!masterGain || !masterHighpass || !masterCompressor || !masterOutputGain) {
        masterGain = audioContext.createGain();
        masterGain.gain.value = Math.pow(state.volume, 1.8) * 0.5;

        // Remove sub-bass transients ("thump"), then level broad dynamics before output.
        masterHighpass = audioContext.createBiquadFilter();
        masterHighpass.type = "highpass";
        masterHighpass.frequency.value = 30;
        masterHighpass.Q.value = 0.7;

        masterCompressor = audioContext.createDynamicsCompressor();
        masterCompressor.threshold.value = -20;
        masterCompressor.knee.value = 20;
        masterCompressor.ratio.value = 4;
        masterCompressor.attack.value = 0.004;
        masterCompressor.release.value = 0.22;

        masterOutputGain = audioContext.createGain();
        masterOutputGain.gain.value = 0.9;

        masterGain.connect(masterHighpass);
        masterHighpass.connect(masterCompressor);
        masterCompressor.connect(masterOutputGain);
        masterOutputGain.connect(audioContext.destination);
    }
    if (resume && audioContext.state === "suspended") {
        void audioContext.resume().catch(() => {
            /* autoplay gate */
        });
    }
    return audioContext;
};

const getSelectedSoundfont = (requestedId = null) => {
    if (requestedId && PIANO_PRESETS[requestedId]) {
        return PIANO_PRESETS[requestedId];
    }
    if (PIANO_PRESETS[state.pianoTone]) {
        return PIANO_PRESETS[state.pianoTone];
    }
    if (PIANO_PRESETS[DEFAULT_PIANO]) {
        return PIANO_PRESETS[DEFAULT_PIANO];
    }
    const fallbackId = Object.keys(PIANO_PRESETS)[0];
    return fallbackId ? PIANO_PRESETS[fallbackId] : null;
};

const getSourceEntry = (id) => {
    if (!activeVoicesById.has(id)) {
        activeVoicesById.set(id, new Set());
    }
    return activeVoicesById.get(id);
};

const removeVoice = (voice) => {
    if (!voice || voice.disposed) return;
    voice.disposed = true;
    activeVoices.delete(voice);

    if (voice.noteId) {
        const voiceSet = activeVoicesById.get(voice.noteId);
        if (voiceSet) {
            voiceSet.delete(voice);
            if (!voiceSet.size) {
                activeVoicesById.delete(voice.noteId);
            }
        }
    }

    if (voice.stopTimer) {
        clearTimeout(voice.stopTimer);
        voice.stopTimer = null;
    }

    if (voice.type === "sf2") {
        if (voice.onTimer) {
            clearTimeout(voice.onTimer);
            voice.onTimer = null;
        }
        if (voice.offTimer) {
            clearTimeout(voice.offTimer);
            voice.offTimer = null;
        }
        return;
    }

    try {
        voice.source.disconnect();
    } catch (error) {
        /* noop */
    }
    try {
        voice.gainNode.disconnect();
    } catch (error) {
        /* noop */
    }
};

const releaseVoice = (voice, releaseSeconds = null) => {
    if (!voice || voice.releasing) return;
    const ctx = ensureAudio();
    const now = ctx.currentTime;
    const releaseTime = Math.max(0.03, releaseSeconds ?? voice.releaseSeconds ?? 0.25);

    if (voice.type === "sf2") {
        voice.releasing = true;
        if (voice.onTimer) {
            clearTimeout(voice.onTimer);
            voice.onTimer = null;
        }
        if (voice.offTimer) {
            clearTimeout(voice.offTimer);
            voice.offTimer = null;
        }
        if (voice.started) {
            voice.synth.midiNoteOff(voice.channel, voice.key);
            voice.started = false;
        }
        const ttl = Math.max(40, Math.round(releaseTime * 1000) + 80);
        voice.stopTimer = setTimeout(() => {
            removeVoice(voice);
        }, ttl);
        return;
    }

    voice.releasing = true;
    voice.gainNode.gain.cancelScheduledValues(now);
    const currentValue =
        typeof voice.gainNode.gain.getValueAtTime === "function"
            ? voice.gainNode.gain.getValueAtTime(now)
            : voice.gainNode.gain.value;
    voice.gainNode.gain.setValueAtTime(Math.max(MIN_ENVELOPE_GAIN, currentValue), now);
    voice.gainNode.gain.setTargetAtTime(MIN_ENVELOPE_GAIN, now, releaseTime / 3);

    const stopAt = now + releaseTime + 0.05;
    try {
        voice.source.stop(stopAt);
    } catch (error) {
        /* noop */
    }

    const ttl = Math.max(40, Math.round((stopAt - now) * 1000) + 80);
    voice.stopTimer = setTimeout(() => {
        removeVoice(voice);
    }, ttl);
};

const releaseVoices = (voices, releaseRateOverride = null) => {
    const overrideSeconds = releaseRateOverride === null ? null : releaseRateToSeconds(releaseRateOverride);
    voices.forEach((voice) => {
        releaseVoice(voice, overrideSeconds);
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

    activeKeyTimers.forEach((timer) => {
        clearTimeout(timer);
    });
    activeKeyTimers.clear();
    keyTimersByNote.clear();

    if (excluded.size) {
        const preserved = new Map();
        excluded.forEach((id) => {
            if (keyActiveCounts.has(id)) {
                preserved.set(id, keyActiveCounts.get(id));
            }
        });
        keyActiveCounts.clear();
        preserved.forEach((value, id) => keyActiveCounts.set(id, value));
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
    if (!noteIds?.length || !activeVoices.size) return;
    const include = new Set(noteIds);
    const voices = [];

    include.forEach((noteId) => {
        const set = activeVoicesById.get(noteId);
        if (!set) return;
        set.forEach((voice) => voices.push(voice));
    });

    releaseVoices(voices, options.releaseRateOverride ?? null);
};

const abortPlayback = (excludeIds = []) => {
    stopAllNotes({ releaseRateOverride: ABORT_RELEASE_RATE, excludeIds });
};

const getSoundfontEnvelope = (soundfont, requestedDuration) => {
    const base = soundfont.baseAdsr ?? AUDIO_DEFAULT_SOUNDFONT_ENVELOPE;
    const trim = state.adsrTrim ?? DEFAULTS.adsrTrim;
    if (typeof AUDIO_ENVELOPE_API.resolveEnvelopeMetrics === "function") {
        return AUDIO_ENVELOPE_API.resolveEnvelopeMetrics({
            baseEnvelope: base,
            trim,
            requestedDuration
        });
    }
    return {
        attack: clampValue(base.attack, 0.003, 0.18),
        decay: clampValue(base.decay, 0.08, 3.2),
        sustain: clampValue(base.sustain, 0.04, 1),
        release: clampValue(base.release, 0.08, 4.5),
        holdDuration: clampValue(requestedDuration, 0.06, 8)
    };
};

const scheduleSampleEnvelope = (gainNode, startTime, peakLevel, envelope) => {
    const attackEnd = startTime + envelope.attack;
    const decayEnd = attackEnd + envelope.decay;
    const holdEnd = Math.max(startTime + envelope.holdDuration, decayEnd);
    const releaseEnd = holdEnd + envelope.release;

    gainNode.gain.cancelScheduledValues(startTime);
    gainNode.gain.setValueAtTime(MIN_ENVELOPE_GAIN, startTime);
    gainNode.gain.linearRampToValueAtTime(Math.max(MIN_ENVELOPE_GAIN, peakLevel), attackEnd);
    gainNode.gain.exponentialRampToValueAtTime(
        Math.max(MIN_ENVELOPE_GAIN, peakLevel * envelope.sustain),
        decayEnd
    );
    gainNode.gain.setValueAtTime(Math.max(MIN_ENVELOPE_GAIN, peakLevel * envelope.sustain), holdEnd);
    gainNode.gain.exponentialRampToValueAtTime(MIN_ENVELOPE_GAIN, releaseEnd);

    return releaseEnd;
};

const createGeneratedSampleBuffer = (ctx, midi, generatedSpec) => {
    const sampleRate = ctx.sampleRate;
    const duration = 3.2;
    const length = Math.floor(sampleRate * duration);
    const buffer = ctx.createBuffer(1, length, sampleRate);
    const channel = buffer.getChannelData(0);
    const frequency = 440 * Math.pow(2, (midi - 69) / 12);
    const harmonics = Array.isArray(generatedSpec?.harmonics) && generatedSpec.harmonics.length
        ? generatedSpec.harmonics
        : [{ ratio: 1, gain: 1, decay: 2 }];
    const noiseAmount = Number.isFinite(generatedSpec?.noise) ? generatedSpec.noise : 0.01;

    for (let i = 0; i < length; i += 1) {
        const t = i / sampleRate;
        let value = 0;
        harmonics.forEach((harmonic) => {
            const ratio = Number.isFinite(harmonic.ratio) ? harmonic.ratio : 1;
            const gain = Number.isFinite(harmonic.gain) ? harmonic.gain : 0;
            const decay = Number.isFinite(harmonic.decay) ? harmonic.decay : 1.5;
            const env = Math.exp(-t / Math.max(0.08, decay));
            value += Math.sin(2 * Math.PI * frequency * ratio * t) * gain * env;
        });

        value += (Math.random() * 2 - 1) * noiseAmount * Math.exp(-t / 0.07);
        channel[i] = value;
    }

    let maxAmp = 0;
    for (let i = 0; i < length; i += 1) {
        maxAmp = Math.max(maxAmp, Math.abs(channel[i]));
    }

    const norm = maxAmp > 0 ? 1 / maxAmp : 1;
    const fadeSamples = Math.floor(sampleRate * 0.02);
    for (let i = 0; i < length; i += 1) {
        channel[i] *= norm * 0.7;
        if (i >= length - fadeSamples) {
            const fade = (length - i) / fadeSamples;
            channel[i] *= Math.max(0, fade);
        }
    }

    return buffer;
};

const buildGeneratedSampleSet = (ctx, soundfont) => {
    const generated = soundfont.generated ?? {};
    const entries = [];
    for (let midi = 33; midi <= 99; midi += 3) {
        entries.push({
            midi,
            buffer: createGeneratedSampleBuffer(ctx, midi, generated)
        });
    }
    return entries;
};

const decodeAudioBuffer = async (ctx, url) => {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
        throw new Error(`Failed to fetch sample: ${url}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return await ctx.decodeAudioData(arrayBuffer);
};

const buildExternalSampleSet = async (ctx, soundfont) => {
    const sampleEntries = normalizeSampleEntries(soundfont.samples ?? soundfont.sampleMap, "");
    if (!sampleEntries.length) {
        return [];
    }

    const loaded = await Promise.allSettled(
        sampleEntries.map(async (entry) => {
            const buffer = await decodeAudioBuffer(ctx, entry.url);
            return {
                midi: entry.midi,
                buffer,
                url: entry.url
            };
        })
    );

    return loaded
        .filter((item) => item.status === "fulfilled")
        .map((item) => item.value)
        .sort((a, b) => a.midi - b.midi);
};

const applySf2TrimGenerators = (synth) => {
    const trim = state.adsrTrim ?? DEFAULTS.adsrTrim;
    const attackOffset = Math.round(trim.attack * SF2_ATTACK_TIMECENTS_TRIM);
    const decayOffset = Math.round(trim.decay * SF2_DECAY_TIMECENTS_TRIM);
    const releaseOffset = Math.round(trim.release * SF2_RELEASE_TIMECENTS_TRIM);
    synth.setGenerator(SF2_CHANNEL, SF2_ATTACK_GEN, attackOffset);
    synth.setGenerator(SF2_CHANNEL, SF2_DECAY_GEN, decayOffset);
    synth.setGenerator(SF2_CHANNEL, SF2_RELEASE_GEN, releaseOffset);
};

const getSf2NoteDuration = (requestedDuration) => {
    if (typeof AUDIO_ENVELOPE_API.resolveEnvelopeMetrics === "function") {
        return AUDIO_ENVELOPE_API.resolveEnvelopeMetrics({
            trim: state.adsrTrim ?? DEFAULTS.adsrTrim,
            requestedDuration
        }).holdDuration;
    }
    const trim = state.adsrTrim ?? DEFAULTS.adsrTrim;
    const lengthMul = 1 + trim.length * AUDIO_ADSR_TRIM_STRENGTH.length;
    return clampValue(requestedDuration * lengthMul, 0.06, 8);
};

const ensureSf2PresetReady = async (soundfont) => {
    const sf2Config = soundfont.sf2;
    if (!sf2Config?.path) return null;
    const pack = await loadSf2Pack(sf2Config.path);
    return {
        type: "sf2",
        id: soundfont.id,
        ready: true,
        sf2Path: sf2Config.path,
        sfontId: pack.sfontId,
        bank: Number.isFinite(sf2Config.bank) ? sf2Config.bank : 0,
        program: Number.isFinite(sf2Config.program) ? sf2Config.program : 0,
        synth: sf2Runtime.synth
    };
};

const ensureSoundfontReady = async (soundfontId = null) => {
    const soundfont = getSelectedSoundfont(soundfontId);
    if (!soundfont) return null;
    const id = soundfont.id;

    if (soundfont.engine === "sf2" && soundfont.sf2?.path) {
        const existingSf2 = soundfontCache.get(id);
        if (existingSf2?.ready && existingSf2.type === "sf2") {
            return existingSf2;
        }
        if (existingSf2?.loadingPromise) {
            return existingSf2.loadingPromise;
        }
        const sf2Entry = existingSf2 ?? {
            id,
            type: "sf2",
            ready: false,
            loadingPromise: null,
            error: null
        };
        sf2Entry.loadingPromise = ensureSf2PresetReady(soundfont)
            .then((resolved) => {
                if (!resolved) {
                    throw new Error(`Failed to prepare SF2 preset '${id}'.`);
                }
                Object.assign(sf2Entry, resolved, { ready: true, error: null });
                return sf2Entry;
            })
            .catch((error) => {
                sf2Entry.ready = false;
                sf2Entry.error = error;
                console.warn(error);
                return null;
            })
            .finally(() => {
                sf2Entry.loadingPromise = null;
            });
        soundfontCache.set(id, sf2Entry);
        return sf2Entry.loadingPromise;
    }

    const existing = soundfontCache.get(id);
    if (existing?.ready) {
        return existing;
    }
    if (existing?.loadingPromise) {
        return existing.loadingPromise;
    }

    const entry = existing ?? { id, ready: false, loadingPromise: null, samples: [], error: null };

    entry.loadingPromise = (async () => {
        const ctx = ensureAudio();
        const samples = soundfont.generated
            ? buildGeneratedSampleSet(ctx, soundfont)
            : await buildExternalSampleSet(ctx, soundfont);

        if (!samples.length) {
            throw new Error(`No playable samples for soundfont '${id}'.`);
        }

        entry.samples = samples;
        entry.ready = true;
        entry.error = null;
        return entry;
    })().catch((error) => {
        entry.ready = false;
        entry.error = error;
        console.warn(error);
        return null;
    }).finally(() => {
        entry.loadingPromise = null;
    });

    soundfontCache.set(id, entry);
    return entry.loadingPromise;
};

