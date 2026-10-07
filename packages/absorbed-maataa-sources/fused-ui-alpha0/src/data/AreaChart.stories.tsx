import type { Meta, StoryObj } from "@storybook/react";
import { AreaChart } from "./AreaChart";

const meta = {
  title: "Data/AreaChart",
  component: AreaChart,
  tags: ["autodocs"],
} satisfies Meta<typeof AreaChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const categories = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const SingleSeries: Story = {
  args: {
    categories,
    series: [{ label: "Sessions", data: [120, 180, 150, 220, 300, 260, 310] }],
  },
};

export const MultiSeries: Story = {
  args: {
    categories,
    series: [
      { label: "Sessions", data: [120, 180, 150, 220, 300, 260, 310] },
      { label: "Pageviews", data: [340, 420, 380, 500, 620, 560, 640] },
    ],
  },
};
