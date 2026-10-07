import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "./Dropdown";

const meta = {
  title: "Surfaces/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dropdown
      trigger={<button>Open menu</button>}
      items={[
        { id: "1", label: "Edit", onClick: () => alert("Edit clicked") },
        { id: "2", label: "Share", onClick: () => alert("Share clicked") },
        { id: "3", label: "Delete", onClick: () => alert("Delete clicked") },
      ]}
    />
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Dropdown
      trigger={<button>⋮ More</button>}
      items={[
        { id: "1", label: "Copy", icon: "📋", onClick: () => alert("Copy") },
        { id: "2", label: "Paste", icon: "📌", onClick: () => alert("Paste") },
        { id: "3", label: "Delete", icon: "🗑️", onClick: () => alert("Delete") },
      ]}
    />
  ),
};

export const WithDivider: Story = {
  render: () => (
    <Dropdown
      trigger={<button>Actions</button>}
      items={[
        { id: "1", label: "Edit", onClick: () => alert("Edit") },
        { id: "2", label: "Share", onClick: () => alert("Share") },
        { id: "3", label: "divider", divider: true },
        { id: "4", label: "Delete", onClick: () => alert("Delete") },
      ]}
    />
  ),
};

export const WithDisabledItems: Story = {
  render: () => (
    <Dropdown
      trigger={<button>Menu</button>}
      items={[
        { id: "1", label: "Edit", onClick: () => alert("Edit") },
        { id: "2", label: "Duplicate", disabled: true, onClick: () => {} },
        { id: "3", label: "Export", onClick: () => alert("Export") },
        { id: "4", label: "Delete", onClick: () => alert("Delete") },
      ]}
    />
  ),
};

export const PositionTop: Story = {
  render: () => (
    <div style={{ marginTop: "200px" }}>
      <Dropdown
        trigger={<button>Position: Top</button>}
        position="top"
        items={[
          { id: "1", label: "Option 1", onClick: () => alert("Option 1") },
          { id: "2", label: "Option 2", onClick: () => alert("Option 2") },
        ]}
      />
    </div>
  ),
};

export const PositionRight: Story = {
  render: () => (
    <Dropdown
      trigger={<button>Position: Right</button>}
      position="right"
      items={[
        { id: "1", label: "Option 1", onClick: () => alert("Option 1") },
        { id: "2", label: "Option 2", onClick: () => alert("Option 2") },
      ]}
    />
  ),
};

export const PositionBottom: Story = {
  render: () => (
    <Dropdown
      trigger={<button>Position: Bottom</button>}
      position="bottom"
      items={[
        { id: "1", label: "Option 1", onClick: () => alert("Option 1") },
        { id: "2", label: "Option 2", onClick: () => alert("Option 2") },
      ]}
    />
  ),
};

export const PositionLeft: Story = {
  render: () => (
    <div style={{ marginLeft: "200px" }}>
      <Dropdown
        trigger={<button>Position: Left</button>}
        position="left"
        items={[
          { id: "1", label: "Option 1", onClick: () => alert("Option 1") },
          { id: "2", label: "Option 2", onClick: () => alert("Option 2") },
        ]}
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Dropdown
      trigger={<button>Disabled menu</button>}
      disabled
      items={[{ id: "1", label: "Option 1", onClick: () => {} }]}
    />
  ),
};

export const LongMenu: Story = {
  render: () => (
    <Dropdown
      trigger={<button>Long menu</button>}
      items={Array.from({ length: 10 }, (_, i) => ({
        id: `item${i + 1}`,
        label: `Menu item ${i + 1}`,
        onClick: () => alert(`Item ${i + 1} clicked`),
      }))}
    />
  ),
};
