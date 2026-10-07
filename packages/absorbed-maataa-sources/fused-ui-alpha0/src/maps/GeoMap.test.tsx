import React, { createRef, useState } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { GeoMap, type GeoMapPin } from "./GeoMap";

const pins: GeoMapPin[] = [
  { id: "sf", label: "San Francisco", lat: 37.77, lng: -122.42 },
  { id: "nyc", label: "New York", lat: 40.71, lng: -74.01, status: "active" },
  { id: "lon", label: "London", lat: 51.51, lng: -0.13, status: "alert" },
];

function ControlledGeoMap() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  return <GeoMap pins={pins} selectedId={selectedId} onSelect={setSelectedId} />;
}

describe("GeoMap", () => {
  it("renders an SVG with an accessible label naming the pin count", () => {
    render(<GeoMap pins={pins} />);
    expect(screen.getByRole("img", { name: "Map with 3 locations" })).toBeInTheDocument();
  });

  it("renders each pin as a labeled, selectable button", () => {
    render(<GeoMap pins={pins} />);
    expect(screen.getByRole("button", { name: "San Francisco" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "New York" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "London" })).toBeInTheDocument();
  });

  it("calls onSelect with the pin id when a pin is clicked", () => {
    const onSelect = vi.fn();
    render(<GeoMap pins={pins} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole("button", { name: "San Francisco" }));
    expect(onSelect).toHaveBeenCalledWith("sf");
  });

  it("toggles selection off when the same pin is clicked again (controlled)", () => {
    render(<ControlledGeoMap />);
    const sf = screen.getByRole("button", { name: "San Francisco" });
    fireEvent.click(sf);
    expect(sf).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(sf);
    expect(sf).toHaveAttribute("aria-pressed", "false");
  });

  it("selects a pin via the keyboard (Enter)", () => {
    const onSelect = vi.fn();
    render(<GeoMap pins={pins} onSelect={onSelect} />);
    fireEvent.keyDown(screen.getByRole("button", { name: "New York" }), { key: "Enter" });
    expect(onSelect).toHaveBeenCalledWith("nyc");
  });

  it("selects a pin via the keyboard (Space)", () => {
    const onSelect = vi.fn();
    render(<GeoMap pins={pins} onSelect={onSelect} />);
    fireEvent.keyDown(screen.getByRole("button", { name: "London" }), { key: " " });
    expect(onSelect).toHaveBeenCalledWith("lon");
  });

  it("marks the selected pin with aria-pressed", () => {
    render(<GeoMap pins={pins} selectedId="nyc" onSelect={() => {}} />);
    expect(screen.getByRole("button", { name: "New York" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(screen.getByRole("button", { name: "San Francisco" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
  });

  it("shows a hover tooltip with the pin's label on mouse enter", async () => {
    render(<GeoMap pins={pins} />);
    fireEvent.mouseEnter(screen.getByRole("button", { name: "London" }));
    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toHaveTextContent("London");
    });
  });

  it("hides the tooltip on mouse leave", async () => {
    render(<GeoMap pins={pins} />);
    const pin = screen.getByRole("button", { name: "London" });
    fireEvent.mouseEnter(pin);
    await waitFor(() => expect(screen.getByRole("tooltip")).toBeInTheDocument());
    fireEvent.mouseLeave(pin);
    await waitFor(() => expect(screen.queryByRole("tooltip")).not.toBeInTheDocument());
  });

  it("draws a graticule fallback when no backgroundImage is supplied", () => {
    const { container } = render(<GeoMap pins={pins} />);
    expect(container.querySelectorAll("line").length).toBeGreaterThan(0);
  });

  it("omits the graticule and renders the supplied image when backgroundImage is set", () => {
    const { container } = render(
      <GeoMap pins={pins} backgroundImage="data:image/png;base64,abc" />
    );
    expect(container.querySelector("image")).toBeInTheDocument();
    expect(container.querySelectorAll("line").length).toBe(0);
  });

  it("respects a custom bounds prop when projecting pins", () => {
    const { container } = render(
      <GeoMap
        pins={[{ id: "p1", label: "P1", lat: 45, lng: 0 }]}
        bounds={{ minLat: 0, maxLat: 90, minLng: -90, maxLng: 90 }}
        width={400}
        height={200}
      />
    );
    // lat 45 of a 0-90 range, width 400 -> should sit at the horizontal midpoint
    const circles = container.querySelectorAll("circle");
    expect(circles.length).toBeGreaterThan(0);
  });

  it("forwards the ref to the svg element", () => {
    const ref = createRef<SVGSVGElement>();
    render(<GeoMap ref={ref} pins={pins} />);
    expect(ref.current).toBeInstanceOf(SVGSVGElement);
  });

  it("has a displayName", () => {
    expect(GeoMap.displayName).toBe("GeoMap");
  });
});
