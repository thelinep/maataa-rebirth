/**
 * @maataa/maataa-ui — theme contract (Epic A1)
 *
 * Canonical theme types for the unified theme registry. The four canonical
 * runtime CSS variables (`--runtime-bg`, `--runtime-panel`, `--runtime-border`,
 * `--runtime-accent`) are the contract every theme node must satisfy. Sources
 * (themelab, sovereign, locally-authored) contribute through providers; the
 * registry normalizes their tokens into the canonical set.
 *
 * PHKD: status is constrained; productionReady is always `false` at the type
 * level. Theme nodes describe state; they never authorize promotion.
 */

/** The four canonical runtime CSS variables required by every theme. */
export type CanonicalToken =
  | "--runtime-bg"
  | "--runtime-panel"
  | "--runtime-border"
  | "--runtime-accent";

/** Optional semantic tokens consumers may rely on; default-fallback safe. */
export type SemanticToken =
  | "--runtime-ink"
  | "--runtime-muted"
  | "--runtime-error"
  | "--runtime-success"
  | "--runtime-warning";

export type ThemeTokenSet = Readonly<Record<CanonicalToken, string>> &
  Partial<Readonly<Record<SemanticToken, string>>>;

/** Family classification, matching the Epic A2 group spec. */
export type ThemeFamily = "core" | "maataa" | "tlp" | "allb" | "accessibility";

/** Honest status — `live` requires a real consumer surface using the theme. */
export type ThemeStatus = "live" | "preview" | "planned";

/** Identifies which package authored or hosts the theme definition. */
export type ThemeSource =
  | "@maataa/maataa-ui"
  | "@maataa/themelab"
  | "@maataa/theme"
  | "@maataa/runtime-theme-governance";

export type ThemeNode = {
  /** Stable id, prefixed by family for uniqueness across providers. */
  readonly id: string;
  /** Display label (user-facing). */
  readonly label: string;
  readonly family: ThemeFamily;
  readonly status: ThemeStatus;
  readonly source: ThemeSource;
  /** The four canonical tokens, plus any semantic extensions. */
  readonly tokens: ThemeTokenSet;
  /** Optional human-readable description of the role this theme plays. */
  readonly description?: string;
  /** Optional inherit chain — the theme falls back to this base for unset semantics. */
  readonly inherits?: string;
  /**
   * Always `false`. Themes describe state; promoting any theme to "production
   * ready" requires recorded consumer evidence outside this registry.
   */
  readonly productionReady: false;
};

/** A provider contributes themes to the registry. */
export type ThemeProvider = {
  readonly source: ThemeSource;
  readonly description: string;
  /** Returns themes from the provider, canonicalized into the contract. */
  getThemes(): ReadonlyArray<ThemeNode>;
};

export type ThemeRegistry = {
  /** All registered providers. */
  getProviders(): ReadonlyArray<ThemeProvider>;
  /** Flat list across providers. */
  getAllThemes(): ReadonlyArray<ThemeNode>;
  getThemeById(id: string): ThemeNode | null;
  getThemesByFamily(family: ThemeFamily): ReadonlyArray<ThemeNode>;
  getThemesBySource(source: ThemeSource): ReadonlyArray<ThemeNode>;
  getThemesByStatus(status: ThemeStatus): ReadonlyArray<ThemeNode>;
};

export type ThemeRegistryEvidence = {
  readonly generatedAt: string;
  readonly productionReady: false;
  readonly phkdStatus: "HONESTLY_BLOCKED";
  readonly summary: {
    readonly total: number;
    readonly byFamily: Readonly<Record<ThemeFamily, number>>;
    readonly bySource: Readonly<Record<ThemeSource, number>>;
    readonly byStatus: Readonly<Record<ThemeStatus, number>>;
  };
  readonly themes: ReadonlyArray<ThemeNode>;
};

/** The four canonical token names, for code that needs to iterate them. */
export const CANONICAL_TOKENS: ReadonlyArray<CanonicalToken> = [
  "--runtime-bg",
  "--runtime-panel",
  "--runtime-border",
  "--runtime-accent"
];

export const SEMANTIC_TOKENS: ReadonlyArray<SemanticToken> = [
  "--runtime-ink",
  "--runtime-muted",
  "--runtime-error",
  "--runtime-success",
  "--runtime-warning"
];
