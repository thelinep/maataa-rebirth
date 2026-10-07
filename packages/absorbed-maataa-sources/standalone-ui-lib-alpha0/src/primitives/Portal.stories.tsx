import type { Meta, StoryObj } from "@storybook/react";
import { Portal } from "./Portal";

const meta = {
  title: "Primitives/Portal",
  component: Portal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Portal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div>
      <p>This content is in the document flow</p>
      <Portal>
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            padding: "16px",
            backgroundColor: "#8B6F47",
            color: "#fff",
            borderRadius: "6px",
            zIndex: 1000,
          }}
        >
          Portaled content (top-right corner)
        </div>
      </Portal>
    </div>
  ),
};

export const WithClassName: Story = {
  render: () => (
    <div>
      <p>Portaled element with custom class</p>
      <Portal className="my-portal-container">
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
            padding: "16px",
            backgroundColor: "#D4AF9F",
            color: "#333",
            borderRadius: "6px",
            zIndex: 1000,
          }}
        >
          Styled portal container
        </div>
      </Portal>
    </div>
  ),
};

export const WithStyle: Story = {
  render: () => (
    <div>
      <p>Portaled element with inline styles</p>
      <Portal style={{ position: "fixed", zIndex: 999 }}>
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "24px",
            backgroundColor: "#8B6F47",
            color: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          Center modal content
        </div>
      </Portal>
    </div>
  ),
};

export const MultiplePortals: Story = {
  render: () => (
    <div>
      <p>Multiple portaled elements</p>
      <Portal>
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "20px",
            padding: "12px 16px",
            backgroundColor: "#8B6F47",
            color: "#fff",
            borderRadius: "4px",
            fontSize: "12px",
            zIndex: 1000,
          }}
        >
          Portal 1
        </div>
      </Portal>
      <Portal>
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            padding: "12px 16px",
            backgroundColor: "#D4AF9F",
            color: "#333",
            borderRadius: "4px",
            fontSize: "12px",
            zIndex: 1001,
          }}
        >
          Portal 2
        </div>
      </Portal>
      <Portal>
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "12px 16px",
            backgroundColor: "#8B6F47",
            color: "#fff",
            borderRadius: "4px",
            fontSize: "12px",
            zIndex: 1002,
          }}
        >
          Portal 3
        </div>
      </Portal>
    </div>
  ),
};

export const NotificationExample: Story = {
  render: () => (
    <div>
      <p>Portal used for notifications</p>
      <Portal
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          pointerEvents: "none",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "16px 24px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            borderRadius: "6px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            pointerEvents: "auto",
          }}
        >
          ✓ Success! Your changes have been saved.
        </div>
      </Portal>
    </div>
  ),
};

export const OverlayExample: Story = {
  render: () => (
    <div>
      <p>Portal used for overlay backdrop</p>
      <Portal>
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "24px",
              borderRadius: "8px",
              maxWidth: "400px",
              textAlign: "center",
            }}
          >
            <h2>Modal Dialog</h2>
            <p>This content is portaled outside the normal flow</p>
            <button
              style={{
                padding: "8px 16px",
                backgroundColor: "#8B6F47",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      </Portal>
    </div>
  ),
};
