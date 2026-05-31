# Privacy Boundary

Generated passwords are secrets. Treat them as user-sensitive data even if the app never stores accounts.

## Secret Handling During Generation

The generation pipeline should avoid every sink that outlives the current page state except explicit clipboard writes.

**Guidelines:**

- MUST NOT send generated values to server functions, analytics, logs, errors, URLs, storage APIs, external services, or build output.
- MUST write to the clipboard only after an explicit user gesture.
- MUST clear transient copy feedback without clearing the generated value unexpectedly.
- MUST keep generated values out of thrown errors and assertion messages.
- SHOULD avoid passing generated values through unnecessary component layers.

## Tests and Debugging

Testing should prove behavior without creating secret-like artifacts.

**Guidelines:**

- MUST NOT commit screenshots, snapshots, or traces that expose production-generated passwords.
- MUST keep exact-value assertions limited to deterministic fixtures or unit tests with injected random sources.
- SHOULD assert generated-output invariants in e2e tests rather than logging generated values.
