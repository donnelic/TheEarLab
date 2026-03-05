# Project Map

Generated: 2026-03-05 16:57:10 +01:00

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
| styles.css | CSS | Loaded directly | Yes | 2313 |
| js/app.audio.js | JavaScript | Reference snapshot | No (legacy/not loaded) | 681 |
| js/app.core.js | JavaScript | Reference snapshot | No (legacy/not loaded) | 523 |
| js/app.events.js | JavaScript | Reference snapshot | No (legacy/not loaded) | 462 |
| js/app.game.js | JavaScript | Reference snapshot | No (legacy/not loaded) | 582 |
| js/app.settings.js | JavaScript | Reference snapshot | No (legacy/not loaded) | 281 |
| js/audio.js | JavaScript | Browser runtime module | Yes | 1471 |
| js/core.js | JavaScript | Browser runtime module | Yes | 809 |
| js/events.js | JavaScript | Browser runtime module | Yes | 1271 |
| js/game.js | JavaScript | Browser runtime module | Yes | 1471 |
| js/settings.js | JavaScript | Browser runtime module | Yes | 1104 |
| README.md | Markdown | Human + AI onboarding | Yes | 96 |
| AGENTS.md | Markdown | AI instruction override | Yes | 34 |
| PROJECT_MAP.md | Markdown | Generated reference map | Yes | 1092 |
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
| 1 | vendor/libfluidsynth-2.4.6.js?v=20260305162924 | 440 |
| 2 | vendor/js-synthesizer.min.js?v=20260305162924 | 441 |
| 3 | js/core.js?v=20260305162924 | 442 |
| 4 | js/audio.js?v=20260305162924 | 443 |
| 5 | js/game.js?v=20260305162924 | 444 |
| 6 | js/settings.js?v=20260305162924 | 445 |
| 7 | js/events.js?v=20260305162924 | 446 |

## styles.css Map
File: styles.css (1-2313)

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
| .helper-list | 885-888 |
| .helper-item | 890-900 |
| .helper-item:hover, .helper-item:focus-within | 903-906 |
| .helper-label | 908-914 |
| .helper-item .helper-value | 916-924 |
| .helper-item:hover .helper-value, .helper-item:focus-within .helper-value | 927-930 |
| .typing-zone[hidden] | 932-934 |
| .status | 936-945 |
| .status[hidden] | 947-949 |
| .status-actions | 951-957 |
| .hint-flag | 959-972 |
| .hint-flag[hidden] | 974-976 |
| .hint-button | 978-980 |
| .settings-toggle | 982-997 |
| .settings-toggle:hover | 999-1001 |
| .settings-toggle svg | 1003-1007 |
| .theme-toggle | 1009-1024 |
| .theme-toggle:hover | 1026-1028 |
| .theme-toggle svg | 1030-1034 |
| .settings-panel | 1036-1055 |
| .settings-panel.open | 1057-1061 |
| .settings-panel h2 | 1063-1068 |
| .settings-body | 1070-1074 |
| .settings-grid | 1076-1079 |
| .advanced-trigger | 1081-1089 |
| .dropdown-trigger | 1091-1105 |
| .dropdown-trigger svg | 1107-1111 |
| .dropdown-trigger:focus-visible | 1113-1116 |
| .panel-trigger | 1118-1130 |
| .panel-trigger:hover | 1132-1135 |
| .panel-trigger[aria-expanded="true"] | 1137-1140 |
| .panel-trigger:focus-visible | 1142-1145 |
| .control select | 1147-1156 |
| .options-panel | 1158-1174 |
| .options-panel.open | 1176-1180 |
| .options-panel h3 | 1182-1189 |
| .options-grid | 1191-1194 |
| .options-panel .control | 1196-1202 |
| .options-panel .control.compact | 1204-1206 |
| .options-panel .control label | 1208-1210 |
| .options-section-title | 1212-1221 |
| .options-panel .options-section-title:first-child | 1223-1227 |
| .advanced-panel | 1229-1248 |
| .advanced-panel.open | 1250-1254 |
| .advanced-panel h3 | 1256-1261 |
| .advanced-grid | 1263-1272 |
| .advanced-grid::-webkit-scrollbar | 1274-1276 |
| .advanced-grid::-webkit-scrollbar-track | 1278-1281 |
| .advanced-grid::-webkit-scrollbar-thumb | 1283-1287 |
| .inline-value | 1289-1296 |
| .slider-stack | 1298-1301 |
| .slider-stack input[type="range"] | 1303-1307 |
| .slider-ghost | 1309-1323 |
| .slider-ghost.visible | 1325-1327 |
| .sf2-browser | 1329-1332 |
| .sf2-browser input[type="text"] | 1334-1343 |
| .sf2-preset-list | 1345-1358 |
| .sf2-browser .piano-desc | 1360-1363 |
| .sf2-browser .piano-desc.pending, .profile-browser .piano-desc.pending | 1366-1368 |
| .sf2-group | 1370-1375 |
| .sf2-group-title | 1377-1386 |
| .sf2-row | 1388-1396 |
| .sf2-row:first-child | 1398-1400 |
| .sf2-row:hover | 1402-1404 |
| .sf2-row.active | 1406-1409 |
| .sf2-row-name | 1411-1417 |
| .sf2-row-program, .sf2-row-bank | 1420-1424 |
| .sf2-empty | 1426-1430 |
| .profile-browser | 1432-1435 |
| .profile-browser input[type="text"] | 1437-1446 |
| .profile-list | 1448-1461 |
| .profile-row | 1463-1473 |
| .profile-row:hover | 1475-1477 |
| .profile-row.active | 1479-1482 |
| .profile-row.applied | 1484-1486 |
| .profile-row-name | 1488-1494 |
| .profile-row-kind | 1496-1501 |
| .advanced-footer | 1503-1509 |
| .piano-preview.wide | 1511-1523 |
| .piano-preview.wide::before | 1525-1527 |
| .piano-preview.wide .play-icon | 1529-1535 |
| .piano-preview.wide .play-label | 1537-1539 |
| .instrument-browser-panel | 1541-1556 |
| .instrument-browser-panel.open | 1558-1562 |
| .instrument-browser-panel h3 | 1564-1569 |
| .piano-panel | 1571-1586 |
| .piano-panel.open | 1588-1592 |
| .piano-panel h3 | 1594-1599 |
| .piano-options | 1601-1604 |
| .piano-option | 1606-1618 |
| .piano-option.active | 1620-1623 |
| .piano-option:focus-visible | 1625-1627 |
| .piano-info | 1629-1632 |
| .piano-name | 1634-1637 |
| .piano-desc | 1639-1642 |
| .piano-option.simple .piano-name | 1644-1648 |
| .piano-option.simple .piano-desc | 1650-1654 |
| .piano-preview | 1656-1671 |
| .piano-preview::before | 1673-1681 |
| .piano-preview:active | 1683-1686 |
| .piano-preview.main | 1688-1692 |
| .settings-grid input[type="range"], .advanced-panel input[type="range"], .options-... | 1696-1700 |
| .settings-grid input[type="range"]::-webkit-slider-runnable-track, .advanced-panel... | 1704-1709 |
| .settings-grid input[type="range"]::-webkit-slider-thumb, .advanced-panel input[ty... | 1713-1722 |
| .settings-grid input[type="range"]:focus-visible::-webkit-slider-thumb, .advanced-... | 1726-1729 |
| .settings-grid input[type="range"]::-moz-range-track, .advanced-panel input[type="... | 1733-1738 |
| .settings-grid input[type="range"]::-moz-range-thumb, .advanced-panel input[type="... | 1742-1749 |
| .settings-grid input[type="range"]:focus-visible::-moz-range-thumb, .advanced-pane... | 1753-1756 |
| .volume-value | 1758-1761 |
| .status-row | 1763-1768 |
| .switch | 1770-1774 |
| .switch input | 1776-1781 |
| .switch-track | 1783-1789 |
| .switch-thumb | 1791-1801 |
| .switch input:checked + .switch-track | 1803-1805 |
| .switch input:checked + .switch-track .switch-thumb | 1807-1809 |
| .control.compact .switch | 1811-1814 |
| .control.compact .switch-thumb | 1816-1821 |
| .control.compact .switch input:checked + .switch-track .switch-thumb | 1823-1825 |
| .control.compact .unit | 1827-1829 |
| .test-tone | 1831-1843 |
| .test-tone:hover | 1845-1848 |
| .test-tone:active | 1850-1852 |
| .test-tone-icon | 1854-1861 |
| .test-tone-label | 1863-1867 |
| .result | 1869-1873 |
| .reveal | 1875-1884 |
| .reveal strong | 1886-1888 |
| .reveal-label | 1890-1897 |
| .reveal-grid.compact | 1899-1903 |
| .reveal-cell | 1905-1907 |
| .keyboard-zone | 1909-1918 |
| .keyboard-stack | 1920-1930 |
| .keyboard-wrapper | 1932-1941 |
| .keyboard | 1943-1950 |
| .keyboard-wrapper.ends-black | 1952-1954 |
| .white-keys | 1956-1959 |
| .black-keys | 1961-1968 |
| .key | 1970-1981 |
| .key.white | 1983-1990 |
| .key.white.has-black | 1992-1994 |
| .key.black | 1996-2005 |
| .key span | 2007-2011 |
| .key.black span | 2013-2017 |
| .key.active | 2019-2022 |
| .key.black.active | 2024-2027 |
| .key.selected | 2029-2033 |
| .key.typed-preview | 2035-2037 |
| .key.correct | 2039-2043 |
| .key.wrong | 2045-2049 |
| .key.missed | 2051-2057 |
| .key.black.selected, .key.black.correct, .key.black.wrong | 2061-2063 |
| .key.black.missed | 2065-2071 |
| .keyboard.disabled | 2073-2079 |
| body.tutorial-open .keyboard | 2081-2083 |
| body.tutorial-open .keyboard.disabled | 2085-2088 |
| .keyboard.disabled::before | 2090-2102 |
| body.tutorial-open .keyboard.disabled::before | 2104-2106 |
| .keyboard.disabled::after | 2108-2142 |
| body.tutorial-open .keyboard.disabled::after | 2144-2146 |
| .tips | 2148-2156 |
| #pedal-tip[hidden] | 2158-2160 |
| .pedal-box | 2162-2176 |
| body.landing .pedal-box | 2178-2180 |
| .pedal-label | 2182-2192 |
| .pedal-icon | 2194-2201 |
| .pedal-icon.active | 2203-2206 |
| .note-pills | 2208-2214 |
| .note-pill | 2216-2222 |
| .note-pill.good | 2224-2228 |
| .note-pill.bad | 2230-2234 |
| .note-pill.missed | 2236-2240 |
| .note-pill.neutral | 2242-2246 |
| @media (max-width: 700px) | 2248-2299 |
| @media (max-height: 820px) | 2301-2306 |
| @media (max-height: 700px) | 2308-2313 |

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
File lines: 1-1471

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
| getChordHelperHints | 611-622 |
| renderChordHelperBox | 624-639 |
| updateStatus | 641-731 |
| updateKeyStates | 733-772 |
| setKeyboardEnabled | 774-777 |
| updateKeyboardScale | 779-790 |
| lockKeyboardForPlayback | 792-805 |
| setSubmitted | 807-814 |
| refreshTarget | 816-837 |
| startRound | 839-874 |
| ensureRound | 876-885 |
| playTarget | 887-901 |
| startManualNote | 903-933 |
| releaseManualNote | 935-963 |
| releasePedalNotes | 965-975 |
| startPedalHold | 977-983 |
| stopPedalHold | 985-992 |
| toggleSelection | 994-1025 |
| isSelectionCorrect | 1027-1044 |
| getPlaybackSpan | 1046-1051 |
| renderNotePills | 1053-1059 |
| renderChordPill | 1061-1064 |
| renderTonePills | 1066-1074 |
| renderRevealCell | 1076-1079 |
| renderChordRevealGrid | 1081-1084 |
| renderChordDetectionMeta | 1086-1090 |
| renderPressedPills | 1092-1097 |
| buildNoteComparison | 1099-1106 |
| renderNoteComparisonCells | 1108-1123 |
| playRevealSequence | 1125-1176 |
| playSelectedChord | 1178-1203 |
| playTypedInputChord | 1205-1219 |
| startHeldPlayback | 1221-1263 |
| releaseHeldPlayback | 1265-1295 |
| buildTypingRevealDetail | 1297-1311 |
| submitTypedAnswer | 1313-1384 |
| submitAnswer | 1386-1451 |

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

