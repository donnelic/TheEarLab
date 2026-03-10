# Project Map

Generated: 2026-03-10 12:33:53 +01:00

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
| index.html | HTML | Loaded directly | Yes | 577 |
| styles.css | CSS | Loaded directly | Yes | 3182 |
| js/audio.js | JavaScript | Browser runtime module | Yes | 1529 |
| js/core.js | JavaScript | Browser runtime module | Yes | 1064 |
| js/events.js | JavaScript | Browser runtime module | Yes | 2071 |
| js/game.js | JavaScript | Browser runtime module | Yes | 2123 |
| js/settings.js | JavaScript | Browser runtime module | Yes | 1474 |
| README.md | Markdown | Human + AI onboarding | Yes | 135 |
| IMPLEMENTATION_CHECKLIST.md | Markdown | Implementation roadmap checklist | Yes | 237 |
| AGENTS.md | Markdown | AI instruction override | Yes | 47 |
| PROJECT_MAP.md | Markdown | Generated reference map | Yes | 1192 |
| tools/generate-project-map.ps1 | PowerShell | Documentation generator | Yes | 540 |
| tools/smoke-checklist.md | Markdown | Manual regression checklist | Yes | 59 |
| soundfonts/GeneralUser-GS.sf2 | Asset | Soundfont asset | Yes | 0 |
| soundfonts/index.json | JSON | Soundfont asset | Yes | 3 |
| soundfonts/README.md | Markdown | Soundfont asset | Yes | 39 |

## index.html Map
File: index.html (1-577)

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
| chord-tutorial-prev | <button> | 527 |
| chord-tutorial-tabs | <div> | 529 |
| chord-tutorial-progress | <span> | 531 |
| chord-tutorial-next | <button> | 533 |
| app-dialog | <section> | 538 |
| app-dialog-backdrop | <button> | 539 |
| app-dialog-title | <h4> | 542 |
| app-dialog-close | <button> | 543 |
| app-dialog-body | <div> | 545 |
| app-dialog-input | <input> | 548 |
| app-dialog-cancel | <button> | 551 |
| app-dialog-confirm | <button> | 552 |

### Script Load Order
| Order | Script | Line |
|---:|---|---:|
| 1 | vendor/libfluidsynth-2.4.6.js?v=20260310104635 | 557 |
| 2 | vendor/js-synthesizer.min.js?v=20260310104635 | 558 |
| 3 | js/core.js?v=20260310104635 | 559 |
| 4 | js/store/reducers.js?v=20260310104635 | 560 |
| 5 | js/store/actions.js?v=20260310104635 | 561 |
| 6 | js/store/selectors.js?v=20260310104635 | 562 |
| 7 | js/store/store.js?v=20260310104635 | 563 |
| 8 | js/features/round/state-mutations.js?v=20260310104635 | 564 |
| 9 | js/features/settings/state-mutations.js?v=20260310104635 | 565 |
| 10 | js/features/chords/index.js?v=20260310104635 | 566 |
| 11 | js/features/typing/index.js?v=20260310104635 | 567 |
| 12 | js/features/tutorial/index.js?v=20260310104635 | 568 |
| 13 | js/features/audio-preview/index.js?v=20260310104635 | 569 |
| 14 | js/features/input/index.js?v=20260310104635 | 570 |
| 15 | js/audio.js?v=20260310104635 | 571 |
| 16 | js/game.js?v=20260310104635 | 572 |
| 17 | js/settings.js?v=20260310104635 | 573 |
| 18 | js/events.js?v=20260310104635 | 574 |

## styles.css Map
File: styles.css (1-3182)

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
| .chord-link | 594-602 |
| .chord-alias-asterisk | 604-608 |
| .chord-link-bubble | 610-630 |
| .chord-link-bubble::after | 632-641 |
| .chord-link:hover .chord-link-bubble, .chord-link:focus-visible .chord-link-bubble... | 645-648 |
| .chord-link:focus-visible | 650-652 |
| .chord-label-suffix, .chord-divider | 655-658 |
| .chord-readout[hidden] | 660-662 |
| .chord-readout.is-ghost | 664-667 |
| .typing-zone | 669-680 |
| .game-stack | 682-687 |
| .typing-zone label | 689-696 |
| .typing-zone input[type="text"] | 698-710 |
| .typing-zone input[type="text"]::placeholder | 712-715 |
| .typing-row | 717-720 |
| .typing-input-wrap | 722-724 |
| .typing-help-toggle | 726-743 |
| .typing-help-toggle:hover | 745-748 |
| .typing-help-toggle:focus-visible | 750-753 |
| .typing-help-text | 755-761 |
| .typing-help-text strong | 763-765 |
| .typing-help-actions | 767-769 |
| .typing-learn-btn | 771-781 |
| .typing-learn-btn:hover | 783-785 |
| .typing-learn-btn:focus-visible | 787-790 |
| body.modal-open | 792-794 |
| .tutorial-modal | 796-803 |
| .tutorial-modal[hidden] | 805-807 |
| .tutorial-backdrop | 809-815 |
| .tutorial-card | 817-830 |
| .game-settings-modal | 832-839 |
| .game-settings-modal[hidden] | 841-843 |
| .game-settings-card | 845-857 |
| .game-settings-head | 859-864 |
| .game-settings-kicker | 866-871 |
| .game-settings-grid | 873-878 |
| .game-settings-group | 880-888 |
| .game-settings-group-title | 890-894 |
| .game-settings-group-body | 896-899 |
| .app-dialog | 901-908 |
| .app-dialog[hidden] | 910-912 |
| .app-dialog-card | 914-924 |
| .app-dialog-head | 926-931 |
| .app-dialog-body | 933-937 |
| .app-dialog-input-row | 939-942 |
| .app-dialog-input-row input | 944-951 |
| .app-dialog-actions | 953-957 |
| .tutorial-card.tutorial-overflow-scroll | 959-962 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-step | 964-970 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-lab | 972-979 |
| .tutorial-card.tutorial-fit-1 | 981-984 |
| .tutorial-card.tutorial-fit-1 .tutorial-step | 986-989 |
| .tutorial-card.tutorial-fit-1 .tutorial-lab | 991-994 |
| .tutorial-card.tutorial-fit-1 .tutorial-chip | 996-999 |
| .tutorial-card.tutorial-fit-1 .tutorial-quality-table th | 1001-1003 |
| .tutorial-card.tutorial-fit-1 .tutorial-piano | 1005-1010 |
| .tutorial-card.tutorial-fit-2 | 1012-1015 |
| .tutorial-card.tutorial-fit-2 .tutorial-head h4 | 1017-1019 |
| .tutorial-card.tutorial-fit-2 .tutorial-step | 1021-1024 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-title | 1026-1028 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-body | 1030-1033 |
| .tutorial-card.tutorial-fit-2 .tutorial-lab | 1035-1038 |
| .tutorial-card.tutorial-fit-2 .tutorial-current | 1040-1042 |
| .tutorial-card.tutorial-fit-2 .tutorial-selector-title | 1044-1046 |
| .tutorial-card.tutorial-fit-2 .tutorial-chip | 1048-1051 |
| .tutorial-card.tutorial-fit-2 .tutorial-quality-table th | 1053-1056 |
| .tutorial-card.tutorial-fit-2 .tutorial-piano | 1058-1063 |
| .tutorial-card.tutorial-fit-2 .tutorial-actions .advanced-trigger | 1065-1068 |
| .tutorial-card.tutorial-fit-3 | 1070-1073 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-kicker | 1075-1077 |
| .tutorial-card.tutorial-fit-3 .tutorial-step | 1079-1082 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-title | 1084-1086 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-body | 1088-1091 |
| .tutorial-card.tutorial-fit-3 .tutorial-lab | 1093-1096 |
| .tutorial-card.tutorial-fit-3 .tutorial-current | 1098-1100 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano-title | 1102-1105 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th | 1107-1110 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th, .tutorial-card.tutorial-... | 1113-1115 |
| .tutorial-card.tutorial-fit-3 .tutorial-chip | 1117-1120 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano | 1122-1127 |
| .tutorial-card.tutorial-fit-3 .tutorial-actions .advanced-trigger | 1129-1132 |
| .tutorial-card.tutorial-fit-3 .tutorial-progress | 1134-1136 |
| .tutorial-head | 1138-1143 |
| .tutorial-head h4 | 1145-1149 |
| .tutorial-close | 1151-1153 |
| .tutorial-step | 1155-1163 |
| .tutorial-step-kicker | 1165-1171 |
| .tutorial-step.focus-flash | 1173-1175 |
| @keyframes tutorial-focus-flash | 1177-1185 |
| .tutorial-step-title | 1187-1190 |
| .tutorial-step-body | 1192-1196 |
| .tutorial-step-body p | 1198-1200 |
| .tutorial-step-body p+p | 1202-1204 |
| .tutorial-example-list | 1206-1211 |
| .tutorial-example-list code | 1213-1219 |
| .tutorial-actions | 1221-1228 |
| .tutorial-progress-wrap | 1230-1237 |
| .tutorial-progress | 1239-1243 |
| .tutorial-progress-tabs | 1245-1258 |
| .tutorial-progress-tabs::-webkit-scrollbar | 1260-1262 |
| .tutorial-progress-tab | 1264-1279 |
| .tutorial-progress-tabs::before | 1281-1290 |
| .tutorial-progress-tab.complete | 1292-1295 |
| .tutorial-progress-tab.active | 1297-1301 |
| .tutorial-progress-tab:focus-visible | 1303-1306 |
| .tutorial-lab | 1308-1317 |
| .tutorial-current | 1319-1323 |
| .tutorial-selector-block | 1325-1328 |
| .tutorial-control-matrix | 1330-1337 |
| .tutorial-control-row | 1339-1347 |
| .tutorial-control-row.locked | 1349-1351 |
| .tutorial-control-row.locked::after | 1353-1360 |
| .tutorial-control-row.newly-unlocked | 1362-1364 |
| @keyframes tutorial-unlock | 1366-1374 |
| .tutorial-selector-title | 1376-1382 |
| .tutorial-chip-list | 1384-1388 |
| #chord-tutorial-quality-list | 1390-1393 |
| .tutorial-quality-table | 1395-1400 |
| .tutorial-quality-table th, .tutorial-quality-table td | 1403-1407 |
| .tutorial-quality-table tr:first-child th, .tutorial-quality-table tr:first-child td | 1410-1412 |
| .tutorial-quality-table th | 1414-1423 |
| .tutorial-chip-group-list | 1425-1429 |
| .tutorial-chip | 1431-1443 |
| .tutorial-chip.unlocked | 1445-1448 |
| .tutorial-chip.unlocked:hover, .tutorial-chip.unlocked:focus-visible | 1451-1454 |
| .tutorial-chip[disabled] | 1456-1460 |
| .tutorial-chip.locked | 1462-1469 |
| .tutorial-chip:hover, .tutorial-chip:focus-visible | 1472-1475 |
| .tutorial-chip.active | 1477-1480 |
| .tutorial-chip.muted | 1482-1485 |
| .tutorial-chip.muted:hover, .tutorial-chip.muted:focus-visible | 1488-1490 |
| .tutorial-chip.newly-unlocked | 1492-1495 |
| .tutorial-chip.locked.newly-unlocked | 1497-1500 |
| .tutorial-piano-wrap | 1502-1507 |
| .tutorial-piano-title | 1509-1516 |
| .tutorial-piano | 1518-1529 |
| .tutorial-key | 1531-1536 |
| .tutorial-key.white | 1538-1546 |
| .tutorial-key.black | 1548-1556 |
| .tutorial-key.tone | 1558-1560 |
| .tutorial-key.tone.root | 1562-1564 |
| .tutorial-key[data-role]::after | 1566-1579 |
| .helper-card | 1581-1588 |
| .helper-title | 1590-1595 |
| .helper-list | 1597-1601 |
| .helper-item | 1603-1614 |
| .helper-item::after | 1616-1624 |
| .helper-item:last-child::after | 1626-1628 |
| .helper-item:hover, .helper-item:focus-within | 1631-1633 |
| @media (hover: hover) and (pointer: fine) | 1635-1641 |
| .app-cursor | 1643-1654 |
| .app-cursor.visible | 1656-1658 |
| .app-cursor-ring, .app-cursor-dot | 1661-1668 |
| .app-cursor-ring | 1670-1678 |
| .app-cursor-dot | 1680-1684 |
| .app-cursor.is-interactive .app-cursor-ring | 1686-1691 |
| .app-cursor.is-interactive .app-cursor-dot | 1693-1695 |
| .app-cursor.is-text .app-cursor-ring | 1697-1702 |
| .app-cursor.is-pressed .app-cursor-ring | 1704-1706 |
| .app-cursor.is-pressed .app-cursor-dot | 1708-1710 |
| .helper-label | 1712-1718 |
| .helper-item .helper-value | 1720-1728 |
| .helper-item .helper-mask | 1730-1738 |
| .helper-item .helper-real | 1740-1752 |
| .helper-item:hover .helper-mask, .helper-item:focus-within .helper-mask | 1755-1758 |
| .helper-item:hover .helper-real, .helper-item:focus-within .helper-real | 1761-1764 |
| .typing-zone[hidden] | 1766-1768 |
| .status | 1770-1781 |
| .status[hidden] | 1783-1785 |
| .helper-slot[hidden] | 1787-1789 |
| .status-actions | 1791-1797 |
| .hint-flag | 1799-1812 |
| .hint-flag[hidden] | 1814-1816 |
| .hint-button | 1818-1820 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) | 1822-1836 |
| .settings-toggle | 1838-1840 |
| .theme-toggle | 1842-1844 |
| .home-toggle | 1846-1848 |
| :is(.settings-toggle, .theme-toggle, .home-toggle):hover | 1850-1852 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) svg | 1854-1858 |
| .settings-toggle svg | 1860-1863 |
| .settings-panel | 1865-1884 |
| .settings-panel.open | 1886-1890 |
| .settings-panel h2 | 1892-1897 |
| .settings-body | 1899-1903 |
| .settings-grid | 1905-1908 |
| .settings-section-title | 1910-1918 |
| .panel-trigger, .advanced-trigger, .dropdown-trigger, .control select | 1923-1932 |
| .advanced-trigger | 1934-1938 |
| .dropdown-trigger | 1940-1948 |
| .dropdown-trigger svg | 1950-1954 |
| .panel-trigger | 1956-1961 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger):hover | 1963-1966 |
| .panel-trigger:hover | 1968-1970 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger)[aria-expanded="true"] | 1972-1975 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger, .control select):focus-v... | 1977-1980 |
| .control select | 1982-1986 |
| .options-panel | 1988-2004 |
| .options-panel.open | 2006-2010 |
| .options-panel h3 | 2012-2019 |
| .options-grid | 2021-2024 |
| .options-panel .control | 2026-2032 |
| .options-panel .control.compact | 2034-2036 |
| .options-panel .control>label | 2038-2040 |
| .options-section-title | 2042-2051 |
| .options-panel .options-section-title:first-child | 2053-2057 |
| .advanced-panel | 2059-2078 |
| .advanced-panel.open | 2080-2084 |
| .advanced-panel h3 | 2086-2091 |
| .advanced-grid | 2093-2102 |
| .advanced-grid::-webkit-scrollbar | 2104-2106 |
| .advanced-grid::-webkit-scrollbar-track | 2108-2111 |
| .advanced-grid::-webkit-scrollbar-thumb | 2113-2117 |
| .inline-value | 2119-2126 |
| .slider-stack | 2128-2131 |
| .slider-stack input[type="range"] | 2133-2137 |
| .slider-ghost | 2139-2153 |
| .slider-ghost.visible | 2155-2157 |
| .sf2-browser | 2159-2162 |
| .sf2-browser input[type="text"] | 2164-2173 |
| .sf2-preset-list | 2175-2188 |
| .sf2-browser .piano-desc | 2190-2193 |
| .sf2-browser .piano-desc.pending, .profile-browser .piano-desc.pending | 2196-2198 |
| .sf2-group | 2200-2205 |
| .sf2-group-title | 2207-2216 |
| .sf2-row | 2218-2226 |
| .sf2-row:first-child | 2228-2230 |
| .sf2-row:hover | 2232-2234 |
| .sf2-row.active | 2236-2239 |
| .sf2-row-name | 2241-2247 |
| .sf2-row-program, .sf2-row-bank | 2250-2254 |
| .sf2-empty | 2256-2260 |
| .profile-browser | 2262-2265 |
| .profile-browser input[type="text"] | 2267-2276 |
| .profile-list | 2278-2291 |
| .profile-row | 2293-2303 |
| .profile-row:hover | 2305-2307 |
| .profile-row.active | 2309-2312 |
| .profile-row.applied | 2314-2316 |
| .profile-row-name | 2318-2324 |
| .profile-row-kind | 2326-2331 |
| .advanced-footer | 2333-2339 |
| .piano-preview.wide | 2341-2353 |
| .piano-preview.wide::before | 2355-2357 |
| .piano-preview.wide .play-icon | 2359-2365 |
| .piano-preview.wide .play-label | 2367-2369 |
| .instrument-browser-panel | 2371-2386 |
| .instrument-browser-panel.open | 2388-2392 |
| .instrument-browser-panel h3 | 2394-2399 |
| .piano-panel | 2401-2416 |
| .piano-panel.open | 2418-2422 |
| .piano-panel h3 | 2424-2429 |
| .piano-options | 2431-2434 |
| .piano-option | 2436-2448 |
| .piano-option.active | 2450-2453 |
| .piano-option:focus-visible | 2455-2457 |
| .piano-info | 2459-2462 |
| .piano-name | 2464-2467 |
| .piano-desc | 2469-2472 |
| .piano-option.simple .piano-name | 2474-2478 |
| .piano-option.simple .piano-desc | 2480-2484 |
| .piano-preview | 2486-2501 |
| .piano-preview::before | 2503-2511 |
| .piano-preview:active | 2513-2516 |
| .piano-preview.main | 2518-2522 |
| .settings-grid input[type="range"], .game-settings-grid input[type="range"], .adva... | 2527-2531 |
| .settings-grid input[type="range"]::-webkit-slider-runnable-track, .game-settings-... | 2536-2541 |
| .settings-grid input[type="range"]::-webkit-slider-thumb, .game-settings-grid inpu... | 2546-2555 |
| .settings-grid input[type="range"]:focus-visible::-webkit-slider-thumb, .game-sett... | 2560-2563 |
| .settings-grid input[type="range"]::-moz-range-track, .game-settings-grid input[ty... | 2568-2573 |
| .settings-grid input[type="range"]::-moz-range-thumb, .game-settings-grid input[ty... | 2578-2585 |
| .settings-grid input[type="range"]:focus-visible::-moz-range-thumb, .game-settings... | 2590-2593 |
| .volume-value | 2595-2598 |
| .status-row | 2600-2605 |
| .switch | 2607-2616 |
| .switch input | 2618-2623 |
| .switch-track | 2625-2631 |
| .switch-thumb | 2633-2643 |
| .switch input:checked+.switch-track | 2645-2647 |
| .switch input:checked+.switch-track .switch-thumb | 2649-2651 |
| .switch input:focus-visible+.switch-track | 2653-2656 |
| .control.compact .unit | 2658-2660 |
| .test-tone | 2662-2674 |
| .test-tone:hover | 2676-2679 |
| .test-tone:active | 2681-2683 |
| .test-tone-icon | 2685-2692 |
| .test-tone-label | 2694-2698 |
| .result | 2700-2704 |
| .reveal | 2706-2715 |
| .reveal strong | 2717-2719 |
| .reveal-label | 2721-2728 |
| .reveal-grid.compact | 2730-2734 |
| .reveal-cell | 2736-2738 |
| .keyboard-zone | 2740-2750 |
| .keyboard-stack | 2752-2762 |
| .keyboard-wrapper | 2764-2773 |
| .keyboard | 2775-2782 |
| .keyboard-wrapper.ends-black | 2784-2786 |
| .white-keys | 2788-2791 |
| .black-keys | 2793-2800 |
| .key | 2802-2813 |
| .key.white | 2815-2822 |
| .key.white.has-black | 2824-2826 |
| .key.black | 2828-2837 |
| .key span | 2839-2843 |
| .key.black span | 2845-2849 |
| .key.active | 2851-2854 |
| .key.black.active | 2856-2859 |
| .key.selected | 2861-2865 |
| .key.typed-preview | 2867-2869 |
| .key.correct | 2871-2875 |
| .key.wrong | 2877-2881 |
| .key.missed | 2883-2889 |
| .key.black.selected, .key.black.correct, .key.black.wrong | 2893-2895 |
| .key.black.missed | 2897-2903 |
| .keyboard.disabled | 2905-2911 |
| body.tutorial-open .keyboard | 2913-2915 |
| body.tutorial-open .keyboard.disabled | 2917-2920 |
| .keyboard.disabled::before | 2922-2934 |
| body.tutorial-open .keyboard.disabled::before | 2936-2938 |
| .keyboard.disabled::after | 2940-2974 |
| body.tutorial-open .keyboard.disabled::after | 2976-2978 |
| .tips | 2980-2989 |
| #pedal-tip[hidden] | 2991-2993 |
| .pedal-box | 2995-3009 |
| body.landing .pedal-box | 3011-3013 |
| .pedal-label | 3015-3025 |
| .pedal-icon | 3027-3034 |
| .pedal-icon.active | 3036-3039 |
| .note-pills | 3041-3047 |
| .note-pill | 3049-3055 |
| .note-pill.chord-pill | 3057-3064 |
| .note-pill.chord-pill .chord-link-bubble | 3066-3071 |
| .note-pill.good | 3073-3077 |
| .note-pill.bad | 3079-3083 |
| .note-pill.missed | 3085-3089 |
| .note-pill.neutral | 3091-3095 |
| @media (max-width: 700px) | 3097-3152 |
| @media (max-height: 820px) | 3154-3175 |
| @media (max-height: 700px) | 3177-3182 |

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
File lines: 1-2071

| Symbol | Lines |
|---|---|
| primeAudioFromGesture | 5-14 |
| shouldRestartRoundForSetting | 27-30 |
| patchSettingsState | 32-38 |
| adjustKeyCount | 409-412 |
| bindKeyCountStepper | 414-419 |
| isChordTutorialOpen | 620-620 |
| fitTutorialLayout | 623-651 |
| clearFitClasses | 629-632 |
| applyFitClass | 634-639 |
| getTutorialStep | 653-658 |
| getStepUnlockedRootSet | 660-668 |
| getStepUnlockedQualitySet | 670-676 |
| isTutorialRootEnabled | 678-678 |
| isTutorialQualityEnabled | 679-679 |
| getTutorialRootLabel | 681-684 |
| midiToTutorialLabel | 686-690 |
| getClosestNoteIdFromMidi | 692-699 |
| getTutorialRenderedChord | 701-723 |
| ensureTutorialKeyboard | 725-763 |
| getStepAllowedQualityIds | 765-767 |
| getTutorialActiveSpec | 769-771 |
| renderTutorialCurrentText | 773-784 |
| renderTutorialPianoHighlight | 786-820 |
| renderTutorialRootOptions | 822-840 |
| renderTutorialQualityOptions | 842-887 |
| syncTutorialRootChipStates | 889-908 |
| syncTutorialQualityChipStates | 910-929 |
| setTutorialHoverSpec | 931-938 |
| clearTutorialHoverSpec | 940-943 |
| refreshTutorialVisuals | 945-949 |
| getTutorialStepIndexForQuality | 979-985 |
| renderChordTutorialTabs | 987-1002 |
| renderChordTutorialStep | 1004-1060 |
| closeChordTutorial | 1062-1075 |
| openChordTutorial | 1077-1112 |
| registerTutorialOpenTrigger | 1114-1121 |
| openChordTutorialForChordLink | 1123-1133 |
| handleChordLinkActivation | 1135-1142 |
| isChordTypingCaptureActive | 1280-1285 |
| insertTypedCharacter | 1287-1294 |
| triggerPrimaryAction | 1297-1306 |
| getButtonLikeTarget | 1309-1309 |
| blurPointerActivatedControl | 1310-1317 |
| ensureCustomCursorEl | 1327-1344 |
| getCustomCursorMode | 1345-1354 |
| renderCustomCursor | 1362-1370 |
| scheduleCustomCursorRender | 1371-1374 |
| setCustomCursorEnabled | 1375-1388 |
| updateCustomCursorPosition | 1389-1396 |
| triggerReplayAction | 1398-1404 |
| bindPianoOptionEvents | 1564-1589 |
| applyCustomCursorMediaState | 1707-1709 |
| isElementVisible | 1724-1730 |
| getFocusableElements | 1732-1736 |
| focusFirstInModal | 1742-1748 |
| trapModalFocus | 1750-1772 |
| isTextEditableTarget | 1774-1779 |
| getActiveModalEl | 1781-1786 |
| closeGameSettingsModalUi | 1788-1797 |
| openGameSettingsModalUi | 1799-1805 |
| closeActiveModal | 1807-1821 |
| moveFocusInPanel | 1823-1834 |
| setRandomBackgroundAngle | 2024-2027 |
| init | 2029-2065 |
| runDeferredCatalogLoad | 2049-2058 |

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
| playSelectedButton | click | 333 |
| playSelectedButton | pointerdown | 337 |
| playSelectedButton | pointerup | 342 |
| playSelectedButton | pointerleave | 346 |
| primaryActionButton | click | 350 |
| volumeSlider | input | 358 |
| lengthSlider | input | 364 |
| attackSlider | input | 370 |
| decaySlider | input | 376 |
| releaseSlider | input | 382 |
| sustainSlider | input | 388 |
| keyCountSlider | input | 394 |
| keyCountSlider | change | 401 |
| keyCountSlider | pointerup | 405 |
| hintButton | click | 424 |
| chordAnswerInput | input | 429 |
| chordAnswerInput | keydown | 436 |
| triggerEl | click | 1116 |
| document | click | 1144 |
| document | keydown | 1145 |
| chordTutorialTabs | click | 1151 |
| chordTutorialClose | click | 1163 |
| chordTutorialBackdrop | click | 1170 |
| chordTutorialPrev | click | 1176 |
| chordTutorialNext | click | 1184 |
| chordTutorialRootList | mouseover | 1196 |
| chordTutorialRootList | mouseleave | 1204 |
| chordTutorialRootList | focusin | 1207 |
| chordTutorialRootList | focusout | 1215 |
| chordTutorialRootList | click | 1218 |
| chordTutorialQualityList | mouseover | 1234 |
| chordTutorialQualityList | mouseleave | 1241 |
| chordTutorialQualityList | focusin | 1244 |
| chordTutorialQualityList | focusout | 1251 |
| chordTutorialQualityList | click | 1254 |
| volumeSlider | dblclick | 1406 |
| lengthSlider | dblclick | 1410 |
| keyCountSlider | dblclick | 1414 |
| startNoteDownButton | click | 1420 |
| startNoteUpButton | click | 1423 |
| startNoteDownOctButton | click | 1429 |
| startNoteUpOctButton | click | 1432 |
| noteCountInput | dblclick | 1437 |
| attackSlider | dblclick | 1445 |
| decaySlider | dblclick | 1449 |
| releaseSlider | dblclick | 1453 |
| sustainSlider | dblclick | 1457 |
| profileSearch | input | 1462 |
| profileList | click | 1468 |
| profileList | dblclick | 1473 |
| profileList | keydown | 1476 |
| profileApply | click | 1487 |
| profileSave | click | 1493 |
| instrumentPresetSearch | input | 1499 |
| instrumentPresetList | click | 1505 |
| instrumentPresetList | dblclick | 1510 |
| instrumentPresetList | keydown | 1513 |
| instrumentPresetApply | click | 1524 |
| advancedTrigger | click | 1529 |
| advancedPanel | click | 1534 |
| pianoTrigger | click | 1539 |
| pianoPanel | click | 1546 |
| instrumentBrowserTrigger | click | 1552 |
| instrumentBrowserPanel | click | 1559 |
| pianoOptionsContainer | click | 1567 |
| pianoOptionsContainer | keydown | 1581 |
| pianoPreviewMain | click | 1592 |
| testEnvelopeButton | click | 1599 |
| keyboardEl | pointerdown | 1604 |
| document | pointerup | 1640 |
| document | pointercancel | 1647 |
| document | pointerdown | 1654 |
| document | click | 1660 |
| document | pointermove | 1664 |
| document | pointerup | 1668 |
| document | pointercancel | 1673 |
| document | pointerover | 1678 |
| document | pointerout | 1684 |
| window | blur | 1693 |
| document | visibilitychange | 1699 |
| CUSTOM_CURSOR_QUERY | change | 1711 |
| keyboardEl | click | 1717 |
| document | keydown | 1836 |
| document | keyup | 1972 |
| pedalBox | pointerdown | 1991 |
| pedalBox | pointerup | 2000 |
| pedalBox | pointercancel | 2009 |
| pedalBox | pointerleave | 2017 |

### js/game.js (Active Runtime)
File lines: 1-2123

| Symbol | Lines |
|---|---|
| applyRoundStatePatch | 137-146 |
| applySubmissionStatePatch | 148-157 |
| normalizeQualityToken | 159-176 |
| renderChordLink | 185-212 |
| getKeyboardZoneEl | 240-240 |
| normalizePitchClass | 241-241 |
| getRootName | 242-242 |
| getMidiFromNoteId | 243-243 |
| buildChordLabel | 244-244 |
| getPitchClassSetFromNoteIds | 246-254 |
| getRootGuideNoteId | 260-275 |
| getEffectiveKeyboardSelection | 277-289 |
| getChordDifficultyId | 291-296 |
| shouldShowAliasAsterisk | 298-302 |
| getChordDisplayLabel | 304-307 |
| getChordQualityDisplaySuffix | 309-312 |
| getChordDifficultyConfig | 314-317 |
| getAllowedChordQualities | 319-324 |
| getChordQualityHint | 326-330 |
| getConsistentPreviewDuration | 338-341 |
| playConsistentPreview | 347-365 |
| releaseInteractivePressSession | 402-430 |
| getReplayNoteIds | 432-456 |
| getVoicingHintLabel | 458-462 |
| randomSample | 464-471 |
| getNiceTarget | 473-510 |
| getQualityPitchClassSet | 512-518 |
| parseChordInput | 520-559 |
| detectChordFromNoteIds | 561-597 |
| normalizeIntervals | 599-601 |
| fitIntervalsToAvailableRange | 603-623 |
| buildVoicedIntervals | 625-653 |
| chooseRootCandidatesForIntervals | 655-664 |
| buildChordFromRoot | 666-694 |
| createChordTarget | 696-746 |
| createNoteTarget | 748-783 |
| createTarget | 785-792 |
| clearTypingAutoNext | 794-798 |
| ensureRoundPlaybackReady | 809-826 |
| getTypedPreviewNoteIds | 828-862 |
| updateTypedPreviewFromInput | 864-877 |
| updateChordReadout | 879-951 |
| updateModeVisibility | 953-970 |
| updatePrimaryAction | 972-977 |
| updateReplayAvailability | 979-986 |
| getChordHelperHints | 988-1006 |
| createDeterministicHelperMask | 1024-1052 |
| renderChordHelperBox | 1054-1072 |
| updateStatus | 1074-1198 |
| updateKeyStates | 1200-1261 |
| setKeyboardEnabled | 1263-1266 |
| updateKeyboardScale | 1268-1279 |
| lockKeyboardForPlayback | 1281-1294 |
| setSubmitted | 1296-1303 |
| goHome | 1305-1357 |
| refreshTarget | 1359-1385 |
| startRound | 1387-1463 |
| ensureRound | 1465-1474 |
| playTarget | 1476-1490 |
| startManualNote | 1492-1510 |
| releaseManualNote | 1512-1520 |
| releasePedalNotes | 1522-1532 |
| startPedalHold | 1534-1540 |
| stopPedalHold | 1542-1549 |
| toggleSelection | 1551-1595 |
| isSelectionCorrect | 1597-1614 |
| getPlaybackSpan | 1616-1621 |
| renderNotePills | 1623-1629 |
| renderChordPill | 1631-1635 |
| renderTonePills | 1637-1645 |
| renderRevealCell | 1647-1650 |
| renderChordRevealGrid | 1652-1655 |
| renderChordDetectionMeta | 1657-1661 |
| renderPressedPills | 1663-1668 |
| buildNoteComparison | 1670-1677 |
| buildAnswerNoteCell | 1679-1687 |
| buildTargetNoteCell | 1689-1701 |
| getSubmittedReplaySnapshot | 1725-1739 |
| playSubmittedReplaySequence | 1741-1754 |
| playRevealSequence | 1756-1806 |
| playSelectedChord | 1808-1832 |
| playTypedInputChord | 1834-1847 |
| startHeldPlayback | 1849-1875 |
| releaseHeldPlayback | 1877-1891 |
| buildTypingRevealDetail | 1893-1913 |
| submitTypedAnswer | 1915-1989 |
| submitAnswer | 1991-2054 |
| sanitizeRoundStateForKeyboardRange | 2056-2096 |

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

