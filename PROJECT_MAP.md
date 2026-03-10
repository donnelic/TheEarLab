# Project Map

Generated: 2026-03-10 10:45:49 +01:00

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
| index.html | HTML | Loaded directly | Yes | 544 |
| styles.css | CSS | Loaded directly | Yes | 3001 |
| js/audio.js | JavaScript | Browser runtime module | Yes | 1529 |
| js/core.js | JavaScript | Browser runtime module | Yes | 1037 |
| js/events.js | JavaScript | Browser runtime module | Yes | 1955 |
| js/game.js | JavaScript | Browser runtime module | Yes | 2048 |
| js/settings.js | JavaScript | Browser runtime module | Yes | 1418 |
| README.md | Markdown | Human + AI onboarding | Yes | 135 |
| IMPLEMENTATION_CHECKLIST.md | Markdown | Implementation roadmap checklist | Yes | 237 |
| AGENTS.md | Markdown | AI instruction override | Yes | 47 |
| PROJECT_MAP.md | Markdown | Generated reference map | Yes | 1088 |
| tools/generate-project-map.ps1 | PowerShell | Documentation generator | Yes | 540 |
| tools/smoke-checklist.md | Markdown | Manual regression checklist | Yes | 59 |
| soundfonts/GeneralUser-GS.sf2 | Asset | Soundfont asset | Yes | 0 |
| soundfonts/index.json | JSON | Soundfont asset | Yes | 3 |
| soundfonts/README.md | Markdown | Soundfont asset | Yes | 39 |

## index.html Map
File: index.html (1-544)

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
| key-count | <input> | 98 |
| key-count-value | <span> | 99 |
| start-note-down-oct | <button> | 107 |
| start-note-down | <button> | 109 |
| start-note-value | <span> | 110 |
| start-note-up | <button> | 111 |
| start-note-up-oct | <button> | 112 |
| reset-settings | <button> | 119 |
| advanced-panel | <section> | 122 |
| attack-label-value | <span> | 126 |
| attack-time | <input> | 129 |
| attack-ghost | <span> | 130 |
| attack-value | <span> | 132 |
| decay-label-value | <span> | 136 |
| decay-rate | <input> | 139 |
| decay-ghost | <span> | 140 |
| decay-value | <span> | 142 |
| release-label-value | <span> | 146 |
| release-rate | <input> | 149 |
| release-ghost | <span> | 150 |
| release-value | <span> | 152 |
| sustain-label-value | <span> | 156 |
| sustain-length | <input> | 159 |
| sustain-ghost | <span> | 160 |
| sustain-value | <span> | 162 |
| profile-search | <input> | 167 |
| profile-list | <div> | 168 |
| profile-meta | <div> | 169 |
| profile-save | <button> | 171 |
| profile-apply | <button> | 172 |
| test-envelope | <button> | 177 |
| piano-panel | <section> | 184 |
| piano-options | <div> | 186 |
| instrument-browser-panel | <section> | 189 |
| instrument-preset-search | <input> | 193 |
| instrument-preset-list | <div> | 194 |
| instrument-preset-meta | <div> | 195 |
| instrument-preset-apply | <button> | 197 |
| game-settings-modal | <section> | 202 |
| game-settings-backdrop | <button> | 203 |
| game-settings-title | <h4> | 208 |
| game-settings-close | <button> | 210 |
| practice-mode | <select> | 219 |
| note-count | <input> | 230 |
| note-count-value | <span> | 231 |
| nice-notes | <input> | 239 |
| chord-rounds | <input> | 252 |
| training-mode | <select> | 277 |
| chord-difficulty | <select> | 292 |
| chord-extra-helpers | <input> | 305 |
| chord-root-hint | <input> | 318 |
| chord-tutorial-open-options | <button> | 330 |
| blind-mode | <input> | 343 |
| hide-live-preview | <input> | 356 |
| typing-show-piano | <input> | 369 |
| typing-show-typed | <input> | 382 |
| primary-action | <button> | 404 |
| play-selected | <button> | 405 |
| quick-start | <section> | 408 |
| keyboard | <div> | 426 |
| white-keys | <div> | 427 |
| black-keys | <div> | 428 |
| pedal-icon | <div> | 433 |
| chord-readout | <section> | 437 |
| typing-zone | <section> | 438 |
| chord-answer | <input> | 442 |
| typing-help-toggle | <button> | 443 |
| status-panel | <section> | 449 |
| round-count | <span> | 451 |
| selected-list | <span> | 452 |
| goal-count | <span> | 453 |
| mode-label | <span> | 454 |
| game-settings-open | <button> | 457 |
| hint-button | <button> | 458 |
| result | <div> | 460 |
| helper-slot | <div> | 461 |
| reveal | <div> | 462 |
| hint-flag | <div> | 463 |
| pedal-tip | <span> | 468 |
| chord-tutorial-modal | <section> | 472 |
| chord-tutorial-backdrop | <button> | 473 |
| chord-tutorial-title | <h4> | 476 |
| chord-tutorial-close | <button> | 477 |
| chord-tutorial-step | <div> | 479 |
| chord-tutorial-current | <div> | 481 |
| chord-tutorial-piano | <div> | 484 |
| tutorial-row-root | <div> | 487 |
| chord-tutorial-root-list | <div> | 489 |
| tutorial-row-quality | <div> | 491 |
| chord-tutorial-quality-list | <div> | 493 |
| chord-tutorial-prev | <button> | 498 |
| chord-tutorial-progress | <span> | 499 |
| chord-tutorial-next | <button> | 500 |
| app-dialog | <section> | 505 |
| app-dialog-backdrop | <button> | 506 |
| app-dialog-title | <h4> | 509 |
| app-dialog-close | <button> | 510 |
| app-dialog-body | <div> | 512 |
| app-dialog-input | <input> | 515 |
| app-dialog-cancel | <button> | 518 |
| app-dialog-confirm | <button> | 519 |

### Script Load Order
| Order | Script | Line |
|---:|---|---:|
| 1 | vendor/libfluidsynth-2.4.6.js?v=20260309103743 | 524 |
| 2 | vendor/js-synthesizer.min.js?v=20260309103743 | 525 |
| 3 | js/core.js?v=20260309103743 | 526 |
| 4 | js/store/reducers.js?v=20260309103743 | 527 |
| 5 | js/store/actions.js?v=20260309103743 | 528 |
| 6 | js/store/selectors.js?v=20260309103743 | 529 |
| 7 | js/store/store.js?v=20260309103743 | 530 |
| 8 | js/features/round/state-mutations.js?v=20260309103743 | 531 |
| 9 | js/features/settings/state-mutations.js?v=20260309103743 | 532 |
| 10 | js/features/chords/index.js?v=20260309103743 | 533 |
| 11 | js/features/typing/index.js?v=20260309103743 | 534 |
| 12 | js/features/tutorial/index.js?v=20260309103743 | 535 |
| 13 | js/features/audio-preview/index.js?v=20260309103743 | 536 |
| 14 | js/features/input/index.js?v=20260309103743 | 537 |
| 15 | js/audio.js?v=20260309103743 | 538 |
| 16 | js/game.js?v=20260309103743 | 539 |
| 17 | js/settings.js?v=20260309103743 | 540 |
| 18 | js/events.js?v=20260309103743 | 541 |

## styles.css Map
File: styles.css (1-3001)

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
| .hero, .actions, .quick-start, .chord-readout, .typing-zone, .status, .tips | 311-314 |
| body:not(.landing) .hero | 316-320 |
| .control | 322-328 |
| .control.compact | 330-332 |
| .control.compact>label | 334-336 |
| .control.compact .control-row | 338-340 |
| .control>label | 342-349 |
| .control-row | 351-355 |
| .control-row.toggle-row | 357-360 |
| .control-row.toggle-row .switch | 362-364 |
| .control-row.toggle-row .unit | 366-368 |
| .control-row.align-end | 370-373 |
| .start-note-row | 375-377 |
| .start-note-stepper | 379-389 |
| .start-note-value | 391-397 |
| .step-btn | 399-411 |
| .step-btn.oct | 413-419 |
| .step-btn:hover | 421-424 |
| .advanced-test | 426-429 |
| .advanced-test .unit | 431-434 |
| input[type="number"] | 436-445 |
| .segmented | 447-451 |
| .segmented-btn | 453-462 |
| .segmented-btn.active | 464-468 |
| .actions | 470-476 |
| .quick-start | 478-484 |
| .quick-mode-btn | 486-499 |
| .quick-mode-btn:hover, .quick-mode-btn:focus-visible | 502-507 |
| .quick-mode-title | 509-515 |
| .quick-mode-sub | 517-521 |
| body:not(.landing) .quick-start | 523-525 |
| .btn | 527-534 |
| .btn:focus-visible | 536-539 |
| .btn.primary | 541-545 |
| .btn.secondary | 547-551 |
| .btn.ghost | 553-557 |
| .btn.submit | 559-563 |
| .btn:hover | 565-567 |
| .chord-readout | 569-587 |
| .chord-readout[hidden] | 589-591 |
| .typing-zone | 593-603 |
| .typing-zone label | 605-612 |
| .typing-zone input[type="text"] | 614-626 |
| .typing-zone input[type="text"]::placeholder | 628-631 |
| .typing-row | 633-636 |
| .typing-input-wrap | 638-640 |
| .typing-help-toggle | 642-659 |
| .typing-help-toggle:hover | 661-664 |
| .typing-help-toggle:focus-visible | 666-669 |
| .typing-help-text | 671-677 |
| .typing-help-text strong | 679-681 |
| .typing-help-actions | 683-685 |
| .typing-learn-btn | 687-697 |
| .typing-learn-btn:hover | 699-701 |
| .typing-learn-btn:focus-visible | 703-706 |
| body.modal-open | 708-710 |
| .tutorial-modal | 712-719 |
| .tutorial-modal[hidden] | 721-723 |
| .tutorial-backdrop | 725-731 |
| .tutorial-card | 733-746 |
| .game-settings-modal | 748-755 |
| .game-settings-modal[hidden] | 757-759 |
| .game-settings-card | 761-773 |
| .game-settings-head | 775-780 |
| .game-settings-kicker | 782-787 |
| .game-settings-grid | 789-793 |
| .game-settings-group | 795-802 |
| .game-settings-group-title | 804-808 |
| .game-settings-group-body | 810-813 |
| .app-dialog | 815-822 |
| .app-dialog[hidden] | 824-826 |
| .app-dialog-card | 828-838 |
| .app-dialog-head | 840-845 |
| .app-dialog-body | 847-851 |
| .app-dialog-input-row | 853-856 |
| .app-dialog-input-row input | 858-865 |
| .app-dialog-actions | 867-871 |
| .tutorial-card.tutorial-overflow-scroll | 873-876 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-step | 878-884 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-lab | 886-893 |
| .tutorial-card.tutorial-fit-1 | 895-898 |
| .tutorial-card.tutorial-fit-1 .tutorial-step | 900-903 |
| .tutorial-card.tutorial-fit-1 .tutorial-lab | 905-908 |
| .tutorial-card.tutorial-fit-1 .tutorial-chip | 910-913 |
| .tutorial-card.tutorial-fit-1 .tutorial-quality-table th | 915-917 |
| .tutorial-card.tutorial-fit-1 .tutorial-piano | 919-924 |
| .tutorial-card.tutorial-fit-2 | 926-929 |
| .tutorial-card.tutorial-fit-2 .tutorial-head h4 | 931-933 |
| .tutorial-card.tutorial-fit-2 .tutorial-step | 935-938 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-title | 940-942 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-body | 944-947 |
| .tutorial-card.tutorial-fit-2 .tutorial-lab | 949-952 |
| .tutorial-card.tutorial-fit-2 .tutorial-current | 954-956 |
| .tutorial-card.tutorial-fit-2 .tutorial-selector-title | 958-960 |
| .tutorial-card.tutorial-fit-2 .tutorial-chip | 962-965 |
| .tutorial-card.tutorial-fit-2 .tutorial-quality-table th | 967-970 |
| .tutorial-card.tutorial-fit-2 .tutorial-piano | 972-977 |
| .tutorial-card.tutorial-fit-2 .tutorial-actions .advanced-trigger | 979-982 |
| .tutorial-card.tutorial-fit-3 | 984-987 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-kicker | 989-991 |
| .tutorial-card.tutorial-fit-3 .tutorial-step | 993-996 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-title | 998-1000 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-body | 1002-1005 |
| .tutorial-card.tutorial-fit-3 .tutorial-lab | 1007-1010 |
| .tutorial-card.tutorial-fit-3 .tutorial-current | 1012-1014 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano-title | 1016-1019 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th | 1021-1024 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th, .tutorial-card.tutorial-... | 1027-1029 |
| .tutorial-card.tutorial-fit-3 .tutorial-chip | 1031-1034 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano | 1036-1041 |
| .tutorial-card.tutorial-fit-3 .tutorial-actions .advanced-trigger | 1043-1046 |
| .tutorial-card.tutorial-fit-3 .tutorial-progress | 1048-1050 |
| .tutorial-head | 1052-1057 |
| .tutorial-head h4 | 1059-1063 |
| .tutorial-close | 1065-1067 |
| .tutorial-step | 1069-1077 |
| .tutorial-step-kicker | 1079-1085 |
| .tutorial-step.focus-flash | 1087-1089 |
| @keyframes tutorial-focus-flash | 1091-1099 |
| .tutorial-step-title | 1101-1104 |
| .tutorial-step-body | 1106-1110 |
| .tutorial-step-body p | 1112-1114 |
| .tutorial-step-body p+p | 1116-1118 |
| .tutorial-example-list | 1120-1125 |
| .tutorial-example-list code | 1127-1133 |
| .tutorial-actions | 1135-1142 |
| .tutorial-progress | 1144-1148 |
| .tutorial-lab | 1150-1159 |
| .tutorial-current | 1161-1165 |
| .tutorial-selector-block | 1167-1170 |
| .tutorial-control-matrix | 1172-1179 |
| .tutorial-control-row | 1181-1189 |
| .tutorial-control-row.locked | 1191-1193 |
| .tutorial-control-row.locked::after | 1195-1202 |
| .tutorial-control-row.newly-unlocked | 1204-1206 |
| @keyframes tutorial-unlock | 1208-1216 |
| .tutorial-selector-title | 1218-1224 |
| .tutorial-chip-list | 1226-1230 |
| #chord-tutorial-quality-list | 1232-1235 |
| .tutorial-quality-table | 1237-1242 |
| .tutorial-quality-table th, .tutorial-quality-table td | 1245-1249 |
| .tutorial-quality-table tr:first-child th, .tutorial-quality-table tr:first-child td | 1252-1254 |
| .tutorial-quality-table th | 1256-1265 |
| .tutorial-chip-group-list | 1267-1271 |
| .tutorial-chip | 1273-1285 |
| .tutorial-chip.unlocked | 1287-1290 |
| .tutorial-chip.unlocked:hover, .tutorial-chip.unlocked:focus-visible | 1293-1296 |
| .tutorial-chip[disabled] | 1298-1302 |
| .tutorial-chip.locked | 1304-1311 |
| .tutorial-chip:hover, .tutorial-chip:focus-visible | 1314-1317 |
| .tutorial-chip.active | 1319-1322 |
| .tutorial-chip.muted | 1324-1327 |
| .tutorial-chip.muted:hover, .tutorial-chip.muted:focus-visible | 1330-1332 |
| .tutorial-chip.newly-unlocked | 1334-1337 |
| .tutorial-chip.locked.newly-unlocked | 1339-1342 |
| .tutorial-piano-wrap | 1344-1349 |
| .tutorial-piano-title | 1351-1358 |
| .tutorial-piano | 1360-1371 |
| .tutorial-key | 1373-1378 |
| .tutorial-key.white | 1380-1388 |
| .tutorial-key.black | 1390-1398 |
| .tutorial-key.tone | 1400-1402 |
| .tutorial-key.tone.root | 1404-1406 |
| .tutorial-key[data-role]::after | 1408-1421 |
| .helper-card | 1423-1430 |
| .helper-title | 1432-1437 |
| .helper-list | 1439-1443 |
| .helper-item | 1445-1456 |
| .helper-item::after | 1458-1466 |
| .helper-item:last-child::after | 1468-1470 |
| .helper-item:hover, .helper-item:focus-within | 1473-1475 |
| @media (hover: hover) and (pointer: fine) | 1477-1483 |
| .app-cursor | 1485-1496 |
| .app-cursor.visible | 1498-1500 |
| .app-cursor-ring, .app-cursor-dot | 1503-1510 |
| .app-cursor-ring | 1512-1520 |
| .app-cursor-dot | 1522-1526 |
| .app-cursor.is-interactive .app-cursor-ring | 1528-1533 |
| .app-cursor.is-interactive .app-cursor-dot | 1535-1537 |
| .app-cursor.is-text .app-cursor-ring | 1539-1544 |
| .app-cursor.is-pressed .app-cursor-ring | 1546-1548 |
| .app-cursor.is-pressed .app-cursor-dot | 1550-1552 |
| .helper-label | 1554-1560 |
| .helper-item .helper-value | 1562-1570 |
| .helper-item .helper-mask | 1572-1580 |
| .helper-item .helper-real | 1582-1594 |
| .helper-item:hover .helper-mask, .helper-item:focus-within .helper-mask | 1597-1600 |
| .helper-item:hover .helper-real, .helper-item:focus-within .helper-real | 1603-1606 |
| .typing-zone[hidden] | 1608-1610 |
| .status | 1612-1623 |
| .status[hidden] | 1625-1627 |
| .helper-slot[hidden] | 1629-1631 |
| .status-actions | 1633-1639 |
| .hint-flag | 1641-1654 |
| .hint-flag[hidden] | 1656-1658 |
| .hint-button | 1660-1662 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) | 1664-1678 |
| .settings-toggle | 1680-1682 |
| .theme-toggle | 1684-1686 |
| .home-toggle | 1688-1690 |
| :is(.settings-toggle, .theme-toggle, .home-toggle):hover | 1692-1694 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) svg | 1696-1700 |
| .settings-toggle svg | 1702-1705 |
| .settings-panel | 1707-1726 |
| .settings-panel.open | 1728-1732 |
| .settings-panel h2 | 1734-1739 |
| .settings-body | 1741-1745 |
| .settings-grid | 1747-1750 |
| .settings-section-title | 1752-1760 |
| .panel-trigger, .advanced-trigger, .dropdown-trigger, .control select | 1765-1774 |
| .advanced-trigger | 1776-1780 |
| .dropdown-trigger | 1782-1790 |
| .dropdown-trigger svg | 1792-1796 |
| .panel-trigger | 1798-1803 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger):hover | 1805-1808 |
| .panel-trigger:hover | 1810-1812 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger)[aria-expanded="true"] | 1814-1817 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger, .control select):focus-v... | 1819-1822 |
| .control select | 1824-1828 |
| .options-panel | 1830-1846 |
| .options-panel.open | 1848-1852 |
| .options-panel h3 | 1854-1861 |
| .options-grid | 1863-1866 |
| .options-panel .control | 1868-1874 |
| .options-panel .control.compact | 1876-1878 |
| .options-panel .control>label | 1880-1882 |
| .options-section-title | 1884-1893 |
| .options-panel .options-section-title:first-child | 1895-1899 |
| .advanced-panel | 1901-1920 |
| .advanced-panel.open | 1922-1926 |
| .advanced-panel h3 | 1928-1933 |
| .advanced-grid | 1935-1944 |
| .advanced-grid::-webkit-scrollbar | 1946-1948 |
| .advanced-grid::-webkit-scrollbar-track | 1950-1953 |
| .advanced-grid::-webkit-scrollbar-thumb | 1955-1959 |
| .inline-value | 1961-1968 |
| .slider-stack | 1970-1973 |
| .slider-stack input[type="range"] | 1975-1979 |
| .slider-ghost | 1981-1995 |
| .slider-ghost.visible | 1997-1999 |
| .sf2-browser | 2001-2004 |
| .sf2-browser input[type="text"] | 2006-2015 |
| .sf2-preset-list | 2017-2030 |
| .sf2-browser .piano-desc | 2032-2035 |
| .sf2-browser .piano-desc.pending, .profile-browser .piano-desc.pending | 2038-2040 |
| .sf2-group | 2042-2047 |
| .sf2-group-title | 2049-2058 |
| .sf2-row | 2060-2068 |
| .sf2-row:first-child | 2070-2072 |
| .sf2-row:hover | 2074-2076 |
| .sf2-row.active | 2078-2081 |
| .sf2-row-name | 2083-2089 |
| .sf2-row-program, .sf2-row-bank | 2092-2096 |
| .sf2-empty | 2098-2102 |
| .profile-browser | 2104-2107 |
| .profile-browser input[type="text"] | 2109-2118 |
| .profile-list | 2120-2133 |
| .profile-row | 2135-2145 |
| .profile-row:hover | 2147-2149 |
| .profile-row.active | 2151-2154 |
| .profile-row.applied | 2156-2158 |
| .profile-row-name | 2160-2166 |
| .profile-row-kind | 2168-2173 |
| .advanced-footer | 2175-2181 |
| .piano-preview.wide | 2183-2195 |
| .piano-preview.wide::before | 2197-2199 |
| .piano-preview.wide .play-icon | 2201-2207 |
| .piano-preview.wide .play-label | 2209-2211 |
| .instrument-browser-panel | 2213-2228 |
| .instrument-browser-panel.open | 2230-2234 |
| .instrument-browser-panel h3 | 2236-2241 |
| .piano-panel | 2243-2258 |
| .piano-panel.open | 2260-2264 |
| .piano-panel h3 | 2266-2271 |
| .piano-options | 2273-2276 |
| .piano-option | 2278-2290 |
| .piano-option.active | 2292-2295 |
| .piano-option:focus-visible | 2297-2299 |
| .piano-info | 2301-2304 |
| .piano-name | 2306-2309 |
| .piano-desc | 2311-2314 |
| .piano-option.simple .piano-name | 2316-2320 |
| .piano-option.simple .piano-desc | 2322-2326 |
| .piano-preview | 2328-2343 |
| .piano-preview::before | 2345-2353 |
| .piano-preview:active | 2355-2358 |
| .piano-preview.main | 2360-2364 |
| .settings-grid input[type="range"], .advanced-panel input[type="range"], .options-... | 2368-2372 |
| .settings-grid input[type="range"]::-webkit-slider-runnable-track, .advanced-panel... | 2376-2381 |
| .settings-grid input[type="range"]::-webkit-slider-thumb, .advanced-panel input[ty... | 2385-2394 |
| .settings-grid input[type="range"]:focus-visible::-webkit-slider-thumb, .advanced-... | 2398-2401 |
| .settings-grid input[type="range"]::-moz-range-track, .advanced-panel input[type="... | 2405-2410 |
| .settings-grid input[type="range"]::-moz-range-thumb, .advanced-panel input[type="... | 2414-2421 |
| .settings-grid input[type="range"]:focus-visible::-moz-range-thumb, .advanced-pane... | 2425-2428 |
| .volume-value | 2430-2433 |
| .status-row | 2435-2440 |
| .switch | 2442-2451 |
| .switch input | 2453-2458 |
| .switch-track | 2460-2466 |
| .switch-thumb | 2468-2478 |
| .switch input:checked+.switch-track | 2480-2482 |
| .switch input:checked+.switch-track .switch-thumb | 2484-2486 |
| .switch input:focus-visible+.switch-track | 2488-2491 |
| .control.compact .unit | 2493-2495 |
| .test-tone | 2497-2509 |
| .test-tone:hover | 2511-2514 |
| .test-tone:active | 2516-2518 |
| .test-tone-icon | 2520-2527 |
| .test-tone-label | 2529-2533 |
| .result | 2535-2539 |
| .reveal | 2541-2550 |
| .reveal strong | 2552-2554 |
| .reveal-label | 2556-2563 |
| .reveal-grid.compact | 2565-2569 |
| .reveal-cell | 2571-2573 |
| .keyboard-zone | 2575-2585 |
| .keyboard-stack | 2587-2597 |
| .keyboard-wrapper | 2599-2608 |
| .keyboard | 2610-2617 |
| .keyboard-wrapper.ends-black | 2619-2621 |
| .white-keys | 2623-2626 |
| .black-keys | 2628-2635 |
| .key | 2637-2648 |
| .key.white | 2650-2657 |
| .key.white.has-black | 2659-2661 |
| .key.black | 2663-2672 |
| .key span | 2674-2678 |
| .key.black span | 2680-2684 |
| .key.active | 2686-2689 |
| .key.black.active | 2691-2694 |
| .key.selected | 2696-2700 |
| .key.typed-preview | 2702-2704 |
| .key.correct | 2706-2710 |
| .key.wrong | 2712-2716 |
| .key.missed | 2718-2724 |
| .key.black.selected, .key.black.correct, .key.black.wrong | 2728-2730 |
| .key.black.missed | 2732-2738 |
| .keyboard.disabled | 2740-2746 |
| body.tutorial-open .keyboard | 2748-2750 |
| body.tutorial-open .keyboard.disabled | 2752-2755 |
| .keyboard.disabled::before | 2757-2769 |
| body.tutorial-open .keyboard.disabled::before | 2771-2773 |
| .keyboard.disabled::after | 2775-2809 |
| body.tutorial-open .keyboard.disabled::after | 2811-2813 |
| .tips | 2815-2824 |
| #pedal-tip[hidden] | 2826-2828 |
| .pedal-box | 2830-2844 |
| body.landing .pedal-box | 2846-2848 |
| .pedal-label | 2850-2860 |
| .pedal-icon | 2862-2869 |
| .pedal-icon.active | 2871-2874 |
| .note-pills | 2876-2882 |
| .note-pill | 2884-2890 |
| .note-pill.good | 2892-2896 |
| .note-pill.bad | 2898-2902 |
| .note-pill.missed | 2904-2908 |
| .note-pill.neutral | 2910-2914 |
| @media (max-width: 700px) | 2916-2971 |
| @media (max-height: 820px) | 2973-2994 |
| @media (max-height: 700px) | 2996-3001 |

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
File lines: 1-1037

| Symbol | Lines |
|---|---|
| normalizePracticeProfile | 412-432 |
| normalizePracticeProfiles | 433-440 |
| isTypingOnlyModeFromState | 444-444 |
| getEffectiveBlindModeFromState | 448-448 |
| getEffectivePracticeModeFromState | 449-457 |
| capturePracticeProfileFromState | 458-479 |
| clampEnvelopeValue | 578-578 |
| resolveEnvelopeMetrics | 591-626 |
| saveSettings | 640-670 |
| loadSettings | 672-726 |
| resetAllSettings | 728-760 |
| buildNotes | 808-823 |
| getNoteIdByMidi | 825-832 |
| isConsonant | 850-853 |
| getNicePool | 855-855 |
| getNoteCountMax | 857-861 |
| updateNoteCountMax | 863-871 |
| getCssNumber | 873-873 |
| clamp | 874-874 |
| getMaxStartMidi | 875-875 |
| clampStartMidi | 876-876 |
| getMidiLabel | 877-881 |
| getPanelBottomGap | 882-885 |
| normalizeSoundfontDefinition | 887-905 |
| setSoundfontCatalog | 907-928 |
| getSoundfontList | 930-930 |
| renderPianoOptions | 932-976 |
| createKey | 978-989 |
| renderKeyboard | 991-1023 |
| rebuildKeyboard | 1025-1036 |

### js/events.js (Active Runtime)
File lines: 1-1955

| Symbol | Lines |
|---|---|
| primeAudioFromGesture | 5-14 |
| shouldRestartRoundForSetting | 27-30 |
| patchSettingsState | 32-38 |
| isChordTutorialOpen | 576-576 |
| fitTutorialLayout | 579-607 |
| clearFitClasses | 585-588 |
| applyFitClass | 590-595 |
| getTutorialStep | 609-614 |
| getStepUnlockedRootSet | 616-624 |
| getStepUnlockedQualitySet | 626-632 |
| isTutorialRootEnabled | 634-634 |
| isTutorialQualityEnabled | 635-635 |
| getTutorialRootLabel | 637-640 |
| midiToTutorialLabel | 642-646 |
| getClosestNoteIdFromMidi | 648-655 |
| getTutorialRenderedChord | 657-679 |
| ensureTutorialKeyboard | 681-719 |
| getStepAllowedQualityIds | 721-723 |
| getTutorialActiveSpec | 725-727 |
| renderTutorialCurrentText | 729-740 |
| renderTutorialPianoHighlight | 742-776 |
| renderTutorialRootOptions | 778-796 |
| renderTutorialQualityOptions | 798-843 |
| syncTutorialRootChipStates | 845-864 |
| syncTutorialQualityChipStates | 866-885 |
| setTutorialHoverSpec | 887-894 |
| clearTutorialHoverSpec | 896-899 |
| refreshTutorialVisuals | 901-905 |
| renderChordTutorialStep | 935-990 |
| closeChordTutorial | 992-1005 |
| openChordTutorial | 1007-1032 |
| registerTutorialOpenTrigger | 1034-1041 |
| isChordTypingCaptureActive | 1164-1169 |
| insertTypedCharacter | 1171-1178 |
| triggerPrimaryAction | 1181-1190 |
| getButtonLikeTarget | 1193-1193 |
| blurPointerActivatedControl | 1194-1201 |
| ensureCustomCursorEl | 1211-1228 |
| getCustomCursorMode | 1229-1238 |
| renderCustomCursor | 1246-1254 |
| scheduleCustomCursorRender | 1255-1258 |
| setCustomCursorEnabled | 1259-1272 |
| updateCustomCursorPosition | 1273-1280 |
| triggerReplayAction | 1282-1288 |
| bindPianoOptionEvents | 1448-1473 |
| applyCustomCursorMediaState | 1591-1593 |
| isElementVisible | 1608-1614 |
| getFocusableElements | 1616-1620 |
| focusFirstInModal | 1626-1632 |
| trapModalFocus | 1634-1656 |
| isTextEditableTarget | 1658-1663 |
| getActiveModalEl | 1665-1670 |
| closeGameSettingsModal | 1672-1681 |
| openGameSettingsModal | 1683-1689 |
| closeActiveModal | 1691-1705 |
| moveFocusInPanel | 1707-1718 |
| setRandomBackgroundAngle | 1908-1911 |
| init | 1913-1949 |
| runDeferredCatalogLoad | 1933-1942 |

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
| chordExtraHelpersToggle | change | 184 |
| chordRootHintToggle | change | 194 |
| typingShowPianoToggle | change | 204 |
| typingShowTypedToggle | change | 214 |
| resetSettingsButton | click | 226 |
| settingsToggle | click | 240 |
| themeToggle | click | 249 |
| homeToggle | click | 260 |
| settingsPanel | click | 269 |
| optionsTrigger | click | 291 |
| gameSettingsOpen | click | 298 |
| gameSettingsBackdrop | click | 305 |
| gameSettingsClose | click | 312 |
| document | click | 318 |
| window | resize | 322 |
| playSelectedButton | click | 332 |
| playSelectedButton | pointerdown | 336 |
| playSelectedButton | pointerup | 341 |
| playSelectedButton | pointerleave | 345 |
| primaryActionButton | click | 349 |
| volumeSlider | input | 357 |
| lengthSlider | input | 363 |
| attackSlider | input | 369 |
| decaySlider | input | 375 |
| releaseSlider | input | 381 |
| sustainSlider | input | 387 |
| keyCountSlider | input | 393 |
| keyCountSlider | change | 400 |
| keyCountSlider | pointerup | 404 |
| hintButton | click | 408 |
| chordAnswerInput | input | 413 |
| chordAnswerInput | keydown | 420 |
| triggerEl | click | 1036 |
| chordTutorialClose | click | 1047 |
| chordTutorialBackdrop | click | 1054 |
| chordTutorialPrev | click | 1060 |
| chordTutorialNext | click | 1068 |
| chordTutorialRootList | mouseover | 1080 |
| chordTutorialRootList | mouseleave | 1088 |
| chordTutorialRootList | focusin | 1091 |
| chordTutorialRootList | focusout | 1099 |
| chordTutorialRootList | click | 1102 |
| chordTutorialQualityList | mouseover | 1118 |
| chordTutorialQualityList | mouseleave | 1125 |
| chordTutorialQualityList | focusin | 1128 |
| chordTutorialQualityList | focusout | 1135 |
| chordTutorialQualityList | click | 1138 |
| volumeSlider | dblclick | 1290 |
| lengthSlider | dblclick | 1294 |
| keyCountSlider | dblclick | 1298 |
| startNoteDownButton | click | 1304 |
| startNoteUpButton | click | 1307 |
| startNoteDownOctButton | click | 1313 |
| startNoteUpOctButton | click | 1316 |
| noteCountInput | dblclick | 1321 |
| attackSlider | dblclick | 1329 |
| decaySlider | dblclick | 1333 |
| releaseSlider | dblclick | 1337 |
| sustainSlider | dblclick | 1341 |
| profileSearch | input | 1346 |
| profileList | click | 1352 |
| profileList | dblclick | 1357 |
| profileList | keydown | 1360 |
| profileApply | click | 1371 |
| profileSave | click | 1377 |
| instrumentPresetSearch | input | 1383 |
| instrumentPresetList | click | 1389 |
| instrumentPresetList | dblclick | 1394 |
| instrumentPresetList | keydown | 1397 |
| instrumentPresetApply | click | 1408 |
| advancedTrigger | click | 1413 |
| advancedPanel | click | 1418 |
| pianoTrigger | click | 1423 |
| pianoPanel | click | 1430 |
| instrumentBrowserTrigger | click | 1436 |
| instrumentBrowserPanel | click | 1443 |
| pianoOptionsContainer | click | 1451 |
| pianoOptionsContainer | keydown | 1465 |
| pianoPreviewMain | click | 1476 |
| testEnvelopeButton | click | 1483 |
| keyboardEl | pointerdown | 1488 |
| document | pointerup | 1524 |
| document | pointercancel | 1531 |
| document | pointerdown | 1538 |
| document | click | 1544 |
| document | pointermove | 1548 |
| document | pointerup | 1552 |
| document | pointercancel | 1557 |
| document | pointerover | 1562 |
| document | pointerout | 1568 |
| window | blur | 1577 |
| document | visibilitychange | 1583 |
| CUSTOM_CURSOR_QUERY | change | 1595 |
| keyboardEl | click | 1601 |
| document | keydown | 1720 |
| document | keyup | 1856 |
| pedalBox | pointerdown | 1875 |
| pedalBox | pointerup | 1884 |
| pedalBox | pointercancel | 1893 |
| pedalBox | pointerleave | 1901 |

### js/game.js (Active Runtime)
File lines: 1-2048

| Symbol | Lines |
|---|---|
| applyRoundStatePatch | 137-146 |
| applySubmissionStatePatch | 148-157 |
| normalizeQualityToken | 159-176 |
| getKeyboardZoneEl | 211-211 |
| normalizePitchClass | 212-212 |
| getRootName | 213-213 |
| getMidiFromNoteId | 214-214 |
| buildChordLabel | 215-215 |
| getPitchClassSetFromNoteIds | 217-225 |
| getRootGuideNoteId | 231-246 |
| getEffectiveKeyboardSelection | 248-260 |
| getChordDifficultyId | 262-267 |
| getChordDifficultyConfig | 269-272 |
| getAllowedChordQualities | 274-279 |
| getChordQualityHint | 281-284 |
| getConsistentPreviewDuration | 292-295 |
| playConsistentPreview | 301-319 |
| releaseInteractivePressSession | 356-384 |
| getReplayNoteIds | 386-410 |
| getVoicingHintLabel | 412-416 |
| randomSample | 418-425 |
| getNiceTarget | 427-464 |
| getQualityPitchClassSet | 466-472 |
| parseChordInput | 474-513 |
| detectChordFromNoteIds | 515-551 |
| normalizeIntervals | 553-555 |
| fitIntervalsToAvailableRange | 557-577 |
| buildVoicedIntervals | 579-607 |
| chooseRootCandidatesForIntervals | 609-618 |
| buildChordFromRoot | 620-648 |
| createChordTarget | 650-700 |
| createNoteTarget | 702-737 |
| createTarget | 739-746 |
| clearTypingAutoNext | 748-752 |
| ensureRoundPlaybackReady | 763-780 |
| getTypedPreviewNoteIds | 782-816 |
| updateTypedPreviewFromInput | 818-831 |
| updateChordReadout | 833-889 |
| updateModeVisibility | 891-908 |
| updatePrimaryAction | 910-915 |
| updateReplayAvailability | 917-924 |
| getChordHelperHints | 926-944 |
| createDeterministicHelperMask | 962-990 |
| renderChordHelperBox | 992-1010 |
| updateStatus | 1012-1121 |
| updateKeyStates | 1123-1184 |
| setKeyboardEnabled | 1186-1189 |
| updateKeyboardScale | 1191-1202 |
| lockKeyboardForPlayback | 1204-1217 |
| setSubmitted | 1219-1226 |
| goHome | 1228-1280 |
| refreshTarget | 1282-1308 |
| startRound | 1310-1386 |
| ensureRound | 1388-1397 |
| playTarget | 1399-1413 |
| startManualNote | 1415-1433 |
| releaseManualNote | 1435-1443 |
| releasePedalNotes | 1445-1455 |
| startPedalHold | 1457-1463 |
| stopPedalHold | 1465-1472 |
| toggleSelection | 1474-1518 |
| isSelectionCorrect | 1520-1537 |
| getPlaybackSpan | 1539-1544 |
| renderNotePills | 1546-1552 |
| renderChordPill | 1554-1557 |
| renderTonePills | 1559-1567 |
| renderRevealCell | 1569-1572 |
| renderChordRevealGrid | 1574-1577 |
| renderChordDetectionMeta | 1579-1583 |
| renderPressedPills | 1585-1590 |
| buildNoteComparison | 1592-1599 |
| buildAnswerNoteCell | 1601-1609 |
| buildTargetNoteCell | 1611-1623 |
| getSubmittedReplaySnapshot | 1653-1667 |
| playSubmittedReplaySequence | 1669-1682 |
| playRevealSequence | 1684-1734 |
| playSelectedChord | 1736-1760 |
| playTypedInputChord | 1762-1775 |
| startHeldPlayback | 1777-1803 |
| releaseHeldPlayback | 1805-1819 |
| buildTypingRevealDetail | 1821-1839 |
| submitTypedAnswer | 1841-1914 |
| submitAnswer | 1916-1979 |
| sanitizeRoundStateForKeyboardRange | 1981-2021 |

### js/settings.js (Active Runtime)
File lines: 1-1418

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
| setKeyCount | 859-877 |
| setStartMidi | 879-888 |
| setKeyCountVisual | 890-894 |
| refreshOptionsModeVisibility | 903-925 |
| setPracticeMode | 927-1012 |
| applyUiFromState | 1014-1078 |
| commitCriticalChange | 1085-1090 |
| commitNoteCountChange | 1092-1101 |
| handleCriticalSettingChange | 1103-1117 |
| openSettings | 1119-1124 |
| positionFloatingPanel | 1126-1155 |
| setGameSettingsModalOpenState | 1157-1167 |
| isGameSettingsModalOpen | 1169-1169 |
| openGameSettingsModal | 1171-1182 |
| closeGameSettingsModal | 1184-1192 |
| positionPianoPanel | 1194-1197 |
| positionInstrumentBrowserPanel | 1199-1202 |
| getFloatingPanelConfig | 1207-1239 |
| isFloatingPanelOpen | 1241-1244 |
| setFloatingPanelOpenState | 1246-1251 |
| closeFloatingPanel | 1257-1270 |
| closeAllFloatingPanels | 1272-1278 |
| openFloatingPanel | 1280-1305 |
| toggleFloatingPanel | 1307-1312 |
| repositionOpenFloatingPanels | 1314-1322 |
| openOptionsPanel | 1324-1324 |
| closeOptionsPanel | 1325-1325 |
| openAdvanced | 1326-1326 |
| closeAdvanced | 1327-1327 |
| openPianoPanel | 1328-1328 |
| closePianoPanel | 1329-1329 |
| openInstrumentBrowser | 1330-1330 |
| closeInstrumentBrowser | 1331-1331 |
| closeSettings | 1333-1351 |

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

