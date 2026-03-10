App.features = App.features || {};
App.features.round = App.features.round || {};

const applyRoundPatch = (patch, meta = {}) => {
    const actions = App.store?.actions;
    const dispatch = App.store?.dispatch;
    if (actions?.applyRoundPatch && typeof dispatch === "function") {
        return dispatch(actions.applyRoundPatch(patch, { domain: "round", ...meta }));
    }
    Object.assign(App.state, patch || {});
    return App.state;
};

const applySubmissionPatch = (patch, meta = {}) => {
    const actions = App.store?.actions;
    const dispatch = App.store?.dispatch;
    if (actions?.applySubmissionPatch && typeof dispatch === "function") {
        return dispatch(actions.applySubmissionPatch(patch, { domain: "submission", ...meta }));
    }
    Object.assign(App.state, patch || {});
    return App.state;
};

Object.assign(App.features.round, {
    applyRoundPatch,
    applySubmissionPatch
});
