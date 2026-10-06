import { test, expect, type Page } from "@playwright/test";

const routes = [
  ["/", "One UI system for every MAATAA surface."],
  ["/surface", "Live MAATAA UI explorer"],
  ["/playground", "Interact with the real UI package"],
  ["/sandbox", "Compose real package components"],
  ["/demos", "Deterministic Redux scenario hub"],
  ["/docs", "MAATAA UI package guide"],
  ["/help", "Find answers quickly"],
  ["/support", "MAATAA UI support center"],
] as const;

async function openReadySurface(page: Page, route: string) {
  const pageErrors: string[] = [];
  const consoleErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  await page.goto(`/#${route}`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() =>
    Boolean(document.querySelector('[data-maataa-demo-ready="true"], [data-maataa-demo-bootstrap-error="true"]')),
    undefined,
    { timeout: 10_000 },
  );
  const bootstrapError = page.locator('[data-maataa-demo-bootstrap-error="true"]');
  if (await bootstrapError.count()) {
    const text = await bootstrapError.innerText();
    throw new Error(`MAATAA bootstrap error while opening ${route}:
${text}
pageErrors=${JSON.stringify(pageErrors)}
consoleErrors=${JSON.stringify(consoleErrors)}`);
  }
  await expect(page.locator('[data-maataa-demo-ready="true"]')).toBeVisible();
  expect(pageErrors, `runtime page errors while opening ${route}`).toEqual([]);
  expect(consoleErrors, `console errors while opening ${route}`).toEqual([]);
}

for (const [route, text] of routes) {
  test(`${route} renders`, async ({ page }) => {
    await openReadySurface(page, route);
    await expect(page.getByText(text, { exact: false }).first()).toBeVisible({ timeout: 10_000 });
    await expect(page.locator("body")).not.toContainText("Actual preview unavailable");
  });
}

test("sandbox supports composer interaction", async ({ page }) => {
  await openReadySurface(page, "/sandbox");
  await expect(page.getByText("Compose real package components", { exact:false })).toBeVisible();
  await expect(page.getByRole("button", { name: /undo/i }).first()).toBeVisible();
});

test("Redux scenarios set and clear generator, tool, and AI-space selections", async ({ page }) => {
  await openReadySurface(page, "/demos");
  const composition = page.locator(".demo-card").filter({ has: page.getByRole("heading", { name: "Active composition", exact: true }) });
  const scenario = (name: string) => page.getByRole("button", { name: new RegExp(name) });

  await scenario("TLPS Production").click();
  await expect(composition).toContainText("GENERATOR.CALL_SHEET_GENERATOR");
  await expect(composition).toContainText("ToolNone");
  await expect(composition).toContainText("AI spaceNone");

  await scenario("AI Evidence Command Center").click();
  await expect(composition).toContainText("GeneratorNone");
  await expect(composition).toContainText("ToolNone");
  await expect(composition).toContainText("AI_SPACE.AI_COMMAND_CENTER");

  await scenario("Control Plane Readiness").click();
  await expect(composition).toContainText("GeneratorNone");
  await expect(composition).toContainText("ToolNone");
  await expect(composition).toContainText("AI spaceNone");
});

test("composer searches the complete catalogue and preserves unverified choices", async ({page}) => {
  await openReadySurface(page,"/sandbox");
  const pagePicker=page.getByRole("combobox",{name:"Page",exact:true});
  await pagePicker.fill("PAGE.EVENTS.EVENT_DASHBOARD");
  await expect(page.getByRole("option",{name:/Event Dashboard/})).toBeVisible();
  await pagePicker.press("Enter");
  await expect(page.getByRole("status",{name:"Composition status"})).toHaveText("unverified");
  await expect(page.getByRole("button",{name:"Undo",exact:true})).toBeEnabled();
  await page.getByRole("button",{name:"Undo",exact:true}).click();
  await expect(page.getByRole("status",{name:"Composition status"})).toHaveText("verified");
});

test("selected canonical layout executes in responsive preview",async({page})=>{
  await openReadySurface(page,"/sandbox");
  const picker=page.getByRole("combobox",{name:"Layout",exact:true});
  await picker.fill("LAYOUT.BASIC_CONTENT.SINGLECOLUMN");
  await picker.press("Enter");
  await page.getByRole("button",{name:"Responsive preview",exact:true}).click();
  await expect(page.locator('[data-layout-name="SingleColumn"]')).toHaveCount(2);
  await expect(page.locator('[data-layout-region="main"]').first()).toContainText("Primary action");
});

test("phone composition responds to its container in a desktop viewport",async({page})=>{
  await page.setViewportSize({width:1440,height:1000});
  await openReadySurface(page,"/sandbox");
  await page.getByRole("button",{name:"Responsive preview",exact:true}).click();
  const phone=page.locator('.m-responsive-runtime[data-device-id="DEVICE.PHONES.SMARTPHONE"]');
  await expect(phone.locator('[data-layout-name]')).toBeVisible();
  const columns=await phone.locator('[data-layout-name]').evaluate(element=>getComputedStyle(element).gridTemplateColumns.trim().split(/\s+/).length);
  expect(columns).toBe(1);
  await expect(phone.locator('[data-composition-status]')).toHaveAttribute("data-composition-status","unverified");
});

test("critical primitives support keyboard focus and selection",async({page})=>{
 await openReadySurface(page,"/playground");
 const trigger=page.getByRole("button",{name:"Open dialog",exact:true});await trigger.click();
 const dialog=page.getByRole("dialog",{name:"Keyboard dialog"});const close=dialog.getByRole("button",{name:"Close",exact:true});
 await expect(close).toBeFocused();await page.keyboard.press("Shift+Tab");await expect(dialog.getByRole("button",{name:"Done"})).toBeFocused();
 await page.keyboard.press("Tab");await expect(close).toBeFocused();await page.keyboard.press("Escape");await expect(trigger).toBeFocused();await expect(dialog).toHaveCount(0);
 const overview=page.getByRole("tab",{name:"Overview",exact:true});await overview.focus();await page.keyboard.press("ArrowRight");await expect(page.getByRole("tab",{name:"Evidence",exact:true})).toBeFocused();
 await page.keyboard.press("Home");await expect(overview).toBeFocused();
 const combo=page.getByRole("combobox",{name:"First choice"});await combo.click();await combo.press("ArrowDown");await combo.press("Enter");await expect(combo).toHaveValue("Two");await expect(combo).toHaveAttribute("aria-expanded","false");
 await page.getByRole("button",{name:"Open drawer",exact:true}).click();await expect(page.getByRole("dialog",{name:"Keyboard drawer"})).toBeVisible();await page.keyboard.press("Escape");await expect(page.getByRole("button",{name:"Open drawer",exact:true})).toBeFocused();
});

test("JSON and planner boundary refuses malformed scenes without replacing state",async({page})=>{
 await openReadySurface(page,"/sandbox");await page.getByRole("button",{name:"Scene JSON",exact:true}).click();
 const editor=page.getByRole("textbox",{name:"Composition JSON"});await editor.fill('{"blocks":null}');await page.getByRole("button",{name:"Apply JSON",exact:true}).click();
 await expect(page.locator('.sandbox-error')).toContainText("must be a string");await page.getByRole("button",{name:"Composer",exact:true}).click();await expect(page.getByRole("status",{name:"Composition status"})).toHaveText("verified");
});

test("page selection renders distinct synthetic specimens", async ({ page }) => {
  await openReadySurface(page, "/surface");
  await page.getByRole("button", { name: /^Pages/ }).click();
  const canvas = page.locator(".surface-preview-canvas");
  const specimens = [
    ["PAGE.MARKETING_CORPORATE.LANDING", "Landing Page", "P01-001"],
    ["PAGE.DASHBOARD_OVERVIEW.DASHBOARD", "Dashboard Page", "P07-"],
    ["PAGE.EVENTS.EVENT_DASHBOARD", "Event Dashboard Page", "P29-387"],
  ];
  for (const [id, heading, reference] of specimens) {
    await page.locator(".surface-search input").fill(id);
    await page.getByRole("button", { name: id }).click();
    await expect(canvas).toContainText("SYNTHETIC PAGE SPECIMEN");
    await expect(canvas.getByRole("heading", { name: heading, exact: true })).toBeVisible();
    await expect(canvas.locator("[data-page-id]")).toHaveAttribute("data-page-id", id);
    await expect(canvas.locator(".page-specimen-section")).toHaveCount(3);
    await expect(canvas).toContainText(reference);
    await expect(canvas).not.toContainText("Shared specimen · not record-specific");
    await expect(canvas).not.toContainText("verified");
  }
  await page.locator(".surface-search input").fill("PAGE.MARKETING_CORPORATE.PRODUCT_SUITE");
  await page.getByRole("button", { name: "PAGE.MARKETING_CORPORATE.PRODUCT_SUITE" }).click();
  await expect(canvas.locator('[data-page-id="PAGE.MARKETING_CORPORATE.PRODUCT_SUITE"]')).toContainText("Product Suite Page");
  await expect(canvas).toContainText("Product Suite ·");
  await expect(canvas).toContainText("Synthetic specimen only");
  await expect(canvas).not.toContainText("Shared specimen · not record-specific");
  const finalPageId = "PAGE.EVIDENCE_APPROVAL.AUDIT_EVIDENCE_REPORT";
  await page.locator(".surface-search input").fill(finalPageId);
  await page.getByRole("button", { name: finalPageId }).click();
  await expect(canvas.locator("[data-page-id]")).toHaveAttribute("data-page-id", finalPageId);
  await expect(canvas).toContainText("P41-500");
});

test("surface families render distinct record-specific, non-executing specimens", async ({ page }) => {
  await openReadySurface(page, "/surface");
  const canvas = page.locator(".surface-preview-canvas");
  const select = async (family: string, id: string) => {
    await page.getByRole("button", { name: new RegExp(`^${family}`) }).click();
    await page.locator(".surface-search input").fill(id);
    await page.getByRole("button", { name: id }).click();
  };

  await select("Workspaces", "WORKSPACE.TEAM.TEAM");
  await expect(canvas).toContainText("Team coordination");
  await expect(canvas).toContainText("Team work queue");
  await expect(canvas).toContainText("Synthetic fixture");
  await expect(canvas).not.toContainText("persistent");

  await select("Layouts", "LAYOUT.PLANNING.KANBAN");
  await expect(canvas.locator("[data-layout-id]")).toContainText("Schedule and planning board");
  await expect(canvas.locator(".layout-region")).toHaveCount(4);
  await expect(canvas).toContainText("SYNTHETIC LAYOUT DATA");
  await expect(canvas.locator("[data-layout-id]")).toHaveAttribute("data-layout-reference", "LY-045");

  await select("Devices", "DEVICE.DESKTOP_COMPUTING.DESKTOP");
  const desktop = canvas.locator(".device-preview-stage");
  await expect(desktop).toContainText("Desktop sample surface");
  await expect(desktop).toHaveAttribute("data-device-reference", "DV-001");
  await expect(desktop).toContainText("Simulated viewport");
  await expect(desktop.locator(".m-device-frame")).toHaveAttribute("data-device-id", "DEVICE.DESKTOP_COMPUTING.DESKTOP");
  const viewportText = await desktop.locator(".device-preview-meta").innerText();
  const viewport = viewportText.match(/(\d+) × (\d+)/);
  expect(viewport).not.toBeNull();
  const screenBox = await desktop.locator('[data-device-region="screen"]').boundingBox();
  expect(screenBox).not.toBeNull();
  expect(screenBox!.width / screenBox!.height).toBeCloseTo(Number(viewport![1]) / Number(viewport![2]), 1);
  await select("Devices", "DEVICE.PHONES.SMARTPHONE");
  await expect(canvas.locator(".device-preview-stage")).toContainText("Smartphone sample surface");

  await select("Generators", "GENERATOR.FORM_GENERATOR");
  const generator = canvas.locator("[data-generator-id]");
  await expect(generator).toContainText("Form Generator outline");
  await expect(generator).toContainText("NO PROVIDER CALLED");
  await generator.locator("input").fill("Create a TLPS venue intake form");
  await expect(generator).toContainText("Create a TLPS venue intake form");
  await expect(generator).toContainText("No file is generated");

  await select("Tools", "TOOL.API_BUILDER");
  const tool = canvas.locator("[data-tool-id]");
  await expect(tool).toContainText("Not executed");
  await expect(tool).toContainText("Builder Tools");
  await expect(tool).toContainText('"requestSent": false');
  await expect(tool).toContainText('"sideEffects": false');

  await select("AI spaces", "AI_SPACE.AI_RESEARCH_WORKSPACE");
  const aiSpace = canvas.locator("[data-ai-space-id]");
  await expect(aiSpace).toContainText("Illustrative AI Research Workspace response shape");
  await expect(aiSpace).toContainText("AI Business Spaces");
  await expect(aiSpace).toContainText("no files or external sources attached");
  await expect(aiSpace).toContainText("NO MODEL CALLED");
  await expect(aiSpace).toContainText("No model was called, source retrieved, citation verified");
  await expect(aiSpace).toContainText("Provider: not connected");
});

test("layout selections bind synthetic data slices to canonical records", async ({ page }) => {
  await openReadySurface(page, "/surface");
  await page.getByRole("button", { name: /^Layouts/ }).click();
  const canvas = page.locator(".surface-preview-canvas");
  const specimens = [
    ["LAYOUT.APP_SHELLS.TOPNAVSIDEBAR", "Navigation", "Feature Film Demo"],
    ["LAYOUT.PLANNING.KANBAN", "Backlog", "Prepare location brief"],
    ["LAYOUT.CANVAS_SPATIAL.MAPWORKSPACE", "Spatial canvas", "Mountain Road · sample location"],
  ];
  for (const [id, region, value] of specimens) {
    await page.locator(".surface-search input").fill(id);
    await page.getByRole("button", { name: id }).click();
    const preview = canvas.locator(`[data-layout-id="${id}"]`);
    await expect(preview).toHaveAttribute("data-layout-reference", /^LY-\d{3}$/);
    await expect(preview.locator(`[data-layout-region="${region}"]`)).toBeVisible();
    await expect(preview).toContainText(value);
    await expect(preview).toContainText("Synthetic layout fixture");
    await expect(preview).toContainText("No live application state");
    await expect(preview).not.toContainText("shared specimen");
  }
});

test("TLPS and NEVO page data contexts bind synthetic slices to canonical page families", async ({ page }) => {
  await openReadySurface(page, "/surface");
  await page.getByRole("button", { name: /^Pages/ }).click();
  const canvas = page.locator(".surface-preview-canvas");
  const selectPage = async (id: string) => {
    await page.locator(".surface-search input").fill(id);
    await page.getByRole("button", { name: id }).click();
  };
  const dataContext = page.getByRole("combobox", { name: "Page data context" });

  await dataContext.selectOption("tlps");
  await selectPage("PAGE.PRODUCTION_LOGISTICS.CALL_SHEET");
  const tlps = canvas.locator('[data-product-slice="TLPS"]');
  await expect(tlps).toContainText("Call-sheet and rehearsal plan");
  await expect(tlps).toContainText("Crew arrival fixture");
  await expect(tlps).toContainText("Location permission unverified");
  await expect(tlps).toContainText("no crew notification or shoot confirmation");

  await dataContext.selectOption("nevo");
  await selectPage("PAGE.EVENTS.EVENT_DASHBOARD");
  const nevoEvent = canvas.locator('[data-product-slice="NEVO"]');
  await expect(nevoEvent).toContainText("Event records");
  await expect(nevoEvent).toContainText("Technology Innovation Summit");
  await expect(nevoEvent).toContainText("Synthetic event fixture");
  await expect(nevoEvent).toContainText("no customer commitment");

  await selectPage("PAGE.BOOKING.BOOKING_CONFIRMATION");
  const nevoBooking = canvas.locator('[data-product-slice="NEVO"]');
  await expect(nevoBooking).toContainText("Quote and booking review");
  await expect(nevoBooking).toContainText("No venue or vendor hold");
  await expect(nevoBooking).toContainText("No transaction");

  await selectPage("PAGE.AUTHENTICATION.SIGN_IN");
  await expect(canvas.locator('[data-product-slice-unmapped="NEVO"]')).toContainText("outside the current NEVO pilot data map");
});

test("every workspace selection renders a record-bound synthetic data slice", async ({ page }) => {
  await openReadySurface(page, "/surface");
  await page.getByRole("button", { name: /^Workspaces/ }).click();
  const canvas = page.locator(".surface-preview-canvas");
  const selectWorkspace = async (id: string) => {
    await page.locator(".surface-search input").fill(id);
    await page.locator(".surface-record code").getByText(id, { exact: true }).click();
  };

  await selectWorkspace("WORKSPACE.TLPS_PRODUCTION.PRODUCTION");
  const tlps = canvas.locator('[data-workspace-id="WORKSPACE.TLPS_PRODUCTION.PRODUCTION"]');
  await expect(tlps).toHaveAttribute("data-workspace-slice", "production");
  await expect(tlps).toContainText("Production Workspace");
  await expect(tlps).toContainText("Call-sheet rehearsal");
  await expect(tlps).toContainText("no crew dispatch");
  await expect(tlps).toContainText("WS-W");

  await selectWorkspace("WORKSPACE.EVENT.EVENT");
  const nevo = canvas.locator('[data-workspace-id="WORKSPACE.EVENT.EVENT"]');
  await expect(nevo).toHaveAttribute("data-workspace-slice", "event");
  await expect(nevo).toContainText("Event Workspace");
  await expect(nevo).toContainText("registration fixture");
  await expect(nevo).toContainText("no booking");

  await selectWorkspace("WORKSPACE.AI.AI");
  const ai = canvas.locator('[data-workspace-id="WORKSPACE.AI.AI"]');
  await expect(ai).toHaveAttribute("data-workspace-slice", "ai");
  await expect(ai).toContainText("Provider · not connected");
  await expect(ai).toContainText("no model called");
});
