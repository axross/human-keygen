---
name: keyboard-layout-requirements
description: Use this skill when adding, editing, testing, or reviewing keyboard layout data and layout-derived character sets. Covers QWERTY reference ownership, physical key positions, direct and shifted outputs, AltGr ambiguity, metadata, source notes, deterministic ordering, category derivation, fixtures, and tests that prove generated passwords stay typeable.
---

# Keyboard Layout Requirements

Apply this skill when changing keyboard layout definitions, layout metadata, or character-category derivation.

## Layout Definition Shape

Layout data should be boring, explicit, and reviewable. A future contributor should be able to see why a character is available at a physical key position.

**Guidelines:**

- MUST define one QWERTY reference layout.
- MUST give each layout a stable kebab-case `id`, display label, family or locale note, physical keymap, and source note.
- MUST represent direct and shifted physical key outputs as literal strings or arrays that can be compared position by position against QWERTY.
- MUST NOT model a layout only as a printable character set; this loses physical position and reintroduces false compatibility.
- MUST keep layout character order deterministic.
- MUST NOT include dead-key composed output unless the requirement document explicitly allows it.
- SHOULD separate direct, shifted, and AltGr-layer characters when those layers are supported.

## Character Categories

Category filters should be derived from layout data instead of maintained as unrelated lists.

**Guidelines:**

- MUST derive letters, uppercase letters, digits, and symbols from the final same-position layout pool.
- MUST keep category predicates ASCII-focused for the first version unless non-ASCII support is approved.
- MUST verify separators are part of the final character pool before using them.
- SHOULD expose category counts to the UI so unavailable options can be disabled or explained.

## Adding Layouts

New layouts are product behavior. Add them one at a time unless there is a reviewed source for a batch.

**Guidelines:**

- MUST add tests for every new layout proving its same-position pool against QWERTY.
- MUST include a source note or rationale for the character set.
- MUST update user-facing layout labels when new layouts are added.
- MUST NOT silently change an existing layout's character set without updating tests and release notes or change summary.
- SHOULD prefer a small accurate starter set over a broad unverified layout catalog.
