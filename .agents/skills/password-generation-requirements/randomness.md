# Randomness

Password generation is security-sensitive even when it runs only in the browser. Production randomness must come from Web Crypto and map to character choices without bias.

## Production Randomness

The production path should be small, explicit, and impossible to accidentally replace with deterministic behavior.

**Guidelines:**

- MUST use `crypto.getRandomValues` for production randomness.
- MUST NOT use `Math.random`, timestamps, counters, UUIDs, or deterministic seeds for production password generation.
- MUST NOT fall back to weaker randomness when Web Crypto is unavailable.
- MUST keep random-source creation behind a small explicit browser boundary.
- SHOULD surface Web Crypto unavailability as a recoverable UI failure.

## Unbiased Index Selection

Modulo mapping from random bytes usually biases indexes. Use rejection sampling or another unbiased strategy.

**Guidelines:**

- MUST use unbiased mapping from random bytes or integers to character indexes.
- MUST test random-index selection for pool sizes that do not divide the random range evenly.
- MUST reject invalid pool sizes before random selection.
- SHOULD keep random-index selection in a small pure module with unit tests.

## Test Seams

Tests need deterministic behavior without weakening production generation.

**Guidelines:**

- MUST inject randomness in tests through an explicit test seam.
- MUST NOT expose deterministic seeds in the production UI or production random-source path.
- SHOULD test generated password membership and length separately from exact deterministic fixture strings.
