# Abstraction

Abstractions should earn their keep by reducing real complexity without hiding password-generation rules.

## When to Abstract

Prefer direct code until duplication or complexity has a concrete maintenance cost.

**Guidelines:**

- MUST NOT add framework, state-management, or utility abstractions before the app needs them.
- MUST NOT hide password-generation rules behind generic helper names.
- MUST require at least two concrete call sites or one clearly complex product rule before adding shared abstractions.
- SHOULD prefer direct pure functions and typed data over configurable mini-frameworks.
- SHOULD add a shared component only after repeated UI structure becomes meaningful.

## What Not to Abstract

Some repetition makes security-sensitive behavior easier to inspect.

**Guidelines:**

- MUST keep Web Crypto and Clipboard boundaries explicit.
- MUST keep layout pool, entropy, and complete-word rules traceable from tests to implementation.
- MUST NOT collapse unrelated UI controls into a generic component when their accessibility or error behavior differs.
- SHOULD duplicate tiny JSX structures until the shared component would clarify behavior.
