# TheEarLab

Browser-based piano ear-training app for note and chord recognition.

## Read First
1. Read [PROJECT_MAP.md](./PROJECT_MAP.md) before making edits.
2. Treat `index.html` script order as runtime truth:
   - `vendor/libfluidsynth-2.4.6.js`
   - `vendor/js-synthesizer.min.js`
   - `js/core.00-bootstrap.js`
   - `js/core.10-constants.js`
   - `js/core.20-envelope.js`
   - `js/core.30-storage.js`
   - `js/core.40-runtime.js`
   - `js/core.50-soundfonts.js`
   - `js/core.60-keyboard.js`
   - `js/store/reducers.js`
   - `js/store/actions.js`
   - `js/store/selectors.js`
   - `js/store/store.js`
   - `js/features/round/state-mutations.js`
   - `js/features/settings/state-mutations.js`
   - `js/features/chords/index.js`
   - `js/features/typing/index.js`
   - `js/features/tutorial/index.js`
   - `js/features/audio-preview/index.js`
   - `js/features/input/index.js`
   - `js/audio.00-bootstrap.js`
   - `js/audio.10-soundfont-catalog.js`
   - `js/audio.20-engine.js`
   - `js/audio.30-playback.js`
   - `js/audio.40-preview.js`
   - `js/game.00-bootstrap.js`
   - `js/game.10-chord-targets.js`
   - `js/game.20-round-ui.js`
   - `js/game.30-round-flow.js`
   - `js/game.40-reveal-submit.js`
   - `js/settings.00-profiles.js`
   - `js/settings.10-dialogs.js`
   - `js/settings.20-game.js`
   - `js/settings.30-panels.js`
   - `js/events.00-settings.js`
   - `js/events.10-tutorial.js`
   - `js/events.20-helper-cursor.js`
   - `js/events.30-bindings.js`
3. After edits, regenerate the map:
   - `powershell -NoProfile -ExecutionPolicy Bypass -File .\tools\generate-project-map.ps1`

## Project Layout
- `index.html`: app structure and script loading.
- `css/`: split stylesheets (theme tokens, base layout, chord/typing, modals, tutorial, helper/cursor, panels/status, keyboard + responsive).
- `vendor/`: bundled SF2 runtime dependencies (`libfluidsynth` + `js-synthesizer`).
- `js/core.*.js`: DOM references, shared runtime constants/copy, mode policy, envelope policy, soundfont catalog state, shared app state, note/key builders.
- `js/store/`: centralized state dispatcher (`store.js`), action creators (`actions.js`), reducers (`reducers.js`), and shared selectors/invariant helpers (`selectors.js`).
- `js/features/`: split feature-layer modules (`round`, `settings`, `chords`, `typing`, `tutorial`, `audio-preview`, `input`) with compatibility wrappers for migrated flows.
- `js/audio.*.js`: SF2 playback engine + sample-pack compatibility, discovery/loading, preview sequencing.
- `js/game.*.js`: round lifecycle, validation, reveal playback, keyboard state behavior.
- `js/settings.*.js`: settings mutations, persistence hooks, panel positioning logic.
- `js/events.*.js`: all event wiring and startup initialization.
- `js/app.*.js`: legacy snapshot modules (not loaded by `index.html`).
- `soundfonts/`: drop-in `.sf2` files for instrument discovery.
- `IMPLEMENTATION_CHECKLIST.md`: phased execution checklist for bug fixes, redesign, refactor, and feature rollout.
- `tools/generate-project-map.ps1`: regenerates `PROJECT_MAP.md` with exact line maps.
- `tools/smoke-checklist.md`: fast regression pass for critical app flows (target <=10 minutes).
- `tools/start-local-server.ps1` and `start-server.bat`: quick local static server launcher.

## Runtime Safety
- Startup now runs in guarded stages so one failed setup task does not automatically abort the whole app.
- Recoverable startup/runtime failures surface in an in-app `safe mode` banner instead of only appearing in devtools.
- Critical startup checks now verify key DOM targets and runtime APIs; recorded issues are also available in the console via `App.safety.getIssues()`.

## Run Locally
1. Open `index.html` in a modern browser.
2. Recommended for external soundfont auto-discovery: use a local static server.
   - Example (from project root): `python -m http.server 5500`
   - Or run bundled script: `.\start-server.bat` (or `powershell -File .\tools\start-local-server.ps1`)
   - Then open: `http://localhost:5500/`
   - The bundled server script auto-updates asset version tags when project files change, to reduce browser cache issues.
3. Put your `.sf2` file under `soundfonts/` (for example `soundfonts/GeneralUser GS v1.471.sf2`).
4. Use either:
   - `Instrument` -> `Browse All SF2 Presets` for the full SF2 instrument browser, or
   - simple selector panel for the curated quick list.
5. If directory listing is disabled on your server, add the `.sf2` path to `soundfonts/index.json` (see `soundfonts/README.md`).
6. If your browser shows stale JS errors after an update, hard refresh (`Ctrl+F5`) and verify `App.buildId` in the devtools console.

## SF2 Behavior
- Simple selector stores fixed GM program IDs (0, 4, 5, 9, 24, 33, 105, 11, 19, 72) and resolves display names from the loaded SF2 preset data.
- In the simple selector card UI, instrument name is primary and program ID is shown as muted text.
- Full SF2 instrument browsing is in a separate `Instrument Browser` panel (grouped by inferred GM families for bank 0).
- Advanced panel is now dedicated to `Articulation Profile` controls and profile management.
- Game settings (`Play style`, `Blind mode`, mode-specific chord controls, typing controls) live in a centered `Game Settings` panel, opened from the Control Center or directly from the in-round status bar.
- Floating settings popups now run through one shared panel manager (single-open behavior, consistent click-outside/escape close, shared resize repositioning).
- Round-affecting settings now follow a shared refresh policy: active rounds auto-restart only for changes that require target regeneration/playback context refresh (for example play style, practice/input mode, chord set/root hint, note count, key range/start note).
- Migrated round/settings/submission state flows now dispatch through `App.store` patch actions (with optional action logging + invariant checks for development diagnostics).
  - Runtime debug toggles (console): `App.debug.enableActionLog()`, `App.debug.disableActionLog()`, `App.debug.enableInvariantChecks()`, `App.debug.disableInvariantChecks()`.
- `Notes per round` now lives inside `Game Settings` and is only shown in `Random Notes` / `Harmonic Notes` modes.
- Advanced sliders show absolute values (seconds + hold multiplier), not percentages.
- Slider ghost markers show the selected profile target while editing.
- Profiles support built-in + custom saved presets (persisted in local storage).
- Switching instruments prompts:
  - save/discard if you manually changed profile sliders;
  - optional switch to instrument-recommended profile when a non-default profile is currently applied.
- Last-used instrument/profile/settings persist across revisits.
- Game settings include `Hide live answer preview`, which suppresses live selected/typed note/chord labels until submit.
- Audio output uses headroom + light compression/high-pass filtering.
- Startup is staged: first paint renders UI quickly, then only the selected/primary SF2 pack is loaded in the background; full multi-pack preset loading is deferred until opening the Instrument Browser.
- New-round playback now uses a short handoff pause after stopping current notes, and round start waits for selected instrument readiness before activating playback (including first round) to avoid silent starts/cut notes while SF2 assets warm up.

## Chord Training Modes
- Landing page now includes quick-start cards for `Random Notes`, `Harmonic Notes`, and `Chord Practice`; pressing `Enter` still starts a round with your last-used mode profile.
- Top-right `Home` button (under theme toggle) returns to landing/free-play from any round state.
- Playback timing is centralized:
  - active rounds use `note length` as the minimum sounding time for manual key presses and replay presses, then sustain if held longer;
  - landing-page free-play keys sustain only while held;
  - target playback, selected-note playback, typed-chord preview, reveal playback, and tutorial preview all derive their fixed playback duration from the same note-length rule.
- Default behavior remains classic note training (`Training mode = Keyboard Select`, `Chord rounds = off`).
- Settings now use one `Practice mode` selector:
  - `Random Notes`: classic random note rounds,
  - `Nice Notes (Harmonics)`: consonant/nice-note rounds,
  - `Chord Training`: reveals chord-only controls.
- `Practice mode = Chord Training` switches round targets from loose notes to chord targets.
- Chord parsing/training now includes broader common types (for example `m6`, `m9`, `maj9`, `7sus4`, `add11`, plus prior advanced variants like `m7b5`, `dim7`, `mMaj7`, `maj7#11`, `7b9`).
- Live selected chord detection is shown below the keyboard while in chord rounds.
- Reveal/check output shows chord names (target vs your chord) in chord rounds.
- Chord reveal now uses a compact note comparison layout: `Target notes` marks misses inline (for example `C5 (missed)`) and `Your notes` marks extra wrong notes, without separate redundant correct/wrong/missed rows.
- Post-submit replay now follows the target with your submitted answer whenever the answer was incomplete or wrong, not only when extra wrong notes were pressed.
- In chord rounds, helper hints are shown as delayed hover-reveal rows (all labels visible, each value revealed independently) when `Extra helpers` is enabled, with masked placeholder strings so value length is not leaked before reveal.
- Helper masks now vary slightly by hint type and may include spacing so the blurred placeholders look less uniform; pointer-fine devices now use one lightweight semi-transparent custom cursor across the app instead of the laggy helper-only cursor experiment.
- Chord mode also includes `Reveal root note`, which shows the target root in the helper card and highlights it on the keyboard as a green anchor without giving away the full chord quality.
- Chord helper layout stays stable when toggling `Reveal root note`; the root row remains present and switches between hidden/revealed value so keyboard spacing does not jump between rounds.
- `Answer input` options in chord practice:
  - `Play on keyboard` (keyboard only),
  - `Type chord name` (typing only),
  - `Keyboard + typing` (both at once).
- The typing box is shown only during active chord rounds when typing is enabled.
- `Answer input = Type chord name`:
  - plays a target chord and expects typed chord names (for example `Cmaj7`, `Bb7`, `F#m`),
  - runs quick-fire auto-next on correct answers,
  - gives detailed mismatch feedback on wrong answers,
  - keeps hint/replay available,
  - supports optional visual piano and optional typed-chord key preview.
  - pressing `Space` inside the typing field previews the typed chord when parsing succeeds and blind mode is off; it will not auto-replay target notes when nothing is selected/typed.
  - includes a built-in chord tutorial opened directly from the `?` button in typing mode and from `Game Settings -> Chord tutorial`.
- typed chords can optionally include root octave as a prefix (for example `4Cm`, `3A#maj7`); when octave is included, grading checks it.
  - when no octave is typed, typed chord preview roots are anchored around the target-root register and choose the nearest valid octave for each root (with range-fit fallback), so trying different roots stays musically close instead of forcing one fixed octave bucket.
  - quality parsing now keeps `6` as major 6 (for example `B6`) and supports `M7`/`M9` major shorthand without collapsing them into minor aliases.
  - when a typed answer is correct, result key-highlighting uses the target-note mapping so octave placement chosen by typed preview does not produce false "missed notes".
  - tutorial now uses a progressive root/quality matrix: all roots/qualities stay visible, locked items are greyed out until introduced, newly introduced items are highlighted, and each theory step explains specific chord families in plain language.
  - typed chord parsing treats a bare root (for example `F`) as major (`F`), not minor.

## Maintenance Rules
1. Update code.
2. Run the map generator.
3. If behavior changed, update README + PROJECT_MAP protocol notes in the same change.
4. Commit and push your change set when done (if this folder is connected to a git remote).
5. Keep legacy `js/app.*.js` untouched unless intentionally migrating to that branch.

## Verification
- JavaScript syntax check:
  - `Get-ChildItem .\js -Filter *.js | ForEach-Object { node --check $_.FullName }`
- Runtime guard check:
  - reload the app and confirm no safe-mode banner appears during a healthy startup
