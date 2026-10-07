import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Sheet } from "./Sheet";
import { Button } from "../primitives/Button";

const meta = {
  title: "Surfaces/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  argTypes: {
    height: {
      control: "select",
      options: ["sm", "md", "lg", "full"],
    },
  },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

const SheetDemo = (props: { height?: "sm" | "md" | "lg" | "full" }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open sheet</Button>
      <Sheet isOpen={isOpen} onClose={() => setIsOpen(false)} title="Share" height={props.height}>
        <p>Sheet content goes here.</p>
      </Sheet>
    </>
  );
};

export const Small: Story = {
  render: () => <SheetDemo height="sm" />,
};

export const Medium: Story = {
  render: () => <SheetDemo height="md" />,
};

export const Large: Story = {
  render: () => <SheetDemo height="lg" />,
};
