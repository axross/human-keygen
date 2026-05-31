---
name: application-security-requirements
description: Use this skill when reviewing security or privacy implications in the password generator. Covers local-only generation, Web Crypto, clipboard use, secret handling, generated password exposure, storage and URL prohibitions, telemetry limits, dependency risk, client/server boundaries, and future feature review.
---

# Application Security Requirements

Apply this skill when a change can affect generated secrets, browser APIs, dependencies, network behavior, or privacy.

## Generated Secret Exposure

Generated passwords are sensitive even though the app has no accounts.

**Guidelines:**

- MUST NOT send generated passwords to servers, server functions, analytics, error reporting, logging, URLs, cookies, local storage, or session storage.
- MUST NOT include generated passwords in thrown errors, test snapshots, screenshots committed to the repo, or console output.
- MUST keep generation client-side unless a future requirement explicitly changes the privacy model.
- SHOULD avoid adding third-party runtime scripts.
- SHOULD review any telemetry feature as high-risk even if it claims not to capture passwords.

## Browser API Use

The app needs browser APIs for randomness and clipboard operations. These APIs must be used deliberately.

**Guidelines:**

- MUST use Web Crypto for production randomness.
- MUST handle Clipboard API success and failure without leaking password values.
- MUST require a user gesture before writing to the clipboard.
- MUST avoid permissions or APIs unrelated to password generation.
- SHOULD make browser capability failures visible and recoverable.

## Inputs and Dependencies

User-controlled options can affect generation but should not create injection or supply-chain risk.

**Guidelines:**

- MUST validate length and option values before generating.
- MUST fail closed when an unknown layout id is requested.
- MUST review new npm dependencies for maintenance, install scripts, bundle cost, and necessity.
- MUST keep environment variables out of client code unless intentionally public and documented.
- SHOULD prefer platform APIs and small local helpers over dependencies for simple generation behavior.
