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

