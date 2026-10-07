import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Modal, type ModalProps } from "./Modal";
import { Button } from "../primitives/Button";

const meta = {
  title: "Surfaces/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const ModalWrapper = (args: Omit<ModalProps, "isOpen" | "onClose">) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export const Default: Story = {
  render: (args) => (
    <ModalWrapper {...args} title="Modal Title">
      <p>This is the modal content.</p>
    </ModalWrapper>
  ),
};

export const Small: Story = {
  render: (args) => (
    <ModalWrapper {...args} size="sm" title="Small Modal">
      <p>A smaller modal dialog.</p>
    </ModalWrapper>
  ),
};

export const Large: Story = {
  render: (args) => (
    <ModalWrapper {...args} size="lg" title="Large Modal">
      <p>A larger modal dialog with more space.</p>
    </ModalWrapper>
  ),
};

export const WithFooter: Story = {
  render: (args) => (
    <ModalWrapper
      {...args}
      title="Confirm Action"
      footer={
        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
          <Button variant="secondary" size="sm">
            Cancel
          </Button>
          <Button variant="primary" size="sm">
            Confirm
          </Button>
        </div>
      }
    >
      <p>Are you sure you want to proceed?</p>
    </ModalWrapper>
  ),
};

export const NoCloseButton: Story = {
  render: (args) => (
    <ModalWrapper
      {...args}
      title="Important Notice"
      closeButton={false}
      footer={
        <Button variant="primary" size="md">
          Got it
        </Button>
      }
    >
      <p>This modal cannot be closed with the button.</p>
    </ModalWrapper>
  ),
};

export const ComplexContent: Story = {
  render: (args) => (
    <ModalWrapper
      {...args}
      title="User Settings"
      footer={
        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
          <Button variant="secondary" size="sm">
            Cancel
          </Button>
          <Button variant="primary" size="sm">
            Save Changes
          </Button>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>
            Username
          </label>
          <input
            type="text"
            defaultValue="john_doe"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #D4AF9F",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>Email</label>
          <input
            type="email"
            defaultValue="john@example.com"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #D4AF9F",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
          />
        </div>
      </div>
    </ModalWrapper>
  ),
};
