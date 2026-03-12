const createKey = (note, variant) => {
    const key = document.createElement("button");
    key.type = "button";
    key.className = `key ${variant}`;
    key.dataset.note = note.id;
    key.setAttribute("aria-pressed", "false");
    const label = document.createElement("span");
    label.textContent = note.id;
    key.appendChild(label);
    keyMap.set(note.id, key);
    return key;
};

const renderKeyboard = () => {
    whiteKeysContainer.innerHTML = "";
    blackKeysContainer.innerHTML = "";
    keyMap.clear();

    const rootStyles = getComputedStyle(document.documentElement);
    const whiteWidth = getCssNumber(rootStyles.getPropertyValue("--white-width"));
    const blackWidth = getCssNumber(rootStyles.getPropertyValue("--black-width"));

    let whiteCount = 0;
    notes.forEach((note) => {
        if (note.isBlack) {
            const key = createKey(note, "black");
            const left = whiteCount * whiteWidth - blackWidth / 2;
            key.style.left = `${left}px`;
            blackKeysContainer.appendChild(key);
        } else {
            const key = createKey(note, "white");
            whiteKeysContainer.appendChild(key);
            whiteCount += 1;
        }
    });

    keyboardEl.style.setProperty("--white-count", whiteCount);
    document.documentElement.style.setProperty("--white-count", whiteCount);
    appEl.style.setProperty("--keyboard-width", `${whiteCount * whiteWidth}px`);
    const lastNote = notes[notes.length - 1];
    const keyboardWrapper = keyboardEl.closest(".keyboard-wrapper");
    if (keyboardWrapper) {
        keyboardWrapper.classList.toggle("ends-black", Boolean(lastNote?.isBlack));
    }
    updateKeyboardScale();
};

const rebuildKeyboard = () => {
    noteMap.clear();
    notes = buildNotes(state.keyCount);
    notes.forEach((note) => noteMap.set(note.id, note));
    updateNoteCountMax();
    renderKeyboard();
    if (typeof App.game?.sanitizeRoundStateForKeyboardRange === "function") {
        App.game.sanitizeRoundStateForKeyboardRange();
        return;
    }
    updateKeyStates();
};

