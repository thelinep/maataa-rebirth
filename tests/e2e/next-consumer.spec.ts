import { expect, test } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";

const exportRoot = path.resolve(".certification/consumer-next/out");
const reviewRoot = path.resolve(".impeccable/review");

test.beforeEach(async ({ page }) => {
  await page.route("http://consumer.local/**", async (route) => {
    const pathname = decodeURIComponent(new URL(route.request().url()).pathname);
    const relative = pathname === "/" ? "index.html" : pathname === "/workflow" || pathname === "/workflow/" ? "workflow.html" : pathname.slice(1);
    const target = path.resolve(exportRoot, relative);
    if (!target.startsWith(`${exportRoot}${path.sep}`)) return route.fulfill({ status: 403, body: "Forbidden" });
    try {
      const body = await fs.readFile(target);
      const ext = path.extname(target);
      const contentType = ext === ".html" ? "text/html" : ext === ".js" ? "text/javascript" : ext === ".css" ? "text/css" : ext === ".svg" ? "image/svg+xml" : "application/octet-stream";
      await route.fulfill({ status: 200, body, contentType });
    } catch {
      await route.fulfill({ status: 404, body: "Not found" });
    }
  });
});

test("packed App Router consumer renders the package theme and NEVO planning slice", async ({ page }) => {
  await page.goto("http://consumer.local/");
  await expect(page.getByRole("heading", { name: "A shared React package for product-specific applications." })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await fs.mkdir(reviewRoot, { recursive: true });
  await page.screenshot({ path: path.join(reviewRoot, `${test.info().project.name === "consumer-mobile" ? "mobile" : "desktop"}.png`), fullPage: true });
  await page.getByRole("button", { name: "Toggle MAATAA theme" }).click();
  await expect.poll(() => page.locator("html").getAttribute("data-maataa-theme")).toBe("dark");

  await page.goto("http://consumer.local/workflow");
  await expect(page.getByRole("heading", { name: "Shape an event plan before handoff." })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByLabel("Sample event").selectOption("collectors");
  await page.getByLabel("Event name").fill("Private gallery preview");
  await page.getByRole("button", { name: /Build operator plan/ }).click();
  await page.getByLabel("Add a local operator note").fill("Review stage access plan");
  await page.getByRole("button", { name: "Add note" }).click();
  await page.getByRole("button", { name: /Review event snapshot/ }).click();
  await expect(page.getByText("Private gallery preview")).toBeVisible();
  await expect(page.getByText("Not created · availability unknown")).toBeVisible();
  await expect(page.getByText(/real handoff requires authenticated tenant access/)).toBeVisible();
  await page.getByRole("button", { name: "Mark local draft reviewed" }).click();
  await expect(page.getByRole("status")).toContainText("No tenant handoff");
  await page.screenshot({ path: path.join(reviewRoot, `workflow-${test.info().project.name === "consumer-mobile" ? "mobile" : "desktop"}.png`), fullPage: true });
});
