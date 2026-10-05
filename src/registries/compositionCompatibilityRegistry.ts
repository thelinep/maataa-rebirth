export type CompositionCompatibilityEvidence =
  Readonly<{
    kind:
      | "composer-default"
      | "demo-scenario"
      | "declared";
    reference: string;
  }>;

export type CompositionCompatibilityRecord =
  Readonly<{
    id: string;
    workspaceTypeId: string;
    pageTypeId: string;
    layoutTypeId: string;
    deviceIds: readonly string[];
    evidence:
      readonly CompositionCompatibilityEvidence[];
  }>;

export const COMPOSITION_COMPATIBILITY_REGISTRY:
  readonly CompositionCompatibilityRecord[] = [
  {
    id:
      "COMPOSITION.EVIDENCE.COMPOSER_DEFAULT",
    workspaceTypeId:
      "WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_UI_STUDIO",
    pageTypeId:
      "PAGE.BUILDERS_AUTOMATION.PAGE_BUILDER",
    layoutTypeId:
      "LAYOUT.WORKSPACE.BUILDER",
    deviceIds: [
      "DEVICE.DESKTOP_COMPUTING.DESKTOP",
    ],
    evidence: [
      {
        kind: "composer-default",
        reference:
          "src/composer/defaults.ts#DEFAULT_COMPOSER_SCENE",
      },
    ],
  },

  {
    id:
      "COMPOSITION.EVIDENCE.DEMO_UI",
    workspaceTypeId:
      "WORKSPACE.UI_DESIGN_SYSTEM.DESIGN_SYSTEM",
    pageTypeId:
      "PAGE.DESIGN_SYSTEM.DESIGN_SYSTEM",
    layoutTypeId:
      "LAYOUT.WORKSPACE.WORKBENCH",
    deviceIds: [
      "DEVICE.DESKTOP_COMPUTING.DESKTOP",
    ],
    evidence: [
      {
        kind: "demo-scenario",
        reference:
          "src/demo/scenarios.ts#scenario-ui",
      },
    ],
  },

  {
    id:
      "COMPOSITION.EVIDENCE.DEMO_NEVO",
    workspaceTypeId:
      "WORKSPACE.EVENT.EVENT_COMMAND_CENTER",
    pageTypeId:
      "PAGE.EVENTS.EVENT_DASHBOARD",
    layoutTypeId:
      "LAYOUT.OPERATIONAL.COMMANDCENTER",
    deviceIds: [
      "DEVICE.DESKTOP_DISPLAYS.ULTRAWIDE",
    ],
    evidence: [
      {
        kind: "demo-scenario",
        reference:
          "src/demo/scenarios.ts#scenario-nevo",
      },
    ],
  },

  {
    id:
      "COMPOSITION.EVIDENCE.DEMO_SPATIAL",
    workspaceTypeId:
      "WORKSPACE.EVENT.EVENT_SPATIAL",
    pageTypeId:
      "PAGE.EVENTS.EVENT_SPATIAL",
    layoutTypeId:
      "LAYOUT.CANVAS_SPATIAL.SPATIALCAD",
    deviceIds: [
      "DEVICE.TABLETS.PRO_TABLET",
    ],
    evidence: [
      {
        kind: "demo-scenario",
        reference:
          "src/demo/scenarios.ts#scenario-spatial",
      },
    ],
  },

  {
    id:
      "COMPOSITION.EVIDENCE.DEMO_TLPS",
    workspaceTypeId:
      "WORKSPACE.TLPS_PRODUCTION.PRODUCTION_COMMAND_CENTER",
    pageTypeId:
      "PAGE.PRODUCTION_LOGISTICS.PRODUCTION_DASHBOARD",
    layoutTypeId:
      "LAYOUT.WORKSPACE.STUDIO",
    deviceIds: [
      "DEVICE.PORTABLE_COMPUTING.LAPTOP",
    ],
    evidence: [
      {
        kind: "demo-scenario",
        reference:
          "src/demo/scenarios.ts#scenario-tlps",
      },
    ],
  },

  {
    id:
      "COMPOSITION.EVIDENCE.DEMO_AI",
    workspaceTypeId:
      "WORKSPACE.AI.AI_EVALUATION",
    pageTypeId:
      "PAGE.AI_KNOWLEDGE.AI_EVALUATION",
    layoutTypeId:
      "LAYOUT.OPERATIONAL.COMMANDCENTER",
    deviceIds: [
      "DEVICE.DESKTOP_COMPUTING.WORKSTATION",
    ],
    evidence: [
      {
        kind: "demo-scenario",
        reference:
          "src/demo/scenarios.ts#scenario-ai",
      },
    ],
  },

  {
    id:
      "COMPOSITION.EVIDENCE.DEMO_MOBILE",
    workspaceTypeId:
      "WORKSPACE.MOBILE.MOBILE_PREVIEW",
    pageTypeId:
      "PAGE.PRESENTATION_MODES.PREVIEW",
    layoutTypeId:
      "LAYOUT.RESPONSIVE_MOBILE.MOBILESTACK",
    deviceIds: [
      "DEVICE.PHONES.SMARTPHONE",
    ],
    evidence: [
      {
        kind: "demo-scenario",
        reference:
          "src/demo/scenarios.ts#scenario-mobile",
      },
    ],
  },

  {
    id:
      "COMPOSITION.EVIDENCE.DEMO_CONTROL",
    workspaceTypeId:
      "WORKSPACE.CONTROL_PLANE.MAATAA_CONTROL_PLANE",
    pageTypeId:
      "PAGE.CONTROL_PLANE.CONTROL_PLANE",
    layoutTypeId:
      "LAYOUT.DATA_ANALYTICS.ANALYTICS",
    deviceIds: [
      "DEVICE.DESKTOP_COMPUTING.DESKTOP",
    ],
    evidence: [
      {
        kind: "demo-scenario",
        reference:
          "src/demo/scenarios.ts#scenario-control",
      },
    ],
  },
];
