App.features = App.features || {};
App.features.settings = App.features.settings || {};

const applySettingsPatch = (patch, meta = {}) => {
    const actions = App.store?.actions;
    const dispatch = App.store?.dispatch;
    if (actions?.applySettingsPatch && typeof dispatch === "function") {
        return dispatch(actions.applySettingsPatch(patch, { domain: "settings", ...meta }));
    }
    Object.assign(App.state, patch || {});
    return App.state;
};

Object.assign(App.features.settings, {
    applySettingsPatch
});
