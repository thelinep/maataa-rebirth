"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

const classes = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(" ");

export function Avatar({ name, src, size = "md", className }: { name: string; src?: string; size?: "sm" | "md" | "lg"; className?: string }) {
  const initials = name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "?";
  return <span className={classes("maataa-ui", "maataa-ui__avatar", `maataa-ui__avatar--${size}`, className)} role="img" aria-label={name}>{src ? <img src={src} alt="" /> : initials}</span>;
}

export type ListGroupItem = { id: string; label: ReactNode; detail?: ReactNode; action?: ReactNode; disabled?: boolean };
export function ListGroup({ label, items, className }: { label: string; items: readonly ListGroupItem[]; className?: string }) {
  return <ul className={classes("maataa-ui", "maataa-ui__list-group", className)} aria-label={label}>{items.map((item) => <li key={item.id} aria-disabled={item.disabled || undefined}><span><strong>{item.label}</strong>{item.detail ? <small>{item.detail}</small> : null}</span>{item.action ? <span className="maataa-ui__list-group-action">{item.action}</span> : null}</li>)}</ul>;
}

export function Pagination({ page, pageCount, onPageChange, label = "Pagination", className }: { page: number; pageCount: number; onPageChange(page: number): void; label?: string; className?: string }) {
  const pages = Array.from({ length: Math.max(0, pageCount) }, (_, index) => index + 1);
  return <nav className={classes("maataa-ui", "maataa-ui__pagination", className)} aria-label={label}><button type="button" onClick={() => onPageChange(page - 1)} disabled={page <= 1}>Previous</button>{pages.map((number) => <button key={number} type="button" aria-current={number === page ? "page" : undefined} onClick={() => onPageChange(number)}>{number}</button>)}<button type="button" onClick={() => onPageChange(page + 1)} disabled={page >= pageCount}>Next</button></nav>;
}

/** A lightweight, disclosure-based contextual surface. It does not claim modal focus management. */
export function Popover({ label, children, className }: { label: ReactNode; children: ReactNode; className?: string }) {
  return <details className={classes("maataa-ui", "maataa-ui__popover", className)}><summary>{label}</summary><div className="maataa-ui__popover-content">{children}</div></details>;
}

export type MegaMenuSection = { id: string; title: ReactNode; links: readonly { id: string; label: ReactNode; href: string; description?: ReactNode }[] };
export function MegaMenu({ label, sections, className }: { label: ReactNode; sections: readonly MegaMenuSection[]; className?: string }) {
  return <details className={classes("maataa-ui", "maataa-ui__mega-menu", className)}><summary>{label}</summary><nav className="maataa-ui__mega-menu-panel" aria-label={typeof label === "string" ? label : "More navigation"}>{sections.map((section) => <section key={section.id}><h2>{section.title}</h2>{section.links.map((link) => <a key={link.id} href={link.href}><strong>{link.label}</strong>{link.description ? <small>{link.description}</small> : null}</a>)}</section>)}</nav></details>;
}

export function Skeleton({ label = "Loading content", lines = 3, className }: { label?: string; lines?: number; className?: string }) {
  return <div className={classes("maataa-ui", "maataa-ui__skeleton", className)} role="status" aria-label={label}>{Array.from({ length: Math.max(1, lines) }, (_, index) => <span key={index} aria-hidden="true" />)}</div>;
}

export function Spinner({ label = "Loading", className }: { label?: string; className?: string }) {
  return <span className={classes("maataa-ui", "maataa-ui__spinner", className)} role="status" aria-label={label}><span aria-hidden="true" /><span className="maataa-ui__visually-hidden">{label}</span></span>;
}

export type TimelineItem = { id: string; title: ReactNode; detail?: ReactNode; date?: ReactNode; state?: "complete" | "current" | "upcoming" };
export function Timeline({ label, items, className }: { label: string; items: readonly TimelineItem[]; className?: string }) {
  return <ol className={classes("maataa-ui", "maataa-ui__timeline", className)} aria-label={label}>{items.map((item) => <li key={item.id} data-state={item.state ?? "upcoming"}><span className="maataa-ui__timeline-marker" aria-hidden="true" /><div><strong>{item.title}</strong>{item.detail ? <small>{item.detail}</small> : null}</div>{item.date ? <time>{item.date}</time> : null}</li>)}</ol>;
}

export function FloatingActionButton({ label, children, className, ...props }: { label: string; children: ReactNode; className?: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} type={props.type ?? "button"} className={classes("maataa-ui", "maataa-ui__fab", className)} aria-label={label}>{children}</button>;
}
