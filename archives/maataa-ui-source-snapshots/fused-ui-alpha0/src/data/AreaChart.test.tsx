import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AreaChart } from "./AreaChart";

describe("AreaChart", () => {
  const categories = ["Mon", "Tue", "Wed"];
  const series = [{ label: "Sessions", data: [10, 20, 15] }];

  it("renders an svg with an accessible label", () => {
    const { container } = render(<AreaChart categories={categories} series={series} />);
    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-label",
      expect.stringContaining("1 series")
    );
  });

  it("renders a filled area path and a line path per series", () => {
    const { container } = render(<AreaChart categories={categories} series={series} />);
    const filled = container.querySelectorAll('path[fill]:not([fill="none"])');
    const lines = container.querySelectorAll('path[fill="none"]');
    expect(filled).toHaveLength(1);
    expect(lines).toHaveLength(1);
  });

  it("applies the design system's area wash opacity", () => {
    const { container } = render(<AreaChart categories={categories} series={series} />);
    const filled = container.querySelector('path[fill]:not([fill="none"])');
    expect(filled).toHaveAttribute("fill-opacity", "0.1");
  });

  it("renders a legend for multiple series only", () => {
    render(<AreaChart categories={categories} series={series} />);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();

    const twoSeries = [
      { label: "Sessions", data: [10, 20, 15] },
      { label: "Pageviews", data: [30, 45, 38] },
    ];
    render(<AreaChart categories={categories} series={twoSeries} />);
    expect(screen.getByText("Sessions")).toBeInTheDocument();
    expect(screen.getByText("Pageviews")).toBeInTheDocument();
  });

  it("shows a tooltip on hover", async () => {
    const { container } = render(<AreaChart categories={categories} series={series} />);
    const rects = container.querySelectorAll("rect");
    fireEvent.mouseMove(rects[0], { clientX: 20, clientY: 20 });
    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });
  });

  it("forwards a ref to the svg element", () => {
    const ref = React.createRef<SVGSVGElement>();
    render(<AreaChart ref={ref} categories={categories} series={series} />);
    expect(ref.current).toBeInstanceOf(SVGSVGElement);
  });

  it("sets displayName", () => {
    expect(AreaChart.displayName).toBe("AreaChart");
  });
});
