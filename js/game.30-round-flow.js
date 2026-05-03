const setSubmitted = (value) => {
    applySubmissionStatePatch({ submitted: Boolean(value) }, "submission/set-submitted");
    if (!value) {
        resultEl.textContent = "";
        revealEl.textContent = "";
    }
    updatePrimaryAction();
};

const goHome = () => {
    abortPlayback();
    clearTypingAutoNext();
    if (typeof App.settings?.clearPendingCriticalRestart === "function") {
        App.settings.clearPendingCriticalRestart();
    }

    if (keyboardUnlockTimer) {
        clearTimeout(keyboardUnlockTimer);
        keyboardUnlockTimer = null;
    }

    if (holdState.holdTimer) {
        clearTimeout(holdState.holdTimer);
        holdState.holdTimer = null;
    }
    if (holdState.noteIds.length) {
        stopNotesById(holdState.noteIds);
        holdState.noteIds.forEach((noteId) => scheduleKeyRelease(noteId, 0));
    }
    holdState.active = false;
    holdState.holding = false;
    holdState.noteIds = [];

    if (pedalState.active || pedalState.keysDown.size || pedalState.pending.size) {
        pedalState.active = false;
        pedalState.keysDown.clear();
        releasePedalNotes();
        pedalIcon.classList.remove("active");
    }

    applyRoundStatePatch({
        active: false,
        hintUsed: false,
        selectedNotes: [],
        selectedChordLabel: "",
        submissionSource: null,
        submittedComparisonNotes: [],
        targetNotes: [],
        targetChord: null,
        sheetClef: null,
        sheetNotation: null,
        typedAnswer: "",
        typedPreviewNotes: [],
        rootHintSuppressed: false
    }, "round/go-home");
    if (chordAnswerInput) {
        chordAnswerInput.value = "";
    }

    setSubmitted(false);
    setKeyboardEnabled(true);
    updateStatus();
    updateKeyStates();
};

const refreshTarget = () => {
    if (!state.active) {
        updateStatus();
        updateKeyStates();
        return;
    }
    applyRoundStatePatch({
        selectedNotes: [],
        selectedChordLabel: "",
        submissionSource: null,
        submittedComparisonNotes: [],
        rootHintSuppressed: false,
        sheetClef: null,
        sheetNotation: null
    }, "round/refresh-target");
    setSubmitted(false);
    createTarget();
    if (isTypingEnabled()) {
        applySubmissionStatePatch({
            typedAnswer: "",
            typedPreviewNotes: []
        }, "submission/refresh-target-reset-typed");
        if (chordAnswerInput) {
            chordAnswerInput.value = "";
        }
    }
    updateStatus();
    updateKeyStates();
};

const startRound = async (shouldPlay = false) => {
    if (shouldPlay && roundStartInProgress) {
        return;
    }
    const token = ++roundStartToken;
    if (shouldPlay) {
        roundStartInProgress = true;
    }
    try {
        abortPlayback();
        clearTypingAutoNext();

        const playOnStart = shouldPlay && !getIsSheetRound();

        if (playOnStart) {
            await waitForMs(ROUND_TRANSITION_PAUSE_MS);
            if (token !== roundStartToken) {
                return;
            }
            const isReady = await ensureRoundPlaybackReady();
            if (token !== roundStartToken) {
                return;
            }
            if (!isReady) {
                resultEl.textContent = ACTION_COPY.instrumentStillLoading
                    || "Instrument is still loading. Please try again in a moment.";
                return;
            }
        }

        applyRoundStatePatch({
            round: state.active ? state.round + 1 : 1,
            active: true,
            hintUsed: false,
            selectedNotes: [],
            selectedChordLabel: "",
            submissionSource: null,
            submittedComparisonNotes: [],
            sheetClef: null,
            sheetNotation: null,
            rootHintSuppressed: false
        }, "round/start");
        setSubmitted(false);
        createTarget();
        if (isTypingEnabled()) {
            applySubmissionStatePatch({
                typedAnswer: "",
                typedPreviewNotes: []
            }, "submission/start-round-reset-typed");
            if (chordAnswerInput) {
                chordAnswerInput.value = "";
                if (state.active) {
                    chordAnswerInput.focus();
                }
            }
        }
        setKeyboardEnabled(!isTypingOnlyMode());
        updateStatus();
        updateKeyStates();
        pendingCriticalRestart = false;
        if (playOnStart) {
            if (token !== roundStartToken || !state.active) {
                return;
            }
            const ctx = ensureAudio();
            if (!isTypingOnlyMode()) {
                lockKeyboardForPlayback(state.targetNotes, state.mode);
            }
            playConsistentPreview(state.targetNotes, state.mode, {
                startTime: ctx.currentTime + ROUND_START_DELAY,
                animate: false
            });
        } else {
            setKeyboardEnabled(!isTypingOnlyMode());
        }
    } finally {
        if (shouldPlay) {
            roundStartInProgress = false;
        }
    }
};

const ensureRound = () => {
    if (!state.active) {
        updateStatus();
        return false;
    }
    if (!state.targetNotes.length) {
        refreshTarget();
    }
    return true;
};

const playTarget = () => {
    if (!state.active) {
        void startRound(true);
        return;
    }
    applyRoundStatePatch({ hintUsed: true }, "round/hint-used");
    updateStatus();
    if (!isTypingOnlyMode()) {
        lockKeyboardForPlayback(state.targetNotes, state.mode);
    }
    playConsistentPreview(state.targetNotes, state.mode, {
        animate: state.submitted,
        animationHoldMs: state.submitted ? getConsistentAnimationHoldMs() : undefined
    });
};

const startManualNote = (noteId, options = {}) => {
    const { playSound = true } = options;
    const key = keyMap.get(noteId);
    if (!key) return;
    if (manualNoteState.has(noteId)) return;

    if (!playSound && getEffectiveBlindMode() && state.active && !state.submitted) {
        resultEl.textContent = "Blind mode: notes are muted while selecting.";
    }
    const entry = beginInteractivePressSession({
        noteIds: [noteId],
        mode: "simultaneous",
        playSound,
        behavior: getInteractivePressBehavior(),
        startDelaySeconds: 0
    });
    if (!entry) return;
    manualNoteState.set(noteId, entry);
};

const releaseManualNote = (noteId) => {
    const entry = manualNoteState.get(noteId);
    if (!entry) return;
    releaseInteractivePressSession(entry, {
        pedalAware: true,
        pedalNoteId: noteId
    });
    manualNoteState.delete(noteId);
};

const releasePedalNotes = (delaySeconds = HOLD_BUFFER) => {
    if (!pedalState.pending.size) return;
    const noteIds = Array.from(pedalState.pending);
    pedalState.pending.clear();
    noteIds.forEach((noteId) => {
        scheduleKeyRelease(noteId, delaySeconds * 1000);
    });
    setTimeout(() => {
        stopNotesById(noteIds);
    }, delaySeconds * 1000);
};

const startPedalHold = () => {
    pedalState.keysDown.add("pedal-click");
    if (!pedalState.active) {
        pedalState.active = true;
        pedalIcon.classList.add("active");
    }
};

const stopPedalHold = () => {
    pedalState.keysDown.delete("pedal-click");
    if (!pedalState.keysDown.size) {
        pedalState.active = false;
        pedalIcon.classList.remove("active");
        releasePedalNotes();
    }
};

const toggleSelection = (noteId) => {
    if (isTypingOnlyMode()) {
        return;
    }
    if (!state.active) {
        updateStatus();
        return;
    }
    if (state.submitted) {
        return;
    }
    const rootGuideNoteId = getRootGuideNoteId();
    if (rootGuideNoteId && noteId === rootGuideNoteId) {
        state.rootHintSuppressed = !state.rootHintSuppressed;
        if (state.rootHintSuppressed) {
            state.selectedNotes = state.selectedNotes.filter((id) => id !== noteId);
        }
        setSubmitted(false);
        updateStatus();
        updateKeyStates();
        return;
    }
    const index = state.selectedNotes.indexOf(noteId);
    if (index !== -1) {
        state.selectedNotes.splice(index, 1);
        setSubmitted(false);
        updateStatus();
        updateKeyStates();
        return;
    }

    const maxSelection = getIsChordRound()
        ? Math.max(6, state.targetNotes.length || 3)
        : state.noteCount;
    const guideOffset = rootGuideNoteId && !state.rootHintSuppressed ? 1 : 0;
    const manualSelectionCap = Math.max(1, maxSelection - guideOffset);
    while (state.selectedNotes.length >= manualSelectionCap) {
        state.selectedNotes.pop();
    }

    state.selectedNotes.push(noteId);
    setSubmitted(false);
    updateStatus();
    updateKeyStates();
};

const isSelectionCorrect = (noteIds = state.selectedNotes) => {
    if (getIsChordRound()) {
        if (!state.targetChord) return false;
        const selectedPcs = getPitchClassSetFromNoteIds(noteIds);
        const targetPcs = new Set(state.targetChord.pitchClasses);
        if (!selectedPcs.size) return false;
        return (
            Array.from(targetPcs).every((pc) => selectedPcs.has(pc)) &&
            Array.from(selectedPcs).every((pc) => targetPcs.has(pc))
        );
    }

    const selectedSet = new Set(noteIds);
    return (
        noteIds.length === state.targetNotes.length &&
        state.targetNotes.every((noteId) => selectedSet.has(noteId))
    );
};

const getPlaybackSpan = (noteIds, mode) => {
    if (!noteIds.length) return 0;
    const arpSpan = mode === "ascending" ? ARP_STEP * Math.max(0, noteIds.length - 1) : 0;
    const gap = 0.45;
    return arpSpan + state.noteDuration + gap;
};

