import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "./Container";
import { Box } from "./Box";

const meta = {
  title: "Primitives/Container",
  component: Container,
  tags: ["autodocs"],
  argTypes: {
    maxWidth: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
    },
    padding: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"],
    },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    maxWidth: "lg",
    children: (
      <Box padding="md" background="tertiary" radius="md">
        Page content constrained to a max width of 1024px, centered on the page.
      </Box>
    ),
  },
};

export const Narrow: Story = {
  args: {
    maxWidth: "sm",
    children: (
      <Box padding="md" background="tertiary" radius="md">
        A narrower 640px container, useful for reading-width text content.
      </Box>
    ),
  },
};

export const FullWidth: Story = {
  args: {
    maxWidth: "full",
    padding: "lg",
    children: (
      <Box padding="md" background="tertiary" radius="md">
        Spans the full width of its parent, with horizontal padding only.
      </Box>
    ),
  },
};
