var App = window.App || (window.App = {});
App.settings = App.settings || {};

const SETTINGS_MODE_POLICY = App.modePolicy || {};
const SETTINGS_ENVELOPE_API = App.envelope || {};
const SETTINGS_UI_COPY = App.uiCopy || {};
const BROWSER_COPY = SETTINGS_UI_COPY.browsers || {};
const ENVELOPE_DEFAULTS = SETTINGS_ENVELOPE_API.DEFAULT_SOUNDFONT_ENVELOPE || { attack: 0.016, decay: 0.95, sustain: 0.75, release: 1.2 };
const PROFILE_EPSILON = 0.0001;

const applySettingsStatePatch = (patch, mutation = "settings/patch") => {
    if (typeof App.features?.settings?.applySettingsPatch === "function") {
        App.features.settings.applySettingsPatch(patch, {
            mutation,
            source: "settings.js"
        });
        return;
    }
    Object.assign(state, patch || {});
};

const GM_FAMILY_RANGES = [
    { name: "Piano", min: 0, max: 7 },
    { name: "Chromatic Percussion", min: 8, max: 15 },
    { name: "Organ", min: 16, max: 23 },
    { name: "Guitar", min: 24, max: 31 },
    { name: "Bass", min: 32, max: 39 },
    { name: "Strings", min: 40, max: 47 },
    { name: "Ensemble", min: 48, max: 55 },
    { name: "Brass", min: 56, max: 63 },
    { name: "Reed", min: 64, max: 71 },
    { name: "Pipe", min: 72, max: 79 },
    { name: "Synth Lead", min: 80, max: 87 },
    { name: "Synth Pad", min: 88, max: 95 },
    { name: "Synth Effects", min: 96, max: 103 },
    { name: "Ethnic", min: 104, max: 111 },
    { name: "Percussive", min: 112, max: 119 },
    { name: "Sound Effects", min: 120, max: 127 }
];

const BUILTIN_RESPONSE_PROFILES = [
    {
        id: "instrument-default",
        label: "Instrument Recommended",
        description: "Uses this instrument's native articulation defaults.",
        trim: { attack: 0, decay: 0, release: 0, length: 0 },
        builtin: true,
        recommended: true
    },
    {
        id: "tight-short",
        label: "Tight / Short",
        description: "Fast response and shorter tails.",
        trim: { attack: -0.22, decay: -0.28, release: -0.35, length: -0.36 },
        builtin: true
    },
    {
        id: "smooth-legato",
        label: "Smooth / Legato",
        description: "Softer onset and longer continuity.",
        trim: { attack: 0.24, decay: 0.2, release: 0.28, length: 0.3 },
        builtin: true
    },
    {
        id: "bright-pluck",
        label: "Bright / Pluck",
        description: "Sharper attack and tighter body.",
        trim: { attack: -0.34, decay: -0.18, release: -0.08, length: -0.2 },
        builtin: true
    }
];

const clampNoteCount = (value) => {
    const max = getNoteCountMax();
    let next = Number.parseInt(value, 10);
    if (!Number.isFinite(next)) next = state.noteCount;
    next = Math.min(Math.max(next, 1), max);
    return next;
};

const clampTrim = (value) => Math.min(Math.max(Number(value) || 0, -1), 1);
const cloneTrim = (trim) => ({
    attack: clampTrim(trim?.attack),
    decay: clampTrim(trim?.decay),
    release: clampTrim(trim?.release),
    length: clampTrim(trim?.length)
});
const trimsEqual = (a, b) =>
    Math.abs((a?.attack ?? 0) - (b?.attack ?? 0)) <= PROFILE_EPSILON &&
    Math.abs((a?.decay ?? 0) - (b?.decay ?? 0)) <= PROFILE_EPSILON &&
    Math.abs((a?.release ?? 0) - (b?.release ?? 0)) <= PROFILE_EPSILON &&
    Math.abs((a?.length ?? 0) - (b?.length ?? 0)) <= PROFILE_EPSILON;

const clampMetricValue = (value, min, max) => Math.min(Math.max(value, min), max);
const trimToSliderValue = (value) => String(Math.round(clampTrim(value) * 100));
const sliderToTrim = (raw, fallback = 0) => {
    const parsed = Number.parseInt(raw, 10);
    const value = Number.isFinite(parsed) ? parsed : Math.round(clampTrim(fallback) * 100);
    return clampTrim(value / 100);
};
const formatSeconds = (value) => `${value >= 1 ? value.toFixed(2) : value.toFixed(3)}s`;
const formatHold = (seconds, multiplier) => `${formatSeconds(seconds)} (${multiplier.toFixed(2)}x)`;
const formatProgramId = (program) => `P${String(program).padStart(3, "0")}`;
const formatBankId = (bank) => `B${String(bank).padStart(3, "0")}`;
const slugifyProfile = (value) =>
    String(value ?? "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "profile";

const getSf2PresetGroupName = (entry) => {
    if (entry.bank !== 0) {
        return `${entry.fileLabel} - Bank ${entry.bank}`;
    }
    const family = GM_FAMILY_RANGES.find((range) => entry.program >= range.min && entry.program <= range.max);
    return `${entry.fileLabel} - ${family ? family.name : "GM"}`;
};

const getTonePreset = (toneId = state.pianoTone) =>
    PIANO_PRESETS[toneId] ?? PIANO_PRESETS[DEFAULT_PIANO] ?? Object.values(PIANO_PRESETS)[0] ?? null;

const getBaseEnvelope = (toneId = state.pianoTone) => {
    const preset = getTonePreset(toneId);
    if (typeof SETTINGS_ENVELOPE_API.normalizeEnvelopeBase === "function") {
        return SETTINGS_ENVELOPE_API.normalizeEnvelopeBase(preset?.baseAdsr ?? ENVELOPE_DEFAULTS);
    }
    const base = preset?.baseAdsr ?? ENVELOPE_DEFAULTS;
    return {
        attack: Number.isFinite(base.attack) ? base.attack : ENVELOPE_DEFAULTS.attack,
        decay: Number.isFinite(base.decay) ? base.decay : ENVELOPE_DEFAULTS.decay,
        sustain: Number.isFinite(base.sustain) ? base.sustain : ENVELOPE_DEFAULTS.sustain,
        release: Number.isFinite(base.release) ? base.release : ENVELOPE_DEFAULTS.release
    };
};

const resolveSettingsEnvelopeMetrics = (trim, toneId = state.pianoTone, requestedDuration = state.noteDuration) => {
    const normalized = cloneTrim(trim);
    const base = getBaseEnvelope(toneId);
    if (typeof SETTINGS_ENVELOPE_API.resolveEnvelopeMetrics === "function") {
        return SETTINGS_ENVELOPE_API.resolveEnvelopeMetrics({
            baseEnvelope: base,
            trim: normalized,
            requestedDuration
        });
    }
    const attack = clampMetricValue(base.attack, 0.003, 0.18);
    const decay = clampMetricValue(base.decay, 0.08, 3.2);
    const release = clampMetricValue(base.release, 0.08, 4.5);
    const holdMultiplier = 1;
    const holdDuration = clampMetricValue(requestedDuration, 0.06, 8);
    return { attack, decay, release, holdDuration, holdMultiplier };
};

let sf2PresetEntries = [];
const sf2PresetLookup = new Map();
let selectedInstrumentPresetKey = "";

let profileEntries = [];
const profileLookup = new Map();
let selectedProfileKey = "";

const sanitizeCustomProfile = (id, raw) => {
    if (!raw || typeof raw !== "object") return null;
    const normalizedId = String(raw.id ?? id ?? "").trim();
    if (!normalizedId) return null;
    const label = String(raw.label ?? normalizedId).trim();
    if (!label) return null;
    return {
        id: normalizedId,
        key: normalizedId,
        label,
        description: String(raw.description ?? "Custom articulation profile."),
        trim: cloneTrim(raw.trim),
        custom: true,
        builtin: false
    };
};

const normalizeCustomProfiles = () => {
    const next = {};
    if (state.customResponseProfiles && typeof state.customResponseProfiles === "object") {
        Object.entries(state.customResponseProfiles).forEach(([id, raw]) => {
            const profile = sanitizeCustomProfile(id, raw);
            if (!profile) return;
            next[profile.id] = {
                id: profile.id,
                label: profile.label,
                description: profile.description,
                trim: cloneTrim(profile.trim)
            };
        });
    }
    state.customResponseProfiles = next;
};

const getAllProfiles = () => {
    const builtins = BUILTIN_RESPONSE_PROFILES.map((entry) => ({
        ...entry,
        key: entry.id,
        trim: cloneTrim(entry.trim),
        custom: false
    }));
    const custom = Object.values(state.customResponseProfiles ?? {})
        .map((entry) => sanitizeCustomProfile(entry.id, entry))
        .filter(Boolean)
        .sort((a, b) => a.label.localeCompare(b.label));
    return [...builtins, ...custom];
};

const getProfileById = (id) => {
    const target = String(id ?? "").trim();
    if (!target) return null;
    return getAllProfiles().find((profile) => profile.id === target) ?? null;
};

const setGhostMarker = (ghostEl, trimValue) => {
    if (!ghostEl || !Number.isFinite(trimValue)) return;
    const position = ((clampTrim(trimValue) + 1) / 2) * 100;
    ghostEl.style.setProperty("--ghost-pos", `${position}%`);
    ghostEl.classList.add("visible");
};

const clearGhostMarker = (ghostEl) => {
    if (!ghostEl) return;
    ghostEl.classList.remove("visible");
};

const updateGhostMarkers = () => {
    const selected = profileLookup.get(selectedProfileKey);
    if (!selected) {
        clearGhostMarker(attackGhost);
        clearGhostMarker(decayGhost);
        clearGhostMarker(releaseGhost);
        clearGhostMarker(sustainGhost);
        return;
    }
    setGhostMarker(attackGhost, selected.trim.attack);
    setGhostMarker(decayGhost, selected.trim.decay);
    setGhostMarker(releaseGhost, selected.trim.release);
    setGhostMarker(sustainGhost, selected.trim.length);
};

const syncDirtyFromApplied = () => {
    const applied = getProfileById(state.responseProfileId);
    if (!applied) {
        state.responseProfileDirty = true;
        return;
    }
    state.responseProfileDirty = !trimsEqual(state.adsrTrim, applied.trim);
};

const applyAdsrTrimUi = () => {
    attackSlider.value = trimToSliderValue(state.adsrTrim.attack);
    decaySlider.value = trimToSliderValue(state.adsrTrim.decay);
    releaseSlider.value = trimToSliderValue(state.adsrTrim.release);
    sustainSlider.value = trimToSliderValue(state.adsrTrim.length);

    const metrics = resolveSettingsEnvelopeMetrics(state.adsrTrim);
    const attackText = formatSeconds(metrics.attack);
    const decayText = formatSeconds(metrics.decay);
    const releaseText = formatSeconds(metrics.release);
    const holdText = formatHold(metrics.holdDuration, metrics.holdMultiplier);

    attackValue.textContent = attackText;
    decayValue.textContent = decayText;
    releaseValue.textContent = releaseText;
    sustainValue.textContent = holdText;

    if (attackLabelValue) attackLabelValue.textContent = attackText;
    if (decayLabelValue) decayLabelValue.textContent = decayText;
    if (releaseLabelValue) releaseLabelValue.textContent = releaseText;
    if (sustainLabelValue) sustainLabelValue.textContent = holdText;

    updateGhostMarkers();
};

const clearPendingCriticalRestart = () => {
    if (criticalChangeTimer) {
        clearTimeout(criticalChangeTimer);
        criticalChangeTimer = null;
    }
    pendingCriticalRestart = false;
};

const updateInstrumentPresetMeta = () => {
    if (!instrumentPresetMeta) return;
    const selected = sf2PresetLookup.get(selectedInstrumentPresetKey);
    if (!selected) {
        instrumentPresetMeta.classList.remove("pending");
        instrumentPresetMeta.textContent = BROWSER_COPY.instrumentMetaIdle || "Select a preset to preview details. Apply to switch instrument.";
        return;
    }

    const active = getTonePreset(state.pianoTone)?.sf2;
    const isApplied = Boolean(
        active &&
        active.path === selected.sf2Path &&
        active.bank === selected.bank &&
        active.program === selected.program
    );

    const envelope = typeof App.audio?.getBaseAdsrForProgram === "function"
        ? App.audio.getBaseAdsrForProgram(selected.program)
        : ENVELOPE_DEFAULTS;
    const hold = formatHold(state.noteDuration, 1);
    const status = isApplied
        ? (BROWSER_COPY.appliedNow || "Applied now.")
        : (BROWSER_COPY.selectedPending || "Selected only, not applied yet.");

    instrumentPresetMeta.classList.toggle("pending", !isApplied);
    instrumentPresetMeta.textContent =
        `${status} ${selected.name} | bank ${selected.bank}, program ${selected.program} | `
        + `Recommended A ${formatSeconds(envelope.attack)}, D ${formatSeconds(envelope.decay)}, `
        + `R ${formatSeconds(envelope.release)}, Hold ${hold}`;
};

const renderInstrumentPresetBrowser = () => {
    if (!instrumentPresetList) return;
    const query = (instrumentPresetSearch?.value ?? "").trim().toLowerCase();
    instrumentPresetList.innerHTML = "";

    const filtered = sf2PresetEntries.filter((entry) => {
        if (!query) return true;
        const haystack = `${entry.name} ${entry.bank} ${entry.program} ${entry.fileLabel}`.toLowerCase();
        return haystack.includes(query);
    });

    if (filtered.length && !filtered.some((entry) => entry.key === selectedInstrumentPresetKey)) {
        selectedInstrumentPresetKey = filtered[0].key;
    }
    if (!filtered.length) {
        selectedInstrumentPresetKey = "";
    }

    const grouped = new Map();
    filtered.forEach((entry) => {
        const groupName = getSf2PresetGroupName(entry);
        if (!grouped.has(groupName)) grouped.set(groupName, []);
        grouped.get(groupName).push(entry);
    });

    const fragment = document.createDocumentFragment();
    if (!filtered.length) {
        const empty = document.createElement("div");
        empty.className = "sf2-empty";
        empty.textContent = BROWSER_COPY.noInstrumentPresets || "No presets match this filter.";
        fragment.appendChild(empty);
    } else {
        grouped.forEach((entries, groupName) => {
            const group = document.createElement("section");
            group.className = "sf2-group";
            const title = document.createElement("div");
            title.className = "sf2-group-title";
            title.textContent = groupName;
            group.appendChild(title);

            entries.forEach((entry) => {
                const row = document.createElement("div");
                row.className = "sf2-row";
                row.dataset.key = entry.key;
                row.setAttribute("role", "option");
                row.tabIndex = 0;
                row.setAttribute("aria-selected", entry.key === selectedInstrumentPresetKey ? "true" : "false");
                if (entry.key === selectedInstrumentPresetKey) row.classList.add("active");
                row.innerHTML = `
                    <span class="sf2-row-name">${entry.name}</span>
                    <span class="sf2-row-program">${formatProgramId(entry.program)}</span>
                    <span class="sf2-row-bank">${formatBankId(entry.bank)}</span>
                `;
                group.appendChild(row);
            });
            fragment.appendChild(group);
        });
    }

    instrumentPresetList.appendChild(fragment);
    updateInstrumentPresetMeta();
};

const refreshInstrumentPresetBrowser = async () => {
    if (!instrumentPresetList) return;
    const entries = await getSf2PresetBrowserEntries();
    sf2PresetEntries = entries;
    sf2PresetLookup.clear();
    entries.forEach((entry) => sf2PresetLookup.set(entry.key, entry));
    if (selectedInstrumentPresetKey && !sf2PresetLookup.has(selectedInstrumentPresetKey)) {
        selectedInstrumentPresetKey = "";
    }
    renderInstrumentPresetBrowser();
};

const setInstrumentPresetSelection = (key) => {
    if (!key || !sf2PresetLookup.has(key)) return;
    selectedInstrumentPresetKey = key;
    renderInstrumentPresetBrowser();
};

const updateProfileMeta = () => {
    if (!profileMeta) return;
    const selected = profileLookup.get(selectedProfileKey);
    if (!selected) {
        profileMeta.classList.remove("pending");
        profileMeta.textContent = BROWSER_COPY.profileMetaIdle || "Select a profile to preview. Apply to use it.";
        if (profileApply) profileApply.disabled = true;
        return;
    }

    const isApplied = selected.id === state.responseProfileId && !state.responseProfileDirty;
    const metrics = resolveSettingsEnvelopeMetrics(selected.trim);
    const status = isApplied
        ? (BROWSER_COPY.applied || "Applied.")
        : (BROWSER_COPY.selectedPending || "Selected only, not applied yet.");
    const source = selected.custom ? "Custom" : "Built-in";
    const dirty = state.responseProfileDirty ? " Manual slider edits pending save/discard." : "";

    profileMeta.classList.toggle("pending", !isApplied || state.responseProfileDirty);
    profileMeta.textContent =
        `${status} ${source} profile "${selected.label}". `
        + `A ${formatSeconds(metrics.attack)}, D ${formatSeconds(metrics.decay)}, `
        + `R ${formatSeconds(metrics.release)}, Hold ${formatHold(metrics.holdDuration, metrics.holdMultiplier)}.`
        + dirty;

    if (profileApply) profileApply.disabled = isApplied;
    if (profileSave) profileSave.textContent = state.responseProfileDirty ? "Save Manual Profile" : "Save Current Profile";
};

const renderResponseProfileBrowser = () => {
    if (!profileList) return;
    const query = (profileSearch?.value ?? "").trim().toLowerCase();
    profileList.innerHTML = "";

    const filtered = profileEntries.filter((entry) => {
        if (!query) return true;
        const haystack = `${entry.label} ${entry.description ?? ""}`.toLowerCase();
        return haystack.includes(query);
    });

    if (filtered.length && !filtered.some((entry) => entry.key === selectedProfileKey)) {
        selectedProfileKey = filtered[0].key;
    }
    if (!filtered.length) {
        selectedProfileKey = "";
    }

    const fragment = document.createDocumentFragment();
    if (!filtered.length) {
        const empty = document.createElement("div");
        empty.className = "sf2-empty";
        empty.textContent = BROWSER_COPY.noProfiles || "No profiles match this filter.";
        fragment.appendChild(empty);
    } else {
        filtered.forEach((entry) => {
            const row = document.createElement("div");
            row.className = "profile-row";
            if (entry.id === state.responseProfileId && !state.responseProfileDirty) row.classList.add("applied");
            if (entry.key === selectedProfileKey) row.classList.add("active");
            row.dataset.key = entry.key;
            row.tabIndex = 0;
            row.setAttribute("role", "option");
            row.setAttribute("aria-selected", entry.key === selectedProfileKey ? "true" : "false");
            const badge = entry.recommended ? "Recommended" : (entry.custom ? "Custom" : "Built-in");
            row.innerHTML = `
                <span class="profile-row-name">${entry.label}</span>
                <span class="profile-row-kind">${badge}</span>
            `;
            fragment.appendChild(row);
        });
    }

    profileList.appendChild(fragment);
    updateGhostMarkers();
    updateProfileMeta();
};

const refreshResponseProfileBrowser = () => {
    normalizeCustomProfiles();
    profileEntries = getAllProfiles();
    profileLookup.clear();
    profileEntries.forEach((entry) => profileLookup.set(entry.key, entry));

    if (!profileLookup.has(state.responseProfileId)) {
        state.responseProfileId = DEFAULTS.responseProfileId;
    }
    if (!selectedProfileKey || !profileLookup.has(selectedProfileKey)) {
        selectedProfileKey = state.responseProfileId;
    }

    renderResponseProfileBrowser();
};

const setResponseProfileSelection = (key) => {
    if (!key || !profileLookup.has(key)) return;
    selectedProfileKey = key;
    renderResponseProfileBrowser();
};

const applyResponseProfileById = (id, options = {}) => {
    const profile = profileLookup.get(id) ?? getProfileById(id);
    if (!profile) return false;
    state.adsrTrim = cloneTrim(profile.trim);
    state.responseProfileId = profile.id;
    state.responseProfileDirty = false;
    selectedProfileKey = profile.id;
    applyAdsrTrimUi();
    renderResponseProfileBrowser();
    if (options.save !== false) saveSettings();
    return true;
};

const applyResponseProfileSelection = () => {
    if (!selectedProfileKey) return false;
    return applyResponseProfileById(selectedProfileKey);
};

const saveCurrentResponseProfile = (inputLabel = "") => {
    const label = String(inputLabel ?? "").trim() || `${getTonePreset(state.pianoTone)?.label ?? "Custom"} Profile`;
    const baseId = `custom-${slugifyProfile(label)}`;
    let id = baseId;
    let suffix = 2;
    while (profileLookup.has(id) || state.customResponseProfiles[id]) {
        id = `${baseId}-${suffix}`;
        suffix += 1;
    }
    state.customResponseProfiles[id] = {
        id,
        label,
        description: "Saved custom articulation profile.",
        trim: cloneTrim(state.adsrTrim)
    };
    state.responseProfileId = id;
    state.responseProfileDirty = false;
    refreshResponseProfileBrowser();
    selectedProfileKey = id;
    renderResponseProfileBrowser();
    saveSettings();
    return id;
};

const dialogState = {
    resolve: null,
    allowEmpty: false
};

