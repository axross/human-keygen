# Evidence-Based Reporting

Findings should be easy for the author to apply without reinterpreting the review. Each actionable issue needs location, impact, and a concrete fix direction.

## Finding Shape

A strong finding points at the smallest relevant changed line and explains why it matters to this app.

**Example:**

> Major - `src/lib/password/random-source.ts:14` maps random bytes with `% pool.length`, which biases character selection for most pool sizes. Use rejection sampling before indexing the final pool.

**Guidelines:**

- MUST include `file:line` evidence for every actionable finding.
- MUST explain the user, security, reliability, or maintenance impact.
- MUST cite the owning topic skill when the finding depends on project-specific guidance.
- SHOULD include a concrete fix direction when the fix is not obvious.
- SHOULD keep findings ordered by severity, then by likely user impact.

## Fix Snippets

Small snippets are useful when the correction is precise. Large rewrites belong in implementation, not review prose.

**Guidelines:**

- MAY include a minimal diff-style snippet when it clarifies the fix.
- MUST NOT provide a huge replacement patch inside a review finding.
- SHOULD avoid speculative fixes when the correct product behavior needs user input.

## Report Shape

The final review should lead with findings, then summarize residual risk and verification.

**Guidelines:**

- MUST lead with findings when any exist.
- MUST include an explicit "No findings" statement when none exist.
- MUST list open questions or assumptions after findings.
- MUST report verification evidence, skipped checks, and residual risk.
- SHOULD keep change summaries secondary to the actual review result.
