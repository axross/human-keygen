export interface RandomSource {
	nextUint32: () => number;
}

const UINT32_RANGE = 0x1_00_00_00_00;
const UINT32_BIGINT_RANGE = 0x1_00_00_00_00n;
const UINT32_BITS = 32;
const BINARY_RADIX = 2;

export function createCryptoRandomSource(
	cryptoObject = globalThis.crypto,
): RandomSource {
	if (!cryptoObject?.getRandomValues) {
		throw new Error("Web Crypto is unavailable.");
	}

	const buffer = new Uint32Array(1);

	return {
		nextUint32() {
			cryptoObject.getRandomValues(buffer);
			return buffer[0] ?? 0;
		},
	};
}

export function getRandomIndex(
	upperBound: number,
	randomSource: RandomSource,
): number {
	if (!Number.isInteger(upperBound) || upperBound <= 0) {
		throw new Error("Random index upper bound must be a positive integer.");
	}

	const limit = Math.floor(UINT32_RANGE / upperBound) * upperBound;
	let value = normalizeUint32(randomSource.nextUint32());

	while (value >= limit) {
		value = normalizeUint32(randomSource.nextUint32());
	}

	return value % upperBound;
}

export function getRandomBigInt(
	upperBound: bigint,
	randomSource: RandomSource,
): bigint {
	if (upperBound <= 0n) {
		throw new Error("Random bigint upper bound must be positive.");
	}

	const chunkCount = Math.ceil(getBitLength(upperBound - 1n) / UINT32_BITS);
	const range = UINT32_BIGINT_RANGE ** BigInt(chunkCount);
	const limit = (range / upperBound) * upperBound;
	let value = getRandomBigIntCandidate(chunkCount, randomSource);

	while (value >= limit) {
		value = getRandomBigIntCandidate(chunkCount, randomSource);
	}

	return value % upperBound;
}

function normalizeUint32(value: number): number {
	if (!Number.isFinite(value)) {
		return 0;
	}

	const integer = Math.trunc(value);
	const remainder = integer % UINT32_RANGE;

	if (remainder < 0) {
		return remainder + UINT32_RANGE;
	}

	return remainder;
}

function getRandomBigIntCandidate(
	chunkCount: number,
	randomSource: RandomSource,
): bigint {
	let value = 0n;

	for (let index = 0; index < chunkCount; index += 1) {
		value =
			value * UINT32_BIGINT_RANGE +
			BigInt(normalizeUint32(randomSource.nextUint32()));
	}

	return value;
}

function getBitLength(value: bigint): number {
	return value.toString(BINARY_RADIX).length;
}
