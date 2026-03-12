Original prompt: i need some fresh eyes on my project. i have these chord helpers at the bottom that you hover over to reveal, click to latch and right click to pin (to persist through rounds). but i just can't figure out the style of a pinned helper. can you come up with some ideas that fit in with the rest of the page?

- 2026-03-11: Swapped pinned indicator to a badge-style pill that reuses the existing badge styling tokens; kept pinned/latched borders unchanged.
- 2026-03-11: Playwright not installed; need approval to install for automated UI check.
- 2026-03-11: Replaced pinned text badge with a small accent dot (radial gradient + ring) to match site accents while keeping borders intact.
- 2026-03-11: Removed pinned helper dot per request; pinned style now only uses base card styling.

- 2026-03-11: Reworked helper latched styling to use muted accent tones (removed yellow), kept pinned stronger and blurred frosted.
- 2026-03-11: Installed Playwright + browsers for the develop-web-game test loop; user requested no Playwright going forward.

- 2026-03-11: Added corner diamond indicators to distinguish pinned (solid) vs latched (outlined) helper states.

- 2026-03-12: Reduced pinned diamond size, removed latched marker and latched accent background per feedback.

- 2026-03-12: Tightened helper hover indicator with a small dark dot and a more concentrated accent halo.

- 2026-03-12: Adjusted helper hover halo to a steeper (log-like) gradient and raised it above content; kept pinned marker above halo.

- 2026-03-12: Made helper hover dot a solid point (removed blur gradient).

- 2026-03-12: Moved helper hover dot to its own overlay element so it sits above helper content.

- 2026-03-12: Excluded helper cursor dot from generic child stacking rule and forced absolute overlay above content.

- 2026-03-12: Reverted helper cursor dot to background gradient (removed overlay span).

- 2026-03-12: Restored helper dot-in-background version (no overlay element, gradient pinned marker).

- 2026-03-12: Restyled pinned marker to a solid color matching latched border and added transitions for marker/label/value colors.

- 2026-03-12: Left-click on globally pinned helper now unpins and latches; text cursor mode now wins over helper zone for typing input.

- 2026-03-12: Left-click on root helper now turns off root hint and latches; custom cursor text mode now explicitly matches chord typing input wrapper.

- 2026-03-12: Root helper detection now uses data-helper-root; custom cursor mode uses elementFromPoint to resolve text inputs reliably.

- 2026-03-12: Typing help button now forces interactive cursor mode ahead of text mode.
