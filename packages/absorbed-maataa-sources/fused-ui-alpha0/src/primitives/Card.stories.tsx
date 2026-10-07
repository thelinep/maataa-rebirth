import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";
import { Button } from "./Button";

const meta = {
  title: "Primitives/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "500px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    elevated: {
      control: "boolean",
    },
    interactive: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "This is a card with default styling and content.",
  },
};

export const WithTitle: Story = {
  args: {
    title: "Card Title",
    children: "This card has a title and content.",
  },
};

export const WithTitleAndSubtitle: Story = {
  args: {
    title: "Card Title",
    subtitle: "Subtitle goes here",
    children: "This is the main content of the card.",
  },
};

export const WithFooter: Story = {
  args: {
    title: "Card with Footer",
    children: "Main content goes here.",
    footer: (
      <div style={{ display: "flex", gap: "8px" }}>
        <Button variant="secondary" size="sm">
          Cancel
        </Button>
        <Button variant="primary" size="sm">
          Save
        </Button>
      </div>
    ),
  },
};

export const Elevated: Story = {
  args: {
    title: "Elevated Card",
    subtitle: "This card has elevation shadow",
    elevated: true,
    children: "Cards can have elevated appearance with more pronounced shadows.",
  },
};

export const Interactive: Story = {
  args: {
    title: "Interactive Card",
    subtitle: "Hover over me",
    interactive: true,
    children: "This card responds to interaction with visual feedback.",
  },
};

export const ComplexContent: Story = {
  args: {
    title: "User Profile",
    subtitle: "User Information",
    children: (
      <div>
        <p style={{ margin: "0 0 12px 0" }}>
          <strong>Name:</strong> John Doe
        </p>
        <p style={{ margin: "0 0 12px 0" }}>
          <strong>Email:</strong> john@example.com
        </p>
        <p style={{ margin: "0" }}>
          <strong>Status:</strong> Active
        </p>
      </div>
    ),
    footer: (
      <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
        <Button variant="secondary" size="sm">
          Edit
        </Button>
        <Button variant="primary" size="sm">
          Save
        </Button>
      </div>
    ),
  },
};
