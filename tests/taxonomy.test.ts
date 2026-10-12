import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { PAGE_ARCHETYPES, PAGE_TYPES } from "../src/registries/pageRegistry";
import { WORKSPACE_ARCHETYPES, WORKSPACE_TYPES } from "../src/registries/workspaceRegistry";
import { PAGE_GROUPS } from "../src/registries/pageGroups";
import { WORKSPACE_GROUPS } from "../src/registries/workspaceGroups";
import * as Pages from "../src/pages";
import * as Workspaces from "../src/workspaces";
import { TLPS_WORKSPACE_TYPES } from "../apps/tlps/src/registries/workspaceRegistry";
import canonicalIds from "../manifests/CANONICAL_IDS.json";
import { AI_SPACE_REGISTRY } from "../src/registries/aiSpaceRegistry";
import { COMPONENT_REGISTRY } from "../src/registries/componentRegistry";
import { GENERATOR_REGISTRY } from "../src/registries/generatorRegistry";
import { TLPS_AI_SPACE_COMPONENTS, TLPS_AI_SPACE_REGISTRY } from "../apps/tlps/src/registries/aiSpaceRegistry";
import * as TlpsAiSpaces from "../apps/tlps/src/ai-spaces";

type TaxonomyRecord = { id: string; name: string; groupKey: string; archetype: string; aliasOf?: string };

function checkTaxonomy(records: readonly TaxonomyRecord[], archetypes: readonly string[], components: Record<string, unknown>) {
  const byId = new Map(records.map((record) => [record.id, record]));
  for (const record of records) {
    expect(archetypes, record.id).toContain(record.archetype);
    expect(typeof components[record.archetype], `${record.id} -> ${record.archetype}`).toBe("function");
    if (!record.aliasOf) continue;
    const canonical = byId.get(record.aliasOf);
    expect(canonical, `${record.id} aliasOf`).toBeDefined();
    expect(canonical?.aliasOf, `${record.id} aliases an alias`).toBeUndefined();
    expect(canonical?.name).toBe(record.name);
    expect(canonical?.archetype).toBe(record.archetype);
  }
  const names = new Map<string, string>();
  for (const record of records.filter((item) => !item.aliasOf)) {
    expect(names.get(record.name), `duplicate display name ${record.name}`).toBeUndefined();
    names.set(record.name, record.id);
  }
  expect(new Set(records.map((record) => record.archetype))).toEqual(new Set(archetypes));
}

function checkGroups(records: readonly TaxonomyRecord[], groups: readonly { key: string; count: number }[], idsOf: (group: never) => readonly string[]) {
  expect(new Set(records.map((record) => record.groupKey))).toEqual(new Set(groups.map((group) => group.key)));
  for (const group of groups) {
    const members = records.filter((record) => record.groupKey === group.key).map((record) => record.id);
    expect(idsOf(group as never), group.key).toEqual(members);
    expect(group.count, group.key).toBe(members.length);
  }
}

describe("page and workspace taxonomy", () => {
  it("gives every page an existing page archetype and keeps display names distinct", () => {
    expect(PAGE_TYPES).toHaveLength(500);
    expect(PAGE_ARCHETYPES).toHaveLength(22);
    checkTaxonomy(PAGE_TYPES, PAGE_ARCHETYPES, Pages as Record<string, unknown>);
    checkGroups(PAGE_TYPES, PAGE_GROUPS, (group: { pageIds: readonly string[] }) => group.pageIds);
  });

  it("gives every workspace an existing workspace archetype and resolves aliases to one concept", () => {
    expect(WORKSPACE_TYPES).toHaveLength(616);
    expect(WORKSPACE_ARCHETYPES).toHaveLength(39);
    checkTaxonomy(WORKSPACE_TYPES, WORKSPACE_ARCHETYPES, Workspaces as Record<string, unknown>);
    checkGroups(WORKSPACE_TYPES, WORKSPACE_GROUPS, (group: { workspaceIds: readonly string[] }) => group.workspaceIds);
    expect(WORKSPACE_TYPES.filter((record) => "aliasOf" in record)).toHaveLength(12);
    expect(WORKSPACE_TYPES.map((record) => record.ordinal)).toEqual(WORKSPACE_TYPES.map((_, index) => index + 1));
  });

  it("keeps TLPS Production, Casting and Crew in the TLPS product, not in the package", () => {
    const productGroups = ["TLPS_PRODUCTION", "CASTING", "CREW"];
    expect(WORKSPACE_TYPES.some((record) => productGroups.includes(record.groupKey))).toBe(false);
    expect(fs.existsSync("src/workspace-groups/tlps_production.ts")).toBe(false);
    expect(TLPS_WORKSPACE_TYPES).toHaveLength(31);
    checkTaxonomy(TLPS_WORKSPACE_TYPES, ["ProductionWorkspace", "TeamWorkspace"], Workspaces as Record<string, unknown>);
    const moved = (canonicalIds as { moved: Record<string, string> }).moved;
    expect(Object.keys(moved).filter((id) => id.startsWith("WORKSPACE.")).sort()).toEqual(TLPS_WORKSPACE_TYPES.map((record) => record.id).sort());
  });

  it("keeps the TLPS AI spaces in the TLPS product and the generator group unbranded", () => {
    expect(AI_SPACE_REGISTRY).toHaveLength(105);
    expect(AI_SPACE_REGISTRY.some((space) => space.id.startsWith("AI_SPACE.TLPS_"))).toBe(false);
    expect(COMPONENT_REGISTRY.some((component) => /^TLPS.*AI$/.test(component.name))).toBe(false);
    expect(TLPS_AI_SPACE_REGISTRY).toHaveLength(7);
    for (const space of TLPS_AI_SPACE_REGISTRY) expect(typeof (TlpsAiSpaces as Record<string, unknown>)[space.component], space.id).toBe("function");
    const moved = (canonicalIds as { moved: Record<string, string> }).moved;
    expect(Object.keys(moved).filter((id) => id.startsWith("COMPONENT.")).sort()).toEqual(TLPS_AI_SPACE_COMPONENTS.map((record) => record.id).sort());
    expect(GENERATOR_REGISTRY.some((generator) => generator.groupLabels.some((label) => label.includes("TLPS")))).toBe(false);
  });
});
