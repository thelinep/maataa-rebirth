import type { Meta, StoryObj } from "@storybook/react";
import { Legend } from "./Legend";
import { chartTokens } from "../tokens";

const meta = {
  title: "Data/Legend",
  component: Legend,
  tags: ["autodocs"],
} satisfies Meta<typeof Legend>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: "Revenue", color: chartTokens.categorical[0] },
      { label: "Costs", color: chartTokens.categorical[1] },
      { label: "Profit", color: chartTokens.categorical[2] },
    ],
  },
};

export const ManySeries: Story = {
  args: {
    items: chartTokens.categorical.map((color, i) => ({ label: `Series ${i + 1}`, color })),
  },
};
