import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toast, ToastContainer } from "./Toast";

describe("Toast", () => {
  it("renders its message", () => {
    render(<Toast id="1" message="Saved successfully" onClose={() => {}} duration={0} />);
    expect(screen.getByText("Saved successfully")).toBeInTheDocument();
  });

  it.each(["success", "error", "warning", "info"] as const)(
    "renders the %s type without throwing",
    (type) => {
      render(<Toast id="1" message="Message" type={type} onClose={() => {}} duration={0} />);
      expect(screen.getByText("Message")).toBeInTheDocument();
    }
  );

  it("calls onClose with its id when the dismiss button is clicked", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<Toast id="toast-1" message="Message" onClose={onClose} duration={0} />);
    await user.click(screen.getByRole("button", { name: "Dismiss notification" }));
    expect(onClose).toHaveBeenCalledWith("toast-1");
  });

  it("auto-dismisses after the given duration", () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<Toast id="toast-1" message="Message" onClose={onClose} duration={3000} />);
    expect(onClose).not.toHaveBeenCalled();
    vi.advanceTimersByTime(3000);
    expect(onClose).toHaveBeenCalledWith("toast-1");
    vi.useRealTimers();
  });

  it("does not auto-dismiss when duration is 0", () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<Toast id="toast-1" message="Message" onClose={onClose} duration={0} />);
    vi.advanceTimersByTime(10000);
    expect(onClose).not.toHaveBeenCalled();
    vi.useRealTimers();
  });

  it("renders an action button and calls its onClick", async () => {
    const onActionClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Toast
        id="1"
        message="Message"
        onClose={() => {}}
        duration={0}
        action={{ label: "Undo", onClick: onActionClick }}
      />
    );
    await user.click(screen.getByRole("button", { name: "Undo" }));
    expect(onActionClick).toHaveBeenCalledTimes(1);
  });
});

describe("ToastContainer", () => {
  it("renders every toast passed to it", () => {
    render(
      <ToastContainer
        toasts={[
          { id: "1", message: "First", onClose: () => {} },
          { id: "2", message: "Second", onClose: () => {} },
        ]}
        onClose={() => {}}
      />
    );
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
  });

  it("renders nothing when there are no toasts", () => {
    const { container } = render(<ToastContainer toasts={[]} onClose={() => {}} />);
    expect(container.querySelectorAll('[role="button"]').length).toBe(0);
  });
});
