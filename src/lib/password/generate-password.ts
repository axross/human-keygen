import {
	getRandomBigInt,
	getRandomIndex,
	type RandomSource,
} from "./random-source";
import {
	countCompleteWordSequences,
	getTypeableWordCandidates,
	groupWordCandidatesByLength,
	type WordCandidate,
} from "./word-candidates";

export const MIN_PASSWORD_LENGTH = 8;
export const DEFAULT_PASSWORD_LENGTH = 16;
export const MAX_PASSWORD_LENGTH = 128;

export interface GeneratePasswordInput {
	length: number;
	pool: string;
	randomSource: RandomSource;
}

export function generateMemorablePassword({
	length,
	pool,
	randomSource,
}: GeneratePasswordInput): string {
	validatePasswordInput(length, pool);

	if (!canSelectCompleteWords(length, pool)) {
		return generateRandomPassword({ length, pool, randomSource });
	}

	const words = selectCompleteWords({
		length,
		pool,
		randomSource,
	});

	return formatCompleteWords(words, pool);
}

export function canSelectCompleteWords(length: number, pool: string): boolean {
	validatePasswordInput(length, pool);

	const candidatesByLength = groupWordCandidatesByLength(
		getTypeableWordCandidates(pool),
	);
	const sequenceCounts = countCompleteWordSequences(length, candidatesByLength);

	return (sequenceCounts[length] ?? 0n) > 0n;
}

export function selectCompleteWords({
	length,
	pool,
	randomSource,
}: GeneratePasswordInput): string[] {
	validatePasswordInput(length, pool);

	const candidatesByLength = groupWordCandidatesByLength(
		getTypeableWordCandidates(pool),
	);
	const sequenceCounts = countCompleteWordSequences(length, candidatesByLength);

	if ((sequenceCounts[length] ?? 0n) === 0n) {
		throw new Error(
			"Password length cannot be composed from complete words in this character pool.",
		);
	}

	const words: string[] = [];
	let remainingLength = length;

	while (remainingLength > 0) {
		const selected = selectNextCompleteWord(
			remainingLength,
			candidatesByLength,
			sequenceCounts,
			randomSource,
		);

		words.push(selected.value);
		remainingLength -= selected.length;
	}

	return words;
}

function generateRandomPassword({
	length,
	pool,
	randomSource,
}: GeneratePasswordInput): string {
	return Array.from({ length }, () =>
		pool.charAt(getRandomIndex(pool.length, randomSource)),
	).join("");
}

function formatCompleteWords(words: string[], pool: string): string {
	const poolSet = new Set(pool);

	return words
		.map((word, index) => {
			if (index === 0) {
				return word;
			}

			const [firstCharacter = "", ...remainingCharacters] = Array.from(word);
			const uppercaseFirstCharacter = firstCharacter.toUpperCase();

			if (!poolSet.has(uppercaseFirstCharacter)) {
				return word;
			}

			return `${uppercaseFirstCharacter}${remainingCharacters.join("")}`;
		})
		.join("");
}

function selectNextCompleteWord(
	remainingLength: number,
	candidatesByLength: Map<number, WordCandidate[]>,
	sequenceCounts: bigint[],
	randomSource: RandomSource,
): WordCandidate {
	const totalSequences = sequenceCounts[remainingLength] ?? 0n;
	let rank = getRandomBigInt(totalSequences, randomSource);

	for (const [wordLength, candidates] of candidatesByLength) {
		const suffixLength = remainingLength - wordLength;

		if (suffixLength < 0) {
			continue;
		}

		const suffixCount = sequenceCounts[suffixLength] ?? 0n;

		if (suffixCount === 0n) {
			continue;
		}

		const groupWeight = BigInt(candidates.length) * suffixCount;

		if (rank >= groupWeight) {
			rank -= groupWeight;
			continue;
		}

		const selectedIndex = Number(rank / suffixCount);
		const selected = candidates[selectedIndex];

		if (!selected) {
			throw new Error("Complete-word password generation failed.");
		}

		return selected;
	}

	throw new Error("Complete-word password generation failed.");
}

function validatePasswordInput(length: number, pool: string): void {
	if (
		!Number.isInteger(length) ||
		length < MIN_PASSWORD_LENGTH ||
		length > MAX_PASSWORD_LENGTH
	) {
		throw new Error(
			`Password length must be between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH}.`,
		);
	}

	if (pool.length === 0) {
		throw new Error("Password character pool must not be empty.");
	}
}
