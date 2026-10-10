import { expect, test } from "@playwright/test";
import { enterpriseRoadmap } from "../../lib/enterprise-roadmap";

test("enterprise roadmap renders every canonical task and keeps user-input gates visible", async ({ page }) => {
  await page.goto("/roadmap");
  await expect(page.getByRole("heading", { name: "From observatory prototype to enterprise pilot." })).toBeVisible();
  await expect(page.getByText("tasks currently in Evidence-backed")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Deferred until product is built" })).toBeVisible();
  await expect(page.getByText("Buyer selection, customer discovery, commercial packaging and customer pilot/release acceptance are deferred until the technical product is built.")).toBeVisible();
  const deferredIds = ["B-03", "D-01", "D-02", "D-03", "D-04", "D-05", "D-06", "O-05", "G-03", "C-01", "C-02", "C-03", "C-04", "R-01", "R-02", "R-03"];
  for (const id of deferredIds) {
    await expect(page.locator(`[data-roadmap-task="${id}"]`)).toHaveCount(1);
    await expect(page.getByLabel(`Move ${id}`)).toHaveValue("deferred");
  }
  for (const id of ["O-01", "O-02", "G-01"]) {
    await expect(page.getByLabel(`Move ${id}`)).toHaveValue("blocked");
  }
  await expect(page.getByLabel("Move S-13")).toHaveValue("done");
  await expect(page.getByLabel("Move S-10")).toHaveValue("done");
  await expect(page.getByLabel("Move S-14")).toHaveValue("blocked");
  const scienceBlocker = page.locator("[data-roadmap-task='S-14']");
  await scienceBlocker.locator("summary").click();
  await expect(scienceBlocker.getByText(/written ISRO\/DoS permission/)).toBeVisible();
  await expect(page.getByLabel("Move P-02")).toHaveValue("in-progress");
  await expect(page.getByLabel("Move B-04")).toHaveValue("in-progress");
  const buyerGate = page.locator("details.roadmap-task").filter({ hasText: "Freeze one paid-pilot product boundary" });
  await buyerGate.locator("summary").click();
  await expect(buyerGate.getByText(/After the technical product baseline is built, choose the first buyer\/use case and pilot owner\./)).toBeVisible();
  await page.getByLabel("Filter by phase").selectOption({ label: "Scientific qualification" });
  const missionGate = page.locator("details.roadmap-task").filter({ hasText: "Expand spacecraft SCLK adapter" });
  await missionGate.locator("summary").click();
  await expect(missionGate.getByText(/Choose a mission and provide\/approve the operational or archival kernel source/)).toBeVisible();
  await expect(page.getByRole("link", { name: "Open the full atomic checklist" })).toBeVisible();
  await expect(page.getByText("This browser only · localStorage")).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("roadmap progress persists locally and closing a task requires evidence", async ({ page }) => {
  await page.goto("/roadmap");
  await page.getByLabel("Filter by phase").selectOption({ label: "Baseline & product truth" });
  const card = page.locator("details.roadmap-task").filter({ hasText: "Create a repeatable release baseline" });
  await card.locator("summary").click();
  const status = card.getByLabel("Move B-04");
  await status.selectOption("in-progress");
  await expect(page.getByRole("status")).toContainText("Saved in this browser");
  await page.reload();
  await page.getByLabel("Filter by phase").selectOption({ label: "Baseline & product truth" });
  const restored = page.locator("details.roadmap-task").filter({ hasText: "Create a repeatable release baseline" });
  await restored.locator("summary").click();
  await expect(restored.getByLabel("Move B-04")).toHaveValue("in-progress");
  await restored.getByLabel("Evidence note or link").fill("Release baseline evidence rehearsal for the browser board.");
  await restored.getByLabel("Move B-04").selectOption("done");
  await restored.locator("summary").click();
  await expect(restored.getByText("Board owner supplied this evidence note; it has not been independently verified.")).toBeVisible();
});

test("legacy browser board advances evidence-backed MAG import and defers customer work without losing notes", async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem("hemant-enterprise-roadmap.v1", JSON.stringify({
      "D-03": { status: "done", evidence: "Old customer discovery note" },
      "S-13": { status: "blocked", evidence: "Need sample and product guide" },
    }));
  });
  await page.goto("/roadmap");
  await expect(page.getByLabel("Move D-03")).toHaveValue("deferred");
  await expect(page.getByLabel("Move S-13")).toHaveValue("done");
  const magTask = page.locator("[data-roadmap-task='S-13']");
  await magTask.locator("summary").click();
  await expect(magTask.getByLabel("Evidence note or link")).toHaveValue(/actual sample plus valid\/malformed\/unsupported desktop\/mobile E2E passed/);
  const buyerTask = page.locator("[data-roadmap-task='D-03']");
  await buyerTask.locator("summary").click();
  await expect(buyerTask.getByLabel("Evidence note or link")).toHaveValue("Old customer discovery note");
  await page.reload();
  await expect(page.getByLabel("Move D-03")).toHaveValue("deferred");
});

test("current browser board migrates canonical task statuses and evidence", async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem("hemant-enterprise-roadmap.v2", JSON.stringify({
      "S-13": { status: "in-progress", evidence: "Importer done; awaiting unrelated validation" },
      "S-10": { status: "ready", evidence: "Old navigation state" },
      "S-14": { status: "ready", evidence: "" },
      "P-02": { status: "blocked", evidence: "Old stale threat-model state" },
      "B-04": { status: "ready", evidence: "Old stale release-check state" },
    }));
  });
  await page.goto("/roadmap");
  await expect(page.getByLabel("Move S-13")).toHaveValue("done");
  await expect(page.getByLabel("Move S-10")).toHaveValue("done");
  await expect(page.getByLabel("Move S-14")).toHaveValue("blocked");
  await expect(page.getByLabel("Move P-02")).toHaveValue("in-progress");
  await expect(page.getByLabel("Move B-04")).toHaveValue("in-progress");
});

test("full checklist exposes atomic tasks, acceptance gates and dependencies", async ({ page }) => {
  await page.goto("/roadmap/plan");
  await expect(page.getByRole("heading", { name: "Enterprise delivery checklist" })).toBeVisible();
  await expect(page.getByText(new RegExp(`${enterpriseRoadmap.length} ATOMIC TASKS`))).toBeVisible();
  await expect(page.getByText("Choose deployment topology")).toBeVisible();
  await expect(page.getByText("A prospect-reviewed pilot statement of work and acceptance checklist exist.")).toBeVisible();
  await expect(page.locator(".plan-task")).toHaveCount(enterpriseRoadmap.length);
});
