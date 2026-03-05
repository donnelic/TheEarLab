# Project Map

Generated: 2026-03-05 16:25:33 +01:00

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
| index.html | HTML | Loaded directly | Yes | 452 |
| styles.css | CSS | Loaded directly | Yes | 2279 |
| js/app.audio.js | JavaScript | Reference snapshot | No (legacy/not loaded) | 681 |
| js/app.core.js | JavaScript | Reference snapshot | No (legacy/not loaded) | 523 |
| js/app.events.js | JavaScript | Reference snapshot | No (legacy/not loaded) | 462 |
| js/app.game.js | JavaScript | Reference snapshot | No (legacy/not loaded) | 582 |
| js/app.settings.js | JavaScript | Reference snapshot | No (legacy/not loaded) | 281 |
| js/audio.js | JavaScript | Browser runtime module | Yes | 1471 |
| js/core.js | JavaScript | Browser runtime module | Yes | 809 |
| js/events.js | JavaScript | Browser runtime module | Yes | 1271 |
| js/game.js | JavaScript | Browser runtime module | Yes | 1461 |
| js/settings.js | JavaScript | Browser runtime module | Yes | 1104 |
| README.md | Markdown | Human + AI onboarding | Yes | 96 |
| AGENTS.md | Markdown | AI instruction override | Yes | 34 |
| PROJECT_MAP.md | Markdown | Generated reference map | Yes | 1088 |
| tools/generate-project-map.ps1 | PowerShell | Documentation generator | Yes | 500 |
| soundfonts/GeneralUser-GS.sf2 | Asset | Soundfont asset | Yes | 0 |
| soundfonts/index.json | JSON | Soundfont asset | Yes | 3 |
| soundfonts/README.md | Markdown | Soundfont asset | Yes | 39 |

## index.html Map
File: index.html (1-452)

### ID Anchors
| ID | Element | Line |
|---|---|---:|
| settings-toggle | <button> | 15 |
| theme-toggle | <button> | 23 |
| settings-panel | <aside> | 30 |
| options-trigger | <button> | 37 |
| piano-volume | <input> | 50 |
| volume-value | <span> | 51 |
| piano-trigger | <button> | 58 |
| piano-label | <span> | 60 |
| piano-preview-main | <button> | 65 |
| instrument-browser-trigger | <button> | 68 |
| note-length | <input> | 76 |
| length-value | <span> | 77 |
| advanced-trigger | <button> | 80 |
| key-count | <input> | 87 |
| key-count-value | <span> | 88 |
| start-note-down-oct | <button> | 96 |
| start-note-down | <button> | 98 |
| start-note-value | <span> | 99 |
| start-note-up | <button> | 100 |
| start-note-up-oct | <button> | 101 |
| reset-settings | <button> | 108 |
| advanced-panel | <section> | 111 |
| attack-label-value | <span> | 115 |
| attack-time | <input> | 118 |
| attack-ghost | <span> | 119 |
| attack-value | <span> | 121 |
| decay-label-value | <span> | 125 |
| decay-rate | <input> | 128 |
| decay-ghost | <span> | 129 |
| decay-value | <span> | 131 |
| release-label-value | <span> | 135 |
| release-rate | <input> | 138 |
| release-ghost | <span> | 139 |
| release-value | <span> | 141 |
| sustain-label-value | <span> | 145 |
| sustain-length | <input> | 148 |
| sustain-ghost | <span> | 149 |
| sustain-value | <span> | 151 |
| profile-search | <input> | 156 |
| profile-list | <div> | 157 |
| profile-meta | <div> | 158 |
| profile-save | <button> | 160 |
| profile-apply | <button> | 161 |
| test-envelope | <button> | 166 |
| piano-panel | <section> | 173 |
| piano-options | <div> | 175 |
| instrument-browser-panel | <section> | 178 |
| instrument-preset-search | <input> | 182 |
| instrument-preset-list | <div> | 183 |
| instrument-preset-meta | <div> | 184 |
| instrument-preset-apply | <button> | 186 |
| options-panel | <section> | 191 |
| practice-mode | <select> | 199 |
| note-count | <input> | 210 |
| note-count-value | <span> | 211 |
| blind-mode | <input> | 227 |
| nice-notes | <input> | 240 |
| chord-rounds | <input> | 253 |
| training-mode | <select> | 267 |
| chord-difficulty | <select> | 281 |
| chord-extra-helpers | <input> | 294 |
| typing-show-piano | <input> | 309 |
| typing-show-typed | <input> | 322 |
| primary-action | <button> | 341 |
| play-selected | <button> | 342 |
| keyboard | <div> | 348 |
| white-keys | <div> | 349 |
| black-keys | <div> | 350 |
| pedal-icon | <div> | 355 |
| chord-readout | <section> | 359 |
| typing-zone | <section> | 360 |
| chord-answer | <input> | 364 |
| typing-help-toggle | <button> | 365 |
| typing-help-text | <div> | 369 |
| chord-tutorial-open | <button> | 374 |
| status-panel | <section> | 379 |
| round-count | <span> | 381 |
| selected-list | <span> | 382 |
| goal-count | <span> | 383 |
| mode-label | <span> | 384 |
| hint-button | <button> | 387 |
| result | <div> | 389 |
| reveal | <div> | 390 |
| hint-flag | <div> | 391 |
| pedal-tip | <span> | 396 |
| chord-tutorial-modal | <section> | 400 |
| chord-tutorial-backdrop | <button> | 401 |
| chord-tutorial-title | <h4> | 404 |
| chord-tutorial-close | <button> | 405 |
| chord-tutorial-step | <div> | 407 |
| chord-tutorial-current | <div> | 409 |
| chord-tutorial-root-list | <div> | 413 |
| chord-tutorial-quality-list | <div> | 417 |
| chord-tutorial-piano | <div> | 422 |
| chord-tutorial-examples | <div> | 426 |
| chord-tutorial-play | <button> | 429 |
| chord-tutorial-prev | <button> | 433 |
| chord-tutorial-progress | <span> | 434 |
| chord-tutorial-next | <button> | 435 |

### Script Load Order
| Order | Script | Line |
|---:|---|---:|
| 1 | vendor/libfluidsynth-2.4.6.js?v=20260305155236 | 440 |
| 2 | vendor/js-synthesizer.min.js?v=20260305155236 | 441 |
| 3 | js/core.js?v=20260305155236 | 442 |
| 4 | js/audio.js?v=20260305155236 | 443 |
| 5 | js/game.js?v=20260305155236 | 444 |
| 6 | js/settings.js?v=20260305155236 | 445 |
| 7 | js/events.js?v=20260305155236 | 446 |

## styles.css Map
File: styles.css (1-2279)

### Top-Level CSS Blocks
| Selector | Lines |
|---|---|
| :root | 3-99 |
| body.theme-dark | 101-189 |
| * | 191-193 |
| body | 195-207 |
| body.landing | 209-211 |
| .app | 213-229 |
| .app > section, .app > header, .app > footer | 233-235 |
| .hero | 237-240 |
| .badge | 242-255 |
| h1 | 257-261 |
| .hero p | 263-269 |
| body:not(.landing) .hero h1, body:not(.landing) .hero p | 272-274 |
| body:not(.landing) .tips | 276-278 |
| .hero, .actions, .chord-readout, .typing-zone, .status, .tips | 285-288 |
| body:not(.landing) .hero | 290-294 |
| .control | 296-302 |
| .control.compact | 304-306 |
| .control.compact label | 308-310 |
| .control.compact .control-row | 312-314 |
| .control label | 316-323 |
| .control-row | 325-329 |
| .control-row.align-end | 331-334 |
| .start-note-row | 336-338 |
| .start-note-stepper | 340-350 |
| .start-note-value | 352-358 |
| .step-btn | 360-372 |
| .step-btn.oct | 374-380 |
| .step-btn:hover | 382-385 |
| .advanced-test | 387-390 |
| .advanced-test .unit | 392-395 |
| input[type="number"] | 397-406 |
| .segmented | 408-412 |
| .segmented-btn | 414-423 |
| .segmented-btn.active | 425-429 |
| .actions | 431-436 |
| .btn | 438-445 |
| .btn:focus-visible | 447-450 |
| .btn.primary | 452-456 |
| .btn.secondary | 458-462 |
| .btn.ghost | 464-468 |
| .btn.submit | 470-474 |
| .btn:hover | 476-478 |
| .chord-readout | 480-489 |
| .chord-readout[hidden] | 491-493 |
| .typing-zone | 495-504 |
| .typing-zone label | 506-513 |
| .typing-zone input[type="text"] | 515-527 |
| .typing-zone input[type="text"]::placeholder | 529-532 |
| .typing-row | 534-537 |
| .typing-input-wrap | 539-541 |
| .typing-help-toggle | 543-560 |
| .typing-help-toggle:hover | 562-565 |
| .typing-help-toggle:focus-visible | 567-570 |
| .typing-help-text | 572-578 |
| .typing-help-text strong | 580-582 |
| .typing-help-actions | 584-586 |
| .typing-learn-btn | 588-598 |
| .typing-learn-btn:hover | 600-602 |
| .typing-learn-btn:focus-visible | 604-607 |
| .tutorial-modal | 609-616 |
| .tutorial-modal[hidden] | 618-620 |
| .tutorial-backdrop | 622-628 |
| .tutorial-card | 630-642 |
| .tutorial-head | 644-649 |
| .tutorial-head h4 | 651-655 |
| .tutorial-close | 657-659 |
| .tutorial-step | 661-668 |
| .tutorial-step-title | 670-673 |
| .tutorial-step-body | 675-679 |
| .tutorial-example-list | 681-686 |
| .tutorial-example-list code | 688-694 |
| .tutorial-actions | 696-701 |
| .tutorial-progress | 703-707 |
| .tutorial-lab | 709-716 |
| .tutorial-current | 718-722 |
| .tutorial-selectors | 724-727 |
| .tutorial-selector-block | 729-732 |
| .tutorial-selector-title | 734-740 |
| .tutorial-chip-list | 742-746 |
| .tutorial-chip | 748-758 |
| .tutorial-chip:hover, .tutorial-chip:focus-visible | 761-764 |
| .tutorial-chip.active | 766-769 |
| .tutorial-chip.example | 771-773 |
| .tutorial-chip.muted | 775-778 |
| .tutorial-chip.muted:hover, .tutorial-chip.muted:focus-visible | 781-783 |
| .tutorial-piano-wrap | 785-790 |
| .tutorial-piano-title | 792-799 |
| .tutorial-piano | 801-812 |
| .tutorial-key | 814-819 |
| .tutorial-key.white | 821-829 |
| .tutorial-key.black | 831-839 |
| .tutorial-key.tone | 841-843 |
| .tutorial-key.tone.root | 845-847 |
| .tutorial-key[data-role]::after | 849-862 |
| .tutorial-lab-actions | 864-867 |
| .helper-card | 869-876 |
| .helper-title | 878-883 |
| .helper-value | 885-890 |
| .helper-card:hover .helper-value, .helper-card:focus-within .helper-value | 893-896 |
| .typing-zone[hidden] | 898-900 |
| .status | 902-911 |
| .status[hidden] | 913-915 |
| .status-actions | 917-923 |
| .hint-flag | 925-938 |
| .hint-flag[hidden] | 940-942 |
| .hint-button | 944-946 |
| .settings-toggle | 948-963 |
| .settings-toggle:hover | 965-967 |
| .settings-toggle svg | 969-973 |
| .theme-toggle | 975-990 |
| .theme-toggle:hover | 992-994 |
| .theme-toggle svg | 996-1000 |
| .settings-panel | 1002-1021 |
| .settings-panel.open | 1023-1027 |
| .settings-panel h2 | 1029-1034 |
| .settings-body | 1036-1040 |
| .settings-grid | 1042-1045 |
| .advanced-trigger | 1047-1055 |
| .dropdown-trigger | 1057-1071 |
| .dropdown-trigger svg | 1073-1077 |
| .dropdown-trigger:focus-visible | 1079-1082 |
| .panel-trigger | 1084-1096 |
| .panel-trigger:hover | 1098-1101 |
| .panel-trigger[aria-expanded="true"] | 1103-1106 |
| .panel-trigger:focus-visible | 1108-1111 |
| .control select | 1113-1122 |
| .options-panel | 1124-1140 |
| .options-panel.open | 1142-1146 |
| .options-panel h3 | 1148-1155 |
| .options-grid | 1157-1160 |
| .options-panel .control | 1162-1168 |
| .options-panel .control.compact | 1170-1172 |
| .options-panel .control label | 1174-1176 |
| .options-section-title | 1178-1187 |
| .options-panel .options-section-title:first-child | 1189-1193 |
| .advanced-panel | 1195-1214 |
| .advanced-panel.open | 1216-1220 |
| .advanced-panel h3 | 1222-1227 |
| .advanced-grid | 1229-1238 |
| .advanced-grid::-webkit-scrollbar | 1240-1242 |
| .advanced-grid::-webkit-scrollbar-track | 1244-1247 |
| .advanced-grid::-webkit-scrollbar-thumb | 1249-1253 |
| .inline-value | 1255-1262 |
| .slider-stack | 1264-1267 |
| .slider-stack input[type="range"] | 1269-1273 |
| .slider-ghost | 1275-1289 |
| .slider-ghost.visible | 1291-1293 |
| .sf2-browser | 1295-1298 |
| .sf2-browser input[type="text"] | 1300-1309 |
| .sf2-preset-list | 1311-1324 |
| .sf2-browser .piano-desc | 1326-1329 |
| .sf2-browser .piano-desc.pending, .profile-browser .piano-desc.pending | 1332-1334 |
| .sf2-group | 1336-1341 |
| .sf2-group-title | 1343-1352 |
| .sf2-row | 1354-1362 |
| .sf2-row:first-child | 1364-1366 |
| .sf2-row:hover | 1368-1370 |
| .sf2-row.active | 1372-1375 |
| .sf2-row-name | 1377-1383 |
| .sf2-row-program, .sf2-row-bank | 1386-1390 |
| .sf2-empty | 1392-1396 |
| .profile-browser | 1398-1401 |
| .profile-browser input[type="text"] | 1403-1412 |
| .profile-list | 1414-1427 |
| .profile-row | 1429-1439 |
| .profile-row:hover | 1441-1443 |
| .profile-row.active | 1445-1448 |
| .profile-row.applied | 1450-1452 |
| .profile-row-name | 1454-1460 |
| .profile-row-kind | 1462-1467 |
| .advanced-footer | 1469-1475 |
| .piano-preview.wide | 1477-1489 |
| .piano-preview.wide::before | 1491-1493 |
| .piano-preview.wide .play-icon | 1495-1501 |
| .piano-preview.wide .play-label | 1503-1505 |
| .instrument-browser-panel | 1507-1522 |
| .instrument-browser-panel.open | 1524-1528 |
| .instrument-browser-panel h3 | 1530-1535 |
| .piano-panel | 1537-1552 |
| .piano-panel.open | 1554-1558 |
| .piano-panel h3 | 1560-1565 |
| .piano-options | 1567-1570 |
| .piano-option | 1572-1584 |
| .piano-option.active | 1586-1589 |
| .piano-option:focus-visible | 1591-1593 |
| .piano-info | 1595-1598 |
| .piano-name | 1600-1603 |
| .piano-desc | 1605-1608 |
| .piano-option.simple .piano-name | 1610-1614 |
| .piano-option.simple .piano-desc | 1616-1620 |
| .piano-preview | 1622-1637 |
| .piano-preview::before | 1639-1647 |
| .piano-preview:active | 1649-1652 |
| .piano-preview.main | 1654-1658 |
| .settings-grid input[type="range"], .advanced-panel input[type="range"], .options-... | 1662-1666 |
| .settings-grid input[type="range"]::-webkit-slider-runnable-track, .advanced-panel... | 1670-1675 |
| .settings-grid input[type="range"]::-webkit-slider-thumb, .advanced-panel input[ty... | 1679-1688 |
| .settings-grid input[type="range"]:focus-visible::-webkit-slider-thumb, .advanced-... | 1692-1695 |
| .settings-grid input[type="range"]::-moz-range-track, .advanced-panel input[type="... | 1699-1704 |
| .settings-grid input[type="range"]::-moz-range-thumb, .advanced-panel input[type="... | 1708-1715 |
| .settings-grid input[type="range"]:focus-visible::-moz-range-thumb, .advanced-pane... | 1719-1722 |
| .volume-value | 1724-1727 |
| .status-row | 1729-1734 |
| .switch | 1736-1740 |
| .switch input | 1742-1747 |
| .switch-track | 1749-1755 |
| .switch-thumb | 1757-1767 |
| .switch input:checked + .switch-track | 1769-1771 |
| .switch input:checked + .switch-track .switch-thumb | 1773-1775 |
| .control.compact .switch | 1777-1780 |
| .control.compact .switch-thumb | 1782-1787 |
| .control.compact .switch input:checked + .switch-track .switch-thumb | 1789-1791 |
| .control.compact .unit | 1793-1795 |
| .test-tone | 1797-1809 |
| .test-tone:hover | 1811-1814 |
| .test-tone:active | 1816-1818 |
| .test-tone-icon | 1820-1827 |
| .test-tone-label | 1829-1833 |
| .result | 1835-1839 |
| .reveal | 1841-1850 |
| .reveal strong | 1852-1854 |
| .reveal-label | 1856-1863 |
| .reveal-grid.compact | 1865-1869 |
| .reveal-cell | 1871-1873 |
| .keyboard-zone | 1875-1884 |
| .keyboard-stack | 1886-1896 |
| .keyboard-wrapper | 1898-1907 |
| .keyboard | 1909-1916 |
| .keyboard-wrapper.ends-black | 1918-1920 |
| .white-keys | 1922-1925 |
| .black-keys | 1927-1934 |
| .key | 1936-1947 |
| .key.white | 1949-1956 |
| .key.white.has-black | 1958-1960 |
| .key.black | 1962-1971 |
| .key span | 1973-1977 |
| .key.black span | 1979-1983 |
| .key.active | 1985-1988 |
| .key.black.active | 1990-1993 |
| .key.selected | 1995-1999 |
| .key.typed-preview | 2001-2003 |
| .key.correct | 2005-2009 |
| .key.wrong | 2011-2015 |
| .key.missed | 2017-2023 |
| .key.black.selected, .key.black.correct, .key.black.wrong | 2027-2029 |
| .key.black.missed | 2031-2037 |
| .keyboard.disabled | 2039-2045 |
| body.tutorial-open .keyboard | 2047-2049 |
| body.tutorial-open .keyboard.disabled | 2051-2054 |
| .keyboard.disabled::before | 2056-2068 |
| body.tutorial-open .keyboard.disabled::before | 2070-2072 |
| .keyboard.disabled::after | 2074-2108 |
| body.tutorial-open .keyboard.disabled::after | 2110-2112 |
| .tips | 2114-2122 |
| #pedal-tip[hidden] | 2124-2126 |
| .pedal-box | 2128-2142 |
| body.landing .pedal-box | 2144-2146 |
| .pedal-label | 2148-2158 |
| .pedal-icon | 2160-2167 |
| .pedal-icon.active | 2169-2172 |
| .note-pills | 2174-2180 |
| .note-pill | 2182-2188 |
| .note-pill.good | 2190-2194 |
| .note-pill.bad | 2196-2200 |
| .note-pill.missed | 2202-2206 |
| .note-pill.neutral | 2208-2212 |
| @media (max-width: 700px) | 2214-2265 |
| @media (max-height: 820px) | 2267-2272 |
| @media (max-height: 700px) | 2274-2279 |

## Documentation + Tooling Maps
### README.md
File: README.md (1-96)
| Heading | Line |
|---|---:|
| TheEarLab | 1 |
| Read First | 5 |
| Project Layout | 18 |
| Run Locally | 32 |
| SF2 Behavior | 46 |
| Chord Training Modes | 62 |
| Maintenance Rules | 87 |
| Verification | 94 |

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
File lines: 1-809

| Symbol | Lines |
|---|---|
| normalizePracticeProfile | 306-324 |
| normalizePracticeProfiles | 325-332 |
| getEffectivePracticeModeFromState | 333-341 |
| capturePracticeProfileFromState | 342-361 |
| saveSettings | 429-457 |
| loadSettings | 459-511 |
| resetAllSettings | 513-542 |
| buildNotes | 590-605 |
| getNoteIdByMidi | 607-614 |
| isConsonant | 626-629 |
| getNicePool | 631-631 |
| getNoteCountMax | 633-637 |
| updateNoteCountMax | 639-647 |
| getCssNumber | 649-649 |
| clamp | 650-650 |
| getMaxStartMidi | 651-651 |
| clampStartMidi | 652-652 |
| getMidiLabel | 653-657 |
| getPanelBottomGap | 658-661 |
| normalizeSoundfontDefinition | 663-681 |
| setSoundfontCatalog | 683-704 |
| getSoundfontList | 706-706 |
| renderPianoOptions | 708-752 |
| createKey | 754-765 |
| renderKeyboard | 767-799 |
| rebuildKeyboard | 801-808 |

### js/events.js (Active Runtime)
File lines: 1-1271

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
| bindPianoOptionEvents | 1004-1029 |
| setRandomBackgroundAngle | 1237-1240 |
| init | 1242-1265 |

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
| volumeSlider | dblclick | 831 |
| lengthSlider | dblclick | 835 |
| keyCountSlider | dblclick | 839 |
| startNoteDownButton | click | 845 |
| startNoteUpButton | click | 848 |
| startNoteDownOctButton | click | 854 |
| startNoteUpOctButton | click | 857 |
| noteCountInput | dblclick | 862 |
| attackSlider | dblclick | 870 |
| decaySlider | dblclick | 874 |
| releaseSlider | dblclick | 878 |
| sustainSlider | dblclick | 882 |
| profileSearch | input | 887 |
| profileList | click | 893 |
| profileList | dblclick | 898 |
| profileList | keydown | 901 |
| profileApply | click | 912 |
| profileSave | click | 918 |
| instrumentPresetSearch | input | 924 |
| instrumentPresetList | click | 930 |
| instrumentPresetList | dblclick | 935 |
| instrumentPresetList | keydown | 938 |
| instrumentPresetApply | click | 949 |
| advancedTrigger | click | 954 |
| advancedPanel | click | 963 |
| pianoTrigger | click | 968 |
| pianoPanel | click | 980 |
| instrumentBrowserTrigger | click | 986 |
| instrumentBrowserPanel | click | 999 |
| pianoOptionsContainer | click | 1007 |
| pianoOptionsContainer | keydown | 1021 |
| pianoPreviewMain | click | 1032 |
| testEnvelopeButton | click | 1039 |
| keyboardEl | pointerdown | 1044 |
| document | pointerup | 1080 |
| document | pointercancel | 1087 |
| keyboardEl | click | 1094 |
| document | keydown | 1098 |
| document | keyup | 1185 |
| pedalBox | pointerdown | 1204 |
| pedalBox | pointerup | 1213 |
| pedalBox | pointercancel | 1222 |
| pedalBox | pointerleave | 1230 |

### js/game.js (Active Runtime)
File lines: 1-1461

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
| getChordHelperHints | 611-621 |
| renderChordHelperBox | 623-629 |
| updateStatus | 631-721 |
| updateKeyStates | 723-762 |
| setKeyboardEnabled | 764-767 |
| updateKeyboardScale | 769-780 |
| lockKeyboardForPlayback | 782-795 |
| setSubmitted | 797-804 |
| refreshTarget | 806-827 |
| startRound | 829-864 |
| ensureRound | 866-875 |
| playTarget | 877-891 |
| startManualNote | 893-923 |
| releaseManualNote | 925-953 |
| releasePedalNotes | 955-965 |
| startPedalHold | 967-973 |
| stopPedalHold | 975-982 |
| toggleSelection | 984-1015 |
| isSelectionCorrect | 1017-1034 |
| getPlaybackSpan | 1036-1041 |
| renderNotePills | 1043-1049 |
| renderChordPill | 1051-1054 |
| renderTonePills | 1056-1064 |
| renderRevealCell | 1066-1069 |
| renderChordRevealGrid | 1071-1074 |
| renderChordDetectionMeta | 1076-1080 |
| renderPressedPills | 1082-1087 |
| buildNoteComparison | 1089-1096 |
| renderNoteComparisonCells | 1098-1113 |
| playRevealSequence | 1115-1166 |
| playSelectedChord | 1168-1193 |
| playTypedInputChord | 1195-1209 |
| startHeldPlayback | 1211-1253 |
| releaseHeldPlayback | 1255-1285 |
| buildTypingRevealDetail | 1287-1301 |
| submitTypedAnswer | 1303-1374 |
| submitAnswer | 1376-1441 |

### js/settings.js (Active Runtime)
File lines: 1-1104

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
| setKeyCount | 680-695 |
| setStartMidi | 697-706 |
| setKeyCountVisual | 708-712 |
| getEffectivePracticeMode | 714-718 |
| refreshOptionsModeVisibility | 720-742 |
| setPracticeMode | 744-815 |
| applyUiFromState | 817-875 |
| commitCriticalChange | 882-887 |
| commitNoteCountChange | 889-898 |
| handleCriticalSettingChange | 900-914 |
| openSettings | 916-921 |
| closeSettings | 923-942 |
| positionFloatingPanel | 944-970 |
| positionOptionsPanel | 972-975 |
| openOptionsPanel | 977-986 |
| closeOptionsPanel | 988-993 |
| openAdvanced | 995-1003 |
| closeAdvanced | 1005-1008 |
| positionPianoPanel | 1010-1013 |
| openPianoPanel | 1015-1025 |
| closePianoPanel | 1027-1032 |
| positionInstrumentBrowserPanel | 1034-1037 |
| openInstrumentBrowser | 1039-1049 |
| closeInstrumentBrowser | 1051-1056 |

## Maintenance Notes
- js/app.*.js is an older branch snapshot. Keep it for reference unless explicitly retired.
- Functional edits should target loaded scripts first: core.js, audio.js, game.js, settings.js, events.js.
- If you intentionally switch runtime scripts, update script tags in index.html and regenerate this file.
- After verification, commit and push the updated files when repository remotes are configured.

