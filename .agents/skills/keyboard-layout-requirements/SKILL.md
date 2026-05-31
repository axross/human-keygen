---
name: keyboard-layout-requirements
description: Use this skill when adding, editing, testing, or reviewing keyboard layout data and layout-derived character sets. Covers QWERTY reference ownership, physical key positions, direct and shifted outputs, AltGr ambiguity, metadata, source notes, deterministic ordering, category derivation, fixtures, and tests that prove generated passwords stay typeable.
---

# Keyboard Layout Requirements

Apply this skill when changing keyboard layout definitions, layout metadata, QWERTY intersections, category derivation, or tests that prove generated passwords stay typeable.

## Layout Definition Shape

See [layout-definition-shape.md](./layout-definition-shape.md) for QWERTY ownership, physical keymap structure, direct/shifted outputs, metadata, source notes, and AltGr/dead-key boundaries.

**Guidelines:**

- SHOULD read the linked reference when adding or editing layout definitions, metadata, source notes, or physical key outputs.

## Character Categories

See [character-categories.md](./character-categories.md) for deriving letters, uppercase letters, digits, symbols, and separators from the final same-position pool.

**Guidelines:**

- SHOULD read the linked reference when changing category predicates, option availability, character counts, or pool summaries.

## Adding Layouts

See [adding-layouts.md](./adding-layouts.md) for source review, tests, labels, fixtures, and change-summary expectations for new or modified layouts.

**Guidelines:**

- SHOULD read the linked reference when adding, removing, or modifying shipped keyboard layouts.
