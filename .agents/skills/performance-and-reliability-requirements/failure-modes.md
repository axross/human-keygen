# Failure Modes

Failures should be understandable and should not weaken security. Recoverable states are better than silent fallback.

## Browser Capability Failures

Web Crypto and Clipboard failures need user-facing recovery without leaking values.

**Guidelines:**

- MUST show a recoverable error if Web Crypto is unavailable.
- MUST show copy failure feedback if Clipboard API access is denied or unavailable.
- MUST NOT fall back to weaker randomness.
- MUST keep error messages free of generated password values, clipboard payloads, and raw random data.
- SHOULD keep failure messages short and action-oriented.

## Generation Eligibility

Invalid options should prevent generation before they produce broken output.

**Guidelines:**

- MUST keep the generate action disabled when no valid character pool exists.
- MUST explain empty or incompatible option states in the UI.
- MUST fail closed when unknown layout ids or invalid lengths reach the generation boundary.
- SHOULD keep disabled and error states visually stable across viewport sizes.
