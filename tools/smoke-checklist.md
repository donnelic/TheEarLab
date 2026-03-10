# TheEarLab Smoke Checklist (<=10 Minutes)

Purpose: quick confidence pass after runtime changes.

## Setup (1 minute)

- Serve project from local HTTP (recommended): `.\start-server.bat` or `python -m http.server 5500`
- Open app in a clean tab.
- Open devtools console and confirm no startup errors.

## Core Flow (3 minutes)

- [ ] Start `Random Notes` round from landing quick card.
  - Expected: target playback starts, status panel appears, keyboard active.
- [ ] Select notes, submit, verify reveal/check output renders without console errors.
- [ ] Press `Enter` for next round.
  - Expected: round increments and new target plays.

## Chord Flow (2 minutes)

- [ ] Switch to `Chord Practice`.
- [ ] Enable `Reveal root note`.
  - Expected: root anchor key appears green pre-submit.
- [ ] Click root anchor once.
  - Expected: root anchor switches to missed-style visual.
- [ ] Submit answer.
  - Expected: grading and reveal render, no exceptions.

## Replay + Blind Rules (1 minute)

- [ ] In chord typing mode with `Blind mode` on, focus typing input and press `Space`.
  - Expected: replay does not trigger; message explains replay is disabled in blind mode.
- [ ] Turn blind mode off and press `Space` again.
  - Expected: replay/preview works.

## Settings Stress (1 minute)

- [ ] During an active round, change `Key count` and `Start note`.
  - Expected: app remains stable (no `undefined midi/frequency` errors), round remains operable.
- [ ] Double-click `Key count` slider.
  - Expected: one logical reset/apply path (no duplicate restart behavior).

## Tutorial + Panel Basics (1 minute)

- [ ] Open chord tutorial from typing `?` button, navigate next/back, close with `Escape`.
  - Expected: focus returns to opener; no stuck modal state.
- [ ] Open/close settings floating panels (`Game Settings`, `Advanced`, `Instrument Browser`).
  - Expected: panels open/close cleanly; no overlap glitches that trap interaction.

## SF2 Sanity (1 minute)

- [ ] Open `Browse All SF2 Presets`, select a preset, apply.
  - Expected: label updates, preview plays, no fetch/runtime crash.

## Exit Criteria

- [ ] No uncaught console errors.
- [ ] No blocked core interactions (start round, submit, replay, settings).
- [ ] Critical UI states match expected behavior.
