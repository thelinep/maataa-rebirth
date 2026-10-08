import { describe, expect, it } from "vitest";
import {
  TLPS_CAST_ROLES,
  TLPS_CREW_ROLES,
  TLPS_HOD_ROLES,
  TLPS_OPENING_PAYMENT_TYPES,
  TLPS_PRODUCT_IDS,
  TLPS_PROJECT_TYPES,
  TLPS_ROLES,
} from "../apps/tlps/src/types";
import {
  closeIssues,
  emptyTlpsDraft,
  planIssues,
  readTlpsDraft,
  sampleTlpsDraft,
  totalBudget,
  tlpsStorageKey,
} from "../apps/tlps/src/workflow";

describe("standalone TLPS planning draft", () => {
  it("exposes the centralized product and role vocabularies", () => {
    expect(TLPS_PRODUCT_IDS).toHaveLength(16);
    expect(new Set(TLPS_PRODUCT_IDS).size).toBe(TLPS_PRODUCT_IDS.length);
    expect(TLPS_PRODUCT_IDS).toContain("marketplace");
    expect(TLPS_PRODUCT_IDS).toContain("film-os");
    expect(TLPS_ROLES).toHaveLength(18);
  });

  it("centralizes deduplicated production roles and project vocabularies", () => {
    for (const vocabulary of [
      TLPS_CREW_ROLES,
      TLPS_CAST_ROLES,
      TLPS_HOD_ROLES,
      TLPS_PROJECT_TYPES,
      TLPS_OPENING_PAYMENT_TYPES,
    ]) {
      expect(new Set(vocabulary).size).toBe(vocabulary.length);
    }
    expect(TLPS_CREW_ROLES).toHaveLength(22);
    expect(TLPS_CREW_ROLES).toContain("Line Producer");
    expect(TLPS_CAST_ROLES).toHaveLength(8);
    expect(TLPS_HOD_ROLES).toHaveLength(13);
    expect(TLPS_PROJECT_TYPES).toContain("Documentary");
    expect(TLPS_OPENING_PAYMENT_TYPES).toEqual([
      "Hourly",
      "Daily",
      "Weekly",
      "Monthly",
      "Contract",
    ]);
  });

  it("keeps its data key separate and starts with a gated blank plan", () => {
    expect(tlpsStorageKey).toBe("tlps.planning.workspace.v1");
    expect(planIssues(emptyTlpsDraft)).toHaveLength(7);
  });

  it("provides fictional starter data that passes the plan gate", () => {
    const sample = sampleTlpsDraft();
    expect(sample.project.title).toContain("sample");
    expect(planIssues(sample)).toEqual([]);
    expect(totalBudget(sample)).toBe(250000);
    expect(sample.project.productionType).toBe("Feature Film");
  });

  it("migrates existing v1 drafts without a project type", () => {
    const legacy = sampleTlpsDraft();
    const oldProject = { ...legacy.project } as Record<string, unknown>;
    delete oldProject.productionType;
    const migrated = readTlpsDraft(
      JSON.stringify({ ...legacy, project: oldProject }),
    );
    expect(migrated.project.productionType).toBe("Feature Film");
  });

  it("rejects unknown project and opening-payment vocabulary in restored data", () => {
    const sample = sampleTlpsDraft();
    const invalidProject = {
      ...sample,
      project: { ...sample.project, productionType: "Unlisted format" },
    };
    const invalidPayment = {
      ...sample,
      crew: [
        {
          id: "crew-1",
          name: "Sample crew",
          responsibility: "Line Producer",
          openingPaymentType: "Instant payout",
        },
      ],
    };
    expect(readTlpsDraft(JSON.stringify(invalidProject))).toEqual(emptyTlpsDraft);
    expect(readTlpsDraft(JSON.stringify(invalidPayment))).toEqual(emptyTlpsDraft);
  });

  it("preserves recognized crew role and opening payment type data", () => {
    const sample = sampleTlpsDraft();
    sample.crew = [
      {
        id: "crew-1",
        name: "Sample crew",
        responsibility: "Line Producer",
        role: "Line Producer",
        openingPaymentType: "Daily",
      },
    ];
    expect(readTlpsDraft(JSON.stringify(sample)).crew[0]).toMatchObject({
      role: "Line Producer",
      openingPaymentType: "Daily",
    });
  });

  it("does not permit local closeout without rehearsal checks and both evidence kinds", () => {
    const sample = sampleTlpsDraft();
    expect(closeIssues(sample)).toHaveLength(3);
    expect(readTlpsDraft("invalid-json")).toEqual(emptyTlpsDraft);
  });

  it("rejects unknown workflow state on restore", () => {
    const corrupted = { ...sampleTlpsDraft(), status: "paid" };
    expect(readTlpsDraft(JSON.stringify(corrupted))).toEqual(emptyTlpsDraft);
  });
});
