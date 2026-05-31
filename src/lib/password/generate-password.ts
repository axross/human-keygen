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

const SUBSTITUTION_ROLL_RANGE = 100;
const OPTIONAL_SUBSTITUTION_PERCENT = 16;

interface Substitution {
	from: string;
	to: string;
	kind: "digit" | "symbol";
}

interface TransformContext {
	characters: string[];
	lockedIndexes: Set<number>;
	poolSet: Set<string>;
	randomSource: RandomSource;
}

export interface GeneratePasswordInput {
	length: number;
	pool: string;
	randomSource: RandomSource;
}

const SUBSTITUTIONS = [
	{ from: "a", to: "4", kind: "digit" },
	{ from: "s", to: "5", kind: "digit" },
	{ from: "e", to: "3", kind: "digit" },
	{ from: "o", to: "0", kind: "digit" },
	{ from: "t", to: "7", kind: "digit" },
	{ from: "b", to: "8", kind: "digit" },
	{ from: "i", to: "!", kind: "symbol" },
	{ from: "l", to: "!", kind: "symbol" },
	{ from: "a", to: "@", kind: "symbol" },
	{ from: "s", to: "$", kind: "symbol" },
] satisfies Substitution[];

export function generateMemorablePassword({
	length,
	pool,
	randomSource,
}: GeneratePasswordInput): string {
	validatePasswordInput(length, pool);

	if (!canSelectCompleteWords(length, pool)) {
		return generateRandomPassword({ length, pool, randomSource });
	}

	const poolSet = new Set(pool);
	const characters = selectCompleteWords({
		length,
		pool,
		randomSource,
	}).flatMap((word) => Array.from(word));
	const lockedIndexes = new Set<number>();
	const transformContext = {
		characters,
		lockedIndexes,
		poolSet,
		randomSource,
	} satisfies TransformContext;

	applyRequiredSubstitution(transformContext, "digit");
	applyRequiredSubstitution(transformContext, "symbol");
	applyRequiredUppercase(transformContext);
	applyOptionalSubstitutions(transformContext);

	return characters.join("");
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

function applyRequiredUppercase({
	characters,
	lockedIndexes,
	poolSet,
	randomSource,
}: TransformContext): void {
	const positions = characters
		.map((character, index) => ({ character, index }))
		.filter(
			({ character, index }) =>
				!lockedIndexes.has(index) &&
				poolSet.has(character.toUpperCase()) &&
				character !== character.toUpperCase(),
		);

	if (positions.length === 0) {
		return;
	}

	const selected = positions[getRandomIndex(positions.length, randomSource)];

	if (selected) {
		characters[selected.index] = selected.character.toUpperCase();
		lockedIndexes.add(selected.index);
	}
}

function applyRequiredSubstitution(
	context: TransformContext,
	kind: Substitution["kind"],
): void {
	const { characters, lockedIndexes, randomSource } = context;
	const candidates = getSubstitutionCandidates(context, kind);

	if (candidates.length === 0) {
		return;
	}

	const selected = candidates[getRandomIndex(candidates.length, randomSource)];

	if (selected) {
		characters[selected.index] = selected.substitution.to;
		lockedIndexes.add(selected.index);
	}
}

function applyOptionalSubstitutions({
	characters,
	lockedIndexes,
	poolSet,
	randomSource,
}: TransformContext): void {
	for (let index = 0; index < characters.length; index += 1) {
		if (lockedIndexes.has(index)) {
			continue;
		}

		if (
			getRandomIndex(SUBSTITUTION_ROLL_RANGE, randomSource) >=
			OPTIONAL_SUBSTITUTION_PERCENT
		) {
			continue;
		}

		const candidates = getSubstitutionCandidates({
			characters,
			lockedIndexes,
			poolSet,
			randomSource,
		}).filter((candidate) => candidate.index === index);

		if (candidates.length === 0) {
			continue;
		}

		const selected =
			candidates[getRandomIndex(candidates.length, randomSource)];

		if (selected) {
			characters[index] = selected.substitution.to;
		}
	}
}

function getSubstitutionCandidates(
	{ characters, lockedIndexes, poolSet }: TransformContext,
	kind?: Substitution["kind"],
): Array<{ index: number; substitution: Substitution }> {
	return characters.flatMap((character, index) => {
		if (lockedIndexes.has(index)) {
			return [];
		}

		const lowercaseCharacter = character.toLowerCase();

		return SUBSTITUTIONS.filter(
			(substitution) =>
				(!kind || substitution.kind === kind) &&
				substitution.from === lowercaseCharacter &&
				poolSet.has(substitution.to),
		).map((substitution) => ({ index, substitution }));
	});
}
