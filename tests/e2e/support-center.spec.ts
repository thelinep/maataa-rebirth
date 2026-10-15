import { expect, test, type Page } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

test.setTimeout(60_000);

const evidenceDirectory = path.resolve(".impeccable/review");

async function openHome(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/#/home", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "What can we help you find?" })).toBeVisible();
  expect(errors).toEqual([]);
}

async function saveEvidence(page: Page, testInfo: { project: { name: string }; title: string }) {
  await mkdir(evidenceDirectory, { recursive: true });
  const mobile = testInfo.project.name.includes("mobile") || testInfo.project.name.includes("narrow");
  if (testInfo.project.name !== "chromium-desktop" && mobile) {
    const video = page.video();
    if (!video) throw new Error("Playwright video recording was not enabled");
    await page.close();
    return;
  }
  const video = page.video();
  if (!video) throw new Error("Playwright video recording was not enabled");
  await page.close();
  const stem = testInfo.title.includes("canonical workspace")
    ? "workspace-directory"
    : testInfo.title.includes("full landing page")
      ? "support-center-landing-page"
    : testInfo.title.includes("complete support center tour")
      ? "complete-support-center-tour"
    : testInfo.title.includes("validate, review")
      ? "request-handoff"
      : testInfo.title.includes("help search")
        ? "help-and-faq"
        : "navigation-recovery";
  if (!mobile) await video.saveAs(path.join(evidenceDirectory, `${stem}.webm`));
}

test("game resources provide reference pages and keep real checkout unavailable without a provider", async ({ page }) => {
  await page.goto("/#/gaming");
  for (const [name, title] of [["Handbook", "Arcade Quest handbook"], ["Playbook", "Arcade Quest playbook"], ["Guides", "Arcade Quest guides"], ["Payments", "Payments"]]) {
    await page.getByRole("navigation", { name: "Game resources", exact: true }).getByRole("link", { name, exact: true }).click();
    await expect(page.getByRole("heading", { name: title, exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  await expect(page.getByRole("button", { name: "Checkout unavailable" })).toBeDisabled();
  await expect(page.getByRole("status")).toContainText("Awaiting payment provider");
  await page.goto("/#/gaming/missing-resource");
  await expect(page.getByRole("heading", { name: "Guide not found" })).toBeVisible();
});

test("artwork gallery searches every source and opens named frames", async ({ page }) => {
  await page.goto("/#/gaming");
  await page.getByRole("link", { name: "Explore all artwork frames" }).click();
  await expect(page.getByRole("heading", { name: "Arcade Quest artwork" })).toBeVisible();
  await page.getByLabel("Frame source", { exact: true }).selectOption("TLPS");
  await expect(page.getByRole("status")).toContainText("31 frames found");
  await page.getByLabel("Find an artwork frame", { exact: true }).fill("Casting Board");
  await page.getByRole("link", { name: /Casting Board Workspace/ }).click();
  await expect(page.getByTestId("artwork-frame")).toContainText("Casting Board Workspace");
  await expect(page.getByRole("link", { name: "Download this frame" })).toHaveAttribute("href", /workspace-casting-casting-board\.webp$/);
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  await page.goto("/#/artwork/not-a-real-frame");
  await expect(page.getByRole("heading", { name: "Frame not found" })).toBeVisible();
});

test("Game UI Help searches guides and opens the local support handoff", async ({ page }) => {
  await page.goto("/#/home");
  await page.getByRole("link", { name: "Explore Game UI Help and Arcade Quest" }).click();
  await expect(page.getByRole("heading", { name: "Your next quest: a clear answer." })).toBeVisible();
  await expect(page.getByText("6 guides found")).toBeVisible();
  await page.getByLabel("Help topic", { exact: true }).selectOption("Troubleshooting");
  await page.getByLabel("Search Game UI Help", { exact: true }).fill("blank");
  await expect(page.getByText("1 guide found")).toBeVisible();
  await page.getByText("Recover a blank preview", { exact: true }).click();
  await expect(page.getByText(/Refresh the page first:/)).toBeVisible();
  await page.getByLabel("Search Game UI Help", { exact: true }).fill("nonexistent-match-xyz");
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.getByText("6 guides found")).toBeVisible();
  await page.getByText("Is this a playable video game?", { exact: true }).click();
  await expect(page.getByText(/Game mechanics, scores, multiplayer/)).toBeVisible();
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  await page.getByRole("button", { name: "Prepare a support handoff" }).click();
  await expect(page).toHaveURL(/#\/request\/describe/);
});

test("help search, read an article, leave feedback, and browse FAQs", async ({ page }, testInfo) => {
  await openHome(page);
  if (testInfo.project.name === "chromium-desktop") {
    await page.screenshot({ path: path.join(evidenceDirectory, "support-center-desktop.png"), fullPage: true, animations: "disabled" });
  }
  if (testInfo.project.name === "chromium-mobile") {
    await page.screenshot({ path: path.join(evidenceDirectory, "support-center-mobile.png"), fullPage: true, animations: "disabled" });
  }
  await page.getByRole("searchbox", { name: "Search help, FAQs, and workspaces" }).fill("workspace");
  await expect(page.getByRole("link", { name: /Browse the workspace directory/ })).toBeVisible();
  await page.getByRole("link", { name: /Browse the workspace directory/ }).click();
  await expect(page.getByRole("heading", { name: "Browse the workspace directory" })).toBeVisible();
  await page.getByRole("button", { name: "Yes" }).click();
  await expect(page.getByRole("status")).toContainText("Your feedback is recorded on this page");
  if (testInfo.project.name.includes("mobile") || testInfo.project.name.includes("narrow")) await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "FAQs" }).click();
  await expect(page.getByRole("heading", { name: "Frequently asked" })).toBeVisible();
  await page.locator("details").first().locator("summary").click();
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
  await saveEvidence(page, testInfo);
});

test("search and inspect a canonical workspace record", async ({ page }, testInfo) => {
  await openHome(page);
  await page.getByRole("link", { name: /All workspaces/ }).click();
  await expect(page.getByRole("heading", { name: "Workspace directory" })).toBeVisible();
  await expect(page.getByText("616 matching records")).toBeVisible();
  await page.getByRole("button", { name: "Next" }).click();
  await expect(page.getByText("Page 2 of 22")).toBeVisible();
  await page.getByRole("button", { name: "Previous" }).click();
  if (testInfo.project.name === "chromium-desktop") {
    await page.screenshot({ path: path.join(evidenceDirectory, "support-center-workspaces.png"), fullPage: true, animations: "disabled" });
  }
  await page.getByRole("searchbox", { name: "Search workspaces" }).fill("WORKSPACE.EQUIPMENT_LOGISTICS.LOGISTICS");
  await expect(page.getByRole("link", { name: /Logistics Workspace WORKSPACE\.EQUIPMENT_LOGISTICS\.LOGISTICS/ })).toBeVisible();
  await page.getByRole("link", { name: /Logistics Workspace WORKSPACE\.EQUIPMENT_LOGISTICS\.LOGISTICS/ }).click();
  await expect(page.getByRole("heading", { name: "Production Workspace", exact: true })).toBeVisible();
  await expect(page.getByText("WORKSPACE.EQUIPMENT_LOGISTICS.LOGISTICS", { exact: true })).toBeVisible();
  await expect(page.getByText("Registry ordinal")).toBeVisible();
  await expect(page.getByText(/It does not verify that a complete application workflow/)).toBeVisible();
  if (testInfo.project.name === "chromium-desktop") {
    await page.screenshot({ path: path.join(evidenceDirectory, "support-center-workspace-detail.png"), fullPage: true, animations: "disabled" });
  }
  await saveEvidence(page, testInfo);
});

test("home page onboarding guides, workspace family filters, and handoff entry work", async ({ page }) => {
  await openHome(page);
  await expect(page.getByRole("heading", { name: "Start with the essentials" })).toBeVisible();
  await page.getByRole("link", { name: /Start with MAATAA UI.*Read guide/ }).click();
  await expect(page.getByRole("heading", { name: "Start with MAATAA UI" })).toBeVisible();
  await page.goto("/#/home", { waitUntil: "domcontentloaded" });
  const family = page.getByRole("link", { name: /Personal & Home Workspaces.*records/ });
  await expect(family).toBeVisible();
  await family.click();
  await expect(page.getByRole("heading", { name: "Workspace directory" })).toBeVisible();
  await expect(page.getByRole("searchbox", { name: "Search workspaces" })).toHaveValue("Personal & Home Workspaces");
  await expect(page.getByText(/matching records/)).toBeVisible();
  await page.goto("/#/home", { waitUntil: "domcontentloaded" });
  await page.getByRole("searchbox", { name: "Search help, FAQs, and workspaces" }).fill("");
  await page.locator(".sc-handoff-panel").getByRole("button", { name: /Prepare a request/ }).click();
  await expect(page.getByRole("heading", { name: "Describe what happened" })).toBeVisible();
  await expect(page.getByText("No request will be sent.")).toBeVisible();
});

test("screen directory is reachable and links into the documented app screens", async ({ page }, testInfo) => {
  await openHome(page);
  if (testInfo.project.name.includes("mobile") || testInfo.project.name.includes("narrow")) {
    await page.getByRole("button", { name: "Open navigation" }).click();
  }
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Screens", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Application screens" })).toBeVisible();
  await expect(page.locator(".sc-record-total")).toContainText("15");
  if (testInfo.project.name === "chromium-desktop") {
    await page.screenshot({ path: path.join(evidenceDirectory, "support-center-screen-directory.png"), fullPage: true, animations: "disabled" });
  }
  await page.getByRole("link", { name: "Browse guides" }).click();
  await expect(page.getByRole("heading", { name: "Guides" })).toBeVisible();
  await page.goto("/#/screens", { waitUntil: "domcontentloaded" });
  await page.getByRole("link", { name: "Open an example" }).click();
  await expect(page.getByRole("heading", { name: "Production Workspace", exact: true })).toBeVisible();
  await page.goto("/#/screens", { waitUntil: "domcontentloaded" });
  await page.getByRole("link", { name: "Open review screen" }).click();
  await expect(page.getByRole("heading", { name: "Review your handoff" })).toBeVisible();
});

test("product map covers the full package layers and hook library", async ({ page }) => {
  await page.goto("/#/product-map", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "MAATAA UI product map" })).toBeVisible();
  await expect(page.locator(".sc-record-total")).toContainText("50");
  for (const layer of ["Components", "Atomic components", "Layout atoms", "Page atoms", "Workspace atoms", "Registry atoms", "Device atoms", "Generator atoms", "Tool atoms", "AI-space atoms", "Pages", "Workspaces", "Layouts", "Devices", "Generators", "Tools", "AI spaces", "Hooks", "Themes and visual tokens", "Redux slices", "Static datasets", "Demo experiences", "Foundation", "Typography", "Actions", "Forms", "Navigation", "Surfaces", "Feedback", "Data display", "Visualization", "Maps", "Mobile", "Page groups", "Workspace groups", "Layout groups", "Generator groups", "Tool groups", "AI-space groups", "Device groups", "Registry UI", "Composer", "Runtime", "Redux middleware"]) {
    await expect(page.locator(".sc-product-row").filter({ hasText: layer }).first()).toBeVisible();
  }
  const hooks = page.locator(".sc-product-row").filter({ hasText: "Hooks" });
  await expect(hooks).toContainText("useOutsideClick");
  await expect(hooks).toContainText("useScrollBackToTop");
  await page.getByRole("searchbox", { name: "Search product areas" }).fill("Actions");
  await page.getByRole("link", { name: "Open detail" }).click();
  await expect(page.getByRole("heading", { name: "Actions", exact: true })).toBeVisible();
  await expect(page.locator(".sc-package-import code").first()).toHaveText("@maataa/ui/actions");
  await page.getByRole("searchbox", { name: "Search package modules" }).fill("IconButton");
  await expect(page.getByText("@maataa/ui/actions/IconButton", { exact: true })).toBeVisible();
  if (test.info().project.name === "chromium-desktop") {
    await page.screenshot({ path: path.join(evidenceDirectory, "support-center-product-map.png"), fullPage: true, animations: "disabled" });
  }
});

test("screenshot gallery has working catalogue filters and a keyboard-closeable viewer", async ({ page }) => {
  await page.goto("/#/screenshots", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "MAATAA UI screenshots" })).toBeVisible();
  await expect(page.locator(".sc-record-total")).toContainText("108 of 108 captures");
  const sources = await page.locator(".sc-screenshot-card img").evaluateAll(images => images.map(image => (image as HTMLImageElement).src));
  const assetResponses = await Promise.all(sources.map(source => page.request.get(source)));
  expect(assetResponses).toHaveLength(108);
  expect(assetResponses.every(response => response.ok())).toBe(true);
  const group = page.getByRole("combobox", { name: "Show" });
  await group.selectOption("Catalogues");
  await expect(page.locator(".sc-record-total")).toContainText("17 of 108 captures");
  await expect(page.getByRole("heading", { name: "Atomic components" })).toBeVisible();
  await group.selectOption("App screens");
  await expect(page.locator(".sc-record-total")).toContainText("15 of 108 captures");
  await group.selectOption("Support Center");
  await expect(page.locator(".sc-record-total")).toContainText("18 of 108 captures");
  await group.selectOption("Responsive views");
  await expect(page.locator(".sc-record-total")).toContainText("33 of 108 captures");
  await group.selectOption("Interaction states");
  await expect(page.locator(".sc-record-total")).toContainText("18 of 108 captures");
  await group.selectOption("App screens");
  await page.getByRole("button", { name: "Enlarge MAATAA home screenshot" }).click();
  await expect(page.getByRole("dialog", { name: "MAATAA home" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  if (test.info().project.name === "chromium-desktop") {
    await page.screenshot({ path: path.join(evidenceDirectory, "support-center-screenshots.png"), fullPage: true, animations: "disabled" });
  }
});

test("guide category shortcuts and Enter search work", async ({ page }) => {
  await page.goto("/#/guides?category=Appearance", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("combobox", { name: "Topic" })).toHaveValue("Appearance");
  await expect(page.getByRole("link", { name: /Theme, typography, and language/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Use the Playground/ })).toHaveCount(0);
  await page.goto("/#/home", { waitUntil: "domcontentloaded" });
  const search = page.getByRole("searchbox", { name: "Search help, FAQs, and workspaces" });
  await search.fill("fonts");
  await search.press("Enter");
  await expect(page.getByRole("heading", { name: "Theme, typography, and language" })).toBeVisible();
});

test("a filtered FAQ search opens the matching canonical answer", async ({ page }) => {
  await openHome(page);
  await page.getByRole("searchbox", { name: "Search help, FAQs, and workspaces" }).fill("real team");
  const question = "Does the support request go to a real team?";
  const result = page.getByRole("link").filter({ hasText: question });
  await expect(result).toBeVisible();
  await result.click();
  await expect(page.locator("details").filter({ hasText: question })).toHaveAttribute("open", "");
});

test("validate, review, save, export, and remove a local request handoff", async ({ page }, testInfo) => {
  if (testInfo.project.name !== "chromium-desktop") {
    await page.addInitScript(() => {
      Object.defineProperty(Navigator.prototype, "clipboard", { configurable: true, get: () => undefined });
      document.execCommand = () => false;
    });
  } else {
    await page.context().grantPermissions(["clipboard-read"], { origin: "http://127.0.0.1:4178" });
  }
  await openHome(page);
  await page.getByRole("button", { name: /Prepare a request/ }).first().click();
  await expect(page.getByRole("heading", { name: "Describe what happened" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Review handoff" })).toBeDisabled();
  await page.getByLabel("Topic").selectOption("Workspaces and registries");
  await page.getByLabel("Subject").fill("Workspace detail needs clarification");
  await page.getByLabel("What were you trying to do, and what happened?").fill("I searched a canonical workspace ID and need help understanding which behavior is included in this demo.");
  await page.getByLabel("Related workspace or canonical ID").fill("WORKSPACE.EQUIPMENT_LOGISTICS.LOGISTICS");
  await page.getByLabel("Contact email").fill("planner@example.test");
  await expect(page.getByRole("button", { name: "Review handoff" })).toBeEnabled();
  await page.getByRole("button", { name: "Review handoff" }).click();
  await expect(page.getByRole("heading", { name: "Review your handoff" })).toBeVisible();
  await expect(page.getByText("Nothing will be sent.")).toBeVisible();
  await expect(page.getByText("planner@example.test")).toBeVisible();
  await page.getByRole("button", { name: "Back to edit" }).click();
  await expect(page.getByLabel("Subject")).toHaveValue("Workspace detail needs clarification");
  await page.getByRole("button", { name: "Review handoff" }).click();
  await page.getByRole("button", { name: "Save local handoff" }).click();
  await expect(page.getByRole("heading", { name: "Your handoff is ready" })).toBeVisible();
  await expect(page.getByText(/saved on this device\. It has not been sent/)).toBeVisible();
  await page.getByRole("button", { name: "Copy handoff" }).click();
  if (testInfo.project.name !== "chromium-desktop") {
    await expect(page.getByRole("status")).toContainText("Clipboard access was blocked");
  } else {
    await expect(page.getByRole("button", { name: "Copied" })).toBeVisible();
    await expect(page.getByRole("status")).toContainText("Send it through your approved support channel");
    await expect.poll(async () => page.evaluate(() => navigator.clipboard.readText())).toContain("Not transmitted");
  }
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download JSON" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/local-.*-handoff\.json/);
  await page.getByRole("link", { name: "View local handoffs" }).click();
  await expect(page.getByRole("heading", { name: "Workspace detail needs clarification" })).toBeVisible();
  await page.getByRole("button", { name: "Remove" }).click();
  await expect(page.getByRole("heading", { name: "No handoffs saved here" })).toBeVisible();
  await saveEvidence(page, testInfo);
});

test("record complete support center tour across guides, workspaces, and requests", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.includes("mobile") || testInfo.project.name.includes("narrow"), "The dedicated guided recording uses the desktop viewport.");
  await openHome(page);
  await page.waitForTimeout(850);
  await page.getByRole("searchbox", { name: "Search help, FAQs, and workspaces" }).fill("workspace");
  await page.waitForTimeout(600);
  await page.getByRole("link", { name: /Browse the workspace directory/ }).click();
  await page.waitForTimeout(650);
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "FAQs" }).click();
  await page.getByRole("button", { name: "Workspaces and data" }).click();
  await page.locator("#faq-workspaces details").first().locator("summary").click();
  await page.waitForTimeout(650);
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Workspaces" }).click();
  await page.waitForTimeout(650);
  await page.getByRole("searchbox", { name: "Search workspaces" }).fill("WORKSPACE.EQUIPMENT_LOGISTICS.LOGISTICS");
  await page.getByRole("link", { name: /Logistics Workspace WORKSPACE\.EQUIPMENT_LOGISTICS\.LOGISTICS/ }).click();
  await page.waitForTimeout(750);
  await page.getByRole("button", { name: /Prepare a request/ }).click();
  await page.getByLabel("Subject").fill("Question about a workspace record");
  await page.getByLabel("What were you trying to do, and what happened?").fill("I reviewed a canonical workspace record and need guidance on which behavior is included in the current demo.");
  await page.waitForTimeout(550);
  await page.getByRole("button", { name: "Review handoff" }).click();
  await page.waitForTimeout(700);
  await page.getByRole("button", { name: "Save local handoff" }).click();
  await expect(page.getByRole("heading", { name: "Your handoff is ready" })).toBeVisible();
  await page.waitForTimeout(1100);
  await saveEvidence(page, testInfo);
});

test("record full landing page scroll tour with every section", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "The full landing page recording uses the desktop viewport.");
  await openHome(page);
  await page.waitForTimeout(900);
  for (const selector of [".sc-home-start", ".sc-home-workspaces", ".sc-handoff-panel", ".sc-home-columns", ".sc-footer"]) {
    await page.locator(selector).scrollIntoViewIfNeeded();
    await page.waitForTimeout(650);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  await page.waitForTimeout(650);
  await saveEvidence(page, testInfo);
});

test("mobile navigation and unknown-route recovery", async ({ page }, testInfo) => {
  await openHome(page);
  const menu = page.getByRole("button", { name: "Open navigation" });
  if (testInfo.project.name.includes("mobile") || testInfo.project.name.includes("narrow")) {
    await menu.click();
    await expect(page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Screens", exact: true })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Guides" })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "FAQs" })).toBeVisible();
  }
  await page.goto("/#/missing-route", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "We couldn’t find that page" })).toBeVisible();
  await page.getByRole("link", { name: "Go to Help Center" }).click();
  await expect(page.getByRole("heading", { name: "What can we help you find?" })).toBeVisible();
  await saveEvidence(page, testInfo);
});

test("no horizontal overflow across every route at a 320px viewport", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes("narrow"), "Narrow viewport verification runs in its dedicated project.");
  for (const pathName of ["home", "screens", "guides", "faqs", "workspaces", "article/workspaces", "workspace/WORKSPACE.EQUIPMENT_LOGISTICS.LOGISTICS", "request/describe", "request/review", "requests", "missing-route"]) {
    await page.goto(`/#/${pathName}`, { waitUntil: "domcontentloaded" });
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth && document.body.scrollWidth <= window.innerWidth), { message: `horizontal overflow on ${pathName}` }).toBe(true);
  }
});
