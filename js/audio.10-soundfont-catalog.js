const normalizeSampleEntries = (samples, baseDir) => {
    const entries = [];
    if (Array.isArray(samples)) {
        samples.forEach((entry) => {
            const midi = Number.isFinite(entry?.midi)
                ? Math.round(entry.midi)
                : noteIdToMidi(entry?.note ?? entry?.id ?? "");
            const file = entry?.file ?? entry?.url;
            if (!Number.isFinite(midi) || !file) return;
            entries.push({
                midi,
                url: resolveRelativePath(baseDir, file)
            });
        });
        return entries;
    }

    if (!samples || typeof samples !== "object") {
        return entries;
    }

    Object.entries(samples).forEach(([note, file]) => {
        const midi = noteIdToMidi(note);
        if (!Number.isFinite(midi) || typeof file !== "string" || !file.trim()) return;
        entries.push({
            midi,
            url: resolveRelativePath(baseDir, file)
        });
    });

    return entries;
};

const normalizeSoundfontConfig = (config, configPath) => {
    if (!config || typeof config !== "object") return null;
    const baseDir = getDirectoryPath(configPath);
    const inferredId = slugify(config.id ?? config.label ?? getDirectoryPath(configPath).split("/").filter(Boolean).pop());
    const id = slugify(config.id ?? inferredId);
    const samples = normalizeSampleEntries(config.samples ?? config.sampleMap, baseDir);

    return {
        id,
        label: String(config.label ?? config.name ?? id),
        description: String(config.description ?? config.desc ?? ""),
        source: "external",
        baseAdsr: {
            attack: Number.isFinite(config.baseAdsr?.attack) ? config.baseAdsr.attack : AUDIO_DEFAULT_SOUNDFONT_ENVELOPE.attack,
            decay: Number.isFinite(config.baseAdsr?.decay) ? config.baseAdsr.decay : AUDIO_DEFAULT_SOUNDFONT_ENVELOPE.decay,
            sustain: Number.isFinite(config.baseAdsr?.sustain) ? config.baseAdsr.sustain : AUDIO_DEFAULT_SOUNDFONT_ENVELOPE.sustain,
            release: Number.isFinite(config.baseAdsr?.release) ? config.baseAdsr.release : AUDIO_DEFAULT_SOUNDFONT_ENVELOPE.release
        },
        velocityCurve: Number.isFinite(config.velocityCurve) ? config.velocityCurve : AUDIO_DEFAULT_VELOCITY_CURVE,
        volume: Number.isFinite(config.volume) ? config.volume : 1,
        samples
    };
};

const getFilenameFromPath = (path) => {
    const normalized = toUnixPath(path).replace(/\/+$/, "");
    const index = normalized.lastIndexOf("/");
    return index === -1 ? normalized : normalized.slice(index + 1);
};

const toManifestRelativePath = (value) => {
    const normalized = toUnixPath(value).replace(/^\.\//, "").replace(/^\/+/, "");
    if (!normalized) return "";
    if (/^https?:\/\//i.test(normalized) || normalized.startsWith("/")) {
        return normalized;
    }
    if (normalized.startsWith(`${SOUNDFONT_DIR}/`)) {
        return normalized;
    }
    return `${SOUNDFONT_DIR}/${normalized}`;
};

const getManifestEntries = async () => {
    const manifest = await fetchJsonSafe(SOUNDFONT_MANIFEST);
    return Array.isArray(manifest) ? manifest : [];
};

const getManifestConfigPaths = async () => {
    const entries = await getManifestEntries();
    const paths = [];
    entries.forEach((entry) => {
        if (typeof entry === "string") {
            if (entry.toLowerCase().trim().endsWith(".sf2")) return;
            const normalized = normalizeManifestPath(entry.trim());
            if (normalized) paths.push(normalized);
            return;
        }
        if (!entry || typeof entry !== "object") return;
        if (entry.sf2) return;
        const source = entry.path ?? entry.folder ?? entry.id;
        const normalized = normalizeManifestPath(source ?? "");
        if (normalized) paths.push(normalized);
    });
    return paths;
};

const getManifestSf2Paths = async () => {
    const entries = await getManifestEntries();
    const paths = [];
    entries.forEach((entry) => {
        if (typeof entry === "string") {
            if (!entry.toLowerCase().trim().endsWith(".sf2")) return;
            const normalized = toManifestRelativePath(entry.trim());
            if (normalized) paths.push(normalized);
            return;
        }
        if (!entry || typeof entry !== "object") return;
        const source = entry.sf2 ?? entry.file;
        if (typeof source !== "string" || !source.toLowerCase().trim().endsWith(".sf2")) return;
        const normalized = toManifestRelativePath(source.trim());
        if (normalized) paths.push(normalized);
    });
    return paths;
};

const getDirectoryEntries = async () => {
    const listingHtml = await fetchTextSafe(`${SOUNDFONT_DIR}/`);
    return parseDirectoryListing(listingHtml);
};

const getDirectoryConfigPaths = async () => {
    const entries = await getDirectoryEntries();
    const paths = [];

    entries.forEach((href) => {
        const cleaned = href.replace(/^\.\//, "");
        if (!cleaned || cleaned.startsWith("../")) return;
        if (cleaned.toLowerCase() === "index.json") return;
        if (cleaned.endsWith("/")) {
            paths.push(`${SOUNDFONT_DIR}/${cleaned}soundfont.json`);
            return;
        }
        if (cleaned.toLowerCase().endsWith(".json")) {
            paths.push(`${SOUNDFONT_DIR}/${cleaned}`);
        }
    });

    return paths;
};

const getDirectorySf2Paths = async () => {
    const entries = await getDirectoryEntries();
    const paths = [];
    entries.forEach((href) => {
        const cleaned = href.replace(/^\.\//, "");
        if (!cleaned || cleaned.startsWith("../")) return;
        if (!cleaned.toLowerCase().endsWith(".sf2")) return;
        paths.push(`${SOUNDFONT_DIR}/${cleaned}`);
    });
    return paths;
};

const discoverExternalSoundfonts = async () => {
    const manifestPaths = await getManifestConfigPaths();
    const listingPaths = await getDirectoryConfigPaths();
    const allPaths = Array.from(new Set([...manifestPaths, ...listingPaths]));

    const loaded = await Promise.all(
        allPaths.map(async (configPath) => {
            const config = await fetchJsonSafe(configPath);
            if (!config) return null;
            return normalizeSoundfontConfig(config, configPath);
        })
    );

    return loaded.filter(Boolean);
};

const discoverSf2Paths = async () => {
    const manifestPaths = await getManifestSf2Paths();
    const listingPaths = await getDirectorySf2Paths();
    return Array.from(new Set([...manifestPaths, ...listingPaths]));
};

const getSf2SimplePrograms = () => {
    if (typeof SF2_SIMPLE_PROGRAMS !== "undefined" && Array.isArray(SF2_SIMPLE_PROGRAMS)) {
        return SF2_SIMPLE_PROGRAMS;
    }
    if (Array.isArray(App.sf2SimplePrograms)) {
        return App.sf2SimplePrograms;
    }
    return [];
};

const findSf2PresetName = (pack, bank, program) => {
    const matched = pack?.presets?.find((preset) => preset.bank === bank && preset.program === program);
    if (matched?.name) return matched.name;
    return `Program ${program}`;
};

const createSf2SimplePresets = (pack) => {
    if (!pack?.path) return [];
    return getSf2SimplePrograms().map((program) => {
        const baseAdsr = getBaseAdsrForProgram(program);
        return {
            id: `gm-program-${program}`,
            label: findSf2PresetName(pack, 0, program),
            description: `Program ${String(program).padStart(3, "0")}`,
            source: "sf2",
            engine: "sf2",
            simple: true,
            velocityCurve: 1.6,
            volume: 1,
            baseAdsr,
            sf2: {
                path: pack.path,
                bank: 0,
                program,
                name: findSf2PresetName(pack, 0, program)
            }
        };
    });
};

const makeSf2PresetKey = (sf2Path, bank, program) => `${sf2Path}|${bank}|${program}`;

const ensureSf2SynthReady = async () => {
    if (sf2Runtime.synth) {
        return sf2Runtime.synth;
    }
    if (sf2Runtime.readyPromise) {
        return sf2Runtime.readyPromise;
    }

    sf2Runtime.readyPromise = (async () => {
        if (!window.JSSynth || typeof window.JSSynth.waitForReady !== "function") {
            throw new Error("SF2 engine not loaded. Missing JSSynth runtime scripts.");
        }
        await window.JSSynth.waitForReady();
        const ctx = ensureAudio({ resume: false });
        const synth = new window.JSSynth.Synthesizer();
        synth.init(ctx.sampleRate);
        const node = synth.createAudioNode(ctx, 2048);
        node.connect(masterGain);
        sf2Runtime.synth = synth;
        sf2Runtime.node = node;
        return synth;
    })().finally(() => {
        sf2Runtime.readyPromise = null;
    });

    return sf2Runtime.readyPromise;
};

const loadSf2Pack = async (sf2Path) => {
    const synth = await ensureSf2SynthReady();
    if (sf2Runtime.byPath.has(sf2Path)) {
        return sf2Runtime.byPath.get(sf2Path);
    }

    const response = await fetch(sf2Path, { cache: "no-store" });
    if (!response.ok) {
        throw new Error(`Failed to fetch SF2 file: ${sf2Path}`);
    }
    const buffer = await response.arrayBuffer();
    const sfontId = await synth.loadSFont(buffer);
    const sfontObject = synth.getSFontObject(sfontId);
    const presets = [];
    if (sfontObject) {
        for (const preset of sfontObject.getPresetIterable()) {
            presets.push({
                name: String(preset.name ?? `Preset ${preset.num}`),
                bank: Number(preset.bankNum ?? 0),
                program: Number(preset.num ?? 0)
            });
        }
    }

    const pack = {
        path: sf2Path,
        label: getFilenameFromPath(sf2Path),
        sfontId,
        presets: presets.sort((a, b) => (a.bank - b.bank) || (a.program - b.program))
    };
    sf2Runtime.byPath.set(sf2Path, pack);
    return pack;
};

const rebuildSf2PresetBrowser = () => {
    sf2BrowserPresets.length = 0;
    sf2Runtime.byPath.forEach((pack) => {
        const fileLabel = pack.label.replace(/\.sf2$/i, "");
        pack.presets.forEach((preset) => {
            sf2BrowserPresets.push({
                key: makeSf2PresetKey(pack.path, preset.bank, preset.program),
                sf2Path: pack.path,
                fileLabel,
                name: preset.name,
                bank: preset.bank,
                program: preset.program
            });
        });
    });
    sf2BrowserPresets.sort((a, b) =>
        a.fileLabel.localeCompare(b.fileLabel) ||
        (a.bank - b.bank) ||
        (a.program - b.program) ||
        a.name.localeCompare(b.name)
    );
};

const refreshSf2PresetBrowserEntries = async () => {
    await refreshSoundfontCatalog({ loadAllPacks: true });
    return [...sf2BrowserPresets];
};

const getSf2PresetBrowserEntries = async () => {
    if (!sf2BrowserPresets.length || !sf2BrowserIsComplete) {
        await refreshSoundfontCatalog({ loadAllPacks: true });
    }
    return [...sf2BrowserPresets];
};

const selectSf2BrowserPreset = async (presetKey) => {
    const entry = sf2BrowserPresets.find((item) => item.key === presetKey);
    if (!entry) return null;

    const toneId = sf2ToneToPreset.get(presetKey) ?? `sf2-advanced-${slugify(`${entry.fileLabel}-${entry.bank}-${entry.program}-${entry.name}`)}`;
    sf2ToneToPreset.set(presetKey, toneId);

    if (!PIANO_PRESETS[toneId]) {
        const baseAdsr = getBaseAdsrForProgram(entry.program);
        PIANO_PRESETS[toneId] = {
            id: toneId,
            label: `${entry.name} (Advanced)`,
            description: `${entry.fileLabel} | bank ${entry.bank} | program ${entry.program}`,
            source: "sf2",
            engine: "sf2",
            advancedOnly: true,
            velocityCurve: 1.6,
            volume: 1,
            baseAdsr,
            sf2: {
                path: entry.sf2Path,
                bank: entry.bank,
                program: entry.program,
                name: entry.name
            }
        };
        App.presets = PIANO_PRESETS;
    }

    return toneId;
};

const refreshSoundfontCatalog = async (options = {}) => {
    const loadAllPacks = options?.loadAllPacks === true;
    if (soundfontRefreshPromise) {
        if (loadAllPacks && !soundfontRefreshRunLoadsAll) {
            soundfontRefreshNeedsFullPass = true;
        }
        await soundfontRefreshPromise;
        if (loadAllPacks && soundfontRefreshNeedsFullPass) {
            soundfontRefreshNeedsFullPass = false;
            return refreshSoundfontCatalog({ loadAllPacks: true });
        }
        return getSoundfontList();
    }

    soundfontRefreshRunLoadsAll = loadAllPacks;
    soundfontRefreshPromise = (async () => {
        const sf2Paths = await discoverSf2Paths();
        const sf2PathSet = new Set(sf2Paths);
        Array.from(sf2Runtime.byPath.keys()).forEach((path) => {
            if (!sf2PathSet.has(path)) {
                sf2Runtime.byPath.delete(path);
            }
        });
        if (sf2Paths.length) {
            const selectedPath = PIANO_PRESETS[state.pianoTone]?.sf2?.path;
            const primaryPath = typeof selectedPath === "string" && sf2PathSet.has(selectedPath)
                ? selectedPath
                : sf2Paths[0];
            const primaryPack = await loadSf2Pack(primaryPath);
            const simplePresets = createSf2SimplePresets(primaryPack);
            setSoundfontCatalog(simplePresets);
            if (loadAllPacks) {
                await Promise.allSettled(
                    sf2Paths
                        .filter((path) => path !== primaryPath)
                        .map((path) => loadSf2Pack(path))
                );
            }
            rebuildSf2PresetBrowser();
            sf2BrowserIsComplete = sf2Paths.every((path) => sf2Runtime.byPath.has(path));
        } else {
            setSoundfontCatalog([]);
            sf2BrowserPresets.length = 0;
            sf2BrowserIsComplete = true;
        }

        const validIds = new Set(Object.keys(PIANO_PRESETS));
        Array.from(soundfontCache.keys()).forEach((id) => {
            if (!validIds.has(id)) {
                soundfontCache.delete(id);
            }
        });

        if (!PIANO_PRESETS[state.pianoTone]) {
            state.pianoTone = PIANO_PRESETS[DEFAULT_PIANO] ? DEFAULT_PIANO : Object.keys(PIANO_PRESETS)[0] ?? DEFAULT_PIANO;
        }
        renderPianoOptions();
        if (typeof setPianoTone === "function") {
            void setPianoTone(state.pianoTone, { save: false, resetTrim: false });
        }

        return getSoundfontList();
    })().finally(() => {
        soundfontRefreshPromise = null;
        soundfontRefreshRunLoadsAll = false;
    });

    const catalog = await soundfontRefreshPromise;
    if (!loadAllPacks && soundfontRefreshNeedsFullPass) {
        soundfontRefreshNeedsFullPass = false;
        return refreshSoundfontCatalog({ loadAllPacks: true });
    }
    return catalog;
};

