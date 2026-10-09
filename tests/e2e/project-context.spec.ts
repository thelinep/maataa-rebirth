import { expect, test, type Page } from "@playwright/test";

// Same-record handoff: Desktop → MAATAA UI (Brahmini Workbench) → TLPS.
// SYNTHETIC ideas and mocked Brahmini / Tauri bridges only; no model runs.
const TLPS = "http://127.0.0.1:4196";
const UI = `http://127.0.0.1:${Number(process.env.PROJECT_CONTEXT_UI_PORT || 4198)}`; // dedicated MAATAA UI dev server (see playwright.project-context.config.ts)
const DIGEST = "1".repeat(64);
const STORE_KEY = "tlps.idea-to-script.v1";
const SCRIPT = "INT. LIGHTHOUSE - NIGHT\n\nRain hits the glass. ASHA tunes a recorder.\n\nASHA\nEvery storm sounds different.\n\nEXT. CLIFF - DAWN\n\nThe sea is quiet.";
const SCRIPT_B = "INT. ATTIC - DAY\n\nDust in the light. RAVI opens a trunk.\n\nRAVI\nIt was here all along.\n\nEXT. ROOF - DUSK\n\nPigeons settle.";

async function mockBrahmini(page: Page, text = SCRIPT) {
  await page.route("**/api/brahmini/status", (route) => route.fulfill({ json: { providers: [{ id: "ollama", configured: true, models: [{ id: "synthetic-chat:latest", label: "synthetic-chat:latest", digest: DIGEST }] }] } }));
  await page.route("**/api/brahmini/chat", (route) => route.fulfill({ json: { text, modelDigest: DIGEST, promptSha256: "f".repeat(64) } }));
}

/** Creates a synthetic record in TLPS (v1, optionally v2) and returns its ID and raw local store. */
async function makeRecord(page: Page, versions: 1 | 2) {
  await mockBrahmini(page);
  await page.goto(`${TLPS}/?surface=idea-to-script`);
  await page.getByLabel("Project title").fill("Context test (synthetic)");
  await page.getByRole("textbox", { name: "Idea" }).fill("A synthetic idea used only to test project handoff.");
  await page.getByRole("button", { name: "Preview project record" }).click();
  await page.getByRole("button", { name: "Approve and save version 1" }).click();
  await expect(page.getByTestId("its-current-version")).toHaveText("v1");
  if (versions === 2) {
    await page.getByRole("button", { name: "Ask Brahmini for a draft" }).click();
    await page.getByRole("button", { name: "Approve draft as version 2" }).click();
    await expect(page.getByTestId("its-current-version")).toHaveText("v2");
  }
  const id = (await page.getByTestId("its-project-id").textContent())!;
  const raw = (await page.evaluate((key) => localStorage.getItem(key), STORE_KEY))!;
  return { id, raw };
}

const ctx = (id: string, version: number | string) => `project=${encodeURIComponent(id)}&version=${version}`;

test.describe("TLPS honours the project context", () => {
  test("current context: approval creates the next version once and the context follows it", async ({ page }) => {
    const { id } = await makeRecord(page, 1);
    await page.goto(`${TLPS}/?surface=idea-to-script&${ctx(id, 1)}`);
    await expect(page.getByTestId("its-context-id")).toHaveText(id);
    await expect(page.getByTestId("its-context-status")).toContainText("Up to date at v1");
    await expect(page.getByText(/Local prototype: this record lives on this computer only/)).toBeVisible();
    await page.getByRole("button", { name: "Ask Brahmini for a draft" }).click();
    await expect(page.getByLabel("Script draft preview")).toContainText(id);
    await page.getByRole("button", { name: "Approve draft as version 2" }).click();
    await expect(page.getByTestId("its-current-version")).toHaveText("v2");
    await expect(page.getByTestId("its-context-version")).toHaveText("v2");
    expect(new URL(page.url()).searchParams.get("version")).toBe("2");
    expect(new URL(page.url()).searchParams.get("surface")).toBe("idea-to-script");
    // No "start a new project" (which would remove the shared record) while opened on a record.
    await expect(page.getByRole("button", { name: /Start a new Idea → Script project/ })).toHaveCount(0);
  });

  test("stale context: shows the newer version and refuses work until the user continues with it", async ({ page }) => {
    const { id } = await makeRecord(page, 2);
    await page.goto(`${TLPS}/?surface=idea-to-script&${ctx(id, 1)}`);
    await expect(page.getByTestId("its-context-status")).toContainText("Opened at v1, but this record is now at v2");
    await expect(page.getByTestId("its-context-status")).toHaveAttribute("role", "alert");
    await expect(page.getByRole("button", { name: "Ask Brahmini for a draft" })).toBeDisabled();
    await page.getByRole("button", { name: "Continue with v2" }).click();
    await expect(page.getByTestId("its-context-status")).toContainText("Up to date at v2");
    await expect(page.getByRole("button", { name: "Ask Brahmini for a draft" })).toBeEnabled();
  });

  test("invalid ID or unknown record: nothing can be started or written", async ({ page }) => {
    await page.goto(`${TLPS}/?surface=idea-to-script&project=prj:not-valid&version=1`);
    await expect(page.getByTestId("its-context-status")).toContainText("invalid project ID");
    await expect(page.getByLabel("Project title")).toHaveCount(0);
    await page.goto(`${TLPS}/?surface=idea-to-script&${ctx("prj:0f0e0d0c-0b0a-4908-8706-050403020100", 1)}`);
    await expect(page.getByTestId("its-context-status")).toContainText("no readable local copy");
    await expect(page.getByLabel("Project title")).toHaveCount(0);
    expect(await page.evaluate((key) => localStorage.getItem(key), STORE_KEY)).toBeNull();
  });

  test("a write from a window whose base went stale is refused and keeps the newer content", async ({ page, context }) => {
    const { id } = await makeRecord(page, 1);
    const other = await context.newPage();
    await mockBrahmini(other, SCRIPT_B);
    await page.goto(`${TLPS}/?surface=idea-to-script&${ctx(id, 1)}`);
    await other.goto(`${TLPS}/?surface=idea-to-script&${ctx(id, 1)}`);
    await page.getByRole("button", { name: "Ask Brahmini for a draft" }).click();
    await other.getByRole("button", { name: "Ask Brahmini for a draft" }).click();
    await other.getByRole("button", { name: "Approve draft as version 2" }).click();
    await expect(other.getByTestId("its-current-version")).toHaveText("v2");
    const winner = await other.evaluate((key) => localStorage.getItem(key), STORE_KEY);
    await page.getByRole("button", { name: "Approve draft as version 2" }).click();
    await expect(page.getByRole("status").filter({ hasText: "changed in another window" })).toBeVisible();
    expect(await page.evaluate((key) => localStorage.getItem(key), STORE_KEY)).toBe(winner);
    expect(winner).toContain("ATTIC");
  });

  test("return to Desktop outside Tauri reports the boundary", async ({ page }) => {
    const { id } = await makeRecord(page, 1);
    await page.goto(`${TLPS}/?surface=idea-to-script&${ctx(id, 1)}`);
    await page.getByRole("button", { name: "Return to MAATAA Desktop" }).click();
    await expect(page.getByRole("status").filter({ hasText: "not available in this window" })).toBeVisible();
  });
});

test.describe("MAATAA UI (Brahmini Workbench) carries the same record to TLPS", () => {
  async function openUi(page: Page, hash: string, opts: { raw?: string; registryVersion?: number; refuse?: string } = {}) {
    page.on("pageerror", (error) => console.log(`[maataa-ui pageerror] ${error.message}`));
    page.on("console", (message) => { if (message.type() === "error") console.log(`[maataa-ui console.error] ${message.text()}`); });
    await page.route("**/api/brahmini/**", (route) => route.abort());
    await page.addInitScript(({ raw, key, registryVersion, refuse, id }) => {
      if (raw) localStorage.setItem(key, raw);
      const calls: Array<{ command: string; args?: Record<string, unknown> }> = [];
      (window as unknown as { __calls: typeof calls }).__calls = calls;
      if (registryVersion === undefined) return;
      (window as unknown as { __TAURI__: unknown }).__TAURI__ = {
        core: { invoke: async (command: string, args?: Record<string, unknown>) => {
          calls.push({ command, args });
          if (command === "list_workspace_projects") return [{ id, product: "tlps", title: "Synthetic", projectType: "Idea to Script", status: "draft", sample: false, updatedAt: 1, record: { recordId: id, recordVersion: registryVersion, schema: "maataa.project-record/1.0.0" } }];
          if (command === "open_product_window" && refuse) throw new Error(refuse);
          return undefined;
        } },
      };
    }, { raw: opts.raw, key: STORE_KEY, registryVersion: opts.registryVersion, refuse: opts.refuse, id: hash.match(/project=([^&]+)/)?.[1] ? decodeURIComponent(hash.match(/project=([^&]+)/)![1]) : "" });
    await page.goto(`${UI}/#${hash}`);
    // First visit compiles the lazy Workbench in the Vite dev server; allow for it.
    await expect(page.getByTestId("brahmini-workbench")).toBeVisible({ timeout: 45_000 });
  }

  test("valid context: same ID in Desktop list, TLPS record and Brahmini; Continue hands ID + version to TLPS", async ({ browser }) => {
    const maker = await browser.newPage();
    const { id, raw } = await makeRecord(maker, 1);
    const page = await browser.newPage();
    await openUi(page, `/brahmini?${ctx(id, 1)}`, { raw, registryVersion: 1 });
    await expect(page.getByTestId("brahmini-context-id")).toHaveText(id);
    await expect(page.getByTestId("brahmini-context-record")).toHaveText("v1");
    await expect(page.getByTestId("brahmini-context-registry")).toHaveText("v1");
    await expect(page.getByTestId("brahmini-context-status")).toContainText("Up to date at v1");
    await expect(page.getByTestId("brahmini-project-context")).not.toContainText("synthetic idea used only");
    const go = page.getByRole("button", { name: "Continue in TLPS · Idea → Script" });
    await go.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByText(`Opened ${id} at v1 in TLPS`)).toBeVisible();
    const calls = await page.evaluate(() => (window as unknown as { __calls: Array<{ command: string; args?: Record<string, unknown> }> }).__calls);
    expect(calls.filter((call) => call.command === "open_product_window")).toEqual([
      { command: "open_product_window", args: { product: "tlps", recordId: id, recordVersion: 1 } },
    ]);
  });

  test("stale context or Desktop/TLPS mismatch blocks the handoff", async ({ browser }) => {
    const maker = await browser.newPage();
    const { id, raw } = await makeRecord(maker, 2);
    const page = await browser.newPage();
    await openUi(page, `/brahmini?${ctx(id, 1)}`, { raw, registryVersion: 2 });
    await expect(page.getByTestId("brahmini-context-status")).toContainText("now at v2");
    await expect(page.getByTestId("brahmini-context-status")).toHaveAttribute("role", "alert");
    await expect(page.getByRole("button", { name: "Continue in TLPS · Idea → Script" })).toBeDisabled();
    const mismatch = await browser.newPage();
    await openUi(mismatch, `/brahmini?${ctx(id, 2)}`, { raw, registryVersion: 1 });
    await expect(mismatch.getByTestId("brahmini-context-status")).toContainText("Desktop lists v1, but the TLPS record is at v2");
    await expect(mismatch.getByRole("button", { name: "Continue in TLPS · Idea → Script" })).toBeDisabled();
  });

  test("Desktop refusing to open TLPS is shown, not hidden", async ({ browser }) => {
    const maker = await browser.newPage();
    const { id, raw } = await makeRecord(maker, 1);
    const page = await browser.newPage();
    await openUi(page, `/brahmini?${ctx(id, 1)}`, { raw, registryVersion: 1, refuse: "This project is now at v2; v1 is out of date." });
    await page.getByRole("button", { name: "Continue in TLPS · Idea → Script" }).click();
    await expect(page.getByText("This project is now at v2; v1 is out of date.")).toBeVisible();
  });

  test("outside Desktop, without the TLPS record, nothing is handed over", async ({ page }) => {
    await openUi(page, `/brahmini?${ctx("prj:0f0e0d0c-0b0a-4908-8706-050403020100", 1)}`);
    await expect(page.getByTestId("brahmini-context-status")).toContainText("cannot read the TLPS record");
    await expect(page.getByTestId("brahmini-context-registry")).toContainText("not available in this window");
    await expect(page.getByRole("button", { name: "Continue in TLPS · Idea → Script" })).toBeDisabled();
    await page.getByRole("button", { name: "Return to MAATAA Desktop" }).click();
    await expect(page.getByText(/Switch to it yourself; nothing was lost/)).toBeVisible();
  });

  test("invalid ID is refused; Brahmini without a project shows no project panel", async ({ page }) => {
    await openUi(page, "/brahmini?project=prj:bad&version=1");
    await expect(page.getByTestId("brahmini-context-status")).toContainText("project ID in this link is invalid");
    await page.goto(`${UI}/#/brahmini?from=%2F`);
    await expect(page.getByTestId("brahmini-workbench")).toBeVisible({ timeout: 45_000 });
    await expect(page.getByTestId("brahmini-project-context")).toHaveCount(0);
  });
});
