import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { ConfirmButton } from "./ConfirmButton";

describe("ConfirmButton", () => {
  it("renders its label initially", () => {
    render(<ConfirmButton onConfirm={() => {}}>Delete</ConfirmButton>);
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });

  it("does not call onConfirm on the first click", async () => {
    const onConfirm = vi.fn();
    const user = userEvent.setup();
    render(<ConfirmButton onConfirm={onConfirm}>Delete</ConfirmButton>);
    await user.click(screen.getByRole("button", { name: "Delete" }));
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it("shows the confirmation prompt after the first click", async () => {
    const user = userEvent.setup();
    render(<ConfirmButton onConfirm={() => {}}>Delete</ConfirmButton>);
    await user.click(screen.getByRole("button", { name: "Delete" }));
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Yes" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  it("calls onConfirm when the confirmation button is clicked", async () => {
    const onConfirm = vi.fn();
    const user = userEvent.setup();
    render(<ConfirmButton onConfirm={onConfirm}>Delete</ConfirmButton>);
    await user.click(screen.getByRole("button", { name: "Delete" }));
    await user.click(screen.getByRole("button", { name: "Yes" }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("returns to the initial state when cancelled", async () => {
    const onConfirm = vi.fn();
    const user = userEvent.setup();
    render(<ConfirmButton onConfirm={onConfirm}>Delete</ConfirmButton>);
    await user.click(screen.getByRole("button", { name: "Delete" }));
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onConfirm).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
    expect(screen.queryByText("Are you sure?")).not.toBeInTheDocument();
  });

  it("accepts custom confirm text and labels", async () => {
    const user = userEvent.setup();
    render(
      <ConfirmButton
        onConfirm={() => {}}
        confirmText="Really delete this?"
        confirmLabel="Confirm"
        cancelLabel="Nevermind"
      >
        Delete
      </ConfirmButton>
    );
    await user.click(screen.getByRole("button", { name: "Delete" }));
    expect(screen.getByText("Really delete this?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Nevermind" })).toBeInTheDocument();
  });

  it("defaults to the danger variant", () => {
    render(<ConfirmButton onConfirm={() => {}}>Delete</ConfirmButton>);
    expect(screen.getByRole("button", { name: "Delete" })).toHaveStyle({
      backgroundColor: "#F5B5A6",
    });
  });

  it("forwards ref to the underlying button in the initial state", () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <ConfirmButton onConfirm={() => {}} ref={ref}>
        Delete
      </ConfirmButton>
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("sets displayName", () => {
    expect(ConfirmButton.displayName).toBe("ConfirmButton");
  });
});
