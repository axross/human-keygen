export type CharacterCategory =
	| "lowercase"
	| "uppercase"
	| "digits"
	| "symbols";

export type KeyboardLayoutCharacters = Record<CharacterCategory, string>;

interface KeyOutput {
	direct: string;
	shifted: string;
}

export interface KeyboardLayout {
	id: string;
	label: string;
	family: string;
	source: string;
	notes: string;
	keymap: readonly KeyOutput[];
}

export interface CharacterPoolOptions {
	includeUppercase: boolean;
	includeDigits: boolean;
	includeSymbols: boolean;
}

export interface CharacterPool {
	characters: string;
	counts: Record<CharacterCategory, number>;
	layout: KeyboardLayout;
	equivalentToQwerty: boolean;
}

const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";
const SYMBOLS = "`~!@#$%^&*()-_=+[]{}\\|;:'\",<.>/?";
const CATEGORY_ORDER = [
	"lowercase",
	"uppercase",
	"digits",
	"symbols",
] satisfies CharacterCategory[];

const qwertyCharacters = {
	lowercase: LOWERCASE,
	uppercase: UPPERCASE,
	digits: DIGITS,
	symbols: SYMBOLS,
} satisfies KeyboardLayoutCharacters;

const QWERTY_KEYMAP = createKeymap(
	["`1234567890-=", "qwertyuiop[]\\", "asdfghjkl;'", "zxcvbnm,./"],
	["~!@#$%^&*()_+", "QWERTYUIOP{}|", 'ASDFGHJKL:"', "ZXCVBNM<>?"],
);

export const QWERTY_REFERENCE_LAYOUT = {
	id: "qwerty-us",
	label: "QWERTY / United States",
	family: "QWERTY / ANSI",
	source: "Reference layout for QWERTY/US direct and shifted physical keys.",
	notes:
		"Used only as the reference set; it is not offered as a selectable target layout.",
	keymap: QWERTY_KEYMAP,
} satisfies KeyboardLayout;

const keybrSource =
	"Listed on Keybr layouts page; modeled as ANSI direct and shifted physical key outputs.";

const keybrNotes =
	"Initial model covers ANSI direct and shifted layers only. AltGr, dead keys, composed output, and matrix/ISO variants require separate physical-key review before being selectable.";

export const KEYBOARD_LAYOUTS = [
	{
		id: "dvorak",
		label: "Dvorak",
		family: "Dvorak / ANSI",
		source: keybrSource,
		notes: keybrNotes,
		keymap: createKeymap(
			["`1234567890[]", "',.pyfgcrl/=\\", "aoeuidhtns-", ";qjkxbmwvz"],
			["~!@#$%^&*(){}", '"<>PYFGCRL?+|', "AOEUIDHTNS_", ":QJKXBMWVZ"],
		),
	},
	{
		id: "colemak",
		label: "Colemak",
		family: "Colemak / ANSI",
		source: keybrSource,
		notes: keybrNotes,
		keymap: createKeymap(
			["`1234567890-=", "qwfpgjluy;[]\\", "arstdhneio'", "zxcvbkm,./"],
			["~!@#$%^&*()_+", "QWFPGJLUY:{}|", 'ARSTDHNEIO"', "ZXCVBKM<>?"],
		),
	},
	{
		id: "workman",
		label: "Workman",
		family: "Workman / ANSI",
		source: keybrSource,
		notes: keybrNotes,
		keymap: createKeymap(
			["`1234567890-=", "qdrwbjfup;[]\\", "ashtgyneoi'", "zxmcvkl,./"],
			["~!@#$%^&*()_+", "QDRWBJFUP:{}|", 'ASHTGYNEOI"', "ZXMCVKL<>?"],
		),
	},
] satisfies KeyboardLayout[];

export const DEFAULT_LAYOUT_ID = "colemak";

export const DEFAULT_CHARACTER_OPTIONS = {
	includeUppercase: true,
	includeDigits: true,
	includeSymbols: true,
} satisfies CharacterPoolOptions;

export function getLayoutById(layoutId: string): KeyboardLayout | undefined {
	return KEYBOARD_LAYOUTS.find((layout) => layout.id === layoutId);
}

export function buildCharacterPool(
	layoutId: string,
	options: CharacterPoolOptions,
): CharacterPool | undefined {
	const layout = getLayoutById(layoutId);

	if (!layout) {
		return;
	}

	const categories: CharacterCategory[] = ["lowercase"];

	if (options.includeUppercase) {
		categories.push("uppercase");
	}

	if (options.includeDigits) {
		categories.push("digits");
	}

	if (options.includeSymbols) {
		categories.push("symbols");
	}

	const counts = {
		lowercase: 0,
		uppercase: 0,
		digits: 0,
		symbols: 0,
	} satisfies Record<CharacterCategory, number>;
	const samePositionCharacters = buildSamePositionCharacters(layout);
	const characters = categories
		.map((category) => {
			counts[category] = samePositionCharacters[category].length;
			return samePositionCharacters[category];
		})
		.join("");

	return {
		characters,
		counts,
		layout,
		equivalentToQwerty: CATEGORY_ORDER.every(
			(category) =>
				samePositionCharacters[category] === qwertyCharacters[category],
		),
	};
}

export function getAvailableCategoryCount(
	layoutId: string,
	category: Exclude<CharacterCategory, "lowercase">,
): number {
	const layout = getLayoutById(layoutId);

	if (!layout) {
		return 0;
	}

	return buildSamePositionCharacters(layout)[category].length;
}

function buildSamePositionCharacters(
	layout: KeyboardLayout,
): KeyboardLayoutCharacters {
	const characters = {
		lowercase: "",
		uppercase: "",
		digits: "",
		symbols: "",
	} satisfies KeyboardLayoutCharacters;

	for (
		let index = 0;
		index < QWERTY_REFERENCE_LAYOUT.keymap.length;
		index += 1
	) {
		const referenceKey = QWERTY_REFERENCE_LAYOUT.keymap[index];
		const layoutKey = layout.keymap[index];

		if (!referenceKey || !layoutKey) {
			continue;
		}

		addSameOutput(characters, referenceKey.direct, layoutKey.direct);
		addSameOutput(characters, referenceKey.shifted, layoutKey.shifted);
	}

	return characters;
}

function addSameOutput(
	characters: KeyboardLayoutCharacters,
	referenceOutput: string,
	layoutOutput: string,
): void {
	if (referenceOutput !== layoutOutput) {
		return;
	}

	const category = getCharacterCategory(referenceOutput);

	if (!category) {
		return;
	}

	characters[category] += referenceOutput;
}

function getCharacterCategory(
	character: string,
): CharacterCategory | undefined {
	if (LOWERCASE.includes(character)) {
		return "lowercase";
	}

	if (UPPERCASE.includes(character)) {
		return "uppercase";
	}

	if (DIGITS.includes(character)) {
		return "digits";
	}

	if (SYMBOLS.includes(character)) {
		return "symbols";
	}
}

function createKeymap(
	directRows: readonly string[],
	shiftedRows: readonly string[],
): readonly KeyOutput[] {
	return directRows.flatMap((directRow, rowIndex) => {
		const shiftedRow = shiftedRows[rowIndex];

		if (shiftedRow === undefined) {
			throw new Error("Keyboard layout is missing a shifted row.");
		}

		const directCharacters = Array.from(directRow);
		const shiftedCharacters = Array.from(shiftedRow);

		if (directCharacters.length !== shiftedCharacters.length) {
			throw new Error("Keyboard layout row lengths must match.");
		}

		return directCharacters.map((direct, index) => ({
			direct,
			shifted: shiftedCharacters[index] ?? "",
		}));
	});
}
