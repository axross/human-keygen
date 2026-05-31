# Pull Requests

Pull request titles matter in this repository because squash and merge uses the PR title as the final commit message. Treat the PR title as a commit header, not as a decorative label.

## PR Title

The PR title must be a valid Conventional Commit header before the PR is opened and before it is merged.

**Examples:**

> `docs: add Conventional Commit guidance`

> `fix(layouts): correct Dvorak same-position pool`

> `feat(generator): add layout category summary`

**Guidelines:**

- MUST format every pull request title as a valid Conventional Commit header.
- MUST NOT prefix PR titles with `[codex]`, ticket labels, branch names, or status markers.
- MUST choose the PR title to describe the full squash-merge result, not only the latest local commit.
- MUST update the PR title before merge if the PR scope changes.
- SHOULD keep draft markers, review requests, and implementation notes in the PR body or GitHub state instead of the title.

## PR Body

The body should give reviewers enough context to understand the change, validation, and residual risk.

**Guidelines:**

- MUST include a concise summary of what changed.
- MUST include validation evidence or explicitly state skipped checks and residual risk.
- MUST mention high-risk surfaces such as generated password exposure, randomness, telemetry, dependency, routing, or deployment changes.
- SHOULD include notes for intentionally deferred work or follow-up decisions.

## Publishing Workflow

Publishing should preserve a clean branch and reviewable history.

**Guidelines:**

- MUST inspect `git status` and the diff before staging changes for a PR.
- MUST stage only files that belong to the requested PR scope.
- MUST create draft pull requests by default unless the user explicitly asks for ready-for-review.
- MUST target `main` unless the user specifies another base branch.
- MUST verify the PR title follows [commit-messages.md](./commit-messages.md) before opening the PR.
- SHOULD use a descriptive branch name such as `codex/add-conventional-commit-guidance` for agent-authored work.
