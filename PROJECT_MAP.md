# Project Map

Generated: 2026-03-05 15:11:25 +01:00

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
| index.html | HTML | Loaded directly | Yes | 459 |
| styles.css | CSS | Loaded directly | Yes | 2222 |
| js/app.audio.js | JavaScript | Reference snapshot | No (legacy/not loaded) | 681 |
| js/app.core.js | JavaScript | Reference snapshot | No (legacy/not loaded) | 523 |
| js/app.events.js | JavaScript | Reference snapshot | No (legacy/not loaded) | 462 |
| js/app.game.js | JavaScript | Reference snapshot | No (legacy/not loaded) | 582 |
| js/app.settings.js | JavaScript | Reference snapshot | No (legacy/not loaded) | 281 |
| js/audio.js | JavaScript | Browser runtime module | Yes | 1471 |
| js/core.js | JavaScript | Browser runtime module | Yes | 807 |
| js/events.js | JavaScript | Browser runtime module | Yes | 1293 |
| js/game.js | JavaScript | Browser runtime module | Yes | 1419 |
| js/settings.js | JavaScript | Browser runtime module | Yes | 1122 |
| README.md | Markdown | Human + AI onboarding | Yes | 94 |
| AGENTS.md | Markdown | AI instruction override | Yes | 34 |
| PROJECT_MAP.md | Markdown | Generated reference map | Yes | 1034 |
| tools/generate-project-map.ps1 | PowerShell | Documentation generator | Yes | 500 |
| soundfonts/GeneralUser-GS.sf2 | Asset | Soundfont asset | Yes | 0 |
| soundfonts/index.json | JSON | Soundfont asset | Yes | 3 |
| soundfonts/README.md | Markdown | Soundfont asset | Yes | 39 |

## index.html Map
File: index.html (1-459)

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
| chord-tutorial-current | <div> | 416 |
| chord-tutorial-root-list | <div> | 420 |
| chord-tutorial-quality-list | <div> | 424 |
| chord-tutorial-piano | <div> | 429 |
| chord-tutorial-examples | <div> | 433 |
| chord-tutorial-play | <button> | 436 |
| chord-tutorial-prev | <button> | 440 |
| chord-tutorial-progress | <span> | 441 |
| chord-tutorial-next | <button> | 442 |

### Script Load Order
| Order | Script | Line |
|---:|---|---:|
| 1 | vendor/libfluidsynth-2.4.6.js?v=20260305151105 | 447 |
| 2 | vendor/js-synthesizer.min.js?v=20260305151105 | 448 |
| 3 | js/core.js?v=20260305151105 | 449 |
| 4 | js/audio.js?v=20260305151105 | 450 |
| 5 | js/game.js?v=20260305151105 | 451 |
| 6 | js/settings.js?v=20260305151105 | 452 |
| 7 | js/events.js?v=20260305151105 | 453 |

## styles.css Map
File: styles.css (1-2222)

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
| .tutorial-lab | 675-682 |
| .tutorial-current | 684-688 |
| .tutorial-selectors | 690-693 |
| .tutorial-selector-block | 695-698 |
| .tutorial-selector-title | 700-706 |
| .tutorial-chip-list | 708-712 |
| .tutorial-chip | 714-724 |
| .tutorial-chip:hover, .tutorial-chip:focus-visible | 727-730 |
| .tutorial-chip.active | 732-735 |
| .tutorial-chip.example | 737-739 |
| .tutorial-chip.muted | 741-744 |
| .tutorial-chip.muted:hover, .tutorial-chip.muted:focus-visible | 747-749 |
| .tutorial-piano-wrap | 751-756 |
| .tutorial-piano-title | 758-765 |
| .tutorial-piano | 767-778 |
| .tutorial-key | 780-785 |
| .tutorial-key.white | 787-795 |
| .tutorial-key.black | 797-805 |
| .tutorial-key.tone | 807-809 |
| .tutorial-key.tone.root | 811-813 |
| .tutorial-key[data-role]::after | 815-828 |
| .tutorial-lab-actions | 830-833 |
| .typing-zone[hidden] | 835-837 |
| .status | 839-845 |
| .status[hidden] | 847-849 |
| .status-actions | 851-857 |
| .hint-flag | 859-872 |
| .hint-flag[hidden] | 874-876 |
| .hint-button | 878-880 |
| .settings-toggle | 882-897 |
| .settings-toggle:hover | 899-901 |
| .settings-toggle svg | 903-907 |
| .theme-toggle | 909-924 |
| .theme-toggle:hover | 926-928 |
| .theme-toggle svg | 930-934 |
| .home-button | 936-951 |
| .home-button:hover | 953-955 |
| .home-button svg | 957-961 |
| .home-button[hidden] | 963-965 |
| .settings-panel | 967-986 |
| .settings-panel.open | 988-992 |
| .settings-panel h2 | 994-999 |
| .settings-body | 1001-1005 |
| .settings-grid | 1007-1010 |
| .advanced-trigger | 1012-1020 |
| .dropdown-trigger | 1022-1036 |
| .dropdown-trigger svg | 1038-1042 |
| .dropdown-trigger:focus-visible | 1044-1047 |
| .panel-trigger | 1049-1061 |
| .panel-trigger:hover | 1063-1066 |
| .panel-trigger[aria-expanded="true"] | 1068-1071 |
| .panel-trigger:focus-visible | 1073-1076 |
| .control select | 1078-1087 |
| .options-panel | 1089-1105 |
| .options-panel.open | 1107-1111 |
| .options-panel h3 | 1113-1120 |
| .options-grid | 1122-1125 |
| .options-panel .control | 1127-1133 |
| .options-panel .control.compact | 1135-1137 |
| .options-panel .control label | 1139-1141 |
| .options-section-title | 1143-1152 |
| .options-panel .options-section-title:first-child | 1154-1158 |
| .advanced-panel | 1160-1179 |
| .advanced-panel.open | 1181-1185 |
| .advanced-panel h3 | 1187-1192 |
| .advanced-grid | 1194-1203 |
| .advanced-grid::-webkit-scrollbar | 1205-1207 |
| .advanced-grid::-webkit-scrollbar-track | 1209-1212 |
| .advanced-grid::-webkit-scrollbar-thumb | 1214-1218 |
| .inline-value | 1220-1227 |
| .slider-stack | 1229-1232 |
| .slider-stack input[type="range"] | 1234-1238 |
| .slider-ghost | 1240-1254 |
| .slider-ghost.visible | 1256-1258 |
| .sf2-browser | 1260-1263 |
| .sf2-browser input[type="text"] | 1265-1274 |
| .sf2-preset-list | 1276-1289 |
| .sf2-browser .piano-desc | 1291-1294 |
| .sf2-browser .piano-desc.pending, .profile-browser .piano-desc.pending | 1297-1299 |
| .sf2-group | 1301-1306 |
| .sf2-group-title | 1308-1317 |
| .sf2-row | 1319-1327 |
| .sf2-row:first-child | 1329-1331 |
| .sf2-row:hover | 1333-1335 |
| .sf2-row.active | 1337-1340 |
| .sf2-row-name | 1342-1348 |
| .sf2-row-program, .sf2-row-bank | 1351-1355 |
| .sf2-empty | 1357-1361 |
| .profile-browser | 1363-1366 |
| .profile-browser input[type="text"] | 1368-1377 |
| .profile-list | 1379-1392 |
| .profile-row | 1394-1404 |
| .profile-row:hover | 1406-1408 |
| .profile-row.active | 1410-1413 |
| .profile-row.applied | 1415-1417 |
| .profile-row-name | 1419-1425 |
| .profile-row-kind | 1427-1432 |
| .advanced-footer | 1434-1440 |
| .piano-preview.wide | 1442-1454 |
| .piano-preview.wide::before | 1456-1458 |
| .piano-preview.wide .play-icon | 1460-1466 |
| .piano-preview.wide .play-label | 1468-1470 |
| .instrument-browser-panel | 1472-1487 |
| .instrument-browser-panel.open | 1489-1493 |
| .instrument-browser-panel h3 | 1495-1500 |
| .piano-panel | 1502-1517 |
| .piano-panel.open | 1519-1523 |
| .piano-panel h3 | 1525-1530 |
| .piano-options | 1532-1535 |
| .piano-option | 1537-1549 |
| .piano-option.active | 1551-1554 |
| .piano-option:focus-visible | 1556-1558 |
| .piano-info | 1560-1563 |
| .piano-name | 1565-1568 |
| .piano-desc | 1570-1573 |
| .piano-option.simple .piano-name | 1575-1579 |
| .piano-option.simple .piano-desc | 1581-1585 |
| .piano-preview | 1587-1602 |
| .piano-preview::before | 1604-1612 |
| .piano-preview:active | 1614-1617 |
| .piano-preview.main | 1619-1623 |
| .settings-grid input[type="range"], .advanced-panel input[type="range"] | 1626-1630 |
| .settings-grid input[type="range"]::-webkit-slider-runnable-track, .advanced-panel... | 1633-1638 |
| .settings-grid input[type="range"]::-webkit-slider-thumb, .advanced-panel input[ty... | 1641-1650 |
| .settings-grid input[type="range"]:focus-visible::-webkit-slider-thumb, .advanced-... | 1653-1656 |
| .settings-grid input[type="range"]::-moz-range-track, .advanced-panel input[type="... | 1659-1664 |
| .settings-grid input[type="range"]::-moz-range-thumb, .advanced-panel input[type="... | 1667-1674 |
| .settings-grid input[type="range"]:focus-visible::-moz-range-thumb, .advanced-pane... | 1677-1680 |
| .volume-value | 1682-1685 |
| .status-row | 1687-1692 |
| .switch | 1694-1698 |
| .switch input | 1700-1705 |
| .switch-track | 1707-1713 |
| .switch-thumb | 1715-1725 |
| .switch input:checked + .switch-track | 1727-1729 |
| .switch input:checked + .switch-track .switch-thumb | 1731-1733 |
| .control.compact .switch | 1735-1738 |
| .control.compact .switch-thumb | 1740-1745 |
| .control.compact .switch input:checked + .switch-track .switch-thumb | 1747-1749 |
| .control.compact .unit | 1751-1753 |
| .test-tone | 1755-1767 |
| .test-tone:hover | 1769-1772 |
| .test-tone:active | 1774-1776 |
| .test-tone-icon | 1778-1785 |
| .test-tone-label | 1787-1791 |
| .result | 1793-1796 |
| .reveal | 1798-1805 |
| .reveal strong | 1807-1809 |
| .reveal-label | 1811-1818 |
| .reveal-grid.compact | 1820-1824 |
| .reveal-cell | 1826-1828 |
| .keyboard-zone | 1830-1839 |
| .keyboard-stack | 1841-1851 |
| .keyboard-wrapper | 1853-1862 |
| .keyboard | 1864-1871 |
| .keyboard-wrapper.ends-black | 1873-1875 |
| .white-keys | 1877-1880 |
| .black-keys | 1882-1889 |
| .key | 1891-1902 |
| .key.white | 1904-1911 |
| .key.white.has-black | 1913-1915 |
| .key.black | 1917-1926 |
| .key span | 1928-1932 |
| .key.black span | 1934-1938 |
| .key.active | 1940-1943 |
| .key.black.active | 1945-1948 |
| .key.selected | 1950-1954 |
| .key.typed-preview | 1956-1958 |
| .key.correct | 1960-1964 |
| .key.wrong | 1966-1970 |
| .key.missed | 1972-1978 |
| .key.black.selected, .key.black.correct, .key.black.wrong | 1982-1984 |
| .key.black.missed | 1986-1992 |
| .keyboard.disabled | 1994-2000 |
| body.tutorial-open .keyboard | 2002-2004 |
| body.tutorial-open .keyboard.disabled | 2006-2009 |
| .keyboard.disabled::before | 2011-2023 |
| body.tutorial-open .keyboard.disabled::before | 2025-2027 |
| .keyboard.disabled::after | 2029-2063 |
| body.tutorial-open .keyboard.disabled::after | 2065-2067 |
| .tips | 2069-2077 |
| #pedal-tip[hidden] | 2079-2081 |
| .pedal-box | 2083-2097 |
| body.landing .pedal-box | 2099-2101 |
| .pedal-label | 2103-2113 |
| .pedal-icon | 2115-2122 |
| .pedal-icon.active | 2124-2127 |
| .note-pills | 2129-2135 |
| .note-pill | 2137-2143 |
| .note-pill.good | 2145-2149 |
| .note-pill.bad | 2151-2155 |
| @media (max-width: 700px) | 2157-2208 |
| @media (max-height: 820px) | 2210-2215 |
| @media (max-height: 700px) | 2217-2222 |

## Documentation + Tooling Maps
### README.md
File: README.md (1-94)
| Heading | Line |
|---|---:|
| TheEarLab | 1 |
| Read First | 5 |
| Project Layout | 18 |
| Run Locally | 32 |
| SF2 Behavior | 46 |
| Chord Training Modes | 61 |
| Maintenance Rules | 85 |
| Verification | 92 |

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
File lines: 1-807

| Symbol | Lines |
|---|---|
| normalizePracticeProfile | 308-326 |
| normalizePracticeProfiles | 327-334 |
| getEffectivePracticeModeFromState | 335-343 |
| capturePracticeProfileFromState | 344-363 |
| saveSettings | 429-457 |
| loadSettings | 459-511 |
| resetAllSettings | 513-540 |
| buildNotes | 588-603 |
| getNoteIdByMidi | 605-612 |
| isConsonant | 624-627 |
| getNicePool | 629-629 |
| getNoteCountMax | 631-635 |
| updateNoteCountMax | 637-645 |
| getCssNumber | 647-647 |
| clamp | 648-648 |
| getMaxStartMidi | 649-649 |
| clampStartMidi | 650-650 |
| getMidiLabel | 651-655 |
| getPanelBottomGap | 656-659 |
| normalizeSoundfontDefinition | 661-679 |
| setSoundfontCatalog | 681-702 |
| getSoundfontList | 704-704 |
| renderPianoOptions | 706-750 |
| createKey | 752-763 |
| renderKeyboard | 765-797 |
| rebuildKeyboard | 799-806 |

### js/events.js (Active Runtime)
File lines: 1-1293

| Symbol | Lines |
|---|---|
| isChordTutorialOpen | 436-436 |
| getTutorialStep | 438-443 |
| getTutorialRootLabel | 445-448 |
| getTutorialChordLabel | 450-455 |
| midiToTutorialLabel | 457-461 |
| getClosestNoteIdFromMidi | 463-470 |
| getTutorialRenderedChord | 472-495 |
| ensureTutorialKeyboard | 497-535 |
| getStepAllowedQualityIds | 537-543 |
| getTutorialActiveSpec | 545-547 |
| renderTutorialCurrentText | 549-561 |
| renderTutorialPianoHighlight | 563-581 |
| renderTutorialRootOptions | 583-589 |
| renderTutorialQualityOptions | 591-603 |
| renderTutorialExampleOptions | 605-618 |
| refreshTutorialVisuals | 620-624 |
| renderChordTutorialStep | 640-657 |
| closeChordTutorial | 659-667 |
| openChordTutorial | 669-677 |
| isChordTypingCaptureActive | 794-799 |
| insertTypedCharacter | 801-808 |
| tryPlayTypedChordPreview | 810-813 |
| triggerPrimaryAction | 815-821 |
| triggerReplayAction | 823-829 |
| goHomeAction | 844-848 |
| bindPianoOptionEvents | 1031-1056 |
| setRandomBackgroundAngle | 1259-1262 |
| init | 1264-1287 |

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
| chordTutorialOpen | click | 680 |
| chordTutorialClose | click | 687 |
| chordTutorialBackdrop | click | 694 |
| chordTutorialPrev | click | 700 |
| chordTutorialNext | click | 708 |
| chordTutorialRootList | click | 720 |
| chordTutorialQualityList | click | 733 |
| chordTutorialExamples | mouseover | 746 |
| chordTutorialExamples | mouseleave | 755 |
| chordTutorialExamples | focusin | 759 |
| chordTutorialExamples | focusout | 768 |
| chordTutorialExamples | click | 772 |
| chordTutorialPlay | click | 789 |
| homeButton | click | 832 |
| heroTitle | click | 849 |
| heroTitle | keydown | 850 |
| volumeSlider | dblclick | 858 |
| lengthSlider | dblclick | 862 |
| keyCountSlider | dblclick | 866 |
| startNoteDownButton | click | 872 |
| startNoteUpButton | click | 875 |
| startNoteDownOctButton | click | 881 |
| startNoteUpOctButton | click | 884 |
| noteCountInput | dblclick | 889 |
| attackSlider | dblclick | 897 |
| decaySlider | dblclick | 901 |
| releaseSlider | dblclick | 905 |
| sustainSlider | dblclick | 909 |
| profileSearch | input | 914 |
| profileList | click | 920 |
| profileList | dblclick | 925 |
| profileList | keydown | 928 |
| profileApply | click | 939 |
| profileSave | click | 945 |
| instrumentPresetSearch | input | 951 |
| instrumentPresetList | click | 957 |
| instrumentPresetList | dblclick | 962 |
| instrumentPresetList | keydown | 965 |
| instrumentPresetApply | click | 976 |
| advancedTrigger | click | 981 |
| advancedPanel | click | 990 |
| pianoTrigger | click | 995 |
| pianoPanel | click | 1007 |
| instrumentBrowserTrigger | click | 1013 |
| instrumentBrowserPanel | click | 1026 |
| pianoOptionsContainer | click | 1034 |
| pianoOptionsContainer | keydown | 1048 |
| pianoPreviewMain | click | 1059 |
| testEnvelopeButton | click | 1066 |
| keyboardEl | pointerdown | 1071 |
| document | pointerup | 1107 |
| document | pointercancel | 1114 |
| keyboardEl | click | 1121 |
| document | keydown | 1125 |
| document | keyup | 1207 |
| pedalBox | pointerdown | 1226 |
| pedalBox | pointerup | 1235 |
| pedalBox | pointercancel | 1244 |
| pedalBox | pointerleave | 1252 |

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

