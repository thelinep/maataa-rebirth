import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "../primitives/Card";
import { Badge } from "../primitives/Badge";
import { spacingTokens, typographyTokens } from "../tokens";
import { ThemeProvider, useTheme } from "./ThemeProvider";
import { ThemeToggle } from "./ThemeToggle";

const meta = {
  title: "Themes/ThemeProvider",
  component: ThemeProvider,
  tags: ["autodocs"],
} satisfies Meta<typeof ThemeProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A small panel built directly from `useTheme().colors`/`.chart`, so it
 * repaints live when the theme flips — proving the extracted MAATAA
 * Desktop dark palette out, independent of any pre-existing component.
 */
function ThemedPanel() {
  const { theme, colors, chart } = useTheme();
  return (
    <div
      style={{
        padding: spacingTokens.lg,
        borderRadius: "12px",
        border: `1px solid ${colors.border.primary}`,
        backgroundColor: colors.background.secondary,
        color: colors.text.primary,
        fontFamily: typographyTokens.fontFamily.base,
        minWidth: "320px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <strong>{theme === "dark" ? "MAATAA — night ops" : "MAATAA — paper & ink"}</strong>
        <ThemeToggle />
      </div>
      <p style={{ color: colors.text.secondary, marginTop: spacingTokens.sm }}>
        Sampled from the live desktop app and re-validated as a chart palette.
      </p>
      <div style={{ display: "flex", gap: spacingTokens.xs, marginTop: spacingTokens.md }}>
        {chart.categorical.map((hex) => (
          <span
            key={hex}
            title={hex}
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "4px",
              backgroundColor: hex,
              border: `1px solid ${colors.border.secondary}`,
            }}
          />
        ))}
      </div>
      <div style={{ display: "flex", gap: spacingTokens.sm, marginTop: spacingTokens.md }}>
        <span style={{ color: colors.interactive.success }}>● Runtime healthy</span>
        <span style={{ color: colors.interactive.warning }}>● Reserved</span>
        <span style={{ color: colors.interactive.error }}>● Alert</span>
      </div>
    </div>
  );
}

export const Light: Story = {
  render: () => (
    <ThemeProvider defaultTheme="light">
      <ThemedPanel />
    </ThemeProvider>
  ),
};

export const Dark: Story = {
  render: () => (
    <ThemeProvider defaultTheme="dark">
      <ThemedPanel />
    </ThemeProvider>
  ),
};

export const Toggleable: Story = {
  render: () => (
    <ThemeProvider defaultTheme="light">
      <ThemedPanel />
    </ThemeProvider>
  ),
};

/**
 * Existing library components (Card, Badge, ...) are styled from the
 * static `colorTokens` import, not `useTheme()`, so they stay on the
 * light palette inside a dark ThemeProvider until migrated — this story
 * documents that boundary rather than hiding it.
 */
export const UnmigratedComponentsStayLight: Story = {
  render: () => (
    <ThemeProvider defaultTheme="dark">
      <div style={{ display: "flex", flexDirection: "column", gap: spacingTokens.md }}>
        <ThemedPanel />
        <Card style={{ padding: spacingTokens.md }}>
          <Badge>Still light-themed</Badge>
          <p>This Card/Badge pair imports colorTokens directly.</p>
        </Card>
      </div>
    </ThemeProvider>
  ),
};
