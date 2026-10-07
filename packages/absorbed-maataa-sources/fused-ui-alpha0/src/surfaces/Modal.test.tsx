import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "./Modal";

describe("Modal", () => {
  it("renders nothing when isOpen is false", () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        Content
      </Modal>
    );
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });

  it("renders its children when isOpen is true", () => {
    render(
      <Modal isOpen onClose={() => {}}>
        Content
      </Modal>
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders a title when provided", () => {
    render(
      <Modal isOpen onClose={() => {}} title="Settings">
        Content
      </Modal>
    );
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("renders a footer when provided", () => {
    render(
      <Modal isOpen onClose={() => {}} footer={<span>Footer</span>}>
        Content
      </Modal>
    );
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(
      <Modal isOpen onClose={onClose} title="Settings">
        Content
      </Modal>
    );
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("hides the close button when closeButton is false", () => {
    render(
      <Modal isOpen onClose={() => {}} title="Settings" closeButton={false}>
        Content
      </Modal>
    );
    expect(screen.queryByRole("button", { name: "Close" })).not.toBeInTheDocument();
  });

  it("calls onClose when the overlay is clicked", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(
      <Modal isOpen onClose={onClose}>
        Content
      </Modal>
    );
    // Content wrapper div -> dialog box div -> overlay div
    const contentWrapper = screen.getByText("Content");
    const dialogBox = contentWrapper.parentElement!;
    const overlay = dialogBox.parentElement!;
    await user.click(overlay);
    expect(onClose).toHaveBeenCalled();
  });

  it("does not call onClose when clicking inside the dialog content", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(
      <Modal isOpen onClose={onClose}>
        <p>Content</p>
      </Modal>
    );
    await user.click(screen.getByText("Content"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it.each(["sm", "md", "lg"] as const)("renders the %s size without throwing", (size) => {
    render(
      <Modal isOpen onClose={() => {}} size={size}>
        Content
      </Modal>
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});
