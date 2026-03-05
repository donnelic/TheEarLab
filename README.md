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
- `styles.css`: all visual styling, variables, responsive rules.
- `vendor/`: bundled SF2 runtime dependencies (`libfluidsynth` + `js-synthesizer`).
- `js/core.js`: DOM references, constants, soundfont catalog state, shared app state, note/key builders.
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
- Advanced sliders show absolute values (seconds + hold multiplier), not percentages.
- Slider ghost markers show the selected profile target while editing.
- Profiles support built-in + custom saved presets (persisted in local storage).
- Switching instruments prompts:
  - save/discard if you manually changed profile sliders;
  - optional switch to instrument-recommended profile when a non-default profile is currently applied.
- Last-used instrument/profile/settings persist across revisits.
- Audio output uses headroom + light compression/high-pass filtering.

## Chord Training Modes
- Default behavior remains classic note training (`Training mode = Keyboard Select`, `Chord rounds = off`).
- Settings now use one `Practice mode` selector:
  - `Random Notes`: classic random note rounds,
  - `Nice Notes (Harmonics)`: consonant/nice-note rounds,
  - `Chord Training`: reveals chord-only controls.
- `Practice mode = Chord Training` switches round targets from loose notes to chord targets.
- Live selected chord detection is shown below the keyboard while in chord rounds.
- Reveal/check output shows chord names (target vs your chord) in chord rounds.
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
  - pressing `Space` inside the typing field previews the typed chord when parsing succeeds and blind mode is off (otherwise it falls back to replay).
  - includes a built-in "Learn more about chord format" guided tutorial from the typing help popover.

## Maintenance Rules
1. Update code.
2. Run the map generator.
3. If behavior changed, update README + PROJECT_MAP protocol notes in the same change.
4. Commit and push your change set when done (if this folder is connected to a git remote).
5. Keep legacy `js/app.*.js` untouched unless intentionally migrating to that branch.

## Verification
- JavaScript syntax check:
  - `Get-ChildItem .\js -Filter *.js | ForEach-Object { node --check $_.FullName }`
