# Project Map

Generated: 2026-03-06 00:10:04 +01:00

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
| styles.css | CSS | Loaded directly | Yes | 2767 |
| js/audio.js | JavaScript | Browser runtime module | Yes | 1517 |
| js/core.js | JavaScript | Browser runtime module | Yes | 826 |
| js/events.js | JavaScript | Browser runtime module | Yes | 1553 |
| js/game.js | JavaScript | Browser runtime module | Yes | 1618 |
| js/settings.js | JavaScript | Browser runtime module | Yes | 1111 |
| README.md | Markdown | Human + AI onboarding | Yes | 104 |
| AGENTS.md | Markdown | AI instruction override | Yes | 34 |
| PROJECT_MAP.md | Markdown | Generated reference map | Yes | 977 |
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
File: styles.css (1-2767)

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
| .settings-panel | 1468-1487 |
| .settings-panel.open | 1489-1493 |
| .settings-panel h2 | 1495-1500 |
| .settings-body | 1502-1506 |
| .settings-grid | 1508-1511 |
| .advanced-trigger | 1513-1521 |
| .dropdown-trigger | 1523-1537 |
| .dropdown-trigger svg | 1539-1543 |
| .dropdown-trigger:focus-visible | 1545-1548 |
| .panel-trigger | 1550-1562 |
| .panel-trigger:hover | 1564-1567 |
| .panel-trigger[aria-expanded="true"] | 1569-1572 |
| .panel-trigger:focus-visible | 1574-1577 |
| .control select | 1579-1588 |
| .options-panel | 1590-1606 |
| .options-panel.open | 1608-1612 |
| .options-panel h3 | 1614-1621 |
| .options-grid | 1623-1626 |
| .options-panel .control | 1628-1634 |
| .options-panel .control.compact | 1636-1638 |
| .options-panel .control label | 1640-1642 |
| .options-section-title | 1644-1653 |
| .options-panel .options-section-title:first-child | 1655-1659 |
| .advanced-panel | 1661-1680 |
| .advanced-panel.open | 1682-1686 |
| .advanced-panel h3 | 1688-1693 |
| .advanced-grid | 1695-1704 |
| .advanced-grid::-webkit-scrollbar | 1706-1708 |
| .advanced-grid::-webkit-scrollbar-track | 1710-1713 |
| .advanced-grid::-webkit-scrollbar-thumb | 1715-1719 |
| .inline-value | 1721-1728 |
| .slider-stack | 1730-1733 |
| .slider-stack input[type="range"] | 1735-1739 |
| .slider-ghost | 1741-1755 |
| .slider-ghost.visible | 1757-1759 |
| .sf2-browser | 1761-1764 |
| .sf2-browser input[type="text"] | 1766-1775 |
| .sf2-preset-list | 1777-1790 |
| .sf2-browser .piano-desc | 1792-1795 |
| .sf2-browser .piano-desc.pending, .profile-browser .piano-desc.pending | 1798-1800 |
| .sf2-group | 1802-1807 |
| .sf2-group-title | 1809-1818 |
| .sf2-row | 1820-1828 |
| .sf2-row:first-child | 1830-1832 |
| .sf2-row:hover | 1834-1836 |
| .sf2-row.active | 1838-1841 |
| .sf2-row-name | 1843-1849 |
| .sf2-row-program, .sf2-row-bank | 1852-1856 |
| .sf2-empty | 1858-1862 |
| .profile-browser | 1864-1867 |
| .profile-browser input[type="text"] | 1869-1878 |
| .profile-list | 1880-1893 |
| .profile-row | 1895-1905 |
| .profile-row:hover | 1907-1909 |
| .profile-row.active | 1911-1914 |
| .profile-row.applied | 1916-1918 |
| .profile-row-name | 1920-1926 |
| .profile-row-kind | 1928-1933 |
| .advanced-footer | 1935-1941 |
| .piano-preview.wide | 1943-1955 |
| .piano-preview.wide::before | 1957-1959 |
| .piano-preview.wide .play-icon | 1961-1967 |
| .piano-preview.wide .play-label | 1969-1971 |
| .instrument-browser-panel | 1973-1988 |
| .instrument-browser-panel.open | 1990-1994 |
| .instrument-browser-panel h3 | 1996-2001 |
| .piano-panel | 2003-2018 |
| .piano-panel.open | 2020-2024 |
| .piano-panel h3 | 2026-2031 |
| .piano-options | 2033-2036 |
| .piano-option | 2038-2050 |
| .piano-option.active | 2052-2055 |
| .piano-option:focus-visible | 2057-2059 |
| .piano-info | 2061-2064 |
| .piano-name | 2066-2069 |
| .piano-desc | 2071-2074 |
| .piano-option.simple .piano-name | 2076-2080 |
| .piano-option.simple .piano-desc | 2082-2086 |
| .piano-preview | 2088-2103 |
| .piano-preview::before | 2105-2113 |
| .piano-preview:active | 2115-2118 |
| .piano-preview.main | 2120-2124 |
| .settings-grid input[type="range"], .advanced-panel input[type="range"], .options-... | 2128-2132 |
| .settings-grid input[type="range"]::-webkit-slider-runnable-track, .advanced-panel... | 2136-2141 |
| .settings-grid input[type="range"]::-webkit-slider-thumb, .advanced-panel input[ty... | 2145-2154 |
| .settings-grid input[type="range"]:focus-visible::-webkit-slider-thumb, .advanced-... | 2158-2161 |
| .settings-grid input[type="range"]::-moz-range-track, .advanced-panel input[type="... | 2165-2170 |
| .settings-grid input[type="range"]::-moz-range-thumb, .advanced-panel input[type="... | 2174-2181 |
| .settings-grid input[type="range"]:focus-visible::-moz-range-thumb, .advanced-pane... | 2185-2188 |
| .volume-value | 2190-2193 |
| .status-row | 2195-2200 |
| .switch | 2202-2206 |
| .switch input | 2208-2213 |
| .switch-track | 2215-2221 |
| .switch-thumb | 2223-2233 |
| .switch input:checked + .switch-track | 2235-2237 |
| .switch input:checked + .switch-track .switch-thumb | 2239-2241 |
| .control.compact .switch | 2243-2246 |
| .control.compact .switch-thumb | 2248-2253 |
| .control.compact .switch input:checked + .switch-track .switch-thumb | 2255-2257 |
| .control.compact .unit | 2259-2261 |
| .test-tone | 2263-2275 |
| .test-tone:hover | 2277-2280 |
| .test-tone:active | 2282-2284 |
| .test-tone-icon | 2286-2293 |
| .test-tone-label | 2295-2299 |
| .result | 2301-2305 |
| .reveal | 2307-2316 |
| .reveal strong | 2318-2320 |
| .reveal-label | 2322-2329 |
| .reveal-grid.compact | 2331-2335 |
| .reveal-cell | 2337-2339 |
| .keyboard-zone | 2341-2351 |
| .keyboard-stack | 2353-2363 |
| .keyboard-wrapper | 2365-2374 |
| .keyboard | 2376-2383 |
| .keyboard-wrapper.ends-black | 2385-2387 |
| .white-keys | 2389-2392 |
| .black-keys | 2394-2401 |
| .key | 2403-2414 |
| .key.white | 2416-2423 |
| .key.white.has-black | 2425-2427 |
| .key.black | 2429-2438 |
| .key span | 2440-2444 |
| .key.black span | 2446-2450 |
| .key.active | 2452-2455 |
| .key.black.active | 2457-2460 |
| .key.selected | 2462-2466 |
| .key.typed-preview | 2468-2470 |
| .key.correct | 2472-2476 |
| .key.wrong | 2478-2482 |
| .key.missed | 2484-2490 |
| .key.black.selected, .key.black.correct, .key.black.wrong | 2494-2496 |
| .key.black.missed | 2498-2504 |
| .keyboard.disabled | 2506-2512 |
| body.tutorial-open .keyboard | 2514-2516 |
| body.tutorial-open .keyboard.disabled | 2518-2521 |
| .keyboard.disabled::before | 2523-2535 |
| body.tutorial-open .keyboard.disabled::before | 2537-2539 |
| .keyboard.disabled::after | 2541-2575 |
| body.tutorial-open .keyboard.disabled::after | 2577-2579 |
| .tips | 2581-2590 |
| #pedal-tip[hidden] | 2592-2594 |
| .pedal-box | 2596-2610 |
| body.landing .pedal-box | 2612-2614 |
| .pedal-label | 2616-2626 |
| .pedal-icon | 2628-2635 |
| .pedal-icon.active | 2637-2640 |
| .note-pills | 2642-2648 |
| .note-pill | 2650-2656 |
| .note-pill.good | 2658-2662 |
| .note-pill.bad | 2664-2668 |
| .note-pill.missed | 2670-2674 |
| .note-pill.neutral | 2676-2680 |
| @media (max-width: 700px) | 2682-2737 |
| @media (max-height: 820px) | 2739-2760 |
| @media (max-height: 700px) | 2762-2767 |

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

