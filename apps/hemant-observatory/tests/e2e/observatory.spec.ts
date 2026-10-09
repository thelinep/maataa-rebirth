import { expect, test } from "@playwright/test";
import { sections } from "../../lib/sections";

test.describe("API contract", () => {
  test("/api/methods and /api/time agree; /api/convert validates input", async ({ request }) => {
    const methods = await (await request.get("/api/methods")).json();
    expect(methods.schema).toBe("hemant.method-registry/1");
    const active = methods.methods.filter((m: { status: string }) => m.status === "active").map((m: { id: string }) => m.id);
    const time = await (await request.get("/api/time")).json();
    expect(time.schema).toBe("hemant.time-result/2");
    expect(time.reading.verification).toBe("unverified");
    for (const id of time.methods_used) expect(active).toContain(id);
    const epoch = await (await request.get("/api/convert?unix_nanos=285148740000000000")).json();
    expect(epoch.civil.utc).toBe("1979-01-14 07:59:00.000000000 UTC");
    expect(epoch.reading.source).toBe("caller-supplied-unix-nanoseconds");
    for (const bad of ["abc", "1e9", "--help", "99999999999999999999999"]) {
      expect((await request.get(`/api/convert?unix_nanos=${encodeURIComponent(bad)}`)).status()).toBe(400);
    }
    expect((await request.get("/api/convert?unix_nanos=0&cmd=ls")).status()).toBe(400);
    expect((await request.get("/api/convert")).status()).toBe(400);
  });
});

test("overview shows the Rust snapshot with source and verification", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText(/host system wall clock · unverified/).first()).toBeVisible();
  await expect(page.getByText("Geometry is illustrative · positions are not computed")).toBeVisible();
});

for (const section of sections) {
  test(`module ${section.slug} renders with status and navigation`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(`/${section.slug}`);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(section.title);
    await expect(page.getByRole("navigation", { name: "Modules" }).getByRole("link", { name: section.title, exact: true })).toHaveAttribute("aria-current", "page");
    await expect(page.getByLabel("Capability status")).toContainText(section.pending === "—" ? "Works now" : "Pending");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    expect(errors).toEqual([]);
  });
}

test("clock converter: valid epoch converts through Rust; invalid input is refused before any request", async ({ page }) => {
  await page.goto("/clock");
  await expect(page.getByTestId("snapshot-age")).toContainText("unverified");
  await page.getByRole("button", { name: "Convert with Rust" }).click();
  await expect(page.getByLabel("Converted instant details")).toContainText("1979-01-14 07:59:00.000000000 UTC");
  await expect(page.getByLabel("Converted instant details")).toContainText("hemant-traditional-units-v1");
  let converts = 0;
  page.on("request", (r) => { if (r.url().includes("/api/convert")) converts += 1; });
  await page.getByLabel("Unix nanoseconds").fill("12; rm -rf /");
  await page.getByRole("button", { name: "Convert with Rust" }).click();
  await expect(page.locator("#convert-error")).toContainText("signed integer");
  expect(converts).toBe(0);
});

test("research page renders exactly the registry served by Rust", async ({ page, request }) => {
  const methods = await (await request.get("/api/methods")).json();
  await page.goto("/research");
  for (const m of methods.methods) await expect(page.getByLabel(`Method ${m.id}`)).toBeVisible();
  await page.getByRole("button", { name: "pending" }).click();
  await expect(page.locator("article.m-method")).toHaveCount(2);
});

test("unavailable Rust shell is shown as unavailable, never replaced by a value", async ({ page }) => {
  await page.route("**/api/time", (route) => route.fulfill({ status: 503, json: { error: "Rust time shell is not built (run cargo build)", verification: "unavailable" } }));
  await page.goto("/clock");
  // Next.js adds an empty route-announcer alert; match ours by its text.
  await expect(page.getByRole("alert").filter({ hasText: "Unavailable: Rust time shell is not built" }).first()).toBeVisible();
});

test("malformed shell output is rejected by the client contract", async ({ page }) => {
  await page.route("**/api/time", (route) => route.fulfill({ json: { schema: "hemant.time-result/2", reading: { verification: "verified" } } }));
  await page.goto("/widgets");
  await expect(page.getByLabel("Hemant clock widget preview")).toContainText("Unavailable");
});

test("pending modules never show computed values", async ({ page }) => {
  await page.goto("/panchanga");
  await expect(page.getByRole("table")).toContainText("pending");
  await page.goto("/observatory");
  await page.getByRole("button", { name: "Request state" }).first().click();
  await expect(page.getByRole("status").filter({ hasText: "NoEphemeris" })).toBeVisible();
  await page.goto("/ratios");
  await expect(page.getByText("No ratio (including any Dixit-Saankhya ratio)")).toBeVisible();
});

test("keyboard: skip link reaches module content", async ({ page }) => {
  await page.goto("/timeline");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to module content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#module-content$/);
  await page.getByRole("button", { name: "user-selected" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".m-timeline li")).toHaveCount(1);
});
