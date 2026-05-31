# Escalation

Some changes are too risky to call merge-ready based only on a single agent's self-review. Escalation means naming the required external review, CI signal, or product decision.

## High-Risk Surfaces

High-risk surfaces can expose generated secrets, weaken password strength, or change the app's privacy and deployment model.

**Guidelines:**

- MUST escalate generated password exposure, randomness changes, clipboard privacy behavior, telemetry/logging additions, dependency supply-chain changes, and production/deployment config changes before calling them merge-ready.
- MUST escalate large refactors that touch password logic, layout data, UI flow, and tests together.
- MUST request explicit product approval before adding analytics, remote error reporting, storage, accounts, server generation, or URL-backed generated values.
- SHOULD require CI/PR review evidence before calling high-risk changes merge-ready.

## Decision Needed

When correctness depends on product scope or privacy tolerance, the review should ask a concrete question instead of guessing.

**Guidelines:**

- MUST label unresolved product or privacy questions as `Decision needed:`.
- MUST describe the trade-off and the files or behavior affected.
- MUST NOT bury a required product decision inside a low-severity suggestion.

## Guideline Gaps

Review sometimes exposes missing or stale project guidance. Capture those gaps so the skill tree improves over time.

**Guidelines:**

- SHOULD add a `Guideline gap:` note when no existing skill owns a recurring review rule.
- SHOULD recommend the owning skill or index location for the gap.
- MUST NOT block the current change solely because a future skill improvement would be useful.
