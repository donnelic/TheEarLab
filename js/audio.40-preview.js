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
