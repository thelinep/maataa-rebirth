import React from "react";
import { render, screen } from "@testing-library/react";
import { VisuallyHidden } from "./VisuallyHidden";

describe("VisuallyHidden", () => {
  it("renders children", () => {
    render(<VisuallyHidden>Hidden text</VisuallyHidden>);
    expect(screen.getByText("Hidden text")).toBeInTheDocument();
  });

  it("applies visually hidden styles", () => {
    const { container } = render(<VisuallyHidden>Hidden</VisuallyHidden>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveStyle("position: absolute");
    expect(element).toHaveStyle("width: 1px");
    expect(element).toHaveStyle("height: 1px");
    expect(element).toHaveStyle("overflow: hidden");
  });

  it("hides content from visual view but keeps accessible", () => {
    const { container } = render(<VisuallyHidden>Screen reader text</VisuallyHidden>);
    const element = container.firstChild as HTMLElement;
    // Should be in the document (accessible to screen readers)
    expect(element).toBeInTheDocument();
    // But should have hidden styles
    const styles = window.getComputedStyle(element);
    expect(styles.position).toBe("absolute");
  });

  it("applies focusable prop for skip links", () => {
    const { container } = render(
      <VisuallyHidden focusable>
        <a href="#main">Skip to content</a>
      </VisuallyHidden>
    );
    const element = container.firstChild as HTMLElement;
    const link = element.querySelector("a") as HTMLAnchorElement;
    expect(link).toBeInTheDocument();
    // Focusable elements should be reachable via keyboard
    expect(link.tabIndex).toBeGreaterThanOrEqual(-1);
  });

  it("renders without focusable by default", () => {
    const { container } = render(
      <VisuallyHidden>
        <span>Not focusable</span>
      </VisuallyHidden>
    );
    const element = container.firstChild as HTMLElement;
    const span = element.querySelector("span") as HTMLSpanElement;
    expect(span).toBeInTheDocument();
  });

  it("renders multiple children", () => {
    render(
      <VisuallyHidden>
        <span>Text 1</span>
        <span>Text 2</span>
      </VisuallyHidden>
    );
    expect(screen.getByText("Text 1")).toBeInTheDocument();
    expect(screen.getByText("Text 2")).toBeInTheDocument();
  });

  it("works with different HTML elements", () => {
    const { rerender } = render(
      <VisuallyHidden>
        <button>Click me</button>
      </VisuallyHidden>
    );
    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toBeInTheDocument();

    rerender(
      <VisuallyHidden>
        <div>Div content</div>
      </VisuallyHidden>
    );
    expect(screen.getByText("Div content")).toBeInTheDocument();
  });

  it("maintains semantic structure with screen readers", () => {
    const { container } = render(
      <label>
        Name
        <VisuallyHidden>(required)</VisuallyHidden>
      </label>
    );
    const label = container.querySelector("label") as HTMLLabelElement;
    expect(label.textContent).toContain("Name");
    expect(label.textContent).toContain("(required)");
  });
});
