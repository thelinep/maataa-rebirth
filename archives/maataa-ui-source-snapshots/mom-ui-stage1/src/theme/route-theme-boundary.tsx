"use client";
/**
 * RouteThemeBoundary — canonical route-theme rendering layer (Theme Step 2).
 *
 * Generic mechanics only: applies a resolved attribute map + CSS variables to
 * optional global targets (via effect) and to a wrapper element. The *data*
 * (which theme a route resolves to) stays with the consumer's registry —
 * per canonical_theme_architecture.md, route theming is input, not a provider.
 * Render output is byte-compatible with the pre-Step-2 RouteThemeProvider.
 */
import type { CSSProperties, ReactNode } from "react";
import { useEffect } from "react";

export type RouteThemeAttributes = Record<string, string>;

export type RouteThemeBoundaryProps = {
  children: ReactNode;
  /** data-* attribute map applied to the wrapper and global targets. */
  attributes: RouteThemeAttributes;
  /** CSS custom properties applied as inline style + to global targets. */
  cssVariables: Record<string, string>;
  /** Wrapper class (default matches legacy route-theme-root). */
  className?: string;
  /** Lazily-evaluated global elements (e.g. html/body) to mirror attributes onto. */
  globalTargets?: () => (HTMLElement | null)[];
};

function apply(target: HTMLElement, attributes: RouteThemeAttributes, cssVariables: Record<string, string>): void {
  for (const [name, value] of Object.entries(attributes)) target.setAttribute(name, value);
  for (const [name, value] of Object.entries(cssVariables)) target.style.setProperty(name, value);
}

export function RouteThemeBoundary({
  children,
  attributes,
  cssVariables,
  className = "route-theme-root",
  globalTargets
}: RouteThemeBoundaryProps) {
  useEffect(() => {
    if (!globalTargets) return;
    for (const target of globalTargets()) {
      if (target) apply(target, attributes, cssVariables);
    }
  }, [attributes, cssVariables, globalTargets]);

  return (
    <div className={className} {...attributes} style={cssVariables as CSSProperties}>
      {children}
    </div>
  );
}
