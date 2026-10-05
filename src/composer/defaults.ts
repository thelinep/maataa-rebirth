import { toCompositionSpec } from "./spec";
import { COMPOSER_COMPONENT_BINDINGS } from "./componentBindings.generated";
import type { ComposerBlock, ComposerBlockKind, ComposerScene } from "./types";

export const COMPOSER_BLOCK_DEFAULTS: Record<ComposerBlockKind, Record<string, unknown>> = {
  heading: { text: "MAATAA composition", level: 2 },
  text: { text: "Composable content rendered from @maataa/ui." },
  button: { label: "Primary action", variant: "primary" },
  input: { label: "Name", value: "MAATAA UI", placeholder: "Enter value" },
  card: { title: "Card surface", body: "A package-owned card block." },
  table: { title: "Records" },
  metric: { label: "Quality", value: "92%", helper: "demo" },
  badge: { label: "verified", tone: "success" },
  divider: {},
};

export function createComposerBlock(kind: ComposerBlockKind, id: string): ComposerBlock {
  return { id, kind, componentId:COMPOSER_COMPONENT_BINDINGS[kind].componentId, props: { ...COMPOSER_BLOCK_DEFAULTS[kind] } };
}

export const DEFAULT_COMPOSER_SCENE: ComposerScene = toCompositionSpec({
  id: "COMPOSER.DEMO.MAATAA_OPERATIONS",
  name: "MAATAA Operations Composer",
  workspaceTypeId: "WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_UI_STUDIO",
  pageTypeId: "PAGE.BUILDERS_AUTOMATION.PAGE_BUILDER",
  layoutTypeId: "LAYOUT.WORKSPACE.BUILDER",
  deviceId: "DEVICE.DESKTOP_COMPUTING.DESKTOP",
  theme: "dark",
  density: "default",
  stateMode: "default",
  blocks: [
    createComposerBlock("heading", "block-1"),
    createComposerBlock("metric", "block-2"),
    createComposerBlock("input", "block-3"),
    createComposerBlock("table", "block-4"),
    createComposerBlock("button", "block-5"),
  ],
  updatedAt: "2026-10-04T00:00:00.000Z",
});
