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
}

export interface ComposerScene {
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
