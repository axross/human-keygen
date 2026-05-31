# E2E Test Commands

Playwright tests run through the project script so they use the configured web server, base URL, desktop/mobile projects, and trace behavior.

## Standard Runs

The configured `playwright.config.ts` starts `npm run dev -- --host 127.0.0.1` on port 3000 and runs Chromium desktop and mobile projects.

**Guidelines:**

- MUST run `npm run test:e2e` when UI output, browser workflow, or e2e coverage changes.
- MUST report when Playwright browsers, dependencies, or the configured web server are unavailable.
- MUST keep `playwright.config.ts` as the source of truth for base URL, projects, retries, reporter, and web server behavior.
- SHOULD use focused Playwright invocations only while debugging, then run `npm run test:e2e` for final verification when practical.
- SHOULD keep `reuseExistingServer` behavior aligned with local development and CI needs.

## Failure Diagnosis

Playwright failures should be diagnosed through traces, locators, and visible state rather than hidden waits.

**Guidelines:**

- MUST inspect the failing assertion, project name, and trace or screenshot artifact when available.
- MUST NOT hide failures by increasing timeouts, adding fixed waits, or weakening assertions without explaining the user-visible state.
- SHOULD reproduce with a focused project or test title before changing test code.
