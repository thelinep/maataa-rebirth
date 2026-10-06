import { describe, expect, it } from "vitest";
import {
  buildProductIdeaBrief,
  createEmptyProductIdeaDraft,
  getProductIdeaOpenQuestions,
  parseProductIdeaWizardSession,
  PRODUCT_IDEA_WIZARD_MAX_CHARS,
} from "../examples/redux-demo/productIdeaWizardModel";

describe("product idea intake", () => {
  it("keeps unanswered planning fields explicit and context labels do not add facts", () => {
    const draft = createEmptyProductIdeaDraft();
    draft.domain = "tlps";
    draft.productName = "Planning helper";
    draft.idea = "A production planning assistant.";
    const brief = buildProductIdeaBrief(draft);

    expect(brief).toContain("TLPS context. This selection labels the request only");
    expect(brief).toContain("does not import or verify domain facts");
    expect(brief).toContain("Not supplied yet — keep this as unknown; do not infer it.");
    expect(brief).not.toContain("Call Sheet");
    expect(brief).not.toContain("Hemant Kumar Dixit");
    expect(getProductIdeaOpenQuestions(draft)).toContain("Pilot owner role");
  });

  it("respects edited evidence and does not silently claim verification", () => {
    const draft = createEmptyProductIdeaDraft();
    draft.productName = "Example";
    draft.idea = "Describe an idea.";
    draft.evidence = "Owner supplied a public workflow note.";
    const brief = buildProductIdeaBrief(draft);

    expect(brief).toContain("Owner supplied a public workflow note.");
    expect(brief).toContain("user-supplied answers are unverified until a named owner confirms them");
    expect(brief.length).toBeLessThan(PRODUCT_IDEA_WIZARD_MAX_CHARS);
  });

  it("bounds and sanitizes recovered local sessions and fails closed on malformed data", () => {
    expect(parseProductIdeaWizardSession("{broken")).toBeNull();
    expect(parseProductIdeaWizardSession(JSON.stringify({ version: 2 }))).toBeNull();

    const session = parseProductIdeaWizardSession(
      JSON.stringify({
        version: 1,
        currentStep: 500,
        draft: { domain: "untrusted", productName: "x".repeat(3_000) },
        reviewedBrief: "y".repeat(PRODUCT_IDEA_WIZARD_MAX_CHARS + 500),
      }),
    );
    expect(session?.currentStep).toBe(7);
    expect(session?.draft.domain).toBe("new");
    expect(session?.draft.productName).toHaveLength(2_000);
    expect(session?.reviewedBrief).toHaveLength(PRODUCT_IDEA_WIZARD_MAX_CHARS + 1);
  });
});
