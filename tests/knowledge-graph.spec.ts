import { expect, test } from "@playwright/test";

test("searches the full map and shows current Tauri trial evidence", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "MAATAA ecosystem mind map" })).toBeVisible();
  await expect(page.locator("#stats")).toContainText("80 visible of 80 nodes");
  await page.getByRole("searchbox", { name: /Search the knowledge graph/ }).fill("Tauri WebKit");
  const trial = page.locator('.node[data-id="tauri-trial"]');
  await expect(trial).toBeVisible();
  await trial.click();
  await expect(page.locator("#selected")).toContainText("separate Rust/Tauri host prototype");
  await expect(page.locator("#edges")).toContainText("same window");
});

test("shows the passed native WebKit smoke test as current evidence", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Current evidence", exact: true }).click();
  const smokeTest = page.locator('.node[data-id="tauri-native-smoke"]');
  await expect(smokeTest).toBeVisible();
  await smokeTest.click();
  await expect(page.locator("#selected")).toContainText("The foreground macOS app loaded example.com");
});
