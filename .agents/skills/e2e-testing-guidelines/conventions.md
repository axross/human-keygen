# E2E Test Conventions

Tests should operate through the same controls users experience, while using stable hooks for generated data that has no natural accessible name.

## Locator Strategy

Accessible locators keep tests aligned with real interaction semantics.

**Guidelines:**

- MUST prefer `getByRole`, labels, and accessible names for user actions.
- MUST use `data-testid` when asserting generated output, entropy, or character-pool summaries would otherwise be ambiguous.
- MUST keep `data-testid` values stable and descriptive when added for e2e assertions.
- MUST NOT use brittle selectors tied to Tailwind classes or DOM depth.
- SHOULD use locator-native assertions such as `toBeVisible`, `toBeDisabled`, `toHaveText`, and `toBeFocused`.

## Generated Output Assertions

Generated values are random, so tests should assert invariants rather than exact production output.

**Guidelines:**

- MUST assert generated length and membership in the selected layout's allowed pool.
- MUST NOT snapshot or log production-generated passwords as golden values.
- MUST keep deterministic exact-value assertions in unit tests through explicit test seams.
- SHOULD assert entropy and pool summary behavior through visible text or stable test ids.

## Browser API and Wait Behavior

Clipboard and hydration behavior should be verified by observable state, not by fixed delays.

**Guidelines:**

- MUST avoid arbitrary timeouts and fixed sleeps.
- MUST wait for controls to be enabled or feedback regions to update before asserting asynchronous UI behavior.
- MUST handle Clipboard API permissions and browser-context setup deliberately when copy behavior is under test.
- SHOULD verify both desktop and mobile projects when layout or focus behavior changes.
