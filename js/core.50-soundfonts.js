const normalizeSoundfontDefinition = (entry) => {
    if (!entry || typeof entry !== "object") return null;
    const id = String(entry.id ?? "").trim();
    if (!id) return null;
    return {
        ...entry,
        id,
        label: String(entry.label ?? id),
        description: String(entry.description ?? entry.desc ?? ""),
        baseAdsr: {
            attack: Number.isFinite(entry.baseAdsr?.attack) ? entry.baseAdsr.attack : 0.016,
            decay: Number.isFinite(entry.baseAdsr?.decay) ? entry.baseAdsr.decay : 0.95,
            sustain: Number.isFinite(entry.baseAdsr?.sustain) ? entry.baseAdsr.sustain : 0.75,
            release: Number.isFinite(entry.baseAdsr?.release) ? entry.baseAdsr.release : 1.2
        },
        volume: Number.isFinite(entry.volume) ? entry.volume : 1,
        velocityCurve: Number.isFinite(entry.velocityCurve) ? entry.velocityCurve : 1.6
    };
};

const setSoundfontCatalog = (items = []) => {
    const nextCatalog = {};
    Object.values(BUILTIN_SOUNDFONTS).forEach((entry) => {
        const normalized = normalizeSoundfontDefinition(entry);
        if (normalized) nextCatalog[normalized.id] = normalized;
    });
    Object.values(PIANO_PRESETS).forEach((entry) => {
        if (!entry?.advancedOnly) return;
        const normalized = normalizeSoundfontDefinition(entry);
        if (normalized) nextCatalog[normalized.id] = normalized;
    });
    items.forEach((entry) => {
        const normalized = normalizeSoundfontDefinition(entry);
        if (!normalized) return;
        nextCatalog[normalized.id] = normalized;
    });
    PIANO_PRESETS = nextCatalog;
    App.presets = PIANO_PRESETS;
    if (!PIANO_PRESETS[state.pianoTone]) {
        state.pianoTone = PIANO_PRESETS[DEFAULT_PIANO] ? DEFAULT_PIANO : Object.keys(PIANO_PRESETS)[0];
    }
};

const getSoundfontList = () => Object.values(PIANO_PRESETS);

function renderPianoOptions() {
    if (!pianoOptionsContainer) return;
    pianoOptionsContainer.innerHTML = "";
    const fragment = document.createDocumentFragment();
    Object.entries(PIANO_PRESETS).forEach(([key, preset]) => {
        if (preset.advancedOnly) return;
        const option = document.createElement("div");
        option.className = "piano-option";
        if (preset.simple) {
            option.classList.add("simple");
        }
        option.dataset.piano = key;
        option.tabIndex = 0;

        const info = document.createElement("div");
        info.className = "piano-info";

        const name = document.createElement("div");
        name.className = "piano-name";
        name.textContent = preset.label ?? key;

        const desc = document.createElement("div");
        desc.className = "piano-desc";
        desc.textContent = preset.description ?? "";

        info.appendChild(name);
        if (desc.textContent) {
            info.appendChild(desc);
        }

        const preview = document.createElement("button");
        preview.className = "piano-preview";
        preview.type = "button";
        preview.dataset.piano = key;
        preview.setAttribute("aria-label", `Play ${name.textContent} preview`);

        option.appendChild(info);
        option.appendChild(preview);
        fragment.appendChild(option);
    });

    pianoOptionsContainer.appendChild(fragment);
    pianoOptions = Array.from(pianoOptionsContainer.querySelectorAll(".piano-option"));
    pianoPreviewButtons = Array.from(pianoOptionsContainer.querySelectorAll(".piano-preview"));
}

