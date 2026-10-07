import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Divider } from "./Divider";

describe("Divider", () => {
  it("renders a horizontal separator by default", () => {
    render(<Divider data-testid="divider" />);
    const el = screen.getByTestId("divider");
    expect(el).toHaveAttribute("role", "separator");
    expect(el).toHaveStyle({ height: "1px", width: "100%" });
  });

  it("renders a vertical separator", () => {
    render(<Divider orientation="vertical" data-testid="divider" />);
    const el = screen.getByTestId("divider");
    expect(el).toHaveAttribute("aria-orientation", "vertical");
    expect(el).toHaveStyle({ width: "1px" });
  });

  it("applies spacing from the token scale on the horizontal axis", () => {
    render(<Divider spacing="lg" data-testid="divider" />);
    expect(screen.getByTestId("divider")).toHaveStyle({
      marginTop: "24px",
      marginBottom: "24px",
    });
  });

  it("applies spacing from the token scale on the vertical axis", () => {
    render(<Divider orientation="vertical" spacing="lg" data-testid="divider" />);
    expect(screen.getByTestId("divider")).toHaveStyle({
      marginLeft: "24px",
      marginRight: "24px",
    });
  });

  it("renders a label when provided", () => {
    render(<Divider label="OR" />);
    expect(screen.getByText("OR")).toBeInTheDocument();
  });

  it("does not render label text when omitted", () => {
    render(<Divider data-testid="divider" />);
    expect(screen.getByTestId("divider")).toBeEmptyDOMElement();
  });

  it("allows overriding the role", () => {
    render(<Divider role="none" data-testid="divider" />);
    expect(screen.getByTestId("divider")).toHaveAttribute("role", "none");
  });

  it("forwards ref to the underlying div", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Divider ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("sets displayName", () => {
    expect(Divider.displayName).toBe("Divider");
  });
});
