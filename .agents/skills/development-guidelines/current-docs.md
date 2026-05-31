# Current Documentation Checks

Some project dependencies move quickly. Use current official docs when changing framework, tooling, browser API, or deployment behavior that may have shifted.

| Surface | Official source |
| ------- | --------------- |
| TanStack Start app setup, routing, CSS, server behavior, prerendering | `tanstack.com/start/latest` |
| TanStack Router file-route behavior and generated route tree behavior | `tanstack.com/router/latest` |
| Tailwind CSS v4 and Vite integration | `tailwindcss.com/docs` |
| Playwright runner, web server, locators, assertions, traces | `playwright.dev` |
| Biome commands, config shape, and rule behavior | `biomejs.dev` |
| Web Crypto randomness and Clipboard API behavior | MDN or Web Platform docs |
| Cloudflare Workers Static Assets and Wrangler config | `developers.cloudflare.com` |

**Guidelines:**

- MUST check current official docs before adding or changing TanStack Start, TanStack Router, Tailwind, Playwright, Biome, Web Crypto, Clipboard, Wrangler, or Cloudflare Workers integration.
- MUST prefer official docs and source examples over blog posts for framework or platform behavior.
- MUST note any RC-specific TanStack Start behavior in requirements, comments, or final reporting when it affects implementation risk.
- SHOULD pin or lock dependency versions after framework/tooling changes because TanStack Start is currently RC.
- SHOULD avoid live documentation checks for pure skill wording or docs-only edits that do not change framework behavior.
