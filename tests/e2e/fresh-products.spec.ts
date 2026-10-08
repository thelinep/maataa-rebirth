import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";

test("TLP film stage checklist is navigable and browser-local", async ({
  page,
}, testInfo) => {
  await page.goto("http://127.0.0.1:4195/");
  await page.evaluate(() => localStorage.clear());
  await page.goto("http://127.0.0.1:4195/?surface=workspace");
  await expect(page.getByRole("heading", { name: "Continue to your workspace" })).toBeVisible();
  await page.goto("http://127.0.0.1:4195/");
  await page.reload();
  await expect(page.getByRole("heading", { name: "Make the next scene possible." })).toBeVisible();
  await page.locator(".tlp-public-header").getByRole("button", { name: /Open workspace/ }).click();
  await expect(page.getByRole("heading", { name: "Continue to your workspace" })).toBeVisible();
  await expect(page.getByText("This does not verify your identity", { exact: false })).toBeVisible();
  await page.getByRole("button", { name: "Continue to local preview" }).click();
  await page.getByLabel("Choose your role").selectOption("producer");
  await page.getByRole("button", { name: /Show my work areas/ }).click();
  await page.getByRole("button", { name: /Film OS/ }).click();
  await page.getByRole("button", { name: /Continue with this area/ }).click();
  await page.getByLabel("Choose project type").selectOption("Feature Film");
  await page.getByLabel("Project name").fill("30 Trillion India");
  await page.getByLabel("Your idea").fill("A hopeful story about India's future and the people building it.");
  await page.getByRole("button", { name: "Create local project" }).click();
  await expect(page.getByText("30 Trillion India", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("Logline", { exact: true })).toBeVisible();
  await expect(page.locator("#film-project-name")).toHaveValue(
    "30 Trillion India",
  );
  await expect(page.getByText("Demo · saved in this browser")).toBeVisible();
  await expect(page.getByText("A hopeful story about India's future and the people building it.")).toBeVisible();
  await page.screenshot({
    path: `.impeccable/review/tlp-${testInfo.project.name}.png`,
    fullPage: true,
  });
  await page.getByRole("button", { name: "Generate another draft" }).click();
  await expect(page.getByText("Alternate story angle")).toBeVisible();
  await page.getByRole("checkbox", { name: "Write an audience note" }).check();
  await expect(page.getByText("1 / 80")).toBeVisible();
  await page.reload();
  await expect(page.getByText("Alternate story angle")).toBeVisible();
  await expect(
    page.getByRole("checkbox", { name: "Write an audience note" }),
  ).toBeChecked();
  await page.getByRole("button", { name: /Release/ }).click();
  await expect(
    page.getByRole("heading", { name: "Release", exact: true }),
  ).toBeVisible();
  await expect(page.getByText("Release path scenario")).toBeVisible();
  await expect(page.getByText("Not released", { exact: true })).toBeVisible();
  await expect(page.getByText("Policy and funding claims")).toBeVisible();
  await expect(page.getByText("Needs qualified review").first()).toBeVisible();
  await page.getByRole("link", { name: "Public surface ↗" }).click();
  await expect(page).toHaveURL(/\?surface=tlp$/);
  await expect(
    page.getByRole("heading", { name: "Make the next scene possible." }),
  ).toBeVisible();
  await expect(page.locator(".tlp-workflow-grid article")).toHaveCount(6);
  await expect(page.locator(".tlp-vision-grid article")).toHaveCount(8);
  await expect(page.getByText("NO CONNECTED AI PROVIDER")).toBeVisible();
  await page.screenshot({
    path: `.impeccable/review/tlp-product-${testInfo.project.name}.png`,
    fullPage: true,
  });
  const productHasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(productHasOverflow).toBe(false);
  await page.getByRole("link", { name: "Workflow", exact: true }).click();
  await expect(page).toHaveURL(/#workflow$/);
  await page.getByRole("link", { name: "View 30 Trillion India" }).click();
  await expect(page).toHaveURL(/\?surface=film$/);
  await page.getByRole("link", { name: "Story", exact: true }).click();
  await expect(page).toHaveURL(/#story$/);
  await expect(
    page.getByRole("heading", { name: "One family. Many definitions of progress." }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Release status", exact: true }).click();
  await expect(page).toHaveURL(/#release$/);
  await expect(
    page.getByRole("heading", { name: "Clear answers for this concept." }),
  ).toBeVisible();
  await expect(page.getByText("CONCEPT ONLY · NOT RELEASED")).toBeVisible();
  await expect(page.locator(".faq-list details")).toHaveCount(4);
  await page.screenshot({
    path: `.impeccable/review/film-public-${testInfo.project.name}.png`,
    fullPage: true,
  });
  const publicHasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(publicHasOverflow).toBe(false);
  const kitDownload = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download concept kit" }).first().click();
  expect((await kitDownload).suggestedFilename()).toBe(
    "30-trillion-india-concept-kit.txt",
  );
  await page.getByRole("button", { name: /Production workspace/ }).click();
  await expect(page).toHaveURL(/\?surface=workspace$/);
  await expect(page.getByText("Production simulation")).toBeVisible();
  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(hasOverflow).toBe(false);
});

test("TLPS plan can be reviewed, rehearsed, and exported locally", async ({
  page,
}, testInfo) => {
  await page.goto("http://127.0.0.1:4196/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  if (testInfo.project.name === "desktop") {
    await expect(page.getByText("Local demo · no account")).toBeVisible();
  }
  await expect(page.getByRole("heading", { name: "What is your role?" })).toBeVisible();
  await expect(page.locator(".view-link")).toHaveCount(0);
  await expect(page.getByLabel("What are you making?")).toHaveCount(0);
  await page.locator('select[aria-label="What is your role?"]').selectOption("agency");
  await expect(page.getByRole("heading", { name: "Work areas for your role" })).toHaveCount(0);
  await page.getByRole("button", { name: "Show my work areas" }).click();
  await expect(page.getByRole("heading", { name: "Work areas for Agency / campaign team" })).toBeVisible();
  await expect(page.getByRole("article").filter({ hasText: "Campaign OS" })).toContainText("Catalogue");
  await expect(page.getByRole("button", { name: /Production OS/ })).toHaveCount(0);
  await page.getByRole("button", { name: "Back" }).click();
  await page.locator('select[aria-label="What is your role?"]').selectOption("producer");
  await page.getByRole("button", { name: "Show my work areas" }).click();
  await expect(page.getByRole("button", { name: /Finance OS/ })).toBeVisible();
  await expect(page.getByRole("article").filter({ hasText: "Casting OS" })).toContainText("Catalogue");
  await page.getByRole("button", { name: /Production OS/ }).click();
  await page.getByRole("button", { name: "Continue with selected area" }).click();
  await expect(page.getByLabel("What are you making?")).toBeVisible();
  await page.getByRole("textbox", { name: "What is your idea?" }).fill("A short film about a travelling theatre");
  await page.getByRole("button", { name: "Start my plan" }).click();
  await expect(page.getByRole("heading", { name: "Plan", exact: true })).toBeVisible();
  await expect(page.getByLabel("Project title")).toHaveValue("");
  await expect(page.getByText("A short film about a travelling theatre", { exact: true })).toBeVisible();
  await expect(page.getByText("What do you want to make?", { exact: true })).toHaveCount(0);
  await expect(page.locator(".view-link")).toHaveCount(4);
  await expect(page.locator(".view-link").nth(2)).toBeVisible();
  await expect(page.locator(".view-link").nth(3)).toBeVisible();
  await expect(page.getByLabel("Project type")).toHaveValue("Feature Film");
  await expect(
    page.locator('#tlps-crew-role-options option[value="Line Producer"]'),
  ).toHaveCount(1);
  await expect(
    page.locator('#tlps-crew-role-options option[value="Director"]'),
  ).toHaveCount(1);
  await page.getByRole("button", { name: "Load sample" }).click();
  await page.screenshot({
    path: `.impeccable/review/tlps-${testInfo.project.name}.png`,
    fullPage: true,
  });
  await page.getByRole("button", { name: "Submit for owner review" }).click();
  await expect(
    page.getByRole("heading", { name: "Owner review" }),
  ).toBeVisible();
  await page
    .getByLabel("Review note")
    .fill("Sample review for local rehearsal.");
  await page.getByRole("button", { name: "Approve local preview" }).click();
  await expect(page.getByText("approved", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Start rehearsal" }).click();
  await page
    .getByRole("checkbox", { name: "Setup and department readiness" })
    .check();
  await page
    .getByRole("checkbox", {
      name: "Rehearsal completed against the draft plan",
    })
    .check();
  await page
    .getByRole("checkbox", { name: "Wrap notes and next actions recorded" })
    .check();
  await page
    .locator('input[type="file"]')
    .nth(0)
    .setInputFiles({
      name: "planning-note.txt",
      mimeType: "text/plain",
      buffer: Buffer.from("fictional planning evidence"),
    });
  await page
    .locator('input[type="file"]')
    .nth(1)
    .setInputFiles({
      name: "rehearsal-note.txt",
      mimeType: "text/plain",
      buffer: Buffer.from("fictional rehearsal evidence"),
    });
  await expect(
    page.getByText("Evidence metadata saved locally."),
  ).toBeVisible();
  await page.getByRole("button", { name: "Close local rehearsal" }).click();
  await expect(
    page.getByRole("heading", { name: "Handover", exact: true }),
  ).toBeVisible();
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download JSON handover" }).click();
  const handover = await download;
  expect(handover.suggestedFilename()).toBe("tlps-local-handover.json");
  const handoverData = JSON.parse(
    await readFile((await handover.path())!, "utf8"),
  ) as Record<string, unknown>;
  expect(handoverData.exportScope).toBe("local-demo-only");
  expect(handoverData.productionReady).toBe(false);
  expect(handoverData.confirmedBooking).toBe(false);
  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(hasOverflow).toBe(false);
});
