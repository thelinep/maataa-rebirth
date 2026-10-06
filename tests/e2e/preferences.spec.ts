import { expect, test, type Page } from "@playwright/test";

async function expectFooterContrast(page: Page) {
  const ratios = await page.locator(".site-footer").evaluate((footer: HTMLElement) => {
    const luminance = (value: number) => {
      const channel = value / 255;
      return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    };
    const parse = (color: string) => color.match(/[\d.]+/g)?.slice(0, 3).map(Number) ?? [0, 0, 0];
    const score = (foreground: number[], background: number[]) => {
      const fg = foreground.reduce((total, value, index) => total + luminance(value) * [0.2126, 0.7152, 0.0722][index], 0);
      const bg = background.reduce((total, value, index) => total + luminance(value) * [0.2126, 0.7152, 0.0722][index], 0);
      return (Math.max(fg, bg) + 0.05) / (Math.min(fg, bg) + 0.05);
    };
    const background = parse(getComputedStyle(footer).backgroundColor);
    return [...footer.querySelectorAll("strong,p,.footer-links button,.demo-muted")]
      .filter((element) => element.textContent?.trim())
      .map((element) => score(parse(getComputedStyle(element).color), background));
  });
  expect(ratios.length).toBeGreaterThan(0);
  expect(Math.min(...ratios)).toBeGreaterThanOrEqual(4.5);
}

test("global theme and language preferences apply across routes and persist", async ({ page }) => {
  await page.goto("/#/surface", { waitUntil: "domcontentloaded" });
  await expect(page.locator('[data-maataa-demo-ready="true"]')).toBeVisible();
  await expect(page.locator(".site-shell")).toHaveAttribute("data-demo-theme", "dark");
  await expectFooterContrast(page);

  await page.getByRole("button", { name: "Settings" }).click();
  const panel = page.getByRole("group", { name: "Settings" });
  await panel.getByLabel("Theme").selectOption("light");
  await expect(page.locator(".site-shell")).toHaveAttribute("data-demo-theme", "light");
  await expect(page.locator("html")).toHaveCSS("color-scheme", "light");
  await expect(page.locator(".actual-preview-stage")).toHaveCSS("color", "rgb(241, 240, 235)");
  await expectFooterContrast(page);
  await panel.getByLabel("Theme").selectOption("system");
  await expect.poll(() => page.locator(".site-shell").getAttribute("data-demo-theme")).toMatch(/^(dark|light)$/);
  await expectFooterContrast(page);
  await panel.getByLabel("Theme").selectOption("high-contrast");
  await expect(page.locator(".site-shell")).toHaveAttribute("data-demo-theme", "high-contrast");
  await expectFooterContrast(page);
  await panel.getByLabel("Theme").selectOption("oled");
  await expect(page.locator(".site-shell")).toHaveAttribute("data-demo-theme", "oled");
  await expectFooterContrast(page);
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
