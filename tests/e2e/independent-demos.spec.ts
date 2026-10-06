import { expect, test, type Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const demos = [
  { path: "/demo", title: "MAATAA UI Registry Explorer" },
  { path: "/demo/nevo", title: "NEVO Event Command Center" },
  { path: "/demo/nevo/spatial", title: "NEVO Spatial Planning" },
  { path: "/demo/tlps", title: "TLPS Production Workflow" },
  { path: "/demo/ai", title: "AI Evidence Command Center" },
  { path: "/demo/mobile", title: "Mobile Device Preview" },
  { path: "/demo/control-plane", title: "Control Plane Readiness" },
] as const;

async function openDemo(page: Page, path: string) {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(`/#${path}`, { waitUntil: "domcontentloaded" });
  await expect(page.locator('[data-maataa-demo-ready="true"]')).toBeVisible();
  expect(errors).toEqual([]);
}

for (const demo of demos) {
  test(`${demo.path} opens its independent experience`, async ({ page }) => {
    await openDemo(page, demo.path);
    await expect(
      page.getByRole("heading", { name: demo.title, exact: true }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "All demos" })).toBeVisible();
  });
}

test("independent demos complete their local interaction flows", async ({
  page,
}) => {
  await openDemo(page, "/demo");
  await page.getByRole("textbox", { name: "Search registry" }).fill("Button");
  await page
    .getByRole("button", { name: /Button/ })
    .first()
    .click();
  await expect(page.getByText("Import path", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Copy import" }).click();
  await expect(
    page.getByRole("button", { name: "Import copied" }),
  ).toBeVisible();

  await openDemo(page, "/demo/nevo");
  await page.getByRole("button", { name: "Vendors", exact: true }).click();
  const addVendor = page
    .getByRole("button", { name: "Add to local list" })
    .first();
  await addVendor.click();
  await expect(
    page.getByRole("button", { name: "Remove from list" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Overview", exact: true }).click();
  await page.getByRole("checkbox", { name: "Venue notes reviewed" }).check();
  await page.getByRole("checkbox", { name: "Guest plan reviewed" }).check();
  await page
    .getByRole("checkbox", { name: "Production needs reviewed" })
    .check();
  await page.getByRole("button", { name: "Prepare local review" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Review snapshot prepared",
  );

  await openDemo(page, "/demo/nevo/spatial");
  await page.getByRole("button", { name: "Place Welcome zone at A1" }).click();
  await expect(
    page.getByRole("button", { name: "Remove Welcome zone at A1" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Clear layout" }).click();
  await expect(page.getByText("0 blocks placed · local")).toBeVisible();

  await openDemo(page, "/demo/tlps");
  await page.getByLabel("Project title").fill("Independent Demo Production");
  await page.getByLabel("Production city").fill("Mumbai");
  await page.getByLabel("Shoot date").fill("2026-12-12");
  await page.getByRole("button", { name: "Save project and continue" }).click();
  await expect(page.getByRole("heading", { name: "2. Budget" })).toBeVisible();

  await openDemo(page, "/demo/ai");
  await page.getByRole("button", { name: "Run fixture check" }).click();
  await expect(page.getByText("Fixture check complete")).toBeVisible();
  await page.getByRole("checkbox", { name: /evidence-101/ }).check();

  await page.setViewportSize({ width: 390, height: 844 });
  await openDemo(page, "/demo/mobile");
  await page.getByRole("button", { name: "Checks" }).click();
  await page.getByRole("checkbox", { name: "Review call sheet" }).check();
  await expect(page.getByText("1 of 3 checked on this screen.")).toBeVisible();
  await page.getByRole("button", { name: "Updates" }).click();
  const update = page.getByRole("textbox", { name: "Local update" });
  await update.fill("Crew call moved to 09:30");
  await page.getByRole("button", { name: "Save draft" }).click();
  await expect(update).toHaveValue("Crew call moved to 09:30");
  await expect(page.getByRole("status")).toContainText(
    "Draft saved in this screen only",
  );

  await openDemo(page, "/demo/control-plane");
  await page.getByRole("button", { name: "Inspect local demo" }).click();
  await page.getByRole("button", { name: "Review sample" }).first().click();
  await expect(
    page.getByRole("button", { name: "Reviewed" }).first(),
  ).toBeVisible();
});

test("capture independent demo review views", async ({ page }) => {
  const reviewDir = resolve(process.cwd(), ".impeccable/review");
  mkdirSync(reviewDir, { recursive: true });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await openDemo(page, "/demo/nevo/spatial");
  await page.screenshot({
    path: resolve(reviewDir, "desktop.png"),
    fullPage: true,
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await openDemo(page, "/demo/mobile");
  await page.screenshot({
    path: resolve(reviewDir, "mobile.png"),
    fullPage: true,
  });
});
