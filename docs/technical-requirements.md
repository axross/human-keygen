# Human Keygen Technical Requirements

Status: Draft for review
Date: 2026-05-30

## Context

Human Keygen is a web application for generating human-friendly passwords for people who use non-QWERTY keyboard layouts. A generated password must only contain characters that are common to the reference QWERTY layout and the user's selected layout, so the result stays practical to type while preserving clear generation rules.

This draft uses current official framework guidance:

- TanStack Start is currently documented as RC, full-stack, Vite-powered, file-route based, and deployable anywhere JavaScript runs.
- TanStack Start routing is built on TanStack Router and uses `src/routes`, `src/router.tsx`, `src/routes/__root.tsx`, and generated `src/routeTree.gen.ts`.
- Tailwind CSS v4 is the current Tailwind line and the recommended TanStack Start integration uses `tailwindcss` plus `@tailwindcss/vite`, with the stylesheet imported into the root route head via `?url`.

References:

- [TanStack Start](https://tanstack.com/start/latest)
- [TanStack Start: Getting Started](https://tanstack.com/start/latest/docs/framework/react/getting-started)
- [TanStack Start: Build from Scratch](https://tanstack.com/start/latest/docs/framework/react/build-from-scratch)
- [TanStack Start: Routing](https://tanstack.com/start/latest/docs/framework/react/guide/routing)
- [TanStack Start: CSS Styling](https://tanstack.com/start/latest/docs/framework/react/guide/css-styling)
- [TanStack Start: Tailwind Integration](https://tanstack.com/start/latest/docs/framework/react/guide/tailwind-integration)
- [Tailwind CSS: TanStack Start](https://tailwindcss.com/docs/installation/framework-guides/tanstack-start)
- [Keybr Layouts](https://www.keybr.com/layouts)

## Goals

- Provide a one-screen password generator that is usable immediately, without a marketing landing page.
- Let users choose a keyboard layout and generate passwords from the same-position character pool shared by QWERTY and that layout.
- Start with popular non-QWERTY English layouts listed by Keybr, excluding QWERTY / United States.
- Make generation rules visible enough that users understand why certain characters are included or excluded.
- Generate passwords locally in the browser with Web Crypto randomness.
- Avoid transmitting, logging, storing, or analytics-capturing generated passwords.
- Keep the implementation small, testable, accessible, and easy to extend with more layouts.

## Non-Goals

- No user accounts, server persistence, or password history.
- No hosted password vault behavior.
- No large dictionary/passphrase corpus beyond the reviewed common-English candidate list until language, licensing, and layout-filtering requirements are expanded.
- No analytics event containing generated passwords, character pools, copied values, or user-entered secrets.
- No AltGr, dead-key, or composed characters in the initial algorithm unless explicitly approved.

## Users and Primary Flow

The primary user has a non-QWERTY layout and wants a password that is both strong and not painful to type.

1. Open the app.
2. Select a keyboard layout.
3. Adjust length and character-category options.
4. Review the included character pool and estimated entropy.
5. Generate a password.
6. Copy it to the clipboard by explicit action.

## Functional Requirements

### Keyboard Layouts

- The app MUST define QWERTY as the reference layout.
- Each non-QWERTY layout MUST provide canonical direct and shifted physical-key output data available without composed output.
- The password character pool MUST include only characters whose QWERTY output and selected-layout output are identical on the same physical key and same layer.
- The initial version MUST include at least Colemak, Dvorak, and Workman.
- The initial version SHOULD include the popular non-QWERTY English layouts visible on the Keybr layouts page when their physical key outputs can be modeled safely.
- The initial version MUST include lowercase letters, uppercase letters, digits, and shifted symbols when they match in both QWERTY and the selected layout at the same physical key position.
- Layout data MUST expose enough metadata for UI display, tests, and future review: stable `id`, label, locale or family, physical keymap, source notes, and category breakdown.
- The app MUST prevent generation when the selected options produce an empty pool.
- The app SHOULD ship with a small reviewed starter set of layouts, then add more layouts behind tests.

### Password Generation

- Generation MUST use `crypto.getRandomValues`; it MUST NOT use `Math.random`.
- Random selection MUST use rejection sampling or another unbiased method when mapping random bytes to pool indexes.
- Generated passwords MUST contain only characters from the computed pool.
- Length MUST default to 16 characters.
- Length MUST be configurable from 8 to 128 characters.
- Digits, letters, uppercase letters, and symbols SHOULD be toggleable only when the selected layout pool supports them.
- The UI MUST show an entropy estimate and label it as an estimate, not a guarantee of real-world crack resistance.
- The entropy estimate MAY omit additional case and substitution entropy if the displayed value is treated as conservative.
- The first implementation SHOULD generate memorable passphrase-like grouped strings from short word fragments.
- Current selectable layouts MUST have enough typeable complete-word candidates to compose every supported length from 8 to 128 characters.
- When enough typeable word candidates exist, the base passphrase MUST be composed from complete words whose lengths add up exactly to the configured password length.
- When no complete-word sequence can fit the restricted character pool, generation MUST fall back to unbiased random character selection from the same final pool.
- The generator MUST NOT truncate a word or append filler characters to satisfy length.
- Complete-word output MUST preserve visible word-boundary cues when uppercase letters are available.
- The initial English word candidates SHOULD come from the MIT-licensed `wordlist-js` SCOWL-based common-English lists, filtered to lowercase ASCII words that can be typed from the computed pool; lower-frequency `wordlist-js` supplements MAY be included when a strict same-position pool cannot form memorable phrases from the primary list alone.
- Future generator variants MAY use gamer-username-like substitutions such as `4` for `A`, `5` for `S`, `!` for `I`, or `8` for `eight` / `ate` when those replacement characters are allowed by the computed pool and the result remains visibly word-like.
- Tests MUST be able to inject deterministic randomness without weakening production randomness.

### User Interface

- The first viewport MUST be the generator itself.
- The layout selector, generation controls, generated password, copy action, entropy estimate, and character-pool explanation MUST be visible or reachable without navigation.
- The generated password display MUST use a monospace style and preserve clear character spacing.
- Copy feedback MUST be visible and announced to assistive technology without exposing the password outside the page.
- The UI MUST work at mobile, tablet, and desktop widths.
- Interactive controls MUST have accessible names, visible focus states, and pointer targets suitable for touch.

### Privacy and Security

- Password generation MUST happen client-side.
- Generated values MUST NOT be written to the URL, local storage, session storage, cookies, logs, telemetry, server functions, or build output.
- The clipboard MUST only be written after an explicit user gesture.
- The app SHOULD avoid third-party runtime scripts.
- Dependency additions MUST be justified by real product value and reviewed for supply-chain risk.

## Technical Stack

| Area | Requirement |
| ---- | ----------- |
| Framework | TanStack Start with React |
| Routing | TanStack Router file-based routes under `src/routes` |
| Styling | Tailwind CSS v4 through `@tailwindcss/vite` |
| Language | TypeScript |
| Randomness | Browser Web Crypto API |
| Unit tests | Vitest or the test runner selected during scaffolding |
| E2E tests | Playwright |
| Format/lint | Biome, unless the TanStack scaffold strongly favors another local default |
| Package manager | npm unless the scaffold requires another manager |
| Deployment target | Cloudflare Workers Static Assets through Workers Builds Git integration |
| English word candidates | `wordlist-js`, filtered locally before generation |

Because TanStack Start is currently RC, dependency versions SHOULD be pinned or lockfile-controlled once the app is scaffolded.

## Proposed Source Layout

```text
<root>
|-- docs/
|   `-- technical-requirements.md
|-- src/
|   |-- features/
|   |   `-- password-generator/
|   |       |-- components/
|   |       |-- password-generator.tsx
|   |       `-- password-generator.test.ts
|   |-- lib/
|   |   |-- keyboard-layouts/
|   |   |   |-- layouts.ts
|   |   |   `-- layouts.test.ts
|   |   `-- password/
|   |       |-- entropy.ts
|   |       |-- generate-password.ts
|   |       `-- generate-password.test.ts
|   |-- routes/
|   |   |-- __root.tsx
|   |   `-- index.tsx
|   |-- router.tsx
|   |-- routeTree.gen.ts
|   `-- styles/
|       `-- app.css
|-- e2e/
|   `-- password-generator.test.ts
|-- package.json
|-- tsconfig.json
|-- vite.config.ts
`-- playwright.config.ts
```

`src/routeTree.gen.ts` is generated by TanStack Start and SHOULD NOT be hand-authored except as required by the framework.

## Acceptance Criteria for Initial App Build

- The project can install dependencies, run the development server, build, lint, format, and run tests through documented npm scripts.
- The home route renders the generator as the primary screen.
- Selecting each shipped layout changes the available character pool and entropy estimate.
- For alternative English layouts with the same printable character set, the UI explains that the pool remains equivalent while physical key positions differ.
- Generated passwords never contain characters outside the computed same-position pool.
- Generated passwords are built from complete word candidates; no word is cut short to hit the requested length.
- Empty or incompatible option combinations produce a clear disabled/error state rather than a broken password.
- Copy action works through the Clipboard API and shows success/failure feedback.
- Unit tests cover same-position layout pools, entropy calculation, and random index selection.
- E2E tests cover layout selection, generation, option changes, and copy feedback.
- Browser verification confirms responsive layout and focus behavior on mobile and desktop viewports.

## Implementation Plan

1. Scaffold TanStack Start with TypeScript, Tailwind v4, and Cloudflare Workers-compatible static/prerendered output.
2. Add project commands, Biome, Vitest, and Playwright if they are not included by the scaffold.
3. Implement pure keyboard-layout and password-generation modules with unit tests.
4. Build the generator UI with accessible controls and Tailwind styling.
5. Add e2e coverage for the primary workflow.
6. Run format, lint, unit tests, e2e tests, build, and browser checks.
7. Perform self-review against the project skills before calling implementation complete.
