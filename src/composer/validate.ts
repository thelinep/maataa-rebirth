import { inspectComposerScene } from "./sceneData";
import { COMPONENT_REGISTRY } from "../registries/componentRegistry";
import { REGION_REGISTRY } from "../registries/regionRegistry";
import { COMPOSER_COMPONENT_BINDINGS } from "./componentBindings.generated";
import { LAYOUT_TYPES } from "../registries/layoutRegistry";
import { PAGE_TYPES } from "../registries/pageRegistry";
import { WORKSPACE_TYPES } from "../registries/workspaceRegistry";
import { DEVICE_REGISTRY } from "../registries/deviceRegistry";
import type { ComposerScene, ComposerValidationIssue, ComposerValidationResult } from "./types";

export function validateComposerScene(scene: ComposerScene): ComposerValidationResult {
  const shape=inspectComposerScene(scene);
  if(!shape.validShape)return {valid:false,issues:shape.issues};
  const issues: ComposerValidationIssue[] = [];
  const has = (values: readonly {id:string}[], id: string) => values.some((item) => item.id === id);
  if (!has(WORKSPACE_TYPES, scene.workspaceTypeId)) issues.push({code:"UNKNOWN_WORKSPACE",level:"error",message:`Unknown workspace ${scene.workspaceTypeId}`});
  if (!has(PAGE_TYPES, scene.pageTypeId)) issues.push({code:"UNKNOWN_PAGE",level:"error",message:`Unknown page ${scene.pageTypeId}`});
  if (!has(LAYOUT_TYPES, scene.layoutTypeId)) issues.push({code:"UNKNOWN_LAYOUT",level:"error",message:`Unknown layout ${scene.layoutTypeId}`});
  if (!has(DEVICE_REGISTRY, scene.deviceId)) issues.push({code:"UNKNOWN_DEVICE",level:"error",message:`Unknown device ${scene.deviceId}`});
  const ids = new Set<string>();
  for (const block of scene.blocks) {
    if (ids.has(block.id)) issues.push({code:"DUPLICATE_BLOCK",level:"error",message:`Duplicate block id ${block.id}`,blockId:block.id});
    ids.add(block.id);
    if(block.componentId!==undefined&&(!has(COMPONENT_REGISTRY,block.componentId)||block.componentId!==COMPOSER_COMPONENT_BINDINGS[block.kind].componentId))issues.push({code:"COMPONENT_BINDING",level:"error",message:"Block component ID does not match its canonical renderer binding.",blockId:block.id});
    if (block.kind === "button" && !String(block.props.label ?? "").trim()) issues.push({code:"BUTTON_LABEL",level:"warning",message:"Button should have a visible label.",blockId:block.id});
    if (block.kind === "input" && !String(block.props.label ?? "").trim()) issues.push({code:"INPUT_NAME",level:"warning",message:"Input should have an accessible label.",blockId:block.id});
  }
  if(scene.regions){
    const assigned=new Set<string>(),regionIds=new Set<string>();
    for(const region of scene.regions){
      if(!has(REGION_REGISTRY,region.regionId))issues.push({code:"UNKNOWN_REGION",level:"error",message:`Unknown region ${region.regionId}`});
      if(regionIds.has(region.regionId))issues.push({code:"DUPLICATE_REGION",level:"error",message:`Duplicate region ${region.regionId}`});regionIds.add(region.regionId);
      for(const id of region.blockIds){if(!ids.has(id)||assigned.has(id))issues.push({code:"REGION_BLOCK_REFERENCE",level:"error",message:`Unknown or multiply assigned block ${id}`});assigned.add(id);}
    }
    if(scene.blocks.some(block=>!assigned.has(block.id)))issues.push({code:"UNASSIGNED_BLOCK",level:"error",message:"Every block must have exactly one region assignment."});
  }
  if (scene.blocks.length === 0) issues.push({code:"EMPTY_SCENE",level:"info",message:"Scene is empty."});
  return {valid: !issues.some((item) => item.level === "error"), issues};
}
