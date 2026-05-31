---
name: password-generation-requirements
description: Use this skill when implementing, testing, reviewing, or changing password generation behavior. Covers QWERTY-selected-layout same-position character pools, Web Crypto randomness, unbiased index selection, entropy estimates, category toggles, output grouping, deterministic test seams, and prohibitions on storing, logging, or transmitting generated passwords.
---

# Password Generation Requirements

Apply this skill whenever a change can affect generated password contents, entropy, randomness, or display rules.

## Character Pool Contract

The character pool is the product's core promise: generated passwords use only characters that occupy the same physical key position and layer in QWERTY and the selected layout.

**Guidelines:**

- MUST compute the pool from physical key positions where QWERTY and the selected layout emit the same direct or shifted character on the same key.
- MUST NOT treat matching printable sets as sufficient; `E` in QWERTY and `E` elsewhere in the selected layout are not compatible unless the physical key position also matches.
- MUST apply user-selected categories only after computing the same-position layout pool.
- MUST fail closed when options produce an empty pool.
- MUST expose the final pool to tests and UI explanation.
- MUST NOT generate characters outside the final pool for separators, prefixes, suffixes, or formatting.
- SHOULD keep pool ordering deterministic for reproducible tests and stable UI.

## Randomness

Password generation is security-sensitive even when it runs only in the browser.

**Guidelines:**

- MUST use `crypto.getRandomValues` for production randomness.
- MUST NOT use `Math.random`, timestamps, counters, or deterministic seeds for production password generation.
- MUST use unbiased mapping from random bytes or integers to character indexes.
- MUST inject randomness in tests through an explicit test seam rather than weakening the production path.
- SHOULD keep random-index selection in a small pure module with unit tests.

## Complete-Word Output

Memorability depends on complete word chunks when the restricted pool can support them. Length handling must choose words that exactly fit instead of cutting off a final word or padding with random leftover characters.

**Guidelines:**

- MUST compose the base phrase from complete word candidates whose lengths sum exactly to the requested password length when a valid complete-word sequence exists.
- MUST NOT truncate words, append single-character filler, or otherwise create incomplete word chunks to satisfy length.
- MUST keep every selectable first-party layout on complete-word generation for every supported length; add reviewed word-list supplements instead of allowing normal app flows to degrade to random characters.
- MUST fall back to unbiased random character selection from the same final pool when no complete-word sequence can fit the requested length and same-position pool.
- MUST preserve visible word-boundary cues, such as uppercase boundaries, when complete-word output has multiple words and uppercase letters are allowed.
- MUST NOT force digit or symbol substitutions when they make restricted-layout output look random instead of word-like.
- MUST use a bounded feasibility check or backtracking strategy when selecting words so generation can recover from dead-end word choices.
- MUST reject abbreviation-like, sound-only, or non-word supplemental chunks even when they appear in `wordlist-js`; examples include `vac`, `cam`, and `bah`.
- SHOULD source initial English candidates from the reviewed `wordlist-js` common-English lists and filter them through the final character pool before selection.
- SHOULD use lower-frequency `wordlist-js` supplements when strict same-position pools need extra short English words to remain memorable.
- SHOULD keep word-list imports narrow enough to avoid pulling unnecessary dialect or frequency data into the client bundle.

## Entropy and Options

Entropy estimates help users understand trade-offs, but they should not overpromise safety.

**Guidelines:**

- MUST calculate estimated entropy from the actual whole-word generation space when word-list generation is used.
- MUST use character-space entropy only for the random-character fallback path.
- MUST NOT display `length * log2(poolSize)` as the primary estimate for word-list generated passwords when complete-word generation is available.
- MUST label entropy as an estimate.
- MUST update entropy whenever layout, category toggles, or length changes.
- MAY omit extra case and substitution entropy from the displayed estimate when doing so keeps the estimate conservative.
- SHOULD enforce sensible minimum and maximum length guardrails.
- SHOULD disable category toggles that have no available characters in the selected layout pool.
- SHOULD prefer grouped random strings for the first version unless a reviewed word-list design is approved.

## Privacy Boundary

Generated passwords are secrets. Treat them as user-sensitive data even if the app never stores accounts.

**Guidelines:**

- MUST NOT send generated values to server functions, analytics, logs, errors, URLs, storage APIs, or external services.
- MUST write to the clipboard only after an explicit user gesture.
- MUST clear transient copy feedback without clearing the generated value unexpectedly.
- SHOULD avoid passing generated values through unnecessary component layers.
- SHOULD keep generated values out of thrown errors and assertion messages.
