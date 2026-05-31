# Dev Commands

`package.json` owns the project command contract. Prefer these scripts over ad hoc tool invocations unless a focused command is needed to isolate a failure.

| Command | Use |
| ------- | --- |
| `npm run dev` | Start the local Vite/TanStack Start dev server on port 3000 |
| `npm run build` | Build static/prerendered output and run `tsc --noEmit` |
| `npm run preview` | Preview the built app locally |
| `npm run cf-typegen` | Generate Wrangler types with Wrangler metrics/log writes disabled |
| `npm run update-word-candidates` | Refresh reviewed word candidates from the local script |
| `npm run format` | Format the repository with Biome |
| `npm run lint` | Run Biome checks |
| `npm run test` | Run Vitest unit tests |
| `npm run test:e2e` | Run Playwright browser tests |

**Guidelines:**

- MUST prefer npm scripts when they exist for the needed check.
- MUST report command failures with the failing command and the relevant reason.
- MUST keep `npm run build` as the TypeScript signature gate because it includes `tsc --noEmit`.
- MUST run `npm run test:e2e` through the script rather than calling Playwright directly unless isolating a specific failure.
- SHOULD consult `docs/cloudflare-deployment.md` before running or changing Cloudflare deployment checks.
- MAY use focused Vitest or Playwright invocations during debugging, but final verification should use the project script when practical.
