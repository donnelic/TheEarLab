# Project Map

Generated: 2026-03-04 12:23:30 +01:00

## Mandatory Protocol (Humans + AI)
1. Read README.md first, then read this file before making any edit.
2. Treat index.html script order as the source of truth for runtime behavior.
3. After any code edit, run powershell -File ./tools/generate-project-map.ps1 to refresh line ranges.
4. If you add/remove/move files, update README.md, this file, and AGENTS.md in the same change.
5. Do not edit legacy js/app.*.js files unless you intentionally want to revive that branch.

## System Flows
### Bootstrap
1. index.html loads CSS and five runtime scripts (core -> audio -> game -> settings -> events).
2. core.js defines DOM handles, constants, state containers, persistence helpers, note/key builders.
3. events.js:init() hydrates UI from saved settings, binds events, renders keyboard, and sets status.

### Round Lifecycle
1. startRound(true) creates target notes and optionally plays them.
2. User selects notes on keyboard (toggleSelection).
3. Submit (submitAnswer) compares selection vs target and renders reveal.
4. Reveal playback (playRevealSequence) replays target and selected snapshots.

### Audio Lifecycle
1. ensureAudio() lazily creates Web Audio context + master gain.
2. playNotes / playPianoNote schedule oscillators, envelopes, and key animations.
3. stopNotesById / stopAllNotes release voices and clear key timers.
4. Preview system (playPianoPreview) runs timed on/off/pedal events.

## File Inventory
| File | Kind | Runtime Role | Active | Lines |
|---|---|---|---|---:|
| index.html | HTML | Loaded directly | Yes | 243 |
| styles.css | CSS | Loaded directly | Yes | 1375 |
| js/app.audio.js | JavaScript | Reference snapshot | No (legacy/not loaded) | 681 |
| js/app.core.js | JavaScript | Reference snapshot | No (legacy/not loaded) | 523 |
| js/app.events.js | JavaScript | Reference snapshot | No (legacy/not loaded) | 462 |
| js/app.game.js | JavaScript | Reference snapshot | No (legacy/not loaded) | 582 |
| js/app.settings.js | JavaScript | Reference snapshot | No (legacy/not loaded) | 281 |
| js/audio.js | JavaScript | Browser runtime module | Yes | 812 |
| js/core.js | JavaScript | Browser runtime module | Yes | 604 |
| js/events.js | JavaScript | Browser runtime module | Yes | 491 |
| js/game.js | JavaScript | Browser runtime module | Yes | 602 |
| js/settings.js | JavaScript | Browser runtime module | Yes | 307 |
| README.md | Markdown | Human + AI onboarding | Yes | 39 |
| AGENTS.md | Markdown | AI instruction override | Yes | 30 |
| PROJECT_MAP.md | Markdown | Generated reference map | Yes | 725 |
| tools/generate-project-map.ps1 | PowerShell | Documentation generator | Yes | 451 |

## index.html Map
File: index.html (1-243)

### ID Anchors
| ID | Element | Line |
|---|---|---:|
| settings-toggle | <button> | 12 |
| theme-toggle | <button> | 20 |
| home-button | <button> | 27 |
| settings-panel | <aside> | 34 |
| note-count | <input> | 41 |
| note-count-value | <span> | 42 |
| blind-mode | <input> | 58 |
| nice-notes | <input> | 71 |
| piano-volume | <input> | 83 |
| volume-value | <span> | 84 |
| piano-trigger | <button> | 91 |
| piano-label | <span> | 93 |
| piano-preview-main | <button> | 98 |
| note-length | <input> | 105 |
| length-value | <span> | 106 |
| advanced-trigger | <button> | 109 |
| key-count | <input> | 116 |
| key-count-value | <span> | 117 |
| start-note-down-oct | <button> | 125 |
| start-note-down | <button> | 127 |
| start-note-value | <span> | 128 |
| start-note-up | <button> | 129 |
| start-note-up-oct | <button> | 130 |
| reset-settings | <button> | 137 |
| advanced-panel | <section> | 140 |
| attack-time | <input> | 146 |
| attack-value | <span> | 147 |
| decay-rate | <input> | 153 |
| decay-value | <span> | 154 |
| release-rate | <input> | 160 |
| release-value | <span> | 161 |
| sustain-length | <input> | 167 |
| sustain-value | <span> | 168 |
| test-envelope | <button> | 173 |
| piano-panel | <section> | 180 |
| piano-options | <div> | 182 |
| primary-action | <button> | 193 |
| play-selected | <button> | 194 |
| keyboard | <div> | 200 |
| white-keys | <div> | 201 |
| black-keys | <div> | 202 |
| pedal-icon | <div> | 207 |
| round-count | <span> | 214 |
| selected-list | <span> | 215 |
| goal-count | <span> | 216 |
| mode-label | <span> | 217 |
| hint-button | <button> | 220 |
| result | <div> | 222 |
| reveal | <div> | 223 |
| hint-flag | <div> | 224 |
| pedal-tip | <span> | 229 |

### Script Load Order
| Order | Script | Line |
|---:|---|---:|
| 1 | js/core.js | 233 |
| 2 | js/audio.js | 234 |
| 3 | js/game.js | 235 |
| 4 | js/settings.js | 236 |
| 5 | js/events.js | 237 |

## styles.css Map
File: styles.css (1-1375)

### Top-Level CSS Blocks
| Selector | Lines |
|---|---|
| :root | 3-99 |
| body.theme-dark | 101-189 |
| * | 191-193 |
| body | 195-207 |
| body.landing | 209-211 |
| .app | 213-229 |
| .hero | 231-234 |
| .badge | 236-249 |
| h1 | 251-255 |
| .hero-link | 256-259 |
| .hero-link:hover, .hero-link:focus-visible | 261-265 |
| .hero p | 267-273 |
| .control | 275-281 |
| .control.compact | 283-285 |
| .control.compact label | 287-289 |
| .control.compact .control-row | 291-293 |
| .control label | 295-302 |
| .control-row | 304-308 |
| .control-row.align-end | 310-313 |
| .start-note-row | 315-317 |
| .start-note-stepper | 319-329 |
| .start-note-value | 331-337 |
| .step-btn | 339-351 |
| .step-btn.oct | 353-359 |
| .step-btn:hover | 361-364 |
| .advanced-test | 366-369 |
| .advanced-test .unit | 371-374 |
| input[type="number"] | 376-385 |
| .segmented | 387-391 |
| .segmented-btn | 393-402 |
| .segmented-btn.active | 404-408 |
| .actions | 410-415 |
| .btn | 417-424 |
| .btn:focus-visible | 426-429 |
| .btn.primary | 431-435 |
| .btn.secondary | 437-441 |
| .btn.ghost | 443-447 |
| .btn.submit | 449-453 |
| .btn:hover | 455-457 |
| .status | 459-465 |
| .status-actions | 467-473 |
| .hint-flag | 475-488 |
| .hint-flag[hidden] | 490-492 |
| .hint-button | 494-496 |
| .settings-toggle | 498-513 |
| .settings-toggle:hover | 515-517 |
| .settings-toggle svg | 519-523 |
| .theme-toggle | 525-540 |
| .theme-toggle:hover | 542-544 |
| .theme-toggle svg | 546-550 |
| .home-button | 552-567 |
| .home-button:hover | 569-571 |
| .home-button svg | 573-577 |
| .home-button[hidden] | 579-581 |
| .settings-panel | 583-602 |
| .settings-panel.open | 604-608 |
| .settings-panel h2 | 610-615 |
| .settings-body | 617-621 |
| .settings-grid | 623-626 |
| .advanced-trigger | 628-636 |
| .dropdown-trigger | 638-652 |
| .dropdown-trigger svg | 654-658 |
| .dropdown-trigger:focus-visible | 660-663 |
| .advanced-panel | 665-684 |
| .advanced-panel.open | 686-690 |
| .advanced-panel h3 | 692-697 |
| .advanced-grid | 699-705 |
| .advanced-footer | 707-713 |
| .piano-preview.wide | 715-727 |
| .piano-preview.wide::before | 729-731 |
| .piano-preview.wide .play-icon | 733-739 |
| .piano-preview.wide .play-label | 741-743 |
| .piano-panel | 745-760 |
| .piano-panel.open | 762-766 |
| .piano-panel h3 | 768-773 |
| .piano-options | 775-778 |
| .piano-option | 780-792 |
| .piano-option.active | 794-797 |
| .piano-option:focus-visible | 799-801 |
| .piano-info | 803-806 |
| .piano-name | 808-810 |
| .piano-desc | 812-815 |
| .piano-preview | 817-829 |
| .piano-preview::before | 831-839 |
| .piano-preview:active | 841-844 |
| .piano-preview.main | 846-849 |
| .settings-grid input[type="range"] | 851-855 |
| .settings-grid input[type="range"]::-webkit-slider-runnable-track | 857-862 |
| .settings-grid input[type="range"]::-webkit-slider-thumb | 864-873 |
| .settings-grid input[type="range"]:focus-visible::-webkit-slider-thumb | 875-878 |
| .settings-grid input[type="range"]::-moz-range-track | 880-885 |
| .settings-grid input[type="range"]::-moz-range-thumb | 887-894 |
| .settings-grid input[type="range"]:focus-visible::-moz-range-thumb | 896-899 |
| .volume-value | 901-904 |
| .status-row | 906-911 |
| .switch | 913-917 |
| .switch input | 919-924 |
| .switch-track | 926-932 |
| .switch-thumb | 934-944 |
| .switch input:checked + .switch-track | 946-948 |
| .switch input:checked + .switch-track .switch-thumb | 950-952 |
| .control.compact .switch | 954-957 |
| .control.compact .switch-thumb | 959-964 |
| .control.compact .switch input:checked + .switch-track .switch-thumb | 966-968 |
| .control.compact .unit | 970-972 |
| .test-tone | 974-986 |
| .test-tone:hover | 988-991 |
| .test-tone:active | 993-995 |
| .test-tone-icon | 997-1004 |
| .test-tone-label | 1006-1010 |
| .result | 1012-1015 |
| .reveal | 1017-1020 |
| .reveal strong | 1022-1024 |
| .reveal-label | 1026-1030 |
| .keyboard-zone | 1032-1041 |
| .keyboard-stack | 1043-1053 |
| .keyboard-wrapper | 1055-1064 |
| .keyboard | 1066-1073 |
| .keyboard-wrapper.ends-black | 1075-1077 |
| .white-keys | 1079-1082 |
| .black-keys | 1084-1091 |
| .key | 1093-1104 |
| .key.white | 1106-1113 |
| .key.white.has-black | 1115-1117 |
| .key.black | 1119-1128 |
| .key span | 1130-1134 |
| .key.black span | 1136-1140 |
| .key.active | 1142-1145 |
| .key.black.active | 1147-1150 |
| .key.selected | 1152-1156 |
| .key.correct | 1158-1162 |
| .key.wrong | 1164-1168 |
| .key.missed | 1170-1176 |
| .key.black.selected, .key.black.correct, .key.black.wrong | 1180-1182 |
| .key.black.missed | 1184-1190 |
| .keyboard.disabled | 1192-1198 |
| .keyboard.disabled::before | 1200-1212 |
| .keyboard.disabled::after | 1214-1248 |
| .tips | 1250-1258 |
| #pedal-tip[hidden] | 1260-1262 |
| .pedal-box | 1264-1278 |
| body.landing .pedal-box | 1280-1282 |
| .pedal-label | 1284-1294 |
| .pedal-icon | 1296-1303 |
| .pedal-icon.active | 1305-1308 |
| .note-pills | 1310-1315 |
| .note-pill | 1317-1323 |
| .note-pill.good | 1325-1329 |
| .note-pill.bad | 1331-1335 |
| @media (max-width: 700px) | 1337-1361 |
| @media (max-height: 820px) | 1363-1368 |
| @media (max-height: 700px) | 1370-1375 |

## Documentation + Tooling Maps
### README.md
File: README.md (1-39)
| Heading | Line |
|---|---:|
| TheEarLab | 1 |
| Read First | 5 |
| Project Layout | 16 |
| Run Locally | 27 |
| Maintenance Rules | 31 |
| Verification | 37 |

### AGENTS.md
File: AGENTS.md (1-30)
| Heading | Line |
|---|---:|
| Agent Instructions (Project Local) | 1 |
| Priority Order | 5 |
| Source of Truth | 10 |
| Required Update Workflow | 20 |
| Documentation Quality Bar | 27 |

### tools/generate-project-map.ps1
File: tools/generate-project-map.ps1 (1-451)
| Function | Start Line |
|---|---:|
| Get-LineCount | 9 |
| Count-Braces | 14 |
| Get-JsFunctionRanges | 21 |
| Get-JsEventBindings | 75 |
| Get-CssBlocks | 93 |
| Get-IndexIds | 155 |
| Get-IndexScripts | 173 |
| Get-MarkdownHeadings | 190 |
| Get-PsFunctionStarts | 208 |


## JavaScript Maps
### js/app.audio.js (Legacy / Not Loaded)
File lines: 1-681

| Symbol | Lines |
|---|---|
| ensureAudio | 1-16 |
| releaseVoices | 20-56 |
| stopAllNotes | 58-105 |
| stopNotesById | 107-120 |
| abortPlayback | 122-124 |
| createNoise | 126-136 |
| getEnvelopeState | 141-159 |
| scheduleEnvelope | 161-196 |
| getOscType | 198-198 |
| applyNoiseBurst | 200-223 |
| retriggerVoice | 225-256 |
| registerKeyTimer | 428-435 |
| unregisterKeyTimer | 437-446 |
| clearKeyTimersForNote | 448-456 |
| activateKey | 458-464 |
| scheduleKeyRelease | 466-479 |
| scheduleKeyAnimation | 481-492 |
| playNotes | 494-527 |
| playNotesNow | 529-532 |
| clearPreviewTimers | 534-537 |
| stopPreviewPlayback | 539-565 |
| schedulePreviewEvent | 567-573 |
| previewNoteOn | 575-586 |
| previewNoteOff | 588-597 |
| previewPedalOn | 599-618 |
| activate | 603-608 |
| previewPedalOff | 620-634 |
| buildPreviewSequence | 636-680 |

Event bindings:
| Target | Event | Line |
|---|---|---:|
| osc | ended | 416 |

### js/app.core.js (Legacy / Not Loaded)
File lines: 1-523

| Symbol | Lines |
|---|---|
| saveSettings | 247-262 |
| loadSettings | 264-291 |
| resetAllSettings | 293-305 |
| buildNotes | 353-368 |
| getNoteIdByMidi | 370-377 |
| isConsonant | 389-392 |
| getNicePool | 394-394 |
| getNoteCountMax | 396-400 |
| updateNoteCountMax | 402-410 |
| getCssNumber | 412-412 |
| clamp | 413-413 |
| getMaxStartMidi | 414-414 |
| clampStartMidi | 415-415 |
| getMidiLabel | 416-420 |
| getPanelBottomGap | 421-424 |
| renderPianoOptions | 426-466 |
| createKey | 468-479 |
| renderKeyboard | 481-513 |
| rebuildKeyboard | 515-522 |

### js/app.events.js (Legacy / Not Loaded)
File lines: 1-462

| Symbol | Lines |
|---|---|
| setRandomBackgroundAngle | 447-450 |

Event bindings:
| Target | Event | Line |
|---|---|---:|
| noteCountInput | input | 1 |
| noteCountInput | change | 8 |
| noteCountInput | pointerup | 12 |
| button | click | 17 |
| blindToggle | change | 25 |
| niceNotesToggle | change | 32 |
| resetSettingsButton | click | 40 |
| settingsToggle | click | 54 |
| themeToggle | click | 63 |
| settingsPanel | click | 71 |
| document | click | 81 |
| window | resize | 87 |
| playSelectedButton | click | 97 |
| playSelectedButton | pointerdown | 101 |
| playSelectedButton | pointerup | 106 |
| playSelectedButton | pointerleave | 110 |
| primaryActionButton | click | 114 |
| volumeSlider | input | 122 |
| lengthSlider | input | 128 |
| attackSlider | input | 134 |
| decaySlider | input | 141 |
| releaseSlider | input | 148 |
| sustainSlider | input | 155 |
| keyCountSlider | input | 161 |
| keyCountSlider | change | 168 |
| keyCountSlider | pointerup | 172 |
| hintButton | click | 176 |
| homeButton | click | 181 |
| volumeSlider | dblclick | 186 |
| lengthSlider | dblclick | 190 |
| keyCountSlider | dblclick | 194 |
| startNoteDownButton | click | 200 |
| startNoteUpButton | click | 203 |
| startNoteDownOctButton | click | 209 |
| startNoteUpOctButton | click | 212 |
| noteCountInput | dblclick | 217 |
| attackSlider | dblclick | 225 |
| decaySlider | dblclick | 230 |
| releaseSlider | dblclick | 235 |
| sustainSlider | dblclick | 240 |
| advancedTrigger | click | 244 |
| advancedPanel | click | 253 |
| pianoTrigger | click | 258 |
| pianoPanel | click | 270 |
| option | click | 276 |
| option | keydown | 281 |
| button | click | 291 |
| pianoPreviewMain | click | 299 |
| testEnvelopeButton | click | 306 |
| keyboardEl | pointerdown | 311 |
| document | pointerup | 342 |
| document | pointercancel | 349 |
| keyboardEl | click | 356 |
| document | keydown | 360 |
| document | keyup | 399 |
| pedalBox | pointerdown | 418 |
| pedalBox | pointerup | 426 |
| pedalBox | pointercancel | 434 |
| pedalBox | pointerleave | 441 |

### js/app.game.js (Legacy / Not Loaded)
File lines: 1-582

| Symbol | Lines |
|---|---|
| randomSample | 1-8 |
| getNiceTarget | 10-47 |
| createTarget | 49-81 |
| updatePrimaryAction | 83-86 |
| updateReplayAvailability | 88-92 |
| updateStatus | 94-138 |
| updateKeyStates | 140-166 |
| setKeyboardEnabled | 168-170 |
| updateKeyboardScale | 172-183 |
| lockKeyboardForPlayback | 185-197 |
| setSubmitted | 199-206 |
| refreshTarget | 208-219 |
| startRound | 221-240 |
| ensureRound | 242-251 |
| playTarget | 253-265 |
| startManualNote | 267-297 |
| releaseManualNote | 299-328 |
| releasePedalNotes | 330-340 |
| startPedalHold | 342-348 |
| stopPedalHold | 350-357 |
| toggleSelection | 359-384 |
| isSelectionCorrect | 386-392 |
| getPlaybackSpan | 394-399 |
| renderNotePills | 401-407 |
| renderPressedPills | 409-419 |
| playRevealSequence | 421-471 |
| playSelectedChord | 473-492 |
| startHeldPlayback | 494-530 |
| releaseHeldPlayback | 532-559 |
| submitAnswer | 561-581 |

### js/app.settings.js (Legacy / Not Loaded)
File lines: 1-281

| Symbol | Lines |
|---|---|
| clampNoteCount | 1-7 |
| setVolume | 9-19 |
| setPianoTone | 21-36 |
| setNoteLength | 38-47 |
| setAdsrParam | 49-52 |
| playPianoPreview | 54-77 |
| goHome | 79-88 |
| setKeyCount | 90-105 |
| setStartMidi | 107-116 |
| setKeyCountVisual | 118-122 |
| applyUiFromState | 124-157 |
| commitCriticalChange | 164-169 |
| commitNoteCountChange | 171-180 |
| handleCriticalSettingChange | 182-196 |
| openSettings | 198-203 |
| closeSettings | 205-222 |
| positionFloatingPanel | 224-248 |
| openAdvanced | 250-255 |
| closeAdvanced | 257-260 |
| positionPianoPanel | 262-265 |
| openPianoPanel | 267-274 |
| closePianoPanel | 276-281 |

### js/audio.js (Active Runtime)
File lines: 1-812

| Symbol | Lines |
|---|---|
| ensureAudio | 4-19 |
| releaseVoices | 23-59 |
| stopAllNotes | 61-108 |
| stopNotesById | 110-123 |
| abortPlayback | 125-127 |
| createNoise | 129-139 |
| getEnvelopeState | 144-162 |
| scheduleEnvelope | 164-199 |
| getOscType | 201-201 |
| applyNoiseBurst | 203-226 |
| retriggerVoice | 228-259 |
| buildResonators | 261-287 |
| maybeAttackNoise | 316-330 |
| addBody | 332-356 |
| addPartials | 358-402 |
| addResonators | 404-429 |
| addFM | 431-477 |
| registerKeyTimer | 545-552 |
| unregisterKeyTimer | 554-563 |
| clearKeyTimersForNote | 565-573 |
| activateKey | 575-581 |
| scheduleKeyRelease | 583-596 |
| scheduleKeyAnimation | 598-609 |
| playNotes | 611-644 |
| playNotesNow | 646-649 |
| clearPreviewTimers | 651-654 |
| stopPreviewPlayback | 656-682 |
| schedulePreviewEvent | 684-690 |
| previewNoteOn | 692-703 |
| previewNoteOff | 705-714 |
| previewPedalOn | 716-737 |
| activate | 720-727 |
| previewPedalOff | 739-753 |
| buildPreviewSequence | 755-799 |

Event bindings:
| Target | Event | Line |
|---|---|---:|
| osc | ended | 533 |

### js/core.js (Active Runtime)
File lines: 1-604

| Symbol | Lines |
|---|---|
| saveSettings | 331-346 |
| loadSettings | 348-375 |
| resetAllSettings | 377-389 |
| buildNotes | 434-449 |
| getNoteIdByMidi | 451-458 |
| isConsonant | 470-473 |
| getNicePool | 475-475 |
| getNoteCountMax | 477-481 |
| updateNoteCountMax | 483-491 |
| getCssNumber | 493-493 |
| clamp | 494-494 |
| getMaxStartMidi | 495-495 |
| clampStartMidi | 496-496 |
| getMidiLabel | 497-501 |
| getPanelBottomGap | 502-505 |
| renderPianoOptions | 507-547 |
| createKey | 549-560 |
| renderKeyboard | 562-594 |
| rebuildKeyboard | 596-603 |

### js/events.js (Active Runtime)
File lines: 1-491

| Symbol | Lines |
|---|---|
| goHomeAction | 194-194 |
| bindPianoOptionEvents | 293-316 |
| setRandomBackgroundAngle | 467-470 |
| init | 472-487 |

Event bindings:
| Target | Event | Line |
|---|---|---:|
| noteCountInput | input | 4 |
| noteCountInput | change | 11 |
| noteCountInput | pointerup | 15 |
| button | click | 20 |
| blindToggle | change | 28 |
| niceNotesToggle | change | 35 |
| resetSettingsButton | click | 43 |
| settingsToggle | click | 57 |
| themeToggle | click | 66 |
| settingsPanel | click | 74 |
| document | click | 84 |
| window | resize | 90 |
| playSelectedButton | click | 100 |
| playSelectedButton | pointerdown | 104 |
| playSelectedButton | pointerup | 109 |
| playSelectedButton | pointerleave | 113 |
| primaryActionButton | click | 117 |
| volumeSlider | input | 125 |
| lengthSlider | input | 131 |
| attackSlider | input | 137 |
| decaySlider | input | 144 |
| releaseSlider | input | 151 |
| sustainSlider | input | 158 |
| keyCountSlider | input | 164 |
| keyCountSlider | change | 171 |
| keyCountSlider | pointerup | 175 |
| hintButton | click | 179 |
| homeButton | click | 184 |
| heroTitle | click | 195 |
| heroTitle | keydown | 196 |
| volumeSlider | dblclick | 204 |
| lengthSlider | dblclick | 208 |
| keyCountSlider | dblclick | 212 |
| startNoteDownButton | click | 218 |
| startNoteUpButton | click | 221 |
| startNoteDownOctButton | click | 227 |
| startNoteUpOctButton | click | 230 |
| noteCountInput | dblclick | 235 |
| attackSlider | dblclick | 243 |
| decaySlider | dblclick | 248 |
| releaseSlider | dblclick | 253 |
| sustainSlider | dblclick | 258 |
| advancedTrigger | click | 262 |
| advancedPanel | click | 271 |
| pianoTrigger | click | 276 |
| pianoPanel | click | 288 |
| option | click | 295 |
| option | keydown | 300 |
| button | click | 310 |
| pianoPreviewMain | click | 319 |
| testEnvelopeButton | click | 326 |
| keyboardEl | pointerdown | 331 |
| document | pointerup | 362 |
| document | pointercancel | 369 |
| keyboardEl | click | 376 |
| document | keydown | 380 |
| document | keyup | 419 |
| pedalBox | pointerdown | 438 |
| pedalBox | pointerup | 446 |
| pedalBox | pointercancel | 454 |
| pedalBox | pointerleave | 461 |

### js/game.js (Active Runtime)
File lines: 1-602

| Symbol | Lines |
|---|---|
| randomSample | 4-11 |
| getNiceTarget | 13-50 |
| createTarget | 52-84 |
| updatePrimaryAction | 86-89 |
| updateReplayAvailability | 91-95 |
| updateStatus | 97-141 |
| updateKeyStates | 143-169 |
| setKeyboardEnabled | 171-173 |
| updateKeyboardScale | 175-186 |
| lockKeyboardForPlayback | 188-200 |
| setSubmitted | 202-209 |
| refreshTarget | 211-222 |
| startRound | 224-243 |
| ensureRound | 245-254 |
| playTarget | 256-268 |
| startManualNote | 270-301 |
| releaseManualNote | 303-332 |
| releasePedalNotes | 334-344 |
| startPedalHold | 346-352 |
| stopPedalHold | 354-361 |
| toggleSelection | 363-388 |
| isSelectionCorrect | 390-396 |
| getPlaybackSpan | 398-403 |
| renderNotePills | 405-411 |
| renderPressedPills | 413-423 |
| playRevealSequence | 425-475 |
| playSelectedChord | 477-496 |
| startHeldPlayback | 498-534 |
| releaseHeldPlayback | 536-563 |
| submitAnswer | 565-585 |

### js/settings.js (Active Runtime)
File lines: 1-307

| Symbol | Lines |
|---|---|
| clampNoteCount | 4-10 |
| setVolume | 12-22 |
| setPianoTone | 24-39 |
| setNoteLength | 41-50 |
| setAdsrParam | 52-55 |
| playPianoPreview | 57-80 |
| goHome | 82-91 |
| setKeyCount | 93-108 |
| setStartMidi | 110-119 |
| setKeyCountVisual | 121-125 |
| applyUiFromState | 127-160 |
| commitCriticalChange | 167-172 |
| commitNoteCountChange | 174-183 |
| handleCriticalSettingChange | 185-199 |
| openSettings | 201-206 |
| closeSettings | 208-225 |
| positionFloatingPanel | 227-251 |
| openAdvanced | 253-258 |
| closeAdvanced | 260-263 |
| positionPianoPanel | 265-268 |
| openPianoPanel | 270-277 |
| closePianoPanel | 279-284 |

## Maintenance Notes
- js/app.*.js is an older branch snapshot. Keep it for reference unless explicitly retired.
- Functional edits should target loaded scripts first: core.js, audio.js, game.js, settings.js, events.js.
- If you intentionally switch runtime scripts, update script tags in index.html and regenerate this file.

