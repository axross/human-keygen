---
name: code-review-guideline
description: Apply this skill at the start of EVERY review task, including post-implementation self-review. Covers reviewer-mode reset, diff scoping, severity labels, file-line evidence, topic-specific lenses, verification evidence, second-pass review after blocking fixes, and high-risk escalation for password generation, privacy, dependencies, routing, and UI.
---

# Code Review Guideline

Apply this skill before reviewing a diff, PR, or local post-implementation change.

## Reviewer-Mode Reset

Self-review is not independent review, so it must be a distinct phase after editing stops.

**Guidelines:**

- MUST stop editing before review.
- MUST reread the user request and relevant requirements.
- MUST inspect `git status` and the relevant `git diff`.
- MUST judge the diff and observed behavior, not the author's intent.
- MUST fix Critical or Major findings before completion, then perform a second-pass review.
- MUST report verification evidence or skipped verification.

## Severity Labels

Severity should reflect user impact and security risk.

| Severity | Meaning |
| -------- | ------- |
| Critical | Leaks generated passwords, weakens randomness, data loss, or app cannot run |
| Major | Violates core generation rules, breaks primary flow, or misses required tests |
| Minor | Degrades accessibility, maintainability, or edge-case behavior without breaking the core flow |
| Nit | Small clarity or style issue |

**Guidelines:**

- MUST label each finding with severity.
- MUST include file and line evidence for actionable findings.
- MUST explain the user or maintenance impact.
- SHOULD include a concrete fix direction when the fix is not obvious.

## Topic Lenses

Use the owning skill as the review lens for each changed surface.

| Lens | Skill |
| ---- | ----- |
| Development workflow and commands | [Development Guidelines](../development-guidelines/SKILL.md) |
| File placement and structure | [Project Structure](../project-structure/SKILL.md) |
| Routes and metadata | [Routing Guidelines](../routing-guidelines/SKILL.md) |
| Components and Tailwind mechanics | [React Component Guidelines](../react-component-guidelines/SKILL.md) |
| UI/UX and accessibility | [UI Design Principles](../ui-design-principles/SKILL.md) |
| Keyboard layout data | [Keyboard Layout Requirements](../keyboard-layout-requirements/SKILL.md) |
| Password generation | [Password Generation Requirements](../password-generation-requirements/SKILL.md) |
| Security and privacy | [Application Security Requirements](../application-security-requirements/SKILL.md) |
| Performance and reliability | [Performance and Reliability Requirements](../performance-and-reliability-requirements/SKILL.md) |
| E2E tests | [E2E Testing Guidelines](../e2e-testing-guidelines/SKILL.md) |
| Verification evidence | [Quality Assurance Guidelines](../quality-assurance-guidelines/SKILL.md) |

**Guidelines:**

- MUST select every topic lens that materially overlaps the diff.
- MUST cite the owning skill when a finding depends on project-specific guidance.
- MUST escalate high-risk changes involving password exposure, randomness, dependency supply chain, or privacy before calling them merge-ready.
