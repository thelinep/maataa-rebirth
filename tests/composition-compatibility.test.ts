import {
  describe,
  expect,
  it,
} from "vitest";

import {
  evaluateCompositionCompatibility,
} from "../src/composer/compatibility";

import {
  validateCompositionKernel,
  validateCompositionReferences,
} from "../src/composer/compositionKernel";

import {
  DEFAULT_COMPOSER_SCENE,
} from "../src/composer/defaults";

import {
  DEMO_SCENARIOS,
} from "../src/demo/scenarios";

import {
  COMPOSITION_COMPATIBILITY_REGISTRY,
} from "../src/registries/compositionCompatibilityRegistry";

describe(
  "composition compatibility evidence",
  () => {
    it(
      "contains the current evidence-backed baseline",
      () => {
        expect(
          COMPOSITION_COMPATIBILITY_REGISTRY,
        ).toHaveLength(8);
      },
    );

    it(
      "contains only canonical registry identities",
      () => {
        for (
          const record
          of COMPOSITION_COMPATIBILITY_REGISTRY
        ) {
          const result =
            validateCompositionReferences(
              {
                workspaceTypeId:
                  record.workspaceTypeId,
                pageTypeId:
                  record.pageTypeId,
                layoutTypeId:
                  record.layoutTypeId,
              },
              {
                deviceId:
                  record.deviceIds[0],
              },
            );

          expect(
            result.valid,
            record.id,
          ).toBe(true);
        }
      },
    );

    it(
      "verifies the default composer scene",
      () => {
        const result =
          evaluateCompositionCompatibility(
            {
              workspaceTypeId:
                DEFAULT_COMPOSER_SCENE
                  .workspaceTypeId,
              pageTypeId:
                DEFAULT_COMPOSER_SCENE
                  .pageTypeId,
              layoutTypeId:
                DEFAULT_COMPOSER_SCENE
                  .layoutTypeId,
              deviceId:
                DEFAULT_COMPOSER_SCENE
                  .deviceId,
            },
          );

        expect(
          result.status,
        ).toBe("verified");
      },
    );

    it(
      "verifies every deterministic demo scenario",
      () => {
        for (
          const scenario of DEMO_SCENARIOS
        ) {
          const result =
            evaluateCompositionCompatibility(
              {
                workspaceTypeId:
                  scenario.workspaceTypeId,
                pageTypeId:
                  scenario.pageTypeId,
                layoutTypeId:
                  scenario.layoutTypeId,
                deviceId:
                  scenario.deviceTypeId,
              },
            );

          expect(
            result.status,
            scenario.id,
          ).toBe("verified");
        }
      },
    );

    it(
      "marks unknown combinations unverified rather than invalid",
      () => {
        const scene = {
          ...DEFAULT_COMPOSER_SCENE,
          pageTypeId:
            "PAGE.EVENTS.EVENT_DASHBOARD",
          layoutTypeId:
            "LAYOUT.OPERATIONAL.COMMANDCENTER",
        } as typeof DEFAULT_COMPOSER_SCENE;

        const result =
          validateCompositionKernel(
            scene,
          );

        expect(
          result.valid,
        ).toBe(true);

        expect(
          result.compatibility.status,
        ).toBe("unverified");

        expect(
          result.warnings.some(
            (issue) =>
              issue.code ===
              "UNVERIFIED_COMPOSITION",
          ),
        ).toBe(true);
      },
    );
  },
);
