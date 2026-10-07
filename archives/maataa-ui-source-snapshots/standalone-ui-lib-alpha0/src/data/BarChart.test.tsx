import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BarChart } from "./BarChart";

describe("BarChart", () => {
  const categories = ["Q1", "Q2", "Q3"];
  const series = [{ label: "Revenue", data: [100, 200, 150] }];

  it("renders an svg with an accessible label", () => {
    const { container } = render(<BarChart categories={categories} series={series} />);
    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-label",
      expect.stringContaining("1 series")
    );
  });

  it("renders one bar per category for a single series", () => {
    const { container } = render(<BarChart categories={categories} series={series} />);
    // gridline count varies with niceTicks, so count bars via their fill color instead.
    const bars = Array.from(container.querySelectorAll("path")).filter(
      (el) => el.getAttribute("fill") !== "none"
    );
    expect(bars).toHaveLength(3);
  });

  it("renders grouped bars for multiple series", () => {
    const twoSeries = [
      { label: "Revenue", data: [100, 200, 150] },
      { label: "Costs", data: [60, 90, 80] },
    ];
    const { container } = render(<BarChart categories={categories} series={twoSeries} />);
    const bars = Array.from(container.querySelectorAll("path")).filter(
      (el) => el.getAttribute("fill") !== "none"
    );
    expect(bars).toHaveLength(6);
  });

  it("renders x-axis category labels", () => {
    render(<BarChart categories={categories} series={series} />);
    expect(screen.getByText("Q1")).toBeInTheDocument();
    expect(screen.getByText("Q3")).toBeInTheDocument();
  });

  it("renders a legend for multiple series only", () => {
    const { queryByText: notFound } = render(<BarChart categories={categories} series={series} />);
    expect(notFound("Revenue")).not.toBeInTheDocument();

    const twoSeries = [
      { label: "Revenue", data: [100, 200, 150] },
      { label: "Costs", data: [60, 90, 80] },
    ];
    render(<BarChart categories={categories} series={twoSeries} />);
    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("Costs")).toBeInTheDocument();
  });

  it("shows a tooltip on bar hover", async () => {
    const { container } = render(<BarChart categories={categories} series={series} />);
    const bars = Array.from(container.querySelectorAll("path")).filter(
      (el) => el.getAttribute("fill") !== "none"
    );
    fireEvent.mouseMove(bars[0], { clientX: 20, clientY: 20 });
    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });
  });

  it("forwards a ref to the svg element", () => {
    const ref = React.createRef<SVGSVGElement>();
    render(<BarChart ref={ref} categories={categories} series={series} />);
    expect(ref.current).toBeInstanceOf(SVGSVGElement);
  });

  it("sets displayName", () => {
    expect(BarChart.displayName).toBe("BarChart");
  });
});
