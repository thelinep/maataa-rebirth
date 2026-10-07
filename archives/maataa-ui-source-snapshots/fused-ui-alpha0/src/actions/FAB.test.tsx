import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { FAB } from "./FAB";

describe("FAB", () => {
  it("renders the icon", () => {
    render(<FAB icon="+" aria-label="Create new item" />);
    expect(screen.getByRole("button", { name: "Create new item" })).toHaveTextContent("+");
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<FAB icon="+" aria-label="Create new item" onClick={onClick} />);
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders as a fixed circle in the bottom-right by default", () => {
    render(<FAB icon="+" aria-label="Create new item" />);
    const button = screen.getByRole("button");
    expect(button).toHaveStyle({ position: "fixed", borderRadius: "9999px" });
  });

  it("renders statically positioned when position is static", () => {
    render(<FAB icon="+" aria-label="Create new item" position="static" />);
    expect(screen.getByRole("button").style.position).toBe("");
  });

  it("shows a label when provided, extending into a pill", () => {
    render(<FAB icon="+" label="New task" position="static" />);
    expect(screen.getByText("New task")).toBeInTheDocument();
  });

  it("hides the icon from assistive tech when a label is present", () => {
    render(<FAB icon="+" label="New task" position="static" />);
    const icon = screen.getByText("+");
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });

  it("applies size dimensions", () => {
    render(<FAB icon="+" aria-label="Create new item" size="md" position="static" />);
    expect(screen.getByRole("button")).toHaveStyle({ height: "48px" });
  });

  it("is disabled when disabled is true", () => {
    render(<FAB icon="+" aria-label="Create new item" disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("forwards ref to the underlying button", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<FAB icon="+" aria-label="Create new item" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("sets displayName", () => {
    expect(FAB.displayName).toBe("FAB");
  });
});
