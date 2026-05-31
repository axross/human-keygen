# Complexity and Readability

Password-generation rules can be subtle. Readability matters because future reviews must be able to prove the generator still follows the product contract.

## Complexity Signals

Biome's complexity warnings are review signals even when a function technically passes.

**Guidelines:**

- MUST review functions near or above Biome's cognitive-complexity and line-count thresholds.
- MUST keep complete-word feasibility and random-index logic small enough to test directly.
- MUST extract repeated logic when it represents the same product rule.
- MUST NOT hide algorithmic complexity behind generic utility names.
- SHOULD prefer clear loops and named intermediate values over clever chained expressions for generation logic.

## Constants and Dead Code

Named constants make product limits and algorithm choices visible.

**Guidelines:**

- MUST name product limits such as default/min/max password length.
- MUST justify magic numbers that remain inline, especially in entropy, random-byte, and UI sizing logic.
- MUST remove unused imports, unreachable branches, stale comments, and disabled code.
- SHOULD keep constants near the rule they explain unless they are reused across modules.

## Testability

Maintainable product logic should be easy to exercise without browser UI.

**Guidelines:**

- MUST keep deterministic test seams for randomness and word selection.
- MUST test pure functions directly before relying on e2e coverage.
- SHOULD keep UI state transitions simple enough that e2e tests can prove the user flow without brittle internals.
