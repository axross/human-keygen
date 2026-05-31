import { type JSX, useEffect, useId, useMemo, useState } from "react";
import {
	buildCharacterPool,
	type CharacterPool,
	type CharacterPoolOptions,
	DEFAULT_CHARACTER_OPTIONS,
	DEFAULT_LAYOUT_ID,
	getAvailableCategoryCount,
	KEYBOARD_LAYOUTS,
} from "@/lib/keyboard-layouts/layouts";
import { estimateCompleteWordEntropyBits } from "@/lib/password/entropy";
import {
	DEFAULT_PASSWORD_LENGTH,
	generateMemorablePassword,
	MAX_PASSWORD_LENGTH,
	MIN_PASSWORD_LENGTH,
} from "@/lib/password/generate-password";
import { createCryptoRandomSource } from "@/lib/password/random-source";

type CopyStatus = "idle" | "copied" | "failed";

export function PasswordGenerator(): JSX.Element {
	const layoutFieldId = useId();
	const lengthRangeId = useId();
	const lengthNumberId = useId();
	const [layoutId, setLayoutId] = useState(DEFAULT_LAYOUT_ID);
	const [length, setLength] = useState(DEFAULT_PASSWORD_LENGTH);
	const [options, setOptions] = useState<CharacterPoolOptions>(
		DEFAULT_CHARACTER_OPTIONS,
	);
	const [generatedPassword, setGeneratedPassword] = useState("");
	const [generationError, setGenerationError] = useState("");
	const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
	const [isHydrated, setIsHydrated] = useState(false);

	const pool = useMemo(
		() => buildCharacterPool(layoutId, options),
		[layoutId, options],
	);
	const entropy = pool
		? estimateCompleteWordEntropyBits(length, pool.characters)
		: 0;
	const canGenerate = isHydrated && Boolean(pool && pool.characters.length > 0);

	useEffect(() => {
		setIsHydrated(true);
	}, []);

	function updateOption(key: keyof CharacterPoolOptions, value: boolean): void {
		setOptions((currentOptions) => ({
			...currentOptions,
			[key]: value,
		}));
	}

	function updateLength(value: string): void {
		const nextLength = Number(value);

		if (!Number.isFinite(nextLength)) {
			return;
		}

		setLength(
			Math.min(
				MAX_PASSWORD_LENGTH,
				Math.max(MIN_PASSWORD_LENGTH, Math.round(nextLength)),
			),
		);
	}

	function generatePassword(): void {
		if (!pool || pool.characters.length === 0) {
			setGenerationError("Choose at least one available character group.");
			return;
		}

		try {
			const password = generateMemorablePassword({
				length,
				pool: pool.characters,
				randomSource: createCryptoRandomSource(),
			});
			setGeneratedPassword(password);
			setGenerationError("");
			setCopyStatus("idle");
		} catch (error) {
			setGenerationError(
				error instanceof Error ? error.message : "Password generation failed.",
			);
		}
	}

	async function copyPassword(): Promise<void> {
		if (!generatedPassword || !navigator.clipboard) {
			setCopyStatus("failed");
			return;
		}

		try {
			await navigator.clipboard.writeText(generatedPassword);
			setCopyStatus("copied");
		} catch {
			setCopyStatus("failed");
		}
	}

	const uppercaseCount = getAvailableCategoryCount(layoutId, "uppercase");
	const digitCount = getAvailableCategoryCount(layoutId, "digits");
	const symbolCount = getAvailableCategoryCount(layoutId, "symbols");

	return (
		<main className="min-h-dvh bg-[var(--neutral-0)] text-[var(--neutral-11)]">
			<section className="mx-auto flex min-h-dvh w-full max-w-[60rem] flex-col gap-8 px-4 py-8 sm:px-8 lg:px-0">
				<header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
					<div className="grid gap-3">
						<p className="w-fit rounded-[var(--radius-md)] px-4 py-2 font-mono font-semibold text-[var(--accent-11)] text-sm hover:bg-[var(--accent-2)]">
							{"<human keygen />"}
						</p>
						<h1 className="text-balance font-bold text-3xl text-[var(--neutral-12)] leading-tight sm:text-4xl">
							Layout-aware password generator
						</h1>
					</div>
					<p className="max-w-xl text-[var(--neutral-10)] text-sm leading-7">
						Local-only memorable strings using characters shared by QWERTY and
						your selected layout.
					</p>
				</header>

				<div className="grid flex-1 items-start gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
					<GeneratorControls
						canGenerate={canGenerate}
						controlsReady={isHydrated}
						digitCount={digitCount}
						generationError={generationError}
						layoutFieldId={layoutFieldId}
						layoutId={layoutId}
						length={length}
						lengthNumberId={lengthNumberId}
						lengthRangeId={lengthRangeId}
						options={options}
						symbolCount={symbolCount}
						uppercaseCount={uppercaseCount}
						onGenerate={generatePassword}
						onLayoutChange={setLayoutId}
						onLengthChange={updateLength}
						onOptionChange={updateOption}
					/>
					<PasswordResult
						copyStatus={copyStatus}
						entropy={entropy}
						generatedPassword={generatedPassword}
						length={length}
						pool={pool}
						onCopy={copyPassword}
					/>
				</div>
			</section>
		</main>
	);
}

interface GeneratorControlsProps {
	canGenerate: boolean;
	controlsReady: boolean;
	digitCount: number;
	generationError: string;
	layoutFieldId: string;
	layoutId: string;
	length: number;
	lengthNumberId: string;
	lengthRangeId: string;
	options: CharacterPoolOptions;
	symbolCount: number;
	uppercaseCount: number;
	onGenerate: () => void;
	onLayoutChange: (layoutId: string) => void;
	onLengthChange: (value: string) => void;
	onOptionChange: (key: keyof CharacterPoolOptions, value: boolean) => void;
}

function GeneratorControls({
	canGenerate,
	controlsReady,
	digitCount,
	generationError,
	layoutFieldId,
	layoutId,
	length,
	lengthNumberId,
	lengthRangeId,
	options,
	symbolCount,
	uppercaseCount,
	onGenerate,
	onLayoutChange,
	onLengthChange,
	onOptionChange,
}: GeneratorControlsProps): JSX.Element {
	return (
		<form
			className="flex flex-col gap-5 rounded-[var(--radius-md)] border border-[var(--accent-4)] bg-[var(--accent-2)] p-4 sm:p-5"
			onSubmit={(event) => {
				event.preventDefault();
				onGenerate();
			}}
		>
			<div className="grid gap-2">
				<label
					className="font-semibold text-[var(--neutral-12)] text-sm"
					htmlFor={layoutFieldId}
				>
					Keyboard layout
				</label>
				<select
					className="h-11 rounded-[var(--radius-sm)] border border-[var(--neutral-6)] bg-[var(--neutral-0)] px-3 text-[var(--neutral-12)] outline-none transition focus-visible:border-[var(--accent-8)] focus-visible:ring-4 focus-visible:ring-[var(--accent-4)] disabled:cursor-not-allowed disabled:bg-[var(--neutral-2)] disabled:text-[var(--neutral-8)]"
					disabled={!controlsReady}
					id={layoutFieldId}
					name="layout"
					value={layoutId}
					onChange={(event) => onLayoutChange(event.target.value)}
				>
					{KEYBOARD_LAYOUTS.map((layout) => (
						<option key={layout.id} value={layout.id}>
							{layout.label}
						</option>
					))}
				</select>
				<p className="text-[var(--neutral-10)] text-sm">
					QWERTY / United States is used only as the reference layout.
				</p>
			</div>

			<fieldset className="grid gap-3">
				<legend className="font-semibold text-[var(--neutral-12)] text-sm">
					Character groups
				</legend>
				<CheckboxControl
					checked={options.includeUppercase}
					controlsReady={controlsReady}
					count={uppercaseCount}
					label="Uppercase letters"
					onChange={(checked) => onOptionChange("includeUppercase", checked)}
				/>
				<CheckboxControl
					checked={options.includeDigits}
					controlsReady={controlsReady}
					count={digitCount}
					label="Numbers"
					onChange={(checked) => onOptionChange("includeDigits", checked)}
				/>
				<CheckboxControl
					checked={options.includeSymbols}
					controlsReady={controlsReady}
					count={symbolCount}
					label="Shifted symbols"
					onChange={(checked) => onOptionChange("includeSymbols", checked)}
				/>
			</fieldset>

			<div className="grid gap-3">
				<div className="flex items-center justify-between gap-3">
					<label
						className="font-semibold text-[var(--neutral-12)] text-sm"
						htmlFor={lengthRangeId}
					>
						Length
					</label>
					<input
						aria-label="Password length"
						className="h-10 w-24 rounded-[var(--radius-sm)] border border-[var(--neutral-6)] bg-[var(--neutral-0)] px-3 text-right text-[var(--neutral-12)] outline-none transition focus-visible:border-[var(--accent-8)] focus-visible:ring-4 focus-visible:ring-[var(--accent-4)] disabled:cursor-not-allowed disabled:bg-[var(--neutral-2)] disabled:text-[var(--neutral-8)]"
						disabled={!controlsReady}
						id={lengthNumberId}
						max={MAX_PASSWORD_LENGTH}
						min={MIN_PASSWORD_LENGTH}
						type="number"
						value={length}
						onChange={(event) => onLengthChange(event.target.value)}
					/>
				</div>
				<input
					className="accent-[var(--accent-9)] disabled:cursor-not-allowed"
					disabled={!controlsReady}
					id={lengthRangeId}
					max={MAX_PASSWORD_LENGTH}
					min={MIN_PASSWORD_LENGTH}
					type="range"
					value={length}
					onChange={(event) => onLengthChange(event.target.value)}
				/>
				<div className="flex justify-between text-[var(--neutral-9)] text-xs">
					<span>{MIN_PASSWORD_LENGTH}</span>
					<span>{MAX_PASSWORD_LENGTH}</span>
				</div>
			</div>

			<button
				className="h-12 rounded-[var(--radius-sm)] bg-[var(--accent-9)] px-4 font-bold text-white transition hover:bg-[var(--accent-10)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--accent-4)] disabled:cursor-not-allowed disabled:bg-[var(--neutral-4)] disabled:text-[var(--neutral-8)]"
				disabled={!canGenerate}
				type="submit"
			>
				Generate
			</button>

			{generationError ? (
				<p className="rounded-[var(--radius-sm)] border border-red-400/50 bg-red-500/10 px-3 py-2 text-red-700 text-sm dark:text-red-300">
					{generationError}
				</p>
			) : null}
		</form>
	);
}

interface PasswordResultProps {
	copyStatus: CopyStatus;
	entropy: number;
	generatedPassword: string;
	length: number;
	pool: CharacterPool | undefined;
	onCopy: () => Promise<void>;
}

function PasswordResult({
	copyStatus,
	entropy,
	generatedPassword,
	length,
	pool,
	onCopy,
}: PasswordResultProps): JSX.Element {
	return (
		<section className="flex flex-col gap-5 rounded-[var(--radius-md)] border border-[var(--neutral-5)] bg-[var(--neutral-1)] p-4 sm:p-5">
			<div className="grid gap-3">
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<h2 className="font-bold text-[var(--neutral-12)] text-xl">
						Generated password
					</h2>
					<button
						className="h-11 rounded-[var(--radius-sm)] border border-[var(--accent-6)] px-4 font-semibold text-[var(--accent-11)] transition hover:bg-[var(--accent-3)] hover:text-[var(--accent-12)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--accent-4)] disabled:cursor-not-allowed disabled:border-[var(--neutral-5)] disabled:text-[var(--neutral-8)]"
						disabled={!generatedPassword}
						type="button"
						onClick={onCopy}
					>
						Copy
					</button>
				</div>
				<output
					aria-label="Generated password"
					className="min-h-20 break-all rounded-[var(--radius-md)] border border-[var(--accent-5)] bg-[var(--accent-3)] px-4 py-4 font-mono text-2xl text-[var(--neutral-12)] leading-relaxed tracking-normal sm:text-3xl"
					data-testid="generated-password"
				>
					{generatedPassword || "Generate to begin"}
				</output>
				<p
					aria-live="polite"
					className="min-h-6 text-sm"
					data-testid="copy-status"
				>
					{copyStatus === "copied" ? (
						<span className="font-semibold text-[var(--accent-11)]">
							Copied.
						</span>
					) : null}
					{copyStatus === "failed" ? (
						<span className="font-semibold text-red-700">
							Clipboard unavailable.
						</span>
					) : null}
				</p>
			</div>

			<dl className="grid gap-3 sm:grid-cols-3">
				<Metric
					label="Pool size"
					value={String(pool?.characters.length ?? 0)}
				/>
				<Metric label="Phrase entropy" value={`${entropy.toFixed(1)} bits`} />
				<Metric label="Length" testId="length-value" value={String(length)} />
			</dl>

			<div className="grid gap-2 rounded-[var(--radius-md)] border border-[var(--neutral-5)] bg-[var(--neutral-2)] p-3">
				<h2 className="font-bold text-[var(--neutral-12)] text-sm">
					Allowed characters
				</h2>
				<p className="text-[var(--neutral-10)] text-sm">
					{pool?.equivalentToQwerty
						? "This English layout has an equivalent printable set; the practical difference is key position."
						: "Only characters found in both QWERTY and the selected layout are used."}
				</p>
				<code
					className="block break-all rounded-[var(--radius-sm)] border border-[var(--neutral-5)] bg-[var(--neutral-0)] px-3 py-2 font-mono text-[var(--neutral-11)] text-sm"
					data-pool={pool?.characters ?? ""}
					data-testid="character-pool"
				>
					{pool?.characters || "No characters available"}
				</code>
			</div>
		</section>
	);
}

interface CheckboxControlProps {
	checked: boolean;
	controlsReady: boolean;
	count: number;
	label: string;
	onChange: (checked: boolean) => void;
}

function CheckboxControl({
	checked,
	controlsReady,
	count,
	label,
	onChange,
}: CheckboxControlProps): JSX.Element {
	const disabled = !controlsReady || count === 0;

	return (
		<label className="flex min-h-11 items-center justify-between gap-3 rounded-[var(--radius-sm)] border border-[var(--accent-4)] bg-[var(--neutral-0)] px-3 py-2 text-sm transition hover:bg-[var(--accent-3)]">
			<span className="flex items-center gap-3">
				<input
					checked={checked && !disabled}
					className="size-5 accent-[var(--accent-9)]"
					disabled={disabled}
					type="checkbox"
					onChange={(event) => onChange(event.target.checked)}
				/>
				<span className="font-medium text-[var(--neutral-11)]">{label}</span>
			</span>
			<span className="text-[var(--neutral-9)]">{count}</span>
		</label>
	);
}

interface MetricProps {
	label: string;
	testId?: string;
	value: string;
}

function Metric({ label, testId, value }: MetricProps): JSX.Element {
	return (
		<div className="rounded-[var(--radius-sm)] border border-[var(--neutral-5)] bg-[var(--neutral-2)] px-3 py-3">
			<dt className="font-medium text-[var(--neutral-9)] text-xs uppercase tracking-[0.08em]">
				{label}
			</dt>
			<dd
				className="mt-1 font-bold text-[var(--neutral-12)] text-lg"
				data-testid={testId}
			>
				{value}
			</dd>
		</div>
	);
}
