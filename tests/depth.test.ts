import { describe,expect,it } from "vitest";
import { COMPONENT_PROP_SCHEMAS } from "../src/composer/propSchemas";
import { PAGE_TYPES } from "../src/registries/pageRegistry";
import { WORKSPACE_TYPES } from "../src/registries/workspaceRegistry";
import { LAYOUT_TYPES } from "../src/registries/layoutRegistry";
import { DEVICE_REGISTRY } from "../src/registries/deviceRegistry";
describe("alpha8 depth contracts",()=>{it("has curated prop schemas",()=>expect(Object.keys(COMPONENT_PROP_SCHEMAS).length).toBeGreaterThanOrEqual(7));it("keeps canonical composition catalogs",()=>{expect(PAGE_TYPES.length).toBe(500);expect(WORKSPACE_TYPES.length).toBeGreaterThanOrEqual(647);expect(LAYOUT_TYPES.length).toBe(100);expect(DEVICE_REGISTRY.length).toBe(187)})});
