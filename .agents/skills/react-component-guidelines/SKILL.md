---
name: react-component-guidelines
description: Use this skill when writing, reviewing, or refactoring React components in the TanStack Start app. Covers route and feature component boundaries, TypeScript prop shapes, local state ownership, generated-password handling, pure logic extraction, Tailwind class usage, accessible controls, feedback regions, and stable test locators.
---

# React Component Guidelines

Apply these rules when creating, reviewing, or refactoring React components. This skill owns implementation mechanics; [UI Design Principles](../ui-design-principles/SKILL.md) owns design intent.

## Component Boundaries

See [component-boundaries.md](./component-boundaries.md) for route-file thinness, feature ownership, pure logic extraction, and generated-password state boundaries.

**Guidelines:**

- SHOULD read the linked reference when moving component code, splitting components, or changing local state ownership.

## Tailwind Usage

See [tailwind-usage.md](./tailwind-usage.md) for Tailwind utility usage, global CSS scope, responsive constraints, class readability, and token handling.

**Guidelines:**

- SHOULD read the linked reference when changing styling, layout, class names, or global CSS.

## Accessible Interaction

See [accessible-interaction.md](./accessible-interaction.md) for control semantics, labels, descriptions, generated output regions, copy feedback, and test locators.

**Guidelines:**

- SHOULD read the linked reference when changing forms, buttons, output, feedback, focus, or e2e hooks.
