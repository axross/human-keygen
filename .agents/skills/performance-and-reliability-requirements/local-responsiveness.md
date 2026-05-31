# Local Responsiveness

Password generation should feel instant because it is local and small. The UI should not stall or shift during repeated generation.

## Runtime Cost

Generation and pool derivation should stay bounded for supported lengths and layout counts.

**Guidelines:**

- MUST keep generation fast for supported password lengths from 8 to 128 characters.
- MUST avoid server round trips for layout selection, entropy calculation, generation, and copy feedback.
- MUST prevent repeated generation clicks from causing UI stalls, racey state, or layout shifts.
- MUST use a bounded feasibility check or backtracking strategy for complete-word output so dead ends recover quickly.
- SHOULD keep expensive derived values memoized only when profiling or complexity justifies it.

## UI State Reliability

Hydration and repeated actions should not produce confusing intermediate states.

**Guidelines:**

- MUST keep generate/copy controls disabled until required browser-only capabilities and state are ready.
- MUST preserve the generated password while transient copy feedback clears.
- SHOULD avoid state updates that recompute unrelated expensive values on every keystroke.
