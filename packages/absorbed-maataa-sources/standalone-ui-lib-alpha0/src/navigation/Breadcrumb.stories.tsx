import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./Breadcrumb";

const meta = {
  title: "Navigation/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "Electronics" },
      ]}
    />
  ),
};

export const WithClickHandler: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: "Home", onClick: () => alert("Home clicked") },
        { label: "Settings", onClick: () => alert("Settings clicked") },
        { label: "Preferences" },
      ]}
    />
  ),
};

export const LongPath: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: "Home", href: "/" },
        { label: "Projects", href: "/projects" },
        { label: "My Project", href: "/projects/my-project" },
        { label: "Settings", href: "/projects/my-project/settings" },
        { label: "Advanced Options" },
      ]}
    />
  ),
};

export const CustomSeparator: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: "Root", href: "/" },
        { label: "Level 1", href: "/level1" },
        { label: "Level 2", href: "/level1/level2" },
        { label: "Current" },
      ]}
      separator="→"
    />
  ),
};

export const WithActive: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: "Documentation", href: "/docs" },
        { label: "Components", href: "/docs/components" },
        { label: "Breadcrumb", active: true },
      ]}
    />
  ),
};

export const CustomAriaLabel: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: "Shop", href: "/" },
        { label: "Category", href: "/category" },
        { label: "Product", active: true },
      ]}
      ariaLabel="Product breadcrumb navigation"
    />
  ),
};

export const SimpleNavigation: Story = {
  render: () => (
    <Breadcrumb items={[{ label: "Main", href: "/main" }, { label: "Current Page" }]} />
  ),
};
