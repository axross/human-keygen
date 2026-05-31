# E2E Test Structure

E2E tests should prove the primary browser workflow works. They should not duplicate every unit case for password and layout logic.

## File Placement and Naming

Tests live in the top-level `e2e/` directory and use Playwright's `.test.ts` convention.

**Guidelines:**

- MUST place Playwright tests under `e2e`.
- MUST keep test files named with the `.test.ts` suffix.
- MUST keep reusable e2e helpers under `e2e` if helpers become necessary.
- SHOULD keep one primary generator-flow test file until the user surface grows enough to justify splitting.

## Primary Flow Coverage

The primary e2e flow mirrors the user's path through the app.

**Guidelines:**

- MUST cover loading the app, choosing a keyboard layout, adjusting options, generating a password, and copying it.
- MUST verify generated passwords only contain characters allowed by the selected layout pool.
- MUST verify empty, incompatible, or disabled generation states when those states exist.
- MUST verify visible and screen-reader-available copy success or failure feedback when copy behavior changes.
- SHOULD include `test.step()` sections when a flow becomes long enough that failure output is hard to scan.
