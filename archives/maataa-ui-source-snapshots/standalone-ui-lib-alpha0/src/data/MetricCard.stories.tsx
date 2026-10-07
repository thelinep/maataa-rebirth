import type { Meta, StoryObj } from "@storybook/react";
import { MetricCard } from "./MetricCard";

const meta = {
  title: "Data/MetricCard",
  component: MetricCard,
  tags: ["autodocs"],
} satisfies Meta<typeof MetricCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Total revenue",
    value: 128400,
    valuePrefix: "$",
  },
};

export const WithPositiveDelta: Story = {
  args: {
    label: "Total revenue",
    value: 128400,
    valuePrefix: "$",
    delta: 12.4,
    deltaPeriod: "vs last month",
    trend: [4, 6, 5, 8, 9, 7, 10],
  },
};

export const WithNegativeDeltaThatIsGood: Story = {
  name: "With negative delta that is good (churn)",
  args: {
    label: "Churn rate",
    value: 2.1,
    delta: -0.8,
    deltaPeriod: "vs last month",
    positiveIsGood: false,
    trend: [5, 4.5, 4, 3.2, 2.8, 2.4, 2.1],
  },
};

export const StringValue: Story = {
  args: {
    label: "System status",
    value: "Healthy",
  },
};
