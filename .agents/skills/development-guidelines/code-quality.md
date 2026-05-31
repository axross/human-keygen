# Code Quality

Biome and TypeScript are the local quality gates. Code should stay easy to type-check, lint, and review without relying on generated files or broad formatter exceptions.

## TypeScript and Module Shape

TypeScript rules should make product behavior explicit: password generation and layout math belong in typed pure functions, while React components own browser interaction and rendering.

**Guidelines:**

- MUST keep TypeScript strictness errors at zero before completion.
- MUST use explicit prop interfaces for React components and exported functions that define product contracts.
- MUST prefer `interface` for object shapes because Biome is configured for consistent object definitions.
- MUST use ESM imports and exports; CommonJS and namespace imports are disallowed by local lint rules.
- SHOULD keep exported modules small enough that generated password, layout, entropy, and UI responsibilities are distinguishable.

## Biome Formatting and Linting

`biome.jsonc` is intentionally strict. Treat warnings in touched files as reviewable issues, especially when they affect accessibility, security, complexity, imports, or Tailwind class sorting.

**Guidelines:**

- MUST run `npm run format` after documentation or code edits when dependencies are available.
- MUST run `npm run lint` after documentation or code edits when dependencies are available.
- MUST NOT add `// biome-ignore` without an inline reason that names the specific false positive or accepted trade-off.
- MUST NOT hand-edit generated files that Biome excludes, such as `src/routeTree.gen.ts`.
- SHOULD use Biome's output to guide small cleanup in touched files rather than broad unrelated rewrites.

## Comments and Debugging Artifacts

Comments should preserve non-obvious product decisions. Temporary notes, logs, and disabled code make password-sensitive work harder to audit.

**Guidelines:**

- MUST remove temporary debugging logs and commented-out code before completion.
- MUST keep comments out of generated password values, random byte data, and clipboard payloads.
- SHOULD add short comments only for non-obvious password-generation constraints, layout-source caveats, or browser API failure decisions.
- SHOULD keep requirements-level explanations in `docs/` or `.agents/skills/` rather than long comments inside implementation files.
