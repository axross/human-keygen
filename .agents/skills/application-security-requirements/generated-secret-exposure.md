# Generated Secret Exposure

Generated passwords are sensitive even though the app has no accounts. Treat them as user secrets from the moment they are produced.

## Prohibited Sinks

Generated values must stay in the page and clipboard path the user explicitly chooses.

**Guidelines:**

- MUST NOT send generated passwords to servers, server functions, analytics, error reporting, logging, URLs, cookies, local storage, session storage, or build output.
- MUST NOT include generated passwords in thrown errors, console output, test snapshots, committed screenshots, Playwright traces intended for review, or assertion messages.
- MUST NOT include generated passwords in route metadata, Open Graph data, document titles, or public assets.
- MUST NOT add password history, persistence, or autosave without explicit product approval and a new security review.
- SHOULD avoid passing generated values through unnecessary component layers.

## Review Expectations

Password exposure risk should be reviewed before merge, not treated as ordinary UI data flow.

**Guidelines:**

- MUST treat any new sink for generated values as high-risk during review.
- MUST inspect telemetry, logging, test artifacts, and error paths when generated values are touched.
- SHOULD prefer derived non-secret values, such as length or category availability, when components do not need the password itself.
