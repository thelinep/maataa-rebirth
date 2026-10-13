import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ThemeProvider, useTheme } from "../../src/themes";

function AdvanceThemeButton() {
  const { theme, setTheme } = useTheme();
  const nextTheme = theme === "light" ? "dark" : "oled";

  return (
    <>
      <output data-testid="current-theme">{theme}</output>
      <button type="button" onClick={() => setTheme(nextTheme)}>
        Advance theme
      </button>
    </>
  );
}

describe("ThemeProvider callback freshness", () => {
  it("uses the latest callback and current theme across consecutive setTheme calls", () => {
    const firstCallback = vi.fn();
    const latestCallback = vi.fn();
    const { rerender } = render(
      <ThemeProvider defaultTheme="light" onThemeChange={firstCallback}>
        <AdvanceThemeButton />
      </ThemeProvider>,
    );

    rerender(
      <ThemeProvider defaultTheme="light" onThemeChange={latestCallback}>
        <AdvanceThemeButton />
      </ThemeProvider>,
    );

    const advance = screen.getByRole("button", { name: "Advance theme" });
    fireEvent.click(advance);
    expect(screen.getByTestId("current-theme").textContent).toBe("dark");

    fireEvent.click(advance);

    expect(screen.getByTestId("current-theme").textContent).toBe("oled");
    expect(firstCallback).not.toHaveBeenCalled();
    expect(latestCallback.mock.calls.map(([theme]) => theme)).toEqual(["dark", "oled"]);
  });
});
