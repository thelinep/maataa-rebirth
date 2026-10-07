import { expect, test } from "@playwright/test";

test("Branding Studio completes a real local Qwen review and records provenance", async ({ page }) => {
  test.setTimeout(180_000);
  await page.addInitScript(() => localStorage.removeItem("maataa.branding-studio.document.v1"));
  await page.goto("/#/branding-studio", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Branding Studio" })).toBeVisible();

  await page.getByLabel("Include Shared brand thesis · draft in AI context").check();
  await page.getByRole("button", { name: /Review & assign/ }).click();
  await expect(page.getByRole("status").filter({ hasText: /Local Ollama.*ready/ })).toBeVisible({ timeout: 15_000 });
  await page.getByLabel("Model").selectOption("qwen2.5-coder:7b");
  await page.getByLabel("What should Brahmini review?").fill(
    "Rewrite the selected thesis as one concise sentence. Preserve that this is a draft, and do not invent domain facts. Return one content suggestion.",
  );
  await page.getByRole("button", { name: "Generate review suggestions" }).click();
  await expect(page.getByRole("heading", { name: "Review model suggestions" })).toBeVisible({ timeout: 150_000 });
  await expect(page.getByText(/ollama · qwen2\.5-coder:7b/)).toBeVisible();
  await expect(page.getByRole("button", { name: "Accept selected changes" })).toBeVisible();

  await page.getByRole("button", { name: "Accept selected changes" }).click();
  await expect(page.getByText(/Accepted 1 reviewed suggestion/)).toBeVisible();
  const record = await page.evaluate(() => JSON.parse(localStorage.getItem("maataa.branding-studio.document.v1") || "{}"));
  expect(record.acceptedAiChanges).toHaveLength(1);
  expect(record.acceptedAiChanges[0]).toMatchObject({
    provider: "ollama",
    model: "qwen2.5-coder:7b",
    modelDigest: "dae161e27b0e90dd1856c8bb3209201fd6736d8eb66298e75ed87571486f4364",
    changeCount: 1,
  });
  expect(record.acceptedAiChanges[0].promptSha256).toMatch(/^[a-f0-9]{64}$/);
});
