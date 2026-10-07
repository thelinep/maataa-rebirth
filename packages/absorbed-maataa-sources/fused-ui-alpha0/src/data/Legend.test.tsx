import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Legend } from "./Legend";

describe("Legend", () => {
  const items = [
    { label: "Revenue", color: "#2a78d6" },
    { label: "Costs", color: "#eb6834" },
  ];

  it("renders every item's label", () => {
    render(<Legend items={items} />);
    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("Costs")).toBeInTheDocument();
  });

  it("renders a list with one item per entry", () => {
    render(<Legend items={items} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("renders an empty list for no items", () => {
    const { container } = render(<Legend items={[]} />);
    expect(container.querySelectorAll("li")).toHaveLength(0);
  });

  it("forwards a ref to the list element", () => {
    const ref = React.createRef<HTMLUListElement>();
    render(<Legend ref={ref} items={items} />);
    expect(ref.current).toBeInstanceOf(HTMLUListElement);
  });

  it("sets displayName", () => {
    expect(Legend.displayName).toBe("Legend");
  });
});
