import { describe, expect, it } from "vitest";
import {
	buildCharacterPool,
	getAvailableCategoryCount,
	getLayoutById,
	KEYBOARD_LAYOUTS,
	QWERTY_REFERENCE_LAYOUT,
} from "./layouts";

describe("keyboard layouts", () => {
	it("ships required non-QWERTY starter layouts", () => {
		expect(getLayoutById("colemak")?.label).toBe("Colemak");
		expect(getLayoutById("dvorak")?.label).toBe("Dvorak");
		expect(getLayoutById("workman")?.label).toBe("Workman");
	});

	it("keeps QWERTY as a reference layout, not a selectable layout", () => {
		const selectableLayoutIds: readonly string[] = KEYBOARD_LAYOUTS.map(
			(layout) => layout.id,
		);

		expect(QWERTY_REFERENCE_LAYOUT.id).toBe("qwerty-us");
		expect(selectableLayoutIds.includes(QWERTY_REFERENCE_LAYOUT.id)).toBe(
			false,
		);
	});

	it("builds a deterministic QWERTY intersection with uppercase and shifted symbols", () => {
		const pool = buildCharacterPool("colemak", {
			includeUppercase: true,
			includeDigits: true,
			includeSymbols: true,
		});

		expect(pool?.characters).toContain("A");
		expect(pool?.characters).toContain("4");
		expect(pool?.characters).toContain("!");
		expect(pool?.counts.uppercase).toBe(26);
		expect(pool?.counts.symbols).toBeGreaterThan(20);
	});

	it("reports unavailable counts for unknown layouts", () => {
		expect(getAvailableCategoryCount("unknown", "symbols")).toBe(0);
	});
});
