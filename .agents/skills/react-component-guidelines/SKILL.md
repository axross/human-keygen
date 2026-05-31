---
name: react-component-guidelines
description: Use this skill when writing, reviewing, or refactoring React components in the TanStack Start app. Covers route components, feature components, TypeScript prop shapes, local state boundaries, pure logic extraction, Tailwind class usage, accessible control wiring, generated password handling, and stable test locators.
---

# React Component Guidelines

Apply this skill when creating or changing React components.

## Component Boundaries

Route files should stay thin. Generator behavior should live in feature components and pure library modules.

**Guidelines:**

- MUST keep `src/routes/index.tsx` focused on routing and page composition.
- MUST place reusable generator UI under `src/features/password-generator`.
- MUST move password generation and layout math into pure modules under `src/lib`.
- MUST use explicit TypeScript types for component props.
- MUST keep generated password values in the smallest component state boundary that needs them.
- SHOULD split components by user-facing responsibility, such as layout selector, options, output, and pool summary.

## Tailwind Usage

Tailwind classes should describe the UI directly while staying readable.

**Guidelines:**

- MUST use Tailwind utilities for styling unless a global style or CSS custom property is clearer.
- MUST keep global CSS limited to Tailwind import, base tokens, and app-wide primitives.
- MUST avoid hard-coded layout behavior that causes text overlap at narrow widths.
- SHOULD group repeated class combinations behind small components only when duplication becomes meaningful.
- SHOULD keep class strings readable and avoid abstraction that hides simple styling.

## Accessible Interaction

Components should be testable through the same semantics users experience.

**Guidelines:**

- MUST connect labels and descriptions to form controls.
- MUST use buttons for actions, checkboxes or toggles for binary options, selects or radios for layout choice, and range or number inputs for length.
- MUST expose generated output through an accessible output or status region.
- MUST announce copy success and failure without exposing the password to external services.
- SHOULD prefer role and label based tests for user flows.
- MAY add `data-testid` for generated values, entropy, and pool summaries where role-based locators are ambiguous.
