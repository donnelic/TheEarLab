# Project Map

Generated: 2026-03-11 11:52:50 +01:00

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
| index.html | HTML | Loaded directly | Yes | 579 |
| styles.css | CSS | Loaded directly | Yes | 3406 |
| js/audio.js | JavaScript | Browser runtime module | Yes | 1529 |
| js/core.js | JavaScript | Browser runtime module | Yes | 1065 |
| js/events.js | JavaScript | Browser runtime module | Yes | 2311 |
| js/game.js | JavaScript | Browser runtime module | Yes | 2219 |
| js/settings.js | JavaScript | Browser runtime module | Yes | 1474 |
| README.md | Markdown | Human + AI onboarding | Yes | 135 |
| IMPLEMENTATION_CHECKLIST.md | Markdown | Implementation roadmap checklist | Yes | 237 |
| AGENTS.md | Markdown | AI instruction override | Yes | 47 |
| PROJECT_MAP.md | Markdown | Generated reference map | Yes | 1252 |
| tools/generate-project-map.ps1 | PowerShell | Documentation generator | Yes | 540 |
| tools/smoke-checklist.md | Markdown | Manual regression checklist | Yes | 59 |
| soundfonts/GeneralUser-GS.sf2 | Asset | Soundfont asset | Yes | 0 |
| soundfonts/index.json | JSON | Soundfont asset | Yes | 3 |
| soundfonts/README.md | Markdown | Soundfont asset | Yes | 39 |

## index.html Map
File: index.html (1-579)

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
| key-count-down-oct | <button> | 99 |
| key-count-down | <button> | 101 |
| key-count-value | <span> | 102 |
| key-count-up | <button> | 103 |
| key-count-up-oct | <button> | 104 |
| key-count | <input> | 107 |
| start-note-down-oct | <button> | 116 |
| start-note-down | <button> | 118 |
| start-note-value | <span> | 119 |
| start-note-up | <button> | 120 |
| start-note-up-oct | <button> | 121 |
| reset-settings | <button> | 128 |
| advanced-panel | <section> | 131 |
| attack-label-value | <span> | 135 |
| attack-time | <input> | 138 |
| attack-ghost | <span> | 139 |
| attack-value | <span> | 141 |
| decay-label-value | <span> | 145 |
| decay-rate | <input> | 148 |
| decay-ghost | <span> | 149 |
| decay-value | <span> | 151 |
| release-label-value | <span> | 155 |
| release-rate | <input> | 158 |
| release-ghost | <span> | 159 |
| release-value | <span> | 161 |
| sustain-label-value | <span> | 165 |
| sustain-length | <input> | 168 |
| sustain-ghost | <span> | 169 |
| sustain-value | <span> | 171 |
| profile-search | <input> | 176 |
| profile-list | <div> | 177 |
| profile-meta | <div> | 178 |
| profile-save | <button> | 180 |
| profile-apply | <button> | 181 |
| test-envelope | <button> | 186 |
| piano-panel | <section> | 193 |
| piano-options | <div> | 195 |
| instrument-browser-panel | <section> | 198 |
| instrument-preset-search | <input> | 202 |
| instrument-preset-list | <div> | 203 |
| instrument-preset-meta | <div> | 204 |
| instrument-preset-apply | <button> | 206 |
| game-settings-modal | <section> | 211 |
| game-settings-backdrop | <button> | 212 |
| game-settings-title | <h4> | 217 |
| game-settings-close | <button> | 219 |
| practice-mode | <select> | 228 |
| game-key-count-down-oct | <button> | 240 |
| game-key-count-down | <button> | 242 |
| game-key-count-value | <span> | 243 |
| game-key-count-up | <button> | 244 |
| game-key-count-up-oct | <button> | 245 |
| note-count | <input> | 257 |
| note-count-value | <span> | 258 |
| blind-mode | <input> | 266 |
| nice-notes | <input> | 279 |
| chord-rounds | <input> | 292 |
| training-mode | <select> | 317 |
| chord-difficulty | <select> | 332 |
| chord-tutorial-open-options | <button> | 344 |
| chord-root-hint | <input> | 357 |
| hide-live-preview | <input> | 370 |
| typing-show-typed | <input> | 383 |
| typing-show-piano | <input> | 396 |
| chord-extra-helpers | <input> | 409 |
| primary-action | <button> | 431 |
| play-selected | <button> | 432 |
| quick-start | <section> | 435 |
| keyboard | <div> | 453 |
| white-keys | <div> | 454 |
| black-keys | <div> | 455 |
| pedal-icon | <div> | 460 |
| chord-readout | <section> | 465 |
| typing-zone | <section> | 466 |
| chord-answer | <input> | 470 |
| typing-help-toggle | <button> | 471 |
| status-panel | <section> | 477 |
| round-count | <span> | 479 |
| selected-list | <span> | 480 |
| goal-count | <span> | 481 |
| mode-label | <span> | 482 |
| game-settings-open | <button> | 485 |
| hint-button | <button> | 486 |
| result | <div> | 488 |
| helper-slot | <div> | 489 |
| reveal | <div> | 490 |
| hint-flag | <div> | 491 |
| pedal-tip | <span> | 497 |
| chord-tutorial-modal | <section> | 501 |
| chord-tutorial-backdrop | <button> | 502 |
| chord-tutorial-title | <h4> | 505 |
| chord-tutorial-close | <button> | 506 |
| chord-tutorial-step | <div> | 508 |
| chord-tutorial-current | <div> | 510 |
| chord-tutorial-piano | <div> | 513 |
| tutorial-row-root | <div> | 516 |
| chord-tutorial-root-list | <div> | 518 |
| tutorial-row-quality | <div> | 520 |
| chord-tutorial-quality-list | <div> | 522 |
| chord-tutorial-progress | <span> | 528 |
| chord-tutorial-prev | <button> | 530 |
| chord-tutorial-tabs | <div> | 531 |
| chord-tutorial-next | <button> | 533 |
| app-dialog | <section> | 540 |
| app-dialog-backdrop | <button> | 541 |
| app-dialog-title | <h4> | 544 |
| app-dialog-close | <button> | 545 |
| app-dialog-body | <div> | 547 |
| app-dialog-input | <input> | 550 |
| app-dialog-cancel | <button> | 553 |
| app-dialog-confirm | <button> | 554 |

### Script Load Order
| Order | Script | Line |
|---:|---|---:|
| 1 | vendor/libfluidsynth-2.4.6.js?v=20260311103501 | 559 |
| 2 | vendor/js-synthesizer.min.js?v=20260311103501 | 560 |
| 3 | js/core.js?v=20260311103501 | 561 |
| 4 | js/store/reducers.js?v=20260311103501 | 562 |
| 5 | js/store/actions.js?v=20260311103501 | 563 |
| 6 | js/store/selectors.js?v=20260311103501 | 564 |
| 7 | js/store/store.js?v=20260311103501 | 565 |
| 8 | js/features/round/state-mutations.js?v=20260311103501 | 566 |
| 9 | js/features/settings/state-mutations.js?v=20260311103501 | 567 |
| 10 | js/features/chords/index.js?v=20260311103501 | 568 |
| 11 | js/features/typing/index.js?v=20260311103501 | 569 |
| 12 | js/features/tutorial/index.js?v=20260311103501 | 570 |
| 13 | js/features/audio-preview/index.js?v=20260311103501 | 571 |
| 14 | js/features/input/index.js?v=20260311103501 | 572 |
| 15 | js/audio.js?v=20260311103501 | 573 |
| 16 | js/game.js?v=20260311103501 | 574 |
| 17 | js/settings.js?v=20260311103501 | 575 |
| 18 | js/events.js?v=20260311103501 | 576 |

## styles.css Map
File: styles.css (1-3406)

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
| .range-hidden | 389-391 |
| .start-note-value | 393-399 |
| .step-btn | 401-413 |
| .step-btn.oct | 415-421 |
| .step-btn:hover | 423-426 |
| .advanced-test | 428-431 |
| .advanced-test .unit | 433-436 |
| input[type="number"] | 438-447 |
| .segmented | 449-453 |
| .segmented-btn | 455-464 |
| .segmented-btn.active | 466-470 |
| .actions | 472-478 |
| .quick-start | 480-486 |
| .quick-mode-btn | 488-501 |
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
| .chord-readout | 571-592 |
| .chord-link | 594-603 |
| .chord-link-bubble | 605-626 |
| .chord-link-bubble::after | 628-637 |
| .chord-link:hover .chord-link-bubble | 639-642 |
| .chord-link-bubble:hover | 644-647 |
| body.suppress-chord-bubbles .chord-link-bubble | 649-652 |
| .chord-link:focus-visible | 654-656 |
| .chord-label-suffix, .chord-divider | 659-662 |
| .chord-readout[hidden] | 664-666 |
| .chord-readout.is-ghost | 668-671 |
| .typing-zone | 673-684 |
| .game-stack | 686-691 |
| .typing-zone label | 693-700 |
| .typing-zone input[type="text"] | 702-714 |
| .typing-zone input[type="text"]::placeholder | 716-719 |
| .typing-row | 721-724 |
| .typing-input-wrap | 726-728 |
| .typing-help-toggle | 730-747 |
| .typing-help-toggle:hover | 749-752 |
| .typing-help-toggle:focus-visible | 754-757 |
| .typing-help-text | 759-765 |
| .typing-help-text strong | 767-769 |
| .typing-help-actions | 771-773 |
| .typing-learn-btn | 775-785 |
| .typing-learn-btn:hover | 787-789 |
| .typing-learn-btn:focus-visible | 791-794 |
| body.modal-open | 796-798 |
| .tutorial-modal | 800-807 |
| .tutorial-modal[hidden] | 809-811 |
| .tutorial-backdrop | 813-819 |
| .tutorial-card | 821-834 |
| .game-settings-modal | 836-843 |
| .game-settings-modal[hidden] | 845-847 |
| .game-settings-card | 849-861 |
| .game-settings-head | 863-868 |
| .game-settings-kicker | 870-875 |
| .game-settings-grid | 877-882 |
| .game-settings-group | 884-892 |
| .game-settings-group-title | 894-898 |
| .game-settings-group-body | 900-903 |
| .app-dialog | 905-912 |
| .app-dialog[hidden] | 914-916 |
| .app-dialog-card | 918-928 |
| .app-dialog-head | 930-935 |
| .app-dialog-body | 937-941 |
| .app-dialog-input-row | 943-946 |
| .app-dialog-input-row input | 948-955 |
| .app-dialog-actions | 957-961 |
| .tutorial-card.tutorial-overflow-scroll | 963-966 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-step | 968-974 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-lab | 976-983 |
| .tutorial-card.tutorial-fit-1 | 985-988 |
| .tutorial-card.tutorial-fit-1 .tutorial-step | 990-993 |
| .tutorial-card.tutorial-fit-1 .tutorial-lab | 995-998 |
| .tutorial-card.tutorial-fit-1 .tutorial-chip | 1000-1003 |
| .tutorial-card.tutorial-fit-1 .tutorial-quality-table th | 1005-1007 |
| .tutorial-card.tutorial-fit-1 .tutorial-piano | 1009-1014 |
| .tutorial-card.tutorial-fit-2 | 1016-1019 |
| .tutorial-card.tutorial-fit-2 .tutorial-head h4 | 1021-1023 |
| .tutorial-card.tutorial-fit-2 .tutorial-step | 1025-1028 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-title | 1030-1032 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-body | 1034-1037 |
| .tutorial-card.tutorial-fit-2 .tutorial-lab | 1039-1042 |
| .tutorial-card.tutorial-fit-2 .tutorial-current | 1044-1046 |
| .tutorial-card.tutorial-fit-2 .tutorial-selector-title | 1048-1050 |
| .tutorial-card.tutorial-fit-2 .tutorial-chip | 1052-1055 |
| .tutorial-card.tutorial-fit-2 .tutorial-quality-table th | 1057-1060 |
| .tutorial-card.tutorial-fit-2 .tutorial-piano | 1062-1067 |
| .tutorial-card.tutorial-fit-2 .tutorial-actions .advanced-trigger | 1069-1072 |
| .tutorial-card.tutorial-fit-3 | 1074-1077 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-kicker | 1079-1081 |
| .tutorial-card.tutorial-fit-3 .tutorial-step | 1083-1086 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-title | 1088-1090 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-body | 1092-1095 |
| .tutorial-card.tutorial-fit-3 .tutorial-lab | 1097-1100 |
| .tutorial-card.tutorial-fit-3 .tutorial-current | 1102-1104 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano-title | 1106-1109 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th | 1111-1114 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th, .tutorial-card.tutorial-... | 1117-1119 |
| .tutorial-card.tutorial-fit-3 .tutorial-chip | 1121-1124 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano | 1126-1131 |
| .tutorial-card.tutorial-fit-3 .tutorial-actions .advanced-trigger | 1133-1136 |
| .tutorial-card.tutorial-fit-3 .tutorial-progress | 1138-1140 |
| .tutorial-head | 1142-1147 |
| .tutorial-head h4 | 1149-1153 |
| .tutorial-close | 1155-1157 |
| .tutorial-step | 1159-1167 |
| .tutorial-step-kicker | 1169-1175 |
| .tutorial-step.focus-flash | 1177-1179 |
| @keyframes tutorial-focus-flash | 1181-1189 |
| .tutorial-step-title | 1191-1194 |
| .tutorial-step-body | 1196-1200 |
| .tutorial-step-body p | 1202-1204 |
| .tutorial-step-body p+p | 1206-1208 |
| .tutorial-example-list | 1210-1215 |
| .tutorial-example-list code | 1217-1223 |
| .tutorial-actions | 1225-1232 |
| .tutorial-progress-wrap | 1234-1242 |
| .tutorial-progress | 1244-1250 |
| .tutorial-progress-row | 1252-1258 |
| .tutorial-progress-tabs | 1260-1278 |
| .tutorial-progress-tabs::-webkit-scrollbar | 1280-1282 |
| .tutorial-progress-tab | 1284-1305 |
| .tutorial-progress-step | 1307-1320 |
| .tutorial-progress-label | 1322-1329 |
| .tutorial-progress-tabs.compact .tutorial-progress-label | 1331-1333 |
| .tutorial-progress-tabs.compact .tutorial-progress-tab | 1335-1337 |
| .tutorial-progress-tabs::before | 1339-1351 |
| .tutorial-progress-tabs::after | 1353-1367 |
| .tutorial-progress-tab.complete | 1369-1371 |
| .tutorial-progress-tab.complete .tutorial-progress-step | 1373-1377 |
| .tutorial-progress-tab.active | 1379-1381 |
| .tutorial-progress-tab.active .tutorial-progress-step | 1383-1390 |
| .tutorial-progress-tab:focus-visible | 1392-1395 |
| .tutorial-progress-tab:hover, .tutorial-progress-tab:focus-visible | 1398-1400 |
| .tutorial-progress-row > button | 1402-1404 |
| .tutorial-lab | 1406-1415 |
| .tutorial-current | 1417-1421 |
| .tutorial-selector-block | 1423-1426 |
| .tutorial-control-matrix | 1428-1435 |
| .tutorial-control-row | 1437-1445 |
| .tutorial-control-row.locked | 1447-1449 |
| .tutorial-control-row.locked::after | 1451-1458 |
| .tutorial-control-row.newly-unlocked | 1460-1462 |
| @keyframes tutorial-unlock | 1464-1472 |
| .tutorial-selector-title | 1474-1480 |
| .tutorial-chip-list | 1482-1486 |
| #chord-tutorial-quality-list | 1488-1491 |
| .tutorial-quality-table | 1493-1498 |
| .tutorial-quality-table th, .tutorial-quality-table td | 1501-1505 |
| .tutorial-quality-table tr:first-child th, .tutorial-quality-table tr:first-child td | 1508-1510 |
| .tutorial-quality-table th | 1512-1521 |
| .tutorial-chip-group-list | 1523-1527 |
| .tutorial-chip | 1529-1541 |
| .tutorial-chip.unlocked | 1543-1546 |
| .tutorial-chip.unlocked:hover, .tutorial-chip.unlocked:focus-visible | 1549-1552 |
| .tutorial-chip[disabled] | 1554-1558 |
| .tutorial-chip.locked | 1560-1567 |
| .tutorial-chip:hover, .tutorial-chip:focus-visible | 1570-1573 |
| .tutorial-chip.active | 1575-1578 |
| .tutorial-chip.muted | 1580-1583 |
| .tutorial-chip.muted:hover, .tutorial-chip.muted:focus-visible | 1586-1588 |
| .tutorial-chip.newly-unlocked | 1590-1593 |
| .tutorial-chip.locked.newly-unlocked | 1595-1598 |
| .tutorial-piano-wrap | 1600-1605 |
| .tutorial-piano-title | 1607-1614 |
| .tutorial-piano | 1616-1627 |
| .tutorial-key | 1629-1634 |
| .tutorial-key.white | 1636-1644 |
| .tutorial-key.black | 1646-1654 |
| .tutorial-key.tone | 1656-1658 |
| .tutorial-key.tone.root | 1660-1662 |
| .tutorial-key[data-role]::after | 1664-1677 |
| .helper-card | 1679-1689 |
| .helper-head | 1691-1697 |
| .helper-title | 1699-1704 |
| .helper-meta | 1706-1711 |
| .helper-list | 1713-1717 |
| .helper-item | 1719-1732 |
| .helper-item:hover, .helper-item:focus-within | 1735-1740 |
| .helper-item:focus-visible | 1742-1745 |
| .helper-item.pinned | 1747-1751 |
| .helper-item.pinned::after | 1753-1766 |
| .helper-item.latched | 1768-1771 |
| @media (hover: hover) and (pointer: fine) | 1773-1779 |
| .app-cursor | 1781-1794 |
| .app-cursor.visible | 1796-1798 |
| .app-cursor-ring, .app-cursor-dot | 1801-1808 |
| .app-cursor-ring | 1810-1818 |
| .app-cursor-dot | 1820-1824 |
| .app-cursor.simple .app-cursor-ring | 1826-1834 |
| .app-cursor.simple .app-cursor-dot | 1836-1841 |
| .app-cursor.is-interactive .app-cursor-ring | 1843-1848 |
| .app-cursor.is-interactive .app-cursor-dot | 1850-1852 |
| .app-cursor.is-helper .app-cursor-ring | 1854-1861 |
| .app-cursor.is-helper .app-cursor-dot | 1863-1868 |
| .app-cursor.is-text .app-cursor-ring | 1870-1875 |
| .app-cursor.is-pressed .app-cursor-ring | 1877-1879 |
| .app-cursor.is-pressed .app-cursor-dot | 1881-1883 |
| .helper-label | 1885-1894 |
| .helper-item .helper-value | 1896-1904 |
| .helper-item .helper-mask | 1906-1915 |
| .helper-item .helper-real | 1917-1930 |
| .helper-item:hover .helper-mask, .helper-item:focus-within .helper-mask, .helper-i... | 1936-1939 |
| .helper-item:hover .helper-real, .helper-item:focus-within .helper-real, .helper-i... | 1945-1948 |
| .typing-zone[hidden] | 1950-1952 |
| .status | 1954-1965 |
| .status[hidden] | 1967-1969 |
| .helper-slot[hidden] | 1971-1973 |
| .status-actions | 1975-1981 |
| .hint-flag | 1983-1996 |
| .hint-flag[hidden] | 1998-2000 |
| .hint-button | 2002-2004 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) | 2006-2020 |
| .settings-toggle | 2022-2024 |
| .theme-toggle | 2026-2028 |
| .home-toggle | 2030-2032 |
| :is(.settings-toggle, .theme-toggle, .home-toggle):hover | 2034-2036 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) svg | 2038-2042 |
| .settings-toggle svg | 2044-2047 |
| .settings-panel | 2049-2068 |
| .settings-panel.open | 2070-2074 |
| .settings-panel h2 | 2076-2081 |
| .settings-body | 2083-2087 |
| .settings-grid | 2089-2092 |
| .settings-section-title | 2094-2102 |
| .panel-trigger, .advanced-trigger, .dropdown-trigger, .control select | 2107-2116 |
| .advanced-trigger | 2118-2122 |
| .dropdown-trigger | 2124-2132 |
| .dropdown-trigger svg | 2134-2138 |
| .panel-trigger | 2140-2145 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger):hover | 2147-2150 |
| .panel-trigger:hover | 2152-2154 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger)[aria-expanded="true"] | 2156-2159 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger, .control select):focus-v... | 2161-2164 |
| .control select | 2166-2170 |
| .options-panel | 2172-2188 |
| .options-panel.open | 2190-2194 |
| .options-panel h3 | 2196-2203 |
| .options-grid | 2205-2208 |
| .options-panel .control | 2210-2216 |
| .options-panel .control.compact | 2218-2220 |
| .options-panel .control>label | 2222-2224 |
| .options-section-title | 2226-2235 |
| .options-panel .options-section-title:first-child | 2237-2241 |
| .advanced-panel | 2243-2262 |
| .advanced-panel.open | 2264-2268 |
| .advanced-panel h3 | 2270-2275 |
| .advanced-grid | 2277-2286 |
| .advanced-grid::-webkit-scrollbar | 2288-2290 |
| .advanced-grid::-webkit-scrollbar-track | 2292-2295 |
| .advanced-grid::-webkit-scrollbar-thumb | 2297-2301 |
| .inline-value | 2303-2310 |
| .slider-stack | 2312-2315 |
| .slider-stack input[type="range"] | 2317-2321 |
| .slider-ghost | 2323-2337 |
| .slider-ghost.visible | 2339-2341 |
| .sf2-browser | 2343-2346 |
| .sf2-browser input[type="text"] | 2348-2357 |
| .sf2-preset-list | 2359-2372 |
| .sf2-browser .piano-desc | 2374-2377 |
| .sf2-browser .piano-desc.pending, .profile-browser .piano-desc.pending | 2380-2382 |
| .sf2-group | 2384-2389 |
| .sf2-group-title | 2391-2400 |
| .sf2-row | 2402-2410 |
| .sf2-row:first-child | 2412-2414 |
| .sf2-row:hover | 2416-2418 |
| .sf2-row.active | 2420-2423 |
| .sf2-row-name | 2425-2431 |
| .sf2-row-program, .sf2-row-bank | 2434-2438 |
| .sf2-empty | 2440-2444 |
| .profile-browser | 2446-2449 |
| .profile-browser input[type="text"] | 2451-2460 |
| .profile-list | 2462-2475 |
| .profile-row | 2477-2487 |
| .profile-row:hover | 2489-2491 |
| .profile-row.active | 2493-2496 |
| .profile-row.applied | 2498-2500 |
| .profile-row-name | 2502-2508 |
| .profile-row-kind | 2510-2515 |
| .advanced-footer | 2517-2523 |
| .piano-preview.wide | 2525-2537 |
| .piano-preview.wide::before | 2539-2541 |
| .piano-preview.wide .play-icon | 2543-2549 |
| .piano-preview.wide .play-label | 2551-2553 |
| .instrument-browser-panel | 2555-2570 |
| .instrument-browser-panel.open | 2572-2576 |
| .instrument-browser-panel h3 | 2578-2583 |
| .piano-panel | 2585-2600 |
| .piano-panel.open | 2602-2606 |
| .piano-panel h3 | 2608-2613 |
| .piano-options | 2615-2618 |
| .piano-option | 2620-2632 |
| .piano-option.active | 2634-2637 |
| .piano-option:focus-visible | 2639-2641 |
| .piano-info | 2643-2646 |
| .piano-name | 2648-2651 |
| .piano-desc | 2653-2656 |
| .piano-option.simple .piano-name | 2658-2662 |
| .piano-option.simple .piano-desc | 2664-2668 |
| .piano-preview | 2670-2685 |
| .piano-preview::before | 2687-2695 |
| .piano-preview:active | 2697-2700 |
| .piano-preview.main | 2702-2706 |
| .settings-grid input[type="range"], .game-settings-grid input[type="range"], .adva... | 2711-2715 |
| .settings-grid input[type="range"]::-webkit-slider-runnable-track, .game-settings-... | 2720-2725 |
| .settings-grid input[type="range"]::-webkit-slider-thumb, .game-settings-grid inpu... | 2730-2739 |
| .settings-grid input[type="range"]:focus-visible::-webkit-slider-thumb, .game-sett... | 2744-2747 |
| .settings-grid input[type="range"]::-moz-range-track, .game-settings-grid input[ty... | 2752-2757 |
| .settings-grid input[type="range"]::-moz-range-thumb, .game-settings-grid input[ty... | 2762-2769 |
| .settings-grid input[type="range"]:focus-visible::-moz-range-thumb, .game-settings... | 2774-2777 |
| .volume-value | 2779-2782 |
| .status-row | 2784-2789 |
| .switch | 2791-2800 |
| .switch input | 2802-2807 |
| .switch-track | 2809-2815 |
| .switch-thumb | 2817-2827 |
| .switch input:checked+.switch-track | 2829-2831 |
| .switch input:checked+.switch-track .switch-thumb | 2833-2835 |
| .switch input:focus-visible+.switch-track | 2837-2840 |
| .control.compact .unit | 2842-2844 |
| .test-tone | 2846-2858 |
| .test-tone:hover | 2860-2863 |
| .test-tone:active | 2865-2867 |
| .test-tone-icon | 2869-2876 |
| .test-tone-label | 2878-2882 |
| .result | 2884-2888 |
| .reveal | 2890-2898 |
| .reveal strong | 2900-2902 |
| .reveal-label | 2904-2911 |
| .reveal-grid.compact | 2913-2921 |
| .reveal-cell | 2923-2926 |
| .reveal-cell.reveal-target-chord | 2928-2930 |
| .reveal-cell.reveal-target-notes | 2932-2934 |
| .reveal-cell.reveal-your-chord | 2936-2938 |
| .reveal-cell.reveal-your-notes | 2940-2942 |
| .keyboard-zone | 2944-2954 |
| .keyboard-stack | 2956-2966 |
| .keyboard-wrapper | 2968-2977 |
| .keyboard | 2979-2986 |
| .keyboard-wrapper.ends-black | 2988-2990 |
| .white-keys | 2992-2995 |
| .black-keys | 2997-3004 |
| .key | 3006-3017 |
| .key.white | 3019-3026 |
| .key.white.has-black | 3028-3030 |
| .key.black | 3032-3041 |
| .key span | 3043-3047 |
| .key.black span | 3049-3053 |
| .key.active | 3055-3058 |
| .key.black.active | 3060-3063 |
| .key.selected | 3065-3069 |
| .key.typed-preview | 3071-3073 |
| .key.correct | 3075-3079 |
| .key.wrong | 3081-3085 |
| .key.missed | 3087-3093 |
| .key.black.selected, .key.black.correct, .key.black.wrong | 3097-3099 |
| .key.black.missed | 3101-3107 |
| .keyboard.disabled | 3109-3115 |
| body.tutorial-open .keyboard | 3117-3119 |
| body.tutorial-open .keyboard.disabled | 3121-3124 |
| .keyboard.disabled::before | 3126-3138 |
| body.tutorial-open .keyboard.disabled::before | 3140-3142 |
| .keyboard.disabled::after | 3144-3178 |
| body.tutorial-open .keyboard.disabled::after | 3180-3182 |
| .tips | 3184-3193 |
| #pedal-tip[hidden] | 3195-3197 |
| .pedal-box | 3199-3213 |
| body.landing .pedal-box | 3215-3217 |
| .pedal-label | 3219-3229 |
| .pedal-icon | 3231-3238 |
| .pedal-icon.active | 3240-3243 |
| .note-pills | 3245-3252 |
| .reveal-grid.compact .note-pills | 3254-3256 |
| .note-pill | 3258-3264 |
| .reveal-grid.compact .note-pill | 3266-3269 |
| .note-pill.chord-pill | 3271-3279 |
| .note-pill.chord-pill .chord-link | 3281-3283 |
| .note-pill.chord-pill .chord-link-bubble | 3285-3290 |
| .note-pill.chord-pill:hover .chord-link-bubble | 3292-3295 |
| .note-pill.good | 3297-3301 |
| .note-pill.bad | 3303-3307 |
| .note-pill.missed | 3309-3313 |
| .note-pill.neutral | 3315-3319 |
| @media (max-width: 700px) | 3321-3376 |
| @media (max-height: 820px) | 3378-3399 |
| @media (max-height: 700px) | 3401-3406 |

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
File lines: 1-1065

| Symbol | Lines |
|---|---|
| normalizePracticeProfile | 433-453 |
| normalizePracticeProfiles | 454-461 |
| isTypingOnlyModeFromState | 465-465 |
| getEffectiveBlindModeFromState | 469-469 |
| getEffectivePracticeModeFromState | 470-478 |
| capturePracticeProfileFromState | 479-500 |
| clampEnvelopeValue | 601-601 |
| resolveEnvelopeMetrics | 614-649 |
| saveSettings | 663-694 |
| loadSettings | 696-753 |
| resetAllSettings | 755-788 |
| buildNotes | 836-851 |
| getNoteIdByMidi | 853-860 |
| isConsonant | 878-881 |
| getNicePool | 883-883 |
| getNoteCountMax | 885-889 |
| updateNoteCountMax | 891-899 |
| getCssNumber | 901-901 |
| clamp | 902-902 |
| getMaxStartMidi | 903-903 |
| clampStartMidi | 904-904 |
| getMidiLabel | 905-909 |
| getPanelBottomGap | 910-913 |
| normalizeSoundfontDefinition | 915-933 |
| setSoundfontCatalog | 935-956 |
| getSoundfontList | 958-958 |
| renderPianoOptions | 960-1004 |
| createKey | 1006-1017 |
| renderKeyboard | 1019-1051 |
| rebuildKeyboard | 1053-1064 |

### js/events.js (Active Runtime)
File lines: 1-2311

| Symbol | Lines |
|---|---|
| primeAudioFromGesture | 5-14 |
| shouldRestartRoundForSetting | 27-30 |
| patchSettingsState | 32-38 |
| adjustKeyCount | 418-421 |
| bindKeyCountStepper | 423-428 |
| isChordTutorialOpen | 630-630 |
| fitTutorialLayout | 633-661 |
| clearFitClasses | 639-642 |
| applyFitClass | 644-649 |
| getTutorialStep | 663-668 |
| getStepUnlockedRootSet | 670-678 |
| getStepUnlockedQualitySet | 680-686 |
| isTutorialRootEnabled | 688-688 |
| isTutorialQualityEnabled | 689-689 |
| getTutorialRootLabel | 691-694 |
| midiToTutorialLabel | 696-700 |
| getClosestNoteIdFromMidi | 702-709 |
| getTutorialRenderedChord | 711-733 |
| ensureTutorialKeyboard | 735-773 |
| getStepAllowedQualityIds | 775-777 |
| getTutorialActiveSpec | 779-781 |
| renderTutorialCurrentText | 783-794 |
| renderTutorialPianoHighlight | 796-830 |
| renderTutorialRootOptions | 832-850 |
| renderTutorialQualityOptions | 852-897 |
| syncTutorialRootChipStates | 899-918 |
| syncTutorialQualityChipStates | 920-939 |
| setTutorialHoverSpec | 941-948 |
| clearTutorialHoverSpec | 950-953 |
| refreshTutorialVisuals | 955-959 |
| getTutorialStepIndexForQuality | 989-995 |
| renderChordTutorialTabs | 997-1025 |
| fitTutorialProgressTabs | 1027-1032 |
| renderChordTutorialStep | 1034-1090 |
| closeChordTutorial | 1092-1128 |
| clearSuppress | 1106-1112 |
| openChordTutorial | 1130-1165 |
| registerTutorialOpenTrigger | 1167-1174 |
| openChordTutorialForChordLink | 1176-1186 |
| handleChordLinkActivation | 1188-1195 |
| syncHelperPinnedUi | 1248-1257 |
| shouldBlurAfterUnpin | 1259-1264 |
| toggleRootHintFromHelper | 1266-1283 |
| toggleHelperPinned | 1285-1308 |
| handleHelperPinEvent | 1310-1316 |
| isChordTypingCaptureActive | 1412-1417 |
| insertTypedCharacter | 1419-1426 |
| triggerPrimaryAction | 1429-1438 |
| getButtonLikeTarget | 1441-1441 |
| blurPointerActivatedControl | 1442-1449 |
| logCursorDebug | 1454-1457 |
| applyCursorSimpleMode | 1470-1473 |
| ensureCustomCursorEl | 1475-1495 |
| getCustomCursorMode | 1496-1508 |
| syncCustomCursorState | 1509-1515 |
| renderCustomCursor | 1516-1522 |
| scheduleCustomCursorRender | 1523-1526 |
| scheduleCursorMotion | 1528-1531 |
| stepCursorMotion | 1533-1551 |
| setCustomCursorEnabled | 1552-1567 |
| setCursorSimpleMode | 1569-1574 |
| setCursorSmoothing | 1576-1582 |
| updateCustomCursorPosition | 1583-1609 |
| triggerReplayAction | 1611-1617 |
| bindPianoOptionEvents | 1777-1802 |
| handlePointerUpdate | 1877-1884 |
| applyCustomCursorMediaState | 1932-1934 |
| isElementVisible | 1964-1970 |
| getFocusableElements | 1972-1976 |
| focusFirstInModal | 1982-1988 |
| trapModalFocus | 1990-2012 |
| isTextEditableTarget | 2014-2019 |
| getActiveModalEl | 2021-2026 |
| closeGameSettingsModalUi | 2028-2037 |
| openGameSettingsModalUi | 2039-2045 |
| closeActiveModal | 2047-2061 |
| moveFocusInPanel | 2063-2074 |
| setRandomBackgroundAngle | 2264-2267 |
| init | 2269-2305 |
| runDeferredCatalogLoad | 2289-2298 |

Event bindings:
| Target | Event | Line |
|---|---|---:|
| document | pointerdown | 16 |
| document | keydown | 17 |
| document | touchstart | 18 |
| noteCountInput | input | 69 |
| noteCountInput | change | 76 |
| noteCountInput | pointerup | 80 |
| button | click | 85 |
| button | click | 100 |
| blindToggle | change | 108 |
| hideLivePreviewToggle | change | 117 |
| niceNotesToggle | change | 126 |
| chordRoundsToggle | change | 142 |
| practiceModeSelect | change | 148 |
| trainingModeSelect | change | 155 |
| chordDifficultySelect | change | 170 |
| chordExtraHelpersToggle | change | 187 |
| chordRootHintToggle | change | 197 |
| typingShowPianoToggle | change | 213 |
| typingShowTypedToggle | change | 223 |
| resetSettingsButton | click | 235 |
| settingsToggle | click | 249 |
| themeToggle | click | 258 |
| homeToggle | click | 269 |
| settingsPanel | click | 278 |
| optionsTrigger | click | 300 |
| gameSettingsOpen | click | 307 |
| gameSettingsBackdrop | click | 314 |
| gameSettingsClose | click | 321 |
| document | click | 327 |
| window | resize | 331 |
| playSelectedButton | click | 342 |
| playSelectedButton | pointerdown | 346 |
| playSelectedButton | pointerup | 351 |
| playSelectedButton | pointerleave | 355 |
| primaryActionButton | click | 359 |
| volumeSlider | input | 367 |
| lengthSlider | input | 373 |
| attackSlider | input | 379 |
| decaySlider | input | 385 |
| releaseSlider | input | 391 |
| sustainSlider | input | 397 |
| keyCountSlider | input | 403 |
| keyCountSlider | change | 410 |
| keyCountSlider | pointerup | 414 |
| hintButton | click | 433 |
| chordAnswerInput | input | 438 |
| chordAnswerInput | keydown | 445 |
| window | pointermove | 1114 |
| window | pointerdown | 1115 |
| window | keydown | 1116 |
| triggerEl | click | 1169 |
| document | click | 1197 |
| document | keydown | 1198 |
| chordTutorialTabs | click | 1204 |
| chordTutorialClose | click | 1216 |
| chordTutorialBackdrop | click | 1223 |
| chordTutorialPrev | click | 1229 |
| chordTutorialNext | click | 1237 |
| document | click | 1318 |
| document | keydown | 1320 |
| document | contextmenu | 1325 |
| chordTutorialRootList | mouseover | 1328 |
| chordTutorialRootList | mouseleave | 1336 |
| chordTutorialRootList | focusin | 1339 |
| chordTutorialRootList | focusout | 1347 |
| chordTutorialRootList | click | 1350 |
| chordTutorialQualityList | mouseover | 1366 |
| chordTutorialQualityList | mouseleave | 1373 |
| chordTutorialQualityList | focusin | 1376 |
| chordTutorialQualityList | focusout | 1383 |
| chordTutorialQualityList | click | 1386 |
| volumeSlider | dblclick | 1619 |
| lengthSlider | dblclick | 1623 |
| keyCountSlider | dblclick | 1627 |
| startNoteDownButton | click | 1633 |
| startNoteUpButton | click | 1636 |
| startNoteDownOctButton | click | 1642 |
| startNoteUpOctButton | click | 1645 |
| noteCountInput | dblclick | 1650 |
| attackSlider | dblclick | 1658 |
| decaySlider | dblclick | 1662 |
| releaseSlider | dblclick | 1666 |
| sustainSlider | dblclick | 1670 |
| profileSearch | input | 1675 |
| profileList | click | 1681 |
| profileList | dblclick | 1686 |
| profileList | keydown | 1689 |
| profileApply | click | 1700 |
| profileSave | click | 1706 |
| instrumentPresetSearch | input | 1712 |
| instrumentPresetList | click | 1718 |
| instrumentPresetList | dblclick | 1723 |
| instrumentPresetList | keydown | 1726 |
| instrumentPresetApply | click | 1737 |
| advancedTrigger | click | 1742 |
| advancedPanel | click | 1747 |
| pianoTrigger | click | 1752 |
| pianoPanel | click | 1759 |
| instrumentBrowserTrigger | click | 1765 |
| instrumentBrowserPanel | click | 1772 |
| pianoOptionsContainer | click | 1780 |
| pianoOptionsContainer | keydown | 1794 |
| pianoPreviewMain | click | 1805 |
| testEnvelopeButton | click | 1812 |
| keyboardEl | pointerdown | 1817 |
| document | pointerup | 1853 |
| document | pointercancel | 1860 |
| document | pointerdown | 1867 |
| document | click | 1873 |
| document | pointerrawupdate | 1888 |
| document | pointermove | 1891 |
| document | pointerup | 1893 |
| document | pointercancel | 1898 |
| document | pointerover | 1903 |
| document | pointerout | 1909 |
| window | blur | 1918 |
| document | visibilitychange | 1924 |
| CUSTOM_CURSOR_QUERY | change | 1936 |
| keyboardEl | click | 1957 |
| document | keydown | 2076 |
| document | keyup | 2212 |
| pedalBox | pointerdown | 2231 |
| pedalBox | pointerup | 2240 |
| pedalBox | pointercancel | 2249 |
| pedalBox | pointerleave | 2257 |

### js/game.js (Active Runtime)
File lines: 1-2219

| Symbol | Lines |
|---|---|
| getHelperPinRound | 138-138 |
| syncHelperPinRound | 140-146 |
| getLocalPinnedHelperLabels | 148-151 |
| getGlobalPinnedHelperLabels | 153-153 |
| isHelperPinnedGlobalLabel | 155-159 |
| isHelperPinnedLocalLabel | 161-161 |
| toggleHelperPinnedLocalLabel | 167-177 |
| toggleHelperPinnedGlobalLabel | 179-190 |
| setHelperPinnedGlobalLabel | 192-210 |
| setRootHelperPinned | 212-216 |
| getHelperPinFlags | 218-226 |
| applyRoundStatePatch | 232-241 |
| applySubmissionStatePatch | 243-252 |
| normalizeQualityToken | 254-271 |
| renderChordLink | 280-304 |
| getKeyboardZoneEl | 332-332 |
| normalizePitchClass | 333-333 |
| getRootName | 334-334 |
| getMidiFromNoteId | 335-335 |
| buildChordLabel | 336-336 |
| getPitchClassSetFromNoteIds | 338-346 |
| getRootGuideNoteId | 352-367 |
| getEffectiveKeyboardSelection | 369-381 |
| getChordDifficultyId | 383-388 |
| getChordDisplayLabel | 390-390 |
| getChordQualityDisplaySuffix | 392-392 |
| getChordDifficultyConfig | 394-397 |
| getAllowedChordQualities | 399-404 |
| getChordQualityHint | 406-409 |
| getConsistentPreviewDuration | 417-420 |
| playConsistentPreview | 426-444 |
| releaseInteractivePressSession | 481-509 |
| getReplayNoteIds | 511-535 |
| getVoicingHintLabel | 537-541 |
| randomSample | 543-550 |
| getNiceTarget | 552-589 |
| getQualityPitchClassSet | 591-597 |
| parseChordInput | 599-638 |
| detectChordFromNoteIds | 640-676 |
| normalizeIntervals | 678-680 |
| fitIntervalsToAvailableRange | 682-702 |
| buildVoicedIntervals | 704-732 |
| chooseRootCandidatesForIntervals | 734-743 |
| buildChordFromRoot | 745-773 |
| createChordTarget | 775-825 |
| createNoteTarget | 827-862 |
| createTarget | 864-871 |
| clearTypingAutoNext | 873-877 |
| ensureRoundPlaybackReady | 888-905 |
| getTypedPreviewNoteIds | 907-941 |
| updateTypedPreviewFromInput | 943-956 |
| updateChordReadout | 958-1030 |
| updateModeVisibility | 1032-1049 |
| updatePrimaryAction | 1051-1056 |
| updateReplayAvailability | 1058-1065 |
| getChordHelperHints | 1067-1083 |
| createDeterministicHelperMask | 1101-1129 |
| renderChordHelperBox | 1131-1160 |
| updateStatus | 1162-1286 |
| updateKeyStates | 1288-1349 |
| setKeyboardEnabled | 1351-1354 |
| updateKeyboardScale | 1356-1367 |
| lockKeyboardForPlayback | 1369-1382 |
| setSubmitted | 1384-1391 |
| goHome | 1393-1445 |
| refreshTarget | 1447-1473 |
| startRound | 1475-1551 |
| ensureRound | 1553-1562 |
| playTarget | 1564-1578 |
| startManualNote | 1580-1598 |
| releaseManualNote | 1600-1608 |
| releasePedalNotes | 1610-1620 |
| startPedalHold | 1622-1628 |
| stopPedalHold | 1630-1637 |
| toggleSelection | 1639-1683 |
| isSelectionCorrect | 1685-1702 |
| getPlaybackSpan | 1704-1709 |
| renderNotePills | 1711-1717 |
| renderChordPill | 1719-1723 |
| renderTonePills | 1725-1733 |
| renderRevealCell | 1735-1740 |
| renderChordRevealGrid | 1742-1745 |
| renderChordDetectionMeta | 1747-1751 |
| renderPressedPills | 1753-1758 |
| buildNoteComparison | 1760-1767 |
| buildAnswerNoteCell | 1769-1778 |
| buildTargetNoteCell | 1780-1793 |
| getSubmittedReplaySnapshot | 1817-1831 |
| playSubmittedReplaySequence | 1833-1846 |
| playRevealSequence | 1848-1898 |
| playSelectedChord | 1900-1924 |
| playTypedInputChord | 1926-1939 |
| startHeldPlayback | 1941-1967 |
| releaseHeldPlayback | 1969-1983 |
| buildTypingRevealDetail | 1985-2005 |
| submitTypedAnswer | 2007-2081 |
| submitAnswer | 2083-2146 |
| sanitizeRoundStateForKeyboardRange | 2148-2188 |

### js/settings.js (Active Runtime)
File lines: 1-1474

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
| normalizeChordDifficultyId | 868-873 |
| getKeyCountMinimum | 875-880 |
| resolveKeyCountForPreference | 891-895 |
| clampStartMidiForKeyCount | 897-900 |
| updateKeyCountDisplay | 902-912 |
| setKeyCount | 914-933 |
| setStartMidi | 935-944 |
| setKeyCountVisual | 946-949 |
| refreshOptionsModeVisibility | 958-980 |
| setPracticeMode | 982-1068 |
| applyUiFromState | 1070-1134 |
| commitCriticalChange | 1141-1146 |
| commitNoteCountChange | 1148-1157 |
| handleCriticalSettingChange | 1159-1173 |
| openSettings | 1175-1180 |
| positionFloatingPanel | 1182-1211 |
| setGameSettingsModalOpenState | 1213-1223 |
| isGameSettingsModalOpenInternal | 1225-1225 |
| openGameSettingsModalInternal | 1227-1238 |
| closeGameSettingsModalInternal | 1240-1248 |
| positionPianoPanel | 1250-1253 |
| positionInstrumentBrowserPanel | 1255-1258 |
| getFloatingPanelConfig | 1263-1295 |
| isFloatingPanelOpen | 1297-1300 |
| setFloatingPanelOpenState | 1302-1307 |
| closeFloatingPanel | 1313-1326 |
| closeAllFloatingPanels | 1328-1334 |
| openFloatingPanel | 1336-1361 |
| toggleFloatingPanel | 1363-1368 |
| repositionOpenFloatingPanels | 1370-1378 |
| openOptionsPanel | 1380-1380 |
| closeOptionsPanel | 1381-1381 |
| openAdvanced | 1382-1382 |
| closeAdvanced | 1383-1383 |
| openPianoPanel | 1384-1384 |
| closePianoPanel | 1385-1385 |
| openInstrumentBrowser | 1386-1386 |
| closeInstrumentBrowser | 1387-1387 |
| closeSettings | 1389-1407 |

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

