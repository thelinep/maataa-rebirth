import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LineChart } from "./LineChart";

describe("LineChart", () => {
  const categories = ["Mon", "Tue", "Wed"];
  const series = [{ label: "Visits", data: [10, 20, 15] }];

  it("renders an svg with an accessible label", () => {
    const { container } = render(<LineChart categories={categories} series={series} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-label", expect.stringContaining("1 series"));
  });

  it("renders one path per series", () => {
    const twoSeries = [
      { label: "Visits", data: [10, 20, 15] },
      { label: "Signups", data: [2, 4, 3] },
    ];
    const { container } = render(<LineChart categories={categories} series={twoSeries} />);
    // 2 series lines; hover hit-target rects are <rect>, not <path>.
    expect(container.querySelectorAll("path")).toHaveLength(2);
  });

  it("renders x-axis category labels", () => {
    render(<LineChart categories={categories} series={series} />);
    expect(screen.getByText("Mon")).toBeInTheDocument();
    expect(screen.getByText("Wed")).toBeInTheDocument();
  });

  it("does not render a legend for a single series", () => {
    render(<LineChart categories={categories} series={series} />);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("renders a legend for multiple series", () => {
    const twoSeries = [
      { label: "Visits", data: [10, 20, 15] },
      { label: "Signups", data: [2, 4, 3] },
    ];
    render(<LineChart categories={categories} series={twoSeries} />);
    expect(screen.getByText("Visits")).toBeInTheDocument();
    expect(screen.getByText("Signups")).toBeInTheDocument();
  });

  it("shows a tooltip on hover and hides it on mouse leave", async () => {
    const { container } = render(<LineChart categories={categories} series={series} />);
    const hitRects = container.querySelectorAll("rect");
    fireEvent.mouseMove(hitRects[0], { clientX: 50, clientY: 50 });
    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });
    fireEvent.mouseLeave(hitRects[0]);
    await waitFor(() => {
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
  });

  it("forwards a ref to the svg element", () => {
    const ref = React.createRef<SVGSVGElement>();
    render(<LineChart ref={ref} categories={categories} series={series} />);
    expect(ref.current).toBeInstanceOf(SVGSVGElement);
  });

  it("sets displayName", () => {
    expect(LineChart.displayName).toBe("LineChart");
  });
});
