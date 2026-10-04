import { describe, expect, it } from "vitest";
import { PAGE_TYPES, WORKSPACE_TYPES, LAYOUT_TYPES, REGISTRY_REGISTRY, COMPONENT_REGISTRY, ATOMIC_COMPONENT_REGISTRY } from "../src/registries";
describe("registry integrity", () => {
  it("has the frozen catalog counts", () => { expect(PAGE_TYPES).toHaveLength(500); expect(LAYOUT_TYPES).toHaveLength(100); expect(REGISTRY_REGISTRY).toHaveLength(217); expect(WORKSPACE_TYPES.length).toBeGreaterThanOrEqual(600); });
  it("has unique canonical IDs", () => { for (const list of [PAGE_TYPES,WORKSPACE_TYPES,LAYOUT_TYPES,REGISTRY_REGISTRY,COMPONENT_REGISTRY,ATOMIC_COMPONENT_REGISTRY]) expect(new Set(list.map((item)=>item.id)).size).toBe(list.length); });
});
