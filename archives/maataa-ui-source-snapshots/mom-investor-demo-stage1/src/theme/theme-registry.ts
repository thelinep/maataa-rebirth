import { authoredThemes } from "./themes/index.js";
import { themelabProvider, cinematicProvider } from "./providers/index.js";
import type {
  ThemeFamily,
  ThemeNode,
  ThemeProvider,
  ThemeRegistry,
  ThemeRegistryEvidence,
  ThemeSource,
  ThemeStatus
} from "./theme-contract.js";

/**
 * Local-authored themes wrapped as a provider so they live alongside the
 * imported themelab/cinematic providers under the same contract.
 */
const authoredProvider: ThemeProvider = {
  source: "@maataa/maataa-ui",
  description:
    "Locally-authored themes filling gaps no upstream provider covered (Light, Producer, Director, Investor, Commerce, Media, Reduced Motion).",
  getThemes(): ReadonlyArray<ThemeNode> {
    return authoredThemes;
  }
};

const PROVIDERS: ReadonlyArray<ThemeProvider> = [
  themelabProvider,
  cinematicProvider,
  authoredProvider
];

/** All families enumerated for tidy iteration in evidence and tests. */
const FAMILIES: ReadonlyArray<ThemeFamily> = ["core", "maataa", "tlp", "allb", "accessibility"];
const SOURCES: ReadonlyArray<ThemeSource> = [
  "@maataa/maataa-ui",
  "@maataa/themelab",
  "@maataa/theme",
  "@maataa/runtime-theme-governance"
];
const STATUSES: ReadonlyArray<ThemeStatus> = ["live", "preview", "planned"];

/** Build the flat aggregated list once (eager) so accessors are O(1) on size. */
function aggregate(): ReadonlyArray<ThemeNode> {
  const seen = new Map<string, ThemeNode>();
  for (const provider of PROVIDERS) {
    for (const node of provider.getThemes()) {
      // PHKD: first source wins. Duplicate ids would mean a provider collision —
      // log shape preserved by keeping the first instance; never silently merge.
      if (!seen.has(node.id)) seen.set(node.id, node);
    }
  }
  return Array.from(seen.values());
}

const ALL_THEMES: ReadonlyArray<ThemeNode> = aggregate();

/** The canonical aggregated registry. */
export const themeRegistry: ThemeRegistry = {
  getProviders(): ReadonlyArray<ThemeProvider> {
    return PROVIDERS;
  },
  getAllThemes(): ReadonlyArray<ThemeNode> {
    return ALL_THEMES;
  },
  getThemeById(id: string): ThemeNode | null {
    return ALL_THEMES.find((n) => n.id === id) ?? null;
  },
  getThemesByFamily(family: ThemeFamily): ReadonlyArray<ThemeNode> {
    return ALL_THEMES.filter((n) => n.family === family);
  },
  getThemesBySource(source: ThemeSource): ReadonlyArray<ThemeNode> {
    return ALL_THEMES.filter((n) => n.source === source);
  },
  getThemesByStatus(status: ThemeStatus): ReadonlyArray<ThemeNode> {
    return ALL_THEMES.filter((n) => n.status === status);
  }
};

/**
 * Build the registry's honest evidence payload.
 * PHKD: productionReady is always false here. Promotion requires recorded
 * consumer evidence outside this registry.
 */
export function buildThemeRegistryEvidence(): ThemeRegistryEvidence {
  const themes = ALL_THEMES;
  const byFamily = FAMILIES.reduce<Record<ThemeFamily, number>>(
    (acc, family) => ({ ...acc, [family]: 0 }),
    { core: 0, maataa: 0, tlp: 0, allb: 0, accessibility: 0 }
  );
  const bySource = SOURCES.reduce<Record<ThemeSource, number>>(
    (acc, source) => ({ ...acc, [source]: 0 }),
    {
      "@maataa/maataa-ui": 0,
      "@maataa/themelab": 0,
      "@maataa/theme": 0,
      "@maataa/runtime-theme-governance": 0
    }
  );
  const byStatus = STATUSES.reduce<Record<ThemeStatus, number>>(
    (acc, status) => ({ ...acc, [status]: 0 }),
    { live: 0, preview: 0, planned: 0 }
  );
  for (const theme of themes) {
    byFamily[theme.family] += 1;
    bySource[theme.source] += 1;
    byStatus[theme.status] += 1;
  }
  return {
    generatedAt: new Date().toISOString(),
    productionReady: false,
    phkdStatus: "HONESTLY_BLOCKED",
    summary: {
      total: themes.length,
      byFamily,
      bySource,
      byStatus
    },
    themes
  };
}
