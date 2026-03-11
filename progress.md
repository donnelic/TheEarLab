Original prompt: i need some fresh eyes on my project. i have these chord helpers at the bottom that you hover over to reveal, click to latch and right click to pin (to persist through rounds). but i just can't figure out the style of a pinned helper. can you come up with some ideas that fit in with the rest of the page?

- 2026-03-11: Swapped pinned indicator to a badge-style pill that reuses the existing badge styling tokens; kept pinned/latched borders unchanged.
- 2026-03-11: Playwright not installed; need approval to install for automated UI check.
- 2026-03-11: Replaced pinned text badge with a small accent dot (radial gradient + ring) to match site accents while keeping borders intact.
- 2026-03-11: Removed pinned helper dot per request; pinned style now only uses base card styling.

- 2026-03-11: Reworked helper latched styling to use muted accent tones (removed yellow), kept pinned stronger and blurred frosted.
- 2026-03-11: Installed Playwright + browsers for the develop-web-game test loop; user requested no Playwright going forward.

- 2026-03-11: Added corner diamond indicators to distinguish pinned (solid) vs latched (outlined) helper states.
