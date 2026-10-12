import { describe, expect, it } from "vitest";
import { DEVICE_REGISTRY } from "../src/registries/deviceRegistry";
import { GENERATOR_REGISTRY } from "../src/registries/generatorRegistry";
import { TOOL_REGISTRY } from "../src/registries/toolRegistry";
import { AI_SPACE_REGISTRY } from "../src/registries/aiSpaceRegistry";
import {
  createAISpaceDataSlice,
  createDeviceDataSlice,
  createGeneratorDataSlice,
  createToolDataSlice,
} from "../examples/redux-demo/catalogDataSlices";

describe("catalog family data slices", () => {
  it("maps every device to registry-bound viewport, capability, and sample-surface data", () => {
    const slices = DEVICE_REGISTRY.map(createDeviceDataSlice);
    expect(slices).toHaveLength(187);
    expect(new Set(slices.map((slice) => slice.reference)).size).toBe(187);
    expect(new Set(slices.map((slice) => slice.recordId)).size).toBe(187);
    for (const [index, slice] of slices.entries()) {
      const source = DEVICE_REGISTRY[index]!;
      expect(slice.recordId).toBe(source.id);
      expect(slice.reference).toBe(`DV-${String(index + 1).padStart(3, "0")}`);
      expect(slice.family).toBe(source.group);
      expect(slice.inputModalities).toEqual(source.inputModalities);
      expect(slice.capabilities).toEqual(source.capabilities);
      expect(slice.regions).toHaveLength(3);
      expect(slice.provenance).toBe("Synthetic device fixture");
      expect(slice.boundary).toContain("not qualified");
    }
  });

  it("maps all generators and every generator group to a unique local outline", () => {
    const slices = GENERATOR_REGISTRY.map((record) => createGeneratorDataSlice(record.id));
    expect(slices).toHaveLength(208);
    expect(new Set(slices.map((slice) => slice.reference)).size).toBe(208);
    for (const record of GENERATOR_REGISTRY) {
      const slice = createGeneratorDataSlice(record.id);
      expect(slice.recordId).toBe(record.id);
      expect(slice.familyGroups).toEqual(record.groupLabels);
      expect(slice.title).toContain(record.name);
      expect(slice.boundary).toContain("No file is generated");
    }
    const covered = new Set(slices.flatMap((slice) => slice.familyGroups));
    expect(covered).toEqual(new Set(GENERATOR_REGISTRY.flatMap((record) => record.groupLabels)));
  });

  it("maps all tools to record-bound input and output fixtures that cannot execute", () => {
    const slices = TOOL_REGISTRY.map((record) => createToolDataSlice(record.id));
    expect(slices).toHaveLength(491);
    expect(new Set(slices.map((slice) => slice.reference)).size).toBe(491);
    for (const record of TOOL_REGISTRY) {
      const slice = createToolDataSlice(record.id);
      expect(slice.recordId).toBe(record.id);
      expect(slice.familyGroups).toEqual(record.groupLabels);
      expect(slice.input).toContain(record.id);
      expect(JSON.parse(slice.input)).toMatchObject({ requestSent: false, mode: "illustrative" });
      expect(JSON.parse(slice.output)).toMatchObject({ toolExecuted: false, sideEffects: false });
      expect(slice.boundary).toContain("no side effects");
    }
    const covered = new Set(slices.flatMap((slice) => slice.familyGroups));
    expect(covered).toEqual(new Set(TOOL_REGISTRY.flatMap((record) => record.groupLabels)));
  });

  it("maps all AI spaces to synthetic sessions and explicit no-model boundaries", () => {
    const slices = AI_SPACE_REGISTRY.map((record) => createAISpaceDataSlice(record.id));
    expect(slices).toHaveLength(105);
    expect(new Set(slices.map((slice) => slice.reference)).size).toBe(105);
    for (const record of AI_SPACE_REGISTRY) {
      const slice = createAISpaceDataSlice(record.id);
      expect(slice.recordId).toBe(record.id);
      expect(slice.familyGroups).toEqual(record.groupLabels);
      expect(slice.title).toContain(record.name);
      expect(slice.output).toContain(record.name);
      expect(slice.boundary).toContain("No model was called");
    }
    const covered = new Set(slices.flatMap((slice) => slice.familyGroups));
    expect(covered).toEqual(new Set(AI_SPACE_REGISTRY.flatMap((record) => record.groupLabels)));
  });

  it("fails closed for unknown generator, tool, and AI-space IDs", () => {
    expect(() => createDeviceDataSlice({ ...DEVICE_REGISTRY[0]!, id: "DEVICE.UNKNOWN" })).toThrow("No device data slice is registered");
    expect(() => createGeneratorDataSlice("GENERATOR.UNKNOWN")).toThrow("No generator data slice is registered");
    expect(() => createToolDataSlice("TOOL.UNKNOWN")).toThrow("No tool data slice is registered");
    expect(() => createAISpaceDataSlice("AI_SPACE.UNKNOWN")).toThrow("No AI-space data slice is registered");
  });
});
