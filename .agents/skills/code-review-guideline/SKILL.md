---
name: code-review-guideline
description: Apply this skill at the start of EVERY review task, including post-implementation self-review. Covers reviewer-mode reset, diff scoping with `git status`/`git diff`, severity labels, file-line evidence, fix snippets, verification evidence, second-pass re-review after fixes, high-risk escalation, and topic-specific lenses for password generation, keyboard layouts, privacy, dependencies, routing, UI, observability, and e2e tests.
---

# Code Review Guideline

Apply these rules at the start of every code review, including review-only prompts and post-implementation self-review.

## Reviewer-Mode Reset

Self-review is not independent review, so it must be a distinct phase after editing stops. The reviewer rereads the request, inspects the diff, and judges the produced change as if another author wrote it.

**Guidelines:**

- MUST stop editing before post-implementation self-review.
- MUST reread the user request and relevant requirements.
- MUST inspect `git status` and the relevant `git diff`.
- MUST judge the diff and observed behavior, not the implementation intent.
- MUST fix Critical or Major findings before completion, then perform a second-pass review.
- MUST report verification evidence or skipped verification before completion.
- SHOULD escalate high-risk changes per [escalation.md](./escalation.md) instead of calling them merge-ready based on self-review alone.

## Review Scoping

See [scoping.md](./scoping.md) for how to bound a review to the actual diff while reading enough surrounding context to understand behavior.

**Guidelines:**

- SHOULD read the linked reference when reviewing local changes, PR diffs, untracked files, or partial diffs.

## Severity Classification

See [severity.md](./severity.md) for the project severity scale and how severity drives the final verdict.

**Guidelines:**

- SHOULD read the linked reference when deciding whether a finding is Critical, Major, Minor, or Nit.

## Evidence-Based Reporting

See [evidence.md](./evidence.md) for required `file:line` citations, fix snippets, and review-report shape.

**Guidelines:**

- SHOULD read the linked reference before writing review findings or a post-implementation self-review.

## Escalation

See [escalation.md](./escalation.md) for high-risk change handling, guideline-gap notes, and decision-needed reporting.

**Guidelines:**

- SHOULD read the linked reference when a change affects generated password secrecy, randomness, telemetry, dependencies, production/deployment config, or large refactors.

## Topic-Specific Lenses

Use the owning skill as the review lens for each changed surface.

| Lens | Skill |
| ---- | ----- |
| Development workflow, commands, dependencies, generated files | [Development Guidelines](../development-guidelines/SKILL.md) |
| File placement, stack, deployment target | [Project Structure](../project-structure/SKILL.md) |
| Routes and metadata | [Routing Guidelines](../routing-guidelines/SKILL.md) |
| Components and Tailwind mechanics | [React Component Guidelines](../react-component-guidelines/SKILL.md) |
| UI/UX and accessibility | [UI Design Principles](../ui-design-principles/SKILL.md) |
| Keyboard layout data | [Keyboard Layout Requirements](../keyboard-layout-requirements/SKILL.md) |
| Password generation | [Password Generation Requirements](../password-generation-requirements/SKILL.md) |
| Security and privacy | [Application Security Requirements](../application-security-requirements/SKILL.md) |
| Error handling, logging, telemetry boundaries | [Observability Guidelines](../observability-guidelines/SKILL.md) |
| Performance and reliability | [Performance and Reliability Requirements](../performance-and-reliability-requirements/SKILL.md) |
| E2E tests | [E2E Testing Guidelines](../e2e-testing-guidelines/SKILL.md) |
| Verification evidence | [Quality Assurance Guidelines](../quality-assurance-guidelines/SKILL.md) |

**Guidelines:**

- MUST select every topic lens that materially overlaps the diff.
- MUST cite the owning skill when a finding depends on project-specific guidance.
- MUST NOT restate a neighboring skill's detailed rule when a link and concise summary are enough.
