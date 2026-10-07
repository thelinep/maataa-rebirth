import type { ThemeNode } from "../theme-contract.js";

/**
 * Seven themes authored locally in @maataa/maataa-ui to fill gaps that no
 * existing provider (themelab, @maataa/theme) covered.
 *
 * Each carries `status: "preview"` and `productionReady: false`. They are
 * not promoted to "live" until a real consumer surface in apps/web (or any
 * other consumer) actually renders against them and records evidence.
 */

export const lightTheme: ThemeNode = {
  id: "core-light",
  label: "Light",
  family: "core",
  status: "preview",
  source: "@maataa/maataa-ui",
  description: "Default light surface for low-ambient contexts. Inverse of core-dark.",
  productionReady: false,
  tokens: {
    "--runtime-bg": "#ffffff",
    "--runtime-panel": "#f5f7fa",
    "--runtime-border": "#e2e5ec",
    "--runtime-accent": "#4f46e5",
    "--runtime-ink": "#0b0d12",
    "--runtime-muted": "#5a6273",
    "--runtime-error": "#dc2626",
    "--runtime-success": "#16a34a",
    "--runtime-warning": "#d97706"
  }
};

export const producerTheme: ThemeNode = {
  id: "tlp-producer",
  label: "Producer",
  family: "tlp",
  status: "preview",
  source: "@maataa/maataa-ui",
  description: "Warm, attention-driving palette for active production surfaces (creator board, live call sheet).",
  productionReady: false,
  tokens: {
    "--runtime-bg": "#1a0f0a",
    "--runtime-panel": "#26180f",
    "--runtime-border": "#4a2c1a",
    "--runtime-accent": "#f97316",
    "--runtime-ink": "#fff5eb",
    "--runtime-muted": "#c79575",
    "--runtime-error": "#ef4444",
    "--runtime-success": "#22c55e",
    "--runtime-warning": "#fbbf24"
  }
};

export const directorTheme: ThemeNode = {
  id: "tlp-director",
  label: "Director",
  family: "tlp",
  status: "preview",
  source: "@maataa/maataa-ui",
  description: "Focused, cinematic palette for review/timeline surfaces.",
  productionReady: false,
  tokens: {
    "--runtime-bg": "#0a0a14",
    "--runtime-panel": "#14141f",
    "--runtime-border": "#2a2a3f",
    "--runtime-accent": "#a855f7",
    "--runtime-ink": "#f0eaff",
    "--runtime-muted": "#9a93c0",
    "--runtime-error": "#ef4444",
    "--runtime-success": "#22c55e",
    "--runtime-warning": "#f59e0b"
  }
};

export const investorTheme: ThemeNode = {
  id: "tlp-investor",
  label: "Investor",
  family: "tlp",
  status: "preview",
  source: "@maataa/maataa-ui",
  description: "Quiet, precise palette for capital and ownership surfaces.",
  productionReady: false,
  tokens: {
    "--runtime-bg": "#0a1419",
    "--runtime-panel": "#14202a",
    "--runtime-border": "#1f3140",
    "--runtime-accent": "#14b8a6",
    "--runtime-ink": "#e0f2f1",
    "--runtime-muted": "#7a9499",
    "--runtime-error": "#ef4444",
    "--runtime-success": "#10b981",
    "--runtime-warning": "#f59e0b"
  }
};

export const commerceTheme: ThemeNode = {
  id: "allb-commerce",
  label: "Commerce",
  family: "allb",
  status: "preview",
  source: "@maataa/maataa-ui",
  description: "Bright, trustworthy palette for transactional surfaces (shop, checkout).",
  productionReady: false,
  tokens: {
    "--runtime-bg": "#0a1410",
    "--runtime-panel": "#14201a",
    "--runtime-border": "#1f3025",
    "--runtime-accent": "#22c55e",
    "--runtime-ink": "#e8f5e9",
    "--runtime-muted": "#7a9483",
    "--runtime-error": "#ef4444",
    "--runtime-success": "#16a34a",
    "--runtime-warning": "#f59e0b"
  }
};

export const mediaTheme: ThemeNode = {
  id: "allb-media",
  label: "Media",
  family: "allb",
  status: "preview",
  source: "@maataa/maataa-ui",
  description: "Vivid, expressive palette for media-rich surfaces (games, news, social).",
  productionReady: false,
  tokens: {
    "--runtime-bg": "#14091a",
    "--runtime-panel": "#1f0e2a",
    "--runtime-border": "#2e1a3f",
    "--runtime-accent": "#ec4899",
    "--runtime-ink": "#fce4f0",
    "--runtime-muted": "#a98ba2",
    "--runtime-error": "#ef4444",
    "--runtime-success": "#22c55e",
    "--runtime-warning": "#f59e0b"
  }
};

/**
 * Reduced Motion is honestly a resolver mode, not a base theme — it overrides
 * motion durations regardless of underlying base. It still appears in the
 * registry as a theme entry for API consistency (so consumers can list it in
 * a theme switcher), but it inherits canonical colors from `core-dark` and
 * sets motion to near-zero. Apply on top of any base via the loader's
 * `composeWithModifier()` helper.
 */
export const reducedMotionTheme: ThemeNode = {
  id: "accessibility-reduced-motion",
  label: "Reduced Motion",
  family: "accessibility",
  status: "preview",
  source: "@maataa/maataa-ui",
  description:
    "Motion-suppression modifier. Inherits colors from the active base; overrides any animation/transition to <=80ms. Re-categorized from 'theme' to honest a11y resolver mode.",
  productionReady: false,
  inherits: "core-dark",
  tokens: {
    "--runtime-bg": "var(--runtime-bg, #070711)",
    "--runtime-panel": "var(--runtime-panel, #0e0e1e)",
    "--runtime-border": "var(--runtime-border, #23234a)",
    "--runtime-accent": "var(--runtime-accent, #8b5cf6)"
  }
};

/**
 * Local-authored theme list. `core-dark` is NOT here — it's contributed by the
 * themelab provider (which has `runtime-pulse` as its dark baseline). The
 * `reduced-motion` modifier inherits from `core-dark` to keep that single
 * source of truth.
 */
export const authoredThemes: ReadonlyArray<ThemeNode> = [
  lightTheme,
  producerTheme,
  directorTheme,
  investorTheme,
  commerceTheme,
  mediaTheme,
  reducedMotionTheme
];

/**
 * Brand registry hex anchor.
 *
 * NOT a theme. NOT consumed by RuntimePage/Panel/Card primitives.
 * These are approved brand identity hex literals used by:
 *
 *   - apps/web/lib/landing-registry.ts  (per-domain `accent` colors)
 *   - apps/web/lib/themes.ts            (vaigyaaniq / tlp / allb brand themes)
 *   - apps/web/scripts/generate-logo-assets.mjs (logo palette stops baked
 *                                                into static PNG/WEBP output)
 *
 * Listed here as a documented `as const` array so the existing theme audit
 * scanner at `scripts/ui-theme-audit.mjs` — which whitelists any
 * `"#hex"` literal found in this file — treats them as approved brand
 * colors rather than naked-hex errors.
 *
 * PHKD: this is a whitelist anchor, not a theme. Adding a hex here is an
 * explicit decision to recognize it as a sanctioned brand identity color.
 * Hard-banned values (#000000, #FFFFFF, #000, #fff) are NOT eligible —
 * the audit rejects them before consulting any whitelist.
 */
export const BRAND_REGISTRY_HEXES = [
  /* Landing registry — per-domain accent identity */
  "#c9952f",
  "#7c3aed",
  "#334155",
  "#0891b2",
  "#e11d48",
  "#b45309",
  "#4f46e5",
  "#db2777",
  "#2563eb",
  "#16a34a",
  "#059669",
  "#0284c7",
  "#9333ea",
  "#be123c",
  "#65a30d",
  "#4338ca",
  "#475569",
  "#d97706",
  "#92400e",
  "#6d28d9",
  /* lib/themes.ts non-hard-banned brand theme tokens */
  "#f59e0b",
  "#0b0f19",
  "#a1a1aa",
  "#22c55e",
  "#07130d",
  "#020603",
  "#a7b7aa",
  "#3b82f6",
  "#07111f",
  "#a8b4c8",
  /* generate-logo-assets.mjs SVG palette stops */
  "#fbbf24",
  "#7c4a03",
  "#c084fc",
  "#8b5cf6",
  "#4c1d95",
  "#86efac",
  "#14532d",
  "#93c5fd",
  "#1e3a8a",
  "#67e8f9",
  "#06b6d4",
  "#164e63",
  "#fda4af",
  "#f43f5e",
  "#881337",
  "#fde68a",
  /* lib/living-protocol/ecosystem-board-data.ts — per-category accents */
  "#4ade80",
  "#f5b942",
  "#94a3b8",
  /* app/hemant-samwat/ObservatoryRuntimeClient.tsx — 3D scene materials
     (Three.js color props on lights/meshes/orbiters; baked into WebGL output) */
  "#f6b23a",
  "#d99626",
  "#6b3b04",
  "#ffb32f",
  "#ff8a00",
  "#4ea7ff",
  "#d06b26",
  "#d9c198",
  "#8db0c7",
  /* lib/vaigyaaniq/ecosystem-data.ts — per-platform accents */
  "#ef6351",
  "#81b95d",
  "#8fbf3f",
  "#6aa7df",
  "#c49b61",
  "#e0a94f",
  "#49a078",
  "#9b6ade",
  /* app/hemant-samwat/observatory/runtime-universe/RuntimeUniverseClient.tsx
     — per-runtime-system node colors + scene typography. Three.js consumes
     these as color/emissive props on meshes and Text components; CSS-variable
     resolution doesn't reach WebGL. */
  "#f0b748",
  "#60a5fa",
  "#a78bfa",
  "#fb7185",
  "#eab308",
  "#fff1bf",
  "#fef3c7",
  /* lib/domain-experience.ts + lib/vaigyaaniq/universe-data.ts —
     additional per-domain / per-module brand identity accents not already
     whitelisted via landing-registry or earlier sprints. */
  "#f472b6",
  "#818cf8",
  "#0ea5e9"
] as const;
