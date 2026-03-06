# Project Map

Generated: 2026-03-06 09:46:59 +01:00

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
| index.html | HTML | Loaded directly | Yes | 491 |
| styles.css | CSS | Loaded directly | Yes | 2786 |
| js/audio.js | JavaScript | Browser runtime module | Yes | 1526 |
| js/core.js | JavaScript | Browser runtime module | Yes | 1003 |
| js/events.js | JavaScript | Browser runtime module | Yes | 1659 |
| js/game.js | JavaScript | Browser runtime module | Yes | 1839 |
| js/settings.js | JavaScript | Browser runtime module | Yes | 1142 |
| README.md | Markdown | Human + AI onboarding | Yes | 112 |
| AGENTS.md | Markdown | AI instruction override | Yes | 34 |
| PROJECT_MAP.md | Markdown | Generated reference map | Yes | 998 |
| tools/generate-project-map.ps1 | PowerShell | Documentation generator | Yes | 500 |
| soundfonts/GeneralUser-GS.sf2 | Asset | Soundfont asset | Yes | 0 |
| soundfonts/index.json | JSON | Soundfont asset | Yes | 3 |
| soundfonts/README.md | Markdown | Soundfont asset | Yes | 39 |

## index.html Map
File: index.html (1-491)

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
| chord-root-hint | <input> | 327 |
| chord-tutorial-open-options | <button> | 339 |
| typing-show-piano | <input> | 349 |
| typing-show-typed | <input> | 362 |
| primary-action | <button> | 382 |
| play-selected | <button> | 383 |
| quick-start | <section> | 386 |
| keyboard | <div> | 404 |
| white-keys | <div> | 405 |
| black-keys | <div> | 406 |
| pedal-icon | <div> | 411 |
| chord-readout | <section> | 415 |
| typing-zone | <section> | 416 |
| chord-answer | <input> | 420 |
| typing-help-toggle | <button> | 421 |
| status-panel | <section> | 427 |
| round-count | <span> | 429 |
| selected-list | <span> | 430 |
| goal-count | <span> | 431 |
| mode-label | <span> | 432 |
| hint-button | <button> | 435 |
| result | <div> | 437 |
| helper-slot | <div> | 438 |
| reveal | <div> | 439 |
| hint-flag | <div> | 440 |
| pedal-tip | <span> | 445 |
| chord-tutorial-modal | <section> | 449 |
| chord-tutorial-backdrop | <button> | 450 |
| chord-tutorial-title | <h4> | 453 |
| chord-tutorial-close | <button> | 454 |
| chord-tutorial-step | <div> | 456 |
| chord-tutorial-current | <div> | 458 |
| chord-tutorial-piano | <div> | 461 |
| tutorial-row-root | <div> | 464 |
| chord-tutorial-root-list | <div> | 466 |
| tutorial-row-quality | <div> | 468 |
| chord-tutorial-quality-list | <div> | 470 |
| chord-tutorial-prev | <button> | 475 |
| chord-tutorial-progress | <span> | 476 |
| chord-tutorial-next | <button> | 477 |

### Script Load Order
| Order | Script | Line |
|---:|---|---:|
| 1 | vendor/libfluidsynth-2.4.6.js?v=20260306094634 | 482 |
| 2 | vendor/js-synthesizer.min.js?v=20260306094634 | 483 |
| 3 | js/core.js?v=20260306094634 | 484 |
| 4 | js/audio.js?v=20260306094634 | 485 |
| 5 | js/game.js?v=20260306094634 | 486 |
| 6 | js/settings.js?v=20260306094634 | 487 |
| 7 | js/events.js?v=20260306094634 | 488 |

## styles.css Map
File: styles.css (1-2786)

### Top-Level CSS Blocks
| Selector | Lines |
|---|---|
| :root | 3-123 |
| body.theme-dark | 125-213 |
| * | 215-217 |
| body | 219-231 |
| body.landing | 233-235 |
| .app | 237-253 |
| .app > section, .app > header, .app > footer | 257-259 |
| .hero | 261-265 |
| .badge | 267-280 |
| h1 | 282-286 |
| .hero p | 288-294 |
| body:not(.landing) .hero h1, body:not(.landing) .hero p | 297-299 |
| body:not(.landing) .tips | 301-303 |
| .hero, .actions, .quick-start, .chord-readout, .typing-zone, .status, .tips | 311-314 |
| body:not(.landing) .hero | 316-320 |
| .control | 322-328 |
| .control.compact | 330-332 |
| .control.compact label | 334-336 |
| .control.compact .control-row | 338-340 |
| .control label | 342-349 |
| .control-row | 351-355 |
| .control-row.align-end | 357-360 |
| .start-note-row | 362-364 |
| .start-note-stepper | 366-376 |
| .start-note-value | 378-384 |
| .step-btn | 386-398 |
| .step-btn.oct | 400-406 |
| .step-btn:hover | 408-411 |
| .advanced-test | 413-416 |
| .advanced-test .unit | 418-421 |
| input[type="number"] | 423-432 |
| .segmented | 434-438 |
| .segmented-btn | 440-449 |
| .segmented-btn.active | 451-455 |
| .actions | 457-463 |
| .quick-start | 465-471 |
| .quick-mode-btn | 473-488 |
| .quick-mode-btn:hover, .quick-mode-btn:focus-visible | 491-496 |
| .quick-mode-title | 498-504 |
| .quick-mode-sub | 506-510 |
| body:not(.landing) .quick-start | 512-514 |
| .btn | 516-523 |
| .btn:focus-visible | 525-528 |
| .btn.primary | 530-534 |
| .btn.secondary | 536-540 |
| .btn.ghost | 542-546 |
| .btn.submit | 548-552 |
| .btn:hover | 554-556 |
| .chord-readout | 558-568 |
| .chord-readout[hidden] | 570-572 |
| .typing-zone | 574-584 |
| .typing-zone label | 586-593 |
| .typing-zone input[type="text"] | 595-607 |
| .typing-zone input[type="text"]::placeholder | 609-612 |
| .typing-row | 614-617 |
| .typing-input-wrap | 619-621 |
| .typing-help-toggle | 623-640 |
| .typing-help-toggle:hover | 642-645 |
| .typing-help-toggle:focus-visible | 647-650 |
| .typing-help-text | 652-658 |
| .typing-help-text strong | 660-662 |
| .typing-help-actions | 664-666 |
| .typing-learn-btn | 668-678 |
| .typing-learn-btn:hover | 680-682 |
| .typing-learn-btn:focus-visible | 684-687 |
| .tutorial-modal | 689-696 |
| .tutorial-modal[hidden] | 698-700 |
| .tutorial-backdrop | 702-708 |
| .tutorial-card | 710-723 |
| .tutorial-card.tutorial-overflow-scroll | 725-728 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-step | 730-736 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-lab | 738-745 |
| .tutorial-card.tutorial-fit-1 | 747-750 |
| .tutorial-card.tutorial-fit-1 .tutorial-step | 752-755 |
| .tutorial-card.tutorial-fit-1 .tutorial-lab | 757-760 |
| .tutorial-card.tutorial-fit-1 .tutorial-chip | 762-765 |
| .tutorial-card.tutorial-fit-1 .tutorial-quality-table th | 767-769 |
| .tutorial-card.tutorial-fit-1 .tutorial-piano | 771-776 |
| .tutorial-card.tutorial-fit-2 | 778-781 |
| .tutorial-card.tutorial-fit-2 .tutorial-head h4 | 783-785 |
| .tutorial-card.tutorial-fit-2 .tutorial-step | 787-790 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-title | 792-794 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-body | 796-799 |
| .tutorial-card.tutorial-fit-2 .tutorial-lab | 801-804 |
| .tutorial-card.tutorial-fit-2 .tutorial-current | 806-808 |
| .tutorial-card.tutorial-fit-2 .tutorial-selector-title | 810-812 |
| .tutorial-card.tutorial-fit-2 .tutorial-chip | 814-817 |
| .tutorial-card.tutorial-fit-2 .tutorial-quality-table th | 819-822 |
| .tutorial-card.tutorial-fit-2 .tutorial-piano | 824-829 |
| .tutorial-card.tutorial-fit-2 .tutorial-actions .advanced-trigger | 831-834 |
| .tutorial-card.tutorial-fit-3 | 836-839 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-kicker | 841-843 |
| .tutorial-card.tutorial-fit-3 .tutorial-step | 845-848 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-title | 850-852 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-body | 854-857 |
| .tutorial-card.tutorial-fit-3 .tutorial-lab | 859-862 |
| .tutorial-card.tutorial-fit-3 .tutorial-current | 864-866 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano-title | 868-871 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th | 873-876 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th, .tutorial-card.tutorial-... | 879-881 |
| .tutorial-card.tutorial-fit-3 .tutorial-chip | 883-886 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano | 888-893 |
| .tutorial-card.tutorial-fit-3 .tutorial-actions .advanced-trigger | 895-898 |
| .tutorial-card.tutorial-fit-3 .tutorial-progress | 900-902 |
| .tutorial-head | 904-909 |
| .tutorial-head h4 | 911-915 |
| .tutorial-close | 917-919 |
| .tutorial-step | 921-929 |
| .tutorial-step-kicker | 931-937 |
| .tutorial-step.focus-flash | 939-941 |
| @keyframes tutorial-focus-flash | 943-950 |
| .tutorial-step-title | 952-955 |
| .tutorial-step-body | 957-961 |
| .tutorial-step-body p | 963-965 |
| .tutorial-step-body p + p | 967-969 |
| .tutorial-example-list | 971-976 |
| .tutorial-example-list code | 978-984 |
| .tutorial-actions | 986-993 |
| .tutorial-progress | 995-999 |
| .tutorial-lab | 1001-1010 |
| .tutorial-current | 1012-1016 |
| .tutorial-selector-block | 1018-1021 |
| .tutorial-control-matrix | 1023-1030 |
| .tutorial-control-row | 1032-1040 |
| .tutorial-control-row.locked | 1042-1044 |
| .tutorial-control-row.locked::after | 1046-1053 |
| .tutorial-control-row.newly-unlocked | 1055-1057 |
| @keyframes tutorial-unlock | 1059-1066 |
| .tutorial-selector-title | 1068-1074 |
| .tutorial-chip-list | 1076-1080 |
| #chord-tutorial-quality-list | 1082-1085 |
| .tutorial-quality-table | 1087-1092 |
| .tutorial-quality-table th, .tutorial-quality-table td | 1095-1099 |
| .tutorial-quality-table tr:first-child th, .tutorial-quality-table tr:first-child td | 1102-1104 |
| .tutorial-quality-table th | 1106-1115 |
| .tutorial-chip-group-list | 1117-1121 |
| .tutorial-chip | 1123-1135 |
| .tutorial-chip.unlocked | 1137-1140 |
| .tutorial-chip.unlocked:hover, .tutorial-chip.unlocked:focus-visible | 1143-1146 |
| .tutorial-chip[disabled] | 1148-1152 |
| .tutorial-chip.locked | 1154-1163 |
| .tutorial-chip:hover, .tutorial-chip:focus-visible | 1166-1169 |
| .tutorial-chip.active | 1171-1174 |
| .tutorial-chip.muted | 1176-1179 |
| .tutorial-chip.muted:hover, .tutorial-chip.muted:focus-visible | 1182-1184 |
| .tutorial-chip.newly-unlocked | 1186-1189 |
| .tutorial-chip.locked.newly-unlocked | 1191-1194 |
| .tutorial-piano-wrap | 1196-1201 |
| .tutorial-piano-title | 1203-1210 |
| .tutorial-piano | 1212-1223 |
| .tutorial-key | 1225-1230 |
| .tutorial-key.white | 1232-1240 |
| .tutorial-key.black | 1242-1250 |
| .tutorial-key.tone | 1252-1254 |
| .tutorial-key.tone.root | 1256-1258 |
| .tutorial-key[data-role]::after | 1260-1273 |
| .helper-card | 1275-1282 |
| .helper-title | 1284-1289 |
| .helper-list | 1291-1295 |
| .helper-item | 1297-1308 |
| .helper-item::after | 1310-1318 |
| .helper-item:last-child::after | 1320-1322 |
| .helper-item:hover, .helper-item:focus-within | 1325-1327 |
| .helper-item.helper-cursor-hidden, .helper-item.helper-cursor-hidden * | 1330-1332 |
| .helper-label | 1334-1340 |
| .helper-item .helper-value | 1342-1350 |
| .helper-item .helper-mask | 1352-1360 |
| .helper-item .helper-real | 1362-1374 |
| .helper-item:hover .helper-mask, .helper-item:focus-within .helper-mask | 1377-1380 |
| .helper-item:hover .helper-real, .helper-item:focus-within .helper-real | 1383-1386 |
| .typing-zone[hidden] | 1388-1390 |
| .status | 1392-1403 |
| .status[hidden] | 1405-1407 |
| .helper-slot[hidden] | 1409-1411 |
| .status-actions | 1413-1419 |
| .hint-flag | 1421-1434 |
| .hint-flag[hidden] | 1436-1438 |
| .hint-button | 1440-1442 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) | 1444-1458 |
| .settings-toggle | 1460-1462 |
| .theme-toggle | 1464-1466 |
| .home-toggle | 1468-1470 |
| :is(.settings-toggle, .theme-toggle, .home-toggle):hover | 1472-1474 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) svg | 1476-1480 |
| .settings-toggle svg | 1482-1485 |
| .settings-panel | 1487-1506 |
| .settings-panel.open | 1508-1512 |
| .settings-panel h2 | 1514-1519 |
| .settings-body | 1521-1525 |
| .settings-grid | 1527-1530 |
| .advanced-trigger | 1532-1540 |
| .dropdown-trigger | 1542-1556 |
| .dropdown-trigger svg | 1558-1562 |
| .dropdown-trigger:focus-visible | 1564-1567 |
| .panel-trigger | 1569-1581 |
| .panel-trigger:hover | 1583-1586 |
| .panel-trigger[aria-expanded="true"] | 1588-1591 |
| .panel-trigger:focus-visible | 1593-1596 |
| .control select | 1598-1607 |
| .options-panel | 1609-1625 |
| .options-panel.open | 1627-1631 |
| .options-panel h3 | 1633-1640 |
| .options-grid | 1642-1645 |
| .options-panel .control | 1647-1653 |
| .options-panel .control.compact | 1655-1657 |
| .options-panel .control label | 1659-1661 |
| .options-section-title | 1663-1672 |
| .options-panel .options-section-title:first-child | 1674-1678 |
| .advanced-panel | 1680-1699 |
| .advanced-panel.open | 1701-1705 |
| .advanced-panel h3 | 1707-1712 |
| .advanced-grid | 1714-1723 |
| .advanced-grid::-webkit-scrollbar | 1725-1727 |
| .advanced-grid::-webkit-scrollbar-track | 1729-1732 |
| .advanced-grid::-webkit-scrollbar-thumb | 1734-1738 |
| .inline-value | 1740-1747 |
| .slider-stack | 1749-1752 |
| .slider-stack input[type="range"] | 1754-1758 |
| .slider-ghost | 1760-1774 |
| .slider-ghost.visible | 1776-1778 |
| .sf2-browser | 1780-1783 |
| .sf2-browser input[type="text"] | 1785-1794 |
| .sf2-preset-list | 1796-1809 |
| .sf2-browser .piano-desc | 1811-1814 |
| .sf2-browser .piano-desc.pending, .profile-browser .piano-desc.pending | 1817-1819 |
| .sf2-group | 1821-1826 |
| .sf2-group-title | 1828-1837 |
| .sf2-row | 1839-1847 |
| .sf2-row:first-child | 1849-1851 |
| .sf2-row:hover | 1853-1855 |
| .sf2-row.active | 1857-1860 |
| .sf2-row-name | 1862-1868 |
| .sf2-row-program, .sf2-row-bank | 1871-1875 |
| .sf2-empty | 1877-1881 |
| .profile-browser | 1883-1886 |
| .profile-browser input[type="text"] | 1888-1897 |
| .profile-list | 1899-1912 |
| .profile-row | 1914-1924 |
| .profile-row:hover | 1926-1928 |
| .profile-row.active | 1930-1933 |
| .profile-row.applied | 1935-1937 |
| .profile-row-name | 1939-1945 |
| .profile-row-kind | 1947-1952 |
| .advanced-footer | 1954-1960 |
| .piano-preview.wide | 1962-1974 |
| .piano-preview.wide::before | 1976-1978 |
| .piano-preview.wide .play-icon | 1980-1986 |
| .piano-preview.wide .play-label | 1988-1990 |
| .instrument-browser-panel | 1992-2007 |
| .instrument-browser-panel.open | 2009-2013 |
| .instrument-browser-panel h3 | 2015-2020 |
| .piano-panel | 2022-2037 |
| .piano-panel.open | 2039-2043 |
| .piano-panel h3 | 2045-2050 |
| .piano-options | 2052-2055 |
| .piano-option | 2057-2069 |
| .piano-option.active | 2071-2074 |
| .piano-option:focus-visible | 2076-2078 |
| .piano-info | 2080-2083 |
| .piano-name | 2085-2088 |
| .piano-desc | 2090-2093 |
| .piano-option.simple .piano-name | 2095-2099 |
| .piano-option.simple .piano-desc | 2101-2105 |
| .piano-preview | 2107-2122 |
| .piano-preview::before | 2124-2132 |
| .piano-preview:active | 2134-2137 |
| .piano-preview.main | 2139-2143 |
| .settings-grid input[type="range"], .advanced-panel input[type="range"], .options-... | 2147-2151 |
| .settings-grid input[type="range"]::-webkit-slider-runnable-track, .advanced-panel... | 2155-2160 |
| .settings-grid input[type="range"]::-webkit-slider-thumb, .advanced-panel input[ty... | 2164-2173 |
| .settings-grid input[type="range"]:focus-visible::-webkit-slider-thumb, .advanced-... | 2177-2180 |
| .settings-grid input[type="range"]::-moz-range-track, .advanced-panel input[type="... | 2184-2189 |
| .settings-grid input[type="range"]::-moz-range-thumb, .advanced-panel input[type="... | 2193-2200 |
| .settings-grid input[type="range"]:focus-visible::-moz-range-thumb, .advanced-pane... | 2204-2207 |
| .volume-value | 2209-2212 |
| .status-row | 2214-2219 |
| .switch | 2221-2225 |
| .switch input | 2227-2232 |
| .switch-track | 2234-2240 |
| .switch-thumb | 2242-2252 |
| .switch input:checked + .switch-track | 2254-2256 |
| .switch input:checked + .switch-track .switch-thumb | 2258-2260 |
| .control.compact .switch | 2262-2265 |
| .control.compact .switch-thumb | 2267-2272 |
| .control.compact .switch input:checked + .switch-track .switch-thumb | 2274-2276 |
| .control.compact .unit | 2278-2280 |
| .test-tone | 2282-2294 |
| .test-tone:hover | 2296-2299 |
| .test-tone:active | 2301-2303 |
| .test-tone-icon | 2305-2312 |
| .test-tone-label | 2314-2318 |
| .result | 2320-2324 |
| .reveal | 2326-2335 |
| .reveal strong | 2337-2339 |
| .reveal-label | 2341-2348 |
| .reveal-grid.compact | 2350-2354 |
| .reveal-cell | 2356-2358 |
| .keyboard-zone | 2360-2370 |
| .keyboard-stack | 2372-2382 |
| .keyboard-wrapper | 2384-2393 |
| .keyboard | 2395-2402 |
| .keyboard-wrapper.ends-black | 2404-2406 |
| .white-keys | 2408-2411 |
| .black-keys | 2413-2420 |
| .key | 2422-2433 |
| .key.white | 2435-2442 |
| .key.white.has-black | 2444-2446 |
| .key.black | 2448-2457 |
| .key span | 2459-2463 |
| .key.black span | 2465-2469 |
| .key.active | 2471-2474 |
| .key.black.active | 2476-2479 |
| .key.selected | 2481-2485 |
| .key.typed-preview | 2487-2489 |
| .key.correct | 2491-2495 |
| .key.wrong | 2497-2501 |
| .key.missed | 2503-2509 |
| .key.black.selected, .key.black.correct, .key.black.wrong | 2513-2515 |
| .key.black.missed | 2517-2523 |
| .keyboard.disabled | 2525-2531 |
| body.tutorial-open .keyboard | 2533-2535 |
| body.tutorial-open .keyboard.disabled | 2537-2540 |
| .keyboard.disabled::before | 2542-2554 |
| body.tutorial-open .keyboard.disabled::before | 2556-2558 |
| .keyboard.disabled::after | 2560-2594 |
| body.tutorial-open .keyboard.disabled::after | 2596-2598 |
| .tips | 2600-2609 |
| #pedal-tip[hidden] | 2611-2613 |
| .pedal-box | 2615-2629 |
| body.landing .pedal-box | 2631-2633 |
| .pedal-label | 2635-2645 |
| .pedal-icon | 2647-2654 |
| .pedal-icon.active | 2656-2659 |
| .note-pills | 2661-2667 |
| .note-pill | 2669-2675 |
| .note-pill.good | 2677-2681 |
| .note-pill.bad | 2683-2687 |
| .note-pill.missed | 2689-2693 |
| .note-pill.neutral | 2695-2699 |
| @media (max-width: 700px) | 2701-2756 |
| @media (max-height: 820px) | 2758-2779 |
| @media (max-height: 700px) | 2781-2786 |

## Documentation + Tooling Maps
### README.md
File: README.md (1-112)
| Heading | Line |
|---|---:|
| TheEarLab | 1 |
| Read First | 5 |
| Project Layout | 18 |
| Run Locally | 32 |
| SF2 Behavior | 46 |
| Chord Training Modes | 65 |
| Maintenance Rules | 103 |
| Verification | 110 |

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
File lines: 1-1526

| Symbol | Lines |
|---|---|
| clampValue | 62-62 |
| releaseRateToSeconds | 63-63 |
| getBaseAdsrForProgram | 64-69 |
| toUnixPath | 76-76 |
| getDirectoryPath | 78-82 |
| resolveRelativePath | 84-91 |
| normalizeManifestPath | 93-106 |
| fetchTextSafe | 108-123 |
| fetchJsonSafe | 125-140 |
| parseDirectoryListing | 142-153 |
| noteIdToMidi | 175-186 |
| frequencyToMidi | 188-191 |
| normalizeSampleEntries | 193-224 |
| normalizeSoundfontConfig | 226-248 |
| getFilenameFromPath | 250-254 |
| toManifestRelativePath | 256-266 |
| getManifestEntries | 268-271 |
| getManifestConfigPaths | 273-290 |
| getManifestSf2Paths | 292-309 |
| getDirectoryEntries | 311-314 |
| getDirectoryConfigPaths | 316-334 |
| getDirectorySf2Paths | 336-346 |
| discoverExternalSoundfonts | 348-362 |
| discoverSf2Paths | 364-368 |
| getSf2SimplePrograms | 370-378 |
| findSf2PresetName | 380-384 |
| createSf2SimplePresets | 386-408 |
| makeSf2PresetKey | 410-410 |
| ensureSf2SynthReady | 412-438 |
| loadSf2Pack | 440-472 |
| rebuildSf2PresetBrowser | 474-495 |
| refreshSf2PresetBrowserEntries | 497-500 |
| getSf2PresetBrowserEntries | 502-507 |
| selectSf2BrowserPreset | 509-539 |
| refreshSoundfontCatalog | 541-614 |
| ensureAudio | 616-654 |
| getSelectedSoundfont | 656-668 |
| getSourceEntry | 670-675 |
| removeVoice | 677-719 |
| releaseVoice | 721-768 |
| releaseVoices | 770-775 |
| stopAllNotes | 777-826 |
| stopNotesById | 828-840 |
| abortPlayback | 842-844 |
| getSoundfontEnvelope | 846-863 |
| scheduleSampleEnvelope | 865-882 |
| createGeneratedSampleBuffer | 884-927 |
| buildGeneratedSampleSet | 929-939 |
| decodeAudioBuffer | 941-948 |
| buildExternalSampleSet | 950-971 |
| applySf2TrimGenerators | 973-981 |
| getSf2NoteDuration | 983-993 |
| ensureSf2PresetReady | 995-1009 |
| ensureSoundfontReady | 1011-1087 |
| findNearestSample | 1089-1102 |
| scheduleSf2Note | 1104-1159 |
| noteOff | 1145-1151 |
| scheduleWithEntry | 1180-1225 |
| registerKeyTimer | 1240-1247 |
| unregisterKeyTimer | 1249-1258 |
| clearKeyTimersForNote | 1260-1268 |
| activateKey | 1270-1276 |
| scheduleKeyRelease | 1278-1291 |
| scheduleKeyAnimation | 1293-1304 |
| playNotes | 1306-1356 |
| playNotesNow | 1358-1361 |
| clearPreviewTimers | 1363-1366 |
| stopPreviewPlayback | 1368-1394 |
| schedulePreviewEvent | 1396-1402 |
| previewNoteOn | 1404-1415 |
| previewNoteOff | 1417-1426 |
| previewPedalOn | 1428-1447 |
| activate | 1432-1437 |
| previewPedalOff | 1449-1463 |
| buildPreviewSequence | 1465-1509 |

Event bindings:
| Target | Event | Line |
|---|---|---:|
| source | ended | 1222 |

### js/core.js (Active Runtime)
File lines: 1-1003

| Symbol | Lines |
|---|---|
| normalizePracticeProfile | 391-411 |
| normalizePracticeProfiles | 412-419 |
| isTypingOnlyModeFromState | 423-423 |
| getEffectiveBlindModeFromState | 427-427 |
| getEffectivePracticeModeFromState | 428-436 |
| capturePracticeProfileFromState | 437-458 |
| clampEnvelopeValue | 555-555 |
| resolveEnvelopeMetrics | 568-603 |
| saveSettings | 617-647 |
| loadSettings | 649-703 |
| resetAllSettings | 705-736 |
| buildNotes | 784-799 |
| getNoteIdByMidi | 801-808 |
| isConsonant | 820-823 |
| getNicePool | 825-825 |
| getNoteCountMax | 827-831 |
| updateNoteCountMax | 833-841 |
| getCssNumber | 843-843 |
| clamp | 844-844 |
| getMaxStartMidi | 845-845 |
| clampStartMidi | 846-846 |
| getMidiLabel | 847-851 |
| getPanelBottomGap | 852-855 |
| normalizeSoundfontDefinition | 857-875 |
| setSoundfontCatalog | 877-898 |
| getSoundfontList | 900-900 |
| renderPianoOptions | 902-946 |
| createKey | 948-959 |
| renderKeyboard | 961-993 |
| rebuildKeyboard | 995-1002 |

### js/events.js (Active Runtime)
File lines: 1-1659

| Symbol | Lines |
|---|---|
| primeAudioFromGesture | 5-14 |
| isChordTutorialOpen | 522-522 |
| fitTutorialLayout | 525-553 |
| clearFitClasses | 531-534 |
| applyFitClass | 536-541 |
| getTutorialStep | 555-560 |
| getStepUnlockedRootSet | 562-570 |
| getStepUnlockedQualitySet | 572-578 |
| isTutorialRootEnabled | 580-580 |
| isTutorialQualityEnabled | 581-581 |
| getTutorialRootLabel | 583-586 |
| midiToTutorialLabel | 588-592 |
| getClosestNoteIdFromMidi | 594-601 |
| getTutorialRenderedChord | 603-625 |
| ensureTutorialKeyboard | 627-665 |
| getStepAllowedQualityIds | 667-669 |
| getTutorialActiveSpec | 671-673 |
| renderTutorialCurrentText | 675-686 |
| renderTutorialPianoHighlight | 688-722 |
| renderTutorialRootOptions | 724-742 |
| renderTutorialQualityOptions | 744-789 |
| syncTutorialRootChipStates | 791-810 |
| syncTutorialQualityChipStates | 812-831 |
| setTutorialHoverSpec | 833-840 |
| clearTutorialHoverSpec | 842-845 |
| refreshTutorialVisuals | 847-851 |
| renderChordTutorialStep | 881-936 |
| closeChordTutorial | 938-948 |
| openChordTutorial | 950-967 |
| registerTutorialOpenTrigger | 969-976 |
| isChordTypingCaptureActive | 1100-1105 |
| insertTypedCharacter | 1107-1114 |
| triggerPrimaryAction | 1117-1126 |
| getButtonLikeTarget | 1129-1129 |
| blurPointerActivatedControl | 1130-1137 |
| clearHelperCursorTimer | 1140-1146 |
| scheduleHelperCursorHide | 1147-1158 |
| resetHelperCursorState | 1159-1163 |
| triggerReplayAction | 1165-1171 |
| bindPianoOptionEvents | 1346-1371 |
| setRandomBackgroundAngle | 1612-1615 |
| init | 1617-1653 |
| runDeferredCatalogLoad | 1637-1646 |

Event bindings:
| Target | Event | Line |
|---|---|---:|
| document | pointerdown | 16 |
| document | keydown | 17 |
| document | touchstart | 18 |
| noteCountInput | input | 20 |
| noteCountInput | change | 27 |
| noteCountInput | pointerup | 31 |
| button | click | 36 |
| button | click | 45 |
| blindToggle | change | 53 |
| hideLivePreviewToggle | change | 61 |
| niceNotesToggle | change | 68 |
| chordRoundsToggle | change | 83 |
| practiceModeSelect | change | 89 |
| trainingModeSelect | change | 96 |
| chordDifficultySelect | change | 115 |
| chordExtraHelpersToggle | change | 131 |
| chordRootHintToggle | change | 142 |
| typingShowPianoToggle | change | 150 |
| typingShowTypedToggle | change | 160 |
| resetSettingsButton | click | 172 |
| settingsToggle | click | 186 |
| themeToggle | click | 195 |
| homeToggle | click | 204 |
| settingsPanel | click | 217 |
| optionsTrigger | click | 234 |
| optionsPanel | click | 246 |
| document | click | 251 |
| window | resize | 259 |
| playSelectedButton | click | 278 |
| playSelectedButton | pointerdown | 282 |
| playSelectedButton | pointerup | 287 |
| playSelectedButton | pointerleave | 291 |
| primaryActionButton | click | 295 |
| volumeSlider | input | 303 |
| lengthSlider | input | 309 |
| attackSlider | input | 315 |
| decaySlider | input | 321 |
| releaseSlider | input | 327 |
| sustainSlider | input | 333 |
| keyCountSlider | input | 339 |
| keyCountSlider | change | 346 |
| keyCountSlider | pointerup | 350 |
| hintButton | click | 354 |
| chordAnswerInput | input | 359 |
| chordAnswerInput | keydown | 366 |
| triggerEl | click | 971 |
| chordTutorialClose | click | 983 |
| chordTutorialBackdrop | click | 990 |
| chordTutorialPrev | click | 996 |
| chordTutorialNext | click | 1004 |
| chordTutorialRootList | mouseover | 1016 |
| chordTutorialRootList | mouseleave | 1024 |
| chordTutorialRootList | focusin | 1027 |
| chordTutorialRootList | focusout | 1035 |
| chordTutorialRootList | click | 1038 |
| chordTutorialQualityList | mouseover | 1054 |
| chordTutorialQualityList | mouseleave | 1061 |
| chordTutorialQualityList | focusin | 1064 |
| chordTutorialQualityList | focusout | 1071 |
| chordTutorialQualityList | click | 1074 |
| volumeSlider | dblclick | 1173 |
| lengthSlider | dblclick | 1177 |
| keyCountSlider | dblclick | 1181 |
| startNoteDownButton | click | 1187 |
| startNoteUpButton | click | 1190 |
| startNoteDownOctButton | click | 1196 |
| startNoteUpOctButton | click | 1199 |
| noteCountInput | dblclick | 1204 |
| attackSlider | dblclick | 1212 |
| decaySlider | dblclick | 1216 |
| releaseSlider | dblclick | 1220 |
| sustainSlider | dblclick | 1224 |
| profileSearch | input | 1229 |
| profileList | click | 1235 |
| profileList | dblclick | 1240 |
| profileList | keydown | 1243 |
| profileApply | click | 1254 |
| profileSave | click | 1260 |
| instrumentPresetSearch | input | 1266 |
| instrumentPresetList | click | 1272 |
| instrumentPresetList | dblclick | 1277 |
| instrumentPresetList | keydown | 1280 |
| instrumentPresetApply | click | 1291 |
| advancedTrigger | click | 1296 |
| advancedPanel | click | 1305 |
| pianoTrigger | click | 1310 |
| pianoPanel | click | 1322 |
| instrumentBrowserTrigger | click | 1328 |
| instrumentBrowserPanel | click | 1341 |
| pianoOptionsContainer | click | 1349 |
| pianoOptionsContainer | keydown | 1363 |
| pianoPreviewMain | click | 1374 |
| testEnvelopeButton | click | 1381 |
| keyboardEl | pointerdown | 1386 |
| document | pointerup | 1422 |
| document | pointercancel | 1429 |
| document | pointerdown | 1436 |
| document | click | 1440 |
| helperSlotEl | pointerover | 1445 |
| helperSlotEl | pointerout | 1453 |
| keyboardEl | click | 1462 |
| document | keydown | 1466 |
| document | keyup | 1560 |
| pedalBox | pointerdown | 1579 |
| pedalBox | pointerup | 1588 |
| pedalBox | pointercancel | 1597 |
| pedalBox | pointerleave | 1605 |

### js/game.js (Active Runtime)
File lines: 1-1839

| Symbol | Lines |
|---|---|
| normalizeQualityToken | 136-150 |
| getKeyboardZoneEl | 183-183 |
| normalizePitchClass | 184-184 |
| getRootName | 185-185 |
| getMidiFromNoteId | 186-186 |
| buildChordLabel | 187-187 |
| getPitchClassSetFromNoteIds | 189-197 |
| getChordDifficultyId | 199-204 |
| getChordDifficultyConfig | 206-209 |
| getAllowedChordQualities | 211-216 |
| getChordQualityHint | 218-221 |
| getConsistentPreviewDuration | 229-232 |
| playConsistentPreview | 238-256 |
| releaseInteractivePressSession | 293-321 |
| getReplayNoteIds | 323-346 |
| getVoicingHintLabel | 348-352 |
| randomSample | 354-361 |
| getNiceTarget | 363-400 |
| getQualityPitchClassSet | 402-408 |
| parseChordInput | 410-443 |
| detectChordFromNoteIds | 445-481 |
| normalizeIntervals | 483-485 |
| fitIntervalsToAvailableRange | 487-507 |
| buildVoicedIntervals | 509-537 |
| chooseRootCandidatesForIntervals | 539-548 |
| buildChordFromRoot | 550-578 |
| createChordTarget | 580-624 |
| createNoteTarget | 626-659 |
| createTarget | 661-667 |
| clearTypingAutoNext | 669-673 |
| getTypedPreviewNoteIds | 675-708 |
| updateTypedPreviewFromInput | 710-720 |
| updateChordReadout | 722-777 |
| updateModeVisibility | 779-796 |
| updatePrimaryAction | 798-803 |
| updateReplayAvailability | 805-814 |
| getChordHelperHints | 816-833 |
| createDeterministicHelperMask | 851-879 |
| renderChordHelperBox | 881-899 |
| updateStatus | 901-1006 |
| updateKeyStates | 1008-1047 |
| setKeyboardEnabled | 1049-1052 |
| updateKeyboardScale | 1054-1065 |
| lockKeyboardForPlayback | 1067-1080 |
| setSubmitted | 1082-1089 |
| goHome | 1091-1140 |
| refreshTarget | 1142-1163 |
| startRound | 1165-1226 |
| ensureRound | 1228-1237 |
| playTarget | 1239-1253 |
| startManualNote | 1255-1273 |
| releaseManualNote | 1275-1283 |
| releasePedalNotes | 1285-1295 |
| startPedalHold | 1297-1303 |
| stopPedalHold | 1305-1312 |
| toggleSelection | 1314-1345 |
| isSelectionCorrect | 1347-1364 |
| getPlaybackSpan | 1366-1371 |
| renderNotePills | 1373-1379 |
| renderChordPill | 1381-1384 |
| renderTonePills | 1386-1394 |
| renderRevealCell | 1396-1399 |
| renderChordRevealGrid | 1401-1404 |
| renderChordDetectionMeta | 1406-1410 |
| renderPressedPills | 1412-1417 |
| buildNoteComparison | 1419-1426 |
| renderNoteComparisonCells | 1428-1443 |
| buildAnswerNoteCell | 1445-1453 |
| getSubmittedReplaySnapshot | 1492-1506 |
| playSubmittedReplaySequence | 1508-1521 |
| playRevealSequence | 1523-1573 |
| playSelectedChord | 1575-1598 |
| playTypedInputChord | 1600-1613 |
| startHeldPlayback | 1615-1641 |
| releaseHeldPlayback | 1643-1657 |
| buildTypingRevealDetail | 1659-1677 |
| submitTypedAnswer | 1679-1752 |
| submitAnswer | 1754-1815 |

### js/settings.js (Active Runtime)
File lines: 1-1142

| Symbol | Lines |
|---|---|
| clampNoteCount | 62-68 |
| clampTrim | 70-70 |
| clampMetricValue | 83-83 |
| trimToSliderValue | 84-84 |
| sliderToTrim | 85-89 |
| formatSeconds | 90-90 |
| formatHold | 91-91 |
| formatProgramId | 92-92 |
| formatBankId | 93-93 |
| getSf2PresetGroupName | 100-106 |
| getBaseEnvelope | 111-123 |
| resolveSettingsEnvelopeMetrics | 125-141 |
| sanitizeCustomProfile | 151-166 |
| normalizeCustomProfiles | 168-183 |
| getAllProfiles | 185-197 |
| getProfileById | 199-203 |
| setGhostMarker | 205-210 |
| clearGhostMarker | 212-215 |
| updateGhostMarkers | 217-230 |
| syncDirtyFromApplied | 232-239 |
| applyAdsrTrimUi | 241-264 |
| clearPendingCriticalRestart | 266-272 |
| updateInstrumentPresetMeta | 274-304 |
| renderInstrumentPresetBrowser | 306-367 |
| refreshInstrumentPresetBrowser | 369-379 |
| setInstrumentPresetSelection | 381-385 |
| updateProfileMeta | 387-414 |
| renderResponseProfileBrowser | 416-462 |
| refreshResponseProfileBrowser | 464-478 |
| setResponseProfileSelection | 480-484 |
| applyResponseProfileById | 486-497 |
| applyResponseProfileSelection | 499-502 |
| saveCurrentResponseProfile | 504-526 |
| promptSaveCurrentResponseProfile | 528-532 |
| discardManualProfileChanges | 534-546 |
| resetAdsrTrim | 548-550 |
| resolveInstrumentSwitchProfileAction | 552-579 |
| applyInstrumentPresetSelection | 581-587 |
| setVolume | 589-599 |
| setPianoTone | 601-654 |
| setNoteLength | 656-665 |
| setAdsrTrim | 667-674 |
| playPianoPreview | 676-699 |
| setKeyCount | 701-716 |
| setStartMidi | 718-727 |
| setKeyCountVisual | 729-733 |
| refreshOptionsModeVisibility | 742-764 |
| setPracticeMode | 766-845 |
| applyUiFromState | 847-911 |
| commitCriticalChange | 918-923 |
| commitNoteCountChange | 925-934 |
| handleCriticalSettingChange | 936-950 |
| openSettings | 952-957 |
| closeSettings | 959-979 |
| positionFloatingPanel | 981-1007 |
| positionOptionsPanel | 1009-1012 |
| openOptionsPanel | 1014-1023 |
| closeOptionsPanel | 1025-1030 |
| openAdvanced | 1032-1040 |
| closeAdvanced | 1042-1045 |
| positionPianoPanel | 1047-1050 |
| openPianoPanel | 1052-1062 |
| closePianoPanel | 1064-1069 |
| positionInstrumentBrowserPanel | 1071-1074 |
| openInstrumentBrowser | 1076-1086 |
| closeInstrumentBrowser | 1088-1093 |

## Maintenance Notes
- js/app.*.js is an older branch snapshot. Keep it for reference unless explicitly retired.
- Functional edits should target loaded scripts first: core.js, audio.js, game.js, settings.js, events.js.
- If you intentionally switch runtime scripts, update script tags in index.html and regenerate this file.
- After verification, commit and push the updated files when repository remotes are configured.

