import { expect, test, type Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const providers = [
  {
    id: "ollama",
    label: "Local Ollama",
    configured: true,
    message: "Connected to the local Ollama service.",
    models: [{ id: "qwen2.5:7b", label: "qwen2.5:7b" }],
  },
  {
    id: "anthropic",
    label: "Anthropic",
    configured: true,
    message: "Server credential is configured.",
    models: [{ id: "claude-sonnet-test", label: "claude-sonnet-test" }],
  },
  {
    id: "gemini",
    label: "Google Gemini",
    configured: true,
    message: "Server credential is configured.",
    models: [{ id: "gemini-test", label: "gemini-test" }],
  },
];

async function mockRuntime(page: Page) {
  const calls: Array<Record<string, unknown>> = [];
  await page.route("**/api/brahmini/status", (route) =>
    route.fulfill({ json: { providers } }),
  );
  await page.route("**/api/brahmini/chat", async (route) => {
    const body = route.request().postDataJSON() as Record<string, unknown>;
    calls.push(body);
    const provider = String(body.provider);
    const model =
      providers.find((item) => item.id === provider)?.models[0]?.id ||
      "test-model";
    const system = String(body.system ?? "");
    const idea =
      String(
        (body.messages as Array<{ content?: string }> | undefined)?.at(-1)
          ?.content ?? "",
      )
        .split("User idea:\n")
        .at(-1) ?? "";
    const text = system.includes("extract a bounded product-requirements graph")
      ? JSON.stringify({
          schemaVersion: "maataa.product-graph.v1",
          id: "maker-tool-library",
          name: "Maker Tool Library",
          idea: idea.trim(),
          audience: "Unspecified",
          nodes: [
            {
              id: "tool",
              kind: "entity",
              label: "Tool",
              detail: "Shared tool record",
              uiNeed: "table",
              sourceQuote: "tool library",
              confidence: "high",
            },
          ],
          edges: [],
          unknowns: ["Who can approve a loan?"],
        })
      : `A reviewable answer from ${provider}.`;
    await route.fulfill({ json: { text, provider, model } });
  });
  return calls;
}

async function completeProductIntake(page: Page, idea: string) {
  await page.getByRole("button", { name: "Product Forge" }).click();
  await page.getByRole("textbox", { name: "Working name" }).fill("Community tool library");
  await page
    .getByRole("textbox", { name: "What idea should the first product slice explore?" })
    .fill(idea);
  await page.getByRole("button", { name: "Step 8: Review" }).click();
  await expect(page.getByText("Ready for your review")).toBeVisible();
  await page.getByRole("button", { name: "Use reviewed brief in Product Forge" }).click();
}

test("Brahmini is reachable from Help and answers with provider and local-source attribution", async ({
  page,
}) => {
  await mockRuntime(page);
  await page.goto("/#/help");
  await page
    .getByRole("button", { name: "Open Brahmini help and product assistant" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Brahmini Workbench" }),
  ).toBeVisible();
  await page
    .getByRole("textbox", { name: "Ask Brahmini" })
    .fill("What does the AI surface actually run?");
  await page.getByRole("button", { name: "Ask Brahmini" }).click();
  await expect(
    page.getByText("A reviewable answer from ollama."),
  ).toBeVisible();
  await expect(page.getByText(/Local sources:/)).toBeVisible();
  await expect(
    page.getByText("Connected to the local Ollama service."),
  ).toHaveCount(0);
});

test("Product Forge conducts a multi-agent handoff and synthesizes downloadable work", async ({
  page,
}) => {
  const calls = await mockRuntime(page);
  await page.goto("/#/brahmini");
  await page.getByRole("button", { name: "Providers" }).click();
  await page
    .getByRole("combobox", { name: "Shiv provider" })
    .selectOption("anthropic");
  await page
    .getByRole("combobox", { name: "Parvati provider" })
    .selectOption("gemini");
  await completeProductIntake(
    page,
    "A local library for community tool lending with availability and repair notes.",
  );
  await page.getByRole("button", { name: "Develop product draft" }).click();
  await expect(page.locator(".brahmini-run-status")).toContainText(
    "Agent conversations complete",
    { timeout: 15_000 },
  );
  await expect(page.getByText("Brahmini · synthesis")).toBeVisible();
  expect(calls.length).toBe(8);
  const providersUsed = new Set(calls.map((call) => call.provider));
  expect([...providersUsed].sort()).toEqual(["anthropic", "gemini", "ollama"]);
  await expect(
    page.getByRole("button", { name: "Export draft" }),
  ).toBeVisible();
});

test("idea becomes a reviewed graph, canonical TypeScript snapshot and Sandbox composition", async ({
  page,
}) => {
  await mockRuntime(page);
  await page.goto("/#/brahmini");
  await completeProductIntake(page, "A tool library for local makers.");
  await page
    .getByRole("button", { name: "Extract structured product schema" })
    .click();
  await expect(page.locator(".brahmini-run-status")).toContainText("Schema valid");
  const graphEditor = page.getByRole("textbox", {
    name: "Product graph JSON · edit",
  });
  const graph = JSON.parse(await graphEditor.inputValue()) as {
    idea: string;
    nodes: Array<{ sourceQuote: string | null }>;
  };
  graph.idea = "A fabricated source idea.";
  graph.nodes[0]!.sourceQuote = "source idea";
  await graphEditor.fill(JSON.stringify(graph, null, 2));
  await page.getByRole("button", { name: "Validate reviewed schema" }).click();
  await expect(page.getByRole("alert")).toContainText(
    "differs from the submitted idea",
  );
  await page
    .getByRole("button", { name: "Extract structured product schema" })
    .click();
  await expect(page.locator(".brahmini-run-status")).toContainText("Schema valid");
  await page
    .getByRole("button", { name: "Compile TypeScript snapshot" })
    .click();
  await expect(
    page.getByText(/DataTable · COMPONENT\.DATA\.DATATABLE/),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Export TypeScript snapshot" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Preview composition in Sandbox" })
    .click();
  await expect(page).toHaveURL(/#\/sandbox$/);
  await expect(
    page.getByRole("heading", { name: "Compose real package components" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Composition library" }),
  ).toBeVisible();
});

test("Sandbox composition library reopens a named snapshot after reload", async ({
  page,
}, testInfo) => {
  await mockRuntime(page);
  const mobile = testInfo.project.name.includes("mobile");
  await page.setViewportSize(
    mobile ? { width: 390, height: 844 } : { width: 1440, height: 1000 },
  );
  await page.goto("/#/sandbox");
  await page
    .getByRole("textbox", { name: "Composition name" })
    .fill("Pilot planning");
  await page.getByRole("button", { name: "Save as new" }).click();
  await expect(
    page.locator(".composer-library").getByRole("status"),
  ).toContainText("Saved in this browser");
  await expect(
    page.getByRole("combobox", { name: "Saved compositions" }),
  ).toContainText("Pilot planning");
  await page.reload();
  await page
    .getByRole("combobox", { name: "Saved compositions" })
    .selectOption({ index: 1 });
  await page.getByRole("button", { name: "Open", exact: true }).click();
  await expect(
    page.locator(".composer-library").getByRole("status"),
  ).toContainText("Loaded Pilot planning");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    ),
  ).toBe(false);
  const directory = resolve(process.cwd(), ".impeccable/review");
  mkdirSync(directory, { recursive: true });
  await page.screenshot({
    path: resolve(directory, mobile ? "sandbox-mobile.png" : "sandbox-desktop.png"),
    fullPage: true,
  });
});

test("guided product intake keeps gaps explicit and gates provider calls until review", async ({ page }) => {
  const calls = await mockRuntime(page);
  await page.goto("/#/brahmini");
  await page.getByRole("button", { name: "Product Forge" }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByRole("alert")).toContainText("Add a working name");
  await expect(page.getByRole("heading", { name: "Start with the idea" })).toBeVisible();
  await page.getByRole("combobox", { name: "Product context" }).selectOption("tlps");
  await page.getByRole("textbox", { name: "Working name" }).fill("Planning helper");
  await page.getByRole("textbox", { name: "What idea should the first product slice explore?" }).fill("A planning helper for a production team.");
  await page.getByRole("button", { name: "Step 8: Review" }).click();
  await expect(page.getByRole("textbox", { name: "Review and edit the brief that will be sent" })).toHaveValue(/TLPS context/);
  await expect(page.getByRole("textbox", { name: "Review and edit the brief that will be sent" })).toHaveValue(/does not import or verify domain facts/);
  await expect(page.getByRole("textbox", { name: "Review and edit the brief that will be sent" })).toHaveValue(/Not supplied yet — keep this as unknown/);
  await expect(page.getByRole("button", { name: "Use reviewed brief in Product Forge" })).toBeEnabled();
  await expect(page.getByRole("button", { name: "Develop product draft" })).toBeDisabled();
  expect(calls).toHaveLength(0);
  await page.getByRole("button", { name: "Use reviewed brief in Product Forge" }).click();
  await page.getByRole("button", { name: "Develop product draft" }).click();
  await expect(page.locator(".brahmini-run-status")).toContainText("Agent conversations complete", { timeout: 15_000 });
  expect(calls).toHaveLength(8);
});

test("guided intake draft resumes after reload and edits invalidate approval", async ({ page }) => {
  await mockRuntime(page);
  await page.goto("/#/brahmini");
  await page.getByRole("button", { name: "Product Forge" }).click();
  await page.getByRole("textbox", { name: "Working name" }).fill("Community tool library");
  await page.getByRole("textbox", { name: "What idea should the first product slice explore?" }).fill("A local tool lending workflow.");
  await page.getByRole("button", { name: "Step 8: Review" }).click();
  await expect(page.getByRole("heading", { name: "Review before using models" })).toBeVisible();
  await page.getByRole("button", { name: "Use reviewed brief in Product Forge" }).click();
  await page.reload();
  await page.getByRole("button", { name: "Product Forge" }).click();
  await expect(page.getByRole("textbox", { name: "Review and edit the brief that will be sent" })).toHaveValue(/Community tool library/);
  await page.getByRole("button", { name: "Step 8: Review" }).click();
  await expect(page.getByRole("button", { name: "Develop product draft" })).toBeDisabled();
  await expect(page.getByText("Complete all intake steps, review the brief, then apply it to enable provider calls")).toBeVisible();
  await page.getByRole("button", { name: "Step 1: Concept" }).click();
  await page.getByRole("textbox", { name: "What idea should the first product slice explore?" }).fill("A shared directory with repair notes.");
  await page.getByRole("button", { name: "Step 8: Review" }).click();
  await expect(page.getByRole("button", { name: "Develop product draft" })).toBeDisabled();
});

test("working notes persist locally and disclose that this is not fine-tuning", async ({
  page,
}) => {
  await mockRuntime(page);
  await page.goto("/#/brahmini");
  await page.getByRole("button", { name: "Teach Brahmini" }).click();
  await expect(
    page.getByText(/not model-weight training or fine-tuning/),
  ).toBeVisible();
  await page
    .getByRole("textbox", {
      name: "Product principles, domain facts and accepted decisions",
    })
    .fill("Prefer accessible workflows and explicit evidence.");
  await page.getByRole("button", { name: "Save working context" }).click();
  await expect(page.getByRole("button", { name: "Saved here" })).toBeVisible();
  await page.reload();
  await page.getByRole("button", { name: "Teach Brahmini" }).click();
  await expect(
    page.getByRole("textbox", {
      name: "Product principles, domain facts and accepted decisions",
    }),
  ).toHaveValue("Prefer accessible workflows and explicit evidence.");
});

test("agent council starts ordered agent conversations and exports proposals", async ({
  page,
}) => {
  const calls = await mockRuntime(page);
  await page.goto("/#/brahmini");
  await page.getByRole("button", { name: "Agent council" }).click();
  await page
    .getByRole("textbox", {
      name: "What part of the ecosystem should the team examine?",
    })
    .fill("Find the next valuable MAATAA vertical slice.");
  await page.getByRole("button", { name: "Start agent conversation" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Agent conversations complete",
    { timeout: 15_000 },
  );
  expect(calls).toHaveLength(8);
  await expect(
    page.getByRole("button", { name: "Export findings" }),
  ).toBeVisible();
  await expect(
    page.getByText("A council response is a proposal.", { exact: false }),
  ).toBeVisible();
});

test("capture the Brahmini Workbench for desktop and mobile review", async ({
  page,
}, testInfo) => {
  await mockRuntime(page);
  const mobile = testInfo.project.name.includes("mobile");
  await page.setViewportSize(
    mobile ? { width: 390, height: 844 } : { width: 1440, height: 1000 },
  );
  await page.goto("/#/brahmini");
  await page.getByRole("button", { name: "Product Forge" }).click();
  await page.getByRole("textbox", { name: "Working name" }).fill("Community tool library");
  await page.getByRole("textbox", { name: "What idea should the first product slice explore?" }).fill("A local tool lending workflow.");
  await page.getByRole("button", { name: "Step 8: Review" }).click();
  await expect(page.getByRole("heading", { name: "Review before using models" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Brahmini Workbench" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Guided product intake" })).toBeVisible();
  if (mobile) {
    await expect(page.getByText("Scroll the steps to see the full sequence.")).toBeVisible();
    await expect(page.locator(".brahmini-agent-picker")).toHaveCSS(
      "max-height",
      "none",
    );
    await expect(page.getByText("Kashyapa", { exact: true })).toBeVisible();
  } else {
    await expect(page.getByText("Scroll the steps to see the full sequence.")).toBeHidden();
  }
  const directory = resolve(process.cwd(), ".impeccable/review");
  mkdirSync(directory, { recursive: true });
  await page.screenshot({
    path: resolve(
      directory,
      mobile ? "mobile.png" : "desktop.png",
    ),
    fullPage: true,
  });
});
