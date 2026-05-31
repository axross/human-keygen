---
name: quality-assurance-guidelines
description: Use this skill when reviewing whether a change has adequate verification evidence. Covers format/lint/build/test proof, unit coverage for password and layout logic, e2e coverage for generator flows, manual responsive and focus checks, skipped commands, residual risk, and second-pass verification after fixes.
---

# Quality Assurance Guidelines

Apply this skill when judging whether a change has been adequately verified.

## Verification Evidence

A completion report should make it clear what was checked and what remains risky.

**Guidelines:**

- MUST list commands run and whether they passed, failed, or were unavailable.
- MUST report skipped required checks with the reason.
- MUST include manual browser checks when UI, focus, clipboard, or responsive behavior changes.
- MUST rerun relevant checks after fixing Critical or Major self-review findings.
- SHOULD include focused evidence instead of long command logs.

## Required Coverage by Surface

Different changes need different tests.

| Surface | Expected verification |
| ------- | --------------------- |
| Password generation | Unit tests for pool, randomness mapping, length, entropy |
| Keyboard layouts | Unit tests for layout normalization and QWERTY intersection |
| UI components | Unit or e2e coverage plus manual responsive/focus checks |
| Routes/config | Build plus browser smoke test |
| Skills/docs | Format or link checks when available, plus manual link review |

**Guidelines:**

- MUST require unit tests for deterministic password and layout behavior.
- MUST require e2e coverage for new user-facing generator workflows.
- MUST require `npm run build` after route, config, dependency, or TypeScript signature changes.
- MUST require `npm run format` and `npm run lint` after code or documentation edits once scripts exist.
- SHOULD treat missing tests on password logic as a blocking QA finding.

## Residual Risk

Some checks may be impossible before scaffolding or dependency installation. The report should say so plainly.

**Guidelines:**

- MUST distinguish missing scripts from failing scripts.
- MUST distinguish unverified acceptance criteria from verified behavior.
- SHOULD recommend the next verification step when a check is blocked by missing scaffold or dependencies.
