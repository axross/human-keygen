# Character Categories

Category filters should be derived from layout data instead of maintained as unrelated lists.

## Category Derivation

Categories are filters over the final same-position layout pool. They should not create new characters or bypass physical-key compatibility.

**Guidelines:**

- MUST derive letters, uppercase letters, digits, and symbols from the final same-position layout pool.
- MUST apply category filters after same-position compatibility has been computed.
- MUST keep category predicates ASCII-focused for the first version unless non-ASCII support is approved.
- MUST keep category counts deterministic for UI and test assertions.
- SHOULD expose category counts to the UI so unavailable options can be disabled or explained.

## Separators and Formatting

Separators are generated characters and must follow the same compatibility rule.

**Guidelines:**

- MUST verify separators are part of the final character pool before using them.
- MUST NOT introduce grouping characters from outside the selected layout pool.
- SHOULD prefer uppercase word-boundary cues when uppercase characters are available and separators are not.
