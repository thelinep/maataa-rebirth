import { expect, test } from "@playwright/test";

test("global theme and language preferences apply across routes and persist", async ({ page }) => {
  await page.goto("/#/surface", { waitUntil: "domcontentloaded" });
  await expect(page.locator('[data-maataa-demo-ready="true"]')).toBeVisible();
  await expect(page.locator(".site-shell")).toHaveAttribute("data-demo-theme", "dark");

  await page.getByRole("button", { name: "Settings" }).click();
  const panel = page.getByRole("group", { name: "Settings" });
  await panel.getByLabel("Theme").selectOption("light");
  await expect(page.locator(".site-shell")).toHaveAttribute("data-demo-theme", "light");
  await expect(page.locator("html")).toHaveCSS("color-scheme", "light");
  await expect(page.locator(".actual-preview-stage")).toHaveCSS("color", "rgb(241, 240, 235)");
  await panel.getByLabel("Theme").selectOption("high-contrast");
  await expect(page.locator(".site-shell")).toHaveAttribute("data-demo-theme", "high-contrast");
  await panel.getByLabel("Theme").selectOption("oled");
  await expect(page.locator(".site-shell")).toHaveAttribute("data-demo-theme", "oled");
  await panel.getByLabel("Theme").selectOption("light");
  await panel.getByLabel("Language").selectOption("hi-IN");
  await expect(page.locator("html")).toHaveAttribute("lang", "hi-IN");

  await page.getByRole("button", { name: "मेनू" }).click();
  await expect(page.getByRole("navigation", { name: "Primary navigation" }).getByRole("button", { name: "फुल सरफेस" })).toBeVisible();
  await page.getByRole("button", { name: "सेटिंग्स" }).click();
  await page.goto("/#/docs", { waitUntil: "domcontentloaded" });
  await expect(page.locator('[data-maataa-demo-ready="true"]')).toBeVisible();
  await expect(page.locator(".site-shell")).toHaveAttribute("data-demo-theme", "light");
  await expect(page.locator("html")).toHaveAttribute("lang", "hi-IN");

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole("button", { name: "सेटिंग्स" })).toBeVisible();
  await page.getByRole("button", { name: "सेटिंग्स" }).click();
  const hindiPanel = page.getByRole("group", { name: "सेटिंग्स" });
  await expect(hindiPanel.getByLabel("थीम")).toHaveValue("light");
  await expect(hindiPanel.getByLabel("भाषा")).toHaveValue("hi-IN");
});
