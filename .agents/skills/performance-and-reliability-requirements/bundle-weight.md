# Bundle Weight

This app does not need heavy runtime dependencies for its core behavior. Word candidates and UI helpers should be kept narrow enough for a small local-first bundle.

## Dependency Weight

New packages should earn their place in the browser bundle.

**Guidelines:**

- MUST justify new dependencies against bundle impact and product value.
- MUST NOT add large cryptography, UI, analytics, state-management, or telemetry libraries for behavior covered by browser APIs and React state.
- MUST inspect client bundle impact when adding UI, word-list, or utility packages.
- MUST keep dependency additions aligned with [Application Security Requirements](../application-security-requirements/SKILL.md).
- SHOULD use direct imports when a dependency is necessary.

## Word Candidate Data

The memorable generator depends on word candidates, but the bundle should not include unnecessary dialects or source lists.

**Guidelines:**

- MUST keep word-list imports narrow enough to avoid pulling unnecessary `wordlist-js` data into the client bundle.
- MUST prefer generated/reviewed candidate subsets over runtime filtering of broad dictionaries when bundle impact becomes material.
- SHOULD review `scripts/update-word-candidates.mjs` output size when changing word-candidate generation.
