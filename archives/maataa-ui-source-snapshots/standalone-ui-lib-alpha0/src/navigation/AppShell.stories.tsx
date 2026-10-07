import type { Meta, StoryObj } from "@storybook/react";
import { AppShell } from "./AppShell";
import { TopNav } from "./TopNav";
import { Sidebar } from "./Sidebar";

const navItems = [
  { id: "home", label: "Home", icon: "🏠", href: "#" },
  { id: "docs", label: "Documentation", icon: "📄", href: "#" },
  { id: "settings", label: "Settings", icon: "⚙", href: "#" },
];

const meta = {
  title: "Navigation/AppShell",
  component: AppShell,
  tags: ["autodocs"],
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullLayout: Story = {
  render: () => (
    <div style={{ height: "500px", border: "1px solid #D4AF9F" }}>
      <AppShell
        fullHeight={false}
        topNav={<TopNav brand={<strong>Maataa</strong>} actions={<span>jane@example.com</span>} />}
        sidebar={<Sidebar items={navItems} activeId="home" />}
      >
        <div style={{ padding: "24px" }}>
          <h1>Dashboard</h1>
          <p>Main page content goes here.</p>
        </div>
      </AppShell>
    </div>
  ),
};

export const SidebarOnly: Story = {
  render: () => (
    <div style={{ height: "400px", border: "1px solid #D4AF9F" }}>
      <AppShell fullHeight={false} sidebar={<Sidebar items={navItems} activeId="docs" />}>
        <div style={{ padding: "24px" }}>
          <p>Content without a top bar.</p>
        </div>
      </AppShell>
    </div>
  ),
};

export const TopNavOnly: Story = {
  render: () => (
    <div style={{ height: "300px", border: "1px solid #D4AF9F" }}>
      <AppShell
        fullHeight={false}
        topNav={<TopNav brand={<strong>Maataa</strong>} items={navItems} activeId="home" />}
      >
        <div style={{ padding: "24px" }}>
          <p>Content without a sidebar.</p>
        </div>
      </AppShell>
    </div>
  ),
};
