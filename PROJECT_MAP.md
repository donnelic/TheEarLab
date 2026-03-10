# Project Map

Generated: 2026-03-10 14:20:24 +01:00

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
| styles.css | CSS | Loaded directly | Yes | 3363 |
| js/audio.js | JavaScript | Browser runtime module | Yes | 1529 |
| js/core.js | JavaScript | Browser runtime module | Yes | 1065 |
| js/events.js | JavaScript | Browser runtime module | Yes | 2145 |
| js/game.js | JavaScript | Browser runtime module | Yes | 2154 |
| js/settings.js | JavaScript | Browser runtime module | Yes | 1474 |
| README.md | Markdown | Human + AI onboarding | Yes | 135 |
| IMPLEMENTATION_CHECKLIST.md | Markdown | Implementation roadmap checklist | Yes | 237 |
| AGENTS.md | Markdown | AI instruction override | Yes | 47 |
| PROJECT_MAP.md | Markdown | Generated reference map | Yes | 1220 |
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
File: styles.css (1-3363)

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
| @media (hover: hover) and (pointer: fine) | 1753-1759 |
| .app-cursor | 1761-1772 |
| .app-cursor.visible | 1774-1776 |
| .app-cursor-ring, .app-cursor-dot | 1779-1786 |
| .app-cursor-ring | 1788-1796 |
| .app-cursor-dot | 1798-1802 |
| .app-cursor.is-interactive .app-cursor-ring | 1804-1809 |
| .app-cursor.is-interactive .app-cursor-dot | 1811-1813 |
| .app-cursor.is-helper .app-cursor-ring | 1815-1822 |
| .app-cursor.is-helper .app-cursor-dot | 1824-1829 |
| .app-cursor.is-text .app-cursor-ring | 1831-1836 |
| .app-cursor.is-pressed .app-cursor-ring | 1838-1840 |
| .app-cursor.is-pressed .app-cursor-dot | 1842-1844 |
| .helper-label | 1846-1855 |
| .helper-item .helper-value | 1857-1865 |
| .helper-item .helper-mask | 1867-1875 |
| .helper-item .helper-real | 1877-1889 |
| .helper-item:hover .helper-mask, .helper-item:focus-within .helper-mask, .helper-i... | 1894-1897 |
| .helper-item:hover .helper-real, .helper-item:focus-within .helper-real, .helper-i... | 1902-1905 |
| .typing-zone[hidden] | 1907-1909 |
| .status | 1911-1922 |
| .status[hidden] | 1924-1926 |
| .helper-slot[hidden] | 1928-1930 |
| .status-actions | 1932-1938 |
| .hint-flag | 1940-1953 |
| .hint-flag[hidden] | 1955-1957 |
| .hint-button | 1959-1961 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) | 1963-1977 |
| .settings-toggle | 1979-1981 |
| .theme-toggle | 1983-1985 |
| .home-toggle | 1987-1989 |
| :is(.settings-toggle, .theme-toggle, .home-toggle):hover | 1991-1993 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) svg | 1995-1999 |
| .settings-toggle svg | 2001-2004 |
| .settings-panel | 2006-2025 |
| .settings-panel.open | 2027-2031 |
| .settings-panel h2 | 2033-2038 |
| .settings-body | 2040-2044 |
| .settings-grid | 2046-2049 |
| .settings-section-title | 2051-2059 |
| .panel-trigger, .advanced-trigger, .dropdown-trigger, .control select | 2064-2073 |
| .advanced-trigger | 2075-2079 |
| .dropdown-trigger | 2081-2089 |
| .dropdown-trigger svg | 2091-2095 |
| .panel-trigger | 2097-2102 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger):hover | 2104-2107 |
| .panel-trigger:hover | 2109-2111 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger)[aria-expanded="true"] | 2113-2116 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger, .control select):focus-v... | 2118-2121 |
| .control select | 2123-2127 |
| .options-panel | 2129-2145 |
| .options-panel.open | 2147-2151 |
| .options-panel h3 | 2153-2160 |
| .options-grid | 2162-2165 |
| .options-panel .control | 2167-2173 |
| .options-panel .control.compact | 2175-2177 |
| .options-panel .control>label | 2179-2181 |
| .options-section-title | 2183-2192 |
| .options-panel .options-section-title:first-child | 2194-2198 |
| .advanced-panel | 2200-2219 |
| .advanced-panel.open | 2221-2225 |
| .advanced-panel h3 | 2227-2232 |
| .advanced-grid | 2234-2243 |
| .advanced-grid::-webkit-scrollbar | 2245-2247 |
| .advanced-grid::-webkit-scrollbar-track | 2249-2252 |
| .advanced-grid::-webkit-scrollbar-thumb | 2254-2258 |
| .inline-value | 2260-2267 |
| .slider-stack | 2269-2272 |
| .slider-stack input[type="range"] | 2274-2278 |
| .slider-ghost | 2280-2294 |
| .slider-ghost.visible | 2296-2298 |
| .sf2-browser | 2300-2303 |
| .sf2-browser input[type="text"] | 2305-2314 |
| .sf2-preset-list | 2316-2329 |
| .sf2-browser .piano-desc | 2331-2334 |
| .sf2-browser .piano-desc.pending, .profile-browser .piano-desc.pending | 2337-2339 |
| .sf2-group | 2341-2346 |
| .sf2-group-title | 2348-2357 |
| .sf2-row | 2359-2367 |
| .sf2-row:first-child | 2369-2371 |
| .sf2-row:hover | 2373-2375 |
| .sf2-row.active | 2377-2380 |
| .sf2-row-name | 2382-2388 |
| .sf2-row-program, .sf2-row-bank | 2391-2395 |
| .sf2-empty | 2397-2401 |
| .profile-browser | 2403-2406 |
| .profile-browser input[type="text"] | 2408-2417 |
| .profile-list | 2419-2432 |
| .profile-row | 2434-2444 |
| .profile-row:hover | 2446-2448 |
| .profile-row.active | 2450-2453 |
| .profile-row.applied | 2455-2457 |
| .profile-row-name | 2459-2465 |
| .profile-row-kind | 2467-2472 |
| .advanced-footer | 2474-2480 |
| .piano-preview.wide | 2482-2494 |
| .piano-preview.wide::before | 2496-2498 |
| .piano-preview.wide .play-icon | 2500-2506 |
| .piano-preview.wide .play-label | 2508-2510 |
| .instrument-browser-panel | 2512-2527 |
| .instrument-browser-panel.open | 2529-2533 |
| .instrument-browser-panel h3 | 2535-2540 |
| .piano-panel | 2542-2557 |
| .piano-panel.open | 2559-2563 |
| .piano-panel h3 | 2565-2570 |
| .piano-options | 2572-2575 |
| .piano-option | 2577-2589 |
| .piano-option.active | 2591-2594 |
| .piano-option:focus-visible | 2596-2598 |
| .piano-info | 2600-2603 |
| .piano-name | 2605-2608 |
| .piano-desc | 2610-2613 |
| .piano-option.simple .piano-name | 2615-2619 |
| .piano-option.simple .piano-desc | 2621-2625 |
| .piano-preview | 2627-2642 |
| .piano-preview::before | 2644-2652 |
| .piano-preview:active | 2654-2657 |
| .piano-preview.main | 2659-2663 |
| .settings-grid input[type="range"], .game-settings-grid input[type="range"], .adva... | 2668-2672 |
| .settings-grid input[type="range"]::-webkit-slider-runnable-track, .game-settings-... | 2677-2682 |
| .settings-grid input[type="range"]::-webkit-slider-thumb, .game-settings-grid inpu... | 2687-2696 |
| .settings-grid input[type="range"]:focus-visible::-webkit-slider-thumb, .game-sett... | 2701-2704 |
| .settings-grid input[type="range"]::-moz-range-track, .game-settings-grid input[ty... | 2709-2714 |
| .settings-grid input[type="range"]::-moz-range-thumb, .game-settings-grid input[ty... | 2719-2726 |
| .settings-grid input[type="range"]:focus-visible::-moz-range-thumb, .game-settings... | 2731-2734 |
| .volume-value | 2736-2739 |
| .status-row | 2741-2746 |
| .switch | 2748-2757 |
| .switch input | 2759-2764 |
| .switch-track | 2766-2772 |
| .switch-thumb | 2774-2784 |
| .switch input:checked+.switch-track | 2786-2788 |
| .switch input:checked+.switch-track .switch-thumb | 2790-2792 |
| .switch input:focus-visible+.switch-track | 2794-2797 |
| .control.compact .unit | 2799-2801 |
| .test-tone | 2803-2815 |
| .test-tone:hover | 2817-2820 |
| .test-tone:active | 2822-2824 |
| .test-tone-icon | 2826-2833 |
| .test-tone-label | 2835-2839 |
| .result | 2841-2845 |
| .reveal | 2847-2855 |
| .reveal strong | 2857-2859 |
| .reveal-label | 2861-2868 |
| .reveal-grid.compact | 2870-2878 |
| .reveal-cell | 2880-2883 |
| .reveal-cell.reveal-target-chord | 2885-2887 |
| .reveal-cell.reveal-target-notes | 2889-2891 |
| .reveal-cell.reveal-your-chord | 2893-2895 |
| .reveal-cell.reveal-your-notes | 2897-2899 |
| .keyboard-zone | 2901-2911 |
| .keyboard-stack | 2913-2923 |
| .keyboard-wrapper | 2925-2934 |
| .keyboard | 2936-2943 |
| .keyboard-wrapper.ends-black | 2945-2947 |
| .white-keys | 2949-2952 |
| .black-keys | 2954-2961 |
| .key | 2963-2974 |
| .key.white | 2976-2983 |
| .key.white.has-black | 2985-2987 |
| .key.black | 2989-2998 |
| .key span | 3000-3004 |
| .key.black span | 3006-3010 |
| .key.active | 3012-3015 |
| .key.black.active | 3017-3020 |
| .key.selected | 3022-3026 |
| .key.typed-preview | 3028-3030 |
| .key.correct | 3032-3036 |
| .key.wrong | 3038-3042 |
| .key.missed | 3044-3050 |
| .key.black.selected, .key.black.correct, .key.black.wrong | 3054-3056 |
| .key.black.missed | 3058-3064 |
| .keyboard.disabled | 3066-3072 |
| body.tutorial-open .keyboard | 3074-3076 |
| body.tutorial-open .keyboard.disabled | 3078-3081 |
| .keyboard.disabled::before | 3083-3095 |
| body.tutorial-open .keyboard.disabled::before | 3097-3099 |
| .keyboard.disabled::after | 3101-3135 |
| body.tutorial-open .keyboard.disabled::after | 3137-3139 |
| .tips | 3141-3150 |
| #pedal-tip[hidden] | 3152-3154 |
| .pedal-box | 3156-3170 |
| body.landing .pedal-box | 3172-3174 |
| .pedal-label | 3176-3186 |
| .pedal-icon | 3188-3195 |
| .pedal-icon.active | 3197-3200 |
| .note-pills | 3202-3209 |
| .reveal-grid.compact .note-pills | 3211-3213 |
| .note-pill | 3215-3221 |
| .reveal-grid.compact .note-pill | 3223-3226 |
| .note-pill.chord-pill | 3228-3236 |
| .note-pill.chord-pill .chord-link | 3238-3240 |
| .note-pill.chord-pill .chord-link-bubble | 3242-3247 |
| .note-pill.chord-pill:hover .chord-link-bubble | 3249-3252 |
| .note-pill.good | 3254-3258 |
| .note-pill.bad | 3260-3264 |
| .note-pill.missed | 3266-3270 |
| .note-pill.neutral | 3272-3276 |
| @media (max-width: 700px) | 3278-3333 |
| @media (max-height: 820px) | 3335-3356 |
| @media (max-height: 700px) | 3358-3363 |

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
File lines: 1-2145

| Symbol | Lines |
|---|---|
| primeAudioFromGesture | 5-14 |
| shouldRestartRoundForSetting | 27-30 |
| patchSettingsState | 32-38 |
| adjustKeyCount | 410-413 |
| bindKeyCountStepper | 415-420 |
| isChordTutorialOpen | 622-622 |
| fitTutorialLayout | 625-653 |
| clearFitClasses | 631-634 |
| applyFitClass | 636-641 |
| getTutorialStep | 655-660 |
| getStepUnlockedRootSet | 662-670 |
| getStepUnlockedQualitySet | 672-678 |
| isTutorialRootEnabled | 680-680 |
| isTutorialQualityEnabled | 681-681 |
| getTutorialRootLabel | 683-686 |
| midiToTutorialLabel | 688-692 |
| getClosestNoteIdFromMidi | 694-701 |
| getTutorialRenderedChord | 703-725 |
| ensureTutorialKeyboard | 727-765 |
| getStepAllowedQualityIds | 767-769 |
| getTutorialActiveSpec | 771-773 |
| renderTutorialCurrentText | 775-786 |
| renderTutorialPianoHighlight | 788-822 |
| renderTutorialRootOptions | 824-842 |
| renderTutorialQualityOptions | 844-889 |
| syncTutorialRootChipStates | 891-910 |
| syncTutorialQualityChipStates | 912-931 |
| setTutorialHoverSpec | 933-940 |
| clearTutorialHoverSpec | 942-945 |
| refreshTutorialVisuals | 947-951 |
| getTutorialStepIndexForQuality | 981-987 |
| renderChordTutorialTabs | 989-1017 |
| fitTutorialProgressTabs | 1019-1024 |
| renderChordTutorialStep | 1026-1082 |
| closeChordTutorial | 1084-1120 |
| clearSuppress | 1098-1104 |
| openChordTutorial | 1122-1157 |
| registerTutorialOpenTrigger | 1159-1166 |
| openChordTutorialForChordLink | 1168-1178 |
| handleChordLinkActivation | 1180-1187 |
| toggleHelperPinned | 1240-1250 |
| isChordTypingCaptureActive | 1350-1355 |
| insertTypedCharacter | 1357-1364 |
| triggerPrimaryAction | 1367-1376 |
| getButtonLikeTarget | 1379-1379 |
| blurPointerActivatedControl | 1380-1387 |
| ensureCustomCursorEl | 1397-1414 |
| getCustomCursorMode | 1415-1427 |
| renderCustomCursor | 1436-1444 |
| scheduleCustomCursorRender | 1445-1448 |
| setCustomCursorEnabled | 1449-1462 |
| updateCustomCursorPosition | 1463-1470 |
| triggerReplayAction | 1472-1478 |
| bindPianoOptionEvents | 1638-1663 |
| applyCustomCursorMediaState | 1781-1783 |
| isElementVisible | 1798-1804 |
| getFocusableElements | 1806-1810 |
| focusFirstInModal | 1816-1822 |
| trapModalFocus | 1824-1846 |
| isTextEditableTarget | 1848-1853 |
| getActiveModalEl | 1855-1860 |
| closeGameSettingsModalUi | 1862-1871 |
| openGameSettingsModalUi | 1873-1879 |
| closeActiveModal | 1881-1895 |
| moveFocusInPanel | 1897-1908 |
| setRandomBackgroundAngle | 2098-2101 |
| init | 2103-2139 |
| runDeferredCatalogLoad | 2123-2132 |

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
| typingShowPianoToggle | change | 205 |
| typingShowTypedToggle | change | 215 |
| resetSettingsButton | click | 227 |
| settingsToggle | click | 241 |
| themeToggle | click | 250 |
| homeToggle | click | 261 |
| settingsPanel | click | 270 |
| optionsTrigger | click | 292 |
| gameSettingsOpen | click | 299 |
| gameSettingsBackdrop | click | 306 |
| gameSettingsClose | click | 313 |
| document | click | 319 |
| window | resize | 323 |
| playSelectedButton | click | 334 |
| playSelectedButton | pointerdown | 338 |
| playSelectedButton | pointerup | 343 |
| playSelectedButton | pointerleave | 347 |
| primaryActionButton | click | 351 |
| volumeSlider | input | 359 |
| lengthSlider | input | 365 |
| attackSlider | input | 371 |
| decaySlider | input | 377 |
| releaseSlider | input | 383 |
| sustainSlider | input | 389 |
| keyCountSlider | input | 395 |
| keyCountSlider | change | 402 |
| keyCountSlider | pointerup | 406 |
| hintButton | click | 425 |
| chordAnswerInput | input | 430 |
| chordAnswerInput | keydown | 437 |
| window | pointermove | 1106 |
| window | pointerdown | 1107 |
| window | keydown | 1108 |
| triggerEl | click | 1161 |
| document | click | 1189 |
| document | keydown | 1190 |
| chordTutorialTabs | click | 1196 |
| chordTutorialClose | click | 1208 |
| chordTutorialBackdrop | click | 1215 |
| chordTutorialPrev | click | 1221 |
| chordTutorialNext | click | 1229 |
| document | click | 1252 |
| document | keydown | 1258 |
| chordTutorialRootList | mouseover | 1266 |
| chordTutorialRootList | mouseleave | 1274 |
| chordTutorialRootList | focusin | 1277 |
| chordTutorialRootList | focusout | 1285 |
| chordTutorialRootList | click | 1288 |
| chordTutorialQualityList | mouseover | 1304 |
| chordTutorialQualityList | mouseleave | 1311 |
| chordTutorialQualityList | focusin | 1314 |
| chordTutorialQualityList | focusout | 1321 |
| chordTutorialQualityList | click | 1324 |
| volumeSlider | dblclick | 1480 |
| lengthSlider | dblclick | 1484 |
| keyCountSlider | dblclick | 1488 |
| startNoteDownButton | click | 1494 |
| startNoteUpButton | click | 1497 |
| startNoteDownOctButton | click | 1503 |
| startNoteUpOctButton | click | 1506 |
| noteCountInput | dblclick | 1511 |
| attackSlider | dblclick | 1519 |
| decaySlider | dblclick | 1523 |
| releaseSlider | dblclick | 1527 |
| sustainSlider | dblclick | 1531 |
| profileSearch | input | 1536 |
| profileList | click | 1542 |
| profileList | dblclick | 1547 |
| profileList | keydown | 1550 |
| profileApply | click | 1561 |
| profileSave | click | 1567 |
| instrumentPresetSearch | input | 1573 |
| instrumentPresetList | click | 1579 |
| instrumentPresetList | dblclick | 1584 |
| instrumentPresetList | keydown | 1587 |
| instrumentPresetApply | click | 1598 |
| advancedTrigger | click | 1603 |
| advancedPanel | click | 1608 |
| pianoTrigger | click | 1613 |
| pianoPanel | click | 1620 |
| instrumentBrowserTrigger | click | 1626 |
| instrumentBrowserPanel | click | 1633 |
| pianoOptionsContainer | click | 1641 |
| pianoOptionsContainer | keydown | 1655 |
| pianoPreviewMain | click | 1666 |
| testEnvelopeButton | click | 1673 |
| keyboardEl | pointerdown | 1678 |
| document | pointerup | 1714 |
| document | pointercancel | 1721 |
| document | pointerdown | 1728 |
| document | click | 1734 |
| document | pointermove | 1738 |
| document | pointerup | 1742 |
| document | pointercancel | 1747 |
| document | pointerover | 1752 |
| document | pointerout | 1758 |
| window | blur | 1767 |
| document | visibilitychange | 1773 |
| CUSTOM_CURSOR_QUERY | change | 1785 |
| keyboardEl | click | 1791 |
| document | keydown | 1910 |
| document | keyup | 2046 |
| pedalBox | pointerdown | 2065 |
| pedalBox | pointerup | 2074 |
| pedalBox | pointercancel | 2083 |
| pedalBox | pointerleave | 2091 |

### js/game.js (Active Runtime)
File lines: 1-2154

| Symbol | Lines |
|---|---|
| getHelperPinRound | 137-137 |
| getPinnedHelperLabels | 139-146 |
| isHelperPinnedLabel | 148-152 |
| toggleHelperPinnedLabel | 154-164 |
| applyRoundStatePatch | 170-179 |
| applySubmissionStatePatch | 181-190 |
| normalizeQualityToken | 192-209 |
| renderChordLink | 218-242 |
| getKeyboardZoneEl | 270-270 |
| normalizePitchClass | 271-271 |
| getRootName | 272-272 |
| getMidiFromNoteId | 273-273 |
| buildChordLabel | 274-274 |
| getPitchClassSetFromNoteIds | 276-284 |
| getRootGuideNoteId | 290-305 |
| getEffectiveKeyboardSelection | 307-319 |
| getChordDifficultyId | 321-326 |
| getChordDisplayLabel | 328-328 |
| getChordQualityDisplaySuffix | 330-330 |
| getChordDifficultyConfig | 332-335 |
| getAllowedChordQualities | 337-342 |
| getChordQualityHint | 344-347 |
| getConsistentPreviewDuration | 355-358 |
| playConsistentPreview | 364-382 |
| releaseInteractivePressSession | 419-447 |
| getReplayNoteIds | 449-473 |
| getVoicingHintLabel | 475-479 |
| randomSample | 481-488 |
| getNiceTarget | 490-527 |
| getQualityPitchClassSet | 529-535 |
| parseChordInput | 537-576 |
| detectChordFromNoteIds | 578-614 |
| normalizeIntervals | 616-618 |
| fitIntervalsToAvailableRange | 620-640 |
| buildVoicedIntervals | 642-670 |
| chooseRootCandidatesForIntervals | 672-681 |
| buildChordFromRoot | 683-711 |
| createChordTarget | 713-763 |
| createNoteTarget | 765-800 |
| createTarget | 802-809 |
| clearTypingAutoNext | 811-815 |
| ensureRoundPlaybackReady | 826-843 |
| getTypedPreviewNoteIds | 845-879 |
| updateTypedPreviewFromInput | 881-894 |
| updateChordReadout | 896-968 |
| updateModeVisibility | 970-987 |
| updatePrimaryAction | 989-994 |
| updateReplayAvailability | 996-1003 |
| getChordHelperHints | 1005-1023 |
| createDeterministicHelperMask | 1041-1069 |
| renderChordHelperBox | 1071-1098 |
| updateStatus | 1100-1224 |
| updateKeyStates | 1226-1287 |
| setKeyboardEnabled | 1289-1292 |
| updateKeyboardScale | 1294-1305 |
| lockKeyboardForPlayback | 1307-1320 |
| setSubmitted | 1322-1329 |
| goHome | 1331-1383 |
| refreshTarget | 1385-1411 |
| startRound | 1413-1489 |
| ensureRound | 1491-1500 |
| playTarget | 1502-1516 |
| startManualNote | 1518-1536 |
| releaseManualNote | 1538-1546 |
| releasePedalNotes | 1548-1558 |
| startPedalHold | 1560-1566 |
| stopPedalHold | 1568-1575 |
| toggleSelection | 1577-1621 |
| isSelectionCorrect | 1623-1640 |
| getPlaybackSpan | 1642-1647 |
| renderNotePills | 1649-1655 |
| renderChordPill | 1657-1661 |
| renderTonePills | 1663-1671 |
| renderRevealCell | 1673-1678 |
| renderChordRevealGrid | 1680-1683 |
| renderChordDetectionMeta | 1685-1689 |
| renderPressedPills | 1691-1696 |
| buildNoteComparison | 1698-1705 |
| buildAnswerNoteCell | 1707-1716 |
| buildTargetNoteCell | 1718-1731 |
| getSubmittedReplaySnapshot | 1755-1769 |
| playSubmittedReplaySequence | 1771-1784 |
| playRevealSequence | 1786-1836 |
| playSelectedChord | 1838-1862 |
| playTypedInputChord | 1864-1877 |
| startHeldPlayback | 1879-1905 |
| releaseHeldPlayback | 1907-1921 |
| buildTypingRevealDetail | 1923-1943 |
| submitTypedAnswer | 1945-2019 |
| submitAnswer | 2021-2084 |
| sanitizeRoundStateForKeyboardRange | 2086-2126 |

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

