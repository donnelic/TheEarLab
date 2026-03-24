# Project Map

Generated: 2026-03-24 15:50:30 +01:00

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
2. core.*.js defines DOM handles, constants, state containers, persistence helpers, note/key builders.
3. events.*.js:init() hydrates UI from saved settings, binds events, renders keyboard, and sets status.

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
| index.html | HTML | Loaded directly | Yes | 594 |
| css/00-theme.css | CSS | Loaded directly | Yes | 236 |
| css/01-base.css | CSS | Loaded directly | Yes | 390 |
| css/02-chord-typing.css | CSS | Loaded directly | Yes | 231 |
| css/03-modals.css | CSS | Loaded directly | Yes | 346 |
| css/04-tutorial.css | CSS | Loaded directly | Yes | 537 |
| css/05-helper-cursor.css | CSS | Loaded directly | Yes | 333 |
| css/06-panels-status.css | CSS | Loaded directly | Yes | 972 |
| css/07-keyboard.css | CSS | Loaded directly | Yes | 463 |
| js/audio.00-bootstrap.js | JavaScript | Browser runtime module | Yes | 192 |
| js/audio.10-soundfont-catalog.js | JavaScript | Browser runtime module | Yes | 423 |
| js/audio.20-engine.js | JavaScript | Browser runtime module | Yes | 473 |
| js/audio.30-playback.js | JavaScript | Browser runtime module | Yes | 277 |
| js/audio.40-preview.js | JavaScript | Browser runtime module | Yes | 164 |
| js/core.00-bootstrap.js | JavaScript | Browser runtime module | Yes | 284 |
| js/core.10-constants.js | JavaScript | Browser runtime module | Yes | 295 |
| js/core.20-envelope.js | JavaScript | Browser runtime module | Yes | 80 |
| js/core.30-storage.js | JavaScript | Browser runtime module | Yes | 133 |
| js/core.40-runtime.js | JavaScript | Browser runtime module | Yes | 145 |
| js/core.50-soundfonts.js | JavaScript | Browser runtime module | Yes | 91 |
| js/core.60-keyboard.js | JavaScript | Browser runtime module | Yes | 60 |
| js/events.00-settings.js | JavaScript | Browser runtime module | Yes | 637 |
| js/events.10-tutorial.js | JavaScript | Browser runtime module | Yes | 633 |
| js/events.20-helper-cursor.js | JavaScript | Browser runtime module | Yes | 818 |
| js/events.30-bindings.js | JavaScript | Browser runtime module | Yes | 434 |
| js/game.00-bootstrap.js | JavaScript | Browser runtime module | Yes | 456 |
| js/game.10-chord-targets.js | JavaScript | Browser runtime module | Yes | 507 |
| js/game.20-round-ui.js | JavaScript | Browser runtime module | Yes | 536 |
| js/game.30-round-flow.js | JavaScript | Browser runtime module | Yes | 327 |
| js/game.40-reveal-submit.js | JavaScript | Browser runtime module | Yes | 546 |
| js/settings.00-profiles.js | JavaScript | Browser runtime module | Yes | 543 |
| js/settings.10-dialogs.js | JavaScript | Browser runtime module | Yes | 324 |
| js/settings.20-game.js | JavaScript | Browser runtime module | Yes | 298 |
| js/settings.30-panels.js | JavaScript | Browser runtime module | Yes | 300 |
| README.md | Markdown | Human + AI onboarding | Yes | 155 |
| IMPLEMENTATION_CHECKLIST.md | Markdown | Implementation roadmap checklist | Yes | 237 |
| AGENTS.md | Markdown | AI instruction override | Yes | 67 |
| PROJECT_MAP.md | Markdown | Generated reference map | Yes | 1526 |
| tools/generate-project-map.ps1 | PowerShell | Documentation generator | Yes | 582 |
| tools/smoke-checklist.md | Markdown | Manual regression checklist | Yes | 59 |
| soundfonts/GeneralUser-GS.sf2 | Asset | Soundfont asset | Yes | 0 |
| soundfonts/index.json | JSON | Soundfont asset | Yes | 3 |
| soundfonts/README.md | Markdown | Soundfont asset | Yes | 39 |

## index.html Map
File: index.html (1-594)

### ID Anchors
| ID | Element | Line |
|---|---|---:|
| settings-toggle | <button> | 22 |
| theme-toggle | <button> | 30 |
| home-toggle | <button> | 37 |
| settings-panel | <aside> | 44 |
| options-trigger | <button> | 52 |
| piano-volume | <input> | 66 |
| volume-value | <span> | 67 |
| piano-trigger | <button> | 74 |
| piano-label | <span> | 76 |
| piano-preview-main | <button> | 81 |
| instrument-browser-trigger | <button> | 84 |
| note-length | <input> | 93 |
| length-value | <span> | 94 |
| advanced-trigger | <button> | 97 |
| key-count-down-oct | <button> | 106 |
| key-count-down | <button> | 108 |
| key-count-value | <span> | 109 |
| key-count-up | <button> | 110 |
| key-count-up-oct | <button> | 111 |
| key-count | <input> | 114 |
| start-note-down-oct | <button> | 123 |
| start-note-down | <button> | 125 |
| start-note-value | <span> | 126 |
| start-note-up | <button> | 127 |
| start-note-up-oct | <button> | 128 |
| custom-cursor | <input> | 139 |
| reset-settings | <button> | 149 |
| advanced-panel | <section> | 152 |
| attack-label-value | <span> | 156 |
| attack-time | <input> | 159 |
| attack-ghost | <span> | 160 |
| attack-value | <span> | 162 |
| decay-label-value | <span> | 166 |
| decay-rate | <input> | 169 |
| decay-ghost | <span> | 170 |
| decay-value | <span> | 172 |
| release-label-value | <span> | 176 |
| release-rate | <input> | 179 |
| release-ghost | <span> | 180 |
| release-value | <span> | 182 |
| sustain-label-value | <span> | 186 |
| sustain-length | <input> | 189 |
| sustain-ghost | <span> | 190 |
| sustain-value | <span> | 192 |
| profile-search | <input> | 197 |
| profile-list | <div> | 198 |
| profile-meta | <div> | 199 |
| profile-save | <button> | 201 |
| profile-apply | <button> | 202 |
| test-envelope | <button> | 207 |
| piano-panel | <section> | 214 |
| piano-options | <div> | 216 |
| instrument-browser-panel | <section> | 219 |
| instrument-preset-search | <input> | 223 |
| instrument-preset-list | <div> | 224 |
| instrument-preset-meta | <div> | 225 |
| instrument-preset-apply | <button> | 227 |
| game-settings-modal | <section> | 232 |
| game-settings-backdrop | <button> | 233 |
| game-settings-title | <h4> | 238 |
| game-settings-close | <button> | 240 |
| practice-mode | <select> | 249 |
| game-key-count-down-oct | <button> | 261 |
| game-key-count-down | <button> | 263 |
| game-key-count-value | <span> | 264 |
| game-key-count-up | <button> | 265 |
| game-key-count-up-oct | <button> | 266 |
| note-count | <input> | 278 |
| note-count-value | <span> | 279 |
| blind-mode | <input> | 287 |
| training-mode | <select> | 312 |
| chord-difficulty | <select> | 327 |
| chord-tutorial-open-options | <button> | 339 |
| chord-root-hint | <input> | 352 |
| hide-live-preview | <input> | 365 |
| typing-show-typed | <input> | 378 |
| typing-show-piano | <input> | 391 |
| chord-extra-helpers | <input> | 404 |
| primary-action | <button> | 426 |
| play-selected | <button> | 427 |
| quick-start | <section> | 430 |
| keyboard | <div> | 448 |
| white-keys | <div> | 449 |
| black-keys | <div> | 450 |
| pedal-icon | <div> | 455 |
| chord-readout | <section> | 460 |
| typing-zone | <section> | 461 |
| chord-answer | <input> | 465 |
| typing-help-toggle | <button> | 466 |
| status-panel | <section> | 472 |
| round-count | <span> | 474 |
| selected-list | <span> | 475 |
| goal-count | <span> | 476 |
| mode-label | <span> | 477 |
| game-settings-open | <button> | 480 |
| hint-button | <button> | 481 |
| result | <div> | 483 |
| helper-slot | <div> | 484 |
| reveal | <div> | 485 |
| hint-flag | <div> | 486 |
| pedal-tip | <span> | 492 |
| chord-tutorial-modal | <section> | 496 |
| chord-tutorial-backdrop | <button> | 497 |
| chord-tutorial-title | <h4> | 500 |
| chord-tutorial-close | <button> | 501 |
| chord-tutorial-step | <div> | 503 |
| chord-tutorial-current | <div> | 505 |
| chord-tutorial-piano | <div> | 508 |
| tutorial-row-root | <div> | 511 |
| chord-tutorial-root-list | <div> | 513 |
| tutorial-row-quality | <div> | 515 |
| chord-tutorial-quality-list | <div> | 517 |
| chord-tutorial-progress | <span> | 523 |
| chord-tutorial-prev | <button> | 525 |
| chord-tutorial-tabs | <div> | 526 |
| chord-tutorial-next | <button> | 528 |
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
| 1 | vendor/libfluidsynth-2.4.6.js?v=20260324154447 | 554 |
| 2 | vendor/js-synthesizer.min.js?v=20260324154447 | 555 |
| 3 | js/core.00-bootstrap.js?v=20260324154447 | 556 |
| 4 | js/core.10-constants.js?v=20260324154447 | 557 |
| 5 | js/core.20-envelope.js?v=20260324154447 | 558 |
| 6 | js/core.30-storage.js?v=20260324154447 | 559 |
| 7 | js/core.40-runtime.js?v=20260324154447 | 560 |
| 8 | js/core.50-soundfonts.js?v=20260324154447 | 561 |
| 9 | js/core.60-keyboard.js?v=20260324154447 | 562 |
| 10 | js/store/reducers.js?v=20260324154447 | 563 |
| 11 | js/store/actions.js?v=20260324154447 | 564 |
| 12 | js/store/selectors.js?v=20260324154447 | 565 |
| 13 | js/store/store.js?v=20260324154447 | 566 |
| 14 | js/features/round/state-mutations.js?v=20260324154447 | 567 |
| 15 | js/features/settings/state-mutations.js?v=20260324154447 | 568 |
| 16 | js/features/chords/index.js?v=20260324154447 | 569 |
| 17 | js/features/typing/index.js?v=20260324154447 | 570 |
| 18 | js/features/tutorial/index.js?v=20260324154447 | 571 |
| 19 | js/features/audio-preview/index.js?v=20260324154447 | 572 |
| 20 | js/features/input/index.js?v=20260324154447 | 573 |
| 21 | js/audio.00-bootstrap.js?v=20260324154447 | 574 |
| 22 | js/audio.10-soundfont-catalog.js?v=20260324154447 | 575 |
| 23 | js/audio.20-engine.js?v=20260324154447 | 576 |
| 24 | js/audio.30-playback.js?v=20260324154447 | 577 |
| 25 | js/audio.40-preview.js?v=20260324154447 | 578 |
| 26 | js/game.00-bootstrap.js?v=20260324154447 | 579 |
| 27 | js/game.10-chord-targets.js?v=20260324154447 | 580 |
| 28 | js/game.20-round-ui.js?v=20260324154447 | 581 |
| 29 | js/game.30-round-flow.js?v=20260324154447 | 582 |
| 30 | js/game.40-reveal-submit.js?v=20260324154447 | 583 |
| 31 | js/settings.00-profiles.js?v=20260324154447 | 584 |
| 32 | js/settings.10-dialogs.js?v=20260324154447 | 585 |
| 33 | js/settings.20-game.js?v=20260324154447 | 586 |
| 34 | js/settings.30-panels.js?v=20260324154447 | 587 |
| 35 | js/events.00-settings.js?v=20260324154447 | 588 |
| 36 | js/events.10-tutorial.js?v=20260324154447 | 589 |
| 37 | js/events.20-helper-cursor.js?v=20260324154447 | 590 |
| 38 | js/events.30-bindings.js?v=20260324154447 | 591 |

## CSS Maps
### css/00-theme.css
File: css/00-theme.css (1-236)

#### Top-Level CSS Blocks
| Selector | Lines |
|---|---|
| :root | 3-139 |
| body.theme-dark | 141-235 |

### css/01-base.css
File: css/01-base.css (1-390)

#### Top-Level CSS Blocks
| Selector | Lines |
|---|---|
| * | 1-3 |
| body | 5-17 |
| body.landing | 19-21 |
| .app | 23-39 |
| .app>section, .app>header, .app>footer | 43-45 |
| .hero | 47-51 |
| .badge | 53-66 |
| h1 | 68-72 |
| .hero p | 74-80 |
| body:not(.landing) .hero h1, body:not(.landing) .hero p | 83-85 |
| body:not(.landing) .tips | 87-89 |
| .hero, .actions, .quick-start, .game-stack, .tips | 95-98 |
| body:not(.landing) .hero | 100-104 |
| .control | 106-112 |
| .control.compact | 114-116 |
| .control.compact>label | 118-120 |
| .control.compact .control-row | 122-124 |
| .control>label | 126-133 |
| .control-row | 135-139 |
| .control-row.toggle-row | 141-144 |
| .control-row.toggle-row .switch | 146-148 |
| .control-row.toggle-row .unit | 150-152 |
| .control-row.align-end | 154-157 |
| .start-note-row | 159-161 |
| .start-note-stepper | 163-173 |
| .range-hidden | 175-177 |
| .start-note-value | 179-185 |
| .step-btn | 187-199 |
| .step-btn.oct | 201-207 |
| .step-btn:hover | 209-212 |
| .advanced-test | 214-217 |
| .advanced-test .unit | 219-222 |
| input[type="number"] | 224-233 |
| .segmented | 235-239 |
| .segmented-btn | 241-250 |
| .segmented-btn.active | 252-256 |
| .actions | 258-264 |
| .quick-start | 266-272 |
| .quick-mode-btn | 274-287 |
| .quick-mode-btn:hover, .quick-mode-btn:focus-visible | 290-295 |
| .quick-mode-title | 297-303 |
| .quick-mode-sub | 305-309 |
| body:not(.landing) .quick-start | 311-313 |
| .btn | 315-322 |
| .btn:focus-visible | 324-327 |
| .btn.primary | 329-333 |
| .btn.secondary | 335-339 |
| .btn.ghost | 341-345 |
| .btn.submit | 347-351 |
| .btn:hover | 353-355 |
| body[data-reduced-motion="true"] | 357-365 |
| @keyframes app-pulse | 367-380 |
| .pulse-once | 382-385 |
| body[data-reduced-motion="true"] .pulse-once | 387-389 |

### css/02-chord-typing.css
File: css/02-chord-typing.css (1-231)

#### Top-Level CSS Blocks
| Selector | Lines |
|---|---|
| .chord-readout | 1-22 |
| .chord-link | 24-33 |
| .chord-input-hint | 35-39 |
| .chord-link-bubble | 41-62 |
| .chord-link-bubble::after | 64-73 |
| .chord-link:hover .chord-link-bubble | 75-78 |
| .chord-link-bubble:hover | 80-83 |
| body.suppress-chord-bubbles .chord-link-bubble | 85-88 |
| .chord-link:focus-visible | 90-92 |
| .chord-label-suffix, .chord-divider | 95-98 |
| .chord-readout[hidden] | 100-102 |
| .chord-readout.is-ghost | 104-107 |
| .typing-zone | 109-120 |
| .game-stack | 122-127 |
| .typing-zone label | 129-136 |
| .typing-zone input[type="text"] | 138-150 |
| .typing-zone input[type="text"]::placeholder | 152-155 |
| .typing-row | 157-160 |
| .typing-input-wrap | 162-164 |
| .typing-help-toggle | 166-183 |
| .typing-help-toggle:hover | 185-188 |
| .typing-help-toggle:focus-visible | 190-193 |
| .typing-help-text | 195-201 |
| .typing-help-text strong | 203-205 |
| .typing-help-actions | 207-209 |
| .typing-learn-btn | 211-221 |
| .typing-learn-btn:hover | 223-225 |
| .typing-learn-btn:focus-visible | 227-230 |

### css/03-modals.css
File: css/03-modals.css (1-346)

#### Top-Level CSS Blocks
| Selector | Lines |
|---|---|
| body.modal-open | 1-3 |
| .tutorial-modal | 5-12 |
| .tutorial-modal[hidden] | 14-16 |
| .tutorial-backdrop | 18-24 |
| .tutorial-card | 26-39 |
| .game-settings-modal | 41-48 |
| .game-settings-modal[hidden] | 50-52 |
| .game-settings-card | 54-66 |
| .game-settings-head | 68-73 |
| .game-settings-kicker | 75-80 |
| .game-settings-grid | 82-87 |
| .game-settings-group | 89-97 |
| .game-settings-group-title | 99-103 |
| .game-settings-group-body | 105-108 |
| .app-dialog | 110-117 |
| .app-dialog[hidden] | 119-121 |
| .app-dialog-card | 123-133 |
| .app-dialog-head | 135-140 |
| .app-dialog-body | 142-146 |
| .app-dialog-input-row | 148-151 |
| .app-dialog-input-row input | 153-160 |
| .app-dialog-actions | 162-166 |
| .tutorial-card.tutorial-overflow-scroll | 168-171 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-step | 173-179 |
| .tutorial-card.tutorial-overflow-scroll .tutorial-lab | 181-188 |
| .tutorial-card.tutorial-fit-1 | 190-193 |
| .tutorial-card.tutorial-fit-1 .tutorial-step | 195-198 |
| .tutorial-card.tutorial-fit-1 .tutorial-lab | 200-203 |
| .tutorial-card.tutorial-fit-1 .tutorial-chip | 205-208 |
| .tutorial-card.tutorial-fit-1 .tutorial-quality-table th | 210-212 |
| .tutorial-card.tutorial-fit-1 .tutorial-piano | 214-219 |
| .tutorial-card.tutorial-fit-2 | 221-224 |
| .tutorial-card.tutorial-fit-2 .tutorial-head h4 | 226-228 |
| .tutorial-card.tutorial-fit-2 .tutorial-step | 230-233 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-title | 235-237 |
| .tutorial-card.tutorial-fit-2 .tutorial-step-body | 239-242 |
| .tutorial-card.tutorial-fit-2 .tutorial-lab | 244-247 |
| .tutorial-card.tutorial-fit-2 .tutorial-current | 249-251 |
| .tutorial-card.tutorial-fit-2 .tutorial-selector-title | 253-255 |
| .tutorial-card.tutorial-fit-2 .tutorial-chip | 257-260 |
| .tutorial-card.tutorial-fit-2 .tutorial-quality-table th | 262-265 |
| .tutorial-card.tutorial-fit-2 .tutorial-piano | 267-272 |
| .tutorial-card.tutorial-fit-2 .tutorial-actions .advanced-trigger | 274-277 |
| .tutorial-card.tutorial-fit-3 | 279-282 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-kicker | 284-286 |
| .tutorial-card.tutorial-fit-3 .tutorial-step | 288-291 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-title | 293-295 |
| .tutorial-card.tutorial-fit-3 .tutorial-step-body | 297-300 |
| .tutorial-card.tutorial-fit-3 .tutorial-lab | 302-305 |
| .tutorial-card.tutorial-fit-3 .tutorial-current | 307-309 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano-title | 311-314 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th | 316-319 |
| .tutorial-card.tutorial-fit-3 .tutorial-quality-table th, .tutorial-card.tutorial-... | 322-324 |
| .tutorial-card.tutorial-fit-3 .tutorial-chip | 326-329 |
| .tutorial-card.tutorial-fit-3 .tutorial-piano | 331-336 |
| .tutorial-card.tutorial-fit-3 .tutorial-actions .advanced-trigger | 338-341 |
| .tutorial-card.tutorial-fit-3 .tutorial-progress | 343-345 |

### css/04-tutorial.css
File: css/04-tutorial.css (1-537)

#### Top-Level CSS Blocks
| Selector | Lines |
|---|---|
| .tutorial-head | 1-6 |
| .tutorial-head h4 | 8-12 |
| .tutorial-close | 14-16 |
| .tutorial-step | 18-26 |
| .tutorial-step-kicker | 28-34 |
| .tutorial-step.focus-flash | 36-38 |
| @keyframes tutorial-focus-flash | 40-48 |
| .tutorial-step-title | 50-53 |
| .tutorial-step-body | 55-59 |
| .tutorial-step-body p | 61-63 |
| .tutorial-step-body p+p | 65-67 |
| .tutorial-example-list | 69-74 |
| .tutorial-example-list code | 76-82 |
| .tutorial-actions | 84-91 |
| .tutorial-progress-wrap | 93-101 |
| .tutorial-progress | 103-109 |
| .tutorial-progress-row | 111-117 |
| .tutorial-progress-tabs | 119-137 |
| .tutorial-progress-tabs::-webkit-scrollbar | 139-141 |
| .tutorial-progress-tab | 143-164 |
| .tutorial-progress-step | 166-179 |
| .tutorial-progress-label | 181-188 |
| .tutorial-progress-tabs.compact .tutorial-progress-label | 190-192 |
| .tutorial-progress-tabs.compact .tutorial-progress-tab | 194-196 |
| .tutorial-progress-tabs::before | 198-210 |
| .tutorial-progress-tabs::after | 212-226 |
| .tutorial-progress-tab.complete | 228-230 |
| .tutorial-progress-tab.complete .tutorial-progress-step | 232-236 |
| .tutorial-progress-tab.active | 238-240 |
| .tutorial-progress-tab.active .tutorial-progress-step | 242-249 |
| .tutorial-progress-tab:focus-visible | 251-254 |
| .tutorial-progress-tab:hover, .tutorial-progress-tab:focus-visible | 257-259 |
| .tutorial-progress-row>button | 261-263 |
| .tutorial-lab | 265-274 |
| .tutorial-current | 276-280 |
| .tutorial-selector-block | 282-285 |
| .tutorial-control-matrix | 287-294 |
| .tutorial-control-row | 296-304 |
| .tutorial-control-row.locked | 306-308 |
| .tutorial-control-row.locked::after | 310-317 |
| .tutorial-control-row.newly-unlocked | 319-321 |
| @keyframes tutorial-unlock | 323-331 |
| .tutorial-selector-title | 333-339 |
| .tutorial-chip-list | 341-345 |
| #chord-tutorial-quality-list | 347-350 |
| .tutorial-quality-table | 352-357 |
| .tutorial-quality-table th, .tutorial-quality-table td | 360-364 |
| .tutorial-quality-table tr:first-child th, .tutorial-quality-table tr:first-child td | 367-369 |
| .tutorial-quality-table th | 371-380 |
| .tutorial-chip-group-list | 382-386 |
| .tutorial-chip | 388-400 |
| .tutorial-chip.unlocked | 402-405 |
| .tutorial-chip.unlocked:hover, .tutorial-chip.unlocked:focus-visible | 408-411 |
| .tutorial-chip[disabled] | 413-417 |
| .tutorial-chip.locked | 419-426 |
| .tutorial-chip:hover, .tutorial-chip:focus-visible | 429-432 |
| .tutorial-chip.active | 434-437 |
| .tutorial-chip.muted | 439-442 |
| .tutorial-chip.muted:hover, .tutorial-chip.muted:focus-visible | 445-447 |
| .tutorial-chip.newly-unlocked | 449-452 |
| .tutorial-chip.locked.newly-unlocked | 454-457 |
| .tutorial-piano-wrap | 459-464 |
| .tutorial-piano-title | 466-473 |
| .tutorial-piano | 475-486 |
| .tutorial-key | 488-493 |
| .tutorial-key.white | 495-503 |
| .tutorial-key.black | 505-513 |
| .tutorial-key.tone | 515-517 |
| .tutorial-key.tone.root | 519-521 |
| .tutorial-key[data-role]::after | 523-536 |

### css/05-helper-cursor.css
File: css/05-helper-cursor.css (1-333)

#### Top-Level CSS Blocks
| Selector | Lines |
|---|---|
| .helper-card | 1-11 |
| .helper-head | 13-19 |
| .helper-title | 21-26 |
| .helper-meta | 28-33 |
| .helper-list | 35-39 |
| .helper-item | 41-58 |
| .helper-item:not(.pinned):not(.latched) | 60-64 |
| .helper-item::before | 66-86 |
| .helper-item::after | 88-102 |
| .helper-item>* | 104-107 |
| .helper-item:hover, .helper-item:focus-within | 110-115 |
| .helper-item:focus-visible | 117-120 |
| .helper-item.pinned | 122-130 |
| .helper-item.pinned::after | 132-139 |
| .helper-item.pinned .helper-label | 141-143 |
| .helper-item.latched | 145-150 |
| .helper-item.latched .helper-label | 152-154 |
| @media (hover: hover) and (pointer: fine) | 156-162 |
| body.system-cursor-hidden, body.system-cursor-hidden * | 165-167 |
| .app-cursor | 169-182 |
| .app-cursor.visible | 184-186 |
| .app-cursor-ring, .app-cursor-dot | 189-196 |
| .app-cursor-ring | 198-206 |
| .app-cursor-dot | 208-212 |
| .app-cursor.is-interactive .app-cursor-ring | 214-219 |
| .app-cursor.is-interactive .app-cursor-dot | 221-223 |
| .app-cursor.is-helper .app-cursor-ring | 225-232 |
| .app-cursor.is-helper .app-cursor-dot | 234-239 |
| .app-cursor.is-text .app-cursor-ring | 241-246 |
| .app-cursor.is-pressed .app-cursor-ring | 248-250 |
| .app-cursor.is-pressed .app-cursor-dot | 252-254 |
| .helper-label | 256-266 |
| .helper-item .helper-value | 268-276 |
| .helper-item .helper-mask | 278-287 |
| .helper-item .helper-real | 289-302 |
| .helper-item.pinned .helper-real | 304-306 |
| .helper-item.latched .helper-real | 308-310 |
| .helper-item:hover .helper-mask, .helper-item:focus-within .helper-mask, .helper-i... | 316-319 |
| .helper-item:hover .helper-real, .helper-item:focus-within .helper-real, .helper-i... | 325-328 |
| .typing-zone[hidden] | 330-332 |

### css/06-panels-status.css
File: css/06-panels-status.css (1-972)

#### Top-Level CSS Blocks
| Selector | Lines |
|---|---|
| .status | 1-12 |
| .status[hidden] | 14-16 |
| .helper-slot[hidden] | 18-20 |
| .status-actions | 22-28 |
| .hint-flag | 30-43 |
| .hint-flag[hidden] | 45-47 |
| .hint-button | 49-51 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) | 53-67 |
| .settings-toggle | 69-71 |
| .theme-toggle | 73-75 |
| .home-toggle | 77-79 |
| :is(.settings-toggle, .theme-toggle, .home-toggle):hover | 81-83 |
| :is(.settings-toggle, .theme-toggle, .home-toggle) svg | 85-89 |
| .settings-toggle svg | 91-94 |
| .settings-panel | 96-115 |
| .settings-panel.open | 117-121 |
| .settings-panel h2 | 123-128 |
| .settings-body | 130-134 |
| .settings-grid | 136-139 |
| .settings-section-title | 141-149 |
| .panel-trigger, .advanced-trigger, .dropdown-trigger, .control select | 154-163 |
| .advanced-trigger | 165-169 |
| .dropdown-trigger | 171-179 |
| .dropdown-trigger svg | 181-185 |
| .panel-trigger | 187-192 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger):hover | 194-197 |
| .panel-trigger:hover | 199-201 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger)[aria-expanded="true"] | 203-206 |
| :is(.panel-trigger, .advanced-trigger, .dropdown-trigger, .control select):focus-v... | 208-211 |
| .control select | 213-217 |
| .options-panel | 219-235 |
| .options-panel.open | 237-241 |
| .options-panel h3 | 243-250 |
| .options-grid | 252-255 |
| .options-panel .control | 257-263 |
| .options-panel .control.compact | 265-267 |
| .options-panel .control>label | 269-271 |
| .options-section-title | 273-282 |
| .options-panel .options-section-title:first-child | 284-288 |
| .advanced-panel | 290-309 |
| .advanced-panel.open | 311-315 |
| .advanced-panel h3 | 317-322 |
| .advanced-grid | 324-333 |
| .advanced-grid::-webkit-scrollbar | 335-337 |
| .advanced-grid::-webkit-scrollbar-track | 339-342 |
| .advanced-grid::-webkit-scrollbar-thumb | 344-348 |
| .inline-value | 350-357 |
| .slider-stack | 359-362 |
| .slider-stack input[type="range"] | 364-368 |
| .slider-ghost | 370-384 |
| .slider-ghost.visible | 386-388 |
| .sf2-browser | 390-393 |
| .sf2-browser input[type="text"] | 395-404 |
| .sf2-preset-list | 406-419 |
| .sf2-browser .piano-desc | 421-424 |
| .sf2-browser .piano-desc.pending, .profile-browser .piano-desc.pending | 427-429 |
| .sf2-group | 431-436 |
| .sf2-group-title | 438-447 |
| .sf2-row | 449-457 |
| .sf2-row:first-child | 459-461 |
| .sf2-row:hover | 463-465 |
| .sf2-row.active | 467-470 |
| .sf2-row-name | 472-478 |
| .sf2-row-program, .sf2-row-bank | 481-485 |
| .sf2-empty | 487-491 |
| .profile-browser | 493-496 |
| .profile-browser input[type="text"] | 498-507 |
| .profile-list | 509-522 |
| .profile-row | 524-534 |
| .profile-row:hover | 536-538 |
| .profile-row.active | 540-543 |
| .profile-row.applied | 545-547 |
| .profile-row-name | 549-555 |
| .profile-row-kind | 557-562 |
| .advanced-footer | 564-570 |
| .piano-preview.wide | 572-584 |
| .piano-preview.wide::before | 586-588 |
| .piano-preview.wide .play-icon | 590-596 |
| .piano-preview.wide .play-label | 598-600 |
| .instrument-browser-panel | 602-617 |
| .instrument-browser-panel.open | 619-623 |
| .instrument-browser-panel h3 | 625-630 |
| .piano-panel | 632-647 |
| .piano-panel.open | 649-653 |
| .piano-panel h3 | 655-660 |
| .piano-options | 662-665 |
| .piano-option | 667-679 |
| .piano-option.active | 681-684 |
| .piano-option:focus-visible | 686-688 |
| .piano-info | 690-693 |
| .piano-name | 695-698 |
| .piano-desc | 700-703 |
| .piano-option.simple .piano-name | 705-709 |
| .piano-option.simple .piano-desc | 711-715 |
| .piano-preview | 717-732 |
| .piano-preview::before | 734-742 |
| .piano-preview:active | 744-747 |
| .piano-preview.main | 749-753 |
| .settings-grid input[type="range"], .game-settings-grid input[type="range"], .adva... | 758-762 |
| :where(.settings-grid, .game-settings-grid, .advanced-panel, .options-panel) input... | 764-769 |
| :where(.settings-grid, .game-settings-grid, .advanced-panel, .options-panel) input... | 771-780 |
| :where(.settings-grid, .game-settings-grid, .advanced-panel, .options-panel) input... | 782-785 |
| :where(.settings-grid, .game-settings-grid, .advanced-panel, .options-panel) input... | 787-792 |
| :where(.settings-grid, .game-settings-grid, .advanced-panel, .options-panel) input... | 794-801 |
| :where(.settings-grid, .game-settings-grid, .advanced-panel, .options-panel) input... | 803-806 |
| .volume-value | 808-811 |
| .status-row | 813-818 |
| .switch | 820-829 |
| .switch input | 831-836 |
| .switch-track | 838-844 |
| .switch-thumb | 846-856 |
| .switch input:checked+.switch-track | 858-860 |
| .switch input:checked+.switch-track .switch-thumb | 862-864 |
| .switch input:focus-visible+.switch-track | 866-869 |
| .control.compact .unit | 871-873 |
| .test-tone | 875-887 |
| .test-tone:hover | 889-892 |
| .test-tone:active | 894-896 |
| .test-tone-icon | 898-905 |
| .test-tone-label | 907-911 |
| .result | 913-917 |
| .reveal | 919-927 |
| .reveal strong | 929-931 |
| .reveal-label | 933-940 |
| .reveal-grid.compact | 942-950 |
| .reveal-cell | 952-955 |
| .reveal-cell.reveal-target-chord | 957-959 |
| .reveal-cell.reveal-target-notes | 961-963 |
| .reveal-cell.reveal-your-chord | 965-967 |
| .reveal-cell.reveal-your-notes | 969-971 |

### css/07-keyboard.css
File: css/07-keyboard.css (1-463)

#### Top-Level CSS Blocks
| Selector | Lines |
|---|---|
| .keyboard-zone | 1-11 |
| .keyboard-stack | 13-23 |
| .keyboard-wrapper | 25-34 |
| .keyboard | 36-43 |
| .keyboard-wrapper.ends-black | 45-47 |
| .white-keys | 49-52 |
| .black-keys | 54-61 |
| .key | 63-74 |
| .key.white | 76-83 |
| .key.white.has-black | 85-87 |
| .key.black | 89-98 |
| .key span | 100-104 |
| .key.black span | 106-110 |
| .key.active | 112-115 |
| .key.black.active | 117-120 |
| .key.selected | 122-126 |
| .key.typed-preview | 128-130 |
| .key.correct | 132-136 |
| .key.wrong | 138-142 |
| .key.missed | 144-150 |
| .key.black.selected, .key.black.correct, .key.black.wrong | 154-156 |
| .key.black.missed | 158-164 |
| .keyboard.disabled | 166-172 |
| body.tutorial-open .keyboard | 174-176 |
| body.tutorial-open .keyboard.disabled | 178-181 |
| .keyboard.disabled::before | 183-195 |
| body.tutorial-open .keyboard.disabled::before | 197-199 |
| .keyboard.disabled::after | 201-235 |
| body.tutorial-open .keyboard.disabled::after | 237-239 |
| .tips | 241-250 |
| #pedal-tip[hidden] | 252-254 |
| .pedal-box | 256-270 |
| body.landing .pedal-box | 272-274 |
| .pedal-label | 276-286 |
| .pedal-icon | 288-295 |
| .pedal-icon.active | 297-300 |
| .note-pills | 302-309 |
| .reveal-grid.compact .note-pills | 311-313 |
| .note-pill | 315-321 |
| .reveal-grid.compact .note-pill | 323-326 |
| .note-pill.chord-pill | 328-336 |
| .note-pill.chord-pill .chord-link | 338-340 |
| .note-pill.chord-pill .chord-link-bubble | 342-347 |
| .note-pill.chord-pill:hover .chord-link-bubble | 349-352 |
| .note-pill.good | 354-358 |
| .note-pill.bad | 360-364 |
| .note-pill.missed | 366-370 |
| .note-pill.neutral | 372-376 |
| @media (max-width: 700px) | 378-433 |
| @media (max-height: 820px) | 435-456 |
| @media (max-height: 700px) | 458-463 |

## Documentation + Tooling Maps
### README.md
File: README.md (1-155)
| Heading | Line |
|---|---:|
| TheEarLab | 1 |
| Read First | 5 |
| Project Layout | 49 |
| Run Locally | 67 |
| SF2 Behavior | 81 |
| Chord Training Modes | 104 |
| Maintenance Rules | 146 |
| Verification | 153 |

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
File: AGENTS.md (1-67)
| Heading | Line |
|---|---:|
| Agent Instructions (Project Local) | 1 |
| Priority Order | 5 |
| Source of Truth | 12 |
| Required Update Workflow | 56 |
| Documentation Quality Bar | 64 |

### tools/generate-project-map.ps1
File: tools/generate-project-map.ps1 (1-582)
| Function | Start Line |
|---|---:|
| Get-LineCount | 9 |
| Count-Braces | 18 |
| Get-JsFunctionRanges | 25 |
| Get-JsEventBindings | 79 |
| Get-CssBlocks | 97 |
| Get-IndexIds | 159 |
| Get-IndexScripts | 177 |
| Get-IndexStyles | 194 |
| Get-MarkdownHeadings | 211 |
| Get-PsFunctionStarts | 229 |

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
### js/audio.00-bootstrap.js (Active Runtime)
File lines: 1-192

| Symbol | Lines |
|---|---|
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

### js/audio.10-soundfont-catalog.js (Active Runtime)
File lines: 1-423

| Symbol | Lines |
|---|---|
| normalizeSampleEntries | 1-32 |
| normalizeSoundfontConfig | 34-56 |
| getFilenameFromPath | 58-62 |
| toManifestRelativePath | 64-74 |
| getManifestEntries | 76-79 |
| getManifestConfigPaths | 81-98 |
| getManifestSf2Paths | 100-117 |
| getDirectoryEntries | 119-122 |
| getDirectoryConfigPaths | 124-142 |
| getDirectorySf2Paths | 144-154 |
| discoverExternalSoundfonts | 156-170 |
| discoverSf2Paths | 172-176 |
| getSf2SimplePrograms | 178-186 |
| findSf2PresetName | 188-192 |
| createSf2SimplePresets | 194-216 |
| makeSf2PresetKey | 218-218 |
| ensureSf2SynthReady | 220-246 |
| loadSf2Pack | 248-280 |
| rebuildSf2PresetBrowser | 282-303 |
| refreshSf2PresetBrowserEntries | 305-308 |
| getSf2PresetBrowserEntries | 310-315 |
| selectSf2BrowserPreset | 317-347 |
| refreshSoundfontCatalog | 349-422 |

### js/audio.20-engine.js (Active Runtime)
File lines: 1-473

| Symbol | Lines |
|---|---|
| ensureAudio | 1-39 |
| getSelectedSoundfont | 41-53 |
| getSourceEntry | 55-60 |
| removeVoice | 62-104 |
| releaseVoice | 106-153 |
| releaseVoices | 155-160 |
| stopAllNotes | 162-211 |
| stopNotesById | 213-225 |
| abortPlayback | 227-229 |
| getSoundfontEnvelope | 231-248 |
| scheduleSampleEnvelope | 250-267 |
| createGeneratedSampleBuffer | 269-312 |
| buildGeneratedSampleSet | 314-324 |
| decodeAudioBuffer | 326-333 |
| buildExternalSampleSet | 335-356 |
| applySf2TrimGenerators | 358-366 |
| getSf2NoteDuration | 368-378 |
| ensureSf2PresetReady | 380-394 |
| ensureSoundfontReady | 396-472 |

### js/audio.30-playback.js (Active Runtime)
File lines: 1-277

| Symbol | Lines |
|---|---|
| findNearestSample | 1-14 |
| scheduleSf2Note | 16-71 |
| noteOff | 57-63 |
| scheduleWithEntry | 92-137 |
| registerKeyTimer | 152-159 |
| unregisterKeyTimer | 161-170 |
| clearKeyTimersForNote | 172-180 |
| activateKey | 182-188 |
| scheduleKeyRelease | 190-203 |
| scheduleKeyAnimation | 205-216 |
| playNotes | 218-271 |
| playNotesNow | 273-276 |

Event bindings:
| Target | Event | Line |
|---|---|---:|
| source | ended | 134 |

### js/audio.40-preview.js (Active Runtime)
File lines: 1-164

| Symbol | Lines |
|---|---|
| clearPreviewTimers | 1-4 |
| stopPreviewPlayback | 6-32 |
| schedulePreviewEvent | 34-40 |
| previewNoteOn | 42-53 |
| previewNoteOff | 55-64 |
| previewPedalOn | 66-85 |
| activate | 70-75 |
| previewPedalOff | 87-101 |
| buildPreviewSequence | 103-147 |

### js/core.00-bootstrap.js (Active Runtime)
File lines: 1-284

_No function declarations detected._

### js/core.10-constants.js (Active Runtime)
File lines: 1-295

| Symbol | Lines |
|---|---|
| normalizePracticeProfile | 147-167 |
| normalizePracticeProfiles | 168-175 |
| isTypingOnlyModeFromState | 179-179 |
| getEffectiveBlindModeFromState | 183-183 |
| getEffectivePracticeModeFromState | 184-192 |
| capturePracticeProfileFromState | 193-214 |

### js/core.20-envelope.js (Active Runtime)
File lines: 1-80

| Symbol | Lines |
|---|---|
| clampEnvelopeValue | 22-22 |
| resolveEnvelopeMetrics | 35-70 |

### js/core.30-storage.js (Active Runtime)
File lines: 1-133

| Symbol | Lines |
|---|---|
| saveSettings | 4-36 |
| loadSettings | 38-96 |
| resetAllSettings | 98-132 |

### js/core.40-runtime.js (Active Runtime)
File lines: 1-145

| Symbol | Lines |
|---|---|
| buildNotes | 47-62 |
| getNoteIdByMidi | 64-71 |
| isConsonant | 89-92 |
| getNicePool | 94-94 |
| getNoteCountMax | 96-100 |
| updateNoteCountMax | 102-110 |
| getCssNumber | 112-112 |
| clamp | 113-113 |
| getMaxStartMidi | 116-116 |
| clampStartMidi | 117-117 |
| getMidiLabel | 118-122 |
| getPanelBottomGap | 123-126 |
| syncReducedMotionPreference | 129-134 |

Event bindings:
| Target | Event | Line |
|---|---|---:|
| motionQuery | change | 137 |

### js/core.50-soundfonts.js (Active Runtime)
File lines: 1-91

| Symbol | Lines |
|---|---|
| normalizeSoundfontDefinition | 1-19 |
| setSoundfontCatalog | 21-42 |
| getSoundfontList | 44-44 |
| renderPianoOptions | 46-90 |

### js/core.60-keyboard.js (Active Runtime)
File lines: 1-60

| Symbol | Lines |
|---|---|
| createKey | 1-12 |
| renderKeyboard | 14-46 |
| rebuildKeyboard | 48-59 |

### js/events.00-settings.js (Active Runtime)
File lines: 1-637

| Symbol | Lines |
|---|---|
| primeAudioFromGesture | 5-14 |
| shouldRestartRoundForSetting | 30-33 |
| patchSettingsState | 35-41 |
| adjustKeyCount | 416-419 |
| bindKeyCountStepper | 421-426 |

Event bindings:
| Target | Event | Line |
|---|---|---:|
| document | pointerdown | 16 |
| document | keydown | 17 |
| document | touchstart | 18 |
| noteCountInput | input | 75 |
| noteCountInput | change | 82 |
| noteCountInput | pointerup | 86 |
| button | click | 91 |
| button | click | 106 |
| blindToggle | change | 114 |
| hideLivePreviewToggle | change | 123 |
| practiceModeSelect | change | 133 |
| trainingModeSelect | change | 140 |
| chordDifficultySelect | change | 155 |
| chordExtraHelpersToggle | change | 172 |
| chordRootHintToggle | change | 182 |
| customCursorToggle | change | 198 |
| typingShowPianoToggle | change | 210 |
| typingShowTypedToggle | change | 220 |
| resetSettingsButton | click | 232 |
| settingsToggle | click | 246 |
| themeToggle | click | 255 |
| homeToggle | click | 266 |
| settingsPanel | click | 275 |
| optionsTrigger | click | 297 |
| gameSettingsOpen | click | 304 |
| gameSettingsBackdrop | click | 311 |
| gameSettingsClose | click | 318 |
| document | click | 324 |
| window | resize | 328 |
| playSelectedButton | click | 340 |
| playSelectedButton | pointerdown | 344 |
| playSelectedButton | pointerup | 349 |
| playSelectedButton | pointerleave | 353 |
| primaryActionButton | click | 357 |
| volumeSlider | input | 365 |
| lengthSlider | input | 371 |
| attackSlider | input | 377 |
| decaySlider | input | 383 |
| releaseSlider | input | 389 |
| sustainSlider | input | 395 |
| keyCountSlider | input | 401 |
| keyCountSlider | change | 408 |
| keyCountSlider | pointerup | 412 |
| hintButton | click | 431 |
| chordAnswerInput | input | 436 |
| chordAnswerInput | keydown | 443 |

### js/events.10-tutorial.js (Active Runtime)
File lines: 1-633

| Symbol | Lines |
|---|---|
| isChordTutorialOpen | 1-1 |
| fitTutorialLayout | 4-32 |
| clearFitClasses | 10-13 |
| applyFitClass | 15-20 |
| getTutorialStep | 34-39 |
| getStepUnlockedRootSet | 41-49 |
| getStepUnlockedQualitySet | 51-57 |
| isTutorialRootEnabled | 59-59 |
| isTutorialQualityEnabled | 60-60 |
| getTutorialRootLabel | 62-65 |
| midiToTutorialLabel | 67-71 |
| getClosestNoteIdFromMidi | 73-80 |
| getTutorialRenderedChord | 82-104 |
| ensureTutorialKeyboard | 106-144 |
| getStepAllowedQualityIds | 146-148 |
| getTutorialActiveSpec | 150-152 |
| renderTutorialCurrentText | 154-165 |
| renderTutorialPianoHighlight | 167-201 |
| renderTutorialRootOptions | 203-221 |
| renderTutorialQualityOptions | 223-268 |
| syncTutorialRootChipStates | 270-289 |
| syncTutorialQualityChipStates | 291-310 |
| setTutorialHoverSpec | 312-319 |
| clearTutorialHoverSpec | 321-324 |
| refreshTutorialVisuals | 326-330 |
| getTutorialStepIndexForQuality | 360-366 |
| renderChordTutorialTabs | 368-396 |
| fitTutorialProgressTabs | 398-403 |
| renderChordTutorialStep | 405-461 |
| closeChordTutorial | 463-502 |
| clearSuppress | 477-483 |
| openChordTutorial | 504-542 |
| wasPointerActivated | 544-550 |
| registerTutorialOpenTrigger | 552-559 |
| openChordTutorialForChordLink | 561-572 |
| handleChordLinkActivation | 574-581 |

Event bindings:
| Target | Event | Line |
|---|---|---:|
| window | pointermove | 485 |
| window | pointerdown | 486 |
| window | keydown | 487 |
| triggerEl | click | 554 |
| document | click | 583 |
| document | keydown | 584 |
| chordTutorialTabs | click | 590 |
| chordTutorialClose | click | 602 |
| chordTutorialBackdrop | click | 609 |
| chordTutorialPrev | click | 615 |
| chordTutorialNext | click | 623 |

### js/events.20-helper-cursor.js (Active Runtime)
File lines: 1-818

| Symbol | Lines |
|---|---|
| syncHelperPinnedUi | 1-10 |
| shouldBlurAfterPointer | 23-28 |
| toggleRootHintFromHelper | 30-47 |
| toggleHelperPinned | 49-89 |
| getCursorTarget | 91-96 |
| handleHelperPinEvent | 98-104 |
| isEventsTypingEnabled | 190-190 |
| isEventsTypingOnlyMode | 191-191 |
| getEventsChordRound | 192-192 |
| isChordTypingCaptureActive | 194-199 |
| insertTypedCharacter | 201-208 |
| triggerPrimaryAction | 211-220 |
| getButtonLikeTarget | 223-223 |
| blurPointerActivatedControl | 224-231 |
| markHelperIndicatorDirty | 261-264 |
| getHelperIndicatorItems | 266-278 |
| ensureHelperIndicatorObserver | 292-296 |
| getHelperIndicatorCache | 298-333 |
| updateHelperIndicatorPositions | 335-345 |
| scheduleHelperIndicatorUpdate | 347-359 |
| isPointerInsideRect | 361-367 |
| handleHelperIndicatorProximity | 369-402 |
| ensureCustomCursorEl | 404-421 |
| getCustomCursorMode | 422-441 |
| syncCustomCursorState | 442-448 |
| renderCustomCursor | 449-462 |
| scheduleCustomCursorRender | 463-466 |
| scheduleCursorMotion | 468-471 |
| stepCursorMotion | 473-491 |
| setCustomCursorEnabled | 492-512 |
| applyCustomCursorMediaState | 513-516 |
| updateCustomCursorPosition | 525-547 |
| handleHelperPointerEnter | 549-554 |
| handleHelperPointerLeave | 556-561 |
| triggerReplayAction | 563-569 |
| bindDoubleClickReset | 571-574 |
| bindPianoOptionEvents | 717-742 |

Event bindings:
| Target | Event | Line |
|---|---|---:|
| document | click | 106 |
| document | keydown | 108 |
| document | contextmenu | 113 |
| chordTutorialRootList | mouseover | 116 |
| chordTutorialRootList | mouseleave | 124 |
| chordTutorialRootList | focusin | 127 |
| chordTutorialRootList | focusout | 135 |
| chordTutorialRootList | click | 138 |
| chordTutorialQualityList | mouseover | 154 |
| chordTutorialQualityList | mouseleave | 161 |
| chordTutorialQualityList | focusin | 164 |
| chordTutorialQualityList | focusout | 171 |
| chordTutorialQualityList | click | 174 |
| CUSTOM_CURSOR_QUERY | change | 518 |
| target | dblclick | 573 |
| startNoteDownButton | click | 597 |
| startNoteUpButton | click | 600 |
| startNoteDownOctButton | click | 606 |
| startNoteUpOctButton | click | 609 |
| profileSearch | input | 615 |
| profileList | click | 621 |
| profileList | dblclick | 626 |
| profileList | keydown | 629 |
| profileApply | click | 640 |
| profileSave | click | 646 |
| instrumentPresetSearch | input | 652 |
| instrumentPresetList | click | 658 |
| instrumentPresetList | dblclick | 663 |
| instrumentPresetList | keydown | 666 |
| instrumentPresetApply | click | 677 |
| advancedTrigger | click | 682 |
| advancedPanel | click | 687 |
| pianoTrigger | click | 692 |
| pianoPanel | click | 699 |
| instrumentBrowserTrigger | click | 705 |
| instrumentBrowserPanel | click | 712 |
| pianoOptionsContainer | click | 720 |
| pianoOptionsContainer | keydown | 734 |
| pianoPreviewMain | click | 745 |
| testEnvelopeButton | click | 752 |
| keyboardEl | pointerdown | 757 |
| document | pointerup | 793 |
| document | pointercancel | 800 |
| document | pointerdown | 807 |
| document | click | 815 |

### js/events.30-bindings.js (Active Runtime)
File lines: 1-434

| Symbol | Lines |
|---|---|
| handlePointerUpdate | 1-20 |
| isElementVisible | 78-84 |
| getFocusableElements | 86-90 |
| focusFirstInModal | 96-102 |
| trapModalFocus | 104-126 |
| isTextEditableTarget | 128-133 |
| getActiveModalEl | 135-140 |
| closeGameSettingsModalUi | 142-158 |
| openGameSettingsModalUi | 160-167 |
| closeActiveModal | 169-183 |
| moveFocusInPanel | 185-196 |
| setRandomBackgroundAngle | 386-389 |
| init | 391-428 |
| runDeferredCatalogLoad | 412-421 |

Event bindings:
| Target | Event | Line |
|---|---|---:|
| document | pointerrawupdate | 23 |
| document | pointermove | 25 |
| document | pointerup | 27 |
| document | pointercancel | 33 |
| document | pointerover | 38 |
| document | pointerout | 44 |
| document | pointerover | 53 |
| document | pointerout | 54 |
| window | blur | 56 |
| document | visibilitychange | 62 |
| keyboardEl | click | 70 |
| document | keydown | 198 |
| document | keyup | 334 |
| pedalBox | pointerdown | 353 |
| pedalBox | pointerup | 362 |
| pedalBox | pointercancel | 371 |
| pedalBox | pointerleave | 379 |

### js/game.00-bootstrap.js (Active Runtime)
File lines: 1-456

| Symbol | Lines |
|---|---|
| getHelperPinRound | 174-174 |
| syncHelperPinRound | 176-182 |
| getLocalPinnedHelperLabels | 184-187 |
| getGlobalPinnedHelperLabels | 189-189 |
| isHelperPinnedGlobalLabel | 191-195 |
| isHelperPinnedLocalLabel | 197-197 |
| toggleHelperPinnedLocalLabel | 203-213 |
| toggleHelperPinnedGlobalLabel | 215-226 |
| setHelperPinnedGlobalLabel | 228-246 |
| setRootHelperPinned | 248-252 |
| getHelperPinFlags | 254-262 |
| applyRoundStatePatch | 268-277 |
| applySubmissionStatePatch | 279-288 |
| normalizeQualityToken | 298-309 |
| renderChordLink | 318-342 |
| isTypingEnabled | 368-368 |
| isTypingOnlyMode | 369-369 |
| getIsChordRound | 370-370 |
| getEffectiveBlindMode | 371-371 |
| getKeyboardZoneEl | 372-372 |
| normalizePitchClass | 373-373 |
| getRootName | 374-374 |
| getMidiFromNoteId | 375-375 |
| buildChordLabel | 376-376 |
| getPitchClassSetFromNoteIds | 378-386 |
| getRootGuideNoteId | 392-407 |
| getEffectiveKeyboardSelection | 409-421 |
| getChordDifficultyId | 423-428 |
| getChordDisplayLabel | 430-430 |
| getChordQualityDisplaySuffix | 432-432 |
| getChordDifficultyConfig | 434-437 |
| getAllowedChordQualities | 439-444 |
| getChordQualityHint | 446-449 |

### js/game.10-chord-targets.js (Active Runtime)
File lines: 1-507

| Symbol | Lines |
|---|---|
| getConsistentPreviewDuration | 1-4 |
| playConsistentPreview | 10-28 |
| releaseInteractivePressSession | 65-93 |
| getReplayNoteIds | 95-119 |
| getVoicingHintLabel | 121-125 |
| randomSample | 127-134 |
| getNiceTarget | 136-173 |
| getQualityPitchClassSet | 175-181 |
| resolveQualityFromToken | 183-188 |
| parseBassToken | 190-204 |
| splitQualityAndBass | 206-226 |
| buildChordLabelWithBass | 228-234 |
| parseChordInput | 236-273 |
| detectChordFromNoteIds | 275-311 |
| normalizeIntervals | 313-315 |
| fitIntervalsToAvailableRange | 317-337 |
| buildVoicedIntervals | 339-367 |
| chooseRootCandidatesForIntervals | 369-378 |
| buildChordFromRoot | 380-408 |
| createChordTarget | 410-460 |
| createNoteTarget | 462-497 |
| createTarget | 499-506 |

### js/game.20-round-ui.js (Active Runtime)
File lines: 1-536

| Symbol | Lines |
|---|---|
| clearTypingAutoNext | 1-5 |
| ensureRoundPlaybackReady | 16-33 |
| getTypedPreviewNoteIds | 35-86 |
| updateTypedPreviewFromInput | 88-101 |
| buildTypedDisplayHtml | 103-110 |
| updateChordReadout | 112-182 |
| updateModeVisibility | 184-201 |
| updatePrimaryAction | 203-208 |
| updateReplayAvailability | 210-217 |
| getChordHelperHints | 219-235 |
| createDeterministicHelperMask | 253-281 |
| renderChordHelperBox | 283-313 |
| updateStatus | 315-439 |
| updateKeyStates | 441-502 |
| setKeyboardEnabled | 504-507 |
| updateKeyboardScale | 509-520 |
| lockKeyboardForPlayback | 522-535 |

### js/game.30-round-flow.js (Active Runtime)
File lines: 1-327

| Symbol | Lines |
|---|---|
| setSubmitted | 1-8 |
| goHome | 10-62 |
| refreshTarget | 64-90 |
| startRound | 92-168 |
| ensureRound | 170-179 |
| playTarget | 181-195 |
| startManualNote | 197-215 |
| releaseManualNote | 217-225 |
| releasePedalNotes | 227-237 |
| startPedalHold | 239-245 |
| stopPedalHold | 247-254 |
| toggleSelection | 256-300 |
| isSelectionCorrect | 302-319 |
| getPlaybackSpan | 321-326 |

### js/game.40-reveal-submit.js (Active Runtime)
File lines: 1-546

| Symbol | Lines |
|---|---|
| renderNotePills | 1-7 |
| renderChordPill | 9-13 |
| renderTonePills | 15-23 |
| renderRevealCell | 25-30 |
| renderChordRevealGrid | 32-35 |
| renderChordDetectionMeta | 37-41 |
| renderPressedPills | 43-48 |
| pulseFeedback | 50-59 |
| buildNoteComparison | 61-68 |
| buildAnswerNoteCell | 70-79 |
| buildTargetNoteCell | 81-94 |
| getSubmittedReplaySnapshot | 118-132 |
| playSubmittedReplaySequence | 134-147 |
| playRevealSequence | 149-199 |
| playSelectedChord | 201-225 |
| playTypedInputChord | 227-240 |
| startHeldPlayback | 242-268 |
| releaseHeldPlayback | 270-284 |
| normalizePitchClassLocal | 286-286 |
| getPitchClassLabel | 287-287 |
| getBassPcFromNoteIds | 288-295 |
| buildTypingRevealDetail | 297-323 |
| submitTypedAnswer | 325-407 |
| submitAnswer | 409-473 |
| sanitizeRoundStateForKeyboardRange | 475-515 |

### js/settings.00-profiles.js (Active Runtime)
File lines: 1-543

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

### js/settings.10-dialogs.js (Active Runtime)
File lines: 1-324

| Symbol | Lines |
|---|---|
| syncModalOpenClass | 1-8 |
| setAppDialogOpenState | 10-16 |
| openAppDialog | 18-65 |
| closeAppDialog | 67-73 |
| confirmAppDialog | 75-82 |
| cancelAppDialog | 84-87 |
| promptSaveCurrentResponseProfile | 122-135 |
| discardManualProfileChanges | 137-149 |
| resetAdsrTrim | 151-153 |
| resolveInstrumentSwitchProfileAction | 155-188 |
| applyInstrumentPresetSelection | 190-196 |
| setVolume | 198-208 |
| setPianoTone | 210-265 |
| setNoteLength | 267-276 |
| setAdsrTrim | 278-289 |
| playPianoPreview | 291-314 |

Event bindings:
| Target | Event | Line |
|---|---|---:|
| appDialogConfirm | click | 90 |
| appDialogCancel | click | 96 |
| appDialogBackdrop | click | 102 |
| appDialogClose | click | 108 |
| appDialogInput | keydown | 114 |

### js/settings.20-game.js (Active Runtime)
File lines: 1-298

| Symbol | Lines |
|---|---|
| normalizeChordDifficultyId | 1-6 |
| getKeyCountMinimum | 10-15 |
| resolveKeyCountForPreference | 26-30 |
| clampStartMidiForKeyCount | 32-35 |
| updateKeyCountDisplay | 37-47 |
| setKeyCount | 49-68 |
| setStartMidi | 70-79 |
| setKeyCountVisual | 81-84 |
| getEffectivePracticeMode | 86-86 |
| isSettingsTypingEnabled | 87-87 |
| refreshOptionsModeVisibility | 89-108 |
| setPracticeMode | 110-193 |
| applyUiFromState | 195-258 |
| commitCriticalChange | 265-270 |
| commitNoteCountChange | 272-281 |
| handleCriticalSettingChange | 283-297 |

### js/settings.30-panels.js (Active Runtime)
File lines: 1-300

| Symbol | Lines |
|---|---|
| openSettings | 1-6 |
| positionFloatingPanel | 8-37 |
| setGameSettingsModalOpenState | 39-49 |
| isGameSettingsModalOpenInternal | 51-51 |
| openGameSettingsModalInternal | 53-64 |
| closeGameSettingsModalInternal | 66-74 |
| positionPianoPanel | 76-79 |
| positionInstrumentBrowserPanel | 81-84 |
| getFloatingPanelConfig | 89-121 |
| isFloatingPanelOpen | 123-126 |
| setFloatingPanelOpenState | 128-133 |
| closeFloatingPanel | 139-152 |
| closeAllFloatingPanels | 154-160 |
| openFloatingPanel | 162-187 |
| toggleFloatingPanel | 189-194 |
| repositionOpenFloatingPanels | 196-204 |
| openOptionsPanel | 206-206 |
| closeOptionsPanel | 207-207 |
| openAdvanced | 208-208 |
| closeAdvanced | 209-209 |
| openPianoPanel | 210-210 |
| closePianoPanel | 211-211 |
| openInstrumentBrowser | 212-212 |
| closeInstrumentBrowser | 213-213 |
| closeSettings | 215-233 |

## Maintenance Notes
- js/app.*.js is an older branch snapshot. Keep it for reference unless explicitly retired.
- Functional edits should target loaded scripts first: core.*.js, audio.*.js, game.*.js, settings.*.js, events.*.js.
- If you intentionally switch runtime scripts, update script tags in index.html and regenerate this file.
- After verification, commit and push the updated files when repository remotes are configured.

