import type { Meta, StoryObj } from "@storybook/react";
import { AspectRatio } from "./AspectRatio";

const placeholder = (label: string) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#F5EDE4",
      color: "#3D2817",
      fontSize: "14px",
    }}
  >
    {label}
  </div>
);

const meta = {
  title: "Primitives/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Widescreen: Story = {
  args: {
    ratio: 16 / 9,
    children: placeholder("16 / 9"),
    style: { maxWidth: "480px" },
  },
};

export const Square: Story = {
  args: {
    ratio: 1,
    children: placeholder("1 / 1"),
    style: { maxWidth: "320px" },
  },
};

export const Portrait: Story = {
  args: {
    ratio: 3 / 4,
    children: placeholder("3 / 4"),
    style: { maxWidth: "300px" },
  },
};
