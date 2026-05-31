# Naming and Boundaries

Names should reveal whether code is product logic, layout data, browser integration, or UI composition.

## Naming

Security-sensitive code should avoid vague helper names that hide product rules.

**Guidelines:**

- MUST use names that distinguish layout definitions, physical key positions, character pools, generated password values, entropy estimates, random sources, and word candidates.
- MUST avoid abbreviations in security-sensitive code unless they are established keyboard-layout names.
- MUST name callbacks and props by domain action, such as `onGenerate`, `onCopy`, `layoutId`, or `characterPool`.
- SHOULD keep test names specific to the invariant being proven.

## Module Boundaries

Pure logic should stay free of React and browser-only effects.

**Guidelines:**

- MUST keep pure functions free of React and browser-only side effects.
- MUST keep browser APIs such as Web Crypto and Clipboard behind small explicit boundaries.
- MUST keep route files from becoming product-logic containers.
- MUST keep generated password values from flowing through modules that do not need them.
- SHOULD use [Project Structure](../project-structure/SKILL.md) as the source of truth for file placement.
