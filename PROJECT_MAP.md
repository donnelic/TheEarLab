# Project Map

Generated: 2026-03-12 16:56:57 +01:00

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
| styles.css | CSS | Loaded directly | Yes | 3464 |
| js/audio.js | JavaScript | Browser runtime module | Yes | 1529 |
| js/core.js | JavaScript | Browser runtime module | Yes | 1072 |
| js/events.js | JavaScript | Browser runtime module | Yes | 2472 |
| js/game.js | JavaScript | Browser runtime module | Yes | 2219 |
| js/settings.js | JavaScript | Browser runtime module | Yes | 1480 |
| README.md | Markdown | Human + AI onboarding | Yes | 135 |
| IMPLEMENTATION_CHECKLIST.md | Markdown | Implementation roadmap checklist | Yes | 237 |
| AGENTS.md | Markdown | AI instruction override | Yes | 47 |
| PROJECT_MAP.md | Markdown | Generated reference map | Yes | 1272 |
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
| 1 | vendor/libfluidsynth-2.4.6.js?v=20260312161059 | 573 |
| 2 | vendor/js-synthesizer.min.js?v=20260312161059 | 574 |
| 3 | js/core.js?v=20260312161059 | 575 |
| 4 | js/store/reducers.js?v=20260312161059 | 576 |
| 5 | js/store/actions.js?v=20260312161059 | 577 |
| 6 | js/store/selectors.js?v=20260312161059 | 578 |
| 7 | js/store/store.js?v=20260312161059 | 579 |
| 8 | js/features/round/state-mutations.js?v=20260312161059 | 580 |
| 9 | js/features/settings/state-mutations.js?v=20260312161059 | 581 |
| 10 | js/features/chords/index.js?v=20260312161059 | 582 |
| 11 | js/features/typing/index.js?v=20260312161059 | 583 |
| 12 | js/features/tutorial/index.js?v=20260312161059 | 584 |
| 13 | js/features/audio-preview/index.js?v=20260312161059 | 585 |
| 14 | js/features/input/index.js?v=20260312161059 | 586 |
| 15 | js/audio.js?v=20260312161059 | 587 |
| 16 | js/game.js?v=20260312161059 | 588 |
| 17 | js/settings.js?v=20260312161059 | 589 |
| 18 | js/events.js?v=20260312161059 | 590 |

## styles.css Map
File: styles.css (1-3464)

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
| .tutorial-progress-row>button | 1402-1404 |
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
| .helper-item | 1719-1736 |
| .helper-item:not(.pinned):not(.latched) | 1738-1742 |
| .helper-item::before | 1744-1764 |
| .helper-item::after | 1766-1780 |
| .helper-item>* | 1782-1785 |
| .helper-item:hover, .helper-item:focus-within | 1788-1793 |
| .helper-item:focus-visible | 1795-1798 |
| .helper-item.pinned | 1800-1808 |
| .helper-item.pinned::after | 1810-1817 |
| .helper-item.pinned .helper-label | 1819-1821 |
| .helper-item.latched | 1823-1828 |
| .helper-item.latched .helper-label | 1830-1832 |
| @media (hover: hover) and (pointer: fine) | 1834-1840 |
| body.system-cursor-hidden, body.system-cursor-hidden * | 1843-1845 |
| .app-cursor | 1847-1860 |
| .app-cursor.visible | 1862-1864 |
| .app-cursor-ring, .app-cursor-dot | 1867-1874 |
| .app-cursor-ring | 1876-1884 |
| .app-cursor-dot | 1886-1890 |
| .app-cursor.is-interactive .app-cursor-ring | 1892-1897 |
| .app-cursor.is-interactive .app-cursor-dot | 1899-1901 |
| .app-cursor.is-helper .app-cursor-ring | 1903-1910 |
| .app-cursor.is-helper .app-cursor-dot | 1912-1917 |
| .app-cursor.is-text .app-cursor-ring | 1919-1924 |
| .app-cursor.is-pressed .app-cursor-ring | 1926-1928 |
| .app-cursor.is-pressed .app-cursor-dot | 1930-1932 |
| .helper-label | 1934-1944 |
| .helper-item .helper-value | 1946-1954 |
| .helper-item .helper-mask | 1956-1965 |
| .helper-item .helper-real | 1967-1980 |
| .helper-item.pinned .helper-real | 1982-1984 |
| .helper-item.latched .helper-real | 1986-1988 |
| .helper-item:hover .helper-mask, .helper-item:focus-within .helper-mask, .helper-i... | 1994-1997 |
| .helper-item:hover .helper-real, .helper-item:focus-within .helper-real, .helper-i... | 2003-2006 |
| .typing-zone[hidden] | 2008-2010 |
| .status | 2012-2023 |
| .status[hidden] | 2025-2027 |
| .helper-slot[hidden] | 2029-2031 |
| .status-actions | 2033-2039 |
| .hint-flag | 2041-2054 |
| .hint-flag[hidden] | 2056-2058 |
| .hint-button | 2060-2062 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) | 2064-2078 |
| .settings-toggle | 2080-2082 |
| .theme-toggle | 2084-2086 |
| .home-toggle | 2088-2090 |
| :is(.settings-toggle, .theme-toggle, .home-toggle):hover | 2092-2094 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) svg | 2096-2100 |
| .settings-toggle svg | 2102-2105 |
| .settings-panel | 2107-2126 |
| .settings-panel.open | 2128-2132 |
| .settings-panel h2 | 2134-2139 |
| .settings-body | 2141-2145 |
| .settings-grid | 2147-2150 |
| .settings-section-title | 2152-2160 |
| .panel-trigger, .advanced-trigger, .dropdown-trigger, .control select | 2165-2174 |
| .advanced-trigger | 2176-2180 |
| .dropdown-trigger | 2182-2190 |
| .dropdown-trigger svg | 2192-2196 |
| .panel-trigger | 2198-2203 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger):hover | 2205-2208 |
| .panel-trigger:hover | 2210-2212 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger)[aria-expanded="true"] | 2214-2217 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger, .control select):focus-v... | 2219-2222 |
| .control select | 2224-2228 |
| .options-panel | 2230-2246 |
| .options-panel.open | 2248-2252 |
| .options-panel h3 | 2254-2261 |
| .options-grid | 2263-2266 |
| .options-panel .control | 2268-2274 |
| .options-panel .control.compact | 2276-2278 |
| .options-panel .control>label | 2280-2282 |
| .options-section-title | 2284-2293 |
| .options-panel .options-section-title:first-child | 2295-2299 |
| .advanced-panel | 2301-2320 |
| .advanced-panel.open | 2322-2326 |
| .advanced-panel h3 | 2328-2333 |
| .advanced-grid | 2335-2344 |
| .advanced-grid::-webkit-scrollbar | 2346-2348 |
| .advanced-grid::-webkit-scrollbar-track | 2350-2353 |
| .advanced-grid::-webkit-scrollbar-thumb | 2355-2359 |
| .inline-value | 2361-2368 |
| .slider-stack | 2370-2373 |
| .slider-stack input[type="range"] | 2375-2379 |
| .slider-ghost | 2381-2395 |
| .slider-ghost.visible | 2397-2399 |
| .sf2-browser | 2401-2404 |
| .sf2-browser input[type="text"] | 2406-2415 |
| .sf2-preset-list | 2417-2430 |
| .sf2-browser .piano-desc | 2432-2435 |
| .sf2-browser .piano-desc.pending, .profile-browser .piano-desc.pending | 2438-2440 |
| .sf2-group | 2442-2447 |
| .sf2-group-title | 2449-2458 |
| .sf2-row | 2460-2468 |
| .sf2-row:first-child | 2470-2472 |
| .sf2-row:hover | 2474-2476 |
| .sf2-row.active | 2478-2481 |
| .sf2-row-name | 2483-2489 |
| .sf2-row-program, .sf2-row-bank | 2492-2496 |
| .sf2-empty | 2498-2502 |
| .profile-browser | 2504-2507 |
| .profile-browser input[type="text"] | 2509-2518 |
| .profile-list | 2520-2533 |
| .profile-row | 2535-2545 |
| .profile-row:hover | 2547-2549 |
| .profile-row.active | 2551-2554 |
| .profile-row.applied | 2556-2558 |
| .profile-row-name | 2560-2566 |
| .profile-row-kind | 2568-2573 |
| .advanced-footer | 2575-2581 |
| .piano-preview.wide | 2583-2595 |
| .piano-preview.wide::before | 2597-2599 |
| .piano-preview.wide .play-icon | 2601-2607 |
| .piano-preview.wide .play-label | 2609-2611 |
| .instrument-browser-panel | 2613-2628 |
| .instrument-browser-panel.open | 2630-2634 |
| .instrument-browser-panel h3 | 2636-2641 |
| .piano-panel | 2643-2658 |
| .piano-panel.open | 2660-2664 |
| .piano-panel h3 | 2666-2671 |
| .piano-options | 2673-2676 |
| .piano-option | 2678-2690 |
| .piano-option.active | 2692-2695 |
| .piano-option:focus-visible | 2697-2699 |
| .piano-info | 2701-2704 |
| .piano-name | 2706-2709 |
| .piano-desc | 2711-2714 |
| .piano-option.simple .piano-name | 2716-2720 |
| .piano-option.simple .piano-desc | 2722-2726 |
| .piano-preview | 2728-2743 |
| .piano-preview::before | 2745-2753 |
| .piano-preview:active | 2755-2758 |
| .piano-preview.main | 2760-2764 |
| .settings-grid input[type="range"], .game-settings-grid input[type="range"], .adva... | 2769-2773 |
| .settings-grid input[type="range"]::-webkit-slider-runnable-track, .game-settings-... | 2778-2783 |
| .settings-grid input[type="range"]::-webkit-slider-thumb, .game-settings-grid inpu... | 2788-2797 |
| .settings-grid input[type="range"]:focus-visible::-webkit-slider-thumb, .game-sett... | 2802-2805 |
| .settings-grid input[type="range"]::-moz-range-track, .game-settings-grid input[ty... | 2810-2815 |
| .settings-grid input[type="range"]::-moz-range-thumb, .game-settings-grid input[ty... | 2820-2827 |
| .settings-grid input[type="range"]:focus-visible::-moz-range-thumb, .game-settings... | 2832-2835 |
| .volume-value | 2837-2840 |
| .status-row | 2842-2847 |
| .switch | 2849-2858 |
| .switch input | 2860-2865 |
| .switch-track | 2867-2873 |
| .switch-thumb | 2875-2885 |
| .switch input:checked+.switch-track | 2887-2889 |
| .switch input:checked+.switch-track .switch-thumb | 2891-2893 |
| .switch input:focus-visible+.switch-track | 2895-2898 |
| .control.compact .unit | 2900-2902 |
| .test-tone | 2904-2916 |
| .test-tone:hover | 2918-2921 |
| .test-tone:active | 2923-2925 |
| .test-tone-icon | 2927-2934 |
| .test-tone-label | 2936-2940 |
| .result | 2942-2946 |
| .reveal | 2948-2956 |
| .reveal strong | 2958-2960 |
| .reveal-label | 2962-2969 |
| .reveal-grid.compact | 2971-2979 |
| .reveal-cell | 2981-2984 |
| .reveal-cell.reveal-target-chord | 2986-2988 |
| .reveal-cell.reveal-target-notes | 2990-2992 |
| .reveal-cell.reveal-your-chord | 2994-2996 |
| .reveal-cell.reveal-your-notes | 2998-3000 |
| .keyboard-zone | 3002-3012 |
| .keyboard-stack | 3014-3024 |
| .keyboard-wrapper | 3026-3035 |
| .keyboard | 3037-3044 |
| .keyboard-wrapper.ends-black | 3046-3048 |
| .white-keys | 3050-3053 |
| .black-keys | 3055-3062 |
| .key | 3064-3075 |
| .key.white | 3077-3084 |
| .key.white.has-black | 3086-3088 |
| .key.black | 3090-3099 |
| .key span | 3101-3105 |
| .key.black span | 3107-3111 |
| .key.active | 3113-3116 |
| .key.black.active | 3118-3121 |
| .key.selected | 3123-3127 |
| .key.typed-preview | 3129-3131 |
| .key.correct | 3133-3137 |
| .key.wrong | 3139-3143 |
| .key.missed | 3145-3151 |
| .key.black.selected, .key.black.correct, .key.black.wrong | 3155-3157 |
| .key.black.missed | 3159-3165 |
| .keyboard.disabled | 3167-3173 |
| body.tutorial-open .keyboard | 3175-3177 |
| body.tutorial-open .keyboard.disabled | 3179-3182 |
| .keyboard.disabled::before | 3184-3196 |
| body.tutorial-open .keyboard.disabled::before | 3198-3200 |
| .keyboard.disabled::after | 3202-3236 |
| body.tutorial-open .keyboard.disabled::after | 3238-3240 |
| .tips | 3242-3251 |
| #pedal-tip[hidden] | 3253-3255 |
| .pedal-box | 3257-3271 |
| body.landing .pedal-box | 3273-3275 |
| .pedal-label | 3277-3287 |
| .pedal-icon | 3289-3296 |
| .pedal-icon.active | 3298-3301 |
| .note-pills | 3303-3310 |
| .reveal-grid.compact .note-pills | 3312-3314 |
| .note-pill | 3316-3322 |
| .reveal-grid.compact .note-pill | 3324-3327 |
| .note-pill.chord-pill | 3329-3337 |
| .note-pill.chord-pill .chord-link | 3339-3341 |
| .note-pill.chord-pill .chord-link-bubble | 3343-3348 |
| .note-pill.chord-pill:hover .chord-link-bubble | 3350-3353 |
| .note-pill.good | 3355-3359 |
| .note-pill.bad | 3361-3365 |
| .note-pill.missed | 3367-3371 |
| .note-pill.neutral | 3373-3377 |
| @media (max-width: 700px) | 3379-3434 |
| @media (max-height: 820px) | 3436-3457 |
| @media (max-height: 700px) | 3459-3464 |

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
File lines: 1-2472

| Symbol | Lines |
|---|---|
| primeAudioFromGesture | 5-14 |
| shouldRestartRoundForSetting | 28-31 |
| patchSettingsState | 33-39 |
| adjustKeyCount | 432-435 |
| bindKeyCountStepper | 437-442 |
| isChordTutorialOpen | 644-644 |
| fitTutorialLayout | 647-675 |
| clearFitClasses | 653-656 |
| applyFitClass | 658-663 |
| getTutorialStep | 677-682 |
| getStepUnlockedRootSet | 684-692 |
| getStepUnlockedQualitySet | 694-700 |
| isTutorialRootEnabled | 702-702 |
| isTutorialQualityEnabled | 703-703 |
| getTutorialRootLabel | 705-708 |
| midiToTutorialLabel | 710-714 |
| getClosestNoteIdFromMidi | 716-723 |
| getTutorialRenderedChord | 725-747 |
| ensureTutorialKeyboard | 749-787 |
| getStepAllowedQualityIds | 789-791 |
| getTutorialActiveSpec | 793-795 |
| renderTutorialCurrentText | 797-808 |
| renderTutorialPianoHighlight | 810-844 |
| renderTutorialRootOptions | 846-864 |
| renderTutorialQualityOptions | 866-911 |
| syncTutorialRootChipStates | 913-932 |
| syncTutorialQualityChipStates | 934-953 |
| setTutorialHoverSpec | 955-962 |
| clearTutorialHoverSpec | 964-967 |
| refreshTutorialVisuals | 969-973 |
| getTutorialStepIndexForQuality | 1003-1009 |
| renderChordTutorialTabs | 1011-1039 |
| fitTutorialProgressTabs | 1041-1046 |
| renderChordTutorialStep | 1048-1104 |
| closeChordTutorial | 1106-1142 |
| clearSuppress | 1120-1126 |
| openChordTutorial | 1144-1179 |
| registerTutorialOpenTrigger | 1181-1188 |
| openChordTutorialForChordLink | 1190-1200 |
| handleChordLinkActivation | 1202-1209 |
| syncHelperPinnedUi | 1262-1271 |
| shouldBlurAfterPointer | 1273-1278 |
| toggleRootHintFromHelper | 1280-1297 |
| toggleHelperPinned | 1299-1328 |
| handleHelperPinEvent | 1330-1336 |
| isChordTypingCaptureActive | 1432-1437 |
| insertTypedCharacter | 1439-1446 |
| triggerPrimaryAction | 1449-1458 |
| getButtonLikeTarget | 1461-1461 |
| blurPointerActivatedControl | 1462-1469 |
| markHelperIndicatorDirty | 1497-1500 |
| getHelperIndicatorItems | 1502-1514 |
| ensureHelperIndicatorObserver | 1528-1532 |
| getHelperIndicatorCache | 1534-1569 |
| updateHelperIndicatorPositions | 1571-1581 |
| scheduleHelperIndicatorUpdate | 1583-1595 |
| isPointerInsideRect | 1597-1603 |
| handleHelperIndicatorProximity | 1605-1638 |
| ensureCustomCursorEl | 1640-1657 |
| getCustomCursorMode | 1658-1669 |
| syncCustomCursorState | 1670-1676 |
| renderCustomCursor | 1677-1683 |
| scheduleCustomCursorRender | 1684-1687 |
| scheduleCursorMotion | 1689-1692 |
| stepCursorMotion | 1694-1712 |
| setCustomCursorEnabled | 1713-1733 |
| updateCustomCursorPosition | 1734-1756 |
| handleHelperPointerEnter | 1758-1763 |
| handleHelperPointerLeave | 1765-1770 |
| triggerReplayAction | 1772-1778 |
| bindPianoOptionEvents | 1938-1963 |
| handlePointerUpdate | 2038-2057 |
| applyCustomCursorMediaState | 2106-2109 |
| isElementVisible | 2124-2130 |
| getFocusableElements | 2132-2136 |
| focusFirstInModal | 2142-2148 |
| trapModalFocus | 2150-2172 |
| isTextEditableTarget | 2174-2179 |
| getActiveModalEl | 2181-2186 |
| closeGameSettingsModalUi | 2188-2197 |
| openGameSettingsModalUi | 2199-2205 |
| closeActiveModal | 2207-2221 |
| moveFocusInPanel | 2223-2234 |
| setRandomBackgroundAngle | 2424-2427 |
| init | 2429-2466 |
| runDeferredCatalogLoad | 2450-2459 |

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
| playSelectedButton | click | 356 |
| playSelectedButton | pointerdown | 360 |
| playSelectedButton | pointerup | 365 |
| playSelectedButton | pointerleave | 369 |
| primaryActionButton | click | 373 |
| volumeSlider | input | 381 |
| lengthSlider | input | 387 |
| attackSlider | input | 393 |
| decaySlider | input | 399 |
| releaseSlider | input | 405 |
| sustainSlider | input | 411 |
| keyCountSlider | input | 417 |
| keyCountSlider | change | 424 |
| keyCountSlider | pointerup | 428 |
| hintButton | click | 447 |
| chordAnswerInput | input | 452 |
| chordAnswerInput | keydown | 459 |
| window | pointermove | 1128 |
| window | pointerdown | 1129 |
| window | keydown | 1130 |
| triggerEl | click | 1183 |
| document | click | 1211 |
| document | keydown | 1212 |
| chordTutorialTabs | click | 1218 |
| chordTutorialClose | click | 1230 |
| chordTutorialBackdrop | click | 1237 |
| chordTutorialPrev | click | 1243 |
| chordTutorialNext | click | 1251 |
| document | click | 1338 |
| document | keydown | 1340 |
| document | contextmenu | 1345 |
| chordTutorialRootList | mouseover | 1348 |
| chordTutorialRootList | mouseleave | 1356 |
| chordTutorialRootList | focusin | 1359 |
| chordTutorialRootList | focusout | 1367 |
| chordTutorialRootList | click | 1370 |
| chordTutorialQualityList | mouseover | 1386 |
| chordTutorialQualityList | mouseleave | 1393 |
| chordTutorialQualityList | focusin | 1396 |
| chordTutorialQualityList | focusout | 1403 |
| chordTutorialQualityList | click | 1406 |
| volumeSlider | dblclick | 1780 |
| lengthSlider | dblclick | 1784 |
| keyCountSlider | dblclick | 1788 |
| startNoteDownButton | click | 1794 |
| startNoteUpButton | click | 1797 |
| startNoteDownOctButton | click | 1803 |
| startNoteUpOctButton | click | 1806 |
| noteCountInput | dblclick | 1811 |
| attackSlider | dblclick | 1819 |
| decaySlider | dblclick | 1823 |
| releaseSlider | dblclick | 1827 |
| sustainSlider | dblclick | 1831 |
| profileSearch | input | 1836 |
| profileList | click | 1842 |
| profileList | dblclick | 1847 |
| profileList | keydown | 1850 |
| profileApply | click | 1861 |
| profileSave | click | 1867 |
| instrumentPresetSearch | input | 1873 |
| instrumentPresetList | click | 1879 |
| instrumentPresetList | dblclick | 1884 |
| instrumentPresetList | keydown | 1887 |
| instrumentPresetApply | click | 1898 |
| advancedTrigger | click | 1903 |
| advancedPanel | click | 1908 |
| pianoTrigger | click | 1913 |
| pianoPanel | click | 1920 |
| instrumentBrowserTrigger | click | 1926 |
| instrumentBrowserPanel | click | 1933 |
| pianoOptionsContainer | click | 1941 |
| pianoOptionsContainer | keydown | 1955 |
| pianoPreviewMain | click | 1966 |
| testEnvelopeButton | click | 1973 |
| keyboardEl | pointerdown | 1978 |
| document | pointerup | 2014 |
| document | pointercancel | 2021 |
| document | pointerdown | 2028 |
| document | click | 2034 |
| document | pointerrawupdate | 2060 |
| document | pointermove | 2062 |
| document | pointerup | 2064 |
| document | pointercancel | 2069 |
| document | pointerover | 2074 |
| document | pointerout | 2080 |
| document | pointerover | 2089 |
| document | pointerout | 2090 |
| window | blur | 2092 |
| document | visibilitychange | 2098 |
| CUSTOM_CURSOR_QUERY | change | 2111 |
| keyboardEl | click | 2117 |
| document | keydown | 2236 |
| document | keyup | 2372 |
| pedalBox | pointerdown | 2391 |
| pedalBox | pointerup | 2400 |
| pedalBox | pointercancel | 2409 |
| pedalBox | pointerleave | 2417 |

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

