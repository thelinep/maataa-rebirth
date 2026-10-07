import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Input } from "./Input";

const meta = {
  title: "Primitives/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "date"],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Email Address",
    type: "email",
    placeholder: "user@example.com",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    helperText: "Must be at least 8 characters",
  },
};

export const WithError: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    error: "Username is already taken",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Field",
    placeholder: "Cannot edit",
    disabled: true,
  },
};

export const Email: Story = {
  args: {
    label: "Email",
    type: "email",
    placeholder: "user@example.com",
  },
};

export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter password",
  },
};

export const Number: Story = {
  args: {
    label: "Quantity",
    type: "number",
    placeholder: "0",
  },
};

export const Date: Story = {
  args: {
    label: "Date",
    type: "date",
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div style={{ width: "300px" }}>
        <Input
          label="Controlled Input"
          placeholder="Type to update"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <p style={{ marginTop: "12px", fontSize: "12px", color: "#666" }}>
          Current value: {value || "(empty)"}
        </p>
      </div>
    );
  },
};
