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
