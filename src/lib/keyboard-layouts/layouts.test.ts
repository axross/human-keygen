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
		expect(KEYBOARD_LAYOUTS.map((layout) => layout.id)).toEqual([
			"dvorak",
			"colemak",
			"workman",
		]);
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

	it("builds the Colemak pool from same-position QWERTY keys", () => {
		const pool = buildCharacterPool("colemak", {
			includeUppercase: true,
			includeDigits: true,
			includeSymbols: true,
		});

		expect(pool?.characters).toBe(
			"qwahzxcvbmQWAHZXCVBM1234567890`~!@#$%^&*()-_=+[{]}\\|'\",<.>/?",
		);
		expect(pool?.characters).not.toContain("e");
		expect(pool?.characters).not.toContain("E");
		expect(pool?.counts.lowercase).toBe(10);
		expect(pool?.counts.uppercase).toBe(10);
		expect(pool?.counts.digits).toBe(10);
		expect(pool?.counts.symbols).toBe(30);
	});

	it("builds distinct pools for Dvorak and Workman key positions", () => {
		const dvorak = buildCharacterPool("dvorak", {
			includeUppercase: true,
			includeDigits: true,
			includeSymbols: true,
		});
		const workman = buildCharacterPool("workman", {
			includeUppercase: true,
			includeDigits: true,
			includeSymbols: true,
		});

		expect(dvorak?.characters).toBe("amAM1234567890`~!@#$%^&*()\\|");
		expect(workman?.characters).toBe(
			"qasgzxQASGZX1234567890`~!@#$%^&*()-_=+[{]}\\|'\",<.>/?",
		);
		expect(dvorak?.characters).not.toBe(workman?.characters);
	});

	it("reports unavailable counts for unknown layouts", () => {
		expect(getAvailableCategoryCount("unknown", "symbols")).toBe(0);
	});
});
