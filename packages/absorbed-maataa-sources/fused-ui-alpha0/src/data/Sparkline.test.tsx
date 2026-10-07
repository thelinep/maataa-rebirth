import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Sparkline } from "./Sparkline";

describe("Sparkline", () => {
  it("renders an svg with the given dimensions", () => {
    const { container } = render(<Sparkline data={[1, 2, 3]} width={100} height={30} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "100");
    expect(svg).toHaveAttribute("height", "30");
  });

  it("renders a path through the data", () => {
    const { container } = render(<Sparkline data={[1, 5, 2, 8, 4]} />);
    const path = container.querySelector("path");
    expect(path).toBeInTheDocument();
    expect(path?.getAttribute("d")).toMatch(/^M/);
  });

  it("renders an end dot by default", () => {
    const { container } = render(<Sparkline data={[1, 2, 3]} />);
    expect(container.querySelector("circle")).toBeInTheDocument();
  });

  it("omits the end dot when showEndDot is false", () => {
    const { container } = render(<Sparkline data={[1, 2, 3]} showEndDot={false} />);
    expect(container.querySelector("circle")).not.toBeInTheDocument();
  });

  it("handles a single data point without dividing by zero", () => {
    const { container } = render(<Sparkline data={[5]} />);
    expect(container.querySelector("path")).toBeInTheDocument();
  });

  it("sets an accessible label", () => {
    const { container } = render(<Sparkline data={[1, 2, 3]} aria-label="Weekly signups" />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-label", "Weekly signups");
  });

  it("forwards a ref to the svg element", () => {
    const ref = React.createRef<SVGSVGElement>();
    render(<Sparkline ref={ref} data={[1, 2, 3]} />);
    expect(ref.current).toBeInstanceOf(SVGSVGElement);
  });

  it("sets displayName", () => {
    expect(Sparkline.displayName).toBe("Sparkline");
  });
});
