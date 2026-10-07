import type { Meta, StoryObj } from "@storybook/react";
import { Menu } from "./Menu";

const meta = {
  title: "Navigation/Menu",
  component: Menu,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"],
    },
  },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  args: {
    items: [
      { id: "home", label: "Home", icon: "🏠", href: "#" },
      { id: "docs", label: "Documentation", icon: "📄", href: "#" },
      { id: "settings", label: "Settings", icon: "⚙", href: "#" },
    ],
    activeId: "home",
  },
};

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
    items: [
      { id: "home", label: "Home", href: "#" },
      { id: "docs", label: "Docs", href: "#" },
      { id: "pricing", label: "Pricing", href: "#" },
    ],
    activeId: "docs",
  },
};

export const NestedGroups: Story = {
  args: {
    items: [
      { id: "home", label: "Home", href: "#" },
      {
        id: "settings",
        label: "Settings",
        children: [
          { id: "profile", label: "Profile", href: "#" },
          { id: "security", label: "Security", href: "#" },
        ],
      },
    ],
    defaultExpandedIds: ["settings"],
    activeId: "profile",
  },
};

export const WithDisabledItem: Story = {
  args: {
    items: [
      { id: "home", label: "Home", href: "#" },
      { id: "billing", label: "Billing (unavailable)", disabled: true },
    ],
  },
};
