import { describe, expect, it } from "vitest";
import {
	getRandomBigInt,
	getRandomIndex,
	type RandomSource,
} from "./random-source";

function createSequenceSource(values: number[]): RandomSource {
	let index = 0;

	return {
		nextUint32() {
			const value = values[index];
			index += 1;
			return value ?? 0;
		},
	};
}

describe("getRandomIndex", () => {
	it("maps random integers into the requested bound", () => {
		expect(getRandomIndex(10, createSequenceSource([27]))).toBe(7);
	});

	it("rejects biased values outside the largest even range", () => {
		expect(getRandomIndex(10, createSequenceSource([4_294_967_290, 15]))).toBe(
			5,
		);
	});

	it("requires a positive integer bound", () => {
		expect(() => getRandomIndex(0, createSequenceSource([0]))).toThrow(
			"positive integer",
		);
	});
});

describe("getRandomBigInt", () => {
	it("maps random integers into a bigint bound", () => {
		expect(getRandomBigInt(10n, createSequenceSource([27]))).toBe(7n);
	});

	it("rejects biased bigint values outside the largest even range", () => {
		expect(
			getRandomBigInt(10n, createSequenceSource([4_294_967_290, 15])),
		).toBe(5n);
	});

	it("requires a positive bigint bound", () => {
		expect(() => getRandomBigInt(0n, createSequenceSource([0]))).toThrow(
			"positive",
		);
	});
});
