import { expect, test } from "@playwright/test";
test("one desktop shell switches between the packaged MAATAA UI and Support Center", async ({ page }) => {
  await page.goto("/");
  const maataa = page.frameLocator('iframe[title="MAATAA UI"]');
  const support = page.frameLocator('iframe[title="Support Center"]');

  await expect(page.getByRole("button", { name: "MAATAA UI" })).toHaveAttribute("aria-pressed", "true");
  await expect(maataa.getByText("One UI system", { exact: false })).toBeVisible();

  await page.getByRole("button", { name: "Support Center" }).click();
  await expect(page.getByRole("button", { name: "Support Center" })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("status")).toHaveText("Help and product reference");
  await expect(support.getByRole("heading", { name: "What can we help you find?" })).toBeVisible();

  await page.keyboard.press("Meta+1");
  await expect(page.getByRole("button", { name: "MAATAA UI" })).toHaveAttribute("aria-pressed", "true");
  await expect(maataa.getByText("One UI system", { exact: false })).toBeVisible();
});

test("the desktop loopback server only exposes the two bundled apps", async ({ request }) => {
  const product = await request.get("/maataa/index.html");
  const help = await request.get("/support/index.html");
  const outside = await request.get("/package.json");
  const mutation = await request.post("/");

  expect(product.ok()).toBe(true);
  expect(help.ok()).toBe(true);
  expect(outside.status()).toBe(404);
  expect(mutation.status()).toBe(405);
});
