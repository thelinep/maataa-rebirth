import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";

test("TLPS brand is discoverable and exports the active MAATAA theme", async ({ page }) => {
  await page.goto("/#/tlps");
  await page.getByRole("navigation", { name: "TLPS site", exact: true }).getByRole("button", { name: "Brand", exact: true }).click();
  await expect(page).toHaveURL(/#\/tlps\/brand$/);
  await expect(page.getByRole("heading", { name: "A clear identity for every next step." })).toBeVisible();
  await page.evaluate(() => document.documentElement.style.setProperty("--m-primary", "#123456"));
  const pending = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download brand kit" }).click();
  const download = await pending;
  expect(download.suggestedFilename()).toBe("tlps-in-brand-kit.json");
  const kit = JSON.parse(await readFile((await download.path())!, "utf8"));
  expect(kit.brand.domain).toBe("tlps.in");
  expect(kit.status).toBe("local-preview");
  expect(kit.palette.find((entry: { token: string }) => entry.token === "--m-primary").value).toBe("#123456");
  await expect(page.getByRole("status").filter({ hasText: "Brand kit downloaded" })).toBeVisible();
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  await page.getByRole("button", { name: "Start a TLPS plan" }).click();
  await expect(page).toHaveURL(/#\/tlps\/onboarding$/);
});
