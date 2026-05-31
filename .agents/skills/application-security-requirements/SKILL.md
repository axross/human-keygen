---
name: application-security-requirements
description: Use this skill when reviewing security or privacy implications in the password generator. Covers local-only generation, Web Crypto, clipboard use, generated password exposure, storage and URL prohibitions, telemetry limits, environment variables, client/server boundaries, dependency risk, and future feature review.
---

# Application Security Requirements

Apply this skill when a change can affect generated secrets, browser APIs, dependencies, network behavior, environment variables, telemetry, or privacy.

## Generated Secret Exposure

See [generated-secret-exposure.md](./generated-secret-exposure.md) for the non-negotiable places generated passwords must never go.

**Guidelines:**

- SHOULD read the linked reference when work touches generated values, output display, screenshots, logs, tests, storage, URLs, telemetry, or server boundaries.

## Browser API Use

See [browser-api-use.md](./browser-api-use.md) for Web Crypto and Clipboard API requirements.

**Guidelines:**

- SHOULD read the linked reference when work touches randomness, copy behavior, permissions, hydration, or browser capability failures.

## Inputs and Dependencies

See [inputs-and-dependencies.md](./inputs-and-dependencies.md) for validation, dependency, environment-variable, and supply-chain expectations.

**Guidelines:**

- SHOULD read the linked reference when work touches options, layout ids, npm dependencies, environment variables, or third-party scripts.

## Client and Server Boundary

See [client-server-boundary.md](./client-server-boundary.md) for local-only generation, route metadata, server functions, Cloudflare deployment, and future feature review.

**Guidelines:**

- SHOULD read the linked reference when work touches TanStack routes, server functions, prerendering, deployment config, or shareable state.
