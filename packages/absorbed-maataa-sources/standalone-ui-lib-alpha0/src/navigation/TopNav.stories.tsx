import type { Meta, StoryObj } from "@storybook/react";
import { TopNav } from "./TopNav";
import { IconButton } from "../actions/IconButton";

const items = [
  { id: "home", label: "Home", href: "#" },
  { id: "docs", label: "Docs", href: "#" },
  { id: "pricing", label: "Pricing", href: "#" },
];

const meta = {
  title: "Navigation/TopNav",
  component: TopNav,
  tags: ["autodocs"],
} satisfies Meta<typeof TopNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    brand: <strong>Maataa</strong>,
    items,
    activeId: "home",
  },
};

export const WithActions: Story = {
  args: {
    brand: <strong>Maataa</strong>,
    items,
    activeId: "docs",
    actions: <IconButton icon="🔔" aria-label="Notifications" variant="tertiary" />,
  },
};

export const Sticky: Story = {
  render: (args) => (
    <div style={{ height: "200px", overflowY: "auto" }}>
      <TopNav {...args} sticky brand={<strong>Maataa</strong>} items={items} activeId="home" />
      <div style={{ padding: "16px" }}>
        {Array.from({ length: 10 }, (_, i) => (
          <p key={i}>Scrollable content row {i + 1}</p>
        ))}
      </div>
    </div>
  ),
};
