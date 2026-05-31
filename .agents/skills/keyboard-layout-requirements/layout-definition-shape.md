# Layout Definition Shape

Layout data should be boring, explicit, and reviewable. A future contributor should be able to see why a character is available at a physical key position.

## Required Layout Fields

Every layout should carry enough metadata for UI display, tests, and future review.

**Guidelines:**

- MUST define one QWERTY reference layout.
- MUST give each layout a stable kebab-case `id`, display label, family or locale note, physical keymap, and source note.
- MUST keep layout ids stable once shipped unless a migration and UI copy update are part of the change.
- MUST keep layout labels user-facing and clear for non-QWERTY users.
- SHOULD document source ambiguity in the layout source note instead of hiding it in code comments.

## Physical Key Outputs

The app's compatibility rule depends on physical key positions, not only printable character sets.

**Guidelines:**

- MUST represent direct and shifted physical key outputs as literal strings or arrays that can be compared position by position against QWERTY.
- MUST NOT model a layout only as a printable character set; this loses physical position and reintroduces false compatibility.
- MUST keep layout character order deterministic.
- MUST NOT include dead-key composed output unless the requirement document explicitly allows it.
- MUST NOT include AltGr-layer characters in the initial algorithm unless the requirement document explicitly allows it.
- SHOULD separate direct, shifted, and future AltGr-layer characters when those layers are supported.
