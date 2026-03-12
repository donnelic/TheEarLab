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
