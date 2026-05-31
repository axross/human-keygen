# Visual Tone and Feedback

The design should feel precise, calm, and trustworthy. Feedback should explain recoverable states without exposing generated secrets.

## Visual Tone

The product is a security-adjacent utility. Visual styling should support focus and inspection.

**Guidelines:**

- MUST use a restrained multi-hue palette with strong contrast.
- MUST avoid one-note palettes dominated by a single hue family.
- MUST avoid decorative elements that distract from password inspection.
- MUST avoid visual language that implies cloud storage, accounts, or enterprise vault behavior.
- SHOULD use compact panels and clear grouping rather than oversized editorial sections.
- SHOULD keep animation subtle and respect reduced-motion preferences.

## Feedback and Copy

Feedback should be immediate and specific enough for the user to recover.

**Guidelines:**

- MUST show copy success and failure states near the copy action or generated output.
- MUST keep generated password values out of error, copied, and logging text.
- MUST provide clear disabled or empty states when no valid character pool exists.
- MUST avoid alarmist wording for recoverable browser capability failures.
- SHOULD use short action-oriented copy for controls and feedback.
