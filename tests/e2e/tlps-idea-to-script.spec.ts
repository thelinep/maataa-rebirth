import { expect, test, type Page } from "@playwright/test";

// Mocked tests use SYNTHETIC Brahmini responses (no model runs).
// The LIVE test (BRAHMINI_LIVE=1) uses the real Brahmini runtime + local Ollama.
const live = process.env.BRAHMINI_LIVE === "1";
const DIGEST = "1".repeat(64);
const SCRIPT = "INT. LIGHTHOUSE - NIGHT\n\nRain hits the glass. ASHA tunes a recorder.\n\nASHA\nEvery storm sounds different.\n\nEXT. CLIFF - DAWN\n\nThe sea is quiet.";
const TLPS_PLAN = JSON.stringify({
  schemaVersion: 1,
  project: { title: "Existing synthetic TLPS plan", city: "Dehradun", productionType: "Feature Film", shootDate: "", ceiling: 500000 },
  budget: [],
  crew: [],
  locations: [],
  schedule: [],
  status: "draft",
  approvalNote: "",
  tasks: { setup: false, rehearsal: false, wrap: false },
  evidence: [],
  activity: [],
});

async function mockBrahmini(page: Page, chat: { text?: string; modelDigest?: string; status?: number }) {
  await page.route("**/api/brahmini/status", (route) => route.fulfill({ json: { providers: [{ id: "ollama", configured: true, models: [{ id: "synthetic-chat:latest", label: "synthetic-chat:latest", digest: DIGEST }] }] } }));
  await page.route("**/api/brahmini/chat", async (route) => {
    const body = route.request().postDataJSON();
    expect(body.provider).toBe("ollama");
    expect(body.model).toBe("synthetic-chat:latest");
    expect(body.system).toContain("INT. or EXT.");
    await route.fulfill({ status: chat.status ?? 200, json: chat.status ? { error: "synthetic failure" } : { text: chat.text, modelDigest: chat.modelDigest ?? DIGEST, promptSha256: "f".repeat(64) } });
  });
}

async function captureIdea(page: Page) {
  await page.addInitScript((plan) => { if (!localStorage.getItem("tlps.planning.workspace.v1")) localStorage.setItem("tlps.planning.workspace.v1", plan); }, TLPS_PLAN);
  await page.goto("/");
  await page.getByRole("button", { name: "Idea → Script" }).click();
  await page.getByLabel("Project title").fill("Monsoon Keeper (synthetic)");
  await page.getByRole("textbox", { name: "Idea" }).fill("A lighthouse keeper records the sounds of every monsoon storm.");
  await page.getByRole("button", { name: "Preview project record" }).click();
  await expect(page.getByLabel("Project record preview")).toContainText(/prj:[0-9a-f-]{36}/);
  await page.getByRole("button", { name: "Approve and save version 1" }).click();
  await expect(page.getByTestId("its-current-version")).toHaveText("v1");
  return (await page.getByTestId("its-project-id").textContent())!;
}

test.describe("mocked Brahmini", () => {
  test.skip(live, "mocked suite disabled during the live run");

  test("idea → preview → v1 → Brahmini draft → independent check → v2, same project ID after reload", async ({ page }) => {
    await mockBrahmini(page, { text: SCRIPT });
    const projectId = await captureIdea(page);
    await page.getByRole("button", { name: "Ask Brahmini for a draft" }).click();
    await expect(page.getByTestId("its-check")).toContainText("Passed");
    await expect(page.getByLabel("Script draft preview")).toContainText("Not a production script.");
    await expect(page.getByLabel("Script draft preview")).toContainText("not qualified for scripts");
    await page.getByRole("button", { name: "Approve draft as version 2" }).click();
    await expect(page.getByTestId("its-current-version")).toHaveText("v2");
    await expect(page.getByLabel("Versions")).toContainText("synthetic-chat:latest · chat · unqualified");
    await expect(page.getByLabel("Project activity")).toContainText("#4");
    await page.reload();
    await page.getByRole("button", { name: "Idea → Script" }).click();
    await expect(page.getByTestId("its-project-id")).toHaveText(projectId);
    await expect(page.getByTestId("its-current-version")).toHaveText("v2");
    expect(await page.evaluate(() => localStorage.getItem("tlps.planning.workspace.v1"))).toBe(TLPS_PLAN);
    const record = await page.evaluate(() => localStorage.getItem("tlps.idea-to-script.v1"));
    expect(JSON.parse(record!).record).not.toHaveProperty("contents");
    expect(JSON.stringify(JSON.parse(record!).record)).not.toContain("LIGHTHOUSE");
  });

  test("a draft that fails the format check cannot be approved", async ({ page }) => {
    await mockBrahmini(page, { text: "Here is a nice story about a lighthouse keeper." });
    await captureIdea(page);
    await page.getByRole("button", { name: "Ask Brahmini for a draft" }).click();
    await expect(page.getByTestId("its-check")).toContainText("Failed");
    await expect(page.getByRole("button", { name: "Approve draft as version 2" })).toBeDisabled();
    await expect(page.getByTestId("its-current-version")).toHaveText("v1");
  });

  test("an answer from a different model digest is refused and nothing is recorded", async ({ page }) => {
    await mockBrahmini(page, { text: SCRIPT, modelDigest: "2".repeat(64) });
    await captureIdea(page);
    await page.getByRole("button", { name: "Ask Brahmini for a draft" }).click();
    await expect(page.getByRole("status")).toContainText("does not match the selected model");
    await expect(page.getByLabel("Script draft preview")).toHaveCount(0);
  });

  test("Brahmini unreachable is reported honestly", async ({ page }) => {
    await page.route("**/api/brahmini/**", (route) => route.abort());
    await captureIdea(page);
    await expect(page.getByRole("alert")).toContainText("Brahmini runtime is not reachable");
  });
});

test("LIVE: real Brahmini runtime + local Ollama model drafts a script", async ({ page }) => {
  test.skip(!live, "set BRAHMINI_LIVE=1 with Ollama running to run against a real model");
  await captureIdea(page);
  const select = page.getByLabel("Local model");
  await expect(select).toBeEnabled({ timeout: 15_000 });
  const preferred = process.env.BRAHMINI_LIVE_MODEL;
  if (preferred) await select.selectOption(preferred);
  console.log(`LIVE_MODEL ${await select.inputValue()}`);
  await page.getByRole("button", { name: "Ask Brahmini for a draft" }).click();
  await expect(page.getByTestId("its-check")).toBeVisible({ timeout: 280_000 });
  const check = await page.getByTestId("its-check").textContent();
  console.log(`LIVE_CHECK ${check}`);
  console.log(`LIVE_DRAFT_START\n${(await page.getByLabel("Draft (read-only)").inputValue()).slice(0, 1500)}\nLIVE_DRAFT_END`);
  if (check?.startsWith("Passed")) {
    await page.getByRole("button", { name: /Approve draft as version 2/ }).click();
    await expect(page.getByTestId("its-current-version")).toHaveText("v2");
    console.log("LIVE_RESULT approved as v2");
  } else {
    await expect(page.getByRole("button", { name: /Approve draft as version 2/ })).toBeDisabled();
    console.log("LIVE_RESULT draft failed the independent format check; approval blocked");
  }
});
