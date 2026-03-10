# Project Map

Generated: 2026-03-10 13:59:13 +01:00

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
| styles.css | CSS | Loaded directly | Yes | 3319 |
| js/audio.js | JavaScript | Browser runtime module | Yes | 1529 |
| js/core.js | JavaScript | Browser runtime module | Yes | 1064 |
| js/events.js | JavaScript | Browser runtime module | Yes | 2110 |
| js/game.js | JavaScript | Browser runtime module | Yes | 2111 |
| js/settings.js | JavaScript | Browser runtime module | Yes | 1474 |
| README.md | Markdown | Human + AI onboarding | Yes | 135 |
| IMPLEMENTATION_CHECKLIST.md | Markdown | Implementation roadmap checklist | Yes | 237 |
| AGENTS.md | Markdown | AI instruction override | Yes | 47 |
| PROJECT_MAP.md | Markdown | Generated reference map | Yes | 1219 |
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
File: styles.css (1-3319)

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
| .tutorial-progress-tabs | 1260-1277 |
| .tutorial-progress-tabs::-webkit-scrollbar | 1279-1281 |
| .tutorial-progress-tab | 1283-1304 |
| .tutorial-progress-step | 1306-1319 |
| .tutorial-progress-label | 1321-1328 |
| .tutorial-progress-tabs.compact .tutorial-progress-label | 1330-1332 |
| .tutorial-progress-tabs.compact .tutorial-progress-tab | 1334-1336 |
| .tutorial-progress-tabs::before | 1338-1350 |
| .tutorial-progress-tabs::after | 1352-1366 |
| .tutorial-progress-tab.complete | 1368-1370 |
| .tutorial-progress-tab.complete .tutorial-progress-step | 1372-1376 |
| .tutorial-progress-tab.active | 1378-1380 |
| .tutorial-progress-tab.active .tutorial-progress-step | 1382-1389 |
| .tutorial-progress-tab:focus-visible | 1391-1394 |
| .tutorial-progress-tab:hover, .tutorial-progress-tab:focus-visible | 1397-1399 |
| .tutorial-progress-row > button | 1401-1403 |
| .tutorial-lab | 1405-1414 |
| .tutorial-current | 1416-1420 |
| .tutorial-selector-block | 1422-1425 |
| .tutorial-control-matrix | 1427-1434 |
| .tutorial-control-row | 1436-1444 |
| .tutorial-control-row.locked | 1446-1448 |
| .tutorial-control-row.locked::after | 1450-1457 |
| .tutorial-control-row.newly-unlocked | 1459-1461 |
| @keyframes tutorial-unlock | 1463-1471 |
| .tutorial-selector-title | 1473-1479 |
| .tutorial-chip-list | 1481-1485 |
| #chord-tutorial-quality-list | 1487-1490 |
| .tutorial-quality-table | 1492-1497 |
| .tutorial-quality-table th, .tutorial-quality-table td | 1500-1504 |
| .tutorial-quality-table tr:first-child th, .tutorial-quality-table tr:first-child td | 1507-1509 |
| .tutorial-quality-table th | 1511-1520 |
| .tutorial-chip-group-list | 1522-1526 |
| .tutorial-chip | 1528-1540 |
| .tutorial-chip.unlocked | 1542-1545 |
| .tutorial-chip.unlocked:hover, .tutorial-chip.unlocked:focus-visible | 1548-1551 |
| .tutorial-chip[disabled] | 1553-1557 |
| .tutorial-chip.locked | 1559-1566 |
| .tutorial-chip:hover, .tutorial-chip:focus-visible | 1569-1572 |
| .tutorial-chip.active | 1574-1577 |
| .tutorial-chip.muted | 1579-1582 |
| .tutorial-chip.muted:hover, .tutorial-chip.muted:focus-visible | 1585-1587 |
| .tutorial-chip.newly-unlocked | 1589-1592 |
| .tutorial-chip.locked.newly-unlocked | 1594-1597 |
| .tutorial-piano-wrap | 1599-1604 |
| .tutorial-piano-title | 1606-1613 |
| .tutorial-piano | 1615-1626 |
| .tutorial-key | 1628-1633 |
| .tutorial-key.white | 1635-1643 |
| .tutorial-key.black | 1645-1653 |
| .tutorial-key.tone | 1655-1657 |
| .tutorial-key.tone.root | 1659-1661 |
| .tutorial-key[data-role]::after | 1663-1676 |
| .helper-card | 1678-1685 |
| .helper-title | 1687-1692 |
| .helper-list | 1694-1698 |
| .helper-item | 1700-1711 |
| .helper-item::after | 1713-1721 |
| .helper-item:last-child::after | 1723-1725 |
| .helper-item:hover, .helper-item:focus-within | 1728-1730 |
| @media (hover: hover) and (pointer: fine) | 1732-1738 |
| .app-cursor | 1740-1751 |
| .app-cursor.visible | 1753-1755 |
| .app-cursor-ring, .app-cursor-dot | 1758-1765 |
| .app-cursor-ring | 1767-1775 |
| .app-cursor-dot | 1777-1781 |
| .app-cursor.is-interactive .app-cursor-ring | 1783-1788 |
| .app-cursor.is-interactive .app-cursor-dot | 1790-1792 |
| .app-cursor.is-text .app-cursor-ring | 1794-1799 |
| .app-cursor.is-pressed .app-cursor-ring | 1801-1803 |
| .app-cursor.is-pressed .app-cursor-dot | 1805-1807 |
| .helper-label | 1809-1815 |
| .helper-item .helper-value | 1817-1825 |
| .helper-item .helper-mask | 1827-1835 |
| .helper-item .helper-real | 1837-1849 |
| .helper-item:hover .helper-mask, .helper-item:focus-within .helper-mask | 1852-1855 |
| .helper-item:hover .helper-real, .helper-item:focus-within .helper-real | 1858-1861 |
| .typing-zone[hidden] | 1863-1865 |
| .status | 1867-1878 |
| .status[hidden] | 1880-1882 |
| .helper-slot[hidden] | 1884-1886 |
| .status-actions | 1888-1894 |
| .hint-flag | 1896-1909 |
| .hint-flag[hidden] | 1911-1913 |
| .hint-button | 1915-1917 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) | 1919-1933 |
| .settings-toggle | 1935-1937 |
| .theme-toggle | 1939-1941 |
| .home-toggle | 1943-1945 |
| :is(.settings-toggle, .theme-toggle, .home-toggle):hover | 1947-1949 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) svg | 1951-1955 |
| .settings-toggle svg | 1957-1960 |
| .settings-panel | 1962-1981 |
| .settings-panel.open | 1983-1987 |
| .settings-panel h2 | 1989-1994 |
| .settings-body | 1996-2000 |
| .settings-grid | 2002-2005 |
| .settings-section-title | 2007-2015 |
| .panel-trigger, .advanced-trigger, .dropdown-trigger, .control select | 2020-2029 |
| .advanced-trigger | 2031-2035 |
| .dropdown-trigger | 2037-2045 |
| .dropdown-trigger svg | 2047-2051 |
| .panel-trigger | 2053-2058 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger):hover | 2060-2063 |
| .panel-trigger:hover | 2065-2067 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger)[aria-expanded="true"] | 2069-2072 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger, .control select):focus-v... | 2074-2077 |
| .control select | 2079-2083 |
| .options-panel | 2085-2101 |
| .options-panel.open | 2103-2107 |
| .options-panel h3 | 2109-2116 |
| .options-grid | 2118-2121 |
| .options-panel .control | 2123-2129 |
| .options-panel .control.compact | 2131-2133 |
| .options-panel .control>label | 2135-2137 |
| .options-section-title | 2139-2148 |
| .options-panel .options-section-title:first-child | 2150-2154 |
| .advanced-panel | 2156-2175 |
| .advanced-panel.open | 2177-2181 |
| .advanced-panel h3 | 2183-2188 |
| .advanced-grid | 2190-2199 |
| .advanced-grid::-webkit-scrollbar | 2201-2203 |
| .advanced-grid::-webkit-scrollbar-track | 2205-2208 |
| .advanced-grid::-webkit-scrollbar-thumb | 2210-2214 |
| .inline-value | 2216-2223 |
| .slider-stack | 2225-2228 |
| .slider-stack input[type="range"] | 2230-2234 |
| .slider-ghost | 2236-2250 |
| .slider-ghost.visible | 2252-2254 |
| .sf2-browser | 2256-2259 |
| .sf2-browser input[type="text"] | 2261-2270 |
| .sf2-preset-list | 2272-2285 |
| .sf2-browser .piano-desc | 2287-2290 |
| .sf2-browser .piano-desc.pending, .profile-browser .piano-desc.pending | 2293-2295 |
| .sf2-group | 2297-2302 |
| .sf2-group-title | 2304-2313 |
| .sf2-row | 2315-2323 |
| .sf2-row:first-child | 2325-2327 |
| .sf2-row:hover | 2329-2331 |
| .sf2-row.active | 2333-2336 |
| .sf2-row-name | 2338-2344 |
| .sf2-row-program, .sf2-row-bank | 2347-2351 |
| .sf2-empty | 2353-2357 |
| .profile-browser | 2359-2362 |
| .profile-browser input[type="text"] | 2364-2373 |
| .profile-list | 2375-2388 |
| .profile-row | 2390-2400 |
| .profile-row:hover | 2402-2404 |
| .profile-row.active | 2406-2409 |
| .profile-row.applied | 2411-2413 |
| .profile-row-name | 2415-2421 |
| .profile-row-kind | 2423-2428 |
| .advanced-footer | 2430-2436 |
| .piano-preview.wide | 2438-2450 |
| .piano-preview.wide::before | 2452-2454 |
| .piano-preview.wide .play-icon | 2456-2462 |
| .piano-preview.wide .play-label | 2464-2466 |
| .instrument-browser-panel | 2468-2483 |
| .instrument-browser-panel.open | 2485-2489 |
| .instrument-browser-panel h3 | 2491-2496 |
| .piano-panel | 2498-2513 |
| .piano-panel.open | 2515-2519 |
| .piano-panel h3 | 2521-2526 |
| .piano-options | 2528-2531 |
| .piano-option | 2533-2545 |
| .piano-option.active | 2547-2550 |
| .piano-option:focus-visible | 2552-2554 |
| .piano-info | 2556-2559 |
| .piano-name | 2561-2564 |
| .piano-desc | 2566-2569 |
| .piano-option.simple .piano-name | 2571-2575 |
| .piano-option.simple .piano-desc | 2577-2581 |
| .piano-preview | 2583-2598 |
| .piano-preview::before | 2600-2608 |
| .piano-preview:active | 2610-2613 |
| .piano-preview.main | 2615-2619 |
| .settings-grid input[type="range"], .game-settings-grid input[type="range"], .adva... | 2624-2628 |
| .settings-grid input[type="range"]::-webkit-slider-runnable-track, .game-settings-... | 2633-2638 |
| .settings-grid input[type="range"]::-webkit-slider-thumb, .game-settings-grid inpu... | 2643-2652 |
| .settings-grid input[type="range"]:focus-visible::-webkit-slider-thumb, .game-sett... | 2657-2660 |
| .settings-grid input[type="range"]::-moz-range-track, .game-settings-grid input[ty... | 2665-2670 |
| .settings-grid input[type="range"]::-moz-range-thumb, .game-settings-grid input[ty... | 2675-2682 |
| .settings-grid input[type="range"]:focus-visible::-moz-range-thumb, .game-settings... | 2687-2690 |
| .volume-value | 2692-2695 |
| .status-row | 2697-2702 |
| .switch | 2704-2713 |
| .switch input | 2715-2720 |
| .switch-track | 2722-2728 |
| .switch-thumb | 2730-2740 |
| .switch input:checked+.switch-track | 2742-2744 |
| .switch input:checked+.switch-track .switch-thumb | 2746-2748 |
| .switch input:focus-visible+.switch-track | 2750-2753 |
| .control.compact .unit | 2755-2757 |
| .test-tone | 2759-2771 |
| .test-tone:hover | 2773-2776 |
| .test-tone:active | 2778-2780 |
| .test-tone-icon | 2782-2789 |
| .test-tone-label | 2791-2795 |
| .result | 2797-2801 |
| .reveal | 2803-2811 |
| .reveal strong | 2813-2815 |
| .reveal-label | 2817-2824 |
| .reveal-grid.compact | 2826-2834 |
| .reveal-cell | 2836-2839 |
| .reveal-cell.reveal-target-chord | 2841-2843 |
| .reveal-cell.reveal-target-notes | 2845-2847 |
| .reveal-cell.reveal-your-chord | 2849-2851 |
| .reveal-cell.reveal-your-notes | 2853-2855 |
| .keyboard-zone | 2857-2867 |
| .keyboard-stack | 2869-2879 |
| .keyboard-wrapper | 2881-2890 |
| .keyboard | 2892-2899 |
| .keyboard-wrapper.ends-black | 2901-2903 |
| .white-keys | 2905-2908 |
| .black-keys | 2910-2917 |
| .key | 2919-2930 |
| .key.white | 2932-2939 |
| .key.white.has-black | 2941-2943 |
| .key.black | 2945-2954 |
| .key span | 2956-2960 |
| .key.black span | 2962-2966 |
| .key.active | 2968-2971 |
| .key.black.active | 2973-2976 |
| .key.selected | 2978-2982 |
| .key.typed-preview | 2984-2986 |
| .key.correct | 2988-2992 |
| .key.wrong | 2994-2998 |
| .key.missed | 3000-3006 |
| .key.black.selected, .key.black.correct, .key.black.wrong | 3010-3012 |
| .key.black.missed | 3014-3020 |
| .keyboard.disabled | 3022-3028 |
| body.tutorial-open .keyboard | 3030-3032 |
| body.tutorial-open .keyboard.disabled | 3034-3037 |
| .keyboard.disabled::before | 3039-3051 |
| body.tutorial-open .keyboard.disabled::before | 3053-3055 |
| .keyboard.disabled::after | 3057-3091 |
| body.tutorial-open .keyboard.disabled::after | 3093-3095 |
| .tips | 3097-3106 |
| #pedal-tip[hidden] | 3108-3110 |
| .pedal-box | 3112-3126 |
| body.landing .pedal-box | 3128-3130 |
| .pedal-label | 3132-3142 |
| .pedal-icon | 3144-3151 |
| .pedal-icon.active | 3153-3156 |
| .note-pills | 3158-3165 |
| .reveal-grid.compact .note-pills | 3167-3169 |
| .note-pill | 3171-3177 |
| .reveal-grid.compact .note-pill | 3179-3182 |
| .note-pill.chord-pill | 3184-3192 |
| .note-pill.chord-pill .chord-link | 3194-3196 |
| .note-pill.chord-pill .chord-link-bubble | 3198-3203 |
| .note-pill.chord-pill:hover .chord-link-bubble | 3205-3208 |
| .note-pill.good | 3210-3214 |
| .note-pill.bad | 3216-3220 |
| .note-pill.missed | 3222-3226 |
| .note-pill.neutral | 3228-3232 |
| @media (max-width: 700px) | 3234-3289 |
| @media (max-height: 820px) | 3291-3312 |
| @media (max-height: 700px) | 3314-3319 |

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
File lines: 1-1064

| Symbol | Lines |
|---|---|
| normalizePracticeProfile | 432-452 |
| normalizePracticeProfiles | 453-460 |
| isTypingOnlyModeFromState | 464-464 |
| getEffectiveBlindModeFromState | 468-468 |
| getEffectivePracticeModeFromState | 469-477 |
| capturePracticeProfileFromState | 478-499 |
| clampEnvelopeValue | 600-600 |
| resolveEnvelopeMetrics | 613-648 |
| saveSettings | 662-693 |
| loadSettings | 695-752 |
| resetAllSettings | 754-787 |
| buildNotes | 835-850 |
| getNoteIdByMidi | 852-859 |
| isConsonant | 877-880 |
| getNicePool | 882-882 |
| getNoteCountMax | 884-888 |
| updateNoteCountMax | 890-898 |
| getCssNumber | 900-900 |
| clamp | 901-901 |
| getMaxStartMidi | 902-902 |
| clampStartMidi | 903-903 |
| getMidiLabel | 904-908 |
| getPanelBottomGap | 909-912 |
| normalizeSoundfontDefinition | 914-932 |
| setSoundfontCatalog | 934-955 |
| getSoundfontList | 957-957 |
| renderPianoOptions | 959-1003 |
| createKey | 1005-1016 |
| renderKeyboard | 1018-1050 |
| rebuildKeyboard | 1052-1063 |

### js/events.js (Active Runtime)
File lines: 1-2110

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
| renderChordTutorialTabs | 989-1011 |
| fitTutorialProgressTabs | 1013-1018 |
| renderChordTutorialStep | 1020-1076 |
| closeChordTutorial | 1078-1114 |
| clearSuppress | 1092-1098 |
| openChordTutorial | 1116-1151 |
| registerTutorialOpenTrigger | 1153-1160 |
| openChordTutorialForChordLink | 1162-1172 |
| handleChordLinkActivation | 1174-1181 |
| isChordTypingCaptureActive | 1319-1324 |
| insertTypedCharacter | 1326-1333 |
| triggerPrimaryAction | 1336-1345 |
| getButtonLikeTarget | 1348-1348 |
| blurPointerActivatedControl | 1349-1356 |
| ensureCustomCursorEl | 1366-1383 |
| getCustomCursorMode | 1384-1393 |
| renderCustomCursor | 1401-1409 |
| scheduleCustomCursorRender | 1410-1413 |
| setCustomCursorEnabled | 1414-1427 |
| updateCustomCursorPosition | 1428-1435 |
| triggerReplayAction | 1437-1443 |
| bindPianoOptionEvents | 1603-1628 |
| applyCustomCursorMediaState | 1746-1748 |
| isElementVisible | 1763-1769 |
| getFocusableElements | 1771-1775 |
| focusFirstInModal | 1781-1787 |
| trapModalFocus | 1789-1811 |
| isTextEditableTarget | 1813-1818 |
| getActiveModalEl | 1820-1825 |
| closeGameSettingsModalUi | 1827-1836 |
| openGameSettingsModalUi | 1838-1844 |
| closeActiveModal | 1846-1860 |
| moveFocusInPanel | 1862-1873 |
| setRandomBackgroundAngle | 2063-2066 |
| init | 2068-2104 |
| runDeferredCatalogLoad | 2088-2097 |

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
| window | pointermove | 1100 |
| window | pointerdown | 1101 |
| window | keydown | 1102 |
| triggerEl | click | 1155 |
| document | click | 1183 |
| document | keydown | 1184 |
| chordTutorialTabs | click | 1190 |
| chordTutorialClose | click | 1202 |
| chordTutorialBackdrop | click | 1209 |
| chordTutorialPrev | click | 1215 |
| chordTutorialNext | click | 1223 |
| chordTutorialRootList | mouseover | 1235 |
| chordTutorialRootList | mouseleave | 1243 |
| chordTutorialRootList | focusin | 1246 |
| chordTutorialRootList | focusout | 1254 |
| chordTutorialRootList | click | 1257 |
| chordTutorialQualityList | mouseover | 1273 |
| chordTutorialQualityList | mouseleave | 1280 |
| chordTutorialQualityList | focusin | 1283 |
| chordTutorialQualityList | focusout | 1290 |
| chordTutorialQualityList | click | 1293 |
| volumeSlider | dblclick | 1445 |
| lengthSlider | dblclick | 1449 |
| keyCountSlider | dblclick | 1453 |
| startNoteDownButton | click | 1459 |
| startNoteUpButton | click | 1462 |
| startNoteDownOctButton | click | 1468 |
| startNoteUpOctButton | click | 1471 |
| noteCountInput | dblclick | 1476 |
| attackSlider | dblclick | 1484 |
| decaySlider | dblclick | 1488 |
| releaseSlider | dblclick | 1492 |
| sustainSlider | dblclick | 1496 |
| profileSearch | input | 1501 |
| profileList | click | 1507 |
| profileList | dblclick | 1512 |
| profileList | keydown | 1515 |
| profileApply | click | 1526 |
| profileSave | click | 1532 |
| instrumentPresetSearch | input | 1538 |
| instrumentPresetList | click | 1544 |
| instrumentPresetList | dblclick | 1549 |
| instrumentPresetList | keydown | 1552 |
| instrumentPresetApply | click | 1563 |
| advancedTrigger | click | 1568 |
| advancedPanel | click | 1573 |
| pianoTrigger | click | 1578 |
| pianoPanel | click | 1585 |
| instrumentBrowserTrigger | click | 1591 |
| instrumentBrowserPanel | click | 1598 |
| pianoOptionsContainer | click | 1606 |
| pianoOptionsContainer | keydown | 1620 |
| pianoPreviewMain | click | 1631 |
| testEnvelopeButton | click | 1638 |
| keyboardEl | pointerdown | 1643 |
| document | pointerup | 1679 |
| document | pointercancel | 1686 |
| document | pointerdown | 1693 |
| document | click | 1699 |
| document | pointermove | 1703 |
| document | pointerup | 1707 |
| document | pointercancel | 1712 |
| document | pointerover | 1717 |
| document | pointerout | 1723 |
| window | blur | 1732 |
| document | visibilitychange | 1738 |
| CUSTOM_CURSOR_QUERY | change | 1750 |
| keyboardEl | click | 1756 |
| document | keydown | 1875 |
| document | keyup | 2011 |
| pedalBox | pointerdown | 2030 |
| pedalBox | pointerup | 2039 |
| pedalBox | pointercancel | 2048 |
| pedalBox | pointerleave | 2056 |

### js/game.js (Active Runtime)
File lines: 1-2111

| Symbol | Lines |
|---|---|
| applyRoundStatePatch | 137-146 |
| applySubmissionStatePatch | 148-157 |
| normalizeQualityToken | 159-176 |
| renderChordLink | 185-209 |
| getKeyboardZoneEl | 237-237 |
| normalizePitchClass | 238-238 |
| getRootName | 239-239 |
| getMidiFromNoteId | 240-240 |
| buildChordLabel | 241-241 |
| getPitchClassSetFromNoteIds | 243-251 |
| getRootGuideNoteId | 257-272 |
| getEffectiveKeyboardSelection | 274-286 |
| getChordDifficultyId | 288-293 |
| getChordDisplayLabel | 295-295 |
| getChordQualityDisplaySuffix | 297-297 |
| getChordDifficultyConfig | 299-302 |
| getAllowedChordQualities | 304-309 |
| getChordQualityHint | 311-314 |
| getConsistentPreviewDuration | 322-325 |
| playConsistentPreview | 331-349 |
| releaseInteractivePressSession | 386-414 |
| getReplayNoteIds | 416-440 |
| getVoicingHintLabel | 442-446 |
| randomSample | 448-455 |
| getNiceTarget | 457-494 |
| getQualityPitchClassSet | 496-502 |
| parseChordInput | 504-543 |
| detectChordFromNoteIds | 545-581 |
| normalizeIntervals | 583-585 |
| fitIntervalsToAvailableRange | 587-607 |
| buildVoicedIntervals | 609-637 |
| chooseRootCandidatesForIntervals | 639-648 |
| buildChordFromRoot | 650-678 |
| createChordTarget | 680-730 |
| createNoteTarget | 732-767 |
| createTarget | 769-776 |
| clearTypingAutoNext | 778-782 |
| ensureRoundPlaybackReady | 793-810 |
| getTypedPreviewNoteIds | 812-846 |
| updateTypedPreviewFromInput | 848-861 |
| updateChordReadout | 863-935 |
| updateModeVisibility | 937-954 |
| updatePrimaryAction | 956-961 |
| updateReplayAvailability | 963-970 |
| getChordHelperHints | 972-990 |
| createDeterministicHelperMask | 1008-1036 |
| renderChordHelperBox | 1038-1056 |
| updateStatus | 1058-1182 |
| updateKeyStates | 1184-1245 |
| setKeyboardEnabled | 1247-1250 |
| updateKeyboardScale | 1252-1263 |
| lockKeyboardForPlayback | 1265-1278 |
| setSubmitted | 1280-1287 |
| goHome | 1289-1341 |
| refreshTarget | 1343-1369 |
| startRound | 1371-1447 |
| ensureRound | 1449-1458 |
| playTarget | 1460-1474 |
| startManualNote | 1476-1494 |
| releaseManualNote | 1496-1504 |
| releasePedalNotes | 1506-1516 |
| startPedalHold | 1518-1524 |
| stopPedalHold | 1526-1533 |
| toggleSelection | 1535-1579 |
| isSelectionCorrect | 1581-1598 |
| getPlaybackSpan | 1600-1605 |
| renderNotePills | 1607-1613 |
| renderChordPill | 1615-1619 |
| renderTonePills | 1621-1629 |
| renderRevealCell | 1631-1636 |
| renderChordRevealGrid | 1638-1641 |
| renderChordDetectionMeta | 1643-1647 |
| renderPressedPills | 1649-1654 |
| buildNoteComparison | 1656-1663 |
| buildAnswerNoteCell | 1665-1674 |
| buildTargetNoteCell | 1676-1689 |
| getSubmittedReplaySnapshot | 1713-1727 |
| playSubmittedReplaySequence | 1729-1742 |
| playRevealSequence | 1744-1794 |
| playSelectedChord | 1796-1820 |
| playTypedInputChord | 1822-1835 |
| startHeldPlayback | 1837-1863 |
| releaseHeldPlayback | 1865-1879 |
| buildTypingRevealDetail | 1881-1901 |
| submitTypedAnswer | 1903-1977 |
| submitAnswer | 1979-2042 |
| sanitizeRoundStateForKeyboardRange | 2044-2084 |

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

