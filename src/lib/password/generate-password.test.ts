import { describe, expect, it } from "vitest";
import {
	buildCharacterPool,
	KEYBOARD_LAYOUTS,
} from "@/lib/keyboard-layouts/layouts";
import {
	canSelectCompleteWords,
	DEFAULT_PASSWORD_LENGTH,
	generateMemorablePassword,
	MAX_PASSWORD_LENGTH,
	MIN_PASSWORD_LENGTH,
	selectCompleteWords,
} from "./generate-password";
import type { RandomSource } from "./random-source";
import { PASSWORD_WORD_CANDIDATES } from "./word-candidates";

const DISALLOWED_COLEMAK_LETTERS = /[defgijklnoprstuyDEFGIJKLNOPRSTUY]/;
const REJECTED_COLEMAK_WORDS = new Set([
	"aah",
	"aha",
	"baa",
	"bah",
	"cam",
	"caw",
	"haw",
	"hmm",
	"mac",
	"vac",
]);
const FORMATTED_WORD_BOUNDARY_PATTERN = /(?=[A-Z])/;
const WORD_BOUNDARY_PATTERN = /[a-z][A-Z]/;

function createSequenceSource(seed = 0): RandomSource {
	let value = seed;
	const increment = 2_654_435_761;
	const uint32Range = 0x1_00_00_00_00;

	return {
		nextUint32() {
			value = (value + increment) % uint32Range;
			return value;
		},
	};
}

describe("generateMemorablePassword", () => {
	it("generates the requested default length from the computed pool", () => {
		const pool = buildCharacterPool("colemak", {
			includeUppercase: true,
			includeDigits: true,
			includeSymbols: true,
		});

		expect(pool).toBeDefined();
		expect(
			canSelectCompleteWords(DEFAULT_PASSWORD_LENGTH, pool?.characters ?? ""),
		).toBe(true);

		const password = generateMemorablePassword({
			length: DEFAULT_PASSWORD_LENGTH,
			pool: pool?.characters ?? "",
			randomSource: createSequenceSource(),
		});

		expect(password).toHaveLength(DEFAULT_PASSWORD_LENGTH);
		expect(
			Array.from(password).every((character) =>
				pool?.characters.includes(character),
			),
		).toBe(true);
	});

	it("composes Colemak same-position output from complete words", () => {
		const pool = buildCharacterPool("colemak", {
			includeUppercase: true,
			includeDigits: true,
			includeSymbols: true,
		});
		const candidateValues = new Set(
			PASSWORD_WORD_CANDIDATES.map((candidate) => candidate.value),
		);

		expect(pool).toBeDefined();
		expect(
			canSelectCompleteWords(DEFAULT_PASSWORD_LENGTH, pool?.characters ?? ""),
		).toBe(true);

		const words = selectCompleteWords({
			length: DEFAULT_PASSWORD_LENGTH,
			pool: pool?.characters ?? "",
			randomSource: createSequenceSource(7),
		});

		const password = generateMemorablePassword({
			length: DEFAULT_PASSWORD_LENGTH,
			pool: pool?.characters ?? "",
			randomSource: createSequenceSource(7),
		});
		const formattedWords = splitFormattedWords(password);

		expect(password).toHaveLength(DEFAULT_PASSWORD_LENGTH);
		expect(words.join("")).toHaveLength(DEFAULT_PASSWORD_LENGTH);
		expect(formattedWords).toEqual(words);
		expect(password.toLowerCase()).toBe(words.join(""));
		expect(password).toMatch(WORD_BOUNDARY_PATTERN);
		expect(words.every((word) => candidateValues.has(word))).toBe(true);
		expect(words.every((word) => !REJECTED_COLEMAK_WORDS.has(word))).toBe(true);
		expect(
			words.every((word) =>
				Array.from(word).every((character) =>
					pool?.characters.includes(character),
				),
			),
		).toBe(true);
		expect(
			Array.from(password).every((character) =>
				pool?.characters.includes(character),
			),
		).toBe(true);
		expect(password).not.toMatch(DISALLOWED_COLEMAK_LETTERS);
	});

	it("keeps every selectable layout on complete-word generation for every supported length", () => {
		for (const layout of KEYBOARD_LAYOUTS) {
			const pool = buildCharacterPool(layout.id, {
				includeUppercase: true,
				includeDigits: true,
				includeSymbols: true,
			});

			expect(pool).toBeDefined();

			for (const length of Array.from(
				{ length: MAX_PASSWORD_LENGTH - MIN_PASSWORD_LENGTH + 1 },
				(_, index) => MIN_PASSWORD_LENGTH + index,
			)) {
				expect(canSelectCompleteWords(length, pool?.characters ?? "")).toBe(
					true,
				);
			}
		}
	});

	it("excludes rejected Colemak supplemental chunks", () => {
		const candidateValues = new Set(
			PASSWORD_WORD_CANDIDATES.map((candidate) => candidate.value),
		);

		for (const word of REJECTED_COLEMAK_WORDS) {
			expect(candidateValues.has(word)).toBe(false);
		}
	});

	it("supports the configured length boundaries", () => {
		const pool = buildCharacterPool("colemak", {
			includeUppercase: true,
			includeDigits: true,
			includeSymbols: true,
		});

		const minimum = generateMemorablePassword({
			length: MIN_PASSWORD_LENGTH,
			pool: pool?.characters ?? "",
			randomSource: createSequenceSource(),
		});
		const maximum = generateMemorablePassword({
			length: MAX_PASSWORD_LENGTH,
			pool: pool?.characters ?? "",
			randomSource: createSequenceSource(),
		});

		expect(minimum).toHaveLength(MIN_PASSWORD_LENGTH);
		expect(maximum).toHaveLength(MAX_PASSWORD_LENGTH);
	});

	it("composes every supported length from complete words", () => {
		const pool = "abcdefghijklmnopqrstuvwxyz";
		const candidateValues = new Set(
			PASSWORD_WORD_CANDIDATES.map((candidate) => candidate.value),
		);

		for (const length of Array.from(
			{ length: MAX_PASSWORD_LENGTH - MIN_PASSWORD_LENGTH + 1 },
			(_, index) => MIN_PASSWORD_LENGTH + index,
		)) {
			const words = selectCompleteWords({
				length,
				pool,
				randomSource: createSequenceSource(length),
			});

			expect(words.join("")).toHaveLength(length);
			expect(words.every((word) => candidateValues.has(word))).toBe(true);
		}
	});

	it("uses uppercase word boundaries when uppercase letters are allowed", () => {
		const pool =
			"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!$";
		const words = selectCompleteWords({
			length: DEFAULT_PASSWORD_LENGTH,
			pool,
			randomSource: createSequenceSource(),
		});
		const password = generateMemorablePassword({
			length: DEFAULT_PASSWORD_LENGTH,
			pool,
			randomSource: createSequenceSource(),
		});

		expect(password.toLowerCase()).toBe(words.join(""));
		expect(Array.from(password).some(isUppercaseAsciiLetter)).toBe(true);
	});

	it("fails closed for empty pools and out-of-range lengths", () => {
		expect(() =>
			generateMemorablePassword({
				length: 16,
				pool: "",
				randomSource: createSequenceSource(),
			}),
		).toThrow("pool");

		expect(() =>
			generateMemorablePassword({
				length: 7,
				pool: "abc",
				randomSource: createSequenceSource(),
			}),
		).toThrow("between");
	});
});

function isUppercaseAsciiLetter(character: string): boolean {
	return character >= "A" && character <= "Z";
}

function splitFormattedWords(password: string): string[] {
	return password
		.split(FORMATTED_WORD_BOUNDARY_PATTERN)
		.map((word) => word.toLowerCase());
}
