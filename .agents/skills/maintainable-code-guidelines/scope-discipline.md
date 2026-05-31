# Scope Discipline

Human Keygen should stay small enough that its security-sensitive behavior is easy to audit. Scope discipline keeps product changes reviewable.

## Narrow Diffs

The diff should match the user goal and avoid hidden behavior changes.

**Guidelines:**

- MUST keep changes limited to the requested behavior.
- MUST NOT combine broad refactors with product changes unless the refactor is required.
- MUST separate pre-existing problems from issues introduced by the current change.
- MUST remove dead code introduced by the change.
- SHOULD split large changes into pure logic, UI, and verification steps.

## Review Boundaries

Review should flag scope creep when unrelated files or behaviors move.

**Guidelines:**

- MUST flag unrelated route, style, dependency, or generated-file changes.
- MUST verify that generated files changed only when the task required generation.
- SHOULD recommend follow-up work instead of expanding the current change when cleanup is useful but not required.
