# Responsive and Accessible Controls

The app should work for repeated use on phones and desktops. Controls should be semantic, reachable by keyboard, and resilient to text wrapping.

## Responsive Layout

Responsive design should preserve the generator workflow rather than rearranging it into a marketing layout.

**Guidelines:**

- MUST verify mobile, tablet, and desktop layouts for coherent text wrapping and non-overlap when layout changes.
- MUST keep the primary generate and copy actions reachable without awkward scrolling on common mobile widths.
- MUST ensure generated passwords and pool summaries wrap or scroll deliberately at supported lengths.
- MUST keep control groups visually connected to their labels and descriptions across breakpoints.
- SHOULD use stable responsive constraints instead of viewport-scaled font sizes.

## Accessible Controls

Interactive controls should expose native semantics and clear state.

**Guidelines:**

- MUST provide visible `:focus-visible` treatment for every interactive control.
- MUST use semantic controls for selects, sliders, number inputs, checkboxes, buttons, and output regions.
- MUST ensure touch targets are large enough for mobile use.
- MUST NOT rely on color alone to communicate enabled, disabled, error, copied, or loading states.
- MUST keep disabled controls understandable through text, labels, or nearby explanation.
- SHOULD keep control labels short and explicit.
