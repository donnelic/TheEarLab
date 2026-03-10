# Project Map

Generated: 2026-03-10 11:27:53 +01:00

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
| index.html | HTML | Loaded directly | Yes | 547 |
| styles.css | CSS | Loaded directly | Yes | 3101 |
| js/audio.js | JavaScript | Browser runtime module | Yes | 1529 |
| js/core.js | JavaScript | Browser runtime module | Yes | 1039 |
| js/events.js | JavaScript | Browser runtime module | Yes | 2055 |
| js/game.js | JavaScript | Browser runtime module | Yes | 2098 |
| js/settings.js | JavaScript | Browser runtime module | Yes | 1418 |
| README.md | Markdown | Human + AI onboarding | Yes | 135 |
| IMPLEMENTATION_CHECKLIST.md | Markdown | Implementation roadmap checklist | Yes | 237 |
| AGENTS.md | Markdown | AI instruction override | Yes | 47 |
| PROJECT_MAP.md | Markdown | Generated reference map | Yes | 1149 |
| tools/generate-project-map.ps1 | PowerShell | Documentation generator | Yes | 540 |
| tools/smoke-checklist.md | Markdown | Manual regression checklist | Yes | 59 |
| soundfonts/GeneralUser-GS.sf2 | Asset | Soundfont asset | Yes | 0 |
| soundfonts/index.json | JSON | Soundfont asset | Yes | 3 |
| soundfonts/README.md | Markdown | Soundfont asset | Yes | 39 |

## index.html Map
File: index.html (1-547)

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
| chord-readout | <section> | 438 |
| typing-zone | <section> | 439 |
| chord-answer | <input> | 443 |
| typing-help-toggle | <button> | 444 |
| status-panel | <section> | 450 |
| round-count | <span> | 452 |
| selected-list | <span> | 453 |
| goal-count | <span> | 454 |
| mode-label | <span> | 455 |
| game-settings-open | <button> | 458 |
| hint-button | <button> | 459 |
| result | <div> | 461 |
| helper-slot | <div> | 462 |
| reveal | <div> | 463 |
| hint-flag | <div> | 464 |
| pedal-tip | <span> | 470 |
| chord-tutorial-modal | <section> | 474 |
| chord-tutorial-backdrop | <button> | 475 |
| chord-tutorial-title | <h4> | 478 |
| chord-tutorial-close | <button> | 479 |
| chord-tutorial-step | <div> | 481 |
| chord-tutorial-tabs | <div> | 482 |
| chord-tutorial-current | <div> | 484 |
| chord-tutorial-piano | <div> | 487 |
| tutorial-row-root | <div> | 490 |
| chord-tutorial-root-list | <div> | 492 |
| tutorial-row-quality | <div> | 494 |
| chord-tutorial-quality-list | <div> | 496 |
| chord-tutorial-prev | <button> | 501 |
| chord-tutorial-progress | <span> | 502 |
| chord-tutorial-next | <button> | 503 |
| app-dialog | <section> | 508 |
| app-dialog-backdrop | <button> | 509 |
| app-dialog-title | <h4> | 512 |
| app-dialog-close | <button> | 513 |
| app-dialog-body | <div> | 515 |
| app-dialog-input | <input> | 518 |
| app-dialog-cancel | <button> | 521 |
| app-dialog-confirm | <button> | 522 |

### Script Load Order
| Order | Script | Line |
|---:|---|---:|
| 1 | vendor/libfluidsynth-2.4.6.js?v=20260310104635 | 527 |
| 2 | vendor/js-synthesizer.min.js?v=20260310104635 | 528 |
| 3 | js/core.js?v=20260310104635 | 529 |
| 4 | js/store/reducers.js?v=20260310104635 | 530 |
| 5 | js/store/actions.js?v=20260310104635 | 531 |
| 6 | js/store/selectors.js?v=20260310104635 | 532 |
| 7 | js/store/store.js?v=20260310104635 | 533 |
| 8 | js/features/round/state-mutations.js?v=20260310104635 | 534 |
| 9 | js/features/settings/state-mutations.js?v=20260310104635 | 535 |
| 10 | js/features/chords/index.js?v=20260310104635 | 536 |
| 11 | js/features/typing/index.js?v=20260310104635 | 537 |
| 12 | js/features/tutorial/index.js?v=20260310104635 | 538 |
| 13 | js/features/audio-preview/index.js?v=20260310104635 | 539 |
| 14 | js/features/input/index.js?v=20260310104635 | 540 |
| 15 | js/audio.js?v=20260310104635 | 541 |
| 16 | js/game.js?v=20260310104635 | 542 |
| 17 | js/settings.js?v=20260310104635 | 543 |
| 18 | js/events.js?v=20260310104635 | 544 |

## styles.css Map
File: styles.css (1-3101)

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
| .start-note-value | 389-395 |
| .step-btn | 397-409 |
| .step-btn.oct | 411-417 |
| .step-btn:hover | 419-422 |
| .advanced-test | 424-427 |
| .advanced-test .unit | 429-432 |
| input[type="number"] | 434-443 |
| .segmented | 445-449 |
| .segmented-btn | 451-460 |
| .segmented-btn.active | 462-466 |
| .actions | 468-474 |
| .quick-start | 476-482 |
| .quick-mode-btn | 484-497 |
| .quick-mode-btn:hover, .quick-mode-btn:focus-visible | 500-505 |
| .quick-mode-title | 507-513 |
| .quick-mode-sub | 515-519 |
| body:not(.landing) .quick-start | 521-523 |
| .btn | 525-532 |
| .btn:focus-visible | 534-537 |
| .btn.primary | 539-543 |
| .btn.secondary | 545-549 |
| .btn.ghost | 551-555 |
| .btn.submit | 557-561 |
| .btn:hover | 563-565 |
| .chord-readout | 567-586 |
| .chord-link | 588-595 |
| .chord-link::after | 597-618 |
| .chord-link:hover::after, .chord-link:focus-visible::after, .chord-link:focus-with... | 622-625 |
| .chord-link:focus-visible | 627-630 |
| .chord-label-suffix, .chord-divider | 633-636 |
| .chord-readout[hidden] | 638-640 |
| .typing-zone | 642-653 |
| .game-stack | 655-660 |
| .typing-zone label | 662-669 |
| .typing-zone input[type="text"] | 671-683 |
| .typing-zone input[type="text"]::placeholder | 685-688 |
| .typing-row | 690-693 |
| .typing-input-wrap | 695-697 |
| .typing-help-toggle | 699-716 |
| .typing-help-toggle:hover | 718-721 |
| .typing-help-toggle:focus-visible | 723-726 |
| .typing-help-text | 728-734 |
| .typing-help-text strong | 736-738 |
| .typing-help-actions | 740-742 |
| .typing-learn-btn | 744-754 |
| .typing-learn-btn:hover | 756-758 |
| .typing-learn-btn:focus-visible | 760-763 |
| body.modal-open | 765-767 |
| .tutorial-modal | 769-776 |
| .tutorial-modal[hidden] | 778-780 |
| .tutorial-backdrop | 782-788 |
| .tutorial-card | 790-803 |
| .game-settings-modal | 805-812 |
| .game-settings-modal[hidden] | 814-816 |
| .game-settings-card | 818-830 |
| .game-settings-head | 832-837 |
| .game-settings-kicker | 839-844 |
| .game-settings-grid | 846-850 |
| .game-settings-group | 852-859 |
| .game-settings-group-title | 861-865 |
| .game-settings-group-body | 867-870 |
| .app-dialog | 872-879 |
| .app-dialog[hidden] | 881-883 |
| .app-dialog-card | 885-895 |
| .app-dialog-head | 897-902 |
| .app-dialog-body | 904-908 |
| .app-dialog-input-row | 910-913 |
| .app-dialog-input-row input | 915-922 |
| .app-dialog-actions | 924-928 |
| .tutorial-card.tutorial-overflow-scroll | 930-933 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-step | 935-941 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-lab | 943-950 |
| .tutorial-card.tutorial-fit-1 | 952-955 |
| .tutorial-card.tutorial-fit-1 .tutorial-step | 957-960 |
| .tutorial-card.tutorial-fit-1 .tutorial-lab | 962-965 |
| .tutorial-card.tutorial-fit-1 .tutorial-chip | 967-970 |
| .tutorial-card.tutorial-fit-1 .tutorial-quality-table th | 972-974 |
| .tutorial-card.tutorial-fit-1 .tutorial-piano | 976-981 |
| .tutorial-card.tutorial-fit-2 | 983-986 |
| .tutorial-card.tutorial-fit-2 .tutorial-head h4 | 988-990 |
| .tutorial-card.tutorial-fit-2 .tutorial-step | 992-995 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-title | 997-999 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-body | 1001-1004 |
| .tutorial-card.tutorial-fit-2 .tutorial-lab | 1006-1009 |
| .tutorial-card.tutorial-fit-2 .tutorial-current | 1011-1013 |
| .tutorial-card.tutorial-fit-2 .tutorial-selector-title | 1015-1017 |
| .tutorial-card.tutorial-fit-2 .tutorial-chip | 1019-1022 |
| .tutorial-card.tutorial-fit-2 .tutorial-quality-table th | 1024-1027 |
| .tutorial-card.tutorial-fit-2 .tutorial-piano | 1029-1034 |
| .tutorial-card.tutorial-fit-2 .tutorial-actions .advanced-trigger | 1036-1039 |
| .tutorial-card.tutorial-fit-3 | 1041-1044 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-kicker | 1046-1048 |
| .tutorial-card.tutorial-fit-3 .tutorial-step | 1050-1053 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-title | 1055-1057 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-body | 1059-1062 |
| .tutorial-card.tutorial-fit-3 .tutorial-lab | 1064-1067 |
| .tutorial-card.tutorial-fit-3 .tutorial-current | 1069-1071 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano-title | 1073-1076 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th | 1078-1081 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th, .tutorial-card.tutorial-... | 1084-1086 |
| .tutorial-card.tutorial-fit-3 .tutorial-chip | 1088-1091 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano | 1093-1098 |
| .tutorial-card.tutorial-fit-3 .tutorial-actions .advanced-trigger | 1100-1103 |
| .tutorial-card.tutorial-fit-3 .tutorial-progress | 1105-1107 |
| .tutorial-head | 1109-1114 |
| .tutorial-head h4 | 1116-1120 |
| .tutorial-close | 1122-1124 |
| .tutorial-step | 1126-1134 |
| .tutorial-step-kicker | 1136-1142 |
| .tutorial-step.focus-flash | 1144-1146 |
| @keyframes tutorial-focus-flash | 1148-1156 |
| .tutorial-step-title | 1158-1161 |
| .tutorial-step-body | 1163-1167 |
| .tutorial-step-body p | 1169-1171 |
| .tutorial-step-body p+p | 1173-1175 |
| .tutorial-example-list | 1177-1182 |
| .tutorial-example-list code | 1184-1190 |
| .tutorial-actions | 1192-1199 |
| .tutorial-progress | 1201-1205 |
| .tutorial-progress-tabs | 1207-1216 |
| .tutorial-progress-tab | 1218-1230 |
| .tutorial-progress-tab:last-child | 1232-1234 |
| .tutorial-progress-tab.complete | 1236-1238 |
| .tutorial-progress-tab.active | 1240-1243 |
| .tutorial-progress-tab:focus-visible | 1245-1248 |
| .tutorial-lab | 1250-1259 |
| .tutorial-current | 1261-1265 |
| .tutorial-selector-block | 1267-1270 |
| .tutorial-control-matrix | 1272-1279 |
| .tutorial-control-row | 1281-1289 |
| .tutorial-control-row.locked | 1291-1293 |
| .tutorial-control-row.locked::after | 1295-1302 |
| .tutorial-control-row.newly-unlocked | 1304-1306 |
| @keyframes tutorial-unlock | 1308-1316 |
| .tutorial-selector-title | 1318-1324 |
| .tutorial-chip-list | 1326-1330 |
| #chord-tutorial-quality-list | 1332-1335 |
| .tutorial-quality-table | 1337-1342 |
| .tutorial-quality-table th, .tutorial-quality-table td | 1345-1349 |
| .tutorial-quality-table tr:first-child th, .tutorial-quality-table tr:first-child td | 1352-1354 |
| .tutorial-quality-table th | 1356-1365 |
| .tutorial-chip-group-list | 1367-1371 |
| .tutorial-chip | 1373-1385 |
| .tutorial-chip.unlocked | 1387-1390 |
| .tutorial-chip.unlocked:hover, .tutorial-chip.unlocked:focus-visible | 1393-1396 |
| .tutorial-chip[disabled] | 1398-1402 |
| .tutorial-chip.locked | 1404-1411 |
| .tutorial-chip:hover, .tutorial-chip:focus-visible | 1414-1417 |
| .tutorial-chip.active | 1419-1422 |
| .tutorial-chip.muted | 1424-1427 |
| .tutorial-chip.muted:hover, .tutorial-chip.muted:focus-visible | 1430-1432 |
| .tutorial-chip.newly-unlocked | 1434-1437 |
| .tutorial-chip.locked.newly-unlocked | 1439-1442 |
| .tutorial-piano-wrap | 1444-1449 |
| .tutorial-piano-title | 1451-1458 |
| .tutorial-piano | 1460-1471 |
| .tutorial-key | 1473-1478 |
| .tutorial-key.white | 1480-1488 |
| .tutorial-key.black | 1490-1498 |
| .tutorial-key.tone | 1500-1502 |
| .tutorial-key.tone.root | 1504-1506 |
| .tutorial-key[data-role]::after | 1508-1521 |
| .helper-card | 1523-1530 |
| .helper-title | 1532-1537 |
| .helper-list | 1539-1543 |
| .helper-item | 1545-1556 |
| .helper-item::after | 1558-1566 |
| .helper-item:last-child::after | 1568-1570 |
| .helper-item:hover, .helper-item:focus-within | 1573-1575 |
| @media (hover: hover) and (pointer: fine) | 1577-1583 |
| .app-cursor | 1585-1596 |
| .app-cursor.visible | 1598-1600 |
| .app-cursor-ring, .app-cursor-dot | 1603-1610 |
| .app-cursor-ring | 1612-1620 |
| .app-cursor-dot | 1622-1626 |
| .app-cursor.is-interactive .app-cursor-ring | 1628-1633 |
| .app-cursor.is-interactive .app-cursor-dot | 1635-1637 |
| .app-cursor.is-text .app-cursor-ring | 1639-1644 |
| .app-cursor.is-pressed .app-cursor-ring | 1646-1648 |
| .app-cursor.is-pressed .app-cursor-dot | 1650-1652 |
| .helper-label | 1654-1660 |
| .helper-item .helper-value | 1662-1670 |
| .helper-item .helper-mask | 1672-1680 |
| .helper-item .helper-real | 1682-1694 |
| .helper-item:hover .helper-mask, .helper-item:focus-within .helper-mask | 1697-1700 |
| .helper-item:hover .helper-real, .helper-item:focus-within .helper-real | 1703-1706 |
| .typing-zone[hidden] | 1708-1710 |
| .status | 1712-1723 |
| .status[hidden] | 1725-1727 |
| .helper-slot[hidden] | 1729-1731 |
| .status-actions | 1733-1739 |
| .hint-flag | 1741-1754 |
| .hint-flag[hidden] | 1756-1758 |
| .hint-button | 1760-1762 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) | 1764-1778 |
| .settings-toggle | 1780-1782 |
| .theme-toggle | 1784-1786 |
| .home-toggle | 1788-1790 |
| :is(.settings-toggle, .theme-toggle, .home-toggle):hover | 1792-1794 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) svg | 1796-1800 |
| .settings-toggle svg | 1802-1805 |
| .settings-panel | 1807-1826 |
| .settings-panel.open | 1828-1832 |
| .settings-panel h2 | 1834-1839 |
| .settings-body | 1841-1845 |
| .settings-grid | 1847-1850 |
| .settings-section-title | 1852-1860 |
| .panel-trigger, .advanced-trigger, .dropdown-trigger, .control select | 1865-1874 |
| .advanced-trigger | 1876-1880 |
| .dropdown-trigger | 1882-1890 |
| .dropdown-trigger svg | 1892-1896 |
| .panel-trigger | 1898-1903 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger):hover | 1905-1908 |
| .panel-trigger:hover | 1910-1912 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger)[aria-expanded="true"] | 1914-1917 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger, .control select):focus-v... | 1919-1922 |
| .control select | 1924-1928 |
| .options-panel | 1930-1946 |
| .options-panel.open | 1948-1952 |
| .options-panel h3 | 1954-1961 |
| .options-grid | 1963-1966 |
| .options-panel .control | 1968-1974 |
| .options-panel .control.compact | 1976-1978 |
| .options-panel .control>label | 1980-1982 |
| .options-section-title | 1984-1993 |
| .options-panel .options-section-title:first-child | 1995-1999 |
| .advanced-panel | 2001-2020 |
| .advanced-panel.open | 2022-2026 |
| .advanced-panel h3 | 2028-2033 |
| .advanced-grid | 2035-2044 |
| .advanced-grid::-webkit-scrollbar | 2046-2048 |
| .advanced-grid::-webkit-scrollbar-track | 2050-2053 |
| .advanced-grid::-webkit-scrollbar-thumb | 2055-2059 |
| .inline-value | 2061-2068 |
| .slider-stack | 2070-2073 |
| .slider-stack input[type="range"] | 2075-2079 |
| .slider-ghost | 2081-2095 |
| .slider-ghost.visible | 2097-2099 |
| .sf2-browser | 2101-2104 |
| .sf2-browser input[type="text"] | 2106-2115 |
| .sf2-preset-list | 2117-2130 |
| .sf2-browser .piano-desc | 2132-2135 |
| .sf2-browser .piano-desc.pending, .profile-browser .piano-desc.pending | 2138-2140 |
| .sf2-group | 2142-2147 |
| .sf2-group-title | 2149-2158 |
| .sf2-row | 2160-2168 |
| .sf2-row:first-child | 2170-2172 |
| .sf2-row:hover | 2174-2176 |
| .sf2-row.active | 2178-2181 |
| .sf2-row-name | 2183-2189 |
| .sf2-row-program, .sf2-row-bank | 2192-2196 |
| .sf2-empty | 2198-2202 |
| .profile-browser | 2204-2207 |
| .profile-browser input[type="text"] | 2209-2218 |
| .profile-list | 2220-2233 |
| .profile-row | 2235-2245 |
| .profile-row:hover | 2247-2249 |
| .profile-row.active | 2251-2254 |
| .profile-row.applied | 2256-2258 |
| .profile-row-name | 2260-2266 |
| .profile-row-kind | 2268-2273 |
| .advanced-footer | 2275-2281 |
| .piano-preview.wide | 2283-2295 |
| .piano-preview.wide::before | 2297-2299 |
| .piano-preview.wide .play-icon | 2301-2307 |
| .piano-preview.wide .play-label | 2309-2311 |
| .instrument-browser-panel | 2313-2328 |
| .instrument-browser-panel.open | 2330-2334 |
| .instrument-browser-panel h3 | 2336-2341 |
| .piano-panel | 2343-2358 |
| .piano-panel.open | 2360-2364 |
| .piano-panel h3 | 2366-2371 |
| .piano-options | 2373-2376 |
| .piano-option | 2378-2390 |
| .piano-option.active | 2392-2395 |
| .piano-option:focus-visible | 2397-2399 |
| .piano-info | 2401-2404 |
| .piano-name | 2406-2409 |
| .piano-desc | 2411-2414 |
| .piano-option.simple .piano-name | 2416-2420 |
| .piano-option.simple .piano-desc | 2422-2426 |
| .piano-preview | 2428-2443 |
| .piano-preview::before | 2445-2453 |
| .piano-preview:active | 2455-2458 |
| .piano-preview.main | 2460-2464 |
| .settings-grid input[type="range"], .advanced-panel input[type="range"], .options-... | 2468-2472 |
| .settings-grid input[type="range"]::-webkit-slider-runnable-track, .advanced-panel... | 2476-2481 |
| .settings-grid input[type="range"]::-webkit-slider-thumb, .advanced-panel input[ty... | 2485-2494 |
| .settings-grid input[type="range"]:focus-visible::-webkit-slider-thumb, .advanced-... | 2498-2501 |
| .settings-grid input[type="range"]::-moz-range-track, .advanced-panel input[type="... | 2505-2510 |
| .settings-grid input[type="range"]::-moz-range-thumb, .advanced-panel input[type="... | 2514-2521 |
| .settings-grid input[type="range"]:focus-visible::-moz-range-thumb, .advanced-pane... | 2525-2528 |
| .volume-value | 2530-2533 |
| .status-row | 2535-2540 |
| .switch | 2542-2551 |
| .switch input | 2553-2558 |
| .switch-track | 2560-2566 |
| .switch-thumb | 2568-2578 |
| .switch input:checked+.switch-track | 2580-2582 |
| .switch input:checked+.switch-track .switch-thumb | 2584-2586 |
| .switch input:focus-visible+.switch-track | 2588-2591 |
| .control.compact .unit | 2593-2595 |
| .test-tone | 2597-2609 |
| .test-tone:hover | 2611-2614 |
| .test-tone:active | 2616-2618 |
| .test-tone-icon | 2620-2627 |
| .test-tone-label | 2629-2633 |
| .result | 2635-2639 |
| .reveal | 2641-2650 |
| .reveal strong | 2652-2654 |
| .reveal-label | 2656-2663 |
| .reveal-grid.compact | 2665-2669 |
| .reveal-cell | 2671-2673 |
| .keyboard-zone | 2675-2685 |
| .keyboard-stack | 2687-2697 |
| .keyboard-wrapper | 2699-2708 |
| .keyboard | 2710-2717 |
| .keyboard-wrapper.ends-black | 2719-2721 |
| .white-keys | 2723-2726 |
| .black-keys | 2728-2735 |
| .key | 2737-2748 |
| .key.white | 2750-2757 |
| .key.white.has-black | 2759-2761 |
| .key.black | 2763-2772 |
| .key span | 2774-2778 |
| .key.black span | 2780-2784 |
| .key.active | 2786-2789 |
| .key.black.active | 2791-2794 |
| .key.selected | 2796-2800 |
| .key.typed-preview | 2802-2804 |
| .key.correct | 2806-2810 |
| .key.wrong | 2812-2816 |
| .key.missed | 2818-2824 |
| .key.black.selected, .key.black.correct, .key.black.wrong | 2828-2830 |
| .key.black.missed | 2832-2838 |
| .keyboard.disabled | 2840-2846 |
| body.tutorial-open .keyboard | 2848-2850 |
| body.tutorial-open .keyboard.disabled | 2852-2855 |
| .keyboard.disabled::before | 2857-2869 |
| body.tutorial-open .keyboard.disabled::before | 2871-2873 |
| .keyboard.disabled::after | 2875-2909 |
| body.tutorial-open .keyboard.disabled::after | 2911-2913 |
| .tips | 2915-2924 |
| #pedal-tip[hidden] | 2926-2928 |
| .pedal-box | 2930-2944 |
| body.landing .pedal-box | 2946-2948 |
| .pedal-label | 2950-2960 |
| .pedal-icon | 2962-2969 |
| .pedal-icon.active | 2971-2974 |
| .note-pills | 2976-2982 |
| .note-pill | 2984-2990 |
| .note-pill.good | 2992-2996 |
| .note-pill.bad | 2998-3002 |
| .note-pill.missed | 3004-3008 |
| .note-pill.neutral | 3010-3014 |
| @media (max-width: 700px) | 3016-3071 |
| @media (max-height: 820px) | 3073-3094 |
| @media (max-height: 700px) | 3096-3101 |

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
File lines: 1-1039

| Symbol | Lines |
|---|---|
| normalizePracticeProfile | 414-434 |
| normalizePracticeProfiles | 435-442 |
| isTypingOnlyModeFromState | 446-446 |
| getEffectiveBlindModeFromState | 450-450 |
| getEffectivePracticeModeFromState | 451-459 |
| capturePracticeProfileFromState | 460-481 |
| clampEnvelopeValue | 580-580 |
| resolveEnvelopeMetrics | 593-628 |
| saveSettings | 642-672 |
| loadSettings | 674-728 |
| resetAllSettings | 730-762 |
| buildNotes | 810-825 |
| getNoteIdByMidi | 827-834 |
| isConsonant | 852-855 |
| getNicePool | 857-857 |
| getNoteCountMax | 859-863 |
| updateNoteCountMax | 865-873 |
| getCssNumber | 875-875 |
| clamp | 876-876 |
| getMaxStartMidi | 877-877 |
| clampStartMidi | 878-878 |
| getMidiLabel | 879-883 |
| getPanelBottomGap | 884-887 |
| normalizeSoundfontDefinition | 889-907 |
| setSoundfontCatalog | 909-930 |
| getSoundfontList | 932-932 |
| renderPianoOptions | 934-978 |
| createKey | 980-991 |
| renderKeyboard | 993-1025 |
| rebuildKeyboard | 1027-1038 |

### js/events.js (Active Runtime)
File lines: 1-2055

| Symbol | Lines |
|---|---|
| primeAudioFromGesture | 5-14 |
| shouldRestartRoundForSetting | 27-30 |
| patchSettingsState | 32-38 |
| isChordTutorialOpen | 604-604 |
| fitTutorialLayout | 607-635 |
| clearFitClasses | 613-616 |
| applyFitClass | 618-623 |
| getTutorialStep | 637-642 |
| getStepUnlockedRootSet | 644-652 |
| getStepUnlockedQualitySet | 654-660 |
| isTutorialRootEnabled | 662-662 |
| isTutorialQualityEnabled | 663-663 |
| getTutorialRootLabel | 665-668 |
| midiToTutorialLabel | 670-674 |
| getClosestNoteIdFromMidi | 676-683 |
| getTutorialRenderedChord | 685-707 |
| ensureTutorialKeyboard | 709-747 |
| getStepAllowedQualityIds | 749-751 |
| getTutorialActiveSpec | 753-755 |
| renderTutorialCurrentText | 757-768 |
| renderTutorialPianoHighlight | 770-804 |
| renderTutorialRootOptions | 806-824 |
| renderTutorialQualityOptions | 826-871 |
| syncTutorialRootChipStates | 873-892 |
| syncTutorialQualityChipStates | 894-913 |
| setTutorialHoverSpec | 915-922 |
| clearTutorialHoverSpec | 924-927 |
| refreshTutorialVisuals | 929-933 |
| getTutorialStepIndexForQuality | 963-969 |
| renderChordTutorialTabs | 971-986 |
| renderChordTutorialStep | 988-1044 |
| closeChordTutorial | 1046-1059 |
| openChordTutorial | 1061-1096 |
| registerTutorialOpenTrigger | 1098-1105 |
| openChordTutorialForChordLink | 1107-1117 |
| handleChordLinkActivation | 1119-1126 |
| isChordTypingCaptureActive | 1264-1269 |
| insertTypedCharacter | 1271-1278 |
| triggerPrimaryAction | 1281-1290 |
| getButtonLikeTarget | 1293-1293 |
| blurPointerActivatedControl | 1294-1301 |
| ensureCustomCursorEl | 1311-1328 |
| getCustomCursorMode | 1329-1338 |
| renderCustomCursor | 1346-1354 |
| scheduleCustomCursorRender | 1355-1358 |
| setCustomCursorEnabled | 1359-1372 |
| updateCustomCursorPosition | 1373-1380 |
| triggerReplayAction | 1382-1388 |
| bindPianoOptionEvents | 1548-1573 |
| applyCustomCursorMediaState | 1691-1693 |
| isElementVisible | 1708-1714 |
| getFocusableElements | 1716-1720 |
| focusFirstInModal | 1726-1732 |
| trapModalFocus | 1734-1756 |
| isTextEditableTarget | 1758-1763 |
| getActiveModalEl | 1765-1770 |
| closeGameSettingsModalUi | 1772-1781 |
| openGameSettingsModalUi | 1783-1789 |
| closeActiveModal | 1791-1805 |
| moveFocusInPanel | 1807-1818 |
| setRandomBackgroundAngle | 2008-2011 |
| init | 2013-2049 |
| runDeferredCatalogLoad | 2033-2042 |

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
| triggerEl | click | 1100 |
| document | click | 1128 |
| document | keydown | 1129 |
| chordTutorialTabs | click | 1135 |
| chordTutorialClose | click | 1147 |
| chordTutorialBackdrop | click | 1154 |
| chordTutorialPrev | click | 1160 |
| chordTutorialNext | click | 1168 |
| chordTutorialRootList | mouseover | 1180 |
| chordTutorialRootList | mouseleave | 1188 |
| chordTutorialRootList | focusin | 1191 |
| chordTutorialRootList | focusout | 1199 |
| chordTutorialRootList | click | 1202 |
| chordTutorialQualityList | mouseover | 1218 |
| chordTutorialQualityList | mouseleave | 1225 |
| chordTutorialQualityList | focusin | 1228 |
| chordTutorialQualityList | focusout | 1235 |
| chordTutorialQualityList | click | 1238 |
| volumeSlider | dblclick | 1390 |
| lengthSlider | dblclick | 1394 |
| keyCountSlider | dblclick | 1398 |
| startNoteDownButton | click | 1404 |
| startNoteUpButton | click | 1407 |
| startNoteDownOctButton | click | 1413 |
| startNoteUpOctButton | click | 1416 |
| noteCountInput | dblclick | 1421 |
| attackSlider | dblclick | 1429 |
| decaySlider | dblclick | 1433 |
| releaseSlider | dblclick | 1437 |
| sustainSlider | dblclick | 1441 |
| profileSearch | input | 1446 |
| profileList | click | 1452 |
| profileList | dblclick | 1457 |
| profileList | keydown | 1460 |
| profileApply | click | 1471 |
| profileSave | click | 1477 |
| instrumentPresetSearch | input | 1483 |
| instrumentPresetList | click | 1489 |
| instrumentPresetList | dblclick | 1494 |
| instrumentPresetList | keydown | 1497 |
| instrumentPresetApply | click | 1508 |
| advancedTrigger | click | 1513 |
| advancedPanel | click | 1518 |
| pianoTrigger | click | 1523 |
| pianoPanel | click | 1530 |
| instrumentBrowserTrigger | click | 1536 |
| instrumentBrowserPanel | click | 1543 |
| pianoOptionsContainer | click | 1551 |
| pianoOptionsContainer | keydown | 1565 |
| pianoPreviewMain | click | 1576 |
| testEnvelopeButton | click | 1583 |
| keyboardEl | pointerdown | 1588 |
| document | pointerup | 1624 |
| document | pointercancel | 1631 |
| document | pointerdown | 1638 |
| document | click | 1644 |
| document | pointermove | 1648 |
| document | pointerup | 1652 |
| document | pointercancel | 1657 |
| document | pointerover | 1662 |
| document | pointerout | 1668 |
| window | blur | 1677 |
| document | visibilitychange | 1683 |
| CUSTOM_CURSOR_QUERY | change | 1695 |
| keyboardEl | click | 1701 |
| document | keydown | 1820 |
| document | keyup | 1956 |
| pedalBox | pointerdown | 1975 |
| pedalBox | pointerup | 1984 |
| pedalBox | pointercancel | 1993 |
| pedalBox | pointerleave | 2001 |

### js/game.js (Active Runtime)
File lines: 1-2098

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
| updateChordReadout | 856-923 |
| updateModeVisibility | 925-942 |
| updatePrimaryAction | 944-949 |
| updateReplayAvailability | 951-958 |
| getChordHelperHints | 960-978 |
| createDeterministicHelperMask | 996-1024 |
| renderChordHelperBox | 1026-1044 |
| updateStatus | 1046-1170 |
| updateKeyStates | 1172-1233 |
| setKeyboardEnabled | 1235-1238 |
| updateKeyboardScale | 1240-1251 |
| lockKeyboardForPlayback | 1253-1266 |
| setSubmitted | 1268-1275 |
| goHome | 1277-1329 |
| refreshTarget | 1331-1357 |
| startRound | 1359-1435 |
| ensureRound | 1437-1446 |
| playTarget | 1448-1462 |
| startManualNote | 1464-1482 |
| releaseManualNote | 1484-1492 |
| releasePedalNotes | 1494-1504 |
| startPedalHold | 1506-1512 |
| stopPedalHold | 1514-1521 |
| toggleSelection | 1523-1567 |
| isSelectionCorrect | 1569-1586 |
| getPlaybackSpan | 1588-1593 |
| renderNotePills | 1595-1601 |
| renderChordPill | 1603-1607 |
| renderTonePills | 1609-1617 |
| renderRevealCell | 1619-1622 |
| renderChordRevealGrid | 1624-1627 |
| renderChordDetectionMeta | 1629-1633 |
| renderPressedPills | 1635-1640 |
| buildNoteComparison | 1642-1649 |
| buildAnswerNoteCell | 1651-1659 |
| buildTargetNoteCell | 1661-1673 |
| getSubmittedReplaySnapshot | 1703-1717 |
| playSubmittedReplaySequence | 1719-1732 |
| playRevealSequence | 1734-1784 |
| playSelectedChord | 1786-1810 |
| playTypedInputChord | 1812-1825 |
| startHeldPlayback | 1827-1853 |
| releaseHeldPlayback | 1855-1869 |
| buildTypingRevealDetail | 1871-1889 |
| submitTypedAnswer | 1891-1964 |
| submitAnswer | 1966-2029 |
| sanitizeRoundStateForKeyboardRange | 2031-2071 |

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
| isGameSettingsModalOpenInternal | 1169-1169 |
| openGameSettingsModalInternal | 1171-1182 |
| closeGameSettingsModalInternal | 1184-1192 |
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

