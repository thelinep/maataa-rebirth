import type { Meta, StoryObj } from "@storybook/react";
import { LinkButton } from "./LinkButton";

const meta = {
  title: "Actions/LinkButton",
  component: LinkButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger"],
    },
    underline: {
      control: "select",
      options: ["always", "hover", "none"],
    },
  },
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: "#",
    children: "View all settings",
  },
};

export const Secondary: Story = {
  args: {
    href: "#",
    variant: "secondary",
    children: "Learn more",
  },
};

export const Danger: Story = {
  args: {
    href: "#",
    variant: "danger",
    underline: "always",
    children: "Sign out",
  },
};

export const Disabled: Story = {
  args: {
    href: "#",
    disabled: true,
    children: "Unavailable action",
  },
};
