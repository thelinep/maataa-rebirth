import type { Meta, StoryObj } from "@storybook/react";
import { VisuallyHidden } from "./VisuallyHidden";

const meta = {
  title: "Primitives/VisuallyHidden",
  component: VisuallyHidden,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof VisuallyHidden>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div>
      <p>
        This is visible text.
        <VisuallyHidden>
          This text is hidden from view but available to screen readers.
        </VisuallyHidden>
      </p>
      <p style={{ fontSize: "12px", color: "#666" }}>
        (Try reading this with a screen reader to hear the hidden text)
      </p>
    </div>
  ),
};

export const FormLabel: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <label htmlFor="email">
          <VisuallyHidden>Email address</VisuallyHidden>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            style={{
              padding: "8px 12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          />
        </label>
      </div>
      <p style={{ fontSize: "12px", color: "#666" }}>
        The label "Email address" is hidden visually but available to screen reader users
      </p>
    </div>
  ),
};

export const SkipLink: Story = {
  render: () => (
    <div>
      <VisuallyHidden focusable>
        <a
          href="#main-content"
          style={{ padding: "8px", backgroundColor: "#8B6F47", color: "#fff" }}
        >
          Skip to main content
        </a>
      </VisuallyHidden>
      <nav style={{ padding: "16px", backgroundColor: "#f5f5f5", marginBottom: "16px" }}>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", gap: "16px" }}>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
      <main id="main-content">
        <p>Main content goes here...</p>
      </main>
    </div>
  ),
};

export const AccessibleIcon: Story = {
  render: () => (
    <div>
      <button>
        ✓<VisuallyHidden>Complete task</VisuallyHidden>
      </button>
      <p style={{ fontSize: "12px", color: "#666", marginTop: "16px" }}>
        Icon-only button with hidden accessible text
      </p>
    </div>
  ),
};

export const ScreenReaderOnlyContext: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <div>
        <span style={{ fontSize: "24px" }}>📧</span>
        <VisuallyHidden>Unread messages: 5</VisuallyHidden>
      </div>
      <p style={{ fontSize: "12px", color: "#666" }}>
        The badge count is only announced to screen reader users
      </p>
    </div>
  ),
};

export const MultipleHiddenElements: Story = {
  render: () => (
    <div>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Name
              <VisuallyHidden>Column 1 of 3</VisuallyHidden>
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Email
              <VisuallyHidden>Column 2 of 3</VisuallyHidden>
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Status
              <VisuallyHidden>Column 3 of 3</VisuallyHidden>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>John</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>john@example.com</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              ✓<VisuallyHidden>Active</VisuallyHidden>
            </td>
          </tr>
        </tbody>
      </table>
      <p style={{ fontSize: "12px", color: "#666", marginTop: "16px" }}>
        Screen readers announce column numbers and status text for better table context
      </p>
    </div>
  ),
};

export const HelpText: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <label htmlFor="password">
        Password
        <span style={{ color: "#d32f2f" }}>*</span>
        <VisuallyHidden>(required)</VisuallyHidden>
      </label>
      <input
        id="password"
        type="password"
        style={{
          padding: "8px 12px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "14px",
        }}
      />
      <small style={{ color: "#666" }}>Must be at least 8 characters</small>
    </div>
  ),
};
