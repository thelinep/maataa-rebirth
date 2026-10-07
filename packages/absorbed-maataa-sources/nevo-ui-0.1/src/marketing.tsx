import { type AnchorHTMLAttributes, type ComponentType, type PropsWithChildren, type ReactNode } from "react";

const classes = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(" ");

/** A link-rendering component MarketingNav/Footer delegate to instead of a
 * bare <a>, so a host framework's own link (e.g. Next.js's <Link>, for
 * client-side navigation) can be injected. Defaults to a plain anchor. */
export type MarketingLinkComponent = ComponentType<{
  href: string;
  className?: string;
  children?: ReactNode;
}>;

const DefaultLink: MarketingLinkComponent = ({ href, className, children }) => (
  <a href={href} className={className}>{children}</a>
);

/**
 * Brand-neutral public/marketing-site primitives: a sticky nav, hero,
 * light/dark theme toggle, an auto-advancing carousel, a disclosure
 * (accordion) and image cards, plus a footer. These sit alongside
 * ./components.tsx (the app-shell/product primitives) rather than
 * inside it, because a public marketing page and an authenticated
 * product surface are different landmarks composed differently -- see
 * MarketingNav/Hero/Footer below, which render their own <header>,
 * <section> and <footer> rather than fitting into AppShell's sidebar
 * layout.
 *
 * Added while auditing why apps/web/app/ carried ~8 CSS files with zero
 * importers: those files existed only because @maataa/ui had no
 * marketing-page primitives for the public site to build on. This file
 * is that missing layer, kept brand-neutral like components.tsx --
 * NEVO-specific styling belongs in a thin ./nevo.tsx-style wrapper
 * consuming these, not hardcoded here.
 */

/* ---------- nav ---------- */

export interface MarketingNavLink { id: string; label: string; href: string; className?: string; }

export function MarketingNav({ brand, links, cta, context, className, navClassName, navLabel = "Site navigation", linkComponent: Link = DefaultLink }: {
  brand: ReactNode;
  links: readonly MarketingNavLink[];
  cta?: ReactNode;
  context?: ReactNode;
  className?: string;
  /** Override/extend the class on the <nav> wrapping `links`, e.g. to key a
   * host's existing CSS off it alongside (or instead of) the default. */
  navClassName?: string;
  /** Accessible name of the link list; pass a translated label on localized pages. */
  navLabel?: string;
  linkComponent?: MarketingLinkComponent;
}) {
  return (
    <header className={classes("maataa-ui", "maataa-ui__marketing-nav", className)}>
      <div className="maataa-ui__marketing-nav-brand">{brand}</div>
      <nav className={classes("maataa-ui__marketing-nav-links", navClassName)} aria-label={navLabel}>
        {links.map(link => <Link href={link.href} className={link.className} key={link.id}>{link.label}</Link>)}
      </nav>
      {(context || cta) && <div className="maataa-ui__marketing-nav-actions">{context}{cta}</div>}
    </header>
  );
}

/* ---------- hero ---------- */

export function Hero({ eyebrow, heading, description, actions, visual, className }: {
  eyebrow?: ReactNode;
  heading: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  visual?: ReactNode;
  className?: string;
}) {
  return (
    <section className={classes("maataa-ui", "maataa-ui__hero", className)} aria-label="Introduction">
      <div className="maataa-ui__hero-copy">
        {eyebrow && <p className="maataa-ui__eyebrow">{eyebrow}</p>}
        <h1>{heading}</h1>
        {description && <p className="maataa-ui__muted">{description}</p>}
        {actions && <div className="maataa-ui__hero-actions">{actions}</div>}
      </div>
      {visual && <div className="maataa-ui__hero-visual">{visual}</div>}
    </section>
  );
}

/* ---------- disclosure (accordion) ---------- */

export function Disclosure({ summary, children, className, defaultOpen }: PropsWithChildren<{
  summary: ReactNode;
  className?: string;
  defaultOpen?: boolean;
}>) {
  return (
    <details className={classes("maataa-ui", "maataa-ui__disclosure", className)} open={defaultOpen}>
      <summary>{summary}</summary>
      <div className="maataa-ui__disclosure-body">{children}</div>
    </details>
  );
}

/* ---------- image card ---------- */

export function ImageCard({ href, media, children, className, ...props }: PropsWithChildren<{
  href?: string;
  media?: ReactNode;
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">>) {
  const body = (
    <>
      {media && <span className="maataa-ui__image-card-media">{media}</span>}
      <span className="maataa-ui__image-card-body">{children}</span>
    </>
  );
  return href
    ? <a {...props} className={classes("maataa-ui", "maataa-ui__image-card", className)} href={href}>{body}</a>
    : <div className={classes("maataa-ui", "maataa-ui__image-card", className)}>{body}</div>;
}

/* ---------- footer ---------- */

export interface FooterLink { id: string; label: string; href: string; }

export function Footer({ brand, tagline, links, className, linksClassName, linksLabel = "Footer", linkComponent: Link = DefaultLink }: {
  brand: ReactNode;
  tagline?: ReactNode;
  links?: readonly FooterLink[];
  className?: string;
  /** Override/extend the class on the <nav> wrapping `links`, e.g. to key a
   * host's existing CSS off it alongside (or instead of) the default. */
  linksClassName?: string;
  /** Accessible name of the footer link list; pass a translated label on localized pages. */
  linksLabel?: string;
  linkComponent?: MarketingLinkComponent;
}) {
  return (
    <footer className={classes("maataa-ui", "maataa-ui__footer", className)}>
      <div className="maataa-ui__footer-brand">
        {brand}
        {tagline && <span className="maataa-ui__muted">{tagline}</span>}
      </div>
      {links && links.length > 0 && (
        <nav aria-label={linksLabel} className={classes("maataa-ui__footer-links", linksClassName)}>
          {links.map(link => <Link href={link.href} key={link.id}>{link.label}</Link>)}
        </nav>
      )}
    </footer>
  );
}
