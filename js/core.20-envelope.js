const DEFAULT_SOUNDFONT_ENVELOPE = {
    attack: 0.016,
    decay: 0.95,
    sustain: 0.75,
    release: 1.2
};
const ADSR_TRIM_STRENGTH = {
    attack: 0.55,
    decay: 0.55,
    release: 0.6,
    length: 0.6
};
const DEFAULT_VELOCITY_CURVE = 1.6;
const ENVELOPE_LIMITS = {
    attack: { min: 0.003, max: 0.18 },
    decay: { min: 0.08, max: 3.2 },
    sustain: { min: 0.04, max: 1 },
    release: { min: 0.08, max: 4.5 },
    holdDuration: { min: 0.06, max: 8 },
    holdMultiplier: { min: 0.12, max: 1.9 }
};
const clampEnvelopeValue = (value, min, max) => Math.min(Math.max(value, min), max);
const normalizeTrimShape = (trim) => ({
    attack: Math.min(Math.max(Number(trim?.attack) || 0, -1), 1),
    decay: Math.min(Math.max(Number(trim?.decay) || 0, -1), 1),
    release: Math.min(Math.max(Number(trim?.release) || 0, -1), 1),
    length: Math.min(Math.max(Number(trim?.length) || 0, -1), 1)
});
const normalizeEnvelopeBase = (base = DEFAULT_SOUNDFONT_ENVELOPE) => ({
    attack: Number.isFinite(base.attack) ? base.attack : DEFAULT_SOUNDFONT_ENVELOPE.attack,
    decay: Number.isFinite(base.decay) ? base.decay : DEFAULT_SOUNDFONT_ENVELOPE.decay,
    sustain: Number.isFinite(base.sustain) ? base.sustain : DEFAULT_SOUNDFONT_ENVELOPE.sustain,
    release: Number.isFinite(base.release) ? base.release : DEFAULT_SOUNDFONT_ENVELOPE.release
});
const resolveEnvelopeMetrics = ({ baseEnvelope, trim, requestedDuration } = {}) => {
    const base = normalizeEnvelopeBase(baseEnvelope);
    const normalizedTrim = normalizeTrimShape(trim);
    const safeRequestedDuration = Number.isFinite(requestedDuration) ? requestedDuration : DEFAULT_NOTE_DURATION;
    const attack = clampEnvelopeValue(
        base.attack * (1 + normalizedTrim.attack * ADSR_TRIM_STRENGTH.attack),
        ENVELOPE_LIMITS.attack.min,
        ENVELOPE_LIMITS.attack.max
    );
    const decay = clampEnvelopeValue(
        base.decay * (1 + normalizedTrim.decay * ADSR_TRIM_STRENGTH.decay),
        ENVELOPE_LIMITS.decay.min,
        ENVELOPE_LIMITS.decay.max
    );
    const sustain = clampEnvelopeValue(
        base.sustain,
        ENVELOPE_LIMITS.sustain.min,
        ENVELOPE_LIMITS.sustain.max
    );
    const release = clampEnvelopeValue(
        base.release * (1 + normalizedTrim.release * ADSR_TRIM_STRENGTH.release),
        ENVELOPE_LIMITS.release.min,
        ENVELOPE_LIMITS.release.max
    );
    const holdMultiplier = clampEnvelopeValue(
        1 + normalizedTrim.length * ADSR_TRIM_STRENGTH.length,
        ENVELOPE_LIMITS.holdMultiplier.min,
        ENVELOPE_LIMITS.holdMultiplier.max
    );
    const holdDuration = clampEnvelopeValue(
        safeRequestedDuration * holdMultiplier,
        ENVELOPE_LIMITS.holdDuration.min,
        ENVELOPE_LIMITS.holdDuration.max
    );
    return { attack, decay, sustain, release, holdMultiplier, holdDuration };
};
App.envelope = {
    DEFAULT_SOUNDFONT_ENVELOPE,
    ADSR_TRIM_STRENGTH,
    DEFAULT_VELOCITY_CURVE,
    ENVELOPE_LIMITS,
    normalizeTrimShape,
    normalizeEnvelopeBase,
    resolveEnvelopeMetrics
};

