import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Toast, ToastContainer } from "./Toast";
import type { ToastProps } from "./Toast";
import { Button } from "../primitives/Button";

const meta = {
  title: "Surfaces/Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["success", "error", "warning", "info"],
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    id: "1",
    message: "Operation completed successfully!",
    type: "success",
    onClose: () => {},
  },
};

export const Error: Story = {
  args: {
    id: "2",
    message: "An error occurred. Please try again.",
    type: "error",
    onClose: () => {},
  },
};

export const Warning: Story = {
  args: {
    id: "3",
    message: "Please be careful with this action.",
    type: "warning",
    onClose: () => {},
  },
};

export const Info: Story = {
  args: {
    id: "4",
    message: "This is an informational message.",
    type: "info",
    onClose: () => {},
  },
};

export const WithAction: Story = {
  args: {
    id: "5",
    message: "Item deleted.",
    type: "info",
    onClose: () => {},
    action: {
      label: "Undo",
      onClick: () => alert("Undo clicked!"),
    },
  },
};

export const NoDuration: Story = {
  args: {
    id: "6",
    message: "This toast will not auto-dismiss.",
    type: "info",
    duration: 0,
    onClose: () => {},
  },
};

export const Container: Story = {
  render: () => {
    const [toasts, setToasts] = useState<ToastProps[]>([
      {
        id: "1",
        message: "Success message",
        type: "success",
        onClose: (id) => setToasts((t) => t.filter((x) => x.id !== id)),
      },
      {
        id: "2",
        message: "Warning message",
        type: "warning",
        onClose: (id) => setToasts((t) => t.filter((x) => x.id !== id)),
      },
      {
        id: "3",
        message: "Error message",
        type: "error",
        onClose: (id) => setToasts((t) => t.filter((x) => x.id !== id)),
      },
    ]);

    const addToast = (type: "success" | "error" | "warning" | "info", message: string) => {
      const id = String(Date.now());
      const newToast: ToastProps = {
        id,
        message,
        type,
        onClose: (id) => setToasts((t) => t.filter((x) => x.id !== id)),
      };
      setToasts((t) => [...t, newToast]);
    };

    return (
      <div>
        <div style={{ display: "flex", gap: "8px", flexDirection: "column", marginBottom: "24px" }}>
          <Button onClick={() => addToast("success", "Operation successful!")}>Add Success</Button>
          <Button onClick={() => addToast("error", "Something went wrong!")}>Add Error</Button>
          <Button onClick={() => addToast("warning", "Be careful!")}>Add Warning</Button>
          <Button onClick={() => addToast("info", "Information message")}>Add Info</Button>
        </div>
        <ToastContainer
          toasts={toasts}
          onClose={(id) => setToasts((t) => t.filter((x) => x.id !== id))}
        />
      </div>
    );
  },
};
