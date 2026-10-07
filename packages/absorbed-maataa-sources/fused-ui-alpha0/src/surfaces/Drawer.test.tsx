import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Drawer } from "./Drawer";

describe("Drawer", () => {
  it("renders nothing when isOpen is false", () => {
    render(
      <Drawer isOpen={false} onClose={() => {}}>
        Content
      </Drawer>
    );
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });

  it("renders its children when isOpen is true", () => {
    render(
      <Drawer isOpen onClose={() => {}}>
        Content
      </Drawer>
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders a title", () => {
    render(
      <Drawer isOpen onClose={() => {}} title="Filters">
        Content
      </Drawer>
    );
    expect(screen.getByText("Filters")).toBeInTheDocument();
  });

  it("renders as an accessible dialog", () => {
    render(
      <Drawer isOpen onClose={() => {}} title="Filters">
        Content
      </Drawer>
    );
    expect(screen.getByRole("dialog", { name: "Filters" })).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(
      <Drawer isOpen onClose={onClose} title="Filters">
        Content
      </Drawer>
    );
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("hides the close button when closeButton is false", () => {
    render(
      <Drawer isOpen onClose={() => {}} title="Filters" closeButton={false}>
        Content
      </Drawer>
    );
    expect(screen.queryByRole("button", { name: "Close" })).not.toBeInTheDocument();
  });

  it("calls onClose when the backdrop is clicked", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(
      <Drawer isOpen onClose={onClose}>
        Content
      </Drawer>
    );
    const dialog = screen.getByRole("dialog");
    const backdrop = dialog.parentElement!;
    await user.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });

  it("does not call onClose when clicking inside the drawer", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(
      <Drawer isOpen onClose={onClose}>
        <p>Content</p>
      </Drawer>
    );
    await user.click(screen.getByText("Content"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls onClose when Escape is pressed", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(
      <Drawer isOpen onClose={onClose}>
        Content
      </Drawer>
    );
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it.each(["left", "right", "top", "bottom"] as const)(
    "renders the %s placement without throwing",
    (placement) => {
      render(
        <Drawer isOpen onClose={() => {}} placement={placement}>
          Content
        </Drawer>
      );
      expect(screen.getByText("Content")).toBeInTheDocument();
    }
  );

  it("defaults to a 320px size", () => {
    render(
      <Drawer isOpen onClose={() => {}}>
        Content
      </Drawer>
    );
    expect(screen.getByRole("dialog")).toHaveStyle({ width: "320px" });
  });

  it("accepts a custom size", () => {
    render(
      <Drawer isOpen onClose={() => {}} size="480px">
        Content
      </Drawer>
    );
    expect(screen.getByRole("dialog")).toHaveStyle({ width: "480px" });
  });
});
