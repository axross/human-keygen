# Change Management

Human Keygen is a small local-first password generator. Changes should preserve the privacy model and keep product rules reviewable.

## Scope Control

The safest changes are narrow, observable, and aligned with the requested behavior. Refactors are acceptable when they directly reduce risk or unlock the requested change.

**Guidelines:**

- MUST preserve existing public behavior unless the requested change intentionally modifies it.
- MUST keep changes scoped to the smallest surface that satisfies the request.
- MUST separate behavior changes from unrelated formatting or structural cleanup.
- MUST NOT combine broad refactors with password-generation changes unless the refactor is required for correctness.
- SHOULD revise the plan when discovery shows that more files are affected than expected.

## Dependency Changes

New dependencies increase bundle weight and supply-chain risk. The app should prefer platform APIs and typed local helpers for core behavior.

**Guidelines:**

- MUST justify every new npm dependency by product value, maintenance health, license fit, and bundle impact.
- MUST inspect new transitive dependencies for unexpected install scripts or browser/runtime assumptions.
- MUST update and review `package-lock.json` with dependency changes.
- MUST consult [Application Security Requirements](../application-security-requirements/SKILL.md) for dependencies that touch randomness, clipboard, telemetry, storage, networking, or generated values.
- SHOULD prefer direct imports and narrow packages over broad utility libraries.

## Local-First Product Boundary

The product promise is that password generation happens locally. Server and deployment changes must not turn secrets into network data.

**Guidelines:**

- MUST keep password generation, entropy calculation, layout selection, and copy feedback client-side unless a future requirement explicitly changes the privacy model.
- MUST keep pure password and keyboard-layout logic outside route components.
- MUST avoid server dependencies or runtime services unless the product requirement needs them and privacy impact is reviewed.
- MUST NOT put generated passwords, character pools, or user-selected secrets into URLs, metadata, logs, storage, or build artifacts.
- SHOULD use small pure functions with focused tests for generation, same-position layout pools, random index selection, and entropy logic.

## Generated and Deployment Files

Generated files and deployment config have different ownership than source modules. Treat them deliberately so generated output does not become accidental source.

**Guidelines:**

- MUST NOT hand-edit `src/routeTree.gen.ts` unless official TanStack tooling requires it.
- MUST read `wrangler.jsonc` and `docs/cloudflare-deployment.md` before changing Cloudflare Workers deployment behavior.
- MUST preserve static/prerendered deployment expectations unless a product requirement justifies server runtime behavior.
- SHOULD update [Project Structure](../project-structure/SKILL.md) when durable directories, generated-file ownership, or deployment conventions change.
