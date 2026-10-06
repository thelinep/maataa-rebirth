/**
 * MAATAA UI alpha8.5.3 — playground tab contrast hotfix.
 *
 * Explicitly installed from main.tsx so Vite/Rollup cannot tree-shake this
 * demo-only accessibility patch as an unreferenced side-effect module.
 */

declare global {
  interface Window {
    __MAATAA_A11Y_HOTFIX__?: string;
    __MAATAA_A11Y_HOTFIX_BUNDLE_MARKER__?: string;
  }
}

const VERSION = "alpha8.5.3";
const BUNDLE_MARKER = "MAATAA_A11Y_HOTFIX_ACTIVE_ALPHA8_5_3";
const STYLE_ID = "maataa-alpha8-5-3-a11y-hotfix";
const INSTALL_KEY = "data-maataa-a11y-observer-installed";

const CSS_TEXT = `
/* /surface: muted text must clear WCAG AA on the existing dark surfaces. */
.catalog-tabs > button[data-active="false"],
.catalog-tabs > button[data-active="false"] > span {
  color: #94949d !important;
}
.surface-inspector-pane .m-prop-inspector > label > span {
  color: #b7afa5 !important;
}
.site-shell[data-demo-theme="light"] .catalog-tabs > button[data-active="false"],
.site-shell[data-demo-theme="light"] .catalog-tabs > button[data-active="false"] > span,
.site-shell[data-demo-theme="light"] .surface-inspector-pane .m-prop-inspector > label > span {
  color: #514d45 !important;
}

/* /playground: keep the dark preview internally coherent. */
.playground-viewport[data-theme="dark"] {
  color: #eeeeee !important;
  background: #0d0d10 !important;
}
.playground-viewport[data-theme="dark"] .m-card.m-ui,
.playground-viewport[data-theme="dark"] .playground-content > article {
  color: #eeeeee !important;
  background: #151519 !important;
}
.playground-viewport[data-theme="dark"] .m-card.m-ui strong,
.playground-viewport[data-theme="dark"] .playground-content strong,
.playground-viewport[data-theme="dark"] [role="tabpanel"],
.playground-viewport[data-theme="dark"] [role="tabpanel"] p,
.playground-viewport[data-theme="dark"] #panel-overview,
.playground-viewport[data-theme="dark"] #panel-overview p {
  color: #eeeeee !important;
}
.playground-viewport[data-theme="dark"] .m-button.m-ui[data-variant="ghost"] {
  color: #eeeeee !important;
  background: transparent !important;
}
.playground-viewport[data-theme="dark"] .m-input.m-ui {
  color: #f5f5f5 !important;
  background: #1b1b20 !important;
  border-color: #8b8b94 !important;
}
.site-shell[data-demo-theme="light"] .playground-viewport[data-theme="dark"] label {
  color: #c2c2c8 !important;
}

/* alpha8.5.3: the remaining Axe failures are the three playground tabs.
 * Background reported by Axe is #151519. Keep a comfortable AA margin. */
.playground-viewport[data-theme="dark"] .m-tab[role="tab"] {
  color: #a9a29a !important;
}
.playground-viewport[data-theme="dark"] .m-tab[role="tab"][aria-selected="true"] {
  color: #f2eee8 !important;
}

/* Playground status badges shown on light chrome. */
.playground-topbar .m-badge.m-ui[data-tone],
.specimen-actions .m-badge.m-ui[data-tone] {
  color: #3a3026 !important;
  background: #fffdf8 !important;
}

/* Keyboard-visible focus for intentionally scrollable demo regions. */
pre[tabindex="0"]:focus-visible,
.table-scroll[tabindex="0"]:focus-visible {
  outline: 2px solid currentColor !important;
  outline-offset: 2px !important;
}
`;

function setAttr(el: Element, name: string, value: string): void {
  if (el.getAttribute(name) !== value) el.setAttribute(name, value);
}

function installStyle(): void {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = CSS_TEXT;
  (document.head || document.documentElement).appendChild(style);
}

function patchSurface(): number {
  let count = 0;
  document.querySelectorAll<HTMLElement>('.catalog-tabs[role="tablist"]').forEach((tablist) => {
    // Current demo behavior is a catalog filter strip, not a complete ARIA tabs
    // implementation. Use group semantics rather than publishing a false tab contract.
    setAttr(tablist, "role", "group");
    if (!tablist.getAttribute("aria-label") && !tablist.getAttribute("aria-labelledby")) {
      setAttr(tablist, "aria-label", "Catalog filters");
    }
    count += 1;
  });
  return count;
}

function hasAccessibleName(input: HTMLInputElement): boolean {
  if (input.getAttribute("aria-label")?.trim()) return true;
  if (input.getAttribute("aria-labelledby")?.trim()) return true;
  if (input.closest("label")) return true;
  if (input.id) {
    try {
      if (document.querySelector(`label[for="${CSS.escape(input.id)}"]`)) return true;
    } catch {
      // Invalid external ids are irrelevant; aria-label below is the safe fallback.
    }
  }
  return false;
}

function patchPlaygroundInputs(): number {
  let count = 0;
  document
    .querySelectorAll<HTMLInputElement>('.playground-viewport input.m-input, .playground-content input.m-input')
    .forEach((input) => {
      if (!hasAccessibleName(input)) {
        setAttr(input, "aria-label", "Playground input");
        count += 1;
      }
    });
  return count;
}

function makeRegionFocusable(el: HTMLElement, label: string): boolean {
  const changed = el.tabIndex !== 0 || el.getAttribute("role") !== "region";
  if (el.tabIndex !== 0) el.tabIndex = 0;
  setAttr(el, "role", "region");
  if (!el.getAttribute("aria-label") && !el.getAttribute("aria-labelledby")) {
    setAttr(el, "aria-label", label);
  }
  return changed;
}

function patchScrollRegions(): number {
  let count = 0;

  document.querySelectorAll<HTMLElement>(".table-scroll").forEach((el) => {
    if (makeRegionFocusable(el, "Scrollable data table")) count += 1;
  });

  document.querySelectorAll<HTMLElement>("pre").forEach((el) => {
    const style = getComputedStyle(el);
    const cssScrollable = [style.overflowX, style.overflowY].some(
      (value) => value === "auto" || value === "scroll",
    );
    const contentScrollable = el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight;
    if ((cssScrollable || contentScrollable) && makeRegionFocusable(el, "Scrollable source code")) {
      count += 1;
    }
  });

  return count;
}

let applying = false;
function applyHotfix(): void {
  if (applying) return;
  applying = true;
  try {
    installStyle();
    const surface = patchSurface();
    const inputs = patchPlaygroundInputs();
    const scroll = patchScrollRegions();
    window.__MAATAA_A11Y_HOTFIX__ = VERSION;
    window.__MAATAA_A11Y_HOTFIX_BUNDLE_MARKER__ = BUNDLE_MARKER;
    document.documentElement.dataset.maataaA11yHotfix = VERSION;
    document.documentElement.dataset.maataaA11yPatchCounts = `${surface}:${inputs}:${scroll}`;
  } finally {
    applying = false;
  }
}

export function installA11yHotfix(): void {
  // The explicit exported call is intentional: it prevents package-level
  // sideEffects:false / Rollup tree-shaking from deleting this module.
  window.__MAATAA_A11Y_HOTFIX_BUNDLE_MARKER__ = BUNDLE_MARKER;
  installStyle();
  applyHotfix();
  queueMicrotask(applyHotfix);

  const root = document.documentElement;
  if (root && root.getAttribute(INSTALL_KEY) !== VERSION) {
    root.setAttribute(INSTALL_KEY, VERSION);
    const observer = new MutationObserver(() => applyHotfix());
    observer.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "data-active", "data-theme", "style"],
    });
  }

  document.addEventListener("DOMContentLoaded", applyHotfix, { once: true });
  window.addEventListener("load", applyHotfix, { once: true });
  window.addEventListener("popstate", applyHotfix);
  window.addEventListener("hashchange", applyHotfix);

  // Close short gaps between createRoot().render() and Axe analysis.
  setTimeout(applyHotfix, 0);
  setTimeout(applyHotfix, 25);
  setTimeout(applyHotfix, 100);
  setTimeout(applyHotfix, 250);
}
