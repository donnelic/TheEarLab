App.store = App.store || {};

const createStoreAction = (type, patch = {}, meta = {}) => ({
    type,
    payload: { patch: { ...(patch || {}) } },
    meta: { ...(meta || {}) }
});

const STORE_ACTION_TYPES = Object.freeze({
    STATE_PATCH: "state/apply-patch",
    SETTINGS_PATCH: "settings/apply-patch",
    ROUND_PATCH: "round/apply-patch",
    SUBMISSION_PATCH: "submission/apply-patch"
});

const storeActions = Object.freeze({
    applyStatePatch: (patch, meta = {}) => createStoreAction(STORE_ACTION_TYPES.STATE_PATCH, patch, meta),
    applySettingsPatch: (patch, meta = {}) => createStoreAction(STORE_ACTION_TYPES.SETTINGS_PATCH, patch, meta),
    applyRoundPatch: (patch, meta = {}) => createStoreAction(STORE_ACTION_TYPES.ROUND_PATCH, patch, meta),
    applySubmissionPatch: (patch, meta = {}) => createStoreAction(STORE_ACTION_TYPES.SUBMISSION_PATCH, patch, meta)
});

App.store.actionTypes = STORE_ACTION_TYPES;
App.store.actions = storeActions;
