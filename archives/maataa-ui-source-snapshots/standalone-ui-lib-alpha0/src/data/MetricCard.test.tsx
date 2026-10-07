import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MetricCard } from "./MetricCard";
import { colorTokens } from "../tokens";

describe("MetricCard", () => {
  it("renders the label", () => {
    render(<MetricCard label="Total revenue" value={100} />);
    expect(screen.getByText("Total revenue")).toBeInTheDocument();
  });

  it("renders a value under 1,000 without compacting it", () => {
    render(<MetricCard label="Signups" value={284} />);
    expect(screen.getByText("284")).toBeInTheDocument();
  });

  it("compacts a large numeric value to one decimal with a suffix", () => {
    render(<MetricCard label="Revenue" value={12900} />);
    expect(screen.getByText("12.9K")).toBeInTheDocument();
  });

  it("applies a value prefix", () => {
    render(<MetricCard label="Revenue" value={4200000} valuePrefix="$" />);
    expect(screen.getByText("$4.2M")).toBeInTheDocument();
  });

  it("renders a string value verbatim", () => {
    render(<MetricCard label="Status" value="Healthy" />);
    expect(screen.getByText("Healthy")).toBeInTheDocument();
  });

  it("renders a positive delta in the success color when up is good", () => {
    render(<MetricCard label="Revenue" value={100} delta={12.4} positiveIsGood />);
    const delta = screen.getByText(/12.4%/);
    expect(delta).toHaveStyle({ color: colorTokens.interactive.success });
  });

  it("renders a positive delta in the error color when up is bad", () => {
    render(<MetricCard label="Churn" value={100} delta={5} positiveIsGood={false} />);
    const delta = screen.getByText(/5%/);
    expect(delta).toHaveStyle({ color: colorTokens.interactive.error });
  });

  it("renders the delta period alongside the delta", () => {
    render(<MetricCard label="Revenue" value={100} delta={3} deltaPeriod="vs last week" />);
    expect(screen.getByText("vs last week")).toBeInTheDocument();
  });

  it("renders a trend sparkline when provided", () => {
    const { container } = render(<MetricCard label="Revenue" value={100} trend={[1, 2, 3, 4]} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("omits the trend sparkline when not provided", () => {
    const { container } = render(<MetricCard label="Revenue" value={100} />);
    expect(container.querySelector("svg")).not.toBeInTheDocument();
  });

  it("forwards a ref to the container", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<MetricCard ref={ref} label="Revenue" value={100} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("sets displayName", () => {
    expect(MetricCard.displayName).toBe("MetricCard");
  });
});
