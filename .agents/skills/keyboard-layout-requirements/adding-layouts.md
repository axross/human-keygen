# Adding Layouts

New layouts are product behavior. Add them one at a time unless there is a reviewed source for a batch.

## Source Review

Physical-key data should come from a source that lets reviewers verify direct and shifted outputs.

**Guidelines:**

- MUST include a source note or rationale for the character set.
- MUST verify direct and shifted outputs against a reviewed source before shipping a new layout.
- MUST document ambiguity around platform variants, locale variants, AltGr, or dead keys.
- SHOULD prefer a small accurate starter set over a broad unverified layout catalog.

## Tests and UI Labels

Each layout needs tests because changing layout data changes generated password behavior.

**Guidelines:**

- MUST add tests for every new layout proving its same-position pool against QWERTY.
- MUST update user-facing layout labels when new layouts are added.
- MUST update category-count or pool-summary expectations when layout data changes.
- MUST NOT silently change an existing layout's character set without updating tests and the change summary.
- SHOULD include at least one test that proves generated passwords for the layout stay within its computed pool.
