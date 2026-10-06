import { describe, expect, it } from "vitest";
import { PAGE_TYPES } from "../src/registries/pageRegistry";
import { createProductPageSlice, PRODUCT_PAGE_GROUPS, type ProductPageContext } from "../examples/redux-demo/productPageSlices";

describe("TLPS and NEVO page data slices", () => {
  for (const product of ["tlps", "nevo"] as const) {
    it(`maps every ${product.toUpperCase()} page family to a non-empty synthetic slice`, () => {
      const groupMap = PRODUCT_PAGE_GROUPS[product];
      const pages = PAGE_TYPES.filter((page) => Object.hasOwn(groupMap, page.groupKey));
      const slices = pages.map((page) => createProductPageSlice(page, product));

      expect(pages.length).toBeGreaterThan(0);
      expect(slices.every((slice) => slice?.mapped)).toBe(true);
      expect(new Set(slices.map((slice) => slice!.reference)).size).toBe(pages.length);
      for (const slice of slices) {
        if (!slice?.mapped) continue;
        expect(slice.rows.length, slice.reference).toBeGreaterThan(0);
        expect(slice.summary).toMatch(/only|fixture|sample|synthetic|illustrative|unverified|preview/i);
      }
    });
  }

  it("keeps overlapping planning pages scoped to the selected product", () => {
    const page = PAGE_TYPES.find((entry) => entry.groupKey === "PRODUCTION_LOGISTICS")!;
    const contexts: ProductPageContext[] = ["tlps", "nevo"];
    const tlps = createProductPageSlice(page, contexts[0]!);
    const nevo = createProductPageSlice(page, contexts[1]!);

    expect(tlps?.mapped).toBe(true);
    expect(nevo?.mapped).toBe(true);
    expect(tlps?.title).toContain("Production");
    expect(nevo?.title).toBe("Run of show");
    expect(nevo?.rows[0]?.value).toContain("Registration fixture");
    expect(tlps?.reference).not.toBe(nevo?.reference);
  });

  it("routes TLPS schedule and location pages to their matching data slices", () => {
    const callSheet = PAGE_TYPES.find((entry) => entry.id === "PAGE.PRODUCTION_LOGISTICS.CALL_SHEET")!;
    const locations = PAGE_TYPES.find((entry) => entry.id === "PAGE.PRODUCTION_LOGISTICS.LOCATIONS")!;

    expect(createProductPageSlice(callSheet, "tlps")?.title).toBe("Call-sheet and rehearsal plan");
    expect(createProductPageSlice(locations, "tlps")?.title).toBe("Location research");
  });

  it("labels page families outside a selected pilot scope instead of implying a data connection", () => {
    const page = PAGE_TYPES.find((entry) => entry.groupKey === "AUTHENTICATION")!;
    const slice = createProductPageSlice(page, "tlps");
    expect(slice?.mapped).toBe(false);
    expect(slice?.summary).toContain("outside the current TLPS pilot data map");
  });
});
