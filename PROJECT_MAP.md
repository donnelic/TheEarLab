# Project Map

Generated: 2026-03-10 13:43:31 +01:00

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
| styles.css | CSS | Loaded directly | Yes | 3288 |
| js/audio.js | JavaScript | Browser runtime module | Yes | 1529 |
| js/core.js | JavaScript | Browser runtime module | Yes | 1064 |
| js/events.js | JavaScript | Browser runtime module | Yes | 2130 |
| js/game.js | JavaScript | Browser runtime module | Yes | 2111 |
| js/settings.js | JavaScript | Browser runtime module | Yes | 1474 |
| README.md | Markdown | Human + AI onboarding | Yes | 135 |
| IMPLEMENTATION_CHECKLIST.md | Markdown | Implementation roadmap checklist | Yes | 237 |
| AGENTS.md | Markdown | AI instruction override | Yes | 47 |
| PROJECT_MAP.md | Markdown | Generated reference map | Yes | 1212 |
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
File: styles.css (1-3288)

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
| .chord-link:hover .chord-link-bubble | 649-652 |
| body.suppress-chord-bubbles .chord-link-bubble | 654-657 |
| .chord-link:focus-visible | 659-661 |
| .chord-label-suffix, .chord-divider | 664-667 |
| .chord-readout[hidden] | 669-671 |
| .chord-readout.is-ghost | 673-676 |
| .typing-zone | 678-689 |
| .game-stack | 691-696 |
| .typing-zone label | 698-705 |
| .typing-zone input[type="text"] | 707-719 |
| .typing-zone input[type="text"]::placeholder | 721-724 |
| .typing-row | 726-729 |
| .typing-input-wrap | 731-733 |
| .typing-help-toggle | 735-752 |
| .typing-help-toggle:hover | 754-757 |
| .typing-help-toggle:focus-visible | 759-762 |
| .typing-help-text | 764-770 |
| .typing-help-text strong | 772-774 |
| .typing-help-actions | 776-778 |
| .typing-learn-btn | 780-790 |
| .typing-learn-btn:hover | 792-794 |
| .typing-learn-btn:focus-visible | 796-799 |
| body.modal-open | 801-803 |
| .tutorial-modal | 805-812 |
| .tutorial-modal[hidden] | 814-816 |
| .tutorial-backdrop | 818-824 |
| .tutorial-card | 826-839 |
| .game-settings-modal | 841-848 |
| .game-settings-modal[hidden] | 850-852 |
| .game-settings-card | 854-866 |
| .game-settings-head | 868-873 |
| .game-settings-kicker | 875-880 |
| .game-settings-grid | 882-887 |
| .game-settings-group | 889-897 |
| .game-settings-group-title | 899-903 |
| .game-settings-group-body | 905-908 |
| .app-dialog | 910-917 |
| .app-dialog[hidden] | 919-921 |
| .app-dialog-card | 923-933 |
| .app-dialog-head | 935-940 |
| .app-dialog-body | 942-946 |
| .app-dialog-input-row | 948-951 |
| .app-dialog-input-row input | 953-960 |
| .app-dialog-actions | 962-966 |
| .tutorial-card.tutorial-overflow-scroll | 968-971 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-step | 973-979 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-lab | 981-988 |
| .tutorial-card.tutorial-fit-1 | 990-993 |
| .tutorial-card.tutorial-fit-1 .tutorial-step | 995-998 |
| .tutorial-card.tutorial-fit-1 .tutorial-lab | 1000-1003 |
| .tutorial-card.tutorial-fit-1 .tutorial-chip | 1005-1008 |
| .tutorial-card.tutorial-fit-1 .tutorial-quality-table th | 1010-1012 |
| .tutorial-card.tutorial-fit-1 .tutorial-piano | 1014-1019 |
| .tutorial-card.tutorial-fit-2 | 1021-1024 |
| .tutorial-card.tutorial-fit-2 .tutorial-head h4 | 1026-1028 |
| .tutorial-card.tutorial-fit-2 .tutorial-step | 1030-1033 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-title | 1035-1037 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-body | 1039-1042 |
| .tutorial-card.tutorial-fit-2 .tutorial-lab | 1044-1047 |
| .tutorial-card.tutorial-fit-2 .tutorial-current | 1049-1051 |
| .tutorial-card.tutorial-fit-2 .tutorial-selector-title | 1053-1055 |
| .tutorial-card.tutorial-fit-2 .tutorial-chip | 1057-1060 |
| .tutorial-card.tutorial-fit-2 .tutorial-quality-table th | 1062-1065 |
| .tutorial-card.tutorial-fit-2 .tutorial-piano | 1067-1072 |
| .tutorial-card.tutorial-fit-2 .tutorial-actions .advanced-trigger | 1074-1077 |
| .tutorial-card.tutorial-fit-3 | 1079-1082 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-kicker | 1084-1086 |
| .tutorial-card.tutorial-fit-3 .tutorial-step | 1088-1091 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-title | 1093-1095 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-body | 1097-1100 |
| .tutorial-card.tutorial-fit-3 .tutorial-lab | 1102-1105 |
| .tutorial-card.tutorial-fit-3 .tutorial-current | 1107-1109 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano-title | 1111-1114 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th | 1116-1119 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th, .tutorial-card.tutorial-... | 1122-1124 |
| .tutorial-card.tutorial-fit-3 .tutorial-chip | 1126-1129 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano | 1131-1136 |
| .tutorial-card.tutorial-fit-3 .tutorial-actions .advanced-trigger | 1138-1141 |
| .tutorial-card.tutorial-fit-3 .tutorial-progress | 1143-1145 |
| .tutorial-head | 1147-1152 |
| .tutorial-head h4 | 1154-1158 |
| .tutorial-close | 1160-1162 |
| .tutorial-step | 1164-1172 |
| .tutorial-step-kicker | 1174-1180 |
| .tutorial-step.focus-flash | 1182-1184 |
| @keyframes tutorial-focus-flash | 1186-1194 |
| .tutorial-step-title | 1196-1199 |
| .tutorial-step-body | 1201-1205 |
| .tutorial-step-body p | 1207-1209 |
| .tutorial-step-body p+p | 1211-1213 |
| .tutorial-example-list | 1215-1220 |
| .tutorial-example-list code | 1222-1228 |
| .tutorial-actions | 1230-1237 |
| .tutorial-progress-wrap | 1239-1247 |
| .tutorial-progress | 1249-1255 |
| .tutorial-progress-row | 1257-1263 |
| .tutorial-progress-tabs | 1265-1281 |
| .tutorial-progress-tabs::-webkit-scrollbar | 1283-1285 |
| .tutorial-progress-tab | 1287-1306 |
| .tutorial-progress-step | 1308-1319 |
| .tutorial-progress-label | 1321-1323 |
| .tutorial-progress-tabs.compact .tutorial-progress-label | 1325-1327 |
| .tutorial-progress-tabs.compact .tutorial-progress-tab | 1329-1331 |
| .tutorial-progress-tabs::before | 1333-1343 |
| .tutorial-progress-tab.complete | 1345-1348 |
| .tutorial-progress-tab.complete .tutorial-progress-step | 1350-1354 |
| .tutorial-progress-tab.active | 1356-1361 |
| .tutorial-progress-tab.active .tutorial-progress-step | 1363-1367 |
| .tutorial-progress-tab:focus-visible | 1369-1372 |
| .tutorial-progress-tab:hover, .tutorial-progress-tab:focus-visible | 1375-1377 |
| .tutorial-progress-row > button | 1379-1381 |
| .tutorial-lab | 1383-1392 |
| .tutorial-current | 1394-1398 |
| .tutorial-selector-block | 1400-1403 |
| .tutorial-control-matrix | 1405-1412 |
| .tutorial-control-row | 1414-1422 |
| .tutorial-control-row.locked | 1424-1426 |
| .tutorial-control-row.locked::after | 1428-1435 |
| .tutorial-control-row.newly-unlocked | 1437-1439 |
| @keyframes tutorial-unlock | 1441-1449 |
| .tutorial-selector-title | 1451-1457 |
| .tutorial-chip-list | 1459-1463 |
| #chord-tutorial-quality-list | 1465-1468 |
| .tutorial-quality-table | 1470-1475 |
| .tutorial-quality-table th, .tutorial-quality-table td | 1478-1482 |
| .tutorial-quality-table tr:first-child th, .tutorial-quality-table tr:first-child td | 1485-1487 |
| .tutorial-quality-table th | 1489-1498 |
| .tutorial-chip-group-list | 1500-1504 |
| .tutorial-chip | 1506-1518 |
| .tutorial-chip.unlocked | 1520-1523 |
| .tutorial-chip.unlocked:hover, .tutorial-chip.unlocked:focus-visible | 1526-1529 |
| .tutorial-chip[disabled] | 1531-1535 |
| .tutorial-chip.locked | 1537-1544 |
| .tutorial-chip:hover, .tutorial-chip:focus-visible | 1547-1550 |
| .tutorial-chip.active | 1552-1555 |
| .tutorial-chip.muted | 1557-1560 |
| .tutorial-chip.muted:hover, .tutorial-chip.muted:focus-visible | 1563-1565 |
| .tutorial-chip.newly-unlocked | 1567-1570 |
| .tutorial-chip.locked.newly-unlocked | 1572-1575 |
| .tutorial-piano-wrap | 1577-1582 |
| .tutorial-piano-title | 1584-1591 |
| .tutorial-piano | 1593-1604 |
| .tutorial-key | 1606-1611 |
| .tutorial-key.white | 1613-1621 |
| .tutorial-key.black | 1623-1631 |
| .tutorial-key.tone | 1633-1635 |
| .tutorial-key.tone.root | 1637-1639 |
| .tutorial-key[data-role]::after | 1641-1654 |
| .helper-card | 1656-1663 |
| .helper-title | 1665-1670 |
| .helper-list | 1672-1676 |
| .helper-item | 1678-1689 |
| .helper-item::after | 1691-1699 |
| .helper-item:last-child::after | 1701-1703 |
| .helper-item:hover, .helper-item:focus-within | 1706-1708 |
| @media (hover: hover) and (pointer: fine) | 1710-1716 |
| .app-cursor | 1718-1729 |
| .app-cursor.visible | 1731-1733 |
| .app-cursor-ring, .app-cursor-dot | 1736-1743 |
| .app-cursor-ring | 1745-1753 |
| .app-cursor-dot | 1755-1759 |
| .app-cursor.is-interactive .app-cursor-ring | 1761-1766 |
| .app-cursor.is-interactive .app-cursor-dot | 1768-1770 |
| .app-cursor.is-text .app-cursor-ring | 1772-1777 |
| .app-cursor.is-pressed .app-cursor-ring | 1779-1781 |
| .app-cursor.is-pressed .app-cursor-dot | 1783-1785 |
| .helper-label | 1787-1793 |
| .helper-item .helper-value | 1795-1803 |
| .helper-item .helper-mask | 1805-1813 |
| .helper-item .helper-real | 1815-1827 |
| .helper-item:hover .helper-mask, .helper-item:focus-within .helper-mask | 1830-1833 |
| .helper-item:hover .helper-real, .helper-item:focus-within .helper-real | 1836-1839 |
| .typing-zone[hidden] | 1841-1843 |
| .status | 1845-1856 |
| .status[hidden] | 1858-1860 |
| .helper-slot[hidden] | 1862-1864 |
| .status-actions | 1866-1872 |
| .hint-flag | 1874-1887 |
| .hint-flag[hidden] | 1889-1891 |
| .hint-button | 1893-1895 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) | 1897-1911 |
| .settings-toggle | 1913-1915 |
| .theme-toggle | 1917-1919 |
| .home-toggle | 1921-1923 |
| :is(.settings-toggle, .theme-toggle, .home-toggle):hover | 1925-1927 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) svg | 1929-1933 |
| .settings-toggle svg | 1935-1938 |
| .settings-panel | 1940-1959 |
| .settings-panel.open | 1961-1965 |
| .settings-panel h2 | 1967-1972 |
| .settings-body | 1974-1978 |
| .settings-grid | 1980-1983 |
| .settings-section-title | 1985-1993 |
| .panel-trigger, .advanced-trigger, .dropdown-trigger, .control select | 1998-2007 |
| .advanced-trigger | 2009-2013 |
| .dropdown-trigger | 2015-2023 |
| .dropdown-trigger svg | 2025-2029 |
| .panel-trigger | 2031-2036 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger):hover | 2038-2041 |
| .panel-trigger:hover | 2043-2045 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger)[aria-expanded="true"] | 2047-2050 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger, .control select):focus-v... | 2052-2055 |
| .control select | 2057-2061 |
| .options-panel | 2063-2079 |
| .options-panel.open | 2081-2085 |
| .options-panel h3 | 2087-2094 |
| .options-grid | 2096-2099 |
| .options-panel .control | 2101-2107 |
| .options-panel .control.compact | 2109-2111 |
| .options-panel .control>label | 2113-2115 |
| .options-section-title | 2117-2126 |
| .options-panel .options-section-title:first-child | 2128-2132 |
| .advanced-panel | 2134-2153 |
| .advanced-panel.open | 2155-2159 |
| .advanced-panel h3 | 2161-2166 |
| .advanced-grid | 2168-2177 |
| .advanced-grid::-webkit-scrollbar | 2179-2181 |
| .advanced-grid::-webkit-scrollbar-track | 2183-2186 |
| .advanced-grid::-webkit-scrollbar-thumb | 2188-2192 |
| .inline-value | 2194-2201 |
| .slider-stack | 2203-2206 |
| .slider-stack input[type="range"] | 2208-2212 |
| .slider-ghost | 2214-2228 |
| .slider-ghost.visible | 2230-2232 |
| .sf2-browser | 2234-2237 |
| .sf2-browser input[type="text"] | 2239-2248 |
| .sf2-preset-list | 2250-2263 |
| .sf2-browser .piano-desc | 2265-2268 |
| .sf2-browser .piano-desc.pending, .profile-browser .piano-desc.pending | 2271-2273 |
| .sf2-group | 2275-2280 |
| .sf2-group-title | 2282-2291 |
| .sf2-row | 2293-2301 |
| .sf2-row:first-child | 2303-2305 |
| .sf2-row:hover | 2307-2309 |
| .sf2-row.active | 2311-2314 |
| .sf2-row-name | 2316-2322 |
| .sf2-row-program, .sf2-row-bank | 2325-2329 |
| .sf2-empty | 2331-2335 |
| .profile-browser | 2337-2340 |
| .profile-browser input[type="text"] | 2342-2351 |
| .profile-list | 2353-2366 |
| .profile-row | 2368-2378 |
| .profile-row:hover | 2380-2382 |
| .profile-row.active | 2384-2387 |
| .profile-row.applied | 2389-2391 |
| .profile-row-name | 2393-2399 |
| .profile-row-kind | 2401-2406 |
| .advanced-footer | 2408-2414 |
| .piano-preview.wide | 2416-2428 |
| .piano-preview.wide::before | 2430-2432 |
| .piano-preview.wide .play-icon | 2434-2440 |
| .piano-preview.wide .play-label | 2442-2444 |
| .instrument-browser-panel | 2446-2461 |
| .instrument-browser-panel.open | 2463-2467 |
| .instrument-browser-panel h3 | 2469-2474 |
| .piano-panel | 2476-2491 |
| .piano-panel.open | 2493-2497 |
| .piano-panel h3 | 2499-2504 |
| .piano-options | 2506-2509 |
| .piano-option | 2511-2523 |
| .piano-option.active | 2525-2528 |
| .piano-option:focus-visible | 2530-2532 |
| .piano-info | 2534-2537 |
| .piano-name | 2539-2542 |
| .piano-desc | 2544-2547 |
| .piano-option.simple .piano-name | 2549-2553 |
| .piano-option.simple .piano-desc | 2555-2559 |
| .piano-preview | 2561-2576 |
| .piano-preview::before | 2578-2586 |
| .piano-preview:active | 2588-2591 |
| .piano-preview.main | 2593-2597 |
| .settings-grid input[type="range"], .game-settings-grid input[type="range"], .adva... | 2602-2606 |
| .settings-grid input[type="range"]::-webkit-slider-runnable-track, .game-settings-... | 2611-2616 |
| .settings-grid input[type="range"]::-webkit-slider-thumb, .game-settings-grid inpu... | 2621-2630 |
| .settings-grid input[type="range"]:focus-visible::-webkit-slider-thumb, .game-sett... | 2635-2638 |
| .settings-grid input[type="range"]::-moz-range-track, .game-settings-grid input[ty... | 2643-2648 |
| .settings-grid input[type="range"]::-moz-range-thumb, .game-settings-grid input[ty... | 2653-2660 |
| .settings-grid input[type="range"]:focus-visible::-moz-range-thumb, .game-settings... | 2665-2668 |
| .volume-value | 2670-2673 |
| .status-row | 2675-2680 |
| .switch | 2682-2691 |
| .switch input | 2693-2698 |
| .switch-track | 2700-2706 |
| .switch-thumb | 2708-2718 |
| .switch input:checked+.switch-track | 2720-2722 |
| .switch input:checked+.switch-track .switch-thumb | 2724-2726 |
| .switch input:focus-visible+.switch-track | 2728-2731 |
| .control.compact .unit | 2733-2735 |
| .test-tone | 2737-2749 |
| .test-tone:hover | 2751-2754 |
| .test-tone:active | 2756-2758 |
| .test-tone-icon | 2760-2767 |
| .test-tone-label | 2769-2773 |
| .result | 2775-2779 |
| .reveal | 2781-2789 |
| .reveal strong | 2791-2793 |
| .reveal-label | 2795-2802 |
| .reveal-grid.compact | 2804-2812 |
| .reveal-cell | 2814-2817 |
| .reveal-cell.reveal-target-chord | 2819-2821 |
| .reveal-cell.reveal-target-notes | 2823-2825 |
| .reveal-cell.reveal-your-chord | 2827-2829 |
| .reveal-cell.reveal-your-notes | 2831-2833 |
| .keyboard-zone | 2835-2845 |
| .keyboard-stack | 2847-2857 |
| .keyboard-wrapper | 2859-2868 |
| .keyboard | 2870-2877 |
| .keyboard-wrapper.ends-black | 2879-2881 |
| .white-keys | 2883-2886 |
| .black-keys | 2888-2895 |
| .key | 2897-2908 |
| .key.white | 2910-2917 |
| .key.white.has-black | 2919-2921 |
| .key.black | 2923-2932 |
| .key span | 2934-2938 |
| .key.black span | 2940-2944 |
| .key.active | 2946-2949 |
| .key.black.active | 2951-2954 |
| .key.selected | 2956-2960 |
| .key.typed-preview | 2962-2964 |
| .key.correct | 2966-2970 |
| .key.wrong | 2972-2976 |
| .key.missed | 2978-2984 |
| .key.black.selected, .key.black.correct, .key.black.wrong | 2988-2990 |
| .key.black.missed | 2992-2998 |
| .keyboard.disabled | 3000-3006 |
| body.tutorial-open .keyboard | 3008-3010 |
| body.tutorial-open .keyboard.disabled | 3012-3015 |
| .keyboard.disabled::before | 3017-3029 |
| body.tutorial-open .keyboard.disabled::before | 3031-3033 |
| .keyboard.disabled::after | 3035-3069 |
| body.tutorial-open .keyboard.disabled::after | 3071-3073 |
| .tips | 3075-3084 |
| #pedal-tip[hidden] | 3086-3088 |
| .pedal-box | 3090-3104 |
| body.landing .pedal-box | 3106-3108 |
| .pedal-label | 3110-3120 |
| .pedal-icon | 3122-3129 |
| .pedal-icon.active | 3131-3134 |
| .note-pills | 3136-3143 |
| .reveal-grid.compact .note-pills | 3145-3147 |
| .note-pill | 3149-3155 |
| .reveal-grid.compact .note-pill | 3157-3160 |
| .note-pill.chord-pill | 3162-3170 |
| .note-pill.chord-pill .chord-link-bubble | 3172-3177 |
| .note-pill.good | 3179-3183 |
| .note-pill.bad | 3185-3189 |
| .note-pill.missed | 3191-3195 |
| .note-pill.neutral | 3197-3201 |
| @media (max-width: 700px) | 3203-3258 |
| @media (max-height: 820px) | 3260-3281 |
| @media (max-height: 700px) | 3283-3288 |

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
File lines: 1-2130

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
| renderChordTutorialTabs | 989-1006 |
| fitTutorialProgressTabs | 1008-1038 |
| measure | 1011-1018 |
| renderChordTutorialStep | 1040-1096 |
| closeChordTutorial | 1098-1134 |
| clearSuppress | 1112-1118 |
| openChordTutorial | 1136-1171 |
| registerTutorialOpenTrigger | 1173-1180 |
| openChordTutorialForChordLink | 1182-1192 |
| handleChordLinkActivation | 1194-1201 |
| isChordTypingCaptureActive | 1339-1344 |
| insertTypedCharacter | 1346-1353 |
| triggerPrimaryAction | 1356-1365 |
| getButtonLikeTarget | 1368-1368 |
| blurPointerActivatedControl | 1369-1376 |
| ensureCustomCursorEl | 1386-1403 |
| getCustomCursorMode | 1404-1413 |
| renderCustomCursor | 1421-1429 |
| scheduleCustomCursorRender | 1430-1433 |
| setCustomCursorEnabled | 1434-1447 |
| updateCustomCursorPosition | 1448-1455 |
| triggerReplayAction | 1457-1463 |
| bindPianoOptionEvents | 1623-1648 |
| applyCustomCursorMediaState | 1766-1768 |
| isElementVisible | 1783-1789 |
| getFocusableElements | 1791-1795 |
| focusFirstInModal | 1801-1807 |
| trapModalFocus | 1809-1831 |
| isTextEditableTarget | 1833-1838 |
| getActiveModalEl | 1840-1845 |
| closeGameSettingsModalUi | 1847-1856 |
| openGameSettingsModalUi | 1858-1864 |
| closeActiveModal | 1866-1880 |
| moveFocusInPanel | 1882-1893 |
| setRandomBackgroundAngle | 2083-2086 |
| init | 2088-2124 |
| runDeferredCatalogLoad | 2108-2117 |

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
| window | pointermove | 1120 |
| window | pointerdown | 1121 |
| window | keydown | 1122 |
| triggerEl | click | 1175 |
| document | click | 1203 |
| document | keydown | 1204 |
| chordTutorialTabs | click | 1210 |
| chordTutorialClose | click | 1222 |
| chordTutorialBackdrop | click | 1229 |
| chordTutorialPrev | click | 1235 |
| chordTutorialNext | click | 1243 |
| chordTutorialRootList | mouseover | 1255 |
| chordTutorialRootList | mouseleave | 1263 |
| chordTutorialRootList | focusin | 1266 |
| chordTutorialRootList | focusout | 1274 |
| chordTutorialRootList | click | 1277 |
| chordTutorialQualityList | mouseover | 1293 |
| chordTutorialQualityList | mouseleave | 1300 |
| chordTutorialQualityList | focusin | 1303 |
| chordTutorialQualityList | focusout | 1310 |
| chordTutorialQualityList | click | 1313 |
| volumeSlider | dblclick | 1465 |
| lengthSlider | dblclick | 1469 |
| keyCountSlider | dblclick | 1473 |
| startNoteDownButton | click | 1479 |
| startNoteUpButton | click | 1482 |
| startNoteDownOctButton | click | 1488 |
| startNoteUpOctButton | click | 1491 |
| noteCountInput | dblclick | 1496 |
| attackSlider | dblclick | 1504 |
| decaySlider | dblclick | 1508 |
| releaseSlider | dblclick | 1512 |
| sustainSlider | dblclick | 1516 |
| profileSearch | input | 1521 |
| profileList | click | 1527 |
| profileList | dblclick | 1532 |
| profileList | keydown | 1535 |
| profileApply | click | 1546 |
| profileSave | click | 1552 |
| instrumentPresetSearch | input | 1558 |
| instrumentPresetList | click | 1564 |
| instrumentPresetList | dblclick | 1569 |
| instrumentPresetList | keydown | 1572 |
| instrumentPresetApply | click | 1583 |
| advancedTrigger | click | 1588 |
| advancedPanel | click | 1593 |
| pianoTrigger | click | 1598 |
| pianoPanel | click | 1605 |
| instrumentBrowserTrigger | click | 1611 |
| instrumentBrowserPanel | click | 1618 |
| pianoOptionsContainer | click | 1626 |
| pianoOptionsContainer | keydown | 1640 |
| pianoPreviewMain | click | 1651 |
| testEnvelopeButton | click | 1658 |
| keyboardEl | pointerdown | 1663 |
| document | pointerup | 1699 |
| document | pointercancel | 1706 |
| document | pointerdown | 1713 |
| document | click | 1719 |
| document | pointermove | 1723 |
| document | pointerup | 1727 |
| document | pointercancel | 1732 |
| document | pointerover | 1737 |
| document | pointerout | 1743 |
| window | blur | 1752 |
| document | visibilitychange | 1758 |
| CUSTOM_CURSOR_QUERY | change | 1770 |
| keyboardEl | click | 1776 |
| document | keydown | 1895 |
| document | keyup | 2031 |
| pedalBox | pointerdown | 2050 |
| pedalBox | pointerup | 2059 |
| pedalBox | pointercancel | 2068 |
| pedalBox | pointerleave | 2076 |

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

