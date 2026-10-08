import { expect, test } from "@playwright/test";

test("shows a desktop launcher and explains the native window boundary in preview mode", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Your apps. One desktop." })).toBeVisible();
  await expect(page.getByRole("button", { name: "Open Browser app in a new window" })).toBeVisible();
  await expect(page.locator("#tlps-app")).toBeVisible();
  await expect(page.locator("#film-app")).toBeVisible();
  await expect(page.locator("#support-app")).toBeVisible();
  await page.getByRole("button", { name: "Open Browser app in a new window" }).click();
  await expect(page.getByRole("status")).toContainText("Native preview only");
});

test("routes product icons to separate native app windows", async ({ page }) => {
  await page.addInitScript(() => {
    const calls: Array<{ command: string; args?: Record<string, unknown> }> = [];
    (window as Window & { __calls?: typeof calls; __TAURI__?: unknown }).__calls = calls;
    (window as Window & { __TAURI__?: unknown }).__TAURI__ = {
      core: { invoke: async (command: string, args?: Record<string, unknown>) => { calls.push({ command, args }); } },
      webviewWindow: { getCurrentWebviewWindow: () => ({ label: "main" }) },
    };
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Open MAATAA UI workspace" }).click();
  await page.locator("#tlps-app").click();
  await page.locator("#film-app").click();
  await page.locator("#support-app").click();
  const calls = await page.evaluate(() => (window as Window & { __calls?: Array<{ command: string; args?: Record<string, unknown> }> }).__calls);
  expect(calls).toEqual([
    { command: "open_product_window", args: { product: "maataa-ui" } },
    { command: "open_product_window", args: { product: "tlps" } },
    { command: "open_product_window", args: { product: "tlp-film" } },
    { command: "open_product_window", args: { product: "support-center" } },
  ]);
});

test("keeps the desktop launcher and address controls within narrow viewports", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Your apps. One desktop." })).toBeVisible();
  await expect(page.locator("#tlps-app")).toBeVisible();
  await expect(page.locator("#support-app")).toBeVisible();
  const overflows = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflows).toBe(false);
});
