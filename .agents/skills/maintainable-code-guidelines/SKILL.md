---
name: maintainable-code-guidelines
description: Use this skill when reviewing readability, naming, abstraction boundaries, complexity, dead code, or scope discipline. Covers pure password and layout modules, small React components, dependency restraint, clear naming, Biome complexity signals, avoiding premature abstractions, and keeping product rules testable.
---

# Maintainable Code Guidelines

Apply this skill when judging whether code is understandable, well-scoped, and easy to change safely. This is the reviewer lens; developer-facing mechanics live in the topic skills.

## Scope Discipline

See [scope-discipline.md](./scope-discipline.md) for keeping changes narrow, separating refactors from behavior changes, and avoiding drive-by cleanup.

**Guidelines:**

- SHOULD read the linked reference when reviewing change scope, unrelated diffs, or refactor boundaries.

## Naming and Boundaries

See [naming-and-boundaries.md](./naming-and-boundaries.md) for names and module boundaries that distinguish layout data, password generation, browser APIs, and UI composition.

**Guidelines:**

- SHOULD read the linked reference when reviewing file placement, identifiers, imports, or pure-vs-browser boundaries.

## Complexity and Readability

See [complexity-and-readability.md](./complexity-and-readability.md) for Biome complexity signals, magic values, testability, and dead-code expectations.

**Guidelines:**

- SHOULD read the linked reference when reviewing dense functions, nested logic, word-selection algorithms, or lint suppressions.

## Abstraction

See [abstraction.md](./abstraction.md) for when to introduce shared components, helpers, or framework-like layers.

**Guidelines:**

- SHOULD read the linked reference when reviewing new abstractions, shared helpers, state-management patterns, or repeated UI structure.
