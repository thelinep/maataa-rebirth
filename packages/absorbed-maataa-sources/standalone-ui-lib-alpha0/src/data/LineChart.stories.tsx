import type { Meta, StoryObj } from "@storybook/react";
import { LineChart } from "./LineChart";

const meta = {
  title: "Data/LineChart",
  component: LineChart,
  tags: ["autodocs"],
} satisfies Meta<typeof LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const categories = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const SingleSeries: Story = {
  args: {
    categories,
    series: [{ label: "Visits", data: [120, 180, 150, 220, 300, 260, 310] }],
  },
};

export const MultiSeries: Story = {
  args: {
    categories,
    series: [
      { label: "Visits", data: [120, 180, 150, 220, 300, 260, 310] },
      { label: "Signups", data: [12, 18, 14, 22, 30, 25, 32] },
      { label: "Purchases", data: [4, 6, 5, 8, 11, 9, 12] },
    ],
  },
};
