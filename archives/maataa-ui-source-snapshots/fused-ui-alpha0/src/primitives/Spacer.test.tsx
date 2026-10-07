import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Spacer } from "./Spacer";

describe("Spacer", () => {
  it("grows to fill available space by default", () => {
    render(<Spacer data-testid="spacer" />);
    expect(screen.getByTestId("spacer")).toHaveStyle({ flex: "1 1 0%" });
  });

  it("is hidden from assistive tech by default", () => {
    render(<Spacer data-testid="spacer" />);
    expect(screen.getByTestId("spacer")).toHaveAttribute("aria-hidden", "true");
  });

  it("allows overriding aria-hidden", () => {
    render(<Spacer aria-hidden={false} data-testid="spacer" />);
    expect(screen.getByTestId("spacer")).toHaveAttribute("aria-hidden", "false");
  });

  it("applies a fixed vertical size from the token scale by default axis", () => {
    render(<Spacer size="lg" data-testid="spacer" />);
    expect(screen.getByTestId("spacer")).toHaveStyle({ height: "24px" });
  });

  it("applies a fixed horizontal size when axis is horizontal", () => {
    render(<Spacer size="lg" axis="horizontal" data-testid="spacer" />);
    expect(screen.getByTestId("spacer")).toHaveStyle({ width: "24px" });
  });

  it("passes through a raw CSS size value", () => {
    render(<Spacer size="50px" data-testid="spacer" />);
    expect(screen.getByTestId("spacer")).toHaveStyle({ height: "50px" });
  });

  it("does not shrink when given a fixed size", () => {
    render(<Spacer size="sm" data-testid="spacer" />);
    expect(screen.getByTestId("spacer")).toHaveStyle({ flexShrink: "0" });
  });

  it("forwards ref to the underlying div", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Spacer ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("sets displayName", () => {
    expect(Spacer.displayName).toBe("Spacer");
  });
});
