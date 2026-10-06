import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { PAGE_TYPES } from "../../registries/pageRegistry";
import { WORKSPACE_TYPES } from "../../registries/workspaceRegistry";
import { LAYOUT_TYPES } from "../../registries/layoutRegistry";
import { DEVICE_REGISTRY } from "../../registries/deviceRegistry";
import { GENERATOR_REGISTRY } from "../../registries/generatorRegistry";
import { TOOL_REGISTRY } from "../../registries/toolRegistry";
import { AI_SPACE_REGISTRY } from "../../registries/aiSpaceRegistry";

type CatalogRecord = Readonly<{ id: string; name: string; [key: string]: unknown }>;
type CatalogGroupFields = "groupKey" | "group" | "groups" | "groupIds" | "groupLabels";

const selectQuery = (state: RootState) => state.registry.query.trim().toLowerCase();
const selectGroup = (state: RootState) => state.registry.group;
const selectLifecycle = (state: RootState) => state.registry.lifecycle;

function hasText(record: CatalogRecord, query: string): boolean {
  if (!query) return true;
  return `${record.name} ${record.id}`.toLowerCase().includes(query);
}

function hasGroup(record: CatalogRecord, group: string | null, groupFields: readonly CatalogGroupFields[]): boolean {
  if (!group) return true;
  return groupFields.some((field) => {
    const value = record[field];
    return Array.isArray(value) ? value.includes(group) : value === group;
  });
}

function hasLifecycle(record: CatalogRecord, lifecycle: string | null): boolean {
  return !lifecycle || record.lifecycle === lifecycle;
}

function createFilteredCatalog<T extends CatalogRecord>(records: readonly T[], groupFields: readonly CatalogGroupFields[]) {
  return createSelector([selectQuery, selectGroup, selectLifecycle], (query, group, lifecycle) =>
    records.filter((record) => hasText(record, query) && hasGroup(record, group, groupFields) && hasLifecycle(record, lifecycle)),
  );
}

/** Memoized selectors keep stable catalog references until a relevant filter changes. */
export const selectFilteredPages = createFilteredCatalog(PAGE_TYPES, ["groupKey"]);
export const selectFilteredWorkspaces = createFilteredCatalog(WORKSPACE_TYPES, ["groupKey"]);
export const selectFilteredLayouts = createFilteredCatalog(LAYOUT_TYPES, ["groupKey"]);
export const selectFilteredDevices = createFilteredCatalog(DEVICE_REGISTRY, ["group", "groups"]);
export const selectFilteredGenerators = createFilteredCatalog(GENERATOR_REGISTRY, ["groupIds", "groupLabels"]);
export const selectFilteredTools = createFilteredCatalog(TOOL_REGISTRY, ["groupIds", "groupLabels"]);
export const selectFilteredAISpaces = createFilteredCatalog(AI_SPACE_REGISTRY, ["groupIds", "groupLabels"]);
