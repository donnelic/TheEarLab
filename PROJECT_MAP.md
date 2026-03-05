# Project Map

Generated: 2026-03-05 14:48:12 +01:00

## Mandatory Protocol (Humans + AI)
1. Read README.md first, then read this file before making any edit.
2. Treat index.html script order as the source of truth for runtime behavior.
3. After any code edit, run powershell -File ./tools/generate-project-map.ps1 to refresh line ranges.
4. If you add/remove/move files, update README.md, this file, and AGENTS.md in the same change.
5. Commit and push changes when the update is complete (if git remote is configured).
6. Do not edit legacy js/app.*.js files unless you intentionally want to revive that branch.

## System Flows
### Bootstrap
1. index.html loads CSS, vendor synth dependencies, and runtime scripts (core -> audio -> game -> settings -> events).
2. core.js defines DOM handles, constants, state containers, persistence helpers, note/key builders.
3. events.js:init() hydrates UI from saved settings, binds events, renders keyboard, and sets status.

### Round Lifecycle
1. startRound(true) creates either note targets or chord targets and optionally plays them.
2. Keyboard mode: user selects keys (toggleSelection) and submits with submitAnswer().
3. Typing mode: user types chord names (submitTypedAnswer) with quick-fire auto-next on correct.
4. Reveal playback (playRevealSequence) replays target and selected/typed snapshots on review.

### Audio Lifecycle
1. ensureAudio() lazily creates Web Audio context + master gain.
2. refreshSoundfontCatalog() discovers local soundfont packs from soundfonts/.
3. playNotes / playPianoNote schedule SF2/sample playback, envelopes, and key animations.
4. stopNotesById / stopAllNotes release active sample voices and clear key timers.
5. Preview system (playPianoPreview) runs timed on/off/pedal events.

## File Inventory
| File | Kind | Runtime Role | Active | Lines |
|---|---|---|---|---:|
| index.html | HTML | Loaded directly | Yes | 435 |
| styles.css | CSS | Loaded directly | Yes | 2034 |
| js/app.audio.js | JavaScript | Reference snapshot | No (legacy/not loaded) | 681 |
| js/app.core.js | JavaScript | Reference snapshot | No (legacy/not loaded) | 523 |
| js/app.events.js | JavaScript | Reference snapshot | No (legacy/not loaded) | 462 |
| js/app.game.js | JavaScript | Reference snapshot | No (legacy/not loaded) | 582 |
| js/app.settings.js | JavaScript | Reference snapshot | No (legacy/not loaded) | 281 |
| js/audio.js | JavaScript | Browser runtime module | Yes | 1471 |
| js/core.js | JavaScript | Browser runtime module | Yes | 795 |
| js/events.js | JavaScript | Browser runtime module | Yes | 929 |
| js/game.js | JavaScript | Browser runtime module | Yes | 1419 |
| js/settings.js | JavaScript | Browser runtime module | Yes | 1122 |
| README.md | Markdown | Human + AI onboarding | Yes | 93 |
| AGENTS.md | Markdown | AI instruction override | Yes | 34 |
| PROJECT_MAP.md | Markdown | Generated reference map | Yes | 1034 |
| tools/generate-project-map.ps1 | PowerShell | Documentation generator | Yes | 500 |
| soundfonts/GeneralUser-GS.sf2 | Asset | Soundfont asset | Yes | 0 |
| soundfonts/index.json | JSON | Soundfont asset | Yes | 3 |
| soundfonts/README.md | Markdown | Soundfont asset | Yes | 39 |

## index.html Map
File: index.html (1-435)

### ID Anchors
| ID | Element | Line |
|---|---|---:|
| settings-toggle | <button> | 15 |
| theme-toggle | <button> | 23 |
| home-button | <button> | 30 |
| settings-panel | <aside> | 37 |
| note-count | <input> | 44 |
| note-count-value | <span> | 45 |
| options-trigger | <button> | 52 |
| piano-volume | <input> | 65 |
| volume-value | <span> | 66 |
| piano-trigger | <button> | 73 |
| piano-label | <span> | 75 |
| piano-preview-main | <button> | 80 |
| instrument-browser-trigger | <button> | 83 |
| note-length | <input> | 91 |
| length-value | <span> | 92 |
| advanced-trigger | <button> | 95 |
| key-count | <input> | 102 |
| key-count-value | <span> | 103 |
| start-note-down-oct | <button> | 111 |
| start-note-down | <button> | 113 |
| start-note-value | <span> | 114 |
| start-note-up | <button> | 115 |
| start-note-up-oct | <button> | 116 |
| reset-settings | <button> | 123 |
| advanced-panel | <section> | 126 |
| attack-label-value | <span> | 130 |
| attack-time | <input> | 133 |
| attack-ghost | <span> | 134 |
| attack-value | <span> | 136 |
| decay-label-value | <span> | 140 |
| decay-rate | <input> | 143 |
| decay-ghost | <span> | 144 |
| decay-value | <span> | 146 |
| release-label-value | <span> | 150 |
| release-rate | <input> | 153 |
| release-ghost | <span> | 154 |
| release-value | <span> | 156 |
| sustain-label-value | <span> | 160 |
| sustain-length | <input> | 163 |
| sustain-ghost | <span> | 164 |
| sustain-value | <span> | 166 |
| profile-search | <input> | 171 |
| profile-list | <div> | 172 |
| profile-meta | <div> | 173 |
| profile-save | <button> | 175 |
| profile-apply | <button> | 176 |
| test-envelope | <button> | 181 |
| piano-panel | <section> | 188 |
| piano-options | <div> | 190 |
| instrument-browser-panel | <section> | 193 |
| instrument-preset-search | <input> | 197 |
| instrument-preset-list | <div> | 198 |
| instrument-preset-meta | <div> | 199 |
| instrument-preset-apply | <button> | 201 |
| options-panel | <section> | 206 |
| practice-mode | <select> | 214 |
| blind-mode | <input> | 234 |
| nice-notes | <input> | 247 |
| chord-rounds | <input> | 260 |
| training-mode | <select> | 274 |
| chord-difficulty | <select> | 288 |
| chord-extra-helpers | <input> | 301 |
| typing-show-piano | <input> | 316 |
| typing-show-typed | <input> | 329 |
| primary-action | <button> | 348 |
| play-selected | <button> | 349 |
| keyboard | <div> | 355 |
| white-keys | <div> | 356 |
| black-keys | <div> | 357 |
| pedal-icon | <div> | 362 |
| chord-readout | <section> | 366 |
| typing-zone | <section> | 367 |
| chord-answer | <input> | 371 |
| typing-help-toggle | <button> | 372 |
| typing-help-text | <div> | 376 |
| chord-tutorial-open | <button> | 381 |
| status-panel | <section> | 386 |
| round-count | <span> | 388 |
| selected-list | <span> | 389 |
| goal-count | <span> | 390 |
| mode-label | <span> | 391 |
| hint-button | <button> | 394 |
| result | <div> | 396 |
| reveal | <div> | 397 |
| hint-flag | <div> | 398 |
| pedal-tip | <span> | 403 |
| chord-tutorial-modal | <section> | 407 |
| chord-tutorial-backdrop | <button> | 408 |
| chord-tutorial-title | <h4> | 411 |
| chord-tutorial-close | <button> | 412 |
| chord-tutorial-step | <div> | 414 |
| chord-tutorial-prev | <button> | 416 |
| chord-tutorial-progress | <span> | 417 |
| chord-tutorial-next | <button> | 418 |

### Script Load Order
| Order | Script | Line |
|---:|---|---:|
| 1 | vendor/libfluidsynth-2.4.6.js?v=20260305144756 | 423 |
| 2 | vendor/js-synthesizer.min.js?v=20260305144756 | 424 |
| 3 | js/core.js?v=20260305144756 | 425 |
| 4 | js/audio.js?v=20260305144756 | 426 |
| 5 | js/game.js?v=20260305144756 | 427 |
| 6 | js/settings.js?v=20260305144756 | 428 |
| 7 | js/events.js?v=20260305144756 | 429 |

## styles.css Map
File: styles.css (1-2034)

### Top-Level CSS Blocks
| Selector | Lines |
|---|---|
| :root | 3-99 |
| body.theme-dark | 101-189 |
| * | 191-193 |
| body | 195-207 |
| body.landing | 209-211 |
| .app | 213-229 |
| .hero | 231-234 |
| .badge | 236-249 |
| h1 | 251-255 |
| .hero-link | 256-259 |
| .hero-link:hover, .hero-link:focus-visible | 261-265 |
| .hero p | 267-273 |
| .control | 275-281 |
| .control.compact | 283-285 |
| .control.compact label | 287-289 |
| .control.compact .control-row | 291-293 |
| .control label | 295-302 |
| .control-row | 304-308 |
| .control-row.align-end | 310-313 |
| .start-note-row | 315-317 |
| .start-note-stepper | 319-329 |
| .start-note-value | 331-337 |
| .step-btn | 339-351 |
| .step-btn.oct | 353-359 |
| .step-btn:hover | 361-364 |
| .advanced-test | 366-369 |
| .advanced-test .unit | 371-374 |
| input[type="number"] | 376-385 |
| .segmented | 387-391 |
| .segmented-btn | 393-402 |
| .segmented-btn.active | 404-408 |
| .actions | 410-415 |
| .btn | 417-424 |
| .btn:focus-visible | 426-429 |
| .btn.primary | 431-435 |
| .btn.secondary | 437-441 |
| .btn.ghost | 443-447 |
| .btn.submit | 449-453 |
| .btn:hover | 455-457 |
| .chord-readout | 459-468 |
| .chord-readout[hidden] | 470-472 |
| .typing-zone | 474-481 |
| .typing-zone label | 483-489 |
| .typing-zone input[type="text"] | 491-500 |
| .typing-row | 502-504 |
| .typing-input-wrap | 506-508 |
| .typing-help-toggle | 510-526 |
| .typing-help-toggle:hover | 528-531 |
| .typing-help-toggle:focus-visible | 533-536 |
| .typing-help-text | 538-544 |
| .typing-help-text strong | 546-548 |
| .typing-help-actions | 550-552 |
| .typing-learn-btn | 554-564 |
| .typing-learn-btn:hover | 566-568 |
| .typing-learn-btn:focus-visible | 570-573 |
| .tutorial-modal | 575-582 |
| .tutorial-modal[hidden] | 584-586 |
| .tutorial-backdrop | 588-594 |
| .tutorial-card | 596-608 |
| .tutorial-head | 610-615 |
| .tutorial-head h4 | 617-621 |
| .tutorial-close | 623-625 |
| .tutorial-step | 627-634 |
| .tutorial-step-title | 636-639 |
| .tutorial-step-body | 641-645 |
| .tutorial-example-list | 647-652 |
| .tutorial-example-list code | 654-660 |
| .tutorial-actions | 662-667 |
| .tutorial-progress | 669-673 |
| .typing-zone[hidden] | 675-677 |
| .status | 679-685 |
| .status[hidden] | 687-689 |
| .status-actions | 691-697 |
| .hint-flag | 699-712 |
| .hint-flag[hidden] | 714-716 |
| .hint-button | 718-720 |
| .settings-toggle | 722-737 |
| .settings-toggle:hover | 739-741 |
| .settings-toggle svg | 743-747 |
| .theme-toggle | 749-764 |
| .theme-toggle:hover | 766-768 |
| .theme-toggle svg | 770-774 |
| .home-button | 776-791 |
| .home-button:hover | 793-795 |
| .home-button svg | 797-801 |
| .home-button[hidden] | 803-805 |
| .settings-panel | 807-826 |
| .settings-panel.open | 828-832 |
| .settings-panel h2 | 834-839 |
| .settings-body | 841-845 |
| .settings-grid | 847-850 |
| .advanced-trigger | 852-860 |
| .dropdown-trigger | 862-876 |
| .dropdown-trigger svg | 878-882 |
| .dropdown-trigger:focus-visible | 884-887 |
| .panel-trigger | 889-901 |
| .panel-trigger:hover | 903-906 |
| .panel-trigger[aria-expanded="true"] | 908-911 |
| .panel-trigger:focus-visible | 913-916 |
| .control select | 918-927 |
| .options-panel | 929-945 |
| .options-panel.open | 947-951 |
| .options-panel h3 | 953-960 |
| .options-grid | 962-965 |
| .options-panel .control | 967-973 |
| .options-panel .control.compact | 975-977 |
| .options-panel .control label | 979-981 |
| .options-section-title | 983-992 |
| .options-panel .options-section-title:first-child | 994-998 |
| .advanced-panel | 1000-1019 |
| .advanced-panel.open | 1021-1025 |
| .advanced-panel h3 | 1027-1032 |
| .advanced-grid | 1034-1043 |
| .advanced-grid::-webkit-scrollbar | 1045-1047 |
| .advanced-grid::-webkit-scrollbar-track | 1049-1052 |
| .advanced-grid::-webkit-scrollbar-thumb | 1054-1058 |
| .inline-value | 1060-1067 |
| .slider-stack | 1069-1072 |
| .slider-stack input[type="range"] | 1074-1078 |
| .slider-ghost | 1080-1094 |
| .slider-ghost.visible | 1096-1098 |
| .sf2-browser | 1100-1103 |
| .sf2-browser input[type="text"] | 1105-1114 |
| .sf2-preset-list | 1116-1129 |
| .sf2-browser .piano-desc | 1131-1134 |
| .sf2-browser .piano-desc.pending, .profile-browser .piano-desc.pending | 1137-1139 |
| .sf2-group | 1141-1146 |
| .sf2-group-title | 1148-1157 |
| .sf2-row | 1159-1167 |
| .sf2-row:first-child | 1169-1171 |
| .sf2-row:hover | 1173-1175 |
| .sf2-row.active | 1177-1180 |
| .sf2-row-name | 1182-1188 |
| .sf2-row-program, .sf2-row-bank | 1191-1195 |
| .sf2-empty | 1197-1201 |
| .profile-browser | 1203-1206 |
| .profile-browser input[type="text"] | 1208-1217 |
| .profile-list | 1219-1232 |
| .profile-row | 1234-1244 |
| .profile-row:hover | 1246-1248 |
| .profile-row.active | 1250-1253 |
| .profile-row.applied | 1255-1257 |
| .profile-row-name | 1259-1265 |
| .profile-row-kind | 1267-1272 |
| .advanced-footer | 1274-1280 |
| .piano-preview.wide | 1282-1294 |
| .piano-preview.wide::before | 1296-1298 |
| .piano-preview.wide .play-icon | 1300-1306 |
| .piano-preview.wide .play-label | 1308-1310 |
| .instrument-browser-panel | 1312-1327 |
| .instrument-browser-panel.open | 1329-1333 |
| .instrument-browser-panel h3 | 1335-1340 |
| .piano-panel | 1342-1357 |
| .piano-panel.open | 1359-1363 |
| .piano-panel h3 | 1365-1370 |
| .piano-options | 1372-1375 |
| .piano-option | 1377-1389 |
| .piano-option.active | 1391-1394 |
| .piano-option:focus-visible | 1396-1398 |
| .piano-info | 1400-1403 |
| .piano-name | 1405-1408 |
| .piano-desc | 1410-1413 |
| .piano-option.simple .piano-name | 1415-1419 |
| .piano-option.simple .piano-desc | 1421-1425 |
| .piano-preview | 1427-1442 |
| .piano-preview::before | 1444-1452 |
| .piano-preview:active | 1454-1457 |
| .piano-preview.main | 1459-1463 |
| .settings-grid input[type="range"], .advanced-panel input[type="range"] | 1466-1470 |
| .settings-grid input[type="range"]::-webkit-slider-runnable-track, .advanced-panel... | 1473-1478 |
| .settings-grid input[type="range"]::-webkit-slider-thumb, .advanced-panel input[ty... | 1481-1490 |
| .settings-grid input[type="range"]:focus-visible::-webkit-slider-thumb, .advanced-... | 1493-1496 |
| .settings-grid input[type="range"]::-moz-range-track, .advanced-panel input[type="... | 1499-1504 |
| .settings-grid input[type="range"]::-moz-range-thumb, .advanced-panel input[type="... | 1507-1514 |
| .settings-grid input[type="range"]:focus-visible::-moz-range-thumb, .advanced-pane... | 1517-1520 |
| .volume-value | 1522-1525 |
| .status-row | 1527-1532 |
| .switch | 1534-1538 |
| .switch input | 1540-1545 |
| .switch-track | 1547-1553 |
| .switch-thumb | 1555-1565 |
| .switch input:checked + .switch-track | 1567-1569 |
| .switch input:checked + .switch-track .switch-thumb | 1571-1573 |
| .control.compact .switch | 1575-1578 |
| .control.compact .switch-thumb | 1580-1585 |
| .control.compact .switch input:checked + .switch-track .switch-thumb | 1587-1589 |
| .control.compact .unit | 1591-1593 |
| .test-tone | 1595-1607 |
| .test-tone:hover | 1609-1612 |
| .test-tone:active | 1614-1616 |
| .test-tone-icon | 1618-1625 |
| .test-tone-label | 1627-1631 |
| .result | 1633-1636 |
| .reveal | 1638-1645 |
| .reveal strong | 1647-1649 |
| .reveal-label | 1651-1658 |
| .reveal-grid.compact | 1660-1664 |
| .reveal-cell | 1666-1668 |
| .keyboard-zone | 1670-1679 |
| .keyboard-stack | 1681-1691 |
| .keyboard-wrapper | 1693-1702 |
| .keyboard | 1704-1711 |
| .keyboard-wrapper.ends-black | 1713-1715 |
| .white-keys | 1717-1720 |
| .black-keys | 1722-1729 |
| .key | 1731-1742 |
| .key.white | 1744-1751 |
| .key.white.has-black | 1753-1755 |
| .key.black | 1757-1766 |
| .key span | 1768-1772 |
| .key.black span | 1774-1778 |
| .key.active | 1780-1783 |
| .key.black.active | 1785-1788 |
| .key.selected | 1790-1794 |
| .key.typed-preview | 1796-1798 |
| .key.correct | 1800-1804 |
| .key.wrong | 1806-1810 |
| .key.missed | 1812-1818 |
| .key.black.selected, .key.black.correct, .key.black.wrong | 1822-1824 |
| .key.black.missed | 1826-1832 |
| .keyboard.disabled | 1834-1840 |
| .keyboard.disabled::before | 1842-1854 |
| .keyboard.disabled::after | 1856-1890 |
| .tips | 1892-1900 |
| #pedal-tip[hidden] | 1902-1904 |
| .pedal-box | 1906-1920 |
| body.landing .pedal-box | 1922-1924 |
| .pedal-label | 1926-1936 |
| .pedal-icon | 1938-1945 |
| .pedal-icon.active | 1947-1950 |
| .note-pills | 1952-1958 |
| .note-pill | 1960-1966 |
| .note-pill.good | 1968-1972 |
| .note-pill.bad | 1974-1978 |
| @media (max-width: 700px) | 1980-2020 |
| @media (max-height: 820px) | 2022-2027 |
| @media (max-height: 700px) | 2029-2034 |

## Documentation + Tooling Maps
### README.md
File: README.md (1-93)
| Heading | Line |
|---|---:|
| TheEarLab | 1 |
| Read First | 5 |
| Project Layout | 18 |
| Run Locally | 32 |
| SF2 Behavior | 46 |
| Chord Training Modes | 61 |
| Maintenance Rules | 84 |
| Verification | 91 |

### AGENTS.md
File: AGENTS.md (1-34)
| Heading | Line |
|---|---:|
| Agent Instructions (Project Local) | 1 |
| Priority Order | 5 |
| Source of Truth | 10 |
| Required Update Workflow | 23 |
| Documentation Quality Bar | 31 |

### tools/generate-project-map.ps1
File: tools/generate-project-map.ps1 (1-500)
| Function | Start Line |
|---|---:|
| Get-LineCount | 9 |
| Count-Braces | 18 |
| Get-JsFunctionRanges | 25 |
| Get-JsEventBindings | 79 |
| Get-CssBlocks | 97 |
| Get-IndexIds | 159 |
| Get-IndexScripts | 177 |
| Get-MarkdownHeadings | 194 |
| Get-PsFunctionStarts | 212 |


## JavaScript Maps
### js/app.audio.js (Legacy / Not Loaded)
File lines: 1-681

| Symbol | Lines |
|---|---|
| ensureAudio | 1-16 |
| releaseVoices | 20-56 |
| stopAllNotes | 58-105 |
| stopNotesById | 107-120 |
| abortPlayback | 122-124 |
| createNoise | 126-136 |
| getEnvelopeState | 141-159 |
| scheduleEnvelope | 161-196 |
| getOscType | 198-198 |
| applyNoiseBurst | 200-223 |
| retriggerVoice | 225-256 |
| registerKeyTimer | 428-435 |
| unregisterKeyTimer | 437-446 |
| clearKeyTimersForNote | 448-456 |
| activateKey | 458-464 |
| scheduleKeyRelease | 466-479 |
| scheduleKeyAnimation | 481-492 |
| playNotes | 494-527 |
| playNotesNow | 529-532 |
| clearPreviewTimers | 534-537 |
| stopPreviewPlayback | 539-565 |
| schedulePreviewEvent | 567-573 |
| previewNoteOn | 575-586 |
| previewNoteOff | 588-597 |
| previewPedalOn | 599-618 |
| activate | 603-608 |
| previewPedalOff | 620-634 |
| buildPreviewSequence | 636-680 |

Event bindings:
| Target | Event | Line |
|---|---|---:|
| osc | ended | 416 |

### js/app.core.js (Legacy / Not Loaded)
File lines: 1-523

| Symbol | Lines |
|---|---|
| saveSettings | 247-262 |
| loadSettings | 264-291 |
| resetAllSettings | 293-305 |
| buildNotes | 353-368 |
| getNoteIdByMidi | 370-377 |
| isConsonant | 389-392 |
| getNicePool | 394-394 |
| getNoteCountMax | 396-400 |
| updateNoteCountMax | 402-410 |
| getCssNumber | 412-412 |
| clamp | 413-413 |
| getMaxStartMidi | 414-414 |
| clampStartMidi | 415-415 |
| getMidiLabel | 416-420 |
| getPanelBottomGap | 421-424 |
| renderPianoOptions | 426-466 |
| createKey | 468-479 |
| renderKeyboard | 481-513 |
| rebuildKeyboard | 515-522 |

### js/app.events.js (Legacy / Not Loaded)
File lines: 1-462

| Symbol | Lines |
|---|---|
| setRandomBackgroundAngle | 447-450 |

Event bindings:
| Target | Event | Line |
|---|---|---:|
| noteCountInput | input | 1 |
| noteCountInput | change | 8 |
| noteCountInput | pointerup | 12 |
| button | click | 17 |
| blindToggle | change | 25 |
| niceNotesToggle | change | 32 |
| resetSettingsButton | click | 40 |
| settingsToggle | click | 54 |
| themeToggle | click | 63 |
| settingsPanel | click | 71 |
| document | click | 81 |
| window | resize | 87 |
| playSelectedButton | click | 97 |
| playSelectedButton | pointerdown | 101 |
| playSelectedButton | pointerup | 106 |
| playSelectedButton | pointerleave | 110 |
| primaryActionButton | click | 114 |
| volumeSlider | input | 122 |
| lengthSlider | input | 128 |
| attackSlider | input | 134 |
| decaySlider | input | 141 |
| releaseSlider | input | 148 |
| sustainSlider | input | 155 |
| keyCountSlider | input | 161 |
| keyCountSlider | change | 168 |
| keyCountSlider | pointerup | 172 |
| hintButton | click | 176 |
| homeButton | click | 181 |
| volumeSlider | dblclick | 186 |
| lengthSlider | dblclick | 190 |
| keyCountSlider | dblclick | 194 |
| startNoteDownButton | click | 200 |
| startNoteUpButton | click | 203 |
| startNoteDownOctButton | click | 209 |
| startNoteUpOctButton | click | 212 |
| noteCountInput | dblclick | 217 |
| attackSlider | dblclick | 225 |
| decaySlider | dblclick | 230 |
| releaseSlider | dblclick | 235 |
| sustainSlider | dblclick | 240 |
| advancedTrigger | click | 244 |
| advancedPanel | click | 253 |
| pianoTrigger | click | 258 |
| pianoPanel | click | 270 |
| option | click | 276 |
| option | keydown | 281 |
| button | click | 291 |
| pianoPreviewMain | click | 299 |
| testEnvelopeButton | click | 306 |
| keyboardEl | pointerdown | 311 |
| document | pointerup | 342 |
| document | pointercancel | 349 |
| keyboardEl | click | 356 |
| document | keydown | 360 |
| document | keyup | 399 |
| pedalBox | pointerdown | 418 |
| pedalBox | pointerup | 426 |
| pedalBox | pointercancel | 434 |
| pedalBox | pointerleave | 441 |

### js/app.game.js (Legacy / Not Loaded)
File lines: 1-582

| Symbol | Lines |
|---|---|
| randomSample | 1-8 |
| getNiceTarget | 10-47 |
| createTarget | 49-81 |
| updatePrimaryAction | 83-86 |
| updateReplayAvailability | 88-92 |
| updateStatus | 94-138 |
| updateKeyStates | 140-166 |
| setKeyboardEnabled | 168-170 |
| updateKeyboardScale | 172-183 |
| lockKeyboardForPlayback | 185-197 |
| setSubmitted | 199-206 |
| refreshTarget | 208-219 |
| startRound | 221-240 |
| ensureRound | 242-251 |
| playTarget | 253-265 |
| startManualNote | 267-297 |
| releaseManualNote | 299-328 |
| releasePedalNotes | 330-340 |
| startPedalHold | 342-348 |
| stopPedalHold | 350-357 |
| toggleSelection | 359-384 |
| isSelectionCorrect | 386-392 |
| getPlaybackSpan | 394-399 |
| renderNotePills | 401-407 |
| renderPressedPills | 409-419 |
| playRevealSequence | 421-471 |
| playSelectedChord | 473-492 |
| startHeldPlayback | 494-530 |
| releaseHeldPlayback | 532-559 |
| submitAnswer | 561-581 |

### js/app.settings.js (Legacy / Not Loaded)
File lines: 1-281

| Symbol | Lines |
|---|---|
| clampNoteCount | 1-7 |
| setVolume | 9-19 |
| setPianoTone | 21-36 |
| setNoteLength | 38-47 |
| setAdsrParam | 49-52 |
| playPianoPreview | 54-77 |
| goHome | 79-88 |
| setKeyCount | 90-105 |
| setStartMidi | 107-116 |
| setKeyCountVisual | 118-122 |
| applyUiFromState | 124-157 |
| commitCriticalChange | 164-169 |
| commitNoteCountChange | 171-180 |
| handleCriticalSettingChange | 182-196 |
| openSettings | 198-203 |
| closeSettings | 205-222 |
| positionFloatingPanel | 224-248 |
| openAdvanced | 250-255 |
| closeAdvanced | 257-260 |
| positionPianoPanel | 262-265 |
| openPianoPanel | 267-274 |
| closePianoPanel | 276-281 |

### js/audio.js (Active Runtime)
File lines: 1-1471

| Symbol | Lines |
|---|---|
| clampValue | 58-58 |
| releaseRateToSeconds | 59-59 |
| getBaseAdsrForProgram | 60-65 |
| toUnixPath | 72-72 |
| getDirectoryPath | 74-78 |
| resolveRelativePath | 80-87 |
| normalizeManifestPath | 89-102 |
| fetchTextSafe | 104-119 |
| fetchJsonSafe | 121-136 |
| parseDirectoryListing | 138-149 |
| noteIdToMidi | 171-182 |
| frequencyToMidi | 184-187 |
| normalizeSampleEntries | 189-220 |
| normalizeSoundfontConfig | 222-244 |
| getFilenameFromPath | 246-250 |
| toManifestRelativePath | 252-262 |
| getManifestEntries | 264-267 |
| getManifestConfigPaths | 269-286 |
| getManifestSf2Paths | 288-305 |
| getDirectoryEntries | 307-310 |
| getDirectoryConfigPaths | 312-330 |
| getDirectorySf2Paths | 332-342 |
| discoverExternalSoundfonts | 344-358 |
| discoverSf2Paths | 360-364 |
| getSf2SimplePrograms | 366-374 |
| findSf2PresetName | 376-380 |
| createSf2SimplePresets | 382-404 |
| makeSf2PresetKey | 406-406 |
| ensureSf2SynthReady | 408-434 |
| loadSf2Pack | 436-468 |
| rebuildSf2PresetBrowser | 470-491 |
| refreshSf2PresetBrowserEntries | 493-498 |
| getSf2PresetBrowserEntries | 500-505 |
| selectSf2BrowserPreset | 507-537 |
| refreshSoundfontCatalog | 539-584 |
| ensureAudio | 586-623 |
| getSelectedSoundfont | 625-637 |
| getSourceEntry | 639-644 |
| removeVoice | 646-688 |
| releaseVoice | 690-732 |
| releaseVoices | 734-739 |
| stopAllNotes | 741-790 |
| stopNotesById | 792-804 |
| abortPlayback | 806-808 |
| getSoundfontEnvelope | 810-826 |
| scheduleSampleEnvelope | 828-845 |
| createGeneratedSampleBuffer | 847-890 |
| buildGeneratedSampleSet | 892-902 |
| decodeAudioBuffer | 904-911 |
| buildExternalSampleSet | 913-934 |
| applySf2TrimGenerators | 936-944 |
| getSf2NoteDuration | 946-950 |
| ensureSf2PresetReady | 952-966 |
| ensureSoundfontReady | 968-1044 |
| findNearestSample | 1046-1059 |
| scheduleSf2Note | 1061-1116 |
| noteOff | 1102-1108 |
| scheduleWithEntry | 1137-1182 |
| registerKeyTimer | 1197-1204 |
| unregisterKeyTimer | 1206-1215 |
| clearKeyTimersForNote | 1217-1225 |
| activateKey | 1227-1233 |
| scheduleKeyRelease | 1235-1248 |
| scheduleKeyAnimation | 1250-1261 |
| playNotes | 1263-1301 |
| playNotesNow | 1303-1306 |
| clearPreviewTimers | 1308-1311 |
| stopPreviewPlayback | 1313-1339 |
| schedulePreviewEvent | 1341-1347 |
| previewNoteOn | 1349-1360 |
| previewNoteOff | 1362-1371 |
| previewPedalOn | 1373-1392 |
| activate | 1377-1382 |
| previewPedalOff | 1394-1408 |
| buildPreviewSequence | 1410-1454 |

Event bindings:
| Target | Event | Line |
|---|---|---:|
| source | ended | 1179 |

### js/core.js (Active Runtime)
File lines: 1-795

| Symbol | Lines |
|---|---|
| normalizePracticeProfile | 296-314 |
| normalizePracticeProfiles | 315-322 |
| getEffectivePracticeModeFromState | 323-331 |
| capturePracticeProfileFromState | 332-351 |
| saveSettings | 417-445 |
| loadSettings | 447-499 |
| resetAllSettings | 501-528 |
| buildNotes | 576-591 |
| getNoteIdByMidi | 593-600 |
| isConsonant | 612-615 |
| getNicePool | 617-617 |
| getNoteCountMax | 619-623 |
| updateNoteCountMax | 625-633 |
| getCssNumber | 635-635 |
| clamp | 636-636 |
| getMaxStartMidi | 637-637 |
| clampStartMidi | 638-638 |
| getMidiLabel | 639-643 |
| getPanelBottomGap | 644-647 |
| normalizeSoundfontDefinition | 649-667 |
| setSoundfontCatalog | 669-690 |
| getSoundfontList | 692-692 |
| renderPianoOptions | 694-738 |
| createKey | 740-751 |
| renderKeyboard | 753-785 |
| rebuildKeyboard | 787-794 |

### js/events.js (Active Runtime)
File lines: 1-929

| Symbol | Lines |
|---|---|
| isChordTutorialOpen | 360-360 |
| renderChordTutorialStep | 362-381 |
| closeChordTutorial | 383-391 |
| openChordTutorial | 393-400 |
| isChordTypingCaptureActive | 440-445 |
| insertTypedCharacter | 447-454 |
| tryPlayTypedChordPreview | 456-459 |
| triggerPrimaryAction | 461-467 |
| triggerReplayAction | 469-475 |
| goHomeAction | 490-494 |
| bindPianoOptionEvents | 677-702 |
| setRandomBackgroundAngle | 895-898 |
| init | 900-923 |

Event bindings:
| Target | Event | Line |
|---|---|---:|
| noteCountInput | input | 4 |
| noteCountInput | change | 11 |
| noteCountInput | pointerup | 15 |
| button | click | 20 |
| blindToggle | change | 28 |
| niceNotesToggle | change | 35 |
| chordRoundsToggle | change | 50 |
| practiceModeSelect | change | 56 |
| trainingModeSelect | change | 63 |
| chordDifficultySelect | change | 82 |
| chordExtraHelpersToggle | change | 98 |
| typingShowPianoToggle | change | 109 |
| typingShowTypedToggle | change | 119 |
| resetSettingsButton | click | 131 |
| settingsToggle | click | 145 |
| themeToggle | click | 154 |
| settingsPanel | click | 162 |
| optionsTrigger | click | 179 |
| optionsPanel | click | 191 |
| document | click | 196 |
| window | resize | 204 |
| playSelectedButton | click | 220 |
| playSelectedButton | pointerdown | 224 |
| playSelectedButton | pointerup | 229 |
| playSelectedButton | pointerleave | 233 |
| primaryActionButton | click | 237 |
| volumeSlider | input | 245 |
| lengthSlider | input | 251 |
| attackSlider | input | 257 |
| decaySlider | input | 263 |
| releaseSlider | input | 269 |
| sustainSlider | input | 275 |
| keyCountSlider | input | 281 |
| keyCountSlider | change | 288 |
| keyCountSlider | pointerup | 292 |
| hintButton | click | 296 |
| chordAnswerInput | input | 301 |
| chordAnswerInput | keydown | 308 |
| typingHelpToggle | click | 316 |
| chordTutorialOpen | click | 403 |
| chordTutorialClose | click | 410 |
| chordTutorialBackdrop | click | 417 |
| chordTutorialPrev | click | 423 |
| chordTutorialNext | click | 430 |
| homeButton | click | 478 |
| heroTitle | click | 495 |
| heroTitle | keydown | 496 |
| volumeSlider | dblclick | 504 |
| lengthSlider | dblclick | 508 |
| keyCountSlider | dblclick | 512 |
| startNoteDownButton | click | 518 |
| startNoteUpButton | click | 521 |
| startNoteDownOctButton | click | 527 |
| startNoteUpOctButton | click | 530 |
| noteCountInput | dblclick | 535 |
| attackSlider | dblclick | 543 |
| decaySlider | dblclick | 547 |
| releaseSlider | dblclick | 551 |
| sustainSlider | dblclick | 555 |
| profileSearch | input | 560 |
| profileList | click | 566 |
| profileList | dblclick | 571 |
| profileList | keydown | 574 |
| profileApply | click | 585 |
| profileSave | click | 591 |
| instrumentPresetSearch | input | 597 |
| instrumentPresetList | click | 603 |
| instrumentPresetList | dblclick | 608 |
| instrumentPresetList | keydown | 611 |
| instrumentPresetApply | click | 622 |
| advancedTrigger | click | 627 |
| advancedPanel | click | 636 |
| pianoTrigger | click | 641 |
| pianoPanel | click | 653 |
| instrumentBrowserTrigger | click | 659 |
| instrumentBrowserPanel | click | 672 |
| pianoOptionsContainer | click | 680 |
| pianoOptionsContainer | keydown | 694 |
| pianoPreviewMain | click | 705 |
| testEnvelopeButton | click | 712 |
| keyboardEl | pointerdown | 717 |
| document | pointerup | 749 |
| document | pointercancel | 756 |
| keyboardEl | click | 763 |
| document | keydown | 767 |
| document | keyup | 847 |
| pedalBox | pointerdown | 866 |
| pedalBox | pointerup | 874 |
| pedalBox | pointercancel | 882 |
| pedalBox | pointerleave | 889 |

### js/game.js (Active Runtime)
File lines: 1-1419

| Symbol | Lines |
|---|---|
| normalizeQualityToken | 104-116 |
| isTypingEnabled | 125-125 |
| isTypingOnlyMode | 126-126 |
| getIsChordRound | 127-127 |
| getEffectiveBlindMode | 128-128 |
| getKeyboardZoneEl | 129-129 |
| normalizePitchClass | 130-130 |
| getRootName | 131-131 |
| getMidiFromNoteId | 132-132 |
| buildChordLabel | 133-133 |
| getPitchClassSetFromNoteIds | 135-143 |
| getChordDifficultyId | 145-150 |
| getChordDifficultyConfig | 152-155 |
| getAllowedChordQualities | 157-162 |
| getChordQualityHint | 164-167 |
| getVoicingHintLabel | 169-173 |
| randomSample | 175-182 |
| getNiceTarget | 184-221 |
| getQualityPitchClassSet | 223-229 |
| parseChordInput | 231-259 |
| detectChordFromNoteIds | 261-297 |
| normalizeIntervals | 299-301 |
| fitIntervalsToAvailableRange | 303-323 |
| buildVoicedIntervals | 325-353 |
| chooseRootCandidatesForIntervals | 355-364 |
| buildChordFromRoot | 366-393 |
| createChordTarget | 395-439 |
| createNoteTarget | 441-474 |
| createTarget | 476-482 |
| clearTypingAutoNext | 484-488 |
| getTypedPreviewNoteIds | 490-508 |
| updateTypedPreviewFromInput | 510-520 |
| updateChordReadout | 522-572 |
| updateModeVisibility | 574-591 |
| updatePrimaryAction | 593-598 |
| updateReplayAvailability | 600-609 |
| getChordHelperText | 611-621 |
| updateStatus | 623-715 |
| updateKeyStates | 717-752 |
| setKeyboardEnabled | 754-757 |
| updateKeyboardScale | 759-770 |
| lockKeyboardForPlayback | 772-785 |
| setSubmitted | 787-794 |
| refreshTarget | 796-815 |
| startRound | 817-850 |
| ensureRound | 852-861 |
| playTarget | 863-877 |
| startManualNote | 879-909 |
| releaseManualNote | 911-939 |
| releasePedalNotes | 941-951 |
| startPedalHold | 953-959 |
| stopPedalHold | 961-968 |
| toggleSelection | 970-1001 |
| isSelectionCorrect | 1003-1020 |
| getPlaybackSpan | 1022-1027 |
| renderNotePills | 1029-1035 |
| renderChordPill | 1037-1040 |
| renderTonePills | 1042-1050 |
| renderRevealCell | 1052-1055 |
| renderChordRevealGrid | 1057-1060 |
| renderChordDetectionMeta | 1062-1066 |
| renderPressedPills | 1068-1073 |
| playRevealSequence | 1075-1126 |
| playSelectedChord | 1128-1151 |
| playTypedInputChord | 1153-1167 |
| startHeldPlayback | 1169-1209 |
| releaseHeldPlayback | 1211-1241 |
| buildTypingRevealDetail | 1243-1257 |
| submitTypedAnswer | 1259-1335 |
| submitAnswer | 1337-1399 |

### js/settings.js (Active Runtime)
File lines: 1-1122

| Symbol | Lines |
|---|---|
| clampNoteCount | 63-69 |
| clampTrim | 71-71 |
| clampMetricValue | 84-84 |
| trimToSliderValue | 85-85 |
| sliderToTrim | 86-90 |
| formatSeconds | 91-91 |
| formatHold | 92-92 |
| formatProgramId | 93-93 |
| formatBankId | 94-94 |
| getSf2PresetGroupName | 101-107 |
| getBaseEnvelope | 112-121 |
| resolveEnvelopeMetrics | 123-132 |
| sanitizeCustomProfile | 142-157 |
| normalizeCustomProfiles | 159-174 |
| getAllProfiles | 176-188 |
| getProfileById | 190-194 |
| setGhostMarker | 196-201 |
| clearGhostMarker | 203-206 |
| updateGhostMarkers | 208-221 |
| syncDirtyFromApplied | 223-230 |
| applyAdsrTrimUi | 232-255 |
| updateInstrumentPresetMeta | 257-285 |
| renderInstrumentPresetBrowser | 287-348 |
| refreshInstrumentPresetBrowser | 350-360 |
| setInstrumentPresetSelection | 362-366 |
| updateProfileMeta | 368-393 |
| renderResponseProfileBrowser | 395-441 |
| refreshResponseProfileBrowser | 443-457 |
| setResponseProfileSelection | 459-463 |
| applyResponseProfileById | 465-476 |
| applyResponseProfileSelection | 478-481 |
| saveCurrentResponseProfile | 483-505 |
| promptSaveCurrentResponseProfile | 507-511 |
| discardManualProfileChanges | 513-525 |
| resetAdsrTrim | 527-529 |
| resolveInstrumentSwitchProfileAction | 531-558 |
| applyInstrumentPresetSelection | 560-566 |
| setVolume | 568-578 |
| setPianoTone | 580-633 |
| setNoteLength | 635-644 |
| setAdsrTrim | 646-653 |
| playPianoPreview | 655-678 |
| goHome | 680-699 |
| setKeyCount | 701-716 |
| setStartMidi | 718-727 |
| setKeyCountVisual | 729-733 |
| getEffectivePracticeMode | 735-739 |
| refreshOptionsModeVisibility | 741-759 |
| setPracticeMode | 761-832 |
| applyUiFromState | 834-892 |
| commitCriticalChange | 899-904 |
| commitNoteCountChange | 906-915 |
| handleCriticalSettingChange | 917-931 |
| openSettings | 933-938 |
| closeSettings | 940-959 |
| positionFloatingPanel | 961-987 |
| positionOptionsPanel | 989-992 |
| openOptionsPanel | 994-1003 |
| closeOptionsPanel | 1005-1010 |
| openAdvanced | 1012-1020 |
| closeAdvanced | 1022-1025 |
| positionPianoPanel | 1027-1030 |
| openPianoPanel | 1032-1042 |
| closePianoPanel | 1044-1049 |
| positionInstrumentBrowserPanel | 1051-1054 |
| openInstrumentBrowser | 1056-1066 |
| closeInstrumentBrowser | 1068-1073 |

## Maintenance Notes
- js/app.*.js is an older branch snapshot. Keep it for reference unless explicitly retired.
- Functional edits should target loaded scripts first: core.js, audio.js, game.js, settings.js, events.js.
- If you intentionally switch runtime scripts, update script tags in index.html and regenerate this file.
- After verification, commit and push the updated files when repository remotes are configured.

