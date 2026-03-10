App.store = App.store || {};

const clonePatch = (value) => ({ ...(value && typeof value === "object" ? value : {}) });

const sanitizePatchForState = (state, patch) => {
    const source = clonePatch(patch);
    const allowedKeys = new Set(Object.keys(state || {}));
    const sanitized = {};
    Object.keys(source).forEach((key) => {
        if (!allowedKeys.has(key)) return;
        sanitized[key] = source[key];
    });
    return sanitized;
};

const reducePatchAction = (state, action) => {
    const patch = action?.payload?.patch;
    return sanitizePatchForState(state, patch);
};

const reducerMap = Object.freeze({
    "state/apply-patch": reducePatchAction,
    "settings/apply-patch": reducePatchAction,
    "round/apply-patch": reducePatchAction,
    "submission/apply-patch": reducePatchAction
});

const reduceAction = (state, action) => {
    const reducer = reducerMap[action?.type];
    if (typeof reducer !== "function") return null;
    return reducer(state, action);
};

App.store.reducers = Object.freeze({
    reduceAction,
    reducerMap
});
