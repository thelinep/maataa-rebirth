import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { IconButton } from "./IconButton";

describe("IconButton", () => {
  it("renders the icon", () => {
    render(<IconButton icon="✕" aria-label="Close" />);
    expect(screen.getByRole("button", { name: "Close" })).toHaveTextContent("✕");
  });

  it("requires an aria-label for accessibility", () => {
    render(<IconButton icon="✕" aria-label="Close" />);
    expect(screen.getByLabelText("Close")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<IconButton icon="✕" aria-label="Close" onClick={onClick} />);
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled is true", () => {
    render(<IconButton icon="✕" aria-label="Close" disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders as fully circular by default", () => {
    render(<IconButton icon="✕" aria-label="Close" />);
    expect(screen.getByRole("button")).toHaveStyle({ borderRadius: "9999px" });
  });

  it("renders as rounded-square when rounded is false", () => {
    render(<IconButton icon="✕" aria-label="Close" rounded={false} />);
    expect(screen.getByRole("button")).toHaveStyle({ borderRadius: "6px" });
  });

  it("applies size dimensions", () => {
    render(<IconButton icon="✕" aria-label="Close" size="lg" />);
    expect(screen.getByRole("button")).toHaveStyle({ width: "44px", height: "44px" });
  });

  it("defaults to the secondary variant", () => {
    render(<IconButton icon="✕" aria-label="Close" />);
    expect(screen.getByRole("button")).toHaveStyle({ backgroundColor: "#D4AF9F" });
  });

  it("has type=button so it never submits a form by default", () => {
    render(<IconButton icon="✕" aria-label="Close" />);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("forwards ref to the underlying button", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<IconButton icon="✕" aria-label="Close" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("sets displayName", () => {
    expect(IconButton.displayName).toBe("IconButton");
  });
});
