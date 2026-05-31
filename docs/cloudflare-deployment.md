# Cloudflare Deployment

Human Keygen deploys to Cloudflare Workers as Static Assets through Workers Builds Git integration. The app is static/prerendered because password generation runs entirely in the browser.

## Cloudflare Workers Build Settings

Use these settings when connecting the repository in Workers Builds:

| Setting | Value |
| ------- | ----- |
| Production branch | `main` |
| Build command | leave blank |
| Deploy command | `npx wrangler deploy` |
| Root directory | repository root |

`wrangler.jsonc` owns the build and asset configuration. Its `build.command` installs dependencies and runs `npm run build`, then Wrangler deploys `dist/client` through the `assets.directory` setting.

## Local Commands

```sh
npm run build
npm run preview
WRANGLER_WRITE_LOGS=false WRANGLER_SEND_METRICS=false npx wrangler deploy --dry-run
```

`npm run build` prerenders the root route and writes the Workers-ready static assets to `dist/client`. The dry run validates the same `npx wrangler deploy` path used by Workers Builds without uploading.

## Automatic Deployment

Workers Builds automatically runs `npx wrangler deploy` when commits are pushed to the connected repository. Production deploys come from `main`; other branches use the non-production deploy command configured in Cloudflare.

No npm deploy script is defined in this project. Deployment should stay owned by Cloudflare Workers Builds.
