---
name: development-guidelines
description: Apply this skill at the start of EVERY task in this project. Covers workflow classification, scoped change management, Biome format/lint expectations, npm scripts, TanStack Start/Tailwind/Playwright/Biome/Web Crypto current-doc checks, dependency and generated-file rules, verification requirements, and topic-skill routing for Human Keygen.
---

# Development Guidelines

Apply these rules at the start of every task in this repository. This skill owns broad workflow and command expectations; topic-specific skills own detailed product, UI, routing, security, and testing rules.

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

## Code Quality

See [code-quality.md](./code-quality.md) for the local TypeScript, Biome, import, comment, and generated-file rules that apply to ordinary edits.

**Guidelines:**

- SHOULD read the linked reference when work touches TypeScript, JSX, imports, comments, formatting, linting, or generated outputs.

## Change Management

See [change-management.md](./change-management.md) for how to preserve local-first password-generator behavior while changing the smallest useful surface.

**Guidelines:**

- SHOULD read the linked reference when work changes dependencies, shared modules, password/layout behavior, Cloudflare deployment config, or scope boundaries.

## Current Documentation Checks

See [current-docs.md](./current-docs.md) for when current official documentation must be checked before changing fast-moving framework, tooling, or browser API behavior.

**Guidelines:**

- SHOULD read the linked reference when work touches TanStack Start, TanStack Router, Tailwind CSS, Playwright, Biome, Web Crypto, Clipboard, or Wrangler/Cloudflare Workers behavior.

## Dev Commands

See [dev-commands.md](./dev-commands.md) for the repository's npm scripts and when each command is useful.

**Guidelines:**

- SHOULD read the linked reference before running or modifying project commands, local servers, tests, builds, or deployment checks.

## Verification

See [verification.md](./verification.md) for the required verification matrix by changed surface and how to report skipped or blocked checks.

**Guidelines:**

- SHOULD read the linked reference before deciding which checks to run or reporting verification evidence.

## Topic-Specific Routing

The skills below own detailed rules for common project surfaces.

| Topic | Skill |
| ----- | ----- |
| Project layout, stack, deployment target, and file placement | [Project Structure](../project-structure/SKILL.md) |
| TanStack Start routes and route files | [Routing Guidelines](../routing-guidelines/SKILL.md) |
| React components and Tailwind implementation mechanics | [React Component Guidelines](../react-component-guidelines/SKILL.md) |
| UI/UX design decisions | [UI Design Principles](../ui-design-principles/SKILL.md) |
| Keyboard layout data | [Keyboard Layout Requirements](../keyboard-layout-requirements/SKILL.md) |
| Password generation behavior | [Password Generation Requirements](../password-generation-requirements/SKILL.md) |
| Security and privacy | [Application Security Requirements](../application-security-requirements/SKILL.md) |
| Error handling, logging, and telemetry boundaries | [Observability Guidelines](../observability-guidelines/SKILL.md) |
| Performance and reliability | [Performance and Reliability Requirements](../performance-and-reliability-requirements/SKILL.md) |
| E2E tests | [E2E Testing Guidelines](../e2e-testing-guidelines/SKILL.md) |
| Verification evidence | [Quality Assurance Guidelines](../quality-assurance-guidelines/SKILL.md) |
| Post-implementation self-review | [Code Review Guideline](../code-review-guideline/SKILL.md) |

**Guidelines:**

- MUST load the matching topic skill before changing that surface.
- MUST make one skill the source of truth for a rule and link to it instead of duplicating detailed guidance.
- SHOULD keep this skill focused on workflow, commands, and routing.
