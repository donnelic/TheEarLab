# Project Map

Generated: 2026-03-10 14:30:14 +01:00

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
| styles.css | CSS | Loaded directly | Yes | 3385 |
| js/audio.js | JavaScript | Browser runtime module | Yes | 1529 |
| js/core.js | JavaScript | Browser runtime module | Yes | 1065 |
| js/events.js | JavaScript | Browser runtime module | Yes | 2155 |
| js/game.js | JavaScript | Browser runtime module | Yes | 2183 |
| js/settings.js | JavaScript | Browser runtime module | Yes | 1474 |
| README.md | Markdown | Human + AI onboarding | Yes | 135 |
| IMPLEMENTATION_CHECKLIST.md | Markdown | Implementation roadmap checklist | Yes | 237 |
| AGENTS.md | Markdown | AI instruction override | Yes | 47 |
| PROJECT_MAP.md | Markdown | Generated reference map | Yes | 1230 |
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
| 1 | vendor/libfluidsynth-2.4.6.js?v=20260310104635 | 559 |
| 2 | vendor/js-synthesizer.min.js?v=20260310104635 | 560 |
| 3 | js/core.js?v=20260310104635 | 561 |
| 4 | js/store/reducers.js?v=20260310104635 | 562 |
| 5 | js/store/actions.js?v=20260310104635 | 563 |
| 6 | js/store/selectors.js?v=20260310104635 | 564 |
| 7 | js/store/store.js?v=20260310104635 | 565 |
| 8 | js/features/round/state-mutations.js?v=20260310104635 | 566 |
| 9 | js/features/settings/state-mutations.js?v=20260310104635 | 567 |
| 10 | js/features/chords/index.js?v=20260310104635 | 568 |
| 11 | js/features/typing/index.js?v=20260310104635 | 569 |
| 12 | js/features/tutorial/index.js?v=20260310104635 | 570 |
| 13 | js/features/audio-preview/index.js?v=20260310104635 | 571 |
| 14 | js/features/input/index.js?v=20260310104635 | 572 |
| 15 | js/audio.js?v=20260310104635 | 573 |
| 16 | js/game.js?v=20260310104635 | 574 |
| 17 | js/settings.js?v=20260310104635 | 575 |
| 18 | js/events.js?v=20260310104635 | 576 |

## styles.css Map
File: styles.css (1-3385)

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
| .app-cursor | 1781-1792 |
| .app-cursor.visible | 1794-1796 |
| .app-cursor-ring, .app-cursor-dot | 1799-1806 |
| .app-cursor-ring | 1808-1816 |
| .app-cursor-dot | 1818-1822 |
| .app-cursor.is-interactive .app-cursor-ring | 1824-1829 |
| .app-cursor.is-interactive .app-cursor-dot | 1831-1833 |
| .app-cursor.is-helper .app-cursor-ring | 1835-1842 |
| .app-cursor.is-helper .app-cursor-dot | 1844-1849 |
| .app-cursor.is-text .app-cursor-ring | 1851-1856 |
| .app-cursor.is-pressed .app-cursor-ring | 1858-1860 |
| .app-cursor.is-pressed .app-cursor-dot | 1862-1864 |
| .helper-label | 1866-1875 |
| .helper-item .helper-value | 1877-1885 |
| .helper-item .helper-mask | 1887-1895 |
| .helper-item .helper-real | 1897-1909 |
| .helper-item:hover .helper-mask, .helper-item:focus-within .helper-mask, .helper-i... | 1915-1918 |
| .helper-item:hover .helper-real, .helper-item:focus-within .helper-real, .helper-i... | 1924-1927 |
| .typing-zone[hidden] | 1929-1931 |
| .status | 1933-1944 |
| .status[hidden] | 1946-1948 |
| .helper-slot[hidden] | 1950-1952 |
| .status-actions | 1954-1960 |
| .hint-flag | 1962-1975 |
| .hint-flag[hidden] | 1977-1979 |
| .hint-button | 1981-1983 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) | 1985-1999 |
| .settings-toggle | 2001-2003 |
| .theme-toggle | 2005-2007 |
| .home-toggle | 2009-2011 |
| :is(.settings-toggle, .theme-toggle, .home-toggle):hover | 2013-2015 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) svg | 2017-2021 |
| .settings-toggle svg | 2023-2026 |
| .settings-panel | 2028-2047 |
| .settings-panel.open | 2049-2053 |
| .settings-panel h2 | 2055-2060 |
| .settings-body | 2062-2066 |
| .settings-grid | 2068-2071 |
| .settings-section-title | 2073-2081 |
| .panel-trigger, .advanced-trigger, .dropdown-trigger, .control select | 2086-2095 |
| .advanced-trigger | 2097-2101 |
| .dropdown-trigger | 2103-2111 |
| .dropdown-trigger svg | 2113-2117 |
| .panel-trigger | 2119-2124 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger):hover | 2126-2129 |
| .panel-trigger:hover | 2131-2133 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger)[aria-expanded="true"] | 2135-2138 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger, .control select):focus-v... | 2140-2143 |
| .control select | 2145-2149 |
| .options-panel | 2151-2167 |
| .options-panel.open | 2169-2173 |
| .options-panel h3 | 2175-2182 |
| .options-grid | 2184-2187 |
| .options-panel .control | 2189-2195 |
| .options-panel .control.compact | 2197-2199 |
| .options-panel .control>label | 2201-2203 |
| .options-section-title | 2205-2214 |
| .options-panel .options-section-title:first-child | 2216-2220 |
| .advanced-panel | 2222-2241 |
| .advanced-panel.open | 2243-2247 |
| .advanced-panel h3 | 2249-2254 |
| .advanced-grid | 2256-2265 |
| .advanced-grid::-webkit-scrollbar | 2267-2269 |
| .advanced-grid::-webkit-scrollbar-track | 2271-2274 |
| .advanced-grid::-webkit-scrollbar-thumb | 2276-2280 |
| .inline-value | 2282-2289 |
| .slider-stack | 2291-2294 |
| .slider-stack input[type="range"] | 2296-2300 |
| .slider-ghost | 2302-2316 |
| .slider-ghost.visible | 2318-2320 |
| .sf2-browser | 2322-2325 |
| .sf2-browser input[type="text"] | 2327-2336 |
| .sf2-preset-list | 2338-2351 |
| .sf2-browser .piano-desc | 2353-2356 |
| .sf2-browser .piano-desc.pending, .profile-browser .piano-desc.pending | 2359-2361 |
| .sf2-group | 2363-2368 |
| .sf2-group-title | 2370-2379 |
| .sf2-row | 2381-2389 |
| .sf2-row:first-child | 2391-2393 |
| .sf2-row:hover | 2395-2397 |
| .sf2-row.active | 2399-2402 |
| .sf2-row-name | 2404-2410 |
| .sf2-row-program, .sf2-row-bank | 2413-2417 |
| .sf2-empty | 2419-2423 |
| .profile-browser | 2425-2428 |
| .profile-browser input[type="text"] | 2430-2439 |
| .profile-list | 2441-2454 |
| .profile-row | 2456-2466 |
| .profile-row:hover | 2468-2470 |
| .profile-row.active | 2472-2475 |
| .profile-row.applied | 2477-2479 |
| .profile-row-name | 2481-2487 |
| .profile-row-kind | 2489-2494 |
| .advanced-footer | 2496-2502 |
| .piano-preview.wide | 2504-2516 |
| .piano-preview.wide::before | 2518-2520 |
| .piano-preview.wide .play-icon | 2522-2528 |
| .piano-preview.wide .play-label | 2530-2532 |
| .instrument-browser-panel | 2534-2549 |
| .instrument-browser-panel.open | 2551-2555 |
| .instrument-browser-panel h3 | 2557-2562 |
| .piano-panel | 2564-2579 |
| .piano-panel.open | 2581-2585 |
| .piano-panel h3 | 2587-2592 |
| .piano-options | 2594-2597 |
| .piano-option | 2599-2611 |
| .piano-option.active | 2613-2616 |
| .piano-option:focus-visible | 2618-2620 |
| .piano-info | 2622-2625 |
| .piano-name | 2627-2630 |
| .piano-desc | 2632-2635 |
| .piano-option.simple .piano-name | 2637-2641 |
| .piano-option.simple .piano-desc | 2643-2647 |
| .piano-preview | 2649-2664 |
| .piano-preview::before | 2666-2674 |
| .piano-preview:active | 2676-2679 |
| .piano-preview.main | 2681-2685 |
| .settings-grid input[type="range"], .game-settings-grid input[type="range"], .adva... | 2690-2694 |
| .settings-grid input[type="range"]::-webkit-slider-runnable-track, .game-settings-... | 2699-2704 |
| .settings-grid input[type="range"]::-webkit-slider-thumb, .game-settings-grid inpu... | 2709-2718 |
| .settings-grid input[type="range"]:focus-visible::-webkit-slider-thumb, .game-sett... | 2723-2726 |
| .settings-grid input[type="range"]::-moz-range-track, .game-settings-grid input[ty... | 2731-2736 |
| .settings-grid input[type="range"]::-moz-range-thumb, .game-settings-grid input[ty... | 2741-2748 |
| .settings-grid input[type="range"]:focus-visible::-moz-range-thumb, .game-settings... | 2753-2756 |
| .volume-value | 2758-2761 |
| .status-row | 2763-2768 |
| .switch | 2770-2779 |
| .switch input | 2781-2786 |
| .switch-track | 2788-2794 |
| .switch-thumb | 2796-2806 |
| .switch input:checked+.switch-track | 2808-2810 |
| .switch input:checked+.switch-track .switch-thumb | 2812-2814 |
| .switch input:focus-visible+.switch-track | 2816-2819 |
| .control.compact .unit | 2821-2823 |
| .test-tone | 2825-2837 |
| .test-tone:hover | 2839-2842 |
| .test-tone:active | 2844-2846 |
| .test-tone-icon | 2848-2855 |
| .test-tone-label | 2857-2861 |
| .result | 2863-2867 |
| .reveal | 2869-2877 |
| .reveal strong | 2879-2881 |
| .reveal-label | 2883-2890 |
| .reveal-grid.compact | 2892-2900 |
| .reveal-cell | 2902-2905 |
| .reveal-cell.reveal-target-chord | 2907-2909 |
| .reveal-cell.reveal-target-notes | 2911-2913 |
| .reveal-cell.reveal-your-chord | 2915-2917 |
| .reveal-cell.reveal-your-notes | 2919-2921 |
| .keyboard-zone | 2923-2933 |
| .keyboard-stack | 2935-2945 |
| .keyboard-wrapper | 2947-2956 |
| .keyboard | 2958-2965 |
| .keyboard-wrapper.ends-black | 2967-2969 |
| .white-keys | 2971-2974 |
| .black-keys | 2976-2983 |
| .key | 2985-2996 |
| .key.white | 2998-3005 |
| .key.white.has-black | 3007-3009 |
| .key.black | 3011-3020 |
| .key span | 3022-3026 |
| .key.black span | 3028-3032 |
| .key.active | 3034-3037 |
| .key.black.active | 3039-3042 |
| .key.selected | 3044-3048 |
| .key.typed-preview | 3050-3052 |
| .key.correct | 3054-3058 |
| .key.wrong | 3060-3064 |
| .key.missed | 3066-3072 |
| .key.black.selected, .key.black.correct, .key.black.wrong | 3076-3078 |
| .key.black.missed | 3080-3086 |
| .keyboard.disabled | 3088-3094 |
| body.tutorial-open .keyboard | 3096-3098 |
| body.tutorial-open .keyboard.disabled | 3100-3103 |
| .keyboard.disabled::before | 3105-3117 |
| body.tutorial-open .keyboard.disabled::before | 3119-3121 |
| .keyboard.disabled::after | 3123-3157 |
| body.tutorial-open .keyboard.disabled::after | 3159-3161 |
| .tips | 3163-3172 |
| #pedal-tip[hidden] | 3174-3176 |
| .pedal-box | 3178-3192 |
| body.landing .pedal-box | 3194-3196 |
| .pedal-label | 3198-3208 |
| .pedal-icon | 3210-3217 |
| .pedal-icon.active | 3219-3222 |
| .note-pills | 3224-3231 |
| .reveal-grid.compact .note-pills | 3233-3235 |
| .note-pill | 3237-3243 |
| .reveal-grid.compact .note-pill | 3245-3248 |
| .note-pill.chord-pill | 3250-3258 |
| .note-pill.chord-pill .chord-link | 3260-3262 |
| .note-pill.chord-pill .chord-link-bubble | 3264-3269 |
| .note-pill.chord-pill:hover .chord-link-bubble | 3271-3274 |
| .note-pill.good | 3276-3280 |
| .note-pill.bad | 3282-3286 |
| .note-pill.missed | 3288-3292 |
| .note-pill.neutral | 3294-3298 |
| @media (max-width: 700px) | 3300-3355 |
| @media (max-height: 820px) | 3357-3378 |
| @media (max-height: 700px) | 3380-3385 |

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
File lines: 1-2155

| Symbol | Lines |
|---|---|
| primeAudioFromGesture | 5-14 |
| shouldRestartRoundForSetting | 27-30 |
| patchSettingsState | 32-38 |
| adjustKeyCount | 412-415 |
| bindKeyCountStepper | 417-422 |
| isChordTutorialOpen | 624-624 |
| fitTutorialLayout | 627-655 |
| clearFitClasses | 633-636 |
| applyFitClass | 638-643 |
| getTutorialStep | 657-662 |
| getStepUnlockedRootSet | 664-672 |
| getStepUnlockedQualitySet | 674-680 |
| isTutorialRootEnabled | 682-682 |
| isTutorialQualityEnabled | 683-683 |
| getTutorialRootLabel | 685-688 |
| midiToTutorialLabel | 690-694 |
| getClosestNoteIdFromMidi | 696-703 |
| getTutorialRenderedChord | 705-727 |
| ensureTutorialKeyboard | 729-767 |
| getStepAllowedQualityIds | 769-771 |
| getTutorialActiveSpec | 773-775 |
| renderTutorialCurrentText | 777-788 |
| renderTutorialPianoHighlight | 790-824 |
| renderTutorialRootOptions | 826-844 |
| renderTutorialQualityOptions | 846-891 |
| syncTutorialRootChipStates | 893-912 |
| syncTutorialQualityChipStates | 914-933 |
| setTutorialHoverSpec | 935-942 |
| clearTutorialHoverSpec | 944-947 |
| refreshTutorialVisuals | 949-953 |
| getTutorialStepIndexForQuality | 983-989 |
| renderChordTutorialTabs | 991-1019 |
| fitTutorialProgressTabs | 1021-1026 |
| renderChordTutorialStep | 1028-1084 |
| closeChordTutorial | 1086-1122 |
| clearSuppress | 1100-1106 |
| openChordTutorial | 1124-1159 |
| registerTutorialOpenTrigger | 1161-1168 |
| openChordTutorialForChordLink | 1170-1180 |
| handleChordLinkActivation | 1182-1189 |
| toggleHelperPinned | 1242-1254 |
| isChordTypingCaptureActive | 1360-1365 |
| insertTypedCharacter | 1367-1374 |
| triggerPrimaryAction | 1377-1386 |
| getButtonLikeTarget | 1389-1389 |
| blurPointerActivatedControl | 1390-1397 |
| ensureCustomCursorEl | 1407-1424 |
| getCustomCursorMode | 1425-1437 |
| renderCustomCursor | 1446-1454 |
| scheduleCustomCursorRender | 1455-1458 |
| setCustomCursorEnabled | 1459-1472 |
| updateCustomCursorPosition | 1473-1480 |
| triggerReplayAction | 1482-1488 |
| bindPianoOptionEvents | 1648-1673 |
| applyCustomCursorMediaState | 1791-1793 |
| isElementVisible | 1808-1814 |
| getFocusableElements | 1816-1820 |
| focusFirstInModal | 1826-1832 |
| trapModalFocus | 1834-1856 |
| isTextEditableTarget | 1858-1863 |
| getActiveModalEl | 1865-1870 |
| closeGameSettingsModalUi | 1872-1881 |
| openGameSettingsModalUi | 1883-1889 |
| closeActiveModal | 1891-1905 |
| moveFocusInPanel | 1907-1918 |
| setRandomBackgroundAngle | 2108-2111 |
| init | 2113-2149 |
| runDeferredCatalogLoad | 2133-2142 |

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
| chordExtraHelpersToggle | change | 185 |
| chordRootHintToggle | change | 195 |
| typingShowPianoToggle | change | 207 |
| typingShowTypedToggle | change | 217 |
| resetSettingsButton | click | 229 |
| settingsToggle | click | 243 |
| themeToggle | click | 252 |
| homeToggle | click | 263 |
| settingsPanel | click | 272 |
| optionsTrigger | click | 294 |
| gameSettingsOpen | click | 301 |
| gameSettingsBackdrop | click | 308 |
| gameSettingsClose | click | 315 |
| document | click | 321 |
| window | resize | 325 |
| playSelectedButton | click | 336 |
| playSelectedButton | pointerdown | 340 |
| playSelectedButton | pointerup | 345 |
| playSelectedButton | pointerleave | 349 |
| primaryActionButton | click | 353 |
| volumeSlider | input | 361 |
| lengthSlider | input | 367 |
| attackSlider | input | 373 |
| decaySlider | input | 379 |
| releaseSlider | input | 385 |
| sustainSlider | input | 391 |
| keyCountSlider | input | 397 |
| keyCountSlider | change | 404 |
| keyCountSlider | pointerup | 408 |
| hintButton | click | 427 |
| chordAnswerInput | input | 432 |
| chordAnswerInput | keydown | 439 |
| window | pointermove | 1108 |
| window | pointerdown | 1109 |
| window | keydown | 1110 |
| triggerEl | click | 1163 |
| document | click | 1191 |
| document | keydown | 1192 |
| chordTutorialTabs | click | 1198 |
| chordTutorialClose | click | 1210 |
| chordTutorialBackdrop | click | 1217 |
| chordTutorialPrev | click | 1223 |
| chordTutorialNext | click | 1231 |
| document | click | 1256 |
| document | keydown | 1262 |
| document | contextmenu | 1269 |
| chordTutorialRootList | mouseover | 1276 |
| chordTutorialRootList | mouseleave | 1284 |
| chordTutorialRootList | focusin | 1287 |
| chordTutorialRootList | focusout | 1295 |
| chordTutorialRootList | click | 1298 |
| chordTutorialQualityList | mouseover | 1314 |
| chordTutorialQualityList | mouseleave | 1321 |
| chordTutorialQualityList | focusin | 1324 |
| chordTutorialQualityList | focusout | 1331 |
| chordTutorialQualityList | click | 1334 |
| volumeSlider | dblclick | 1490 |
| lengthSlider | dblclick | 1494 |
| keyCountSlider | dblclick | 1498 |
| startNoteDownButton | click | 1504 |
| startNoteUpButton | click | 1507 |
| startNoteDownOctButton | click | 1513 |
| startNoteUpOctButton | click | 1516 |
| noteCountInput | dblclick | 1521 |
| attackSlider | dblclick | 1529 |
| decaySlider | dblclick | 1533 |
| releaseSlider | dblclick | 1537 |
| sustainSlider | dblclick | 1541 |
| profileSearch | input | 1546 |
| profileList | click | 1552 |
| profileList | dblclick | 1557 |
| profileList | keydown | 1560 |
| profileApply | click | 1571 |
| profileSave | click | 1577 |
| instrumentPresetSearch | input | 1583 |
| instrumentPresetList | click | 1589 |
| instrumentPresetList | dblclick | 1594 |
| instrumentPresetList | keydown | 1597 |
| instrumentPresetApply | click | 1608 |
| advancedTrigger | click | 1613 |
| advancedPanel | click | 1618 |
| pianoTrigger | click | 1623 |
| pianoPanel | click | 1630 |
| instrumentBrowserTrigger | click | 1636 |
| instrumentBrowserPanel | click | 1643 |
| pianoOptionsContainer | click | 1651 |
| pianoOptionsContainer | keydown | 1665 |
| pianoPreviewMain | click | 1676 |
| testEnvelopeButton | click | 1683 |
| keyboardEl | pointerdown | 1688 |
| document | pointerup | 1724 |
| document | pointercancel | 1731 |
| document | pointerdown | 1738 |
| document | click | 1744 |
| document | pointermove | 1748 |
| document | pointerup | 1752 |
| document | pointercancel | 1757 |
| document | pointerover | 1762 |
| document | pointerout | 1768 |
| window | blur | 1777 |
| document | visibilitychange | 1783 |
| CUSTOM_CURSOR_QUERY | change | 1795 |
| keyboardEl | click | 1801 |
| document | keydown | 1920 |
| document | keyup | 2056 |
| pedalBox | pointerdown | 2075 |
| pedalBox | pointerup | 2084 |
| pedalBox | pointercancel | 2093 |
| pedalBox | pointerleave | 2101 |

### js/game.js (Active Runtime)
File lines: 1-2183

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
| applyRoundStatePatch | 196-205 |
| applySubmissionStatePatch | 207-216 |
| normalizeQualityToken | 218-235 |
| renderChordLink | 244-268 |
| getKeyboardZoneEl | 296-296 |
| normalizePitchClass | 297-297 |
| getRootName | 298-298 |
| getMidiFromNoteId | 299-299 |
| buildChordLabel | 300-300 |
| getPitchClassSetFromNoteIds | 302-310 |
| getRootGuideNoteId | 316-331 |
| getEffectiveKeyboardSelection | 333-345 |
| getChordDifficultyId | 347-352 |
| getChordDisplayLabel | 354-354 |
| getChordQualityDisplaySuffix | 356-356 |
| getChordDifficultyConfig | 358-361 |
| getAllowedChordQualities | 363-368 |
| getChordQualityHint | 370-373 |
| getConsistentPreviewDuration | 381-384 |
| playConsistentPreview | 390-408 |
| releaseInteractivePressSession | 445-473 |
| getReplayNoteIds | 475-499 |
| getVoicingHintLabel | 501-505 |
| randomSample | 507-514 |
| getNiceTarget | 516-553 |
| getQualityPitchClassSet | 555-561 |
| parseChordInput | 563-602 |
| detectChordFromNoteIds | 604-640 |
| normalizeIntervals | 642-644 |
| fitIntervalsToAvailableRange | 646-666 |
| buildVoicedIntervals | 668-696 |
| chooseRootCandidatesForIntervals | 698-707 |
| buildChordFromRoot | 709-737 |
| createChordTarget | 739-789 |
| createNoteTarget | 791-826 |
| createTarget | 828-835 |
| clearTypingAutoNext | 837-841 |
| ensureRoundPlaybackReady | 852-869 |
| getTypedPreviewNoteIds | 871-905 |
| updateTypedPreviewFromInput | 907-920 |
| updateChordReadout | 922-994 |
| updateModeVisibility | 996-1013 |
| updatePrimaryAction | 1015-1020 |
| updateReplayAvailability | 1022-1029 |
| getChordHelperHints | 1031-1049 |
| createDeterministicHelperMask | 1067-1095 |
| renderChordHelperBox | 1097-1126 |
| updateStatus | 1128-1252 |
| updateKeyStates | 1254-1315 |
| setKeyboardEnabled | 1317-1320 |
| updateKeyboardScale | 1322-1333 |
| lockKeyboardForPlayback | 1335-1348 |
| setSubmitted | 1350-1357 |
| goHome | 1359-1411 |
| refreshTarget | 1413-1439 |
| startRound | 1441-1517 |
| ensureRound | 1519-1528 |
| playTarget | 1530-1544 |
| startManualNote | 1546-1564 |
| releaseManualNote | 1566-1574 |
| releasePedalNotes | 1576-1586 |
| startPedalHold | 1588-1594 |
| stopPedalHold | 1596-1603 |
| toggleSelection | 1605-1649 |
| isSelectionCorrect | 1651-1668 |
| getPlaybackSpan | 1670-1675 |
| renderNotePills | 1677-1683 |
| renderChordPill | 1685-1689 |
| renderTonePills | 1691-1699 |
| renderRevealCell | 1701-1706 |
| renderChordRevealGrid | 1708-1711 |
| renderChordDetectionMeta | 1713-1717 |
| renderPressedPills | 1719-1724 |
| buildNoteComparison | 1726-1733 |
| buildAnswerNoteCell | 1735-1744 |
| buildTargetNoteCell | 1746-1759 |
| getSubmittedReplaySnapshot | 1783-1797 |
| playSubmittedReplaySequence | 1799-1812 |
| playRevealSequence | 1814-1864 |
| playSelectedChord | 1866-1890 |
| playTypedInputChord | 1892-1905 |
| startHeldPlayback | 1907-1933 |
| releaseHeldPlayback | 1935-1949 |
| buildTypingRevealDetail | 1951-1971 |
| submitTypedAnswer | 1973-2047 |
| submitAnswer | 2049-2112 |
| sanitizeRoundStateForKeyboardRange | 2114-2154 |

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

