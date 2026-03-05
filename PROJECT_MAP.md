# Project Map

Generated: 2026-03-06 00:03:40 +01:00

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
| body.landing .app | 213-215 |
| body.landing .keyboard-zone | 217-220 |
| .app | 222-238 |
| .app > section, .app > header, .app > footer | 242-244 |
| .hero | 246-249 |
| .badge | 251-264 |
| h1 | 266-270 |
| .hero p | 272-278 |
| body:not(.landing) .hero h1, body:not(.landing) .hero p | 281-283 |
| body:not(.landing) .tips | 285-287 |
| .hero, .actions, .quick-start, .chord-readout, .typing-zone, .status, .tips | 295-298 |
| body:not(.landing) .hero | 300-304 |
| .control | 306-312 |
| .control.compact | 314-316 |
| .control.compact label | 318-320 |
| .control.compact .control-row | 322-324 |
| .control label | 326-333 |
| .control-row | 335-339 |
| .control-row.align-end | 341-344 |
| .start-note-row | 346-348 |
| .start-note-stepper | 350-360 |
| .start-note-value | 362-368 |
| .step-btn | 370-382 |
| .step-btn.oct | 384-390 |
| .step-btn:hover | 392-395 |
| .advanced-test | 397-400 |
| .advanced-test .unit | 402-405 |
| input[type="number"] | 407-416 |
| .segmented | 418-422 |
| .segmented-btn | 424-433 |
| .segmented-btn.active | 435-439 |
| .actions | 441-446 |
| .quick-start | 448-453 |
| .quick-mode-btn | 455-470 |
| .quick-mode-btn:hover, .quick-mode-btn:focus-visible | 473-478 |
| .quick-mode-title | 480-486 |
| .quick-mode-sub | 488-492 |
| body:not(.landing) .quick-start | 494-496 |
| .btn | 498-505 |
| .btn:focus-visible | 507-510 |
| .btn.primary | 512-516 |
| .btn.secondary | 518-522 |
| .btn.ghost | 524-528 |
| .btn.submit | 530-534 |
| .btn:hover | 536-538 |
| .chord-readout | 540-549 |
| .chord-readout[hidden] | 551-553 |
| .typing-zone | 555-564 |
| .typing-zone label | 566-573 |
| .typing-zone input[type="text"] | 575-587 |
| .typing-zone input[type="text"]::placeholder | 589-592 |
| .typing-row | 594-597 |
| .typing-input-wrap | 599-601 |
| .typing-help-toggle | 603-620 |
| .typing-help-toggle:hover | 622-625 |
| .typing-help-toggle:focus-visible | 627-630 |
| .typing-help-text | 632-638 |
| .typing-help-text strong | 640-642 |
| .typing-help-actions | 644-646 |
| .typing-learn-btn | 648-658 |
| .typing-learn-btn:hover | 660-662 |
| .typing-learn-btn:focus-visible | 664-667 |
| .tutorial-modal | 669-676 |
| .tutorial-modal[hidden] | 678-680 |
| .tutorial-backdrop | 682-688 |
| .tutorial-card | 690-703 |
| .tutorial-card.tutorial-overflow-scroll | 705-708 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-step | 710-716 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-lab | 718-725 |
| .tutorial-card.tutorial-fit-1 | 727-730 |
| .tutorial-card.tutorial-fit-1 .tutorial-step | 732-735 |
| .tutorial-card.tutorial-fit-1 .tutorial-lab | 737-740 |
| .tutorial-card.tutorial-fit-1 .tutorial-chip | 742-745 |
| .tutorial-card.tutorial-fit-1 .tutorial-quality-table th | 747-749 |
| .tutorial-card.tutorial-fit-1 .tutorial-piano | 751-756 |
| .tutorial-card.tutorial-fit-2 | 758-761 |
| .tutorial-card.tutorial-fit-2 .tutorial-head h4 | 763-765 |
| .tutorial-card.tutorial-fit-2 .tutorial-step | 767-770 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-title | 772-774 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-body | 776-779 |
| .tutorial-card.tutorial-fit-2 .tutorial-lab | 781-784 |
| .tutorial-card.tutorial-fit-2 .tutorial-current | 786-788 |
| .tutorial-card.tutorial-fit-2 .tutorial-selector-title | 790-792 |
| .tutorial-card.tutorial-fit-2 .tutorial-chip | 794-797 |
| .tutorial-card.tutorial-fit-2 .tutorial-quality-table th | 799-802 |
| .tutorial-card.tutorial-fit-2 .tutorial-piano | 804-809 |
| .tutorial-card.tutorial-fit-2 .tutorial-actions .advanced-trigger | 811-814 |
| .tutorial-card.tutorial-fit-3 | 816-819 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-kicker | 821-823 |
| .tutorial-card.tutorial-fit-3 .tutorial-step | 825-828 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-title | 830-832 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-body | 834-837 |
| .tutorial-card.tutorial-fit-3 .tutorial-lab | 839-842 |
| .tutorial-card.tutorial-fit-3 .tutorial-current | 844-846 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano-title | 848-851 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th | 853-856 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th, .tutorial-card.tutorial-... | 859-861 |
| .tutorial-card.tutorial-fit-3 .tutorial-chip | 863-866 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano | 868-873 |
| .tutorial-card.tutorial-fit-3 .tutorial-actions .advanced-trigger | 875-878 |
| .tutorial-card.tutorial-fit-3 .tutorial-progress | 880-882 |
| .tutorial-head | 884-889 |
| .tutorial-head h4 | 891-895 |
| .tutorial-close | 897-899 |
| .tutorial-step | 901-909 |
| .tutorial-step-kicker | 911-917 |
| .tutorial-step.focus-flash | 919-921 |
| @keyframes tutorial-focus-flash | 923-930 |
| .tutorial-step-title | 932-935 |
| .tutorial-step-body | 937-941 |
| .tutorial-step-body p | 943-945 |
| .tutorial-step-body p + p | 947-949 |
| .tutorial-example-list | 951-956 |
| .tutorial-example-list code | 958-964 |
| .tutorial-actions | 966-973 |
| .tutorial-progress | 975-979 |
| .tutorial-lab | 981-990 |
| .tutorial-current | 992-996 |
| .tutorial-selector-block | 998-1001 |
| .tutorial-control-matrix | 1003-1010 |
| .tutorial-control-row | 1012-1020 |
| .tutorial-control-row.locked | 1022-1024 |
| .tutorial-control-row.locked::after | 1026-1033 |
| .tutorial-control-row.newly-unlocked | 1035-1037 |
| @keyframes tutorial-unlock | 1039-1046 |
| .tutorial-selector-title | 1048-1054 |
| .tutorial-chip-list | 1056-1060 |
| #chord-tutorial-quality-list | 1062-1065 |
| .tutorial-quality-table | 1067-1072 |
| .tutorial-quality-table th, .tutorial-quality-table td | 1075-1079 |
| .tutorial-quality-table tr:first-child th, .tutorial-quality-table tr:first-child td | 1082-1084 |
| .tutorial-quality-table th | 1086-1095 |
| .tutorial-chip-group-list | 1097-1101 |
| .tutorial-chip | 1103-1115 |
| .tutorial-chip.unlocked | 1117-1120 |
| .tutorial-chip.unlocked:hover, .tutorial-chip.unlocked:focus-visible | 1123-1126 |
| .tutorial-chip[disabled] | 1128-1132 |
| .tutorial-chip.locked | 1134-1143 |
| .tutorial-chip:hover, .tutorial-chip:focus-visible | 1146-1149 |
| .tutorial-chip.active | 1151-1154 |
| .tutorial-chip.muted | 1156-1159 |
| .tutorial-chip.muted:hover, .tutorial-chip.muted:focus-visible | 1162-1164 |
| .tutorial-chip.newly-unlocked | 1166-1169 |
| .tutorial-chip.locked.newly-unlocked | 1171-1174 |
| .tutorial-piano-wrap | 1176-1181 |
| .tutorial-piano-title | 1183-1190 |
| .tutorial-piano | 1192-1203 |
| .tutorial-key | 1205-1210 |
| .tutorial-key.white | 1212-1220 |
| .tutorial-key.black | 1222-1230 |
| .tutorial-key.tone | 1232-1234 |
| .tutorial-key.tone.root | 1236-1238 |
| .tutorial-key[data-role]::after | 1240-1253 |
| .helper-card | 1255-1262 |
| .helper-title | 1264-1269 |
| .helper-list | 1271-1275 |
| .helper-item | 1277-1288 |
| .helper-item::after | 1290-1298 |
| .helper-item:last-child::after | 1300-1302 |
| .helper-item:hover, .helper-item:focus-within | 1305-1307 |
| .helper-label | 1309-1315 |
| .helper-item .helper-value | 1317-1325 |
| .helper-item .helper-mask | 1327-1334 |
| .helper-item .helper-real | 1336-1348 |
| .helper-item:hover .helper-mask, .helper-item:focus-within .helper-mask | 1351-1354 |
| .helper-item:hover .helper-real, .helper-item:focus-within .helper-real | 1357-1360 |
| .typing-zone[hidden] | 1362-1364 |
| .status | 1366-1375 |
| .status[hidden] | 1377-1379 |
| .helper-slot[hidden] | 1381-1383 |
| .status-actions | 1385-1391 |
| .hint-flag | 1393-1406 |
| .hint-flag[hidden] | 1408-1410 |
| .hint-button | 1412-1414 |
| .settings-toggle | 1416-1431 |
| .settings-toggle:hover | 1433-1435 |
| .settings-toggle svg | 1437-1441 |
| .theme-toggle | 1443-1458 |
| .theme-toggle:hover | 1460-1462 |
| .theme-toggle svg | 1464-1468 |
| .settings-panel | 1470-1489 |
| .settings-panel.open | 1491-1495 |
| .settings-panel h2 | 1497-1502 |
| .settings-body | 1504-1508 |
| .settings-grid | 1510-1513 |
| .advanced-trigger | 1515-1523 |
| .dropdown-trigger | 1525-1539 |
| .dropdown-trigger svg | 1541-1545 |
| .dropdown-trigger:focus-visible | 1547-1550 |
| .panel-trigger | 1552-1564 |
| .panel-trigger:hover | 1566-1569 |
| .panel-trigger[aria-expanded="true"] | 1571-1574 |
| .panel-trigger:focus-visible | 1576-1579 |
| .control select | 1581-1590 |
| .options-panel | 1592-1608 |
| .options-panel.open | 1610-1614 |
| .options-panel h3 | 1616-1623 |
| .options-grid | 1625-1628 |
| .options-panel .control | 1630-1636 |
| .options-panel .control.compact | 1638-1640 |
| .options-panel .control label | 1642-1644 |
| .options-section-title | 1646-1655 |
| .options-panel .options-section-title:first-child | 1657-1661 |
| .advanced-panel | 1663-1682 |
| .advanced-panel.open | 1684-1688 |
| .advanced-panel h3 | 1690-1695 |
| .advanced-grid | 1697-1706 |
| .advanced-grid::-webkit-scrollbar | 1708-1710 |
| .advanced-grid::-webkit-scrollbar-track | 1712-1715 |
| .advanced-grid::-webkit-scrollbar-thumb | 1717-1721 |
| .inline-value | 1723-1730 |
| .slider-stack | 1732-1735 |
| .slider-stack input[type="range"] | 1737-1741 |
| .slider-ghost | 1743-1757 |
| .slider-ghost.visible | 1759-1761 |
| .sf2-browser | 1763-1766 |
| .sf2-browser input[type="text"] | 1768-1777 |
| .sf2-preset-list | 1779-1792 |
| .sf2-browser .piano-desc | 1794-1797 |
| .sf2-browser .piano-desc.pending, .profile-browser .piano-desc.pending | 1800-1802 |
| .sf2-group | 1804-1809 |
| .sf2-group-title | 1811-1820 |
| .sf2-row | 1822-1830 |
| .sf2-row:first-child | 1832-1834 |
| .sf2-row:hover | 1836-1838 |
| .sf2-row.active | 1840-1843 |
| .sf2-row-name | 1845-1851 |
| .sf2-row-program, .sf2-row-bank | 1854-1858 |
| .sf2-empty | 1860-1864 |
| .profile-browser | 1866-1869 |
| .profile-browser input[type="text"] | 1871-1880 |
| .profile-list | 1882-1895 |
| .profile-row | 1897-1907 |
| .profile-row:hover | 1909-1911 |
| .profile-row.active | 1913-1916 |
| .profile-row.applied | 1918-1920 |
| .profile-row-name | 1922-1928 |
| .profile-row-kind | 1930-1935 |
| .advanced-footer | 1937-1943 |
| .piano-preview.wide | 1945-1957 |
| .piano-preview.wide::before | 1959-1961 |
| .piano-preview.wide .play-icon | 1963-1969 |
| .piano-preview.wide .play-label | 1971-1973 |
| .instrument-browser-panel | 1975-1990 |
| .instrument-browser-panel.open | 1992-1996 |
| .instrument-browser-panel h3 | 1998-2003 |
| .piano-panel | 2005-2020 |
| .piano-panel.open | 2022-2026 |
| .piano-panel h3 | 2028-2033 |
| .piano-options | 2035-2038 |
| .piano-option | 2040-2052 |
| .piano-option.active | 2054-2057 |
| .piano-option:focus-visible | 2059-2061 |
| .piano-info | 2063-2066 |
| .piano-name | 2068-2071 |
| .piano-desc | 2073-2076 |
| .piano-option.simple .piano-name | 2078-2082 |
| .piano-option.simple .piano-desc | 2084-2088 |
| .piano-preview | 2090-2105 |
| .piano-preview::before | 2107-2115 |
| .piano-preview:active | 2117-2120 |
| .piano-preview.main | 2122-2126 |
| .settings-grid input[type="range"], .advanced-panel input[type="range"], .options-... | 2130-2134 |
| .settings-grid input[type="range"]::-webkit-slider-runnable-track, .advanced-panel... | 2138-2143 |
| .settings-grid input[type="range"]::-webkit-slider-thumb, .advanced-panel input[ty... | 2147-2156 |
| .settings-grid input[type="range"]:focus-visible::-webkit-slider-thumb, .advanced-... | 2160-2163 |
| .settings-grid input[type="range"]::-moz-range-track, .advanced-panel input[type="... | 2167-2172 |
| .settings-grid input[type="range"]::-moz-range-thumb, .advanced-panel input[type="... | 2176-2183 |
| .settings-grid input[type="range"]:focus-visible::-moz-range-thumb, .advanced-pane... | 2187-2190 |
| .volume-value | 2192-2195 |
| .status-row | 2197-2202 |
| .switch | 2204-2208 |
| .switch input | 2210-2215 |
| .switch-track | 2217-2223 |
| .switch-thumb | 2225-2235 |
| .switch input:checked + .switch-track | 2237-2239 |
| .switch input:checked + .switch-track .switch-thumb | 2241-2243 |
| .control.compact .switch | 2245-2248 |
| .control.compact .switch-thumb | 2250-2255 |
| .control.compact .switch input:checked + .switch-track .switch-thumb | 2257-2259 |
| .control.compact .unit | 2261-2263 |
| .test-tone | 2265-2277 |
| .test-tone:hover | 2279-2282 |
| .test-tone:active | 2284-2286 |
| .test-tone-icon | 2288-2295 |
| .test-tone-label | 2297-2301 |
| .result | 2303-2307 |
| .reveal | 2309-2318 |
| .reveal strong | 2320-2322 |
| .reveal-label | 2324-2331 |
| .reveal-grid.compact | 2333-2337 |
| .reveal-cell | 2339-2341 |
| .keyboard-zone | 2343-2352 |
| .keyboard-stack | 2354-2364 |
| .keyboard-wrapper | 2366-2375 |
| .keyboard | 2377-2384 |
| .keyboard-wrapper.ends-black | 2386-2388 |
| .white-keys | 2390-2393 |
| .black-keys | 2395-2402 |
| .key | 2404-2415 |
| .key.white | 2417-2424 |
| .key.white.has-black | 2426-2428 |
| .key.black | 2430-2439 |
| .key span | 2441-2445 |
| .key.black span | 2447-2451 |
| .key.active | 2453-2456 |
| .key.black.active | 2458-2461 |
| .key.selected | 2463-2467 |
| .key.typed-preview | 2469-2471 |
| .key.correct | 2473-2477 |
| .key.wrong | 2479-2483 |
| .key.missed | 2485-2491 |
| .key.black.selected, .key.black.correct, .key.black.wrong | 2495-2497 |
| .key.black.missed | 2499-2505 |
| .keyboard.disabled | 2507-2513 |
| body.tutorial-open .keyboard | 2515-2517 |
| body.tutorial-open .keyboard.disabled | 2519-2522 |
| .keyboard.disabled::before | 2524-2536 |
| body.tutorial-open .keyboard.disabled::before | 2538-2540 |
| .keyboard.disabled::after | 2542-2576 |
| body.tutorial-open .keyboard.disabled::after | 2578-2580 |
| .tips | 2582-2590 |
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

