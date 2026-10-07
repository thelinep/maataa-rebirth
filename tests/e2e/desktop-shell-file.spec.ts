import { expect, test } from "@playwright/test";
import path from "node:path";
import { pathToFileURL } from "node:url";

test("opening the Electron renderer source directly explains how to launch the desktop app", async ({ page }) => {
  const shellUrl = pathToFileURL(path.resolve("examples/support-center/electron/desktop-shell.html")).href;
  await page.goto(shellUrl);
  await expect(page.getByRole("heading", { name: "Launch the desktop app to open both workspaces" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Open MAATAA Desktop" })).toHaveAttribute("href", "http://127.0.0.1:4179/");
});
