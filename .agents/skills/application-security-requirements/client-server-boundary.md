# Client and Server Boundary

Human Keygen's privacy model depends on local-only generation. Route, server, and deployment changes must preserve that boundary.

## Local-Only Generation

Server rendering can build the app shell, but generated secrets must originate and remain in browser interaction state.

**Guidelines:**

- MUST keep generation client-side unless a future requirement explicitly changes the privacy model.
- MUST avoid server functions, route loaders, or API endpoints for layout selection, entropy calculation, password generation, or copy feedback.
- MUST keep generated passwords out of route params and search params.
- MUST keep route metadata static and free of generated values or character pools.
- SHOULD review URL-backed option state with privacy scrutiny before implementation.

## Deployment and Runtime Changes

Cloudflare deployment settings can alter where code runs and what gets logged.

**Guidelines:**

- MUST review `wrangler.jsonc` changes for metrics, logging, asset directory, and build-command implications.
- MUST preserve `send_metrics: false` unless telemetry has explicit product approval.
- MUST ensure prerender/static output does not include generated passwords, word candidates beyond intended public bundle data, or user-specific state.
- SHOULD consult [Observability Guidelines](../observability-guidelines/SKILL.md) when runtime failures, logs, or telemetry behavior changes.
