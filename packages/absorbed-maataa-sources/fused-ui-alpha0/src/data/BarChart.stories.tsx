import type { Meta, StoryObj } from "@storybook/react";
import { BarChart } from "./BarChart";

const meta = {
  title: "Data/BarChart",
  component: BarChart,
  tags: ["autodocs"],
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const categories = ["Q1", "Q2", "Q3", "Q4"];

export const SingleSeries: Story = {
  args: {
    categories,
    series: [{ label: "Revenue", data: [120, 180, 150, 220] }],
  },
};

export const GroupedSeries: Story = {
  args: {
    categories,
    series: [
      { label: "Revenue", data: [120, 180, 150, 220] },
      { label: "Costs", data: [60, 90, 80, 110] },
    ],
  },
};
