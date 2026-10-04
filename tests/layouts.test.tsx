import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HolyGrailLayout } from "../src/layouts/HolyGrailLayout";
import { WorkbenchLayout } from "../src/layouts/WorkbenchLayout";

describe("layout archetypes", () => {
  it("renders Holy Grail regions without owning application behavior", () => {
    const { container } = render(<HolyGrailLayout header="Header" sidebar="Left" main="Main" rail="Right" footer="Footer" />);
    expect(container.querySelector('[data-layout-name="HolyGrail"]')).toBeTruthy();
    expect(screen.getByText("Main")).toBeTruthy();
  });
  it("renders atomic Workbench regions", () => {
    const { container } = render(<WorkbenchLayout toolbar="Tools" palette="Palette" canvas="Canvas" inspector="Inspector" />);
    expect(container.querySelector('[data-layout-region="canvas"]')).toBeTruthy();
    expect(container.querySelector('[data-layout-region="inspector"]')).toBeTruthy();
  });
});
