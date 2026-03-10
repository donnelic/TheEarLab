# Project Map

Generated: 2026-03-10 11:59:09 +01:00

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
| index.html | HTML | Loaded directly | Yes | 574 |
| styles.css | CSS | Loaded directly | Yes | 3119 |
| js/audio.js | JavaScript | Browser runtime module | Yes | 1529 |
| js/core.js | JavaScript | Browser runtime module | Yes | 1064 |
| js/events.js | JavaScript | Browser runtime module | Yes | 2071 |
| js/game.js | JavaScript | Browser runtime module | Yes | 2103 |
| js/settings.js | JavaScript | Browser runtime module | Yes | 1474 |
| README.md | Markdown | Human + AI onboarding | Yes | 135 |
| IMPLEMENTATION_CHECKLIST.md | Markdown | Implementation roadmap checklist | Yes | 237 |
| AGENTS.md | Markdown | AI instruction override | Yes | 47 |
| PROJECT_MAP.md | Markdown | Generated reference map | Yes | 1169 |
| tools/generate-project-map.ps1 | PowerShell | Documentation generator | Yes | 540 |
| tools/smoke-checklist.md | Markdown | Manual regression checklist | Yes | 59 |
| soundfonts/GeneralUser-GS.sf2 | Asset | Soundfont asset | Yes | 0 |
| soundfonts/index.json | JSON | Soundfont asset | Yes | 3 |
| soundfonts/README.md | Markdown | Soundfont asset | Yes | 39 |

## index.html Map
File: index.html (1-574)

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
| chord-tutorial-tabs | <div> | 509 |
| chord-tutorial-current | <div> | 511 |
| chord-tutorial-piano | <div> | 514 |
| tutorial-row-root | <div> | 517 |
| chord-tutorial-root-list | <div> | 519 |
| tutorial-row-quality | <div> | 521 |
| chord-tutorial-quality-list | <div> | 523 |
| chord-tutorial-prev | <button> | 528 |
| chord-tutorial-progress | <span> | 529 |
| chord-tutorial-next | <button> | 530 |
| app-dialog | <section> | 535 |
| app-dialog-backdrop | <button> | 536 |
| app-dialog-title | <h4> | 539 |
| app-dialog-close | <button> | 540 |
| app-dialog-body | <div> | 542 |
| app-dialog-input | <input> | 545 |
| app-dialog-cancel | <button> | 548 |
| app-dialog-confirm | <button> | 549 |

### Script Load Order
| Order | Script | Line |
|---:|---|---:|
| 1 | vendor/libfluidsynth-2.4.6.js?v=20260310104635 | 554 |
| 2 | vendor/js-synthesizer.min.js?v=20260310104635 | 555 |
| 3 | js/core.js?v=20260310104635 | 556 |
| 4 | js/store/reducers.js?v=20260310104635 | 557 |
| 5 | js/store/actions.js?v=20260310104635 | 558 |
| 6 | js/store/selectors.js?v=20260310104635 | 559 |
| 7 | js/store/store.js?v=20260310104635 | 560 |
| 8 | js/features/round/state-mutations.js?v=20260310104635 | 561 |
| 9 | js/features/settings/state-mutations.js?v=20260310104635 | 562 |
| 10 | js/features/chords/index.js?v=20260310104635 | 563 |
| 11 | js/features/typing/index.js?v=20260310104635 | 564 |
| 12 | js/features/tutorial/index.js?v=20260310104635 | 565 |
| 13 | js/features/audio-preview/index.js?v=20260310104635 | 566 |
| 14 | js/features/input/index.js?v=20260310104635 | 567 |
| 15 | js/audio.js?v=20260310104635 | 568 |
| 16 | js/game.js?v=20260310104635 | 569 |
| 17 | js/settings.js?v=20260310104635 | 570 |
| 18 | js/events.js?v=20260310104635 | 571 |

## styles.css Map
File: styles.css (1-3119)

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
| .chord-readout | 571-590 |
| .chord-link | 592-599 |
| .chord-link::after | 601-622 |
| .chord-link:hover::after, .chord-link:focus-visible::after, .chord-link:focus-with... | 626-629 |
| .chord-link:focus-visible | 631-634 |
| .chord-label-suffix, .chord-divider | 637-640 |
| .chord-readout[hidden] | 642-644 |
| .chord-readout.is-ghost | 646-649 |
| .typing-zone | 651-662 |
| .game-stack | 664-669 |
| .typing-zone label | 671-678 |
| .typing-zone input[type="text"] | 680-692 |
| .typing-zone input[type="text"]::placeholder | 694-697 |
| .typing-row | 699-702 |
| .typing-input-wrap | 704-706 |
| .typing-help-toggle | 708-725 |
| .typing-help-toggle:hover | 727-730 |
| .typing-help-toggle:focus-visible | 732-735 |
| .typing-help-text | 737-743 |
| .typing-help-text strong | 745-747 |
| .typing-help-actions | 749-751 |
| .typing-learn-btn | 753-763 |
| .typing-learn-btn:hover | 765-767 |
| .typing-learn-btn:focus-visible | 769-772 |
| body.modal-open | 774-776 |
| .tutorial-modal | 778-785 |
| .tutorial-modal[hidden] | 787-789 |
| .tutorial-backdrop | 791-797 |
| .tutorial-card | 799-812 |
| .game-settings-modal | 814-821 |
| .game-settings-modal[hidden] | 823-825 |
| .game-settings-card | 827-839 |
| .game-settings-head | 841-846 |
| .game-settings-kicker | 848-853 |
| .game-settings-grid | 855-860 |
| .game-settings-group | 862-870 |
| .game-settings-group-title | 872-876 |
| .game-settings-group-body | 878-881 |
| .app-dialog | 883-890 |
| .app-dialog[hidden] | 892-894 |
| .app-dialog-card | 896-906 |
| .app-dialog-head | 908-913 |
| .app-dialog-body | 915-919 |
| .app-dialog-input-row | 921-924 |
| .app-dialog-input-row input | 926-933 |
| .app-dialog-actions | 935-939 |
| .tutorial-card.tutorial-overflow-scroll | 941-944 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-step | 946-952 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-lab | 954-961 |
| .tutorial-card.tutorial-fit-1 | 963-966 |
| .tutorial-card.tutorial-fit-1 .tutorial-step | 968-971 |
| .tutorial-card.tutorial-fit-1 .tutorial-lab | 973-976 |
| .tutorial-card.tutorial-fit-1 .tutorial-chip | 978-981 |
| .tutorial-card.tutorial-fit-1 .tutorial-quality-table th | 983-985 |
| .tutorial-card.tutorial-fit-1 .tutorial-piano | 987-992 |
| .tutorial-card.tutorial-fit-2 | 994-997 |
| .tutorial-card.tutorial-fit-2 .tutorial-head h4 | 999-1001 |
| .tutorial-card.tutorial-fit-2 .tutorial-step | 1003-1006 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-title | 1008-1010 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-body | 1012-1015 |
| .tutorial-card.tutorial-fit-2 .tutorial-lab | 1017-1020 |
| .tutorial-card.tutorial-fit-2 .tutorial-current | 1022-1024 |
| .tutorial-card.tutorial-fit-2 .tutorial-selector-title | 1026-1028 |
| .tutorial-card.tutorial-fit-2 .tutorial-chip | 1030-1033 |
| .tutorial-card.tutorial-fit-2 .tutorial-quality-table th | 1035-1038 |
| .tutorial-card.tutorial-fit-2 .tutorial-piano | 1040-1045 |
| .tutorial-card.tutorial-fit-2 .tutorial-actions .advanced-trigger | 1047-1050 |
| .tutorial-card.tutorial-fit-3 | 1052-1055 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-kicker | 1057-1059 |
| .tutorial-card.tutorial-fit-3 .tutorial-step | 1061-1064 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-title | 1066-1068 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-body | 1070-1073 |
| .tutorial-card.tutorial-fit-3 .tutorial-lab | 1075-1078 |
| .tutorial-card.tutorial-fit-3 .tutorial-current | 1080-1082 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano-title | 1084-1087 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th | 1089-1092 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th, .tutorial-card.tutorial-... | 1095-1097 |
| .tutorial-card.tutorial-fit-3 .tutorial-chip | 1099-1102 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano | 1104-1109 |
| .tutorial-card.tutorial-fit-3 .tutorial-actions .advanced-trigger | 1111-1114 |
| .tutorial-card.tutorial-fit-3 .tutorial-progress | 1116-1118 |
| .tutorial-head | 1120-1125 |
| .tutorial-head h4 | 1127-1131 |
| .tutorial-close | 1133-1135 |
| .tutorial-step | 1137-1145 |
| .tutorial-step-kicker | 1147-1153 |
| .tutorial-step.focus-flash | 1155-1157 |
| @keyframes tutorial-focus-flash | 1159-1167 |
| .tutorial-step-title | 1169-1172 |
| .tutorial-step-body | 1174-1178 |
| .tutorial-step-body p | 1180-1182 |
| .tutorial-step-body p+p | 1184-1186 |
| .tutorial-example-list | 1188-1193 |
| .tutorial-example-list code | 1195-1201 |
| .tutorial-actions | 1203-1210 |
| .tutorial-progress | 1212-1216 |
| .tutorial-progress-tabs | 1218-1227 |
| .tutorial-progress-tab | 1229-1241 |
| .tutorial-progress-tab:last-child | 1243-1245 |
| .tutorial-progress-tab.complete | 1247-1249 |
| .tutorial-progress-tab.active | 1251-1254 |
| .tutorial-progress-tab:focus-visible | 1256-1259 |
| .tutorial-lab | 1261-1270 |
| .tutorial-current | 1272-1276 |
| .tutorial-selector-block | 1278-1281 |
| .tutorial-control-matrix | 1283-1290 |
| .tutorial-control-row | 1292-1300 |
| .tutorial-control-row.locked | 1302-1304 |
| .tutorial-control-row.locked::after | 1306-1313 |
| .tutorial-control-row.newly-unlocked | 1315-1317 |
| @keyframes tutorial-unlock | 1319-1327 |
| .tutorial-selector-title | 1329-1335 |
| .tutorial-chip-list | 1337-1341 |
| #chord-tutorial-quality-list | 1343-1346 |
| .tutorial-quality-table | 1348-1353 |
| .tutorial-quality-table th, .tutorial-quality-table td | 1356-1360 |
| .tutorial-quality-table tr:first-child th, .tutorial-quality-table tr:first-child td | 1363-1365 |
| .tutorial-quality-table th | 1367-1376 |
| .tutorial-chip-group-list | 1378-1382 |
| .tutorial-chip | 1384-1396 |
| .tutorial-chip.unlocked | 1398-1401 |
| .tutorial-chip.unlocked:hover, .tutorial-chip.unlocked:focus-visible | 1404-1407 |
| .tutorial-chip[disabled] | 1409-1413 |
| .tutorial-chip.locked | 1415-1422 |
| .tutorial-chip:hover, .tutorial-chip:focus-visible | 1425-1428 |
| .tutorial-chip.active | 1430-1433 |
| .tutorial-chip.muted | 1435-1438 |
| .tutorial-chip.muted:hover, .tutorial-chip.muted:focus-visible | 1441-1443 |
| .tutorial-chip.newly-unlocked | 1445-1448 |
| .tutorial-chip.locked.newly-unlocked | 1450-1453 |
| .tutorial-piano-wrap | 1455-1460 |
| .tutorial-piano-title | 1462-1469 |
| .tutorial-piano | 1471-1482 |
| .tutorial-key | 1484-1489 |
| .tutorial-key.white | 1491-1499 |
| .tutorial-key.black | 1501-1509 |
| .tutorial-key.tone | 1511-1513 |
| .tutorial-key.tone.root | 1515-1517 |
| .tutorial-key[data-role]::after | 1519-1532 |
| .helper-card | 1534-1541 |
| .helper-title | 1543-1548 |
| .helper-list | 1550-1554 |
| .helper-item | 1556-1567 |
| .helper-item::after | 1569-1577 |
| .helper-item:last-child::after | 1579-1581 |
| .helper-item:hover, .helper-item:focus-within | 1584-1586 |
| @media (hover: hover) and (pointer: fine) | 1588-1594 |
| .app-cursor | 1596-1607 |
| .app-cursor.visible | 1609-1611 |
| .app-cursor-ring, .app-cursor-dot | 1614-1621 |
| .app-cursor-ring | 1623-1631 |
| .app-cursor-dot | 1633-1637 |
| .app-cursor.is-interactive .app-cursor-ring | 1639-1644 |
| .app-cursor.is-interactive .app-cursor-dot | 1646-1648 |
| .app-cursor.is-text .app-cursor-ring | 1650-1655 |
| .app-cursor.is-pressed .app-cursor-ring | 1657-1659 |
| .app-cursor.is-pressed .app-cursor-dot | 1661-1663 |
| .helper-label | 1665-1671 |
| .helper-item .helper-value | 1673-1681 |
| .helper-item .helper-mask | 1683-1691 |
| .helper-item .helper-real | 1693-1705 |
| .helper-item:hover .helper-mask, .helper-item:focus-within .helper-mask | 1708-1711 |
| .helper-item:hover .helper-real, .helper-item:focus-within .helper-real | 1714-1717 |
| .typing-zone[hidden] | 1719-1721 |
| .status | 1723-1734 |
| .status[hidden] | 1736-1738 |
| .helper-slot[hidden] | 1740-1742 |
| .status-actions | 1744-1750 |
| .hint-flag | 1752-1765 |
| .hint-flag[hidden] | 1767-1769 |
| .hint-button | 1771-1773 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) | 1775-1789 |
| .settings-toggle | 1791-1793 |
| .theme-toggle | 1795-1797 |
| .home-toggle | 1799-1801 |
| :is(.settings-toggle, .theme-toggle, .home-toggle):hover | 1803-1805 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) svg | 1807-1811 |
| .settings-toggle svg | 1813-1816 |
| .settings-panel | 1818-1837 |
| .settings-panel.open | 1839-1843 |
| .settings-panel h2 | 1845-1850 |
| .settings-body | 1852-1856 |
| .settings-grid | 1858-1861 |
| .settings-section-title | 1863-1871 |
| .panel-trigger, .advanced-trigger, .dropdown-trigger, .control select | 1876-1885 |
| .advanced-trigger | 1887-1891 |
| .dropdown-trigger | 1893-1901 |
| .dropdown-trigger svg | 1903-1907 |
| .panel-trigger | 1909-1914 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger):hover | 1916-1919 |
| .panel-trigger:hover | 1921-1923 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger)[aria-expanded="true"] | 1925-1928 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger, .control select):focus-v... | 1930-1933 |
| .control select | 1935-1939 |
| .options-panel | 1941-1957 |
| .options-panel.open | 1959-1963 |
| .options-panel h3 | 1965-1972 |
| .options-grid | 1974-1977 |
| .options-panel .control | 1979-1985 |
| .options-panel .control.compact | 1987-1989 |
| .options-panel .control>label | 1991-1993 |
| .options-section-title | 1995-2004 |
| .options-panel .options-section-title:first-child | 2006-2010 |
| .advanced-panel | 2012-2031 |
| .advanced-panel.open | 2033-2037 |
| .advanced-panel h3 | 2039-2044 |
| .advanced-grid | 2046-2055 |
| .advanced-grid::-webkit-scrollbar | 2057-2059 |
| .advanced-grid::-webkit-scrollbar-track | 2061-2064 |
| .advanced-grid::-webkit-scrollbar-thumb | 2066-2070 |
| .inline-value | 2072-2079 |
| .slider-stack | 2081-2084 |
| .slider-stack input[type="range"] | 2086-2090 |
| .slider-ghost | 2092-2106 |
| .slider-ghost.visible | 2108-2110 |
| .sf2-browser | 2112-2115 |
| .sf2-browser input[type="text"] | 2117-2126 |
| .sf2-preset-list | 2128-2141 |
| .sf2-browser .piano-desc | 2143-2146 |
| .sf2-browser .piano-desc.pending, .profile-browser .piano-desc.pending | 2149-2151 |
| .sf2-group | 2153-2158 |
| .sf2-group-title | 2160-2169 |
| .sf2-row | 2171-2179 |
| .sf2-row:first-child | 2181-2183 |
| .sf2-row:hover | 2185-2187 |
| .sf2-row.active | 2189-2192 |
| .sf2-row-name | 2194-2200 |
| .sf2-row-program, .sf2-row-bank | 2203-2207 |
| .sf2-empty | 2209-2213 |
| .profile-browser | 2215-2218 |
| .profile-browser input[type="text"] | 2220-2229 |
| .profile-list | 2231-2244 |
| .profile-row | 2246-2256 |
| .profile-row:hover | 2258-2260 |
| .profile-row.active | 2262-2265 |
| .profile-row.applied | 2267-2269 |
| .profile-row-name | 2271-2277 |
| .profile-row-kind | 2279-2284 |
| .advanced-footer | 2286-2292 |
| .piano-preview.wide | 2294-2306 |
| .piano-preview.wide::before | 2308-2310 |
| .piano-preview.wide .play-icon | 2312-2318 |
| .piano-preview.wide .play-label | 2320-2322 |
| .instrument-browser-panel | 2324-2339 |
| .instrument-browser-panel.open | 2341-2345 |
| .instrument-browser-panel h3 | 2347-2352 |
| .piano-panel | 2354-2369 |
| .piano-panel.open | 2371-2375 |
| .piano-panel h3 | 2377-2382 |
| .piano-options | 2384-2387 |
| .piano-option | 2389-2401 |
| .piano-option.active | 2403-2406 |
| .piano-option:focus-visible | 2408-2410 |
| .piano-info | 2412-2415 |
| .piano-name | 2417-2420 |
| .piano-desc | 2422-2425 |
| .piano-option.simple .piano-name | 2427-2431 |
| .piano-option.simple .piano-desc | 2433-2437 |
| .piano-preview | 2439-2454 |
| .piano-preview::before | 2456-2464 |
| .piano-preview:active | 2466-2469 |
| .piano-preview.main | 2471-2475 |
| .settings-grid input[type="range"], .game-settings-grid input[type="range"], .adva... | 2480-2484 |
| .settings-grid input[type="range"]::-webkit-slider-runnable-track, .game-settings-... | 2489-2494 |
| .settings-grid input[type="range"]::-webkit-slider-thumb, .game-settings-grid inpu... | 2499-2508 |
| .settings-grid input[type="range"]:focus-visible::-webkit-slider-thumb, .game-sett... | 2513-2516 |
| .settings-grid input[type="range"]::-moz-range-track, .game-settings-grid input[ty... | 2521-2526 |
| .settings-grid input[type="range"]::-moz-range-thumb, .game-settings-grid input[ty... | 2531-2538 |
| .settings-grid input[type="range"]:focus-visible::-moz-range-thumb, .game-settings... | 2543-2546 |
| .volume-value | 2548-2551 |
| .status-row | 2553-2558 |
| .switch | 2560-2569 |
| .switch input | 2571-2576 |
| .switch-track | 2578-2584 |
| .switch-thumb | 2586-2596 |
| .switch input:checked+.switch-track | 2598-2600 |
| .switch input:checked+.switch-track .switch-thumb | 2602-2604 |
| .switch input:focus-visible+.switch-track | 2606-2609 |
| .control.compact .unit | 2611-2613 |
| .test-tone | 2615-2627 |
| .test-tone:hover | 2629-2632 |
| .test-tone:active | 2634-2636 |
| .test-tone-icon | 2638-2645 |
| .test-tone-label | 2647-2651 |
| .result | 2653-2657 |
| .reveal | 2659-2668 |
| .reveal strong | 2670-2672 |
| .reveal-label | 2674-2681 |
| .reveal-grid.compact | 2683-2687 |
| .reveal-cell | 2689-2691 |
| .keyboard-zone | 2693-2703 |
| .keyboard-stack | 2705-2715 |
| .keyboard-wrapper | 2717-2726 |
| .keyboard | 2728-2735 |
| .keyboard-wrapper.ends-black | 2737-2739 |
| .white-keys | 2741-2744 |
| .black-keys | 2746-2753 |
| .key | 2755-2766 |
| .key.white | 2768-2775 |
| .key.white.has-black | 2777-2779 |
| .key.black | 2781-2790 |
| .key span | 2792-2796 |
| .key.black span | 2798-2802 |
| .key.active | 2804-2807 |
| .key.black.active | 2809-2812 |
| .key.selected | 2814-2818 |
| .key.typed-preview | 2820-2822 |
| .key.correct | 2824-2828 |
| .key.wrong | 2830-2834 |
| .key.missed | 2836-2842 |
| .key.black.selected, .key.black.correct, .key.black.wrong | 2846-2848 |
| .key.black.missed | 2850-2856 |
| .keyboard.disabled | 2858-2864 |
| body.tutorial-open .keyboard | 2866-2868 |
| body.tutorial-open .keyboard.disabled | 2870-2873 |
| .keyboard.disabled::before | 2875-2887 |
| body.tutorial-open .keyboard.disabled::before | 2889-2891 |
| .keyboard.disabled::after | 2893-2927 |
| body.tutorial-open .keyboard.disabled::after | 2929-2931 |
| .tips | 2933-2942 |
| #pedal-tip[hidden] | 2944-2946 |
| .pedal-box | 2948-2962 |
| body.landing .pedal-box | 2964-2966 |
| .pedal-label | 2968-2978 |
| .pedal-icon | 2980-2987 |
| .pedal-icon.active | 2989-2992 |
| .note-pills | 2994-3000 |
| .note-pill | 3002-3008 |
| .note-pill.good | 3010-3014 |
| .note-pill.bad | 3016-3020 |
| .note-pill.missed | 3022-3026 |
| .note-pill.neutral | 3028-3032 |
| @media (max-width: 700px) | 3034-3089 |
| @media (max-height: 820px) | 3091-3112 |
| @media (max-height: 700px) | 3114-3119 |

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
File lines: 1-2103

| Symbol | Lines |
|---|---|
| applyRoundStatePatch | 137-146 |
| applySubmissionStatePatch | 148-157 |
| normalizeQualityToken | 159-176 |
| renderChordLink | 185-206 |
| getKeyboardZoneEl | 234-234 |
| normalizePitchClass | 235-235 |
| getRootName | 236-236 |
| getMidiFromNoteId | 237-237 |
| buildChordLabel | 238-238 |
| getPitchClassSetFromNoteIds | 240-248 |
| getRootGuideNoteId | 254-269 |
| getEffectiveKeyboardSelection | 271-283 |
| getChordDifficultyId | 285-290 |
| getChordDifficultyConfig | 292-295 |
| getAllowedChordQualities | 297-302 |
| getChordQualityHint | 304-307 |
| getConsistentPreviewDuration | 315-318 |
| playConsistentPreview | 324-342 |
| releaseInteractivePressSession | 379-407 |
| getReplayNoteIds | 409-433 |
| getVoicingHintLabel | 435-439 |
| randomSample | 441-448 |
| getNiceTarget | 450-487 |
| getQualityPitchClassSet | 489-495 |
| parseChordInput | 497-536 |
| detectChordFromNoteIds | 538-574 |
| normalizeIntervals | 576-578 |
| fitIntervalsToAvailableRange | 580-600 |
| buildVoicedIntervals | 602-630 |
| chooseRootCandidatesForIntervals | 632-641 |
| buildChordFromRoot | 643-671 |
| createChordTarget | 673-723 |
| createNoteTarget | 725-760 |
| createTarget | 762-769 |
| clearTypingAutoNext | 771-775 |
| ensureRoundPlaybackReady | 786-803 |
| getTypedPreviewNoteIds | 805-839 |
| updateTypedPreviewFromInput | 841-854 |
| updateChordReadout | 856-928 |
| updateModeVisibility | 930-947 |
| updatePrimaryAction | 949-954 |
| updateReplayAvailability | 956-963 |
| getChordHelperHints | 965-983 |
| createDeterministicHelperMask | 1001-1029 |
| renderChordHelperBox | 1031-1049 |
| updateStatus | 1051-1175 |
| updateKeyStates | 1177-1238 |
| setKeyboardEnabled | 1240-1243 |
| updateKeyboardScale | 1245-1256 |
| lockKeyboardForPlayback | 1258-1271 |
| setSubmitted | 1273-1280 |
| goHome | 1282-1334 |
| refreshTarget | 1336-1362 |
| startRound | 1364-1440 |
| ensureRound | 1442-1451 |
| playTarget | 1453-1467 |
| startManualNote | 1469-1487 |
| releaseManualNote | 1489-1497 |
| releasePedalNotes | 1499-1509 |
| startPedalHold | 1511-1517 |
| stopPedalHold | 1519-1526 |
| toggleSelection | 1528-1572 |
| isSelectionCorrect | 1574-1591 |
| getPlaybackSpan | 1593-1598 |
| renderNotePills | 1600-1606 |
| renderChordPill | 1608-1612 |
| renderTonePills | 1614-1622 |
| renderRevealCell | 1624-1627 |
| renderChordRevealGrid | 1629-1632 |
| renderChordDetectionMeta | 1634-1638 |
| renderPressedPills | 1640-1645 |
| buildNoteComparison | 1647-1654 |
| buildAnswerNoteCell | 1656-1664 |
| buildTargetNoteCell | 1666-1678 |
| getSubmittedReplaySnapshot | 1708-1722 |
| playSubmittedReplaySequence | 1724-1737 |
| playRevealSequence | 1739-1789 |
| playSelectedChord | 1791-1815 |
| playTypedInputChord | 1817-1830 |
| startHeldPlayback | 1832-1858 |
| releaseHeldPlayback | 1860-1874 |
| buildTypingRevealDetail | 1876-1894 |
| submitTypedAnswer | 1896-1969 |
| submitAnswer | 1971-2034 |
| sanitizeRoundStateForKeyboardRange | 2036-2076 |

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

