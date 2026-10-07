import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";

const meta = {
  title: "Surfaces/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip content="Helpful information">
      <button>Hover me</button>
    </Tooltip>
  ),
};

export const PositionTop: Story = {
  render: () => (
    <Tooltip content="This is at the top" position="top">
      <button>Hover for top tooltip</button>
    </Tooltip>
  ),
};

export const PositionRight: Story = {
  render: () => (
    <Tooltip content="This is on the right" position="right">
      <button>Hover for right tooltip</button>
    </Tooltip>
  ),
};

export const PositionBottom: Story = {
  render: () => (
    <Tooltip content="This is at the bottom" position="bottom">
      <button>Hover for bottom tooltip</button>
    </Tooltip>
  ),
};

export const PositionLeft: Story = {
  render: () => (
    <Tooltip content="This is on the left" position="left">
      <button>Hover for left tooltip</button>
    </Tooltip>
  ),
};

export const WithDelay: Story = {
  render: () => (
    <Tooltip content="Appears after 500ms" delay={500}>
      <button>Hover with delay</button>
    </Tooltip>
  ),
};

export const DisabledTooltip: Story = {
  render: () => (
    <Tooltip content="This is disabled" disabled>
      <button>No tooltip here</button>
    </Tooltip>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Tooltip content="This is a longer tooltip with more detailed information that might wrap to multiple lines depending on the container width and the tooltip component's styling.">
      <button>Hover for long tooltip</button>
    </Tooltip>
  ),
};

export const OnText: Story = {
  render: () => (
    <span>
      Hover over this <Tooltip content="Additional context">emphasized</Tooltip> word
    </span>
  ),
};

export const OnIcon: Story = {
  render: () => (
    <Tooltip content="Info: Detailed explanation">
      <span style={{ fontSize: "20px", cursor: "help" }}>ℹ️</span>
    </Tooltip>
  ),
};
