import type { Meta, StoryObj } from "@storybook/react";
import { ButtonGroup } from "./ButtonGroup";
import { Button } from "../primitives/Button";

const meta = {
  title: "Actions/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Attached: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="secondary">Day</Button>
      <Button variant="secondary">Week</Button>
      <Button variant="secondary">Month</Button>
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  render: (args) => (
    <ButtonGroup {...args} orientation="vertical">
      <Button variant="secondary">Top</Button>
      <Button variant="secondary">Middle</Button>
      <Button variant="secondary">Bottom</Button>
    </ButtonGroup>
  ),
};

export const Unattached: Story = {
  render: (args) => (
    <ButtonGroup {...args} attached={false} gap="sm">
      <Button variant="primary">Save</Button>
      <Button variant="secondary">Cancel</Button>
    </ButtonGroup>
  ),
};
