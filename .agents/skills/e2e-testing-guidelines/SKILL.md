---
name: e2e-testing-guidelines
description: Use this skill whenever writing, reviewing, refactoring, or running Playwright end-to-end tests for the password generator. Covers `e2e/` placement, primary generator flow, layout selection, option changes, generated output assertions, clipboard feedback, accessibility locators, viewport checks, no fixed waits, and `npm run test:e2e`.
---

# E2E Testing Guidelines

Apply this skill when creating, changing, reviewing, or running browser tests.

## Test Scope

E2E tests should prove the user workflow works in the browser, not duplicate every unit test.

**Guidelines:**

- MUST place Playwright tests under `e2e`.
- MUST cover the primary flow: load app, choose layout, adjust options, generate, and copy.
- MUST verify generated passwords only contain characters allowed by the selected layout pool.
- MUST verify empty or incompatible option states when those states exist.
- SHOULD include mobile and desktop viewport coverage for the generator layout.

## Locator Strategy

Tests should exercise accessible UI. Stable test ids are useful for generated data and summaries.

**Guidelines:**

- MUST prefer `getByRole`, labels, and accessible names for user actions.
- MUST use `data-testid` when asserting generated output, entropy, or character-pool summaries would otherwise be ambiguous.
- MUST NOT use arbitrary timeouts for UI settling.
- SHOULD use locator-native assertions such as `toBeVisible`, `toBeDisabled`, `toHaveText`, and `toBeFocused`.

## Running Tests

The e2e command should be part of the normal verification story once the app is scaffolded.

**Guidelines:**

- MUST run `npm run test:e2e` when UI output or e2e coverage changes and the script exists.
- MUST report when the script or browser dependencies do not exist yet.
- MUST investigate flaky failures instead of hiding them with retries or fixed waits.
- SHOULD document any required local server behavior in `playwright.config.ts` or project docs.
