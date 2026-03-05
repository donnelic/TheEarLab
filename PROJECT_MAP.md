# Project Map

Generated: 2026-03-06 00:12:59 +01:00

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
| index.html | HTML | Loaded directly | Yes | 478 |
| styles.css | CSS | Loaded directly | Yes | 2794 |
| js/audio.js | JavaScript | Browser runtime module | Yes | 1517 |
| js/core.js | JavaScript | Browser runtime module | Yes | 828 |
| js/events.js | JavaScript | Browser runtime module | Yes | 1567 |
| js/game.js | JavaScript | Browser runtime module | Yes | 1667 |
| js/settings.js | JavaScript | Browser runtime module | Yes | 1111 |
| README.md | Markdown | Human + AI onboarding | Yes | 105 |
| AGENTS.md | Markdown | AI instruction override | Yes | 34 |
| PROJECT_MAP.md | Markdown | Generated reference map | Yes | 977 |
| tools/generate-project-map.ps1 | PowerShell | Documentation generator | Yes | 500 |
| soundfonts/GeneralUser-GS.sf2 | Asset | Soundfont asset | Yes | 0 |
| soundfonts/index.json | JSON | Soundfont asset | Yes | 3 |
| soundfonts/README.md | Markdown | Soundfont asset | Yes | 39 |

## index.html Map
File: index.html (1-478)

### ID Anchors
| ID | Element | Line |
|---|---|---:|
| settings-toggle | <button> | 15 |
| theme-toggle | <button> | 23 |
| home-toggle | <button> | 30 |
| settings-panel | <aside> | 37 |
| options-trigger | <button> | 44 |
| piano-volume | <input> | 57 |
| volume-value | <span> | 58 |
| piano-trigger | <button> | 65 |
| piano-label | <span> | 67 |
| piano-preview-main | <button> | 72 |
| instrument-browser-trigger | <button> | 75 |
| note-length | <input> | 83 |
| length-value | <span> | 84 |
| advanced-trigger | <button> | 87 |
| key-count | <input> | 94 |
| key-count-value | <span> | 95 |
| start-note-down-oct | <button> | 103 |
| start-note-down | <button> | 105 |
| start-note-value | <span> | 106 |
| start-note-up | <button> | 107 |
| start-note-up-oct | <button> | 108 |
| reset-settings | <button> | 115 |
| advanced-panel | <section> | 118 |
| attack-label-value | <span> | 122 |
| attack-time | <input> | 125 |
| attack-ghost | <span> | 126 |
| attack-value | <span> | 128 |
| decay-label-value | <span> | 132 |
| decay-rate | <input> | 135 |
| decay-ghost | <span> | 136 |
| decay-value | <span> | 138 |
| release-label-value | <span> | 142 |
| release-rate | <input> | 145 |
| release-ghost | <span> | 146 |
| release-value | <span> | 148 |
| sustain-label-value | <span> | 152 |
| sustain-length | <input> | 155 |
| sustain-ghost | <span> | 156 |
| sustain-value | <span> | 158 |
| profile-search | <input> | 163 |
| profile-list | <div> | 164 |
| profile-meta | <div> | 165 |
| profile-save | <button> | 167 |
| profile-apply | <button> | 168 |
| test-envelope | <button> | 173 |
| piano-panel | <section> | 180 |
| piano-options | <div> | 182 |
| instrument-browser-panel | <section> | 185 |
| instrument-preset-search | <input> | 189 |
| instrument-preset-list | <div> | 190 |
| instrument-preset-meta | <div> | 191 |
| instrument-preset-apply | <button> | 193 |
| options-panel | <section> | 198 |
| practice-mode | <select> | 206 |
| note-count | <input> | 217 |
| note-count-value | <span> | 218 |
| blind-mode | <input> | 234 |
| hide-live-preview | <input> | 247 |
| nice-notes | <input> | 260 |
| chord-rounds | <input> | 273 |
| training-mode | <select> | 287 |
| chord-difficulty | <select> | 301 |
| chord-extra-helpers | <input> | 314 |
| chord-tutorial-open-options | <button> | 326 |
| typing-show-piano | <input> | 336 |
| typing-show-typed | <input> | 349 |
| primary-action | <button> | 369 |
| play-selected | <button> | 370 |
| quick-start | <section> | 373 |
| keyboard | <div> | 391 |
| white-keys | <div> | 392 |
| black-keys | <div> | 393 |
| pedal-icon | <div> | 398 |
| chord-readout | <section> | 402 |
| typing-zone | <section> | 403 |
| chord-answer | <input> | 407 |
| typing-help-toggle | <button> | 408 |
| status-panel | <section> | 414 |
| round-count | <span> | 416 |
| selected-list | <span> | 417 |
| goal-count | <span> | 418 |
| mode-label | <span> | 419 |
| hint-button | <button> | 422 |
| result | <div> | 424 |
| helper-slot | <div> | 425 |
| reveal | <div> | 426 |
| hint-flag | <div> | 427 |
| pedal-tip | <span> | 432 |
| chord-tutorial-modal | <section> | 436 |
| chord-tutorial-backdrop | <button> | 437 |
| chord-tutorial-title | <h4> | 440 |
| chord-tutorial-close | <button> | 441 |
| chord-tutorial-step | <div> | 443 |
| chord-tutorial-current | <div> | 445 |
| chord-tutorial-piano | <div> | 448 |
| tutorial-row-root | <div> | 451 |
| chord-tutorial-root-list | <div> | 453 |
| tutorial-row-quality | <div> | 455 |
| chord-tutorial-quality-list | <div> | 457 |
| chord-tutorial-prev | <button> | 462 |
| chord-tutorial-progress | <span> | 463 |
| chord-tutorial-next | <button> | 464 |

### Script Load Order
| Order | Script | Line |
|---:|---|---:|
| 1 | vendor/libfluidsynth-2.4.6.js?v=20260306000059 | 469 |
| 2 | vendor/js-synthesizer.min.js?v=20260306000059 | 470 |
| 3 | js/core.js?v=20260306000059 | 471 |
| 4 | js/audio.js?v=20260306000059 | 472 |
| 5 | js/game.js?v=20260306000059 | 473 |
| 6 | js/settings.js?v=20260306000059 | 474 |
| 7 | js/events.js?v=20260306000059 | 475 |

## styles.css Map
File: styles.css (1-2794)

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
| .hero | 237-241 |
| .badge | 243-256 |
| h1 | 258-262 |
| .hero p | 264-270 |
| body:not(.landing) .hero h1, body:not(.landing) .hero p | 273-275 |
| body:not(.landing) .tips | 277-279 |
| .hero, .actions, .quick-start, .chord-readout, .typing-zone, .status, .tips | 287-290 |
| body:not(.landing) .hero | 292-296 |
| .control | 298-304 |
| .control.compact | 306-308 |
| .control.compact label | 310-312 |
| .control.compact .control-row | 314-316 |
| .control label | 318-325 |
| .control-row | 327-331 |
| .control-row.align-end | 333-336 |
| .start-note-row | 338-340 |
| .start-note-stepper | 342-352 |
| .start-note-value | 354-360 |
| .step-btn | 362-374 |
| .step-btn.oct | 376-382 |
| .step-btn:hover | 384-387 |
| .advanced-test | 389-392 |
| .advanced-test .unit | 394-397 |
| input[type="number"] | 399-408 |
| .segmented | 410-414 |
| .segmented-btn | 416-425 |
| .segmented-btn.active | 427-431 |
| .actions | 433-439 |
| .quick-start | 441-447 |
| .quick-mode-btn | 449-464 |
| .quick-mode-btn:hover, .quick-mode-btn:focus-visible | 467-472 |
| .quick-mode-title | 474-480 |
| .quick-mode-sub | 482-486 |
| body:not(.landing) .quick-start | 488-490 |
| .btn | 492-499 |
| .btn:focus-visible | 501-504 |
| .btn.primary | 506-510 |
| .btn.secondary | 512-516 |
| .btn.ghost | 518-522 |
| .btn.submit | 524-528 |
| .btn:hover | 530-532 |
| .chord-readout | 534-544 |
| .chord-readout[hidden] | 546-548 |
| .typing-zone | 550-560 |
| .typing-zone label | 562-569 |
| .typing-zone input[type="text"] | 571-583 |
| .typing-zone input[type="text"]::placeholder | 585-588 |
| .typing-row | 590-593 |
| .typing-input-wrap | 595-597 |
| .typing-help-toggle | 599-616 |
| .typing-help-toggle:hover | 618-621 |
| .typing-help-toggle:focus-visible | 623-626 |
| .typing-help-text | 628-634 |
| .typing-help-text strong | 636-638 |
| .typing-help-actions | 640-642 |
| .typing-learn-btn | 644-654 |
| .typing-learn-btn:hover | 656-658 |
| .typing-learn-btn:focus-visible | 660-663 |
| .tutorial-modal | 665-672 |
| .tutorial-modal[hidden] | 674-676 |
| .tutorial-backdrop | 678-684 |
| .tutorial-card | 686-699 |
| .tutorial-card.tutorial-overflow-scroll | 701-704 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-step | 706-712 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-lab | 714-721 |
| .tutorial-card.tutorial-fit-1 | 723-726 |
| .tutorial-card.tutorial-fit-1 .tutorial-step | 728-731 |
| .tutorial-card.tutorial-fit-1 .tutorial-lab | 733-736 |
| .tutorial-card.tutorial-fit-1 .tutorial-chip | 738-741 |
| .tutorial-card.tutorial-fit-1 .tutorial-quality-table th | 743-745 |
| .tutorial-card.tutorial-fit-1 .tutorial-piano | 747-752 |
| .tutorial-card.tutorial-fit-2 | 754-757 |
| .tutorial-card.tutorial-fit-2 .tutorial-head h4 | 759-761 |
| .tutorial-card.tutorial-fit-2 .tutorial-step | 763-766 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-title | 768-770 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-body | 772-775 |
| .tutorial-card.tutorial-fit-2 .tutorial-lab | 777-780 |
| .tutorial-card.tutorial-fit-2 .tutorial-current | 782-784 |
| .tutorial-card.tutorial-fit-2 .tutorial-selector-title | 786-788 |
| .tutorial-card.tutorial-fit-2 .tutorial-chip | 790-793 |
| .tutorial-card.tutorial-fit-2 .tutorial-quality-table th | 795-798 |
| .tutorial-card.tutorial-fit-2 .tutorial-piano | 800-805 |
| .tutorial-card.tutorial-fit-2 .tutorial-actions .advanced-trigger | 807-810 |
| .tutorial-card.tutorial-fit-3 | 812-815 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-kicker | 817-819 |
| .tutorial-card.tutorial-fit-3 .tutorial-step | 821-824 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-title | 826-828 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-body | 830-833 |
| .tutorial-card.tutorial-fit-3 .tutorial-lab | 835-838 |
| .tutorial-card.tutorial-fit-3 .tutorial-current | 840-842 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano-title | 844-847 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th | 849-852 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th, .tutorial-card.tutorial-... | 855-857 |
| .tutorial-card.tutorial-fit-3 .tutorial-chip | 859-862 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano | 864-869 |
| .tutorial-card.tutorial-fit-3 .tutorial-actions .advanced-trigger | 871-874 |
| .tutorial-card.tutorial-fit-3 .tutorial-progress | 876-878 |
| .tutorial-head | 880-885 |
| .tutorial-head h4 | 887-891 |
| .tutorial-close | 893-895 |
| .tutorial-step | 897-905 |
| .tutorial-step-kicker | 907-913 |
| .tutorial-step.focus-flash | 915-917 |
| @keyframes tutorial-focus-flash | 919-926 |
| .tutorial-step-title | 928-931 |
| .tutorial-step-body | 933-937 |
| .tutorial-step-body p | 939-941 |
| .tutorial-step-body p + p | 943-945 |
| .tutorial-example-list | 947-952 |
| .tutorial-example-list code | 954-960 |
| .tutorial-actions | 962-969 |
| .tutorial-progress | 971-975 |
| .tutorial-lab | 977-986 |
| .tutorial-current | 988-992 |
| .tutorial-selector-block | 994-997 |
| .tutorial-control-matrix | 999-1006 |
| .tutorial-control-row | 1008-1016 |
| .tutorial-control-row.locked | 1018-1020 |
| .tutorial-control-row.locked::after | 1022-1029 |
| .tutorial-control-row.newly-unlocked | 1031-1033 |
| @keyframes tutorial-unlock | 1035-1042 |
| .tutorial-selector-title | 1044-1050 |
| .tutorial-chip-list | 1052-1056 |
| #chord-tutorial-quality-list | 1058-1061 |
| .tutorial-quality-table | 1063-1068 |
| .tutorial-quality-table th, .tutorial-quality-table td | 1071-1075 |
| .tutorial-quality-table tr:first-child th, .tutorial-quality-table tr:first-child td | 1078-1080 |
| .tutorial-quality-table th | 1082-1091 |
| .tutorial-chip-group-list | 1093-1097 |
| .tutorial-chip | 1099-1111 |
| .tutorial-chip.unlocked | 1113-1116 |
| .tutorial-chip.unlocked:hover, .tutorial-chip.unlocked:focus-visible | 1119-1122 |
| .tutorial-chip[disabled] | 1124-1128 |
| .tutorial-chip.locked | 1130-1139 |
| .tutorial-chip:hover, .tutorial-chip:focus-visible | 1142-1145 |
| .tutorial-chip.active | 1147-1150 |
| .tutorial-chip.muted | 1152-1155 |
| .tutorial-chip.muted:hover, .tutorial-chip.muted:focus-visible | 1158-1160 |
| .tutorial-chip.newly-unlocked | 1162-1165 |
| .tutorial-chip.locked.newly-unlocked | 1167-1170 |
| .tutorial-piano-wrap | 1172-1177 |
| .tutorial-piano-title | 1179-1186 |
| .tutorial-piano | 1188-1199 |
| .tutorial-key | 1201-1206 |
| .tutorial-key.white | 1208-1216 |
| .tutorial-key.black | 1218-1226 |
| .tutorial-key.tone | 1228-1230 |
| .tutorial-key.tone.root | 1232-1234 |
| .tutorial-key[data-role]::after | 1236-1249 |
| .helper-card | 1251-1258 |
| .helper-title | 1260-1265 |
| .helper-list | 1267-1271 |
| .helper-item | 1273-1284 |
| .helper-item::after | 1286-1294 |
| .helper-item:last-child::after | 1296-1298 |
| .helper-item:hover, .helper-item:focus-within | 1301-1303 |
| .helper-label | 1305-1311 |
| .helper-item .helper-value | 1313-1321 |
| .helper-item .helper-mask | 1323-1330 |
| .helper-item .helper-real | 1332-1344 |
| .helper-item:hover .helper-mask, .helper-item:focus-within .helper-mask | 1347-1350 |
| .helper-item:hover .helper-real, .helper-item:focus-within .helper-real | 1353-1356 |
| .typing-zone[hidden] | 1358-1360 |
| .status | 1362-1373 |
| .status[hidden] | 1375-1377 |
| .helper-slot[hidden] | 1379-1381 |
| .status-actions | 1383-1389 |
| .hint-flag | 1391-1404 |
| .hint-flag[hidden] | 1406-1408 |
| .hint-button | 1410-1412 |
| .settings-toggle | 1414-1429 |
| .settings-toggle:hover | 1431-1433 |
| .settings-toggle svg | 1435-1439 |
| .theme-toggle | 1441-1456 |
| .theme-toggle:hover | 1458-1460 |
| .theme-toggle svg | 1462-1466 |
| .home-toggle | 1468-1483 |
| .home-toggle:hover | 1485-1487 |
| .home-toggle svg | 1489-1493 |
| .settings-panel | 1495-1514 |
| .settings-panel.open | 1516-1520 |
| .settings-panel h2 | 1522-1527 |
| .settings-body | 1529-1533 |
| .settings-grid | 1535-1538 |
| .advanced-trigger | 1540-1548 |
| .dropdown-trigger | 1550-1564 |
| .dropdown-trigger svg | 1566-1570 |
| .dropdown-trigger:focus-visible | 1572-1575 |
| .panel-trigger | 1577-1589 |
| .panel-trigger:hover | 1591-1594 |
| .panel-trigger[aria-expanded="true"] | 1596-1599 |
| .panel-trigger:focus-visible | 1601-1604 |
| .control select | 1606-1615 |
| .options-panel | 1617-1633 |
| .options-panel.open | 1635-1639 |
| .options-panel h3 | 1641-1648 |
| .options-grid | 1650-1653 |
| .options-panel .control | 1655-1661 |
| .options-panel .control.compact | 1663-1665 |
| .options-panel .control label | 1667-1669 |
| .options-section-title | 1671-1680 |
| .options-panel .options-section-title:first-child | 1682-1686 |
| .advanced-panel | 1688-1707 |
| .advanced-panel.open | 1709-1713 |
| .advanced-panel h3 | 1715-1720 |
| .advanced-grid | 1722-1731 |
| .advanced-grid::-webkit-scrollbar | 1733-1735 |
| .advanced-grid::-webkit-scrollbar-track | 1737-1740 |
| .advanced-grid::-webkit-scrollbar-thumb | 1742-1746 |
| .inline-value | 1748-1755 |
| .slider-stack | 1757-1760 |
| .slider-stack input[type="range"] | 1762-1766 |
| .slider-ghost | 1768-1782 |
| .slider-ghost.visible | 1784-1786 |
| .sf2-browser | 1788-1791 |
| .sf2-browser input[type="text"] | 1793-1802 |
| .sf2-preset-list | 1804-1817 |
| .sf2-browser .piano-desc | 1819-1822 |
| .sf2-browser .piano-desc.pending, .profile-browser .piano-desc.pending | 1825-1827 |
| .sf2-group | 1829-1834 |
| .sf2-group-title | 1836-1845 |
| .sf2-row | 1847-1855 |
| .sf2-row:first-child | 1857-1859 |
| .sf2-row:hover | 1861-1863 |
| .sf2-row.active | 1865-1868 |
| .sf2-row-name | 1870-1876 |
| .sf2-row-program, .sf2-row-bank | 1879-1883 |
| .sf2-empty | 1885-1889 |
| .profile-browser | 1891-1894 |
| .profile-browser input[type="text"] | 1896-1905 |
| .profile-list | 1907-1920 |
| .profile-row | 1922-1932 |
| .profile-row:hover | 1934-1936 |
| .profile-row.active | 1938-1941 |
| .profile-row.applied | 1943-1945 |
| .profile-row-name | 1947-1953 |
| .profile-row-kind | 1955-1960 |
| .advanced-footer | 1962-1968 |
| .piano-preview.wide | 1970-1982 |
| .piano-preview.wide::before | 1984-1986 |
| .piano-preview.wide .play-icon | 1988-1994 |
| .piano-preview.wide .play-label | 1996-1998 |
| .instrument-browser-panel | 2000-2015 |
| .instrument-browser-panel.open | 2017-2021 |
| .instrument-browser-panel h3 | 2023-2028 |
| .piano-panel | 2030-2045 |
| .piano-panel.open | 2047-2051 |
| .piano-panel h3 | 2053-2058 |
| .piano-options | 2060-2063 |
| .piano-option | 2065-2077 |
| .piano-option.active | 2079-2082 |
| .piano-option:focus-visible | 2084-2086 |
| .piano-info | 2088-2091 |
| .piano-name | 2093-2096 |
| .piano-desc | 2098-2101 |
| .piano-option.simple .piano-name | 2103-2107 |
| .piano-option.simple .piano-desc | 2109-2113 |
| .piano-preview | 2115-2130 |
| .piano-preview::before | 2132-2140 |
| .piano-preview:active | 2142-2145 |
| .piano-preview.main | 2147-2151 |
| .settings-grid input[type="range"], .advanced-panel input[type="range"], .options-... | 2155-2159 |
| .settings-grid input[type="range"]::-webkit-slider-runnable-track, .advanced-panel... | 2163-2168 |
| .settings-grid input[type="range"]::-webkit-slider-thumb, .advanced-panel input[ty... | 2172-2181 |
| .settings-grid input[type="range"]:focus-visible::-webkit-slider-thumb, .advanced-... | 2185-2188 |
| .settings-grid input[type="range"]::-moz-range-track, .advanced-panel input[type="... | 2192-2197 |
| .settings-grid input[type="range"]::-moz-range-thumb, .advanced-panel input[type="... | 2201-2208 |
| .settings-grid input[type="range"]:focus-visible::-moz-range-thumb, .advanced-pane... | 2212-2215 |
| .volume-value | 2217-2220 |
| .status-row | 2222-2227 |
| .switch | 2229-2233 |
| .switch input | 2235-2240 |
| .switch-track | 2242-2248 |
| .switch-thumb | 2250-2260 |
| .switch input:checked + .switch-track | 2262-2264 |
| .switch input:checked + .switch-track .switch-thumb | 2266-2268 |
| .control.compact .switch | 2270-2273 |
| .control.compact .switch-thumb | 2275-2280 |
| .control.compact .switch input:checked + .switch-track .switch-thumb | 2282-2284 |
| .control.compact .unit | 2286-2288 |
| .test-tone | 2290-2302 |
| .test-tone:hover | 2304-2307 |
| .test-tone:active | 2309-2311 |
| .test-tone-icon | 2313-2320 |
| .test-tone-label | 2322-2326 |
| .result | 2328-2332 |
| .reveal | 2334-2343 |
| .reveal strong | 2345-2347 |
| .reveal-label | 2349-2356 |
| .reveal-grid.compact | 2358-2362 |
| .reveal-cell | 2364-2366 |
| .keyboard-zone | 2368-2378 |
| .keyboard-stack | 2380-2390 |
| .keyboard-wrapper | 2392-2401 |
| .keyboard | 2403-2410 |
| .keyboard-wrapper.ends-black | 2412-2414 |
| .white-keys | 2416-2419 |
| .black-keys | 2421-2428 |
| .key | 2430-2441 |
| .key.white | 2443-2450 |
| .key.white.has-black | 2452-2454 |
| .key.black | 2456-2465 |
| .key span | 2467-2471 |
| .key.black span | 2473-2477 |
| .key.active | 2479-2482 |
| .key.black.active | 2484-2487 |
| .key.selected | 2489-2493 |
| .key.typed-preview | 2495-2497 |
| .key.correct | 2499-2503 |
| .key.wrong | 2505-2509 |
| .key.missed | 2511-2517 |
| .key.black.selected, .key.black.correct, .key.black.wrong | 2521-2523 |
| .key.black.missed | 2525-2531 |
| .keyboard.disabled | 2533-2539 |
| body.tutorial-open .keyboard | 2541-2543 |
| body.tutorial-open .keyboard.disabled | 2545-2548 |
| .keyboard.disabled::before | 2550-2562 |
| body.tutorial-open .keyboard.disabled::before | 2564-2566 |
| .keyboard.disabled::after | 2568-2602 |
| body.tutorial-open .keyboard.disabled::after | 2604-2606 |
| .tips | 2608-2617 |
| #pedal-tip[hidden] | 2619-2621 |
| .pedal-box | 2623-2637 |
| body.landing .pedal-box | 2639-2641 |
| .pedal-label | 2643-2653 |
| .pedal-icon | 2655-2662 |
| .pedal-icon.active | 2664-2667 |
| .note-pills | 2669-2675 |
| .note-pill | 2677-2683 |
| .note-pill.good | 2685-2689 |
| .note-pill.bad | 2691-2695 |
| .note-pill.missed | 2697-2701 |
| .note-pill.neutral | 2703-2707 |
| @media (max-width: 700px) | 2709-2764 |
| @media (max-height: 820px) | 2766-2787 |
| @media (max-height: 700px) | 2789-2794 |

## Documentation + Tooling Maps
### README.md
File: README.md (1-105)
| Heading | Line |
|---|---:|
| TheEarLab | 1 |
| Read First | 5 |
| Project Layout | 18 |
| Run Locally | 32 |
| SF2 Behavior | 46 |
| Chord Training Modes | 65 |
| Maintenance Rules | 96 |
| Verification | 103 |

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
File lines: 1-828

| Symbol | Lines |
|---|---|
| normalizePracticeProfile | 318-337 |
| normalizePracticeProfiles | 338-345 |
| getEffectivePracticeModeFromState | 346-354 |
| capturePracticeProfileFromState | 355-375 |
| saveSettings | 445-474 |
| loadSettings | 476-529 |
| resetAllSettings | 531-561 |
| buildNotes | 609-624 |
| getNoteIdByMidi | 626-633 |
| isConsonant | 645-648 |
| getNicePool | 650-650 |
| getNoteCountMax | 652-656 |
| updateNoteCountMax | 658-666 |
| getCssNumber | 668-668 |
| clamp | 669-669 |
| getMaxStartMidi | 670-670 |
| clampStartMidi | 671-671 |
| getMidiLabel | 672-676 |
| getPanelBottomGap | 677-680 |
| normalizeSoundfontDefinition | 682-700 |
| setSoundfontCatalog | 702-723 |
| getSoundfontList | 725-725 |
| renderPianoOptions | 727-771 |
| createKey | 773-784 |
| renderKeyboard | 786-818 |
| rebuildKeyboard | 820-827 |

### js/events.js (Active Runtime)
File lines: 1-1567

| Symbol | Lines |
|---|---|
| isChordTutorialOpen | 498-498 |
| fitTutorialLayout | 501-529 |
| clearFitClasses | 507-510 |
| applyFitClass | 512-517 |
| getTutorialStep | 531-536 |
| getStepUnlockedRootSet | 538-546 |
| getStepUnlockedQualitySet | 548-554 |
| isTutorialRootEnabled | 556-556 |
| isTutorialQualityEnabled | 557-557 |
| getTutorialRootLabel | 559-562 |
| midiToTutorialLabel | 564-568 |
| getClosestNoteIdFromMidi | 570-577 |
| getTutorialRenderedChord | 579-601 |
| ensureTutorialKeyboard | 603-641 |
| getStepAllowedQualityIds | 643-645 |
| getTutorialActiveSpec | 647-649 |
| renderTutorialCurrentText | 651-662 |
| renderTutorialPianoHighlight | 664-698 |
| renderTutorialRootOptions | 700-718 |
| renderTutorialQualityOptions | 720-765 |
| syncTutorialRootChipStates | 767-786 |
| syncTutorialQualityChipStates | 788-807 |
| setTutorialHoverSpec | 809-816 |
| clearTutorialHoverSpec | 818-821 |
| refreshTutorialVisuals | 823-827 |
| renderChordTutorialStep | 855-910 |
| closeChordTutorial | 912-922 |
| openChordTutorial | 924-941 |
| registerTutorialOpenTrigger | 943-950 |
| isChordTypingCaptureActive | 1062-1067 |
| insertTypedCharacter | 1069-1076 |
| tryPlayTypedChordPreview | 1078-1081 |
| triggerPrimaryAction | 1084-1093 |
| triggerReplayAction | 1095-1101 |
| bindPianoOptionEvents | 1276-1301 |
| setRandomBackgroundAngle | 1520-1523 |
| init | 1525-1561 |
| runDeferredCatalogLoad | 1545-1554 |

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
| homeToggle | click | 180 |
| settingsPanel | click | 193 |
| optionsTrigger | click | 210 |
| optionsPanel | click | 222 |
| document | click | 227 |
| window | resize | 235 |
| playSelectedButton | click | 254 |
| playSelectedButton | pointerdown | 258 |
| playSelectedButton | pointerup | 263 |
| playSelectedButton | pointerleave | 267 |
| primaryActionButton | click | 271 |
| volumeSlider | input | 279 |
| lengthSlider | input | 285 |
| attackSlider | input | 291 |
| decaySlider | input | 297 |
| releaseSlider | input | 303 |
| sustainSlider | input | 309 |
| keyCountSlider | input | 315 |
| keyCountSlider | change | 322 |
| keyCountSlider | pointerup | 326 |
| hintButton | click | 330 |
| chordAnswerInput | input | 335 |
| chordAnswerInput | keydown | 342 |
| triggerEl | click | 945 |
| chordTutorialClose | click | 957 |
| chordTutorialBackdrop | click | 964 |
| chordTutorialPrev | click | 970 |
| chordTutorialNext | click | 978 |
| chordTutorialRootList | mouseover | 990 |
| chordTutorialRootList | mouseleave | 998 |
| chordTutorialRootList | focusin | 1001 |
| chordTutorialRootList | focusout | 1009 |
| chordTutorialRootList | click | 1012 |
| chordTutorialQualityList | mouseover | 1028 |
| chordTutorialQualityList | mouseleave | 1035 |
| chordTutorialQualityList | focusin | 1038 |
| chordTutorialQualityList | focusout | 1045 |
| chordTutorialQualityList | click | 1048 |
| volumeSlider | dblclick | 1103 |
| lengthSlider | dblclick | 1107 |
| keyCountSlider | dblclick | 1111 |
| startNoteDownButton | click | 1117 |
| startNoteUpButton | click | 1120 |
| startNoteDownOctButton | click | 1126 |
| startNoteUpOctButton | click | 1129 |
| noteCountInput | dblclick | 1134 |
| attackSlider | dblclick | 1142 |
| decaySlider | dblclick | 1146 |
| releaseSlider | dblclick | 1150 |
| sustainSlider | dblclick | 1154 |
| profileSearch | input | 1159 |
| profileList | click | 1165 |
| profileList | dblclick | 1170 |
| profileList | keydown | 1173 |
| profileApply | click | 1184 |
| profileSave | click | 1190 |
| instrumentPresetSearch | input | 1196 |
| instrumentPresetList | click | 1202 |
| instrumentPresetList | dblclick | 1207 |
| instrumentPresetList | keydown | 1210 |
| instrumentPresetApply | click | 1221 |
| advancedTrigger | click | 1226 |
| advancedPanel | click | 1235 |
| pianoTrigger | click | 1240 |
| pianoPanel | click | 1252 |
| instrumentBrowserTrigger | click | 1258 |
| instrumentBrowserPanel | click | 1271 |
| pianoOptionsContainer | click | 1279 |
| pianoOptionsContainer | keydown | 1293 |
| pianoPreviewMain | click | 1304 |
| testEnvelopeButton | click | 1311 |
| keyboardEl | pointerdown | 1316 |
| document | pointerup | 1352 |
| document | pointercancel | 1359 |
| keyboardEl | click | 1366 |
| document | keydown | 1370 |
| document | keyup | 1468 |
| pedalBox | pointerdown | 1487 |
| pedalBox | pointerup | 1496 |
| pedalBox | pointercancel | 1505 |
| pedalBox | pointerleave | 1513 |

### js/game.js (Active Runtime)
File lines: 1-1667

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
| goHome | 903-949 |
| refreshTarget | 951-972 |
| startRound | 974-1032 |
| ensureRound | 1034-1043 |
| playTarget | 1045-1059 |
| startManualNote | 1061-1091 |
| releaseManualNote | 1093-1121 |
| releasePedalNotes | 1123-1133 |
| startPedalHold | 1135-1141 |
| stopPedalHold | 1143-1150 |
| toggleSelection | 1152-1183 |
| isSelectionCorrect | 1185-1202 |
| getPlaybackSpan | 1204-1209 |
| renderNotePills | 1211-1217 |
| renderChordPill | 1219-1222 |
| renderTonePills | 1224-1232 |
| renderRevealCell | 1234-1237 |
| renderChordRevealGrid | 1239-1242 |
| renderChordDetectionMeta | 1244-1248 |
| renderPressedPills | 1250-1255 |
| buildNoteComparison | 1257-1264 |
| renderNoteComparisonCells | 1266-1281 |
| playRevealSequence | 1283-1335 |
| playSelectedChord | 1337-1362 |
| playTypedInputChord | 1364-1378 |
| startHeldPlayback | 1380-1446 |
| releaseHeldPlayback | 1448-1475 |
| buildTypingRevealDetail | 1477-1495 |
| submitTypedAnswer | 1497-1574 |
| submitAnswer | 1576-1645 |

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

