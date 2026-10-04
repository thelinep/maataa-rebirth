import { describe, expect, it } from "vitest";
import { DEVICE_REGISTRY, VIEWPORT_REGISTRY, INPUT_MODALITY_REGISTRY, ORIENTATION_REGISTRY, DEVICE_CAPABILITY_REGISTRY, SAFE_AREA_REGISTRY, RESPONSIVE_TRANSFORMATION_REGISTRY } from "../src/registries";
describe("device registry integrity", () => {
  it("keeps canonical device ids unique", () => expect(new Set(DEVICE_REGISTRY.map((x)=>x.id)).size).toBe(DEVICE_REGISTRY.length));
  it("keeps supporting registry ids unique", () => { for (const list of [VIEWPORT_REGISTRY,INPUT_MODALITY_REGISTRY,ORIENTATION_REGISTRY,DEVICE_CAPABILITY_REGISTRY,SAFE_AREA_REGISTRY,RESPONSIVE_TRANSFORMATION_REGISTRY]) expect(new Set(list.map((x)=>x.id)).size).toBe(list.length); });
  it("binds every device to declared supporting ids", () => {
    const viewports=new Set(VIEWPORT_REGISTRY.map((x)=>x.id)); const inputs=new Set(INPUT_MODALITY_REGISTRY.map((x)=>x.id)); const caps=new Set(DEVICE_CAPABILITY_REGISTRY.map((x)=>x.id)); const safe=new Set(SAFE_AREA_REGISTRY.map((x)=>x.id));
    for (const d of DEVICE_REGISTRY) { expect(viewports.has(d.defaultViewport)).toBe(true); expect(safe.has(d.safeArea)).toBe(true); for (const i of d.inputModalities) expect(inputs.has(i)).toBe(true); for (const c of d.capabilities) expect(caps.has(c)).toBe(true); }
  });
});
