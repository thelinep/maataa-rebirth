import { COMPOSITION_CATALOG } from "./compositionKernel";
import { COMPOSER_COMPONENT_BINDINGS } from "./componentBindings.generated";
import { COMPOSITION_COMPATIBILITY_REGISTRY } from "../registries/compositionCompatibilityRegistry";
import { acceptCompositionProposal } from "./spec";
export function getCompositionPlanningVocabulary(){
 return {schemaVersion:"1" as const,workspaces:[...COMPOSITION_CATALOG.workspaces.values()],pages:[...COMPOSITION_CATALOG.pages.values()],layouts:[...COMPOSITION_CATALOG.layouts.values()],devices:[...COMPOSITION_CATALOG.devices.values()],regions:[...COMPOSITION_CATALOG.regions.values()],
  renderableComponents:Object.entries(COMPOSER_COMPONENT_BINDINGS).map(([kind,binding])=>({kind,...binding})),
  compatibilityEvidence:COMPOSITION_COMPATIBILITY_REGISTRY,
  rules:["Return CompositionSpec v1 JSON data, never JSX.","Select only canonical IDs from supplied vocabulary.","Unrecorded combinations remain unverified, not forbidden.","Use implemented block bindings; execution, data and authorization remain host-owned."],
 };
}
export type CanonicalCompositionPlanner=(request:{intent:string;vocabulary:ReturnType<typeof getCompositionPlanningVocabulary>})=>Promise<unknown>;
/** Host-supplied model/heuristic adapter; proposals must pass the same visual/runtime validator. */
export async function planCanonicalComposition(intent:string,planner:CanonicalCompositionPlanner){
 if(!intent.trim()||intent.length>100_000)throw new Error("Planning intent must be non-empty and within the composition text limit.");
 const proposal=await planner({intent,vocabulary:getCompositionPlanningVocabulary()});
 return acceptCompositionProposal(proposal);
}
