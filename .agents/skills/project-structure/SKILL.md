---
name: project-structure
description: Use this skill when locating files, placing modules, checking repository structure, or needing stack context in this TanStack Start password generator. Covers proposed source layout, `src/routes`, feature modules, password logic, keyboard-layout data, styles, tests, generated files, support files, and public assets.
---

# Project Structure

Apply this skill when navigating the repository, creating files, or deciding where code belongs.

## Tech Stack

Human Keygen is a local-first TanStack Start application for generating layout-aware passwords.

| Area | Technology |
| ---- | ---------- |
| Web framework | TanStack Start with React |
| Router | TanStack Router file-based routing |
| Styling | Tailwind CSS v4 with `@tailwindcss/vite` |
| Language | TypeScript |
| Randomness | Browser Web Crypto API |
| Unit tests | Vitest or selected scaffold default |
| E2E tests | Playwright |
| Format/lint | Biome unless scaffolding establishes another local standard |

**Guidelines:**

- MUST treat TanStack Start, TanStack Router, TypeScript, and Tailwind as the primary app constraints.
- MUST consult [Development Guidelines](../development-guidelines/SKILL.md) before changing dependencies, scripts, or tool config.
- MUST consult [Password Generation Requirements](../password-generation-requirements/SKILL.md) before placing generation logic.
- SHOULD keep stack summaries here instead of duplicating them in `AGENTS.md`.

## Source Layout

Use this layout unless implementation evidence shows a better TanStack Start convention.

```text
<root>
|-- docs/
|-- src/
|   |-- features/
|   |   `-- password-generator/
|   |       |-- components/
|   |       `-- password-generator.tsx
|   |-- lib/
|   |   |-- keyboard-layouts/
|   |   `-- password/
|   |-- routes/
|   |   |-- __root.tsx
|   |   `-- index.tsx
|   |-- router.tsx
|   |-- routeTree.gen.ts
|   `-- styles/
|-- e2e/
`-- public/
```

**Guidelines:**

- MUST place TanStack Start route files under `src/routes`.
- MUST place generator UI that is not route-shell code under `src/features/password-generator`.
- MUST place pure password utilities under `src/lib/password`.
- MUST place keyboard layout data and helpers under `src/lib/keyboard-layouts`.
- MUST place global Tailwind CSS under `src/styles`.
- MUST place Playwright tests under `e2e`.
- MUST place static assets under `public`.
- MUST NOT treat `src/routeTree.gen.ts`, build output, caches, or `node_modules` as hand-authored source.

## Support Files

Support files define build, type, test, and formatting behavior. Read the relevant file before changing the surface it configures.

| File | Responsibility |
| ---- | -------------- |
| `package.json` | npm scripts, dependencies, project metadata |
| `vite.config.ts` | TanStack Start, React, Tailwind, path resolution, dev server |
| `tsconfig.json` | TypeScript compiler options and aliases |
| `playwright.config.ts` | E2E runner behavior |
| `biome.json` or `biome.jsonc` | Format and lint rules |
| `src/routes/__root.tsx` | Document shell, metadata, stylesheet links |
| `src/router.tsx` | Router creation and global router options |

**Guidelines:**

- MUST consult [Routing Guidelines](../routing-guidelines/SKILL.md) before changing `src/routes`, `src/router.tsx`, or route metadata.
- MUST consult [React Component Guidelines](../react-component-guidelines/SKILL.md) before moving component files.
- MUST consult [E2E Testing Guidelines](../e2e-testing-guidelines/SKILL.md) before changing `playwright.config.ts` or `e2e`.
- SHOULD update this skill when durable top-level directories or placement rules change.
