import { describe, expect, it } from "vitest";
import {
	estimateCompleteWordEntropyBits,
	estimateEntropyBits,
} from "./entropy";

describe("estimateEntropyBits", () => {
	it("uses length multiplied by log2 pool size", () => {
		expect(estimateEntropyBits(94, 16)).toBeCloseTo(104.87, 2);
	});

	it("returns zero for empty or single-character pools", () => {
		expect(estimateEntropyBits(0, 16)).toBe(0);
		expect(estimateEntropyBits(1, 16)).toBe(0);
	});
});

describe("estimateCompleteWordEntropyBits", () => {
	it("estimates complete-word phrase combinations for the exact length", () => {
		const fullLowercasePool = "abcdefghijklmnopqrstuvwxyz";

		expect(
			estimateCompleteWordEntropyBits(16, fullLowercasePool),
		).toBeGreaterThan(30);
		expect(estimateCompleteWordEntropyBits(16, fullLowercasePool)).toBeLessThan(
			estimateEntropyBits(fullLowercasePool.length, 16),
		);
	});

	it("returns zero when no complete word sequence can fit", () => {
		expect(estimateCompleteWordEntropyBits(8, "xyz")).toBe(0);
	});
});
