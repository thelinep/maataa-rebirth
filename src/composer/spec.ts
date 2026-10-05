import type { ComposerScene,CompositionSpecV1 } from "./types";
import { COMPOSER_COMPONENT_BINDINGS } from "./componentBindings.generated";
import { LAYOUT_RUNTIME_CONTRACTS } from "../registries/layoutExecutionMetadata.generated";
import { REGION_REGISTRY } from "../registries/regionRegistry";
import { inspectComposerScene } from "./sceneData";
import { validateCompositionKernel } from "./compositionKernel";

/** Legacy scenes are migrated explicitly, preserving their canonical identities. */
export function toCompositionSpec(scene:ComposerScene):CompositionSpecV1 {
 const shape=inspectComposerScene(scene);if(!shape.validShape)throw new Error(shape.issues[0].message);
 const slot=LAYOUT_RUNTIME_CONTRACTS[scene.layoutTypeId]?.primarySlot??"main";
 const region=REGION_REGISTRY.find(record=>record.name===`Layout${slot[0].toUpperCase()}${slot.slice(1)}`);
 if(!region)throw new Error("No canonical content region for layout");
 return {...scene,schemaVersion:"1",blocks:scene.blocks.map(block=>({...block,componentId:block.componentId??COMPOSER_COMPONENT_BINDINGS[block.kind].componentId})),
  regions:scene.regions??[{regionId:region.id,blockIds:scene.blocks.map(block=>block.id)}]};
}
export function validateCompositionSpec(input:unknown){
 const shape=inspectComposerScene(input);
 if(!shape.validShape)return {accepted:false as const,errors:shape.issues.map(issue=>issue.message)};
 const scene=input as ComposerScene;
 if(scene.schemaVersion!=="1"||!scene.regions||scene.blocks.some(block=>typeof block.componentId!=="string"))return {accepted:false as const,errors:["CompositionSpec v1 requires schemaVersion, canonical component IDs and region assignments."]};
 const spec=scene as CompositionSpecV1;
 const validation=validateCompositionKernel(spec,{regionIds:spec.regions.map(region=>region.regionId),componentIds:[...new Set(spec.blocks.map(block=>block.componentId))]});
 if(!validation.valid)return {accepted:false as const,errors:[...validation.errors.map(issue=>issue.message),...validation.sceneValidation.issues.filter(issue=>issue.level==="error").map(issue=>issue.message)],validation};
 return {accepted:true as const,spec,validation,errors:[]};
}
export function acceptCompositionProposal(input:unknown){
 const result=validateCompositionSpec(input);
 return {...result,explanation:!result.accepted?"Proposal rejected before rendering: "+result.errors.join(" "):
  result.validation.compatibility.status==="verified"?"Canonical tuple has recorded compatibility evidence; capability and placement qualification remain separate.":"Canonical tuple is selectable, but no verified compatibility record exists. Review the unverified composition."};
}
export function parseCompositionInput(text:string){
 if(text.length>1_000_000)throw new Error("Composition input exceeds the 1 MB limit.");
 const input:unknown=JSON.parse(text);const shape=inspectComposerScene(input);
 if(!shape.validShape)throw new Error(shape.issues[0].message);
 const spec=toCompositionSpec(input as ComposerScene),result=validateCompositionSpec(spec);
 if(!result.accepted)throw new Error(result.errors.join(" "));
 return result.spec;
}

/** Explicit editor bookkeeping: preserve placements, remove deleted IDs, place newly added blocks. */
export function updateCompositionSpec(scene:ComposerScene):ComposerScene {
 if(!inspectComposerScene(scene).validShape)return scene;
 const ids=new Set(scene.blocks.map(block=>block.id));
 const regions=scene.regions?.map(region=>({...region,blockIds:region.blockIds.filter(id=>ids.has(id))}));
 if(!regions)return toCompositionSpec(scene);
 const assigned=new Set(regions.flatMap(region=>region.blockIds));
 const additions=scene.blocks.filter(block=>!assigned.has(block.id)).map(block=>block.id);
 if(additions.length){const fallback=toCompositionSpec(Object.fromEntries(Object.entries(scene).filter(([key])=>key!=="regions")) as unknown as ComposerScene).regions[0];
  const target=regions.find(region=>region.regionId===fallback.regionId);if(target)target.blockIds.push(...additions);else regions.push({...fallback,blockIds:additions});}
 return toCompositionSpec({...scene,regions});
}
