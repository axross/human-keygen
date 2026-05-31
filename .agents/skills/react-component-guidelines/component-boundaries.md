# Component Boundaries

Route files should compose the page while feature components own the generator UI. Password and keyboard-layout rules belong in pure modules so they can be tested without React.

## Route and Feature Ownership

The current app exposes the generator on `/`; the route should stay thin even as the generator grows.

**Guidelines:**

- MUST keep `src/routes/index.tsx` focused on routing and page composition.
- MUST place reusable generator UI under `src/features/password-generator`.
- MUST move password generation, entropy, random-source, word-candidate, and layout math into pure modules under `src/lib`.
- MUST avoid importing browser-only APIs into pure password or keyboard-layout modules.
- SHOULD split generator components by user-facing responsibility, such as layout selector, options, output, copy feedback, entropy, and pool summary.

## TypeScript Props and State

Props and state should make generated-secret boundaries obvious.

**Guidelines:**

- MUST use explicit TypeScript prop types or interfaces for component boundaries.
- MUST keep generated password values in the smallest component state boundary that needs them.
- MUST avoid passing generated passwords through components that only need status, length, or derived display information.
- MUST keep browser API effects inside user-action handlers or narrow hooks.
- SHOULD pass callbacks with domain names such as `onGenerate`, `onCopy`, or `onLayoutChange` instead of generic names.

## Pure Logic Extraction

Pure helpers are easier to test and safer to review than logic embedded in JSX.

**Guidelines:**

- MUST extract same-position pool logic, entropy math, word selection, and unbiased random index selection out of components.
- MUST inject deterministic random sources in tests through explicit seams instead of weakening production code.
- SHOULD keep component-derived values simple enough to audit in place or move them into pure selectors when reused.
