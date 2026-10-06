import { expect, test } from "@playwright/test";

test("Theme Studio edits typography and palette in a live package preview", async ({ page }) => {
  await page.goto("/#/theme-studio", { waitUntil: "domcontentloaded" });
  await expect(page.locator('[data-maataa-demo-ready="true"]')).toBeVisible();
  await expect(page.getByRole("heading", { name: "Theme Studio" })).toBeVisible();
  await expect(page.getByText("Preview uses package components")).toBeVisible();

  await page.getByRole("button", { name: "Typography" }).click();
  const bodyFont = page.getByLabel("Body font");
  await bodyFont.selectOption({ label: "Editorial serif" });
  await expect(page.getByLabel("bodyFont CSS stack")).toHaveValue('Georgia, "Times New Roman", serif');

  await page.getByRole("button", { name: "Colors" }).click();
  await page.getByRole("textbox", { name: "Primary hex", exact: true }).fill("#ffffff");
  await expect(page.locator(".theme-studio-preview")).toHaveCSS("--m-primary", "#ffffff");
  await expect(page.getByText(/Action \/ primary ·/)).toBeVisible();
});

test("Theme Studio saves, applies and restores a local design-token preset", async ({ page }) => {
  await page.goto("/#/theme-studio", { waitUntil: "domcontentloaded" });
  await expect(page.locator('[data-maataa-demo-ready="true"]')).toBeVisible();
  await page.getByLabel("Theme name").fill("Playwright studio preset");
  await page.getByRole("button", { name: "Save this theme" }).click();
  await expect(page.getByRole("status")).toContainText("Preset saved");

  await page.getByRole("button", { name: "Apply to MAATAA" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-maataa-custom-theme", "true");
  await expect(page.locator("html")).toHaveCSS("--m-font-heading", /Inter/);

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-maataa-custom-theme", "true");
  await page.goto("/#/help", { waitUntil: "domcontentloaded" });
  await expect(page.locator("html")).toHaveAttribute("data-maataa-custom-theme", "true");
  await page.goto("/#/theme-studio", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Reset applied theme" }).click();
  await expect(page.locator("html")).not.toHaveAttribute("data-maataa-custom-theme");
});
