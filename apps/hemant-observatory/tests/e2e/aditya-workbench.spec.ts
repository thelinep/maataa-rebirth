import { expect, test } from "@playwright/test";

test("Aditya-L1 metadata register uses MAATAA controls and persists browser-local entries", async ({ page }) => {
  await page.goto("/spacecraft");
  await expect(page.getByRole("heading", { name: "Aditya-L1 science data" })).toBeVisible();
  await expect(page.getByRole("link", { name: "PRADAN archive ↗" })).toHaveAttribute("href", "https://pradan.issdc.gov.in/al1");
  await expect(page.getByRole("list", { name: "Aditya-L1 payloads" })).toContainText("Visible Emission Line Coronagraph");

  await page.getByLabel("Archive product ID").fill("ADITYA-DEMO-PRODUCT-001");
  await page.getByLabel("Select Aditya-L1 payload").selectOption("VELC");
  await page.getByLabel("Product level").selectOption("Level 1");
  await page.getByLabel("File format").selectOption("FITS");
  await page.getByLabel("Observation time range as shown by source").fill("source timestamp text — not normalized");
  await page.getByLabel("Archive source or product URL").fill("http://example.org/product");
  await page.getByRole("button", { name: "Save metadata locally" }).click();
  await expect(page.locator("p.aditya-alert")).toContainText("Only HTTPS source links can be saved.");
  await page.getByLabel("Archive source or product URL").fill("https://pradan.issdc.gov.in/al1");
  await page.getByRole("button", { name: "Save metadata locally" }).click();

  const saved = page.getByRole("list", { name: "Registered products" });
  await expect(saved).toContainText("ADITYA-DEMO-PRODUCT-001");
  await expect(saved).toContainText("Time field: Unknown — inspect product metadata");
  await expect(page.getByRole("status")).toContainText("no shared sync");

  await page.reload();
  await expect(page.getByRole("list", { name: "Registered products" })).toContainText("ADITYA-DEMO-PRODUCT-001");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export register JSON" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("hemant-aditya-l1-dataset-register.json");

  await page.getByRole("button", { name: "Remove ADITYA-DEMO-PRODUCT-001" }).click();
  await expect(page.getByText("No products registered yet.")).toBeVisible();
});
