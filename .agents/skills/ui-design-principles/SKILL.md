---
name: ui-design-principles
description: Use this skill when designing, implementing, or reviewing user-facing UI/UX for the password generator. Covers app-first layout, utility-focused visual tone, generator hierarchy, responsive behavior, accessible controls, focus states, copy, empty/error/copy feedback, color contrast, password readability, and avoiding marketing-page patterns.
---

# UI Design Principles

Apply this skill for design decisions on any user-facing surface. For component mechanics, consult [React Component Guidelines](../react-component-guidelines/SKILL.md).

## Product Posture

Human Keygen is a practical generator, not a marketing landing page. The first screen should help the user create a password immediately.

**Guidelines:**

- MUST make the generator the primary first-viewport experience.
- MUST NOT replace the app with a hero-only marketing page.
- MUST present layout selection, generation controls, generated password, and copy action as the main hierarchy.
- SHOULD keep explanatory copy short and attached to the controls it clarifies.
- SHOULD make the character-pool explanation scannable without crowding the generated password.

## Password Readability

The generated password is the most important object on the page. It needs to be readable, copyable, and visually distinct.

**Guidelines:**

- MUST display generated passwords in a monospace style.
- MUST preserve enough spacing for ambiguous characters to be distinguishable.
- MUST avoid truncating the generated password without a deliberate overflow affordance.
- MUST keep copy feedback visible and screen-reader announced.
- SHOULD show the selected character pool in a secondary region, not as the visual competitor to the password.

## Responsive and Accessible Controls

The app should work for repeated use on phones and desktops.

**Guidelines:**

- MUST verify mobile, tablet, and desktop layouts for coherent text wrapping and non-overlap.
- MUST provide visible `:focus-visible` treatment for every interactive control.
- MUST use semantic controls for selects, sliders, checkboxes, buttons, and output regions.
- MUST ensure touch targets are large enough for mobile use.
- MUST NOT rely on color alone to communicate enabled, disabled, error, or copied states.
- SHOULD keep control labels short and explicit.

## Visual Tone

The design should feel precise, calm, and trustworthy. It should not imply storage, account management, or enterprise vault features.

**Guidelines:**

- MUST use a restrained multi-hue palette with strong contrast.
- MUST avoid one-note palettes dominated by a single hue family.
- MUST avoid decorative elements that distract from password inspection.
- SHOULD use compact panels and clear grouping rather than oversized editorial sections.
- SHOULD keep animation subtle and respect reduced-motion preferences.
