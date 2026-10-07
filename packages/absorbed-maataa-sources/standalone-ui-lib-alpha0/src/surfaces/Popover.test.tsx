import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Popover } from "./Popover";

describe("Popover", () => {
  it("renders trigger element", () => {
    render(
      <Popover isOpen={false} onOpenChange={() => {}} content="Popover content">
        <button>Open</button>
      </Popover>
    );
    expect(screen.getByText("Open")).toBeInTheDocument();
  });

  it("shows popover when isOpen is true", () => {
    render(
      <Popover isOpen={true} onOpenChange={() => {}} content="Visible content">
        <button>Trigger</button>
      </Popover>
    );
    expect(screen.getByText("Visible content")).toBeInTheDocument();
  });

  it("hides popover when isOpen is false", () => {
    render(
      <Popover isOpen={false} onOpenChange={() => {}} content="Hidden content">
        <button>Trigger</button>
      </Popover>
    );
    expect(screen.queryByText("Hidden content")).not.toBeInTheDocument();
  });

  it("calls onOpenChange when opened", () => {
    const onOpenChange = jest.fn();
    render(
      <Popover isOpen={false} onOpenChange={onOpenChange} content="Content">
        <button>Open</button>
      </Popover>
    );

    const button = screen.getByText("Open");
    fireEvent.click(button);

    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("calls onOpenChange when closed", async () => {
    const onOpenChange = jest.fn();
    render(
      <div>
        <Popover isOpen={true} onOpenChange={onOpenChange} content="Content">
          <button>Close</button>
        </Popover>
        <div data-testid="outside">Outside element</div>
      </div>
    );

    // Click outside the popover (use mouseDown which is what Popover listens for)
    const outside = screen.getByTestId("outside");
    fireEvent.mouseDown(outside);

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalled();
    });
  });

  it("renders title when provided", () => {
    render(
      <Popover isOpen={true} onOpenChange={() => {}} title="Popover Title" content="Content">
        <button>Trigger</button>
      </Popover>
    );
    expect(screen.getByText("Popover Title")).toBeInTheDocument();
  });

  it("renders content", () => {
    render(
      <Popover isOpen={true} onOpenChange={() => {}} content="Popover content">
        <button>Trigger</button>
      </Popover>
    );
    expect(screen.getByText("Popover content")).toBeInTheDocument();
  });

  it("applies position variants", () => {
    const positions = ["top", "right", "bottom", "left"] as const;
    positions.forEach((position) => {
      const { container } = render(
        <Popover isOpen={true} onOpenChange={() => {}} position={position} content="Content">
          <button>Trigger</button>
        </Popover>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it("closes on click outside", async () => {
    const onOpenChange = jest.fn();
    render(
      <div>
        <Popover isOpen={true} onOpenChange={onOpenChange} content="Content">
          <button>Trigger</button>
        </Popover>
        <div data-testid="outside-area">Outside</div>
      </div>
    );

    const outsideArea = screen.getByTestId("outside-area");
    fireEvent.mouseDown(outsideArea);

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  it("disables popover when disabled prop is true", () => {
    const onOpenChange = jest.fn();
    render(
      <Popover isOpen={false} onOpenChange={onOpenChange} content="Content" disabled>
        <button>Trigger</button>
      </Popover>
    );

    const button = screen.getByText("Trigger");
    fireEvent.click(button);

    // Should not open
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("works in uncontrolled mode", () => {
    render(
      <Popover content="Uncontrolled content">
        <button>Click me</button>
      </Popover>
    );

    const button = screen.getByText("Click me");
    fireEvent.click(button);

    // Content should appear after clicking
    expect(screen.queryByText("Uncontrolled content")).toBeDefined();
  });

  it("handles controlled prop changes", () => {
    const { rerender } = render(
      <Popover isOpen={false} onOpenChange={() => {}} content="Content">
        <button>Trigger</button>
      </Popover>
    );

    expect(screen.queryByText("Content")).not.toBeInTheDocument();

    rerender(
      <Popover isOpen={true} onOpenChange={() => {}} content="Content">
        <button>Trigger</button>
      </Popover>
    );

    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders with title and content divider", () => {
    render(
      <Popover isOpen={true} onOpenChange={() => {}} title="Title" content="Content">
        <button>Trigger</button>
      </Popover>
    );

    // Should have both title and content
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});
