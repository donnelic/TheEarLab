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
    if (event.target.checked) {
        setPracticeMode("nice");
    } else if (getEffectivePracticeMode() === "nice") {
        setPracticeMode("random");
    } else {
        state.niceMode = false;
        updateNoteCountMax();
        handleCriticalSettingChange(200);
        updateStatus();
        saveSettings();
    }
});

if (chordRoundsToggle) {
    chordRoundsToggle.addEventListener("change", (event) => {
        setPracticeMode(event.target.checked ? "chord" : "random");
    });
}

if (practiceModeSelect) {
    practiceModeSelect.addEventListener("change", (event) => {
        const value = String(event.target.value ?? "");
        setPracticeMode(value);
    });
}

if (trainingModeSelect) {
    trainingModeSelect.addEventListener("change", (event) => {
        const value = String(event.target.value ?? "");
        const next = ["keyboard", "type", "both"].includes(value) ? value : "keyboard";
        state.trainingMode = next;
        if (getEffectivePracticeMode() !== "chord") {
            state.trainingMode = "keyboard";
        }
        refreshOptionsModeVisibility();
        if (typeof App.game?.clearTypingAutoNext === "function") {
            App.game.clearTypingAutoNext();
        }
        handleCriticalSettingChange(200);
        updateStatus();
        updateKeyStates();
        saveSettings();
    });
}

if (chordDifficultySelect) {
    chordDifficultySelect.addEventListener("change", (event) => {
        const value = String(event.target.value ?? "").trim().toLowerCase();
        state.chordDifficulty = value === "playful"
            ? "voiced"
            : (["easy", "medium", "voiced", "hard"].includes(value)
                ? value
                : DEFAULTS.chordDifficulty);
        if (getIsChordRound()) {
            handleCriticalSettingChange(200);
        }
        updateStatus();
        saveSettings();
    });
}

if (chordExtraHelpersToggle) {
    chordExtraHelpersToggle.addEventListener("change", (event) => {
        state.chordExtraHelpers = Boolean(event.target.checked);
        if (getIsChordRound()) {
            handleCriticalSettingChange(200);
        }
        updateStatus();
        saveSettings();
    });
}

if (typingShowPianoToggle) {
    typingShowPianoToggle.addEventListener("change", (event) => {
        state.typingShowPiano = Boolean(event.target.checked);
        refreshOptionsModeVisibility();
        updateStatus();
        updateKeyStates();
        saveSettings();
    });
}

if (typingShowTypedToggle) {
    typingShowTypedToggle.addEventListener("change", (event) => {
        state.typingShowTyped = Boolean(event.target.checked);
        refreshOptionsModeVisibility();
        if (typeof App.game?.updateTypedPreviewFromInput === "function") {
            App.game.updateTypedPreviewFromInput();
        }
        updateStatus();
        updateKeyStates();
        saveSettings();
    });
}

resetSettingsButton.addEventListener("click", () => {
    resetAllSettings();
    rebuildKeyboard();
    updateNoteCountMax();
    applyUiFromState();
    setVolume(state.volume);
    setPianoTone(state.pianoTone, { save: false, skipProfilePrompts: true });
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
    if (!optionsPanel?.contains(event.target) && !optionsTrigger?.contains(event.target)) {
        closeOptionsPanel();
    }
    if (!advancedPanel.contains(event.target) && !advancedTrigger.contains(event.target)) {
        closeAdvanced();
    }
    if (!pianoPanel?.contains(event.target) && !pianoTrigger?.contains(event.target)) {
        closePianoPanel();
    }
    if (!instrumentBrowserPanel?.contains(event.target) && !instrumentBrowserTrigger?.contains(event.target)) {
        closeInstrumentBrowser();
    }
    event.stopPropagation();
});

if (optionsTrigger) {
    optionsTrigger.addEventListener("click", (event) => {
        event.stopPropagation();
        if (!optionsPanel) return;
        if (optionsPanel.classList.contains("open")) {
            closeOptionsPanel();
        } else {
            openOptionsPanel();
        }
    });
}

if (optionsPanel) {
    optionsPanel.addEventListener("click", (event) => {
        event.stopPropagation();
    });
}

document.addEventListener("click", () => {
    closeSettings();
    closeOptionsPanel();
    closeAdvanced();
    closePianoPanel();
    closeInstrumentBrowser();
});

window.addEventListener("resize", () => {
    updateKeyboardScale();
    if (optionsPanel?.classList.contains("open")) {
        positionOptionsPanel();
    }
    if (advancedPanel?.classList.contains("open")) {
        positionFloatingPanel(advancedPanel, advancedTrigger);
    }
    if (pianoPanel?.classList.contains("open")) {
        positionPianoPanel();
    }
    if (instrumentBrowserPanel?.classList.contains("open")) {
        positionInstrumentBrowserPanel();
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
    const raw = Number.parseInt(event.target.value, 10);
    const next = Number.isFinite(raw) ? raw : Math.round(state.adsrTrim.attack * 100);
    setAdsrTrim("attack", next / 100);
});

decaySlider.addEventListener("input", (event) => {
    const raw = Number.parseInt(event.target.value, 10);
    const next = Number.isFinite(raw) ? raw : Math.round(state.adsrTrim.decay * 100);
    setAdsrTrim("decay", next / 100);
});

releaseSlider.addEventListener("input", (event) => {
    const raw = Number.parseInt(event.target.value, 10);
    const next = Number.isFinite(raw) ? raw : Math.round(state.adsrTrim.release * 100);
    setAdsrTrim("release", next / 100);
});

sustainSlider.addEventListener("input", (event) => {
    const raw = Number.parseInt(event.target.value, 10);
    const next = Number.isFinite(raw) ? raw : Math.round(state.adsrTrim.length * 100);
    setAdsrTrim("length", next / 100);
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

if (chordAnswerInput) {
    chordAnswerInput.addEventListener("input", () => {
        if (typeof App.game?.updateTypedPreviewFromInput === "function") {
            App.game.updateTypedPreviewFromInput();
        }
        updateStatus();
        updateKeyStates();
    });
    chordAnswerInput.addEventListener("keydown", (event) => {
        if (event.code === "Enter" || event.code === "Space") {
            event.preventDefault();
        }
    });
}

if (typingHelpToggle && typingHelpText) {
    typingHelpToggle.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        const show = typingHelpText.hidden;
        typingHelpText.hidden = !show;
        typingHelpToggle.setAttribute("aria-expanded", show ? "true" : "false");
    });
}

const CHORD_TUTORIAL_STEPS = [
    {
        title: "1. Root Note",
        body: "Start with A through G. This is the chord root.",
        examples: ["C", "A", "F"]
    },
    {
        title: "2. Accidentals",
        body: "Add # or b right after the root if needed.",
        examples: ["F#", "Bb", "C#"]
    },
    {
        title: "3. Basic Quality",
        body: "No suffix means major. Use m for minor.",
        examples: ["C = C major", "Cm = C minor", "F#m = F# minor"]
    },
    {
        title: "4. Common Extensions",
        body: "Add 7, maj7, m7, 9, 6 and related forms.",
        examples: ["G7", "Cmaj7", "Dm7", "A9", "F6/9"]
    },
    {
        title: "5. Other Qualities",
        body: "You can also use sus2/sus4, dim, aug and power chords.",
        examples: ["Dsus4", "Bdim", "Eaug", "A5"]
    },
    {
        title: "6. Input Tips",
        body: "Spaces are allowed and aliases are supported. Enter submits. Space previews typed chord if blind mode is off.",
        examples: ["C major 7", "Bb min7", "F sharp minor"]
    }
];

let chordTutorialStepIndex = 0;

const isChordTutorialOpen = () => Boolean(chordTutorialModal && !chordTutorialModal.hidden);

const renderChordTutorialStep = () => {
    if (!chordTutorialStep || !chordTutorialProgress) return;
    const total = CHORD_TUTORIAL_STEPS.length;
    const safeIndex = Math.min(Math.max(chordTutorialStepIndex, 0), Math.max(0, total - 1));
    chordTutorialStepIndex = safeIndex;
    const step = CHORD_TUTORIAL_STEPS[safeIndex];
    if (!step) return;

    const examples = (step.examples || [])
        .map((value) => `<li><code>${value}</code></li>`)
        .join("");
    chordTutorialStep.innerHTML = `
        <div class="tutorial-step-title">${step.title}</div>
        <div class="tutorial-step-body">${step.body}</div>
        <ul class="tutorial-example-list">${examples}</ul>
    `;
    chordTutorialProgress.textContent = `Step ${safeIndex + 1}/${total}`;
    if (chordTutorialPrev) chordTutorialPrev.disabled = safeIndex <= 0;
    if (chordTutorialNext) chordTutorialNext.textContent = safeIndex >= total - 1 ? "Done" : "Next";
};

const closeChordTutorial = () => {
    if (!chordTutorialModal) return;
    chordTutorialModal.hidden = true;
    chordTutorialModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("tutorial-open");
    if (chordTutorialOpen && typeof chordTutorialOpen.focus === "function") {
        chordTutorialOpen.focus();
    }
};

const openChordTutorial = (stepIndex = 0) => {
    if (!chordTutorialModal) return;
    chordTutorialStepIndex = Number.isFinite(stepIndex) ? stepIndex : 0;
    renderChordTutorialStep();
    chordTutorialModal.hidden = false;
    chordTutorialModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("tutorial-open");
};

if (chordTutorialOpen) {
    chordTutorialOpen.addEventListener("click", (event) => {
        event.preventDefault();
        openChordTutorial(0);
    });
}

if (chordTutorialClose) {
    chordTutorialClose.addEventListener("click", (event) => {
        event.preventDefault();
        closeChordTutorial();
    });
}

if (chordTutorialBackdrop) {
    chordTutorialBackdrop.addEventListener("click", () => {
        closeChordTutorial();
    });
}

if (chordTutorialPrev) {
    chordTutorialPrev.addEventListener("click", () => {
        chordTutorialStepIndex = Math.max(0, chordTutorialStepIndex - 1);
        renderChordTutorialStep();
    });
}

if (chordTutorialNext) {
    chordTutorialNext.addEventListener("click", () => {
        if (chordTutorialStepIndex >= CHORD_TUTORIAL_STEPS.length - 1) {
            closeChordTutorial();
            return;
        }
        chordTutorialStepIndex += 1;
        renderChordTutorialStep();
    });
}

const isChordTypingCaptureActive = () => {
    if (!state.active || state.submitted) return false;
    if (!typingZone || typingZone.hidden) return false;
    if (!getIsChordRound()) return false;
    return state.trainingMode === "type" || state.trainingMode === "both";
};

const insertTypedCharacter = (character) => {
    if (!chordAnswerInput) return;
    chordAnswerInput.focus();
    const start = Number.isFinite(chordAnswerInput.selectionStart) ? chordAnswerInput.selectionStart : chordAnswerInput.value.length;
    const end = Number.isFinite(chordAnswerInput.selectionEnd) ? chordAnswerInput.selectionEnd : chordAnswerInput.value.length;
    chordAnswerInput.setRangeText(character, start, end, "end");
    chordAnswerInput.dispatchEvent(new Event("input", { bubbles: true }));
};

const tryPlayTypedChordPreview = () => {
    if (typeof App.game?.playTypedInputChord !== "function") return false;
    return App.game.playTypedInputChord();
};

const triggerPrimaryAction = () => {
    if (state.active && !state.submitted) {
        submitAnswer();
    } else {
        startRound(true);
    }
};

const triggerReplayAction = (event) => {
    if (updateReplayAvailability()) {
        if (!event.repeat && !holdState.active) {
            startHeldPlayback();
        }
    }
};

if (homeButton) {
    homeButton.addEventListener("click", () => {
        if (typeof App.settings?.goHome === "function") {
            App.settings.goHome();
        }
    });
}

const heroTitle = document.querySelector(".hero h1");
if (heroTitle) {
    heroTitle.setAttribute("role", "button");
    heroTitle.setAttribute("tabindex", "0");
    heroTitle.classList.add("hero-link");
    const goHomeAction = () => {
        if (typeof App.settings?.goHome === "function") {
            App.settings.goHome();
        }
    };
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
    setAdsrTrim("attack", 0);
});

decaySlider.addEventListener("dblclick", () => {
    setAdsrTrim("decay", 0);
});

releaseSlider.addEventListener("dblclick", () => {
    setAdsrTrim("release", 0);
});

sustainSlider.addEventListener("dblclick", () => {
    setAdsrTrim("length", 0);
});

if (profileSearch) {
    profileSearch.addEventListener("input", () => {
        renderResponseProfileBrowser();
    });
}

if (profileList) {
    profileList.addEventListener("click", (event) => {
        const row = event.target.closest(".profile-row");
        if (!row) return;
        setResponseProfileSelection(row.dataset.key);
    });
    profileList.addEventListener("dblclick", () => {
        applyResponseProfileSelection();
    });
    profileList.addEventListener("keydown", (event) => {
        const row = event.target.closest(".profile-row");
        if (!row) return;
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        setResponseProfileSelection(row.dataset.key);
        applyResponseProfileSelection();
    });
}

if (profileApply) {
    profileApply.addEventListener("click", () => {
        applyResponseProfileSelection();
    });
}

if (profileSave) {
    profileSave.addEventListener("click", () => {
        void promptSaveCurrentResponseProfile();
    });
}

if (instrumentPresetSearch) {
    instrumentPresetSearch.addEventListener("input", () => {
        renderInstrumentPresetBrowser();
    });
}

if (instrumentPresetList) {
    instrumentPresetList.addEventListener("click", (event) => {
        const row = event.target.closest(".sf2-row");
        if (!row) return;
        setInstrumentPresetSelection(row.dataset.key);
    });
    instrumentPresetList.addEventListener("dblclick", () => {
        void applyInstrumentPresetSelection();
    });
    instrumentPresetList.addEventListener("keydown", (event) => {
        const row = event.target.closest(".sf2-row");
        if (!row) return;
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        setInstrumentPresetSelection(row.dataset.key);
        void applyInstrumentPresetSelection();
    });
}

if (instrumentPresetApply) {
    instrumentPresetApply.addEventListener("click", () => {
        void applyInstrumentPresetSelection();
    });
}

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

if (instrumentBrowserTrigger) {
    instrumentBrowserTrigger.addEventListener("click", (event) => {
        event.stopPropagation();
        if (instrumentBrowserPanel.classList.contains("open")) {
            closeInstrumentBrowser();
        } else {
            closeAdvanced();
            closePianoPanel();
            openInstrumentBrowser();
        }
    });
}

if (instrumentBrowserPanel) {
    instrumentBrowserPanel.addEventListener("click", (event) => {
        event.stopPropagation();
    });
}

const bindPianoOptionEvents = () => {
    if (!pianoOptionsContainer) return;

    pianoOptionsContainer.addEventListener("click", (event) => {
        const previewButton = event.target.closest(".piano-preview");
        if (previewButton) {
            event.stopPropagation();
            const tone = previewButton.dataset.piano;
            playPianoPreview(tone);
            return;
        }
        const option = event.target.closest(".piano-option");
        if (!option) return;
        const tone = option.dataset.piano;
        setPianoTone(tone);
    });

    pianoOptionsContainer.addEventListener("keydown", (event) => {
        const option = event.target.closest(".piano-option");
        if (!option) return;
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        const tone = option.dataset.piano;
        setPianoTone(tone);
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
    const isTypingOnly = state.trainingMode === "type";
    const playSound = state.submitted || (!(state.blindMode || isTypingOnly) && !willDeselect);
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
    const chordInputFocused = event.target === chordAnswerInput;
    if (event.code === "Escape" && isChordTutorialOpen()) {
        event.preventDefault();
        closeChordTutorial();
        return;
    }
    if (isChordTutorialOpen()) {
        if (event.code === "ArrowLeft") {
            event.preventDefault();
            if (chordTutorialPrev && !chordTutorialPrev.disabled) {
                chordTutorialPrev.click();
            }
            return;
        }
        if (event.code === "ArrowRight" || event.code === "Enter") {
            event.preventDefault();
            if (chordTutorialNext && !chordTutorialNext.disabled) {
                chordTutorialNext.click();
            }
            return;
        }
        if (event.code !== "Tab") {
            event.preventDefault();
            return;
        }
    }
    if (event.code === "Escape") {
        closeSettings();
        closeOptionsPanel();
        closeAdvanced();
        closePianoPanel();
        closeInstrumentBrowser();
    }

    if (chordInputFocused && event.code === "Space") {
        event.preventDefault();
        if (!tryPlayTypedChordPreview()) {
            triggerReplayAction(event);
        }
        return;
    }

    if (chordInputFocused && event.code === "Enter") {
        event.preventDefault();
        triggerPrimaryAction();
        return;
    }

    if (tag === "INPUT" || tag === "TEXTAREA") return;

    if (isChordTypingCaptureActive() && event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey && event.code !== "Space") {
        event.preventDefault();
        insertTypedCharacter(event.key);
        return;
    }

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
        triggerReplayAction(event);
    }

    if (event.code === "Enter") {
        event.preventDefault();
        triggerPrimaryAction();
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

const init = async () => {
    loadSettings();
    bindPianoOptionEvents();
    setRandomBackgroundAngle();
    renderKeyboard();
    setKeyboardEnabled(true);
    updateNoteCountMax();
    renderPianoOptions();
    applyUiFromState();
    if (typeof App.game?.updateTypedPreviewFromInput === "function") {
        App.game.updateTypedPreviewFromInput();
    }
    setPianoTone(state.pianoTone, { save: false, skipProfilePrompts: true });
    await refreshSoundfontCatalog();
    await refreshInstrumentPresetBrowser();
    refreshResponseProfileBrowser();
    setVolume(state.volume);
    setNoteLength(state.noteDuration);
    setKeyCount(state.keyCount, { delayOverrideMs: 0 });
    updateStatus();
    updateKeyStates();
    updateKeyboardScale();
    void ensureSoundfontReady(state.pianoTone);
};

init().catch((error) => {
    console.error("App initialization failed:", error);
});

Object.assign(App.events, { bindPianoOptionEvents, init, setRandomBackgroundAngle });
