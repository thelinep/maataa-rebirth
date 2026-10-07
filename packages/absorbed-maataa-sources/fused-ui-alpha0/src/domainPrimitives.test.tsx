import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  CanvasSurface,
  createGeometry3D,
  createModel3D,
  Scale,
  Scene3D,
} from "@tlps/domain-primitives";
import { describe, expect, it, vi } from "vitest";

describe("TLPS domain surfaces", () => {
  it("adds and edits objects on the general canvas", () => {
    render(<CanvasSurface />);
    fireEvent.click(screen.getByRole("button", { name: "Add shape" }));
    const name = screen.getByLabelText("Object name");
    expect(name).toHaveValue("Shape 1");
    fireEvent.change(name, { target: { value: "Main stage" } });
    expect(screen.getByRole("button", { name: "Main stage, rectangle" })).toBeInTheDocument();
  });

  it("creates geometry buffers and clamps zero-sized transforms", () => {
    expect(createGeometry3D("box").vertexCount).toBe(36);
    expect(createGeometry3D("sphere").vertexCount).toBeGreaterThan(1000);
    const model = createModel3D({ id: "test-model" });
    expect(Scale(model, [0, 2, 1]).scale).toEqual([0.05, 2, 1]);
  });

  it("explains a missing WebGL context and still presents scene controls", async () => {
    const getContext = vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
    render(<Scene3D />);
    expect(await screen.findByText("3D preview unavailable")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add cube" })).toBeInTheDocument();
    getContext.mockRestore();
  });
});
