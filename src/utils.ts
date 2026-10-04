export function cx(...values: Array<string | false | null | undefined>) { return values.filter(Boolean).join(" "); }
export function clamp(value: number, min: number, max: number) { return Math.min(max, Math.max(min, value)); }
export function uid(prefix = "m") { return `${prefix}-${Math.random().toString(36).slice(2, 9)}`; }
