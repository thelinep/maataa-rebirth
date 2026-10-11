import { expect, test } from "@playwright/test";
import { sections } from "../../lib/sections";
import { SPACECRAFT_TELEMETRY_SCHEMA, TELEMETRY_UNIX_TIME_SCALE } from "../../lib/spacecraft-telemetry";

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

  test("Mars 2020 SCLK example is method-labelled and bounded", async ({ request }) => {
    const response = await request.get("/api/spacecraft/sclk/mars2020-demo?sclk=0189345666-00000");
    expect(response.ok()).toBeTruthy();
    const converted = await response.json();
    expect(converted.parallel_scale).toBe("TDT");
    expect(converted.tdt_nanoseconds_past_j2000).toBe("189345666000000000");
    expect(converted.verification).toBe("unverified-reference-demonstration");
    expect((await request.get("/api/spacecraft/sclk/mars2020-demo?sclk=1%2F0690471234.12345")).status()).toBe(400);
    expect((await request.get("/api/spacecraft/sclk/mars2020-demo?sclk=4294967295-00000")).status()).toBe(422);
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

test("spacecraft workbench preserves instrument provenance and converts only the supplied timestamp", async ({ page }) => {
  await page.goto("/spacecraft");
  await expect(page.getByRole("table", { name: "Candidate spacecraft instruments" })).toContainText("Star tracker");
  await expect(page.getByRole("table", { name: "Candidate spacecraft instruments" })).toContainText("Radio transponder / range-Doppler link");
  await page.getByRole("button", { name: "Correlate with Rust" }).click();
  await expect(page.getByLabel("Mars 2020 clock correlation result")).toContainText("189345666000000000 ns");
  await expect(page.getByLabel("Mars 2020 clock correlation result")).toContainText("unverified-reference-demonstration");
  await page.getByLabel("Mars 2020 onboard SCLK · SSSSSSSSSS-FFFFF").fill("4294967295-00000");
  await page.getByRole("button", { name: "Correlate with Rust" }).click();
  await expect(page.locator("p.m-error")).toContainText("outside the embedded archival correlation interval");
  await page.getByLabel("Mars 2020 onboard SCLK · SSSSSSSSSS-FFFFF").fill("0189345666-00000");
  await page.getByLabel("HSTS telemetry JSON").fill(JSON.stringify({
    schema: SPACECRAFT_TELEMETRY_SCHEMA,
    vehicle_id: "test-vehicle",
    data_class: "caller-supplied",
    recorded_at: { unix_nanos: "285148740000000000", time_scale: TELEMETRY_UNIX_TIME_SCALE, clock_source: "operator input", clock_calibration: "unknown", clock_uncertainty: "unknown", verification: "unverified" },
    measurements: [{ instrument: "imu-gyro", instrument_id: "imu-1", quantity: "rate_x", value: 0.01, unit: "rad/s", observed_at_unix_nanos: "285148740000000000", time_scale: TELEMETRY_UNIX_TIME_SCALE, frame: "body", uncertainty: "unknown", source: "test input" }],
    navigation_solution: null,
  }));
  await page.getByRole("button", { name: "Validate and convert timestamp" }).click();
  await expect(page.getByRole("heading", { name: "Accepted input · caller-supplied record" })).toBeVisible();
  await expect(page.getByLabel("Hemant time conversion")).toContainText("1979-01-14 07:59:00.000000000 UTC");
  await expect(page.getByRole("table", { name: "Validated spacecraft measurements" })).toContainText("0.01 rad/s");
  await expect(page.getByText(/A separately specified and qualified navigation estimator is required/)).toBeVisible();
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

test("Panchanga comparison keeps alternatives selectable and compares assumptions without inventing outputs", async ({ page }) => {
  await page.goto("/panchanga");
  await expect(page.getByRole("heading", { name: "Compare Panchanga rule profiles" })).toBeVisible();
  await expect(page.getByText("none is preselected as the authority")).toBeVisible();
  const locationSelect = page.locator(".m-compare-fields").getByLabel("Observer location");
  for (const city of ["Delhi", "Chennai", "Kolkata", "Mumbai", "Guwahati", "Leh (elevation/terrain stress case)"]) {
    await expect(locationSelect.locator("option").filter({ hasText: city })).toHaveCount(1);
  }
  const selects = [
    ["Calendar authority / calculation school", "IMD Rashtriya Panchang"],
    ["Zodiac / ayanamsha", "Lahiri / Chitrapaksha"],
    ["Observer location", "Kashi / Varanasi"],
    ["Civil-day assignment", "Local sunrise"],
    ["Month / calendar system", "Amānta lunar months"],
    ["Ayana / seasonal reference", "Tropical solstice (sayana)"],
  ] as const;
  const compareFields = page.locator(".m-compare-fields");
  for (const [label, value] of selects) await compareFields.getByLabel(label).selectOption({ label: value });
  await page.getByRole("button", { name: "Add Track 1 to comparison" }).click();
  await compareFields.getByLabel("Calendar authority / calculation school").selectOption({ label: "Siddhānta-text implementation" });
  await compareFields.getByLabel("Zodiac / ayanamsha").selectOption({ label: "Raman" });
  await compareFields.getByLabel("Observer location").selectOption({ label: "Delhi" });
  await compareFields.getByLabel("Civil-day assignment").selectOption({ label: "Civil midnight" });
  await compareFields.getByLabel("Month / calendar system").selectOption({ label: "Pūrṇimānta lunar months" });
  await compareFields.getByLabel("Ayana / seasonal reference").selectOption({ label: "Sidereal Makara ingress (nirayana)" });
  await page.getByRole("button", { name: "Add Track 2 to comparison" }).click();
  await expect(page.getByRole("table", { name: /Selected rule assumptions/ })).toContainText("IMD Rashtriya Panchang");
  await expect(page.getByRole("table", { name: /Selected rule assumptions/ })).toContainText("Siddhānta-text implementation");
  await expect(page.getByText(/Parallel astronomical\/Panchanga outputs will remain unavailable/)).toBeVisible();
  await page.getByRole("button", { name: "Remove Track 1" }).click();
  await expect(page.getByRole("table", { name: /Selected rule assumptions/ })).not.toContainText("IMD Rashtriya Panchang");
  await page.getByText("Review every candidate and its source notes").click();
  await expect(page.locator(".m-option-catalog").getByText("Compare multiple locations.", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "IMD method notes" })).toHaveAttribute("href", "https://packolkata.imd.gov.in/panchang/en/explanation");
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
