# Project Map

Generated: 2026-03-10 13:31:37 +01:00

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
| styles.css | CSS | Loaded directly | Yes | 3242 |
| js/audio.js | JavaScript | Browser runtime module | Yes | 1529 |
| js/core.js | JavaScript | Browser runtime module | Yes | 1064 |
| js/events.js | JavaScript | Browser runtime module | Yes | 2090 |
| js/game.js | JavaScript | Browser runtime module | Yes | 2107 |
| js/settings.js | JavaScript | Browser runtime module | Yes | 1474 |
| README.md | Markdown | Human + AI onboarding | Yes | 135 |
| IMPLEMENTATION_CHECKLIST.md | Markdown | Implementation roadmap checklist | Yes | 237 |
| AGENTS.md | Markdown | AI instruction override | Yes | 47 |
| PROJECT_MAP.md | Markdown | Generated reference map | Yes | 1202 |
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
File: styles.css (1-3242)

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
| .chord-link | 594-604 |
| .chord-link-bubble | 607-628 |
| .chord-link-bubble::after | 630-639 |
| .chord-link:hover .chord-link-bubble, .chord-link:focus-visible .chord-link-bubble... | 644-647 |
| .chord-link:focus-visible | 649-651 |
| .chord-label-suffix, .chord-divider | 654-657 |
| .chord-readout[hidden] | 659-661 |
| .chord-readout.is-ghost | 663-666 |
| .typing-zone | 668-679 |
| .game-stack | 681-686 |
| .typing-zone label | 688-695 |
| .typing-zone input[type="text"] | 697-709 |
| .typing-zone input[type="text"]::placeholder | 711-714 |
| .typing-row | 716-719 |
| .typing-input-wrap | 721-723 |
| .typing-help-toggle | 725-742 |
| .typing-help-toggle:hover | 744-747 |
| .typing-help-toggle:focus-visible | 749-752 |
| .typing-help-text | 754-760 |
| .typing-help-text strong | 762-764 |
| .typing-help-actions | 766-768 |
| .typing-learn-btn | 770-780 |
| .typing-learn-btn:hover | 782-784 |
| .typing-learn-btn:focus-visible | 786-789 |
| body.modal-open | 791-793 |
| .tutorial-modal | 795-802 |
| .tutorial-modal[hidden] | 804-806 |
| .tutorial-backdrop | 808-814 |
| .tutorial-card | 816-829 |
| .game-settings-modal | 831-838 |
| .game-settings-modal[hidden] | 840-842 |
| .game-settings-card | 844-856 |
| .game-settings-head | 858-863 |
| .game-settings-kicker | 865-870 |
| .game-settings-grid | 872-877 |
| .game-settings-group | 879-887 |
| .game-settings-group-title | 889-893 |
| .game-settings-group-body | 895-898 |
| .app-dialog | 900-907 |
| .app-dialog[hidden] | 909-911 |
| .app-dialog-card | 913-923 |
| .app-dialog-head | 925-930 |
| .app-dialog-body | 932-936 |
| .app-dialog-input-row | 938-941 |
| .app-dialog-input-row input | 943-950 |
| .app-dialog-actions | 952-956 |
| .tutorial-card.tutorial-overflow-scroll | 958-961 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-step | 963-969 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-lab | 971-978 |
| .tutorial-card.tutorial-fit-1 | 980-983 |
| .tutorial-card.tutorial-fit-1 .tutorial-step | 985-988 |
| .tutorial-card.tutorial-fit-1 .tutorial-lab | 990-993 |
| .tutorial-card.tutorial-fit-1 .tutorial-chip | 995-998 |
| .tutorial-card.tutorial-fit-1 .tutorial-quality-table th | 1000-1002 |
| .tutorial-card.tutorial-fit-1 .tutorial-piano | 1004-1009 |
| .tutorial-card.tutorial-fit-2 | 1011-1014 |
| .tutorial-card.tutorial-fit-2 .tutorial-head h4 | 1016-1018 |
| .tutorial-card.tutorial-fit-2 .tutorial-step | 1020-1023 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-title | 1025-1027 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-body | 1029-1032 |
| .tutorial-card.tutorial-fit-2 .tutorial-lab | 1034-1037 |
| .tutorial-card.tutorial-fit-2 .tutorial-current | 1039-1041 |
| .tutorial-card.tutorial-fit-2 .tutorial-selector-title | 1043-1045 |
| .tutorial-card.tutorial-fit-2 .tutorial-chip | 1047-1050 |
| .tutorial-card.tutorial-fit-2 .tutorial-quality-table th | 1052-1055 |
| .tutorial-card.tutorial-fit-2 .tutorial-piano | 1057-1062 |
| .tutorial-card.tutorial-fit-2 .tutorial-actions .advanced-trigger | 1064-1067 |
| .tutorial-card.tutorial-fit-3 | 1069-1072 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-kicker | 1074-1076 |
| .tutorial-card.tutorial-fit-3 .tutorial-step | 1078-1081 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-title | 1083-1085 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-body | 1087-1090 |
| .tutorial-card.tutorial-fit-3 .tutorial-lab | 1092-1095 |
| .tutorial-card.tutorial-fit-3 .tutorial-current | 1097-1099 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano-title | 1101-1104 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th | 1106-1109 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th, .tutorial-card.tutorial-... | 1112-1114 |
| .tutorial-card.tutorial-fit-3 .tutorial-chip | 1116-1119 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano | 1121-1126 |
| .tutorial-card.tutorial-fit-3 .tutorial-actions .advanced-trigger | 1128-1131 |
| .tutorial-card.tutorial-fit-3 .tutorial-progress | 1133-1135 |
| .tutorial-head | 1137-1142 |
| .tutorial-head h4 | 1144-1148 |
| .tutorial-close | 1150-1152 |
| .tutorial-step | 1154-1162 |
| .tutorial-step-kicker | 1164-1170 |
| .tutorial-step.focus-flash | 1172-1174 |
| @keyframes tutorial-focus-flash | 1176-1184 |
| .tutorial-step-title | 1186-1189 |
| .tutorial-step-body | 1191-1195 |
| .tutorial-step-body p | 1197-1199 |
| .tutorial-step-body p+p | 1201-1203 |
| .tutorial-example-list | 1205-1210 |
| .tutorial-example-list code | 1212-1218 |
| .tutorial-actions | 1220-1227 |
| .tutorial-progress-wrap | 1229-1237 |
| .tutorial-progress | 1239-1245 |
| .tutorial-progress-row | 1247-1253 |
| .tutorial-progress-tabs | 1255-1271 |
| .tutorial-progress-tabs::-webkit-scrollbar | 1273-1275 |
| .tutorial-progress-tab | 1277-1296 |
| .tutorial-progress-step | 1298-1309 |
| .tutorial-progress-label | 1311-1313 |
| .tutorial-progress-tabs::before | 1315-1325 |
| .tutorial-progress-tab.complete | 1327-1330 |
| .tutorial-progress-tab.complete .tutorial-progress-step | 1332-1336 |
| .tutorial-progress-tab.active | 1338-1343 |
| .tutorial-progress-tab.active .tutorial-progress-step | 1345-1349 |
| .tutorial-progress-tab:focus-visible | 1351-1354 |
| .tutorial-progress-tab:hover, .tutorial-progress-tab:focus-visible | 1357-1359 |
| .tutorial-progress-row > button | 1361-1363 |
| .tutorial-lab | 1365-1374 |
| .tutorial-current | 1376-1380 |
| .tutorial-selector-block | 1382-1385 |
| .tutorial-control-matrix | 1387-1394 |
| .tutorial-control-row | 1396-1404 |
| .tutorial-control-row.locked | 1406-1408 |
| .tutorial-control-row.locked::after | 1410-1417 |
| .tutorial-control-row.newly-unlocked | 1419-1421 |
| @keyframes tutorial-unlock | 1423-1431 |
| .tutorial-selector-title | 1433-1439 |
| .tutorial-chip-list | 1441-1445 |
| #chord-tutorial-quality-list | 1447-1450 |
| .tutorial-quality-table | 1452-1457 |
| .tutorial-quality-table th, .tutorial-quality-table td | 1460-1464 |
| .tutorial-quality-table tr:first-child th, .tutorial-quality-table tr:first-child td | 1467-1469 |
| .tutorial-quality-table th | 1471-1480 |
| .tutorial-chip-group-list | 1482-1486 |
| .tutorial-chip | 1488-1500 |
| .tutorial-chip.unlocked | 1502-1505 |
| .tutorial-chip.unlocked:hover, .tutorial-chip.unlocked:focus-visible | 1508-1511 |
| .tutorial-chip[disabled] | 1513-1517 |
| .tutorial-chip.locked | 1519-1526 |
| .tutorial-chip:hover, .tutorial-chip:focus-visible | 1529-1532 |
| .tutorial-chip.active | 1534-1537 |
| .tutorial-chip.muted | 1539-1542 |
| .tutorial-chip.muted:hover, .tutorial-chip.muted:focus-visible | 1545-1547 |
| .tutorial-chip.newly-unlocked | 1549-1552 |
| .tutorial-chip.locked.newly-unlocked | 1554-1557 |
| .tutorial-piano-wrap | 1559-1564 |
| .tutorial-piano-title | 1566-1573 |
| .tutorial-piano | 1575-1586 |
| .tutorial-key | 1588-1593 |
| .tutorial-key.white | 1595-1603 |
| .tutorial-key.black | 1605-1613 |
| .tutorial-key.tone | 1615-1617 |
| .tutorial-key.tone.root | 1619-1621 |
| .tutorial-key[data-role]::after | 1623-1636 |
| .helper-card | 1638-1645 |
| .helper-title | 1647-1652 |
| .helper-list | 1654-1658 |
| .helper-item | 1660-1671 |
| .helper-item::after | 1673-1681 |
| .helper-item:last-child::after | 1683-1685 |
| .helper-item:hover, .helper-item:focus-within | 1688-1690 |
| @media (hover: hover) and (pointer: fine) | 1692-1698 |
| .app-cursor | 1700-1711 |
| .app-cursor.visible | 1713-1715 |
| .app-cursor-ring, .app-cursor-dot | 1718-1725 |
| .app-cursor-ring | 1727-1735 |
| .app-cursor-dot | 1737-1741 |
| .app-cursor.is-interactive .app-cursor-ring | 1743-1748 |
| .app-cursor.is-interactive .app-cursor-dot | 1750-1752 |
| .app-cursor.is-text .app-cursor-ring | 1754-1759 |
| .app-cursor.is-pressed .app-cursor-ring | 1761-1763 |
| .app-cursor.is-pressed .app-cursor-dot | 1765-1767 |
| .helper-label | 1769-1775 |
| .helper-item .helper-value | 1777-1785 |
| .helper-item .helper-mask | 1787-1795 |
| .helper-item .helper-real | 1797-1809 |
| .helper-item:hover .helper-mask, .helper-item:focus-within .helper-mask | 1812-1815 |
| .helper-item:hover .helper-real, .helper-item:focus-within .helper-real | 1818-1821 |
| .typing-zone[hidden] | 1823-1825 |
| .status | 1827-1838 |
| .status[hidden] | 1840-1842 |
| .helper-slot[hidden] | 1844-1846 |
| .status-actions | 1848-1854 |
| .hint-flag | 1856-1869 |
| .hint-flag[hidden] | 1871-1873 |
| .hint-button | 1875-1877 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) | 1879-1893 |
| .settings-toggle | 1895-1897 |
| .theme-toggle | 1899-1901 |
| .home-toggle | 1903-1905 |
| :is(.settings-toggle, .theme-toggle, .home-toggle):hover | 1907-1909 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) svg | 1911-1915 |
| .settings-toggle svg | 1917-1920 |
| .settings-panel | 1922-1941 |
| .settings-panel.open | 1943-1947 |
| .settings-panel h2 | 1949-1954 |
| .settings-body | 1956-1960 |
| .settings-grid | 1962-1965 |
| .settings-section-title | 1967-1975 |
| .panel-trigger, .advanced-trigger, .dropdown-trigger, .control select | 1980-1989 |
| .advanced-trigger | 1991-1995 |
| .dropdown-trigger | 1997-2005 |
| .dropdown-trigger svg | 2007-2011 |
| .panel-trigger | 2013-2018 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger):hover | 2020-2023 |
| .panel-trigger:hover | 2025-2027 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger)[aria-expanded="true"] | 2029-2032 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger, .control select):focus-v... | 2034-2037 |
| .control select | 2039-2043 |
| .options-panel | 2045-2061 |
| .options-panel.open | 2063-2067 |
| .options-panel h3 | 2069-2076 |
| .options-grid | 2078-2081 |
| .options-panel .control | 2083-2089 |
| .options-panel .control.compact | 2091-2093 |
| .options-panel .control>label | 2095-2097 |
| .options-section-title | 2099-2108 |
| .options-panel .options-section-title:first-child | 2110-2114 |
| .advanced-panel | 2116-2135 |
| .advanced-panel.open | 2137-2141 |
| .advanced-panel h3 | 2143-2148 |
| .advanced-grid | 2150-2159 |
| .advanced-grid::-webkit-scrollbar | 2161-2163 |
| .advanced-grid::-webkit-scrollbar-track | 2165-2168 |
| .advanced-grid::-webkit-scrollbar-thumb | 2170-2174 |
| .inline-value | 2176-2183 |
| .slider-stack | 2185-2188 |
| .slider-stack input[type="range"] | 2190-2194 |
| .slider-ghost | 2196-2210 |
| .slider-ghost.visible | 2212-2214 |
| .sf2-browser | 2216-2219 |
| .sf2-browser input[type="text"] | 2221-2230 |
| .sf2-preset-list | 2232-2245 |
| .sf2-browser .piano-desc | 2247-2250 |
| .sf2-browser .piano-desc.pending, .profile-browser .piano-desc.pending | 2253-2255 |
| .sf2-group | 2257-2262 |
| .sf2-group-title | 2264-2273 |
| .sf2-row | 2275-2283 |
| .sf2-row:first-child | 2285-2287 |
| .sf2-row:hover | 2289-2291 |
| .sf2-row.active | 2293-2296 |
| .sf2-row-name | 2298-2304 |
| .sf2-row-program, .sf2-row-bank | 2307-2311 |
| .sf2-empty | 2313-2317 |
| .profile-browser | 2319-2322 |
| .profile-browser input[type="text"] | 2324-2333 |
| .profile-list | 2335-2348 |
| .profile-row | 2350-2360 |
| .profile-row:hover | 2362-2364 |
| .profile-row.active | 2366-2369 |
| .profile-row.applied | 2371-2373 |
| .profile-row-name | 2375-2381 |
| .profile-row-kind | 2383-2388 |
| .advanced-footer | 2390-2396 |
| .piano-preview.wide | 2398-2410 |
| .piano-preview.wide::before | 2412-2414 |
| .piano-preview.wide .play-icon | 2416-2422 |
| .piano-preview.wide .play-label | 2424-2426 |
| .instrument-browser-panel | 2428-2443 |
| .instrument-browser-panel.open | 2445-2449 |
| .instrument-browser-panel h3 | 2451-2456 |
| .piano-panel | 2458-2473 |
| .piano-panel.open | 2475-2479 |
| .piano-panel h3 | 2481-2486 |
| .piano-options | 2488-2491 |
| .piano-option | 2493-2505 |
| .piano-option.active | 2507-2510 |
| .piano-option:focus-visible | 2512-2514 |
| .piano-info | 2516-2519 |
| .piano-name | 2521-2524 |
| .piano-desc | 2526-2529 |
| .piano-option.simple .piano-name | 2531-2535 |
| .piano-option.simple .piano-desc | 2537-2541 |
| .piano-preview | 2543-2558 |
| .piano-preview::before | 2560-2568 |
| .piano-preview:active | 2570-2573 |
| .piano-preview.main | 2575-2579 |
| .settings-grid input[type="range"], .game-settings-grid input[type="range"], .adva... | 2584-2588 |
| .settings-grid input[type="range"]::-webkit-slider-runnable-track, .game-settings-... | 2593-2598 |
| .settings-grid input[type="range"]::-webkit-slider-thumb, .game-settings-grid inpu... | 2603-2612 |
| .settings-grid input[type="range"]:focus-visible::-webkit-slider-thumb, .game-sett... | 2617-2620 |
| .settings-grid input[type="range"]::-moz-range-track, .game-settings-grid input[ty... | 2625-2630 |
| .settings-grid input[type="range"]::-moz-range-thumb, .game-settings-grid input[ty... | 2635-2642 |
| .settings-grid input[type="range"]:focus-visible::-moz-range-thumb, .game-settings... | 2647-2650 |
| .volume-value | 2652-2655 |
| .status-row | 2657-2662 |
| .switch | 2664-2673 |
| .switch input | 2675-2680 |
| .switch-track | 2682-2688 |
| .switch-thumb | 2690-2700 |
| .switch input:checked+.switch-track | 2702-2704 |
| .switch input:checked+.switch-track .switch-thumb | 2706-2708 |
| .switch input:focus-visible+.switch-track | 2710-2713 |
| .control.compact .unit | 2715-2717 |
| .test-tone | 2719-2731 |
| .test-tone:hover | 2733-2736 |
| .test-tone:active | 2738-2740 |
| .test-tone-icon | 2742-2749 |
| .test-tone-label | 2751-2755 |
| .result | 2757-2761 |
| .reveal | 2763-2771 |
| .reveal strong | 2773-2775 |
| .reveal-label | 2777-2784 |
| .reveal-grid.compact | 2786-2791 |
| .reveal-cell | 2793-2796 |
| .keyboard-zone | 2798-2808 |
| .keyboard-stack | 2810-2820 |
| .keyboard-wrapper | 2822-2831 |
| .keyboard | 2833-2840 |
| .keyboard-wrapper.ends-black | 2842-2844 |
| .white-keys | 2846-2849 |
| .black-keys | 2851-2858 |
| .key | 2860-2871 |
| .key.white | 2873-2880 |
| .key.white.has-black | 2882-2884 |
| .key.black | 2886-2895 |
| .key span | 2897-2901 |
| .key.black span | 2903-2907 |
| .key.active | 2909-2912 |
| .key.black.active | 2914-2917 |
| .key.selected | 2919-2923 |
| .key.typed-preview | 2925-2927 |
| .key.correct | 2929-2933 |
| .key.wrong | 2935-2939 |
| .key.missed | 2941-2947 |
| .key.black.selected, .key.black.correct, .key.black.wrong | 2951-2953 |
| .key.black.missed | 2955-2961 |
| .keyboard.disabled | 2963-2969 |
| body.tutorial-open .keyboard | 2971-2973 |
| body.tutorial-open .keyboard.disabled | 2975-2978 |
| .keyboard.disabled::before | 2980-2992 |
| body.tutorial-open .keyboard.disabled::before | 2994-2996 |
| .keyboard.disabled::after | 2998-3032 |
| body.tutorial-open .keyboard.disabled::after | 3034-3036 |
| .tips | 3038-3047 |
| #pedal-tip[hidden] | 3049-3051 |
| .pedal-box | 3053-3067 |
| body.landing .pedal-box | 3069-3071 |
| .pedal-label | 3073-3083 |
| .pedal-icon | 3085-3092 |
| .pedal-icon.active | 3094-3097 |
| .note-pills | 3099-3106 |
| .note-pill | 3108-3114 |
| .note-pill.chord-pill | 3116-3124 |
| .note-pill.chord-pill .chord-link-bubble | 3126-3131 |
| .note-pill.good | 3133-3137 |
| .note-pill.bad | 3139-3143 |
| .note-pill.missed | 3145-3149 |
| .note-pill.neutral | 3151-3155 |
| @media (max-width: 700px) | 3157-3212 |
| @media (max-height: 820px) | 3214-3235 |
| @media (max-height: 700px) | 3237-3242 |

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
File lines: 1-2090

| Symbol | Lines |
|---|---|
| primeAudioFromGesture | 5-14 |
| shouldRestartRoundForSetting | 27-30 |
| patchSettingsState | 32-38 |
| adjustKeyCount | 410-413 |
| bindKeyCountStepper | 415-420 |
| isChordTutorialOpen | 621-621 |
| fitTutorialLayout | 624-652 |
| clearFitClasses | 630-633 |
| applyFitClass | 635-640 |
| getTutorialStep | 654-659 |
| getStepUnlockedRootSet | 661-669 |
| getStepUnlockedQualitySet | 671-677 |
| isTutorialRootEnabled | 679-679 |
| isTutorialQualityEnabled | 680-680 |
| getTutorialRootLabel | 682-685 |
| midiToTutorialLabel | 687-691 |
| getClosestNoteIdFromMidi | 693-700 |
| getTutorialRenderedChord | 702-724 |
| ensureTutorialKeyboard | 726-764 |
| getStepAllowedQualityIds | 766-768 |
| getTutorialActiveSpec | 770-772 |
| renderTutorialCurrentText | 774-785 |
| renderTutorialPianoHighlight | 787-821 |
| renderTutorialRootOptions | 823-841 |
| renderTutorialQualityOptions | 843-888 |
| syncTutorialRootChipStates | 890-909 |
| syncTutorialQualityChipStates | 911-930 |
| setTutorialHoverSpec | 932-939 |
| clearTutorialHoverSpec | 941-944 |
| refreshTutorialVisuals | 946-950 |
| getTutorialStepIndexForQuality | 980-986 |
| renderChordTutorialTabs | 988-1005 |
| fitTutorialProgressTabs | 1007-1021 |
| renderChordTutorialStep | 1023-1079 |
| closeChordTutorial | 1081-1094 |
| openChordTutorial | 1096-1131 |
| registerTutorialOpenTrigger | 1133-1140 |
| openChordTutorialForChordLink | 1142-1152 |
| handleChordLinkActivation | 1154-1161 |
| isChordTypingCaptureActive | 1299-1304 |
| insertTypedCharacter | 1306-1313 |
| triggerPrimaryAction | 1316-1325 |
| getButtonLikeTarget | 1328-1328 |
| blurPointerActivatedControl | 1329-1336 |
| ensureCustomCursorEl | 1346-1363 |
| getCustomCursorMode | 1364-1373 |
| renderCustomCursor | 1381-1389 |
| scheduleCustomCursorRender | 1390-1393 |
| setCustomCursorEnabled | 1394-1407 |
| updateCustomCursorPosition | 1408-1415 |
| triggerReplayAction | 1417-1423 |
| bindPianoOptionEvents | 1583-1608 |
| applyCustomCursorMediaState | 1726-1728 |
| isElementVisible | 1743-1749 |
| getFocusableElements | 1751-1755 |
| focusFirstInModal | 1761-1767 |
| trapModalFocus | 1769-1791 |
| isTextEditableTarget | 1793-1798 |
| getActiveModalEl | 1800-1805 |
| closeGameSettingsModalUi | 1807-1816 |
| openGameSettingsModalUi | 1818-1824 |
| closeActiveModal | 1826-1840 |
| moveFocusInPanel | 1842-1853 |
| setRandomBackgroundAngle | 2043-2046 |
| init | 2048-2084 |
| runDeferredCatalogLoad | 2068-2077 |

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
| triggerEl | click | 1135 |
| document | click | 1163 |
| document | keydown | 1164 |
| chordTutorialTabs | click | 1170 |
| chordTutorialClose | click | 1182 |
| chordTutorialBackdrop | click | 1189 |
| chordTutorialPrev | click | 1195 |
| chordTutorialNext | click | 1203 |
| chordTutorialRootList | mouseover | 1215 |
| chordTutorialRootList | mouseleave | 1223 |
| chordTutorialRootList | focusin | 1226 |
| chordTutorialRootList | focusout | 1234 |
| chordTutorialRootList | click | 1237 |
| chordTutorialQualityList | mouseover | 1253 |
| chordTutorialQualityList | mouseleave | 1260 |
| chordTutorialQualityList | focusin | 1263 |
| chordTutorialQualityList | focusout | 1270 |
| chordTutorialQualityList | click | 1273 |
| volumeSlider | dblclick | 1425 |
| lengthSlider | dblclick | 1429 |
| keyCountSlider | dblclick | 1433 |
| startNoteDownButton | click | 1439 |
| startNoteUpButton | click | 1442 |
| startNoteDownOctButton | click | 1448 |
| startNoteUpOctButton | click | 1451 |
| noteCountInput | dblclick | 1456 |
| attackSlider | dblclick | 1464 |
| decaySlider | dblclick | 1468 |
| releaseSlider | dblclick | 1472 |
| sustainSlider | dblclick | 1476 |
| profileSearch | input | 1481 |
| profileList | click | 1487 |
| profileList | dblclick | 1492 |
| profileList | keydown | 1495 |
| profileApply | click | 1506 |
| profileSave | click | 1512 |
| instrumentPresetSearch | input | 1518 |
| instrumentPresetList | click | 1524 |
| instrumentPresetList | dblclick | 1529 |
| instrumentPresetList | keydown | 1532 |
| instrumentPresetApply | click | 1543 |
| advancedTrigger | click | 1548 |
| advancedPanel | click | 1553 |
| pianoTrigger | click | 1558 |
| pianoPanel | click | 1565 |
| instrumentBrowserTrigger | click | 1571 |
| instrumentBrowserPanel | click | 1578 |
| pianoOptionsContainer | click | 1586 |
| pianoOptionsContainer | keydown | 1600 |
| pianoPreviewMain | click | 1611 |
| testEnvelopeButton | click | 1618 |
| keyboardEl | pointerdown | 1623 |
| document | pointerup | 1659 |
| document | pointercancel | 1666 |
| document | pointerdown | 1673 |
| document | click | 1679 |
| document | pointermove | 1683 |
| document | pointerup | 1687 |
| document | pointercancel | 1692 |
| document | pointerover | 1697 |
| document | pointerout | 1703 |
| window | blur | 1712 |
| document | visibilitychange | 1718 |
| CUSTOM_CURSOR_QUERY | change | 1730 |
| keyboardEl | click | 1736 |
| document | keydown | 1855 |
| document | keyup | 1991 |
| pedalBox | pointerdown | 2010 |
| pedalBox | pointerup | 2019 |
| pedalBox | pointercancel | 2028 |
| pedalBox | pointerleave | 2036 |

### js/game.js (Active Runtime)
File lines: 1-2107

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
| renderRevealCell | 1631-1634 |
| renderChordRevealGrid | 1636-1639 |
| renderChordDetectionMeta | 1641-1645 |
| renderPressedPills | 1647-1652 |
| buildNoteComparison | 1654-1661 |
| buildAnswerNoteCell | 1663-1671 |
| buildTargetNoteCell | 1673-1685 |
| getSubmittedReplaySnapshot | 1709-1723 |
| playSubmittedReplaySequence | 1725-1738 |
| playRevealSequence | 1740-1790 |
| playSelectedChord | 1792-1816 |
| playTypedInputChord | 1818-1831 |
| startHeldPlayback | 1833-1859 |
| releaseHeldPlayback | 1861-1875 |
| buildTypingRevealDetail | 1877-1897 |
| submitTypedAnswer | 1899-1973 |
| submitAnswer | 1975-2038 |
| sanitizeRoundStateForKeyboardRange | 2040-2080 |

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

