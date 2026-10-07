import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./Divider";

const meta = {
  title: "Primitives/Divider",
  component: Divider,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: (args) => (
    <div>
      <p>Content above</p>
      <Divider {...args} />
      <p>Content below</p>
    </div>
  ),
};

export const WithLabel: Story = {
  render: (args) => (
    <div>
      <p>Sign in with your email</p>
      <Divider {...args} label="OR" />
      <p>Continue with a social account</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", height: "48px" }}>
      <span>Left</span>
      <Divider {...args} orientation="vertical" />
      <span>Right</span>
    </div>
  ),
};
