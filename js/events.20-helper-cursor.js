const syncHelperPinnedUi = (helperItem) => {
    if (!helperItem) return;
    const label = helperItem.dataset?.helperLabel;
    if (!label || typeof App.game?.getHelperPinFlags !== "function") return;
    const flags = App.game.getHelperPinFlags(label);
    helperItem.classList.toggle("pinned", Boolean(flags.pinnedGlobal));
    helperItem.classList.toggle("latched", Boolean(flags.pinnedLocal));
    helperItem.setAttribute("aria-pressed", flags.pinned ? "true" : "false");
    return flags;
};

const EVENTS_API = App.events || {};
const patchSettings = typeof EVENTS_API.patchSettingsState === "function"
    ? EVENTS_API.patchSettingsState
    : (typeof App.settings?.applySettingsStatePatch === "function"
        ? (patch, mutation) => App.settings.applySettingsStatePatch(patch, mutation)
        : (patch) => Object.assign(state, patch || {}));
const applySettingEffects = typeof EVENTS_API.applySettingMutationEffects === "function"
    ? EVENTS_API.applySettingMutationEffects
    : (() => {});
const ROOT_HELPER_LABEL = App.game?.helperLabels?.rootNote || (App.uiCopy?.helpers?.rootNote || "Root note");
const HELPER_SAFETY = App.safety || {};
const bindRuntimeEvent = typeof HELPER_SAFETY.bindRuntimeEvent === "function"
    ? HELPER_SAFETY.bindRuntimeEvent
    : ((target, eventName, handler, options) => {
        if (!target || typeof target.addEventListener !== "function") return false;
        target.addEventListener(eventName, handler, options);
        return true;
    });
const reportMissingDomRefs = typeof HELPER_SAFETY.reportMissingDomRefs === "function"
    ? HELPER_SAFETY.reportMissingDomRefs
    : (() => []);

const shouldBlurAfterPointer = (event) => {
    if (!event) return false;
    if (event.type === "keydown") return false;
    if (typeof event.clientX === "number" || typeof event.pointerType === "string") return true;
    return ["click", "contextmenu"].includes(event.type);
};

const toggleRootHintFromHelper = () => {
    const nextValue = !state.chordRootHint;
    patchSettings({
        chordRootHint: nextValue,
        rootHintSuppressed: false
    }, "events/chord-root-hint-helper");
    if (chordRootHintToggle) {
        chordRootHintToggle.checked = nextValue;
    }
    if (typeof App.game?.setRootHelperPinned === "function") {
        App.game.setRootHelperPinned();
    }
    applySettingEffects("chordRootHint", {
        refreshStatus: false,
        restartOverride: false
    });
    return true;
};

const toggleHelperPinned = (helperItem, { persistent = false, event = null } = {}) => {
    if (!helperItem) return false;
    const label = helperItem.dataset?.helperLabel;
    if (!label) return false;
    const isRootHelper = helperItem.dataset?.helperRoot === "true" || label === ROOT_HELPER_LABEL;
    let toggled = false;
    if (!persistent && isRootHelper) {
        const latchFn = App.game?.toggleHelperPinLocal;
        if (state.chordRootHint) {
            const rootToggled = toggleRootHintFromHelper();
            const latched = typeof latchFn === "function" ? latchFn(label) : false;
            toggled = rootToggled || latched;
        } else {
            if (typeof latchFn !== "function") return false;
            toggled = latchFn(label);
        }
    } else if (persistent && isRootHelper) {
        toggled = toggleRootHintFromHelper();
    } else {
        const pinFlags = App.game?.getHelperPinFlags?.(label);
        if (!persistent && pinFlags?.pinnedGlobal) {
            const unpinFn = App.game?.toggleHelperPinGlobal;
            const latchFn = App.game?.toggleHelperPinLocal;
            if (typeof unpinFn !== "function" || typeof latchFn !== "function") return false;
            const unpinned = unpinFn(label);
            const latched = latchFn(label);
            toggled = unpinned || latched;
        } else {
            const toggleFn = persistent ? App.game?.toggleHelperPinGlobal : App.game?.toggleHelperPinLocal;
            if (typeof toggleFn !== "function") return false;
            toggled = toggleFn(label);
        }
    }
    if (toggled) {
        syncHelperPinnedUi(helperItem);
        if (shouldBlurAfterPointer(event) && document.activeElement === helperItem) {
            helperItem.blur();
        }
    }
    return toggled;
};

const getCursorTarget = (event) => {
    if (event && typeof event.clientX === "number" && typeof event.clientY === "number") {
        return document.elementFromPoint(event.clientX, event.clientY) || event.target;
    }
    return event?.target ?? null;
};

const handleHelperPinEvent = (event, { persistent = false } = {}) => {
    const helperItem = event.target?.closest?.(".helper-item");
    if (!helperItem) return;
    if (toggleHelperPinned(helperItem, { persistent, event })) {
        event.preventDefault();
    }
};

reportMissingDomRefs([
    "advancedTrigger",
    "advancedPanel",
    "keyboardEl"
], "Helper cursor binding");

bindRuntimeEvent(document, "click", (event) => handleHelperPinEvent(event), undefined, "helper/pin-click");

bindRuntimeEvent(document, "keydown", (event) => {
    if (!["Enter", " "].includes(event.key)) return;
    handleHelperPinEvent(event);
}, undefined, "helper/pin-keydown");

bindRuntimeEvent(document, "contextmenu", (event) => handleHelperPinEvent(event, { persistent: true }), undefined, "helper/pin-contextmenu");

if (chordTutorialRootList) {
    chordTutorialRootList.addEventListener("mouseover", (event) => {
        const chip = event.target.closest("[data-root-pc]");
        if (!chip) return;
        const rootPc = Number.parseInt(chip.dataset.rootPc, 10);
        if (!isTutorialRootEnabled(rootPc)) return;
        const qualityId = TUTORIAL_QUALITY_BY_ID.has(tutorialState.qualityId) ? tutorialState.qualityId : "maj";
        setTutorialHoverSpec(rootPc, qualityId);
    });
    chordTutorialRootList.addEventListener("mouseleave", () => {
        clearTutorialHoverSpec();
    });
    chordTutorialRootList.addEventListener("focusin", (event) => {
        const chip = event.target.closest("[data-root-pc]");
        if (!chip) return;
        const rootPc = Number.parseInt(chip.dataset.rootPc, 10);
        if (!isTutorialRootEnabled(rootPc)) return;
        const qualityId = TUTORIAL_QUALITY_BY_ID.has(tutorialState.qualityId) ? tutorialState.qualityId : "maj";
        setTutorialHoverSpec(rootPc, qualityId);
    });
    chordTutorialRootList.addEventListener("focusout", () => {
        clearTutorialHoverSpec();
    });
    chordTutorialRootList.addEventListener("click", (event) => {
        const chip = event.target.closest("[data-root-pc]");
        if (!chip) return;
        const rootPc = Number.parseInt(chip.dataset.rootPc, 10);
        if (!Number.isFinite(rootPc)) return;
        if (!isTutorialRootEnabled(rootPc)) return;
        tutorialState.pendingNewRoots.delete(((rootPc % 12) + 12) % 12);
        tutorialState.rootPc = ((rootPc % 12) + 12) % 12;
        tutorialState.hoverSpec = null;
        syncTutorialRootChipStates();
        refreshTutorialVisuals();
        playTutorialChordSpec({ rootPc: tutorialState.rootPc, qualityId: tutorialState.qualityId });
    });
}

if (chordTutorialQualityList) {
    chordTutorialQualityList.addEventListener("mouseover", (event) => {
        const chip = event.target.closest("[data-quality-id]");
        if (!chip) return;
        const qualityId = String(chip.dataset.qualityId ?? "");
        if (!isTutorialQualityEnabled(qualityId)) return;
        setTutorialHoverSpec(tutorialState.rootPc, qualityId);
    });
    chordTutorialQualityList.addEventListener("mouseleave", () => {
        clearTutorialHoverSpec();
    });
    chordTutorialQualityList.addEventListener("focusin", (event) => {
        const chip = event.target.closest("[data-quality-id]");
        if (!chip) return;
        const qualityId = String(chip.dataset.qualityId ?? "");
        if (!isTutorialQualityEnabled(qualityId)) return;
        setTutorialHoverSpec(tutorialState.rootPc, qualityId);
    });
    chordTutorialQualityList.addEventListener("focusout", () => {
        clearTutorialHoverSpec();
    });
    chordTutorialQualityList.addEventListener("click", (event) => {
        const chip = event.target.closest("[data-quality-id]");
        if (!chip) return;
        const qualityId = String(chip.dataset.qualityId ?? "");
        if (!TUTORIAL_QUALITY_BY_ID.has(qualityId) || !isTutorialQualityEnabled(qualityId)) return;
        tutorialState.pendingNewQualities.delete(qualityId);
        tutorialState.qualityId = qualityId;
        tutorialState.hoverSpec = null;
        syncTutorialQualityChipStates();
        refreshTutorialVisuals();
        playTutorialChordSpec({ rootPc: tutorialState.rootPc, qualityId: tutorialState.qualityId });
    });
}

const EVENTS_MODE_POLICY_LOCAL = App.modePolicy;
const EVENTS_ACTION_COPY = App.uiCopy?.actions || {};
const isEventsTypingEnabled = () => EVENTS_MODE_POLICY_LOCAL.isTypingEnabledFromState(state);
const isEventsTypingOnlyMode = () => EVENTS_MODE_POLICY_LOCAL.isTypingOnlyModeFromState(state);
const getEventsChordRound = () => EVENTS_MODE_POLICY_LOCAL.getIsChordRoundFromState(state);

const isChordTypingCaptureActive = () => {
    if (!state.active || state.submitted) return false;
    if (!typingZone || typingZone.hidden) return false;
    if (!getEventsChordRound()) return false;
    return isEventsTypingEnabled();
};

const insertTypedCharacter = (character) => {
    if (!chordAnswerInput) return;
    chordAnswerInput.focus();
    const start = Number.isFinite(chordAnswerInput.selectionStart) ? chordAnswerInput.selectionStart : chordAnswerInput.value.length;
    const end = Number.isFinite(chordAnswerInput.selectionEnd) ? chordAnswerInput.selectionEnd : chordAnswerInput.value.length;
    chordAnswerInput.setRangeText(character, start, end, "end");
    chordAnswerInput.dispatchEvent(new Event("input", { bubbles: true }));
};

let lastPrimaryActionAt = 0;
const triggerPrimaryAction = () => {
    const now = performance.now();
    if (now - lastPrimaryActionAt < 140) return;
    lastPrimaryActionAt = now;
    if (state.active && !state.submitted) {
        submitAnswer();
    } else {
        void startRound(true);
    }
};

let pointerActivatedControl = null;
const getButtonLikeTarget = (target) => target?.closest?.("button,[role=\"button\"],a[href]") ?? null;
const blurPointerActivatedControl = () => {
    if (!pointerActivatedControl) return;
    const control = pointerActivatedControl;
    pointerActivatedControl = null;
    if (document.activeElement === control && typeof control.blur === "function") {
        control.blur();
    }
};
const CUSTOM_CURSOR_QUERY = window.matchMedia("(hover: hover) and (pointer: fine)");
const SYSTEM_CURSOR_HIDE_CLASS = "system-cursor-hidden";
const HELPER_INDICATOR_RADIUS = 60;
let customCursorEnabled = false;
let customCursorEl = null;
let customCursorX = -100;
let customCursorY = -100;
let customCursorRenderX = -100;
let customCursorRenderY = -100;
let customCursorSmoothing = 0.5;
let customCursorVisible = false;
let customCursorPressed = false;
let customCursorMode = "default";
let customCursorFrame = null;
let customCursorMotionFrame = null;
let lastPointerDownTarget = null;
let lastPointerDownAt = 0;
const helperIndicatorState = {
    items: [],
    cache: null,
    dirty: true,
    frame: null,
    lastX: null,
    lastY: null,
    active: false,
    observer: null
};
let helperZoneActive = false;

const markHelperIndicatorDirty = () => {
    helperIndicatorState.dirty = true;
    helperIndicatorState.cache = null;
};

const getHelperIndicatorItems = () => {
    if (!helperSlotEl) {
        helperIndicatorState.items = [];
        return helperIndicatorState.items;
    }
    const items = helperIndicatorState.items;
    if (items.length && items.every((item) => item?.isConnected)) {
        return items;
    }
    helperIndicatorState.items = Array.from(helperSlotEl.querySelectorAll(".helper-item"));
    markHelperIndicatorDirty();
    return helperIndicatorState.items;
};

const setHelperIndicatorActive = (active, items = getHelperIndicatorItems()) => {
    if (!items.length) {
        helperIndicatorState.active = false;
        return;
    }
    const opacity = active ? "1" : "0";
    items.forEach((item) => {
        item.style.setProperty("--helper-cursor-opacity", opacity);
    });
    helperIndicatorState.active = active;
};

const ensureHelperIndicatorObserver = () => {
    if (helperIndicatorState.observer || !helperSlotEl) return;
    helperIndicatorState.observer = new MutationObserver(markHelperIndicatorDirty);
    helperIndicatorState.observer.observe(helperSlotEl, { childList: true, subtree: true });
};

const getHelperIndicatorCache = () => {
    ensureHelperIndicatorObserver();
    const items = getHelperIndicatorItems();
    if (!items.length) return null;
    if (!helperIndicatorState.dirty && helperIndicatorState.cache) {
        return helperIndicatorState.cache;
    }
    const list = helperSlotEl?.querySelector(".helper-list");
    if (!list) return null;
    const listRect = list.getBoundingClientRect();
    if (!listRect.width || !listRect.height) return null;
    const listStyle = window.getComputedStyle(list);
    const gapValue = Number.parseFloat(listStyle.columnGap || listStyle.gap || listStyle.rowGap || 0);
    const gapMargin = Number.isFinite(gapValue) ? gapValue : 0;
    const rects = items.map((item) => item.getBoundingClientRect());
    const expandedRect = {
        left: listRect.left - HELPER_INDICATOR_RADIUS,
        right: listRect.right + HELPER_INDICATOR_RADIUS,
        top: listRect.top - HELPER_INDICATOR_RADIUS,
        bottom: listRect.bottom + HELPER_INDICATOR_RADIUS
    };
    const cursorHoldRect = {
        left: listRect.left - gapMargin,
        right: listRect.right + gapMargin,
        top: listRect.top - gapMargin,
        bottom: listRect.bottom + gapMargin
    };
    helperIndicatorState.cache = {
        items,
        rects,
        expandedRect,
        cursorHoldRect
    };
    helperIndicatorState.dirty = false;
    return helperIndicatorState.cache;
};

const updateHelperIndicatorPositions = (cache, x, y) => {
    if (!cache) return;
    cache.items.forEach((item, index) => {
        const rect = cache.rects[index];
        if (!rect || !rect.width || !rect.height) return;
        const localX = x - rect.left;
        const localY = y - rect.top;
        item.style.setProperty("--helper-cursor-x", `${Math.round(localX)}px`);
        item.style.setProperty("--helper-cursor-y", `${Math.round(localY)}px`);
    });
};

const scheduleHelperIndicatorUpdate = (cache, event) => {
    helperIndicatorState.lastX = event.clientX;
    helperIndicatorState.lastY = event.clientY;
    if (helperIndicatorState.frame !== null) return;
    helperIndicatorState.frame = requestAnimationFrame(() => {
        helperIndicatorState.frame = null;
        if (!helperIndicatorState.active) return;
        const latestCache = getHelperIndicatorCache() || cache;
        if (!latestCache) return;
        if (helperIndicatorState.lastX === null || helperIndicatorState.lastY === null) return;
        updateHelperIndicatorPositions(latestCache, helperIndicatorState.lastX, helperIndicatorState.lastY);
    });
};

const isPointerInsideRect = (event, rect) => {
    if (!rect || !event) return false;
    return event.clientX >= rect.left
        && event.clientX <= rect.right
        && event.clientY >= rect.top
        && event.clientY <= rect.bottom;
};

const handleHelperIndicatorProximity = (event) => {
    if (!event || typeof event.clientX !== "number" || typeof event.clientY !== "number") return;
    const cache = getHelperIndicatorCache();
    if (!cache) {
        if (helperIndicatorState.active) setHelperIndicatorActive(false);
        helperZoneActive = false;
        if (customCursorEnabled) {
            const nextMode = getCustomCursorMode(event.target);
            if (nextMode !== customCursorMode) {
                customCursorMode = nextMode;
                scheduleCustomCursorRender();
            }
        } else {
            document.body.classList.remove(SYSTEM_CURSOR_HIDE_CLASS);
        }
        return;
    }
    const insideIndicatorRect = isPointerInsideRect(event, cache.expandedRect);
    const insideCursorRect = isPointerInsideRect(event, cache.cursorHoldRect);
    helperZoneActive = insideCursorRect;
    if (customCursorEnabled) {
        if (helperIndicatorState.active) setHelperIndicatorActive(false);
        return;
    }
    if (insideIndicatorRect) {
        if (!helperIndicatorState.active) setHelperIndicatorActive(true, cache.items);
        scheduleHelperIndicatorUpdate(cache, event);
    } else if (helperIndicatorState.active) {
        setHelperIndicatorActive(false, cache.items);
    }
    if (!customCursorEnabled) {
        document.body.classList.toggle(SYSTEM_CURSOR_HIDE_CLASS, insideCursorRect);
    }
};

const ensureCustomCursorEl = () => {
    if (customCursorEl?.isConnected) return customCursorEl;
    const cursor = document.createElement("div");
    cursor.className = "app-cursor";
    cursor.setAttribute("aria-hidden", "true");

    const ring = document.createElement("div");
    ring.className = "app-cursor-ring";
    cursor.appendChild(ring);

    const dot = document.createElement("div");
    dot.className = "app-cursor-dot";
    cursor.appendChild(dot);

    document.body.appendChild(cursor);
    customCursorEl = cursor;
    return cursor;
};
const getCustomCursorMode = (target) => {
    if (target instanceof Element) {
        if (target.closest("#typing-help-toggle, .typing-help-toggle")) {
            return "interactive";
        }
        if (target.closest("#chord-answer, .typing-input-wrap")) {
            return "text";
        }
        if (target.closest("input[type=\"text\"], input[type=\"search\"], input[type=\"email\"], input[type=\"password\"], textarea, [contenteditable=\"true\"]")) {
            return "text";
        }
    }
    if (helperZoneActive) return "helper";
    if (target instanceof Element) {
        if (target.closest("button, [role=\"button\"], a[href], input, select, label.switch, .key, .piano-option, .sf2-row, .profile-row, .tutorial-chip, [tabindex]:not([tabindex=\"-1\"])")) {
            return "interactive";
        }
    }
    return "default";
};
const syncCustomCursorState = () => {
    if (!customCursorEnabled || !customCursorEl) return;
    customCursorEl.classList.toggle("is-interactive", customCursorMode === "interactive");
    customCursorEl.classList.toggle("is-text", customCursorMode === "text");
    customCursorEl.classList.toggle("is-helper", customCursorMode === "helper");
    customCursorEl.classList.toggle("is-pressed", customCursorPressed);
};
const renderCustomCursor = () => {
    customCursorFrame = null;
    if (!customCursorEnabled) return;
    if (customCursorVisible) {
        const target = document.elementFromPoint(customCursorRenderX, customCursorRenderY);
        const nextMode = getCustomCursorMode(target);
        if (nextMode !== customCursorMode) {
            customCursorMode = nextMode;
        }
    }
    const cursor = ensureCustomCursorEl();
    cursor.classList.toggle("visible", customCursorVisible);
    syncCustomCursorState();
};
const scheduleCustomCursorRender = () => {
    if (customCursorFrame !== null) return;
    customCursorFrame = requestAnimationFrame(renderCustomCursor);
};

const scheduleCursorMotion = () => {
    if (customCursorMotionFrame !== null) return;
    customCursorMotionFrame = requestAnimationFrame(stepCursorMotion);
};

const stepCursorMotion = () => {
    customCursorMotionFrame = null;
    if (!customCursorEnabled) return;
    const cursor = ensureCustomCursorEl();
    const dx = customCursorX - customCursorRenderX;
    const dy = customCursorY - customCursorRenderY;
    const ease = Math.min(Math.max(customCursorSmoothing, 0.08), 1);
    if (ease >= 0.98) {
        customCursorRenderX = customCursorX;
        customCursorRenderY = customCursorY;
    } else {
        customCursorRenderX += dx * ease;
        customCursorRenderY += dy * ease;
    }
    cursor.style.transform = `translate3d(${customCursorRenderX}px, ${customCursorRenderY}px, 0)`;
    if (Math.abs(dx) > 0.2 || Math.abs(dy) > 0.2) {
        scheduleCursorMotion();
    }
};
const setCustomCursorEnabled = (enabled) => {
    customCursorEnabled = Boolean(enabled);
    document.body.classList.toggle("custom-cursor-enabled", customCursorEnabled);
    if (customCursorEnabled) {
        document.body.classList.remove(SYSTEM_CURSOR_HIDE_CLASS);
        if (helperIndicatorState.active) {
            setHelperIndicatorActive(false);
        }
    }
    if (!customCursorEnabled) {
        customCursorVisible = false;
        customCursorPressed = false;
        customCursorMotionFrame = null;
        if (customCursorEl) {
            customCursorEl.classList.remove("visible", "is-interactive", "is-text", "is-pressed");
        }
        return;
    }
    ensureCustomCursorEl();
    scheduleCustomCursorRender();
};
const applyCustomCursorMediaState = () => {
    const allowCustomCursor = CUSTOM_CURSOR_QUERY.matches && state.customCursorEnabled !== false;
    setCustomCursorEnabled(allowCustomCursor);
};
if (typeof CUSTOM_CURSOR_QUERY.addEventListener === "function") {
    bindRuntimeEvent(CUSTOM_CURSOR_QUERY, "change", applyCustomCursorMediaState, undefined, "helper/custom-cursor-media");
} else if (typeof CUSTOM_CURSOR_QUERY.addListener === "function") {
    CUSTOM_CURSOR_QUERY.addListener(applyCustomCursorMediaState);
}
applyCustomCursorMediaState();
Object.assign(App.events, { applyCustomCursorMediaState });

const updateCustomCursorPosition = (event) => {
    if (!customCursorEnabled) return;
    customCursorX = event.clientX;
    customCursorY = event.clientY;
    const cursor = ensureCustomCursorEl();
    if (customCursorSmoothing >= 0.98) {
        customCursorRenderX = customCursorX;
        customCursorRenderY = customCursorY;
        cursor.style.transform = `translate3d(${customCursorRenderX}px, ${customCursorRenderY}px, 0)`;
    } else {
        if (!customCursorVisible) {
            customCursorRenderX = customCursorX;
            customCursorRenderY = customCursorY;
            cursor.style.transform = `translate3d(${customCursorRenderX}px, ${customCursorRenderY}px, 0)`;
        }
        scheduleCursorMotion();
    }
    if (!customCursorVisible) {
        customCursorVisible = true;
        cursor.classList.add("visible");
        scheduleCustomCursorRender();
    }
};

const handleHelperPointerEnter = (event) => {
    const helperItem = event.target?.closest?.(".helper-item");
    if (!helperItem) return;
    if (event.relatedTarget && helperItem.contains(event.relatedTarget)) return;
    handleHelperIndicatorProximity(event);
};

const handleHelperPointerLeave = (event) => {
    const helperItem = event.target?.closest?.(".helper-item");
    if (!helperItem) return;
    if (event.relatedTarget && helperItem.contains(event.relatedTarget)) return;
    handleHelperIndicatorProximity(event);
};

const triggerReplayAction = (event) => {
    if (updateReplayAvailability()) {
        if (!event.repeat && !holdState.active) {
            startHeldPlayback();
        }
    }
};

const bindDoubleClickReset = (target, handler) => {
    bindRuntimeEvent(target, "dblclick", handler, undefined, "helper/double-click-reset");
};

[
    [volumeSlider, () => setVolume(DEFAULTS.volume)],
    [lengthSlider, () => setNoteLength(DEFAULTS.noteDuration)],
    [keyCountSlider, () => {
        pendingKeyCount = null;
        setKeyCount(DEFAULTS.keyCount);
    }],
    [noteCountInput, () => {
        state.noteCount = DEFAULTS.noteCount;
        noteCountInput.value = String(DEFAULTS.noteCount);
        noteCountValue.textContent = `${DEFAULTS.noteCount} notes`;
        handleCriticalSettingChange();
        saveSettings();
    }],
    [attackSlider, () => setAdsrTrim("attack", 0)],
    [decaySlider, () => setAdsrTrim("decay", 0)],
    [releaseSlider, () => setAdsrTrim("release", 0)],
    [sustainSlider, () => setAdsrTrim("length", 0)]
].forEach(([target, handler]) => bindDoubleClickReset(target, handler));

if (startNoteDownButton && startNoteUpButton && startNoteValue) {
    bindRuntimeEvent(startNoteDownButton, "click", () => {
        setStartMidi(state.startMidi - 1);
    }, undefined, "helper/start-note-down");
    bindRuntimeEvent(startNoteUpButton, "click", () => {
        setStartMidi(state.startMidi + 1);
    }, undefined, "helper/start-note-up");
}

if (startNoteDownOctButton && startNoteUpOctButton) {
    bindRuntimeEvent(startNoteDownOctButton, "click", () => {
        setStartMidi(state.startMidi - 12);
    }, undefined, "helper/start-note-down-oct");
    bindRuntimeEvent(startNoteUpOctButton, "click", () => {
        setStartMidi(state.startMidi + 12);
    }, undefined, "helper/start-note-up-oct");
}

if (profileSearch) {
    profileSearch.addEventListener("input", () => {
        renderResponseProfileBrowser();
    });
}

if (profileList) {
    profileList.addEventListener("click", (event) => {
        const row = event.target.closest(".profile-row");
        if (!row) return;
        setResponseProfileSelection(row.dataset.key);
    });
    profileList.addEventListener("dblclick", () => {
        applyResponseProfileSelection();
    });
    profileList.addEventListener("keydown", (event) => {
        const row = event.target.closest(".profile-row");
        if (!row) return;
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        setResponseProfileSelection(row.dataset.key);
        applyResponseProfileSelection();
    });
}

if (profileApply) {
    profileApply.addEventListener("click", () => {
        applyResponseProfileSelection();
    });
}

if (profileSave) {
    profileSave.addEventListener("click", () => {
        void promptSaveCurrentResponseProfile();
    });
}

if (instrumentPresetSearch) {
    instrumentPresetSearch.addEventListener("input", () => {
        renderInstrumentPresetBrowser();
    });
}

if (instrumentPresetList) {
    instrumentPresetList.addEventListener("click", (event) => {
        const row = event.target.closest(".sf2-row");
        if (!row) return;
        setInstrumentPresetSelection(row.dataset.key);
    });
    instrumentPresetList.addEventListener("dblclick", () => {
        void applyInstrumentPresetSelection();
    });
    instrumentPresetList.addEventListener("keydown", (event) => {
        const row = event.target.closest(".sf2-row");
        if (!row) return;
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        setInstrumentPresetSelection(row.dataset.key);
        void applyInstrumentPresetSelection();
    });
}

if (instrumentPresetApply) {
    instrumentPresetApply.addEventListener("click", () => {
        void applyInstrumentPresetSelection();
    });
}

bindRuntimeEvent(advancedTrigger, "click", (event) => {
    event.stopPropagation();
    toggleFloatingPanel("advanced");
}, undefined, "helper/advanced-trigger");

bindRuntimeEvent(advancedPanel, "click", (event) => {
    event.stopPropagation();
}, undefined, "helper/advanced-panel");

if (pianoTrigger) {
    pianoTrigger.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleFloatingPanel("piano");
    });
}

if (pianoPanel) {
    pianoPanel.addEventListener("click", (event) => {
        event.stopPropagation();
    });
}

if (instrumentBrowserTrigger) {
    instrumentBrowserTrigger.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleFloatingPanel("instrument");
    });
}

if (instrumentBrowserPanel) {
    instrumentBrowserPanel.addEventListener("click", (event) => {
        event.stopPropagation();
    });
}

const bindPianoOptionEvents = () => {
    if (!pianoOptionsContainer) return;

    pianoOptionsContainer.addEventListener("click", (event) => {
        const previewButton = event.target.closest(".piano-preview");
        if (previewButton) {
            event.stopPropagation();
            const tone = previewButton.dataset.piano;
            playPianoPreview(tone);
            return;
        }
        const option = event.target.closest(".piano-option");
        if (!option) return;
        const tone = option.dataset.piano;
        void setPianoTone(tone);
    });

    pianoOptionsContainer.addEventListener("keydown", (event) => {
        const option = event.target.closest(".piano-option");
        if (!option) return;
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        const tone = option.dataset.piano;
        void setPianoTone(tone);
    });
};

if (pianoPreviewMain) {
    pianoPreviewMain.addEventListener("click", (event) => {
        event.stopPropagation();
        playPianoPreview(state.pianoTone);
    });
}

if (testEnvelopeButton) {
    testEnvelopeButton.addEventListener("click", () => {
        playPianoPreview(state.pianoTone);
    });
}

bindRuntimeEvent(keyboardEl, "pointerdown", (event) => {
    if (isChordTutorialOpen()) {
        event.preventDefault();
        return;
    }
    const key = event.target.closest(".key");
    if (!key) return;
    const noteId = key.dataset.note;
    pointerActiveNotes.set(event.pointerId, noteId);
    event.preventDefault();

    if (keyboardEl.classList.contains("disabled")) {
        return;
    }

    if (!state.active) {
        startManualNote(noteId, { playSound: true });
        return;
    }

    const willDeselect = !state.submitted && state.selectedNotes.includes(noteId);
    if (willDeselect) {
        toggleSelection(noteId);
        return;
    }
    const isTypingOnly = isEventsTypingOnlyMode();
    const playSound = state.submitted || (!(state.blindMode || isTypingOnly) && !willDeselect);
    if (state.submitted && revealPlaying) {
        abortPlayback([noteId]);
    }
    startManualNote(noteId, { playSound });
    if (!state.submitted) {
        toggleSelection(noteId);
    }
}, undefined, "helper/keyboard-pointerdown");

bindRuntimeEvent(document, "pointerup", (event) => {
    const noteId = pointerActiveNotes.get(event.pointerId);
    if (!noteId) return;
    releaseManualNote(noteId);
    pointerActiveNotes.delete(event.pointerId);
}, undefined, "helper/pointerup");

bindRuntimeEvent(document, "pointercancel", (event) => {
    const noteId = pointerActiveNotes.get(event.pointerId);
    if (!noteId) return;
    releaseManualNote(noteId);
    pointerActiveNotes.delete(event.pointerId);
}, undefined, "helper/pointercancel");

bindRuntimeEvent(document, "pointerdown", (event) => {
    pointerActivatedControl = getButtonLikeTarget(event.target);
    lastPointerDownTarget = pointerActivatedControl;
    lastPointerDownAt = Date.now();
    customCursorPressed = true;
    updateCustomCursorPosition(event);
}, true, "helper/pointerdown");

bindRuntimeEvent(document, "click", () => {
    requestAnimationFrame(blurPointerActivatedControl);
}, true, "helper/document-click");

