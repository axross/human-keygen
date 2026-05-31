import {
	countCompleteWordSequences,
	getTypeableWordCandidates,
	groupWordCandidatesByLength,
} from "./word-candidates";

const BINARY_RADIX = 2;
const LEADING_BITS = 53;

export function estimateEntropyBits(poolSize: number, length: number): number {
	if (poolSize <= 1 || length <= 0) {
		return 0;
	}

	return length * Math.log2(poolSize);
}

export function estimateCompleteWordEntropyBits(
	length: number,
	pool: string,
): number {
	if (length <= 0 || pool.length === 0) {
		return 0;
	}

	const sequenceCounts = countCompleteWordSequences(
		length,
		groupWordCandidatesByLength(getTypeableWordCandidates(pool)),
	);
	const sequenceCount = sequenceCounts[length] ?? 0n;

	return log2BigInt(sequenceCount);
}

function log2BigInt(value: bigint): number {
	if (value <= 0n) {
		return 0;
	}

	const binaryDigits = value.toString(BINARY_RADIX);

	if (binaryDigits.length <= LEADING_BITS) {
		return Math.log2(Number(value));
	}

	return (
		binaryDigits.length -
		LEADING_BITS +
		Math.log2(
			Number.parseInt(binaryDigits.slice(0, LEADING_BITS), BINARY_RADIX),
		)
	);
}
