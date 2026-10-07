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
  ["support-guide-detail", "/article/surface-states"],
  ["support-branding-guide", "/article/branding-studio"],
  ["support-faqs", "/faqs"],
  ["support-workspaces", "/workspaces"],
  ["support-workspace-slices", "/workspace-slices"],
  ["support-workspace-slice-tlps", "/workspace-slice/WORKSPACE.TLPS_PRODUCTION.PRODUCTION"],
  ["support-workspace-slice-nevo", "/workspace-slice/WORKSPACE.EVENT.EVENT"],
  ["support-workspace-slices-guide", "/article/workspace-slices"],
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

test("show all specimen screenshots in the Support Center guide and open one", async ({ page }) => {
  await page.goto("/#/article/surface-states", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Examples, skeletons, and interface states" })).toBeVisible();
  const screenshots = page.locator(".sc-article-screenshot-grid img");
  await expect(screenshots).toHaveCount(10);
  for (const image of await screenshots.all()) {
    await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
  await capture(page, "support-guide-detail");
  await page.getByRole("button", { name: "Enlarge Full Surface · disabled treatment" }).click();
  await expect(page.getByRole("dialog", { name: "Full Surface · disabled treatment" })).toBeVisible();
});

test("Branding Studio guide links its screens and documents the provider and approval boundaries", async ({ page }) => {
  await page.goto("/#/article/branding-studio", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Build a reviewable brand and theme draft" })).toBeVisible();
  await expect(page.getByText(/Only the selected objects and your prompt are sent/)).toBeVisible();
  await expect(page.getByText(/do not approve a brand, publish a domain, or deploy an application/)).toBeVisible();
  const screenshots = page.locator(".sc-article-screenshot-grid img");
  await expect(screenshots).toHaveCount(2);
  for (const image of await screenshots.all()) {
    await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
  await expect(page.getByRole("link", { name: "Open Branding Studio" })).toHaveAttribute("href", "http://127.0.0.1:4173/#/branding-studio");
  await page.getByRole("button", { name: "Enlarge Branding Studio", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Branding Studio" })).toBeVisible();
});

test("workspace slice directory and TLPS/NEVO guide expose real fixture details", async ({ page }) => {
  const fixtureResponse = await page.request.get("/data/workspace-data-slices.json");
  expect(fixtureResponse.ok()).toBe(true);
  const fixture = await fixtureResponse.json() as { workspaces: Array<{ workspace: { id: string }; slice: { provenance: string } }> };
  expect(fixture.workspaces).toHaveLength(647);
  expect(fixture.workspaces.find(item => item.workspace.id === "WORKSPACE.TLPS_PRODUCTION.PRODUCTION")?.slice.provenance).toBe("Synthetic fixture");
  expect(fixture.workspaces.find(item => item.workspace.id === "WORKSPACE.EVENT.EVENT")?.slice.provenance).toBe("Synthetic fixture");

  await page.goto("/#/workspace-slices", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Workspace data slices" })).toBeVisible();
  await expect(page.getByText("647", { exact: false }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Production Workspace/ })).toBeVisible();
  await page.getByRole("searchbox", { name: "Search workspace data slices" }).fill("WORKSPACE.EVENT.EVENT");
  const eventSliceLink = page.locator('a[href="#/workspace-slice/WORKSPACE.EVENT.EVENT"]').last();
  await expect(eventSliceLink).toBeVisible();
  await eventSliceLink.click();
  await expect(page.getByRole("heading", { name: "Event Workspace data slice" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "We couldn’t find that page" })).toHaveCount(0);
  await expect(page.getByText("Synthetic event fixture", { exact: false })).toBeVisible();

  await page.goto("/#/workspace-slice/WORKSPACE.TLPS_PRODUCTION.PRODUCTION", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Production Workspace data slice" })).toBeVisible();
  await expect(page.getByText("Synthetic production slice", { exact: false })).toBeVisible();

  await page.goto("/#/article/workspace-slices", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Workspace data slices" })).toBeVisible();
  const screenshots = page.locator(".sc-article-screenshot-grid img");
  await expect(screenshots).toHaveCount(3);
  for (const image of await screenshots.all()) {
    await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
  await page.getByRole("link", { name: "Browse all workspace slices" }).click();
  await expect(page).toHaveURL(/#\/workspace-slices$/);
});
