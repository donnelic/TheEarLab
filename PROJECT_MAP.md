# Project Map

Generated: 2026-03-05 23:51:19 +01:00

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
| index.html | HTML | Loaded directly | Yes | 455 |
| styles.css | CSS | Loaded directly | Yes | 2699 |
| js/audio.js | JavaScript | Browser runtime module | Yes | 1517 |
| js/core.js | JavaScript | Browser runtime module | Yes | 822 |
| js/events.js | JavaScript | Browser runtime module | Yes | 1544 |
| js/game.js | JavaScript | Browser runtime module | Yes | 1608 |
| js/settings.js | JavaScript | Browser runtime module | Yes | 1111 |
| README.md | Markdown | Human + AI onboarding | Yes | 103 |
| AGENTS.md | Markdown | AI instruction override | Yes | 34 |
| PROJECT_MAP.md | Markdown | Generated reference map | Yes | 967 |
| tools/generate-project-map.ps1 | PowerShell | Documentation generator | Yes | 500 |
| soundfonts/GeneralUser-GS.sf2 | Asset | Soundfont asset | Yes | 0 |
| soundfonts/index.json | JSON | Soundfont asset | Yes | 3 |
| soundfonts/README.md | Markdown | Soundfont asset | Yes | 39 |

## index.html Map
File: index.html (1-455)

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
| reveal | <div> | 403 |
| hint-flag | <div> | 404 |
| pedal-tip | <span> | 409 |
| chord-tutorial-modal | <section> | 413 |
| chord-tutorial-backdrop | <button> | 414 |
| chord-tutorial-title | <h4> | 417 |
| chord-tutorial-close | <button> | 418 |
| chord-tutorial-step | <div> | 420 |
| chord-tutorial-current | <div> | 422 |
| chord-tutorial-piano | <div> | 425 |
| tutorial-row-root | <div> | 428 |
| chord-tutorial-root-list | <div> | 430 |
| tutorial-row-quality | <div> | 432 |
| chord-tutorial-quality-list | <div> | 434 |
| chord-tutorial-prev | <button> | 439 |
| chord-tutorial-progress | <span> | 440 |
| chord-tutorial-next | <button> | 441 |

### Script Load Order
| Order | Script | Line |
|---:|---|---:|
| 1 | vendor/libfluidsynth-2.4.6.js?v=20260305231302 | 446 |
| 2 | vendor/js-synthesizer.min.js?v=20260305231302 | 447 |
| 3 | js/core.js?v=20260305231302 | 448 |
| 4 | js/audio.js?v=20260305231302 | 449 |
| 5 | js/game.js?v=20260305231302 | 450 |
| 6 | js/settings.js?v=20260305231302 | 451 |
| 7 | js/events.js?v=20260305231302 | 452 |

## styles.css Map
File: styles.css (1-2699)

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
| .status-actions | 1321-1327 |
| .hint-flag | 1329-1342 |
| .hint-flag[hidden] | 1344-1346 |
| .hint-button | 1348-1350 |
| .settings-toggle | 1352-1367 |
| .settings-toggle:hover | 1369-1371 |
| .settings-toggle svg | 1373-1377 |
| .theme-toggle | 1379-1394 |
| .theme-toggle:hover | 1396-1398 |
| .theme-toggle svg | 1400-1404 |
| .settings-panel | 1406-1425 |
| .settings-panel.open | 1427-1431 |
| .settings-panel h2 | 1433-1438 |
| .settings-body | 1440-1444 |
| .settings-grid | 1446-1449 |
| .advanced-trigger | 1451-1459 |
| .dropdown-trigger | 1461-1475 |
| .dropdown-trigger svg | 1477-1481 |
| .dropdown-trigger:focus-visible | 1483-1486 |
| .panel-trigger | 1488-1500 |
| .panel-trigger:hover | 1502-1505 |
| .panel-trigger[aria-expanded="true"] | 1507-1510 |
| .panel-trigger:focus-visible | 1512-1515 |
| .control select | 1517-1526 |
| .options-panel | 1528-1544 |
| .options-panel.open | 1546-1550 |
| .options-panel h3 | 1552-1559 |
| .options-grid | 1561-1564 |
| .options-panel .control | 1566-1572 |
| .options-panel .control.compact | 1574-1576 |
| .options-panel .control label | 1578-1580 |
| .options-section-title | 1582-1591 |
| .options-panel .options-section-title:first-child | 1593-1597 |
| .advanced-panel | 1599-1618 |
| .advanced-panel.open | 1620-1624 |
| .advanced-panel h3 | 1626-1631 |
| .advanced-grid | 1633-1642 |
| .advanced-grid::-webkit-scrollbar | 1644-1646 |
| .advanced-grid::-webkit-scrollbar-track | 1648-1651 |
| .advanced-grid::-webkit-scrollbar-thumb | 1653-1657 |
| .inline-value | 1659-1666 |
| .slider-stack | 1668-1671 |
| .slider-stack input[type="range"] | 1673-1677 |
| .slider-ghost | 1679-1693 |
| .slider-ghost.visible | 1695-1697 |
| .sf2-browser | 1699-1702 |
| .sf2-browser input[type="text"] | 1704-1713 |
| .sf2-preset-list | 1715-1728 |
| .sf2-browser .piano-desc | 1730-1733 |
| .sf2-browser .piano-desc.pending, .profile-browser .piano-desc.pending | 1736-1738 |
| .sf2-group | 1740-1745 |
| .sf2-group-title | 1747-1756 |
| .sf2-row | 1758-1766 |
| .sf2-row:first-child | 1768-1770 |
| .sf2-row:hover | 1772-1774 |
| .sf2-row.active | 1776-1779 |
| .sf2-row-name | 1781-1787 |
| .sf2-row-program, .sf2-row-bank | 1790-1794 |
| .sf2-empty | 1796-1800 |
| .profile-browser | 1802-1805 |
| .profile-browser input[type="text"] | 1807-1816 |
| .profile-list | 1818-1831 |
| .profile-row | 1833-1843 |
| .profile-row:hover | 1845-1847 |
| .profile-row.active | 1849-1852 |
| .profile-row.applied | 1854-1856 |
| .profile-row-name | 1858-1864 |
| .profile-row-kind | 1866-1871 |
| .advanced-footer | 1873-1879 |
| .piano-preview.wide | 1881-1893 |
| .piano-preview.wide::before | 1895-1897 |
| .piano-preview.wide .play-icon | 1899-1905 |
| .piano-preview.wide .play-label | 1907-1909 |
| .instrument-browser-panel | 1911-1926 |
| .instrument-browser-panel.open | 1928-1932 |
| .instrument-browser-panel h3 | 1934-1939 |
| .piano-panel | 1941-1956 |
| .piano-panel.open | 1958-1962 |
| .piano-panel h3 | 1964-1969 |
| .piano-options | 1971-1974 |
| .piano-option | 1976-1988 |
| .piano-option.active | 1990-1993 |
| .piano-option:focus-visible | 1995-1997 |
| .piano-info | 1999-2002 |
| .piano-name | 2004-2007 |
| .piano-desc | 2009-2012 |
| .piano-option.simple .piano-name | 2014-2018 |
| .piano-option.simple .piano-desc | 2020-2024 |
| .piano-preview | 2026-2041 |
| .piano-preview::before | 2043-2051 |
| .piano-preview:active | 2053-2056 |
| .piano-preview.main | 2058-2062 |
| .settings-grid input[type="range"], .advanced-panel input[type="range"], .options-... | 2066-2070 |
| .settings-grid input[type="range"]::-webkit-slider-runnable-track, .advanced-panel... | 2074-2079 |
| .settings-grid input[type="range"]::-webkit-slider-thumb, .advanced-panel input[ty... | 2083-2092 |
| .settings-grid input[type="range"]:focus-visible::-webkit-slider-thumb, .advanced-... | 2096-2099 |
| .settings-grid input[type="range"]::-moz-range-track, .advanced-panel input[type="... | 2103-2108 |
| .settings-grid input[type="range"]::-moz-range-thumb, .advanced-panel input[type="... | 2112-2119 |
| .settings-grid input[type="range"]:focus-visible::-moz-range-thumb, .advanced-pane... | 2123-2126 |
| .volume-value | 2128-2131 |
| .status-row | 2133-2138 |
| .switch | 2140-2144 |
| .switch input | 2146-2151 |
| .switch-track | 2153-2159 |
| .switch-thumb | 2161-2171 |
| .switch input:checked + .switch-track | 2173-2175 |
| .switch input:checked + .switch-track .switch-thumb | 2177-2179 |
| .control.compact .switch | 2181-2184 |
| .control.compact .switch-thumb | 2186-2191 |
| .control.compact .switch input:checked + .switch-track .switch-thumb | 2193-2195 |
| .control.compact .unit | 2197-2199 |
| .test-tone | 2201-2213 |
| .test-tone:hover | 2215-2218 |
| .test-tone:active | 2220-2222 |
| .test-tone-icon | 2224-2231 |
| .test-tone-label | 2233-2237 |
| .result | 2239-2243 |
| .reveal | 2245-2254 |
| .reveal strong | 2256-2258 |
| .reveal-label | 2260-2267 |
| .reveal-grid.compact | 2269-2273 |
| .reveal-cell | 2275-2277 |
| .keyboard-zone | 2279-2288 |
| .keyboard-stack | 2290-2300 |
| .keyboard-wrapper | 2302-2311 |
| .keyboard | 2313-2320 |
| .keyboard-wrapper.ends-black | 2322-2324 |
| .white-keys | 2326-2329 |
| .black-keys | 2331-2338 |
| .key | 2340-2351 |
| .key.white | 2353-2360 |
| .key.white.has-black | 2362-2364 |
| .key.black | 2366-2375 |
| .key span | 2377-2381 |
| .key.black span | 2383-2387 |
| .key.active | 2389-2392 |
| .key.black.active | 2394-2397 |
| .key.selected | 2399-2403 |
| .key.typed-preview | 2405-2407 |
| .key.correct | 2409-2413 |
| .key.wrong | 2415-2419 |
| .key.missed | 2421-2427 |
| .key.black.selected, .key.black.correct, .key.black.wrong | 2431-2433 |
| .key.black.missed | 2435-2441 |
| .keyboard.disabled | 2443-2449 |
| body.tutorial-open .keyboard | 2451-2453 |
| body.tutorial-open .keyboard.disabled | 2455-2458 |
| .keyboard.disabled::before | 2460-2472 |
| body.tutorial-open .keyboard.disabled::before | 2474-2476 |
| .keyboard.disabled::after | 2478-2512 |
| body.tutorial-open .keyboard.disabled::after | 2514-2516 |
| .tips | 2518-2526 |
| #pedal-tip[hidden] | 2528-2530 |
| .pedal-box | 2532-2546 |
| body.landing .pedal-box | 2548-2550 |
| .pedal-label | 2552-2562 |
| .pedal-icon | 2564-2571 |
| .pedal-icon.active | 2573-2576 |
| .note-pills | 2578-2584 |
| .note-pill | 2586-2592 |
| .note-pill.good | 2594-2598 |
| .note-pill.bad | 2600-2604 |
| .note-pill.missed | 2606-2610 |
| .note-pill.neutral | 2612-2616 |
| @media (max-width: 700px) | 2618-2669 |
| @media (max-height: 820px) | 2671-2692 |
| @media (max-height: 700px) | 2694-2699 |

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
File lines: 1-822

| Symbol | Lines |
|---|---|
| normalizePracticeProfile | 312-331 |
| normalizePracticeProfiles | 332-339 |
| getEffectivePracticeModeFromState | 340-348 |
| capturePracticeProfileFromState | 349-369 |
| saveSettings | 439-468 |
| loadSettings | 470-523 |
| resetAllSettings | 525-555 |
| buildNotes | 603-618 |
| getNoteIdByMidi | 620-627 |
| isConsonant | 639-642 |
| getNicePool | 644-644 |
| getNoteCountMax | 646-650 |
| updateNoteCountMax | 652-660 |
| getCssNumber | 662-662 |
| clamp | 663-663 |
| getMaxStartMidi | 664-664 |
| clampStartMidi | 665-665 |
| getMidiLabel | 666-670 |
| getPanelBottomGap | 671-674 |
| normalizeSoundfontDefinition | 676-694 |
| setSoundfontCatalog | 696-717 |
| getSoundfontList | 719-719 |
| renderPianoOptions | 721-765 |
| createKey | 767-778 |
| renderKeyboard | 780-812 |
| rebuildKeyboard | 814-821 |

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
File lines: 1-1608

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
| updateStatus | 715-808 |
| updateKeyStates | 810-849 |
| setKeyboardEnabled | 851-854 |
| updateKeyboardScale | 856-867 |
| lockKeyboardForPlayback | 869-882 |
| setSubmitted | 884-891 |
| refreshTarget | 893-914 |
| startRound | 916-974 |
| ensureRound | 976-985 |
| playTarget | 987-1001 |
| startManualNote | 1003-1033 |
| releaseManualNote | 1035-1063 |
| releasePedalNotes | 1065-1075 |
| startPedalHold | 1077-1083 |
| stopPedalHold | 1085-1092 |
| toggleSelection | 1094-1125 |
| isSelectionCorrect | 1127-1144 |
| getPlaybackSpan | 1146-1151 |
| renderNotePills | 1153-1159 |
| renderChordPill | 1161-1164 |
| renderTonePills | 1166-1174 |
| renderRevealCell | 1176-1179 |
| renderChordRevealGrid | 1181-1184 |
| renderChordDetectionMeta | 1186-1190 |
| renderPressedPills | 1192-1197 |
| buildNoteComparison | 1199-1206 |
| renderNoteComparisonCells | 1208-1223 |
| playRevealSequence | 1225-1277 |
| playSelectedChord | 1279-1304 |
| playTypedInputChord | 1306-1320 |
| startHeldPlayback | 1322-1388 |
| releaseHeldPlayback | 1390-1417 |
| buildTypingRevealDetail | 1419-1437 |
| submitTypedAnswer | 1439-1516 |
| submitAnswer | 1518-1587 |

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

