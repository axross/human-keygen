# Browser API Use

The app depends on browser APIs for randomness and clipboard operations. These APIs must preserve security and provide recoverable failures.

## Web Crypto

Production randomness is security-sensitive even when generation runs only in the browser.

**Guidelines:**

- MUST use Web Crypto for production randomness.
- MUST use `crypto.getRandomValues` through the project's explicit random-source boundary.
- MUST NOT use `Math.random`, timestamps, counters, deterministic seeds, or UUIDs for production password generation.
- MUST NOT fall back to weaker randomness when Web Crypto is unavailable.
- SHOULD show a recoverable error if Web Crypto is unavailable.

## Clipboard

Clipboard writes are user-visible actions and should not leak values through auxiliary channels.

**Guidelines:**

- MUST write to the clipboard only after an explicit user gesture.
- MUST handle Clipboard API success and failure without leaking password values.
- MUST show copy success and failure feedback through the UI.
- MUST NOT request unrelated permissions for password generation or copying.
- SHOULD keep clipboard failure messages generic and actionable.
