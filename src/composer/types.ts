import type { Density, ThemeMode } from "../types/common";
import type { DeviceTypeId, LayoutTypeId, PageTypeId, WorkspaceTypeId } from "../types/identifiers";

export type ComposerBlockKind = "heading" | "text" | "button" | "input" | "card" | "table" | "metric" | "badge" | "divider";
export type ComposerStateMode = "default" | "loading" | "empty" | "error" | "disabled" | "offline" | "success";

export interface ComposerBlock {
  id: string;
  kind: ComposerBlockKind;
  props: Record<string, unknown>;
  hidden?: boolean;
  locked?: boolean;
  componentId?: string;
}

export interface CompositionRegionAssignment {regionId:string;blockIds:string[];}

export interface ComposerScene {
  schemaVersion?: "1";
  regions?: CompositionRegionAssignment[];
  id: string;
  name: string;
  workspaceTypeId: WorkspaceTypeId;
  pageTypeId: PageTypeId;
  layoutTypeId: LayoutTypeId;
  deviceId: DeviceTypeId;
  theme: ThemeMode | "high-contrast" | "oled";
  density: Density;
  stateMode: ComposerStateMode;
  blocks: ComposerBlock[];
  updatedAt: string;
}

export interface ComposerValidationIssue {
  code: string;
  level: "error" | "warning" | "info";
  message: string;
  blockId?: string;
}

export interface ComposerValidationResult {
  valid: boolean;
  issues: ComposerValidationIssue[];
}

/** Version 1 is the existing scene contract enriched with canonical component/region references. */
export interface CompositionSpecV1 extends ComposerScene {
  schemaVersion:"1";
  regions:CompositionRegionAssignment[];
  blocks:(ComposerBlock&{componentId:string})[];
}
