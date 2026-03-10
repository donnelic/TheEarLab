# Project Map

Generated: 2026-03-10 14:02:00 +01:00

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
| styles.css | CSS | Loaded directly | Yes | 3320 |
| js/audio.js | JavaScript | Browser runtime module | Yes | 1529 |
| js/core.js | JavaScript | Browser runtime module | Yes | 1064 |
| js/events.js | JavaScript | Browser runtime module | Yes | 2116 |
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
File: styles.css (1-3320)

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
| .helper-card | 1679-1686 |
| .helper-title | 1688-1693 |
| .helper-list | 1695-1699 |
| .helper-item | 1701-1712 |
| .helper-item::after | 1714-1722 |
| .helper-item:last-child::after | 1724-1726 |
| .helper-item:hover, .helper-item:focus-within | 1729-1731 |
| @media (hover: hover) and (pointer: fine) | 1733-1739 |
| .app-cursor | 1741-1752 |
| .app-cursor.visible | 1754-1756 |
| .app-cursor-ring, .app-cursor-dot | 1759-1766 |
| .app-cursor-ring | 1768-1776 |
| .app-cursor-dot | 1778-1782 |
| .app-cursor.is-interactive .app-cursor-ring | 1784-1789 |
| .app-cursor.is-interactive .app-cursor-dot | 1791-1793 |
| .app-cursor.is-text .app-cursor-ring | 1795-1800 |
| .app-cursor.is-pressed .app-cursor-ring | 1802-1804 |
| .app-cursor.is-pressed .app-cursor-dot | 1806-1808 |
| .helper-label | 1810-1816 |
| .helper-item .helper-value | 1818-1826 |
| .helper-item .helper-mask | 1828-1836 |
| .helper-item .helper-real | 1838-1850 |
| .helper-item:hover .helper-mask, .helper-item:focus-within .helper-mask | 1853-1856 |
| .helper-item:hover .helper-real, .helper-item:focus-within .helper-real | 1859-1862 |
| .typing-zone[hidden] | 1864-1866 |
| .status | 1868-1879 |
| .status[hidden] | 1881-1883 |
| .helper-slot[hidden] | 1885-1887 |
| .status-actions | 1889-1895 |
| .hint-flag | 1897-1910 |
| .hint-flag[hidden] | 1912-1914 |
| .hint-button | 1916-1918 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) | 1920-1934 |
| .settings-toggle | 1936-1938 |
| .theme-toggle | 1940-1942 |
| .home-toggle | 1944-1946 |
| :is(.settings-toggle, .theme-toggle, .home-toggle):hover | 1948-1950 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) svg | 1952-1956 |
| .settings-toggle svg | 1958-1961 |
| .settings-panel | 1963-1982 |
| .settings-panel.open | 1984-1988 |
| .settings-panel h2 | 1990-1995 |
| .settings-body | 1997-2001 |
| .settings-grid | 2003-2006 |
| .settings-section-title | 2008-2016 |
| .panel-trigger, .advanced-trigger, .dropdown-trigger, .control select | 2021-2030 |
| .advanced-trigger | 2032-2036 |
| .dropdown-trigger | 2038-2046 |
| .dropdown-trigger svg | 2048-2052 |
| .panel-trigger | 2054-2059 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger):hover | 2061-2064 |
| .panel-trigger:hover | 2066-2068 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger)[aria-expanded="true"] | 2070-2073 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger, .control select):focus-v... | 2075-2078 |
| .control select | 2080-2084 |
| .options-panel | 2086-2102 |
| .options-panel.open | 2104-2108 |
| .options-panel h3 | 2110-2117 |
| .options-grid | 2119-2122 |
| .options-panel .control | 2124-2130 |
| .options-panel .control.compact | 2132-2134 |
| .options-panel .control>label | 2136-2138 |
| .options-section-title | 2140-2149 |
| .options-panel .options-section-title:first-child | 2151-2155 |
| .advanced-panel | 2157-2176 |
| .advanced-panel.open | 2178-2182 |
| .advanced-panel h3 | 2184-2189 |
| .advanced-grid | 2191-2200 |
| .advanced-grid::-webkit-scrollbar | 2202-2204 |
| .advanced-grid::-webkit-scrollbar-track | 2206-2209 |
| .advanced-grid::-webkit-scrollbar-thumb | 2211-2215 |
| .inline-value | 2217-2224 |
| .slider-stack | 2226-2229 |
| .slider-stack input[type="range"] | 2231-2235 |
| .slider-ghost | 2237-2251 |
| .slider-ghost.visible | 2253-2255 |
| .sf2-browser | 2257-2260 |
| .sf2-browser input[type="text"] | 2262-2271 |
| .sf2-preset-list | 2273-2286 |
| .sf2-browser .piano-desc | 2288-2291 |
| .sf2-browser .piano-desc.pending, .profile-browser .piano-desc.pending | 2294-2296 |
| .sf2-group | 2298-2303 |
| .sf2-group-title | 2305-2314 |
| .sf2-row | 2316-2324 |
| .sf2-row:first-child | 2326-2328 |
| .sf2-row:hover | 2330-2332 |
| .sf2-row.active | 2334-2337 |
| .sf2-row-name | 2339-2345 |
| .sf2-row-program, .sf2-row-bank | 2348-2352 |
| .sf2-empty | 2354-2358 |
| .profile-browser | 2360-2363 |
| .profile-browser input[type="text"] | 2365-2374 |
| .profile-list | 2376-2389 |
| .profile-row | 2391-2401 |
| .profile-row:hover | 2403-2405 |
| .profile-row.active | 2407-2410 |
| .profile-row.applied | 2412-2414 |
| .profile-row-name | 2416-2422 |
| .profile-row-kind | 2424-2429 |
| .advanced-footer | 2431-2437 |
| .piano-preview.wide | 2439-2451 |
| .piano-preview.wide::before | 2453-2455 |
| .piano-preview.wide .play-icon | 2457-2463 |
| .piano-preview.wide .play-label | 2465-2467 |
| .instrument-browser-panel | 2469-2484 |
| .instrument-browser-panel.open | 2486-2490 |
| .instrument-browser-panel h3 | 2492-2497 |
| .piano-panel | 2499-2514 |
| .piano-panel.open | 2516-2520 |
| .piano-panel h3 | 2522-2527 |
| .piano-options | 2529-2532 |
| .piano-option | 2534-2546 |
| .piano-option.active | 2548-2551 |
| .piano-option:focus-visible | 2553-2555 |
| .piano-info | 2557-2560 |
| .piano-name | 2562-2565 |
| .piano-desc | 2567-2570 |
| .piano-option.simple .piano-name | 2572-2576 |
| .piano-option.simple .piano-desc | 2578-2582 |
| .piano-preview | 2584-2599 |
| .piano-preview::before | 2601-2609 |
| .piano-preview:active | 2611-2614 |
| .piano-preview.main | 2616-2620 |
| .settings-grid input[type="range"], .game-settings-grid input[type="range"], .adva... | 2625-2629 |
| .settings-grid input[type="range"]::-webkit-slider-runnable-track, .game-settings-... | 2634-2639 |
| .settings-grid input[type="range"]::-webkit-slider-thumb, .game-settings-grid inpu... | 2644-2653 |
| .settings-grid input[type="range"]:focus-visible::-webkit-slider-thumb, .game-sett... | 2658-2661 |
| .settings-grid input[type="range"]::-moz-range-track, .game-settings-grid input[ty... | 2666-2671 |
| .settings-grid input[type="range"]::-moz-range-thumb, .game-settings-grid input[ty... | 2676-2683 |
| .settings-grid input[type="range"]:focus-visible::-moz-range-thumb, .game-settings... | 2688-2691 |
| .volume-value | 2693-2696 |
| .status-row | 2698-2703 |
| .switch | 2705-2714 |
| .switch input | 2716-2721 |
| .switch-track | 2723-2729 |
| .switch-thumb | 2731-2741 |
| .switch input:checked+.switch-track | 2743-2745 |
| .switch input:checked+.switch-track .switch-thumb | 2747-2749 |
| .switch input:focus-visible+.switch-track | 2751-2754 |
| .control.compact .unit | 2756-2758 |
| .test-tone | 2760-2772 |
| .test-tone:hover | 2774-2777 |
| .test-tone:active | 2779-2781 |
| .test-tone-icon | 2783-2790 |
| .test-tone-label | 2792-2796 |
| .result | 2798-2802 |
| .reveal | 2804-2812 |
| .reveal strong | 2814-2816 |
| .reveal-label | 2818-2825 |
| .reveal-grid.compact | 2827-2835 |
| .reveal-cell | 2837-2840 |
| .reveal-cell.reveal-target-chord | 2842-2844 |
| .reveal-cell.reveal-target-notes | 2846-2848 |
| .reveal-cell.reveal-your-chord | 2850-2852 |
| .reveal-cell.reveal-your-notes | 2854-2856 |
| .keyboard-zone | 2858-2868 |
| .keyboard-stack | 2870-2880 |
| .keyboard-wrapper | 2882-2891 |
| .keyboard | 2893-2900 |
| .keyboard-wrapper.ends-black | 2902-2904 |
| .white-keys | 2906-2909 |
| .black-keys | 2911-2918 |
| .key | 2920-2931 |
| .key.white | 2933-2940 |
| .key.white.has-black | 2942-2944 |
| .key.black | 2946-2955 |
| .key span | 2957-2961 |
| .key.black span | 2963-2967 |
| .key.active | 2969-2972 |
| .key.black.active | 2974-2977 |
| .key.selected | 2979-2983 |
| .key.typed-preview | 2985-2987 |
| .key.correct | 2989-2993 |
| .key.wrong | 2995-2999 |
| .key.missed | 3001-3007 |
| .key.black.selected, .key.black.correct, .key.black.wrong | 3011-3013 |
| .key.black.missed | 3015-3021 |
| .keyboard.disabled | 3023-3029 |
| body.tutorial-open .keyboard | 3031-3033 |
| body.tutorial-open .keyboard.disabled | 3035-3038 |
| .keyboard.disabled::before | 3040-3052 |
| body.tutorial-open .keyboard.disabled::before | 3054-3056 |
| .keyboard.disabled::after | 3058-3092 |
| body.tutorial-open .keyboard.disabled::after | 3094-3096 |
| .tips | 3098-3107 |
| #pedal-tip[hidden] | 3109-3111 |
| .pedal-box | 3113-3127 |
| body.landing .pedal-box | 3129-3131 |
| .pedal-label | 3133-3143 |
| .pedal-icon | 3145-3152 |
| .pedal-icon.active | 3154-3157 |
| .note-pills | 3159-3166 |
| .reveal-grid.compact .note-pills | 3168-3170 |
| .note-pill | 3172-3178 |
| .reveal-grid.compact .note-pill | 3180-3183 |
| .note-pill.chord-pill | 3185-3193 |
| .note-pill.chord-pill .chord-link | 3195-3197 |
| .note-pill.chord-pill .chord-link-bubble | 3199-3204 |
| .note-pill.chord-pill:hover .chord-link-bubble | 3206-3209 |
| .note-pill.good | 3211-3215 |
| .note-pill.bad | 3217-3221 |
| .note-pill.missed | 3223-3227 |
| .note-pill.neutral | 3229-3233 |
| @media (max-width: 700px) | 3235-3290 |
| @media (max-height: 820px) | 3292-3313 |
| @media (max-height: 700px) | 3315-3320 |

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
File lines: 1-2116

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
| isChordTypingCaptureActive | 1325-1330 |
| insertTypedCharacter | 1332-1339 |
| triggerPrimaryAction | 1342-1351 |
| getButtonLikeTarget | 1354-1354 |
| blurPointerActivatedControl | 1355-1362 |
| ensureCustomCursorEl | 1372-1389 |
| getCustomCursorMode | 1390-1399 |
| renderCustomCursor | 1407-1415 |
| scheduleCustomCursorRender | 1416-1419 |
| setCustomCursorEnabled | 1420-1433 |
| updateCustomCursorPosition | 1434-1441 |
| triggerReplayAction | 1443-1449 |
| bindPianoOptionEvents | 1609-1634 |
| applyCustomCursorMediaState | 1752-1754 |
| isElementVisible | 1769-1775 |
| getFocusableElements | 1777-1781 |
| focusFirstInModal | 1787-1793 |
| trapModalFocus | 1795-1817 |
| isTextEditableTarget | 1819-1824 |
| getActiveModalEl | 1826-1831 |
| closeGameSettingsModalUi | 1833-1842 |
| openGameSettingsModalUi | 1844-1850 |
| closeActiveModal | 1852-1866 |
| moveFocusInPanel | 1868-1879 |
| setRandomBackgroundAngle | 2069-2072 |
| init | 2074-2110 |
| runDeferredCatalogLoad | 2094-2103 |

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
| chordTutorialRootList | mouseover | 1241 |
| chordTutorialRootList | mouseleave | 1249 |
| chordTutorialRootList | focusin | 1252 |
| chordTutorialRootList | focusout | 1260 |
| chordTutorialRootList | click | 1263 |
| chordTutorialQualityList | mouseover | 1279 |
| chordTutorialQualityList | mouseleave | 1286 |
| chordTutorialQualityList | focusin | 1289 |
| chordTutorialQualityList | focusout | 1296 |
| chordTutorialQualityList | click | 1299 |
| volumeSlider | dblclick | 1451 |
| lengthSlider | dblclick | 1455 |
| keyCountSlider | dblclick | 1459 |
| startNoteDownButton | click | 1465 |
| startNoteUpButton | click | 1468 |
| startNoteDownOctButton | click | 1474 |
| startNoteUpOctButton | click | 1477 |
| noteCountInput | dblclick | 1482 |
| attackSlider | dblclick | 1490 |
| decaySlider | dblclick | 1494 |
| releaseSlider | dblclick | 1498 |
| sustainSlider | dblclick | 1502 |
| profileSearch | input | 1507 |
| profileList | click | 1513 |
| profileList | dblclick | 1518 |
| profileList | keydown | 1521 |
| profileApply | click | 1532 |
| profileSave | click | 1538 |
| instrumentPresetSearch | input | 1544 |
| instrumentPresetList | click | 1550 |
| instrumentPresetList | dblclick | 1555 |
| instrumentPresetList | keydown | 1558 |
| instrumentPresetApply | click | 1569 |
| advancedTrigger | click | 1574 |
| advancedPanel | click | 1579 |
| pianoTrigger | click | 1584 |
| pianoPanel | click | 1591 |
| instrumentBrowserTrigger | click | 1597 |
| instrumentBrowserPanel | click | 1604 |
| pianoOptionsContainer | click | 1612 |
| pianoOptionsContainer | keydown | 1626 |
| pianoPreviewMain | click | 1637 |
| testEnvelopeButton | click | 1644 |
| keyboardEl | pointerdown | 1649 |
| document | pointerup | 1685 |
| document | pointercancel | 1692 |
| document | pointerdown | 1699 |
| document | click | 1705 |
| document | pointermove | 1709 |
| document | pointerup | 1713 |
| document | pointercancel | 1718 |
| document | pointerover | 1723 |
| document | pointerout | 1729 |
| window | blur | 1738 |
| document | visibilitychange | 1744 |
| CUSTOM_CURSOR_QUERY | change | 1756 |
| keyboardEl | click | 1762 |
| document | keydown | 1881 |
| document | keyup | 2017 |
| pedalBox | pointerdown | 2036 |
| pedalBox | pointerup | 2045 |
| pedalBox | pointercancel | 2054 |
| pedalBox | pointerleave | 2062 |

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

