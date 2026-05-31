# Flakiness Tolerance

Intermittent test behavior is a reliability signal. The fix should target the race, selector, or environment issue rather than weakening the test.

## Investigation Before Weakening

Flaky tests should be reproduced and understood before changing retries, waits, or assertions.

**Guidelines:**

- MUST investigate intermittent failures before increasing retries, adding skips, or loosening assertions.
- MUST NOT use fixed sleeps or arbitrary timeouts to hide UI settling issues.
- MUST NOT commit `.only()` or unexplained `.skip()` in Vitest or Playwright tests.
- MUST prefer locator-native assertions and event-driven waits over manual polling when possible.
- SHOULD use Playwright traces or focused repeats to identify browser workflow races.

## Acceptable Stabilization

Stabilization should make the test better describe the user-visible condition.

**Guidelines:**

- MUST wait on visible UI state, accessible state, network-free completion, or browser API feedback that the user can observe.
- MUST keep assertions specific enough to catch generated-output and copy-feedback regressions.
- SHOULD update selectors to stable accessible roles or documented `data-testid` values rather than text that changes for copy polish.
