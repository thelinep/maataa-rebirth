import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, renderHook } from "@testing-library/react";
import { ThemeProvider, useTheme } from "./ThemeProvider";
import { colorTokens, darkColorTokens, chartTokens, darkChartTokens } from "../tokens";

function Consumer() {
  const { theme, colors, chart } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="bg">{colors.background.primary}</span>
      <span data-testid="chart-single">{chart.single}</span>
    </div>
  );
}

function ToggleConsumer() {
  const { theme, setTheme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>toggle</button>
      <button onClick={() => setTheme("dark")}>set dark</button>
    </div>
  );
}

describe("ThemeProvider / useTheme", () => {
  it("defaults to the light theme", () => {
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme")).toHaveTextContent("light");
    expect(screen.getByTestId("bg")).toHaveTextContent(colorTokens.background.primary);
    expect(screen.getByTestId("chart-single")).toHaveTextContent(chartTokens.single);
  });

  it("renders the dark palette when defaultTheme is dark", () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <Consumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
    expect(screen.getByTestId("bg")).toHaveTextContent(darkColorTokens.background.primary);
    expect(screen.getByTestId("chart-single")).toHaveTextContent(darkChartTokens.single);
  });

  it("toggleTheme flips between light and dark", () => {
    render(
      <ThemeProvider>
        <ToggleConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme")).toHaveTextContent("light");
    fireEvent.click(screen.getByText("toggle"));
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
    fireEvent.click(screen.getByText("toggle"));
    expect(screen.getByTestId("theme")).toHaveTextContent("light");
  });

  it("setTheme sets the theme directly", () => {
    render(
      <ThemeProvider>
        <ToggleConsumer />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByText("set dark"));
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
  });

  it("stays on the controlled theme and ignores internal toggles", () => {
    render(
      <ThemeProvider theme="dark">
        <ToggleConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
    fireEvent.click(screen.getByText("toggle"));
    // Controlled: the displayed theme doesn't change on its own.
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
  });

  it("calls onThemeChange when the theme changes", () => {
    const onThemeChange = vi.fn();
    render(
      <ThemeProvider onThemeChange={onThemeChange}>
        <ToggleConsumer />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByText("toggle"));
    expect(onThemeChange).toHaveBeenCalledWith("dark");
  });

  it("sets data-maataa-theme on its wrapper element", () => {
    const { container } = render(
      <ThemeProvider defaultTheme="dark">
        <span>content</span>
      </ThemeProvider>
    );
    expect(container.querySelector('[data-maataa-theme="dark"]')).toBeInTheDocument();
  });

  it("mirrors the active palette as CSS custom properties on its wrapper", () => {
    const { container } = render(
      <ThemeProvider defaultTheme="dark">
        <span>content</span>
      </ThemeProvider>
    );
    const wrapper = container.querySelector("[data-maataa-theme]") as HTMLElement;
    expect(wrapper.style.getPropertyValue("--maataa-background-primary")).toBe(
      darkColorTokens.background.primary
    );
    expect(wrapper.style.getPropertyValue("--maataa-text-primary")).toBe(
      darkColorTokens.text.primary
    );
    expect(wrapper.style.getPropertyValue("--maataa-semantic-success-bg")).toBe(
      darkColorTokens.semantic.success.bg
    );
  });

  it("useTheme throws when used outside a ThemeProvider", () => {
    // Swallow the expected console.error from React's error boundary logging.
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderHook(() => useTheme())).toThrow(
      "useTheme must be used within a <ThemeProvider>"
    );
    spy.mockRestore();
  });
});
