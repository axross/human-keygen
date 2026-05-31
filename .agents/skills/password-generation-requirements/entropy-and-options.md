# Entropy and Options

Entropy estimates help users understand trade-offs, but they should not overpromise safety. Options should reflect what the selected layout can actually produce.

## Entropy Estimates

The estimate should match the actual generation path.

**Guidelines:**

- MUST calculate estimated entropy from the actual whole-word generation space when word-list generation is used.
- MUST use character-space entropy only for the random-character fallback path.
- MUST NOT display `length * log2(poolSize)` as the primary estimate for word-list generated passwords when complete-word generation is available.
- MUST label entropy as an estimate.
- MUST update entropy whenever layout, category toggles, or length changes.
- MAY omit extra case and substitution entropy from the displayed estimate when doing so keeps the estimate conservative.

## Length and Category Options

Options should prevent impossible states before generation.

**Guidelines:**

- MUST enforce sensible minimum and maximum length guardrails.
- MUST validate length before generating.
- MUST derive category availability from the final same-position pool.
- MUST disable or explain category toggles that have no available characters in the selected layout pool.
- MUST prevent generation when selected options produce an empty pool.
- SHOULD keep default options useful for every shipped layout.
