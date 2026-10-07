import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta = {
  title: "Primitives/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "error", "info"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Default",
    variant: "default",
  },
};

export const Success: Story = {
  args: {
    children: "Success",
    variant: "success",
  },
};

export const Warning: Story = {
  args: {
    children: "Warning",
    variant: "warning",
  },
};

export const Error: Story = {
  args: {
    children: "Error",
    variant: "error",
  },
};

export const Info: Story = {
  args: {
    children: "Info",
    variant: "info",
  },
};

export const Small: Story = {
  args: {
    children: "Small Badge",
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    children: "Medium Badge",
    size: "md",
  },
};

export const Large: Story = {
  args: {
    children: "Large Badge",
    size: "lg",
  },
};

export const WithDismiss: Story = {
  args: {
    children: "Dismissible Badge",
    variant: "info",
    onDismiss: () => alert("Badge dismissed!"),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexDirection: "column" }}>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <Badge variant="default">Default</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
        <Badge variant="info">Info</Badge>
      </div>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <Badge size="sm" variant="success">
          Small
        </Badge>
        <Badge size="md" variant="warning">
          Medium
        </Badge>
        <Badge size="lg" variant="error">
          Large
        </Badge>
      </div>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <Badge variant="success" onDismiss={() => {}}>
          With Dismiss
        </Badge>
      </div>
    </div>
  ),
};
