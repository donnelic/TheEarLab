App.store = App.store || {};

const LOG_KEYS = Object.freeze([
    "active",
    "round",
    "submitted",
    "mode",
    "practiceMode",
    "trainingMode",
    "blindMode",
    "chordMode",
    "chordDifficulty",
    "hintUsed",
    "submissionSource",
    "noteCount",
    "keyCount",
    "startMidi",
    "rootHintSuppressed"
]);

const normalizeLogValue = (value) => {
    if (Array.isArray(value)) {
        return {
            type: "array",
            size: value.length,
            sample: value.slice(0, 6)
        };
    }
    if (value && typeof value === "object") {
        return {
            type: "object",
            keys: Object.keys(value).slice(0, 8)
        };
    }
    return value;
};

const selectLogSnapshot = (state) => {
    const snapshot = {};
    LOG_KEYS.forEach((key) => {
        snapshot[key] = normalizeLogValue(state?.[key]);
    });
    snapshot.targetNotes = normalizeLogValue(state?.targetNotes ?? []);
    snapshot.selectedNotes = normalizeLogValue(state?.selectedNotes ?? []);
    snapshot.submittedComparisonNotes = normalizeLogValue(state?.submittedComparisonNotes ?? []);
    return snapshot;
};

const selectDeltaForLog = (deltaByKey = {}) => {
    const formatted = {};
    Object.entries(deltaByKey).forEach(([key, value]) => {
        formatted[key] = {
            from: normalizeLogValue(value?.from),
            to: normalizeLogValue(value?.to)
        };
    });
    return formatted;
};

const getRenderedNoteIds = () => {
    const refs = App.runtimeRefs || {};
    if (refs.noteMap instanceof Map) {
        return new Set(refs.noteMap.keys());
    }
    if (typeof refs.getNotes === "function") {
        return new Set((refs.getNotes() || []).map((note) => note.id));
    }
    return new Set();
};

const collectInvalidNoteIds = (noteIds = [], renderedSet = new Set()) => {
    if (!Array.isArray(noteIds)) return [];
    return noteIds.filter((noteId) => !renderedSet.has(noteId));
};

const selectInvariantIssues = (state, context = {}) => {
    const issues = [];
    if (!state || typeof state !== "object") {
        issues.push("State object is missing.");
        return issues;
    }

    const renderedSet = getRenderedNoteIds();
    if (state.active && (!Array.isArray(state.targetNotes) || state.targetNotes.length === 0)) {
        issues.push("Active round has no target notes.");
    }

    if (renderedSet.size > 0) {
        const selectedOutOfRange = collectInvalidNoteIds(state.selectedNotes, renderedSet);
        if (selectedOutOfRange.length) {
            issues.push(`Selected notes outside rendered range: ${selectedOutOfRange.join(", ")}`);
        }
        const targetOutOfRange = collectInvalidNoteIds(state.targetNotes, renderedSet);
        if (targetOutOfRange.length) {
            issues.push(`Target notes outside rendered range: ${targetOutOfRange.join(", ")}`);
        }
        const submittedOutOfRange = collectInvalidNoteIds(state.submittedComparisonNotes, renderedSet);
        if (submittedOutOfRange.length) {
            issues.push(`Submitted comparison notes outside rendered range: ${submittedOutOfRange.join(", ")}`);
        }
    }

    if (state.submitted) {
        const hasSource = state.submissionSource === "keyboard" || state.submissionSource === "typing";
        if (!hasSource) {
            issues.push("Submitted state is missing a valid submission source.");
        }
        if (Array.isArray(state.submittedComparisonNotes) && state.submittedComparisonNotes.length === 0) {
            issues.push("Submitted state has empty comparison notes.");
        }
    }

    if (context?.action?.type === "submission/apply-patch" && state.active && !state.submitted) {
        issues.push("Submission action applied but submitted flag is false.");
    }
    return issues;
};

App.store.selectors = Object.freeze({
    selectLogSnapshot,
    selectDeltaForLog,
    selectInvariantIssues
});
