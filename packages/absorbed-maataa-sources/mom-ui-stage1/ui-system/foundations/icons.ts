/** @maataa/maataa-ui · foundations · icons — IMPLEMENTED. Headless React, inline styles, tokens from foundations. PHKD: CONTROLLED_NO_GO / PRODUCTION_READY_NO. */
export const icons = {
  home: "⌂",
  user: "👤",
  settings: "⚙",
  search: "🔍",
  bell: "🔔",
  chart: "📊",
  box: "📦",
  calendar: "📅",
  shield: "🛡",
  code: "⟨⟩",
  database: "🗄",
  graph: "◉",
  infinity: "∞",
  check: "✔",
  warn: "⚠",
  error: "✕",
  link: "🔗",
  chakra: "☸"
} as const;
export type IconName = keyof typeof icons;
export const meta = {
  layer: "foundations",
  id: "icons",
  status: "IMPLEMENTED",
  implemented: true,
  runtimeState: "CONTROLLED_NO_GO",
  productionState: "PRODUCTION_READY_NO"
} as const;
