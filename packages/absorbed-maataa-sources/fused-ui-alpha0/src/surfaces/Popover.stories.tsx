import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Popover } from "./Popover";

const meta = {
  title: "Surfaces/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Popover isOpen={isOpen} onOpenChange={setIsOpen} content="This is the popover content">
        <button onClick={() => setIsOpen(!isOpen)}>Click me</button>
      </Popover>
    );
  },
};

export const WithTitle: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Popover
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Popover Title"
        content="This is the detailed content of the popover with a title section"
      >
        <button onClick={() => setIsOpen(!isOpen)}>Open popover</button>
      </Popover>
    );
  },
};

export const PositionTop: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Popover isOpen={isOpen} onOpenChange={setIsOpen} position="top" content="Popover at the top">
        <button onClick={() => setIsOpen(!isOpen)}>Top position</button>
      </Popover>
    );
  },
};

export const PositionRight: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Popover
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        position="right"
        content="Popover on the right"
      >
        <button onClick={() => setIsOpen(!isOpen)}>Right position</button>
      </Popover>
    );
  },
};

export const PositionBottom: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Popover
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        position="bottom"
        content="Popover at the bottom"
      >
        <button onClick={() => setIsOpen(!isOpen)}>Bottom position</button>
      </Popover>
    );
  },
};

export const PositionLeft: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Popover
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        position="left"
        content="Popover on the left"
      >
        <button onClick={() => setIsOpen(!isOpen)}>Left position</button>
      </Popover>
    );
  },
};

export const LongContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Popover
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="More Information"
        content="This popover contains more detailed information. It can hold longer content and provide context or actions related to the trigger element."
      >
        <button onClick={() => setIsOpen(!isOpen)}>Show details</button>
      </Popover>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Popover isOpen={false} onOpenChange={() => {}} content="This is disabled" disabled>
      <button disabled>Disabled popover</button>
    </Popover>
  ),
};

export const Uncontrolled: Story = {
  render: () => (
    <Popover content="Click outside to close" title="Uncontrolled Popover">
      <button>Click to toggle</button>
    </Popover>
  ),
};
