var App = window.App || (window.App = {});
App.game = App.game || {};

const randomSample = (array, count) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
};

const getNiceTarget = (count) => {
    const pool = getNicePool();
    if (pool.length <= count) {
        return pool.map((note) => note.id);
    }

    for (let attempt = 0; attempt < 200; attempt += 1) {
        const root = pool[Math.floor(Math.random() * pool.length)];
        const shuffled = randomSample(pool, pool.length);
        const picked = [root];

        for (const note of shuffled) {
            if (picked.length >= count) break;
            if (picked.some((existing) => existing.id === note.id)) {
                continue;
            }
            if (picked.every((existing) => isConsonant(existing, note))) {
                picked.push(note);
            }
        }

        if (picked.length === count) {
            const signature = picked
                .map((note) => note.id)
                .sort()
                .join("-");
            if (!recentNiceCombos.includes(signature)) {
                recentNiceCombos.unshift(signature);
                if (recentNiceCombos.length > MAX_NICE_HISTORY) {
                    recentNiceCombos.pop();
                }
                return picked.map((note) => note.id);
            }
        }
    }

    return randomSample(pool, count).map((note) => note.id);
};

const createTarget = () => {
    let next;
    if (state.niceMode && state.noteCount > 1) {
        next = getNiceTarget(state.noteCount);
    } else if (state.niceMode) {
        next = randomSample(getNicePool().map((note) => note.id), state.noteCount);
    } else {
        next = randomSample(notes.map((note) => note.id), state.noteCount);
    }

    let signature = next.slice().sort().join("-");
    if (recentTargets.includes(signature)) {
        for (let attempt = 0; attempt < 6; attempt += 1) {
            const candidate = randomSample(
                state.niceMode ? getNicePool().map((note) => note.id) : notes.map((note) => note.id),
                state.noteCount
            );
            const candidateSig = candidate.slice().sort().join("-");
            if (!recentTargets.includes(candidateSig)) {
                next = candidate;
                signature = candidateSig;
                break;
            }
        }
    }

    recentTargets.unshift(signature);
    if (recentTargets.length > MAX_TARGET_HISTORY) {
        recentTargets.pop();
    }

    state.targetNotes = next;
};

const updatePrimaryAction = () => {
    const label = state.active && !state.submitted ? "Submit (Enter)" : "New Round (Enter)";
    primaryActionButton.textContent = label;
};

const updateReplayAvailability = () => {
    const allowReplay = state.active && (!state.blindMode || state.submitted);
    playSelectedButton.hidden = !allowReplay;
    return allowReplay;
};

const updateStatus = () => {
    goalCountEl.textContent = String(state.noteCount);
    modeLabelEl.textContent = state.blindMode ? "Blind" : "Normal";
    document.body.classList.toggle("landing", !state.active);
    if (pedalTip) {
        pedalTip.hidden = state.active;
    }
    if (state.active && pedalState.active) {
        pedalState.active = false;
        pedalState.keysDown.clear();
        pedalState.pending.clear();
        pedalIcon.classList.remove("active");
    }

    if (!state.active) {
        setKeyboardEnabled(true);
        roundCountEl.textContent = "Not started";
        selectedListEl.textContent = "None";
        resultEl.textContent = "Press New Round to begin.";
        revealEl.textContent = "";
        hintFlag.hidden = true;
        hintButton.hidden = true;
        if (homeButton) {
            homeButton.hidden = true;
        }
        updateReplayAvailability();
        updatePrimaryAction();
        return;
    }

    roundCountEl.textContent = String(state.round);
    selectedListEl.textContent = state.selectedNotes.length ? state.selectedNotes.join(", ") : "None";
    hintButton.hidden = state.submitted;
    hintFlag.hidden = !(state.submitted && state.hintUsed);
    if (homeButton) {
        homeButton.hidden = false;
    }
    updateReplayAvailability();

    if (!state.submitted) {
        resultEl.textContent = "";
        revealEl.textContent = "";
    }
    updatePrimaryAction();
};

const updateKeyStates = () => {
    const selectedSet = new Set(state.selectedNotes);
    const targetSet = new Set(state.targetNotes);

    keyMap.forEach((key, id) => {
        key.classList.remove("selected", "correct", "wrong", "missed");

        if (!state.active) {
            key.setAttribute("aria-pressed", "false");
            return;
        }

        if (state.submitted) {
            if (targetSet.has(id) && selectedSet.has(id)) {
                key.classList.add("correct");
            } else if (!targetSet.has(id) && selectedSet.has(id)) {
                key.classList.add("wrong");
            } else if (targetSet.has(id) && !selectedSet.has(id)) {
                key.classList.add("missed");
            }
        } else if (selectedSet.has(id)) {
            key.classList.add("selected");
        }

        key.setAttribute("aria-pressed", selectedSet.has(id) ? "true" : "false");
    });
};

const setKeyboardEnabled = (enabled) => {
    keyboardEl.classList.toggle("disabled", !enabled);
};

const updateKeyboardScale = () => {
    const root = document.documentElement;
    const rootStyles = getComputedStyle(root);
    const zone = keyboardEl.closest(".keyboard-zone");
    const zoneWidth = zone?.clientWidth || 1;
    const stack = keyboardEl.closest(".keyboard-stack");
    const stackWidth = stack?.scrollWidth || stack?.getBoundingClientRect().width || 1;
    const padding = getCssNumber(rootStyles.getPropertyValue("--layout-extra")) || 0;
    const totalWidth = Math.max(1, stackWidth + padding);
    const scale = Math.min(1, zoneWidth / totalWidth);
    root.style.setProperty("--stack-scale", scale.toFixed(3));
};

const lockKeyboardForPlayback = (noteIds, mode) => {
    if (!noteIds.length) return;
    if (keyboardUnlockTimer) {
        clearTimeout(keyboardUnlockTimer);
        keyboardUnlockTimer = null;
    }
    setKeyboardEnabled(false);
    const duration = getPlaybackSpan(noteIds, mode) + 0.5;
    keyboardUnlockTimer = setTimeout(() => {
        setKeyboardEnabled(true);
        keyboardUnlockTimer = null;
    }, duration * 1000);
};

const setSubmitted = (value) => {
    state.submitted = value;
    if (!value) {
        resultEl.textContent = "";
        revealEl.textContent = "";
    }
    updatePrimaryAction();
};

const refreshTarget = () => {
    if (!state.active) {
        updateStatus();
        updateKeyStates();
        return;
    }
    state.selectedNotes = [];
    setSubmitted(false);
    createTarget();
    updateStatus();
    updateKeyStates();
};

const startRound = (shouldPlay = false) => {
    abortPlayback();
    state.round = state.active ? state.round + 1 : 1;
    state.active = true;
    state.hintUsed = false;
    state.selectedNotes = [];
    setSubmitted(false);
    createTarget();
    setKeyboardEnabled(true);
    updateStatus();
    updateKeyStates();
    pendingCriticalRestart = false;
    if (shouldPlay) {
        const ctx = ensureAudio();
        lockKeyboardForPlayback(state.targetNotes, state.mode);
        playNotes(state.targetNotes, state.mode, ctx.currentTime + ROUND_START_DELAY, { animate: false });
    } else {
        setKeyboardEnabled(true);
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
        startRound(true);
        return;
    }
    state.hintUsed = true;
    updateStatus();
    lockKeyboardForPlayback(state.targetNotes, state.mode);
    playNotes(state.targetNotes, state.mode, undefined, {
        animate: state.submitted,
        animationHoldMs: ROUND_ANIM_HOLD_MS
    });
};

const startManualNote = (noteId, options = {}) => {
    const { playSound = true } = options;
    const key = keyMap.get(noteId);
    if (!key) return;
    if (manualNoteState.has(noteId)) return;

    activateKey(noteId);

    const now = performance.now();
    const isLanding = !state.active;
    const durationMs = isLanding ? HOLD_BUFFER * 1000 : state.noteDuration * 1000;
    if (playSound) {
        const ctx = ensureAudio();
        const durationOverride = state.noteDuration + HOLD_MAX_EXTRA;
        playNotes([noteId], "simultaneous", ctx.currentTime, {
            animate: false,
            durationOverride
        });
    } else if (state.blindMode && state.active && !state.submitted) {
        resultEl.textContent = "Blind mode: notes are muted while selecting.";
    }
    const entry = {
        pressAt: now,
        stopAt: now + durationMs,
        playSound,
        holdTimer: null
    };
    entry.holdTimer = setTimeout(() => {
        entry.held = true;
    }, HOLD_THRESHOLD * 1000);
    manualNoteState.set(noteId, entry);
};

const releaseManualNote = (noteId) => {
    const entry = manualNoteState.get(noteId);
    if (!entry) return;
    if (entry.holdTimer) {
        clearTimeout(entry.holdTimer);
        entry.holdTimer = null;
    }
    const now = performance.now();
    const isLanding = !state.active;
    const remainingMs = Math.max(0, entry.stopAt - now);
    const elapsedMs = Math.max(0, now - entry.pressAt);
    const animDelayMs = state.active ? Math.max(0, MIN_KEY_ANIM_MS - elapsedMs) : SHORT_PRESS_ANIM_MS;

    const key = keyMap.get(noteId);
    if (pedalState.active) {
        pedalState.pending.add(noteId);
        scheduleKeyRelease(noteId, animDelayMs);
        manualNoteState.delete(noteId);
        return;
    }
    const releaseDelayMs = remainingMs > 0 ? remainingMs : (isLanding ? HOLD_BUFFER * 1000 : SHORT_PRESS_ANIM_MS);
    scheduleKeyRelease(noteId, animDelayMs);
    if (entry.playSound && audioContext) {
        setTimeout(() => {
            stopNotesById([noteId]);
        }, releaseDelayMs);
    }

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
    if (!state.active) {
        updateStatus();
        return;
    }
    if (state.submitted) {
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

    while (state.selectedNotes.length >= state.noteCount) {
        state.selectedNotes.pop();
    }

    state.selectedNotes.push(noteId);
    setSubmitted(false);
    updateStatus();
    updateKeyStates();
};

const isSelectionCorrect = () => {
    const selectedSet = new Set(state.selectedNotes);
    return (
        state.selectedNotes.length === state.targetNotes.length &&
        state.targetNotes.every((noteId) => selectedSet.has(noteId))
    );
};

const getPlaybackSpan = (noteIds, mode) => {
    if (!noteIds.length) return 0;
    const arpSpan = mode === "ascending" ? ARP_STEP * Math.max(0, noteIds.length - 1) : 0;
    const gap = 0.45;
    return arpSpan + state.noteDuration + gap;
};

const renderNotePills = (label, notes, toneClass) => {
    if (!notes.length) return "";
    const pills = notes
        .map((note) => `<span class="note-pill ${toneClass}">${note}</span>`)
        .join("");
    return `<div class="reveal-label">${label}</div><div class="note-pills">${pills}</div>`;
};

const renderPressedPills = () => {
    if (!state.selectedNotes.length) return "";
    const targetSet = new Set(state.targetNotes);
    const pills = state.selectedNotes
        .map((note) => {
            const toneClass = targetSet.has(note) ? "good" : "bad";
            return `<span class="note-pill ${toneClass}">${note}</span>`;
        })
        .join("");
    return `<div>Your notes</div><div class="note-pills">${pills}</div>`;
};

const playRevealSequence = (options = {}) => {
    if (!state.active || !state.targetNotes.length) {
        return;
    }
    revealTimers.forEach((timer) => clearTimeout(timer));
    revealTimers.length = 0;
    revealSequenceId += 1;
    const seqId = revealSequenceId;
    revealPlaying = true;
    const snapshot = options.snapshot ?? lastReveal ?? {
        target: [...state.targetNotes],
        selected: [...state.selectedNotes]
    };
    const targetNotes = snapshot.target ?? [];
    const selectedNotes = snapshot.selected ?? [];
    const isCorrect =
        targetNotes.length === selectedNotes.length &&
        targetNotes.every((noteId) => selectedNotes.includes(noteId));
    const revealDelayMs = (options.delay ?? 0.55) * 1000;
    const targetSpanMs = getPlaybackSpan(targetNotes, state.mode) * 1000;
    const selectedSpanMs = (isCorrect ? 0 : getPlaybackSpan(selectedNotes, state.mode)) * 1000;

    const playTargetTimer = setTimeout(() => {
        if (seqId !== revealSequenceId) return;
        playNotes(targetNotes, state.mode, undefined, {
            animate: true,
            animationDelay: 0,
            animationHoldMs: ROUND_ANIM_HOLD_MS
        });
    }, revealDelayMs);
    revealTimers.push(playTargetTimer);

    if (!isCorrect && selectedNotes.length) {
        const playSelectedTimer = setTimeout(() => {
            if (seqId !== revealSequenceId) return;
            playNotes(selectedNotes, state.mode, undefined, {
                animate: true,
                animationDelay: 0,
                animationHoldMs: ROUND_ANIM_HOLD_MS
            });
        }, revealDelayMs + targetSpanMs);
        revealTimers.push(playSelectedTimer);
    }

    const doneTimer = setTimeout(() => {
        if (seqId !== revealSequenceId) return;
        revealPlaying = false;
        revealTimer = null;
    }, revealDelayMs + targetSpanMs + selectedSpanMs);
    revealTimers.push(doneTimer);
};

const playSelectedChord = () => {
    if (!state.active) {
        updateStatus();
        return;
    }
    if (state.submitted) {
        abortPlayback();
        playRevealSequence({ delay: 0, snapshot: lastReveal });
        return;
    }
    if (!state.selectedNotes.length) {
        resultEl.textContent = "Select some notes first.";
        return;
    }
    playNotes(state.selectedNotes, state.mode, undefined, {
        animate: true,
        animationDelay: 0,
        animationHoldMs: ROUND_ANIM_HOLD_MS
    });
};

const startHeldPlayback = () => {
    if (!state.active) return;
    if (state.blindMode && !state.submitted) return;
    if (state.submitted) {
        if (revealPlaying) {
            abortPlayback();
        }
        playRevealSequence({ delay: 0, snapshot: lastReveal });
        return;
    }
    if (!state.selectedNotes.length) {
        resultEl.textContent = "Select some notes first.";
        return;
    }

    const ctx = ensureAudio();
    const durationOverride = state.noteDuration + HOLD_MAX_EXTRA;
    playNotes(state.selectedNotes, state.mode, ctx.currentTime + KEY_PRESS_DELAY, {
        animate: false,
        durationOverride
    });
    state.selectedNotes.forEach((noteId) => {
        activateKey(noteId);
    });

    holdState.active = true;
    holdState.holding = false;
    holdState.pressAt = performance.now();
    holdState.noteIds = [...state.selectedNotes];
    holdState.stopAt = holdState.pressAt + state.noteDuration * 1000;

    if (holdState.holdTimer) clearTimeout(holdState.holdTimer);

    holdState.holdTimer = setTimeout(() => {
        holdState.holding = true;
    }, HOLD_THRESHOLD * 1000);
};

const releaseHeldPlayback = () => {
    if (state.submitted) {
        return;
    }
    if (!holdState.active) return;
    if (holdState.holdTimer) {
        clearTimeout(holdState.holdTimer);
        holdState.holdTimer = null;
    }

    const now = performance.now();
    const remainingMs = Math.max(0, holdState.stopAt - now);
    const elapsedMs = Math.max(0, now - holdState.pressAt);
    const animDelayMs = Math.max(0, MIN_KEY_ANIM_MS - elapsedMs);

    holdState.noteIds.forEach((noteId) => {
        scheduleKeyRelease(noteId, animDelayMs);
    });
    if (holdState.noteIds.length) {
        setTimeout(() => {
            stopNotesById(holdState.noteIds);
        }, remainingMs);
    }

    holdState.active = false;
    holdState.holding = false;
    holdState.noteIds = [];
};

const submitAnswer = () => {
    if (!ensureRound()) {
        return;
    }
    abortPlayback();
    setSubmitted(true);
    const isCorrect = isSelectionCorrect();

    resultEl.textContent = isCorrect ? "Correct. Great ear." : "Not quite. Listen closely.";
    const targetHtml = renderNotePills("Target notes", state.targetNotes, "good");
    const pressedHtml = renderPressedPills();
    revealEl.innerHTML = `${targetHtml}${pressedHtml}`;
    lastReveal = {
        target: [...state.targetNotes],
        selected: [...state.selectedNotes]
    };
    playRevealSequence({ snapshot: lastReveal });
    updateKeyStates();
    updatePrimaryAction();
    updateStatus();
};

Object.assign(App.game, {
    createTarget,
    startRound,
    playTarget,
    playSelectedChord,
    startManualNote,
    releaseManualNote,
    startHeldPlayback,
    releaseHeldPlayback,
    submitAnswer,
    updateStatus,
    updateKeyStates,
    setKeyboardEnabled,
    goHome
});

