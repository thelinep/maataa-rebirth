import { cinematicThemes } from "@maataa/theme";
import type { ThemeNode, ThemeProvider } from "../theme-contract.js";

/**
 * Adapter for @maataa/theme's 3 CinematicTheme entries (vaigyaaniq, tlp, allb).
 *
 * CinematicTheme uses its own structure; we extract the surface/panel/border
 * /accent equivalents from its color tokens and project them into the canonical
 * --runtime-* contract. The existing `--sv-*` projection done by
 * ThemeRuntimeProvider stays intact; this adapter is additive.
 */

type CinematicSwatch = {
  readonly bg?: string;
  readonly surface?: string;
  readonly border?: string;
  readonly accent?: string;
  readonly ink?: string;
};

function pickSwatch(theme: (typeof cinematicThemes)[keyof typeof cinematicThemes]): CinematicSwatch {
  const colors = (theme as unknown as { colors?: Record<string, string> }).colors ?? {};
  return {
    bg: colors["background"] ?? colors["bg"],
    surface: colors["surface"] ?? colors["panel"],
    border: colors["border"] ?? colors["line"],
    accent: colors["accent"] ?? colors["brand"],
    ink: colors["ink"] ?? colors["text"]
  };
}

function adapt(
  key: keyof typeof cinematicThemes,
  theme: (typeof cinematicThemes)[keyof typeof cinematicThemes]
): ThemeNode {
  const swatch = pickSwatch(theme);
  const label = ((theme as unknown as { label?: string }).label ?? String(key)).toString();
  return {
    id: `cinematic-${String(key)}`,
    label: `Cinematic — ${label}`,
    family: "core",
    status: "preview",
    source: "@maataa/theme",
    description: `Adapted from @maataa/theme cinematicThemes['${String(key)}'].`,
    productionReady: false,
    tokens: {
      "--runtime-bg": swatch.bg ?? "#030014",
      "--runtime-panel": swatch.surface ?? "#0e0e1e",
      "--runtime-border": swatch.border ?? "#2a2a3f",
      "--runtime-accent": swatch.accent ?? "#a855f7",
      ...(swatch.ink ? { "--runtime-ink": swatch.ink } : {})
    }
  };
}

export const cinematicProvider: ThemeProvider = {
  source: "@maataa/theme",
  description:
    "Adapts @maataa/theme's cinematicThemes (vaigyaaniq / tlp / allb) into the canonical --runtime-* contract. Additive to the existing --sv-* projection.",
  getThemes(): ReadonlyArray<ThemeNode> {
    const out: ThemeNode[] = [];
    for (const key of Object.keys(cinematicThemes) as Array<keyof typeof cinematicThemes>) {
      const theme = cinematicThemes[key];
      out.push(adapt(key, theme));
    }
    return out;
  }
};
