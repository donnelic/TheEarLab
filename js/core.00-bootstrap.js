var App = window.App || (window.App = {});
App.core = App.core || {};
const BUILD_ID = "20260324154447";
App.buildId = BUILD_ID;

const dom = {
    settingsToggle: document.getElementById("settings-toggle"),
    settingsPanel: document.getElementById("settings-panel"),
    themeToggle: document.getElementById("theme-toggle"),
    homeToggle: document.getElementById("home-toggle"),
    appEl: document.querySelector(".app"),
    noteCountInput: document.getElementById("note-count"),
    noteCountValue: document.getElementById("note-count-value"),
    segmentedButtons: Array.from(document.querySelectorAll(".segmented-btn")),
    quickModeButtons: Array.from(document.querySelectorAll("[data-quick-mode]")),
    primaryActionButton: document.getElementById("primary-action"),
    playSelectedButton: document.getElementById("play-selected"),
    volumeSlider: document.getElementById("piano-volume"),
    volumeValue: document.getElementById("volume-value"),
    pianoTrigger: document.getElementById("piano-trigger"),
    pianoLabel: document.getElementById("piano-label"),
    pianoPanel: document.getElementById("piano-panel"),
    pianoPreviewMain: document.getElementById("piano-preview-main"),
    lengthSlider: document.getElementById("note-length"),
    lengthValue: document.getElementById("length-value"),
    blindToggle: document.getElementById("blind-mode"),
    hideLivePreviewToggle: document.getElementById("hide-live-preview"),
    resetSettingsButton: document.getElementById("reset-settings"),
    keyCountSlider: document.getElementById("key-count"),
    keyCountValue: document.getElementById("key-count-value"),
    keyCountDown: document.getElementById("key-count-down"),
    keyCountDownOct: document.getElementById("key-count-down-oct"),
    keyCountUp: document.getElementById("key-count-up"),
    keyCountUpOct: document.getElementById("key-count-up-oct"),
    gameKeyCountValue: document.getElementById("game-key-count-value"),
    gameKeyCountDown: document.getElementById("game-key-count-down"),
    gameKeyCountDownOct: document.getElementById("game-key-count-down-oct"),
    gameKeyCountUp: document.getElementById("game-key-count-up"),
    gameKeyCountUpOct: document.getElementById("game-key-count-up-oct"),
    startNoteDownButton: document.getElementById("start-note-down"),
    startNoteUpButton: document.getElementById("start-note-up"),
    startNoteDownOctButton: document.getElementById("start-note-down-oct"),
    startNoteUpOctButton: document.getElementById("start-note-up-oct"),
    startNoteValue: document.getElementById("start-note-value"),
    hintButton: document.getElementById("hint-button"),
    hintFlag: document.getElementById("hint-flag"),
    optionsTrigger: document.getElementById("options-trigger"),
    gameSettingsOpen: document.getElementById("game-settings-open"),
    gameSettingsModal: document.getElementById("game-settings-modal"),
    gameSettingsBackdrop: document.getElementById("game-settings-backdrop"),
    gameSettingsClose: document.getElementById("game-settings-close"),
    advancedTrigger: document.getElementById("advanced-trigger"),
    advancedPanel: document.getElementById("advanced-panel"),
    instrumentBrowserTrigger: document.getElementById("instrument-browser-trigger"),
    instrumentBrowserPanel: document.getElementById("instrument-browser-panel"),
    testEnvelopeButton: document.getElementById("test-envelope"),
    attackSlider: document.getElementById("attack-time"),
    attackLabelValue: document.getElementById("attack-label-value"),
    attackValue: document.getElementById("attack-value"),
    attackGhost: document.getElementById("attack-ghost"),
    decaySlider: document.getElementById("decay-rate"),
    decayLabelValue: document.getElementById("decay-label-value"),
    decayValue: document.getElementById("decay-value"),
    decayGhost: document.getElementById("decay-ghost"),
    releaseSlider: document.getElementById("release-rate"),
    releaseLabelValue: document.getElementById("release-label-value"),
    releaseValue: document.getElementById("release-value"),
    releaseGhost: document.getElementById("release-ghost"),
    sustainSlider: document.getElementById("sustain-length"),
    sustainLabelValue: document.getElementById("sustain-label-value"),
    sustainValue: document.getElementById("sustain-value"),
    sustainGhost: document.getElementById("sustain-ghost"),
    profileSearch: document.getElementById("profile-search"),
    profileList: document.getElementById("profile-list"),
    profileApply: document.getElementById("profile-apply"),
    profileSave: document.getElementById("profile-save"),
    profileMeta: document.getElementById("profile-meta"),
    practiceModeSelect: document.getElementById("practice-mode"),
    trainingModeSelect: document.getElementById("training-mode"),
    chordDifficultySelect: document.getElementById("chord-difficulty"),
    chordExtraHelpersToggle: document.getElementById("chord-extra-helpers"),
    chordRootHintToggle: document.getElementById("chord-root-hint"),
    customCursorToggle: document.getElementById("custom-cursor"),
    typingShowPianoToggle: document.getElementById("typing-show-piano"),
    typingShowTypedToggle: document.getElementById("typing-show-typed"),
    typingZone: document.getElementById("typing-zone"),
    chordAnswerInput: document.getElementById("chord-answer"),
    typingHelpToggle: document.getElementById("typing-help-toggle"),
    chordTutorialOpenOptions: document.getElementById("chord-tutorial-open-options"),
    chordTutorialModal: document.getElementById("chord-tutorial-modal"),
    chordTutorialBackdrop: document.getElementById("chord-tutorial-backdrop"),
    chordTutorialClose: document.getElementById("chord-tutorial-close"),
    chordTutorialPrev: document.getElementById("chord-tutorial-prev"),
    chordTutorialNext: document.getElementById("chord-tutorial-next"),
    chordTutorialStep: document.getElementById("chord-tutorial-step"),
    chordTutorialProgress: document.getElementById("chord-tutorial-progress"),
    chordTutorialTabs: document.getElementById("chord-tutorial-tabs"),
    chordTutorialCurrent: document.getElementById("chord-tutorial-current"),
    chordTutorialRootList: document.getElementById("chord-tutorial-root-list"),
    chordTutorialQualityList: document.getElementById("chord-tutorial-quality-list"),
    tutorialRowRoot: document.getElementById("tutorial-row-root"),
    tutorialRowQuality: document.getElementById("tutorial-row-quality"),
    chordTutorialPiano: document.getElementById("chord-tutorial-piano"),
    chordReadout: document.getElementById("chord-readout"),
    statusPanel: document.getElementById("status-panel"),
    instrumentPresetSearch: document.getElementById("instrument-preset-search"),
    instrumentPresetList: document.getElementById("instrument-preset-list"),
    instrumentPresetApply: document.getElementById("instrument-preset-apply"),
    instrumentPresetMeta: document.getElementById("instrument-preset-meta"),
    roundCountEl: document.getElementById("round-count"),
    selectedListEl: document.getElementById("selected-list"),
    goalCountEl: document.getElementById("goal-count"),
    goalLabelEl: document.getElementById("goal-label"),
    modeLabelEl: document.getElementById("mode-label"),
    resultEl: document.getElementById("result"),
    helperSlotEl: document.getElementById("helper-slot"),
    revealEl: document.getElementById("reveal"),
    pedalTip: document.getElementById("pedal-tip"),
    whiteKeysContainer: document.getElementById("white-keys"),
    blackKeysContainer: document.getElementById("black-keys"),
    keyboardEl: document.getElementById("keyboard"),
    pedalIcon: document.getElementById("pedal-icon"),
    pianoOptionsContainer: document.getElementById("piano-options"),
    appDialog: document.getElementById("app-dialog"),
    appDialogBackdrop: document.getElementById("app-dialog-backdrop"),
    appDialogClose: document.getElementById("app-dialog-close"),
    appDialogTitle: document.getElementById("app-dialog-title"),
    appDialogBody: document.getElementById("app-dialog-body"),
    appDialogInput: document.getElementById("app-dialog-input"),
    appDialogInputLabel: document.querySelector(".app-dialog-input-label"),
    appDialogConfirm: document.getElementById("app-dialog-confirm"),
    appDialogCancel: document.getElementById("app-dialog-cancel")
};

const {
    settingsToggle,
    settingsPanel,
    themeToggle,
    homeToggle,
    appEl,
    noteCountInput,
    noteCountValue,
    segmentedButtons,
    quickModeButtons,
    primaryActionButton,
    playSelectedButton,
    volumeSlider,
    volumeValue,
    pianoTrigger,
    pianoLabel,
    pianoPanel,
    pianoPreviewMain,
    lengthSlider,
    lengthValue,
    blindToggle,
    hideLivePreviewToggle,
    resetSettingsButton,
    keyCountSlider,
    keyCountValue,
    keyCountDown,
    keyCountDownOct,
    keyCountUp,
    keyCountUpOct,
    gameKeyCountValue,
    gameKeyCountDown,
    gameKeyCountDownOct,
    gameKeyCountUp,
    gameKeyCountUpOct,
    startNoteDownButton,
    startNoteUpButton,
    startNoteDownOctButton,
    startNoteUpOctButton,
    startNoteValue,
    hintButton,
    hintFlag,
    optionsTrigger,
    gameSettingsOpen,
    gameSettingsModal,
    gameSettingsBackdrop,
    gameSettingsClose,
    advancedTrigger,
    advancedPanel,
    instrumentBrowserTrigger,
    instrumentBrowserPanel,
    testEnvelopeButton,
    attackSlider,
    attackLabelValue,
    attackValue,
    attackGhost,
    decaySlider,
    decayLabelValue,
    decayValue,
    decayGhost,
    releaseSlider,
    releaseLabelValue,
    releaseValue,
    releaseGhost,
    sustainSlider,
    sustainLabelValue,
    sustainValue,
    sustainGhost,
    profileSearch,
    profileList,
    profileApply,
    profileSave,
    profileMeta,
    practiceModeSelect,
    trainingModeSelect,
    chordDifficultySelect,
    chordExtraHelpersToggle,
    chordRootHintToggle,
    customCursorToggle,
    typingShowPianoToggle,
    typingShowTypedToggle,
    typingZone,
    chordAnswerInput,
    typingHelpToggle,
    chordTutorialOpenOptions,
    chordTutorialModal,
    chordTutorialBackdrop,
    chordTutorialClose,
    chordTutorialPrev,
    chordTutorialNext,
    chordTutorialStep,
    chordTutorialProgress,
    chordTutorialTabs,
    chordTutorialCurrent,
    chordTutorialRootList,
    chordTutorialQualityList,
    tutorialRowRoot,
    tutorialRowQuality,
    chordTutorialPiano,
    chordReadout,
    statusPanel,
    instrumentPresetSearch,
    instrumentPresetList,
    instrumentPresetApply,
    instrumentPresetMeta,
    roundCountEl,
    selectedListEl,
    goalCountEl,
    goalLabelEl,
    modeLabelEl,
    resultEl,
    helperSlotEl,
    revealEl,
    pedalTip,
    whiteKeysContainer,
    blackKeysContainer,
    keyboardEl,
    pedalIcon,
    pianoOptionsContainer,
    appDialog,
    appDialogBackdrop,
    appDialogClose,
    appDialogTitle,
    appDialogBody,
    appDialogInput,
    appDialogInputLabel,
    appDialogConfirm,
    appDialogCancel
} = dom;

let pianoOptions = [];
let pianoPreviewButtons = [];

const uiState = {
    get pianoOptions() {
        return pianoOptions;
    },
    set pianoOptions(value) {
        pianoOptions = value;
    },
    get pianoPreviewButtons() {
        return pianoPreviewButtons;
    },
    set pianoPreviewButtons(value) {
        pianoPreviewButtons = value;
    }
};

App.dom = dom;
App.uiState = uiState;

const runtimeSafetyState = {
    issues: [],
    issueKeys: new Set(),
    bannerEl: null,
    summaryEl: null,
    listEl: null
};

const escapeRuntimeText = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");

const getRuntimeMessage = (error) => {
    if (error instanceof Error && error.message) return error.message;
    if (typeof error === "string" && error.trim()) return error.trim();
    if (error && typeof error === "object") {
        if (typeof error.message === "string" && error.message.trim()) return error.message.trim();
        if (typeof error.reason === "string" && error.reason.trim()) return error.reason.trim();
    }
    return "Unknown error";
};

const ensureRuntimeBanner = () => {
    if (runtimeSafetyState.bannerEl?.isConnected) return runtimeSafetyState.bannerEl;
    if (!document.body) return null;

    const bannerEl = document.createElement("section");
    bannerEl.className = "runtime-banner";
    bannerEl.hidden = true;
    bannerEl.setAttribute("role", "status");
    bannerEl.setAttribute("aria-live", "polite");
    bannerEl.innerHTML = `
        <div class="runtime-banner__body">
            <div class="runtime-banner__title">TheEarLab hit a problem and switched to safe mode.</div>
            <div class="runtime-banner__summary"></div>
            <ul class="runtime-banner__list"></ul>
        </div>
    `;
    document.body.insertBefore(bannerEl, document.body.firstChild);

    runtimeSafetyState.bannerEl = bannerEl;
    runtimeSafetyState.summaryEl = bannerEl.querySelector(".runtime-banner__summary");
    runtimeSafetyState.listEl = bannerEl.querySelector(".runtime-banner__list");
    return bannerEl;
};

const updateRuntimeBanner = () => {
    const bannerEl = ensureRuntimeBanner();
    if (!bannerEl) return;

    const issues = runtimeSafetyState.issues;
    bannerEl.hidden = issues.length === 0;
    document.body.classList.toggle("runtime-degraded", issues.length > 0);
    if (!issues.length) return;

    const criticalCount = issues.filter((entry) => entry.fatal).length;
    const issueCount = issues.length;
    const summary = criticalCount
        ? `${criticalCount} critical issue${criticalCount === 1 ? "" : "s"} detected. The app will keep loading what it can.`
        : `${issueCount} runtime issue${issueCount === 1 ? "" : "s"} detected. Remaining features stay available when possible.`;
    if (runtimeSafetyState.summaryEl) {
        runtimeSafetyState.summaryEl.textContent = summary;
    }
    if (runtimeSafetyState.listEl) {
        runtimeSafetyState.listEl.innerHTML = issues
            .slice(0, 4)
            .map((entry) => `<li><strong>${escapeRuntimeText(entry.context)}:</strong> ${escapeRuntimeText(entry.message)}</li>`)
            .join("");
    }
};

const reportRuntimeIssue = (context, error, options = {}) => {
    const safeContext = String(context || "Unexpected runtime issue");
    const message = getRuntimeMessage(error);
    const level = options.level === "warn" ? "warn" : "error";
    const fatal = Boolean(options.fatal);
    const issueKey = `${level}|${fatal ? "fatal" : "recoverable"}|${safeContext}|${message}`;
    if (runtimeSafetyState.issueKeys.has(issueKey)) {
        return null;
    }

    runtimeSafetyState.issueKeys.add(issueKey);
    runtimeSafetyState.issues.push({
        context: safeContext,
        message,
        level,
        fatal,
        timestamp: Date.now()
    });

    const logger = level === "warn" ? console.warn : console.error;
    logger(`[${safeContext}]`, error);
    updateRuntimeBanner();
    return runtimeSafetyState.issues[runtimeSafetyState.issues.length - 1];
};

const runProtected = (context, task, options = {}) => {
    try {
        return typeof task === "function" ? task() : undefined;
    } catch (error) {
        reportRuntimeIssue(context, error, options);
        return options.fallback;
    }
};

const runProtectedAsync = async (context, task, options = {}) => {
    try {
        return await Promise.resolve(typeof task === "function" ? task() : undefined);
    } catch (error) {
        reportRuntimeIssue(context, error, options);
        return options.fallback;
    }
};

const bindRuntimeEvent = (target, eventName, handler, options, label) => {
    const eventLabel = String(label || `${eventName} handler`);
    if (!target || typeof target.addEventListener !== "function") {
        reportRuntimeIssue(eventLabel, new Error("Required event target is unavailable."), { level: "warn" });
        return false;
    }
    target.addEventListener(eventName, (event) => {
        runProtected(eventLabel, () => handler(event));
    }, options);
    return true;
};

const reportMissingDomRefs = (keys, context = "Runtime check") => {
    const missing = (Array.isArray(keys) ? keys : [])
        .filter((key) => !dom[key]);
    if (missing.length) {
        reportRuntimeIssue(`${context}: missing DOM refs`, new Error(missing.join(", ")), { level: "warn" });
    }
    return missing;
};

window.addEventListener("error", (event) => {
    const error = event.error || new Error(event.message || "Unhandled runtime error");
    const context = event.filename
        ? `Unhandled runtime error in ${event.filename}`
        : "Unhandled runtime error";
    reportRuntimeIssue(context, error, { fatal: true });
});

window.addEventListener("unhandledrejection", (event) => {
    reportRuntimeIssue("Unhandled promise rejection", event.reason, { fatal: true });
});

App.safety = {
    state: runtimeSafetyState,
    ensureRuntimeBanner,
    updateRuntimeBanner,
    reportRuntimeIssue,
    runProtected,
    runProtectedAsync,
    bindRuntimeEvent,
    reportMissingDomRefs,
    getIssues: () => runtimeSafetyState.issues.slice()
};

