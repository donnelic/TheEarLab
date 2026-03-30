const BINDING_SAFETY = App.safety || {};
const bindRuntimeEvent = typeof BINDING_SAFETY.bindRuntimeEvent === "function"
    ? BINDING_SAFETY.bindRuntimeEvent
    : ((target, eventName, handler, options) => {
        if (!target || typeof target.addEventListener !== "function") return false;
        target.addEventListener(eventName, handler, options);
        return true;
    });
const runProtectedAsync = typeof BINDING_SAFETY.runProtectedAsync === "function"
    ? BINDING_SAFETY.runProtectedAsync
    : async (_context, task) => Promise.resolve(typeof task === "function" ? task() : undefined);
const reportMissingDomRefs = typeof BINDING_SAFETY.reportMissingDomRefs === "function"
    ? BINDING_SAFETY.reportMissingDomRefs
    : (() => []);
const reportRuntimeIssue = typeof BINDING_SAFETY.reportRuntimeIssue === "function"
    ? BINDING_SAFETY.reportRuntimeIssue
    : (() => null);

const handlePointerUpdate = (event) => {
    if (!customCursorEnabled) {
        if (event.type === "pointerrawupdate") return;
        handleHelperIndicatorProximity(event);
        return;
    }
    const events = typeof event.getCoalescedEvents === "function"
        ? event.getCoalescedEvents()
        : null;
    const latest = events && events.length ? events[events.length - 1] : event;
    updateCustomCursorPosition(latest);
    if (event.type !== "pointerrawupdate") {
        handleHelperIndicatorProximity(latest);
        const nextMode = getCustomCursorMode(getCursorTarget(latest));
        if (nextMode !== customCursorMode) {
            customCursorMode = nextMode;
            scheduleCustomCursorRender();
        }
    }
};

if ("onpointerrawupdate" in window) {
    bindRuntimeEvent(document, "pointerrawupdate", handlePointerUpdate, { passive: true, capture: true }, "bindings/pointerrawupdate");
}
bindRuntimeEvent(document, "pointermove", handlePointerUpdate, { passive: true, capture: true }, "bindings/pointermove");

bindRuntimeEvent(document, "pointerup", (event) => {
    customCursorPressed = false;
    updateCustomCursorPosition(event);
    requestAnimationFrame(blurPointerActivatedControl);
}, true, "bindings/pointerup");

bindRuntimeEvent(document, "pointercancel", () => {
    customCursorPressed = false;
    scheduleCustomCursorRender();
}, true, "bindings/pointercancel");

bindRuntimeEvent(document, "pointerover", (event) => {
    if (!customCursorEnabled) return;
    customCursorMode = getCustomCursorMode(getCursorTarget(event));
    scheduleCustomCursorRender();
}, true, "bindings/pointerover");

bindRuntimeEvent(document, "pointerout", (event) => {
    if (!customCursorEnabled) return;
    if (!event.relatedTarget) {
        customCursorVisible = false;
        customCursorPressed = false;
        scheduleCustomCursorRender();
    }
}, true, "bindings/pointerout");

bindRuntimeEvent(document, "pointerover", handleHelperPointerEnter, true, "bindings/helper-pointerover");
bindRuntimeEvent(document, "pointerout", handleHelperPointerLeave, true, "bindings/helper-pointerout");

bindRuntimeEvent(window, "blur", () => {
    customCursorVisible = false;
    customCursorPressed = false;
    scheduleCustomCursorRender();
}, undefined, "bindings/window-blur");

bindRuntimeEvent(document, "visibilitychange", () => {
    if (document.hidden) {
        customCursorVisible = false;
        customCursorPressed = false;
        scheduleCustomCursorRender();
    }
}, undefined, "bindings/visibilitychange");

reportMissingDomRefs([
    "keyboardEl",
    "pedalIcon",
    "gameSettingsModal",
    "chordTutorialModal",
    "advancedPanel",
    "pianoPanel",
    "instrumentBrowserPanel"
], "Bindings startup");

bindRuntimeEvent(keyboardEl, "click", (event) => {
    event.preventDefault();
}, undefined, "bindings/keyboard-click");

let gameSettingsReturnFocusEl = null;
let gameSettingsSkipReturnFocus = false;
const FOCUSABLE_SELECTOR = "button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])";

const isElementVisible = (el) => {
    if (!el) return false;
    if (el.hasAttribute("hidden")) return false;
    if (el.getAttribute("aria-hidden") === "true") return false;
    const style = window.getComputedStyle(el);
    return style.display !== "none" && style.visibility !== "hidden";
};

const getFocusableElements = (root) => {
    if (!root) return [];
    return Array.from(root.querySelectorAll(FOCUSABLE_SELECTOR))
        .filter((el) => !el.disabled && el.tabIndex !== -1 && isElementVisible(el));
};

const getModalFocusRoot = (modalEl) => (
    modalEl?.querySelector(".game-settings-card, .tutorial-card, .app-dialog-card") ?? modalEl
);

const focusFirstInModal = (modalEl) => {
    const root = getModalFocusRoot(modalEl);
    const focusables = getFocusableElements(root);
    if (focusables.length) {
        focusables[0].focus({ preventScroll: true });
    }
};

const trapModalFocus = (modalEl, event) => {
    if (event.code !== "Tab") return false;
    const root = getModalFocusRoot(modalEl);
    const focusables = getFocusableElements(root);
    if (!focusables.length) return false;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;
    if (event.shiftKey) {
        if (active === first || !root.contains(active)) {
            event.preventDefault();
            last.focus({ preventScroll: true });
            return true;
        }
        return false;
    }
    if (active === last || !root.contains(active)) {
        event.preventDefault();
        first.focus({ preventScroll: true });
        return true;
    }
    return false;
};

const isTextEditableTarget = (target) => {
    if (!target) return false;
    const tag = target.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
    return Boolean(target.isContentEditable);
};

const getActiveModalEl = () => {
    if (App.dialog?.isOpen?.()) return appDialog;
    if (gameSettingsModal && !gameSettingsModal.hidden) return gameSettingsModal;
    if (isChordTutorialOpen()) return chordTutorialModal;
    return null;
};

const closeGameSettingsModalUi = () => {
    const active = document.activeElement;
    if (gameSettingsModal && active && gameSettingsModal.contains(active) && typeof active.blur === "function") {
        active.blur();
    }
    if (typeof App.settings?.closeGameSettingsModal === "function") {
        App.settings.closeGameSettingsModal({ restoreFocus: false });
    }
    if (!gameSettingsSkipReturnFocus) {
        const fallback = gameSettingsReturnFocusEl ?? gameSettingsOpen ?? optionsTrigger;
        if (fallback && typeof fallback.focus === "function") {
            fallback.focus({ preventScroll: true });
        }
    }
    gameSettingsReturnFocusEl = null;
    gameSettingsSkipReturnFocus = false;
};

const openGameSettingsModalUi = (sourceEl = null, { skipReturnFocus = false } = {}) => {
    gameSettingsSkipReturnFocus = Boolean(skipReturnFocus);
    gameSettingsReturnFocusEl = !gameSettingsSkipReturnFocus ? (sourceEl ?? document.activeElement) : null;
    if (typeof App.settings?.openGameSettingsModal === "function") {
        App.settings.openGameSettingsModal();
    }
    focusFirstInModal(gameSettingsModal);
};

const closeActiveModal = () => {
    if (App.dialog?.isOpen?.()) {
        App.dialog.close();
        return true;
    }
    if (gameSettingsModal && !gameSettingsModal.hidden) {
        closeGameSettingsModalUi();
        return true;
    }
    if (isChordTutorialOpen()) {
        closeChordTutorial();
        return true;
    }
    return false;
};

const moveFocusInPanel = (panelEl, direction) => {
    if (!panelEl) return false;
    const focusables = getFocusableElements(panelEl);
    if (!focusables.length) return false;
    const active = document.activeElement;
    const index = focusables.indexOf(active);
    const nextIndex = index === -1
        ? 0
        : (index + direction + focusables.length) % focusables.length;
    focusables[nextIndex].focus({ preventScroll: true });
    return true;
};

bindRuntimeEvent(document, "keydown", (event) => {
    const tag = event.target.tagName;
    const chordInputFocused = event.target === chordAnswerInput;
    if ((event.code === "Enter" || event.code === "Space") && event.repeat) {
        event.preventDefault();
        return;
    }
    const activeModal = getActiveModalEl();
    if (activeModal) {
        if (event.code === "Escape") {
            event.preventDefault();
            closeActiveModal();
            return;
        }
        if (trapModalFocus(activeModal, event)) {
            return;
        }
        if (activeModal === chordTutorialModal) {
            const insideTutorial = chordTutorialModal?.contains(event.target);
            if (event.code === "ArrowLeft" && insideTutorial) {
                event.preventDefault();
                if (chordTutorialPrev && !chordTutorialPrev.disabled) {
                    chordTutorialPrev.click();
                }
                return;
            }
            if (event.code === "ArrowRight" && insideTutorial) {
                event.preventDefault();
                if (chordTutorialNext && !chordTutorialNext.disabled) {
                    chordTutorialNext.click();
                }
                return;
            }
            if (!insideTutorial) {
                event.preventDefault();
                return;
            }
        }
        return;
    }

    const openPanelKey = typeof getOpenFloatingPanelKey === "function"
        ? getOpenFloatingPanelKey()
        : null;
    if (openPanelKey) {
        const panelMap = {
            advanced: advancedPanel,
            piano: pianoPanel,
            instrument: instrumentBrowserPanel
        };
        const openPanel = panelMap[openPanelKey] ?? null;
        if (event.code === "Escape") {
            event.preventDefault();
            closeFloatingPanel(openPanelKey, { restoreFocus: true });
            return;
        }
        if (event.code === "Tab" && openPanel && !openPanel.contains(event.target)) {
            event.preventDefault();
            const focusables = getFocusableElements(openPanel);
            if (!focusables.length) return;
            const target = event.shiftKey ? focusables[focusables.length - 1] : focusables[0];
            target.focus({ preventScroll: true });
            return;
        }
        if (openPanel && !isTextEditableTarget(event.target)) {
            if (event.code === "ArrowUp" || event.code === "ArrowLeft") {
                event.preventDefault();
                moveFocusInPanel(openPanel, -1);
                return;
            }
            if (event.code === "ArrowDown" || event.code === "ArrowRight") {
                event.preventDefault();
                moveFocusInPanel(openPanel, 1);
                return;
            }
        }
    }

    if (event.code === "Escape") {
        closeSettings();
    }

    if (chordInputFocused && event.code === "Space") {
        event.preventDefault();
        triggerReplayAction(event);
        if (!holdState.active) {
            resultEl.textContent = (state.blindMode && !state.submitted)
                ? "Blind mode is on: replay is disabled until you submit."
                : (EVENTS_ACTION_COPY.typeOrSelectFirst || "Type a valid chord or select notes first.");
        }
        return;
    }

    if (chordInputFocused && event.code === "Enter") {
        event.preventDefault();
        triggerPrimaryAction();
        return;
    }

    if (
        (event.code === "Enter" || event.code === "Space")
        && (event.target.closest("button,[role=\"button\"],a[href]"))
    ) {
        return;
    }

    if (tag === "INPUT" || tag === "TEXTAREA") return;

    if (isChordTypingCaptureActive() && event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey && event.code !== "Space") {
        event.preventDefault();
        insertTypedCharacter(event.key);
        return;
    }

    if (!state.active && (event.code === "ShiftLeft" || event.code === "ShiftRight" || event.code === "ControlLeft" || event.code === "ControlRight")) {
        if (previewState.playing) {
            return;
        }
        pedalState.keysDown.add(event.code);
        if (!pedalState.active) {
            pedalState.active = true;
            pedalIcon.classList.add("active");
        }
    }

    if (event.code === "Space") {
        event.preventDefault();
        triggerReplayAction(event);
    }

    if (event.code === "Enter") {
        event.preventDefault();
        triggerPrimaryAction();
    }
}, undefined, "bindings/document-keydown");

bindRuntimeEvent(document, "keyup", (event) => {
    if (event.code === "Space") {
        releaseHeldPlayback();
    }
    if (!state.active && (event.code === "ShiftLeft" || event.code === "ShiftRight" || event.code === "ControlLeft" || event.code === "ControlRight")) {
        if (previewState.playing) {
            return;
        }
        pedalState.keysDown.delete(event.code);
        if (!pedalState.keysDown.size) {
            pedalState.active = false;
            pedalIcon.classList.remove("active");
            releasePedalNotes();
        }
    }
}, undefined, "bindings/document-keyup");

const pedalBox = document.querySelector(".pedal-box");
if (pedalBox) {
    bindRuntimeEvent(pedalBox, "pointerdown", (event) => {
        if (isChordTutorialOpen()) return;
        if (state.active || previewState.playing) return;
        event.preventDefault();
        if (typeof pedalBox.setPointerCapture === "function") {
            pedalBox.setPointerCapture(event.pointerId);
        }
        startPedalHold();
    }, undefined, "bindings/pedal-pointerdown");
    bindRuntimeEvent(pedalBox, "pointerup", (event) => {
        if (isChordTutorialOpen()) return;
        if (state.active || previewState.playing) return;
        event.preventDefault();
        stopPedalHold();
        if (typeof pedalBox.releasePointerCapture === "function") {
            pedalBox.releasePointerCapture(event.pointerId);
        }
    }, undefined, "bindings/pedal-pointerup");
    bindRuntimeEvent(pedalBox, "pointercancel", (event) => {
        if (isChordTutorialOpen()) return;
        if (state.active || previewState.playing) return;
        stopPedalHold();
        if (typeof pedalBox.releasePointerCapture === "function") {
            pedalBox.releasePointerCapture(event.pointerId);
        }
    }, undefined, "bindings/pedal-pointercancel");
    bindRuntimeEvent(pedalBox, "pointerleave", () => {
        if (isChordTutorialOpen()) return;
        if (state.active || previewState.playing) return;
        stopPedalHold();
    }, undefined, "bindings/pedal-pointerleave");
}

const setRandomBackgroundAngle = () => {
    const angle = Math.floor(Math.random() * 360);
    document.documentElement.style.setProperty("--bg-angle", `${angle}deg`);
};

const runStartupSmokeCheck = () => {
    const requiredApis = [
        ["App.audio.ensureAudio", typeof App.audio?.ensureAudio === "function"],
        ["App.audio.ensureSoundfontReady", typeof App.audio?.ensureSoundfontReady === "function"],
        ["App.audio.refreshSoundfontCatalog", typeof App.audio?.refreshSoundfontCatalog === "function"],
        ["App.game.updateTypedPreviewFromInput", typeof App.game?.updateTypedPreviewFromInput === "function"],
        ["App.settings.applyUiFromState", typeof App.settings?.applyUiFromState === "function"]
    ];
    const missingApis = requiredApis
        .filter(([, available]) => !available)
        .map(([label]) => label);
    if (missingApis.length) {
        reportRuntimeIssue("Startup smoke check: missing APIs", new Error(missingApis.join(", ")), {
            level: "warn",
            fatal: true
        });
    }
    return missingApis;
};

const init = async () => {
    reportMissingDomRefs([
        "keyboardEl",
        "whiteKeysContainer",
        "blackKeysContainer",
        "primaryActionButton",
        "playSelectedButton",
        "statusPanel",
        "resultEl",
        "selectedListEl",
        "goalCountEl",
        "modeLabelEl"
    ], "Init");
    runStartupSmokeCheck();

    const startupTasks = [
        ["init/load-settings", () => loadSettings()],
        ["init/bind-piano-options", () => bindPianoOptionEvents()],
        ["init/background-angle", () => setRandomBackgroundAngle()],
        ["init/render-keyboard", () => renderKeyboard()],
        ["init/keyboard-enabled", () => setKeyboardEnabled(true)],
        ["init/note-count-max", () => updateNoteCountMax()],
        ["init/render-piano-options", () => renderPianoOptions()],
        ["init/apply-ui-from-state", () => applyUiFromState()],
        ["init/custom-cursor-media", () => App.events?.applyCustomCursorMediaState?.()],
        ["init/typed-preview", () => App.game?.updateTypedPreviewFromInput?.()],
        ["init/profile-browser", () => refreshResponseProfileBrowser()],
        ["init/volume", () => setVolume(state.volume)],
        ["init/note-length", () => setNoteLength(state.noteDuration)],
        ["init/key-count", () => setKeyCount(state.keyCount, { delayOverrideMs: 0 })],
        ["init/status", () => updateStatus()],
        ["init/key-states", () => updateKeyStates()],
        ["init/keyboard-scale", () => updateKeyboardScale()]
    ];

    for (const [label, task] of startupTasks) {
        await runProtectedAsync(label, task);
    }

    const runDeferredCatalogLoad = () => {
        void runProtectedAsync("init/deferred-soundfont-load", async () => {
            await refreshSoundfontCatalog({ loadAllPacks: false });
            void ensureSoundfontReady(state.pianoTone);
        }, { level: "warn" });
    };

    if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(() => runDeferredCatalogLoad(), { timeout: 1200 });
    } else {
        setTimeout(runDeferredCatalogLoad, 60);
    }
};

void runProtectedAsync("init/bootstrap", init, { fatal: true });

Object.assign(App.events, { bindPianoOptionEvents, init, setRandomBackgroundAngle });
