# Project Map

Generated: 2026-03-10 11:07:30 +01:00

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
| index.html | HTML | Loaded directly | Yes | 546 |
| styles.css | CSS | Loaded directly | Yes | 3008 |
| js/audio.js | JavaScript | Browser runtime module | Yes | 1529 |
| js/core.js | JavaScript | Browser runtime module | Yes | 1037 |
| js/events.js | JavaScript | Browser runtime module | Yes | 1955 |
| js/game.js | JavaScript | Browser runtime module | Yes | 2048 |
| js/settings.js | JavaScript | Browser runtime module | Yes | 1418 |
| README.md | Markdown | Human + AI onboarding | Yes | 135 |
| IMPLEMENTATION_CHECKLIST.md | Markdown | Implementation roadmap checklist | Yes | 237 |
| AGENTS.md | Markdown | AI instruction override | Yes | 47 |
| PROJECT_MAP.md | Markdown | Generated reference map | Yes | 1149 |
| tools/generate-project-map.ps1 | PowerShell | Documentation generator | Yes | 540 |
| tools/smoke-checklist.md | Markdown | Manual regression checklist | Yes | 59 |
| soundfonts/GeneralUser-GS.sf2 | Asset | Soundfont asset | Yes | 0 |
| soundfonts/index.json | JSON | Soundfont asset | Yes | 3 |
| soundfonts/README.md | Markdown | Soundfont asset | Yes | 39 |

## index.html Map
File: index.html (1-546)

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
| game-settings-modal | <section> | 202 |
| game-settings-backdrop | <button> | 203 |
| game-settings-title | <h4> | 208 |
| game-settings-close | <button> | 210 |
| practice-mode | <select> | 219 |
| note-count | <input> | 230 |
| note-count-value | <span> | 231 |
| nice-notes | <input> | 239 |
| chord-rounds | <input> | 252 |
| training-mode | <select> | 277 |
| chord-difficulty | <select> | 292 |
| chord-extra-helpers | <input> | 305 |
| chord-root-hint | <input> | 318 |
| chord-tutorial-open-options | <button> | 330 |
| blind-mode | <input> | 343 |
| hide-live-preview | <input> | 356 |
| typing-show-piano | <input> | 369 |
| typing-show-typed | <input> | 382 |
| primary-action | <button> | 404 |
| play-selected | <button> | 405 |
| quick-start | <section> | 408 |
| keyboard | <div> | 426 |
| white-keys | <div> | 427 |
| black-keys | <div> | 428 |
| pedal-icon | <div> | 433 |
| chord-readout | <section> | 438 |
| typing-zone | <section> | 439 |
| chord-answer | <input> | 443 |
| typing-help-toggle | <button> | 444 |
| status-panel | <section> | 450 |
| round-count | <span> | 452 |
| selected-list | <span> | 453 |
| goal-count | <span> | 454 |
| mode-label | <span> | 455 |
| game-settings-open | <button> | 458 |
| hint-button | <button> | 459 |
| result | <div> | 461 |
| helper-slot | <div> | 462 |
| reveal | <div> | 463 |
| hint-flag | <div> | 464 |
| pedal-tip | <span> | 470 |
| chord-tutorial-modal | <section> | 474 |
| chord-tutorial-backdrop | <button> | 475 |
| chord-tutorial-title | <h4> | 478 |
| chord-tutorial-close | <button> | 479 |
| chord-tutorial-step | <div> | 481 |
| chord-tutorial-current | <div> | 483 |
| chord-tutorial-piano | <div> | 486 |
| tutorial-row-root | <div> | 489 |
| chord-tutorial-root-list | <div> | 491 |
| tutorial-row-quality | <div> | 493 |
| chord-tutorial-quality-list | <div> | 495 |
| chord-tutorial-prev | <button> | 500 |
| chord-tutorial-progress | <span> | 501 |
| chord-tutorial-next | <button> | 502 |
| app-dialog | <section> | 507 |
| app-dialog-backdrop | <button> | 508 |
| app-dialog-title | <h4> | 511 |
| app-dialog-close | <button> | 512 |
| app-dialog-body | <div> | 514 |
| app-dialog-input | <input> | 517 |
| app-dialog-cancel | <button> | 520 |
| app-dialog-confirm | <button> | 521 |

### Script Load Order
| Order | Script | Line |
|---:|---|---:|
| 1 | vendor/libfluidsynth-2.4.6.js?v=20260310104635 | 526 |
| 2 | vendor/js-synthesizer.min.js?v=20260310104635 | 527 |
| 3 | js/core.js?v=20260310104635 | 528 |
| 4 | js/store/reducers.js?v=20260310104635 | 529 |
| 5 | js/store/actions.js?v=20260310104635 | 530 |
| 6 | js/store/selectors.js?v=20260310104635 | 531 |
| 7 | js/store/store.js?v=20260310104635 | 532 |
| 8 | js/features/round/state-mutations.js?v=20260310104635 | 533 |
| 9 | js/features/settings/state-mutations.js?v=20260310104635 | 534 |
| 10 | js/features/chords/index.js?v=20260310104635 | 535 |
| 11 | js/features/typing/index.js?v=20260310104635 | 536 |
| 12 | js/features/tutorial/index.js?v=20260310104635 | 537 |
| 13 | js/features/audio-preview/index.js?v=20260310104635 | 538 |
| 14 | js/features/input/index.js?v=20260310104635 | 539 |
| 15 | js/audio.js?v=20260310104635 | 540 |
| 16 | js/game.js?v=20260310104635 | 541 |
| 17 | js/settings.js?v=20260310104635 | 542 |
| 18 | js/events.js?v=20260310104635 | 543 |

## styles.css Map
File: styles.css (1-3008)

### Top-Level CSS Blocks
| Selector | Lines |
|---|---|
| :root | 3-123 |
| body.theme-dark | 125-213 |
| * | 215-217 |
| body | 219-231 |
| body.landing | 233-235 |
| .app | 237-253 |
| .app>section, .app>header, .app>footer | 257-259 |
| .hero | 261-265 |
| .badge | 267-280 |
| h1 | 282-286 |
| .hero p | 288-294 |
| body:not(.landing) .hero h1, body:not(.landing) .hero p | 297-299 |
| body:not(.landing) .tips | 301-303 |
| .hero, .actions, .quick-start, .game-stack, .tips | 309-312 |
| body:not(.landing) .hero | 314-318 |
| .control | 320-326 |
| .control.compact | 328-330 |
| .control.compact>label | 332-334 |
| .control.compact .control-row | 336-338 |
| .control>label | 340-347 |
| .control-row | 349-353 |
| .control-row.toggle-row | 355-358 |
| .control-row.toggle-row .switch | 360-362 |
| .control-row.toggle-row .unit | 364-366 |
| .control-row.align-end | 368-371 |
| .start-note-row | 373-375 |
| .start-note-stepper | 377-387 |
| .start-note-value | 389-395 |
| .step-btn | 397-409 |
| .step-btn.oct | 411-417 |
| .step-btn:hover | 419-422 |
| .advanced-test | 424-427 |
| .advanced-test .unit | 429-432 |
| input[type="number"] | 434-443 |
| .segmented | 445-449 |
| .segmented-btn | 451-460 |
| .segmented-btn.active | 462-466 |
| .actions | 468-474 |
| .quick-start | 476-482 |
| .quick-mode-btn | 484-497 |
| .quick-mode-btn:hover, .quick-mode-btn:focus-visible | 500-505 |
| .quick-mode-title | 507-513 |
| .quick-mode-sub | 515-519 |
| body:not(.landing) .quick-start | 521-523 |
| .btn | 525-532 |
| .btn:focus-visible | 534-537 |
| .btn.primary | 539-543 |
| .btn.secondary | 545-549 |
| .btn.ghost | 551-555 |
| .btn.submit | 557-561 |
| .btn:hover | 563-565 |
| .chord-readout | 567-586 |
| .chord-readout[hidden] | 588-590 |
| .typing-zone | 592-603 |
| .game-stack | 605-610 |
| .typing-zone label | 612-619 |
| .typing-zone input[type="text"] | 621-633 |
| .typing-zone input[type="text"]::placeholder | 635-638 |
| .typing-row | 640-643 |
| .typing-input-wrap | 645-647 |
| .typing-help-toggle | 649-666 |
| .typing-help-toggle:hover | 668-671 |
| .typing-help-toggle:focus-visible | 673-676 |
| .typing-help-text | 678-684 |
| .typing-help-text strong | 686-688 |
| .typing-help-actions | 690-692 |
| .typing-learn-btn | 694-704 |
| .typing-learn-btn:hover | 706-708 |
| .typing-learn-btn:focus-visible | 710-713 |
| body.modal-open | 715-717 |
| .tutorial-modal | 719-726 |
| .tutorial-modal[hidden] | 728-730 |
| .tutorial-backdrop | 732-738 |
| .tutorial-card | 740-753 |
| .game-settings-modal | 755-762 |
| .game-settings-modal[hidden] | 764-766 |
| .game-settings-card | 768-780 |
| .game-settings-head | 782-787 |
| .game-settings-kicker | 789-794 |
| .game-settings-grid | 796-800 |
| .game-settings-group | 802-809 |
| .game-settings-group-title | 811-815 |
| .game-settings-group-body | 817-820 |
| .app-dialog | 822-829 |
| .app-dialog[hidden] | 831-833 |
| .app-dialog-card | 835-845 |
| .app-dialog-head | 847-852 |
| .app-dialog-body | 854-858 |
| .app-dialog-input-row | 860-863 |
| .app-dialog-input-row input | 865-872 |
| .app-dialog-actions | 874-878 |
| .tutorial-card.tutorial-overflow-scroll | 880-883 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-step | 885-891 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-lab | 893-900 |
| .tutorial-card.tutorial-fit-1 | 902-905 |
| .tutorial-card.tutorial-fit-1 .tutorial-step | 907-910 |
| .tutorial-card.tutorial-fit-1 .tutorial-lab | 912-915 |
| .tutorial-card.tutorial-fit-1 .tutorial-chip | 917-920 |
| .tutorial-card.tutorial-fit-1 .tutorial-quality-table th | 922-924 |
| .tutorial-card.tutorial-fit-1 .tutorial-piano | 926-931 |
| .tutorial-card.tutorial-fit-2 | 933-936 |
| .tutorial-card.tutorial-fit-2 .tutorial-head h4 | 938-940 |
| .tutorial-card.tutorial-fit-2 .tutorial-step | 942-945 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-title | 947-949 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-body | 951-954 |
| .tutorial-card.tutorial-fit-2 .tutorial-lab | 956-959 |
| .tutorial-card.tutorial-fit-2 .tutorial-current | 961-963 |
| .tutorial-card.tutorial-fit-2 .tutorial-selector-title | 965-967 |
| .tutorial-card.tutorial-fit-2 .tutorial-chip | 969-972 |
| .tutorial-card.tutorial-fit-2 .tutorial-quality-table th | 974-977 |
| .tutorial-card.tutorial-fit-2 .tutorial-piano | 979-984 |
| .tutorial-card.tutorial-fit-2 .tutorial-actions .advanced-trigger | 986-989 |
| .tutorial-card.tutorial-fit-3 | 991-994 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-kicker | 996-998 |
| .tutorial-card.tutorial-fit-3 .tutorial-step | 1000-1003 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-title | 1005-1007 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-body | 1009-1012 |
| .tutorial-card.tutorial-fit-3 .tutorial-lab | 1014-1017 |
| .tutorial-card.tutorial-fit-3 .tutorial-current | 1019-1021 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano-title | 1023-1026 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th | 1028-1031 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th, .tutorial-card.tutorial-... | 1034-1036 |
| .tutorial-card.tutorial-fit-3 .tutorial-chip | 1038-1041 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano | 1043-1048 |
| .tutorial-card.tutorial-fit-3 .tutorial-actions .advanced-trigger | 1050-1053 |
| .tutorial-card.tutorial-fit-3 .tutorial-progress | 1055-1057 |
| .tutorial-head | 1059-1064 |
| .tutorial-head h4 | 1066-1070 |
| .tutorial-close | 1072-1074 |
| .tutorial-step | 1076-1084 |
| .tutorial-step-kicker | 1086-1092 |
| .tutorial-step.focus-flash | 1094-1096 |
| @keyframes tutorial-focus-flash | 1098-1106 |
| .tutorial-step-title | 1108-1111 |
| .tutorial-step-body | 1113-1117 |
| .tutorial-step-body p | 1119-1121 |
| .tutorial-step-body p+p | 1123-1125 |
| .tutorial-example-list | 1127-1132 |
| .tutorial-example-list code | 1134-1140 |
| .tutorial-actions | 1142-1149 |
| .tutorial-progress | 1151-1155 |
| .tutorial-lab | 1157-1166 |
| .tutorial-current | 1168-1172 |
| .tutorial-selector-block | 1174-1177 |
| .tutorial-control-matrix | 1179-1186 |
| .tutorial-control-row | 1188-1196 |
| .tutorial-control-row.locked | 1198-1200 |
| .tutorial-control-row.locked::after | 1202-1209 |
| .tutorial-control-row.newly-unlocked | 1211-1213 |
| @keyframes tutorial-unlock | 1215-1223 |
| .tutorial-selector-title | 1225-1231 |
| .tutorial-chip-list | 1233-1237 |
| #chord-tutorial-quality-list | 1239-1242 |
| .tutorial-quality-table | 1244-1249 |
| .tutorial-quality-table th, .tutorial-quality-table td | 1252-1256 |
| .tutorial-quality-table tr:first-child th, .tutorial-quality-table tr:first-child td | 1259-1261 |
| .tutorial-quality-table th | 1263-1272 |
| .tutorial-chip-group-list | 1274-1278 |
| .tutorial-chip | 1280-1292 |
| .tutorial-chip.unlocked | 1294-1297 |
| .tutorial-chip.unlocked:hover, .tutorial-chip.unlocked:focus-visible | 1300-1303 |
| .tutorial-chip[disabled] | 1305-1309 |
| .tutorial-chip.locked | 1311-1318 |
| .tutorial-chip:hover, .tutorial-chip:focus-visible | 1321-1324 |
| .tutorial-chip.active | 1326-1329 |
| .tutorial-chip.muted | 1331-1334 |
| .tutorial-chip.muted:hover, .tutorial-chip.muted:focus-visible | 1337-1339 |
| .tutorial-chip.newly-unlocked | 1341-1344 |
| .tutorial-chip.locked.newly-unlocked | 1346-1349 |
| .tutorial-piano-wrap | 1351-1356 |
| .tutorial-piano-title | 1358-1365 |
| .tutorial-piano | 1367-1378 |
| .tutorial-key | 1380-1385 |
| .tutorial-key.white | 1387-1395 |
| .tutorial-key.black | 1397-1405 |
| .tutorial-key.tone | 1407-1409 |
| .tutorial-key.tone.root | 1411-1413 |
| .tutorial-key[data-role]::after | 1415-1428 |
| .helper-card | 1430-1437 |
| .helper-title | 1439-1444 |
| .helper-list | 1446-1450 |
| .helper-item | 1452-1463 |
| .helper-item::after | 1465-1473 |
| .helper-item:last-child::after | 1475-1477 |
| .helper-item:hover, .helper-item:focus-within | 1480-1482 |
| @media (hover: hover) and (pointer: fine) | 1484-1490 |
| .app-cursor | 1492-1503 |
| .app-cursor.visible | 1505-1507 |
| .app-cursor-ring, .app-cursor-dot | 1510-1517 |
| .app-cursor-ring | 1519-1527 |
| .app-cursor-dot | 1529-1533 |
| .app-cursor.is-interactive .app-cursor-ring | 1535-1540 |
| .app-cursor.is-interactive .app-cursor-dot | 1542-1544 |
| .app-cursor.is-text .app-cursor-ring | 1546-1551 |
| .app-cursor.is-pressed .app-cursor-ring | 1553-1555 |
| .app-cursor.is-pressed .app-cursor-dot | 1557-1559 |
| .helper-label | 1561-1567 |
| .helper-item .helper-value | 1569-1577 |
| .helper-item .helper-mask | 1579-1587 |
| .helper-item .helper-real | 1589-1601 |
| .helper-item:hover .helper-mask, .helper-item:focus-within .helper-mask | 1604-1607 |
| .helper-item:hover .helper-real, .helper-item:focus-within .helper-real | 1610-1613 |
| .typing-zone[hidden] | 1615-1617 |
| .status | 1619-1630 |
| .status[hidden] | 1632-1634 |
| .helper-slot[hidden] | 1636-1638 |
| .status-actions | 1640-1646 |
| .hint-flag | 1648-1661 |
| .hint-flag[hidden] | 1663-1665 |
| .hint-button | 1667-1669 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) | 1671-1685 |
| .settings-toggle | 1687-1689 |
| .theme-toggle | 1691-1693 |
| .home-toggle | 1695-1697 |
| :is(.settings-toggle, .theme-toggle, .home-toggle):hover | 1699-1701 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) svg | 1703-1707 |
| .settings-toggle svg | 1709-1712 |
| .settings-panel | 1714-1733 |
| .settings-panel.open | 1735-1739 |
| .settings-panel h2 | 1741-1746 |
| .settings-body | 1748-1752 |
| .settings-grid | 1754-1757 |
| .settings-section-title | 1759-1767 |
| .panel-trigger, .advanced-trigger, .dropdown-trigger, .control select | 1772-1781 |
| .advanced-trigger | 1783-1787 |
| .dropdown-trigger | 1789-1797 |
| .dropdown-trigger svg | 1799-1803 |
| .panel-trigger | 1805-1810 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger):hover | 1812-1815 |
| .panel-trigger:hover | 1817-1819 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger)[aria-expanded="true"] | 1821-1824 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger, .control select):focus-v... | 1826-1829 |
| .control select | 1831-1835 |
| .options-panel | 1837-1853 |
| .options-panel.open | 1855-1859 |
| .options-panel h3 | 1861-1868 |
| .options-grid | 1870-1873 |
| .options-panel .control | 1875-1881 |
| .options-panel .control.compact | 1883-1885 |
| .options-panel .control>label | 1887-1889 |
| .options-section-title | 1891-1900 |
| .options-panel .options-section-title:first-child | 1902-1906 |
| .advanced-panel | 1908-1927 |
| .advanced-panel.open | 1929-1933 |
| .advanced-panel h3 | 1935-1940 |
| .advanced-grid | 1942-1951 |
| .advanced-grid::-webkit-scrollbar | 1953-1955 |
| .advanced-grid::-webkit-scrollbar-track | 1957-1960 |
| .advanced-grid::-webkit-scrollbar-thumb | 1962-1966 |
| .inline-value | 1968-1975 |
| .slider-stack | 1977-1980 |
| .slider-stack input[type="range"] | 1982-1986 |
| .slider-ghost | 1988-2002 |
| .slider-ghost.visible | 2004-2006 |
| .sf2-browser | 2008-2011 |
| .sf2-browser input[type="text"] | 2013-2022 |
| .sf2-preset-list | 2024-2037 |
| .sf2-browser .piano-desc | 2039-2042 |
| .sf2-browser .piano-desc.pending, .profile-browser .piano-desc.pending | 2045-2047 |
| .sf2-group | 2049-2054 |
| .sf2-group-title | 2056-2065 |
| .sf2-row | 2067-2075 |
| .sf2-row:first-child | 2077-2079 |
| .sf2-row:hover | 2081-2083 |
| .sf2-row.active | 2085-2088 |
| .sf2-row-name | 2090-2096 |
| .sf2-row-program, .sf2-row-bank | 2099-2103 |
| .sf2-empty | 2105-2109 |
| .profile-browser | 2111-2114 |
| .profile-browser input[type="text"] | 2116-2125 |
| .profile-list | 2127-2140 |
| .profile-row | 2142-2152 |
| .profile-row:hover | 2154-2156 |
| .profile-row.active | 2158-2161 |
| .profile-row.applied | 2163-2165 |
| .profile-row-name | 2167-2173 |
| .profile-row-kind | 2175-2180 |
| .advanced-footer | 2182-2188 |
| .piano-preview.wide | 2190-2202 |
| .piano-preview.wide::before | 2204-2206 |
| .piano-preview.wide .play-icon | 2208-2214 |
| .piano-preview.wide .play-label | 2216-2218 |
| .instrument-browser-panel | 2220-2235 |
| .instrument-browser-panel.open | 2237-2241 |
| .instrument-browser-panel h3 | 2243-2248 |
| .piano-panel | 2250-2265 |
| .piano-panel.open | 2267-2271 |
| .piano-panel h3 | 2273-2278 |
| .piano-options | 2280-2283 |
| .piano-option | 2285-2297 |
| .piano-option.active | 2299-2302 |
| .piano-option:focus-visible | 2304-2306 |
| .piano-info | 2308-2311 |
| .piano-name | 2313-2316 |
| .piano-desc | 2318-2321 |
| .piano-option.simple .piano-name | 2323-2327 |
| .piano-option.simple .piano-desc | 2329-2333 |
| .piano-preview | 2335-2350 |
| .piano-preview::before | 2352-2360 |
| .piano-preview:active | 2362-2365 |
| .piano-preview.main | 2367-2371 |
| .settings-grid input[type="range"], .advanced-panel input[type="range"], .options-... | 2375-2379 |
| .settings-grid input[type="range"]::-webkit-slider-runnable-track, .advanced-panel... | 2383-2388 |
| .settings-grid input[type="range"]::-webkit-slider-thumb, .advanced-panel input[ty... | 2392-2401 |
| .settings-grid input[type="range"]:focus-visible::-webkit-slider-thumb, .advanced-... | 2405-2408 |
| .settings-grid input[type="range"]::-moz-range-track, .advanced-panel input[type="... | 2412-2417 |
| .settings-grid input[type="range"]::-moz-range-thumb, .advanced-panel input[type="... | 2421-2428 |
| .settings-grid input[type="range"]:focus-visible::-moz-range-thumb, .advanced-pane... | 2432-2435 |
| .volume-value | 2437-2440 |
| .status-row | 2442-2447 |
| .switch | 2449-2458 |
| .switch input | 2460-2465 |
| .switch-track | 2467-2473 |
| .switch-thumb | 2475-2485 |
| .switch input:checked+.switch-track | 2487-2489 |
| .switch input:checked+.switch-track .switch-thumb | 2491-2493 |
| .switch input:focus-visible+.switch-track | 2495-2498 |
| .control.compact .unit | 2500-2502 |
| .test-tone | 2504-2516 |
| .test-tone:hover | 2518-2521 |
| .test-tone:active | 2523-2525 |
| .test-tone-icon | 2527-2534 |
| .test-tone-label | 2536-2540 |
| .result | 2542-2546 |
| .reveal | 2548-2557 |
| .reveal strong | 2559-2561 |
| .reveal-label | 2563-2570 |
| .reveal-grid.compact | 2572-2576 |
| .reveal-cell | 2578-2580 |
| .keyboard-zone | 2582-2592 |
| .keyboard-stack | 2594-2604 |
| .keyboard-wrapper | 2606-2615 |
| .keyboard | 2617-2624 |
| .keyboard-wrapper.ends-black | 2626-2628 |
| .white-keys | 2630-2633 |
| .black-keys | 2635-2642 |
| .key | 2644-2655 |
| .key.white | 2657-2664 |
| .key.white.has-black | 2666-2668 |
| .key.black | 2670-2679 |
| .key span | 2681-2685 |
| .key.black span | 2687-2691 |
| .key.active | 2693-2696 |
| .key.black.active | 2698-2701 |
| .key.selected | 2703-2707 |
| .key.typed-preview | 2709-2711 |
| .key.correct | 2713-2717 |
| .key.wrong | 2719-2723 |
| .key.missed | 2725-2731 |
| .key.black.selected, .key.black.correct, .key.black.wrong | 2735-2737 |
| .key.black.missed | 2739-2745 |
| .keyboard.disabled | 2747-2753 |
| body.tutorial-open .keyboard | 2755-2757 |
| body.tutorial-open .keyboard.disabled | 2759-2762 |
| .keyboard.disabled::before | 2764-2776 |
| body.tutorial-open .keyboard.disabled::before | 2778-2780 |
| .keyboard.disabled::after | 2782-2816 |
| body.tutorial-open .keyboard.disabled::after | 2818-2820 |
| .tips | 2822-2831 |
| #pedal-tip[hidden] | 2833-2835 |
| .pedal-box | 2837-2851 |
| body.landing .pedal-box | 2853-2855 |
| .pedal-label | 2857-2867 |
| .pedal-icon | 2869-2876 |
| .pedal-icon.active | 2878-2881 |
| .note-pills | 2883-2889 |
| .note-pill | 2891-2897 |
| .note-pill.good | 2899-2903 |
| .note-pill.bad | 2905-2909 |
| .note-pill.missed | 2911-2915 |
| .note-pill.neutral | 2917-2921 |
| @media (max-width: 700px) | 2923-2978 |
| @media (max-height: 820px) | 2980-3001 |
| @media (max-height: 700px) | 3003-3008 |

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
File: IMPLEMENTATION_CHECKLIST.md (1-237)
| Heading | Line |
|---|---:|
| TheEarLab Implementation Checklist | 1 |
| Ground Rules | 6 |
| Recently Completed (2026-03-09) | 16 |
| Phase 0: Safety Net and Baseline | 31 |
| Phase 2: Core Architecture Refactor | 35 |
| Phase 3: Settings UX Redesign (Keep Floating Panels) | 39 |
| Phase 4: Difficulty, Filtering, and Custom Practice Modes | 64 |
| Phase 5: Adaptive Training Engine | 106 |
| Phase 6: Stats and Insight Dashboard | 134 |
| Phase 7: MIDI Keyboard Input (Low Latency, Multi-Key) | 160 |
| Phase 8: Soundfont Package Management and Local Import | 183 |
| Phase 9: Stabilization and Release Gate | 205 |
| Execution Order Recommendation (Do Not Skip) | 228 |

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
File lines: 1-1037

| Symbol | Lines |
|---|---|
| normalizePracticeProfile | 412-432 |
| normalizePracticeProfiles | 433-440 |
| isTypingOnlyModeFromState | 444-444 |
| getEffectiveBlindModeFromState | 448-448 |
| getEffectivePracticeModeFromState | 449-457 |
| capturePracticeProfileFromState | 458-479 |
| clampEnvelopeValue | 578-578 |
| resolveEnvelopeMetrics | 591-626 |
| saveSettings | 640-670 |
| loadSettings | 672-726 |
| resetAllSettings | 728-760 |
| buildNotes | 808-823 |
| getNoteIdByMidi | 825-832 |
| isConsonant | 850-853 |
| getNicePool | 855-855 |
| getNoteCountMax | 857-861 |
| updateNoteCountMax | 863-871 |
| getCssNumber | 873-873 |
| clamp | 874-874 |
| getMaxStartMidi | 875-875 |
| clampStartMidi | 876-876 |
| getMidiLabel | 877-881 |
| getPanelBottomGap | 882-885 |
| normalizeSoundfontDefinition | 887-905 |
| setSoundfontCatalog | 907-928 |
| getSoundfontList | 930-930 |
| renderPianoOptions | 932-976 |
| createKey | 978-989 |
| renderKeyboard | 991-1023 |
| rebuildKeyboard | 1025-1036 |

### js/events.js (Active Runtime)
File lines: 1-1955

| Symbol | Lines |
|---|---|
| primeAudioFromGesture | 5-14 |
| shouldRestartRoundForSetting | 27-30 |
| patchSettingsState | 32-38 |
| isChordTutorialOpen | 576-576 |
| fitTutorialLayout | 579-607 |
| clearFitClasses | 585-588 |
| applyFitClass | 590-595 |
| getTutorialStep | 609-614 |
| getStepUnlockedRootSet | 616-624 |
| getStepUnlockedQualitySet | 626-632 |
| isTutorialRootEnabled | 634-634 |
| isTutorialQualityEnabled | 635-635 |
| getTutorialRootLabel | 637-640 |
| midiToTutorialLabel | 642-646 |
| getClosestNoteIdFromMidi | 648-655 |
| getTutorialRenderedChord | 657-679 |
| ensureTutorialKeyboard | 681-719 |
| getStepAllowedQualityIds | 721-723 |
| getTutorialActiveSpec | 725-727 |
| renderTutorialCurrentText | 729-740 |
| renderTutorialPianoHighlight | 742-776 |
| renderTutorialRootOptions | 778-796 |
| renderTutorialQualityOptions | 798-843 |
| syncTutorialRootChipStates | 845-864 |
| syncTutorialQualityChipStates | 866-885 |
| setTutorialHoverSpec | 887-894 |
| clearTutorialHoverSpec | 896-899 |
| refreshTutorialVisuals | 901-905 |
| renderChordTutorialStep | 935-990 |
| closeChordTutorial | 992-1005 |
| openChordTutorial | 1007-1032 |
| registerTutorialOpenTrigger | 1034-1041 |
| isChordTypingCaptureActive | 1164-1169 |
| insertTypedCharacter | 1171-1178 |
| triggerPrimaryAction | 1181-1190 |
| getButtonLikeTarget | 1193-1193 |
| blurPointerActivatedControl | 1194-1201 |
| ensureCustomCursorEl | 1211-1228 |
| getCustomCursorMode | 1229-1238 |
| renderCustomCursor | 1246-1254 |
| scheduleCustomCursorRender | 1255-1258 |
| setCustomCursorEnabled | 1259-1272 |
| updateCustomCursorPosition | 1273-1280 |
| triggerReplayAction | 1282-1288 |
| bindPianoOptionEvents | 1448-1473 |
| applyCustomCursorMediaState | 1591-1593 |
| isElementVisible | 1608-1614 |
| getFocusableElements | 1616-1620 |
| focusFirstInModal | 1626-1632 |
| trapModalFocus | 1634-1656 |
| isTextEditableTarget | 1658-1663 |
| getActiveModalEl | 1665-1670 |
| closeGameSettingsModalUi | 1672-1681 |
| openGameSettingsModalUi | 1683-1689 |
| closeActiveModal | 1691-1705 |
| moveFocusInPanel | 1707-1718 |
| setRandomBackgroundAngle | 1908-1911 |
| init | 1913-1949 |
| runDeferredCatalogLoad | 1933-1942 |

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
| optionsTrigger | click | 291 |
| gameSettingsOpen | click | 298 |
| gameSettingsBackdrop | click | 305 |
| gameSettingsClose | click | 312 |
| document | click | 318 |
| window | resize | 322 |
| playSelectedButton | click | 332 |
| playSelectedButton | pointerdown | 336 |
| playSelectedButton | pointerup | 341 |
| playSelectedButton | pointerleave | 345 |
| primaryActionButton | click | 349 |
| volumeSlider | input | 357 |
| lengthSlider | input | 363 |
| attackSlider | input | 369 |
| decaySlider | input | 375 |
| releaseSlider | input | 381 |
| sustainSlider | input | 387 |
| keyCountSlider | input | 393 |
| keyCountSlider | change | 400 |
| keyCountSlider | pointerup | 404 |
| hintButton | click | 408 |
| chordAnswerInput | input | 413 |
| chordAnswerInput | keydown | 420 |
| triggerEl | click | 1036 |
| chordTutorialClose | click | 1047 |
| chordTutorialBackdrop | click | 1054 |
| chordTutorialPrev | click | 1060 |
| chordTutorialNext | click | 1068 |
| chordTutorialRootList | mouseover | 1080 |
| chordTutorialRootList | mouseleave | 1088 |
| chordTutorialRootList | focusin | 1091 |
| chordTutorialRootList | focusout | 1099 |
| chordTutorialRootList | click | 1102 |
| chordTutorialQualityList | mouseover | 1118 |
| chordTutorialQualityList | mouseleave | 1125 |
| chordTutorialQualityList | focusin | 1128 |
| chordTutorialQualityList | focusout | 1135 |
| chordTutorialQualityList | click | 1138 |
| volumeSlider | dblclick | 1290 |
| lengthSlider | dblclick | 1294 |
| keyCountSlider | dblclick | 1298 |
| startNoteDownButton | click | 1304 |
| startNoteUpButton | click | 1307 |
| startNoteDownOctButton | click | 1313 |
| startNoteUpOctButton | click | 1316 |
| noteCountInput | dblclick | 1321 |
| attackSlider | dblclick | 1329 |
| decaySlider | dblclick | 1333 |
| releaseSlider | dblclick | 1337 |
| sustainSlider | dblclick | 1341 |
| profileSearch | input | 1346 |
| profileList | click | 1352 |
| profileList | dblclick | 1357 |
| profileList | keydown | 1360 |
| profileApply | click | 1371 |
| profileSave | click | 1377 |
| instrumentPresetSearch | input | 1383 |
| instrumentPresetList | click | 1389 |
| instrumentPresetList | dblclick | 1394 |
| instrumentPresetList | keydown | 1397 |
| instrumentPresetApply | click | 1408 |
| advancedTrigger | click | 1413 |
| advancedPanel | click | 1418 |
| pianoTrigger | click | 1423 |
| pianoPanel | click | 1430 |
| instrumentBrowserTrigger | click | 1436 |
| instrumentBrowserPanel | click | 1443 |
| pianoOptionsContainer | click | 1451 |
| pianoOptionsContainer | keydown | 1465 |
| pianoPreviewMain | click | 1476 |
| testEnvelopeButton | click | 1483 |
| keyboardEl | pointerdown | 1488 |
| document | pointerup | 1524 |
| document | pointercancel | 1531 |
| document | pointerdown | 1538 |
| document | click | 1544 |
| document | pointermove | 1548 |
| document | pointerup | 1552 |
| document | pointercancel | 1557 |
| document | pointerover | 1562 |
| document | pointerout | 1568 |
| window | blur | 1577 |
| document | visibilitychange | 1583 |
| CUSTOM_CURSOR_QUERY | change | 1595 |
| keyboardEl | click | 1601 |
| document | keydown | 1720 |
| document | keyup | 1856 |
| pedalBox | pointerdown | 1875 |
| pedalBox | pointerup | 1884 |
| pedalBox | pointercancel | 1893 |
| pedalBox | pointerleave | 1901 |

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
File lines: 1-1418

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
| syncModalOpenClass | 544-551 |
| setAppDialogOpenState | 553-559 |
| openAppDialog | 561-608 |
| closeAppDialog | 610-616 |
| confirmAppDialog | 618-625 |
| cancelAppDialog | 627-630 |
| promptSaveCurrentResponseProfile | 665-678 |
| discardManualProfileChanges | 680-692 |
| resetAdsrTrim | 694-696 |
| resolveInstrumentSwitchProfileAction | 698-731 |
| applyInstrumentPresetSelection | 733-739 |
| setVolume | 741-751 |
| setPianoTone | 753-808 |
| setNoteLength | 810-819 |
| setAdsrTrim | 821-832 |
| playPianoPreview | 834-857 |
| setKeyCount | 859-877 |
| setStartMidi | 879-888 |
| setKeyCountVisual | 890-894 |
| refreshOptionsModeVisibility | 903-925 |
| setPracticeMode | 927-1012 |
| applyUiFromState | 1014-1078 |
| commitCriticalChange | 1085-1090 |
| commitNoteCountChange | 1092-1101 |
| handleCriticalSettingChange | 1103-1117 |
| openSettings | 1119-1124 |
| positionFloatingPanel | 1126-1155 |
| setGameSettingsModalOpenState | 1157-1167 |
| isGameSettingsModalOpenInternal | 1169-1169 |
| openGameSettingsModalInternal | 1171-1182 |
| closeGameSettingsModalInternal | 1184-1192 |
| positionPianoPanel | 1194-1197 |
| positionInstrumentBrowserPanel | 1199-1202 |
| getFloatingPanelConfig | 1207-1239 |
| isFloatingPanelOpen | 1241-1244 |
| setFloatingPanelOpenState | 1246-1251 |
| closeFloatingPanel | 1257-1270 |
| closeAllFloatingPanels | 1272-1278 |
| openFloatingPanel | 1280-1305 |
| toggleFloatingPanel | 1307-1312 |
| repositionOpenFloatingPanels | 1314-1322 |
| openOptionsPanel | 1324-1324 |
| closeOptionsPanel | 1325-1325 |
| openAdvanced | 1326-1326 |
| closeAdvanced | 1327-1327 |
| openPianoPanel | 1328-1328 |
| closePianoPanel | 1329-1329 |
| openInstrumentBrowser | 1330-1330 |
| closeInstrumentBrowser | 1331-1331 |
| closeSettings | 1333-1351 |

Event bindings:
| Target | Event | Line |
|---|---|---:|
| appDialogConfirm | click | 633 |
| appDialogCancel | click | 639 |
| appDialogBackdrop | click | 645 |
| appDialogClose | click | 651 |
| appDialogInput | keydown | 657 |

## Maintenance Notes
- js/app.*.js is an older branch snapshot. Keep it for reference unless explicitly retired.
- Functional edits should target loaded scripts first: core.js, audio.js, game.js, settings.js, events.js.
- If you intentionally switch runtime scripts, update script tags in index.html and regenerate this file.
- After verification, commit and push the updated files when repository remotes are configured.

