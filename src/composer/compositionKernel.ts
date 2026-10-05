import type { ComposerScene } from "./types";
import { validateComposerScene } from "./validate";

import { COMPONENT_REGISTRY } from "../registries/componentRegistry";
import { LAYOUT_TYPES } from "../registries/layoutRegistry";
import { PAGE_TYPES } from "../registries/pageRegistry";
import { WORKSPACE_TYPES } from "../registries/workspaceRegistry";
import { DEVICE_REGISTRY } from "../registries/deviceRegistry";
import { REGION_REGISTRY } from "../registries/regionRegistry";
import {
  RESPONSIVE_TRANSFORMATION_REGISTRY,
} from "../registries/responsiveTransformationRegistry";

type IndexedRecord = Readonly<{
  id: string;
}>;

export type ComponentCompositionRecord =
  (typeof COMPONENT_REGISTRY)[number];

export type LayoutCompositionRecord =
  (typeof LAYOUT_TYPES)[number];

export type PageCompositionRecord =
  (typeof PAGE_TYPES)[number];

export type WorkspaceCompositionRecord =
  (typeof WORKSPACE_TYPES)[number];

export type DeviceCompositionRecord =
  (typeof DEVICE_REGISTRY)[number];

export type RegionCompositionRecord =
  (typeof REGION_REGISTRY)[number];

export type ResponsiveCompositionRecord =
  (typeof RESPONSIVE_TRANSFORMATION_REGISTRY)[number];

function indexById<T extends IndexedRecord>(
  rows: readonly T[],
): ReadonlyMap<string, T> {
  return new Map(
    rows.map((row) => [row.id, row] as const),
  );
}

const COMPONENTS_BY_ID =
  indexById(COMPONENT_REGISTRY);

const LAYOUTS_BY_ID =
  indexById(LAYOUT_TYPES);

const PAGES_BY_ID =
  indexById(PAGE_TYPES);

const WORKSPACES_BY_ID =
  indexById(WORKSPACE_TYPES);

const DEVICES_BY_ID =
  indexById(DEVICE_REGISTRY);

const REGIONS_BY_ID =
  indexById(REGION_REGISTRY);

export type CompositionReferenceIssueCode =
  | "UNKNOWN_WORKSPACE"
  | "UNKNOWN_PAGE"
  | "UNKNOWN_LAYOUT"
  | "UNKNOWN_DEVICE"
  | "UNKNOWN_REGION"
  | "UNKNOWN_COMPONENT"
  | "DUPLICATE_REGION"
  | "DUPLICATE_COMPONENT";

export interface CompositionReferenceIssue {
  severity: "error" | "warning";
  code: CompositionReferenceIssueCode;
  path: string;
  id: string;
  message: string;
}

export interface CompositionReferences {
  workspaceTypeId: string;
  pageTypeId: string;
  layoutTypeId: string;
}

export interface CompositionContext {
  deviceId?: string;
  regionIds?: readonly string[];
  componentIds?: readonly string[];
  responsiveCondition?: string;
}

export interface CompositionResolution {
  workspace?: WorkspaceCompositionRecord;
  page?: PageCompositionRecord;
  layout?: LayoutCompositionRecord;
  device?: DeviceCompositionRecord;
  regions: readonly RegionCompositionRecord[];
  components: readonly ComponentCompositionRecord[];
  transformations: readonly ResponsiveCompositionRecord[];
}

export interface CompositionReferenceValidation {
  valid: boolean;
  errors: readonly CompositionReferenceIssue[];
  warnings: readonly CompositionReferenceIssue[];
  resolution: CompositionResolution;
}

export interface CompositionKernelValidation
  extends CompositionReferenceValidation {
  sceneValidation: ReturnType<
    typeof validateComposerScene
  >;
}

function duplicateValues(
  values: readonly string[],
): readonly string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
    }
    seen.add(value);
  }

  return [...duplicates];
}

function resolveRequired<T extends IndexedRecord>(
  id: string,
  index: ReadonlyMap<string, T>,
  code: CompositionReferenceIssueCode,
  path: string,
  label: string,
  errors: CompositionReferenceIssue[],
): T | undefined {
  const value = index.get(id);

  if (!value) {
    errors.push({
      severity: "error",
      code,
      path,
      id,
      message:
        `${label} "${id}" is not present in its canonical registry.`,
    });
  }

  return value;
}

function resolveOptional<T extends IndexedRecord>(
  id: string | undefined,
  index: ReadonlyMap<string, T>,
  code: CompositionReferenceIssueCode,
  path: string,
  label: string,
  errors: CompositionReferenceIssue[],
): T | undefined {
  if (!id) return undefined;

  return resolveRequired(
    id,
    index,
    code,
    path,
    label,
    errors,
  );
}

function resolveMany<T extends IndexedRecord>(
  ids: readonly string[],
  index: ReadonlyMap<string, T>,
  code: CompositionReferenceIssueCode,
  path: string,
  label: string,
  errors: CompositionReferenceIssue[],
): readonly T[] {
  const resolved: T[] = [];

  ids.forEach((id, indexPosition) => {
    const value = resolveRequired(
      id,
      index,
      code,
      `${path}[${indexPosition}]`,
      label,
      errors,
    );

    if (value) resolved.push(value);
  });

  return resolved;
}

export function selectResponsiveTransformations(
  condition?: string,
): readonly ResponsiveCompositionRecord[] {
  if (!condition) return [];

  return RESPONSIVE_TRANSFORMATION_REGISTRY.filter(
    (item) => item.condition === condition,
  );
}

export function validateCompositionReferences(
  references: CompositionReferences,
  context: CompositionContext = {},
): CompositionReferenceValidation {
  const errors: CompositionReferenceIssue[] = [];
  const warnings: CompositionReferenceIssue[] = [];

  const regionIds =
    context.regionIds ?? [];

  const componentIds =
    context.componentIds ?? [];

  for (const id of duplicateValues(regionIds)) {
    warnings.push({
      severity: "warning",
      code: "DUPLICATE_REGION",
      path: "context.regionIds",
      id,
      message:
        `Region "${id}" appears more than once in the composition context.`,
    });
  }

  for (const id of duplicateValues(componentIds)) {
    warnings.push({
      severity: "warning",
      code: "DUPLICATE_COMPONENT",
      path: "context.componentIds",
      id,
      message:
        `Component "${id}" appears more than once in the composition context.`,
    });
  }

  const workspace = resolveRequired(
    references.workspaceTypeId,
    WORKSPACES_BY_ID,
    "UNKNOWN_WORKSPACE",
    "workspaceTypeId",
    "Workspace",
    errors,
  );

  const page = resolveRequired(
    references.pageTypeId,
    PAGES_BY_ID,
    "UNKNOWN_PAGE",
    "pageTypeId",
    "Page",
    errors,
  );

  const layout = resolveRequired(
    references.layoutTypeId,
    LAYOUTS_BY_ID,
    "UNKNOWN_LAYOUT",
    "layoutTypeId",
    "Layout",
    errors,
  );

  const device = resolveOptional(
    context.deviceId,
    DEVICES_BY_ID,
    "UNKNOWN_DEVICE",
    "context.deviceId",
    "Device",
    errors,
  );

  const regions = resolveMany(
    regionIds,
    REGIONS_BY_ID,
    "UNKNOWN_REGION",
    "context.regionIds",
    "Region",
    errors,
  );

  const components = resolveMany(
    componentIds,
    COMPONENTS_BY_ID,
    "UNKNOWN_COMPONENT",
    "context.componentIds",
    "Component",
    errors,
  );

  const transformations =
    selectResponsiveTransformations(
      context.responsiveCondition,
    );

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    resolution: {
      workspace,
      page,
      layout,
      device,
      regions,
      components,
      transformations,
    },
  };
}

export function validateCompositionKernel(
  scene: ComposerScene,
  context: CompositionContext = {},
): CompositionKernelValidation {
  const references =
    validateCompositionReferences(
      {
        workspaceTypeId:
          scene.workspaceTypeId,
        pageTypeId:
          scene.pageTypeId,
        layoutTypeId:
          scene.layoutTypeId,
      },
      context,
    );

  const sceneValidation =
    validateComposerScene(scene);

  return {
    ...references,
    valid:
      references.valid &&
      sceneValidation.valid,
    sceneValidation,
  };
}

export const COMPOSITION_CATALOG = {
  components: COMPONENTS_BY_ID,
  layouts: LAYOUTS_BY_ID,
  pages: PAGES_BY_ID,
  workspaces: WORKSPACES_BY_ID,
  devices: DEVICES_BY_ID,
  regions: REGIONS_BY_ID,
} as const;

export const COMPOSITION_CATALOG_COUNTS = {
  components: COMPONENT_REGISTRY.length,
  layouts: LAYOUT_TYPES.length,
  pages: PAGE_TYPES.length,
  workspaces: WORKSPACE_TYPES.length,
  devices: DEVICE_REGISTRY.length,
  regions: REGION_REGISTRY.length,
  responsiveTransformations:
    RESPONSIVE_TRANSFORMATION_REGISTRY.length,
} as const;
