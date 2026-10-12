import { expect, test, type Page } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

test.use({
  viewport: { width: 1280, height: 800 },
  video: { mode: "on", size: { width: 1280, height: 800 } },
});
test.setTimeout(60_000);

const requestedVideoDirectory = process.env.MAATAA_DEMO_VIDEO_OUTPUT_DIR;
const defaultVideoDirectory = path.resolve("test-results/demo-videos");

async function openSurface(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/#/surface", { waitUntil: "domcontentloaded" });
  await expect(page.locator('[data-maataa-demo-ready="true"]')).toBeVisible();
  expect(errors).toEqual([]);
}

async function selectRecord(page: Page, catalog: "Pages" | "Workspaces", id: string) {
  await page.getByRole("button", { name: new RegExp(`^${catalog}`) }).click();
  await page.locator(".surface-search input").fill(id);
  await page.locator(".surface-record code").getByText(id, { exact: true }).click();
}

async function holdPreview(page: Page, selector: string) {
  await page.locator(selector).evaluate((element) => {
    const top = element.getBoundingClientRect().top + window.scrollY - 94;
    window.scrollTo({ top, behavior: "instant" });
  });
  await page.waitForTimeout(1700);
}

async function saveVideo(page: Page, filename: string, projectName: string) {
  const videoDirectory = requestedVideoDirectory
    ? path.resolve(requestedVideoDirectory)
    : path.join(defaultVideoDirectory, projectName);
  await mkdir(videoDirectory, { recursive: true });
  const video = page.video();
  if (!video) throw new Error("Playwright video recording was not enabled for this page");
  await page.close();
  const outputName = requestedVideoDirectory && projectName !== "chromium-desktop"
    ? filename.replace(/\.webm$/, `-${projectName}.webm`)
    : filename;
  await video.saveAs(path.join(videoDirectory, outputName));
}

test("record Pages data-slice demo", async ({ page }, testInfo) => {
  await openSurface(page);
  const canvas = page.locator(".surface-preview-canvas");

  await page.getByRole("button", { name: /^Pages/ }).click();
  const context = page.getByRole("combobox", { name: "Page data context" });

  await context.selectOption("tlps");
  await selectRecord(page, "Pages", "PAGE.PRODUCTION_LOGISTICS.CALL_SHEET");
  await expect(canvas.locator('[data-product-slice="TLPS"]')).toContainText("Call-sheet and rehearsal plan");
  await expect(canvas.locator('[data-product-slice="TLPS"]')).toContainText("Location permission unverified");
  await holdPreview(page, ".surface-preview-canvas");

  await context.selectOption("nevo");
  await selectRecord(page, "Pages", "PAGE.EVENTS.EVENT_DASHBOARD");
  await expect(canvas.locator('[data-product-slice="NEVO"]')).toContainText("Technology Innovation Summit");
  await holdPreview(page, ".surface-preview-canvas");

  await selectRecord(page, "Pages", "PAGE.BOOKING.BOOKING_CONFIRMATION");
  await expect(canvas.locator('[data-product-slice="NEVO"]')).toContainText("No venue or vendor hold");
  await holdPreview(page, ".surface-preview-canvas");

  await selectRecord(page, "Pages", "PAGE.AUTHENTICATION.SIGN_IN");
  await expect(canvas.locator('[data-product-slice-unmapped="NEVO"]')).toContainText("outside the current NEVO pilot data map");
  await holdPreview(page, ".surface-preview-canvas");
  await saveVideo(page, "pages-demo.webm", testInfo.project.name);
});

test("record Workspaces data-slice demo", async ({ page }, testInfo) => {
  await openSurface(page);
  const canvas = page.locator(".surface-preview-canvas");

  await page.getByRole("button", { name: /^Workspaces/ }).click();

  await selectRecord(page, "Workspaces", "WORKSPACE.EQUIPMENT_LOGISTICS.LOGISTICS");
  const tlps = canvas.locator('[data-workspace-id="WORKSPACE.EQUIPMENT_LOGISTICS.LOGISTICS"]');
  await expect(tlps).toContainText("Call-sheet rehearsal");
  await expect(tlps).toContainText("Synthetic fixture");
  await holdPreview(page, '[data-workspace-id="WORKSPACE.EQUIPMENT_LOGISTICS.LOGISTICS"]');

  await selectRecord(page, "Workspaces", "WORKSPACE.EVENT.EVENT");
  const nevo = canvas.locator('[data-workspace-id="WORKSPACE.EVENT.EVENT"]');
  await expect(nevo).toContainText("registration fixture");
  await expect(nevo).toContainText("WS-W");
  await holdPreview(page, '[data-workspace-id="WORKSPACE.EVENT.EVENT"]');

  await selectRecord(page, "Workspaces", "WORKSPACE.AI.AI");
  const ai = canvas.locator('[data-workspace-id="WORKSPACE.AI.AI"]');
  await expect(ai).toContainText("Provider · not connected");
  await expect(ai).toContainText("Synthetic fixture");
  await holdPreview(page, '[data-workspace-id="WORKSPACE.AI.AI"]');

  await selectRecord(page, "Workspaces", "WORKSPACE.PERSONAL_HOME.PERSONAL");
  const personal = canvas.locator('[data-workspace-id="WORKSPACE.PERSONAL_HOME.PERSONAL"]');
  await expect(personal).toContainText("Personal work");
  await expect(personal).toContainText("Synthetic fixture");
  await holdPreview(page, '[data-workspace-id="WORKSPACE.PERSONAL_HOME.PERSONAL"]');
  await saveVideo(page, "workspaces-demo.webm", testInfo.project.name);
});
