---
name: maintainable-code-guidelines
description: Use this skill when reviewing readability, naming, abstraction boundaries, complexity, dead code, or scope discipline. Covers pure password and layout modules, small React components, dependency restraint, clear naming, avoiding premature abstractions, and keeping product rules testable.
---

# Maintainable Code Guidelines

Apply this skill when judging whether code is understandable, well-scoped, and easy to change safely.

## Scope Discipline

Human Keygen should stay small enough that its security-sensitive behavior is easy to audit.

**Guidelines:**

- MUST keep changes limited to the requested behavior.
- MUST NOT combine broad refactors with product changes unless the refactor is required.
- MUST remove dead code introduced by the change.
- SHOULD split large changes into pure logic, UI, and verification steps.

## Naming and Boundaries

Names should reveal whether code is product logic, layout data, or UI composition.

**Guidelines:**

- MUST use names that distinguish layout definitions, character pools, generated password values, and entropy estimates.
- MUST keep pure functions free of React and browser-only side effects.
- MUST keep browser APIs such as Web Crypto and Clipboard behind small explicit boundaries.
- SHOULD avoid abbreviations in security-sensitive code.

## Abstraction

Abstractions should earn their keep by reducing real complexity.

**Guidelines:**

- MUST NOT add framework, state-management, or utility abstractions before the app needs them.
- MUST NOT hide password-generation rules behind generic helper names.
- SHOULD prefer direct pure functions and typed data over configurable mini-frameworks.
- SHOULD add a shared component only after repeated UI structure becomes meaningful.
