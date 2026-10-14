import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";

test("workplace icon bars execute actions and navigate steps without bypassing review", async ({ page }) => {
  await page.goto("/#/tlps/workplaces");
  await page.getByLabel("Work area", { exact: true }).selectOption("location");
  await page.getByRole("button", { name: /Open .* in Location OS/ }).first().click();
  const actions = page.getByRole("group", { name: "Workplace actions" });
  const steps = page.getByRole("navigation", { name: "Workplace workflow steps" });
  await expect(actions.getByRole("button")).toHaveCount(6);
  await expect(steps.getByRole("button")).toHaveCount(4);
  await expect(steps.getByRole("button", { name: /^Review:/ })).toBeDisabled();
  await actions.getByRole("button", { name: "New record", exact: true }).click();
  await expect(page.getByRole("textbox", { name: /^Planning item/ })).toBeFocused();
  await actions.getByRole("button", { name: "Review plan" }).click();
  await expect(page.getByLabel("Plan owner", { exact: true })).toBeFocused();
  await actions.getByRole("button", { name: "Check current step" }).click();
  await expect(steps.getByRole("button", { name: /^Prepare:/ })).toHaveAttribute("aria-current", "step");
  await actions.getByRole("button", { name: "Load samples" }).click();
  await expect(actions.getByRole("button", { name: "Load samples" })).toBeDisabled();
  await page.getByLabel("Plan owner", { exact: true }).fill("Local reviewer");
  await page.getByLabel("Review note", { exact: true }).fill("Rehearsed location notes; access and permissions unknown.");
  await actions.getByRole("button", { name: "Check current step" }).click();
  await expect(steps.getByRole("button", { name: /^Review:/ })).toHaveAttribute("aria-current", "step");
  await steps.getByRole("button", { name: /^Prepare:/ }).click();
  await expect(steps.getByRole("button", { name: /^Review:/ })).toHaveAttribute("aria-current", "step");
  await expect(steps.getByRole("button", { name: /^Rehearse:/ })).toBeDisabled();
  await actions.getByRole("button", { name: "Restart steps" }).click();
  await expect(page.getByLabel("Plan owner", { exact: true })).toHaveValue("Local reviewer");
  await expect(steps.getByRole("button", { name: /^Prepare:/ })).toHaveAttribute("aria-current", "step");
  const pending = page.waitForEvent("download");
  await actions.getByRole("button", { name: "Export handover" }).click();
  const download = await pending;
  const data = JSON.parse(await readFile((await download.path())!, "utf8"));
  expect(data.demoComplete).toBe(false);
  expect(data.records).toHaveLength(1);
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
});

test("workplace directory opens a saved, isolated marketplace demo and exports its rehearsal", async ({ page }) => {
  await page.goto("/#/tlps/catalog/marketplace-locations");
  await page.getByRole("button", { name: "Explore workplaces and demos" }).click();
  await expect(page.getByRole("heading", { name: "Find your workplace. Try the workflow." })).toBeVisible();
  await page.getByLabel("Work area", { exact: true }).selectOption("marketplace");
  await page.getByRole("button", { name: /Open .* in Marketplace OS/ }).first().click();
  const url = page.url();
  await page.getByRole("button", { name: "Check this step locally" }).click();
  await expect(page.getByText("Add a record, a plan owner and a review note before checking this step.")).toBeVisible();
  await page.getByRole("button", { name: "Add sample records" }).click();
  await page.getByLabel("Plan owner", { exact: true }).fill("Demo reviewer");
  for (let step = 0; step < 4; step++) {
    await page.getByLabel("Review note", { exact: true }).fill(`Rehearsal check ${step + 1}; availability remains unknown.`);
    await page.getByRole("button", { name: "Check this step locally" }).click();
  }
  await expect(page.getByText("Local demo complete. You can export the handover.")).toBeVisible();
  await page.reload();
  await expect(page.getByLabel("Plan owner", { exact: true })).toHaveValue("Demo reviewer");
  await expect(page.getByRole("button", { name: "Check this step locally" })).toHaveCount(0);
  const pending = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export demo handover" }).click();
  const download = await pending;
  const data = JSON.parse(await readFile((await download.path())!, "utf8"));
  expect(data.demoComplete).toBe(true);
  expect(data.productionReady).toBe(false);
  expect(data.records.every((record: { sample: boolean }) => record.sample)).toBe(true);
  await page.getByRole("button", { name: "All workplaces", exact: true }).click();
  await page.getByLabel("Work area", { exact: true }).selectOption("casting");
  await page.getByRole("button", { name: /Open .* in Casting OS/ }).first().click();
  await expect(page.getByLabel("Plan owner", { exact: true })).toHaveValue("");
  await page.goto(url);
  await expect(page.getByLabel("Plan owner", { exact: true })).toHaveValue("Demo reviewer");
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `overflow at ${width}`).toBe(true);
  }
});

test("all areas are discoverable and empty and invalid routes recover", async ({ page }) => {
  await page.goto("/#/tlps/workplaces");
  await expect(page.locator(".tlps-workplace-group")).toHaveCount(20);
  await page.getByLabel("Find a workplace", { exact: true }).fill("no-such-workplace-xyz");
  await expect(page.getByText("No workplaces match. Clear your search or choose a different area.")).toBeVisible();
  await page.goto("/#/tlps/workplaces/unknown");
  await expect(page.getByRole("heading", { name: "Workplace not found" })).toBeVisible();
  await page.getByRole("button", { name: "All workplaces", exact: true }).click();
  await expect(page.locator(".tlps-workplace-group")).toHaveCount(20);
});
