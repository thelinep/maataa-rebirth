import { expect, test } from "@playwright/test";

test("measure mode stays off without ?measure=1", async ({ page }) => {
  await page.goto("/#/playground");
  await expect(page.locator('[data-maataa-demo-ready="true"]')).toBeVisible();
  await expect(page.locator('[data-maataa-measure-panel="true"]')).toHaveCount(0);
});

test("measure mode reports the same milestones as the runtime check", async ({ page }) => {
  await page.goto("/?measure=1#/playground");
  await expect(page.locator('[data-maataa-demo-ready="true"]')).toBeVisible();
  await page.getByRole("button", { name: "Open dialog", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Keyboard dialog" })).toBeVisible();
  const panel = page.locator('[data-maataa-measure-panel="true"]');
  await expect(panel).toContainText(/Ready \(demo mounted\): \d+ ms/);
  await expect(panel).toContainText(/Dialog response \(tap to open\): \d+ ms/, { timeout: 5000 });
  await expect(panel).toContainText(/Comparable to automated check \(ready \+ response\): \d+ ms/);
  await expect(panel).toContainText(/JS loaded: \d+\.\d\d MB/);
  await expect(panel.locator("button", { hasText: "Copy results" })).toBeVisible();
});
