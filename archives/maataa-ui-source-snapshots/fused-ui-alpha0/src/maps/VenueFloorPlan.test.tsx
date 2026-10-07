import React, { createRef, useState } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { VenueFloorPlan, type FloorPlanZone } from "./VenueFloorPlan";

const zones: FloorPlanZone[] = [
  { id: "a1", label: "A1", x: 2, y: 2, width: 4, height: 3, status: "available" },
  { id: "a2", label: "A2", x: 7, y: 2, width: 4, height: 3, status: "reserved" },
  { id: "a3", label: "A3", x: 12, y: 2, width: 4, height: 3, status: "occupied" },
  { id: "a4", label: "A4", x: 17, y: 2, width: 4, height: 3, status: "blocked" },
];

function ControlledVenueFloorPlan() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  return (
    <VenueFloorPlan
      planWidth={40}
      planHeight={24}
      zones={zones}
      selectedId={selectedId}
      onSelect={setSelectedId}
    />
  );
}

describe("VenueFloorPlan", () => {
  it("renders an SVG with an accessible label naming the zone count", () => {
    render(<VenueFloorPlan planWidth={40} planHeight={24} zones={zones} />);
    expect(screen.getByRole("img", { name: "Venue floor plan with 4 zones" })).toBeInTheDocument();
  });

  it("renders each zone as a labeled, selectable button", () => {
    render(<VenueFloorPlan planWidth={40} planHeight={24} zones={zones} />);
    expect(screen.getByRole("button", { name: "A1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "A2" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "A3" })).toBeInTheDocument();
  });

  it("renders each zone's label text", () => {
    render(<VenueFloorPlan planWidth={40} planHeight={24} zones={zones} />);
    expect(screen.getByText("A1")).toBeInTheDocument();
    expect(screen.getByText("A4")).toBeInTheDocument();
  });

  it("does not give a blocked zone a button role", () => {
    render(<VenueFloorPlan planWidth={40} planHeight={24} zones={zones} />);
    expect(screen.queryByRole("button", { name: "A4" })).not.toBeInTheDocument();
  });

  it("calls onSelect with the zone id when a zone is clicked", () => {
    const onSelect = vi.fn();
    render(<VenueFloorPlan planWidth={40} planHeight={24} zones={zones} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole("button", { name: "A1" }));
    expect(onSelect).toHaveBeenCalledWith("a1");
  });

  it("toggles selection off when the same zone is clicked again (controlled)", () => {
    render(<ControlledVenueFloorPlan />);
    const a1 = screen.getByRole("button", { name: "A1" });
    fireEvent.click(a1);
    expect(a1).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(a1);
    expect(a1).toHaveAttribute("aria-pressed", "false");
  });

  it("does not give an explicitly disabled zone a button role either", () => {
    const disabledZones: FloorPlanZone[] = [
      {
        id: "d1",
        label: "D1",
        x: 2,
        y: 2,
        width: 4,
        height: 3,
        status: "available",
        disabled: true,
      },
    ];
    const onSelect = vi.fn();
    render(
      <VenueFloorPlan planWidth={40} planHeight={24} zones={disabledZones} onSelect={onSelect} />
    );
    expect(screen.queryByRole("button", { name: "D1" })).not.toBeInTheDocument();
  });

  it("selects a zone via the keyboard (Enter)", () => {
    const onSelect = vi.fn();
    render(<VenueFloorPlan planWidth={40} planHeight={24} zones={zones} onSelect={onSelect} />);
    fireEvent.keyDown(screen.getByRole("button", { name: "A2" }), { key: "Enter" });
    expect(onSelect).toHaveBeenCalledWith("a2");
  });

  it("selects a zone via the keyboard (Space)", () => {
    const onSelect = vi.fn();
    render(<VenueFloorPlan planWidth={40} planHeight={24} zones={zones} onSelect={onSelect} />);
    fireEvent.keyDown(screen.getByRole("button", { name: "A3" }), { key: " " });
    expect(onSelect).toHaveBeenCalledWith("a3");
  });

  it("marks the selected zone with aria-pressed", () => {
    render(
      <VenueFloorPlan
        planWidth={40}
        planHeight={24}
        zones={zones}
        selectedId="a2"
        onSelect={() => {}}
      />
    );
    expect(screen.getByRole("button", { name: "A2" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "A1" })).toHaveAttribute("aria-pressed", "false");
  });

  it("renders zoom controls by default", () => {
    render(<VenueFloorPlan planWidth={40} planHeight={24} zones={zones} />);
    expect(screen.getByRole("button", { name: "Zoom in" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Zoom out" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reset view" })).toBeInTheDocument();
  });

  it("omits zoom controls when zoomable is false", () => {
    render(<VenueFloorPlan planWidth={40} planHeight={24} zones={zones} zoomable={false} />);
    expect(screen.queryByRole("button", { name: "Zoom in" })).not.toBeInTheDocument();
  });

  it("supports circular zones", () => {
    const circleZones: FloorPlanZone[] = [
      { id: "c1", label: "C1", x: 5, y: 5, width: 6, height: 6, shape: "circle" },
    ];
    render(<VenueFloorPlan planWidth={40} planHeight={24} zones={circleZones} />);
    expect(screen.getByRole("button", { name: "C1" })).toBeInTheDocument();
  });

  it("forwards the ref to the svg element", () => {
    const ref = createRef<SVGSVGElement>();
    render(<VenueFloorPlan ref={ref} planWidth={40} planHeight={24} zones={zones} />);
    expect(ref.current).toBeInstanceOf(SVGSVGElement);
  });

  it("has a displayName", () => {
    expect(VenueFloorPlan.displayName).toBe("VenueFloorPlan");
  });
});
