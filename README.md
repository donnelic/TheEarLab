# TheEarLab

Browser-based piano ear-training app for note recognition.

## Read First
1. Read [PROJECT_MAP.md](./PROJECT_MAP.md) before making edits.
2. Treat `index.html` script order as runtime truth:
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
- `js/core.js`: DOM references, constants, presets, shared state, note/key builders.
- `js/audio.js`: Web Audio synthesis, envelopes, playback, preview sequencing.
- `js/game.js`: round lifecycle, validation, reveal playback, keyboard state behavior.
- `js/settings.js`: settings mutations, persistence hooks, panel positioning logic.
- `js/events.js`: all event wiring and startup initialization.
- `js/app.*.js`: legacy snapshot modules (not loaded by `index.html`).
- `tools/generate-project-map.ps1`: regenerates `PROJECT_MAP.md` with exact line maps.

## Run Locally
1. Open `index.html` in a modern browser.
2. Optional: serve with a static server for stricter browser behavior.

## Maintenance Rules
1. Update code.
2. Run the map generator.
3. If behavior changed, update README + PROJECT_MAP protocol notes in the same change.
4. Keep legacy `js/app.*.js` untouched unless intentionally migrating to that branch.

## Verification
- JavaScript syntax check:
  - `Get-ChildItem .\js -Filter *.js | ForEach-Object { node --check $_.FullName }`
