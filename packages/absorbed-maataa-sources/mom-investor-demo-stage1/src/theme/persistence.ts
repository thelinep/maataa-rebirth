/**
 * @maataa/maataa-ui — theme persistence (Epic A3)
 *
 * SSR-safe localStorage persistence for the active theme id. Provides:
 *   - saveTheme(themeId)
 *   - loadSavedTheme()
 *   - restoreTheme(target?)  — load + apply on a target element
 *   - clearSavedTheme()
 *   - getHydrationScript()   — early-execution <script> body that paints
 *     CSS vars before React hydrates, preventing FOUC.
 *
 * PHKD: persistence never authorizes promotion. A theme being saved as the
 * user's choice does not make it "live". Promotion happens via recorded
 * consumer evidence elsewhere.
 */

import { themeRegistry } from "./theme-registry.js";
import { loadTheme, applyTheme } from "./theme-loader.js";
import type { ThemeNode } from "./theme-contract.js";

/** Versioned storage key. Bump when payload shape changes. */
export const THEME_STORAGE_KEY = "maataa.theme.v1" as const;

/** Legacy keys we migrate from, in order. First match wins. */
const LEGACY_KEYS: ReadonlyArray<string> = ["maataa.theme", "sovereign.theme"];

/** Default fallback when nothing is saved and no override is provided. */
export const DEFAULT_FALLBACK_ID = "runtime-pulse";

type SavedTheme = {
  readonly v: 1;
  readonly id: string;
  readonly savedAt: string;
};

function hasStorage(): boolean {
  return typeof globalThis !== "undefined"
    && typeof (globalThis as { localStorage?: Storage }).localStorage !== "undefined";
}

function readRaw(key: string): string | null {
  if (!hasStorage()) return null;
  try {
    return (globalThis as { localStorage: Storage }).localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeRaw(key: string, value: string): boolean {
  if (!hasStorage()) return false;
  try {
    (globalThis as { localStorage: Storage }).localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function removeRaw(key: string): void {
  if (!hasStorage()) return;
  try {
    (globalThis as { localStorage: Storage }).localStorage.removeItem(key);
  } catch {
    /* swallow — storage quota, disabled storage, etc. */
  }
}

/** Save a theme id. Returns true if persisted, false on SSR / no storage / unknown id. */
export function saveTheme(themeId: string): boolean {
  if (!loadTheme(themeId)) {
    return false;
  }
  const payload: SavedTheme = {
    v: 1,
    id: themeId,
    savedAt: new Date().toISOString()
  };
  return writeRaw(THEME_STORAGE_KEY, JSON.stringify(payload));
}

/**
 * Load the saved theme id from storage. Returns null on SSR / no storage /
 * unparseable payload / unknown theme id. Auto-migrates from legacy keys.
 */
export function loadSavedTheme(): string | null {
  const raw = readRaw(THEME_STORAGE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as Partial<SavedTheme>;
      if (parsed.v === 1 && typeof parsed.id === "string") {
        if (loadTheme(parsed.id)) return parsed.id;
      }
    } catch {
      /* fall through to legacy migration */
    }
  }
  // Legacy migration: read a bare id string from prior keys.
  for (const legacy of LEGACY_KEYS) {
    const legacyRaw = readRaw(legacy);
    if (!legacyRaw) continue;
    const candidate = legacyRaw.trim().replace(/^"|"$/g, "");
    if (loadTheme(candidate)) {
      // Migrate forward, then forget the legacy slot.
      saveTheme(candidate);
      removeRaw(legacy);
      return candidate;
    }
  }
  return null;
}

/** Clear the saved theme. SSR-safe. */
export function clearSavedTheme(): void {
  removeRaw(THEME_STORAGE_KEY);
  for (const legacy of LEGACY_KEYS) removeRaw(legacy);
}

/**
 * Resolve the theme that should be active now:
 *   1. saved theme (if valid)
 *   2. caller-provided fallback id (if provided + valid)
 *   3. DEFAULT_FALLBACK_ID (if valid)
 *   4. first registry theme (last-resort, never null if registry is non-empty)
 */
export function resolveActiveTheme(fallbackId?: string): ThemeNode | null {
  const saved = loadSavedTheme();
  if (saved) {
    const node = loadTheme(saved);
    if (node) return node;
  }
  if (fallbackId) {
    const node = loadTheme(fallbackId);
    if (node) return node;
  }
  const defaultNode = loadTheme(DEFAULT_FALLBACK_ID);
  if (defaultNode) return defaultNode;
  const all = themeRegistry.getAllThemes();
  return all.length > 0 ? (all[0] ?? null) : null;
}

/**
 * Restore + apply the saved (or fallback) theme on a DOM target. SSR-safe:
 * returns null without throwing when called outside the browser. Returns the
 * applied ThemeNode, or null when nothing could be resolved.
 */
export function restoreTheme(target?: Element | null, fallbackId?: string): ThemeNode | null {
  const node = resolveActiveTheme(fallbackId);
  if (!node) return null;
  if (target) applyTheme(node, target);
  return node;
}

/**
 * Returns a JS source string suitable for an inline `<script>` tag emitted
 * before React hydrates. It reads the saved theme id from localStorage and
 * paints the four canonical CSS vars on `document.documentElement` so the
 * first paint matches the saved theme. PHKD: tokens are inlined from the
 * registry; no network fetch, no React, no remote.
 *
 * Usage in Next.js app/layout.tsx:
 *   <head>
 *     <script dangerouslySetInnerHTML={{ __html: getHydrationScript() }} />
 *   </head>
 */
export function getHydrationScript(fallbackId: string = DEFAULT_FALLBACK_ID): string {
  // Build a static id->canonical-tokens lookup. Keep it small: 4 canonical
  // tokens × N themes. Inline at build time; no runtime registry traversal
  // beyond this snapshot.
  const tokenMap: Record<string, Record<string, string>> = {};
  for (const theme of themeRegistry.getAllThemes()) {
    tokenMap[theme.id] = {
      "--runtime-bg": theme.tokens["--runtime-bg"],
      "--runtime-panel": theme.tokens["--runtime-panel"],
      "--runtime-border": theme.tokens["--runtime-border"],
      "--runtime-accent": theme.tokens["--runtime-accent"]
    };
  }
  const json = JSON.stringify(tokenMap);
  const fallback = JSON.stringify(fallbackId);
  const key = JSON.stringify(THEME_STORAGE_KEY);
  return [
    "(function(){",
    "try{",
    "var key=" + key + ";",
    "var raw=window.localStorage.getItem(key);",
    'var id=' + fallback + ';',
    "if(raw){try{var p=JSON.parse(raw);if(p&&p.v===1&&typeof p.id==='string')id=p.id;}catch(e){}}",
    "var map=" + json + ";",
    "var tokens=map[id]||map[" + fallback + "];",
    "if(!tokens)return;",
    "var s=document.documentElement.style;",
    "for(var k in tokens){if(Object.prototype.hasOwnProperty.call(tokens,k))s.setProperty(k,tokens[k]);}",
    "document.documentElement.setAttribute('data-runtime-theme',id);",
    "}catch(e){}",
    "})();"
  ].join("");
}
