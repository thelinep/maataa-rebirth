import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./EmptyState";

const meta = {
  title: "Data/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "No results yet",
  },
};

export const WithDescription: Story = {
  args: {
    icon: "📊",
    title: "No data yet",
    description: "Data will appear here once the first event comes in.",
  },
};

export const WithAction: Story = {
  args: {
    icon: "📁",
    title: "No projects",
    description: "Create your first project to get started.",
    action: <button type="button">Create project</button>,
  },
};
