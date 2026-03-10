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

const syncModalOpenClass = () => {
    const anyOpen = Boolean(
        (gameSettingsModal && !gameSettingsModal.hidden)
        || (appDialog && !appDialog.hidden)
        || (chordTutorialModal && !chordTutorialModal.hidden)
    );
    document.body.classList.toggle("modal-open", anyOpen);
};

const setAppDialogOpenState = (isOpen) => {
    if (!appDialog) return false;
    appDialog.hidden = !isOpen;
    appDialog.setAttribute("aria-hidden", isOpen ? "false" : "true");
    syncModalOpenClass();
    return true;
};

const openAppDialog = (options = {}) => {
    if (!appDialog) {
        return Promise.resolve({ confirmed: false, value: "" });
    }
    if (dialogState.resolve) {
        closeAppDialog({ confirmed: false, value: "" });
    }
    const config = {
        title: options.title || "Dialog",
        body: options.body || "",
        confirmLabel: options.confirmLabel || "Confirm",
        cancelLabel: options.cancelLabel || "Cancel",
        inputLabel: options.inputLabel || "Name",
        inputPlaceholder: options.inputPlaceholder || "",
        inputValue: options.inputValue || "",
        inputVisible: Boolean(options.inputVisible),
        allowEmpty: Boolean(options.allowEmpty)
    };

    if (appDialogTitle) appDialogTitle.textContent = config.title;
    if (appDialogBody) appDialogBody.textContent = config.body;
    if (appDialogConfirm) appDialogConfirm.textContent = config.confirmLabel;
    if (appDialogCancel) appDialogCancel.textContent = config.cancelLabel;
    if (appDialogInputLabel) appDialogInputLabel.textContent = config.inputLabel;

    const inputRow = appDialogInput?.closest(".app-dialog-input-row") ?? null;
    if (inputRow) {
        inputRow.hidden = !config.inputVisible;
    }
    if (appDialogInput) {
        appDialogInput.value = config.inputValue;
        appDialogInput.placeholder = config.inputPlaceholder;
    }

    dialogState.allowEmpty = config.allowEmpty;
    setAppDialogOpenState(true);

    if (config.inputVisible && appDialogInput) {
        appDialogInput.focus({ preventScroll: true });
        appDialogInput.select();
    } else if (appDialogConfirm) {
        appDialogConfirm.focus({ preventScroll: true });
    }

    return new Promise((resolve) => {
        dialogState.resolve = resolve;
    });
};

const closeAppDialog = (result = { confirmed: false, value: "" }) => {
    if (!dialogState.resolve) return;
    const resolve = dialogState.resolve;
    dialogState.resolve = null;
    setAppDialogOpenState(false);
    resolve(result);
};

const confirmAppDialog = () => {
    const value = appDialogInput?.value ?? "";
    if (!dialogState.allowEmpty && appDialogInput && appDialogInput.offsetParent !== null && !value.trim()) {
        appDialogInput.focus({ preventScroll: true });
        return;
    }
    closeAppDialog({ confirmed: true, value });
};

const cancelAppDialog = () => {
    const value = appDialogInput?.value ?? "";
    closeAppDialog({ confirmed: false, value });
};

if (appDialogConfirm) {
    appDialogConfirm.addEventListener("click", (event) => {
        event.preventDefault();
        confirmAppDialog();
    });
}
if (appDialogCancel) {
    appDialogCancel.addEventListener("click", (event) => {
        event.preventDefault();
        cancelAppDialog();
    });
}
if (appDialogBackdrop) {
    appDialogBackdrop.addEventListener("click", (event) => {
        event.preventDefault();
        cancelAppDialog();
    });
}
if (appDialogClose) {
    appDialogClose.addEventListener("click", (event) => {
        event.preventDefault();
        cancelAppDialog();
    });
}
if (appDialogInput) {
    appDialogInput.addEventListener("keydown", (event) => {
        if (event.code === "Enter") {
            event.preventDefault();
            confirmAppDialog();
        }
    });
}

const promptSaveCurrentResponseProfile = () => {
    return openAppDialog({
        title: "Save articulation profile",
        body: "Name this articulation profile so you can reuse it later.",
        confirmLabel: "Save profile",
        cancelLabel: "Cancel",
        inputVisible: true,
        inputLabel: "Profile name",
        inputValue: `${getTonePreset(state.pianoTone)?.label ?? "Custom"} Profile`
    }).then((result) => {
        if (!result?.confirmed) return null;
        return saveCurrentResponseProfile(result.value);
    });
};

const discardManualProfileChanges = (save = true) => {
    const applied = getProfileById(state.responseProfileId);
    if (applied) {
        state.adsrTrim = cloneTrim(applied.trim);
    } else {
        state.adsrTrim = { ...DEFAULTS.adsrTrim };
        state.responseProfileId = DEFAULTS.responseProfileId;
    }
    state.responseProfileDirty = false;
    applyAdsrTrimUi();
    renderResponseProfileBrowser();
    if (save) saveSettings();
};

const resetAdsrTrim = (save = true) => {
    applyResponseProfileById(DEFAULTS.responseProfileId, { save });
};

const resolveInstrumentSwitchProfileAction = async (nextTone, options = {}) => {
    if (options.skipProfilePrompts || nextTone === state.pianoTone) {
        return { cancel: false, useRecommended: false };
    }

    if (state.responseProfileDirty) {
        const decision = await openAppDialog({
            title: "Save articulation changes?",
            body: "You manually changed the articulation profile. Save it before switching instruments?",
            confirmLabel: "Save profile",
            cancelLabel: "Discard changes"
        });
        if (decision?.confirmed) {
            const saved = await promptSaveCurrentResponseProfile();
            if (!saved) return { cancel: true, useRecommended: false };
            return { cancel: false, useRecommended: false };
        }
        discardManualProfileChanges(false);
        return { cancel: false, useRecommended: false };
    }

    if (state.responseProfileId !== DEFAULTS.responseProfileId) {
        const nextLabel = PIANO_PRESETS[nextTone]?.label ?? "this instrument";
        const useRecommended = await openAppDialog({
            title: "Use recommended profile?",
            body: `Switch to "${nextLabel}". Use that instrument's recommended articulation profile?`,
            confirmLabel: "Use recommended",
            cancelLabel: "Keep current"
        });
        return { cancel: false, useRecommended: Boolean(useRecommended?.confirmed) };
    }

    return { cancel: false, useRecommended: false };
};

const applyInstrumentPresetSelection = async () => {
    const key = selectedInstrumentPresetKey;
    if (!key) return false;
    const toneId = await selectSf2BrowserPreset(key);
    if (!toneId) return false;
    return setPianoTone(toneId);
};

const setVolume = (value) => {
    const normalized = Math.min(Math.max(value, 0), 1);
    applySettingsStatePatch({ volume: normalized }, "settings/volume");
    const gain = Math.pow(normalized, 1.8) * 0.5;
    if (masterGain) {
        masterGain.gain.setTargetAtTime(gain, audioContext.currentTime, 0.02);
    }
    volumeValue.textContent = `${Math.round(normalized * 100)}%`;
    volumeSlider.value = normalized.toFixed(2);
    saveSettings();
};

const setPianoTone = async (tone, options = {}) => {
    const presetIds = Object.keys(PIANO_PRESETS);
    if (!presetIds.length) {
        applySettingsStatePatch({ pianoTone: "" }, "settings/piano-tone");
        if (pianoLabel) pianoLabel.textContent = "No presets";
        return false;
    }

    const next = PIANO_PRESETS[tone] ? tone : (PIANO_PRESETS[DEFAULT_PIANO] ? DEFAULT_PIANO : presetIds[0]);
    const action = await resolveInstrumentSwitchProfileAction(next, options);
    if (action.cancel) return false;

    applySettingsStatePatch({ pianoTone: next }, "settings/piano-tone");

    const selectedPreset = PIANO_PRESETS[next];
    if (selectedPreset?.sf2) {
        const matched = sf2PresetEntries.find((entry) =>
            entry.sf2Path === selectedPreset.sf2.path &&
            entry.bank === selectedPreset.sf2.bank &&
            entry.program === selectedPreset.sf2.program
        );
        selectedInstrumentPresetKey = matched?.key ?? "";
    }

    if (action.useRecommended || options.forceRecommendedProfile) {
        applySettingsStatePatch({
            responseProfileId: DEFAULTS.responseProfileId,
            adsrTrim: cloneTrim(DEFAULTS.adsrTrim),
            responseProfileDirty: false
        }, "settings/piano-tone-profile");
    } else {
        syncDirtyFromApplied();
    }

    if (pianoLabel) {
        pianoLabel.textContent = PIANO_PRESETS[next]?.label ?? "Unknown preset";
    }
    pianoOptions.forEach((option) => {
        option.classList.toggle("active", option.dataset.piano === next);
    });
    if (pianoPanel?.classList.contains("open")) {
        positionPianoPanel();
    }
    if (instrumentBrowserPanel?.classList.contains("open")) {
        positionInstrumentBrowserPanel();
    }
    if (next) {
        void ensureSoundfontReady(next);
    }

    applyAdsrTrimUi();
    refreshResponseProfileBrowser();
    updateInstrumentPresetMeta();
    if (options.save !== false) saveSettings();
    return true;
};

const setNoteLength = (value) => {
    const clamped = Math.min(Math.max(value, 0.4), 3.0);
    applySettingsStatePatch({ noteDuration: clamped }, "settings/note-length");
    lengthValue.textContent = `${clamped.toFixed(1)}s`;
    lengthSlider.value = clamped.toFixed(1);
    applyAdsrTrimUi();
    updateProfileMeta();
    updateInstrumentPresetMeta();
    saveSettings();
};

const setAdsrTrim = (key, value, options = {}) => {
    if (!(key in state.adsrTrim)) return;
    const nextTrim = {
        ...state.adsrTrim,
        [key]: clampTrim(value)
    };
    applySettingsStatePatch({ adsrTrim: nextTrim }, `settings/adsr-${key}`);
    syncDirtyFromApplied();
    applyAdsrTrimUi();
    renderResponseProfileBrowser();
    if (options.save !== false) saveSettings();
};

const playPianoPreview = (presetKey) => {
    abortPlayback();
    stopPreviewPlayback();
    previewState.playing = true;
    previewState.preset = presetKey;
    const { events, totalTime } = buildPreviewSequence();
    events.forEach((event) => {
        schedulePreviewEvent(event.t * 1000, () => {
            if (!previewState.playing) return;
            if (event.type === "on") {
                previewNoteOn(event.noteId);
            } else if (event.type === "off") {
                previewNoteOff(event.noteId);
            } else if (event.type === "pedalOn") {
                previewPedalOn();
            } else if (event.type === "pedalOff") {
                previewPedalOff();
            }
        });
    });
    schedulePreviewEvent((totalTime + 0.25) * 1000, () => {
        stopPreviewPlayback();
    });
};

const KEY_COUNT_GLOBAL_MIN = 12;
const KEY_COUNT_GLOBAL_MAX = 48;
const CHORD_KEY_COUNT_MIN_BY_DIFFICULTY = Object.freeze({
    easy: 12,
    medium: 12,
    voiced: 18,
    hard: 24
});

const normalizeChordDifficultyId = (value) => {
    const normalized = String(value ?? "").trim().toLowerCase();
    if (normalized === "playful") return "voiced";
    if (["easy", "medium", "voiced", "hard"].includes(normalized)) return normalized;
    return "easy";
};

const getKeyCountMinimum = (nextState = state) => {
    const mode = getEffectivePracticeMode();
    if (mode !== "chord") return KEY_COUNT_GLOBAL_MIN;
    const difficultyId = normalizeChordDifficultyId(nextState.chordDifficulty);
    return CHORD_KEY_COUNT_MIN_BY_DIFFICULTY[difficultyId] ?? KEY_COUNT_GLOBAL_MIN;
};

const clampKeyCountPreference = (value) => Math.min(
    Math.max(Math.round(value), KEY_COUNT_GLOBAL_MIN),
    KEY_COUNT_GLOBAL_MAX
);

const getKeyCountPreference = () => (
    Number.isFinite(state.keyCountPreference) ? state.keyCountPreference : state.keyCount
);

const resolveKeyCountForPreference = (preference, nextState = state) => {
    const min = getKeyCountMinimum(nextState);
    const safePreference = Number.isFinite(preference) ? preference : state.keyCount;
    return Math.min(Math.max(Math.round(safePreference), min), KEY_COUNT_GLOBAL_MAX);
};

const clampStartMidiForKeyCount = (value, keyCount) => {
    const maxStart = Math.max(MIN_START_MIDI, MAX_MIDI - keyCount + 1);
    return clamp(value, MIN_START_MIDI, maxStart);
};

const updateKeyCountDisplay = (value) => {
    if (keyCountValue) {
        keyCountValue.textContent = `${value} keys`;
    }
    if (gameKeyCountValue) {
        gameKeyCountValue.textContent = `${value} keys`;
    }
    if (keyCountSlider) {
        keyCountSlider.value = String(value);
    }
};

const setKeyCount = (value, options = {}) => {
    const { delayOverrideMs = null, preview = false, source = "user" } = options;
    const preferred = source === "user" ? clampKeyCountPreference(value) : getKeyCountPreference();
    const clamped = resolveKeyCountForPreference(preferred);
    const clampedStartMidi = clampStartMidiForKeyCount(state.startMidi, clamped);
    applySettingsStatePatch({
        keyCount: clamped,
        keyCountPreference: preferred,
        startMidi: clampedStartMidi
    }, "settings/key-count");
    updateKeyCountDisplay(clamped);
    if (startNoteValue) {
        startNoteValue.textContent = getMidiLabel(state.startMidi);
    }
    rebuildKeyboard();
    if (!preview) {
        handleCriticalSettingChange(delayOverrideMs);
        saveSettings();
    }
};

const setStartMidi = (value, delayOverrideMs = null) => {
    const next = clampStartMidi(Math.round(value));
    applySettingsStatePatch({ startMidi: next }, "settings/start-midi");
    if (startNoteValue) {
        startNoteValue.textContent = getMidiLabel(next);
    }
    rebuildKeyboard();
    handleCriticalSettingChange(delayOverrideMs);
    saveSettings();
};

const setKeyCountVisual = (value) => {
    const clamped = clampKeyCountPreference(value);
    updateKeyCountDisplay(clamped);
};

const getEffectivePracticeMode = () => SETTINGS_MODE_POLICY.getEffectivePracticeModeFromState
    ? SETTINGS_MODE_POLICY.getEffectivePracticeModeFromState(state)
    : "random";
const isSettingsTypingEnabled = () => SETTINGS_MODE_POLICY.isTypingEnabledFromState
    ? SETTINGS_MODE_POLICY.isTypingEnabledFromState(state)
    : (state.trainingMode === "type" || state.trainingMode === "both");

const refreshOptionsModeVisibility = () => {
    const mode = getEffectivePracticeMode();
    const showChord = mode === "chord";
    const showTyping = showChord && isSettingsTypingEnabled();
    const showNoteCount = mode !== "chord";

    document.querySelectorAll('[data-option-group="legacy"]').forEach((el) => {
        el.hidden = true;
    });
    document.querySelectorAll('[data-option-group="notes"]').forEach((el) => {
        el.hidden = !showNoteCount;
    });
    document.querySelectorAll('[data-option-group="chord"]').forEach((el) => {
        el.hidden = !showChord;
    });
    document.querySelectorAll('[data-option-group="typing"]').forEach((el) => {
        el.hidden = !showTyping;
    });

    if (practiceModeSelect) {
        practiceModeSelect.value = mode;
    }
};

const setPracticeMode = (mode, options = {}) => {
    const previousMode = getEffectivePracticeMode();
    const workingState = {
        ...state,
        practiceProfiles: typeof normalizePracticeProfiles === "function"
            ? normalizePracticeProfiles(state.practiceProfiles)
            : (state.practiceProfiles || {})
    };
    if (typeof capturePracticeProfileFromState === "function") {
        capturePracticeProfileFromState(previousMode, workingState);
    }

    const normalized = ["random", "nice", "chord"].includes(mode) ? mode : "random";
    const profiles = typeof normalizePracticeProfiles === "function"
        ? normalizePracticeProfiles(workingState.practiceProfiles)
        : (workingState.practiceProfiles || {});
    const restored = profiles[normalized] ?? {};
    const nextTrainingMode = ["keyboard", "type", "both"].includes(restored.trainingMode)
        ? restored.trainingMode
        : DEFAULTS.trainingMode;
    const nextDifficulty = ["easy", "medium", "voiced", "hard"].includes(restored.chordDifficulty)
        ? restored.chordDifficulty
        : DEFAULTS.chordDifficulty;
    applySettingsStatePatch({
        practiceMode: normalized,
        niceMode: normalized === "nice",
        chordMode: normalized === "chord",
        practiceProfiles: profiles,
        mode: restored.mode === "ascending" ? "ascending" : DEFAULTS.mode,
        blindMode: Boolean(restored.blindMode),
        trainingMode: normalized === "chord" ? nextTrainingMode : "keyboard",
        chordDifficulty: nextDifficulty,
        chordExtraHelpers: Boolean(restored.chordExtraHelpers),
        chordRootHint: Boolean(restored.chordRootHint),
        typingShowPiano: restored.typingShowPiano !== false,
        typingShowTyped: restored.typingShowTyped !== false,
        hideLivePreview: Boolean(restored.hideLivePreview),
        rootHintSuppressed: false
    }, "settings/practice-mode");

    if (niceNotesToggle) {
        niceNotesToggle.checked = state.niceMode;
    }
    if (chordRoundsToggle) {
        chordRoundsToggle.checked = state.chordMode;
    }
    if (blindToggle) {
        blindToggle.checked = state.blindMode;
    }
    if (hideLivePreviewToggle) {
        hideLivePreviewToggle.checked = state.hideLivePreview;
    }
    if (trainingModeSelect) {
        trainingModeSelect.value = state.trainingMode;
    }
    if (chordDifficultySelect) {
        chordDifficultySelect.value = state.chordDifficulty;
    }
    if (chordExtraHelpersToggle) {
        chordExtraHelpersToggle.checked = state.chordExtraHelpers;
    }
    if (chordRootHintToggle) {
        chordRootHintToggle.checked = state.chordRootHint;
    }
    if (typingShowPianoToggle) {
        typingShowPianoToggle.checked = state.typingShowPiano;
    }
    if (typingShowTypedToggle) {
        typingShowTypedToggle.checked = state.typingShowTyped;
    }
    segmentedButtons.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.mode === state.mode);
    });

    refreshOptionsModeVisibility();
    updateNoteCountMax();
    setKeyCount(state.keyCount, { preview: true, source: "system" });
    updateStatus();
    updateKeyStates();

    if (options.triggerRestart !== false) {
        handleCriticalSettingChange(200);
    }
    if (options.save !== false) {
        saveSettings();
    }
};

const applyUiFromState = () => {
    normalizeCustomProfiles();
    if (!state.responseProfileId) {
        state.responseProfileId = DEFAULTS.responseProfileId;
    }
    state.practiceMode = getEffectivePracticeMode();

    noteCountInput.value = String(state.noteCount);
    noteCountValue.textContent = `${state.noteCount} notes`;
    volumeSlider.value = state.volume.toFixed(2);
    lengthSlider.value = state.noteDuration.toFixed(1);
    lengthValue.textContent = `${state.noteDuration.toFixed(1)}s`;
    state.keyCountPreference = Number.isFinite(state.keyCountPreference) ? state.keyCountPreference : state.keyCount;
    setKeyCount(state.keyCountPreference, { preview: true, source: "system" });
    state.startMidi = clampStartMidi(state.startMidi);
    if (startNoteValue) {
        startNoteValue.textContent = getMidiLabel(state.startMidi);
    }
    blindToggle.checked = state.blindMode;
    if (hideLivePreviewToggle) {
        hideLivePreviewToggle.checked = state.hideLivePreview;
    }
    if (pianoLabel) {
        const preset = getTonePreset(state.pianoTone);
        pianoLabel.textContent = preset?.label ?? "No presets";
    }
    pianoOptions.forEach((option) => {
        option.classList.toggle("active", option.dataset.piano === state.pianoTone);
    });
    niceNotesToggle.checked = state.niceMode;
    if (chordRoundsToggle) {
        chordRoundsToggle.checked = state.chordMode;
    }
    if (trainingModeSelect) {
        trainingModeSelect.value = state.trainingMode;
    }
    if (chordDifficultySelect) {
        chordDifficultySelect.value = state.chordDifficulty;
    }
    if (chordExtraHelpersToggle) {
        chordExtraHelpersToggle.checked = state.chordExtraHelpers;
    }
    if (chordRootHintToggle) {
        chordRootHintToggle.checked = state.chordRootHint;
    }
    if (typingShowPianoToggle) {
        typingShowPianoToggle.checked = state.typingShowPiano;
    }
    if (typingShowTypedToggle) {
        typingShowTypedToggle.checked = state.typingShowTyped;
    }
    if (practiceModeSelect) {
        practiceModeSelect.value = getEffectivePracticeMode();
    }
    segmentedButtons.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.mode === state.mode);
    });
    document.body.classList.toggle("theme-dark", state.theme === "dark");
    themeToggle.setAttribute("aria-pressed", state.theme === "dark");
    refreshOptionsModeVisibility();

    refreshResponseProfileBrowser();
    syncDirtyFromApplied();
    applyAdsrTrimUi();
};

let pendingKeyCount = null;
let pendingNoteCount = null;
let criticalChangeTimer = null;
let pendingCriticalRestart = false;

const commitCriticalChange = (delayOverrideMs = null) => {
    if (pendingKeyCount === null) return;
    const nextValue = pendingKeyCount;
    pendingKeyCount = null;
    setKeyCount(nextValue, { delayOverrideMs });
};

const commitNoteCountChange = (delayOverrideMs = null) => {
    if (pendingNoteCount === null) return;
    const nextValue = pendingNoteCount;
    pendingNoteCount = null;
    applySettingsStatePatch({ noteCount: nextValue }, "settings/note-count");
    noteCountInput.value = String(nextValue);
    noteCountValue.textContent = `${nextValue} notes`;
    handleCriticalSettingChange(delayOverrideMs);
    saveSettings();
};

const handleCriticalSettingChange = (delayOverrideMs = null) => {
    if (state.active) {
        clearPendingCriticalRestart();
        pendingCriticalRestart = true;
        const delayMs = delayOverrideMs ?? 700;
        criticalChangeTimer = setTimeout(() => {
            criticalChangeTimer = null;
            pendingCriticalRestart = false;
            startRound(true);
        }, delayMs);
    } else {
        updateStatus();
        updateKeyStates();
    }
};

const openSettings = () => {
    settingsPanel.classList.add("open");
    settingsPanel.setAttribute("aria-hidden", "false");
    settingsToggle.setAttribute("aria-expanded", "true");
    updateKeyboardScale();
};

const positionFloatingPanel = (panel, trigger) => {
    if (!panel || !trigger) return;
    const padding = 18;
    const gap = getPanelBottomGap();
    const bottomLimit = window.innerHeight - gap;
    const maxHeight = Math.max(220, bottomLimit - (padding * 2));
    panel.style.maxHeight = `${maxHeight}px`;
    const triggerRect = trigger.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    const appRect = appEl.getBoundingClientRect();
    const settingsRect = settingsPanel.getBoundingClientRect();
    const measuredWidth = Math.max(panelRect.width, panel.offsetWidth || 0);
    const measuredHeight = Math.max(panelRect.height, panel.scrollHeight || 0);
    const boundedHeight = Math.min(measuredHeight, maxHeight);

    let left = settingsRect.left - measuredWidth - padding;
    const minLeft = appRect.right + padding;
    left = Math.max(left, minLeft);
    const maxLeft = settingsRect.left - measuredWidth - padding;
    left = Math.min(left, maxLeft);
    left = Math.max(padding, left);

    let top = Math.max(padding, triggerRect.top);
    if (top + boundedHeight > bottomLimit) {
        top = Math.max(padding, bottomLimit - boundedHeight);
    }

    panel.style.left = `${left}px`;
    panel.style.top = `${top}px`;
};

const setGameSettingsModalOpenState = (isOpen) => {
    if (!gameSettingsModal) return false;
    gameSettingsModal.classList.toggle("open", isOpen);
    gameSettingsModal.hidden = !isOpen;
    gameSettingsModal.setAttribute("aria-hidden", isOpen ? "false" : "true");
    if (optionsTrigger) {
        optionsTrigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }
    syncModalOpenClass();
    return true;
};

const isGameSettingsModalOpenInternal = () => Boolean(gameSettingsModal && !gameSettingsModal.hidden);

const openGameSettingsModalInternal = (options = {}) => {
    const { focusTrigger = false } = options;
    if (!gameSettingsModal) return false;
    closeSettings();
    closeAllFloatingPanels();
    setGameSettingsModalOpenState(true);
    refreshOptionsModeVisibility();
    if (focusTrigger && optionsTrigger) {
        optionsTrigger.focus({ preventScroll: true });
    }
    return true;
};

const closeGameSettingsModalInternal = (options = {}) => {
    const { restoreFocus = false } = options;
    if (!gameSettingsModal || gameSettingsModal.hidden) return false;
    setGameSettingsModalOpenState(false);
    if (restoreFocus && optionsTrigger) {
        optionsTrigger.focus({ preventScroll: true });
    }
    return true;
};

const positionPianoPanel = () => {
    if (!pianoPanel || !pianoTrigger) return;
    positionFloatingPanel(pianoPanel, pianoTrigger);
};

const positionInstrumentBrowserPanel = () => {
    if (!instrumentBrowserPanel || !instrumentBrowserTrigger) return;
    positionFloatingPanel(instrumentBrowserPanel, instrumentBrowserTrigger);
};

const FLOATING_PANEL_KEYS = Object.freeze(["advanced", "piano", "instrument"]);
let activeFloatingPanelKey = null;

const getFloatingPanelConfig = (panelKey) => {
    switch (panelKey) {
    case "advanced":
        return {
            panel: advancedPanel,
            trigger: advancedTrigger,
            reposition: () => positionFloatingPanel(advancedPanel, advancedTrigger),
            onOpen: () => {
                refreshResponseProfileBrowser();
            }
        };
    case "piano":
        return {
            panel: pianoPanel,
            trigger: pianoTrigger,
            reposition: positionPianoPanel,
            onOpen: () => {
                void refreshSoundfontCatalog({ loadAllPacks: false });
            }
        };
    case "instrument":
        return {
            panel: instrumentBrowserPanel,
            trigger: instrumentBrowserTrigger,
            reposition: positionInstrumentBrowserPanel,
            onOpen: () => {
                void refreshSoundfontCatalog({ loadAllPacks: true }).then(() => refreshInstrumentPresetBrowser());
            }
        };
    default:
        return null;
    }
};

const isFloatingPanelOpen = (panelKey) => {
    const config = getFloatingPanelConfig(panelKey);
    return Boolean(config?.panel?.classList.contains("open"));
};

const setFloatingPanelOpenState = (panel, trigger, isOpen) => {
    if (!panel || !trigger) return;
    panel.classList.toggle("open", isOpen);
    panel.setAttribute("aria-hidden", isOpen ? "false" : "true");
    trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
};

const getOpenFloatingPanelKey = () => (
    FLOATING_PANEL_KEYS.find((panelKey) => isFloatingPanelOpen(panelKey)) ?? null
);

const closeFloatingPanel = (panelKey, options = {}) => {
    const { restoreFocus = false } = options;
    const config = getFloatingPanelConfig(panelKey);
    if (!config?.panel || !config.trigger) return false;
    if (!config.panel.classList.contains("open")) return false;
    setFloatingPanelOpenState(config.panel, config.trigger, false);
    if (restoreFocus) {
        config.trigger.focus({ preventScroll: true });
    }
    if (activeFloatingPanelKey === panelKey) {
        activeFloatingPanelKey = getOpenFloatingPanelKey();
    }
    return true;
};

const closeAllFloatingPanels = (options = {}) => {
    const { except = null, restoreFocus = false } = options;
    FLOATING_PANEL_KEYS.forEach((panelKey) => {
        if (panelKey === except) return;
        closeFloatingPanel(panelKey, { restoreFocus });
    });
};

const openFloatingPanel = (panelKey, options = {}) => {
    const { focusTrigger = false } = options;
    const config = getFloatingPanelConfig(panelKey);
    if (!config?.panel || !config.trigger) return false;
    closeAllFloatingPanels({ except: panelKey });
    setFloatingPanelOpenState(config.panel, config.trigger, true);
    if (typeof config.reposition === "function") {
        config.reposition();
        requestAnimationFrame(() => {
            if (!isFloatingPanelOpen(panelKey)) return;
            config.reposition();
        });
        setTimeout(() => {
            if (!isFloatingPanelOpen(panelKey)) return;
            config.reposition();
        }, 80);
    }
    if (focusTrigger) {
        config.trigger.focus({ preventScroll: true });
    }
    if (typeof config.onOpen === "function") {
        config.onOpen();
    }
    activeFloatingPanelKey = panelKey;
    return true;
};

const toggleFloatingPanel = (panelKey) => {
    if (isFloatingPanelOpen(panelKey)) {
        return closeFloatingPanel(panelKey);
    }
    return openFloatingPanel(panelKey);
};

const repositionOpenFloatingPanels = () => {
    FLOATING_PANEL_KEYS.forEach((panelKey) => {
        if (!isFloatingPanelOpen(panelKey)) return;
        const config = getFloatingPanelConfig(panelKey);
        if (typeof config?.reposition === "function") {
            config.reposition();
        }
    });
};

const openOptionsPanel = (options = {}) => openGameSettingsModalInternal(options);
const closeOptionsPanel = (options = {}) => closeGameSettingsModalInternal(options);
const openAdvanced = () => openFloatingPanel("advanced");
const closeAdvanced = (options = {}) => closeFloatingPanel("advanced", options);
const openPianoPanel = () => openFloatingPanel("piano");
const closePianoPanel = (options = {}) => closeFloatingPanel("piano", options);
const openInstrumentBrowser = () => openFloatingPanel("instrument");
const closeInstrumentBrowser = (options = {}) => closeFloatingPanel("instrument", options);

const closeSettings = () => {
    settingsPanel.classList.remove("open");
    settingsPanel.setAttribute("aria-hidden", "true");
    settingsToggle.setAttribute("aria-expanded", "false");
    closeAllFloatingPanels();
    activeFloatingPanelKey = null;
    commitCriticalChange(200);
    commitNoteCountChange(200);
    if (state.active && pendingCriticalRestart) {
        clearPendingCriticalRestart();
        pendingCriticalRestart = true;
        criticalChangeTimer = setTimeout(() => {
            criticalChangeTimer = null;
            pendingCriticalRestart = false;
            startRound(true);
        }, 200);
    }
    updateKeyboardScale();
};

App.dialog = App.dialog || {};
Object.assign(App.dialog, {
    open: openAppDialog,
    close: closeAppDialog,
    isOpen: () => Boolean(appDialog && !appDialog.hidden),
    syncModalOpenClass
});

Object.assign(App.settings, {
    applySettingsStatePatch,
    clampNoteCount,
    setVolume,
    setPianoTone,
    setNoteLength,
    setAdsrTrim,
    setKeyCount,
    setStartMidi,
    setKeyCountVisual,
    setPracticeMode,
    refreshOptionsModeVisibility,
    syncModalOpenClass,
    applyUiFromState,
    commitCriticalChange,
    commitNoteCountChange,
    handleCriticalSettingChange,
    clearPendingCriticalRestart,
    openSettings,
    closeSettings,
    positionFloatingPanel,
    getOpenFloatingPanelKey,
    repositionOpenFloatingPanels,
    openFloatingPanel,
    closeFloatingPanel,
    toggleFloatingPanel,
    closeAllFloatingPanels,
    isGameSettingsModalOpen: isGameSettingsModalOpenInternal,
    openGameSettingsModal: openGameSettingsModalInternal,
    closeGameSettingsModal: closeGameSettingsModalInternal,
    openOptionsPanel,
    closeOptionsPanel,
    openAdvanced,
    closeAdvanced,
    positionPianoPanel,
    openPianoPanel,
    closePianoPanel,
    positionInstrumentBrowserPanel,
    openInstrumentBrowser,
    closeInstrumentBrowser,
    resetAdsrTrim,
    refreshInstrumentPresetBrowser,
    renderInstrumentPresetBrowser,
    setInstrumentPresetSelection,
    applyInstrumentPresetSelection,
    refreshResponseProfileBrowser,
    renderResponseProfileBrowser,
    setResponseProfileSelection,
    applyResponseProfileSelection,
    saveCurrentResponseProfile,
    promptSaveCurrentResponseProfile,
    discardManualProfileChanges,
    // Backward-compat wrappers for older references.
    refreshSf2PresetBrowser: refreshInstrumentPresetBrowser,
    renderSf2PresetBrowser: renderInstrumentPresetBrowser,
    setSf2PresetSelection: setInstrumentPresetSelection,
    applySf2BrowserSelection: applyInstrumentPresetSelection
});
