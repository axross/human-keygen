# Verification Evidence

Completion reports should be specific enough that a reviewer can distinguish verified behavior from unverified assumptions.

## Command Evidence

Command evidence should name the command and result, not paste long logs unless the output is the point.

**Guidelines:**

- MUST list commands run and whether they passed, failed, or were unavailable.
- MUST identify the relevant failure reason for failed commands.
- MUST distinguish missing scripts from failing scripts.
- MUST report sandbox, network, browser-installation, or dependency blockers separately from code failures.
- SHOULD include focused output snippets only when they clarify a failure.

## Skipped Checks and Residual Risk

Skipped checks are acceptable only when the reason and remaining risk are explicit.

**Guidelines:**

- MUST report skipped required checks with the reason.
- MUST distinguish unverified acceptance criteria from verified behavior.
- MUST name residual risk when verification is incomplete.
- MUST rerun relevant checks after fixing Critical or Major self-review findings.
- SHOULD recommend the next verification step when a check is blocked.
