import { test, expect } from "@playwright/test";
import { readFile, mkdir } from "node:fs/promises";
const root = process.env.TLPS_TEST_ACCESS || ".local/tlps-api/test-access";
async function access(name: string) {
  return JSON.parse(await readFile(`${root}/${name}-token.json`, "utf8"))
    .access_token as string;
}
const api = "/api/maataa/v1/tlps";
test("connected project persists, handles stale edits and requires a separate stage reviewer", async ({
  page,
  request,
  browser,
}) => {
  const owner = await access("owner"),
    reviewer = await access("reviewer");
  const project = JSON.parse(await readFile(`${root}/project.json`, "utf8"));
  const pid = project.projectId;
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  async function connect(token: string) {
    await page.goto("/#/tlps/projects");
    await page.getByLabel("Project access token").fill(token);
    await page
      .getByRole("button", { name: "Connect project", exact: true })
      .click();
    await page
      .getByRole("button", { name: project.title, exact: true })
      .click();
    await expect(
      page.getByRole("heading", { name: project.title, exact: true }),
    ).toBeVisible();
  }
  await connect(owner);
  await page
    .getByLabel("Project title", { exact: true })
    .fill("Acceptance project");
  await page
    .getByRole("button", { name: "Save to database", exact: true })
    .click();
  await expect(
    page
      .getByRole("status")
      .filter({ hasText: "Saved to the project database." }),
  ).toBeVisible();
  await page
    .getByRole("navigation", { name: "Project records" })
    .getByRole("button", { name: "Locations", exact: true })
    .click();
  await page
    .getByLabel("Location name", { exact: true })
    .fill("Acceptance location");
  await page.getByLabel("City (optional)", { exact: true }).fill("Mumbai");
  await page
    .getByRole("button", { name: "Save to database", exact: true })
    .click();
  await expect(
    page.getByText("Acceptance location", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Open record", exact: true }).click();
  const list = await request.get(`${api}/projects/${pid}/locations`, {
    headers: { authorization: `Bearer ${owner}` },
  });
  const record = (await list.json()).items[0];
  const changed = await request.put(
    `${api}/projects/${pid}/locations/${record.id}`,
    {
      headers: {
        authorization: `Bearer ${owner}`,
        "if-match": String(record.version),
      },
      data: { data: { name: "Updated elsewhere", city: "Pune" } },
    },
  );
  expect(changed.status()).toBe(200);
  await page
    .getByLabel("Location name", { exact: true })
    .fill("My unsaved draft");
  await page
    .getByRole("button", { name: "Save to database", exact: true })
    .click();
  await expect(page.getByRole("alert")).toContainText("Your draft is kept");
  await expect(page.getByLabel("Location name", { exact: true })).toHaveValue(
    "My unsaved draft",
  );
  await page
    .getByRole("button", { name: "Replace draft with latest record" })
    .click();
  await expect(page.getByLabel("Location name", { exact: true })).toHaveValue(
    "Updated elsewhere",
  );
  await page.reload();
  await expect(page.getByLabel("Project access token")).toBeVisible();
  await expect(page.getByLabel("Project access token")).toHaveValue("");
  expect(
    await page.evaluate(() =>
      Object.values(localStorage).some((v) => v.includes("Updated elsewhere")),
    ),
  ).toBe(false);
  await connect(owner);
  await page
    .getByRole("navigation", { name: "Project records" })
    .getByRole("button", { name: "Locations", exact: true })
    .click();
  await expect(
    page.getByText("Updated elsewhere", { exact: true }),
  ).toBeVisible();
  await page.getByRole("combobox", { name: "Work type", exact: true }).selectOption("ticket");
  await page
    .getByLabel("Title", { exact: true })
    .fill("Acceptance support request");
  await page
    .getByLabel("Description", { exact: true })
    .fill("A persisted project support request.");
  await page
    .getByRole("button", { name: "Save work item", exact: true })
    .click();
  await expect(
    page.getByText("Acceptance support request", { exact: true }),
  ).toBeVisible();
  const reviewContext = await browser.newContext({
    baseURL: "http://127.0.0.1:4184",
  });
  const reviewPage = await reviewContext.newPage();
  await reviewPage.goto("/#/tlps/projects");
  await reviewPage.getByLabel("Project access token").fill(reviewer);
  await reviewPage
    .getByRole("button", { name: "Connect project", exact: true })
    .click();
  await reviewPage
    .getByRole("button", { name: project.title, exact: true })
    .click();
  await expect(
    reviewPage.getByRole("heading", { name: "Add record", exact: true }),
  ).toHaveCount(0);
  await reviewPage
    .getByLabel("Review note", { exact: true })
    .fill("Independent profile version review.");
  await reviewPage
    .getByRole("button", { name: "Approve next stage", exact: true })
    .click();
  await expect(
    reviewPage.getByText("Current stage: story", { exact: false }),
  ).toBeVisible();
  await reviewContext.close();
  await page
    .getByRole("navigation", { name: "Project records" })
    .getByRole("button", { name: "Project profile", exact: true })
    .click();
  await expect(
    page.getByText("Current stage: story", { exact: false }),
  ).toBeVisible();
  await page
    .getByRole("navigation", { name: "Project stages" })
    .getByRole("button", { name: /Release/ })
    .click();
  await expect(
    page.getByText("Current stage: story", { exact: false }),
  ).toBeVisible();
  const downloadPromise = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Export handover", exact: true })
    .click();
  const data = JSON.parse(
    await readFile((await (await downloadPromise).path())!, "utf8"),
  );
  expect(data.project.projectId).toBe(pid);
  expect(data.work).toHaveLength(1);
  expect(data.paymentsEnabled).toBe(false);
  await mkdir(".local/tlps-api/captures", { recursive: true });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `.local/tlps-api/captures/projects-${width}.png`,
      fullPage: true,
    });
  }
  expect(errors).toEqual([]);
  await page.getByRole("button", { name: "Disconnect", exact: true }).click();
  await expect(page.getByLabel("Project access token")).toBeVisible();
  await expect(
    page.getByText("Acceptance support request", { exact: true }),
  ).toHaveCount(0);
});
test("unknown TLPS path renders an explicit not-found page", async ({
  page,
}) => {
  await page.goto("/#/tlps/not-a-real-page");
  await expect(
    page.getByRole("heading", { name: "Page not found", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Open projects", exact: true })
    .click();
  await expect(page.getByLabel("Project access token")).toBeVisible();
});
test("public origin rejects admin routes, traversal and foreign origins", async ({
  request,
}) => {
  for (const path of [
    "/api/maataa/v1/admin/tokens",
    "/.git/config",
    "/missing-file",
  ])
    expect((await request.get(path)).status()).toBe(404);
  expect(
    (
      await request.get("/healthz", {
        headers: { origin: "https://untrusted.invalid" },
      })
    ).status(),
  ).toBe(403);
  expect((await request.get("/api/maataa/v1/tlps/pilot/items")).status()).toBe(
    401,
  );
});
