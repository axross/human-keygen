# Unit and E2E Coverage

Test coverage should match the risk of the changed surface. Password and layout logic need deterministic unit tests; browser workflows need e2e evidence.

| Surface | Expected coverage |
| ------- | ----------------- |
| Password generation | Unit tests for final pool use, unbiased index mapping, length, whole-word feasibility, entropy |
| Keyboard layouts | Unit tests for layout metadata, same-position QWERTY pools, category derivation |
| React UI | E2E coverage for generated output, controls, disabled/error states, copy feedback |
| Routes and metadata | Build plus browser smoke test when user-visible |
| Cloudflare/Wrangler config | Build and documented dry-run path when practical |
| Skills/docs | Format/lint plus manual relative-link review |

**Guidelines:**

- MUST require unit tests for deterministic password and keyboard-layout behavior.
- MUST require e2e coverage for new user-facing generator workflows.
- MUST require copy-feedback coverage when Clipboard API behavior changes.
- MUST require `npm run build` after route, config, dependency, or TypeScript signature changes.
- MUST treat missing tests on password logic or layout pool logic as a blocking QA finding.
- SHOULD avoid duplicating every unit-level case in e2e tests when unit coverage is stronger.
