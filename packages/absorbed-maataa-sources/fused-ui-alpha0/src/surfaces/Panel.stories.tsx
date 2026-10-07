import type { Meta, StoryObj } from "@storybook/react";
import { Panel } from "./Panel";
import { Checkbox } from "../forms/Checkbox";
import { Button } from "../primitives/Button";

const meta = {
  title: "Surfaces/Panel",
  component: Panel,
  tags: ["autodocs"],
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Panel {...args} title="Filters" style={{ width: "280px" }}>
      <Checkbox label="Active only" />
      <Checkbox label="Verified only" />
    </Panel>
  ),
};

export const WithActions: Story = {
  render: (args) => (
    <Panel
      {...args}
      title="Filters"
      actions={<Button size="sm">Reset</Button>}
      style={{ width: "280px" }}
    >
      <Checkbox label="Active only" />
    </Panel>
  ),
};

export const Collapsible: Story = {
  render: (args) => (
    <Panel {...args} title="Advanced options" collapsible style={{ width: "280px" }}>
      <Checkbox label="Enable beta features" />
    </Panel>
  ),
};

export const NoHeader: Story = {
  render: (args) => (
    <Panel {...args} style={{ width: "280px" }}>
      Plain content region with no header.
    </Panel>
  ),
};
