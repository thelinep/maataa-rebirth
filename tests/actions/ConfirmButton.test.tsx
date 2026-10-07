import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ConfirmButton } from "../../src/actions/ConfirmButton";

describe("ConfirmButton", () => {
  it("confirms only after the user chooses the confirm action", () => {
    const onConfirm = vi.fn();
    render(<ConfirmButton onConfirm={onConfirm}>Delete project</ConfirmButton>);

    fireEvent.click(screen.getByRole("button", { name: "Delete project" }));
    expect(onConfirm).not.toHaveBeenCalled();
    expect(screen.getByRole("group", { name: "Are you sure?" })).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Confirm" }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Delete project" })).toBeTruthy();
  });

  it("cancels without confirming and returns to the initial action", () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    render(
      <ConfirmButton onConfirm={onConfirm} onCancel={onCancel}>
        Delete project
      </ConfirmButton>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Delete project" }));
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(onConfirm).not.toHaveBeenCalled();
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Delete project" })).toBeTruthy();
  });
});
