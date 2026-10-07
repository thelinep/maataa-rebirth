import { expect, test, type Page } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve("examples/support-center/public/screenshots");
const temporaryDirectory = path.resolve("/private/tmp/maataa-support-center-shots");

const appScreens = [
  ["app-home", "/", "One UI system"],
  ["app-surface", "/surface", "Full surface"],
  ["app-playground", "/playground", "Playground"],
  ["app-sandbox", "/sandbox", "Sandbox"],
  ["app-demos", "/demos", "Demos"],
  ["app-docs", "/docs", "Documentation"],
  ["app-help", "/help", "Help"],
  ["app-support", "/support", "Support"],
  ["app-theme-studio", "/theme-studio", "Theme Studio"],
  ["app-branding-studio", "/branding-studio", "Branding Studio"],
  ["app-tlps-overview", "/tlps", "TLPS"],
  ["app-tlps-marketing", "/tlps/marketing", "One operating picture"],
  ["app-tlps-onboarding", "/tlps/onboarding", "Set up your TLPS preview"],
  ["app-tlps-workflow", "/tlps-workflow", "Production Workflow"],
  ["app-brahmini", "/brahmini", "Brahmini"],
] as const;

const catalogScreens = [
  ["identities", "Identities"], ["icons", "Icons"], ["components", "Components"],
  ["atoms", "Atomic components"], ["pages", "Pages"], ["workspaces", "Workspaces"],
  ["layouts", "Layouts"], ["devices", "Devices"], ["generators", "Generators"],
  ["tools", "Tools"], ["ai", "AI spaces"], ["registries", "Registries"],
  ["redux", "Redux slices"], ["selectors", "Redux selectors"], ["types", "Type contracts"],
  ["datasets", "Static datasets"], ["scenarios", "Demo scenarios"],
] as const;

const demoScreens = [
  ["demo-ui", "/demo", "MAATAA"], ["demo-nevo", "/demo/nevo", "NEVO"],
  ["demo-spatial", "/demo/nevo/spatial", "Spatial"], ["demo-tlps", "/demo/tlps", "TLPS"],
  ["demo-ai-evidence", "/demo/ai", "AI"], ["demo-mobile", "/demo/mobile", "Mobile"],
  ["demo-control-plane", "/demo/control-plane", "Control"],
] as const;

async function capture(page: Page, id: string) {
  await expect(page.locator("main").first()).toBeVisible();
  await page.waitForTimeout(350);
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

test("capture all main MAATAA application screens", async ({ page }) => {
  for (const [id, route, heading] of appScreens) {
    await page.goto(`/#${route}`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("body")).toContainText(heading, { timeout: 20_000 });
    await capture(page, id);
  }
});

test("capture all 17 Full Surface catalogue tabs", async ({ page }) => {
  await page.goto("/#/surface", { waitUntil: "domcontentloaded" });
  for (const [id, label] of catalogScreens) {
    await page.locator(".catalog-tabs").getByRole("button", { name: new RegExp(`^${label.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")}\\s*\\d*$`) }).click();
    await expect(page.locator(".pane-head strong").first()).toHaveText(label);
    await capture(page, `catalog-${id}`);
  }
});

test("capture all seven independent demo experiences", async ({ page }) => {
  for (const [id, route, heading] of demoScreens) {
    await page.goto(`/#${route}`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("body")).toContainText(heading, { timeout: 20_000 });
    await capture(page, id);
  }
});

test("capture responsive views for every MAATAA application route", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const [id, route, heading] of appScreens) {
    await page.goto(`/#${route}`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("body")).toContainText(heading, { timeout: 20_000 });
    await capture(page, `responsive-${id}`);
  }
});

test("capture TLPS, theme, and component interaction states", async ({ page }) => {
  await page.goto("/#/tlps/onboarding", { waitUntil: "domcontentloaded" });
  await page.getByLabel("Production or event planner").check();
  await capture(page, "state-tlps-onboarding-perspective");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("combobox", { name: "Product area" }).selectOption({ label: "Production planning" });
  await page.getByRole("combobox", { name: "What would help most" }).selectOption({ label: "Map the steps and owners" });
  await page.getByRole("combobox", { name: "What would you like to do next" }).selectOption({ label: "Walk through the production planner" });
  await capture(page, "state-tlps-onboarding-work-area");
  await page.getByRole("button", { name: "Continue" }).click();
  await capture(page, "state-tlps-onboarding-review");

  await page.goto("/#/tlps-workflow", { waitUntil: "domcontentloaded" });
  const workflowSteps = page.getByRole("navigation", { name: "Workflow steps" });
  await workflowSteps.getByRole("button", { name: /Budget/ }).click();
  await capture(page, "state-tlps-workflow-budget");
  await workflowSteps.getByRole("button", { name: /Evidence/ }).click();
  await capture(page, "state-tlps-workflow-evidence");

  await page.goto("/#/playground", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Open dialog" }).click();
  await expect(page.getByRole("dialog", { name: "Keyboard dialog" })).toBeVisible();
  await capture(page, "state-playground-dialog");

  await page.goto("/#/theme-studio", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Colors" }).click();
  await capture(page, "state-theme-studio-colors");

  const thesis = "Describe the shared promise and the audiences each domain serves. Keep domain-specific facts in their own evidence-backed briefs.";
  await page.route("**/api/brahmini/status", route => route.fulfill({ json: { providers: [{ id: "ollama", label: "Local Ollama", configured: true, models: [{ id: "qwen2.5:7b", label: "qwen2.5:7b" }], message: "Screenshot fixture only" }] } }));
  await page.route("**/api/brahmini/chat", route => route.fulfill({ json: { text: JSON.stringify({ summary: "A source-aware shared direction, ready for review.", suggestions: [{ nodeId: "brand-thesis", field: "content", before: thesis, after: "One source-aware identity system with explicit, reviewed product variations.", reason: "Clarifies shared and domain-specific responsibilities." }] }), provider: "ollama", model: "qwen2.5:7b", modelDigest: "fixture-only" } }));
  await page.goto("/#/branding-studio", { waitUntil: "domcontentloaded" });
  await page.getByLabel("Include Shared brand thesis · draft in AI context").check();
  await page.getByRole("button", { name: /Review & assign/ }).click();
  await page.getByLabel("What should Brahmini review?").fill("Clarify the relationship between the shared identity system and product-specific variations.");
  await page.getByRole("button", { name: "Generate review suggestions" }).click();
  await expect(page.getByRole("heading", { name: "Review model suggestions" })).toBeVisible();
  await capture(page, "state-branding-ai-suggestions");
});

test("capture surface examples and verify reusable states across every requested catalogue", async ({ page }) => {
  await page.goto("/#/surface", { waitUntil: "domcontentloaded" });
  const preview = page.locator(".surface-preview-canvas");
  const stateButton = (name: string) => page.getByRole("group", { name: "Preview state" }).getByRole("button", { name });
  await page.locator(".surface-search input").fill("Button");
  await expect(page.locator(".preview-pane-head strong")).toHaveText("Button");

  await expect(preview.locator('[data-surface-state="example"]')).toBeVisible();
  await capture(page, "state-surface-example");
  await stateButton("Skeleton").click();
  await expect(preview.locator('[data-surface-state="loading"]')).toBeVisible();
  await capture(page, "state-surface-skeleton");
  await stateButton("Empty").click();
  await expect(preview.locator('[data-surface-state="empty"]')).toBeVisible();
  await capture(page, "state-surface-empty");
  await stateButton("Error").click();
  await expect(preview.locator('[data-surface-state="error"]')).toBeVisible();
  await capture(page, "state-surface-error");
  await page.getByRole("button", { name: "Retry example" }).click();
  await expect(preview.locator('[data-surface-state="example"]')).toBeVisible();
  await stateButton("Disabled").click();
  await expect(preview.locator('[data-surface-state="disabled"]')).toBeVisible();
  await capture(page, "state-surface-disabled");
  await stateButton("Example").click();
  await expect(preview.locator('[data-surface-state="example"]')).toBeVisible();
  await page.locator(".surface-search input").fill("");

  const catalogTabs = page.locator(".catalog-tabs");
  for (const label of ["Components", "Layouts", "Pages", "Workspaces", "Generators", "AI spaces"]) {
    await catalogTabs.getByRole("button", { name: new RegExp(`^${label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\d*$`) }).click();
    await expect(preview.locator('[data-surface-state="example"]')).toBeVisible();
    await stateButton("Skeleton").click();
    await expect(preview.locator('[data-surface-state="loading"]')).toBeVisible();
    await stateButton("Empty").click();
    await expect(preview.locator('[data-surface-state="empty"]')).toBeVisible();
    await stateButton("Error").click();
    await expect(preview.locator('[data-surface-state="error"]')).toBeVisible();
    await stateButton("Disabled").click();
    await expect(preview.locator('[data-surface-state="disabled"]')).toBeVisible();
  }

  await catalogTabs.getByRole("button", { name: /^Generators\s*\d*$/ }).click();
  await stateButton("Example").click();
  await expect(preview.locator("[data-generator-id]")).toBeVisible();
  await capture(page, "state-surface-generator");
  await catalogTabs.getByRole("button", { name: /^AI spaces\s*\d*$/ }).click();
  await stateButton("Example").click();
  await expect(preview.locator("[data-ai-space-id]")).toBeVisible();
  await capture(page, "state-surface-ai-space");
});
