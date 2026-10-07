import { describe, it, expect } from "vitest";
import { buildAreaPath, buildLinePath, formatCompactNumber, niceTicks } from "./chartUtils";

describe("formatCompactNumber", () => {
  it("adds thousands commas under 1,000", () => {
    expect(formatCompactNumber(1284 - 400)).toBe("884");
    expect(formatCompactNumber(999)).toBe("999");
  });

  it("compacts thousands with one decimal", () => {
    expect(formatCompactNumber(12900)).toBe("12.9K");
  });

  it("drops a trailing .0", () => {
    expect(formatCompactNumber(12000)).toBe("12K");
  });

  it("compacts millions and billions", () => {
    expect(formatCompactNumber(4200000)).toBe("4.2M");
    expect(formatCompactNumber(2000000000)).toBe("2B");
  });

  it("applies a prefix", () => {
    expect(formatCompactNumber(4200000, "$")).toBe("$4.2M");
    expect(formatCompactNumber(500, "$")).toBe("$500");
  });

  it("preserves the sign of negative values", () => {
    expect(formatCompactNumber(-12900)).toBe("-12.9K");
    expect(formatCompactNumber(-500)).toBe("-500");
  });

  it("adds thousands commas at 1,000 and above the comma threshold", () => {
    expect(formatCompactNumber(1284)).toBe("1.3K");
  });
});

describe("niceTicks", () => {
  it("always includes zero as the first tick", () => {
    expect(niceTicks(87)[0]).toBe(0);
  });

  it("covers at least the max value", () => {
    const ticks = niceTicks(87);
    expect(ticks[ticks.length - 1]).toBeGreaterThanOrEqual(87);
  });

  it("returns a safe fallback for zero or negative input", () => {
    expect(niceTicks(0)).toEqual([0, 1]);
    expect(niceTicks(-5)).toEqual([0, 1]);
  });
});

describe("buildLinePath", () => {
  it("returns an empty string for no points", () => {
    expect(buildLinePath([])).toBe("");
  });

  it("starts with M and continues with L", () => {
    const d = buildLinePath([
      { x: 0, y: 0 },
      { x: 10, y: 5 },
    ]);
    expect(d).toBe("M0,0 L10,5");
  });
});

describe("buildAreaPath", () => {
  it("returns an empty string for no points", () => {
    expect(buildAreaPath([], 100)).toBe("");
  });

  it("closes the path down to the baseline", () => {
    const d = buildAreaPath(
      [
        { x: 0, y: 10 },
        { x: 10, y: 5 },
      ],
      100
    );
    expect(d).toContain("L10,100");
    expect(d).toContain("L0,100");
    expect(d.trim().endsWith("Z")).toBe(true);
  });
});
