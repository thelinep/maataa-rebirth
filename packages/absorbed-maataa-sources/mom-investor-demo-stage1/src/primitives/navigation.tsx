"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cx, panelClass } from "./shared.ts";

type NavItem = {
  id: string;
  label: string;
  href: string;
  icon?: ReactNode;
  active?: boolean;
};

type DivProps = ComponentPropsWithoutRef<"div">;

export function Navigation({ items, className, label = "Runtime navigation" }: { items: readonly NavItem[]; className?: string; label?: string }) {
  return (
    <nav aria-label={label} className={cx("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <a
          key={item.id}
          href={item.href}
          className={cx(
            "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition",
            item.active
              ? "border-[color:var(--maataa-primary)] bg-[color:var(--maataa-primary)] text-black"
              : "border-[color:var(--maataa-border)] text-[color:var(--maataa-muted)] hover:text-[color:var(--maataa-text)]"
          )}
        >
          {item.icon}
          {item.label}
        </a>
      ))}
    </nav>
  );
}

export function RuntimeSidebar({ items, className }: { items: readonly NavItem[]; className?: string }) {
  return (
    <aside className={cx(panelClass, "p-3", className)}>
      <Navigation items={items} className="flex-col" label="Runtime sidebar" />
    </aside>
  );
}

export function RuntimeTopbar({ children, className, ...props }: DivProps) {
  return (
    <header className={cx(panelClass, "flex items-center justify-between gap-3 px-4 py-3", className)} {...props}>
      {children}
    </header>
  );
}

export function RuntimeDock({ items, className }: { items: readonly NavItem[]; className?: string }) {
  return (
    <div className={cx("fixed inset-x-3 bottom-3 z-40 rounded-2xl border border-[color:var(--maataa-border)] bg-[color:var(--maataa-surface)]/95 p-2 shadow-[0_16px_40px_var(--maataa-glow)] backdrop-blur md:hidden", className)}>
      <Navigation items={items} className="justify-around" label="Runtime dock" />
    </div>
  );
}

export function RuntimeBreadcrumbs({ items, className }: { items: readonly NavItem[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cx("flex flex-wrap items-center gap-1 text-sm text-[color:var(--maataa-muted)]", className)}>
      {items.map((item, index) => (
        <span key={item.id} className="inline-flex items-center gap-1">
          {index > 0 && <ChevronRight aria-hidden className="h-3.5 w-3.5" />}
          <a href={item.href} className={cx(item.active && "text-[color:var(--maataa-primary)]")}>
            {item.label}
          </a>
        </span>
      ))}
    </nav>
  );
}
