# Manual Verification

Manual checks are required when layout, focus, clipboard, or browser capability behavior changes. They should be targeted and documented.

## Browser Interaction Checks

The generator's primary behavior is interactive, so manual checks should follow the user flow when UI behavior changes.

**Guidelines:**

- MUST verify generation, layout selection, option changes, and copy feedback when those surfaces change.
- MUST verify copy success and failure messaging without exposing the generated password in logs or screenshots.
- MUST verify focus visibility and keyboard access for changed controls.
- MUST verify empty or incompatible option states when generation eligibility changes.
- SHOULD use the local dev server or preview command that matches the changed surface.

## Responsive Checks

Passwords, controls, and explanatory copy must remain readable on narrow and wide screens.

**Guidelines:**

- MUST verify mobile and desktop viewports when layout, wrapping, typography, generated-password display, or control grouping changes.
- MUST check that generated passwords do not overlap controls or become unreadable at supported lengths.
- MUST check that disabled, error, copied, and loading states remain legible without relying on color alone.
- SHOULD include tablet checks when a change affects breakpoints or two-column layout.
