import { writeFile } from "node:fs/promises";
import { createRequire } from "node:module";

const SOURCE_PACKAGE = "wordlist-js";
const SOURCE_VERSION = "2.0.0";
const SOURCE_LIST = "english10";
const MIN_WORD_LENGTH = 3;
const MIN_SUPPLEMENTAL_WORD_LENGTH = 3;
const MAX_WORD_LENGTH = 9;
const LOWERCASE_WORD_PATTERN = /^[a-z]+$/;
const SUPPLEMENTAL_WORD_VALUES = [
	"aah",
	"aha",
	"baa",
	"bah",
	"cab",
	"cam",
	"caw",
	"gag",
	"gaga",
	"gags",
	"gas",
	"ham",
	"haw",
	"hmm",
	"mac",
	"macaw",
	"mam",
	"mama",
	"mamma",
	"mamba",
	"maw",
	"sag",
	"saga",
	"sagas",
	"sags",
	"sass",
	"sax",
	"vac",
	"wax",
	"wham",
];
const require = createRequire(import.meta.url);
const { englishAll, [SOURCE_LIST]: sourceWords } = require(
	`${SOURCE_PACKAGE}/dist/english`,
);

const invalidSupplementalWords = SUPPLEMENTAL_WORD_VALUES.filter(
	(word) =>
		!englishAll.includes(word) ||
		word.length < MIN_SUPPLEMENTAL_WORD_LENGTH ||
		word.length > MAX_WORD_LENGTH ||
		!LOWERCASE_WORD_PATTERN.test(word),
);

if (invalidSupplementalWords.length > 0) {
	throw new Error(
		`Invalid supplemental word candidates: ${invalidSupplementalWords.join(", ")}`,
	);
}

const wordValues = Array.from(
	new Set(
		sourceWords
			.filter(
				(word) =>
					word.length >= MIN_WORD_LENGTH &&
					word.length <= MAX_WORD_LENGTH &&
					LOWERCASE_WORD_PATTERN.test(word),
			)
			.concat(SUPPLEMENTAL_WORD_VALUES),
	),
);
const serializedWordValues = `[\n${wordValues
	.map((word) => `\t${JSON.stringify(word)},`)
	.join("\n")}\n]`;

const fileContents = `// Generated from ${SOURCE_PACKAGE}@${SOURCE_VERSION} ${SOURCE_LIST}, with curated ${SOURCE_PACKAGE} englishAll supplements for restricted keyboard pools. Run npm run update-word-candidates.

export interface WordCandidate {
\tlength: number;
\tvalue: string;
}

const PASSWORD_WORD_VALUES = ${serializedWordValues};

export const PASSWORD_WORD_CANDIDATES = PASSWORD_WORD_VALUES.map(
\t(value) => ({ length: value.length, value }) satisfies WordCandidate,
);

export function getTypeableWordCandidates(pool: string): WordCandidate[] {
\tconst poolSet = new Set(pool);

\treturn PASSWORD_WORD_CANDIDATES.filter(({ value }) =>
\t\tArray.from(value).every((character) => poolSet.has(character)),
\t);
}

export function groupWordCandidatesByLength(
\tcandidates: WordCandidate[],
): Map<number, WordCandidate[]> {
\tconst groups = new Map<number, WordCandidate[]>();

\tfor (const candidate of candidates) {
\t\tconst existingGroup = groups.get(candidate.length) ?? [];
\t\texistingGroup.push(candidate);
\t\tgroups.set(candidate.length, existingGroup);
\t}

\treturn groups;
}

export function countCompleteWordSequences(
\ttargetLength: number,
\tcandidatesByLength: Map<number, WordCandidate[]>,
): bigint[] {
\tconst sequenceCounts = Array.from({ length: targetLength + 1 }, () => 0n);
\tsequenceCounts[0] = 1n;

\tfor (let length = 1; length <= targetLength; length += 1) {
\t\tlet count = 0n;

\t\tfor (const [wordLength, candidates] of candidatesByLength) {
\t\t\tif (wordLength > length) {
\t\t\t\tcontinue;
\t\t\t}

\t\t\tcount +=
\t\t\t\tBigInt(candidates.length) * (sequenceCounts[length - wordLength] ?? 0n);
\t\t}

\t\tsequenceCounts[length] = count;
\t}

\treturn sequenceCounts;
}
`;

await writeFile(
	new URL("../src/lib/password/word-candidates.ts", import.meta.url),
	fileContents,
);
