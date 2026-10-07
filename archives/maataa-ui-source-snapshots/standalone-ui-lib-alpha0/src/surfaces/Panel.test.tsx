import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { Panel } from "./Panel";

describe("Panel", () => {
  it("renders children", () => {
    render(<Panel>Content</Panel>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders the title", () => {
    render(<Panel title="Filters">Content</Panel>);
    expect(screen.getByText("Filters")).toBeInTheDocument();
  });

  it("renders header actions", () => {
    render(
      <Panel title="Filters" actions={<button>Reset</button>}>
        Content
      </Panel>
    );
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });

  it("does not render a header when no title or actions are given", () => {
    render(<Panel>Content</Panel>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("is not collapsible by default", () => {
    render(<Panel title="Filters">Content</Panel>);
    expect(screen.queryByRole("button", { name: "Filters" })).not.toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("collapses content when the header is clicked and collapsible is true", async () => {
    const user = userEvent.setup();
    render(
      <Panel title="Filters" collapsible>
        Content
      </Panel>
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
    await user.click(screen.getByRole("button"));
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });

  it("starts collapsed when defaultCollapsed is true", () => {
    render(
      <Panel title="Filters" collapsible defaultCollapsed>
        Content
      </Panel>
    );
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });

  it("supports controlled collapsed state", async () => {
    const onCollapsedChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Panel title="Filters" collapsible collapsed={false} onCollapsedChange={onCollapsedChange}>
        Content
      </Panel>
    );
    await user.click(screen.getByRole("button"));
    expect(onCollapsedChange).toHaveBeenCalledWith(true);
    // Controlled: content stays visible since the `collapsed` prop didn't change
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("toggles via the Enter key when collapsible", async () => {
    const user = userEvent.setup();
    render(
      <Panel title="Filters" collapsible>
        Content
      </Panel>
    );
    const header = screen.getByRole("button");
    header.focus();
    await user.keyboard("{Enter}");
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });

  it("sets aria-expanded when collapsible", () => {
    render(
      <Panel title="Filters" collapsible>
        Content
      </Panel>
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
  });

  it("forwards ref to the underlying div", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Panel ref={ref}>Content</Panel>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("sets displayName", () => {
    expect(Panel.displayName).toBe("Panel");
  });
});
