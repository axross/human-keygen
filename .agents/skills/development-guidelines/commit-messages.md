# Commit Messages

Every commit in this repository must follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/). This matters because local history, PR review, and squash-merge output should all communicate the kind of change in a machine-readable way.

## Header Format

The first line is the commit header. It is the required summary format and should stay concise.

```text
<type>[optional scope][!]: <description>
```

**Examples:**

> `docs: polish agent skills`

> `fix(password): prevent biased character selection`

> `test(e2e): cover clipboard failure feedback`

**Guidelines:**

- MUST format every commit header as `<type>[optional scope][!]: <description>`.
- MUST use a lowercase type for consistency.
- MUST include the colon and single space before the description.
- MUST keep the description short, imperative, and specific to the change.
- MUST NOT prefix commit headers with agent, branch, ticket, or tool labels such as `[codex]`.
- SHOULD use a scope when it clarifies the changed surface, such as `password`, `layouts`, `e2e`, `skills`, `routing`, or `deps`.

## Types

Use the standard Conventional Commit intent. `feat` and `fix` carry SemVer meaning; other types are allowed for repository hygiene and communication.

| Type | Use for |
| ---- | ------- |
| `feat` | User-visible feature additions |
| `fix` | Bug fixes |
| `docs` | Documentation, agent skills, or copy-only guidance changes |
| `test` | Unit or e2e test additions and changes |
| `refactor` | Internal restructuring without behavior change |
| `perf` | Performance improvements |
| `build` | Build system, dependency, or bundling changes |
| `ci` | CI or automation changes |
| `chore` | Maintenance that does not fit another type |
| `style` | Formatting-only changes with no behavior impact |
| `revert` | Reverting previous commits |

**Guidelines:**

- MUST use `feat` when a commit adds a user-visible feature.
- MUST use `fix` when a commit fixes a bug.
- MUST use `docs` for changes that only affect `.agents/skills`, `AGENTS.md`, `docs/`, or other documentation surfaces.
- MUST use `test` for changes that only affect test coverage or test infrastructure.
- SHOULD choose the most specific type that describes the user or developer impact.
- SHOULD split unrelated changes into separate commits when one header cannot describe them accurately.

## Body and Footers

Bodies and footers are optional, but they are the right place for rationale, validation context, issue references, and breaking-change details.

**Guidelines:**

- MAY include a body after one blank line when the header alone does not explain the rationale.
- MAY include footers after one blank line following the body.
- MUST indicate breaking changes with `!` before the colon, a `BREAKING CHANGE:` footer, or both.
- MUST write `BREAKING CHANGE:` in uppercase when using the footer form.
- SHOULD include issue or PR references in footers when they help trace context.
