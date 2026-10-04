import { LAYOUT_TYPES } from "../registries/layoutRegistry";
import { PAGE_TYPES } from "../registries/pageRegistry";
import { WORKSPACE_TYPES } from "../registries/workspaceRegistry";
import { DEVICE_REGISTRY } from "../registries/deviceRegistry";
import type { ComposerScene, ComposerValidationIssue, ComposerValidationResult } from "./types";

export function validateComposerScene(scene: ComposerScene): ComposerValidationResult {
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
    if (block.kind === "button" && !String(block.props.label ?? "").trim()) issues.push({code:"BUTTON_LABEL",level:"warning",message:"Button should have a visible label.",blockId:block.id});
    if (block.kind === "input" && !String(block.props.label ?? "").trim()) issues.push({code:"INPUT_NAME",level:"warning",message:"Input should have an accessible label.",blockId:block.id});
  }
  if (scene.blocks.length === 0) issues.push({code:"EMPTY_SCENE",level:"info",message:"Scene is empty."});
  return {valid: !issues.some((item) => item.level === "error"), issues};
}
