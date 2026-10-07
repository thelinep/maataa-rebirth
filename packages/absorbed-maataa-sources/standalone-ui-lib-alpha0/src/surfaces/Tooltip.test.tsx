import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("renders trigger element", () => {
    render(
      <Tooltip content="Help text">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });

  it("shows tooltip on hover", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Helpful information">
        <button>Trigger</button>
      </Tooltip>
    );
    const trigger = screen.getByText("Trigger");
    const wrapper = trigger.parentElement as HTMLElement;
    await user.hover(wrapper);

    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });
  });

  it("hides tooltip on mouse leave", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Helpful information">
        <button>Trigger</button>
      </Tooltip>
    );
    const trigger = screen.getByText("Trigger");
    const wrapper = trigger.parentElement as HTMLElement;
    await user.hover(wrapper);

    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    await user.unhover(wrapper);

    // Tooltip should be hidden
    await waitFor(
      () => {
        expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
      },
      { timeout: 300 }
    );
  });

  it("shows tooltip on focus", async () => {
    render(
      <Tooltip content="Focused tooltip">
        <button>Trigger</button>
      </Tooltip>
    );
    const trigger = screen.getByText("Trigger");
    const wrapper = trigger.parentElement as HTMLElement;
    fireEvent.focus(wrapper);

    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });
  });

  it("hides tooltip on blur", async () => {
    render(
      <Tooltip content="Focused tooltip">
        <button>Trigger</button>
      </Tooltip>
    );
    const trigger = screen.getByText("Trigger");
    const wrapper = trigger.parentElement as HTMLElement;
    fireEvent.focus(wrapper);

    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    fireEvent.blur(wrapper);

    await waitFor(
      () => {
        expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
      },
      { timeout: 300 }
    );
  });

  it("applies different position variants", () => {
    const positions = ["top", "right", "bottom", "left"] as const;
    positions.forEach((position) => {
      const { container } = render(
        <Tooltip content="Content" position={position}>
          <button>Button</button>
        </Tooltip>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it("respects delay prop", async () => {
    vi.useFakeTimers();

    render(
      <Tooltip content="Delayed tooltip" delay={500}>
        <button>Trigger</button>
      </Tooltip>
    );

    const trigger = screen.getByText("Trigger");
    const wrapper = trigger.parentElement as HTMLElement;
    fireEvent.mouseEnter(wrapper);

    // Tooltip should not appear immediately
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    // Fast forward time
    vi.advanceTimersByTime(500);

    // Now it should appear
    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    vi.useRealTimers();
  });

  it("disables tooltip when disabled prop is true", async () => {
    render(
      <Tooltip content="Disabled tooltip" disabled>
        <button>Trigger</button>
      </Tooltip>
    );

    const trigger = screen.getByText("Trigger");
    const wrapper = trigger.parentElement as HTMLElement;
    fireEvent.mouseEnter(wrapper);

    // Tooltip should not appear
    await waitFor(
      () => {
        expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
      },
      { timeout: 100 }
    );
  });

  it("renders with different trigger elements", () => {
    const { rerender } = render(
      <Tooltip content="Tooltip">
        <span>Text trigger</span>
      </Tooltip>
    );
    expect(screen.getByText("Text trigger")).toBeInTheDocument();

    rerender(
      <Tooltip content="Tooltip">
        <a href="#">Link trigger</a>
      </Tooltip>
    );
    expect(screen.getByText("Link trigger")).toBeInTheDocument();
  });

  it("handles long tooltip content", async () => {
    const user = userEvent.setup();
    const longContent =
      "This is a very long tooltip with multiple lines of content that should wrap properly";
    render(
      <Tooltip content={longContent}>
        <button>Hover</button>
      </Tooltip>
    );

    const trigger = screen.getByText("Hover");
    const wrapper = trigger.parentElement as HTMLElement;
    await user.hover(wrapper);

    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });
  });

  it("works with keyboard focus", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Keyboard tooltip">
        <button>Tab here</button>
      </Tooltip>
    );

    const button = screen.getByText("Tab here");
    const wrapper = button.parentElement as HTMLElement;
    await user.tab();

    expect(button).toHaveFocus();

    // Fire focus event on wrapper to simulate focus behavior
    fireEvent.focus(wrapper);

    // Tooltip should show on focus
    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });
  });
});
