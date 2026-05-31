# Review Scoping

A useful review starts with the change set, then reads surrounding context only to understand impact. Pre-existing problems should be separated from findings introduced by the diff.

## Diff Discovery

Use Git output to understand what is in scope before reading implementation intent or nearby files.

**Guidelines:**

- MUST inspect `git status --short` before reviewing local work.
- MUST inspect the relevant `git diff` for tracked changes and newly added files.
- MUST include untracked files in scope when they are part of the requested change.
- MUST NOT review unrelated dirty-worktree changes as if they belong to the current task.
- SHOULD note when a review is limited by missing diff context or inaccessible base revisions.

## Context Reading

Surrounding code matters when it defines a contract, but the review finding must still point at the changed behavior.

**Guidelines:**

- MUST read callers, callees, tests, or docs when needed to verify the changed contract.
- MUST distinguish "introduced by this diff" from "pre-existing nearby risk".
- SHOULD cite the changed file and line for actionable findings, even when context comes from another file.
- SHOULD keep optional cleanup suggestions separate from blocking findings.

## Partial and Follow-Up Reviews

Sometimes a review covers a subset of files or a follow-up fix. State the boundary so the verdict is not overclaimed.

**Guidelines:**

- MUST state when the review covers only selected files, selected commits, or a follow-up patch.
- MUST re-review previously blocking findings after fixes before claiming they are resolved.
- SHOULD avoid expanding a narrow requested review into a broad audit unless the user asks for it.
