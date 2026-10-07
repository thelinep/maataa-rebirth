import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Drawer } from "./Drawer";
import { Button } from "../primitives/Button";

const meta = {
  title: "Surfaces/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      options: ["left", "right", "top", "bottom"],
    },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

const DrawerDemo = (props: { placement?: "left" | "right" | "top" | "bottom" }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open drawer</Button>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Filters"
        placement={props.placement}
      >
        <p>Drawer content goes here.</p>
      </Drawer>
    </>
  );
};

export const FromRight: Story = {
  render: () => <DrawerDemo placement="right" />,
};

export const FromLeft: Story = {
  render: () => <DrawerDemo placement="left" />,
};

export const FromTop: Story = {
  render: () => <DrawerDemo placement="top" />,
};

export const FromBottom: Story = {
  render: () => <DrawerDemo placement="bottom" />,
};
