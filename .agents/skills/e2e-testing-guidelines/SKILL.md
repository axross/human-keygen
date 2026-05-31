---
name: e2e-testing-guidelines
description: Use this skill whenever writing, reviewing, refactoring, or running Playwright end-to-end tests for the password generator. Covers `e2e/` placement, primary generator flow, desktop/mobile projects, layout and option changes, generated output assertions, clipboard feedback, accessibility locators, `data-testid` use, no fixed waits, and `npm run test:e2e`.
---

# E2E Testing Guidelines

Apply these rules when running, writing, reviewing, or refactoring browser tests for Human Keygen.

## Commands

See [commands.md](./commands.md) for how to run the Playwright suite and when focused runs are acceptable.

**Guidelines:**

- SHOULD read the linked reference before running or changing e2e commands.

## Structure

See [structure.md](./structure.md) for file placement, test naming, test-step shape, and expected user-flow coverage.

**Guidelines:**

- SHOULD read the linked reference before adding, moving, or restructuring Playwright tests.

## Conventions

See [conventions.md](./conventions.md) for locator strategy, generated-output assertions, clipboard handling, viewport coverage, and wait behavior.

**Guidelines:**

- SHOULD read the linked reference before editing assertions, selectors, browser permissions, or asynchronous waits.
