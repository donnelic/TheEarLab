# TheEarLab Implementation Checklist

This is the execution checklist for the next development cycle.
Use this file as the single backlog for bug fixes, architecture cleanup, redesign work, and feature delivery.

## Ground Rules

- [ ] Keep `index.html` script order as runtime truth until module migration phase updates it intentionally.
- [ ] After each checklist item that changes runtime behavior, run:
  - `Get-ChildItem .\js -Filter *.js | ForEach-Object { node --check $_.FullName }`
- [ ] After each grouped change set, run:
  - `powershell -NoProfile -ExecutionPolicy Bypass -File .\tools\generate-project-map.ps1`
- [ ] Update `README.md` and `PROJECT_MAP.md` when flow/layout/runtime changes.
- [ ] For every completed item, add a short changelog line under the item before checking it off.

## Recently Completed (2026-03-09)

- **P0.2 Structured action logging toggle**
  - Changelog: added `App.store` debug flags with localStorage persistence + runtime toggles for action logging and invariant checks; migrated patch-dispatched actions now log type, timestamp, and selected state deltas only when enabled.
- **A1 Centralized store + action dispatcher**
  - Changelog: introduced `js/store/` (`actions`, `reducers`, `selectors`, `store`) and migrated critical round/settings/submission mutation paths in `game.*.js`, `settings.*.js`, and `events.*.js` to dispatched patch actions.
- **A2 Monolith split foundation**
  - Changelog: created `js/features/` layout (`round`, `settings`, `chords`, `typing`, `tutorial`, `audio-preview`, `input`) and moved migrated state mutation access behind feature compatibility wrappers.
- **A3 Dev invariant checks**
  - Changelog: added opt-in invariant checks for active-round target validity, selected/target range consistency, and submission replay consistency with non-crashing console warnings.
- **S1 Settings information architecture refresh**
  - Changelog: grouped settings panel into clear sections (`Practice`, `Sound & Instrument`, `Articulation`, `Keyboard Layout`) and clarified trigger naming (`Open practice settings`).
- **S2 Floating panel manager**
  - Changelog: added a centralized floating-panel controller in `js/settings.*.js` (shared open/close/toggle/reposition), enforced one active floating panel, and unified click-outside/escape/resize handling in `js/events.*.js`.

## Phase 0: Safety Net and Baseline

No open items.

## Phase 2: Core Architecture Refactor

No open items.

## Phase 3: Settings UX Redesign (Keep Floating Panels)

- [x] **S3 Add keyboard-accessible panel navigation and focus traps**
  - Scope:
    - Arrow/tab/escape behavior for all floating panels.
    - Focus trap for modal-style overlays only.
  - Done when:
    - Full settings flow is keyboard-only usable and predictable.
  - Changelog: added arrow/tab/escape navigation for floating panels plus focus trap handling for modal overlays (tutorial, game settings, dialog).

- [x] **S4 Replace blocking `confirm/prompt` flows with in-app dialog components**
  - Scope:
    - Migrate articulation profile save/switch prompts to app-styled non-blocking dialogs.
  - Done when:
    - No `window.confirm` / `window.prompt` remains in runtime settings flow.
  - Changelog: replaced articulation profile save/switch prompts with a reusable in-app dialog (confirm + input).

- [x] **S5 Centered game settings panel + in-round access**
  - Scope:
    - Move game mode settings into a centered modal layout with grouped rows/columns.
    - Add direct in-round entry point, plus keep link from main settings menu.
  - Done when:
    - Game settings are accessible from both the Control Center and in-round UI without list-style clutter.
  - Changelog: moved game settings into a centered modal with structured group layout and added an in-round quick-access button.

## Phase 4: Difficulty, Filtering, and Custom Practice Modes

- [ ] **F1 Create advanced filter builder UI (tutorial-style matrix selector)**
  - Scope:
    - Add an advanced difficulty/filter panel inspired by tutorial matrix.
    - Allow selecting:
      - roots/pitch classes (e.g. only C and C#),
      - chord qualities,
      - voicing styles/inversions/spread policy,
      - note-mode constraints for non-chord modes.
  - Done when:
    - Filters directly control target generation in all relevant modes.

- [ ] **F2 Make built-in difficulty levels map to explicit filter presets**
  - Scope:
    - `Easy/Medium/Voiced/Hard` become preset definitions, not hardcoded branching only.
  - Done when:
    - Selecting a built-in difficulty applies its full filter preset deterministically.

- [ ] **F3 Add automatic `Custom` difficulty state on manual edits**
  - Scope:
    - If user edits any preset-derived filter, difficulty label switches to `Custom`.
  - Done when:
    - UI clearly reflects that settings diverged from built-in preset.

- [ ] **F4 Add saved custom practice modes (dropdown integration)**
  - Scope:
    - Allow saving current filter profile as named mode.
    - Show custom modes in practice mode dropdown under default modes.
    - Allow edit/rename/delete.
  - Done when:
    - User can create, select, and persist custom modes across sessions.

- [ ] **F5 Add focused queue modes linked to analytics**
  - Scope:
    - Implement:
      - `Mistakes Only`
      - `Last 20 Missed`
      - `Focus by Quality/Root`
  - Done when:
    - Queue modes draw from tracked mistakes and update in near real-time.

## Phase 5: Adaptive Training Engine

- [ ] **AT1 Track attempt-level performance signals**
  - Scope:
    - Store per-attempt metadata:
      - target signature,
      - correctness,
      - response time,
      - hint usage,
      - answer source (keyboard/typing/both),
      - mismatch type.
  - Done when:
    - Data model supports adaptive scheduling and analytics views.

- [ ] **AT2 Implement weighted target scheduler**
  - Scope:
    - Weight targets by recency, error rate, and confidence.
    - Add anti-repeat and coverage constraints.
  - Done when:
    - Weak items appear more often, but sessions still feel varied.

- [ ] **AT3 Add progressive curriculum mode**
  - Scope:
    - Structured unlock progression from simple to advanced material.
    - Promotion rules based on sustained performance thresholds.
  - Done when:
    - Curriculum progression is transparent and reversible.

## Phase 6: Stats and Insight Dashboard

- [ ] **ST1 Build persistent stats storage schema**
  - Scope:
    - Session history + aggregate lifetime metrics.
    - Versioned schema for future migrations.
  - Done when:
    - Stats survive reloads and upgrades safely.

- [ ] **ST2 Create in-depth visual dashboard**
  - Scope:
    - Include:
      - overall accuracy trend,
      - response time trend,
      - hint dependency trend,
      - weakness heatmaps by root/quality/voicing/mode,
      - distribution of mistake types.
  - Done when:
    - Users can infer strengths and weaknesses from visuals alone, without explanatory text.

- [ ] **ST3 Link stats to actionable practice entry points**
  - Scope:
    - "Practice weak areas" actions that open filtered/custom queue modes directly.
  - Done when:
    - One click from insight to focused drill.

## Phase 7: MIDI Keyboard Input (Low Latency, Multi-Key)

- [ ] **M1 Add Web MIDI capability detection and device manager**
  - Scope:
    - Device connect/disconnect handling and input source selection.
  - Done when:
    - MIDI devices appear/disappear without full page reload.

- [ ] **M2 Implement low-latency MIDI note pipeline**
  - Scope:
    - Direct note-on/note-off processing with minimal indirection.
    - Multi-key chord press support with accurate simultaneous handling.
    - Sustain pedal (CC64) support.
  - Done when:
    - Visual key states and audio trigger with minimal measurable delay.
    - Fast chord stabs and rolls register reliably.

- [ ] **M3 Add MIDI settings panel**
  - Scope:
    - Enable/disable MIDI input, choose device, velocity mapping options.
  - Done when:
    - MIDI behavior is configurable and persisted.

## Phase 8: Soundfont Package Management and Local Import

- [ ] **SF1 Build soundfont manager UI**
  - Scope:
    - Show installed packs, active pack, load status, and remove option.
  - Done when:
    - User can manage all available packs inside app UI.

- [ ] **SF2 Add user SF2 import with persistent local storage**
  - Scope:
    - File-picker import for `.sf2`.
    - Persist binary packs locally (IndexedDB or OPFS).
    - Register imported packs in catalog on startup.
  - Done when:
    - Imported packs remain available after browser restart.

- [ ] **SF3 Add integrity and quota handling**
  - Scope:
    - Validate file type/size, report storage quota errors cleanly.
  - Done when:
    - Failed imports are recoverable and never break existing catalog.

## Phase 9: Stabilization and Release Gate

- [ ] **R1 End-to-end QA pass across all modes and inputs**
  - Scope:
    - Mouse, keyboard, MIDI; note mode and chord mode; typing and keyboard grading.
  - Done when:
    - No blocker defects remain in core training loop.

- [ ] **R2 Performance pass**
  - Scope:
    - Measure startup, first-note latency, MIDI-to-audio latency, frame drops.
    - Optimize hotspots introduced by refactor and analytics.
  - Done when:
    - Performance meets or exceeds current baseline in normal use.

- [ ] **R3 Documentation and map finalization**
  - Scope:
    - Update `README.md`, `PROJECT_MAP.md`, and any migration notes.
  - Done when:
    - Docs describe new architecture and feature surface accurately.

---

## Execution Order Recommendation (Do Not Skip)

- [ ] Sequence 3: `S3` -> `S4`
- [ ] Sequence 4: `F1` -> `F2` -> `F3` -> `F4` -> `F5`
- [ ] Sequence 5: `AT1` -> `AT2` -> `AT3`
- [ ] Sequence 6: `ST1` -> `ST2` -> `ST3`
- [ ] Sequence 7: `M1` -> `M2` -> `M3`
- [ ] Sequence 8: `SF1` -> `SF2` -> `SF3`
- [ ] Sequence 9: `R1` -> `R2` -> `R3`

