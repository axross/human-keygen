---
name: performance-and-reliability-requirements
description: Use this skill when reviewing performance or reliability for the password generator. Covers local responsiveness, bundle weight, dependency restraint, avoiding server round trips, graceful Web Crypto and Clipboard failures, deterministic tests, build/deployment health, Cloudflare static asset behavior, and preventing UI stalls during repeated generation.
---

# Performance and Reliability Requirements

Apply this skill when a change affects runtime speed, bundle size, browser capability failure modes, deployment reliability, or user trust.

## Local Responsiveness

See [local-responsiveness.md](./local-responsiveness.md) for keeping generation, option changes, and repeated UI actions fast without unnecessary memoization or server round trips.

**Guidelines:**

- SHOULD read the linked reference when work touches generation loops, word selection, layout pool derivation, UI state, or repeated interaction behavior.

## Bundle Weight

See [bundle-weight.md](./bundle-weight.md) for dependency restraint, direct imports, word-list size, and client bundle risk.

**Guidelines:**

- SHOULD read the linked reference when adding dependencies, importing word-list data, or moving code across client/server boundaries.

## Failure Modes

See [failure-modes.md](./failure-modes.md) for Web Crypto, Clipboard, empty-pool, hydration, and error-message reliability expectations.

**Guidelines:**

- SHOULD read the linked reference when work touches browser API errors, disabled states, copy feedback, or generation eligibility.

## Build and Deployment Health

See [build-and-deployment-health.md](./build-and-deployment-health.md) for TanStack Start build, Cloudflare Workers Static Assets, Wrangler, and preview reliability expectations.

**Guidelines:**

- SHOULD read the linked reference when work touches Vite, TanStack Start prerendering, `wrangler.jsonc`, build scripts, assets, or deployment docs.
