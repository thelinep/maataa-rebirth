import { expect, test, type Page } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve("examples/support-center/public/screenshots");
const temporaryDirectory = path.resolve("/private/tmp/maataa-support-center-shots");
const screens = [
  ["support-home", "/home"],
  ["support-screen-directory", "/screens"],
  ["support-product-map", "/product-map"],
  ["support-package-detail", "/package/actions"],
  ["support-screenshot-gallery", "/screenshots?group=App%20screens"],
  ["support-guides", "/guides"],
  ["support-guide-detail", "/article/start"],
  ["support-faqs", "/faqs"],
  ["support-workspaces", "/workspaces"],
  ["support-workspace-detail", "/workspace/WORKSPACE.TLPS_PRODUCTION.PRODUCTION"],
  ["support-request-form", "/request/describe"],
  ["support-request-review", "/request/review"],
  ["support-saved-handoffs", "/requests"],
] as const;

async function capture(page: Page, id: string) {
  await expect(page.locator("main").first()).toBeVisible();
  await page.waitForTimeout(180);
  const pngPath = path.join(temporaryDirectory, `${id}.png`);
  const webpPath = path.join(outputDirectory, `${id}.webp`);
  await page.screenshot({ path: pngPath, fullPage: false, animations: "disabled" });
  execFileSync("cwebp", ["-quiet", "-q", "82", pngPath, "-o", webpPath]);
  await rm(pngPath, { force: true });
}

test.beforeAll(async () => {
  await mkdir(outputDirectory, { recursive: true });
  await mkdir(temporaryDirectory, { recursive: true });
});

test("capture the complete Support Center screen set at desktop and mobile sizes", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("maataa-support-center-draft-v1", JSON.stringify({
      category: "Product map and catalogues",
      subject: "Package export index question",
      details: "The package area index points to a module I cannot locate. Please review the listed import path and installed package version.",
      workspace: "WORKSPACE.TLPS_PRODUCTION.PRODUCTION",
      email: "",
    }));
  });

  for (const [id, route] of screens) {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`/#${route}`, { waitUntil: "domcontentloaded" });
    await capture(page, id);
  }

  for (const [id, route] of screens) {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/#${route}`, { waitUntil: "domcontentloaded" });
    await capture(page, `responsive-${id}`);
  }
});

test("capture Support Center search, FAQ, and mobile-navigation states", async ({ page }) => {
  await page.goto("/#/home", { waitUntil: "domcontentloaded" });
  await page.getByRole("searchbox", { name: "Search help, FAQs, and workspaces" }).fill("workspace");
  await capture(page, "state-support-search");

  await page.goto("/#/faqs", { waitUntil: "domcontentloaded" });
  await page.locator("details summary").first().click();
  await capture(page, "state-support-faq-expanded");

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#/home", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await capture(page, "state-support-mobile-navigation");
});
