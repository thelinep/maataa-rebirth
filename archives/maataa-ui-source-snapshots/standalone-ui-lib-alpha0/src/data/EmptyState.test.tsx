import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("renders the title", () => {
    render(<EmptyState title="No results yet" />);
    expect(screen.getByText("No results yet")).toBeInTheDocument();
  });

  it("renders a description when provided", () => {
    render(<EmptyState title="No results yet" description="Try adjusting your filters" />);
    expect(screen.getByText("Try adjusting your filters")).toBeInTheDocument();
  });

  it("does not render a description when omitted", () => {
    const { container } = render(<EmptyState title="No results yet" />);
    expect(container.textContent).not.toContain("filters");
  });

  it("renders an icon when provided", () => {
    render(<EmptyState icon="📊" title="No results yet" />);
    expect(screen.getByText("📊")).toBeInTheDocument();
  });

  it("renders an action when provided", () => {
    render(<EmptyState title="No results yet" action={<button>Create one</button>} />);
    expect(screen.getByRole("button", { name: "Create one" })).toBeInTheDocument();
  });

  it("forwards a ref to the container", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<EmptyState ref={ref} title="No results yet" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("sets displayName", () => {
    expect(EmptyState.displayName).toBe("EmptyState");
  });
});
