import type { Meta, StoryObj } from "@storybook/react";
import { FAB } from "./FAB";

const meta = {
  title: "Actions/FAB",
  component: FAB,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["md", "lg"],
    },
    position: {
      control: "select",
      options: ["static", "bottom-right", "bottom-left", "top-right", "top-left"],
    },
  },
} satisfies Meta<typeof FAB>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Circular: Story = {
  args: {
    icon: "+",
    "aria-label": "Create new item",
    position: "static",
  },
};

export const Extended: Story = {
  args: {
    icon: "+",
    label: "New task",
    position: "static",
  },
};

export const Small: Story = {
  args: {
    icon: "+",
    "aria-label": "Create new item",
    size: "md",
    position: "static",
  },
};
