import { expect, test } from "@playwright/test";

const COPY_STATUS_PATTERN = /Copied|Clipboard unavailable/;
const REQUESTED_PASSWORD_LENGTH = 20;

test("generates a layout-aware password and copy feedback", async ({
	page,
	context,
}) => {
	await context.grantPermissions(["clipboard-read", "clipboard-write"]);
	await page.goto("/");

	await expect(
		page.getByRole("heading", { name: "Layout-aware password generator" }),
	).toBeVisible();
	const generateButton = page.getByRole("button", { name: "Generate" });
	await expect(generateButton).toBeEnabled();
	await page.getByLabel("Keyboard layout").selectOption("dvorak");
	await page
		.getByLabel("Password length")
		.fill(String(REQUESTED_PASSWORD_LENGTH));
	await expect(page.getByTestId("length-value")).toHaveText(
		String(REQUESTED_PASSWORD_LENGTH),
	);
	await generateButton.click();

	const generatedPassword = page.getByTestId("generated-password");
	await expect(generatedPassword).toBeVisible();
	await expect(generatedPassword).not.toHaveText("Generate to begin");

	const password = (await generatedPassword.textContent()) ?? "";
	const pool =
		(await page.getByTestId("character-pool").getAttribute("data-pool")) ?? "";

	expect(password).toHaveLength(REQUESTED_PASSWORD_LENGTH);
	expect(
		Array.from(password).every((character) => pool.includes(character)),
	).toBe(true);

	await page.getByRole("button", { name: "Copy" }).click();
	await expect(page.getByTestId("copy-status")).toContainText(
		COPY_STATUS_PATTERN,
	);
});

test("keeps the generator coherent on mobile", async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto("/");

	await expect(page.getByLabel("Keyboard layout")).toBeVisible();
	await expect(page.getByRole("button", { name: "Generate" })).toBeVisible();
	await expect(page.getByTestId("generated-password")).toBeVisible();
});
