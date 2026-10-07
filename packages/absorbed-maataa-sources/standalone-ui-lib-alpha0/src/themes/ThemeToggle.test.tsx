import React, { createRef } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider, useTheme } from "./ThemeProvider";
import { ThemeToggle } from "./ThemeToggle";
import { darkColorTokens, colorTokens } from "../tokens";

function CurrentTheme() {
  const { theme } = useTheme();
  return <span data-testid="theme">{theme}</span>;
}

describe("ThemeToggle", () => {
  it("renders as a switch labeled with the current theme", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    const toggle = screen.getByRole("switch");
    expect(toggle).toHaveAttribute("aria-checked", "false");
    expect(toggle).toHaveTextContent("Light");
  });

  it("reflects the dark theme when defaultTheme is dark", () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeToggle />
      </ThemeProvider>
    );
    const toggle = screen.getByRole("switch");
    expect(toggle).toHaveAttribute("aria-checked", "true");
    expect(toggle).toHaveTextContent("Dark");
  });

  it("flips the provider's theme when clicked", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
        <CurrentTheme />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme")).toHaveTextContent("light");
    fireEvent.click(screen.getByRole("switch"));
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
    expect(screen.getByRole("switch")).toHaveTextContent("Dark");
  });

  it("uses a default aria-label describing the switch action", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    expect(screen.getByRole("switch", { name: "Switch to dark theme" })).toBeInTheDocument();
  });

  it("accepts a custom aria-label", () => {
    render(
      <ThemeProvider>
        <ThemeToggle aria-label="Toggle appearance" />
      </ThemeProvider>
    );
    expect(screen.getByRole("switch", { name: "Toggle appearance" })).toBeInTheDocument();
  });

  it("re-themes itself when the theme changes (styled from useTheme, not static tokens)", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    const toggle = screen.getByRole("switch");
    expect(toggle.style.backgroundColor).toBe(hexToRgb(colorTokens.background.secondary));
    fireEvent.click(toggle);
    expect(toggle.style.backgroundColor).toBe(hexToRgb(darkColorTokens.background.secondary));
  });

  it("forwards the ref to the button element", () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <ThemeProvider>
        <ThemeToggle ref={ref} />
      </ThemeProvider>
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("has a displayName", () => {
    expect(ThemeToggle.displayName).toBe("ThemeToggle");
  });

  it("throws when rendered outside a ThemeProvider", () => {
    // ThemeToggle reads useTheme(), which throws outside a provider — this
    // documents that dependency rather than exercising a try/catch path.
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<ThemeToggle />)).toThrow();
    spy.mockRestore();
  });
});

/** jsdom normalizes inline hex colors to rgb(...) on `.style` reads. */
function hexToRgb(hex: string): string {
  const value = hex.replace("#", "");
  const r = parseInt(value.substring(0, 2), 16);
  const g = parseInt(value.substring(2, 4), 16);
  const b = parseInt(value.substring(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
}
