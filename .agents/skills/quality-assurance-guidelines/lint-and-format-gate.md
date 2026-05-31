# Lint and Format Gate

Biome is a required documentation and code quality gate. Format and lint failures should be fixed or reported, not ignored.

## Required Gate

The normal post-edit gate is `npm run format` followed by `npm run lint`.

**Guidelines:**

- MUST require `npm run format` after code, docs, skills, or config edits when dependencies are available.
- MUST require `npm run lint` after code, docs, skills, or config edits when dependencies are available.
- MUST treat new Biome errors in touched files as blocking.
- MUST review new `// biome-ignore` comments for a concrete inline justification.
- SHOULD treat new Biome warnings in touched files as reviewable even when the command exits successfully.

## Generated and Excluded Files

Some files are generated or intentionally excluded. QA should verify ownership rather than formatting them blindly.

**Guidelines:**

- MUST NOT require hand-formatting of `src/routeTree.gen.ts`.
- MUST verify that generated files changed only when the task or tooling requires them.
- SHOULD flag unexplained changes under build, cache, report, or dependency output directories.
