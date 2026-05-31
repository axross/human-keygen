export type CharacterCategory =
	| "lowercase"
	| "uppercase"
	| "digits"
	| "symbols";

export type KeyboardLayoutCharacters = Record<CharacterCategory, string>;

export interface KeyboardLayout {
	id: string;
	label: string;
	family: string;
	source: string;
	notes: string;
	characters: KeyboardLayoutCharacters;
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

const qwertyCharacters = {
	lowercase: LOWERCASE,
	uppercase: UPPERCASE,
	digits: DIGITS,
	symbols: SYMBOLS,
} satisfies KeyboardLayoutCharacters;

export const QWERTY_REFERENCE_LAYOUT = {
	id: "qwerty-us",
	label: "QWERTY / United States",
	family: "QWERTY",
	source: "Reference layout for QWERTY printable ASCII characters.",
	notes:
		"Used only as the reference set; it is not offered as a selectable target layout.",
	characters: qwertyCharacters,
} satisfies KeyboardLayout;

const keybrEnglishLayoutCharacters = qwertyCharacters;

const keybrSource =
	"Listed on Keybr layouts page; modeled as English printable ASCII direct and shifted layers.";

const keybrNotes =
	"Initial model excludes AltGr, dead keys, and composed output. Printable set is equivalent to QWERTY/US while key positions differ.";

const keybrLayoutDefinitions = [
	["dvorak", "Dvorak", "Dvorak"],
	["dvorak-programmer", "Dvorak Programmer", "Dvorak"],
	["colemak", "Colemak", "Colemak"],
	["colemak-dh", "Colemak-DH", "Colemak"],
	["colemak-dh-wide", "Colemak-DH Wide", "Colemak"],
	["colemak-dh-iso", "Colemak-DH ISO", "Colemak"],
	["colemak-dh-wide-iso", "Colemak-DH Wide ISO", "Colemak"],
	["colemak-dh-matrix", "Colemak-DH Matrix", "Colemak"],
	["workman", "Workman", "Workman"],
	["canary", "Canary", "Canary"],
	["canary-matrix", "Canary Matrix", "Canary"],
	["nerps", "Nerps", "Nerps"],
	["nerps-matrix", "Nerps Matrix", "Nerps"],
	["night-matrix", "Night Matrix", "Night"],
	["hands-down-neu", "Hands Down Neu", "Hands Down"],
	["hands-down-promethium", "Hands Down Promethium Matrix", "Hands Down"],
	[
		"hands-down-promethium-inverted",
		"Hands Down Promethium Inverted Matrix",
		"Hands Down",
	],
	["sturdy", "Sturdy", "Sturdy"],
	["norman", "Norman", "Norman"],
	["halmak", "Halmak", "Halmak"],
	["engram", "Engram", "Engram"],
	["gallium", "Gallium", "Gallium"],
	["gallium-matrix", "Gallium Matrix", "Gallium"],
	["graphite", "Graphite", "Graphite"],
	["graphite-angle-kp", "Graphite Angle KP", "Graphite"],
	["aptv3", "APTv3", "APTv3"],
	["focal", "Focal", "Focal"],
	["enthium-v6-matrix", "Enthium V6 Matrix", "Enthium"],
	["enthium-v10-matrix", "Enthium V10 Matrix", "Enthium"],
	["enthium-v11-matrix", "Enthium V11 Matrix", "Enthium"],
	["kuntem", "Kuntem", "Kuntem"],
] as const;

export const KEYBOARD_LAYOUTS = keybrLayoutDefinitions.map(
	([id, label, family]) =>
		({
			id,
			label,
			family,
			source: keybrSource,
			notes: keybrNotes,
			characters: keybrEnglishLayoutCharacters,
		}) satisfies KeyboardLayout,
);

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

	const characters = categories
		.map((category) => {
			const intersection = intersectCharacters(
				QWERTY_REFERENCE_LAYOUT.characters[category],
				layout.characters[category],
			);
			counts[category] = intersection.length;
			return intersection;
		})
		.join("");

	return {
		characters,
		counts,
		layout,
		equivalentToQwerty: categories.every(
			(category) =>
				intersectCharacters(
					QWERTY_REFERENCE_LAYOUT.characters[category],
					layout.characters[category],
				) === QWERTY_REFERENCE_LAYOUT.characters[category],
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

	return intersectCharacters(
		QWERTY_REFERENCE_LAYOUT.characters[category],
		layout.characters[category],
	).length;
}

export function intersectCharacters(
	reference: string,
	candidate: string,
): string {
	const candidateCharacters = new Set(candidate);

	return Array.from(reference)
		.filter((character) => candidateCharacters.has(character))
		.join("");
}
