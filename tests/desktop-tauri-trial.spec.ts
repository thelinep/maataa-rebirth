import { expect, test } from "@playwright/test";

test("shows a desktop launcher and explains the native window boundary in preview mode", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Your apps. One desktop." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Your work, together" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Pilot status" })).toBeVisible();
  await expect(page.getByText("Local rehearsal is complete.")).toBeVisible();
  await expect(page.getByText("No NEVO app is connected to this Desktop yet.")).toBeVisible();
  await expect(page.getByRole("button", { name: "Open Browser app in a new window" })).toBeVisible();
  await expect(page.locator("#tlps-app")).toBeVisible();
  await expect(page.locator("#film-app")).toBeVisible();
  await expect(page.locator("#support-app")).toBeVisible();
  await page.getByRole("button", { name: "Open Browser app in a new window" }).click();
  await expect(page.getByRole("status")).toContainText("Native preview only");
});

test("routes product icons to separate native app windows", async ({ page }) => {
  await page.addInitScript(() => {
    const calls: Array<{ command: string; args?: Record<string, unknown> }> = [];
    (window as Window & { __calls?: typeof calls; __TAURI__?: unknown }).__calls = calls;
    (window as Window & { __TAURI__?: unknown }).__TAURI__ = {
      core: { invoke: async (command: string, args?: Record<string, unknown>) => {
        calls.push({ command, args });
        return command === "list_workspace_projects" ? [] : undefined;
      } },
      webviewWindow: { getCurrentWebviewWindow: () => ({ label: "main" }) },
    };
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Open MAATAA UI workspace" }).click();
  await page.locator("#tlps-app").click();
  await page.locator("#film-app").click();
  await page.locator("#support-app").click();
  const calls = await page.evaluate(() => (window as Window & { __calls?: Array<{ command: string; args?: Record<string, unknown> }> }).__calls);
  expect(calls?.filter((call) => call.command === "open_product_window")).toEqual([
    { command: "open_product_window", args: { product: "maataa-ui" } },
    { command: "open_product_window", args: { product: "tlps" } },
    { command: "open_product_window", args: { product: "tlp-film" } },
    { command: "open_product_window", args: { product: "support-center" } },
  ]);
});

test("shows shared local projects safely and opens the owning workspace", async ({ page }) => {
  await page.addInitScript(() => {
    const calls: Array<{ command: string; args?: Record<string, unknown> }> = [];
    (window as Window & { __calls?: typeof calls; __TAURI__?: unknown }).__calls = calls;
    (window as Window & { __TAURI__?: unknown }).__TAURI__ = {
      core: { invoke: async (command: string, args?: Record<string, unknown>) => {
        calls.push({ command, args });
        if (command === "list_workspace_projects") return [{
          id: "tlp-film:workspace",
          product: "tlp-film",
          title: "30 Trillion India <img src=x onerror=alert(1)>",
          projectType: "Feature Film",
          status: "example",
          sample: true,
          updatedAt: 1,
        }];
        return undefined;
      } },
      event: { listen: async () => () => undefined },
      webviewWindow: { getCurrentWebviewWindow: () => ({ label: "main" }) },
    };
  });
  await page.goto("/");
  await expect(page.getByText("30 Trillion India <img src=x onerror=alert(1)>")).toBeVisible();
  await expect(page.getByText("Example", { exact: true })).toBeVisible();
  await expect(page.locator("#workspace-projects img")).toHaveCount(0);
  await page.getByRole("button", { name: "Open in TLP Film" }).click();
  const calls = await page.evaluate(() => (window as Window & { __calls?: Array<{ command: string; args?: Record<string, unknown> }> }).__calls);
  expect(calls).toContainEqual({
    command: "open_product_window",
    args: { product: "tlp-film", openWorkspace: true },
  });
});

test("shows local project activity and labels the clock boundary honestly", async ({ page }) => {
  await page.addInitScript(() => {
    (window as Window & { __TAURI__?: unknown }).__TAURI__ = {
      core: { invoke: async (command: string) => {
        if (command === "list_workspace_projects") return [];
        if (command === "list_workspace_events") return [{
          sequence: 3,
          projectId: "tlps:workspace",
          product: "tlps",
          action: "project-updated",
          source: "maataa-desktop-local",
          recordedAtUnixMs: Date.now(),
          timeBasis: "host-unix-clock-unverified",
        }];
        return undefined;
      } },
      webviewWindow: { getCurrentWebviewWindow: () => ({ label: "main" }) },
    };
  });
  await page.goto("/");
  await expect(page.locator("#clock")).not.toBeEmpty();
  await expect(page.locator("#hemant-clock")).toContainText("Hemant ·");
  await expect(page.locator("#hemant-clock")).toContainText("ahoratra");
  await expect(page.locator("#hemant-clock")).toHaveAttribute("title", /unverified host clock/);
  await expect(page.getByRole("heading", { name: "Recent project activity" })).toBeVisible();
  await expect(page.locator("#workspace-events")).toContainText("Project updated");
  await expect(page.locator("#workspace-events")).toContainText("TLPS");
  await expect(page.getByText(/not yet verified against Hemant Samwat/)).toBeVisible();
  await page.getByRole("button", { name: "Open Hemant Samvat Panchang and space timeline" }).click();
  await expect(page.getByRole("heading", { name: "Hemant Samvat" })).toBeVisible();
  await expect(page.getByText("Panchang and space-event observatory")).toBeVisible();
  await expect(page.getByText("Tithi · lunar day")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Space events on the timeline" })).toBeVisible();
  await expect(page.getByRole("link", { name: "NASA source ↗" })).toHaveCount(7);
  await page.getByRole("button", { name: "← Desktop" }).click();
  await expect(page.getByRole("heading", { name: "Your apps. One desktop." })).toBeVisible();
});

test("provides a safe spacecraft trajectory simulator with a Hemant elapsed-time display", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Open spacecraft navigation simulator" }).click();
  await expect(page.getByRole("heading", { name: "Spacecraft Navigation Utility" })).toBeVisible();
  await expect(page.getByText("SIMULATION · NO FLIGHT CONTROL")).toBeVisible();
  await page.getByRole("button", { name: "Calculate trajectory" }).click();
  await expect(page.locator("#nav-solution-state")).toContainText("integration steps");
  await expect(page.locator("#nav-result-time")).toContainText("2030-01-02T00:00:00 UTC");
  await expect(page.locator("#nav-result-hemant")).toContainText("ahoratra");
  await expect(page.locator("#nav-result-position")).toContainText("X ");
  await expect(page.locator("#nav-result-range")).toContainText("AU");
  await page.locator("#nav-duration").fill("999999");
  await page.getByRole("button", { name: "Calculate trajectory" }).click();
  await expect(page.locator("#nav-solution-state")).toContainText("between zero and ten years");
  await page.getByRole("button", { name: "← Desktop" }).click();
  await expect(page.getByRole("heading", { name: "Your apps. One desktop." })).toBeVisible();
});

test("keeps the desktop launcher and address controls within narrow viewports", async ({ page }) => {
  await page.setViewportSize({ width: 600, height: 900 });
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Open Hemant Samvat Panchang and space timeline" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Your apps. One desktop." })).toBeVisible();
  await expect(page.locator("#tlps-app")).toBeVisible();
  await expect(page.locator("#support-app")).toBeVisible();
  const overflows = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflows).toBe(false);
});

test("keeps the desktop app grid visibly below the title bar", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const spacing = await page.evaluate(() => {
    const titlebar = document.querySelector(".topbar")?.getBoundingClientRect();
    const firstIcon = document.querySelector(".app-grid .app-icon")?.getBoundingClientRect();
    if (!titlebar || !firstIcon) return null;
    return firstIcon.top - titlebar.bottom;
  });
  expect(spacing).not.toBeNull();
  expect(spacing).toBeGreaterThanOrEqual(12);
});

test("opens a shared project record in MAATAA UI or TLPS with only its ID and registered version", async ({ page }) => {
  const recordId = "prj:0f0e0d0c-0b0a-4908-8706-050403020100";
  await page.addInitScript((id) => {
    const calls: Array<{ command: string; args?: Record<string, unknown> }> = [];
    (window as Window & { __calls?: typeof calls; __TAURI__?: unknown }).__calls = calls;
    (window as Window & { __TAURI__?: unknown }).__TAURI__ = {
      core: { invoke: async (command: string, args?: Record<string, unknown>) => {
        calls.push({ command, args });
        if (command === "list_workspace_projects") return [{
          id, product: "tlps", title: "Synthetic record", projectType: "Idea to Script", status: "draft", sample: false, updatedAt: 1,
          record: { recordId: id, recordVersion: 2, schema: "maataa.project-record/1.0.0" },
        }];
        if (command === "open_product_window" && args?.product === "tlps") {
          throw "This project is now at v3; v2 is out of date. Refresh and open the current version.";
        }
        return undefined;
      } },
      event: { listen: async () => () => undefined },
      webviewWindow: { getCurrentWebviewWindow: () => ({ label: "main" }) },
    };
  }, recordId);
  await page.goto("/");
  await expect(page.getByText("Project record · v2")).toBeVisible();
  await expect(page.locator(`[data-record-id="${recordId}"]`).first()).toBeVisible();
  await expect(page.getByText(/Local prototype · saved on this Mac only/)).toBeVisible();
  await page.getByRole("button", { name: `Open ${recordId} version 2 in MAATAA UI and Brahmini` }).click();
  await page.getByRole("button", { name: `Open ${recordId} version 2 in TLPS` }).click();
  await expect(page.locator("#desktop-status")).toContainText("out of date");
  const calls = await page.evaluate(() => (window as Window & { __calls?: Array<{ command: string; args?: Record<string, unknown> }> }).__calls);
  expect(calls?.filter((call) => call.command === "open_product_window")).toEqual([
    { command: "open_product_window", args: { product: "maataa-ui", recordId, recordVersion: 2 } },
    { command: "open_product_window", args: { product: "tlps", recordId, recordVersion: 2 } },
  ]);
});
