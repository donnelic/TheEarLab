var App = window.App || (window.App = {});
App.events = App.events || {};

noteCountInput.addEventListener("input", (event) => {
    const next = clampNoteCount(event.target.value);
    pendingNoteCount = next;
    noteCountInput.value = String(next);
    noteCountValue.textContent = `${next} notes`;
});

noteCountInput.addEventListener("change", () => {
    commitNoteCountChange();
});

noteCountInput.addEventListener("pointerup", () => {
    commitNoteCountChange();
});

segmentedButtons.forEach((button) => {
    button.addEventListener("click", () => {
        segmentedButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        state.mode = button.dataset.mode;
        saveSettings();
    });
});

blindToggle.addEventListener("change", (event) => {
    state.blindMode = event.target.checked;
    handleCriticalSettingChange(200);
    updateStatus();
    saveSettings();
});

niceNotesToggle.addEventListener("change", (event) => {
    state.niceMode = event.target.checked;
    updateNoteCountMax();
    handleCriticalSettingChange(200);
    updateStatus();
    saveSettings();
});

resetSettingsButton.addEventListener("click", () => {
    resetAllSettings();
    rebuildKeyboard();
    updateNoteCountMax();
    applyUiFromState();
    setVolume(state.volume);
    setPianoTone(state.pianoTone, { save: false });
    setNoteLength(state.noteDuration);
    setKeyCount(state.keyCount, { delayOverrideMs: 0 });
    saveSettings();
    handleCriticalSettingChange(200);
    updateStatus();
});

settingsToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    if (settingsPanel.classList.contains("open")) {
        closeSettings();
    } else {
        openSettings();
    }
});

themeToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    state.theme = state.theme === "dark" ? "light" : "dark";
    document.body.classList.toggle("theme-dark", state.theme === "dark");
    themeToggle.setAttribute("aria-pressed", state.theme === "dark");
    saveSettings();
});

settingsPanel.addEventListener("click", (event) => {
    if (!advancedPanel.contains(event.target) && !advancedTrigger.contains(event.target)) {
        closeAdvanced();
    }
    if (!pianoPanel?.contains(event.target) && !pianoTrigger?.contains(event.target)) {
        closePianoPanel();
    }
    event.stopPropagation();
});

document.addEventListener("click", () => {
    closeSettings();
    closeAdvanced();
    closePianoPanel();
});

window.addEventListener("resize", () => {
    updateKeyboardScale();
    if (advancedPanel?.classList.contains("open")) {
        positionFloatingPanel(advancedPanel, advancedTrigger);
    }
    if (pianoPanel?.classList.contains("open")) {
        positionPianoPanel();
    }
});

playSelectedButton.addEventListener("click", () => {
    playSelectedChord();
});

playSelectedButton.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    startHeldPlayback();
});

playSelectedButton.addEventListener("pointerup", () => {
    releaseHeldPlayback();
});

playSelectedButton.addEventListener("pointerleave", () => {
    releaseHeldPlayback();
});

primaryActionButton.addEventListener("click", () => {
    if (state.active && !state.submitted) {
        submitAnswer();
    } else {
        startRound(true);
    }
});

volumeSlider.addEventListener("input", (event) => {
    const raw = Number.parseFloat(event.target.value);
    const next = Number.isFinite(raw) ? raw : state.volume;
    setVolume(next);
});

lengthSlider.addEventListener("input", (event) => {
    const raw = Number.parseFloat(event.target.value);
    const next = Number.isFinite(raw) ? raw : state.noteDuration;
    setNoteLength(next);
});

attackSlider.addEventListener("input", (event) => {
    const raw = Number.parseFloat(event.target.value);
    const next = Number.isFinite(raw) ? raw : state.adsr.attack;
    setAdsrParam("attack", Math.min(Math.max(next, 0.01), 0.2));
    attackValue.textContent = `${state.adsr.attack.toFixed(3)}s`;
});

decaySlider.addEventListener("input", (event) => {
    const raw = Number.parseFloat(event.target.value);
    const next = Number.isFinite(raw) ? raw : state.adsr.decayRate;
    setAdsrParam("decayRate", Math.min(Math.max(next, 0.1), 2));
    decayValue.textContent = `${state.adsr.decayRate.toFixed(1)}`;
});

releaseSlider.addEventListener("input", (event) => {
    const raw = Number.parseFloat(event.target.value);
    const next = Number.isFinite(raw) ? raw : state.adsr.releaseRate;
    setAdsrParam("releaseRate", Math.min(Math.max(next, 5), 30));
    releaseValue.textContent = `${state.adsr.releaseRate.toFixed(0)}`;
});

sustainSlider.addEventListener("input", (event) => {
    const raw = Number.parseFloat(event.target.value);
    const next = Number.isFinite(raw) ? raw : state.noteDuration;
    setNoteLength(next);
});

keyCountSlider.addEventListener("input", (event) => {
    const raw = Number.parseInt(event.target.value, 10);
    const next = Number.isFinite(raw) ? raw : state.keyCount;
    pendingKeyCount = next;
    setKeyCount(next, { preview: true });
});

keyCountSlider.addEventListener("change", () => {
    commitCriticalChange();
});

keyCountSlider.addEventListener("pointerup", () => {
    commitCriticalChange();
});

hintButton.addEventListener("click", () => {
    playTarget();
});

if (homeButton) {
    homeButton.addEventListener("click", () => {
        goHome();
    });
}

const heroTitle = document.querySelector(".hero h1");
if (heroTitle) {
    heroTitle.setAttribute("role", "button");
    heroTitle.setAttribute("tabindex", "0");
    heroTitle.classList.add("hero-link");
    const goHomeAction = () => goHome();
    heroTitle.addEventListener("click", goHomeAction);
    heroTitle.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            goHomeAction();
        }
    });
}

volumeSlider.addEventListener("dblclick", () => {
    setVolume(DEFAULTS.volume);
});

lengthSlider.addEventListener("dblclick", () => {
    setNoteLength(DEFAULTS.noteDuration);
});

keyCountSlider.addEventListener("dblclick", () => {
    pendingKeyCount = DEFAULTS.keyCount;
    setKeyCount(DEFAULTS.keyCount);
});

if (startNoteDownButton && startNoteUpButton && startNoteValue) {
    startNoteDownButton.addEventListener("click", () => {
        setStartMidi(state.startMidi - 1);
    });
    startNoteUpButton.addEventListener("click", () => {
        setStartMidi(state.startMidi + 1);
    });
}

if (startNoteDownOctButton && startNoteUpOctButton) {
    startNoteDownOctButton.addEventListener("click", () => {
        setStartMidi(state.startMidi - 12);
    });
    startNoteUpOctButton.addEventListener("click", () => {
        setStartMidi(state.startMidi + 12);
    });
}

noteCountInput.addEventListener("dblclick", () => {
    state.noteCount = DEFAULTS.noteCount;
    noteCountInput.value = String(DEFAULTS.noteCount);
    noteCountValue.textContent = `${DEFAULTS.noteCount} notes`;
    handleCriticalSettingChange();
    saveSettings();
});

attackSlider.addEventListener("dblclick", () => {
    setAdsrParam("attack", DEFAULTS.adsr.attack);
    attackValue.textContent = `${state.adsr.attack.toFixed(3)}s`;
});

decaySlider.addEventListener("dblclick", () => {
    setAdsrParam("decayRate", DEFAULTS.adsr.decayRate);
    decayValue.textContent = `${state.adsr.decayRate.toFixed(1)}`;
});

releaseSlider.addEventListener("dblclick", () => {
    setAdsrParam("releaseRate", DEFAULTS.adsr.releaseRate);
    releaseValue.textContent = `${state.adsr.releaseRate.toFixed(0)}`;
});

sustainSlider.addEventListener("dblclick", () => {
    setNoteLength(DEFAULTS.noteDuration);
});

advancedTrigger.addEventListener("click", (event) => {
    event.stopPropagation();
    if (advancedPanel.classList.contains("open")) {
        closeAdvanced();
    } else {
        openAdvanced();
    }
});

advancedPanel.addEventListener("click", (event) => {
    event.stopPropagation();
});

if (pianoTrigger) {
    pianoTrigger.addEventListener("click", (event) => {
        event.stopPropagation();
        if (pianoPanel.classList.contains("open")) {
            closePianoPanel();
        } else {
            closeAdvanced();
            openPianoPanel();
        }
    });
}

if (pianoPanel) {
    pianoPanel.addEventListener("click", (event) => {
        event.stopPropagation();
    });
}

const bindPianoOptionEvents = () => {
    pianoOptions.forEach((option) => {
        option.addEventListener("click", (event) => {
            if (event.target.closest(".piano-preview")) return;
            const tone = option.dataset.piano;
            setPianoTone(tone);
        });
        option.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                const tone = option.dataset.piano;
                setPianoTone(tone);
            }
        });
    });

    pianoPreviewButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.stopPropagation();
            const tone = button.dataset.piano;
            playPianoPreview(tone);
        });
    });
};

if (pianoPreviewMain) {
    pianoPreviewMain.addEventListener("click", (event) => {
        event.stopPropagation();
        playPianoPreview(state.pianoTone);
    });
}

if (testEnvelopeButton) {
    testEnvelopeButton.addEventListener("click", () => {
        playPianoPreview(state.pianoTone);
    });
}

keyboardEl.addEventListener("pointerdown", (event) => {
    const key = event.target.closest(".key");
    if (!key) return;
    const noteId = key.dataset.note;
    pointerActiveNotes.set(event.pointerId, noteId);
    event.preventDefault();

    if (keyboardEl.classList.contains("disabled")) {
        return;
    }

    if (!state.active) {
        startManualNote(noteId, { playSound: true });
        return;
    }

    const willDeselect = !state.submitted && state.selectedNotes.includes(noteId);
    if (willDeselect) {
        toggleSelection(noteId);
        return;
    }
    const playSound = state.submitted || (!state.blindMode && !willDeselect);
    if (state.submitted && revealPlaying) {
        abortPlayback([noteId]);
    }
    startManualNote(noteId, { playSound });
    if (!state.submitted) {
        toggleSelection(noteId);
    }
});

document.addEventListener("pointerup", (event) => {
    const noteId = pointerActiveNotes.get(event.pointerId);
    if (!noteId) return;
    releaseManualNote(noteId);
    pointerActiveNotes.delete(event.pointerId);
});

document.addEventListener("pointercancel", (event) => {
    const noteId = pointerActiveNotes.get(event.pointerId);
    if (!noteId) return;
    releaseManualNote(noteId);
    pointerActiveNotes.delete(event.pointerId);
});

keyboardEl.addEventListener("click", (event) => {
    event.preventDefault();
});

document.addEventListener("keydown", (event) => {
    const tag = event.target.tagName;
    if (event.code === "Escape") {
        closeSettings();
        closeAdvanced();
        closePianoPanel();
    }
    if (tag === "INPUT" || tag === "TEXTAREA") return;

    if (!state.active && (event.code === "ShiftLeft" || event.code === "ShiftRight" || event.code === "ControlLeft" || event.code === "ControlRight")) {
        if (previewState.playing) {
            return;
        }
        pedalState.keysDown.add(event.code);
        if (!pedalState.active) {
            pedalState.active = true;
            pedalIcon.classList.add("active");
        }
    }

    if (event.code === "Space") {
        event.preventDefault();
        if (updateReplayAvailability()) {
            if (!event.repeat && !holdState.active) {
                startHeldPlayback();
            }
        }
    }

    if (event.code === "Enter") {
        event.preventDefault();
        if (state.active && !state.submitted) {
            submitAnswer();
        } else {
            startRound(true);
        }
    }
});

document.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
        releaseHeldPlayback();
    }
    if (!state.active && (event.code === "ShiftLeft" || event.code === "ShiftRight" || event.code === "ControlLeft" || event.code === "ControlRight")) {
        if (previewState.playing) {
            return;
        }
        pedalState.keysDown.delete(event.code);
        if (!pedalState.keysDown.size) {
            pedalState.active = false;
            pedalIcon.classList.remove("active");
            releasePedalNotes();
        }
    }
});

const pedalBox = document.querySelector(".pedal-box");
if (pedalBox) {
    pedalBox.addEventListener("pointerdown", (event) => {
        if (state.active || previewState.playing) return;
        event.preventDefault();
        if (typeof pedalBox.setPointerCapture === "function") {
            pedalBox.setPointerCapture(event.pointerId);
        }
        startPedalHold();
    });
    pedalBox.addEventListener("pointerup", (event) => {
        if (state.active || previewState.playing) return;
        event.preventDefault();
        stopPedalHold();
        if (typeof pedalBox.releasePointerCapture === "function") {
            pedalBox.releasePointerCapture(event.pointerId);
        }
    });
    pedalBox.addEventListener("pointercancel", (event) => {
        if (state.active || previewState.playing) return;
        stopPedalHold();
        if (typeof pedalBox.releasePointerCapture === "function") {
            pedalBox.releasePointerCapture(event.pointerId);
        }
    });
    pedalBox.addEventListener("pointerleave", () => {
        if (state.active || previewState.playing) return;
        stopPedalHold();
    });
}

const setRandomBackgroundAngle = () => {
    const angle = Math.floor(Math.random() * 360);
    document.documentElement.style.setProperty("--bg-angle", `${angle}deg`);
};

const init = () => {
    loadSettings();
    renderPianoOptions();
    bindPianoOptionEvents();
    setRandomBackgroundAngle();
    renderKeyboard();
    setKeyboardEnabled(true);
    updateNoteCountMax();
    applyUiFromState();
    setVolume(state.volume);
    setNoteLength(state.noteDuration);
    setKeyCount(state.keyCount, { delayOverrideMs: 0 });
    updateStatus();
    updateKeyStates();
    updateKeyboardScale();
};

init();

Object.assign(App.events, { bindPianoOptionEvents, init, setRandomBackgroundAngle });
