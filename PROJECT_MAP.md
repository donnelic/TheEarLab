# Project Map

Generated: 2026-03-11 12:23:40 +01:00

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
| index.html | HTML | Loaded directly | Yes | 593 |
| styles.css | CSS | Loaded directly | Yes | 3394 |
| js/audio.js | JavaScript | Browser runtime module | Yes | 1529 |
| js/core.js | JavaScript | Browser runtime module | Yes | 1072 |
| js/events.js | JavaScript | Browser runtime module | Yes | 2359 |
| js/game.js | JavaScript | Browser runtime module | Yes | 2219 |
| js/settings.js | JavaScript | Browser runtime module | Yes | 1480 |
| README.md | Markdown | Human + AI onboarding | Yes | 135 |
| IMPLEMENTATION_CHECKLIST.md | Markdown | Implementation roadmap checklist | Yes | 237 |
| AGENTS.md | Markdown | AI instruction override | Yes | 47 |
| PROJECT_MAP.md | Markdown | Generated reference map | Yes | 1260 |
| tools/generate-project-map.ps1 | PowerShell | Documentation generator | Yes | 540 |
| tools/smoke-checklist.md | Markdown | Manual regression checklist | Yes | 59 |
| soundfonts/GeneralUser-GS.sf2 | Asset | Soundfont asset | Yes | 0 |
| soundfonts/index.json | JSON | Soundfont asset | Yes | 3 |
| soundfonts/README.md | Markdown | Soundfont asset | Yes | 39 |

## index.html Map
File: index.html (1-593)

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
| custom-cursor | <input> | 132 |
| reset-settings | <button> | 142 |
| advanced-panel | <section> | 145 |
| attack-label-value | <span> | 149 |
| attack-time | <input> | 152 |
| attack-ghost | <span> | 153 |
| attack-value | <span> | 155 |
| decay-label-value | <span> | 159 |
| decay-rate | <input> | 162 |
| decay-ghost | <span> | 163 |
| decay-value | <span> | 165 |
| release-label-value | <span> | 169 |
| release-rate | <input> | 172 |
| release-ghost | <span> | 173 |
| release-value | <span> | 175 |
| sustain-label-value | <span> | 179 |
| sustain-length | <input> | 182 |
| sustain-ghost | <span> | 183 |
| sustain-value | <span> | 185 |
| profile-search | <input> | 190 |
| profile-list | <div> | 191 |
| profile-meta | <div> | 192 |
| profile-save | <button> | 194 |
| profile-apply | <button> | 195 |
| test-envelope | <button> | 200 |
| piano-panel | <section> | 207 |
| piano-options | <div> | 209 |
| instrument-browser-panel | <section> | 212 |
| instrument-preset-search | <input> | 216 |
| instrument-preset-list | <div> | 217 |
| instrument-preset-meta | <div> | 218 |
| instrument-preset-apply | <button> | 220 |
| game-settings-modal | <section> | 225 |
| game-settings-backdrop | <button> | 226 |
| game-settings-title | <h4> | 231 |
| game-settings-close | <button> | 233 |
| practice-mode | <select> | 242 |
| game-key-count-down-oct | <button> | 254 |
| game-key-count-down | <button> | 256 |
| game-key-count-value | <span> | 257 |
| game-key-count-up | <button> | 258 |
| game-key-count-up-oct | <button> | 259 |
| note-count | <input> | 271 |
| note-count-value | <span> | 272 |
| blind-mode | <input> | 280 |
| nice-notes | <input> | 293 |
| chord-rounds | <input> | 306 |
| training-mode | <select> | 331 |
| chord-difficulty | <select> | 346 |
| chord-tutorial-open-options | <button> | 358 |
| chord-root-hint | <input> | 371 |
| hide-live-preview | <input> | 384 |
| typing-show-typed | <input> | 397 |
| typing-show-piano | <input> | 410 |
| chord-extra-helpers | <input> | 423 |
| primary-action | <button> | 445 |
| play-selected | <button> | 446 |
| quick-start | <section> | 449 |
| keyboard | <div> | 467 |
| white-keys | <div> | 468 |
| black-keys | <div> | 469 |
| pedal-icon | <div> | 474 |
| chord-readout | <section> | 479 |
| typing-zone | <section> | 480 |
| chord-answer | <input> | 484 |
| typing-help-toggle | <button> | 485 |
| status-panel | <section> | 491 |
| round-count | <span> | 493 |
| selected-list | <span> | 494 |
| goal-count | <span> | 495 |
| mode-label | <span> | 496 |
| game-settings-open | <button> | 499 |
| hint-button | <button> | 500 |
| result | <div> | 502 |
| helper-slot | <div> | 503 |
| reveal | <div> | 504 |
| hint-flag | <div> | 505 |
| pedal-tip | <span> | 511 |
| chord-tutorial-modal | <section> | 515 |
| chord-tutorial-backdrop | <button> | 516 |
| chord-tutorial-title | <h4> | 519 |
| chord-tutorial-close | <button> | 520 |
| chord-tutorial-step | <div> | 522 |
| chord-tutorial-current | <div> | 524 |
| chord-tutorial-piano | <div> | 527 |
| tutorial-row-root | <div> | 530 |
| chord-tutorial-root-list | <div> | 532 |
| tutorial-row-quality | <div> | 534 |
| chord-tutorial-quality-list | <div> | 536 |
| chord-tutorial-progress | <span> | 542 |
| chord-tutorial-prev | <button> | 544 |
| chord-tutorial-tabs | <div> | 545 |
| chord-tutorial-next | <button> | 547 |
| app-dialog | <section> | 554 |
| app-dialog-backdrop | <button> | 555 |
| app-dialog-title | <h4> | 558 |
| app-dialog-close | <button> | 559 |
| app-dialog-body | <div> | 561 |
| app-dialog-input | <input> | 564 |
| app-dialog-cancel | <button> | 567 |
| app-dialog-confirm | <button> | 568 |

### Script Load Order
| Order | Script | Line |
|---:|---|---:|
| 1 | vendor/libfluidsynth-2.4.6.js?v=20260311103501 | 573 |
| 2 | vendor/js-synthesizer.min.js?v=20260311103501 | 574 |
| 3 | js/core.js?v=20260311103501 | 575 |
| 4 | js/store/reducers.js?v=20260311103501 | 576 |
| 5 | js/store/actions.js?v=20260311103501 | 577 |
| 6 | js/store/selectors.js?v=20260311103501 | 578 |
| 7 | js/store/store.js?v=20260311103501 | 579 |
| 8 | js/features/round/state-mutations.js?v=20260311103501 | 580 |
| 9 | js/features/settings/state-mutations.js?v=20260311103501 | 581 |
| 10 | js/features/chords/index.js?v=20260311103501 | 582 |
| 11 | js/features/typing/index.js?v=20260311103501 | 583 |
| 12 | js/features/tutorial/index.js?v=20260311103501 | 584 |
| 13 | js/features/audio-preview/index.js?v=20260311103501 | 585 |
| 14 | js/features/input/index.js?v=20260311103501 | 586 |
| 15 | js/audio.js?v=20260311103501 | 587 |
| 16 | js/game.js?v=20260311103501 | 588 |
| 17 | js/settings.js?v=20260311103501 | 589 |
| 18 | js/events.js?v=20260311103501 | 590 |

## styles.css Map
File: styles.css (1-3394)

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
| body.system-cursor-hidden, body.system-cursor-hidden * | 1782-1784 |
| .app-cursor | 1786-1799 |
| .app-cursor.visible | 1801-1803 |
| .app-cursor-ring, .app-cursor-dot | 1806-1813 |
| .app-cursor-ring | 1815-1823 |
| .app-cursor-dot | 1825-1829 |
| .app-cursor.is-interactive .app-cursor-ring | 1831-1836 |
| .app-cursor.is-interactive .app-cursor-dot | 1838-1840 |
| .app-cursor.is-helper .app-cursor-ring | 1842-1849 |
| .app-cursor.is-helper .app-cursor-dot | 1851-1856 |
| .app-cursor.is-text .app-cursor-ring | 1858-1863 |
| .app-cursor.is-pressed .app-cursor-ring | 1865-1867 |
| .app-cursor.is-pressed .app-cursor-dot | 1869-1871 |
| .helper-label | 1873-1882 |
| .helper-item .helper-value | 1884-1892 |
| .helper-item .helper-mask | 1894-1903 |
| .helper-item .helper-real | 1905-1918 |
| .helper-item:hover .helper-mask, .helper-item:focus-within .helper-mask, .helper-i... | 1924-1927 |
| .helper-item:hover .helper-real, .helper-item:focus-within .helper-real, .helper-i... | 1933-1936 |
| .typing-zone[hidden] | 1938-1940 |
| .status | 1942-1953 |
| .status[hidden] | 1955-1957 |
| .helper-slot[hidden] | 1959-1961 |
| .status-actions | 1963-1969 |
| .hint-flag | 1971-1984 |
| .hint-flag[hidden] | 1986-1988 |
| .hint-button | 1990-1992 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) | 1994-2008 |
| .settings-toggle | 2010-2012 |
| .theme-toggle | 2014-2016 |
| .home-toggle | 2018-2020 |
| :is(.settings-toggle, .theme-toggle, .home-toggle):hover | 2022-2024 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) svg | 2026-2030 |
| .settings-toggle svg | 2032-2035 |
| .settings-panel | 2037-2056 |
| .settings-panel.open | 2058-2062 |
| .settings-panel h2 | 2064-2069 |
| .settings-body | 2071-2075 |
| .settings-grid | 2077-2080 |
| .settings-section-title | 2082-2090 |
| .panel-trigger, .advanced-trigger, .dropdown-trigger, .control select | 2095-2104 |
| .advanced-trigger | 2106-2110 |
| .dropdown-trigger | 2112-2120 |
| .dropdown-trigger svg | 2122-2126 |
| .panel-trigger | 2128-2133 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger):hover | 2135-2138 |
| .panel-trigger:hover | 2140-2142 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger)[aria-expanded="true"] | 2144-2147 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger, .control select):focus-v... | 2149-2152 |
| .control select | 2154-2158 |
| .options-panel | 2160-2176 |
| .options-panel.open | 2178-2182 |
| .options-panel h3 | 2184-2191 |
| .options-grid | 2193-2196 |
| .options-panel .control | 2198-2204 |
| .options-panel .control.compact | 2206-2208 |
| .options-panel .control>label | 2210-2212 |
| .options-section-title | 2214-2223 |
| .options-panel .options-section-title:first-child | 2225-2229 |
| .advanced-panel | 2231-2250 |
| .advanced-panel.open | 2252-2256 |
| .advanced-panel h3 | 2258-2263 |
| .advanced-grid | 2265-2274 |
| .advanced-grid::-webkit-scrollbar | 2276-2278 |
| .advanced-grid::-webkit-scrollbar-track | 2280-2283 |
| .advanced-grid::-webkit-scrollbar-thumb | 2285-2289 |
| .inline-value | 2291-2298 |
| .slider-stack | 2300-2303 |
| .slider-stack input[type="range"] | 2305-2309 |
| .slider-ghost | 2311-2325 |
| .slider-ghost.visible | 2327-2329 |
| .sf2-browser | 2331-2334 |
| .sf2-browser input[type="text"] | 2336-2345 |
| .sf2-preset-list | 2347-2360 |
| .sf2-browser .piano-desc | 2362-2365 |
| .sf2-browser .piano-desc.pending, .profile-browser .piano-desc.pending | 2368-2370 |
| .sf2-group | 2372-2377 |
| .sf2-group-title | 2379-2388 |
| .sf2-row | 2390-2398 |
| .sf2-row:first-child | 2400-2402 |
| .sf2-row:hover | 2404-2406 |
| .sf2-row.active | 2408-2411 |
| .sf2-row-name | 2413-2419 |
| .sf2-row-program, .sf2-row-bank | 2422-2426 |
| .sf2-empty | 2428-2432 |
| .profile-browser | 2434-2437 |
| .profile-browser input[type="text"] | 2439-2448 |
| .profile-list | 2450-2463 |
| .profile-row | 2465-2475 |
| .profile-row:hover | 2477-2479 |
| .profile-row.active | 2481-2484 |
| .profile-row.applied | 2486-2488 |
| .profile-row-name | 2490-2496 |
| .profile-row-kind | 2498-2503 |
| .advanced-footer | 2505-2511 |
| .piano-preview.wide | 2513-2525 |
| .piano-preview.wide::before | 2527-2529 |
| .piano-preview.wide .play-icon | 2531-2537 |
| .piano-preview.wide .play-label | 2539-2541 |
| .instrument-browser-panel | 2543-2558 |
| .instrument-browser-panel.open | 2560-2564 |
| .instrument-browser-panel h3 | 2566-2571 |
| .piano-panel | 2573-2588 |
| .piano-panel.open | 2590-2594 |
| .piano-panel h3 | 2596-2601 |
| .piano-options | 2603-2606 |
| .piano-option | 2608-2620 |
| .piano-option.active | 2622-2625 |
| .piano-option:focus-visible | 2627-2629 |
| .piano-info | 2631-2634 |
| .piano-name | 2636-2639 |
| .piano-desc | 2641-2644 |
| .piano-option.simple .piano-name | 2646-2650 |
| .piano-option.simple .piano-desc | 2652-2656 |
| .piano-preview | 2658-2673 |
| .piano-preview::before | 2675-2683 |
| .piano-preview:active | 2685-2688 |
| .piano-preview.main | 2690-2694 |
| .settings-grid input[type="range"], .game-settings-grid input[type="range"], .adva... | 2699-2703 |
| .settings-grid input[type="range"]::-webkit-slider-runnable-track, .game-settings-... | 2708-2713 |
| .settings-grid input[type="range"]::-webkit-slider-thumb, .game-settings-grid inpu... | 2718-2727 |
| .settings-grid input[type="range"]:focus-visible::-webkit-slider-thumb, .game-sett... | 2732-2735 |
| .settings-grid input[type="range"]::-moz-range-track, .game-settings-grid input[ty... | 2740-2745 |
| .settings-grid input[type="range"]::-moz-range-thumb, .game-settings-grid input[ty... | 2750-2757 |
| .settings-grid input[type="range"]:focus-visible::-moz-range-thumb, .game-settings... | 2762-2765 |
| .volume-value | 2767-2770 |
| .status-row | 2772-2777 |
| .switch | 2779-2788 |
| .switch input | 2790-2795 |
| .switch-track | 2797-2803 |
| .switch-thumb | 2805-2815 |
| .switch input:checked+.switch-track | 2817-2819 |
| .switch input:checked+.switch-track .switch-thumb | 2821-2823 |
| .switch input:focus-visible+.switch-track | 2825-2828 |
| .control.compact .unit | 2830-2832 |
| .test-tone | 2834-2846 |
| .test-tone:hover | 2848-2851 |
| .test-tone:active | 2853-2855 |
| .test-tone-icon | 2857-2864 |
| .test-tone-label | 2866-2870 |
| .result | 2872-2876 |
| .reveal | 2878-2886 |
| .reveal strong | 2888-2890 |
| .reveal-label | 2892-2899 |
| .reveal-grid.compact | 2901-2909 |
| .reveal-cell | 2911-2914 |
| .reveal-cell.reveal-target-chord | 2916-2918 |
| .reveal-cell.reveal-target-notes | 2920-2922 |
| .reveal-cell.reveal-your-chord | 2924-2926 |
| .reveal-cell.reveal-your-notes | 2928-2930 |
| .keyboard-zone | 2932-2942 |
| .keyboard-stack | 2944-2954 |
| .keyboard-wrapper | 2956-2965 |
| .keyboard | 2967-2974 |
| .keyboard-wrapper.ends-black | 2976-2978 |
| .white-keys | 2980-2983 |
| .black-keys | 2985-2992 |
| .key | 2994-3005 |
| .key.white | 3007-3014 |
| .key.white.has-black | 3016-3018 |
| .key.black | 3020-3029 |
| .key span | 3031-3035 |
| .key.black span | 3037-3041 |
| .key.active | 3043-3046 |
| .key.black.active | 3048-3051 |
| .key.selected | 3053-3057 |
| .key.typed-preview | 3059-3061 |
| .key.correct | 3063-3067 |
| .key.wrong | 3069-3073 |
| .key.missed | 3075-3081 |
| .key.black.selected, .key.black.correct, .key.black.wrong | 3085-3087 |
| .key.black.missed | 3089-3095 |
| .keyboard.disabled | 3097-3103 |
| body.tutorial-open .keyboard | 3105-3107 |
| body.tutorial-open .keyboard.disabled | 3109-3112 |
| .keyboard.disabled::before | 3114-3126 |
| body.tutorial-open .keyboard.disabled::before | 3128-3130 |
| .keyboard.disabled::after | 3132-3166 |
| body.tutorial-open .keyboard.disabled::after | 3168-3170 |
| .tips | 3172-3181 |
| #pedal-tip[hidden] | 3183-3185 |
| .pedal-box | 3187-3201 |
| body.landing .pedal-box | 3203-3205 |
| .pedal-label | 3207-3217 |
| .pedal-icon | 3219-3226 |
| .pedal-icon.active | 3228-3231 |
| .note-pills | 3233-3240 |
| .reveal-grid.compact .note-pills | 3242-3244 |
| .note-pill | 3246-3252 |
| .reveal-grid.compact .note-pill | 3254-3257 |
| .note-pill.chord-pill | 3259-3267 |
| .note-pill.chord-pill .chord-link | 3269-3271 |
| .note-pill.chord-pill .chord-link-bubble | 3273-3278 |
| .note-pill.chord-pill:hover .chord-link-bubble | 3280-3283 |
| .note-pill.good | 3285-3289 |
| .note-pill.bad | 3291-3295 |
| .note-pill.missed | 3297-3301 |
| .note-pill.neutral | 3303-3307 |
| @media (max-width: 700px) | 3309-3364 |
| @media (max-height: 820px) | 3366-3387 |
| @media (max-height: 700px) | 3389-3394 |

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
File lines: 1-1072

| Symbol | Lines |
|---|---|
| normalizePracticeProfile | 435-455 |
| normalizePracticeProfiles | 456-463 |
| isTypingOnlyModeFromState | 467-467 |
| getEffectiveBlindModeFromState | 471-471 |
| getEffectivePracticeModeFromState | 472-480 |
| capturePracticeProfileFromState | 481-502 |
| clampEnvelopeValue | 605-605 |
| resolveEnvelopeMetrics | 618-653 |
| saveSettings | 667-699 |
| loadSettings | 701-759 |
| resetAllSettings | 761-795 |
| buildNotes | 843-858 |
| getNoteIdByMidi | 860-867 |
| isConsonant | 885-888 |
| getNicePool | 890-890 |
| getNoteCountMax | 892-896 |
| updateNoteCountMax | 898-906 |
| getCssNumber | 908-908 |
| clamp | 909-909 |
| getMaxStartMidi | 910-910 |
| clampStartMidi | 911-911 |
| getMidiLabel | 912-916 |
| getPanelBottomGap | 917-920 |
| normalizeSoundfontDefinition | 922-940 |
| setSoundfontCatalog | 942-963 |
| getSoundfontList | 965-965 |
| renderPianoOptions | 967-1011 |
| createKey | 1013-1024 |
| renderKeyboard | 1026-1058 |
| rebuildKeyboard | 1060-1071 |

### js/events.js (Active Runtime)
File lines: 1-2359

| Symbol | Lines |
|---|---|
| primeAudioFromGesture | 5-14 |
| shouldRestartRoundForSetting | 28-31 |
| patchSettingsState | 33-39 |
| adjustKeyCount | 431-434 |
| bindKeyCountStepper | 436-441 |
| isChordTutorialOpen | 643-643 |
| fitTutorialLayout | 646-674 |
| clearFitClasses | 652-655 |
| applyFitClass | 657-662 |
| getTutorialStep | 676-681 |
| getStepUnlockedRootSet | 683-691 |
| getStepUnlockedQualitySet | 693-699 |
| isTutorialRootEnabled | 701-701 |
| isTutorialQualityEnabled | 702-702 |
| getTutorialRootLabel | 704-707 |
| midiToTutorialLabel | 709-713 |
| getClosestNoteIdFromMidi | 715-722 |
| getTutorialRenderedChord | 724-746 |
| ensureTutorialKeyboard | 748-786 |
| getStepAllowedQualityIds | 788-790 |
| getTutorialActiveSpec | 792-794 |
| renderTutorialCurrentText | 796-807 |
| renderTutorialPianoHighlight | 809-843 |
| renderTutorialRootOptions | 845-863 |
| renderTutorialQualityOptions | 865-910 |
| syncTutorialRootChipStates | 912-931 |
| syncTutorialQualityChipStates | 933-952 |
| setTutorialHoverSpec | 954-961 |
| clearTutorialHoverSpec | 963-966 |
| refreshTutorialVisuals | 968-972 |
| getTutorialStepIndexForQuality | 1002-1008 |
| renderChordTutorialTabs | 1010-1038 |
| fitTutorialProgressTabs | 1040-1045 |
| renderChordTutorialStep | 1047-1103 |
| closeChordTutorial | 1105-1141 |
| clearSuppress | 1119-1125 |
| openChordTutorial | 1143-1178 |
| registerTutorialOpenTrigger | 1180-1187 |
| openChordTutorialForChordLink | 1189-1199 |
| handleChordLinkActivation | 1201-1208 |
| syncHelperPinnedUi | 1261-1270 |
| shouldBlurAfterUnpin | 1272-1277 |
| toggleRootHintFromHelper | 1279-1296 |
| toggleHelperPinned | 1298-1321 |
| handleHelperPinEvent | 1323-1329 |
| isChordTypingCaptureActive | 1425-1430 |
| insertTypedCharacter | 1432-1439 |
| triggerPrimaryAction | 1442-1451 |
| getButtonLikeTarget | 1454-1454 |
| blurPointerActivatedControl | 1455-1462 |
| updateHelperCursorMovement | 1486-1491 |
| ensureCustomCursorEl | 1493-1510 |
| getCustomCursorMode | 1511-1523 |
| syncCustomCursorState | 1524-1530 |
| renderCustomCursor | 1531-1537 |
| scheduleCustomCursorRender | 1538-1541 |
| scheduleCursorMotion | 1543-1546 |
| stepCursorMotion | 1548-1566 |
| setCustomCursorEnabled | 1567-1589 |
| updateCustomCursorPosition | 1590-1612 |
| clearHelperCursorIdleTimer | 1614-1618 |
| scheduleHelperCursorIdleHide | 1620-1628 |
| handleHelperPointerEnter | 1630-1649 |
| handleHelperPointerLeave | 1651-1658 |
| handleHelperPointerMove | 1660-1665 |
| triggerReplayAction | 1667-1673 |
| bindPianoOptionEvents | 1833-1858 |
| handlePointerUpdate | 1933-1944 |
| applyCustomCursorMediaState | 1993-1996 |
| isElementVisible | 2011-2017 |
| getFocusableElements | 2019-2023 |
| focusFirstInModal | 2029-2035 |
| trapModalFocus | 2037-2059 |
| isTextEditableTarget | 2061-2066 |
| getActiveModalEl | 2068-2073 |
| closeGameSettingsModalUi | 2075-2084 |
| openGameSettingsModalUi | 2086-2092 |
| closeActiveModal | 2094-2108 |
| moveFocusInPanel | 2110-2121 |
| setRandomBackgroundAngle | 2311-2314 |
| init | 2316-2353 |
| runDeferredCatalogLoad | 2337-2346 |

Event bindings:
| Target | Event | Line |
|---|---|---:|
| document | pointerdown | 16 |
| document | keydown | 17 |
| document | touchstart | 18 |
| noteCountInput | input | 70 |
| noteCountInput | change | 77 |
| noteCountInput | pointerup | 81 |
| button | click | 86 |
| button | click | 101 |
| blindToggle | change | 109 |
| hideLivePreviewToggle | change | 118 |
| niceNotesToggle | change | 127 |
| chordRoundsToggle | change | 143 |
| practiceModeSelect | change | 149 |
| trainingModeSelect | change | 156 |
| chordDifficultySelect | change | 171 |
| chordExtraHelpersToggle | change | 188 |
| chordRootHintToggle | change | 198 |
| customCursorToggle | change | 214 |
| typingShowPianoToggle | change | 226 |
| typingShowTypedToggle | change | 236 |
| resetSettingsButton | click | 248 |
| settingsToggle | click | 262 |
| themeToggle | click | 271 |
| homeToggle | click | 282 |
| settingsPanel | click | 291 |
| optionsTrigger | click | 313 |
| gameSettingsOpen | click | 320 |
| gameSettingsBackdrop | click | 327 |
| gameSettingsClose | click | 334 |
| document | click | 340 |
| window | resize | 344 |
| playSelectedButton | click | 355 |
| playSelectedButton | pointerdown | 359 |
| playSelectedButton | pointerup | 364 |
| playSelectedButton | pointerleave | 368 |
| primaryActionButton | click | 372 |
| volumeSlider | input | 380 |
| lengthSlider | input | 386 |
| attackSlider | input | 392 |
| decaySlider | input | 398 |
| releaseSlider | input | 404 |
| sustainSlider | input | 410 |
| keyCountSlider | input | 416 |
| keyCountSlider | change | 423 |
| keyCountSlider | pointerup | 427 |
| hintButton | click | 446 |
| chordAnswerInput | input | 451 |
| chordAnswerInput | keydown | 458 |
| window | pointermove | 1127 |
| window | pointerdown | 1128 |
| window | keydown | 1129 |
| triggerEl | click | 1182 |
| document | click | 1210 |
| document | keydown | 1211 |
| chordTutorialTabs | click | 1217 |
| chordTutorialClose | click | 1229 |
| chordTutorialBackdrop | click | 1236 |
| chordTutorialPrev | click | 1242 |
| chordTutorialNext | click | 1250 |
| document | click | 1331 |
| document | keydown | 1333 |
| document | contextmenu | 1338 |
| chordTutorialRootList | mouseover | 1341 |
| chordTutorialRootList | mouseleave | 1349 |
| chordTutorialRootList | focusin | 1352 |
| chordTutorialRootList | focusout | 1360 |
| chordTutorialRootList | click | 1363 |
| chordTutorialQualityList | mouseover | 1379 |
| chordTutorialQualityList | mouseleave | 1386 |
| chordTutorialQualityList | focusin | 1389 |
| chordTutorialQualityList | focusout | 1396 |
| chordTutorialQualityList | click | 1399 |
| volumeSlider | dblclick | 1675 |
| lengthSlider | dblclick | 1679 |
| keyCountSlider | dblclick | 1683 |
| startNoteDownButton | click | 1689 |
| startNoteUpButton | click | 1692 |
| startNoteDownOctButton | click | 1698 |
| startNoteUpOctButton | click | 1701 |
| noteCountInput | dblclick | 1706 |
| attackSlider | dblclick | 1714 |
| decaySlider | dblclick | 1718 |
| releaseSlider | dblclick | 1722 |
| sustainSlider | dblclick | 1726 |
| profileSearch | input | 1731 |
| profileList | click | 1737 |
| profileList | dblclick | 1742 |
| profileList | keydown | 1745 |
| profileApply | click | 1756 |
| profileSave | click | 1762 |
| instrumentPresetSearch | input | 1768 |
| instrumentPresetList | click | 1774 |
| instrumentPresetList | dblclick | 1779 |
| instrumentPresetList | keydown | 1782 |
| instrumentPresetApply | click | 1793 |
| advancedTrigger | click | 1798 |
| advancedPanel | click | 1803 |
| pianoTrigger | click | 1808 |
| pianoPanel | click | 1815 |
| instrumentBrowserTrigger | click | 1821 |
| instrumentBrowserPanel | click | 1828 |
| pianoOptionsContainer | click | 1836 |
| pianoOptionsContainer | keydown | 1850 |
| pianoPreviewMain | click | 1861 |
| testEnvelopeButton | click | 1868 |
| keyboardEl | pointerdown | 1873 |
| document | pointerup | 1909 |
| document | pointercancel | 1916 |
| document | pointerdown | 1923 |
| document | click | 1929 |
| document | pointerrawupdate | 1947 |
| document | pointermove | 1949 |
| document | pointerup | 1951 |
| document | pointercancel | 1956 |
| document | pointerover | 1961 |
| document | pointerout | 1967 |
| document | pointerover | 1976 |
| document | pointerout | 1977 |
| window | blur | 1979 |
| document | visibilitychange | 1985 |
| CUSTOM_CURSOR_QUERY | change | 1998 |
| keyboardEl | click | 2004 |
| document | keydown | 2123 |
| document | keyup | 2259 |
| pedalBox | pointerdown | 2278 |
| pedalBox | pointerup | 2287 |
| pedalBox | pointercancel | 2296 |
| pedalBox | pointerleave | 2304 |

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
File lines: 1-1480

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
| setPracticeMode | 982-1071 |
| applyUiFromState | 1073-1140 |
| commitCriticalChange | 1147-1152 |
| commitNoteCountChange | 1154-1163 |
| handleCriticalSettingChange | 1165-1179 |
| openSettings | 1181-1186 |
| positionFloatingPanel | 1188-1217 |
| setGameSettingsModalOpenState | 1219-1229 |
| isGameSettingsModalOpenInternal | 1231-1231 |
| openGameSettingsModalInternal | 1233-1244 |
| closeGameSettingsModalInternal | 1246-1254 |
| positionPianoPanel | 1256-1259 |
| positionInstrumentBrowserPanel | 1261-1264 |
| getFloatingPanelConfig | 1269-1301 |
| isFloatingPanelOpen | 1303-1306 |
| setFloatingPanelOpenState | 1308-1313 |
| closeFloatingPanel | 1319-1332 |
| closeAllFloatingPanels | 1334-1340 |
| openFloatingPanel | 1342-1367 |
| toggleFloatingPanel | 1369-1374 |
| repositionOpenFloatingPanels | 1376-1384 |
| openOptionsPanel | 1386-1386 |
| closeOptionsPanel | 1387-1387 |
| openAdvanced | 1388-1388 |
| closeAdvanced | 1389-1389 |
| openPianoPanel | 1390-1390 |
| closePianoPanel | 1391-1391 |
| openInstrumentBrowser | 1392-1392 |
| closeInstrumentBrowser | 1393-1393 |
| closeSettings | 1395-1413 |

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

