# Project Map

Generated: 2026-03-06 09:01:07 +01:00

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
| js/audio.js | JavaScript | Browser runtime module | Yes | 1525 |
| js/core.js | JavaScript | Browser runtime module | Yes | 991 |
| js/events.js | JavaScript | Browser runtime module | Yes | 1572 |
| js/game.js | JavaScript | Browser runtime module | Yes | 1796 |
| js/settings.js | JavaScript | Browser runtime module | Yes | 1125 |
| README.md | Markdown | Human + AI onboarding | Yes | 109 |
| AGENTS.md | Markdown | AI instruction override | Yes | 34 |
| PROJECT_MAP.md | Markdown | Generated reference map | Yes | 984 |
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
| 1 | vendor/libfluidsynth-2.4.6.js?v=20260306085320 | 469 |
| 2 | vendor/js-synthesizer.min.js?v=20260306085320 | 470 |
| 3 | js/core.js?v=20260306085320 | 471 |
| 4 | js/audio.js?v=20260306085320 | 472 |
| 5 | js/game.js?v=20260306085320 | 473 |
| 6 | js/settings.js?v=20260306085320 | 474 |
| 7 | js/events.js?v=20260306085320 | 475 |

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
File lines: 1-1525

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
| ensureAudio | 616-653 |
| getSelectedSoundfont | 655-667 |
| getSourceEntry | 669-674 |
| removeVoice | 676-718 |
| releaseVoice | 720-767 |
| releaseVoices | 769-774 |
| stopAllNotes | 776-825 |
| stopNotesById | 827-839 |
| abortPlayback | 841-843 |
| getSoundfontEnvelope | 845-862 |
| scheduleSampleEnvelope | 864-881 |
| createGeneratedSampleBuffer | 883-926 |
| buildGeneratedSampleSet | 928-938 |
| decodeAudioBuffer | 940-947 |
| buildExternalSampleSet | 949-970 |
| applySf2TrimGenerators | 972-980 |
| getSf2NoteDuration | 982-992 |
| ensureSf2PresetReady | 994-1008 |
| ensureSoundfontReady | 1010-1086 |
| findNearestSample | 1088-1101 |
| scheduleSf2Note | 1103-1158 |
| noteOff | 1144-1150 |
| scheduleWithEntry | 1179-1224 |
| registerKeyTimer | 1239-1246 |
| unregisterKeyTimer | 1248-1257 |
| clearKeyTimersForNote | 1259-1267 |
| activateKey | 1269-1275 |
| scheduleKeyRelease | 1277-1290 |
| scheduleKeyAnimation | 1292-1303 |
| playNotes | 1305-1355 |
| playNotesNow | 1357-1360 |
| clearPreviewTimers | 1362-1365 |
| stopPreviewPlayback | 1367-1393 |
| schedulePreviewEvent | 1395-1401 |
| previewNoteOn | 1403-1414 |
| previewNoteOff | 1416-1425 |
| previewPedalOn | 1427-1446 |
| activate | 1431-1436 |
| previewPedalOff | 1448-1462 |
| buildPreviewSequence | 1464-1508 |

Event bindings:
| Target | Event | Line |
|---|---|---:|
| source | ended | 1221 |

### js/core.js (Active Runtime)
File lines: 1-991

| Symbol | Lines |
|---|---|
| normalizePracticeProfile | 386-405 |
| normalizePracticeProfiles | 406-413 |
| isTypingOnlyModeFromState | 417-417 |
| getEffectiveBlindModeFromState | 421-421 |
| getEffectivePracticeModeFromState | 422-430 |
| capturePracticeProfileFromState | 431-451 |
| clampEnvelopeValue | 546-546 |
| resolveEnvelopeMetrics | 559-594 |
| saveSettings | 608-637 |
| loadSettings | 639-692 |
| resetAllSettings | 694-724 |
| buildNotes | 772-787 |
| getNoteIdByMidi | 789-796 |
| isConsonant | 808-811 |
| getNicePool | 813-813 |
| getNoteCountMax | 815-819 |
| updateNoteCountMax | 821-829 |
| getCssNumber | 831-831 |
| clamp | 832-832 |
| getMaxStartMidi | 833-833 |
| clampStartMidi | 834-834 |
| getMidiLabel | 835-839 |
| getPanelBottomGap | 840-843 |
| normalizeSoundfontDefinition | 845-863 |
| setSoundfontCatalog | 865-886 |
| getSoundfontList | 888-888 |
| renderPianoOptions | 890-934 |
| createKey | 936-947 |
| renderKeyboard | 949-981 |
| rebuildKeyboard | 983-990 |

### js/events.js (Active Runtime)
File lines: 1-1572

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
| isChordTypingCaptureActive | 1076-1081 |
| insertTypedCharacter | 1083-1090 |
| triggerPrimaryAction | 1093-1102 |
| triggerReplayAction | 1104-1110 |
| bindPianoOptionEvents | 1285-1310 |
| setRandomBackgroundAngle | 1525-1528 |
| init | 1530-1566 |
| runDeferredCatalogLoad | 1550-1559 |

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
| volumeSlider | dblclick | 1112 |
| lengthSlider | dblclick | 1116 |
| keyCountSlider | dblclick | 1120 |
| startNoteDownButton | click | 1126 |
| startNoteUpButton | click | 1129 |
| startNoteDownOctButton | click | 1135 |
| startNoteUpOctButton | click | 1138 |
| noteCountInput | dblclick | 1143 |
| attackSlider | dblclick | 1151 |
| decaySlider | dblclick | 1155 |
| releaseSlider | dblclick | 1159 |
| sustainSlider | dblclick | 1163 |
| profileSearch | input | 1168 |
| profileList | click | 1174 |
| profileList | dblclick | 1179 |
| profileList | keydown | 1182 |
| profileApply | click | 1193 |
| profileSave | click | 1199 |
| instrumentPresetSearch | input | 1205 |
| instrumentPresetList | click | 1211 |
| instrumentPresetList | dblclick | 1216 |
| instrumentPresetList | keydown | 1219 |
| instrumentPresetApply | click | 1230 |
| advancedTrigger | click | 1235 |
| advancedPanel | click | 1244 |
| pianoTrigger | click | 1249 |
| pianoPanel | click | 1261 |
| instrumentBrowserTrigger | click | 1267 |
| instrumentBrowserPanel | click | 1280 |
| pianoOptionsContainer | click | 1288 |
| pianoOptionsContainer | keydown | 1302 |
| pianoPreviewMain | click | 1313 |
| testEnvelopeButton | click | 1320 |
| keyboardEl | pointerdown | 1325 |
| document | pointerup | 1361 |
| document | pointercancel | 1368 |
| keyboardEl | click | 1375 |
| document | keydown | 1379 |
| document | keyup | 1473 |
| pedalBox | pointerdown | 1492 |
| pedalBox | pointerup | 1501 |
| pedalBox | pointercancel | 1510 |
| pedalBox | pointerleave | 1518 |

### js/game.js (Active Runtime)
File lines: 1-1796

| Symbol | Lines |
|---|---|
| normalizeQualityToken | 135-147 |
| getKeyboardZoneEl | 173-173 |
| normalizePitchClass | 174-174 |
| getRootName | 175-175 |
| getMidiFromNoteId | 176-176 |
| buildChordLabel | 177-177 |
| getPitchClassSetFromNoteIds | 179-187 |
| getChordDifficultyId | 189-194 |
| getChordDifficultyConfig | 196-199 |
| getAllowedChordQualities | 201-206 |
| getChordQualityHint | 208-211 |
| getConsistentPreviewDuration | 219-222 |
| playConsistentPreview | 228-246 |
| releaseInteractivePressSession | 283-311 |
| getReplayNoteIds | 313-336 |
| getVoicingHintLabel | 338-342 |
| randomSample | 344-351 |
| getNiceTarget | 353-390 |
| getQualityPitchClassSet | 392-398 |
| parseChordInput | 400-433 |
| detectChordFromNoteIds | 435-471 |
| normalizeIntervals | 473-475 |
| fitIntervalsToAvailableRange | 477-497 |
| buildVoicedIntervals | 499-527 |
| chooseRootCandidatesForIntervals | 529-538 |
| buildChordFromRoot | 540-568 |
| createChordTarget | 570-614 |
| createNoteTarget | 616-649 |
| createTarget | 651-657 |
| clearTypingAutoNext | 659-663 |
| getTypedPreviewNoteIds | 665-698 |
| updateTypedPreviewFromInput | 700-710 |
| updateChordReadout | 712-767 |
| updateModeVisibility | 769-786 |
| updatePrimaryAction | 788-793 |
| updateReplayAvailability | 795-804 |
| getChordHelperHints | 806-817 |
| createDeterministicHelperMask | 826-848 |
| renderChordHelperBox | 850-868 |
| updateStatus | 870-975 |
| updateKeyStates | 977-1016 |
| setKeyboardEnabled | 1018-1021 |
| updateKeyboardScale | 1023-1034 |
| lockKeyboardForPlayback | 1036-1049 |
| setSubmitted | 1051-1058 |
| goHome | 1060-1106 |
| refreshTarget | 1108-1129 |
| startRound | 1131-1192 |
| ensureRound | 1194-1203 |
| playTarget | 1205-1219 |
| startManualNote | 1221-1239 |
| releaseManualNote | 1241-1249 |
| releasePedalNotes | 1251-1261 |
| startPedalHold | 1263-1269 |
| stopPedalHold | 1271-1278 |
| toggleSelection | 1280-1311 |
| isSelectionCorrect | 1313-1330 |
| getPlaybackSpan | 1332-1337 |
| renderNotePills | 1339-1345 |
| renderChordPill | 1347-1350 |
| renderTonePills | 1352-1360 |
| renderRevealCell | 1362-1365 |
| renderChordRevealGrid | 1367-1370 |
| renderChordDetectionMeta | 1372-1376 |
| renderPressedPills | 1378-1383 |
| buildNoteComparison | 1385-1392 |
| renderNoteComparisonCells | 1394-1409 |
| buildAnswerNoteCell | 1411-1419 |
| playRevealSequence | 1458-1508 |
| playSelectedChord | 1510-1534 |
| playTypedInputChord | 1536-1549 |
| startHeldPlayback | 1551-1598 |
| releaseHeldPlayback | 1600-1614 |
| buildTypingRevealDetail | 1616-1634 |
| submitTypedAnswer | 1636-1709 |
| submitAnswer | 1711-1772 |

### js/settings.js (Active Runtime)
File lines: 1-1125

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
| resolveEnvelopeMetrics | 125-141 |
| sanitizeCustomProfile | 151-166 |
| normalizeCustomProfiles | 168-183 |
| getAllProfiles | 185-197 |
| getProfileById | 199-203 |
| setGhostMarker | 205-210 |
| clearGhostMarker | 212-215 |
| updateGhostMarkers | 217-230 |
| syncDirtyFromApplied | 232-239 |
| applyAdsrTrimUi | 241-264 |
| updateInstrumentPresetMeta | 266-296 |
| renderInstrumentPresetBrowser | 298-359 |
| refreshInstrumentPresetBrowser | 361-371 |
| setInstrumentPresetSelection | 373-377 |
| updateProfileMeta | 379-406 |
| renderResponseProfileBrowser | 408-454 |
| refreshResponseProfileBrowser | 456-470 |
| setResponseProfileSelection | 472-476 |
| applyResponseProfileById | 478-489 |
| applyResponseProfileSelection | 491-494 |
| saveCurrentResponseProfile | 496-518 |
| promptSaveCurrentResponseProfile | 520-524 |
| discardManualProfileChanges | 526-538 |
| resetAdsrTrim | 540-542 |
| resolveInstrumentSwitchProfileAction | 544-571 |
| applyInstrumentPresetSelection | 573-579 |
| setVolume | 581-591 |
| setPianoTone | 593-646 |
| setNoteLength | 648-657 |
| setAdsrTrim | 659-666 |
| playPianoPreview | 668-691 |
| setKeyCount | 693-708 |
| setStartMidi | 710-719 |
| setKeyCountVisual | 721-725 |
| refreshOptionsModeVisibility | 734-756 |
| setPracticeMode | 758-833 |
| applyUiFromState | 835-896 |
| commitCriticalChange | 903-908 |
| commitNoteCountChange | 910-919 |
| handleCriticalSettingChange | 921-935 |
| openSettings | 937-942 |
| closeSettings | 944-963 |
| positionFloatingPanel | 965-991 |
| positionOptionsPanel | 993-996 |
| openOptionsPanel | 998-1007 |
| closeOptionsPanel | 1009-1014 |
| openAdvanced | 1016-1024 |
| closeAdvanced | 1026-1029 |
| positionPianoPanel | 1031-1034 |
| openPianoPanel | 1036-1046 |
| closePianoPanel | 1048-1053 |
| positionInstrumentBrowserPanel | 1055-1058 |
| openInstrumentBrowser | 1060-1070 |
| closeInstrumentBrowser | 1072-1077 |

## Maintenance Notes
- js/app.*.js is an older branch snapshot. Keep it for reference unless explicitly retired.
- Functional edits should target loaded scripts first: core.js, audio.js, game.js, settings.js, events.js.
- If you intentionally switch runtime scripts, update script tags in index.html and regenerate this file.
- After verification, commit and push the updated files when repository remotes are configured.

