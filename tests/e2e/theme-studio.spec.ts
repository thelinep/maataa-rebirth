import { expect, test } from "@playwright/test";

test("all TLPS options preview independently and notebook styling applies to TLPS", async ({ page }) => {
  await page.goto("/#/theme-studio");
  const library = page.getByRole("region", { name: "Theme options", exact: true });
  await expect(library.getByRole("button")).toHaveCount(9);
  for (const name of ["Warm Paper", "Cinema Gold", "Slate Teal", "Ink White", "Graphite Paper", "Blue Notebook", "Kraft Sketch", "Arcade Quest", "ASCII Terminal"]) {
    await library.getByRole("button", { name, exact: true }).click();
    await expect(page.getByLabel("Theme name", { exact: true })).toHaveValue(`${name === "Arcade Quest" ? "MAATAA" : "TLPS"} · ${name}`);
    await expect(page.locator("html")).not.toHaveAttribute("data-maataa-custom-theme");
  }
  await expect(page.locator(".theme-studio-preview")).toHaveCSS("--m-font-heading", /monospace/);
  await expect(page.locator(".theme-studio-preview")).toHaveCSS("--m-radius-lg", "0px");
  await library.getByRole("button", { name: "Blue Notebook", exact: true }).click();
  await expect(page.locator(".theme-studio-preview")).toHaveCSS("background-image", /repeating-linear-gradient/);
  await page.getByRole("button", { name: "Apply theme", exact: true }).click();
  await page.goto("/#/tlps");
  await expect(page.locator(".tlps-site")).toHaveCSS("background-image", /repeating-linear-gradient/);
  await page.reload();
  await expect(page.locator(".tlps-site")).toHaveCSS("--m-bg", "#f4f5ee");
  await page.goto("/#/theme-studio");
  await page.getByRole("button", { name: "Reset applied theme", exact: true }).click();
  await expect(page.locator("html")).not.toHaveAttribute("data-maataa-custom-theme");
});

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
