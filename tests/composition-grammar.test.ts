import {describe,expect,it} from "vitest";
import { COMPOSITION_RELATIONSHIPS,evaluateCompositionRelationship } from "../src/composer/grammar";
import { DEFAULT_COMPOSER_SCENE } from "../src/composer/defaults";
import { COMPOSER_COMPONENT_BINDINGS } from "../src/composer/componentBindings.generated";
import { COMPONENT_REGISTRY } from "../src/registries/componentRegistry";
describe("composition grammar provenance",()=>{
 it("keeps every declared relationship canonical and source-grounded",()=>{
  for(const edge of COMPOSITION_RELATIONSHIPS){const result=evaluateCompositionRelationship(edge.subjectId,edge.relationship,edge.objectId);expect(result.identitiesValid).toBe(true);expect(result.evidence.length).toBeGreaterThan(0);expect(result.status).toBe("declared");}
 });
 it("distinguishes absent evidence from invented identities",()=>{
  expect(evaluateCompositionRelationship(DEFAULT_COMPOSER_SCENE.workspaceTypeId,"supports-page",DEFAULT_COMPOSER_SCENE.pageTypeId).status).toBe("declared");
  const missing=evaluateCompositionRelationship(DEFAULT_COMPOSER_SCENE.workspaceTypeId,"supports-page","PAGE.EVENTS.EVENT_DASHBOARD");expect(missing.identitiesValid).toBe(true);expect(missing.status).toBe("unverified");
  expect(evaluateCompositionRelationship("INVENTED","supports-page",DEFAULT_COMPOSER_SCENE.pageTypeId).identitiesValid).toBe(false);
 });
 it("resolves composer implementation bindings without confusing same-name tools",()=>{
  for(const binding of Object.values(COMPOSER_COMPONENT_BINDINGS))expect(COMPONENT_REGISTRY.find(record=>record.id===binding.componentId)?.importPath).toBe(binding.path);
  expect(COMPOSER_COMPONENT_BINDINGS.table.componentId).toBe("COMPONENT.DATA.DATATABLE");
 });
});
