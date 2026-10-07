"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ChevronDown, ChevronUp, Globe } from "lucide-react";

export type DomainEntry = {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly status?: "live" | "preview" | "experimental" | "blocked";
  readonly description?: string;
};

export type DomainSwitcherProps = {
  readonly domains: ReadonlyArray<DomainEntry>;
  /** Currently-active domain id (highlighted in the list). */
  readonly activeId?: string;
  /** Optional click handler — if omitted, the anchor href is used. */
  readonly onSelect?: (domain: DomainEntry) => void;
  readonly className?: string;
  readonly label?: string;
};

const STATUS_BADGE: Record<NonNullable<DomainEntry["status"]>, string> = {
  live: "border-[color:var(--runtime-success)] text-[color:var(--runtime-success)]",
  preview: "border-[color:var(--runtime-warning)] text-[color:var(--runtime-warning)]",
  experimental: "border-[color:var(--runtime-warning)] text-[color:var(--runtime-warning)]",
  blocked: "border-[color:var(--runtime-error)] text-[color:var(--runtime-error)]"
};

/**
 * DomainSwitcher — accessible dropdown of ecosystem domains.
 *
 * Keyboard:
 *   - Enter / Space on the trigger toggles the menu.
 *   - Escape closes the menu.
 *   - ArrowDown / ArrowUp move focus through items when open.
 *   - Tab moves focus naturally through items.
 *
 * PHKD: status badges only appear when the domain entry carries an explicit
 * status. No fabricated states.
 */
export function DomainSwitcher({
  domains,
  activeId,
  onSelect,
  className,
  label = "Switch domain"
}: DomainSwitcherProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  /* Close on outside click + Escape. */
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /* When opened, focus the first item. */
  useEffect(() => {
    if (!open) return;
    const first = listRef.current?.querySelector<HTMLAnchorElement>('a[role="menuitem"]');
    first?.focus();
  }, [open]);

  const onTriggerKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((v) => !v);
    }
  };

  const onListKey = (e: KeyboardEvent<HTMLUListElement>) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const items = Array.from(listRef.current?.querySelectorAll<HTMLAnchorElement>('a[role="menuitem"]') ?? []);
    const current = document.activeElement as HTMLAnchorElement | null;
    const idx = current ? items.indexOf(current) : -1;
    const next = e.key === "ArrowDown" ? (idx + 1) % items.length : (idx - 1 + items.length) % items.length;
    items[next]?.focus();
  };

  const activeLabel = activeId ? (domains.find((d) => d.id === activeId)?.label ?? label) : label;

  return (
    <div ref={rootRef} className={"relative inline-block " + (className ?? "")}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onTriggerKey}
        className={
          "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold " +
          "border-[color:var(--runtime-border)] bg-[color:var(--runtime-panel)] " +
          "text-[color:var(--runtime-ink)] hover:border-[color:var(--runtime-accent)] " +
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--runtime-accent)]"
        }
      >
        <Globe size={14} aria-hidden="true" />
        <span>{activeLabel}</span>
        {open ? <ChevronUp size={14} aria-hidden="true" /> : <ChevronDown size={14} aria-hidden="true" />}
      </button>
      {open &&
        (domains.length === 0 ? (
          <div
            role="menu"
            aria-label={label}
            className={
              "absolute left-0 top-[calc(100%+6px)] z-50 min-w-[240px] rounded-xl border " +
              "border-[color:var(--runtime-border)] bg-[color:var(--runtime-panel)] " +
              "p-3 text-sm text-[color:var(--runtime-muted)] shadow-xl"
            }
          >
            No domains registered.
          </div>
        ) : (
          <ul
            ref={listRef}
            role="menu"
            aria-label={label}
            onKeyDown={onListKey}
            className={
              "absolute left-0 top-[calc(100%+6px)] z-50 min-w-[280px] max-h-[60vh] overflow-auto " +
              "rounded-xl border border-[color:var(--runtime-border)] bg-[color:var(--runtime-panel)] " +
              "p-2 shadow-xl backdrop-blur"
            }
          >
            {domains.map((d) => {
              const isActive = d.id === activeId;
              return (
                <li key={d.id} role="none">
                  <a
                    role="menuitem"
                    href={d.href}
                    onClick={(e) => {
                      if (onSelect) {
                        e.preventDefault();
                        onSelect(d);
                        setOpen(false);
                      }
                    }}
                    className={
                      "flex items-start gap-3 rounded-lg px-3 py-2 text-sm transition " +
                      "hover:bg-[color:var(--runtime-bg)] " +
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--runtime-accent)] " +
                      (isActive ? "bg-[color:var(--runtime-bg)] " : "")
                    }
                  >
                    <div className="flex-1">
                      <div className="font-semibold text-[color:var(--runtime-ink)]">{d.label}</div>
                      {d.description ? (
                        <div className="text-xs text-[color:var(--runtime-muted)] mt-[2px]">{d.description}</div>
                      ) : null}
                    </div>
                    {d.status ? (
                      <span
                        className={
                          "shrink-0 rounded-full border px-2 py-[1px] text-[10px] uppercase tracking-wider " +
                          STATUS_BADGE[d.status]
                        }
                      >
                        {d.status}
                      </span>
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ul>
        ))}
    </div>
  );
}
