# Project Map

Generated: 2026-03-09 12:29:37 +01:00

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
| index.html | HTML | Loaded directly | Yes | 506 |
| styles.css | CSS | Loaded directly | Yes | 2865 |
| js/audio.js | JavaScript | Browser runtime module | Yes | 1529 |
| js/core.js | JavaScript | Browser runtime module | Yes | 1013 |
| js/events.js | JavaScript | Browser runtime module | Yes | 1771 |
| js/game.js | JavaScript | Browser runtime module | Yes | 2048 |
| js/settings.js | JavaScript | Browser runtime module | Yes | 1247 |
| README.md | Markdown | Human + AI onboarding | Yes | 135 |
| IMPLEMENTATION_CHECKLIST.md | Markdown | Implementation roadmap checklist | Yes | 227 |
| AGENTS.md | Markdown | AI instruction override | Yes | 47 |
| PROJECT_MAP.md | Markdown | Generated reference map | Yes | 1087 |
| tools/generate-project-map.ps1 | PowerShell | Documentation generator | Yes | 540 |
| tools/smoke-checklist.md | Markdown | Manual regression checklist | Yes | 59 |
| soundfonts/GeneralUser-GS.sf2 | Asset | Soundfont asset | Yes | 0 |
| soundfonts/index.json | JSON | Soundfont asset | Yes | 3 |
| soundfonts/README.md | Markdown | Soundfont asset | Yes | 39 |

## index.html Map
File: index.html (1-506)

### ID Anchors
| ID | Element | Line |
|---|---|---:|
| settings-toggle | <button> | 15 |
| theme-toggle | <button> | 23 |
| home-toggle | <button> | 30 |
| settings-panel | <aside> | 37 |
| options-trigger | <button> | 45 |
| piano-volume | <input> | 59 |
| volume-value | <span> | 60 |
| piano-trigger | <button> | 67 |
| piano-label | <span> | 69 |
| piano-preview-main | <button> | 74 |
| instrument-browser-trigger | <button> | 77 |
| note-length | <input> | 86 |
| length-value | <span> | 87 |
| advanced-trigger | <button> | 90 |
| key-count | <input> | 98 |
| key-count-value | <span> | 99 |
| start-note-down-oct | <button> | 107 |
| start-note-down | <button> | 109 |
| start-note-value | <span> | 110 |
| start-note-up | <button> | 111 |
| start-note-up-oct | <button> | 112 |
| reset-settings | <button> | 119 |
| advanced-panel | <section> | 122 |
| attack-label-value | <span> | 126 |
| attack-time | <input> | 129 |
| attack-ghost | <span> | 130 |
| attack-value | <span> | 132 |
| decay-label-value | <span> | 136 |
| decay-rate | <input> | 139 |
| decay-ghost | <span> | 140 |
| decay-value | <span> | 142 |
| release-label-value | <span> | 146 |
| release-rate | <input> | 149 |
| release-ghost | <span> | 150 |
| release-value | <span> | 152 |
| sustain-label-value | <span> | 156 |
| sustain-length | <input> | 159 |
| sustain-ghost | <span> | 160 |
| sustain-value | <span> | 162 |
| profile-search | <input> | 167 |
| profile-list | <div> | 168 |
| profile-meta | <div> | 169 |
| profile-save | <button> | 171 |
| profile-apply | <button> | 172 |
| test-envelope | <button> | 177 |
| piano-panel | <section> | 184 |
| piano-options | <div> | 186 |
| instrument-browser-panel | <section> | 189 |
| instrument-preset-search | <input> | 193 |
| instrument-preset-list | <div> | 194 |
| instrument-preset-meta | <div> | 195 |
| instrument-preset-apply | <button> | 197 |
| options-panel | <section> | 202 |
| practice-mode | <select> | 210 |
| note-count | <input> | 221 |
| note-count-value | <span> | 222 |
| blind-mode | <input> | 238 |
| hide-live-preview | <input> | 251 |
| nice-notes | <input> | 264 |
| chord-rounds | <input> | 277 |
| training-mode | <select> | 291 |
| chord-difficulty | <select> | 305 |
| chord-extra-helpers | <input> | 318 |
| chord-root-hint | <input> | 331 |
| chord-tutorial-open-options | <button> | 343 |
| typing-show-piano | <input> | 353 |
| typing-show-typed | <input> | 366 |
| primary-action | <button> | 386 |
| play-selected | <button> | 387 |
| quick-start | <section> | 390 |
| keyboard | <div> | 408 |
| white-keys | <div> | 409 |
| black-keys | <div> | 410 |
| pedal-icon | <div> | 415 |
| chord-readout | <section> | 419 |
| typing-zone | <section> | 420 |
| chord-answer | <input> | 424 |
| typing-help-toggle | <button> | 425 |
| status-panel | <section> | 431 |
| round-count | <span> | 433 |
| selected-list | <span> | 434 |
| goal-count | <span> | 435 |
| mode-label | <span> | 436 |
| hint-button | <button> | 439 |
| result | <div> | 441 |
| helper-slot | <div> | 442 |
| reveal | <div> | 443 |
| hint-flag | <div> | 444 |
| pedal-tip | <span> | 449 |
| chord-tutorial-modal | <section> | 453 |
| chord-tutorial-backdrop | <button> | 454 |
| chord-tutorial-title | <h4> | 457 |
| chord-tutorial-close | <button> | 458 |
| chord-tutorial-step | <div> | 460 |
| chord-tutorial-current | <div> | 462 |
| chord-tutorial-piano | <div> | 465 |
| tutorial-row-root | <div> | 468 |
| chord-tutorial-root-list | <div> | 470 |
| tutorial-row-quality | <div> | 472 |
| chord-tutorial-quality-list | <div> | 474 |
| chord-tutorial-prev | <button> | 479 |
| chord-tutorial-progress | <span> | 480 |
| chord-tutorial-next | <button> | 481 |

### Script Load Order
| Order | Script | Line |
|---:|---|---:|
| 1 | vendor/libfluidsynth-2.4.6.js?v=20260309103743 | 486 |
| 2 | vendor/js-synthesizer.min.js?v=20260309103743 | 487 |
| 3 | js/core.js?v=20260309103743 | 488 |
| 4 | js/store/reducers.js?v=20260309103743 | 489 |
| 5 | js/store/actions.js?v=20260309103743 | 490 |
| 6 | js/store/selectors.js?v=20260309103743 | 491 |
| 7 | js/store/store.js?v=20260309103743 | 492 |
| 8 | js/features/round/state-mutations.js?v=20260309103743 | 493 |
| 9 | js/features/settings/state-mutations.js?v=20260309103743 | 494 |
| 10 | js/features/chords/index.js?v=20260309103743 | 495 |
| 11 | js/features/typing/index.js?v=20260309103743 | 496 |
| 12 | js/features/tutorial/index.js?v=20260309103743 | 497 |
| 13 | js/features/audio-preview/index.js?v=20260309103743 | 498 |
| 14 | js/features/input/index.js?v=20260309103743 | 499 |
| 15 | js/audio.js?v=20260309103743 | 500 |
| 16 | js/game.js?v=20260309103743 | 501 |
| 17 | js/settings.js?v=20260309103743 | 502 |
| 18 | js/events.js?v=20260309103743 | 503 |

## styles.css Map
File: styles.css (1-2865)

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
| .control.compact > label | 334-336 |
| .control.compact .control-row | 338-340 |
| .control > label | 342-349 |
| .control-row | 351-355 |
| .control-row.toggle-row | 357-360 |
| .control-row.toggle-row .switch | 362-364 |
| .control-row.toggle-row .unit | 366-368 |
| .control-row.align-end | 370-373 |
| .start-note-row | 375-377 |
| .start-note-stepper | 379-389 |
| .start-note-value | 391-397 |
| .step-btn | 399-411 |
| .step-btn.oct | 413-419 |
| .step-btn:hover | 421-424 |
| .advanced-test | 426-429 |
| .advanced-test .unit | 431-434 |
| input[type="number"] | 436-445 |
| .segmented | 447-451 |
| .segmented-btn | 453-462 |
| .segmented-btn.active | 464-468 |
| .actions | 470-476 |
| .quick-start | 478-484 |
| .quick-mode-btn | 486-501 |
| .quick-mode-btn:hover, .quick-mode-btn:focus-visible | 504-509 |
| .quick-mode-title | 511-517 |
| .quick-mode-sub | 519-523 |
| body:not(.landing) .quick-start | 525-527 |
| .btn | 529-536 |
| .btn:focus-visible | 538-541 |
| .btn.primary | 543-547 |
| .btn.secondary | 549-553 |
| .btn.ghost | 555-559 |
| .btn.submit | 561-565 |
| .btn:hover | 567-569 |
| .chord-readout | 571-581 |
| .chord-readout[hidden] | 583-585 |
| .typing-zone | 587-597 |
| .typing-zone label | 599-606 |
| .typing-zone input[type="text"] | 608-620 |
| .typing-zone input[type="text"]::placeholder | 622-625 |
| .typing-row | 627-630 |
| .typing-input-wrap | 632-634 |
| .typing-help-toggle | 636-653 |
| .typing-help-toggle:hover | 655-658 |
| .typing-help-toggle:focus-visible | 660-663 |
| .typing-help-text | 665-671 |
| .typing-help-text strong | 673-675 |
| .typing-help-actions | 677-679 |
| .typing-learn-btn | 681-691 |
| .typing-learn-btn:hover | 693-695 |
| .typing-learn-btn:focus-visible | 697-700 |
| .tutorial-modal | 702-709 |
| .tutorial-modal[hidden] | 711-713 |
| .tutorial-backdrop | 715-721 |
| .tutorial-card | 723-736 |
| .tutorial-card.tutorial-overflow-scroll | 738-741 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-step | 743-749 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-lab | 751-758 |
| .tutorial-card.tutorial-fit-1 | 760-763 |
| .tutorial-card.tutorial-fit-1 .tutorial-step | 765-768 |
| .tutorial-card.tutorial-fit-1 .tutorial-lab | 770-773 |
| .tutorial-card.tutorial-fit-1 .tutorial-chip | 775-778 |
| .tutorial-card.tutorial-fit-1 .tutorial-quality-table th | 780-782 |
| .tutorial-card.tutorial-fit-1 .tutorial-piano | 784-789 |
| .tutorial-card.tutorial-fit-2 | 791-794 |
| .tutorial-card.tutorial-fit-2 .tutorial-head h4 | 796-798 |
| .tutorial-card.tutorial-fit-2 .tutorial-step | 800-803 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-title | 805-807 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-body | 809-812 |
| .tutorial-card.tutorial-fit-2 .tutorial-lab | 814-817 |
| .tutorial-card.tutorial-fit-2 .tutorial-current | 819-821 |
| .tutorial-card.tutorial-fit-2 .tutorial-selector-title | 823-825 |
| .tutorial-card.tutorial-fit-2 .tutorial-chip | 827-830 |
| .tutorial-card.tutorial-fit-2 .tutorial-quality-table th | 832-835 |
| .tutorial-card.tutorial-fit-2 .tutorial-piano | 837-842 |
| .tutorial-card.tutorial-fit-2 .tutorial-actions .advanced-trigger | 844-847 |
| .tutorial-card.tutorial-fit-3 | 849-852 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-kicker | 854-856 |
| .tutorial-card.tutorial-fit-3 .tutorial-step | 858-861 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-title | 863-865 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-body | 867-870 |
| .tutorial-card.tutorial-fit-3 .tutorial-lab | 872-875 |
| .tutorial-card.tutorial-fit-3 .tutorial-current | 877-879 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano-title | 881-884 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th | 886-889 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th, .tutorial-card.tutorial-... | 892-894 |
| .tutorial-card.tutorial-fit-3 .tutorial-chip | 896-899 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano | 901-906 |
| .tutorial-card.tutorial-fit-3 .tutorial-actions .advanced-trigger | 908-911 |
| .tutorial-card.tutorial-fit-3 .tutorial-progress | 913-915 |
| .tutorial-head | 917-922 |
| .tutorial-head h4 | 924-928 |
| .tutorial-close | 930-932 |
| .tutorial-step | 934-942 |
| .tutorial-step-kicker | 944-950 |
| .tutorial-step.focus-flash | 952-954 |
| @keyframes tutorial-focus-flash | 956-963 |
| .tutorial-step-title | 965-968 |
| .tutorial-step-body | 970-974 |
| .tutorial-step-body p | 976-978 |
| .tutorial-step-body p + p | 980-982 |
| .tutorial-example-list | 984-989 |
| .tutorial-example-list code | 991-997 |
| .tutorial-actions | 999-1006 |
| .tutorial-progress | 1008-1012 |
| .tutorial-lab | 1014-1023 |
| .tutorial-current | 1025-1029 |
| .tutorial-selector-block | 1031-1034 |
| .tutorial-control-matrix | 1036-1043 |
| .tutorial-control-row | 1045-1053 |
| .tutorial-control-row.locked | 1055-1057 |
| .tutorial-control-row.locked::after | 1059-1066 |
| .tutorial-control-row.newly-unlocked | 1068-1070 |
| @keyframes tutorial-unlock | 1072-1079 |
| .tutorial-selector-title | 1081-1087 |
| .tutorial-chip-list | 1089-1093 |
| #chord-tutorial-quality-list | 1095-1098 |
| .tutorial-quality-table | 1100-1105 |
| .tutorial-quality-table th, .tutorial-quality-table td | 1108-1112 |
| .tutorial-quality-table tr:first-child th, .tutorial-quality-table tr:first-child td | 1115-1117 |
| .tutorial-quality-table th | 1119-1128 |
| .tutorial-chip-group-list | 1130-1134 |
| .tutorial-chip | 1136-1148 |
| .tutorial-chip.unlocked | 1150-1153 |
| .tutorial-chip.unlocked:hover, .tutorial-chip.unlocked:focus-visible | 1156-1159 |
| .tutorial-chip[disabled] | 1161-1165 |
| .tutorial-chip.locked | 1167-1176 |
| .tutorial-chip:hover, .tutorial-chip:focus-visible | 1179-1182 |
| .tutorial-chip.active | 1184-1187 |
| .tutorial-chip.muted | 1189-1192 |
| .tutorial-chip.muted:hover, .tutorial-chip.muted:focus-visible | 1195-1197 |
| .tutorial-chip.newly-unlocked | 1199-1202 |
| .tutorial-chip.locked.newly-unlocked | 1204-1207 |
| .tutorial-piano-wrap | 1209-1214 |
| .tutorial-piano-title | 1216-1223 |
| .tutorial-piano | 1225-1236 |
| .tutorial-key | 1238-1243 |
| .tutorial-key.white | 1245-1253 |
| .tutorial-key.black | 1255-1263 |
| .tutorial-key.tone | 1265-1267 |
| .tutorial-key.tone.root | 1269-1271 |
| .tutorial-key[data-role]::after | 1273-1286 |
| .helper-card | 1288-1295 |
| .helper-title | 1297-1302 |
| .helper-list | 1304-1308 |
| .helper-item | 1310-1321 |
| .helper-item::after | 1323-1331 |
| .helper-item:last-child::after | 1333-1335 |
| .helper-item:hover, .helper-item:focus-within | 1338-1340 |
| @media (hover: hover) and (pointer: fine) | 1342-1347 |
| .app-cursor | 1349-1360 |
| .app-cursor.visible | 1362-1364 |
| .app-cursor-ring, .app-cursor-dot | 1367-1374 |
| .app-cursor-ring | 1376-1384 |
| .app-cursor-dot | 1386-1390 |
| .app-cursor.is-interactive .app-cursor-ring | 1392-1397 |
| .app-cursor.is-interactive .app-cursor-dot | 1399-1401 |
| .app-cursor.is-text .app-cursor-ring | 1403-1408 |
| .app-cursor.is-pressed .app-cursor-ring | 1410-1412 |
| .app-cursor.is-pressed .app-cursor-dot | 1414-1416 |
| .helper-label | 1418-1424 |
| .helper-item .helper-value | 1426-1434 |
| .helper-item .helper-mask | 1436-1444 |
| .helper-item .helper-real | 1446-1458 |
| .helper-item:hover .helper-mask, .helper-item:focus-within .helper-mask | 1461-1464 |
| .helper-item:hover .helper-real, .helper-item:focus-within .helper-real | 1467-1470 |
| .typing-zone[hidden] | 1472-1474 |
| .status | 1476-1487 |
| .status[hidden] | 1489-1491 |
| .helper-slot[hidden] | 1493-1495 |
| .status-actions | 1497-1503 |
| .hint-flag | 1505-1518 |
| .hint-flag[hidden] | 1520-1522 |
| .hint-button | 1524-1526 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) | 1528-1542 |
| .settings-toggle | 1544-1546 |
| .theme-toggle | 1548-1550 |
| .home-toggle | 1552-1554 |
| :is(.settings-toggle, .theme-toggle, .home-toggle):hover | 1556-1558 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) svg | 1560-1564 |
| .settings-toggle svg | 1566-1569 |
| .settings-panel | 1571-1590 |
| .settings-panel.open | 1592-1596 |
| .settings-panel h2 | 1598-1603 |
| .settings-body | 1605-1609 |
| .settings-grid | 1611-1614 |
| .settings-section-title | 1616-1624 |
| .panel-trigger, .advanced-trigger, .dropdown-trigger, .control select | 1629-1638 |
| .advanced-trigger | 1640-1644 |
| .dropdown-trigger | 1646-1654 |
| .dropdown-trigger svg | 1656-1660 |
| .panel-trigger | 1662-1667 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger):hover | 1669-1672 |
| .panel-trigger:hover | 1674-1676 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger)[aria-expanded="true"] | 1678-1681 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger, .control select):focus-v... | 1683-1686 |
| .control select | 1688-1692 |
| .options-panel | 1694-1710 |
| .options-panel.open | 1712-1716 |
| .options-panel h3 | 1718-1725 |
| .options-grid | 1727-1730 |
| .options-panel .control | 1732-1738 |
| .options-panel .control.compact | 1740-1742 |
| .options-panel .control > label | 1744-1746 |
| .options-section-title | 1748-1757 |
| .options-panel .options-section-title:first-child | 1759-1763 |
| .advanced-panel | 1765-1784 |
| .advanced-panel.open | 1786-1790 |
| .advanced-panel h3 | 1792-1797 |
| .advanced-grid | 1799-1808 |
| .advanced-grid::-webkit-scrollbar | 1810-1812 |
| .advanced-grid::-webkit-scrollbar-track | 1814-1817 |
| .advanced-grid::-webkit-scrollbar-thumb | 1819-1823 |
| .inline-value | 1825-1832 |
| .slider-stack | 1834-1837 |
| .slider-stack input[type="range"] | 1839-1843 |
| .slider-ghost | 1845-1859 |
| .slider-ghost.visible | 1861-1863 |
| .sf2-browser | 1865-1868 |
| .sf2-browser input[type="text"] | 1870-1879 |
| .sf2-preset-list | 1881-1894 |
| .sf2-browser .piano-desc | 1896-1899 |
| .sf2-browser .piano-desc.pending, .profile-browser .piano-desc.pending | 1902-1904 |
| .sf2-group | 1906-1911 |
| .sf2-group-title | 1913-1922 |
| .sf2-row | 1924-1932 |
| .sf2-row:first-child | 1934-1936 |
| .sf2-row:hover | 1938-1940 |
| .sf2-row.active | 1942-1945 |
| .sf2-row-name | 1947-1953 |
| .sf2-row-program, .sf2-row-bank | 1956-1960 |
| .sf2-empty | 1962-1966 |
| .profile-browser | 1968-1971 |
| .profile-browser input[type="text"] | 1973-1982 |
| .profile-list | 1984-1997 |
| .profile-row | 1999-2009 |
| .profile-row:hover | 2011-2013 |
| .profile-row.active | 2015-2018 |
| .profile-row.applied | 2020-2022 |
| .profile-row-name | 2024-2030 |
| .profile-row-kind | 2032-2037 |
| .advanced-footer | 2039-2045 |
| .piano-preview.wide | 2047-2059 |
| .piano-preview.wide::before | 2061-2063 |
| .piano-preview.wide .play-icon | 2065-2071 |
| .piano-preview.wide .play-label | 2073-2075 |
| .instrument-browser-panel | 2077-2092 |
| .instrument-browser-panel.open | 2094-2098 |
| .instrument-browser-panel h3 | 2100-2105 |
| .piano-panel | 2107-2122 |
| .piano-panel.open | 2124-2128 |
| .piano-panel h3 | 2130-2135 |
| .piano-options | 2137-2140 |
| .piano-option | 2142-2154 |
| .piano-option.active | 2156-2159 |
| .piano-option:focus-visible | 2161-2163 |
| .piano-info | 2165-2168 |
| .piano-name | 2170-2173 |
| .piano-desc | 2175-2178 |
| .piano-option.simple .piano-name | 2180-2184 |
| .piano-option.simple .piano-desc | 2186-2190 |
| .piano-preview | 2192-2207 |
| .piano-preview::before | 2209-2217 |
| .piano-preview:active | 2219-2222 |
| .piano-preview.main | 2224-2228 |
| .settings-grid input[type="range"], .advanced-panel input[type="range"], .options-... | 2232-2236 |
| .settings-grid input[type="range"]::-webkit-slider-runnable-track, .advanced-panel... | 2240-2245 |
| .settings-grid input[type="range"]::-webkit-slider-thumb, .advanced-panel input[ty... | 2249-2258 |
| .settings-grid input[type="range"]:focus-visible::-webkit-slider-thumb, .advanced-... | 2262-2265 |
| .settings-grid input[type="range"]::-moz-range-track, .advanced-panel input[type="... | 2269-2274 |
| .settings-grid input[type="range"]::-moz-range-thumb, .advanced-panel input[type="... | 2278-2285 |
| .settings-grid input[type="range"]:focus-visible::-moz-range-thumb, .advanced-pane... | 2289-2292 |
| .volume-value | 2294-2297 |
| .status-row | 2299-2304 |
| .switch | 2306-2315 |
| .switch input | 2317-2322 |
| .switch-track | 2324-2330 |
| .switch-thumb | 2332-2342 |
| .switch input:checked + .switch-track | 2344-2346 |
| .switch input:checked + .switch-track .switch-thumb | 2348-2350 |
| .switch input:focus-visible + .switch-track | 2352-2355 |
| .control.compact .unit | 2357-2359 |
| .test-tone | 2361-2373 |
| .test-tone:hover | 2375-2378 |
| .test-tone:active | 2380-2382 |
| .test-tone-icon | 2384-2391 |
| .test-tone-label | 2393-2397 |
| .result | 2399-2403 |
| .reveal | 2405-2414 |
| .reveal strong | 2416-2418 |
| .reveal-label | 2420-2427 |
| .reveal-grid.compact | 2429-2433 |
| .reveal-cell | 2435-2437 |
| .keyboard-zone | 2439-2449 |
| .keyboard-stack | 2451-2461 |
| .keyboard-wrapper | 2463-2472 |
| .keyboard | 2474-2481 |
| .keyboard-wrapper.ends-black | 2483-2485 |
| .white-keys | 2487-2490 |
| .black-keys | 2492-2499 |
| .key | 2501-2512 |
| .key.white | 2514-2521 |
| .key.white.has-black | 2523-2525 |
| .key.black | 2527-2536 |
| .key span | 2538-2542 |
| .key.black span | 2544-2548 |
| .key.active | 2550-2553 |
| .key.black.active | 2555-2558 |
| .key.selected | 2560-2564 |
| .key.typed-preview | 2566-2568 |
| .key.correct | 2570-2574 |
| .key.wrong | 2576-2580 |
| .key.missed | 2582-2588 |
| .key.black.selected, .key.black.correct, .key.black.wrong | 2592-2594 |
| .key.black.missed | 2596-2602 |
| .keyboard.disabled | 2604-2610 |
| body.tutorial-open .keyboard | 2612-2614 |
| body.tutorial-open .keyboard.disabled | 2616-2619 |
| .keyboard.disabled::before | 2621-2633 |
| body.tutorial-open .keyboard.disabled::before | 2635-2637 |
| .keyboard.disabled::after | 2639-2673 |
| body.tutorial-open .keyboard.disabled::after | 2675-2677 |
| .tips | 2679-2688 |
| #pedal-tip[hidden] | 2690-2692 |
| .pedal-box | 2694-2708 |
| body.landing .pedal-box | 2710-2712 |
| .pedal-label | 2714-2724 |
| .pedal-icon | 2726-2733 |
| .pedal-icon.active | 2735-2738 |
| .note-pills | 2740-2746 |
| .note-pill | 2748-2754 |
| .note-pill.good | 2756-2760 |
| .note-pill.bad | 2762-2766 |
| .note-pill.missed | 2768-2772 |
| .note-pill.neutral | 2774-2778 |
| @media (max-width: 700px) | 2780-2835 |
| @media (max-height: 820px) | 2837-2858 |
| @media (max-height: 700px) | 2860-2865 |

## Documentation + Tooling Maps
### README.md
File: README.md (1-135)
| Heading | Line |
|---|---:|
| TheEarLab | 1 |
| Read First | 5 |
| Project Layout | 29 |
| Run Locally | 47 |
| SF2 Behavior | 61 |
| Chord Training Modes | 84 |
| Maintenance Rules | 126 |
| Verification | 133 |

### IMPLEMENTATION_CHECKLIST.md
File: IMPLEMENTATION_CHECKLIST.md (1-227)
| Heading | Line |
|---|---:|
| TheEarLab Implementation Checklist | 1 |
| Ground Rules | 6 |
| Recently Completed (2026-03-09) | 16 |
| Phase 0: Safety Net and Baseline | 31 |
| Phase 2: Core Architecture Refactor | 35 |
| Phase 3: Settings UX Redesign (Keep Floating Panels) | 39 |
| Phase 4: Difficulty, Filtering, and Custom Practice Modes | 54 |
| Phase 5: Adaptive Training Engine | 96 |
| Phase 6: Stats and Insight Dashboard | 124 |
| Phase 7: MIDI Keyboard Input (Low Latency, Multi-Key) | 150 |
| Phase 8: Soundfont Package Management and Local Import | 173 |
| Phase 9: Stabilization and Release Gate | 195 |
| Execution Order Recommendation (Do Not Skip) | 218 |

### AGENTS.md
File: AGENTS.md (1-47)
| Heading | Line |
|---|---:|
| Agent Instructions (Project Local) | 1 |
| Priority Order | 5 |
| Source of Truth | 12 |
| Required Update Workflow | 36 |
| Documentation Quality Bar | 44 |

### tools/generate-project-map.ps1
File: tools/generate-project-map.ps1 (1-540)
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

### tools/smoke-checklist.md
File: tools/smoke-checklist.md (1-59)
| Heading | Line |
|---|---:|
| TheEarLab Smoke Checklist (<=10 Minutes) | 1 |
| Setup (1 minute) | 5 |
| Core Flow (3 minutes) | 11 |
| Chord Flow (2 minutes) | 19 |
| Replay + Blind Rules (1 minute) | 29 |
| Settings Stress (1 minute) | 36 |
| Tutorial + Panel Basics (1 minute) | 43 |
| SF2 Sanity (1 minute) | 50 |
| Exit Criteria | 55 |


## JavaScript Maps
### js/audio.js (Active Runtime)
File lines: 1-1529

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
| playNotes | 1306-1359 |
| playNotesNow | 1361-1364 |
| clearPreviewTimers | 1366-1369 |
| stopPreviewPlayback | 1371-1397 |
| schedulePreviewEvent | 1399-1405 |
| previewNoteOn | 1407-1418 |
| previewNoteOff | 1420-1429 |
| previewPedalOn | 1431-1450 |
| activate | 1435-1440 |
| previewPedalOff | 1452-1466 |
| buildPreviewSequence | 1468-1512 |

Event bindings:
| Target | Event | Line |
|---|---|---:|
| source | ended | 1222 |

### js/core.js (Active Runtime)
File lines: 1-1013

| Symbol | Lines |
|---|---|
| normalizePracticeProfile | 388-408 |
| normalizePracticeProfiles | 409-416 |
| isTypingOnlyModeFromState | 420-420 |
| getEffectiveBlindModeFromState | 424-424 |
| getEffectivePracticeModeFromState | 425-433 |
| capturePracticeProfileFromState | 434-455 |
| clampEnvelopeValue | 554-554 |
| resolveEnvelopeMetrics | 567-602 |
| saveSettings | 616-646 |
| loadSettings | 648-702 |
| resetAllSettings | 704-736 |
| buildNotes | 784-799 |
| getNoteIdByMidi | 801-808 |
| isConsonant | 826-829 |
| getNicePool | 831-831 |
| getNoteCountMax | 833-837 |
| updateNoteCountMax | 839-847 |
| getCssNumber | 849-849 |
| clamp | 850-850 |
| getMaxStartMidi | 851-851 |
| clampStartMidi | 852-852 |
| getMidiLabel | 853-857 |
| getPanelBottomGap | 858-861 |
| normalizeSoundfontDefinition | 863-881 |
| setSoundfontCatalog | 883-904 |
| getSoundfontList | 906-906 |
| renderPianoOptions | 908-952 |
| createKey | 954-965 |
| renderKeyboard | 967-999 |
| rebuildKeyboard | 1001-1012 |

### js/events.js (Active Runtime)
File lines: 1-1771

| Symbol | Lines |
|---|---|
| primeAudioFromGesture | 5-14 |
| shouldRestartRoundForSetting | 27-30 |
| patchSettingsState | 32-38 |
| isChordTutorialOpen | 562-562 |
| fitTutorialLayout | 565-593 |
| clearFitClasses | 571-574 |
| applyFitClass | 576-581 |
| getTutorialStep | 595-600 |
| getStepUnlockedRootSet | 602-610 |
| getStepUnlockedQualitySet | 612-618 |
| isTutorialRootEnabled | 620-620 |
| isTutorialQualityEnabled | 621-621 |
| getTutorialRootLabel | 623-626 |
| midiToTutorialLabel | 628-632 |
| getClosestNoteIdFromMidi | 634-641 |
| getTutorialRenderedChord | 643-665 |
| ensureTutorialKeyboard | 667-705 |
| getStepAllowedQualityIds | 707-709 |
| getTutorialActiveSpec | 711-713 |
| renderTutorialCurrentText | 715-726 |
| renderTutorialPianoHighlight | 728-762 |
| renderTutorialRootOptions | 764-782 |
| renderTutorialQualityOptions | 784-829 |
| syncTutorialRootChipStates | 831-850 |
| syncTutorialQualityChipStates | 852-871 |
| setTutorialHoverSpec | 873-880 |
| clearTutorialHoverSpec | 882-885 |
| refreshTutorialVisuals | 887-891 |
| renderChordTutorialStep | 921-976 |
| closeChordTutorial | 978-988 |
| openChordTutorial | 990-1007 |
| registerTutorialOpenTrigger | 1009-1016 |
| isChordTypingCaptureActive | 1139-1144 |
| insertTypedCharacter | 1146-1153 |
| triggerPrimaryAction | 1156-1165 |
| getButtonLikeTarget | 1168-1168 |
| blurPointerActivatedControl | 1169-1176 |
| ensureCustomCursorEl | 1186-1203 |
| getCustomCursorMode | 1204-1213 |
| renderCustomCursor | 1221-1229 |
| scheduleCustomCursorRender | 1230-1233 |
| setCustomCursorEnabled | 1234-1247 |
| updateCustomCursorPosition | 1248-1255 |
| triggerReplayAction | 1257-1263 |
| bindPianoOptionEvents | 1423-1448 |
| applyCustomCursorMediaState | 1566-1568 |
| setRandomBackgroundAngle | 1724-1727 |
| init | 1729-1765 |
| runDeferredCatalogLoad | 1749-1758 |

Event bindings:
| Target | Event | Line |
|---|---|---:|
| document | pointerdown | 16 |
| document | keydown | 17 |
| document | touchstart | 18 |
| noteCountInput | input | 67 |
| noteCountInput | change | 74 |
| noteCountInput | pointerup | 78 |
| button | click | 83 |
| button | click | 98 |
| blindToggle | change | 106 |
| hideLivePreviewToggle | change | 115 |
| niceNotesToggle | change | 124 |
| chordRoundsToggle | change | 140 |
| practiceModeSelect | change | 146 |
| trainingModeSelect | change | 153 |
| chordDifficultySelect | change | 168 |
| chordExtraHelpersToggle | change | 184 |
| chordRootHintToggle | change | 194 |
| typingShowPianoToggle | change | 204 |
| typingShowTypedToggle | change | 214 |
| resetSettingsButton | click | 226 |
| settingsToggle | click | 240 |
| themeToggle | click | 249 |
| homeToggle | click | 260 |
| settingsPanel | click | 269 |
| optionsTrigger | click | 292 |
| optionsPanel | click | 299 |
| document | click | 304 |
| window | resize | 308 |
| playSelectedButton | click | 318 |
| playSelectedButton | pointerdown | 322 |
| playSelectedButton | pointerup | 327 |
| playSelectedButton | pointerleave | 331 |
| primaryActionButton | click | 335 |
| volumeSlider | input | 343 |
| lengthSlider | input | 349 |
| attackSlider | input | 355 |
| decaySlider | input | 361 |
| releaseSlider | input | 367 |
| sustainSlider | input | 373 |
| keyCountSlider | input | 379 |
| keyCountSlider | change | 386 |
| keyCountSlider | pointerup | 390 |
| hintButton | click | 394 |
| chordAnswerInput | input | 399 |
| chordAnswerInput | keydown | 406 |
| triggerEl | click | 1011 |
| chordTutorialClose | click | 1022 |
| chordTutorialBackdrop | click | 1029 |
| chordTutorialPrev | click | 1035 |
| chordTutorialNext | click | 1043 |
| chordTutorialRootList | mouseover | 1055 |
| chordTutorialRootList | mouseleave | 1063 |
| chordTutorialRootList | focusin | 1066 |
| chordTutorialRootList | focusout | 1074 |
| chordTutorialRootList | click | 1077 |
| chordTutorialQualityList | mouseover | 1093 |
| chordTutorialQualityList | mouseleave | 1100 |
| chordTutorialQualityList | focusin | 1103 |
| chordTutorialQualityList | focusout | 1110 |
| chordTutorialQualityList | click | 1113 |
| volumeSlider | dblclick | 1265 |
| lengthSlider | dblclick | 1269 |
| keyCountSlider | dblclick | 1273 |
| startNoteDownButton | click | 1279 |
| startNoteUpButton | click | 1282 |
| startNoteDownOctButton | click | 1288 |
| startNoteUpOctButton | click | 1291 |
| noteCountInput | dblclick | 1296 |
| attackSlider | dblclick | 1304 |
| decaySlider | dblclick | 1308 |
| releaseSlider | dblclick | 1312 |
| sustainSlider | dblclick | 1316 |
| profileSearch | input | 1321 |
| profileList | click | 1327 |
| profileList | dblclick | 1332 |
| profileList | keydown | 1335 |
| profileApply | click | 1346 |
| profileSave | click | 1352 |
| instrumentPresetSearch | input | 1358 |
| instrumentPresetList | click | 1364 |
| instrumentPresetList | dblclick | 1369 |
| instrumentPresetList | keydown | 1372 |
| instrumentPresetApply | click | 1383 |
| advancedTrigger | click | 1388 |
| advancedPanel | click | 1393 |
| pianoTrigger | click | 1398 |
| pianoPanel | click | 1405 |
| instrumentBrowserTrigger | click | 1411 |
| instrumentBrowserPanel | click | 1418 |
| pianoOptionsContainer | click | 1426 |
| pianoOptionsContainer | keydown | 1440 |
| pianoPreviewMain | click | 1451 |
| testEnvelopeButton | click | 1458 |
| keyboardEl | pointerdown | 1463 |
| document | pointerup | 1499 |
| document | pointercancel | 1506 |
| document | pointerdown | 1513 |
| document | click | 1519 |
| document | pointermove | 1523 |
| document | pointerup | 1527 |
| document | pointercancel | 1532 |
| document | pointerover | 1537 |
| document | pointerout | 1543 |
| window | blur | 1552 |
| document | visibilitychange | 1558 |
| CUSTOM_CURSOR_QUERY | change | 1570 |
| keyboardEl | click | 1576 |
| document | keydown | 1580 |
| document | keyup | 1672 |
| pedalBox | pointerdown | 1691 |
| pedalBox | pointerup | 1700 |
| pedalBox | pointercancel | 1709 |
| pedalBox | pointerleave | 1717 |

### js/game.js (Active Runtime)
File lines: 1-2048

| Symbol | Lines |
|---|---|
| applyRoundStatePatch | 137-146 |
| applySubmissionStatePatch | 148-157 |
| normalizeQualityToken | 159-176 |
| getKeyboardZoneEl | 211-211 |
| normalizePitchClass | 212-212 |
| getRootName | 213-213 |
| getMidiFromNoteId | 214-214 |
| buildChordLabel | 215-215 |
| getPitchClassSetFromNoteIds | 217-225 |
| getRootGuideNoteId | 231-246 |
| getEffectiveKeyboardSelection | 248-260 |
| getChordDifficultyId | 262-267 |
| getChordDifficultyConfig | 269-272 |
| getAllowedChordQualities | 274-279 |
| getChordQualityHint | 281-284 |
| getConsistentPreviewDuration | 292-295 |
| playConsistentPreview | 301-319 |
| releaseInteractivePressSession | 356-384 |
| getReplayNoteIds | 386-410 |
| getVoicingHintLabel | 412-416 |
| randomSample | 418-425 |
| getNiceTarget | 427-464 |
| getQualityPitchClassSet | 466-472 |
| parseChordInput | 474-513 |
| detectChordFromNoteIds | 515-551 |
| normalizeIntervals | 553-555 |
| fitIntervalsToAvailableRange | 557-577 |
| buildVoicedIntervals | 579-607 |
| chooseRootCandidatesForIntervals | 609-618 |
| buildChordFromRoot | 620-648 |
| createChordTarget | 650-700 |
| createNoteTarget | 702-737 |
| createTarget | 739-746 |
| clearTypingAutoNext | 748-752 |
| ensureRoundPlaybackReady | 763-780 |
| getTypedPreviewNoteIds | 782-816 |
| updateTypedPreviewFromInput | 818-831 |
| updateChordReadout | 833-889 |
| updateModeVisibility | 891-908 |
| updatePrimaryAction | 910-915 |
| updateReplayAvailability | 917-924 |
| getChordHelperHints | 926-944 |
| createDeterministicHelperMask | 962-990 |
| renderChordHelperBox | 992-1010 |
| updateStatus | 1012-1121 |
| updateKeyStates | 1123-1184 |
| setKeyboardEnabled | 1186-1189 |
| updateKeyboardScale | 1191-1202 |
| lockKeyboardForPlayback | 1204-1217 |
| setSubmitted | 1219-1226 |
| goHome | 1228-1280 |
| refreshTarget | 1282-1308 |
| startRound | 1310-1386 |
| ensureRound | 1388-1397 |
| playTarget | 1399-1413 |
| startManualNote | 1415-1433 |
| releaseManualNote | 1435-1443 |
| releasePedalNotes | 1445-1455 |
| startPedalHold | 1457-1463 |
| stopPedalHold | 1465-1472 |
| toggleSelection | 1474-1518 |
| isSelectionCorrect | 1520-1537 |
| getPlaybackSpan | 1539-1544 |
| renderNotePills | 1546-1552 |
| renderChordPill | 1554-1557 |
| renderTonePills | 1559-1567 |
| renderRevealCell | 1569-1572 |
| renderChordRevealGrid | 1574-1577 |
| renderChordDetectionMeta | 1579-1583 |
| renderPressedPills | 1585-1590 |
| buildNoteComparison | 1592-1599 |
| buildAnswerNoteCell | 1601-1609 |
| buildTargetNoteCell | 1611-1623 |
| getSubmittedReplaySnapshot | 1653-1667 |
| playSubmittedReplaySequence | 1669-1682 |
| playRevealSequence | 1684-1734 |
| playSelectedChord | 1736-1760 |
| playTypedInputChord | 1762-1775 |
| startHeldPlayback | 1777-1803 |
| releaseHeldPlayback | 1805-1819 |
| buildTypingRevealDetail | 1821-1839 |
| submitTypedAnswer | 1841-1914 |
| submitAnswer | 1916-1979 |
| sanitizeRoundStateForKeyboardRange | 1981-2021 |

### js/settings.js (Active Runtime)
File lines: 1-1247

| Symbol | Lines |
|---|---|
| applySettingsStatePatch | 11-20 |
| clampNoteCount | 73-79 |
| clampTrim | 81-81 |
| clampMetricValue | 94-94 |
| trimToSliderValue | 95-95 |
| sliderToTrim | 96-100 |
| formatSeconds | 101-101 |
| formatHold | 102-102 |
| formatProgramId | 103-103 |
| formatBankId | 104-104 |
| getSf2PresetGroupName | 111-117 |
| getBaseEnvelope | 122-134 |
| resolveSettingsEnvelopeMetrics | 136-152 |
| sanitizeCustomProfile | 162-177 |
| normalizeCustomProfiles | 179-194 |
| getAllProfiles | 196-208 |
| getProfileById | 210-214 |
| setGhostMarker | 216-221 |
| clearGhostMarker | 223-226 |
| updateGhostMarkers | 228-241 |
| syncDirtyFromApplied | 243-250 |
| applyAdsrTrimUi | 252-275 |
| clearPendingCriticalRestart | 277-283 |
| updateInstrumentPresetMeta | 285-315 |
| renderInstrumentPresetBrowser | 317-378 |
| refreshInstrumentPresetBrowser | 380-390 |
| setInstrumentPresetSelection | 392-396 |
| updateProfileMeta | 398-425 |
| renderResponseProfileBrowser | 427-473 |
| refreshResponseProfileBrowser | 475-489 |
| setResponseProfileSelection | 491-495 |
| applyResponseProfileById | 497-508 |
| applyResponseProfileSelection | 510-513 |
| saveCurrentResponseProfile | 515-537 |
| promptSaveCurrentResponseProfile | 539-543 |
| discardManualProfileChanges | 545-557 |
| resetAdsrTrim | 559-561 |
| resolveInstrumentSwitchProfileAction | 563-590 |
| applyInstrumentPresetSelection | 592-598 |
| setVolume | 600-610 |
| setPianoTone | 612-667 |
| setNoteLength | 669-678 |
| setAdsrTrim | 680-691 |
| playPianoPreview | 693-716 |
| setKeyCount | 718-736 |
| setStartMidi | 738-747 |
| setKeyCountVisual | 749-753 |
| refreshOptionsModeVisibility | 762-791 |
| setPracticeMode | 793-878 |
| applyUiFromState | 880-944 |
| commitCriticalChange | 951-956 |
| commitNoteCountChange | 958-967 |
| handleCriticalSettingChange | 969-983 |
| openSettings | 985-990 |
| positionFloatingPanel | 992-1021 |
| positionOptionsPanel | 1023-1026 |
| positionPianoPanel | 1028-1031 |
| positionInstrumentBrowserPanel | 1033-1036 |
| getFloatingPanelConfig | 1041-1079 |
| isFloatingPanelOpen | 1081-1084 |
| setFloatingPanelOpenState | 1086-1091 |
| closeFloatingPanel | 1097-1110 |
| closeAllFloatingPanels | 1112-1118 |
| openFloatingPanel | 1120-1145 |
| toggleFloatingPanel | 1147-1152 |
| repositionOpenFloatingPanels | 1154-1162 |
| openOptionsPanel | 1164-1164 |
| closeOptionsPanel | 1165-1165 |
| openAdvanced | 1166-1166 |
| closeAdvanced | 1167-1167 |
| openPianoPanel | 1168-1168 |
| closePianoPanel | 1169-1169 |
| openInstrumentBrowser | 1170-1170 |
| closeInstrumentBrowser | 1171-1171 |
| closeSettings | 1173-1191 |

## Maintenance Notes
- js/app.*.js is an older branch snapshot. Keep it for reference unless explicitly retired.
- Functional edits should target loaded scripts first: core.js, audio.js, game.js, settings.js, events.js.
- If you intentionally switch runtime scripts, update script tags in index.html and regenerate this file.
- After verification, commit and push the updated files when repository remotes are configured.

