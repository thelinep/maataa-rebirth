import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./IconButton";

const meta = {
  title: "Actions/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "danger"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: "✕",
    "aria-label": "Close",
  },
};

export const Primary: Story = {
  args: {
    icon: "★",
    "aria-label": "Favorite",
    variant: "primary",
  },
};

export const Danger: Story = {
  args: {
    icon: "🗑",
    "aria-label": "Delete",
    variant: "danger",
  },
};

export const Square: Story = {
  args: {
    icon: "⚙",
    "aria-label": "Settings",
    rounded: false,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <IconButton icon="✕" aria-label="Close small" size="sm" />
      <IconButton icon="✕" aria-label="Close medium" size="md" />
      <IconButton icon="✕" aria-label="Close large" size="lg" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    icon: "✕",
    "aria-label": "Close",
    disabled: true,
  },
};
