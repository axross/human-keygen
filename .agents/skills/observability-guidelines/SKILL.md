---
name: observability-guidelines
description: Use this skill whenever writing, reviewing, or modifying code that throws, catches, reports, logs, or displays runtime failures in the password generator. Covers console output, error boundaries, browser API failure messages, generated-password secrecy, telemetry prohibitions, local debugging, and when to escalate privacy-sensitive observability changes.
---

# Observability Guidelines

Apply this skill when a change affects error handling, logging, failure reporting, telemetry, or debugging output. Human Keygen is local-first and handles generated passwords, so observability must help diagnose failures without collecting or exposing secrets.

## Error Handling

Errors should be caught at user-action boundaries where the UI can show a recoverable state. Low-level helpers should throw typed or message-safe errors and let the caller decide how to present them.

**Guidelines:**

- MUST catch Web Crypto, generation, and Clipboard API failures at the component action boundary that can show user feedback.
- MUST keep thrown error messages free of generated passwords, character pools, clipboard contents, and user-entered secrets.
- MUST NOT swallow generation failures silently; the UI should explain the recoverable action.
- MUST keep route-level error UI free of generated passwords and clipboard payloads if custom error boundaries are added later.
- MUST check current TanStack Start and TanStack Router docs before adding or changing route-level error boundary behavior.
- SHOULD let pure helpers throw ordinary `Error` objects with stable, testable messages.
- SHOULD avoid broad `try`/`catch` blocks around code that cannot recover locally.

## Logging and Console Output

Console output is still an exposure channel because browser logs, screenshots, and CI logs can be copied into issues or reports. Logging should be rare and never include generated values.

**Guidelines:**

- MUST NOT log generated passwords, candidate words, final character pools, clipboard payloads, entropy inputs tied to a generated password, or raw random bytes.
- MUST NOT add production runtime logging for normal generation, copy, or option-change events.
- MUST keep test failure messages and assertion labels from printing generated passwords unless the value is a deterministic fixture that is not user-derived.
- SHOULD remove temporary debugging logs before completion.
- MAY use local-only debug output for development when it cannot run in production and cannot include generated secrets.

## Telemetry and Reporting

The app currently has no analytics or remote error reporting. Adding either changes the privacy model and should be treated as a high-risk product decision.

**Guidelines:**

- MUST NOT add analytics, session replay, remote error reporting, or monitoring scripts without explicit product approval.
- MUST consult [Application Security Requirements](../application-security-requirements/SKILL.md) before adding any telemetry, reporting destination, or public environment variable.
- MUST document what data is captured, where it is sent, and how generated passwords are excluded before telemetry is implemented.
- MUST treat telemetry changes as high-risk during review and report residual privacy risk.
- SHOULD prefer browser-visible local feedback over remote reporting for generation and clipboard failures.
