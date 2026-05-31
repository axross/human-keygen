# Severity Classification

Severity should reflect user impact, security risk, likelihood, and reversibility. Generated-password exposure and randomness failures are more severe than ordinary UI polish issues.

| Severity | Meaning |
| -------- | ------- |
| Critical | Leaks generated passwords, weakens production randomness, can deploy an unusable app, or creates irreversible data/security harm |
| Major | Violates core generation rules, breaks the primary generator flow, misses required tests for password/layout behavior, or creates high-risk privacy/dependency exposure |
| Minor | Degrades accessibility, maintainability, reliability, or edge-case behavior without breaking the core flow |
| Nit | Small wording, style, or clarity issue with low behavioral risk |

**Guidelines:**

- MUST label each actionable finding with a severity.
- MUST treat generated password exposure or non-Web-Crypto production randomness as Critical.
- MUST treat same-position layout pool violations, biased random index selection, broken copy/generate flow, or missing password/layout tests as Major or higher.
- MUST treat dependency additions with unreviewed telemetry, install scripts, or secret-handling impact as Major or higher.
- SHOULD calibrate UI-only issues by whether they block generation, copying, accessibility, or responsive use.
- SHOULD avoid reporting Nits unless the review otherwise has substantive findings or the user requested polish.

## Verdicts

The verdict should follow the highest unresolved severity.

**Guidelines:**

- MUST request changes when any Critical or Major finding remains unresolved.
- MUST say clearly when no issues were found.
- MUST mention residual test or verification gaps even when no code findings remain.
- SHOULD use "Approve with Nits" only for non-blocking Nit findings.
