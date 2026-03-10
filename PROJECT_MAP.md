# Project Map

Generated: 2026-03-10 13:37:39 +01:00

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
| styles.css | CSS | Loaded directly | Yes | 3284 |
| js/audio.js | JavaScript | Browser runtime module | Yes | 1529 |
| js/core.js | JavaScript | Browser runtime module | Yes | 1064 |
| js/events.js | JavaScript | Browser runtime module | Yes | 2106 |
| js/game.js | JavaScript | Browser runtime module | Yes | 2111 |
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
File: styles.css (1-3284)

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
| .chord-link::before | 605-612 |
| .chord-link-bubble | 615-636 |
| .chord-link-bubble::after | 638-647 |
| .chord-link:hover .chord-link-bubble, .chord-link:focus-visible .chord-link-bubble | 650-653 |
| .chord-link:focus-visible | 655-657 |
| .chord-label-suffix, .chord-divider | 660-663 |
| .chord-readout[hidden] | 665-667 |
| .chord-readout.is-ghost | 669-672 |
| .typing-zone | 674-685 |
| .game-stack | 687-692 |
| .typing-zone label | 694-701 |
| .typing-zone input[type="text"] | 703-715 |
| .typing-zone input[type="text"]::placeholder | 717-720 |
| .typing-row | 722-725 |
| .typing-input-wrap | 727-729 |
| .typing-help-toggle | 731-748 |
| .typing-help-toggle:hover | 750-753 |
| .typing-help-toggle:focus-visible | 755-758 |
| .typing-help-text | 760-766 |
| .typing-help-text strong | 768-770 |
| .typing-help-actions | 772-774 |
| .typing-learn-btn | 776-786 |
| .typing-learn-btn:hover | 788-790 |
| .typing-learn-btn:focus-visible | 792-795 |
| body.modal-open | 797-799 |
| .tutorial-modal | 801-808 |
| .tutorial-modal[hidden] | 810-812 |
| .tutorial-backdrop | 814-820 |
| .tutorial-card | 822-835 |
| .game-settings-modal | 837-844 |
| .game-settings-modal[hidden] | 846-848 |
| .game-settings-card | 850-862 |
| .game-settings-head | 864-869 |
| .game-settings-kicker | 871-876 |
| .game-settings-grid | 878-883 |
| .game-settings-group | 885-893 |
| .game-settings-group-title | 895-899 |
| .game-settings-group-body | 901-904 |
| .app-dialog | 906-913 |
| .app-dialog[hidden] | 915-917 |
| .app-dialog-card | 919-929 |
| .app-dialog-head | 931-936 |
| .app-dialog-body | 938-942 |
| .app-dialog-input-row | 944-947 |
| .app-dialog-input-row input | 949-956 |
| .app-dialog-actions | 958-962 |
| .tutorial-card.tutorial-overflow-scroll | 964-967 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-step | 969-975 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-lab | 977-984 |
| .tutorial-card.tutorial-fit-1 | 986-989 |
| .tutorial-card.tutorial-fit-1 .tutorial-step | 991-994 |
| .tutorial-card.tutorial-fit-1 .tutorial-lab | 996-999 |
| .tutorial-card.tutorial-fit-1 .tutorial-chip | 1001-1004 |
| .tutorial-card.tutorial-fit-1 .tutorial-quality-table th | 1006-1008 |
| .tutorial-card.tutorial-fit-1 .tutorial-piano | 1010-1015 |
| .tutorial-card.tutorial-fit-2 | 1017-1020 |
| .tutorial-card.tutorial-fit-2 .tutorial-head h4 | 1022-1024 |
| .tutorial-card.tutorial-fit-2 .tutorial-step | 1026-1029 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-title | 1031-1033 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-body | 1035-1038 |
| .tutorial-card.tutorial-fit-2 .tutorial-lab | 1040-1043 |
| .tutorial-card.tutorial-fit-2 .tutorial-current | 1045-1047 |
| .tutorial-card.tutorial-fit-2 .tutorial-selector-title | 1049-1051 |
| .tutorial-card.tutorial-fit-2 .tutorial-chip | 1053-1056 |
| .tutorial-card.tutorial-fit-2 .tutorial-quality-table th | 1058-1061 |
| .tutorial-card.tutorial-fit-2 .tutorial-piano | 1063-1068 |
| .tutorial-card.tutorial-fit-2 .tutorial-actions .advanced-trigger | 1070-1073 |
| .tutorial-card.tutorial-fit-3 | 1075-1078 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-kicker | 1080-1082 |
| .tutorial-card.tutorial-fit-3 .tutorial-step | 1084-1087 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-title | 1089-1091 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-body | 1093-1096 |
| .tutorial-card.tutorial-fit-3 .tutorial-lab | 1098-1101 |
| .tutorial-card.tutorial-fit-3 .tutorial-current | 1103-1105 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano-title | 1107-1110 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th | 1112-1115 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th, .tutorial-card.tutorial-... | 1118-1120 |
| .tutorial-card.tutorial-fit-3 .tutorial-chip | 1122-1125 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano | 1127-1132 |
| .tutorial-card.tutorial-fit-3 .tutorial-actions .advanced-trigger | 1134-1137 |
| .tutorial-card.tutorial-fit-3 .tutorial-progress | 1139-1141 |
| .tutorial-head | 1143-1148 |
| .tutorial-head h4 | 1150-1154 |
| .tutorial-close | 1156-1158 |
| .tutorial-step | 1160-1168 |
| .tutorial-step-kicker | 1170-1176 |
| .tutorial-step.focus-flash | 1178-1180 |
| @keyframes tutorial-focus-flash | 1182-1190 |
| .tutorial-step-title | 1192-1195 |
| .tutorial-step-body | 1197-1201 |
| .tutorial-step-body p | 1203-1205 |
| .tutorial-step-body p+p | 1207-1209 |
| .tutorial-example-list | 1211-1216 |
| .tutorial-example-list code | 1218-1224 |
| .tutorial-actions | 1226-1233 |
| .tutorial-progress-wrap | 1235-1243 |
| .tutorial-progress | 1245-1251 |
| .tutorial-progress-row | 1253-1259 |
| .tutorial-progress-tabs | 1261-1277 |
| .tutorial-progress-tabs::-webkit-scrollbar | 1279-1281 |
| .tutorial-progress-tab | 1283-1302 |
| .tutorial-progress-step | 1304-1315 |
| .tutorial-progress-label | 1317-1319 |
| .tutorial-progress-tabs.compact .tutorial-progress-label | 1321-1323 |
| .tutorial-progress-tabs.compact .tutorial-progress-tab | 1325-1327 |
| .tutorial-progress-tabs::before | 1329-1339 |
| .tutorial-progress-tab.complete | 1341-1344 |
| .tutorial-progress-tab.complete .tutorial-progress-step | 1346-1350 |
| .tutorial-progress-tab.active | 1352-1357 |
| .tutorial-progress-tab.active .tutorial-progress-step | 1359-1363 |
| .tutorial-progress-tab:focus-visible | 1365-1368 |
| .tutorial-progress-tab:hover, .tutorial-progress-tab:focus-visible | 1371-1373 |
| .tutorial-progress-row > button | 1375-1377 |
| .tutorial-lab | 1379-1388 |
| .tutorial-current | 1390-1394 |
| .tutorial-selector-block | 1396-1399 |
| .tutorial-control-matrix | 1401-1408 |
| .tutorial-control-row | 1410-1418 |
| .tutorial-control-row.locked | 1420-1422 |
| .tutorial-control-row.locked::after | 1424-1431 |
| .tutorial-control-row.newly-unlocked | 1433-1435 |
| @keyframes tutorial-unlock | 1437-1445 |
| .tutorial-selector-title | 1447-1453 |
| .tutorial-chip-list | 1455-1459 |
| #chord-tutorial-quality-list | 1461-1464 |
| .tutorial-quality-table | 1466-1471 |
| .tutorial-quality-table th, .tutorial-quality-table td | 1474-1478 |
| .tutorial-quality-table tr:first-child th, .tutorial-quality-table tr:first-child td | 1481-1483 |
| .tutorial-quality-table th | 1485-1494 |
| .tutorial-chip-group-list | 1496-1500 |
| .tutorial-chip | 1502-1514 |
| .tutorial-chip.unlocked | 1516-1519 |
| .tutorial-chip.unlocked:hover, .tutorial-chip.unlocked:focus-visible | 1522-1525 |
| .tutorial-chip[disabled] | 1527-1531 |
| .tutorial-chip.locked | 1533-1540 |
| .tutorial-chip:hover, .tutorial-chip:focus-visible | 1543-1546 |
| .tutorial-chip.active | 1548-1551 |
| .tutorial-chip.muted | 1553-1556 |
| .tutorial-chip.muted:hover, .tutorial-chip.muted:focus-visible | 1559-1561 |
| .tutorial-chip.newly-unlocked | 1563-1566 |
| .tutorial-chip.locked.newly-unlocked | 1568-1571 |
| .tutorial-piano-wrap | 1573-1578 |
| .tutorial-piano-title | 1580-1587 |
| .tutorial-piano | 1589-1600 |
| .tutorial-key | 1602-1607 |
| .tutorial-key.white | 1609-1617 |
| .tutorial-key.black | 1619-1627 |
| .tutorial-key.tone | 1629-1631 |
| .tutorial-key.tone.root | 1633-1635 |
| .tutorial-key[data-role]::after | 1637-1650 |
| .helper-card | 1652-1659 |
| .helper-title | 1661-1666 |
| .helper-list | 1668-1672 |
| .helper-item | 1674-1685 |
| .helper-item::after | 1687-1695 |
| .helper-item:last-child::after | 1697-1699 |
| .helper-item:hover, .helper-item:focus-within | 1702-1704 |
| @media (hover: hover) and (pointer: fine) | 1706-1712 |
| .app-cursor | 1714-1725 |
| .app-cursor.visible | 1727-1729 |
| .app-cursor-ring, .app-cursor-dot | 1732-1739 |
| .app-cursor-ring | 1741-1749 |
| .app-cursor-dot | 1751-1755 |
| .app-cursor.is-interactive .app-cursor-ring | 1757-1762 |
| .app-cursor.is-interactive .app-cursor-dot | 1764-1766 |
| .app-cursor.is-text .app-cursor-ring | 1768-1773 |
| .app-cursor.is-pressed .app-cursor-ring | 1775-1777 |
| .app-cursor.is-pressed .app-cursor-dot | 1779-1781 |
| .helper-label | 1783-1789 |
| .helper-item .helper-value | 1791-1799 |
| .helper-item .helper-mask | 1801-1809 |
| .helper-item .helper-real | 1811-1823 |
| .helper-item:hover .helper-mask, .helper-item:focus-within .helper-mask | 1826-1829 |
| .helper-item:hover .helper-real, .helper-item:focus-within .helper-real | 1832-1835 |
| .typing-zone[hidden] | 1837-1839 |
| .status | 1841-1852 |
| .status[hidden] | 1854-1856 |
| .helper-slot[hidden] | 1858-1860 |
| .status-actions | 1862-1868 |
| .hint-flag | 1870-1883 |
| .hint-flag[hidden] | 1885-1887 |
| .hint-button | 1889-1891 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) | 1893-1907 |
| .settings-toggle | 1909-1911 |
| .theme-toggle | 1913-1915 |
| .home-toggle | 1917-1919 |
| :is(.settings-toggle, .theme-toggle, .home-toggle):hover | 1921-1923 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) svg | 1925-1929 |
| .settings-toggle svg | 1931-1934 |
| .settings-panel | 1936-1955 |
| .settings-panel.open | 1957-1961 |
| .settings-panel h2 | 1963-1968 |
| .settings-body | 1970-1974 |
| .settings-grid | 1976-1979 |
| .settings-section-title | 1981-1989 |
| .panel-trigger, .advanced-trigger, .dropdown-trigger, .control select | 1994-2003 |
| .advanced-trigger | 2005-2009 |
| .dropdown-trigger | 2011-2019 |
| .dropdown-trigger svg | 2021-2025 |
| .panel-trigger | 2027-2032 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger):hover | 2034-2037 |
| .panel-trigger:hover | 2039-2041 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger)[aria-expanded="true"] | 2043-2046 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger, .control select):focus-v... | 2048-2051 |
| .control select | 2053-2057 |
| .options-panel | 2059-2075 |
| .options-panel.open | 2077-2081 |
| .options-panel h3 | 2083-2090 |
| .options-grid | 2092-2095 |
| .options-panel .control | 2097-2103 |
| .options-panel .control.compact | 2105-2107 |
| .options-panel .control>label | 2109-2111 |
| .options-section-title | 2113-2122 |
| .options-panel .options-section-title:first-child | 2124-2128 |
| .advanced-panel | 2130-2149 |
| .advanced-panel.open | 2151-2155 |
| .advanced-panel h3 | 2157-2162 |
| .advanced-grid | 2164-2173 |
| .advanced-grid::-webkit-scrollbar | 2175-2177 |
| .advanced-grid::-webkit-scrollbar-track | 2179-2182 |
| .advanced-grid::-webkit-scrollbar-thumb | 2184-2188 |
| .inline-value | 2190-2197 |
| .slider-stack | 2199-2202 |
| .slider-stack input[type="range"] | 2204-2208 |
| .slider-ghost | 2210-2224 |
| .slider-ghost.visible | 2226-2228 |
| .sf2-browser | 2230-2233 |
| .sf2-browser input[type="text"] | 2235-2244 |
| .sf2-preset-list | 2246-2259 |
| .sf2-browser .piano-desc | 2261-2264 |
| .sf2-browser .piano-desc.pending, .profile-browser .piano-desc.pending | 2267-2269 |
| .sf2-group | 2271-2276 |
| .sf2-group-title | 2278-2287 |
| .sf2-row | 2289-2297 |
| .sf2-row:first-child | 2299-2301 |
| .sf2-row:hover | 2303-2305 |
| .sf2-row.active | 2307-2310 |
| .sf2-row-name | 2312-2318 |
| .sf2-row-program, .sf2-row-bank | 2321-2325 |
| .sf2-empty | 2327-2331 |
| .profile-browser | 2333-2336 |
| .profile-browser input[type="text"] | 2338-2347 |
| .profile-list | 2349-2362 |
| .profile-row | 2364-2374 |
| .profile-row:hover | 2376-2378 |
| .profile-row.active | 2380-2383 |
| .profile-row.applied | 2385-2387 |
| .profile-row-name | 2389-2395 |
| .profile-row-kind | 2397-2402 |
| .advanced-footer | 2404-2410 |
| .piano-preview.wide | 2412-2424 |
| .piano-preview.wide::before | 2426-2428 |
| .piano-preview.wide .play-icon | 2430-2436 |
| .piano-preview.wide .play-label | 2438-2440 |
| .instrument-browser-panel | 2442-2457 |
| .instrument-browser-panel.open | 2459-2463 |
| .instrument-browser-panel h3 | 2465-2470 |
| .piano-panel | 2472-2487 |
| .piano-panel.open | 2489-2493 |
| .piano-panel h3 | 2495-2500 |
| .piano-options | 2502-2505 |
| .piano-option | 2507-2519 |
| .piano-option.active | 2521-2524 |
| .piano-option:focus-visible | 2526-2528 |
| .piano-info | 2530-2533 |
| .piano-name | 2535-2538 |
| .piano-desc | 2540-2543 |
| .piano-option.simple .piano-name | 2545-2549 |
| .piano-option.simple .piano-desc | 2551-2555 |
| .piano-preview | 2557-2572 |
| .piano-preview::before | 2574-2582 |
| .piano-preview:active | 2584-2587 |
| .piano-preview.main | 2589-2593 |
| .settings-grid input[type="range"], .game-settings-grid input[type="range"], .adva... | 2598-2602 |
| .settings-grid input[type="range"]::-webkit-slider-runnable-track, .game-settings-... | 2607-2612 |
| .settings-grid input[type="range"]::-webkit-slider-thumb, .game-settings-grid inpu... | 2617-2626 |
| .settings-grid input[type="range"]:focus-visible::-webkit-slider-thumb, .game-sett... | 2631-2634 |
| .settings-grid input[type="range"]::-moz-range-track, .game-settings-grid input[ty... | 2639-2644 |
| .settings-grid input[type="range"]::-moz-range-thumb, .game-settings-grid input[ty... | 2649-2656 |
| .settings-grid input[type="range"]:focus-visible::-moz-range-thumb, .game-settings... | 2661-2664 |
| .volume-value | 2666-2669 |
| .status-row | 2671-2676 |
| .switch | 2678-2687 |
| .switch input | 2689-2694 |
| .switch-track | 2696-2702 |
| .switch-thumb | 2704-2714 |
| .switch input:checked+.switch-track | 2716-2718 |
| .switch input:checked+.switch-track .switch-thumb | 2720-2722 |
| .switch input:focus-visible+.switch-track | 2724-2727 |
| .control.compact .unit | 2729-2731 |
| .test-tone | 2733-2745 |
| .test-tone:hover | 2747-2750 |
| .test-tone:active | 2752-2754 |
| .test-tone-icon | 2756-2763 |
| .test-tone-label | 2765-2769 |
| .result | 2771-2775 |
| .reveal | 2777-2785 |
| .reveal strong | 2787-2789 |
| .reveal-label | 2791-2798 |
| .reveal-grid.compact | 2800-2808 |
| .reveal-cell | 2810-2813 |
| .reveal-cell.reveal-target-chord | 2815-2817 |
| .reveal-cell.reveal-target-notes | 2819-2821 |
| .reveal-cell.reveal-your-chord | 2823-2825 |
| .reveal-cell.reveal-your-notes | 2827-2829 |
| .keyboard-zone | 2831-2841 |
| .keyboard-stack | 2843-2853 |
| .keyboard-wrapper | 2855-2864 |
| .keyboard | 2866-2873 |
| .keyboard-wrapper.ends-black | 2875-2877 |
| .white-keys | 2879-2882 |
| .black-keys | 2884-2891 |
| .key | 2893-2904 |
| .key.white | 2906-2913 |
| .key.white.has-black | 2915-2917 |
| .key.black | 2919-2928 |
| .key span | 2930-2934 |
| .key.black span | 2936-2940 |
| .key.active | 2942-2945 |
| .key.black.active | 2947-2950 |
| .key.selected | 2952-2956 |
| .key.typed-preview | 2958-2960 |
| .key.correct | 2962-2966 |
| .key.wrong | 2968-2972 |
| .key.missed | 2974-2980 |
| .key.black.selected, .key.black.correct, .key.black.wrong | 2984-2986 |
| .key.black.missed | 2988-2994 |
| .keyboard.disabled | 2996-3002 |
| body.tutorial-open .keyboard | 3004-3006 |
| body.tutorial-open .keyboard.disabled | 3008-3011 |
| .keyboard.disabled::before | 3013-3025 |
| body.tutorial-open .keyboard.disabled::before | 3027-3029 |
| .keyboard.disabled::after | 3031-3065 |
| body.tutorial-open .keyboard.disabled::after | 3067-3069 |
| .tips | 3071-3080 |
| #pedal-tip[hidden] | 3082-3084 |
| .pedal-box | 3086-3100 |
| body.landing .pedal-box | 3102-3104 |
| .pedal-label | 3106-3116 |
| .pedal-icon | 3118-3125 |
| .pedal-icon.active | 3127-3130 |
| .note-pills | 3132-3139 |
| .reveal-grid.compact .note-pills | 3141-3143 |
| .note-pill | 3145-3151 |
| .reveal-grid.compact .note-pill | 3153-3156 |
| .note-pill.chord-pill | 3158-3166 |
| .note-pill.chord-pill .chord-link-bubble | 3168-3173 |
| .note-pill.good | 3175-3179 |
| .note-pill.bad | 3181-3185 |
| .note-pill.missed | 3187-3191 |
| .note-pill.neutral | 3193-3197 |
| @media (max-width: 700px) | 3199-3254 |
| @media (max-height: 820px) | 3256-3277 |
| @media (max-height: 700px) | 3279-3284 |

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
File lines: 1-2106

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
| fitTutorialProgressTabs | 1007-1037 |
| measure | 1010-1017 |
| renderChordTutorialStep | 1039-1095 |
| closeChordTutorial | 1097-1110 |
| openChordTutorial | 1112-1147 |
| registerTutorialOpenTrigger | 1149-1156 |
| openChordTutorialForChordLink | 1158-1168 |
| handleChordLinkActivation | 1170-1177 |
| isChordTypingCaptureActive | 1315-1320 |
| insertTypedCharacter | 1322-1329 |
| triggerPrimaryAction | 1332-1341 |
| getButtonLikeTarget | 1344-1344 |
| blurPointerActivatedControl | 1345-1352 |
| ensureCustomCursorEl | 1362-1379 |
| getCustomCursorMode | 1380-1389 |
| renderCustomCursor | 1397-1405 |
| scheduleCustomCursorRender | 1406-1409 |
| setCustomCursorEnabled | 1410-1423 |
| updateCustomCursorPosition | 1424-1431 |
| triggerReplayAction | 1433-1439 |
| bindPianoOptionEvents | 1599-1624 |
| applyCustomCursorMediaState | 1742-1744 |
| isElementVisible | 1759-1765 |
| getFocusableElements | 1767-1771 |
| focusFirstInModal | 1777-1783 |
| trapModalFocus | 1785-1807 |
| isTextEditableTarget | 1809-1814 |
| getActiveModalEl | 1816-1821 |
| closeGameSettingsModalUi | 1823-1832 |
| openGameSettingsModalUi | 1834-1840 |
| closeActiveModal | 1842-1856 |
| moveFocusInPanel | 1858-1869 |
| setRandomBackgroundAngle | 2059-2062 |
| init | 2064-2100 |
| runDeferredCatalogLoad | 2084-2093 |

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
| triggerEl | click | 1151 |
| document | click | 1179 |
| document | keydown | 1180 |
| chordTutorialTabs | click | 1186 |
| chordTutorialClose | click | 1198 |
| chordTutorialBackdrop | click | 1205 |
| chordTutorialPrev | click | 1211 |
| chordTutorialNext | click | 1219 |
| chordTutorialRootList | mouseover | 1231 |
| chordTutorialRootList | mouseleave | 1239 |
| chordTutorialRootList | focusin | 1242 |
| chordTutorialRootList | focusout | 1250 |
| chordTutorialRootList | click | 1253 |
| chordTutorialQualityList | mouseover | 1269 |
| chordTutorialQualityList | mouseleave | 1276 |
| chordTutorialQualityList | focusin | 1279 |
| chordTutorialQualityList | focusout | 1286 |
| chordTutorialQualityList | click | 1289 |
| volumeSlider | dblclick | 1441 |
| lengthSlider | dblclick | 1445 |
| keyCountSlider | dblclick | 1449 |
| startNoteDownButton | click | 1455 |
| startNoteUpButton | click | 1458 |
| startNoteDownOctButton | click | 1464 |
| startNoteUpOctButton | click | 1467 |
| noteCountInput | dblclick | 1472 |
| attackSlider | dblclick | 1480 |
| decaySlider | dblclick | 1484 |
| releaseSlider | dblclick | 1488 |
| sustainSlider | dblclick | 1492 |
| profileSearch | input | 1497 |
| profileList | click | 1503 |
| profileList | dblclick | 1508 |
| profileList | keydown | 1511 |
| profileApply | click | 1522 |
| profileSave | click | 1528 |
| instrumentPresetSearch | input | 1534 |
| instrumentPresetList | click | 1540 |
| instrumentPresetList | dblclick | 1545 |
| instrumentPresetList | keydown | 1548 |
| instrumentPresetApply | click | 1559 |
| advancedTrigger | click | 1564 |
| advancedPanel | click | 1569 |
| pianoTrigger | click | 1574 |
| pianoPanel | click | 1581 |
| instrumentBrowserTrigger | click | 1587 |
| instrumentBrowserPanel | click | 1594 |
| pianoOptionsContainer | click | 1602 |
| pianoOptionsContainer | keydown | 1616 |
| pianoPreviewMain | click | 1627 |
| testEnvelopeButton | click | 1634 |
| keyboardEl | pointerdown | 1639 |
| document | pointerup | 1675 |
| document | pointercancel | 1682 |
| document | pointerdown | 1689 |
| document | click | 1695 |
| document | pointermove | 1699 |
| document | pointerup | 1703 |
| document | pointercancel | 1708 |
| document | pointerover | 1713 |
| document | pointerout | 1719 |
| window | blur | 1728 |
| document | visibilitychange | 1734 |
| CUSTOM_CURSOR_QUERY | change | 1746 |
| keyboardEl | click | 1752 |
| document | keydown | 1871 |
| document | keyup | 2007 |
| pedalBox | pointerdown | 2026 |
| pedalBox | pointerup | 2035 |
| pedalBox | pointercancel | 2044 |
| pedalBox | pointerleave | 2052 |

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

