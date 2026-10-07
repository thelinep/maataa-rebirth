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

export const WorkspaceShell: Story = {
  render: () => (
    <div style={{ height: "560px", border: "1px solid #D4AF9F" }}>
      <AppShell
        fullHeight={false}
        navigationPosition="left"
        topNav={
          <TopNav
            brand={<strong>MAATAA Workspace</strong>}
            actions={<span>Search · Updates · Maya Chen</span>}
          />
        }
        sidebar={
          <Sidebar
            header={<strong>Workspace</strong>}
            items={[
              { id: "overview", label: "Workspace overview" },
              { id: "projects", label: "Project Dashboard" },
              { id: "calendar", label: "Calendar" },
              { id: "tasks", label: "Tasks" },
            ]}
            activeId="overview"
            footer={<span>Maya Chen · Product</span>}
          />
        }
        toolbar={
          <div style={{ padding: "12px 20px", borderBottom: "1px solid #EDD8CF" }}>
            Today · Create task · Layout settings
          </div>
        }
        footer={
          <div style={{ padding: "10px 20px", borderTop: "1px solid #EDD8CF" }}>
            Sample workspace · Connected services are supplied by the host app
          </div>
        }
      >
        <div style={{ padding: "24px" }}>
          <h1>Good morning, Maya</h1>
          <p>Your workspace at a glance.</p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "16px",
              marginTop: "24px",
            }}
          >
            <section
              style={{
                padding: "18px",
                border: "1px solid #D4AF9F",
                borderRadius: "12px",
                background: "#FFFAF0",
              }}
            >
              <h2>Priority today</h2>
              <p>Review launch checklist · 10:30 AM</p>
            </section>
            <section
              style={{
                padding: "18px",
                border: "1px solid #D4AF9F",
                borderRadius: "12px",
                background: "#FFFAF0",
              }}
            >
              <h2>Team activity</h2>
              <p>Leo shared the latest sprint notes.</p>
            </section>
          </div>
        </div>
      </AppShell>
    </div>
  ),
};
