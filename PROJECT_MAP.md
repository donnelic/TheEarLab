# Project Map

Generated: 2026-03-06 08:41:10 +01:00

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
| styles.css | CSS | Loaded directly | Yes | 2780 |
| js/audio.js | JavaScript | Browser runtime module | Yes | 1517 |
| js/core.js | JavaScript | Browser runtime module | Yes | 886 |
| js/events.js | JavaScript | Browser runtime module | Yes | 1560 |
| js/game.js | JavaScript | Browser runtime module | Yes | 1756 |
| js/settings.js | JavaScript | Browser runtime module | Yes | 1111 |
| README.md | Markdown | Human + AI onboarding | Yes | 109 |
| AGENTS.md | Markdown | AI instruction override | Yes | 34 |
| PROJECT_MAP.md | Markdown | Generated reference map | Yes | 981 |
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
| 1 | vendor/libfluidsynth-2.4.6.js?v=20260306083127 | 469 |
| 2 | vendor/js-synthesizer.min.js?v=20260306083127 | 470 |
| 3 | js/core.js?v=20260306083127 | 471 |
| 4 | js/audio.js?v=20260306083127 | 472 |
| 5 | js/game.js?v=20260306083127 | 473 |
| 6 | js/settings.js?v=20260306083127 | 474 |
| 7 | js/events.js?v=20260306083127 | 475 |

## styles.css Map
File: styles.css (1-2780)

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
| .helper-label | 1329-1335 |
| .helper-item .helper-value | 1337-1345 |
| .helper-item .helper-mask | 1347-1354 |
| .helper-item .helper-real | 1356-1368 |
| .helper-item:hover .helper-mask, .helper-item:focus-within .helper-mask | 1371-1374 |
| .helper-item:hover .helper-real, .helper-item:focus-within .helper-real | 1377-1380 |
| .typing-zone[hidden] | 1382-1384 |
| .status | 1386-1397 |
| .status[hidden] | 1399-1401 |
| .helper-slot[hidden] | 1403-1405 |
| .status-actions | 1407-1413 |
| .hint-flag | 1415-1428 |
| .hint-flag[hidden] | 1430-1432 |
| .hint-button | 1434-1436 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) | 1438-1452 |
| .settings-toggle | 1454-1456 |
| .theme-toggle | 1458-1460 |
| .home-toggle | 1462-1464 |
| :is(.settings-toggle, .theme-toggle, .home-toggle):hover | 1466-1468 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) svg | 1470-1474 |
| .settings-toggle svg | 1476-1479 |
| .settings-panel | 1481-1500 |
| .settings-panel.open | 1502-1506 |
| .settings-panel h2 | 1508-1513 |
| .settings-body | 1515-1519 |
| .settings-grid | 1521-1524 |
| .advanced-trigger | 1526-1534 |
| .dropdown-trigger | 1536-1550 |
| .dropdown-trigger svg | 1552-1556 |
| .dropdown-trigger:focus-visible | 1558-1561 |
| .panel-trigger | 1563-1575 |
| .panel-trigger:hover | 1577-1580 |
| .panel-trigger[aria-expanded="true"] | 1582-1585 |
| .panel-trigger:focus-visible | 1587-1590 |
| .control select | 1592-1601 |
| .options-panel | 1603-1619 |
| .options-panel.open | 1621-1625 |
| .options-panel h3 | 1627-1634 |
| .options-grid | 1636-1639 |
| .options-panel .control | 1641-1647 |
| .options-panel .control.compact | 1649-1651 |
| .options-panel .control label | 1653-1655 |
| .options-section-title | 1657-1666 |
| .options-panel .options-section-title:first-child | 1668-1672 |
| .advanced-panel | 1674-1693 |
| .advanced-panel.open | 1695-1699 |
| .advanced-panel h3 | 1701-1706 |
| .advanced-grid | 1708-1717 |
| .advanced-grid::-webkit-scrollbar | 1719-1721 |
| .advanced-grid::-webkit-scrollbar-track | 1723-1726 |
| .advanced-grid::-webkit-scrollbar-thumb | 1728-1732 |
| .inline-value | 1734-1741 |
| .slider-stack | 1743-1746 |
| .slider-stack input[type="range"] | 1748-1752 |
| .slider-ghost | 1754-1768 |
| .slider-ghost.visible | 1770-1772 |
| .sf2-browser | 1774-1777 |
| .sf2-browser input[type="text"] | 1779-1788 |
| .sf2-preset-list | 1790-1803 |
| .sf2-browser .piano-desc | 1805-1808 |
| .sf2-browser .piano-desc.pending, .profile-browser .piano-desc.pending | 1811-1813 |
| .sf2-group | 1815-1820 |
| .sf2-group-title | 1822-1831 |
| .sf2-row | 1833-1841 |
| .sf2-row:first-child | 1843-1845 |
| .sf2-row:hover | 1847-1849 |
| .sf2-row.active | 1851-1854 |
| .sf2-row-name | 1856-1862 |
| .sf2-row-program, .sf2-row-bank | 1865-1869 |
| .sf2-empty | 1871-1875 |
| .profile-browser | 1877-1880 |
| .profile-browser input[type="text"] | 1882-1891 |
| .profile-list | 1893-1906 |
| .profile-row | 1908-1918 |
| .profile-row:hover | 1920-1922 |
| .profile-row.active | 1924-1927 |
| .profile-row.applied | 1929-1931 |
| .profile-row-name | 1933-1939 |
| .profile-row-kind | 1941-1946 |
| .advanced-footer | 1948-1954 |
| .piano-preview.wide | 1956-1968 |
| .piano-preview.wide::before | 1970-1972 |
| .piano-preview.wide .play-icon | 1974-1980 |
| .piano-preview.wide .play-label | 1982-1984 |
| .instrument-browser-panel | 1986-2001 |
| .instrument-browser-panel.open | 2003-2007 |
| .instrument-browser-panel h3 | 2009-2014 |
| .piano-panel | 2016-2031 |
| .piano-panel.open | 2033-2037 |
| .piano-panel h3 | 2039-2044 |
| .piano-options | 2046-2049 |
| .piano-option | 2051-2063 |
| .piano-option.active | 2065-2068 |
| .piano-option:focus-visible | 2070-2072 |
| .piano-info | 2074-2077 |
| .piano-name | 2079-2082 |
| .piano-desc | 2084-2087 |
| .piano-option.simple .piano-name | 2089-2093 |
| .piano-option.simple .piano-desc | 2095-2099 |
| .piano-preview | 2101-2116 |
| .piano-preview::before | 2118-2126 |
| .piano-preview:active | 2128-2131 |
| .piano-preview.main | 2133-2137 |
| .settings-grid input[type="range"], .advanced-panel input[type="range"], .options-... | 2141-2145 |
| .settings-grid input[type="range"]::-webkit-slider-runnable-track, .advanced-panel... | 2149-2154 |
| .settings-grid input[type="range"]::-webkit-slider-thumb, .advanced-panel input[ty... | 2158-2167 |
| .settings-grid input[type="range"]:focus-visible::-webkit-slider-thumb, .advanced-... | 2171-2174 |
| .settings-grid input[type="range"]::-moz-range-track, .advanced-panel input[type="... | 2178-2183 |
| .settings-grid input[type="range"]::-moz-range-thumb, .advanced-panel input[type="... | 2187-2194 |
| .settings-grid input[type="range"]:focus-visible::-moz-range-thumb, .advanced-pane... | 2198-2201 |
| .volume-value | 2203-2206 |
| .status-row | 2208-2213 |
| .switch | 2215-2219 |
| .switch input | 2221-2226 |
| .switch-track | 2228-2234 |
| .switch-thumb | 2236-2246 |
| .switch input:checked + .switch-track | 2248-2250 |
| .switch input:checked + .switch-track .switch-thumb | 2252-2254 |
| .control.compact .switch | 2256-2259 |
| .control.compact .switch-thumb | 2261-2266 |
| .control.compact .switch input:checked + .switch-track .switch-thumb | 2268-2270 |
| .control.compact .unit | 2272-2274 |
| .test-tone | 2276-2288 |
| .test-tone:hover | 2290-2293 |
| .test-tone:active | 2295-2297 |
| .test-tone-icon | 2299-2306 |
| .test-tone-label | 2308-2312 |
| .result | 2314-2318 |
| .reveal | 2320-2329 |
| .reveal strong | 2331-2333 |
| .reveal-label | 2335-2342 |
| .reveal-grid.compact | 2344-2348 |
| .reveal-cell | 2350-2352 |
| .keyboard-zone | 2354-2364 |
| .keyboard-stack | 2366-2376 |
| .keyboard-wrapper | 2378-2387 |
| .keyboard | 2389-2396 |
| .keyboard-wrapper.ends-black | 2398-2400 |
| .white-keys | 2402-2405 |
| .black-keys | 2407-2414 |
| .key | 2416-2427 |
| .key.white | 2429-2436 |
| .key.white.has-black | 2438-2440 |
| .key.black | 2442-2451 |
| .key span | 2453-2457 |
| .key.black span | 2459-2463 |
| .key.active | 2465-2468 |
| .key.black.active | 2470-2473 |
| .key.selected | 2475-2479 |
| .key.typed-preview | 2481-2483 |
| .key.correct | 2485-2489 |
| .key.wrong | 2491-2495 |
| .key.missed | 2497-2503 |
| .key.black.selected, .key.black.correct, .key.black.wrong | 2507-2509 |
| .key.black.missed | 2511-2517 |
| .keyboard.disabled | 2519-2525 |
| body.tutorial-open .keyboard | 2527-2529 |
| body.tutorial-open .keyboard.disabled | 2531-2534 |
| .keyboard.disabled::before | 2536-2548 |
| body.tutorial-open .keyboard.disabled::before | 2550-2552 |
| .keyboard.disabled::after | 2554-2588 |
| body.tutorial-open .keyboard.disabled::after | 2590-2592 |
| .tips | 2594-2603 |
| #pedal-tip[hidden] | 2605-2607 |
| .pedal-box | 2609-2623 |
| body.landing .pedal-box | 2625-2627 |
| .pedal-label | 2629-2639 |
| .pedal-icon | 2641-2648 |
| .pedal-icon.active | 2650-2653 |
| .note-pills | 2655-2661 |
| .note-pill | 2663-2669 |
| .note-pill.good | 2671-2675 |
| .note-pill.bad | 2677-2681 |
| .note-pill.missed | 2683-2687 |
| .note-pill.neutral | 2689-2693 |
| @media (max-width: 700px) | 2695-2750 |
| @media (max-height: 820px) | 2752-2773 |
| @media (max-height: 700px) | 2775-2780 |

## Documentation + Tooling Maps
### README.md
File: README.md (1-109)
| Heading | Line |
|---|---:|
| TheEarLab | 1 |
| Read First | 5 |
| Project Layout | 18 |
| Run Locally | 32 |
| SF2 Behavior | 46 |
| Chord Training Modes | 65 |
| Maintenance Rules | 100 |
| Verification | 107 |

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
File lines: 1-886

| Symbol | Lines |
|---|---|
| normalizePracticeProfile | 376-395 |
| normalizePracticeProfiles | 396-403 |
| getEffectivePracticeModeFromState | 404-412 |
| capturePracticeProfileFromState | 413-433 |
| saveSettings | 503-532 |
| loadSettings | 534-587 |
| resetAllSettings | 589-619 |
| buildNotes | 667-682 |
| getNoteIdByMidi | 684-691 |
| isConsonant | 703-706 |
| getNicePool | 708-708 |
| getNoteCountMax | 710-714 |
| updateNoteCountMax | 716-724 |
| getCssNumber | 726-726 |
| clamp | 727-727 |
| getMaxStartMidi | 728-728 |
| clampStartMidi | 729-729 |
| getMidiLabel | 730-734 |
| getPanelBottomGap | 735-738 |
| normalizeSoundfontDefinition | 740-758 |
| setSoundfontCatalog | 760-781 |
| getSoundfontList | 783-783 |
| renderPianoOptions | 785-829 |
| createKey | 831-842 |
| renderKeyboard | 844-876 |
| rebuildKeyboard | 878-885 |

### js/events.js (Active Runtime)
File lines: 1-1560

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
| renderChordTutorialStep | 857-912 |
| closeChordTutorial | 914-924 |
| openChordTutorial | 926-943 |
| registerTutorialOpenTrigger | 945-952 |
| isChordTypingCaptureActive | 1064-1069 |
| insertTypedCharacter | 1071-1078 |
| triggerPrimaryAction | 1081-1090 |
| triggerReplayAction | 1092-1098 |
| bindPianoOptionEvents | 1273-1298 |
| setRandomBackgroundAngle | 1513-1516 |
| init | 1518-1554 |
| runDeferredCatalogLoad | 1538-1547 |

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
| triggerEl | click | 947 |
| chordTutorialClose | click | 959 |
| chordTutorialBackdrop | click | 966 |
| chordTutorialPrev | click | 972 |
| chordTutorialNext | click | 980 |
| chordTutorialRootList | mouseover | 992 |
| chordTutorialRootList | mouseleave | 1000 |
| chordTutorialRootList | focusin | 1003 |
| chordTutorialRootList | focusout | 1011 |
| chordTutorialRootList | click | 1014 |
| chordTutorialQualityList | mouseover | 1030 |
| chordTutorialQualityList | mouseleave | 1037 |
| chordTutorialQualityList | focusin | 1040 |
| chordTutorialQualityList | focusout | 1047 |
| chordTutorialQualityList | click | 1050 |
| volumeSlider | dblclick | 1100 |
| lengthSlider | dblclick | 1104 |
| keyCountSlider | dblclick | 1108 |
| startNoteDownButton | click | 1114 |
| startNoteUpButton | click | 1117 |
| startNoteDownOctButton | click | 1123 |
| startNoteUpOctButton | click | 1126 |
| noteCountInput | dblclick | 1131 |
| attackSlider | dblclick | 1139 |
| decaySlider | dblclick | 1143 |
| releaseSlider | dblclick | 1147 |
| sustainSlider | dblclick | 1151 |
| profileSearch | input | 1156 |
| profileList | click | 1162 |
| profileList | dblclick | 1167 |
| profileList | keydown | 1170 |
| profileApply | click | 1181 |
| profileSave | click | 1187 |
| instrumentPresetSearch | input | 1193 |
| instrumentPresetList | click | 1199 |
| instrumentPresetList | dblclick | 1204 |
| instrumentPresetList | keydown | 1207 |
| instrumentPresetApply | click | 1218 |
| advancedTrigger | click | 1223 |
| advancedPanel | click | 1232 |
| pianoTrigger | click | 1237 |
| pianoPanel | click | 1249 |
| instrumentBrowserTrigger | click | 1255 |
| instrumentBrowserPanel | click | 1268 |
| pianoOptionsContainer | click | 1276 |
| pianoOptionsContainer | keydown | 1290 |
| pianoPreviewMain | click | 1301 |
| testEnvelopeButton | click | 1308 |
| keyboardEl | pointerdown | 1313 |
| document | pointerup | 1349 |
| document | pointercancel | 1356 |
| keyboardEl | click | 1363 |
| document | keydown | 1367 |
| document | keyup | 1461 |
| pedalBox | pointerdown | 1480 |
| pedalBox | pointerup | 1489 |
| pedalBox | pointercancel | 1498 |
| pedalBox | pointerleave | 1506 |

### js/game.js (Active Runtime)
File lines: 1-1756

| Symbol | Lines |
|---|---|
| normalizeQualityToken | 134-146 |
| isTypingEnabled | 160-160 |
| isTypingOnlyMode | 161-161 |
| getIsChordRound | 162-162 |
| getEffectiveBlindMode | 163-163 |
| getKeyboardZoneEl | 164-164 |
| normalizePitchClass | 165-165 |
| getRootName | 166-166 |
| getMidiFromNoteId | 167-167 |
| buildChordLabel | 168-168 |
| getPitchClassSetFromNoteIds | 170-178 |
| getChordDifficultyId | 180-185 |
| getChordDifficultyConfig | 187-190 |
| getAllowedChordQualities | 192-197 |
| getChordQualityHint | 199-202 |
| getConsistentPreviewDuration | 210-213 |
| playConsistentPreview | 219-237 |
| releaseInteractivePressSession | 274-302 |
| getReplayNoteIds | 304-327 |
| getVoicingHintLabel | 329-333 |
| randomSample | 335-342 |
| getNiceTarget | 344-381 |
| getQualityPitchClassSet | 383-389 |
| parseChordInput | 391-424 |
| detectChordFromNoteIds | 426-462 |
| normalizeIntervals | 464-466 |
| fitIntervalsToAvailableRange | 468-488 |
| buildVoicedIntervals | 490-518 |
| chooseRootCandidatesForIntervals | 520-529 |
| buildChordFromRoot | 531-559 |
| createChordTarget | 561-605 |
| createNoteTarget | 607-640 |
| createTarget | 642-648 |
| clearTypingAutoNext | 650-654 |
| getTypedPreviewNoteIds | 656-689 |
| updateTypedPreviewFromInput | 691-701 |
| updateChordReadout | 703-758 |
| updateModeVisibility | 760-777 |
| updatePrimaryAction | 779-784 |
| updateReplayAvailability | 786-795 |
| getChordHelperHints | 797-808 |
| createDeterministicHelperMask | 817-839 |
| renderChordHelperBox | 841-859 |
| updateStatus | 861-966 |
| updateKeyStates | 968-1007 |
| setKeyboardEnabled | 1009-1012 |
| updateKeyboardScale | 1014-1025 |
| lockKeyboardForPlayback | 1027-1040 |
| setSubmitted | 1042-1049 |
| goHome | 1051-1097 |
| refreshTarget | 1099-1120 |
| startRound | 1122-1183 |
| ensureRound | 1185-1194 |
| playTarget | 1196-1210 |
| startManualNote | 1212-1230 |
| releaseManualNote | 1232-1240 |
| releasePedalNotes | 1242-1252 |
| startPedalHold | 1254-1260 |
| stopPedalHold | 1262-1269 |
| toggleSelection | 1271-1302 |
| isSelectionCorrect | 1304-1321 |
| getPlaybackSpan | 1323-1328 |
| renderNotePills | 1330-1336 |
| renderChordPill | 1338-1341 |
| renderTonePills | 1343-1351 |
| renderRevealCell | 1353-1356 |
| renderChordRevealGrid | 1358-1361 |
| renderChordDetectionMeta | 1363-1367 |
| renderPressedPills | 1369-1374 |
| buildNoteComparison | 1376-1383 |
| renderNoteComparisonCells | 1385-1400 |
| playRevealSequence | 1402-1452 |
| playSelectedChord | 1454-1478 |
| playTypedInputChord | 1480-1493 |
| startHeldPlayback | 1495-1542 |
| releaseHeldPlayback | 1544-1558 |
| buildTypingRevealDetail | 1560-1578 |
| submitTypedAnswer | 1580-1657 |
| submitAnswer | 1659-1732 |

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

