var App = window.App || (window.App = {});
App.settings = App.settings || {};

const clampNoteCount = (value) => {
    const max = getNoteCountMax();
    let next = Number.parseInt(value, 10);
    if (!Number.isFinite(next)) next = state.noteCount;
    next = Math.min(Math.max(next, 1), max);
    return next;
};

const setVolume = (value) => {
    const normalized = Math.min(Math.max(value, 0), 1);
    state.volume = normalized;
    const gain = Math.pow(normalized, 1.8) * 0.6;
    if (masterGain) {
        masterGain.gain.setTargetAtTime(gain, audioContext.currentTime, 0.02);
    }
    volumeValue.textContent = `${Math.round(normalized * 100)}%`;
    volumeSlider.value = normalized.toFixed(2);
    saveSettings();
};

const setPianoTone = (tone, options = {}) => {
    const next = PIANO_PRESETS[tone] ? tone : DEFAULT_PIANO;
    state.pianoTone = next;
    if (pianoLabel) {
        pianoLabel.textContent = PIANO_PRESETS[next].label;
    }
    pianoOptions.forEach((option) => {
        option.classList.toggle("active", option.dataset.piano === next);
    });
    if (pianoPanel?.classList.contains("open")) {
        positionPianoPanel();
    }
    if (options.save !== false) {
        saveSettings();
    }
};

const setNoteLength = (value) => {
    const clamped = Math.min(Math.max(value, 0.4), 3.0);
    state.noteDuration = clamped;
    state.adsr.sustainLength = clamped;
    lengthValue.textContent = `${clamped.toFixed(1)}s`;
    lengthSlider.value = clamped.toFixed(1);
    sustainValue.textContent = `${clamped.toFixed(1)}s`;
    sustainSlider.value = clamped.toFixed(1);
    saveSettings();
};

const setAdsrParam = (key, value) => {
    state.adsr[key] = value;
    saveSettings();
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

const goHome = () => {
    stopPreviewPlayback();
    abortPlayback();
    state.active = false;
    state.submitted = false;
    state.selectedNotes = [];
    state.targetNotes = [];
    updateStatus();
    updateKeyStates();
};

const setKeyCount = (value, options = {}) => {
    const { delayOverrideMs = null, preview = false } = options;
    const clamped = Math.min(Math.max(Math.round(value), 12), 36);
    state.keyCount = clamped;
    state.startMidi = clampStartMidi(state.startMidi);
    keyCountValue.textContent = `${clamped} keys`;
    keyCountSlider.value = String(clamped);
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
    state.startMidi = next;
    if (startNoteValue) {
        startNoteValue.textContent = getMidiLabel(next);
    }
    rebuildKeyboard();
    handleCriticalSettingChange(delayOverrideMs);
    saveSettings();
};

const setKeyCountVisual = (value) => {
    const clamped = Math.min(Math.max(Math.round(value), 12), 36);
    keyCountValue.textContent = `${clamped} keys`;
    keyCountSlider.value = String(clamped);
};

const applyUiFromState = () => {
    noteCountInput.value = String(state.noteCount);
    noteCountValue.textContent = `${state.noteCount} notes`;
    volumeSlider.value = state.volume.toFixed(2);
    lengthSlider.value = state.noteDuration.toFixed(1);
    lengthValue.textContent = `${state.noteDuration.toFixed(1)}s`;
    keyCountSlider.value = String(state.keyCount);
    keyCountValue.textContent = `${state.keyCount} keys`;
    state.startMidi = clampStartMidi(state.startMidi);
    if (startNoteValue) {
        startNoteValue.textContent = getMidiLabel(state.startMidi);
    }
    blindToggle.checked = state.blindMode;
    if (pianoLabel) {
        const preset = PIANO_PRESETS[state.pianoTone] ?? PIANO_PRESETS[DEFAULT_PIANO];
        pianoLabel.textContent = preset.label;
    }
    pianoOptions.forEach((option) => {
        option.classList.toggle("active", option.dataset.piano === state.pianoTone);
    });
    niceNotesToggle.checked = state.niceMode;
    segmentedButtons.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.mode === state.mode);
    });
    attackValue.textContent = `${state.adsr.attack.toFixed(3)}s`;
    decayValue.textContent = `${state.adsr.decayRate.toFixed(1)}`;
    releaseValue.textContent = `${state.adsr.releaseRate.toFixed(0)}`;
    attackSlider.value = String(state.adsr.attack);
    decaySlider.value = String(state.adsr.decayRate);
    releaseSlider.value = String(state.adsr.releaseRate);
    sustainValue.textContent = `${state.noteDuration.toFixed(1)}s`;
    document.body.classList.toggle("theme-dark", state.theme === "dark");
    themeToggle.setAttribute("aria-pressed", state.theme === "dark");
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
    state.noteCount = nextValue;
    noteCountInput.value = String(nextValue);
    noteCountValue.textContent = `${nextValue} notes`;
    handleCriticalSettingChange(delayOverrideMs);
    saveSettings();
};

const handleCriticalSettingChange = (delayOverrideMs = null) => {
    if (state.active) {
        if (criticalChangeTimer) {
            clearTimeout(criticalChangeTimer);
        }
        pendingCriticalRestart = true;
        const delayMs = delayOverrideMs ?? 700;
        criticalChangeTimer = setTimeout(() => {
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

const closeSettings = () => {
    settingsPanel.classList.remove("open");
    settingsPanel.setAttribute("aria-hidden", "true");
    settingsToggle.setAttribute("aria-expanded", "false");
    closePianoPanel();
    commitCriticalChange(200);
    commitNoteCountChange(200);
    if (state.active && pendingCriticalRestart) {
        if (criticalChangeTimer) {
            clearTimeout(criticalChangeTimer);
        }
        criticalChangeTimer = setTimeout(() => {
            startRound(true);
        }, 200);
    }
    closeAdvanced();
    updateKeyboardScale();
};

const positionFloatingPanel = (panel, trigger) => {
    if (!panel || !trigger) return;
    const padding = 18;
    const gap = getPanelBottomGap();
    const triggerRect = trigger.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    const appRect = appEl.getBoundingClientRect();
    const settingsRect = settingsPanel.getBoundingClientRect();

    let left = settingsRect.left - panelRect.width - padding;
    const minLeft = appRect.right + padding;
    left = Math.max(left, minLeft);
    const maxLeft = settingsRect.left - panelRect.width - padding;
    left = Math.min(left, maxLeft);
    left = Math.max(padding, left);

    let top = Math.max(padding, triggerRect.top);
    const bottomLimit = window.innerHeight - gap;
    if (top + panelRect.height > bottomLimit) {
        top = Math.max(padding, bottomLimit - panelRect.height);
    }

    panel.style.left = `${left}px`;
    panel.style.top = `${top}px`;
};

const openAdvanced = () => {
    closePianoPanel();
    advancedPanel.classList.add("open");
    advancedPanel.setAttribute("aria-hidden", "false");
    positionFloatingPanel(advancedPanel, advancedTrigger);
};

const closeAdvanced = () => {
    advancedPanel.classList.remove("open");
    advancedPanel.setAttribute("aria-hidden", "true");
};

const positionPianoPanel = () => {
    if (!pianoPanel || !pianoTrigger) return;
    positionFloatingPanel(pianoPanel, pianoTrigger);
};

const openPianoPanel = () => {
    if (!pianoPanel || !pianoTrigger) return;
    closeAdvanced();
    pianoPanel.classList.add("open");
    pianoPanel.setAttribute("aria-hidden", "false");
    pianoTrigger.setAttribute("aria-expanded", "true");
    positionPianoPanel();
};

const closePianoPanel = () => {
    if (!pianoPanel || !pianoTrigger) return;
    pianoPanel.classList.remove("open");
    pianoPanel.setAttribute("aria-hidden", "true");
    pianoTrigger.setAttribute("aria-expanded", "false");
};

Object.assign(App.settings, {
    clampNoteCount,
    setVolume,
    setPianoTone,
    setNoteLength,
    setAdsrParam,
    setKeyCount,
    setStartMidi,
    setKeyCountVisual,
    applyUiFromState,
    commitCriticalChange,
    commitNoteCountChange,
    handleCriticalSettingChange,
    openSettings,
    closeSettings,
    positionFloatingPanel,
    openAdvanced,
    closeAdvanced,
    positionPianoPanel,
    openPianoPanel,
    closePianoPanel
});
