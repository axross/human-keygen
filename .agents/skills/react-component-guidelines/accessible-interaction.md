# Accessible Interaction

Components should be usable and testable through the same semantics users experience.

## Controls and Labels

Form controls need accessible names and useful relationships between labels, descriptions, and error messages.

**Guidelines:**

- MUST connect labels and descriptions to form controls.
- MUST use buttons for actions, checkboxes or toggles for binary options, selects or radios for layout choice, and range or number inputs for length.
- MUST expose disabled states through native control semantics when possible.
- MUST keep focus visible for keyboard users.
- SHOULD keep labels short, explicit, and stable enough for tests.

## Output and Feedback Regions

Generated passwords and copy status are central UI state. They must be visible without leaking secrets outside the page.

**Guidelines:**

- MUST expose generated output through an accessible output, status, or labelled region.
- MUST announce copy success and failure without exposing the password to external services, logs, URLs, or screenshots.
- MUST keep error messages free of generated passwords and clipboard payloads.
- MUST clear transient copy feedback without clearing the generated value unexpectedly.
- SHOULD separate character-pool and entropy summaries from the primary generated password display.

## Test Locators

Tests should prefer semantic locators, with test ids reserved for ambiguous generated data.

**Guidelines:**

- MUST prefer role and label based tests for user flows.
- MAY add `data-testid` for generated values, entropy, and pool summaries where role-based locators are ambiguous.
- MUST keep test ids descriptive and stable when added.
- MUST NOT make e2e tests depend on Tailwind class names or incidental DOM nesting.
