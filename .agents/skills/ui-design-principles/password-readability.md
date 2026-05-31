# Password Readability

The generated password is the most important object on the page. It needs to be readable, copyable, and visually distinct from supporting explanations.

## Generated Password Display

Passwords can be long and visually ambiguous. The display should support inspection without accidental truncation.

**Guidelines:**

- MUST display generated passwords in a monospace style.
- MUST preserve enough spacing for ambiguous characters to be distinguishable.
- MUST avoid truncating the generated password without a deliberate overflow affordance.
- MUST keep generated-password text selectable unless selection would break a more important copy interaction.
- MUST ensure long generated values do not overlap controls or escape their container.
- SHOULD visually distinguish the generated password from entropy and pool summaries.

## Supporting Metrics

Entropy and pool summaries help users understand trade-offs, but they must not compete with the password.

**Guidelines:**

- MUST label entropy as an estimate.
- MUST keep character-pool details secondary to the generated password.
- MUST avoid presenting entropy as a guarantee of real-world crack resistance.
- SHOULD show unavailable character categories in a way that explains disabled controls.
- SHOULD keep pool strings readable and wrapped for small screens.
