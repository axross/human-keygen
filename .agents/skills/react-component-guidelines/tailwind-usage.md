# Tailwind Usage

Tailwind utilities should describe the UI directly while preserving readability and responsive stability.

## Utility Classes

Most component styling should live in JSX class strings because the app is small and Tailwind is the active styling system.

**Guidelines:**

- MUST use Tailwind utilities for component styling unless a global token, base rule, or CSS custom property is clearer.
- MUST keep global CSS limited to Tailwind import, base tokens, app-wide primitives, and reusable custom properties.
- MUST preserve Biome/Tailwind sorted-class expectations in touched files.
- MUST avoid class abstractions that hide simple styling or make generated password layout hard to inspect.
- SHOULD group repeated class combinations behind small components only when duplication becomes meaningful.

## Responsive Stability

Generated passwords, labels, and controls must not resize or overlap unpredictably when content changes.

**Guidelines:**

- MUST use stable dimensions, wrapping, min/max constraints, or overflow handling for generated password displays and control groups.
- MUST avoid hard-coded layout behavior that causes text overlap at narrow widths.
- MUST ensure disabled, error, copied, and hydration states do not shift layout unexpectedly.
- SHOULD test long generated passwords and longest labels when changing layout.

## Tokens and CSS Variables

Project tokens live in CSS variables and Tailwind arbitrary values. Use them consistently rather than scattering unrelated color values.

**Guidelines:**

- MUST preserve the existing `--neutral-*`, `--accent-*`, and radius token approach unless a design change intentionally updates the system.
- MUST NOT introduce a one-off palette for a single component without updating [UI Design Principles](../ui-design-principles/SKILL.md).
- SHOULD use CSS variables for repeated colors, radii, or focus-ring values that define the app's visual system.
