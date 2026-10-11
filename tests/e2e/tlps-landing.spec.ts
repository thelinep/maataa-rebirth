import { expect, test } from "@playwright/test";

test("TLPS overview leads into a role-and-idea-first guided creation path", async ({
  page,
}) => {
  await page.goto("/#/tlps");
  await expect(
    page.getByRole("heading", { name: "What do you want to make?" }),
  ).toBeVisible();
  await expect(
    page
      .getByRole("navigation", { name: "TLPS site" })
      .getByRole("button", { name: "Start here", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Tell us what you do and what you want to make."),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Next" })).toBeDisabled();
  await expect(
    page.getByRole("heading", { name: "Who can use it?" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Try it now" })).toBeVisible();
  expect(
    await page
      .locator(".tlps-site-nav")
      .evaluate((nav) => nav.scrollWidth <= nav.clientWidth),
  ).toBe(true);
  await expect(page.getByText("160", { exact: true })).toHaveCount(0);
  await page
    .getByLabel("What do you do?")
    .selectOption({ label: "I write or create" });
  await page
    .getByLabel("What do you want to make?")
    .selectOption({ label: "Comic book" });
  await page.getByRole("button", { name: "Next" }).click();
  await expect(page).toHaveURL(/#\/tlps\/onboarding$/);
  await expect(
    page.getByRole("heading", { name: "What do you want to make?" }),
  ).toBeVisible();
  await expect(page.getByLabel("What do you do?")).toHaveValue(
    "Writer / creator",
  );
  await expect(page.getByLabel("What do you want to make?")).toHaveValue(
    "Comic book",
  );
  await expect(page.getByLabel("Tell us your idea")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Speak your idea" }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page
    .getByLabel("Tell us your idea")
    .fill("A comic about a young inventor protecting her coastal village.");
  await page.getByRole("button", { name: "Save my idea" }).click();
  await expect(page.getByRole("status")).toContainText("saved on this device");
  await page.reload();
  await expect(page.getByLabel("What do you do?")).toHaveValue(
    "Writer / creator",
  );
  await expect(page.getByLabel("What do you want to make?")).toHaveValue(
    "Comic book",
  );
  await expect(page.getByLabel("Tell us your idea")).toHaveValue(
    "A comic about a young inventor protecting her coastal village.",
  );
  await page.getByRole("button", { name: "Show my steps" }).click();
  await expect(
    page.getByRole("heading", { name: "Make a book" }),
  ).toBeVisible();
  await expect(page.getByText("Book plan")).toBeVisible();
  await expect(page.getByText("Writing", { exact: true })).toBeVisible();
  await expect(
    page.getByText("Guide · no finished work is made yet"),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.goto("/#/tlps/onboarding");
  await page
    .getByLabel("What do you do?")
    .selectOption({ label: "I make films" });
  await page
    .getByLabel("What do you want to make?")
    .selectOption({ label: "Feature film" });
  await page
    .getByLabel("How far do you want to go?")
    .selectOption({ label: "Make and share a film" });
  await page
    .getByLabel("Tell us your idea")
    .fill("A feature film about a team protecting their home and community.");
  await page.getByRole("button", { name: "Show my steps" }).click();
  await expect(page.locator(".tlps-lifecycle-stage")).toHaveCount(6);
  await page.locator(".tlps-lifecycle-stage").nth(2).locator("summary").click();
  await expect(page.getByText("Casting OS · Workspace listed")).toBeVisible();
  await expect(
    page.getByText("Casting Contract", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Male Lead Actor", { exact: true }),
  ).toBeVisible();
  await expect(page.getByText("Magic LP", { exact: true })).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "Open film plan demo" }).click();
  await expect(page).toHaveURL(/#\/tlps-workflow$/);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});

test("TLPS keeps Finance and Evidence separate and marks tools plainly", async ({
  page,
}) => {
  await page.goto("/#/tlps/catalog");
  await expect(
    page.getByRole("heading", { name: "TLPS product catalogue" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Finance", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Evidence", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Evidence & Finance", { exact: true }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "View Finance" }).click();
  await expect(
    page.getByRole("heading", { name: "Finance", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Finance is a separate TLPS area."),
  ).toBeVisible();
  await page
    .getByRole("navigation", { name: "TLPS site" })
    .getByRole("button", { name: "TLPS tools" })
    .click();
  await page.getByRole("button", { name: "View Evidence" }).click();
  await expect(
    page.getByRole("heading", { name: "Evidence", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText(
      "The demo can list sample file names, sizes and check codes.",
    ),
  ).toBeVisible();
  await page.goto("/#/tlps/onboarding");
  await page
    .getByLabel("What do you do?")
    .selectOption({ value: "Producer / filmmaker" });
  await page
    .getByLabel("What do you want to make?")
    .selectOption({ label: "Feature film" });
  await page
    .getByLabel("How far do you want to go?")
    .selectOption({ value: "I2R · Idea to Release" });
  await page
    .getByLabel("Tell us your idea")
    .fill("A family film about finding a new home.");
  await page.getByRole("button", { name: "Show my steps" }).click();
  await expect(page.getByLabel("How far do you want to go?")).toBeVisible();
  await expect(page.getByLabel("How much help do you want?")).toBeVisible();
  await page.locator(".tlps-lifecycle-stage").nth(2).locator("summary").click();
  const preProduction = page.locator(".tlps-lifecycle-stage").nth(2);
  await expect(
    preProduction.locator(".tlps-system-chip").filter({ hasText: "Finance" }),
  ).toBeVisible();
  await expect(
    preProduction
      .locator(".tlps-system-chip")
      .filter({ hasText: "Files & checks" }),
  ).toBeVisible();
  await expect(
    page.getByText("Evidence & Finance", { exact: true }),
  ).toHaveCount(0);
});

test("TLPS inherits MAATAA global themes and stays balanced across breakpoints", async ({
  page,
}) => {
  await page.goto("/#/tlps/onboarding");
  await page.getByRole("button", { name: "Settings" }).click();
  const theme = page.getByLabel("Theme");
  const surface = page.locator(".tlps-site");
  const systemIsDark = await page.evaluate(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  for (const mode of [
    {
      value: "light",
      background: "rgb(251, 248, 241)",
      text: "rgb(34, 29, 22)",
    },
    {
      value: "dark",
      background: "rgb(23, 20, 15)",
      text: "rgb(246, 239, 227)",
    },
    {
      value: "high-contrast",
      background: "rgb(0, 0, 0)",
      text: "rgb(255, 255, 255)",
    },
    {
      value: "oled",
      background: "rgb(0, 0, 0)",
      text: "rgb(247, 247, 247)",
    },
    {
      value: "system",
      background: systemIsDark ? "rgb(23, 20, 15)" : "rgb(251, 248, 241)",
      text: systemIsDark ? "rgb(246, 239, 227)" : "rgb(34, 29, 22)",
    },
  ]) {
    await theme.selectOption(mode.value);
    await expect
      .poll(() =>
        surface.evaluate((node) => getComputedStyle(node).backgroundColor),
      )
      .toBe(mode.background);
    await expect
      .poll(() => surface.evaluate((node) => getComputedStyle(node).color))
      .toBe(mode.text);
    expect(await surface.getAttribute("data-theme")).toBeNull();
  }

  await page.evaluate(() => {
    document.documentElement.style.setProperty("--m-bg", "rgb(1, 2, 3)");
    document.documentElement.style.setProperty("--m-text", "rgb(4, 5, 6)");
    document.documentElement.style.setProperty(
      "--m-font-heading",
      "Georgia, serif",
    );
  });
  await expect
    .poll(() =>
      surface.evaluate((node) => getComputedStyle(node).backgroundColor),
    )
    .toBe("rgb(1, 2, 3)");
  await expect
    .poll(() => surface.evaluate((node) => getComputedStyle(node).color))
    .toBe("rgb(4, 5, 6)");
  await expect
    .poll(() =>
      page
        .getByRole("heading", { name: "Start with you and your idea" })
        .evaluate((node) => getComputedStyle(node).fontFamily),
    )
    .toContain("Georgia");

  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      `page overflows at ${width}px`,
    ).toBe(true);
    expect(
      await page
        .locator(".tlps-site-nav")
        .evaluate((nav) => nav.scrollWidth <= nav.clientWidth),
      `TLPS nav overflows at ${width}px`,
    ).toBe(true);
  }
});
