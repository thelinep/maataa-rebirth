import type { Meta, StoryObj } from "@storybook/react";
import { Sparkline } from "./Sparkline";
import { colorTokens } from "../tokens";

const meta = {
  title: "Data/Sparkline",
  component: Sparkline,
  tags: ["autodocs"],
} satisfies Meta<typeof Sparkline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [4, 6, 5, 8, 9, 7, 10],
    "aria-label": "Last 7 days",
  },
};

export const Declining: Story = {
  args: {
    data: [10, 9, 8, 6, 5, 4, 3],
    color: colorTokens.interactive.error,
    "aria-label": "Declining trend",
  },
};

export const WithoutEndDot: Story = {
  args: {
    data: [4, 6, 5, 8, 9, 7, 10],
    showEndDot: false,
  },
};
