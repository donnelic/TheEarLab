App.store = App.store || {};

const STORE_FLAGS = Object.freeze({
    actionLog: "piano_trainer_debug_action_log",
    invariantChecks: "piano_trainer_dev_invariant_checks"
});

const readStoreFlag = (key, fallback = false) => {
    try {
        const raw = localStorage.getItem(key);
        if (raw === null) return fallback;
        return raw === "1";
    } catch (_error) {
        return fallback;
    }
};

const writeStoreFlag = (key, enabled) => {
    try {
        localStorage.setItem(key, enabled ? "1" : "0");
    } catch (_error) {
        // Ignore storage failures in restricted browser contexts.
    }
};

const listeners = new Set();
let actionLogEnabled = readStoreFlag(STORE_FLAGS.actionLog, false);
let invariantChecksEnabled = readStoreFlag(STORE_FLAGS.invariantChecks, false);

const getState = () => App.state;

const subscribe = (listener) => {
    if (typeof listener !== "function") {
        return () => {};
    }
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
};

const notify = (payload) => {
    listeners.forEach((listener) => {
        try {
            listener(payload);
        } catch (error) {
            console.warn("[Store] Listener failed:", error);
        }
    });
};

const setActionLogEnabled = (enabled, { persist = true } = {}) => {
    actionLogEnabled = Boolean(enabled);
    if (persist) {
        writeStoreFlag(STORE_FLAGS.actionLog, actionLogEnabled);
    }
    return actionLogEnabled;
};

const setInvariantChecksEnabled = (enabled, { persist = true } = {}) => {
    invariantChecksEnabled = Boolean(enabled);
    if (persist) {
        writeStoreFlag(STORE_FLAGS.invariantChecks, invariantChecksEnabled);
    }
    return invariantChecksEnabled;
};

const toggleActionLog = () => setActionLogEnabled(!actionLogEnabled);
const toggleInvariantChecks = () => setInvariantChecksEnabled(!invariantChecksEnabled);

const getReducer = () => App.store?.reducers?.reduceAction;
const getSelectors = () => App.store?.selectors || {};

const dispatch = (action) => {
    const reducer = getReducer();
    if (typeof reducer !== "function") return getState();
    if (!action || typeof action.type !== "string") return getState();

    const state = getState();
    const timestamp = new Date().toISOString();
    const patch = reducer(state, action);
    if (!patch || typeof patch !== "object") return state;

    const delta = {};
    Object.keys(patch).forEach((key) => {
        const nextValue = patch[key];
        if (state[key] === nextValue) return;
        delta[key] = { from: state[key], to: nextValue };
        state[key] = nextValue;
    });
    const changedKeys = Object.keys(delta);
    if (!changedKeys.length) return state;

    const selectors = getSelectors();
    if (actionLogEnabled) {
        const formattedDelta = typeof selectors.selectDeltaForLog === "function"
            ? selectors.selectDeltaForLog(delta)
            : delta;
        const snapshot = typeof selectors.selectLogSnapshot === "function"
            ? selectors.selectLogSnapshot(state)
            : {};
        console.groupCollapsed(`[Action] ${action.type} @ ${timestamp}`);
        console.log("meta:", action.meta || {});
        console.log("changed keys:", changedKeys.join(", "));
        console.table(formattedDelta);
        console.log("state snapshot:", snapshot);
        console.groupEnd();
    }

    if (invariantChecksEnabled && typeof selectors.selectInvariantIssues === "function") {
        const issues = selectors.selectInvariantIssues(state, { action, delta, changedKeys, timestamp });
        if (issues.length) {
            console.warn(`[Invariant] ${action.type} @ ${timestamp}`, issues);
        }
    }

    notify({ action, delta, changedKeys, timestamp, state });
    return state;
};

Object.assign(App.store, {
    dispatch,
    getState,
    subscribe,
    isActionLogEnabled: () => actionLogEnabled,
    isInvariantChecksEnabled: () => invariantChecksEnabled,
    setActionLogEnabled,
    setInvariantChecksEnabled,
    toggleActionLog,
    toggleInvariantChecks,
    debugFlags: STORE_FLAGS
});

App.debug = App.debug || {};
Object.assign(App.debug, {
    store: App.store,
    enableActionLog: () => App.store.setActionLogEnabled(true),
    disableActionLog: () => App.store.setActionLogEnabled(false),
    enableInvariantChecks: () => App.store.setInvariantChecksEnabled(true),
    disableInvariantChecks: () => App.store.setInvariantChecksEnabled(false)
});
