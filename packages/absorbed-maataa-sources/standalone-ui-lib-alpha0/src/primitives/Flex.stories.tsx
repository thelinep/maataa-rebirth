import type { Meta, StoryObj } from "@storybook/react";
import { Flex } from "./Flex";
import { Box } from "./Box";

const swatch = (label: string) => (
  <Box padding="md" background="tertiary" radius="md" key={label}>
    {label}
  </Box>
);

const meta = {
  title: "Primitives/Flex",
  component: Flex,
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["row", "column", "row-reverse", "column-reverse"],
    },
    align: {
      control: "select",
      options: ["start", "center", "end", "stretch", "baseline"],
    },
    justify: {
      control: "select",
      options: ["start", "center", "end", "space-between", "space-around", "space-evenly"],
    },
  },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Row: Story = {
  args: {
    direction: "row",
    gap: "md",
    children: [swatch("One"), swatch("Two"), swatch("Three")],
  },
};

export const Column: Story = {
  args: {
    direction: "column",
    gap: "sm",
    children: [swatch("One"), swatch("Two"), swatch("Three")],
  },
};

export const SpaceBetween: Story = {
  args: {
    direction: "row",
    justify: "space-between",
    children: [swatch("Left"), swatch("Right")],
  },
};

export const CenteredAndWrapping: Story = {
  args: {
    direction: "row",
    align: "center",
    justify: "center",
    wrap: true,
    gap: "sm",
    style: { width: "200px" },
    children: [swatch("A"), swatch("B"), swatch("C"), swatch("D")],
  },
};
