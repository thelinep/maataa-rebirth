"use client";

import { createContext, createElement, forwardRef, useContext, type AnchorHTMLAttributes, type ComponentType, type PropsWithChildren, type ReactNode } from "react";

/**
 * In-app navigation for @maataa/ui. The app registers its router's link
 * component once (for NEVO: next-intl's locale-aware Link) with
 * UiLinkProvider; every TextLink then routes through it, so pages never
 * import a framework link themselves. External, mailto:, tel: and "#"
 * hrefs always render a plain anchor.
 */
/** A route: a path string, or a path plus query (the shape Next.js and next-intl links accept). */
export type UiHref = string | { pathname: string; query?: Record<string, string | number | boolean | readonly string[] | null | undefined>; hash?: string };
export type UiLinkComponentProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: UiHref; children?: ReactNode } & Record<string, unknown>;
export type UiLinkComponent = ComponentType<UiLinkComponentProps>;

const LinkContext = createContext<UiLinkComponent | null>(null);

export function UiLinkProvider({ linkComponent, children }: PropsWithChildren<{ linkComponent: UiLinkComponent }>) {
  return createElement(LinkContext.Provider, { value: linkComponent }, children);
}

const isExternal = (href: UiHref) => typeof href === "string" && /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(href);
const hrefToString = (href: UiHref) => {
  if (typeof href === "string") return href;
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(href.query ?? {})) {
    if (value === null || value === undefined) continue;
    for (const item of Array.isArray(value) ? value : [value]) query.append(key, String(item));
  }
  const search = query.toString();
  return `${href.pathname}${search ? `?${search}` : ""}${href.hash ? `#${href.hash.replace(/^#/, "")}` : ""}`;
};

export type TextLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: UiHref;
  /** Forwarded to the registered link component (e.g. next-intl's `locale`). */
  locale?: string;
  prefetch?: boolean;
  scroll?: boolean;
  replace?: boolean;
};

export const TextLink = forwardRef<HTMLAnchorElement, TextLinkProps>(function TextLink({ href, ...props }, ref) {
  const LinkComponent = useContext(LinkContext);
  if (!LinkComponent || isExternal(href)) {
    const { locale: _locale, prefetch: _prefetch, scroll: _scroll, replace: _replace, ...anchor } = props;
    return createElement("a", { ...anchor, href: hrefToString(href), ref });
  }
  return createElement(LinkComponent, { ...props, href, ref } as UiLinkComponentProps);
});
