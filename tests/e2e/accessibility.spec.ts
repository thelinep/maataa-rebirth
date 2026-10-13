import { test, expect, type Page } from "@playwright/test";
import { AxeBuilder } from "@axe-core/playwright";

const routes=["/","/surface","/playground","/sandbox","/demos","/docs","/help","/support","/theme-studio"];
const themes=["system","light","dark","high-contrast","oled"] as const;

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
    throw new Error(`MAATAA bootstrap error while opening ${route}:\n${text}\npageErrors=${JSON.stringify(pageErrors)}\nconsoleErrors=${JSON.stringify(consoleErrors)}`);
  }
  await expect(page.locator('[data-maataa-demo-ready="true"]')).toBeVisible();
  expect(pageErrors, `runtime page errors while opening ${route}`).toEqual([]);
  expect(consoleErrors, `console errors while opening ${route}`).toEqual([]);
}

for(const route of routes){
  test(`axe critical/serious: ${route}`, async ({page})=>{
    await openReadySurface(page, route);
    const results=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa"]).analyze();
    const blocking=results.violations.filter((violation)=>violation.impact==="critical"||violation.impact==="serious");
    expect(blocking,JSON.stringify(blocking,null,2)).toEqual([]);
  });
}

for (const theme of themes) {
  test(`axe critical/serious across public routes in ${theme} theme`, async ({ page }) => {
    for (const [index, route] of routes.entries()) {
      await openReadySurface(page, route);
      if (index === 0) {
        await page.getByRole("button", { name: "Settings" }).click();
        await page.getByLabel("Theme").selectOption(theme);
        await page.getByRole("button", { name: "Settings" }).click();
      }
      await expect(page.locator(".site-shell")).toHaveAttribute(
        "data-demo-theme",
        theme === "system"
          ? await page.evaluate(() => matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
          : theme,
      );
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      const blocking = results.violations.filter(
        (violation) => violation.impact === "critical" || violation.impact === "serious",
      );
      expect(blocking, `${theme} ${route}: ${JSON.stringify(blocking, null, 2)}`).toEqual([]);
    }
  });
}
