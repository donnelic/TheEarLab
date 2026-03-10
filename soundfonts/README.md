# Soundfont Assets

This folder accepts `.sf2` files used by the app selector and preset browser.

## Where to Put Your `.sf2`

Put the file directly under this folder, for example:

```text
soundfonts/
  GeneralUser GS v1.471.sf2
```

The app scans:
- `soundfonts/index.json`
- directory listing of `soundfonts/` (if your static server exposes it)

## `index.json` Manifest

If directory listing is disabled, list paths in `index.json`.
Paths are relative to `soundfonts/` unless absolute.

```json
[
  "GeneralUser GS v1.471.sf2",
  { "sf2": "other.sf2" },
  { "path": "fallback.sf2" }
]
```

## Simple Selector Mapping

When an SF2 is found, the simple selector uses these program IDs (bank 0):
- `0`, `4`, `5`, `9`, `24`, `33`, `105`, `11`, `19`, `72`

Names are read from the currently loaded SF2 (not hardcoded).

All presets in the SF2 are available from the separate Instrument Browser panel (`Browse All SF2 Presets`).
The Advanced panel is used for articulation profile editing/saving, not instrument browsing.
