# Character Pool Contract

The character pool is the product's core promise: generated passwords use only characters that occupy the same physical key position and layer in QWERTY and the selected layout.

## Same-Position Compatibility

Printable set overlap is not enough. A character is compatible only when both layouts emit the same character from the same physical key and the same layer.

**Guidelines:**

- MUST compute the pool from physical key positions where QWERTY and the selected layout emit the same direct or shifted character on the same key.
- MUST NOT treat matching printable sets as sufficient; `E` in QWERTY and `E` elsewhere in the selected layout are not compatible unless the physical key position also matches.
- MUST apply user-selected categories only after computing the same-position layout pool.
- MUST fail closed when options produce an empty pool.
- MUST expose the final pool to tests and UI explanation.
- SHOULD keep pool ordering deterministic for reproducible tests and stable UI.

## Formatting Characters

Formatting cannot introduce characters that the selected layout cannot type from the same-position pool.

**Guidelines:**

- MUST NOT generate characters outside the final pool for separators, prefixes, suffixes, substitutions, or grouping.
- MUST verify separators are part of the final character pool before using them.
- SHOULD prefer visible word-boundary cues that are already valid generated characters.
