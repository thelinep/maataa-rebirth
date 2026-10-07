import type { Meta, StoryObj } from "@storybook/react";
import { DonutChart } from "./DonutChart";

const meta = {
  title: "Data/DonutChart",
  component: DonutChart,
  tags: ["autodocs"],
} satisfies Meta<typeof DonutChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [
      { label: "Direct", value: 420 },
      { label: "Referral", value: 180 },
      { label: "Social", value: 90 },
      { label: "Email", value: 60 },
    ],
  },
};

export const WithoutTotal: Story = {
  args: {
    data: [
      { label: "Direct", value: 420 },
      { label: "Referral", value: 180 },
      { label: "Social", value: 90 },
    ],
    showTotal: false,
  },
};
