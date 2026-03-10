# Project Map

Generated: 2026-03-10 12:36:40 +01:00

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
| styles.css | CSS | Loaded directly | Yes | 3177 |
| js/audio.js | JavaScript | Browser runtime module | Yes | 1529 |
| js/core.js | JavaScript | Browser runtime module | Yes | 1064 |
| js/events.js | JavaScript | Browser runtime module | Yes | 2071 |
| js/game.js | JavaScript | Browser runtime module | Yes | 2107 |
| js/settings.js | JavaScript | Browser runtime module | Yes | 1474 |
| README.md | Markdown | Human + AI onboarding | Yes | 135 |
| IMPLEMENTATION_CHECKLIST.md | Markdown | Implementation roadmap checklist | Yes | 237 |
| AGENTS.md | Markdown | AI instruction override | Yes | 47 |
| PROJECT_MAP.md | Markdown | Generated reference map | Yes | 1196 |
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
File: styles.css (1-3177)

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
| .chord-link-bubble | 605-625 |
| .chord-link-bubble::after | 627-636 |
| .chord-link:hover .chord-link-bubble, .chord-link:focus-visible .chord-link-bubble... | 640-643 |
| .chord-link:focus-visible | 645-647 |
| .chord-label-suffix, .chord-divider | 650-653 |
| .chord-readout[hidden] | 655-657 |
| .chord-readout.is-ghost | 659-662 |
| .typing-zone | 664-675 |
| .game-stack | 677-682 |
| .typing-zone label | 684-691 |
| .typing-zone input[type="text"] | 693-705 |
| .typing-zone input[type="text"]::placeholder | 707-710 |
| .typing-row | 712-715 |
| .typing-input-wrap | 717-719 |
| .typing-help-toggle | 721-738 |
| .typing-help-toggle:hover | 740-743 |
| .typing-help-toggle:focus-visible | 745-748 |
| .typing-help-text | 750-756 |
| .typing-help-text strong | 758-760 |
| .typing-help-actions | 762-764 |
| .typing-learn-btn | 766-776 |
| .typing-learn-btn:hover | 778-780 |
| .typing-learn-btn:focus-visible | 782-785 |
| body.modal-open | 787-789 |
| .tutorial-modal | 791-798 |
| .tutorial-modal[hidden] | 800-802 |
| .tutorial-backdrop | 804-810 |
| .tutorial-card | 812-825 |
| .game-settings-modal | 827-834 |
| .game-settings-modal[hidden] | 836-838 |
| .game-settings-card | 840-852 |
| .game-settings-head | 854-859 |
| .game-settings-kicker | 861-866 |
| .game-settings-grid | 868-873 |
| .game-settings-group | 875-883 |
| .game-settings-group-title | 885-889 |
| .game-settings-group-body | 891-894 |
| .app-dialog | 896-903 |
| .app-dialog[hidden] | 905-907 |
| .app-dialog-card | 909-919 |
| .app-dialog-head | 921-926 |
| .app-dialog-body | 928-932 |
| .app-dialog-input-row | 934-937 |
| .app-dialog-input-row input | 939-946 |
| .app-dialog-actions | 948-952 |
| .tutorial-card.tutorial-overflow-scroll | 954-957 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-step | 959-965 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-lab | 967-974 |
| .tutorial-card.tutorial-fit-1 | 976-979 |
| .tutorial-card.tutorial-fit-1 .tutorial-step | 981-984 |
| .tutorial-card.tutorial-fit-1 .tutorial-lab | 986-989 |
| .tutorial-card.tutorial-fit-1 .tutorial-chip | 991-994 |
| .tutorial-card.tutorial-fit-1 .tutorial-quality-table th | 996-998 |
| .tutorial-card.tutorial-fit-1 .tutorial-piano | 1000-1005 |
| .tutorial-card.tutorial-fit-2 | 1007-1010 |
| .tutorial-card.tutorial-fit-2 .tutorial-head h4 | 1012-1014 |
| .tutorial-card.tutorial-fit-2 .tutorial-step | 1016-1019 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-title | 1021-1023 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-body | 1025-1028 |
| .tutorial-card.tutorial-fit-2 .tutorial-lab | 1030-1033 |
| .tutorial-card.tutorial-fit-2 .tutorial-current | 1035-1037 |
| .tutorial-card.tutorial-fit-2 .tutorial-selector-title | 1039-1041 |
| .tutorial-card.tutorial-fit-2 .tutorial-chip | 1043-1046 |
| .tutorial-card.tutorial-fit-2 .tutorial-quality-table th | 1048-1051 |
| .tutorial-card.tutorial-fit-2 .tutorial-piano | 1053-1058 |
| .tutorial-card.tutorial-fit-2 .tutorial-actions .advanced-trigger | 1060-1063 |
| .tutorial-card.tutorial-fit-3 | 1065-1068 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-kicker | 1070-1072 |
| .tutorial-card.tutorial-fit-3 .tutorial-step | 1074-1077 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-title | 1079-1081 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-body | 1083-1086 |
| .tutorial-card.tutorial-fit-3 .tutorial-lab | 1088-1091 |
| .tutorial-card.tutorial-fit-3 .tutorial-current | 1093-1095 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano-title | 1097-1100 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th | 1102-1105 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th, .tutorial-card.tutorial-... | 1108-1110 |
| .tutorial-card.tutorial-fit-3 .tutorial-chip | 1112-1115 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano | 1117-1122 |
| .tutorial-card.tutorial-fit-3 .tutorial-actions .advanced-trigger | 1124-1127 |
| .tutorial-card.tutorial-fit-3 .tutorial-progress | 1129-1131 |
| .tutorial-head | 1133-1138 |
| .tutorial-head h4 | 1140-1144 |
| .tutorial-close | 1146-1148 |
| .tutorial-step | 1150-1158 |
| .tutorial-step-kicker | 1160-1166 |
| .tutorial-step.focus-flash | 1168-1170 |
| @keyframes tutorial-focus-flash | 1172-1180 |
| .tutorial-step-title | 1182-1185 |
| .tutorial-step-body | 1187-1191 |
| .tutorial-step-body p | 1193-1195 |
| .tutorial-step-body p+p | 1197-1199 |
| .tutorial-example-list | 1201-1206 |
| .tutorial-example-list code | 1208-1214 |
| .tutorial-actions | 1216-1223 |
| .tutorial-progress-wrap | 1225-1232 |
| .tutorial-progress | 1234-1238 |
| .tutorial-progress-tabs | 1240-1253 |
| .tutorial-progress-tabs::-webkit-scrollbar | 1255-1257 |
| .tutorial-progress-tab | 1259-1274 |
| .tutorial-progress-tabs::before | 1276-1285 |
| .tutorial-progress-tab.complete | 1287-1290 |
| .tutorial-progress-tab.active | 1292-1296 |
| .tutorial-progress-tab:focus-visible | 1298-1301 |
| .tutorial-lab | 1303-1312 |
| .tutorial-current | 1314-1318 |
| .tutorial-selector-block | 1320-1323 |
| .tutorial-control-matrix | 1325-1332 |
| .tutorial-control-row | 1334-1342 |
| .tutorial-control-row.locked | 1344-1346 |
| .tutorial-control-row.locked::after | 1348-1355 |
| .tutorial-control-row.newly-unlocked | 1357-1359 |
| @keyframes tutorial-unlock | 1361-1369 |
| .tutorial-selector-title | 1371-1377 |
| .tutorial-chip-list | 1379-1383 |
| #chord-tutorial-quality-list | 1385-1388 |
| .tutorial-quality-table | 1390-1395 |
| .tutorial-quality-table th, .tutorial-quality-table td | 1398-1402 |
| .tutorial-quality-table tr:first-child th, .tutorial-quality-table tr:first-child td | 1405-1407 |
| .tutorial-quality-table th | 1409-1418 |
| .tutorial-chip-group-list | 1420-1424 |
| .tutorial-chip | 1426-1438 |
| .tutorial-chip.unlocked | 1440-1443 |
| .tutorial-chip.unlocked:hover, .tutorial-chip.unlocked:focus-visible | 1446-1449 |
| .tutorial-chip[disabled] | 1451-1455 |
| .tutorial-chip.locked | 1457-1464 |
| .tutorial-chip:hover, .tutorial-chip:focus-visible | 1467-1470 |
| .tutorial-chip.active | 1472-1475 |
| .tutorial-chip.muted | 1477-1480 |
| .tutorial-chip.muted:hover, .tutorial-chip.muted:focus-visible | 1483-1485 |
| .tutorial-chip.newly-unlocked | 1487-1490 |
| .tutorial-chip.locked.newly-unlocked | 1492-1495 |
| .tutorial-piano-wrap | 1497-1502 |
| .tutorial-piano-title | 1504-1511 |
| .tutorial-piano | 1513-1524 |
| .tutorial-key | 1526-1531 |
| .tutorial-key.white | 1533-1541 |
| .tutorial-key.black | 1543-1551 |
| .tutorial-key.tone | 1553-1555 |
| .tutorial-key.tone.root | 1557-1559 |
| .tutorial-key[data-role]::after | 1561-1574 |
| .helper-card | 1576-1583 |
| .helper-title | 1585-1590 |
| .helper-list | 1592-1596 |
| .helper-item | 1598-1609 |
| .helper-item::after | 1611-1619 |
| .helper-item:last-child::after | 1621-1623 |
| .helper-item:hover, .helper-item:focus-within | 1626-1628 |
| @media (hover: hover) and (pointer: fine) | 1630-1636 |
| .app-cursor | 1638-1649 |
| .app-cursor.visible | 1651-1653 |
| .app-cursor-ring, .app-cursor-dot | 1656-1663 |
| .app-cursor-ring | 1665-1673 |
| .app-cursor-dot | 1675-1679 |
| .app-cursor.is-interactive .app-cursor-ring | 1681-1686 |
| .app-cursor.is-interactive .app-cursor-dot | 1688-1690 |
| .app-cursor.is-text .app-cursor-ring | 1692-1697 |
| .app-cursor.is-pressed .app-cursor-ring | 1699-1701 |
| .app-cursor.is-pressed .app-cursor-dot | 1703-1705 |
| .helper-label | 1707-1713 |
| .helper-item .helper-value | 1715-1723 |
| .helper-item .helper-mask | 1725-1733 |
| .helper-item .helper-real | 1735-1747 |
| .helper-item:hover .helper-mask, .helper-item:focus-within .helper-mask | 1750-1753 |
| .helper-item:hover .helper-real, .helper-item:focus-within .helper-real | 1756-1759 |
| .typing-zone[hidden] | 1761-1763 |
| .status | 1765-1776 |
| .status[hidden] | 1778-1780 |
| .helper-slot[hidden] | 1782-1784 |
| .status-actions | 1786-1792 |
| .hint-flag | 1794-1807 |
| .hint-flag[hidden] | 1809-1811 |
| .hint-button | 1813-1815 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) | 1817-1831 |
| .settings-toggle | 1833-1835 |
| .theme-toggle | 1837-1839 |
| .home-toggle | 1841-1843 |
| :is(.settings-toggle, .theme-toggle, .home-toggle):hover | 1845-1847 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) svg | 1849-1853 |
| .settings-toggle svg | 1855-1858 |
| .settings-panel | 1860-1879 |
| .settings-panel.open | 1881-1885 |
| .settings-panel h2 | 1887-1892 |
| .settings-body | 1894-1898 |
| .settings-grid | 1900-1903 |
| .settings-section-title | 1905-1913 |
| .panel-trigger, .advanced-trigger, .dropdown-trigger, .control select | 1918-1927 |
| .advanced-trigger | 1929-1933 |
| .dropdown-trigger | 1935-1943 |
| .dropdown-trigger svg | 1945-1949 |
| .panel-trigger | 1951-1956 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger):hover | 1958-1961 |
| .panel-trigger:hover | 1963-1965 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger)[aria-expanded="true"] | 1967-1970 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger, .control select):focus-v... | 1972-1975 |
| .control select | 1977-1981 |
| .options-panel | 1983-1999 |
| .options-panel.open | 2001-2005 |
| .options-panel h3 | 2007-2014 |
| .options-grid | 2016-2019 |
| .options-panel .control | 2021-2027 |
| .options-panel .control.compact | 2029-2031 |
| .options-panel .control>label | 2033-2035 |
| .options-section-title | 2037-2046 |
| .options-panel .options-section-title:first-child | 2048-2052 |
| .advanced-panel | 2054-2073 |
| .advanced-panel.open | 2075-2079 |
| .advanced-panel h3 | 2081-2086 |
| .advanced-grid | 2088-2097 |
| .advanced-grid::-webkit-scrollbar | 2099-2101 |
| .advanced-grid::-webkit-scrollbar-track | 2103-2106 |
| .advanced-grid::-webkit-scrollbar-thumb | 2108-2112 |
| .inline-value | 2114-2121 |
| .slider-stack | 2123-2126 |
| .slider-stack input[type="range"] | 2128-2132 |
| .slider-ghost | 2134-2148 |
| .slider-ghost.visible | 2150-2152 |
| .sf2-browser | 2154-2157 |
| .sf2-browser input[type="text"] | 2159-2168 |
| .sf2-preset-list | 2170-2183 |
| .sf2-browser .piano-desc | 2185-2188 |
| .sf2-browser .piano-desc.pending, .profile-browser .piano-desc.pending | 2191-2193 |
| .sf2-group | 2195-2200 |
| .sf2-group-title | 2202-2211 |
| .sf2-row | 2213-2221 |
| .sf2-row:first-child | 2223-2225 |
| .sf2-row:hover | 2227-2229 |
| .sf2-row.active | 2231-2234 |
| .sf2-row-name | 2236-2242 |
| .sf2-row-program, .sf2-row-bank | 2245-2249 |
| .sf2-empty | 2251-2255 |
| .profile-browser | 2257-2260 |
| .profile-browser input[type="text"] | 2262-2271 |
| .profile-list | 2273-2286 |
| .profile-row | 2288-2298 |
| .profile-row:hover | 2300-2302 |
| .profile-row.active | 2304-2307 |
| .profile-row.applied | 2309-2311 |
| .profile-row-name | 2313-2319 |
| .profile-row-kind | 2321-2326 |
| .advanced-footer | 2328-2334 |
| .piano-preview.wide | 2336-2348 |
| .piano-preview.wide::before | 2350-2352 |
| .piano-preview.wide .play-icon | 2354-2360 |
| .piano-preview.wide .play-label | 2362-2364 |
| .instrument-browser-panel | 2366-2381 |
| .instrument-browser-panel.open | 2383-2387 |
| .instrument-browser-panel h3 | 2389-2394 |
| .piano-panel | 2396-2411 |
| .piano-panel.open | 2413-2417 |
| .piano-panel h3 | 2419-2424 |
| .piano-options | 2426-2429 |
| .piano-option | 2431-2443 |
| .piano-option.active | 2445-2448 |
| .piano-option:focus-visible | 2450-2452 |
| .piano-info | 2454-2457 |
| .piano-name | 2459-2462 |
| .piano-desc | 2464-2467 |
| .piano-option.simple .piano-name | 2469-2473 |
| .piano-option.simple .piano-desc | 2475-2479 |
| .piano-preview | 2481-2496 |
| .piano-preview::before | 2498-2506 |
| .piano-preview:active | 2508-2511 |
| .piano-preview.main | 2513-2517 |
| .settings-grid input[type="range"], .game-settings-grid input[type="range"], .adva... | 2522-2526 |
| .settings-grid input[type="range"]::-webkit-slider-runnable-track, .game-settings-... | 2531-2536 |
| .settings-grid input[type="range"]::-webkit-slider-thumb, .game-settings-grid inpu... | 2541-2550 |
| .settings-grid input[type="range"]:focus-visible::-webkit-slider-thumb, .game-sett... | 2555-2558 |
| .settings-grid input[type="range"]::-moz-range-track, .game-settings-grid input[ty... | 2563-2568 |
| .settings-grid input[type="range"]::-moz-range-thumb, .game-settings-grid input[ty... | 2573-2580 |
| .settings-grid input[type="range"]:focus-visible::-moz-range-thumb, .game-settings... | 2585-2588 |
| .volume-value | 2590-2593 |
| .status-row | 2595-2600 |
| .switch | 2602-2611 |
| .switch input | 2613-2618 |
| .switch-track | 2620-2626 |
| .switch-thumb | 2628-2638 |
| .switch input:checked+.switch-track | 2640-2642 |
| .switch input:checked+.switch-track .switch-thumb | 2644-2646 |
| .switch input:focus-visible+.switch-track | 2648-2651 |
| .control.compact .unit | 2653-2655 |
| .test-tone | 2657-2669 |
| .test-tone:hover | 2671-2674 |
| .test-tone:active | 2676-2678 |
| .test-tone-icon | 2680-2687 |
| .test-tone-label | 2689-2693 |
| .result | 2695-2699 |
| .reveal | 2701-2710 |
| .reveal strong | 2712-2714 |
| .reveal-label | 2716-2723 |
| .reveal-grid.compact | 2725-2729 |
| .reveal-cell | 2731-2733 |
| .keyboard-zone | 2735-2745 |
| .keyboard-stack | 2747-2757 |
| .keyboard-wrapper | 2759-2768 |
| .keyboard | 2770-2777 |
| .keyboard-wrapper.ends-black | 2779-2781 |
| .white-keys | 2783-2786 |
| .black-keys | 2788-2795 |
| .key | 2797-2808 |
| .key.white | 2810-2817 |
| .key.white.has-black | 2819-2821 |
| .key.black | 2823-2832 |
| .key span | 2834-2838 |
| .key.black span | 2840-2844 |
| .key.active | 2846-2849 |
| .key.black.active | 2851-2854 |
| .key.selected | 2856-2860 |
| .key.typed-preview | 2862-2864 |
| .key.correct | 2866-2870 |
| .key.wrong | 2872-2876 |
| .key.missed | 2878-2884 |
| .key.black.selected, .key.black.correct, .key.black.wrong | 2888-2890 |
| .key.black.missed | 2892-2898 |
| .keyboard.disabled | 2900-2906 |
| body.tutorial-open .keyboard | 2908-2910 |
| body.tutorial-open .keyboard.disabled | 2912-2915 |
| .keyboard.disabled::before | 2917-2929 |
| body.tutorial-open .keyboard.disabled::before | 2931-2933 |
| .keyboard.disabled::after | 2935-2969 |
| body.tutorial-open .keyboard.disabled::after | 2971-2973 |
| .tips | 2975-2984 |
| #pedal-tip[hidden] | 2986-2988 |
| .pedal-box | 2990-3004 |
| body.landing .pedal-box | 3006-3008 |
| .pedal-label | 3010-3020 |
| .pedal-icon | 3022-3029 |
| .pedal-icon.active | 3031-3034 |
| .note-pills | 3036-3042 |
| .note-pill | 3044-3050 |
| .note-pill.chord-pill | 3052-3059 |
| .note-pill.chord-pill .chord-link-bubble | 3061-3066 |
| .note-pill.good | 3068-3072 |
| .note-pill.bad | 3074-3078 |
| .note-pill.missed | 3080-3084 |
| .note-pill.neutral | 3086-3090 |
| @media (max-width: 700px) | 3092-3147 |
| @media (max-height: 820px) | 3149-3170 |
| @media (max-height: 700px) | 3172-3177 |

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

