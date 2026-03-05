# Project Map

Generated: 2026-03-05 23:53:33 +01:00

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
| index.html | HTML | Loaded directly | Yes | 456 |
| styles.css | CSS | Loaded directly | Yes | 2703 |
| js/audio.js | JavaScript | Browser runtime module | Yes | 1517 |
| js/core.js | JavaScript | Browser runtime module | Yes | 824 |
| js/events.js | JavaScript | Browser runtime module | Yes | 1544 |
| js/game.js | JavaScript | Browser runtime module | Yes | 1618 |
| js/settings.js | JavaScript | Browser runtime module | Yes | 1111 |
| README.md | Markdown | Human + AI onboarding | Yes | 103 |
| AGENTS.md | Markdown | AI instruction override | Yes | 34 |
| PROJECT_MAP.md | Markdown | Generated reference map | Yes | 967 |
| tools/generate-project-map.ps1 | PowerShell | Documentation generator | Yes | 500 |
| soundfonts/GeneralUser-GS.sf2 | Asset | Soundfont asset | Yes | 0 |
| soundfonts/index.json | JSON | Soundfont asset | Yes | 3 |
| soundfonts/README.md | Markdown | Soundfont asset | Yes | 39 |

## index.html Map
File: index.html (1-456)

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
| hide-live-preview | <input> | 240 |
| nice-notes | <input> | 253 |
| chord-rounds | <input> | 266 |
| training-mode | <select> | 280 |
| chord-difficulty | <select> | 294 |
| chord-extra-helpers | <input> | 307 |
| chord-tutorial-open-options | <button> | 319 |
| typing-show-piano | <input> | 329 |
| typing-show-typed | <input> | 342 |
| primary-action | <button> | 362 |
| play-selected | <button> | 363 |
| keyboard | <div> | 369 |
| white-keys | <div> | 370 |
| black-keys | <div> | 371 |
| pedal-icon | <div> | 376 |
| chord-readout | <section> | 380 |
| typing-zone | <section> | 381 |
| chord-answer | <input> | 385 |
| typing-help-toggle | <button> | 386 |
| status-panel | <section> | 392 |
| round-count | <span> | 394 |
| selected-list | <span> | 395 |
| goal-count | <span> | 396 |
| mode-label | <span> | 397 |
| hint-button | <button> | 400 |
| result | <div> | 402 |
| helper-slot | <div> | 403 |
| reveal | <div> | 404 |
| hint-flag | <div> | 405 |
| pedal-tip | <span> | 410 |
| chord-tutorial-modal | <section> | 414 |
| chord-tutorial-backdrop | <button> | 415 |
| chord-tutorial-title | <h4> | 418 |
| chord-tutorial-close | <button> | 419 |
| chord-tutorial-step | <div> | 421 |
| chord-tutorial-current | <div> | 423 |
| chord-tutorial-piano | <div> | 426 |
| tutorial-row-root | <div> | 429 |
| chord-tutorial-root-list | <div> | 431 |
| tutorial-row-quality | <div> | 433 |
| chord-tutorial-quality-list | <div> | 435 |
| chord-tutorial-prev | <button> | 440 |
| chord-tutorial-progress | <span> | 441 |
| chord-tutorial-next | <button> | 442 |

### Script Load Order
| Order | Script | Line |
|---:|---|---:|
| 1 | vendor/libfluidsynth-2.4.6.js?v=20260305231302 | 447 |
| 2 | vendor/js-synthesizer.min.js?v=20260305231302 | 448 |
| 3 | js/core.js?v=20260305231302 | 449 |
| 4 | js/audio.js?v=20260305231302 | 450 |
| 5 | js/game.js?v=20260305231302 | 451 |
| 6 | js/settings.js?v=20260305231302 | 452 |
| 7 | js/events.js?v=20260305231302 | 453 |

## styles.css Map
File: styles.css (1-2703)

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
| .tutorial-card | 630-643 |
| .tutorial-card.tutorial-overflow-scroll | 645-648 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-step | 650-656 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-lab | 658-665 |
| .tutorial-card.tutorial-fit-1 | 667-670 |
| .tutorial-card.tutorial-fit-1 .tutorial-step | 672-675 |
| .tutorial-card.tutorial-fit-1 .tutorial-lab | 677-680 |
| .tutorial-card.tutorial-fit-1 .tutorial-chip | 682-685 |
| .tutorial-card.tutorial-fit-1 .tutorial-quality-table th | 687-689 |
| .tutorial-card.tutorial-fit-1 .tutorial-piano | 691-696 |
| .tutorial-card.tutorial-fit-2 | 698-701 |
| .tutorial-card.tutorial-fit-2 .tutorial-head h4 | 703-705 |
| .tutorial-card.tutorial-fit-2 .tutorial-step | 707-710 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-title | 712-714 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-body | 716-719 |
| .tutorial-card.tutorial-fit-2 .tutorial-lab | 721-724 |
| .tutorial-card.tutorial-fit-2 .tutorial-current | 726-728 |
| .tutorial-card.tutorial-fit-2 .tutorial-selector-title | 730-732 |
| .tutorial-card.tutorial-fit-2 .tutorial-chip | 734-737 |
| .tutorial-card.tutorial-fit-2 .tutorial-quality-table th | 739-742 |
| .tutorial-card.tutorial-fit-2 .tutorial-piano | 744-749 |
| .tutorial-card.tutorial-fit-2 .tutorial-actions .advanced-trigger | 751-754 |
| .tutorial-card.tutorial-fit-3 | 756-759 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-kicker | 761-763 |
| .tutorial-card.tutorial-fit-3 .tutorial-step | 765-768 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-title | 770-772 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-body | 774-777 |
| .tutorial-card.tutorial-fit-3 .tutorial-lab | 779-782 |
| .tutorial-card.tutorial-fit-3 .tutorial-current | 784-786 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano-title | 788-791 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th | 793-796 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th, .tutorial-card.tutorial-... | 799-801 |
| .tutorial-card.tutorial-fit-3 .tutorial-chip | 803-806 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano | 808-813 |
| .tutorial-card.tutorial-fit-3 .tutorial-actions .advanced-trigger | 815-818 |
| .tutorial-card.tutorial-fit-3 .tutorial-progress | 820-822 |
| .tutorial-head | 824-829 |
| .tutorial-head h4 | 831-835 |
| .tutorial-close | 837-839 |
| .tutorial-step | 841-849 |
| .tutorial-step-kicker | 851-857 |
| .tutorial-step.focus-flash | 859-861 |
| @keyframes tutorial-focus-flash | 863-870 |
| .tutorial-step-title | 872-875 |
| .tutorial-step-body | 877-881 |
| .tutorial-step-body p | 883-885 |
| .tutorial-step-body p + p | 887-889 |
| .tutorial-example-list | 891-896 |
| .tutorial-example-list code | 898-904 |
| .tutorial-actions | 906-913 |
| .tutorial-progress | 915-919 |
| .tutorial-lab | 921-930 |
| .tutorial-current | 932-936 |
| .tutorial-selector-block | 938-941 |
| .tutorial-control-matrix | 943-950 |
| .tutorial-control-row | 952-960 |
| .tutorial-control-row.locked | 962-964 |
| .tutorial-control-row.locked::after | 966-973 |
| .tutorial-control-row.newly-unlocked | 975-977 |
| @keyframes tutorial-unlock | 979-986 |
| .tutorial-selector-title | 988-994 |
| .tutorial-chip-list | 996-1000 |
| #chord-tutorial-quality-list | 1002-1005 |
| .tutorial-quality-table | 1007-1012 |
| .tutorial-quality-table th, .tutorial-quality-table td | 1015-1019 |
| .tutorial-quality-table tr:first-child th, .tutorial-quality-table tr:first-child td | 1022-1024 |
| .tutorial-quality-table th | 1026-1035 |
| .tutorial-chip-group-list | 1037-1041 |
| .tutorial-chip | 1043-1055 |
| .tutorial-chip.unlocked | 1057-1060 |
| .tutorial-chip.unlocked:hover, .tutorial-chip.unlocked:focus-visible | 1063-1066 |
| .tutorial-chip[disabled] | 1068-1072 |
| .tutorial-chip.locked | 1074-1083 |
| .tutorial-chip:hover, .tutorial-chip:focus-visible | 1086-1089 |
| .tutorial-chip.active | 1091-1094 |
| .tutorial-chip.muted | 1096-1099 |
| .tutorial-chip.muted:hover, .tutorial-chip.muted:focus-visible | 1102-1104 |
| .tutorial-chip.newly-unlocked | 1106-1109 |
| .tutorial-chip.locked.newly-unlocked | 1111-1114 |
| .tutorial-piano-wrap | 1116-1121 |
| .tutorial-piano-title | 1123-1130 |
| .tutorial-piano | 1132-1143 |
| .tutorial-key | 1145-1150 |
| .tutorial-key.white | 1152-1160 |
| .tutorial-key.black | 1162-1170 |
| .tutorial-key.tone | 1172-1174 |
| .tutorial-key.tone.root | 1176-1178 |
| .tutorial-key[data-role]::after | 1180-1193 |
| .helper-card | 1195-1202 |
| .helper-title | 1204-1209 |
| .helper-list | 1211-1215 |
| .helper-item | 1217-1228 |
| .helper-item::after | 1230-1238 |
| .helper-item:last-child::after | 1240-1242 |
| .helper-item:hover, .helper-item:focus-within | 1245-1247 |
| .helper-label | 1249-1255 |
| .helper-item .helper-value | 1257-1265 |
| .helper-item .helper-mask | 1267-1274 |
| .helper-item .helper-real | 1276-1288 |
| .helper-item:hover .helper-mask, .helper-item:focus-within .helper-mask | 1291-1294 |
| .helper-item:hover .helper-real, .helper-item:focus-within .helper-real | 1297-1300 |
| .typing-zone[hidden] | 1302-1304 |
| .status | 1306-1315 |
| .status[hidden] | 1317-1319 |
| .helper-slot[hidden] | 1321-1323 |
| .status-actions | 1325-1331 |
| .hint-flag | 1333-1346 |
| .hint-flag[hidden] | 1348-1350 |
| .hint-button | 1352-1354 |
| .settings-toggle | 1356-1371 |
| .settings-toggle:hover | 1373-1375 |
| .settings-toggle svg | 1377-1381 |
| .theme-toggle | 1383-1398 |
| .theme-toggle:hover | 1400-1402 |
| .theme-toggle svg | 1404-1408 |
| .settings-panel | 1410-1429 |
| .settings-panel.open | 1431-1435 |
| .settings-panel h2 | 1437-1442 |
| .settings-body | 1444-1448 |
| .settings-grid | 1450-1453 |
| .advanced-trigger | 1455-1463 |
| .dropdown-trigger | 1465-1479 |
| .dropdown-trigger svg | 1481-1485 |
| .dropdown-trigger:focus-visible | 1487-1490 |
| .panel-trigger | 1492-1504 |
| .panel-trigger:hover | 1506-1509 |
| .panel-trigger[aria-expanded="true"] | 1511-1514 |
| .panel-trigger:focus-visible | 1516-1519 |
| .control select | 1521-1530 |
| .options-panel | 1532-1548 |
| .options-panel.open | 1550-1554 |
| .options-panel h3 | 1556-1563 |
| .options-grid | 1565-1568 |
| .options-panel .control | 1570-1576 |
| .options-panel .control.compact | 1578-1580 |
| .options-panel .control label | 1582-1584 |
| .options-section-title | 1586-1595 |
| .options-panel .options-section-title:first-child | 1597-1601 |
| .advanced-panel | 1603-1622 |
| .advanced-panel.open | 1624-1628 |
| .advanced-panel h3 | 1630-1635 |
| .advanced-grid | 1637-1646 |
| .advanced-grid::-webkit-scrollbar | 1648-1650 |
| .advanced-grid::-webkit-scrollbar-track | 1652-1655 |
| .advanced-grid::-webkit-scrollbar-thumb | 1657-1661 |
| .inline-value | 1663-1670 |
| .slider-stack | 1672-1675 |
| .slider-stack input[type="range"] | 1677-1681 |
| .slider-ghost | 1683-1697 |
| .slider-ghost.visible | 1699-1701 |
| .sf2-browser | 1703-1706 |
| .sf2-browser input[type="text"] | 1708-1717 |
| .sf2-preset-list | 1719-1732 |
| .sf2-browser .piano-desc | 1734-1737 |
| .sf2-browser .piano-desc.pending, .profile-browser .piano-desc.pending | 1740-1742 |
| .sf2-group | 1744-1749 |
| .sf2-group-title | 1751-1760 |
| .sf2-row | 1762-1770 |
| .sf2-row:first-child | 1772-1774 |
| .sf2-row:hover | 1776-1778 |
| .sf2-row.active | 1780-1783 |
| .sf2-row-name | 1785-1791 |
| .sf2-row-program, .sf2-row-bank | 1794-1798 |
| .sf2-empty | 1800-1804 |
| .profile-browser | 1806-1809 |
| .profile-browser input[type="text"] | 1811-1820 |
| .profile-list | 1822-1835 |
| .profile-row | 1837-1847 |
| .profile-row:hover | 1849-1851 |
| .profile-row.active | 1853-1856 |
| .profile-row.applied | 1858-1860 |
| .profile-row-name | 1862-1868 |
| .profile-row-kind | 1870-1875 |
| .advanced-footer | 1877-1883 |
| .piano-preview.wide | 1885-1897 |
| .piano-preview.wide::before | 1899-1901 |
| .piano-preview.wide .play-icon | 1903-1909 |
| .piano-preview.wide .play-label | 1911-1913 |
| .instrument-browser-panel | 1915-1930 |
| .instrument-browser-panel.open | 1932-1936 |
| .instrument-browser-panel h3 | 1938-1943 |
| .piano-panel | 1945-1960 |
| .piano-panel.open | 1962-1966 |
| .piano-panel h3 | 1968-1973 |
| .piano-options | 1975-1978 |
| .piano-option | 1980-1992 |
| .piano-option.active | 1994-1997 |
| .piano-option:focus-visible | 1999-2001 |
| .piano-info | 2003-2006 |
| .piano-name | 2008-2011 |
| .piano-desc | 2013-2016 |
| .piano-option.simple .piano-name | 2018-2022 |
| .piano-option.simple .piano-desc | 2024-2028 |
| .piano-preview | 2030-2045 |
| .piano-preview::before | 2047-2055 |
| .piano-preview:active | 2057-2060 |
| .piano-preview.main | 2062-2066 |
| .settings-grid input[type="range"], .advanced-panel input[type="range"], .options-... | 2070-2074 |
| .settings-grid input[type="range"]::-webkit-slider-runnable-track, .advanced-panel... | 2078-2083 |
| .settings-grid input[type="range"]::-webkit-slider-thumb, .advanced-panel input[ty... | 2087-2096 |
| .settings-grid input[type="range"]:focus-visible::-webkit-slider-thumb, .advanced-... | 2100-2103 |
| .settings-grid input[type="range"]::-moz-range-track, .advanced-panel input[type="... | 2107-2112 |
| .settings-grid input[type="range"]::-moz-range-thumb, .advanced-panel input[type="... | 2116-2123 |
| .settings-grid input[type="range"]:focus-visible::-moz-range-thumb, .advanced-pane... | 2127-2130 |
| .volume-value | 2132-2135 |
| .status-row | 2137-2142 |
| .switch | 2144-2148 |
| .switch input | 2150-2155 |
| .switch-track | 2157-2163 |
| .switch-thumb | 2165-2175 |
| .switch input:checked + .switch-track | 2177-2179 |
| .switch input:checked + .switch-track .switch-thumb | 2181-2183 |
| .control.compact .switch | 2185-2188 |
| .control.compact .switch-thumb | 2190-2195 |
| .control.compact .switch input:checked + .switch-track .switch-thumb | 2197-2199 |
| .control.compact .unit | 2201-2203 |
| .test-tone | 2205-2217 |
| .test-tone:hover | 2219-2222 |
| .test-tone:active | 2224-2226 |
| .test-tone-icon | 2228-2235 |
| .test-tone-label | 2237-2241 |
| .result | 2243-2247 |
| .reveal | 2249-2258 |
| .reveal strong | 2260-2262 |
| .reveal-label | 2264-2271 |
| .reveal-grid.compact | 2273-2277 |
| .reveal-cell | 2279-2281 |
| .keyboard-zone | 2283-2292 |
| .keyboard-stack | 2294-2304 |
| .keyboard-wrapper | 2306-2315 |
| .keyboard | 2317-2324 |
| .keyboard-wrapper.ends-black | 2326-2328 |
| .white-keys | 2330-2333 |
| .black-keys | 2335-2342 |
| .key | 2344-2355 |
| .key.white | 2357-2364 |
| .key.white.has-black | 2366-2368 |
| .key.black | 2370-2379 |
| .key span | 2381-2385 |
| .key.black span | 2387-2391 |
| .key.active | 2393-2396 |
| .key.black.active | 2398-2401 |
| .key.selected | 2403-2407 |
| .key.typed-preview | 2409-2411 |
| .key.correct | 2413-2417 |
| .key.wrong | 2419-2423 |
| .key.missed | 2425-2431 |
| .key.black.selected, .key.black.correct, .key.black.wrong | 2435-2437 |
| .key.black.missed | 2439-2445 |
| .keyboard.disabled | 2447-2453 |
| body.tutorial-open .keyboard | 2455-2457 |
| body.tutorial-open .keyboard.disabled | 2459-2462 |
| .keyboard.disabled::before | 2464-2476 |
| body.tutorial-open .keyboard.disabled::before | 2478-2480 |
| .keyboard.disabled::after | 2482-2516 |
| body.tutorial-open .keyboard.disabled::after | 2518-2520 |
| .tips | 2522-2530 |
| #pedal-tip[hidden] | 2532-2534 |
| .pedal-box | 2536-2550 |
| body.landing .pedal-box | 2552-2554 |
| .pedal-label | 2556-2566 |
| .pedal-icon | 2568-2575 |
| .pedal-icon.active | 2577-2580 |
| .note-pills | 2582-2588 |
| .note-pill | 2590-2596 |
| .note-pill.good | 2598-2602 |
| .note-pill.bad | 2604-2608 |
| .note-pill.missed | 2610-2614 |
| .note-pill.neutral | 2616-2620 |
| @media (max-width: 700px) | 2622-2673 |
| @media (max-height: 820px) | 2675-2696 |
| @media (max-height: 700px) | 2698-2703 |

## Documentation + Tooling Maps
### README.md
File: README.md (1-103)
| Heading | Line |
|---|---:|
| TheEarLab | 1 |
| Read First | 5 |
| Project Layout | 18 |
| Run Locally | 32 |
| SF2 Behavior | 46 |
| Chord Training Modes | 65 |
| Maintenance Rules | 94 |
| Verification | 101 |

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
### js/audio.js (Active Runtime)
File lines: 1-1517

| Symbol | Lines |
|---|---|
| clampValue | 61-61 |
| releaseRateToSeconds | 62-62 |
| getBaseAdsrForProgram | 63-68 |
| toUnixPath | 75-75 |
| getDirectoryPath | 77-81 |
| resolveRelativePath | 83-90 |
| normalizeManifestPath | 92-105 |
| fetchTextSafe | 107-122 |
| fetchJsonSafe | 124-139 |
| parseDirectoryListing | 141-152 |
| noteIdToMidi | 174-185 |
| frequencyToMidi | 187-190 |
| normalizeSampleEntries | 192-223 |
| normalizeSoundfontConfig | 225-247 |
| getFilenameFromPath | 249-253 |
| toManifestRelativePath | 255-265 |
| getManifestEntries | 267-270 |
| getManifestConfigPaths | 272-289 |
| getManifestSf2Paths | 291-308 |
| getDirectoryEntries | 310-313 |
| getDirectoryConfigPaths | 315-333 |
| getDirectorySf2Paths | 335-345 |
| discoverExternalSoundfonts | 347-361 |
| discoverSf2Paths | 363-367 |
| getSf2SimplePrograms | 369-377 |
| findSf2PresetName | 379-383 |
| createSf2SimplePresets | 385-407 |
| makeSf2PresetKey | 409-409 |
| ensureSf2SynthReady | 411-437 |
| loadSf2Pack | 439-471 |
| rebuildSf2PresetBrowser | 473-494 |
| refreshSf2PresetBrowserEntries | 496-499 |
| getSf2PresetBrowserEntries | 501-506 |
| selectSf2BrowserPreset | 508-538 |
| refreshSoundfontCatalog | 540-613 |
| ensureAudio | 615-652 |
| getSelectedSoundfont | 654-666 |
| getSourceEntry | 668-673 |
| removeVoice | 675-717 |
| releaseVoice | 719-766 |
| releaseVoices | 768-773 |
| stopAllNotes | 775-824 |
| stopNotesById | 826-838 |
| abortPlayback | 840-842 |
| getSoundfontEnvelope | 844-860 |
| scheduleSampleEnvelope | 862-879 |
| createGeneratedSampleBuffer | 881-924 |
| buildGeneratedSampleSet | 926-936 |
| decodeAudioBuffer | 938-945 |
| buildExternalSampleSet | 947-968 |
| applySf2TrimGenerators | 970-978 |
| getSf2NoteDuration | 980-984 |
| ensureSf2PresetReady | 986-1000 |
| ensureSoundfontReady | 1002-1078 |
| findNearestSample | 1080-1093 |
| scheduleSf2Note | 1095-1150 |
| noteOff | 1136-1142 |
| scheduleWithEntry | 1171-1216 |
| registerKeyTimer | 1231-1238 |
| unregisterKeyTimer | 1240-1249 |
| clearKeyTimersForNote | 1251-1259 |
| activateKey | 1261-1267 |
| scheduleKeyRelease | 1269-1282 |
| scheduleKeyAnimation | 1284-1295 |
| playNotes | 1297-1347 |
| playNotesNow | 1349-1352 |
| clearPreviewTimers | 1354-1357 |
| stopPreviewPlayback | 1359-1385 |
| schedulePreviewEvent | 1387-1393 |
| previewNoteOn | 1395-1406 |
| previewNoteOff | 1408-1417 |
| previewPedalOn | 1419-1438 |
| activate | 1423-1428 |
| previewPedalOff | 1440-1454 |
| buildPreviewSequence | 1456-1500 |

Event bindings:
| Target | Event | Line |
|---|---|---:|
| source | ended | 1213 |

### js/core.js (Active Runtime)
File lines: 1-824

| Symbol | Lines |
|---|---|
| normalizePracticeProfile | 314-333 |
| normalizePracticeProfiles | 334-341 |
| getEffectivePracticeModeFromState | 342-350 |
| capturePracticeProfileFromState | 351-371 |
| saveSettings | 441-470 |
| loadSettings | 472-525 |
| resetAllSettings | 527-557 |
| buildNotes | 605-620 |
| getNoteIdByMidi | 622-629 |
| isConsonant | 641-644 |
| getNicePool | 646-646 |
| getNoteCountMax | 648-652 |
| updateNoteCountMax | 654-662 |
| getCssNumber | 664-664 |
| clamp | 665-665 |
| getMaxStartMidi | 666-666 |
| clampStartMidi | 667-667 |
| getMidiLabel | 668-672 |
| getPanelBottomGap | 673-676 |
| normalizeSoundfontDefinition | 678-696 |
| setSoundfontCatalog | 698-719 |
| getSoundfontList | 721-721 |
| renderPianoOptions | 723-767 |
| createKey | 769-780 |
| renderKeyboard | 782-814 |
| rebuildKeyboard | 816-823 |

### js/events.js (Active Runtime)
File lines: 1-1544

| Symbol | Lines |
|---|---|
| isChordTutorialOpen | 475-475 |
| fitTutorialLayout | 478-506 |
| clearFitClasses | 484-487 |
| applyFitClass | 489-494 |
| getTutorialStep | 508-513 |
| getStepUnlockedRootSet | 515-523 |
| getStepUnlockedQualitySet | 525-531 |
| isTutorialRootEnabled | 533-533 |
| isTutorialQualityEnabled | 534-534 |
| getTutorialRootLabel | 536-539 |
| midiToTutorialLabel | 541-545 |
| getClosestNoteIdFromMidi | 547-554 |
| getTutorialRenderedChord | 556-578 |
| ensureTutorialKeyboard | 580-618 |
| getStepAllowedQualityIds | 620-622 |
| getTutorialActiveSpec | 624-626 |
| renderTutorialCurrentText | 628-639 |
| renderTutorialPianoHighlight | 641-675 |
| renderTutorialRootOptions | 677-695 |
| renderTutorialQualityOptions | 697-742 |
| syncTutorialRootChipStates | 744-763 |
| syncTutorialQualityChipStates | 765-784 |
| setTutorialHoverSpec | 786-793 |
| clearTutorialHoverSpec | 795-798 |
| refreshTutorialVisuals | 800-804 |
| renderChordTutorialStep | 832-887 |
| closeChordTutorial | 889-899 |
| openChordTutorial | 901-918 |
| registerTutorialOpenTrigger | 920-927 |
| isChordTypingCaptureActive | 1039-1044 |
| insertTypedCharacter | 1046-1053 |
| tryPlayTypedChordPreview | 1055-1058 |
| triggerPrimaryAction | 1061-1070 |
| triggerReplayAction | 1072-1078 |
| bindPianoOptionEvents | 1253-1278 |
| setRandomBackgroundAngle | 1497-1500 |
| init | 1502-1538 |
| runDeferredCatalogLoad | 1522-1531 |

Event bindings:
| Target | Event | Line |
|---|---|---:|
| noteCountInput | input | 4 |
| noteCountInput | change | 11 |
| noteCountInput | pointerup | 15 |
| button | click | 20 |
| blindToggle | change | 28 |
| hideLivePreviewToggle | change | 36 |
| niceNotesToggle | change | 43 |
| chordRoundsToggle | change | 58 |
| practiceModeSelect | change | 64 |
| trainingModeSelect | change | 71 |
| chordDifficultySelect | change | 90 |
| chordExtraHelpersToggle | change | 106 |
| typingShowPianoToggle | change | 117 |
| typingShowTypedToggle | change | 127 |
| resetSettingsButton | click | 139 |
| settingsToggle | click | 153 |
| themeToggle | click | 162 |
| settingsPanel | click | 170 |
| optionsTrigger | click | 187 |
| optionsPanel | click | 199 |
| document | click | 204 |
| window | resize | 212 |
| playSelectedButton | click | 231 |
| playSelectedButton | pointerdown | 235 |
| playSelectedButton | pointerup | 240 |
| playSelectedButton | pointerleave | 244 |
| primaryActionButton | click | 248 |
| volumeSlider | input | 256 |
| lengthSlider | input | 262 |
| attackSlider | input | 268 |
| decaySlider | input | 274 |
| releaseSlider | input | 280 |
| sustainSlider | input | 286 |
| keyCountSlider | input | 292 |
| keyCountSlider | change | 299 |
| keyCountSlider | pointerup | 303 |
| hintButton | click | 307 |
| chordAnswerInput | input | 312 |
| chordAnswerInput | keydown | 319 |
| triggerEl | click | 922 |
| chordTutorialClose | click | 934 |
| chordTutorialBackdrop | click | 941 |
| chordTutorialPrev | click | 947 |
| chordTutorialNext | click | 955 |
| chordTutorialRootList | mouseover | 967 |
| chordTutorialRootList | mouseleave | 975 |
| chordTutorialRootList | focusin | 978 |
| chordTutorialRootList | focusout | 986 |
| chordTutorialRootList | click | 989 |
| chordTutorialQualityList | mouseover | 1005 |
| chordTutorialQualityList | mouseleave | 1012 |
| chordTutorialQualityList | focusin | 1015 |
| chordTutorialQualityList | focusout | 1022 |
| chordTutorialQualityList | click | 1025 |
| volumeSlider | dblclick | 1080 |
| lengthSlider | dblclick | 1084 |
| keyCountSlider | dblclick | 1088 |
| startNoteDownButton | click | 1094 |
| startNoteUpButton | click | 1097 |
| startNoteDownOctButton | click | 1103 |
| startNoteUpOctButton | click | 1106 |
| noteCountInput | dblclick | 1111 |
| attackSlider | dblclick | 1119 |
| decaySlider | dblclick | 1123 |
| releaseSlider | dblclick | 1127 |
| sustainSlider | dblclick | 1131 |
| profileSearch | input | 1136 |
| profileList | click | 1142 |
| profileList | dblclick | 1147 |
| profileList | keydown | 1150 |
| profileApply | click | 1161 |
| profileSave | click | 1167 |
| instrumentPresetSearch | input | 1173 |
| instrumentPresetList | click | 1179 |
| instrumentPresetList | dblclick | 1184 |
| instrumentPresetList | keydown | 1187 |
| instrumentPresetApply | click | 1198 |
| advancedTrigger | click | 1203 |
| advancedPanel | click | 1212 |
| pianoTrigger | click | 1217 |
| pianoPanel | click | 1229 |
| instrumentBrowserTrigger | click | 1235 |
| instrumentBrowserPanel | click | 1248 |
| pianoOptionsContainer | click | 1256 |
| pianoOptionsContainer | keydown | 1270 |
| pianoPreviewMain | click | 1281 |
| testEnvelopeButton | click | 1288 |
| keyboardEl | pointerdown | 1293 |
| document | pointerup | 1329 |
| document | pointercancel | 1336 |
| keyboardEl | click | 1343 |
| document | keydown | 1347 |
| document | keyup | 1445 |
| pedalBox | pointerdown | 1464 |
| pedalBox | pointerup | 1473 |
| pedalBox | pointercancel | 1482 |
| pedalBox | pointerleave | 1490 |

### js/game.js (Active Runtime)
File lines: 1-1618

| Symbol | Lines |
|---|---|
| normalizeQualityToken | 116-128 |
| isTypingEnabled | 142-142 |
| isTypingOnlyMode | 143-143 |
| getIsChordRound | 144-144 |
| getEffectiveBlindMode | 145-145 |
| getKeyboardZoneEl | 146-146 |
| normalizePitchClass | 147-147 |
| getRootName | 148-148 |
| getMidiFromNoteId | 149-149 |
| buildChordLabel | 150-150 |
| getPitchClassSetFromNoteIds | 152-160 |
| getChordDifficultyId | 162-167 |
| getChordDifficultyConfig | 169-172 |
| getAllowedChordQualities | 174-179 |
| getChordQualityHint | 181-184 |
| getVoicingHintLabel | 186-190 |
| randomSample | 192-199 |
| getNiceTarget | 201-238 |
| getQualityPitchClassSet | 240-246 |
| parseChordInput | 248-281 |
| detectChordFromNoteIds | 283-319 |
| normalizeIntervals | 321-323 |
| fitIntervalsToAvailableRange | 325-345 |
| buildVoicedIntervals | 347-375 |
| chooseRootCandidatesForIntervals | 377-386 |
| buildChordFromRoot | 388-416 |
| createChordTarget | 418-462 |
| createNoteTarget | 464-497 |
| createTarget | 499-505 |
| clearTypingAutoNext | 507-511 |
| getTypedPreviewNoteIds | 513-546 |
| updateTypedPreviewFromInput | 548-558 |
| updateChordReadout | 560-612 |
| updateModeVisibility | 614-631 |
| updatePrimaryAction | 633-638 |
| updateReplayAvailability | 640-649 |
| getChordHelperHints | 651-662 |
| createDeterministicHelperMask | 671-693 |
| renderChordHelperBox | 695-713 |
| updateStatus | 715-818 |
| updateKeyStates | 820-859 |
| setKeyboardEnabled | 861-864 |
| updateKeyboardScale | 866-877 |
| lockKeyboardForPlayback | 879-892 |
| setSubmitted | 894-901 |
| refreshTarget | 903-924 |
| startRound | 926-984 |
| ensureRound | 986-995 |
| playTarget | 997-1011 |
| startManualNote | 1013-1043 |
| releaseManualNote | 1045-1073 |
| releasePedalNotes | 1075-1085 |
| startPedalHold | 1087-1093 |
| stopPedalHold | 1095-1102 |
| toggleSelection | 1104-1135 |
| isSelectionCorrect | 1137-1154 |
| getPlaybackSpan | 1156-1161 |
| renderNotePills | 1163-1169 |
| renderChordPill | 1171-1174 |
| renderTonePills | 1176-1184 |
| renderRevealCell | 1186-1189 |
| renderChordRevealGrid | 1191-1194 |
| renderChordDetectionMeta | 1196-1200 |
| renderPressedPills | 1202-1207 |
| buildNoteComparison | 1209-1216 |
| renderNoteComparisonCells | 1218-1233 |
| playRevealSequence | 1235-1287 |
| playSelectedChord | 1289-1314 |
| playTypedInputChord | 1316-1330 |
| startHeldPlayback | 1332-1398 |
| releaseHeldPlayback | 1400-1427 |
| buildTypingRevealDetail | 1429-1447 |
| submitTypedAnswer | 1449-1526 |
| submitAnswer | 1528-1597 |

### js/settings.js (Active Runtime)
File lines: 1-1111

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
| setPracticeMode | 744-819 |
| applyUiFromState | 821-882 |
| commitCriticalChange | 889-894 |
| commitNoteCountChange | 896-905 |
| handleCriticalSettingChange | 907-921 |
| openSettings | 923-928 |
| closeSettings | 930-949 |
| positionFloatingPanel | 951-977 |
| positionOptionsPanel | 979-982 |
| openOptionsPanel | 984-993 |
| closeOptionsPanel | 995-1000 |
| openAdvanced | 1002-1010 |
| closeAdvanced | 1012-1015 |
| positionPianoPanel | 1017-1020 |
| openPianoPanel | 1022-1032 |
| closePianoPanel | 1034-1039 |
| positionInstrumentBrowserPanel | 1041-1044 |
| openInstrumentBrowser | 1046-1056 |
| closeInstrumentBrowser | 1058-1063 |

## Maintenance Notes
- js/app.*.js is an older branch snapshot. Keep it for reference unless explicitly retired.
- Functional edits should target loaded scripts first: core.js, audio.js, game.js, settings.js, events.js.
- If you intentionally switch runtime scripts, update script tags in index.html and regenerate this file.
- After verification, commit and push the updated files when repository remotes are configured.

