import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Sheet } from "./Sheet";

describe("Sheet", () => {
  it("renders nothing when isOpen is false", () => {
    render(
      <Sheet isOpen={false} onClose={() => {}}>
        Content
      </Sheet>
    );
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });

  it("renders its children when isOpen is true", () => {
    render(
      <Sheet isOpen onClose={() => {}}>
        Content
      </Sheet>
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders a title", () => {
    render(
      <Sheet isOpen onClose={() => {}} title="Share">
        Content
      </Sheet>
    );
    expect(screen.getByText("Share")).toBeInTheDocument();
  });

  it("renders as an accessible dialog", () => {
    render(
      <Sheet isOpen onClose={() => {}} title="Share">
        Content
      </Sheet>
    );
    expect(screen.getByRole("dialog", { name: "Share" })).toBeInTheDocument();
  });

  it("calls onClose when the backdrop is clicked", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(
      <Sheet isOpen onClose={onClose}>
        Content
      </Sheet>
    );
    const dialog = screen.getByRole("dialog");
    const backdrop = dialog.parentElement!;
    await user.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });

  it("does not call onClose when clicking inside the sheet", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(
      <Sheet isOpen onClose={onClose}>
        <p>Content</p>
      </Sheet>
    );
    await user.click(screen.getByText("Content"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls onClose when Escape is pressed", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(
      <Sheet isOpen onClose={onClose}>
        Content
      </Sheet>
    );
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it.each(["sm", "md", "lg", "full"] as const)(
    "renders the %s height without throwing",
    (height) => {
      render(
        <Sheet isOpen onClose={() => {}} height={height}>
          Content
        </Sheet>
      );
      expect(screen.getByText("Content")).toBeInTheDocument();
    }
  );

  it("defaults to the md height", () => {
    render(
      <Sheet isOpen onClose={() => {}}>
        Content
      </Sheet>
    );
    expect(screen.getByRole("dialog").style.maxHeight).toBe("50vh");
  });

  it("does not render a title block when no title is given", () => {
    render(
      <Sheet isOpen onClose={() => {}}>
        Content
      </Sheet>
    );
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });
});
