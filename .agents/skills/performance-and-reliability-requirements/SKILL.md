---
name: performance-and-reliability-requirements
description: Use this skill when reviewing performance or reliability for the password generator. Covers bundle weight, dependency restraint, local-only responsiveness, avoiding server round trips, graceful Web Crypto and Clipboard failures, deterministic tests, build health, and preventing UI stalls during repeated generation.
---

# Performance and Reliability Requirements

Apply this skill when a change affects runtime speed, bundle size, reliability, failure modes, or user trust.

## Local Responsiveness

Password generation should feel instant because it is local and small.

**Guidelines:**

- MUST keep generation synchronous and fast for normal password lengths.
- MUST avoid server round trips for layout selection, entropy calculation, generation, and copy feedback.
- MUST prevent repeated generation clicks from causing layout shifts or UI stalls.
- SHOULD keep expensive derived values memoized only when profiling or complexity justifies it.

## Bundle Weight

This app does not need heavy runtime dependencies for its core behavior.

**Guidelines:**

- MUST justify new dependencies against bundle impact and product value.
- MUST NOT add large cryptography, UI, analytics, or state-management libraries for behavior covered by browser APIs and React state.
- SHOULD use direct imports when a dependency is necessary.
- SHOULD inspect bundle impact when adding UI or utility packages.

## Failure Modes

Failures should be understandable and should not weaken security.

**Guidelines:**

- MUST show a recoverable error if Web Crypto is unavailable.
- MUST show copy failure feedback if Clipboard API access is denied.
- MUST keep the generate action disabled when no valid character pool exists.
- MUST NOT fall back to weaker randomness.
- SHOULD keep error messages free of generated password values.
