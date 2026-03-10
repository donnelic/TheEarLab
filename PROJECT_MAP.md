# Project Map

Generated: 2026-03-10 12:04:34 +01:00

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
| styles.css | CSS | Loaded directly | Yes | 3150 |
| js/audio.js | JavaScript | Browser runtime module | Yes | 1529 |
| js/core.js | JavaScript | Browser runtime module | Yes | 1064 |
| js/events.js | JavaScript | Browser runtime module | Yes | 2071 |
| js/game.js | JavaScript | Browser runtime module | Yes | 2108 |
| js/settings.js | JavaScript | Browser runtime module | Yes | 1474 |
| README.md | Markdown | Human + AI onboarding | Yes | 135 |
| IMPLEMENTATION_CHECKLIST.md | Markdown | Implementation roadmap checklist | Yes | 237 |
| AGENTS.md | Markdown | AI instruction override | Yes | 47 |
| PROJECT_MAP.md | Markdown | Generated reference map | Yes | 1187 |
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
File: styles.css (1-3150)

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
| .chord-link-bubble | 604-624 |
| .chord-link-bubble::after | 626-635 |
| .chord-link:hover .chord-link-bubble, .chord-link:focus-visible .chord-link-bubble... | 639-642 |
| .chord-link:focus-visible | 644-646 |
| .chord-label-suffix, .chord-divider | 649-652 |
| .chord-readout[hidden] | 654-656 |
| .chord-readout.is-ghost | 658-661 |
| .typing-zone | 663-674 |
| .game-stack | 676-681 |
| .typing-zone label | 683-690 |
| .typing-zone input[type="text"] | 692-704 |
| .typing-zone input[type="text"]::placeholder | 706-709 |
| .typing-row | 711-714 |
| .typing-input-wrap | 716-718 |
| .typing-help-toggle | 720-737 |
| .typing-help-toggle:hover | 739-742 |
| .typing-help-toggle:focus-visible | 744-747 |
| .typing-help-text | 749-755 |
| .typing-help-text strong | 757-759 |
| .typing-help-actions | 761-763 |
| .typing-learn-btn | 765-775 |
| .typing-learn-btn:hover | 777-779 |
| .typing-learn-btn:focus-visible | 781-784 |
| body.modal-open | 786-788 |
| .tutorial-modal | 790-797 |
| .tutorial-modal[hidden] | 799-801 |
| .tutorial-backdrop | 803-809 |
| .tutorial-card | 811-824 |
| .game-settings-modal | 826-833 |
| .game-settings-modal[hidden] | 835-837 |
| .game-settings-card | 839-851 |
| .game-settings-head | 853-858 |
| .game-settings-kicker | 860-865 |
| .game-settings-grid | 867-872 |
| .game-settings-group | 874-882 |
| .game-settings-group-title | 884-888 |
| .game-settings-group-body | 890-893 |
| .app-dialog | 895-902 |
| .app-dialog[hidden] | 904-906 |
| .app-dialog-card | 908-918 |
| .app-dialog-head | 920-925 |
| .app-dialog-body | 927-931 |
| .app-dialog-input-row | 933-936 |
| .app-dialog-input-row input | 938-945 |
| .app-dialog-actions | 947-951 |
| .tutorial-card.tutorial-overflow-scroll | 953-956 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-step | 958-964 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-lab | 966-973 |
| .tutorial-card.tutorial-fit-1 | 975-978 |
| .tutorial-card.tutorial-fit-1 .tutorial-step | 980-983 |
| .tutorial-card.tutorial-fit-1 .tutorial-lab | 985-988 |
| .tutorial-card.tutorial-fit-1 .tutorial-chip | 990-993 |
| .tutorial-card.tutorial-fit-1 .tutorial-quality-table th | 995-997 |
| .tutorial-card.tutorial-fit-1 .tutorial-piano | 999-1004 |
| .tutorial-card.tutorial-fit-2 | 1006-1009 |
| .tutorial-card.tutorial-fit-2 .tutorial-head h4 | 1011-1013 |
| .tutorial-card.tutorial-fit-2 .tutorial-step | 1015-1018 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-title | 1020-1022 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-body | 1024-1027 |
| .tutorial-card.tutorial-fit-2 .tutorial-lab | 1029-1032 |
| .tutorial-card.tutorial-fit-2 .tutorial-current | 1034-1036 |
| .tutorial-card.tutorial-fit-2 .tutorial-selector-title | 1038-1040 |
| .tutorial-card.tutorial-fit-2 .tutorial-chip | 1042-1045 |
| .tutorial-card.tutorial-fit-2 .tutorial-quality-table th | 1047-1050 |
| .tutorial-card.tutorial-fit-2 .tutorial-piano | 1052-1057 |
| .tutorial-card.tutorial-fit-2 .tutorial-actions .advanced-trigger | 1059-1062 |
| .tutorial-card.tutorial-fit-3 | 1064-1067 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-kicker | 1069-1071 |
| .tutorial-card.tutorial-fit-3 .tutorial-step | 1073-1076 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-title | 1078-1080 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-body | 1082-1085 |
| .tutorial-card.tutorial-fit-3 .tutorial-lab | 1087-1090 |
| .tutorial-card.tutorial-fit-3 .tutorial-current | 1092-1094 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano-title | 1096-1099 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th | 1101-1104 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th, .tutorial-card.tutorial-... | 1107-1109 |
| .tutorial-card.tutorial-fit-3 .tutorial-chip | 1111-1114 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano | 1116-1121 |
| .tutorial-card.tutorial-fit-3 .tutorial-actions .advanced-trigger | 1123-1126 |
| .tutorial-card.tutorial-fit-3 .tutorial-progress | 1128-1130 |
| .tutorial-head | 1132-1137 |
| .tutorial-head h4 | 1139-1143 |
| .tutorial-close | 1145-1147 |
| .tutorial-step | 1149-1157 |
| .tutorial-step-kicker | 1159-1165 |
| .tutorial-step.focus-flash | 1167-1169 |
| @keyframes tutorial-focus-flash | 1171-1179 |
| .tutorial-step-title | 1181-1184 |
| .tutorial-step-body | 1186-1190 |
| .tutorial-step-body p | 1192-1194 |
| .tutorial-step-body p+p | 1196-1198 |
| .tutorial-example-list | 1200-1205 |
| .tutorial-example-list code | 1207-1213 |
| .tutorial-actions | 1215-1222 |
| .tutorial-progress-wrap | 1224-1231 |
| .tutorial-progress | 1233-1237 |
| .tutorial-progress-tabs | 1239-1248 |
| .tutorial-progress-tab | 1250-1264 |
| .tutorial-progress-tabs::before | 1266-1274 |
| .tutorial-progress-tab.complete | 1276-1279 |
| .tutorial-progress-tab.active | 1281-1285 |
| .tutorial-progress-tab:focus-visible | 1287-1290 |
| .tutorial-lab | 1292-1301 |
| .tutorial-current | 1303-1307 |
| .tutorial-selector-block | 1309-1312 |
| .tutorial-control-matrix | 1314-1321 |
| .tutorial-control-row | 1323-1331 |
| .tutorial-control-row.locked | 1333-1335 |
| .tutorial-control-row.locked::after | 1337-1344 |
| .tutorial-control-row.newly-unlocked | 1346-1348 |
| @keyframes tutorial-unlock | 1350-1358 |
| .tutorial-selector-title | 1360-1366 |
| .tutorial-chip-list | 1368-1372 |
| #chord-tutorial-quality-list | 1374-1377 |
| .tutorial-quality-table | 1379-1384 |
| .tutorial-quality-table th, .tutorial-quality-table td | 1387-1391 |
| .tutorial-quality-table tr:first-child th, .tutorial-quality-table tr:first-child td | 1394-1396 |
| .tutorial-quality-table th | 1398-1407 |
| .tutorial-chip-group-list | 1409-1413 |
| .tutorial-chip | 1415-1427 |
| .tutorial-chip.unlocked | 1429-1432 |
| .tutorial-chip.unlocked:hover, .tutorial-chip.unlocked:focus-visible | 1435-1438 |
| .tutorial-chip[disabled] | 1440-1444 |
| .tutorial-chip.locked | 1446-1453 |
| .tutorial-chip:hover, .tutorial-chip:focus-visible | 1456-1459 |
| .tutorial-chip.active | 1461-1464 |
| .tutorial-chip.muted | 1466-1469 |
| .tutorial-chip.muted:hover, .tutorial-chip.muted:focus-visible | 1472-1474 |
| .tutorial-chip.newly-unlocked | 1476-1479 |
| .tutorial-chip.locked.newly-unlocked | 1481-1484 |
| .tutorial-piano-wrap | 1486-1491 |
| .tutorial-piano-title | 1493-1500 |
| .tutorial-piano | 1502-1513 |
| .tutorial-key | 1515-1520 |
| .tutorial-key.white | 1522-1530 |
| .tutorial-key.black | 1532-1540 |
| .tutorial-key.tone | 1542-1544 |
| .tutorial-key.tone.root | 1546-1548 |
| .tutorial-key[data-role]::after | 1550-1563 |
| .helper-card | 1565-1572 |
| .helper-title | 1574-1579 |
| .helper-list | 1581-1585 |
| .helper-item | 1587-1598 |
| .helper-item::after | 1600-1608 |
| .helper-item:last-child::after | 1610-1612 |
| .helper-item:hover, .helper-item:focus-within | 1615-1617 |
| @media (hover: hover) and (pointer: fine) | 1619-1625 |
| .app-cursor | 1627-1638 |
| .app-cursor.visible | 1640-1642 |
| .app-cursor-ring, .app-cursor-dot | 1645-1652 |
| .app-cursor-ring | 1654-1662 |
| .app-cursor-dot | 1664-1668 |
| .app-cursor.is-interactive .app-cursor-ring | 1670-1675 |
| .app-cursor.is-interactive .app-cursor-dot | 1677-1679 |
| .app-cursor.is-text .app-cursor-ring | 1681-1686 |
| .app-cursor.is-pressed .app-cursor-ring | 1688-1690 |
| .app-cursor.is-pressed .app-cursor-dot | 1692-1694 |
| .helper-label | 1696-1702 |
| .helper-item .helper-value | 1704-1712 |
| .helper-item .helper-mask | 1714-1722 |
| .helper-item .helper-real | 1724-1736 |
| .helper-item:hover .helper-mask, .helper-item:focus-within .helper-mask | 1739-1742 |
| .helper-item:hover .helper-real, .helper-item:focus-within .helper-real | 1745-1748 |
| .typing-zone[hidden] | 1750-1752 |
| .status | 1754-1765 |
| .status[hidden] | 1767-1769 |
| .helper-slot[hidden] | 1771-1773 |
| .status-actions | 1775-1781 |
| .hint-flag | 1783-1796 |
| .hint-flag[hidden] | 1798-1800 |
| .hint-button | 1802-1804 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) | 1806-1820 |
| .settings-toggle | 1822-1824 |
| .theme-toggle | 1826-1828 |
| .home-toggle | 1830-1832 |
| :is(.settings-toggle, .theme-toggle, .home-toggle):hover | 1834-1836 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) svg | 1838-1842 |
| .settings-toggle svg | 1844-1847 |
| .settings-panel | 1849-1868 |
| .settings-panel.open | 1870-1874 |
| .settings-panel h2 | 1876-1881 |
| .settings-body | 1883-1887 |
| .settings-grid | 1889-1892 |
| .settings-section-title | 1894-1902 |
| .panel-trigger, .advanced-trigger, .dropdown-trigger, .control select | 1907-1916 |
| .advanced-trigger | 1918-1922 |
| .dropdown-trigger | 1924-1932 |
| .dropdown-trigger svg | 1934-1938 |
| .panel-trigger | 1940-1945 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger):hover | 1947-1950 |
| .panel-trigger:hover | 1952-1954 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger)[aria-expanded="true"] | 1956-1959 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger, .control select):focus-v... | 1961-1964 |
| .control select | 1966-1970 |
| .options-panel | 1972-1988 |
| .options-panel.open | 1990-1994 |
| .options-panel h3 | 1996-2003 |
| .options-grid | 2005-2008 |
| .options-panel .control | 2010-2016 |
| .options-panel .control.compact | 2018-2020 |
| .options-panel .control>label | 2022-2024 |
| .options-section-title | 2026-2035 |
| .options-panel .options-section-title:first-child | 2037-2041 |
| .advanced-panel | 2043-2062 |
| .advanced-panel.open | 2064-2068 |
| .advanced-panel h3 | 2070-2075 |
| .advanced-grid | 2077-2086 |
| .advanced-grid::-webkit-scrollbar | 2088-2090 |
| .advanced-grid::-webkit-scrollbar-track | 2092-2095 |
| .advanced-grid::-webkit-scrollbar-thumb | 2097-2101 |
| .inline-value | 2103-2110 |
| .slider-stack | 2112-2115 |
| .slider-stack input[type="range"] | 2117-2121 |
| .slider-ghost | 2123-2137 |
| .slider-ghost.visible | 2139-2141 |
| .sf2-browser | 2143-2146 |
| .sf2-browser input[type="text"] | 2148-2157 |
| .sf2-preset-list | 2159-2172 |
| .sf2-browser .piano-desc | 2174-2177 |
| .sf2-browser .piano-desc.pending, .profile-browser .piano-desc.pending | 2180-2182 |
| .sf2-group | 2184-2189 |
| .sf2-group-title | 2191-2200 |
| .sf2-row | 2202-2210 |
| .sf2-row:first-child | 2212-2214 |
| .sf2-row:hover | 2216-2218 |
| .sf2-row.active | 2220-2223 |
| .sf2-row-name | 2225-2231 |
| .sf2-row-program, .sf2-row-bank | 2234-2238 |
| .sf2-empty | 2240-2244 |
| .profile-browser | 2246-2249 |
| .profile-browser input[type="text"] | 2251-2260 |
| .profile-list | 2262-2275 |
| .profile-row | 2277-2287 |
| .profile-row:hover | 2289-2291 |
| .profile-row.active | 2293-2296 |
| .profile-row.applied | 2298-2300 |
| .profile-row-name | 2302-2308 |
| .profile-row-kind | 2310-2315 |
| .advanced-footer | 2317-2323 |
| .piano-preview.wide | 2325-2337 |
| .piano-preview.wide::before | 2339-2341 |
| .piano-preview.wide .play-icon | 2343-2349 |
| .piano-preview.wide .play-label | 2351-2353 |
| .instrument-browser-panel | 2355-2370 |
| .instrument-browser-panel.open | 2372-2376 |
| .instrument-browser-panel h3 | 2378-2383 |
| .piano-panel | 2385-2400 |
| .piano-panel.open | 2402-2406 |
| .piano-panel h3 | 2408-2413 |
| .piano-options | 2415-2418 |
| .piano-option | 2420-2432 |
| .piano-option.active | 2434-2437 |
| .piano-option:focus-visible | 2439-2441 |
| .piano-info | 2443-2446 |
| .piano-name | 2448-2451 |
| .piano-desc | 2453-2456 |
| .piano-option.simple .piano-name | 2458-2462 |
| .piano-option.simple .piano-desc | 2464-2468 |
| .piano-preview | 2470-2485 |
| .piano-preview::before | 2487-2495 |
| .piano-preview:active | 2497-2500 |
| .piano-preview.main | 2502-2506 |
| .settings-grid input[type="range"], .game-settings-grid input[type="range"], .adva... | 2511-2515 |
| .settings-grid input[type="range"]::-webkit-slider-runnable-track, .game-settings-... | 2520-2525 |
| .settings-grid input[type="range"]::-webkit-slider-thumb, .game-settings-grid inpu... | 2530-2539 |
| .settings-grid input[type="range"]:focus-visible::-webkit-slider-thumb, .game-sett... | 2544-2547 |
| .settings-grid input[type="range"]::-moz-range-track, .game-settings-grid input[ty... | 2552-2557 |
| .settings-grid input[type="range"]::-moz-range-thumb, .game-settings-grid input[ty... | 2562-2569 |
| .settings-grid input[type="range"]:focus-visible::-moz-range-thumb, .game-settings... | 2574-2577 |
| .volume-value | 2579-2582 |
| .status-row | 2584-2589 |
| .switch | 2591-2600 |
| .switch input | 2602-2607 |
| .switch-track | 2609-2615 |
| .switch-thumb | 2617-2627 |
| .switch input:checked+.switch-track | 2629-2631 |
| .switch input:checked+.switch-track .switch-thumb | 2633-2635 |
| .switch input:focus-visible+.switch-track | 2637-2640 |
| .control.compact .unit | 2642-2644 |
| .test-tone | 2646-2658 |
| .test-tone:hover | 2660-2663 |
| .test-tone:active | 2665-2667 |
| .test-tone-icon | 2669-2676 |
| .test-tone-label | 2678-2682 |
| .result | 2684-2688 |
| .reveal | 2690-2699 |
| .reveal strong | 2701-2703 |
| .reveal-label | 2705-2712 |
| .reveal-grid.compact | 2714-2718 |
| .reveal-cell | 2720-2722 |
| .keyboard-zone | 2724-2734 |
| .keyboard-stack | 2736-2746 |
| .keyboard-wrapper | 2748-2757 |
| .keyboard | 2759-2766 |
| .keyboard-wrapper.ends-black | 2768-2770 |
| .white-keys | 2772-2775 |
| .black-keys | 2777-2784 |
| .key | 2786-2797 |
| .key.white | 2799-2806 |
| .key.white.has-black | 2808-2810 |
| .key.black | 2812-2821 |
| .key span | 2823-2827 |
| .key.black span | 2829-2833 |
| .key.active | 2835-2838 |
| .key.black.active | 2840-2843 |
| .key.selected | 2845-2849 |
| .key.typed-preview | 2851-2853 |
| .key.correct | 2855-2859 |
| .key.wrong | 2861-2865 |
| .key.missed | 2867-2873 |
| .key.black.selected, .key.black.correct, .key.black.wrong | 2877-2879 |
| .key.black.missed | 2881-2887 |
| .keyboard.disabled | 2889-2895 |
| body.tutorial-open .keyboard | 2897-2899 |
| body.tutorial-open .keyboard.disabled | 2901-2904 |
| .keyboard.disabled::before | 2906-2918 |
| body.tutorial-open .keyboard.disabled::before | 2920-2922 |
| .keyboard.disabled::after | 2924-2958 |
| body.tutorial-open .keyboard.disabled::after | 2960-2962 |
| .tips | 2964-2973 |
| #pedal-tip[hidden] | 2975-2977 |
| .pedal-box | 2979-2993 |
| body.landing .pedal-box | 2995-2997 |
| .pedal-label | 2999-3009 |
| .pedal-icon | 3011-3018 |
| .pedal-icon.active | 3020-3023 |
| .note-pills | 3025-3031 |
| .note-pill | 3033-3039 |
| .note-pill.good | 3041-3045 |
| .note-pill.bad | 3047-3051 |
| .note-pill.missed | 3053-3057 |
| .note-pill.neutral | 3059-3063 |
| @media (max-width: 700px) | 3065-3120 |
| @media (max-height: 820px) | 3122-3143 |
| @media (max-height: 700px) | 3145-3150 |

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
File lines: 1-2108

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
| getChordDifficultyConfig | 295-298 |
| getAllowedChordQualities | 300-305 |
| getChordQualityHint | 307-310 |
| getConsistentPreviewDuration | 318-321 |
| playConsistentPreview | 327-345 |
| releaseInteractivePressSession | 382-410 |
| getReplayNoteIds | 412-436 |
| getVoicingHintLabel | 438-442 |
| randomSample | 444-451 |
| getNiceTarget | 453-490 |
| getQualityPitchClassSet | 492-498 |
| parseChordInput | 500-539 |
| detectChordFromNoteIds | 541-577 |
| normalizeIntervals | 579-581 |
| fitIntervalsToAvailableRange | 583-603 |
| buildVoicedIntervals | 605-633 |
| chooseRootCandidatesForIntervals | 635-644 |
| buildChordFromRoot | 646-674 |
| createChordTarget | 676-726 |
| createNoteTarget | 728-763 |
| createTarget | 765-772 |
| clearTypingAutoNext | 774-778 |
| ensureRoundPlaybackReady | 789-806 |
| getTypedPreviewNoteIds | 808-842 |
| updateTypedPreviewFromInput | 844-857 |
| updateChordReadout | 859-931 |
| updateModeVisibility | 933-950 |
| updatePrimaryAction | 952-957 |
| updateReplayAvailability | 959-966 |
| getChordHelperHints | 968-986 |
| createDeterministicHelperMask | 1004-1032 |
| renderChordHelperBox | 1034-1052 |
| updateStatus | 1054-1178 |
| updateKeyStates | 1180-1241 |
| setKeyboardEnabled | 1243-1246 |
| updateKeyboardScale | 1248-1259 |
| lockKeyboardForPlayback | 1261-1274 |
| setSubmitted | 1276-1283 |
| goHome | 1285-1337 |
| refreshTarget | 1339-1365 |
| startRound | 1367-1443 |
| ensureRound | 1445-1454 |
| playTarget | 1456-1470 |
| startManualNote | 1472-1490 |
| releaseManualNote | 1492-1500 |
| releasePedalNotes | 1502-1512 |
| startPedalHold | 1514-1520 |
| stopPedalHold | 1522-1529 |
| toggleSelection | 1531-1575 |
| isSelectionCorrect | 1577-1594 |
| getPlaybackSpan | 1596-1601 |
| renderNotePills | 1603-1609 |
| renderChordPill | 1611-1615 |
| renderTonePills | 1617-1625 |
| renderRevealCell | 1627-1630 |
| renderChordRevealGrid | 1632-1635 |
| renderChordDetectionMeta | 1637-1641 |
| renderPressedPills | 1643-1648 |
| buildNoteComparison | 1650-1657 |
| buildAnswerNoteCell | 1659-1667 |
| buildTargetNoteCell | 1669-1681 |
| getSubmittedReplaySnapshot | 1711-1725 |
| playSubmittedReplaySequence | 1727-1740 |
| playRevealSequence | 1742-1792 |
| playSelectedChord | 1794-1818 |
| playTypedInputChord | 1820-1833 |
| startHeldPlayback | 1835-1861 |
| releaseHeldPlayback | 1863-1877 |
| buildTypingRevealDetail | 1879-1899 |
| submitTypedAnswer | 1901-1974 |
| submitAnswer | 1976-2039 |
| sanitizeRoundStateForKeyboardRange | 2041-2081 |

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

