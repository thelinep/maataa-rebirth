import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "./Box";

const meta = {
  title: "Primitives/Box",
  component: Box,
  tags: ["autodocs"],
  argTypes: {
    padding: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"],
    },
    margin: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"],
    },
    background: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "inverse"],
    },
    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "2xl", "full"],
    },
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "A basic box",
    padding: "md",
  },
};

export const WithBackground: Story = {
  args: {
    children: "Box with a background",
    padding: "lg",
    background: "secondary",
    radius: "md",
  },
};

export const WithBorder: Story = {
  args: {
    children: "Box with a border",
    padding: "lg",
    border: true,
    radius: "lg",
  },
};

export const FullyStyled: Story = {
  args: {
    children: "Padding, background, radius, and border together",
    padding: "xl",
    background: "tertiary",
    radius: "xl",
    border: true,
  },
};
