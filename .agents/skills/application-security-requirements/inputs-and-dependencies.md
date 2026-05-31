# Inputs and Dependencies

User-controlled options affect generation. Dependencies and environment variables can change the app's privacy and runtime behavior.

## Input Validation

Options should fail closed before they reach password generation.

**Guidelines:**

- MUST validate length and option values before generating.
- MUST fail closed when an unknown layout id is requested.
- MUST prevent generation when selected options produce an empty pool.
- MUST keep category predicates aligned with [Keyboard Layout Requirements](../keyboard-layout-requirements/SKILL.md).
- SHOULD clamp or reject out-of-range numeric values at the UI boundary and pure generation boundary.

## Dependencies and Scripts

New packages should not smuggle in telemetry, install-time behavior, or large browser payloads.

**Guidelines:**

- MUST review new npm dependencies for maintenance, install scripts, license fit, bundle cost, and necessity.
- MUST inspect dependencies that touch randomness, clipboard, storage, telemetry, networking, or UI instrumentation as security-sensitive.
- MUST keep environment variables out of client code unless intentionally public and documented.
- MUST NOT add third-party runtime scripts without explicit product approval.
- SHOULD prefer platform APIs and small local helpers over dependencies for simple generation behavior.
