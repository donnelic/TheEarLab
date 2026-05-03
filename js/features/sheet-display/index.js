var App = window.App || (window.App = {});

const SHEET_FLAT_NAMES = Object.freeze({
    "C#": "Db",
    "D#": "Eb",
    "F#": "Gb",
    "G#": "Ab",
    "A#": "Bb"
});

const SHEET_CLEF_REFERENCE_MIDI = {
    treble: 64,
    bass: 52
};
const SHEET_NOTE_VERTICAL_STEP = 2.6;
const SHEET_MIN_NOTATION_WIDTH = 420;
const SHEET_BEATS_PER_MEASURE = 4;
const SHEET_NOTE_SPACING_LEFT = 8;
const SHEET_NOTE_SPACING_RIGHT = 92;

const getSheetAccidentalGlyph = (noteId) => {
    const noteName = noteMap.get(noteId)?.name ?? "";
    if (!noteName.includes("#")) return "";
    return state.sheetAccidentalStyle === "flat" ? "♭" : "♯";
};

const getSheetAccidentalLabel = (noteId) => {
    const note = noteMap.get(noteId);
    if (!note) return "";
    if (!note.name.includes("#")) return "";
    if (state.sheetAccidentalStyle === "flat") {
        return SHEET_FLAT_NAMES[note.name] ?? note.name;
    }
    return note.name;
};

const getSheetNotationVerticalPosition = (midi, clef) => {
    const referenceMidi = SHEET_CLEF_REFERENCE_MIDI[clef] || SHEET_CLEF_REFERENCE_MIDI.treble;
    const offset = midi - referenceMidi;
    const topPercent = 56 - (offset * SHEET_NOTE_VERTICAL_STEP);
    return Math.min(92, Math.max(8, topPercent));
};

const getSheetLedgerLinesForNote = (noteTop) => {
    const lines = [];

    if (noteTop < 18) {
        const count = Math.ceil((18 - noteTop) / 8);
        for (let index = 0; index < count; index += 1) {
            lines.push(18 - (index * 8));
        }
    } else if (noteTop > 84) {
        const count = Math.ceil((noteTop - 84) / 8);
        for (let index = 0; index < count; index += 1) {
            lines.push(84 + (index * 8));
        }
    }

    return lines;
};

const buildSheetNotationFromState = ({ noteIds, clef, layout }) => {
    const validNoteIds = Array.isArray(noteIds) ? noteIds : [];
    const notes = validNoteIds
        .map((noteId) => {
            const midi = getMidiFromNoteId(noteId);
            if (!Number.isFinite(midi)) return null;
            const accidentalGlyph = getSheetAccidentalGlyph(noteId);
            const accidentalLabel = getSheetAccidentalLabel(noteId);
            return {
                noteId,
                midi,
                label: accidentalLabel || noteId,
                accidentalGlyph,
                accidentalPlacement: accidentalGlyph ? "note" : "none"
            };
        })
        .filter(Boolean);

    const measureCount = Math.max(1, Math.ceil(notes.length / SHEET_BEATS_PER_MEASURE));
    const measureWidth = 100 / measureCount;
    const measures = Array.from({ length: measureCount }, (_, measureIndex) => {
        const startIndex = measureIndex * SHEET_BEATS_PER_MEASURE;
        const chunk = notes.slice(startIndex, startIndex + SHEET_BEATS_PER_MEASURE);
        const noteCount = chunk.length;
        return {
            number: measureIndex + 1,
            startX: measureIndex * measureWidth,
            width: measureWidth,
            notes: chunk.map((note, noteIndex) => {
                const span = noteCount > 1 ? (SHEET_NOTE_SPACING_RIGHT - SHEET_NOTE_SPACING_LEFT) : 0;
                const offsetInMeasure = layout === "stacked"
                    ? 50
                    : (noteCount <= 1
                        ? 50
                        : (SHEET_NOTE_SPACING_LEFT + ((span / Math.max(1, noteCount - 1)) * noteIndex)));
                const x = measureIndex * measureWidth + (offsetInMeasure * measureWidth / 100);
                const y = getSheetNotationVerticalPosition(note.midi, clef);
                const stemDirection = y > 48 ? "down" : "up";
                return {
                    ...note,
                    x,
                    y,
                    z: note.z ?? 0,
                    stemDirection,
                    ledgerLines: getSheetLedgerLinesForNote(y)
                };
            })
        };
    });

    return {
        clef,
        timeSignature: {
            beats: SHEET_BEATS_PER_MEASURE,
            unit: 4
        },
        keySignature: null,
        minWidth: Math.max(SHEET_MIN_NOTATION_WIDTH, 120 + (notes.length * 72)),
        measures
    };
};

const normalizeSheetNotation = (sourceNotation) => {
    if (!sourceNotation || typeof sourceNotation !== "object") {
        return null;
    }

    const clef = sourceNotation.clef || state.sheetClef || chooseSheetClef();
    const layout = sourceNotation.layout || state.sheetNoteLayout;
    const timeSignature = sourceNotation.timeSignature || { beats: SHEET_BEATS_PER_MEASURE, unit: 4 };
    const keySignature = sourceNotation.keySignature ?? null;
    const rawNotes = Array.isArray(sourceNotation.notes)
        ? sourceNotation.notes.slice()
        : (Array.isArray(sourceNotation.noteIds) ? sourceNotation.noteIds.map((noteId) => ({ noteId })) : []);

    let measures = Array.isArray(sourceNotation.measures) && sourceNotation.measures.length
        ? sourceNotation.measures.map((measure) => ({ ...measure }))
        : null;

    if (!measures) {
        const noteCount = rawNotes.length;
        const countPerMeasure = Math.max(1, timeSignature.beats || SHEET_BEATS_PER_MEASURE);
        const measureCount = Math.max(1, Math.ceil(noteCount / countPerMeasure));
        const measureWidth = 100 / measureCount;
        measures = Array.from({ length: measureCount }, (_, measureIndex) => {
            const startIndex = measureIndex * countPerMeasure;
            const chunk = rawNotes.slice(startIndex, startIndex + countPerMeasure);
            return {
                number: measureIndex + 1,
                startX: measureIndex * measureWidth,
                width: measureWidth,
                notes: chunk
            };
        });
    }

    const defaultMeasureWidth = 100 / Math.max(1, measures.length);
    measures = measures.map((measure, measureIndex) => {
        const startX = Number.isFinite(measure.startX) ? measure.startX : (measureIndex * defaultMeasureWidth);
        const width = Number.isFinite(measure.width) ? measure.width : defaultMeasureWidth;
        const rawMeasureNotes = Array.isArray(measure.notes) ? measure.notes : [];
        const noteCount = rawMeasureNotes.length;
        const notes = rawMeasureNotes.map((noteInput, noteIndex) => {
            const note = (typeof noteInput === "string" || typeof noteInput === "number")
                ? { noteId: String(noteInput) }
                : { ...noteInput };
            const midi = Number.isFinite(note.midi) ? note.midi : getMidiFromNoteId(note.noteId);
            if (!Number.isFinite(midi)) {
                return null;
            }
            const label = note.label || getSheetAccidentalLabel(note.noteId) || note.noteId || "";
            const accidentalGlyph = note.accidentalGlyph ?? getSheetAccidentalGlyph(note.noteId);
            const accidentalPlacement = note.accidentalPlacement ?? (accidentalGlyph ? "note" : "none");
            const span = noteCount > 1 ? (SHEET_NOTE_SPACING_RIGHT - SHEET_NOTE_SPACING_LEFT) : 0;
            const offsetInMeasure = Number.isFinite(note.x)
                ? note.x - startX
                : (layout === "stacked"
                    ? 50
                    : (noteCount <= 1
                        ? 50
                        : (SHEET_NOTE_SPACING_LEFT + ((span / Math.max(1, noteCount - 1)) * noteIndex))));
            const x = Number.isFinite(note.x)
                ? note.x
                : startX + (offsetInMeasure * width / 100);
            const y = Number.isFinite(note.y)
                ? note.y
                : getSheetNotationVerticalPosition(midi, clef);
            const stemDirection = note.stemDirection || (y > 48 ? "down" : "up");
            return {
                ...note,
                midi,
                label,
                accidentalGlyph,
                accidentalPlacement,
                x,
                y,
                z: Number.isFinite(note.z) ? note.z : 0,
                stemDirection,
                ledgerLines: note.ledgerLines ?? getSheetLedgerLinesForNote(y)
            };
        }).filter(Boolean);

        return {
            number: Number.isFinite(measure.number) ? measure.number : (measureIndex + 1),
            startX,
            width,
            notes
        };
    });

    const allNotes = measures.flatMap((measure) => measure.notes);
    const minWidth = Number.isFinite(sourceNotation.minWidth)
        ? sourceNotation.minWidth
        : Math.max(SHEET_MIN_NOTATION_WIDTH, 120 + (allNotes.length * 72));

    return {
        clef,
        layout,
        timeSignature,
        keySignature,
        minWidth,
        measures
    };
};

const renderSheetNotation = (notation) => {
    const normalized = normalizeSheetNotation(notation);
    if (!normalized) return "";

    const clefSymbol = normalized.clef === "bass" ? "𝄢" : "𝄞";
    const measuresHtml = normalized.measures.map((measure) => `
        <div class="sheet-measure" style="--sheet-measure-left:${measure.startX}%; --sheet-measure-width:${measure.width}%;">
            <span class="sheet-measure-label">${measure.number}</span>
        </div>
    `).join("");

    const notesHtml = normalized.measures.flatMap((measure) => measure.notes.map((note) => {
        const ledgerHtml = (note.ledgerLines || []).map((ledgerTop) =>
            `<span class="sheet-ledger-line" style="--ledger-line-top:${ledgerTop}%"></span>`
        ).join("");
        return `
            <div class="sheet-note" style="--sheet-note-left:${note.x}%; --sheet-note-top:${note.y}%; --sheet-note-z:${note.z};">
                <span class="sheet-note-head">${escapeHtml(note.label)}</span>
                ${note.accidentalGlyph ? `<span class="sheet-accidental sheet-accidental-${note.accidentalPlacement}">${note.accidentalGlyph}</span>` : ""}
                <span class="sheet-note-stem${note.stemDirection === "up" ? " up" : ""}"></span>
                ${ledgerHtml}
            </div>
        `;
    })).join("");

    const keySignatureHtml = normalized.keySignature && Array.isArray(normalized.keySignature.accidentals)
        ? `<div class="sheet-key-signature">${normalized.keySignature.accidentals.map((accidental, index) => {
            const glyph = normalized.keySignature.type === "flat" ? "♭" : "♯";
            return `<span class="sheet-key-signature-item" data-accidental="${escapeHtml(String(accidental))}" key="key-${index}">${glyph}</span>`;
        }).join("")}</div>`
        : "";

    return `
        <div class="sheet-notation-stage" style="min-width:${normalized.minWidth}px;">
            <div class="sheet-notation-grid"></div>
            <div class="sheet-notation-meta">
                <div class="sheet-clef">${clefSymbol}</div>
                ${keySignatureHtml}
                <div class="sheet-time-signature">
                    <span class="sheet-time-beats">${escapeHtml(String(normalized.timeSignature.beats))}</span>
                    <span class="sheet-time-unit">${escapeHtml(String(normalized.timeSignature.unit))}</span>
                </div>
            </div>
            <div class="sheet-measures">${measuresHtml}</div>
            <div class="sheet-note-layer">${notesHtml}</div>
        </div>
    `;
};

const renderSheetDisplay = () => {
    if (!sheetDisplay) return;
    sheetDisplay.innerHTML = "";

    const sheetNotation = (state.sheetNotation && typeof state.sheetNotation === "object")
        ? state.sheetNotation
        : {
            clef: state.sheetClef || chooseSheetClef(),
            noteIds: state.targetNotes,
            layout: state.sheetNoteLayout
        };

    if (!sheetNotation) {
        sheetDisplay.innerHTML = "";
        return;
    }

    sheetDisplay.innerHTML = renderSheetNotation(sheetNotation);
};

App.sheet = App.sheet || {};
Object.assign(App.sheet, {
    buildSheetNotationFromState,
    normalizeSheetNotation,
    renderSheetNotation,
    renderSheetDisplay
});
