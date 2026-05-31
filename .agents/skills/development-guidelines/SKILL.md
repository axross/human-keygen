---
name: development-guidelines
description: Apply this skill at the start of EVERY task in this project. Covers TanStack Start and Tailwind current-docs checks, scoped change management, npm scripts, dependency additions, format/lint/build/test verification, TypeScript quality, generated files, and topic-skill routing for the Human Keygen password generator.
---

# Development Guidelines

Apply this skill at the start of every task in this repository. This skill owns the broad development workflow; topic-specific skills own their detailed surfaces.

## Workflow Classification

Every non-trivial task should be classified before editing so the right project rules are loaded.

| Classification | Examples |
| -------------- | -------- |
| UI-bearing | Generator layout, controls, copy feedback, responsive styling |
| Implementation-only | Password generation, entropy math, keyboard-layout data |
| Review-only | Diff review, self-review, PR review |
| Skill-maintenance | Changes under `.agents/skills` or the skill index |
| Exploratory | Research, requirements, framework investigation |
| Mixed | Any task that combines the above |

**Guidelines:**

- MUST classify non-trivial work before editing files.
- MUST consult every skill whose routing condition matches the classification and changed surface.
- MUST keep implementation changes scoped to the smallest surface that satisfies the request.
- SHOULD revise the classification when new evidence changes the affected surface.

## Current Documentation Checks

This project depends on fast-moving framework and tooling behavior. Use current official docs before changing surfaces that may have shifted.

| Surface | Official source |
| ------- | --------------- |
| TanStack Start app setup, routing, CSS, server behavior | `tanstack.com/start/latest` |
| TanStack Router file-route behavior | `tanstack.com/router/latest` |
| Tailwind CSS v4 and Vite integration | `tailwindcss.com/docs` |
| Playwright runner and assertions | `playwright.dev` |
| Biome commands and config | `biomejs.dev` |
| Web Crypto randomness | MDN or Web Platform docs |

**Guidelines:**

- MUST check current official docs before adding or changing TanStack Start, TanStack Router, Tailwind, Playwright, Biome, or Web Crypto integration.
- MUST prefer official docs and source examples over blog posts for framework behavior.
- MUST note any RC-specific TanStack Start behavior in requirements, comments, or final reporting when it affects implementation risk.
- SHOULD pin or lock dependencies after scaffolding because TanStack Start is currently RC.

## Change Management

The app should remain small, local-first, and testable. Password-generation rules are product behavior, not incidental helper code.

**Guidelines:**

- MUST preserve existing public behavior unless the requested change intentionally modifies it.
- MUST keep pure password and layout logic outside route components.
- MUST avoid adding server dependencies or runtime services unless the product requirement needs them.
- MUST justify every new npm dependency by product value, maintenance health, and bundle impact.
- MUST NOT hand-edit generated files such as `src/routeTree.gen.ts` unless official tooling requires it.
- SHOULD prefer small pure functions with focused tests for generation, same-position layout pools, and entropy logic.

## Verification Commands

Verification should match the changed surface. If scripts do not exist yet during scaffolding, report that clearly instead of pretending they passed.

| Command | When required |
| ------- | ------------- |
| `npm run format` | After code or documentation edits once the script exists |
| `npm run lint` | After code or documentation edits once the script exists |
| `npm run test` | After password logic, layout data, utility, or component behavior changes |
| `npm run test:e2e` | After UI output, browser workflow, or e2e coverage changes |
| `npm run build` | After routing, config, dependency, TypeScript signature, or runtime behavior changes |

**Guidelines:**

- MUST run relevant verification commands after non-trivial changes when scripts exist.
- MUST report skipped commands, missing scripts, failures, and residual risk.
- MUST rerun relevant checks after fixing Critical or Major self-review findings.
- SHOULD add or update tests before relying on manual verification for deterministic password logic.

## Topic-Specific Routing

The skills below own detailed rules for common project surfaces.

| Topic | Skill |
| ----- | ----- |
| Project layout, stack, and file placement | [Project Structure](../project-structure/SKILL.md) |
| TanStack Start routes and route files | [Routing Guidelines](../routing-guidelines/SKILL.md) |
| React components and Tailwind implementation mechanics | [React Component Guidelines](../react-component-guidelines/SKILL.md) |
| UI/UX design decisions | [UI Design Principles](../ui-design-principles/SKILL.md) |
| Keyboard layout data | [Keyboard Layout Requirements](../keyboard-layout-requirements/SKILL.md) |
| Password generation behavior | [Password Generation Requirements](../password-generation-requirements/SKILL.md) |
| Security and privacy | [Application Security Requirements](../application-security-requirements/SKILL.md) |
| Performance and reliability | [Performance and Reliability Requirements](../performance-and-reliability-requirements/SKILL.md) |
| E2E tests | [E2E Testing Guidelines](../e2e-testing-guidelines/SKILL.md) |
| Verification evidence | [Quality Assurance Guidelines](../quality-assurance-guidelines/SKILL.md) |
| Post-implementation self-review | [Code Review Guideline](../code-review-guideline/SKILL.md) |

**Guidelines:**

- MUST load the matching topic skill before changing that surface.
- MUST make one skill the source of truth for a rule and link to it instead of duplicating detailed guidance.
- SHOULD keep this skill focused on workflow, commands, and routing.
