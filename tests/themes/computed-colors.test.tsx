import React from "react";
import fs from "node:fs";
import path from "node:path";
import { render, screen } from "@testing-library/react";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { UiProvider } from "../../src/foundation";

// Computed theme tokens inside the UiProvider subtree, per theme.
//
// jsdom applies selector-matched custom properties (so `--m-bg` on <html> and
// on `.maataa-root` is computed correctly) but does not inherit custom
// properties to descendants or resolve var(). The probe's effective value is
// therefore read the way CSS inheritance resolves it: from the nearest element,
// starting at the probe, that has a computed value for the token.

const css = fs.readFileSync(
  path.resolve(__dirname, "../../src/styles.css"),
  "utf8",
);

/** The value a stylesheet rule assigns to `token`, for the rule whose selector list contains `selector`. */
function tokenFor(selector: string, token: string): string {
  for (const match of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const selectors = match[1].split(",").map((s) => s.trim());
    if (!selectors.includes(selector)) continue;
    const value = new RegExp(`${token}\\s*:\\s*([^;}]+)`).exec(match[2]);
    if (value) return value[1].trim();
  }
  throw new Error(`styles.css has no ${token} for ${selector}`);
}

const THEMES = ["light", "dark", "high-contrast", "oled"] as const;
type Theme = (typeof THEMES)[number];

// Each theme's tokens, as src/styles.css defines them.
const expected = (theme: Theme, token: "--m-bg" | "--m-text") =>
  theme === "light"
    ? tokenFor(":root", token)
    : tokenFor(`[data-maataa-theme="${theme}"]`, token);

function effective(element: Element, token: string): string {
  for (let node: Element | null = element; node; node = node.parentElement) {
    const value = getComputedStyle(node).getPropertyValue(token).trim();
    if (value) return value;
  }
  return "";
}

let style: HTMLStyleElement;
beforeAll(() => {
  style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
});
afterAll(() => style.remove());

describe("UiProvider theme tokens reach its subtree", () => {
  it("the stylesheet defines different light and dark backgrounds (so drift is detectable)", () => {
    expect(expected("light", "--m-bg")).not.toBe(expected("dark", "--m-bg"));
    expect(expected("light", "--m-text")).not.toBe(
      expected("dark", "--m-text"),
    );
  });

  for (const theme of THEMES) {
    it(`${theme}: --m-bg and --m-text inside the provider match the ${theme} tokens`, () => {
      render(
        <UiProvider theme={theme}>
          <span data-testid="probe">x</span>
        </UiProvider>,
      );
      const probe = screen.getByTestId("probe");
      const root = probe.closest(".maataa-root")!;
      const diagnostics = {
        theme,
        html: getComputedStyle(document.documentElement)
          .getPropertyValue("--m-bg")
          .trim(),
        maataaRoot: getComputedStyle(root).getPropertyValue("--m-bg").trim(),
        probe: effective(probe, "--m-bg"),
        expected: expected(theme, "--m-bg"),
      };
      console.log(`computed --m-bg ${JSON.stringify(diagnostics)}`);

      expect(effective(probe, "--m-bg")).toBe(expected(theme, "--m-bg"));
      expect(effective(probe, "--m-text")).toBe(expected(theme, "--m-text"));
    });
  }
});
