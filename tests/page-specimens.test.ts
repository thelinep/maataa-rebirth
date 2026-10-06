import { describe, expect, it } from "vitest";
import { PAGE_TYPES } from "../src/registries/pageRegistry";
import { createPageSpecimen, PAGE_GROUP_PROFILES } from "../examples/redux-demo/pageSpecimens";

describe("page specimens", () => {
  it("provides a deterministic, record-specific specimen for every canonical page", () => {
    const specimens = PAGE_TYPES.map((page) => createPageSpecimen(page));

    expect(specimens).toHaveLength(500);
    expect(new Set(specimens.map((specimen) => specimen.id)).size).toBe(500);
    expect(new Set(specimens.map((specimen) => specimen.reference)).size).toBe(500);
    for (const [index, page] of PAGE_TYPES.entries()) {
      const specimen = specimens[index]!;
      expect(PAGE_GROUP_PROFILES[page.groupKey], `missing group profile: ${page.groupKey}`).toBeDefined();
      expect(specimen.id).toBe(page.id);
      expect(specimen.heading).toBe(page.name);
      expect(specimen.purpose).toContain(page.name.replace(/\s+Page$/i, ""));
      expect(specimen.sections).toHaveLength(3);
      expect(specimen.sections.every((section) => section.reference.startsWith(specimen.reference))).toBe(true);
      expect(specimen.boundary).toContain("Synthetic specimen only");
    }
  });

  it("does not reuse the same fixture content when records share a page family", () => {
    const marketingPages = PAGE_TYPES.filter((page) => page.groupKey === "MARKETING_CORPORATE");
    const specimens = marketingPages.map(createPageSpecimen);
    expect(specimens.length).toBeGreaterThan(1);
    expect(new Set(specimens.map((specimen) => specimen.metrics[1].value)).size).toBeGreaterThan(1);
    expect(new Set(specimens.map((specimen) => specimen.sections[0].detail)).size).toBe(specimens.length);
  });
});
