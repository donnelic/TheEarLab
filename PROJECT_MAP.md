# Project Map

Generated: 2026-03-06 00:04:35 +01:00

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
| index.html | HTML | Loaded directly | Yes | 471 |
| styles.css | CSS | Loaded directly | Yes | 2758 |
| js/audio.js | JavaScript | Browser runtime module | Yes | 1517 |
| js/core.js | JavaScript | Browser runtime module | Yes | 826 |
| js/events.js | JavaScript | Browser runtime module | Yes | 1553 |
| js/game.js | JavaScript | Browser runtime module | Yes | 1618 |
| js/settings.js | JavaScript | Browser runtime module | Yes | 1111 |
| README.md | Markdown | Human + AI onboarding | Yes | 104 |
| AGENTS.md | Markdown | AI instruction override | Yes | 34 |
| PROJECT_MAP.md | Markdown | Generated reference map | Yes | 979 |
| tools/generate-project-map.ps1 | PowerShell | Documentation generator | Yes | 500 |
| soundfonts/GeneralUser-GS.sf2 | Asset | Soundfont asset | Yes | 0 |
| soundfonts/index.json | JSON | Soundfont asset | Yes | 3 |
| soundfonts/README.md | Markdown | Soundfont asset | Yes | 39 |

## index.html Map
File: index.html (1-471)

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
| quick-start | <section> | 366 |
| keyboard | <div> | 384 |
| white-keys | <div> | 385 |
| black-keys | <div> | 386 |
| pedal-icon | <div> | 391 |
| chord-readout | <section> | 395 |
| typing-zone | <section> | 396 |
| chord-answer | <input> | 400 |
| typing-help-toggle | <button> | 401 |
| status-panel | <section> | 407 |
| round-count | <span> | 409 |
| selected-list | <span> | 410 |
| goal-count | <span> | 411 |
| mode-label | <span> | 412 |
| hint-button | <button> | 415 |
| result | <div> | 417 |
| helper-slot | <div> | 418 |
| reveal | <div> | 419 |
| hint-flag | <div> | 420 |
| pedal-tip | <span> | 425 |
| chord-tutorial-modal | <section> | 429 |
| chord-tutorial-backdrop | <button> | 430 |
| chord-tutorial-title | <h4> | 433 |
| chord-tutorial-close | <button> | 434 |
| chord-tutorial-step | <div> | 436 |
| chord-tutorial-current | <div> | 438 |
| chord-tutorial-piano | <div> | 441 |
| tutorial-row-root | <div> | 444 |
| chord-tutorial-root-list | <div> | 446 |
| tutorial-row-quality | <div> | 448 |
| chord-tutorial-quality-list | <div> | 450 |
| chord-tutorial-prev | <button> | 455 |
| chord-tutorial-progress | <span> | 456 |
| chord-tutorial-next | <button> | 457 |

### Script Load Order
| Order | Script | Line |
|---:|---|---:|
| 1 | vendor/libfluidsynth-2.4.6.js?v=20260306000059 | 462 |
| 2 | vendor/js-synthesizer.min.js?v=20260306000059 | 463 |
| 3 | js/core.js?v=20260306000059 | 464 |
| 4 | js/audio.js?v=20260306000059 | 465 |
| 5 | js/game.js?v=20260306000059 | 466 |
| 6 | js/settings.js?v=20260306000059 | 467 |
| 7 | js/events.js?v=20260306000059 | 468 |

## styles.css Map
File: styles.css (1-2758)

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
| .hero, .actions, .quick-start, .chord-readout, .typing-zone, .status, .tips | 286-289 |
| body:not(.landing) .hero | 291-295 |
| .control | 297-303 |
| .control.compact | 305-307 |
| .control.compact label | 309-311 |
| .control.compact .control-row | 313-315 |
| .control label | 317-324 |
| .control-row | 326-330 |
| .control-row.align-end | 332-335 |
| .start-note-row | 337-339 |
| .start-note-stepper | 341-351 |
| .start-note-value | 353-359 |
| .step-btn | 361-373 |
| .step-btn.oct | 375-381 |
| .step-btn:hover | 383-386 |
| .advanced-test | 388-391 |
| .advanced-test .unit | 393-396 |
| input[type="number"] | 398-407 |
| .segmented | 409-413 |
| .segmented-btn | 415-424 |
| .segmented-btn.active | 426-430 |
| .actions | 432-437 |
| .quick-start | 439-444 |
| .quick-mode-btn | 446-461 |
| .quick-mode-btn:hover, .quick-mode-btn:focus-visible | 464-469 |
| .quick-mode-title | 471-477 |
| .quick-mode-sub | 479-483 |
| body:not(.landing) .quick-start | 485-487 |
| .btn | 489-496 |
| .btn:focus-visible | 498-501 |
| .btn.primary | 503-507 |
| .btn.secondary | 509-513 |
| .btn.ghost | 515-519 |
| .btn.submit | 521-525 |
| .btn:hover | 527-529 |
| .chord-readout | 531-540 |
| .chord-readout[hidden] | 542-544 |
| .typing-zone | 546-555 |
| .typing-zone label | 557-564 |
| .typing-zone input[type="text"] | 566-578 |
| .typing-zone input[type="text"]::placeholder | 580-583 |
| .typing-row | 585-588 |
| .typing-input-wrap | 590-592 |
| .typing-help-toggle | 594-611 |
| .typing-help-toggle:hover | 613-616 |
| .typing-help-toggle:focus-visible | 618-621 |
| .typing-help-text | 623-629 |
| .typing-help-text strong | 631-633 |
| .typing-help-actions | 635-637 |
| .typing-learn-btn | 639-649 |
| .typing-learn-btn:hover | 651-653 |
| .typing-learn-btn:focus-visible | 655-658 |
| .tutorial-modal | 660-667 |
| .tutorial-modal[hidden] | 669-671 |
| .tutorial-backdrop | 673-679 |
| .tutorial-card | 681-694 |
| .tutorial-card.tutorial-overflow-scroll | 696-699 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-step | 701-707 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-lab | 709-716 |
| .tutorial-card.tutorial-fit-1 | 718-721 |
| .tutorial-card.tutorial-fit-1 .tutorial-step | 723-726 |
| .tutorial-card.tutorial-fit-1 .tutorial-lab | 728-731 |
| .tutorial-card.tutorial-fit-1 .tutorial-chip | 733-736 |
| .tutorial-card.tutorial-fit-1 .tutorial-quality-table th | 738-740 |
| .tutorial-card.tutorial-fit-1 .tutorial-piano | 742-747 |
| .tutorial-card.tutorial-fit-2 | 749-752 |
| .tutorial-card.tutorial-fit-2 .tutorial-head h4 | 754-756 |
| .tutorial-card.tutorial-fit-2 .tutorial-step | 758-761 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-title | 763-765 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-body | 767-770 |
| .tutorial-card.tutorial-fit-2 .tutorial-lab | 772-775 |
| .tutorial-card.tutorial-fit-2 .tutorial-current | 777-779 |
| .tutorial-card.tutorial-fit-2 .tutorial-selector-title | 781-783 |
| .tutorial-card.tutorial-fit-2 .tutorial-chip | 785-788 |
| .tutorial-card.tutorial-fit-2 .tutorial-quality-table th | 790-793 |
| .tutorial-card.tutorial-fit-2 .tutorial-piano | 795-800 |
| .tutorial-card.tutorial-fit-2 .tutorial-actions .advanced-trigger | 802-805 |
| .tutorial-card.tutorial-fit-3 | 807-810 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-kicker | 812-814 |
| .tutorial-card.tutorial-fit-3 .tutorial-step | 816-819 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-title | 821-823 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-body | 825-828 |
| .tutorial-card.tutorial-fit-3 .tutorial-lab | 830-833 |
| .tutorial-card.tutorial-fit-3 .tutorial-current | 835-837 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano-title | 839-842 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th | 844-847 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th, .tutorial-card.tutorial-... | 850-852 |
| .tutorial-card.tutorial-fit-3 .tutorial-chip | 854-857 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano | 859-864 |
| .tutorial-card.tutorial-fit-3 .tutorial-actions .advanced-trigger | 866-869 |
| .tutorial-card.tutorial-fit-3 .tutorial-progress | 871-873 |
| .tutorial-head | 875-880 |
| .tutorial-head h4 | 882-886 |
| .tutorial-close | 888-890 |
| .tutorial-step | 892-900 |
| .tutorial-step-kicker | 902-908 |
| .tutorial-step.focus-flash | 910-912 |
| @keyframes tutorial-focus-flash | 914-921 |
| .tutorial-step-title | 923-926 |
| .tutorial-step-body | 928-932 |
| .tutorial-step-body p | 934-936 |
| .tutorial-step-body p + p | 938-940 |
| .tutorial-example-list | 942-947 |
| .tutorial-example-list code | 949-955 |
| .tutorial-actions | 957-964 |
| .tutorial-progress | 966-970 |
| .tutorial-lab | 972-981 |
| .tutorial-current | 983-987 |
| .tutorial-selector-block | 989-992 |
| .tutorial-control-matrix | 994-1001 |
| .tutorial-control-row | 1003-1011 |
| .tutorial-control-row.locked | 1013-1015 |
| .tutorial-control-row.locked::after | 1017-1024 |
| .tutorial-control-row.newly-unlocked | 1026-1028 |
| @keyframes tutorial-unlock | 1030-1037 |
| .tutorial-selector-title | 1039-1045 |
| .tutorial-chip-list | 1047-1051 |
| #chord-tutorial-quality-list | 1053-1056 |
| .tutorial-quality-table | 1058-1063 |
| .tutorial-quality-table th, .tutorial-quality-table td | 1066-1070 |
| .tutorial-quality-table tr:first-child th, .tutorial-quality-table tr:first-child td | 1073-1075 |
| .tutorial-quality-table th | 1077-1086 |
| .tutorial-chip-group-list | 1088-1092 |
| .tutorial-chip | 1094-1106 |
| .tutorial-chip.unlocked | 1108-1111 |
| .tutorial-chip.unlocked:hover, .tutorial-chip.unlocked:focus-visible | 1114-1117 |
| .tutorial-chip[disabled] | 1119-1123 |
| .tutorial-chip.locked | 1125-1134 |
| .tutorial-chip:hover, .tutorial-chip:focus-visible | 1137-1140 |
| .tutorial-chip.active | 1142-1145 |
| .tutorial-chip.muted | 1147-1150 |
| .tutorial-chip.muted:hover, .tutorial-chip.muted:focus-visible | 1153-1155 |
| .tutorial-chip.newly-unlocked | 1157-1160 |
| .tutorial-chip.locked.newly-unlocked | 1162-1165 |
| .tutorial-piano-wrap | 1167-1172 |
| .tutorial-piano-title | 1174-1181 |
| .tutorial-piano | 1183-1194 |
| .tutorial-key | 1196-1201 |
| .tutorial-key.white | 1203-1211 |
| .tutorial-key.black | 1213-1221 |
| .tutorial-key.tone | 1223-1225 |
| .tutorial-key.tone.root | 1227-1229 |
| .tutorial-key[data-role]::after | 1231-1244 |
| .helper-card | 1246-1253 |
| .helper-title | 1255-1260 |
| .helper-list | 1262-1266 |
| .helper-item | 1268-1279 |
| .helper-item::after | 1281-1289 |
| .helper-item:last-child::after | 1291-1293 |
| .helper-item:hover, .helper-item:focus-within | 1296-1298 |
| .helper-label | 1300-1306 |
| .helper-item .helper-value | 1308-1316 |
| .helper-item .helper-mask | 1318-1325 |
| .helper-item .helper-real | 1327-1339 |
| .helper-item:hover .helper-mask, .helper-item:focus-within .helper-mask | 1342-1345 |
| .helper-item:hover .helper-real, .helper-item:focus-within .helper-real | 1348-1351 |
| .typing-zone[hidden] | 1353-1355 |
| .status | 1357-1366 |
| .status[hidden] | 1368-1370 |
| .helper-slot[hidden] | 1372-1374 |
| .status-actions | 1376-1382 |
| .hint-flag | 1384-1397 |
| .hint-flag[hidden] | 1399-1401 |
| .hint-button | 1403-1405 |
| .settings-toggle | 1407-1422 |
| .settings-toggle:hover | 1424-1426 |
| .settings-toggle svg | 1428-1432 |
| .theme-toggle | 1434-1449 |
| .theme-toggle:hover | 1451-1453 |
| .theme-toggle svg | 1455-1459 |
| .settings-panel | 1461-1480 |
| .settings-panel.open | 1482-1486 |
| .settings-panel h2 | 1488-1493 |
| .settings-body | 1495-1499 |
| .settings-grid | 1501-1504 |
| .advanced-trigger | 1506-1514 |
| .dropdown-trigger | 1516-1530 |
| .dropdown-trigger svg | 1532-1536 |
| .dropdown-trigger:focus-visible | 1538-1541 |
| .panel-trigger | 1543-1555 |
| .panel-trigger:hover | 1557-1560 |
| .panel-trigger[aria-expanded="true"] | 1562-1565 |
| .panel-trigger:focus-visible | 1567-1570 |
| .control select | 1572-1581 |
| .options-panel | 1583-1599 |
| .options-panel.open | 1601-1605 |
| .options-panel h3 | 1607-1614 |
| .options-grid | 1616-1619 |
| .options-panel .control | 1621-1627 |
| .options-panel .control.compact | 1629-1631 |
| .options-panel .control label | 1633-1635 |
| .options-section-title | 1637-1646 |
| .options-panel .options-section-title:first-child | 1648-1652 |
| .advanced-panel | 1654-1673 |
| .advanced-panel.open | 1675-1679 |
| .advanced-panel h3 | 1681-1686 |
| .advanced-grid | 1688-1697 |
| .advanced-grid::-webkit-scrollbar | 1699-1701 |
| .advanced-grid::-webkit-scrollbar-track | 1703-1706 |
| .advanced-grid::-webkit-scrollbar-thumb | 1708-1712 |
| .inline-value | 1714-1721 |
| .slider-stack | 1723-1726 |
| .slider-stack input[type="range"] | 1728-1732 |
| .slider-ghost | 1734-1748 |
| .slider-ghost.visible | 1750-1752 |
| .sf2-browser | 1754-1757 |
| .sf2-browser input[type="text"] | 1759-1768 |
| .sf2-preset-list | 1770-1783 |
| .sf2-browser .piano-desc | 1785-1788 |
| .sf2-browser .piano-desc.pending, .profile-browser .piano-desc.pending | 1791-1793 |
| .sf2-group | 1795-1800 |
| .sf2-group-title | 1802-1811 |
| .sf2-row | 1813-1821 |
| .sf2-row:first-child | 1823-1825 |
| .sf2-row:hover | 1827-1829 |
| .sf2-row.active | 1831-1834 |
| .sf2-row-name | 1836-1842 |
| .sf2-row-program, .sf2-row-bank | 1845-1849 |
| .sf2-empty | 1851-1855 |
| .profile-browser | 1857-1860 |
| .profile-browser input[type="text"] | 1862-1871 |
| .profile-list | 1873-1886 |
| .profile-row | 1888-1898 |
| .profile-row:hover | 1900-1902 |
| .profile-row.active | 1904-1907 |
| .profile-row.applied | 1909-1911 |
| .profile-row-name | 1913-1919 |
| .profile-row-kind | 1921-1926 |
| .advanced-footer | 1928-1934 |
| .piano-preview.wide | 1936-1948 |
| .piano-preview.wide::before | 1950-1952 |
| .piano-preview.wide .play-icon | 1954-1960 |
| .piano-preview.wide .play-label | 1962-1964 |
| .instrument-browser-panel | 1966-1981 |
| .instrument-browser-panel.open | 1983-1987 |
| .instrument-browser-panel h3 | 1989-1994 |
| .piano-panel | 1996-2011 |
| .piano-panel.open | 2013-2017 |
| .piano-panel h3 | 2019-2024 |
| .piano-options | 2026-2029 |
| .piano-option | 2031-2043 |
| .piano-option.active | 2045-2048 |
| .piano-option:focus-visible | 2050-2052 |
| .piano-info | 2054-2057 |
| .piano-name | 2059-2062 |
| .piano-desc | 2064-2067 |
| .piano-option.simple .piano-name | 2069-2073 |
| .piano-option.simple .piano-desc | 2075-2079 |
| .piano-preview | 2081-2096 |
| .piano-preview::before | 2098-2106 |
| .piano-preview:active | 2108-2111 |
| .piano-preview.main | 2113-2117 |
| .settings-grid input[type="range"], .advanced-panel input[type="range"], .options-... | 2121-2125 |
| .settings-grid input[type="range"]::-webkit-slider-runnable-track, .advanced-panel... | 2129-2134 |
| .settings-grid input[type="range"]::-webkit-slider-thumb, .advanced-panel input[ty... | 2138-2147 |
| .settings-grid input[type="range"]:focus-visible::-webkit-slider-thumb, .advanced-... | 2151-2154 |
| .settings-grid input[type="range"]::-moz-range-track, .advanced-panel input[type="... | 2158-2163 |
| .settings-grid input[type="range"]::-moz-range-thumb, .advanced-panel input[type="... | 2167-2174 |
| .settings-grid input[type="range"]:focus-visible::-moz-range-thumb, .advanced-pane... | 2178-2181 |
| .volume-value | 2183-2186 |
| .status-row | 2188-2193 |
| .switch | 2195-2199 |
| .switch input | 2201-2206 |
| .switch-track | 2208-2214 |
| .switch-thumb | 2216-2226 |
| .switch input:checked + .switch-track | 2228-2230 |
| .switch input:checked + .switch-track .switch-thumb | 2232-2234 |
| .control.compact .switch | 2236-2239 |
| .control.compact .switch-thumb | 2241-2246 |
| .control.compact .switch input:checked + .switch-track .switch-thumb | 2248-2250 |
| .control.compact .unit | 2252-2254 |
| .test-tone | 2256-2268 |
| .test-tone:hover | 2270-2273 |
| .test-tone:active | 2275-2277 |
| .test-tone-icon | 2279-2286 |
| .test-tone-label | 2288-2292 |
| .result | 2294-2298 |
| .reveal | 2300-2309 |
| .reveal strong | 2311-2313 |
| .reveal-label | 2315-2322 |
| .reveal-grid.compact | 2324-2328 |
| .reveal-cell | 2330-2332 |
| .keyboard-zone | 2334-2343 |
| .keyboard-stack | 2345-2355 |
| .keyboard-wrapper | 2357-2366 |
| .keyboard | 2368-2375 |
| .keyboard-wrapper.ends-black | 2377-2379 |
| .white-keys | 2381-2384 |
| .black-keys | 2386-2393 |
| .key | 2395-2406 |
| .key.white | 2408-2415 |
| .key.white.has-black | 2417-2419 |
| .key.black | 2421-2430 |
| .key span | 2432-2436 |
| .key.black span | 2438-2442 |
| .key.active | 2444-2447 |
| .key.black.active | 2449-2452 |
| .key.selected | 2454-2458 |
| .key.typed-preview | 2460-2462 |
| .key.correct | 2464-2468 |
| .key.wrong | 2470-2474 |
| .key.missed | 2476-2482 |
| .key.black.selected, .key.black.correct, .key.black.wrong | 2486-2488 |
| .key.black.missed | 2490-2496 |
| .keyboard.disabled | 2498-2504 |
| body.tutorial-open .keyboard | 2506-2508 |
| body.tutorial-open .keyboard.disabled | 2510-2513 |
| .keyboard.disabled::before | 2515-2527 |
| body.tutorial-open .keyboard.disabled::before | 2529-2531 |
| .keyboard.disabled::after | 2533-2567 |
| body.tutorial-open .keyboard.disabled::after | 2569-2571 |
| .tips | 2573-2581 |
| #pedal-tip[hidden] | 2583-2585 |
| .pedal-box | 2587-2601 |
| body.landing .pedal-box | 2603-2605 |
| .pedal-label | 2607-2617 |
| .pedal-icon | 2619-2626 |
| .pedal-icon.active | 2628-2631 |
| .note-pills | 2633-2639 |
| .note-pill | 2641-2647 |
| .note-pill.good | 2649-2653 |
| .note-pill.bad | 2655-2659 |
| .note-pill.missed | 2661-2665 |
| .note-pill.neutral | 2667-2671 |
| @media (max-width: 700px) | 2673-2728 |
| @media (max-height: 820px) | 2730-2751 |
| @media (max-height: 700px) | 2753-2758 |

## Documentation + Tooling Maps
### README.md
File: README.md (1-104)
| Heading | Line |
|---|---:|
| TheEarLab | 1 |
| Read First | 5 |
| Project Layout | 18 |
| Run Locally | 32 |
| SF2 Behavior | 46 |
| Chord Training Modes | 65 |
| Maintenance Rules | 95 |
| Verification | 102 |

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
File lines: 1-826

| Symbol | Lines |
|---|---|
| normalizePracticeProfile | 316-335 |
| normalizePracticeProfiles | 336-343 |
| getEffectivePracticeModeFromState | 344-352 |
| capturePracticeProfileFromState | 353-373 |
| saveSettings | 443-472 |
| loadSettings | 474-527 |
| resetAllSettings | 529-559 |
| buildNotes | 607-622 |
| getNoteIdByMidi | 624-631 |
| isConsonant | 643-646 |
| getNicePool | 648-648 |
| getNoteCountMax | 650-654 |
| updateNoteCountMax | 656-664 |
| getCssNumber | 666-666 |
| clamp | 667-667 |
| getMaxStartMidi | 668-668 |
| clampStartMidi | 669-669 |
| getMidiLabel | 670-674 |
| getPanelBottomGap | 675-678 |
| normalizeSoundfontDefinition | 680-698 |
| setSoundfontCatalog | 700-721 |
| getSoundfontList | 723-723 |
| renderPianoOptions | 725-769 |
| createKey | 771-782 |
| renderKeyboard | 784-816 |
| rebuildKeyboard | 818-825 |

### js/events.js (Active Runtime)
File lines: 1-1553

| Symbol | Lines |
|---|---|
| isChordTutorialOpen | 484-484 |
| fitTutorialLayout | 487-515 |
| clearFitClasses | 493-496 |
| applyFitClass | 498-503 |
| getTutorialStep | 517-522 |
| getStepUnlockedRootSet | 524-532 |
| getStepUnlockedQualitySet | 534-540 |
| isTutorialRootEnabled | 542-542 |
| isTutorialQualityEnabled | 543-543 |
| getTutorialRootLabel | 545-548 |
| midiToTutorialLabel | 550-554 |
| getClosestNoteIdFromMidi | 556-563 |
| getTutorialRenderedChord | 565-587 |
| ensureTutorialKeyboard | 589-627 |
| getStepAllowedQualityIds | 629-631 |
| getTutorialActiveSpec | 633-635 |
| renderTutorialCurrentText | 637-648 |
| renderTutorialPianoHighlight | 650-684 |
| renderTutorialRootOptions | 686-704 |
| renderTutorialQualityOptions | 706-751 |
| syncTutorialRootChipStates | 753-772 |
| syncTutorialQualityChipStates | 774-793 |
| setTutorialHoverSpec | 795-802 |
| clearTutorialHoverSpec | 804-807 |
| refreshTutorialVisuals | 809-813 |
| renderChordTutorialStep | 841-896 |
| closeChordTutorial | 898-908 |
| openChordTutorial | 910-927 |
| registerTutorialOpenTrigger | 929-936 |
| isChordTypingCaptureActive | 1048-1053 |
| insertTypedCharacter | 1055-1062 |
| tryPlayTypedChordPreview | 1064-1067 |
| triggerPrimaryAction | 1070-1079 |
| triggerReplayAction | 1081-1087 |
| bindPianoOptionEvents | 1262-1287 |
| setRandomBackgroundAngle | 1506-1509 |
| init | 1511-1547 |
| runDeferredCatalogLoad | 1531-1540 |

Event bindings:
| Target | Event | Line |
|---|---|---:|
| noteCountInput | input | 4 |
| noteCountInput | change | 11 |
| noteCountInput | pointerup | 15 |
| button | click | 20 |
| button | click | 29 |
| blindToggle | change | 37 |
| hideLivePreviewToggle | change | 45 |
| niceNotesToggle | change | 52 |
| chordRoundsToggle | change | 67 |
| practiceModeSelect | change | 73 |
| trainingModeSelect | change | 80 |
| chordDifficultySelect | change | 99 |
| chordExtraHelpersToggle | change | 115 |
| typingShowPianoToggle | change | 126 |
| typingShowTypedToggle | change | 136 |
| resetSettingsButton | click | 148 |
| settingsToggle | click | 162 |
| themeToggle | click | 171 |
| settingsPanel | click | 179 |
| optionsTrigger | click | 196 |
| optionsPanel | click | 208 |
| document | click | 213 |
| window | resize | 221 |
| playSelectedButton | click | 240 |
| playSelectedButton | pointerdown | 244 |
| playSelectedButton | pointerup | 249 |
| playSelectedButton | pointerleave | 253 |
| primaryActionButton | click | 257 |
| volumeSlider | input | 265 |
| lengthSlider | input | 271 |
| attackSlider | input | 277 |
| decaySlider | input | 283 |
| releaseSlider | input | 289 |
| sustainSlider | input | 295 |
| keyCountSlider | input | 301 |
| keyCountSlider | change | 308 |
| keyCountSlider | pointerup | 312 |
| hintButton | click | 316 |
| chordAnswerInput | input | 321 |
| chordAnswerInput | keydown | 328 |
| triggerEl | click | 931 |
| chordTutorialClose | click | 943 |
| chordTutorialBackdrop | click | 950 |
| chordTutorialPrev | click | 956 |
| chordTutorialNext | click | 964 |
| chordTutorialRootList | mouseover | 976 |
| chordTutorialRootList | mouseleave | 984 |
| chordTutorialRootList | focusin | 987 |
| chordTutorialRootList | focusout | 995 |
| chordTutorialRootList | click | 998 |
| chordTutorialQualityList | mouseover | 1014 |
| chordTutorialQualityList | mouseleave | 1021 |
| chordTutorialQualityList | focusin | 1024 |
| chordTutorialQualityList | focusout | 1031 |
| chordTutorialQualityList | click | 1034 |
| volumeSlider | dblclick | 1089 |
| lengthSlider | dblclick | 1093 |
| keyCountSlider | dblclick | 1097 |
| startNoteDownButton | click | 1103 |
| startNoteUpButton | click | 1106 |
| startNoteDownOctButton | click | 1112 |
| startNoteUpOctButton | click | 1115 |
| noteCountInput | dblclick | 1120 |
| attackSlider | dblclick | 1128 |
| decaySlider | dblclick | 1132 |
| releaseSlider | dblclick | 1136 |
| sustainSlider | dblclick | 1140 |
| profileSearch | input | 1145 |
| profileList | click | 1151 |
| profileList | dblclick | 1156 |
| profileList | keydown | 1159 |
| profileApply | click | 1170 |
| profileSave | click | 1176 |
| instrumentPresetSearch | input | 1182 |
| instrumentPresetList | click | 1188 |
| instrumentPresetList | dblclick | 1193 |
| instrumentPresetList | keydown | 1196 |
| instrumentPresetApply | click | 1207 |
| advancedTrigger | click | 1212 |
| advancedPanel | click | 1221 |
| pianoTrigger | click | 1226 |
| pianoPanel | click | 1238 |
| instrumentBrowserTrigger | click | 1244 |
| instrumentBrowserPanel | click | 1257 |
| pianoOptionsContainer | click | 1265 |
| pianoOptionsContainer | keydown | 1279 |
| pianoPreviewMain | click | 1290 |
| testEnvelopeButton | click | 1297 |
| keyboardEl | pointerdown | 1302 |
| document | pointerup | 1338 |
| document | pointercancel | 1345 |
| keyboardEl | click | 1352 |
| document | keydown | 1356 |
| document | keyup | 1454 |
| pedalBox | pointerdown | 1473 |
| pedalBox | pointerup | 1482 |
| pedalBox | pointercancel | 1491 |
| pedalBox | pointerleave | 1499 |

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

