import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";
import path from "node:path";

test("capture Branding Studio desktop and mobile workbench screens", async ({ page }, testInfo) => {
  await page.addInitScript(() => localStorage.removeItem("maataa.branding-studio.document.v1"));
  const mobile = testInfo.project.name.includes("mobile");
  await page.setViewportSize(mobile ? { width: 390, height: 844 } : { width: 1440, height: 1000 });
  await page.goto("/#/branding-studio", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Branding Studio" })).toBeVisible();
  await expect(page.getByRole("region", { name: "Brand strategy whiteboard" })).toBeVisible();
  if (mobile) {
    const boardScroll = page.locator(".branding-board-column");
    const extent = await boardScroll.evaluate(element => ({ content: element.scrollWidth, visible: element.clientWidth }));
    expect(extent.content).toBeGreaterThan(extent.visible);
    await boardScroll.evaluate(element => { element.scrollLeft = 120; });
    await expect.poll(() => boardScroll.evaluate(element => element.scrollLeft)).toBeGreaterThan(0);
    await boardScroll.evaluate(element => { element.scrollLeft = 0; });
  }
  const reviewDirectory = path.resolve(".impeccable/review/branding-studio");
  mkdirSync(reviewDirectory, { recursive: true });
  await page.screenshot({ path: path.join(reviewDirectory, mobile ? "mobile.png" : "desktop.png"), fullPage: true, animations: "disabled" });
});

test("Branding Studio edits, versions, and assigns a local brand draft", async ({ page }) => {
  await page.addInitScript(() => localStorage.removeItem("maataa.branding-studio.document.v1"));
  await page.goto("/#/branding-studio", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Branding Studio" })).toBeVisible();
  await expect(page.getByRole("region", { name: "Brand strategy whiteboard" })).toBeVisible();

  const thesisField = page.getByLabel("Object title");
  await thesisField.fill("Shared identity thesis · reviewed draft");
  await page.getByRole("button", { name: "Undo last board edit" }).click();
  await expect(page.getByLabel("Object title")).toHaveValue("Shared brand thesis · draft");
  await page.getByRole("button", { name: "Redo board edit" }).click();
  await expect(page.getByLabel("Object title")).toHaveValue("Shared identity thesis · reviewed draft");

  await page.getByRole("button", { name: /Theme preview/ }).click();
  await expect(page.getByRole("heading", { name: "Theme Studio handoff" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Primary action" })).toBeVisible();
  await page.getByRole("button", { name: "Open Theme Studio preview" }).click();
  await expect(page).toHaveURL(/#\/theme-studio$/);
  await expect(page.getByRole("heading", { name: "Theme Studio" })).toBeVisible();
  await expect(page.getByRole("status")).toContainText("Brand candidate loaded");

  await page.goto("/#/branding-studio", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: /Review & assign/ }).click();
  await page.getByLabel("Version name").fill("Shared kit review 1");
  await page.getByRole("button", { name: "Save immutable local version" }).click();
  await expect(page.getByText("Shared kit review 1", { exact: true })).toBeVisible();
  await page.getByLabel("Assign draft to TLPS").check();
  await page.getByLabel("Assign draft to NEVO").check();
  await page.getByRole("button", { name: "Create assignment draft for selected products" }).click();
  await expect(page.getByText(/Created local assignment drafts for 2 product/)).toBeVisible();
  await expect(page.getByText("Draft only · no publication").first()).toBeVisible();

  const exportPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export JSON" }).click();
  const download = await exportPromise;
  expect(download.suggestedFilename()).toBe("maataa-branding-project.json");
});

test("AI sends only selected board context and requires review before applying changes", async ({ page }) => {
  let sentBody: { messages?: Array<{ content: string }> } | undefined;
  await page.route("**/api/brahmini/status", route => route.fulfill({ json: { providers: [{ id: "ollama", label: "Local Ollama", configured: true, models: [{ id: "qwen2.5:7b", label: "qwen2.5:7b" }], message: "Local model ready" }] } }));
  await page.route("**/api/brahmini/chat", async route => {
    sentBody = await route.request().postDataJSON();
    const input = sentBody.messages?.[0]?.content ?? "";
    const before = "Describe the shared promise and the audiences each domain serves. Keep domain-specific facts in their own evidence-backed briefs.";
    expect(input).toContain("brand-thesis");
    expect(input).not.toContain("existing-mark");
    await route.fulfill({ json: { text: JSON.stringify({ summary: "A concise draft for review.", suggestions: [{ nodeId: "brand-thesis", field: "content", before, after: "A shared source of reviewed identity and semantic themes for each product.", reason: "Clarifies the relationship between the shared system and its product assignments." }] }), provider: "ollama", model: "qwen2.5:7b", modelDigest: "sha256:qwen-fixture", promptSha256: "prompt-fixture" } });
  });
  await page.addInitScript(() => localStorage.removeItem("maataa.branding-studio.document.v1"));
  await page.goto("/#/branding-studio", { waitUntil: "domcontentloaded" });
  await page.getByLabel("Include Shared brand thesis · draft in AI context").check();
  await page.getByRole("button", { name: /Review & assign/ }).click();
  await page.getByLabel("What should Brahmini review?").fill("Make the thesis concise and clarify the shared-to-domain relationship.");
  await page.getByRole("button", { name: "Generate review suggestions" }).click();
  await expect(page.getByRole("heading", { name: "Review model suggestions" })).toBeVisible();
  await expect(page.getByText("A concise draft for review.")).toBeVisible();
  await expect(page.getByLabel("Object title")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Accept selected changes" })).toBeVisible();
  await page.getByRole("button", { name: "Accept selected changes" }).click();
  await expect(page.getByText(/Accepted 1 reviewed suggestion/)).toBeVisible();
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem("maataa.branding-studio.document.v1") || "{}"));
  expect(saved.acceptedAiChanges).toHaveLength(1);
  expect(saved.acceptedAiChanges[0]).toMatchObject({ provider: "ollama", model: "qwen2.5:7b", modelDigest: "sha256:qwen-fixture", promptSha256: "prompt-fixture", changeCount: 1 });
  expect(saved.nodes.find((node: { id: string }) => node.id === "brand-thesis").content).toBe("A shared source of reviewed identity and semantic themes for each product.");
  expect(sentBody?.messages?.[0]?.content).toContain("User-selected board context");
});
