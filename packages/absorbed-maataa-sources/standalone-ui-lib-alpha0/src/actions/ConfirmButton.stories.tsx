import type { Meta, StoryObj } from "@storybook/react";
import { ConfirmButton } from "./ConfirmButton";

const meta = {
  title: "Actions/ConfirmButton",
  component: ConfirmButton,
  tags: ["autodocs"],
} satisfies Meta<typeof ConfirmButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Delete",
    onConfirm: () => alert("Deleted!"),
  },
};

export const CustomLabels: Story = {
  args: {
    children: "Remove account",
    confirmText: "This cannot be undone.",
    confirmLabel: "Remove",
    cancelLabel: "Keep account",
    onConfirm: () => alert("Account removed!"),
  },
};

export const PrimaryVariant: Story = {
  args: {
    children: "Publish",
    variant: "primary",
    confirmText: "Publish this now?",
    onConfirm: () => alert("Published!"),
  },
};
