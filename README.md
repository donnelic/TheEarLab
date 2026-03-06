# TheEarLab

Browser-based piano ear-training app for note and chord recognition.

## Read First
1. Read [PROJECT_MAP.md](./PROJECT_MAP.md) before making edits.
2. Treat `index.html` script order as runtime truth:
   - `vendor/libfluidsynth-2.4.6.js`
   - `vendor/js-synthesizer.min.js`
   - `js/core.js`
   - `js/audio.js`
   - `js/game.js`
   - `js/settings.js`
   - `js/events.js`
3. After edits, regenerate the map:
   - `powershell -NoProfile -ExecutionPolicy Bypass -File .\tools\generate-project-map.ps1`

## Project Layout
- `index.html`: app structure and script loading.
- `styles.css`: all visual styling, shared layout/unit tokens in `:root`, responsive rules.
- `vendor/`: bundled SF2 runtime dependencies (`libfluidsynth` + `js-synthesizer`).
- `js/core.js`: DOM references, shared runtime constants/copy, mode policy, envelope policy, soundfont catalog state, shared app state, note/key builders.
- `js/audio.js`: SF2 playback engine + sample-pack compatibility, discovery/loading, preview sequencing.
- `js/game.js`: round lifecycle, validation, reveal playback, keyboard state behavior.
- `js/settings.js`: settings mutations, persistence hooks, panel positioning logic.
- `js/events.js`: all event wiring and startup initialization.
- `js/app.*.js`: legacy snapshot modules (not loaded by `index.html`).
- `soundfonts/`: drop-in `.sf2` files for instrument discovery.
- `tools/generate-project-map.ps1`: regenerates `PROJECT_MAP.md` with exact line maps.
- `tools/start-local-server.ps1` and `start-server.bat`: quick local static server launcher.

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
- Game settings (`Play style`, `Blind mode`, mode-specific chord controls, typing controls) live in the `Game Settings` popup opened from settings.
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
- First playback now gates on selected instrument readiness to avoid "short/cut first notes" while SF2 assets are still warming up.

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
- Post-submit replay now follows the target with your submitted answer whenever the answer was incomplete or wrong, not only when extra wrong notes were pressed.
- In chord rounds, helper hints are shown as delayed hover-reveal rows (all labels visible, each value revealed independently) when `Extra helpers` is enabled, with masked placeholder strings so value length is not leaked before reveal.
- Chord mode also includes `Reveal root note`, which shows the target root in the helper card without giving away the full chord quality.
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
