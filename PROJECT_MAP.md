# Project Map

Generated: 2026-03-05 23:56:59 +01:00

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
| styles.css | CSS | Loaded directly | Yes | 2756 |
| js/audio.js | JavaScript | Browser runtime module | Yes | 1517 |
| js/core.js | JavaScript | Browser runtime module | Yes | 826 |
| js/events.js | JavaScript | Browser runtime module | Yes | 1553 |
| js/game.js | JavaScript | Browser runtime module | Yes | 1618 |
| js/settings.js | JavaScript | Browser runtime module | Yes | 1111 |
| README.md | Markdown | Human + AI onboarding | Yes | 104 |
| AGENTS.md | Markdown | AI instruction override | Yes | 34 |
| PROJECT_MAP.md | Markdown | Generated reference map | Yes | 969 |
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
| 1 | vendor/libfluidsynth-2.4.6.js?v=20260305231302 | 462 |
| 2 | vendor/js-synthesizer.min.js?v=20260305231302 | 463 |
| 3 | js/core.js?v=20260305231302 | 464 |
| 4 | js/audio.js?v=20260305231302 | 465 |
| 5 | js/game.js?v=20260305231302 | 466 |
| 6 | js/settings.js?v=20260305231302 | 467 |
| 7 | js/events.js?v=20260305231302 | 468 |

## styles.css Map
File: styles.css (1-2756)

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
| .quick-start | 439-443 |
| .quick-mode-btn | 445-459 |
| .quick-mode-btn:hover, .quick-mode-btn:focus-visible | 462-467 |
| .quick-mode-title | 469-474 |
| .quick-mode-sub | 476-480 |
| body:not(.landing) .quick-start | 482-484 |
| .btn | 486-493 |
| .btn:focus-visible | 495-498 |
| .btn.primary | 500-504 |
| .btn.secondary | 506-510 |
| .btn.ghost | 512-516 |
| .btn.submit | 518-522 |
| .btn:hover | 524-526 |
| .chord-readout | 528-537 |
| .chord-readout[hidden] | 539-541 |
| .typing-zone | 543-552 |
| .typing-zone label | 554-561 |
| .typing-zone input[type="text"] | 563-575 |
| .typing-zone input[type="text"]::placeholder | 577-580 |
| .typing-row | 582-585 |
| .typing-input-wrap | 587-589 |
| .typing-help-toggle | 591-608 |
| .typing-help-toggle:hover | 610-613 |
| .typing-help-toggle:focus-visible | 615-618 |
| .typing-help-text | 620-626 |
| .typing-help-text strong | 628-630 |
| .typing-help-actions | 632-634 |
| .typing-learn-btn | 636-646 |
| .typing-learn-btn:hover | 648-650 |
| .typing-learn-btn:focus-visible | 652-655 |
| .tutorial-modal | 657-664 |
| .tutorial-modal[hidden] | 666-668 |
| .tutorial-backdrop | 670-676 |
| .tutorial-card | 678-691 |
| .tutorial-card.tutorial-overflow-scroll | 693-696 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-step | 698-704 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-lab | 706-713 |
| .tutorial-card.tutorial-fit-1 | 715-718 |
| .tutorial-card.tutorial-fit-1 .tutorial-step | 720-723 |
| .tutorial-card.tutorial-fit-1 .tutorial-lab | 725-728 |
| .tutorial-card.tutorial-fit-1 .tutorial-chip | 730-733 |
| .tutorial-card.tutorial-fit-1 .tutorial-quality-table th | 735-737 |
| .tutorial-card.tutorial-fit-1 .tutorial-piano | 739-744 |
| .tutorial-card.tutorial-fit-2 | 746-749 |
| .tutorial-card.tutorial-fit-2 .tutorial-head h4 | 751-753 |
| .tutorial-card.tutorial-fit-2 .tutorial-step | 755-758 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-title | 760-762 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-body | 764-767 |
| .tutorial-card.tutorial-fit-2 .tutorial-lab | 769-772 |
| .tutorial-card.tutorial-fit-2 .tutorial-current | 774-776 |
| .tutorial-card.tutorial-fit-2 .tutorial-selector-title | 778-780 |
| .tutorial-card.tutorial-fit-2 .tutorial-chip | 782-785 |
| .tutorial-card.tutorial-fit-2 .tutorial-quality-table th | 787-790 |
| .tutorial-card.tutorial-fit-2 .tutorial-piano | 792-797 |
| .tutorial-card.tutorial-fit-2 .tutorial-actions .advanced-trigger | 799-802 |
| .tutorial-card.tutorial-fit-3 | 804-807 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-kicker | 809-811 |
| .tutorial-card.tutorial-fit-3 .tutorial-step | 813-816 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-title | 818-820 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-body | 822-825 |
| .tutorial-card.tutorial-fit-3 .tutorial-lab | 827-830 |
| .tutorial-card.tutorial-fit-3 .tutorial-current | 832-834 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano-title | 836-839 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th | 841-844 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th, .tutorial-card.tutorial-... | 847-849 |
| .tutorial-card.tutorial-fit-3 .tutorial-chip | 851-854 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano | 856-861 |
| .tutorial-card.tutorial-fit-3 .tutorial-actions .advanced-trigger | 863-866 |
| .tutorial-card.tutorial-fit-3 .tutorial-progress | 868-870 |
| .tutorial-head | 872-877 |
| .tutorial-head h4 | 879-883 |
| .tutorial-close | 885-887 |
| .tutorial-step | 889-897 |
| .tutorial-step-kicker | 899-905 |
| .tutorial-step.focus-flash | 907-909 |
| @keyframes tutorial-focus-flash | 911-918 |
| .tutorial-step-title | 920-923 |
| .tutorial-step-body | 925-929 |
| .tutorial-step-body p | 931-933 |
| .tutorial-step-body p + p | 935-937 |
| .tutorial-example-list | 939-944 |
| .tutorial-example-list code | 946-952 |
| .tutorial-actions | 954-961 |
| .tutorial-progress | 963-967 |
| .tutorial-lab | 969-978 |
| .tutorial-current | 980-984 |
| .tutorial-selector-block | 986-989 |
| .tutorial-control-matrix | 991-998 |
| .tutorial-control-row | 1000-1008 |
| .tutorial-control-row.locked | 1010-1012 |
| .tutorial-control-row.locked::after | 1014-1021 |
| .tutorial-control-row.newly-unlocked | 1023-1025 |
| @keyframes tutorial-unlock | 1027-1034 |
| .tutorial-selector-title | 1036-1042 |
| .tutorial-chip-list | 1044-1048 |
| #chord-tutorial-quality-list | 1050-1053 |
| .tutorial-quality-table | 1055-1060 |
| .tutorial-quality-table th, .tutorial-quality-table td | 1063-1067 |
| .tutorial-quality-table tr:first-child th, .tutorial-quality-table tr:first-child td | 1070-1072 |
| .tutorial-quality-table th | 1074-1083 |
| .tutorial-chip-group-list | 1085-1089 |
| .tutorial-chip | 1091-1103 |
| .tutorial-chip.unlocked | 1105-1108 |
| .tutorial-chip.unlocked:hover, .tutorial-chip.unlocked:focus-visible | 1111-1114 |
| .tutorial-chip[disabled] | 1116-1120 |
| .tutorial-chip.locked | 1122-1131 |
| .tutorial-chip:hover, .tutorial-chip:focus-visible | 1134-1137 |
| .tutorial-chip.active | 1139-1142 |
| .tutorial-chip.muted | 1144-1147 |
| .tutorial-chip.muted:hover, .tutorial-chip.muted:focus-visible | 1150-1152 |
| .tutorial-chip.newly-unlocked | 1154-1157 |
| .tutorial-chip.locked.newly-unlocked | 1159-1162 |
| .tutorial-piano-wrap | 1164-1169 |
| .tutorial-piano-title | 1171-1178 |
| .tutorial-piano | 1180-1191 |
| .tutorial-key | 1193-1198 |
| .tutorial-key.white | 1200-1208 |
| .tutorial-key.black | 1210-1218 |
| .tutorial-key.tone | 1220-1222 |
| .tutorial-key.tone.root | 1224-1226 |
| .tutorial-key[data-role]::after | 1228-1241 |
| .helper-card | 1243-1250 |
| .helper-title | 1252-1257 |
| .helper-list | 1259-1263 |
| .helper-item | 1265-1276 |
| .helper-item::after | 1278-1286 |
| .helper-item:last-child::after | 1288-1290 |
| .helper-item:hover, .helper-item:focus-within | 1293-1295 |
| .helper-label | 1297-1303 |
| .helper-item .helper-value | 1305-1313 |
| .helper-item .helper-mask | 1315-1322 |
| .helper-item .helper-real | 1324-1336 |
| .helper-item:hover .helper-mask, .helper-item:focus-within .helper-mask | 1339-1342 |
| .helper-item:hover .helper-real, .helper-item:focus-within .helper-real | 1345-1348 |
| .typing-zone[hidden] | 1350-1352 |
| .status | 1354-1363 |
| .status[hidden] | 1365-1367 |
| .helper-slot[hidden] | 1369-1371 |
| .status-actions | 1373-1379 |
| .hint-flag | 1381-1394 |
| .hint-flag[hidden] | 1396-1398 |
| .hint-button | 1400-1402 |
| .settings-toggle | 1404-1419 |
| .settings-toggle:hover | 1421-1423 |
| .settings-toggle svg | 1425-1429 |
| .theme-toggle | 1431-1446 |
| .theme-toggle:hover | 1448-1450 |
| .theme-toggle svg | 1452-1456 |
| .settings-panel | 1458-1477 |
| .settings-panel.open | 1479-1483 |
| .settings-panel h2 | 1485-1490 |
| .settings-body | 1492-1496 |
| .settings-grid | 1498-1501 |
| .advanced-trigger | 1503-1511 |
| .dropdown-trigger | 1513-1527 |
| .dropdown-trigger svg | 1529-1533 |
| .dropdown-trigger:focus-visible | 1535-1538 |
| .panel-trigger | 1540-1552 |
| .panel-trigger:hover | 1554-1557 |
| .panel-trigger[aria-expanded="true"] | 1559-1562 |
| .panel-trigger:focus-visible | 1564-1567 |
| .control select | 1569-1578 |
| .options-panel | 1580-1596 |
| .options-panel.open | 1598-1602 |
| .options-panel h3 | 1604-1611 |
| .options-grid | 1613-1616 |
| .options-panel .control | 1618-1624 |
| .options-panel .control.compact | 1626-1628 |
| .options-panel .control label | 1630-1632 |
| .options-section-title | 1634-1643 |
| .options-panel .options-section-title:first-child | 1645-1649 |
| .advanced-panel | 1651-1670 |
| .advanced-panel.open | 1672-1676 |
| .advanced-panel h3 | 1678-1683 |
| .advanced-grid | 1685-1694 |
| .advanced-grid::-webkit-scrollbar | 1696-1698 |
| .advanced-grid::-webkit-scrollbar-track | 1700-1703 |
| .advanced-grid::-webkit-scrollbar-thumb | 1705-1709 |
| .inline-value | 1711-1718 |
| .slider-stack | 1720-1723 |
| .slider-stack input[type="range"] | 1725-1729 |
| .slider-ghost | 1731-1745 |
| .slider-ghost.visible | 1747-1749 |
| .sf2-browser | 1751-1754 |
| .sf2-browser input[type="text"] | 1756-1765 |
| .sf2-preset-list | 1767-1780 |
| .sf2-browser .piano-desc | 1782-1785 |
| .sf2-browser .piano-desc.pending, .profile-browser .piano-desc.pending | 1788-1790 |
| .sf2-group | 1792-1797 |
| .sf2-group-title | 1799-1808 |
| .sf2-row | 1810-1818 |
| .sf2-row:first-child | 1820-1822 |
| .sf2-row:hover | 1824-1826 |
| .sf2-row.active | 1828-1831 |
| .sf2-row-name | 1833-1839 |
| .sf2-row-program, .sf2-row-bank | 1842-1846 |
| .sf2-empty | 1848-1852 |
| .profile-browser | 1854-1857 |
| .profile-browser input[type="text"] | 1859-1868 |
| .profile-list | 1870-1883 |
| .profile-row | 1885-1895 |
| .profile-row:hover | 1897-1899 |
| .profile-row.active | 1901-1904 |
| .profile-row.applied | 1906-1908 |
| .profile-row-name | 1910-1916 |
| .profile-row-kind | 1918-1923 |
| .advanced-footer | 1925-1931 |
| .piano-preview.wide | 1933-1945 |
| .piano-preview.wide::before | 1947-1949 |
| .piano-preview.wide .play-icon | 1951-1957 |
| .piano-preview.wide .play-label | 1959-1961 |
| .instrument-browser-panel | 1963-1978 |
| .instrument-browser-panel.open | 1980-1984 |
| .instrument-browser-panel h3 | 1986-1991 |
| .piano-panel | 1993-2008 |
| .piano-panel.open | 2010-2014 |
| .piano-panel h3 | 2016-2021 |
| .piano-options | 2023-2026 |
| .piano-option | 2028-2040 |
| .piano-option.active | 2042-2045 |
| .piano-option:focus-visible | 2047-2049 |
| .piano-info | 2051-2054 |
| .piano-name | 2056-2059 |
| .piano-desc | 2061-2064 |
| .piano-option.simple .piano-name | 2066-2070 |
| .piano-option.simple .piano-desc | 2072-2076 |
| .piano-preview | 2078-2093 |
| .piano-preview::before | 2095-2103 |
| .piano-preview:active | 2105-2108 |
| .piano-preview.main | 2110-2114 |
| .settings-grid input[type="range"], .advanced-panel input[type="range"], .options-... | 2118-2122 |
| .settings-grid input[type="range"]::-webkit-slider-runnable-track, .advanced-panel... | 2126-2131 |
| .settings-grid input[type="range"]::-webkit-slider-thumb, .advanced-panel input[ty... | 2135-2144 |
| .settings-grid input[type="range"]:focus-visible::-webkit-slider-thumb, .advanced-... | 2148-2151 |
| .settings-grid input[type="range"]::-moz-range-track, .advanced-panel input[type="... | 2155-2160 |
| .settings-grid input[type="range"]::-moz-range-thumb, .advanced-panel input[type="... | 2164-2171 |
| .settings-grid input[type="range"]:focus-visible::-moz-range-thumb, .advanced-pane... | 2175-2178 |
| .volume-value | 2180-2183 |
| .status-row | 2185-2190 |
| .switch | 2192-2196 |
| .switch input | 2198-2203 |
| .switch-track | 2205-2211 |
| .switch-thumb | 2213-2223 |
| .switch input:checked + .switch-track | 2225-2227 |
| .switch input:checked + .switch-track .switch-thumb | 2229-2231 |
| .control.compact .switch | 2233-2236 |
| .control.compact .switch-thumb | 2238-2243 |
| .control.compact .switch input:checked + .switch-track .switch-thumb | 2245-2247 |
| .control.compact .unit | 2249-2251 |
| .test-tone | 2253-2265 |
| .test-tone:hover | 2267-2270 |
| .test-tone:active | 2272-2274 |
| .test-tone-icon | 2276-2283 |
| .test-tone-label | 2285-2289 |
| .result | 2291-2295 |
| .reveal | 2297-2306 |
| .reveal strong | 2308-2310 |
| .reveal-label | 2312-2319 |
| .reveal-grid.compact | 2321-2325 |
| .reveal-cell | 2327-2329 |
| .keyboard-zone | 2331-2341 |
| .keyboard-stack | 2343-2353 |
| .keyboard-wrapper | 2355-2364 |
| .keyboard | 2366-2373 |
| .keyboard-wrapper.ends-black | 2375-2377 |
| .white-keys | 2379-2382 |
| .black-keys | 2384-2391 |
| .key | 2393-2404 |
| .key.white | 2406-2413 |
| .key.white.has-black | 2415-2417 |
| .key.black | 2419-2428 |
| .key span | 2430-2434 |
| .key.black span | 2436-2440 |
| .key.active | 2442-2445 |
| .key.black.active | 2447-2450 |
| .key.selected | 2452-2456 |
| .key.typed-preview | 2458-2460 |
| .key.correct | 2462-2466 |
| .key.wrong | 2468-2472 |
| .key.missed | 2474-2480 |
| .key.black.selected, .key.black.correct, .key.black.wrong | 2484-2486 |
| .key.black.missed | 2488-2494 |
| .keyboard.disabled | 2496-2502 |
| body.tutorial-open .keyboard | 2504-2506 |
| body.tutorial-open .keyboard.disabled | 2508-2511 |
| .keyboard.disabled::before | 2513-2525 |
| body.tutorial-open .keyboard.disabled::before | 2527-2529 |
| .keyboard.disabled::after | 2531-2565 |
| body.tutorial-open .keyboard.disabled::after | 2567-2569 |
| .tips | 2571-2579 |
| #pedal-tip[hidden] | 2581-2583 |
| .pedal-box | 2585-2599 |
| body.landing .pedal-box | 2601-2603 |
| .pedal-label | 2605-2615 |
| .pedal-icon | 2617-2624 |
| .pedal-icon.active | 2626-2629 |
| .note-pills | 2631-2637 |
| .note-pill | 2639-2645 |
| .note-pill.good | 2647-2651 |
| .note-pill.bad | 2653-2657 |
| .note-pill.missed | 2659-2663 |
| .note-pill.neutral | 2665-2669 |
| @media (max-width: 700px) | 2671-2726 |
| @media (max-height: 820px) | 2728-2749 |
| @media (max-height: 700px) | 2751-2756 |

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

