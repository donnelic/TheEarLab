var App = window.App || (window.App = {});
App.audio = App.audio || {};

const ABORT_RELEASE_RATE = 28;
const MIN_ENVELOPE_GAIN = 0.0001;
const AUDIO_ENVELOPE_API = App.envelope || {};
const AUDIO_DEFAULT_SOUNDFONT_ENVELOPE = AUDIO_ENVELOPE_API.DEFAULT_SOUNDFONT_ENVELOPE || {
    attack: 0.016,
    decay: 0.95,
    sustain: 0.75,
    release: 1.2
};
const AUDIO_ADSR_TRIM_STRENGTH = AUDIO_ENVELOPE_API.ADSR_TRIM_STRENGTH || {
    attack: 0.55,
    decay: 0.55,
    release: 0.6,
    length: 0.6
};
const AUDIO_DEFAULT_VELOCITY_CURVE = AUDIO_ENVELOPE_API.DEFAULT_VELOCITY_CURVE || 1.6;
const SF2_CHANNEL = 0;
const SF2_ATTACK_GEN = 34;
const SF2_DECAY_GEN = 36;
const SF2_RELEASE_GEN = 38;
const SF2_ATTACK_TIMECENTS_TRIM = 320;
const SF2_DECAY_TIMECENTS_TRIM = 260;
const SF2_RELEASE_TIMECENTS_TRIM = 360;
const GM_PROGRAM_ENVELOPES = [
    { min: 0, max: 7, adsr: { attack: 0.012, decay: 0.9, sustain: 0.72, release: 1.15 } },
    { min: 8, max: 15, adsr: { attack: 0.005, decay: 0.7, sustain: 0.62, release: 0.9 } },
    { min: 16, max: 23, adsr: { attack: 0.006, decay: 0.42, sustain: 0.96, release: 0.65 } },
    { min: 24, max: 31, adsr: { attack: 0.008, decay: 0.68, sustain: 0.58, release: 0.95 } },
    { min: 32, max: 39, adsr: { attack: 0.006, decay: 0.5, sustain: 0.67, release: 0.75 } },
    { min: 40, max: 47, adsr: { attack: 0.045, decay: 1.2, sustain: 0.84, release: 1.7 } },
    { min: 48, max: 55, adsr: { attack: 0.03, decay: 1.0, sustain: 0.82, release: 1.4 } },
    { min: 56, max: 63, adsr: { attack: 0.02, decay: 0.85, sustain: 0.74, release: 1.05 } },
    { min: 64, max: 71, adsr: { attack: 0.018, decay: 0.78, sustain: 0.78, release: 1.1 } },
    { min: 72, max: 79, adsr: { attack: 0.012, decay: 0.9, sustain: 0.8, release: 1.15 } },
    { min: 80, max: 87, adsr: { attack: 0.008, decay: 0.48, sustain: 0.86, release: 0.75 } },
    { min: 88, max: 95, adsr: { attack: 0.06, decay: 1.5, sustain: 0.88, release: 1.8 } },
    { min: 96, max: 103, adsr: { attack: 0.02, decay: 0.9, sustain: 0.65, release: 1.2 } },
    { min: 104, max: 111, adsr: { attack: 0.014, decay: 0.8, sustain: 0.66, release: 1.0 } },
    { min: 112, max: 119, adsr: { attack: 0.004, decay: 0.35, sustain: 0.45, release: 0.6 } },
    { min: 120, max: 127, adsr: { attack: 0.012, decay: 0.75, sustain: 0.7, release: 1.1 } }
];

const soundfontCache = new Map();
let soundfontRefreshPromise = null;
let soundfontRefreshRunLoadsAll = false;
let soundfontRefreshNeedsFullPass = false;
let sf2BrowserIsComplete = false;
const sf2BrowserPresets = [];
const sf2ToneToPreset = new Map();
const sf2Runtime = {
    readyPromise: null,
    synth: null,
    node: null,
    byPath: new Map()
};
const RUNNING_FROM_FILE_PROTOCOL = window.location?.protocol === "file:";
let didWarnFileProtocol = false;

const clampValue = (value, min, max) => Math.min(Math.max(value, min), max);
const releaseRateToSeconds = (releaseRate) => Math.max(0.03, 0.8 / Math.max(1, releaseRate));
const getBaseAdsrForProgram = (program = 0) => {
    const normalized = clampValue(Math.round(program), 0, 127);
    const matched = GM_PROGRAM_ENVELOPES.find((entry) => normalized >= entry.min && normalized <= entry.max);
    if (!matched) return { ...AUDIO_DEFAULT_SOUNDFONT_ENVELOPE };
    return { ...matched.adsr };
};
const slugify = (value) =>
    String(value ?? "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "soundfont";

const toUnixPath = (value) => String(value ?? "").replace(/\\/g, "/");

const getDirectoryPath = (path) => {
    const normalized = toUnixPath(path);
    const index = normalized.lastIndexOf("/");
    return index === -1 ? "" : normalized.slice(0, index + 1);
};

const resolveRelativePath = (baseDir, relativePath) => {
    const base = toUnixPath(baseDir);
    const rel = toUnixPath(relativePath);
    if (/^https?:\/\//i.test(rel) || rel.startsWith("/")) {
        return rel;
    }
    return `${base}${rel}`;
};

const normalizeManifestPath = (value) => {
    const normalized = toUnixPath(value).replace(/^\.\//, "").replace(/^\/+/, "");
    if (!normalized) return "";
    const withConfig = normalized.endsWith(".json")
        ? normalized
        : `${normalized.replace(/\/+$/, "")}/soundfont.json`;
    if (/^https?:\/\//i.test(withConfig) || withConfig.startsWith("/")) {
        return withConfig;
    }
    if (withConfig.startsWith(`${SOUNDFONT_DIR}/`)) {
        return withConfig;
    }
    return `${SOUNDFONT_DIR}/${withConfig}`;
};

const fetchTextSafe = async (url) => {
    if (RUNNING_FROM_FILE_PROTOCOL) {
        if (!didWarnFileProtocol) {
            console.warn("Local file mode detected. Soundfont discovery needs an http(s) local server.");
            didWarnFileProtocol = true;
        }
        return null;
    }
    try {
        const response = await fetch(url, { cache: "no-store" });
        if (!response.ok) return null;
        return await response.text();
    } catch (error) {
        return null;
    }
};

const fetchJsonSafe = async (url) => {
    if (RUNNING_FROM_FILE_PROTOCOL) {
        if (!didWarnFileProtocol) {
            console.warn("Local file mode detected. Soundfont discovery needs an http(s) local server.");
            didWarnFileProtocol = true;
        }
        return null;
    }
    try {
        const response = await fetch(url, { cache: "no-store" });
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        return null;
    }
};

const parseDirectoryListing = (html) => {
    if (!html) return [];
    const links = [];
    const regex = /href\s*=\s*"([^"]+)"/gi;
    let match;
    while ((match = regex.exec(html)) !== null) {
        const href = match[1].trim();
        if (!href || href === "../" || href.startsWith("?")) continue;
        links.push(href);
    }
    return links;
};

const NOTE_TO_SEMITONE = {
    C: 0,
    "C#": 1,
    Db: 1,
    D: 2,
    "D#": 3,
    Eb: 3,
    E: 4,
    F: 5,
    "F#": 6,
    Gb: 6,
    G: 7,
    "G#": 8,
    Ab: 8,
    A: 9,
    "A#": 10,
    Bb: 10,
    B: 11
};

const noteIdToMidi = (noteId) => {
    if (typeof noteId !== "string") return null;
    const match = noteId.trim().match(/^([A-Ga-g])([#b]?)(-?\d+)$/);
    if (!match) return null;
    const letter = match[1].toUpperCase();
    const accidental = match[2] || "";
    const octave = Number.parseInt(match[3], 10);
    const key = `${letter}${accidental}`;
    const semitone = NOTE_TO_SEMITONE[key];
    if (!Number.isFinite(semitone) || !Number.isFinite(octave)) return null;
    return (octave + 1) * 12 + semitone;
};

const frequencyToMidi = (frequency) => {
    if (!Number.isFinite(frequency) || frequency <= 0) return 60;
    return Math.round(69 + 12 * Math.log2(frequency / 440));
};

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
            setPianoTone(state.pianoTone, { save: false, resetTrim: false });
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

const ensureAudio = (options = {}) => {
    const { resume = true } = options;
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)({
            latencyHint: "interactive"
        });
    }
    if (!masterGain || !masterHighpass || !masterCompressor || !masterOutputGain) {
        masterGain = audioContext.createGain();
        masterGain.gain.value = Math.pow(state.volume, 1.8) * 0.5;

        // Remove sub-bass transients ("thump"), then level broad dynamics before output.
        masterHighpass = audioContext.createBiquadFilter();
        masterHighpass.type = "highpass";
        masterHighpass.frequency.value = 30;
        masterHighpass.Q.value = 0.7;

        masterCompressor = audioContext.createDynamicsCompressor();
        masterCompressor.threshold.value = -20;
        masterCompressor.knee.value = 20;
        masterCompressor.ratio.value = 4;
        masterCompressor.attack.value = 0.004;
        masterCompressor.release.value = 0.22;

        masterOutputGain = audioContext.createGain();
        masterOutputGain.gain.value = 0.9;

        masterGain.connect(masterHighpass);
        masterHighpass.connect(masterCompressor);
        masterCompressor.connect(masterOutputGain);
        masterOutputGain.connect(audioContext.destination);
    }
    if (resume && audioContext.state === "suspended") {
        void audioContext.resume().catch(() => {
            /* autoplay gate */
        });
    }
    return audioContext;
};

const getSelectedSoundfont = (requestedId = null) => {
    if (requestedId && PIANO_PRESETS[requestedId]) {
        return PIANO_PRESETS[requestedId];
    }
    if (PIANO_PRESETS[state.pianoTone]) {
        return PIANO_PRESETS[state.pianoTone];
    }
    if (PIANO_PRESETS[DEFAULT_PIANO]) {
        return PIANO_PRESETS[DEFAULT_PIANO];
    }
    const fallbackId = Object.keys(PIANO_PRESETS)[0];
    return fallbackId ? PIANO_PRESETS[fallbackId] : null;
};

const getSourceEntry = (id) => {
    if (!activeVoicesById.has(id)) {
        activeVoicesById.set(id, new Set());
    }
    return activeVoicesById.get(id);
};

const removeVoice = (voice) => {
    if (!voice || voice.disposed) return;
    voice.disposed = true;
    activeVoices.delete(voice);

    if (voice.noteId) {
        const voiceSet = activeVoicesById.get(voice.noteId);
        if (voiceSet) {
            voiceSet.delete(voice);
            if (!voiceSet.size) {
                activeVoicesById.delete(voice.noteId);
            }
        }
    }

    if (voice.stopTimer) {
        clearTimeout(voice.stopTimer);
        voice.stopTimer = null;
    }

    if (voice.type === "sf2") {
        if (voice.onTimer) {
            clearTimeout(voice.onTimer);
            voice.onTimer = null;
        }
        if (voice.offTimer) {
            clearTimeout(voice.offTimer);
            voice.offTimer = null;
        }
        return;
    }

    try {
        voice.source.disconnect();
    } catch (error) {
        /* noop */
    }
    try {
        voice.gainNode.disconnect();
    } catch (error) {
        /* noop */
    }
};

const releaseVoice = (voice, releaseSeconds = null) => {
    if (!voice || voice.releasing) return;
    const ctx = ensureAudio();
    const now = ctx.currentTime;
    const releaseTime = Math.max(0.03, releaseSeconds ?? voice.releaseSeconds ?? 0.25);

    if (voice.type === "sf2") {
        voice.releasing = true;
        if (voice.onTimer) {
            clearTimeout(voice.onTimer);
            voice.onTimer = null;
        }
        if (voice.offTimer) {
            clearTimeout(voice.offTimer);
            voice.offTimer = null;
        }
        if (voice.started) {
            voice.synth.midiNoteOff(voice.channel, voice.key);
            voice.started = false;
        }
        const ttl = Math.max(40, Math.round(releaseTime * 1000) + 80);
        voice.stopTimer = setTimeout(() => {
            removeVoice(voice);
        }, ttl);
        return;
    }

    voice.releasing = true;
    voice.gainNode.gain.cancelScheduledValues(now);
    const currentValue =
        typeof voice.gainNode.gain.getValueAtTime === "function"
            ? voice.gainNode.gain.getValueAtTime(now)
            : voice.gainNode.gain.value;
    voice.gainNode.gain.setValueAtTime(Math.max(MIN_ENVELOPE_GAIN, currentValue), now);
    voice.gainNode.gain.setTargetAtTime(MIN_ENVELOPE_GAIN, now, releaseTime / 3);

    const stopAt = now + releaseTime + 0.05;
    try {
        voice.source.stop(stopAt);
    } catch (error) {
        /* noop */
    }

    const ttl = Math.max(40, Math.round((stopAt - now) * 1000) + 80);
    voice.stopTimer = setTimeout(() => {
        removeVoice(voice);
    }, ttl);
};

const releaseVoices = (voices, releaseRateOverride = null) => {
    const overrideSeconds = releaseRateOverride === null ? null : releaseRateToSeconds(releaseRateOverride);
    voices.forEach((voice) => {
        releaseVoice(voice, overrideSeconds);
    });
};

const stopAllNotes = (options = {}) => {
    if (!audioContext) return;
    const { releaseRateOverride = null, excludeIds = [] } = options;
    const excluded = new Set(excludeIds);

    const voicesToStop = Array.from(activeVoices).filter((voice) => {
        if (!voice.noteId) return true;
        return !excluded.has(voice.noteId);
    });

    releaseVoices(voicesToStop, releaseRateOverride);

    activeKeyTimers.forEach((timer) => {
        clearTimeout(timer);
    });
    activeKeyTimers.clear();
    keyTimersByNote.clear();

    if (excluded.size) {
        const preserved = new Map();
        excluded.forEach((id) => {
            if (keyActiveCounts.has(id)) {
                preserved.set(id, keyActiveCounts.get(id));
            }
        });
        keyActiveCounts.clear();
        preserved.forEach((value, id) => keyActiveCounts.set(id, value));
    } else {
        keyActiveCounts.clear();
    }

    const releaseTimer = setTimeout(() => {
        keyMap.forEach((key, id) => {
            if (!excluded.has(id)) {
                key.classList.remove("active");
            }
        });
        activeKeyTimers.delete(releaseTimer);
    }, 80);
    activeKeyTimers.add(releaseTimer);

    if (revealTimer) {
        clearTimeout(revealTimer);
        revealTimer = null;
    }
    revealTimers.forEach((timer) => clearTimeout(timer));
    revealTimers.length = 0;
    revealSequenceId += 1;
    revealPlaying = false;
};

const stopNotesById = (noteIds, options = {}) => {
    if (!noteIds?.length || !activeVoices.size) return;
    const include = new Set(noteIds);
    const voices = [];

    include.forEach((noteId) => {
        const set = activeVoicesById.get(noteId);
        if (!set) return;
        set.forEach((voice) => voices.push(voice));
    });

    releaseVoices(voices, options.releaseRateOverride ?? null);
};

const abortPlayback = (excludeIds = []) => {
    stopAllNotes({ releaseRateOverride: ABORT_RELEASE_RATE, excludeIds });
};

const getSoundfontEnvelope = (soundfont, requestedDuration) => {
    const base = soundfont.baseAdsr ?? AUDIO_DEFAULT_SOUNDFONT_ENVELOPE;
    const trim = state.adsrTrim ?? DEFAULTS.adsrTrim;
    if (typeof AUDIO_ENVELOPE_API.resolveEnvelopeMetrics === "function") {
        return AUDIO_ENVELOPE_API.resolveEnvelopeMetrics({
            baseEnvelope: base,
            trim,
            requestedDuration
        });
    }
    return {
        attack: clampValue(base.attack, 0.003, 0.18),
        decay: clampValue(base.decay, 0.08, 3.2),
        sustain: clampValue(base.sustain, 0.04, 1),
        release: clampValue(base.release, 0.08, 4.5),
        holdDuration: clampValue(requestedDuration, 0.06, 8)
    };
};

const scheduleSampleEnvelope = (gainNode, startTime, peakLevel, envelope) => {
    const attackEnd = startTime + envelope.attack;
    const decayEnd = attackEnd + envelope.decay;
    const holdEnd = Math.max(startTime + envelope.holdDuration, decayEnd);
    const releaseEnd = holdEnd + envelope.release;

    gainNode.gain.cancelScheduledValues(startTime);
    gainNode.gain.setValueAtTime(MIN_ENVELOPE_GAIN, startTime);
    gainNode.gain.linearRampToValueAtTime(Math.max(MIN_ENVELOPE_GAIN, peakLevel), attackEnd);
    gainNode.gain.exponentialRampToValueAtTime(
        Math.max(MIN_ENVELOPE_GAIN, peakLevel * envelope.sustain),
        decayEnd
    );
    gainNode.gain.setValueAtTime(Math.max(MIN_ENVELOPE_GAIN, peakLevel * envelope.sustain), holdEnd);
    gainNode.gain.exponentialRampToValueAtTime(MIN_ENVELOPE_GAIN, releaseEnd);

    return releaseEnd;
};

const createGeneratedSampleBuffer = (ctx, midi, generatedSpec) => {
    const sampleRate = ctx.sampleRate;
    const duration = 3.2;
    const length = Math.floor(sampleRate * duration);
    const buffer = ctx.createBuffer(1, length, sampleRate);
    const channel = buffer.getChannelData(0);
    const frequency = 440 * Math.pow(2, (midi - 69) / 12);
    const harmonics = Array.isArray(generatedSpec?.harmonics) && generatedSpec.harmonics.length
        ? generatedSpec.harmonics
        : [{ ratio: 1, gain: 1, decay: 2 }];
    const noiseAmount = Number.isFinite(generatedSpec?.noise) ? generatedSpec.noise : 0.01;

    for (let i = 0; i < length; i += 1) {
        const t = i / sampleRate;
        let value = 0;
        harmonics.forEach((harmonic) => {
            const ratio = Number.isFinite(harmonic.ratio) ? harmonic.ratio : 1;
            const gain = Number.isFinite(harmonic.gain) ? harmonic.gain : 0;
            const decay = Number.isFinite(harmonic.decay) ? harmonic.decay : 1.5;
            const env = Math.exp(-t / Math.max(0.08, decay));
            value += Math.sin(2 * Math.PI * frequency * ratio * t) * gain * env;
        });

        value += (Math.random() * 2 - 1) * noiseAmount * Math.exp(-t / 0.07);
        channel[i] = value;
    }

    let maxAmp = 0;
    for (let i = 0; i < length; i += 1) {
        maxAmp = Math.max(maxAmp, Math.abs(channel[i]));
    }

    const norm = maxAmp > 0 ? 1 / maxAmp : 1;
    const fadeSamples = Math.floor(sampleRate * 0.02);
    for (let i = 0; i < length; i += 1) {
        channel[i] *= norm * 0.7;
        if (i >= length - fadeSamples) {
            const fade = (length - i) / fadeSamples;
            channel[i] *= Math.max(0, fade);
        }
    }

    return buffer;
};

const buildGeneratedSampleSet = (ctx, soundfont) => {
    const generated = soundfont.generated ?? {};
    const entries = [];
    for (let midi = 33; midi <= 99; midi += 3) {
        entries.push({
            midi,
            buffer: createGeneratedSampleBuffer(ctx, midi, generated)
        });
    }
    return entries;
};

const decodeAudioBuffer = async (ctx, url) => {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
        throw new Error(`Failed to fetch sample: ${url}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return await ctx.decodeAudioData(arrayBuffer);
};

const buildExternalSampleSet = async (ctx, soundfont) => {
    const sampleEntries = normalizeSampleEntries(soundfont.samples ?? soundfont.sampleMap, "");
    if (!sampleEntries.length) {
        return [];
    }

    const loaded = await Promise.allSettled(
        sampleEntries.map(async (entry) => {
            const buffer = await decodeAudioBuffer(ctx, entry.url);
            return {
                midi: entry.midi,
                buffer,
                url: entry.url
            };
        })
    );

    return loaded
        .filter((item) => item.status === "fulfilled")
        .map((item) => item.value)
        .sort((a, b) => a.midi - b.midi);
};

const applySf2TrimGenerators = (synth) => {
    const trim = state.adsrTrim ?? DEFAULTS.adsrTrim;
    const attackOffset = Math.round(trim.attack * SF2_ATTACK_TIMECENTS_TRIM);
    const decayOffset = Math.round(trim.decay * SF2_DECAY_TIMECENTS_TRIM);
    const releaseOffset = Math.round(trim.release * SF2_RELEASE_TIMECENTS_TRIM);
    synth.setGenerator(SF2_CHANNEL, SF2_ATTACK_GEN, attackOffset);
    synth.setGenerator(SF2_CHANNEL, SF2_DECAY_GEN, decayOffset);
    synth.setGenerator(SF2_CHANNEL, SF2_RELEASE_GEN, releaseOffset);
};

const getSf2NoteDuration = (requestedDuration) => {
    if (typeof AUDIO_ENVELOPE_API.resolveEnvelopeMetrics === "function") {
        return AUDIO_ENVELOPE_API.resolveEnvelopeMetrics({
            trim: state.adsrTrim ?? DEFAULTS.adsrTrim,
            requestedDuration
        }).holdDuration;
    }
    const trim = state.adsrTrim ?? DEFAULTS.adsrTrim;
    const lengthMul = 1 + trim.length * AUDIO_ADSR_TRIM_STRENGTH.length;
    return clampValue(requestedDuration * lengthMul, 0.06, 8);
};

const ensureSf2PresetReady = async (soundfont) => {
    const sf2Config = soundfont.sf2;
    if (!sf2Config?.path) return null;
    const pack = await loadSf2Pack(sf2Config.path);
    return {
        type: "sf2",
        id: soundfont.id,
        ready: true,
        sf2Path: sf2Config.path,
        sfontId: pack.sfontId,
        bank: Number.isFinite(sf2Config.bank) ? sf2Config.bank : 0,
        program: Number.isFinite(sf2Config.program) ? sf2Config.program : 0,
        synth: sf2Runtime.synth
    };
};

const ensureSoundfontReady = async (soundfontId = null) => {
    const soundfont = getSelectedSoundfont(soundfontId);
    if (!soundfont) return null;
    const id = soundfont.id;

    if (soundfont.engine === "sf2" && soundfont.sf2?.path) {
        const existingSf2 = soundfontCache.get(id);
        if (existingSf2?.ready && existingSf2.type === "sf2") {
            return existingSf2;
        }
        if (existingSf2?.loadingPromise) {
            return existingSf2.loadingPromise;
        }
        const sf2Entry = existingSf2 ?? {
            id,
            type: "sf2",
            ready: false,
            loadingPromise: null,
            error: null
        };
        sf2Entry.loadingPromise = ensureSf2PresetReady(soundfont)
            .then((resolved) => {
                if (!resolved) {
                    throw new Error(`Failed to prepare SF2 preset '${id}'.`);
                }
                Object.assign(sf2Entry, resolved, { ready: true, error: null });
                return sf2Entry;
            })
            .catch((error) => {
                sf2Entry.ready = false;
                sf2Entry.error = error;
                console.warn(error);
                return null;
            })
            .finally(() => {
                sf2Entry.loadingPromise = null;
            });
        soundfontCache.set(id, sf2Entry);
        return sf2Entry.loadingPromise;
    }

    const existing = soundfontCache.get(id);
    if (existing?.ready) {
        return existing;
    }
    if (existing?.loadingPromise) {
        return existing.loadingPromise;
    }

    const entry = existing ?? { id, ready: false, loadingPromise: null, samples: [], error: null };

    entry.loadingPromise = (async () => {
        const ctx = ensureAudio();
        const samples = soundfont.generated
            ? buildGeneratedSampleSet(ctx, soundfont)
            : await buildExternalSampleSet(ctx, soundfont);

        if (!samples.length) {
            throw new Error(`No playable samples for soundfont '${id}'.`);
        }

        entry.samples = samples;
        entry.ready = true;
        entry.error = null;
        return entry;
    })().catch((error) => {
        entry.ready = false;
        entry.error = error;
        console.warn(error);
        return null;
    }).finally(() => {
        entry.loadingPromise = null;
    });

    soundfontCache.set(id, entry);
    return entry.loadingPromise;
};

const findNearestSample = (samples, midi) => {
    if (!samples.length) return null;
    let best = samples[0];
    let bestDist = Math.abs(best.midi - midi);
    for (let i = 1; i < samples.length; i += 1) {
        const candidate = samples[i];
        const dist = Math.abs(candidate.midi - midi);
        if (dist < bestDist) {
            best = candidate;
            bestDist = dist;
        }
    }
    return best;
};

const scheduleSf2Note = (cacheEntry, soundfont, midi, startTime, duration, volume, noteId) => {
    if (!cacheEntry?.ready || cacheEntry.type !== "sf2") return;
    const synth = cacheEntry.synth ?? sf2Runtime.synth;
    if (!synth) return;

    synth.midiProgramSelect(SF2_CHANNEL, cacheEntry.sfontId, cacheEntry.bank, cacheEntry.program);
    applySf2TrimGenerators(synth);

    const velocityCurve = Number.isFinite(soundfont.velocityCurve) ? soundfont.velocityCurve : AUDIO_DEFAULT_VELOCITY_CURVE;
    const volumeScale = Number.isFinite(soundfont.volume) ? soundfont.volume : 1;
    const velocity = clampValue(
        Math.round(Math.pow(clampValue(volume, 0, 1), velocityCurve) * volumeScale * 127),
        1,
        110
    );
    const holdSeconds = getSf2NoteDuration(duration);
    const releaseTrim = state.adsrTrim?.release ?? 0;
    const releaseSeconds = clampValue(0.22 * (1 + releaseTrim * 0.9), 0.05, 1.8);
    const ctx = ensureAudio();
    const startDelayMs = Math.max(0, Math.round((startTime - ctx.currentTime) * 1000));

    const voice = {
        type: "sf2",
        synth,
        channel: SF2_CHANNEL,
        key: midi,
        noteId,
        releaseSeconds,
        releasing: false,
        stopTimer: null,
        disposed: false,
        started: false,
        onTimer: null,
        offTimer: null
    };

    activeVoices.add(voice);
    if (noteId) {
        getSourceEntry(noteId).add(voice);
    }

    const noteOff = () => {
        if (voice.disposed || !voice.started) return;
        voice.synth.midiNoteOff(voice.channel, voice.key);
        voice.started = false;
        const ttl = Math.max(40, Math.round(releaseSeconds * 1000) + 80);
        voice.stopTimer = setTimeout(() => removeVoice(voice), ttl);
    };

    voice.onTimer = setTimeout(() => {
        if (voice.disposed || voice.releasing) return;
        voice.started = true;
        voice.synth.midiNoteOn(voice.channel, voice.key, velocity);
        voice.offTimer = setTimeout(noteOff, Math.max(20, Math.round(holdSeconds * 1000)));
    }, startDelayMs);
};

const playPianoNote = (
    frequency,
    startTime,
    duration = state.noteDuration,
    volume = 0.8,
    noteId = null,
    presetKey = null
) => {
    const ctx = ensureAudio();
    const soundfont = getSelectedSoundfont(presetKey);
    if (!soundfont) return;

    if (noteId && activeVoicesById.has(noteId)) {
        stopNotesById([noteId], { releaseRateOverride: ABORT_RELEASE_RATE });
    }

    const start = Math.max(ctx.currentTime, startTime ?? ctx.currentTime);
    const targetMidi = noteId && noteMap.has(noteId) ? noteMap.get(noteId).midi : frequencyToMidi(frequency);

    const scheduleWithEntry = (cacheEntry, scheduledStart) => {
        if (cacheEntry?.type === "sf2") {
            scheduleSf2Note(cacheEntry, soundfont, targetMidi, scheduledStart, duration, volume, noteId);
            return;
        }
        if (!cacheEntry?.ready || !cacheEntry.samples.length) return;
        const sample = findNearestSample(cacheEntry.samples, targetMidi);
        if (!sample) return;

        const source = ctx.createBufferSource();
        source.buffer = sample.buffer;
        source.playbackRate.value = Math.pow(2, (targetMidi - sample.midi) / 12);

        const gainNode = ctx.createGain();
        const velocityCurve = Number.isFinite(soundfont.velocityCurve) ? soundfont.velocityCurve : AUDIO_DEFAULT_VELOCITY_CURVE;
        const volumeScale = Number.isFinite(soundfont.volume) ? soundfont.volume : 1;
        const peakLevel = Math.max(MIN_ENVELOPE_GAIN, Math.pow(clampValue(volume, 0, 1), velocityCurve) * volumeScale);

        const envelope = getSoundfontEnvelope(soundfont, duration);
        const releaseEnd = scheduleSampleEnvelope(gainNode, scheduledStart, peakLevel, envelope);

        source.connect(gainNode);
        gainNode.connect(masterGain);

        source.start(scheduledStart);
        source.stop(releaseEnd + 0.05);

        const voice = {
            source,
            gainNode,
            noteId,
            releaseSeconds: envelope.release,
            releasing: false,
            stopTimer: null,
            disposed: false
        };

        activeVoices.add(voice);
        if (noteId) {
            getSourceEntry(noteId).add(voice);
        }

        source.addEventListener("ended", () => {
            removeVoice(voice);
        });
    };

    const cached = soundfontCache.get(soundfont.id);
    if (cached?.ready) {
        scheduleWithEntry(cached, start);
        return;
    }

    ensureSoundfontReady(soundfont.id).then((entry) => {
        if (!entry?.ready) return;
        const safeStart = Math.max(ensureAudio().currentTime + SCHEDULE_LEAD, start);
        scheduleWithEntry(entry, safeStart);
    });
};

const registerKeyTimer = (noteId, timerId) => {
    activeKeyTimers.add(timerId);
    if (!noteId) return;
    if (!keyTimersByNote.has(noteId)) {
        keyTimersByNote.set(noteId, new Set());
    }
    keyTimersByNote.get(noteId).add(timerId);
};

const unregisterKeyTimer = (noteId, timerId) => {
    activeKeyTimers.delete(timerId);
    if (!noteId) return;
    const timers = keyTimersByNote.get(noteId);
    if (!timers) return;
    timers.delete(timerId);
    if (!timers.size) {
        keyTimersByNote.delete(noteId);
    }
};

const clearKeyTimersForNote = (noteId) => {
    const timers = keyTimersByNote.get(noteId);
    if (!timers) return;
    timers.forEach((timerId) => {
        clearTimeout(timerId);
        activeKeyTimers.delete(timerId);
    });
    keyTimersByNote.delete(noteId);
};

const activateKey = (noteId) => {
    const key = keyMap.get(noteId);
    if (!key) return;
    key.classList.add("active");
    const count = keyActiveCounts.get(noteId) ?? 0;
    keyActiveCounts.set(noteId, count + 1);
};

const scheduleKeyRelease = (noteId, delayMs) => {
    const timer = setTimeout(() => {
        const current = (keyActiveCounts.get(noteId) ?? 1) - 1;
        if (current <= 0) {
            keyActiveCounts.delete(noteId);
            const key = keyMap.get(noteId);
            if (key) key.classList.remove("active");
        } else {
            keyActiveCounts.set(noteId, current);
        }
        unregisterKeyTimer(noteId, timer);
    }, delayMs);
    registerKeyTimer(noteId, timer);
};

const scheduleKeyAnimation = (noteId, delaySeconds = 0, holdMs = 360) => {
    const key = keyMap.get(noteId);
    if (!key) return;
    const timer = setTimeout(() => {
        requestAnimationFrame(() => {
            activateKey(noteId);
            scheduleKeyRelease(noteId, holdMs);
            unregisterKeyTimer(noteId, timer);
        });
    }, delaySeconds * 1000);
    registerKeyTimer(noteId, timer);
};

const playNotes = (noteIds, mode, startTime, options = {}) => {
    const ctx = ensureAudio();
    const now = Math.max(ctx.currentTime, startTime ?? ctx.currentTime);
    const ids = [...noteIds];
    const { animate = true, animationDelay, animationHoldMs, preset, _skipReadyGate = false } = options;
    const noteDuration = options.durationOverride ?? state.noteDuration;
    const gainScale = 1;
    const holdMs = animationHoldMs ?? Math.max(MIN_KEY_ANIM_MS, noteDuration * 1000);

    const selectedSoundfont = getSelectedSoundfont(preset);
    if (selectedSoundfont && !_skipReadyGate) {
        const cached = soundfontCache.get(selectedSoundfont.id);
        if (!cached?.ready) {
            void ensureSoundfontReady(selectedSoundfont.id).then((entry) => {
                if (!entry?.ready) return;
                const gateStart = Math.max(ensureAudio().currentTime + SCHEDULE_LEAD, now + 0.02);
                playNotes(ids, mode, gateStart, {
                    ...options,
                    _skipReadyGate: true
                });
            });
            const arpSpan = mode === "ascending" ? ARP_STEP * Math.max(0, ids.length - 1) : 0;
            return noteDuration + arpSpan;
        }
    }

    if (mode === "ascending") {
        ids.sort((a, b) => noteMap.get(a).midi - noteMap.get(b).midi);
        ids.forEach((id, index) => {
            const note = noteMap.get(id);
            const t = now + index * ARP_STEP;
            playPianoNote(note.frequency, t, noteDuration, gainScale, id, preset);
            if (animate) {
                const delay = animationDelay !== undefined ? animationDelay + index * ARP_STEP : t - ctx.currentTime;
                scheduleKeyAnimation(id, delay, holdMs);
            }
        });
        return noteDuration + ARP_STEP * Math.max(0, ids.length - 1);
    }

    ids.forEach((id) => {
        const note = noteMap.get(id);
        playPianoNote(note.frequency, now, noteDuration, gainScale, id, preset);
        if (animate) {
            const delay = animationDelay !== undefined ? animationDelay : now - ctx.currentTime;
            scheduleKeyAnimation(id, delay, holdMs);
        }
    });

    return noteDuration;
};

const playNotesNow = (noteIds, mode, options = {}) => {
    const ctx = ensureAudio();
    return playNotes(noteIds, mode, ctx.currentTime + SCHEDULE_LEAD, options);
};

const clearPreviewTimers = () => {
    previewState.timers.forEach((timer) => clearTimeout(timer));
    previewState.timers.clear();
};

const stopPreviewPlayback = () => {
    clearPreviewTimers();
    previewState.playing = false;
    previewState.pedalActive = false;
    if (previewState.pedalOffTimer) {
        clearTimeout(previewState.pedalOffTimer);
        previewState.pedalOffTimer = null;
    }
    if (previewState.pedalOnTimer) {
        clearTimeout(previewState.pedalOnTimer);
        previewState.pedalOnTimer = null;
    }
    pedalIcon.classList.remove("active");

    const pending = Array.from(previewState.pendingNotes);
    if (pending.length) {
        stopNotesById(pending, { releaseRateOverride: ABORT_RELEASE_RATE });
    }
    previewState.pendingNotes.clear();

    const active = Array.from(previewState.activeNotes);
    if (active.length) {
        stopNotesById(active, { releaseRateOverride: ABORT_RELEASE_RATE });
        active.forEach((noteId) => scheduleKeyRelease(noteId, 0));
    }
    previewState.activeNotes.clear();
};

const schedulePreviewEvent = (delayMs, fn) => {
    const timer = setTimeout(() => {
        previewState.timers.delete(timer);
        fn();
    }, delayMs);
    previewState.timers.add(timer);
};

const previewNoteOn = (noteId) => {
    if (!noteId) return;
    const ctx = ensureAudio();
    const durationOverride = state.noteDuration + HOLD_MAX_EXTRA;
    playNotes([noteId], "simultaneous", ctx.currentTime + SCHEDULE_LEAD, {
        animate: false,
        durationOverride,
        preset: previewState.preset
    });
    activateKey(noteId);
    previewState.activeNotes.add(noteId);
};

const previewNoteOff = (noteId) => {
    if (!noteId) return;
    scheduleKeyRelease(noteId, SHORT_PRESS_ANIM_MS);
    if (previewState.pedalActive) {
        previewState.pendingNotes.add(noteId);
    } else {
        stopNotesById([noteId]);
    }
    previewState.activeNotes.delete(noteId);
};

const previewPedalOn = () => {
    const now = performance.now();
    const minUpMs = 160;
    const timeSinceOff = now - previewState.pedalOffAt;
    const activate = () => {
        previewState.pedalActive = true;
        previewState.pedalOnAt = performance.now();
        previewState.pedalOnTimer = null;
        pedalIcon.classList.add("active");
    };
    if (previewState.pedalOnTimer) {
        clearTimeout(previewState.pedalOnTimer);
        previewState.pedalOnTimer = null;
    }
    if (timeSinceOff < minUpMs) {
        previewState.pedalOnTimer = setTimeout(activate, minUpMs - timeSinceOff);
        return;
    }
    activate();
};

const previewPedalOff = () => {
    if (!previewState.pedalActive) return;
    if (previewState.pedalOffTimer) {
        clearTimeout(previewState.pedalOffTimer);
        previewState.pedalOffTimer = null;
    }
    previewState.pedalActive = false;
    previewState.pedalOffAt = performance.now();
    pedalIcon.classList.remove("active");
    const pending = Array.from(previewState.pendingNotes);
    if (pending.length) {
        stopNotesById(pending);
    }
    previewState.pendingNotes.clear();
};

const buildPreviewSequence = () => {
    if (!notes.length) return { events: [], totalTime: 0 };
    const tempo = 108;
    const beat = 60 / tempo;
    const step = beat / 2;
    const minMidi = notes[0].midi;
    const maxMidi = notes[notes.length - 1].midi;
    const baseMidi = clamp(
        state.startMidi + Math.floor(state.keyCount * 0.55),
        minMidi + 4,
        maxMidi - 7
    );

    const melodyOffsets = [0, 2, 4, 7, 9, 7, 5, 2, 0, 2, 4, 7, 5, 4, 2, 0];
    const chordRoots = [0, 7, 9, 5];
    const events = [];

    melodyOffsets.forEach((offset, index) => {
        const t = index * step;
        const noteId = getNoteIdByMidi(baseMidi + offset);
        if (!noteId) return;
        events.push({ t, type: "on", noteId });
        events.push({ t: t + step * 1.9, type: "off", noteId });
    });

    chordRoots.forEach((rootOffset, index) => {
        const chordStart = index * 2 * beat;
        if (index > 0) {
            events.push({ t: Math.max(0, chordStart - 0.04), type: "pedalOff" });
        }
        events.push({ t: chordStart, type: "pedalOn" });
        const chordBase = baseMidi - 12 + rootOffset;
        const chordMidis = [chordBase, chordBase + 4, chordBase + 7];
        chordMidis.forEach((midi) => {
            const noteId = getNoteIdByMidi(midi);
            if (!noteId) return;
            events.push({ t: chordStart, type: "on", noteId });
            events.push({ t: chordStart + beat * 1.9, type: "off", noteId });
        });
    });

    const totalTime = melodyOffsets.length * step + step;
    events.push({ t: totalTime + 0.1, type: "pedalOff" });
    return { events, totalTime };
};

Object.assign(App.audio, {
    ensureAudio,
    stopAllNotes,
    stopNotesById,
    abortPlayback,
    playNotes,
    playNotesNow,
    playPianoNote,
    stopPreviewPlayback,
    refreshSoundfontCatalog,
    ensureSoundfontReady,
    refreshSf2PresetBrowserEntries,
    getSf2PresetBrowserEntries,
    selectSf2BrowserPreset,
    getBaseAdsrForProgram
});
