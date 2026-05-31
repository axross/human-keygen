---
name: quality-assurance-guidelines
description: Use this skill when reviewing whether a change has adequate verification evidence. Covers format/lint/build/test proof, unit coverage for password and layout logic, e2e coverage for generator flows, clipboard and responsive manual checks, flaky-test handling, skipped commands, residual risk, and second-pass verification after fixes.
---

# Quality Assurance Guidelines

Apply these rules when judging whether a change has been adequately verified before completion or merge. This is the reviewer's QA lens on top of [Development Guidelines](../development-guidelines/SKILL.md) and [E2E Testing Guidelines](../e2e-testing-guidelines/SKILL.md).

## Verification Evidence

See [verification-evidence.md](./verification-evidence.md) for how to report commands, manual checks, skipped checks, and residual risk.

**Guidelines:**

- SHOULD read the linked reference when reviewing completion evidence or preparing final verification reporting.

## Lint and Format Gate

See [lint-and-format-gate.md](./lint-and-format-gate.md) for Biome format/lint expectations, `biome-ignore` review, and touched-file warning handling.

**Guidelines:**

- SHOULD read the linked reference when work edits code, docs, skills, config, tests, or generated-word scripts.

## Unit and E2E Coverage

See [test-coverage.md](./test-coverage.md) for expected coverage by surface: password generation, keyboard layouts, React UI, routing, and deployment config.

**Guidelines:**

- SHOULD read the linked reference when reviewing test adequacy or deciding whether new tests are required.

## Manual Verification

See [manual-verification.md](./manual-verification.md) for browser checks that automated tests do not fully cover: responsive layout, focus, copy feedback, and failure states.

**Guidelines:**

- SHOULD read the linked reference when UI output, browser APIs, or responsive behavior changes.

## Flakiness Tolerance

See [flakiness-tolerance.md](./flakiness-tolerance.md) for handling intermittent Playwright or Vitest failures without weakening coverage.

**Guidelines:**

- SHOULD read the linked reference when a test is retried, skipped, marked flaky, or changed to wait for asynchronous browser behavior.
