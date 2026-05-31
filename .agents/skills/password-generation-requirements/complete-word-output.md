# Complete-Word Output

Memorability depends on complete word chunks when the restricted pool can support them. Length handling must choose words that exactly fit instead of cutting off a final word or padding with random leftover characters.

## Whole-Word Construction

The base phrase should use complete candidate words whose lengths sum to the requested length.

**Guidelines:**

- MUST compose the base phrase from complete word candidates whose lengths sum exactly to the requested password length when a valid complete-word sequence exists.
- MUST NOT truncate words, append single-character filler, or otherwise create incomplete word chunks to satisfy length.
- MUST keep every selectable first-party layout on complete-word generation for every supported length; add reviewed word-list supplements instead of allowing normal app flows to degrade to random characters.
- MUST use a bounded feasibility check or backtracking strategy when selecting words so generation can recover from dead-end word choices.
- SHOULD preserve visible word-boundary cues, such as uppercase boundaries, when complete-word output has multiple words and uppercase letters are allowed.

## Fallback Generation

Fallback should remain secure and layout-compatible when no complete-word sequence is possible.

**Guidelines:**

- MUST fall back to unbiased random character selection from the same final pool when no complete-word sequence can fit the requested length and same-position pool.
- MUST NOT force digit or symbol substitutions when they make restricted-layout output look random instead of word-like.
- MUST keep fallback output within the same length and category constraints as whole-word output.
- SHOULD make fallback behavior testable through deterministic random sources.

## Word Candidates

Word candidates are product data. They need review because the restricted pools can produce odd fragments.

**Guidelines:**

- MUST reject abbreviation-like, sound-only, or non-word supplemental chunks even when they appear in `wordlist-js`; examples include `vac`, `cam`, and `bah`.
- SHOULD source initial English candidates from the reviewed `wordlist-js` common-English lists and filter them through the final character pool before selection.
- SHOULD use lower-frequency `wordlist-js` supplements when strict same-position pools need extra short English words to remain memorable.
- SHOULD keep word-list imports narrow enough to avoid pulling unnecessary dialect or frequency data into the client bundle.
