import { expect, test } from "@playwright/test";

test("global navbar hides on downward scroll and returns on upward scroll", async ({ page }) => {
  await page.goto("/");
  const header = page.locator(".site-header");
  await expect(header).toBeVisible();

  await page.evaluate(() => window.scrollTo({ top: 420, behavior: "instant" }));
  await expect(header).toHaveAttribute("data-hidden", "true");
  await expect.poll(() => header.evaluate((element) => getComputedStyle(element).transform)).not.toBe("none");

  await page.evaluate(() => window.scrollTo({ top: 220, behavior: "instant" }));
  await expect(header).not.toHaveAttribute("data-hidden", "true");
  await expect.poll(() => header.evaluate((element) => getComputedStyle(element).transform)).toBe("none");
});

test("global navbar stays visible when reduced motion is requested", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const header = page.locator(".site-header");
  await page.evaluate(() => window.scrollTo({ top: 420, behavior: "instant" }));
  await expect(header).not.toHaveAttribute("data-hidden", "true");
});
