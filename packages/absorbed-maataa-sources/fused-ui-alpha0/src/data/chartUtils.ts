/**
 * @maataa/ui/data/chartUtils
 * Small internal helpers shared by the data-visualization components.
 * Not part of the public API.
 */

/**
 * Formats a number the way a stat tile expects: full value with thousands
 * commas under 1,000; otherwise compacted to one decimal place with a
 * K/M/B suffix (trailing ".0" dropped). An optional prefix (e.g. "$") is
 * applied before the digits.
 */
export function formatCompactNumber(value: number, prefix = ""): string {
  const sign = value < 0 ? "-" : "";
  const abs = Math.abs(value);

  if (abs < 1000) {
    return `${sign}${prefix}${withThousandsCommas(abs)}`;
  }

  const units: [number, string][] = [
    [1_000_000_000, "B"],
    [1_000_000, "M"],
    [1_000, "K"],
  ];

  for (const [threshold, suffix] of units) {
    if (abs >= threshold) {
      const scaled = abs / threshold;
      const rounded = Math.round(scaled * 10) / 10;
      const formatted = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
      return `${sign}${prefix}${formatted}${suffix}`;
    }
  }

  return `${sign}${prefix}${withThousandsCommas(abs)}`;
}

function withThousandsCommas(value: number): string {
  const [intPart, fractionPart] = value.toString().split(".");
  const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return fractionPart ? `${withCommas}.${fractionPart}` : withCommas;
}

/**
 * Picks a "nice" set of axis tick values (0-anchored) covering [0, maxValue].
 * Always returns at least two ticks (0 and maxValue) for degenerate input.
 */
export function niceTicks(maxValue: number, count = 4): number[] {
  if (!Number.isFinite(maxValue) || maxValue <= 0) return [0, 1];

  const rawStep = maxValue / count;
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const normalized = rawStep / magnitude;

  let niceStep: number;
  if (normalized <= 1) niceStep = magnitude;
  else if (normalized <= 2) niceStep = 2 * magnitude;
  else if (normalized <= 5) niceStep = 5 * magnitude;
  else niceStep = 10 * magnitude;

  const ticks: number[] = [];
  for (let tick = 0; tick <= maxValue + niceStep / 2; tick += niceStep) {
    ticks.push(Math.round(tick * 1000) / 1000);
  }
  return ticks;
}

/** Builds a smooth-ish SVG path `d` string (straight segments) through points. */
export function buildLinePath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return "";
  return points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
}

/** Builds a closed area path (line path + down to baseline + back to start). */
export function buildAreaPath(points: { x: number; y: number }[], baselineY: number): string {
  if (points.length === 0) return "";
  const line = buildLinePath(points);
  const last = points[points.length - 1];
  const first = points[0];
  return `${line} L${last.x},${baselineY} L${first.x},${baselineY} Z`;
}
