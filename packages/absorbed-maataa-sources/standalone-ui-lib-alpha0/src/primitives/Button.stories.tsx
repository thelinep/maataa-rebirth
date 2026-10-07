import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
  title: "Primitives/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
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
    disabled: {
      control: "boolean",
    },
    isLoading: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
    size: "md",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
    size: "md",
  },
};

export const Tertiary: Story = {
  args: {
    children: "Tertiary Button",
    variant: "tertiary",
    size: "md",
  },
};

export const Danger: Story = {
  args: {
    children: "Delete",
    variant: "danger",
    size: "md",
  },
};

export const Small: Story = {
  args: {
    children: "Small",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    children: "Large Button",
    size: "lg",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    children: "Submit",
    isLoading: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexDirection: "column" }}>
      <div>
        <h3>Primary</h3>
        <div style={{ display: "flex", gap: "8px" }}>
          <Button variant="primary" size="sm">
            Small
          </Button>
          <Button variant="primary" size="md">
            Medium
          </Button>
          <Button variant="primary" size="lg">
            Large
          </Button>
        </div>
      </div>
      <div>
        <h3>Secondary</h3>
        <div style={{ display: "flex", gap: "8px" }}>
          <Button variant="secondary" size="sm">
            Small
          </Button>
          <Button variant="secondary" size="md">
            Medium
          </Button>
          <Button variant="secondary" size="lg">
            Large
          </Button>
        </div>
      </div>
      <div>
        <h3>Tertiary</h3>
        <div style={{ display: "flex", gap: "8px" }}>
          <Button variant="tertiary" size="sm">
            Small
          </Button>
          <Button variant="tertiary" size="md">
            Medium
          </Button>
          <Button variant="tertiary" size="lg">
            Large
          </Button>
        </div>
      </div>
      <div>
        <h3>Danger</h3>
        <div style={{ display: "flex", gap: "8px" }}>
          <Button variant="danger" size="sm">
            Small
          </Button>
          <Button variant="danger" size="md">
            Medium
          </Button>
          <Button variant="danger" size="lg">
            Large
          </Button>
        </div>
      </div>
    </div>
  ),
};
