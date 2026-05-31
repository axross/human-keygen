---
name: password-generation-requirements
description: Use this skill when implementing, testing, reviewing, or changing password generation behavior. Covers QWERTY-selected-layout same-position character pools, Web Crypto randomness, unbiased index selection, entropy estimates, complete-word output, category toggles, output grouping, deterministic test seams, and prohibitions on storing, logging, or transmitting generated passwords.
---

# Password Generation Requirements

Apply this skill whenever a change can affect generated password contents, entropy, randomness, word selection, grouping, or display rules.

## Character Pool Contract

See [character-pool-contract.md](./character-pool-contract.md) for the same-physical-key rule that defines which characters can appear in generated passwords.

**Guidelines:**

- SHOULD read the linked reference when work touches pool derivation, category filtering, separators, layout compatibility, or UI pool explanations.

## Randomness

See [randomness.md](./randomness.md) for Web Crypto, unbiased index selection, random-source boundaries, and deterministic test seams.

**Guidelines:**

- SHOULD read the linked reference when work touches random bytes, index mapping, test randomness, or fallback behavior.

## Complete-Word Output

See [complete-word-output.md](./complete-word-output.md) for memorable whole-word generation, exact length fitting, fallback behavior, and word-candidate constraints.

**Guidelines:**

- SHOULD read the linked reference when work touches word candidates, phrase construction, capitalization, grouping, or fallback generation.

## Entropy and Options

See [entropy-and-options.md](./entropy-and-options.md) for entropy estimates, length guardrails, category toggles, and disabled option behavior.

**Guidelines:**

- SHOULD read the linked reference when work touches entropy, length, categories, option validation, or UI estimates.

## Privacy Boundary

See [privacy-boundary.md](./privacy-boundary.md) for generated-password secrecy rules that apply specifically to generation behavior.

**Guidelines:**

- SHOULD read the linked reference when work touches generated values, copy behavior, storage, logs, errors, URLs, or component data flow.
