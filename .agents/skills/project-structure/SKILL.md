---
name: project-structure
description: Use this skill when locating files, placing modules, checking repository structure, or needing stack/deployment context in this TanStack Start password generator. Covers `src/routes`, feature modules, password logic, keyboard-layout data, styles, tests, generated files, support files, path aliases, Cloudflare Workers Static Assets, docs, scripts, and public assets.
---

# Project Structure

Apply this skill when navigating the repository, creating files, or deciding where code belongs. Keep `AGENTS.md` focused on routing and workflow; durable layout and stack details belong here.

## Tech Stack

Human Keygen is a local-first TanStack Start application for generating layout-aware passwords. It builds static/prerendered assets for Cloudflare Workers Static Assets.

| Area | Technology |
| ---- | ---------- |
| Web framework | TanStack Start with React |
| Router | TanStack Router file-based routing |
| Styling | Tailwind CSS v4 with `@tailwindcss/vite` |
| Language | TypeScript |
| Randomness | Browser Web Crypto API |
| Unit tests | Vitest |
| E2E tests | Playwright |
| Format/lint | Biome |
| Deployment | Cloudflare Workers Static Assets through Wrangler |

**Guidelines:**

- MUST treat TanStack Start, TanStack Router, TypeScript, Tailwind, and browser Web Crypto as the primary app constraints.
- MUST consult [Development Guidelines](../development-guidelines/SKILL.md) before changing dependencies, scripts, tool config, or deployment config.
- MUST consult [Password Generation Requirements](../password-generation-requirements/SKILL.md) before placing generation logic.
- MUST consult [Application Security Requirements](../application-security-requirements/SKILL.md) before changing privacy-sensitive client/server boundaries.
- SHOULD keep stack summaries here instead of duplicating them in `AGENTS.md`.

## Directory Structure

Use this tree to decide where repository-level files and app features belong before adding new files.

```text
<root>
|-- docs/
|   |-- cloudflare-deployment.md
|   `-- technical-requirements.md
|-- scripts/
|   `-- update-word-candidates.mjs
|-- src/
|   |-- features/
|   |   `-- password-generator/
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
|-- public/
|-- package.json
|-- vite.config.ts
|-- vitest.config.ts
|-- playwright.config.ts
|-- biome.jsonc
`-- wrangler.jsonc
```

**Guidelines:**

- MUST place TanStack Start route files under `src/routes`.
- MUST place generator UI that is not route-shell code under `src/features/password-generator`.
- MUST place pure password utilities under `src/lib/password`.
- MUST place keyboard layout data and helpers under `src/lib/keyboard-layouts`.
- MUST place global Tailwind CSS under `src/styles`.
- MUST place Playwright tests under `e2e`.
- MUST place static assets under `public`.
- MUST place source or review scripts under `scripts`.
- MUST place durable product and deployment docs under `docs`.
- MUST NOT treat `src/routeTree.gen.ts`, build output, caches, test reports, or `node_modules` as hand-authored source.
- SHOULD update this tree when a durable top-level directory or route-structure convention changes.

## Support Files

Support files define build, type, test, formatting, and deployment behavior. Read the relevant file before changing the surface it configures.

| File | Responsibility |
| ---- | -------------- |
| `package.json` | npm scripts, dependencies, project metadata |
| `package-lock.json` | npm dependency lockfile |
| `vite.config.ts` | TanStack Start, React, Tailwind, path resolution, dev server, prerender behavior |
| `vitest.config.ts` | Unit test resolution and test file inclusion |
| `tsconfig.json` | TypeScript compiler options and `@/*` alias |
| `playwright.config.ts` | E2E runner, desktop/mobile projects, web server |
| `biome.jsonc` | Format and lint rules |
| `wrangler.jsonc` | Cloudflare Workers asset directory, build command, metrics setting |
| `docs/technical-requirements.md` | Product and technical requirements |
| `docs/cloudflare-deployment.md` | Cloudflare Workers Builds and dry-run deployment guidance |
| `src/routes/__root.tsx` | Document shell, metadata, stylesheet links |
| `src/router.tsx` | Router creation and global router options |

**Guidelines:**

- MUST consult [Routing Guidelines](../routing-guidelines/SKILL.md) before changing `src/routes`, `src/router.tsx`, or route metadata.
- MUST consult [React Component Guidelines](../react-component-guidelines/SKILL.md) before moving component files.
- MUST consult [E2E Testing Guidelines](../e2e-testing-guidelines/SKILL.md) before changing `playwright.config.ts` or files under `e2e`.
- MUST consult [Performance and Reliability Requirements](../performance-and-reliability-requirements/SKILL.md) before changing build or deployment behavior.
- MUST consult [Observability Guidelines](../observability-guidelines/SKILL.md) before changing logs, error reporting, or telemetry surfaces.
- SHOULD update this skill when durable support-file responsibilities change.

## Path Aliases

The TypeScript alias in `tsconfig.json` keeps imports stable across route and feature directories.

| Alias | Target | Use for |
| ----- | ------ | ------- |
| `@/*` | `./src/*` | Imports from `src` modules across route, feature, lib, and style boundaries |

**Guidelines:**

- MUST use the existing `@/*` alias when an import crosses distant source directories and clarity improves.
- MUST keep route-local and same-folder imports relative when that better communicates ownership.
- MUST update this section when `tsconfig.json` path aliases are added, removed, or repointed.
- MUST NOT add a new alias without confirming it improves ownership clarity beyond the existing `@/*` alias.

## Placement Rules

Placement follows ownership. Route shell code belongs under `src/routes`, generator UI belongs under the feature directory, and test files should live in the surface that exercises the behavior.

**Guidelines:**

- MUST consult [Routing Guidelines](../routing-guidelines/SKILL.md) before creating, moving, or renaming routes.
- MUST consult [React Component Guidelines](../react-component-guidelines/SKILL.md) before adding or moving React components.
- MUST consult [Password Generation Requirements](../password-generation-requirements/SKILL.md) before moving generation behavior.
- MUST consult [Keyboard Layout Requirements](../keyboard-layout-requirements/SKILL.md) before moving layout data or layout-derived helpers.
- MUST consult [Maintainable Code Guidelines](../maintainable-code-guidelines/SKILL.md) when reviewing whether a module belongs in route, feature, or shared library code.
- MUST keep generated, dependency, build, cache, and local-report directories out of source-placement decisions unless the task explicitly concerns those directories.
- SHOULD keep this skill descriptive rather than exhaustive; do not list every file when an ownership rule is clearer.
