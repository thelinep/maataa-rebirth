// TLPS product AI spaces. Moved out of @maataa/ui on 2026-10-12 (release owner decision, chat statement,
// not a signed record). IDs are unchanged; manifests/CANONICAL_IDS.json records the component IDs under `moved`.
export const TLPS_AI_SPACE_REGISTRY = [
  {
    "id": "AI_SPACE.TLPS_BUDGET_AI",
    "name": "TLPS Budget AI",
    "groupIds": [
      "S05_PRODUCT_AI"
    ],
    "groupLabels": [
      "Specialized Product AI Spaces"
    ],
    "component": "TLPSBudgetAI",
    "ordinal": 1
  },
  {
    "id": "AI_SPACE.TLPS_CASTING_AI",
    "name": "TLPS Casting AI",
    "groupIds": [
      "S05_PRODUCT_AI"
    ],
    "groupLabels": [
      "Specialized Product AI Spaces"
    ],
    "component": "TLPSCastingAI",
    "ordinal": 2
  },
  {
    "id": "AI_SPACE.TLPS_LOCATION_AI",
    "name": "TLPS Location AI",
    "groupIds": [
      "S05_PRODUCT_AI"
    ],
    "groupLabels": [
      "Specialized Product AI Spaces"
    ],
    "component": "TLPSLocationAI",
    "ordinal": 3
  },
  {
    "id": "AI_SPACE.TLPS_PRODUCTION_AI",
    "name": "TLPS Production AI",
    "groupIds": [
      "S05_PRODUCT_AI"
    ],
    "groupLabels": [
      "Specialized Product AI Spaces"
    ],
    "component": "TLPSProductionAI",
    "ordinal": 4
  },
  {
    "id": "AI_SPACE.TLPS_SCHEDULING_AI",
    "name": "TLPS Scheduling AI",
    "groupIds": [
      "S05_PRODUCT_AI"
    ],
    "groupLabels": [
      "Specialized Product AI Spaces"
    ],
    "component": "TLPSSchedulingAI",
    "ordinal": 5
  },
  {
    "id": "AI_SPACE.TLPS_SCRIPT_AI",
    "name": "TLPS Script AI",
    "groupIds": [
      "S05_PRODUCT_AI"
    ],
    "groupLabels": [
      "Specialized Product AI Spaces"
    ],
    "component": "TLPSScriptAI",
    "ordinal": 6
  },
  {
    "id": "AI_SPACE.TLPS_STORYBOARD_AI",
    "name": "TLPS Storyboard AI",
    "groupIds": [
      "S05_PRODUCT_AI"
    ],
    "groupLabels": [
      "Specialized Product AI Spaces"
    ],
    "component": "TLPSStoryboardAI",
    "ordinal": 7
  }
] as const;

export const TLPS_AI_SPACE_COMPONENTS = [
  {
    "id": "COMPONENT.AI_SPACES.TLPSBUDGETAI",
    "name": "TLPSBudgetAI",
    "category": "ai-spaces",
    "kind": "component",
    "sourcePath": "apps/tlps/src/ai-spaces/TLPSBudgetAI.tsx"
  },
  {
    "id": "COMPONENT.AI_SPACES.TLPSCASTINGAI",
    "name": "TLPSCastingAI",
    "category": "ai-spaces",
    "kind": "component",
    "sourcePath": "apps/tlps/src/ai-spaces/TLPSCastingAI.tsx"
  },
  {
    "id": "COMPONENT.AI_SPACES.TLPSLOCATIONAI",
    "name": "TLPSLocationAI",
    "category": "ai-spaces",
    "kind": "component",
    "sourcePath": "apps/tlps/src/ai-spaces/TLPSLocationAI.tsx"
  },
  {
    "id": "COMPONENT.AI_SPACES.TLPSPRODUCTIONAI",
    "name": "TLPSProductionAI",
    "category": "ai-spaces",
    "kind": "component",
    "sourcePath": "apps/tlps/src/ai-spaces/TLPSProductionAI.tsx"
  },
  {
    "id": "COMPONENT.AI_SPACES.TLPSSCHEDULINGAI",
    "name": "TLPSSchedulingAI",
    "category": "ai-spaces",
    "kind": "component",
    "sourcePath": "apps/tlps/src/ai-spaces/TLPSSchedulingAI.tsx"
  },
  {
    "id": "COMPONENT.AI_SPACES.TLPSSCRIPTAI",
    "name": "TLPSScriptAI",
    "category": "ai-spaces",
    "kind": "component",
    "sourcePath": "apps/tlps/src/ai-spaces/TLPSScriptAI.tsx"
  },
  {
    "id": "COMPONENT.AI_SPACES.TLPSSTORYBOARDAI",
    "name": "TLPSStoryboardAI",
    "category": "ai-spaces",
    "kind": "component",
    "sourcePath": "apps/tlps/src/ai-spaces/TLPSStoryboardAI.tsx"
  }
] as const;
