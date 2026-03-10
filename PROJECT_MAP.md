# Project Map

Generated: 2026-03-10 11:03:37 +01:00

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
| styles.css | CSS | Loaded directly | Yes | 3006 |
| js/audio.js | JavaScript | Browser runtime module | Yes | 1529 |
| js/core.js | JavaScript | Browser runtime module | Yes | 1037 |
| js/events.js | JavaScript | Browser runtime module | Yes | 1955 |
| js/game.js | JavaScript | Browser runtime module | Yes | 2048 |
| js/settings.js | JavaScript | Browser runtime module | Yes | 1418 |
| README.md | Markdown | Human + AI onboarding | Yes | 135 |
| IMPLEMENTATION_CHECKLIST.md | Markdown | Implementation roadmap checklist | Yes | 237 |
| AGENTS.md | Markdown | AI instruction override | Yes | 47 |
| PROJECT_MAP.md | Markdown | Generated reference map | Yes | 1148 |
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
File: styles.css (1-3006)

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
| .typing-zone | 592-602 |
| .game-stack | 604-608 |
| .typing-zone label | 610-617 |
| .typing-zone input[type="text"] | 619-631 |
| .typing-zone input[type="text"]::placeholder | 633-636 |
| .typing-row | 638-641 |
| .typing-input-wrap | 643-645 |
| .typing-help-toggle | 647-664 |
| .typing-help-toggle:hover | 666-669 |
| .typing-help-toggle:focus-visible | 671-674 |
| .typing-help-text | 676-682 |
| .typing-help-text strong | 684-686 |
| .typing-help-actions | 688-690 |
| .typing-learn-btn | 692-702 |
| .typing-learn-btn:hover | 704-706 |
| .typing-learn-btn:focus-visible | 708-711 |
| body.modal-open | 713-715 |
| .tutorial-modal | 717-724 |
| .tutorial-modal[hidden] | 726-728 |
| .tutorial-backdrop | 730-736 |
| .tutorial-card | 738-751 |
| .game-settings-modal | 753-760 |
| .game-settings-modal[hidden] | 762-764 |
| .game-settings-card | 766-778 |
| .game-settings-head | 780-785 |
| .game-settings-kicker | 787-792 |
| .game-settings-grid | 794-798 |
| .game-settings-group | 800-807 |
| .game-settings-group-title | 809-813 |
| .game-settings-group-body | 815-818 |
| .app-dialog | 820-827 |
| .app-dialog[hidden] | 829-831 |
| .app-dialog-card | 833-843 |
| .app-dialog-head | 845-850 |
| .app-dialog-body | 852-856 |
| .app-dialog-input-row | 858-861 |
| .app-dialog-input-row input | 863-870 |
| .app-dialog-actions | 872-876 |
| .tutorial-card.tutorial-overflow-scroll | 878-881 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-step | 883-889 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-lab | 891-898 |
| .tutorial-card.tutorial-fit-1 | 900-903 |
| .tutorial-card.tutorial-fit-1 .tutorial-step | 905-908 |
| .tutorial-card.tutorial-fit-1 .tutorial-lab | 910-913 |
| .tutorial-card.tutorial-fit-1 .tutorial-chip | 915-918 |
| .tutorial-card.tutorial-fit-1 .tutorial-quality-table th | 920-922 |
| .tutorial-card.tutorial-fit-1 .tutorial-piano | 924-929 |
| .tutorial-card.tutorial-fit-2 | 931-934 |
| .tutorial-card.tutorial-fit-2 .tutorial-head h4 | 936-938 |
| .tutorial-card.tutorial-fit-2 .tutorial-step | 940-943 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-title | 945-947 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-body | 949-952 |
| .tutorial-card.tutorial-fit-2 .tutorial-lab | 954-957 |
| .tutorial-card.tutorial-fit-2 .tutorial-current | 959-961 |
| .tutorial-card.tutorial-fit-2 .tutorial-selector-title | 963-965 |
| .tutorial-card.tutorial-fit-2 .tutorial-chip | 967-970 |
| .tutorial-card.tutorial-fit-2 .tutorial-quality-table th | 972-975 |
| .tutorial-card.tutorial-fit-2 .tutorial-piano | 977-982 |
| .tutorial-card.tutorial-fit-2 .tutorial-actions .advanced-trigger | 984-987 |
| .tutorial-card.tutorial-fit-3 | 989-992 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-kicker | 994-996 |
| .tutorial-card.tutorial-fit-3 .tutorial-step | 998-1001 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-title | 1003-1005 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-body | 1007-1010 |
| .tutorial-card.tutorial-fit-3 .tutorial-lab | 1012-1015 |
| .tutorial-card.tutorial-fit-3 .tutorial-current | 1017-1019 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano-title | 1021-1024 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th | 1026-1029 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th, .tutorial-card.tutorial-... | 1032-1034 |
| .tutorial-card.tutorial-fit-3 .tutorial-chip | 1036-1039 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano | 1041-1046 |
| .tutorial-card.tutorial-fit-3 .tutorial-actions .advanced-trigger | 1048-1051 |
| .tutorial-card.tutorial-fit-3 .tutorial-progress | 1053-1055 |
| .tutorial-head | 1057-1062 |
| .tutorial-head h4 | 1064-1068 |
| .tutorial-close | 1070-1072 |
| .tutorial-step | 1074-1082 |
| .tutorial-step-kicker | 1084-1090 |
| .tutorial-step.focus-flash | 1092-1094 |
| @keyframes tutorial-focus-flash | 1096-1104 |
| .tutorial-step-title | 1106-1109 |
| .tutorial-step-body | 1111-1115 |
| .tutorial-step-body p | 1117-1119 |
| .tutorial-step-body p+p | 1121-1123 |
| .tutorial-example-list | 1125-1130 |
| .tutorial-example-list code | 1132-1138 |
| .tutorial-actions | 1140-1147 |
| .tutorial-progress | 1149-1153 |
| .tutorial-lab | 1155-1164 |
| .tutorial-current | 1166-1170 |
| .tutorial-selector-block | 1172-1175 |
| .tutorial-control-matrix | 1177-1184 |
| .tutorial-control-row | 1186-1194 |
| .tutorial-control-row.locked | 1196-1198 |
| .tutorial-control-row.locked::after | 1200-1207 |
| .tutorial-control-row.newly-unlocked | 1209-1211 |
| @keyframes tutorial-unlock | 1213-1221 |
| .tutorial-selector-title | 1223-1229 |
| .tutorial-chip-list | 1231-1235 |
| #chord-tutorial-quality-list | 1237-1240 |
| .tutorial-quality-table | 1242-1247 |
| .tutorial-quality-table th, .tutorial-quality-table td | 1250-1254 |
| .tutorial-quality-table tr:first-child th, .tutorial-quality-table tr:first-child td | 1257-1259 |
| .tutorial-quality-table th | 1261-1270 |
| .tutorial-chip-group-list | 1272-1276 |
| .tutorial-chip | 1278-1290 |
| .tutorial-chip.unlocked | 1292-1295 |
| .tutorial-chip.unlocked:hover, .tutorial-chip.unlocked:focus-visible | 1298-1301 |
| .tutorial-chip[disabled] | 1303-1307 |
| .tutorial-chip.locked | 1309-1316 |
| .tutorial-chip:hover, .tutorial-chip:focus-visible | 1319-1322 |
| .tutorial-chip.active | 1324-1327 |
| .tutorial-chip.muted | 1329-1332 |
| .tutorial-chip.muted:hover, .tutorial-chip.muted:focus-visible | 1335-1337 |
| .tutorial-chip.newly-unlocked | 1339-1342 |
| .tutorial-chip.locked.newly-unlocked | 1344-1347 |
| .tutorial-piano-wrap | 1349-1354 |
| .tutorial-piano-title | 1356-1363 |
| .tutorial-piano | 1365-1376 |
| .tutorial-key | 1378-1383 |
| .tutorial-key.white | 1385-1393 |
| .tutorial-key.black | 1395-1403 |
| .tutorial-key.tone | 1405-1407 |
| .tutorial-key.tone.root | 1409-1411 |
| .tutorial-key[data-role]::after | 1413-1426 |
| .helper-card | 1428-1435 |
| .helper-title | 1437-1442 |
| .helper-list | 1444-1448 |
| .helper-item | 1450-1461 |
| .helper-item::after | 1463-1471 |
| .helper-item:last-child::after | 1473-1475 |
| .helper-item:hover, .helper-item:focus-within | 1478-1480 |
| @media (hover: hover) and (pointer: fine) | 1482-1488 |
| .app-cursor | 1490-1501 |
| .app-cursor.visible | 1503-1505 |
| .app-cursor-ring, .app-cursor-dot | 1508-1515 |
| .app-cursor-ring | 1517-1525 |
| .app-cursor-dot | 1527-1531 |
| .app-cursor.is-interactive .app-cursor-ring | 1533-1538 |
| .app-cursor.is-interactive .app-cursor-dot | 1540-1542 |
| .app-cursor.is-text .app-cursor-ring | 1544-1549 |
| .app-cursor.is-pressed .app-cursor-ring | 1551-1553 |
| .app-cursor.is-pressed .app-cursor-dot | 1555-1557 |
| .helper-label | 1559-1565 |
| .helper-item .helper-value | 1567-1575 |
| .helper-item .helper-mask | 1577-1585 |
| .helper-item .helper-real | 1587-1599 |
| .helper-item:hover .helper-mask, .helper-item:focus-within .helper-mask | 1602-1605 |
| .helper-item:hover .helper-real, .helper-item:focus-within .helper-real | 1608-1611 |
| .typing-zone[hidden] | 1613-1615 |
| .status | 1617-1628 |
| .status[hidden] | 1630-1632 |
| .helper-slot[hidden] | 1634-1636 |
| .status-actions | 1638-1644 |
| .hint-flag | 1646-1659 |
| .hint-flag[hidden] | 1661-1663 |
| .hint-button | 1665-1667 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) | 1669-1683 |
| .settings-toggle | 1685-1687 |
| .theme-toggle | 1689-1691 |
| .home-toggle | 1693-1695 |
| :is(.settings-toggle, .theme-toggle, .home-toggle):hover | 1697-1699 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) svg | 1701-1705 |
| .settings-toggle svg | 1707-1710 |
| .settings-panel | 1712-1731 |
| .settings-panel.open | 1733-1737 |
| .settings-panel h2 | 1739-1744 |
| .settings-body | 1746-1750 |
| .settings-grid | 1752-1755 |
| .settings-section-title | 1757-1765 |
| .panel-trigger, .advanced-trigger, .dropdown-trigger, .control select | 1770-1779 |
| .advanced-trigger | 1781-1785 |
| .dropdown-trigger | 1787-1795 |
| .dropdown-trigger svg | 1797-1801 |
| .panel-trigger | 1803-1808 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger):hover | 1810-1813 |
| .panel-trigger:hover | 1815-1817 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger)[aria-expanded="true"] | 1819-1822 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger, .control select):focus-v... | 1824-1827 |
| .control select | 1829-1833 |
| .options-panel | 1835-1851 |
| .options-panel.open | 1853-1857 |
| .options-panel h3 | 1859-1866 |
| .options-grid | 1868-1871 |
| .options-panel .control | 1873-1879 |
| .options-panel .control.compact | 1881-1883 |
| .options-panel .control>label | 1885-1887 |
| .options-section-title | 1889-1898 |
| .options-panel .options-section-title:first-child | 1900-1904 |
| .advanced-panel | 1906-1925 |
| .advanced-panel.open | 1927-1931 |
| .advanced-panel h3 | 1933-1938 |
| .advanced-grid | 1940-1949 |
| .advanced-grid::-webkit-scrollbar | 1951-1953 |
| .advanced-grid::-webkit-scrollbar-track | 1955-1958 |
| .advanced-grid::-webkit-scrollbar-thumb | 1960-1964 |
| .inline-value | 1966-1973 |
| .slider-stack | 1975-1978 |
| .slider-stack input[type="range"] | 1980-1984 |
| .slider-ghost | 1986-2000 |
| .slider-ghost.visible | 2002-2004 |
| .sf2-browser | 2006-2009 |
| .sf2-browser input[type="text"] | 2011-2020 |
| .sf2-preset-list | 2022-2035 |
| .sf2-browser .piano-desc | 2037-2040 |
| .sf2-browser .piano-desc.pending, .profile-browser .piano-desc.pending | 2043-2045 |
| .sf2-group | 2047-2052 |
| .sf2-group-title | 2054-2063 |
| .sf2-row | 2065-2073 |
| .sf2-row:first-child | 2075-2077 |
| .sf2-row:hover | 2079-2081 |
| .sf2-row.active | 2083-2086 |
| .sf2-row-name | 2088-2094 |
| .sf2-row-program, .sf2-row-bank | 2097-2101 |
| .sf2-empty | 2103-2107 |
| .profile-browser | 2109-2112 |
| .profile-browser input[type="text"] | 2114-2123 |
| .profile-list | 2125-2138 |
| .profile-row | 2140-2150 |
| .profile-row:hover | 2152-2154 |
| .profile-row.active | 2156-2159 |
| .profile-row.applied | 2161-2163 |
| .profile-row-name | 2165-2171 |
| .profile-row-kind | 2173-2178 |
| .advanced-footer | 2180-2186 |
| .piano-preview.wide | 2188-2200 |
| .piano-preview.wide::before | 2202-2204 |
| .piano-preview.wide .play-icon | 2206-2212 |
| .piano-preview.wide .play-label | 2214-2216 |
| .instrument-browser-panel | 2218-2233 |
| .instrument-browser-panel.open | 2235-2239 |
| .instrument-browser-panel h3 | 2241-2246 |
| .piano-panel | 2248-2263 |
| .piano-panel.open | 2265-2269 |
| .piano-panel h3 | 2271-2276 |
| .piano-options | 2278-2281 |
| .piano-option | 2283-2295 |
| .piano-option.active | 2297-2300 |
| .piano-option:focus-visible | 2302-2304 |
| .piano-info | 2306-2309 |
| .piano-name | 2311-2314 |
| .piano-desc | 2316-2319 |
| .piano-option.simple .piano-name | 2321-2325 |
| .piano-option.simple .piano-desc | 2327-2331 |
| .piano-preview | 2333-2348 |
| .piano-preview::before | 2350-2358 |
| .piano-preview:active | 2360-2363 |
| .piano-preview.main | 2365-2369 |
| .settings-grid input[type="range"], .advanced-panel input[type="range"], .options-... | 2373-2377 |
| .settings-grid input[type="range"]::-webkit-slider-runnable-track, .advanced-panel... | 2381-2386 |
| .settings-grid input[type="range"]::-webkit-slider-thumb, .advanced-panel input[ty... | 2390-2399 |
| .settings-grid input[type="range"]:focus-visible::-webkit-slider-thumb, .advanced-... | 2403-2406 |
| .settings-grid input[type="range"]::-moz-range-track, .advanced-panel input[type="... | 2410-2415 |
| .settings-grid input[type="range"]::-moz-range-thumb, .advanced-panel input[type="... | 2419-2426 |
| .settings-grid input[type="range"]:focus-visible::-moz-range-thumb, .advanced-pane... | 2430-2433 |
| .volume-value | 2435-2438 |
| .status-row | 2440-2445 |
| .switch | 2447-2456 |
| .switch input | 2458-2463 |
| .switch-track | 2465-2471 |
| .switch-thumb | 2473-2483 |
| .switch input:checked+.switch-track | 2485-2487 |
| .switch input:checked+.switch-track .switch-thumb | 2489-2491 |
| .switch input:focus-visible+.switch-track | 2493-2496 |
| .control.compact .unit | 2498-2500 |
| .test-tone | 2502-2514 |
| .test-tone:hover | 2516-2519 |
| .test-tone:active | 2521-2523 |
| .test-tone-icon | 2525-2532 |
| .test-tone-label | 2534-2538 |
| .result | 2540-2544 |
| .reveal | 2546-2555 |
| .reveal strong | 2557-2559 |
| .reveal-label | 2561-2568 |
| .reveal-grid.compact | 2570-2574 |
| .reveal-cell | 2576-2578 |
| .keyboard-zone | 2580-2590 |
| .keyboard-stack | 2592-2602 |
| .keyboard-wrapper | 2604-2613 |
| .keyboard | 2615-2622 |
| .keyboard-wrapper.ends-black | 2624-2626 |
| .white-keys | 2628-2631 |
| .black-keys | 2633-2640 |
| .key | 2642-2653 |
| .key.white | 2655-2662 |
| .key.white.has-black | 2664-2666 |
| .key.black | 2668-2677 |
| .key span | 2679-2683 |
| .key.black span | 2685-2689 |
| .key.active | 2691-2694 |
| .key.black.active | 2696-2699 |
| .key.selected | 2701-2705 |
| .key.typed-preview | 2707-2709 |
| .key.correct | 2711-2715 |
| .key.wrong | 2717-2721 |
| .key.missed | 2723-2729 |
| .key.black.selected, .key.black.correct, .key.black.wrong | 2733-2735 |
| .key.black.missed | 2737-2743 |
| .keyboard.disabled | 2745-2751 |
| body.tutorial-open .keyboard | 2753-2755 |
| body.tutorial-open .keyboard.disabled | 2757-2760 |
| .keyboard.disabled::before | 2762-2774 |
| body.tutorial-open .keyboard.disabled::before | 2776-2778 |
| .keyboard.disabled::after | 2780-2814 |
| body.tutorial-open .keyboard.disabled::after | 2816-2818 |
| .tips | 2820-2829 |
| #pedal-tip[hidden] | 2831-2833 |
| .pedal-box | 2835-2849 |
| body.landing .pedal-box | 2851-2853 |
| .pedal-label | 2855-2865 |
| .pedal-icon | 2867-2874 |
| .pedal-icon.active | 2876-2879 |
| .note-pills | 2881-2887 |
| .note-pill | 2889-2895 |
| .note-pill.good | 2897-2901 |
| .note-pill.bad | 2903-2907 |
| .note-pill.missed | 2909-2913 |
| .note-pill.neutral | 2915-2919 |
| @media (max-width: 700px) | 2921-2976 |
| @media (max-height: 820px) | 2978-2999 |
| @media (max-height: 700px) | 3001-3006 |

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

