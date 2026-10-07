import { themeRegistry } from "./theme-registry.js";
import {
  CANONICAL_TOKENS,
  SEMANTIC_TOKENS,
  type CanonicalToken,
  type SemanticToken,
  type ThemeNode,
  type ThemeTokenSet
} from "./theme-contract.js";

/**
 * Loader / applier for the unified theme contract.
 *
 * - `loadTheme(id)` is the primary lookup. Returns null on miss; never invents.
 * - `applyTheme(node, target)` projects a theme's canonical tokens onto a DOM
 *   element as CSS variables. SSR-safe: no-op when target is null/undefined.
 * - `inheritTheme(baseId, overrides)` builds a derived ThemeNode by overlaying
 *   token overrides on top of a base. Used for runtime modifiers (e.g.
 *   `accessibility-reduced-motion` inheriting from `core-dark`).
 * - `themeToCssVariableMap(node)` returns a plain object of CSS var name -> value
 *   for the four canonical tokens plus any semantic extensions; useful for
 *   inline `style` props or SSR <style> blocks.
 */

/** Look up a theme by id. PHKD: returns null on miss; never returns a stub. */
export function loadTheme(id: string): ThemeNode | null {
  return themeRegistry.getThemeById(id);
}

/** All canonical + semantic token names a theme may carry. */
const ALL_TOKEN_NAMES: ReadonlyArray<CanonicalToken | SemanticToken> = [...CANONICAL_TOKENS, ...SEMANTIC_TOKENS];

/** Project a theme onto an Element as CSS variables. SSR-safe. */
export function applyTheme(node: ThemeNode, target?: Element | null): void {
  if (!target || typeof (target as HTMLElement).style === "undefined") return;
  const style = (target as HTMLElement).style;
  for (const name of ALL_TOKEN_NAMES) {
    const value = node.tokens[name];
    if (typeof value === "string" && value.length > 0) {
      style.setProperty(name, value);
    }
  }
  // PHKD: keep an authority tag on the element so a11y / theme audits can
  // trace which theme is active without inspecting CSS vars.
  (target as HTMLElement).setAttribute("data-runtime-theme", node.id);
  (target as HTMLElement).setAttribute("data-runtime-theme-source", node.source);
  (target as HTMLElement).setAttribute("data-runtime-theme-family", node.family);
}

/**
 * Build a derived theme node by overlaying overrides on a base.
 * Used for the Reduced Motion modifier and any future runtime-state derivations.
 * PHKD: derived themes inherit source/status/productionReady from base; the
 * caller cannot promote a derived theme to "live" without a real consumer.
 */
export function inheritTheme(
  baseId: string,
  overrides: {
    readonly id: string;
    readonly label?: string;
    readonly description?: string;
    readonly tokens?: Partial<ThemeTokenSet>;
  }
): ThemeNode | null {
  const base = loadTheme(baseId);
  if (!base) return null;
  return {
    ...base,
    id: overrides.id,
    label: overrides.label ?? `${base.label} (derived)`,
    description: overrides.description ?? base.description,
    inherits: baseId,
    tokens: {
      ...base.tokens,
      ...(overrides.tokens ?? {})
    } as ThemeTokenSet
  };
}

/** Plain CSS-variable map; useful for inline `style` props and SSR. */
export function themeToCssVariableMap(node: ThemeNode): Record<string, string> {
  const out: Record<string, string> = {};
  for (const name of ALL_TOKEN_NAMES) {
    const value = node.tokens[name];
    if (typeof value === "string" && value.length > 0) {
      out[name] = value;
    }
  }
  return out;
}

/** Convenience: load + apply in one call. Returns the resolved node or null. */
export function loadAndApplyTheme(id: string, target?: Element | null): ThemeNode | null {
  const node = loadTheme(id);
  if (!node) return null;
  applyTheme(node, target);
  return node;
}
