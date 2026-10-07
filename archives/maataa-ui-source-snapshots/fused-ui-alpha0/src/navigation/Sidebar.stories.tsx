import type { Meta, StoryObj } from "@storybook/react";
import { Sidebar } from "./Sidebar";

const items = [
  { id: "home", label: "Home", icon: "🏠", href: "#" },
  { id: "docs", label: "Documentation", icon: "📄", href: "#" },
  { id: "settings", label: "Settings", icon: "⚙", href: "#" },
];

const meta = {
  title: "Navigation/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ height: "400px" }}>
      <Sidebar {...args} items={items} activeId="home" header={<strong>Maataa</strong>} />
    </div>
  ),
};

export const Collapsed: Story = {
  render: (args) => (
    <div style={{ height: "400px" }}>
      <Sidebar {...args} items={items} activeId="home" collapsed />
    </div>
  ),
};

export const WithFooter: Story = {
  render: (args) => (
    <div style={{ height: "400px" }}>
      <Sidebar
        {...args}
        items={items}
        activeId="docs"
        header={<strong>Maataa</strong>}
        footer={<span>jane@example.com</span>}
      />
    </div>
  ),
};
