# Verification

Verification should match the changed surface. Report what was run, what passed or failed, what was skipped, and any residual risk.

## Required Checks by Surface

Use the smallest set that proves the changed behavior, then broaden when shared code or high-risk surfaces are involved.

| Surface | Required verification |
| ------- | --------------------- |
| Code or docs | `npm run format`, `npm run lint` |
| Password generation, entropy, random source, word candidates | `npm run test`, relevant focused unit tests during debugging |
| Keyboard layout data or pool derivation | `npm run test`, layout-specific unit coverage |
| React UI, browser workflow, copy feedback, responsive behavior | `npm run test:e2e`, manual browser checks when visual/focus behavior changes |
| Routes, metadata, router config, Vite/Tailwind config, TypeScript signatures | `npm run build` |
| Cloudflare/Wrangler deployment config | `npm run build` and the dry-run path documented in `docs/cloudflare-deployment.md` when practical |
| Dependencies or lockfile | `npm run lint`, `npm run test`, `npm run build`, and targeted supply-chain review |
| Skills and docs | `npm run format`, `npm run lint`, manual relative-link review |

**Guidelines:**

- MUST run relevant verification commands after non-trivial changes when scripts exist and dependencies are available.
- MUST rerun relevant checks after fixing Critical or Major self-review findings.
- MUST report skipped commands, missing scripts, sandbox blockers, dependency blockers, failures, and residual risk.
- MUST NOT claim a behavior is verified when only adjacent formatting or static checks ran.
- SHOULD add or update tests before relying on manual verification for deterministic password or layout logic.

## Manual Browser Checks

Automated checks do not replace visual and interaction checks when a change affects the generator surface.

**Guidelines:**

- MUST manually check relevant browser behavior when UI layout, focus states, copy feedback, loading/error states, or responsive wrapping changes.
- MUST verify mobile and desktop viewports when text wrapping, control layout, or password display changes.
- MUST verify Clipboard API success/failure messaging when copy behavior changes.
- SHOULD use Playwright screenshots or browser tooling for visual checks after meaningful UI changes.
