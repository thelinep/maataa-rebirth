import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DonutChart } from "./DonutChart";

describe("DonutChart", () => {
  const data = [
    { label: "Direct", value: 420 },
    { label: "Referral", value: 180 },
  ];

  it("renders an svg with an accessible label", () => {
    const { container } = render(<DonutChart data={data} />);
    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-label",
      expect.stringContaining("2 categories")
    );
  });

  it("renders one ring segment per slice", () => {
    const { container } = render(<DonutChart data={data} />);
    expect(container.querySelectorAll("circle")).toHaveLength(2);
  });

  it("renders a legend entry per slice", () => {
    render(<DonutChart data={data} />);
    expect(screen.getByText("Direct")).toBeInTheDocument();
    expect(screen.getByText("Referral")).toBeInTheDocument();
  });

  it("shows the formatted total in the center by default", () => {
    render(<DonutChart data={data} />);
    expect(screen.getByText("600")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
  });

  it("hides the total when showTotal is false", () => {
    render(<DonutChart data={data} showTotal={false} />);
    expect(screen.queryByText("Total")).not.toBeInTheDocument();
  });

  it("shows a tooltip on segment hover", async () => {
    const { container } = render(<DonutChart data={data} />);
    const segments = container.querySelectorAll("circle");
    fireEvent.mouseMove(segments[0], { clientX: 20, clientY: 20 });
    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });
  });

  it("forwards a ref to the svg element", () => {
    const ref = React.createRef<SVGSVGElement>();
    render(<DonutChart ref={ref} data={data} />);
    expect(ref.current).toBeInstanceOf(SVGSVGElement);
  });

  it("sets displayName", () => {
    expect(DonutChart.displayName).toBe("DonutChart");
  });
});
