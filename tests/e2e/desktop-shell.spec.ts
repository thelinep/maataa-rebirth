import { expect, test } from "@playwright/test";

test("MAATAA Desktop opens app icons in Mac-style windows and continues TLPS plans into film", async ({ page }) => {
  await page.goto("/");
  const maataa = page.frameLocator('iframe[title="MAATAA UI"]');
  const film = page.frameLocator('iframe[title="TLP Film"]');
  const tlps = page.frameLocator('iframe[title="TLPS"]');
  const nevo = page.frameLocator('iframe[title="NEVO demo"]');
  const support = page.frameLocator('iframe[title="Support Center"]');

  await expect(page.getByRole("heading", { name: "MAATAA Desktop" })).toBeVisible();
  await expect(page.getByRole("button", { name: "MAATAA UI" })).toBeVisible();
  await expect(page.getByRole("button", { name: "MAATAA Browser" })).toBeVisible();
  await expect(page.getByRole("button", { name: "TLPS", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "TLP Film" })).toBeVisible();

  await page.getByRole("button", { name: "MAATAA UI" }).click();
  const maataaWindow = page.locator('[data-app-window="maataa"]');
  await expect(maataaWindow).toBeVisible();
  await expect(maataa.getByText("One UI system", { exact: false })).toBeVisible();
  const brahminiFloat = maataa.locator(".brahmini-global-trigger");
  await expect(brahminiFloat).toBeVisible();
  const brahminiFloatLayout = await brahminiFloat.evaluate(button => {
    const rect = button.getBoundingClientRect();
    const style = getComputedStyle(button);
    return {
      position: style.position,
      right: style.right,
      bottom: style.bottom,
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
      viewportWidth: innerWidth,
      viewportHeight: innerHeight,
    };
  });
  expect(brahminiFloatLayout.position, JSON.stringify(brahminiFloatLayout)).toBe("fixed");
  expect(Math.abs(brahminiFloatLayout.viewportWidth - brahminiFloatLayout.x - brahminiFloatLayout.width - 22), JSON.stringify(brahminiFloatLayout)).toBeLessThan(3);
  expect(Math.abs(brahminiFloatLayout.viewportHeight - brahminiFloatLayout.y - brahminiFloatLayout.height - 20), JSON.stringify(brahminiFloatLayout)).toBeLessThan(3);
  const titlebar = maataaWindow.locator(".app-titlebar");
  const beforeDrag = await maataaWindow.evaluate(element => {
    const rect = element.getBoundingClientRect();
    return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
  });
  const titlebarBox = await titlebar.boundingBox();
  if (!titlebarBox) throw new Error("MAATAA window title bar is missing");
  await page.mouse.move(titlebarBox.x + titlebarBox.width / 2, titlebarBox.y + titlebarBox.height / 2);
  await page.mouse.down();
  await page.mouse.move(titlebarBox.x + titlebarBox.width / 2 + 90, titlebarBox.y + titlebarBox.height / 2 + 45, { steps: 5 });
  await page.mouse.up();
  const afterDrag = await maataaWindow.evaluate(element => {
    const rect = element.getBoundingClientRect();
    return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
  });
  expect(afterDrag.x - beforeDrag.x).toBeGreaterThan(82);
  expect(afterDrag.x - beforeDrag.x).toBeLessThan(98);
  expect(afterDrag.y - beforeDrag.y).toBeGreaterThan(37);
  expect(afterDrag.y - beforeDrag.y).toBeLessThan(53);
  const desktopContent = await page.locator("#desktop-content").boundingBox();
  if (!desktopContent) throw new Error("Desktop workspace is missing");
  expect(afterDrag.y).toBeGreaterThanOrEqual(desktopContent.y);
  expect(afterDrag.y + 42).toBeLessThanOrEqual(desktopContent.y + desktopContent.height);

  const maataaDockIcon = page.locator('[data-dock-app="maataa"]');
  await maataaDockIcon.click({ button: "right" });
  await page.getByRole("menuitem", { name: "Large window" }).click();
  await expect(maataaWindow).toBeVisible();
  await maataaDockIcon.click({ button: "right" });
  await page.getByRole("menuitem", { name: "Left half" }).click();
  const leftHalf = await maataaWindow.boundingBox();
  if (!leftHalf) throw new Error("MAATAA window is missing after choosing Left half");
  expect(leftHalf.x - desktopContent.x).toBeLessThanOrEqual(2);
  expect(leftHalf.y).toBeGreaterThanOrEqual(desktopContent.y);
  await maataaDockIcon.click({ button: "right" });
  await page.getByRole("menuitem", { name: "Center window" }).click();
  const centeredTitlebar = await titlebar.boundingBox();
  if (!centeredTitlebar) throw new Error("MAATAA window title bar is missing after layout change");
  await page.mouse.move(centeredTitlebar.x + centeredTitlebar.width / 2, centeredTitlebar.y + centeredTitlebar.height / 2);
  await page.mouse.down();
  await page.mouse.move(centeredTitlebar.x - 1800, centeredTitlebar.y - 1800, { steps: 6 });
  await page.mouse.up();
  const clampedWindow = await maataaWindow.boundingBox();
  if (!clampedWindow) throw new Error("MAATAA window is missing after edge drag");
  expect(clampedWindow.x).toBeGreaterThanOrEqual(desktopContent.x);
  expect(clampedWindow.y).toBeGreaterThanOrEqual(desktopContent.y);
  expect(clampedWindow.x + clampedWindow.width).toBeLessThanOrEqual(desktopContent.x + desktopContent.width + 1);
  expect(clampedWindow.y + 42).toBeLessThanOrEqual(desktopContent.y + desktopContent.height + 1);

  await maataaWindow.getByRole("button", { name: "Minimize MAATAA UI" }).click();
  await expect(maataaWindow).toBeHidden();
  await page.getByRole("button", { name: "Restore MAATAA UI" }).click();
  await expect(maataaWindow).toBeVisible();
  await maataaWindow.getByRole("button", { name: "Enter full screen for MAATAA UI" }).click();
  await expect(maataaWindow).toHaveClass(/is-maximized/);
  await maataaWindow.getByRole("button", { name: "Exit full screen for MAATAA UI" }).click();
  await maataaWindow.getByRole("button", { name: "Close MAATAA UI" }).click();
  await expect(maataaWindow).toHaveCount(0);

  await page.getByRole("button", { name: "TLPS", exact: true }).click();
  const tlpsWindow = page.locator('[data-app-window="tlps"]');
  await expect(tlpsWindow).toBeVisible();
  await expect(tlps.getByRole("heading", { name: "What is your role?" })).toBeVisible();
  await tlps.locator('select[aria-label="What is your role?"]').selectOption("producer");
  await tlps.getByRole("button", { name: "Show my work areas" }).click();
  await expect(tlps.getByRole("heading", { name: "Work areas for Producer" })).toBeVisible();
  await tlps.getByRole("button", { name: /Production OS/ }).click();
  await tlps.getByRole("button", { name: "Continue with selected area" }).click();
  await tlps.getByRole("button", { name: "Start my plan" }).click();
  await expect(tlps.getByRole("heading", { name: "Plan", exact: true })).toBeVisible();
  await tlps.getByRole("button", { name: "Load sample" }).click();
  const sharedTlpsProject = page.locator('.desktop-project-row[data-product="tlps"]');
  await expect(sharedTlpsProject).toBeVisible();
  await page.getByRole("button", { name: "Show MAATAA Desktop home" }).click();
  await sharedTlpsProject.getByRole("button", { name: /Continue .* in TLPS/ }).click();
  await expect(tlps.getByRole("heading", { name: "Plan", exact: true })).toBeVisible();
  await tlps.getByRole("button", { name: /Handover/ }).click();
  await tlps.getByRole("button", { name: "Continue into a film project" }).click();
  const filmWindow = page.locator('[data-app-window="film"]');
  await expect(filmWindow).toBeVisible();
  await expect(film.getByRole("heading", { name: "Continue to your workspace" })).toBeVisible();
  await film.getByRole("button", { name: "Continue to local preview" }).click();
  await film.getByLabel("Choose your role").selectOption("producer");
  await film.getByRole("button", { name: /Show my work areas/ }).click();
  await film.getByRole("button", { name: /Production OS/ }).click();
  await film.getByRole("button", { name: /Continue with this area/ }).click();
  await film.getByLabel("Choose project type").selectOption("Feature Film");
  await film.getByLabel("Project name").fill("My TLPS Film");
  await film.getByLabel("Your idea").fill("A film project handed over from a local production plan.");
  await film.getByRole("button", { name: "Create local project" }).click();
  await expect(film.getByRole("heading", { name: /Start a film project from/ })).toBeVisible();
  await film.getByRole("button", { name: "Create film project" }).click();
  await expect(film.locator("#film-project-name")).toHaveValue("Mountain Light · sample");
  await expect(film.getByText(/project-specific script or production drafts/)).toBeVisible();
  await expect(film.getByRole("heading", { name: "Logline" })).toHaveCount(0);
  await film.getByRole("button", { name: "Restore previous film project" }).click();
  await expect(film.locator("#film-project-name")).toHaveValue("My TLPS Film");
  const sharedFilmProject = page.locator('.desktop-project-row[data-product="tlp-film"]');
  await expect(sharedFilmProject).toContainText("My TLPS Film");
  await page.getByRole("button", { name: "Show MAATAA Desktop home" }).click();
  await page.getByRole("button", { name: "MAATAA UI" }).click();
  await expect(maataa.getByText("My TLPS Film")).toBeVisible();
  await maataa.getByRole("button", { name: "Continue →" }).last().click();
  await expect(film.getByRole("heading", { name: "Logline" })).toBeVisible();
  await filmWindow.getByRole("button", { name: "Close TLP Film" }).click();

  await page.getByRole("button", { name: "Open NEVO" }).click();
  await expect(nevo.getByText("NEVO Event Command Center", { exact: false }).first()).toBeVisible();
  await page.getByRole("button", { name: "Open Support Center" }).click();
  await expect(support.getByRole("heading", { name: "What can we help you find?" })).toBeVisible();
});

test("the desktop loopback server only exposes the five bundled product surfaces", async ({ request }) => {
  const product = await request.get("/maataa/index.html");
  const film = await request.get("/tlp/index.html");
  const tlps = await request.get("/tlps/index.html");
  const nevo = await request.get("/maataa/index.html#/demo/nevo");
  const help = await request.get("/support/index.html");
  const outside = await request.get("/package.json");
  const mutation = await request.post("/");

  expect(product.ok()).toBe(true);
  expect(film.ok()).toBe(true);
  expect(tlps.ok()).toBe(true);
  expect(nevo.ok()).toBe(true);
  expect(help.ok()).toBe(true);
  expect(outside.status()).toBe(404);
  expect(mutation.status()).toBe(405);
});
