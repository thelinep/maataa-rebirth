"use client";

import type { ReactNode } from "react";

export type ContextDockAction = {
  readonly id: string;
  readonly label: string;
  /** Anchor href when this action is a navigation target. */
  readonly href?: string;
  /** Click handler when this action is a runtime command. */
  readonly onSelect?: () => void;
  /** Optional Lucide icon (or any ReactNode). */
  readonly icon?: ReactNode;
  /** Optional state badge — "live" / "preview" / "blocked" etc. */
  readonly state?: "live" | "preview" | "experimental" | "blocked" | "disabled";
};

export type ContextDockSection = {
  readonly id: string;
  readonly label: "Tasks" | "Deployments" | "Approvals" | "Evidence" | "Recent Activity" | string;
  readonly actions: ReadonlyArray<ContextDockAction>;
};

export type ContextDockProps = {
  readonly actions: ReadonlyArray<ContextDockAction>;
  readonly sections?: ReadonlyArray<ContextDockSection>;
  /** Static title shown on the left of the dock. */
  readonly contextLabel?: string;
  /** Optional content rendered on the right (status pill, breadcrumb, etc). */
  readonly trailing?: ReactNode;
  readonly className?: string;
};

const STATE_CLASS: Record<NonNullable<ContextDockAction["state"]>, string> = {
  live: "text-[color:var(--runtime-success)]",
  preview: "text-[color:var(--runtime-warning)]",
  experimental: "text-[color:var(--runtime-warning)]",
  blocked: "text-[color:var(--runtime-error)] pointer-events-none opacity-60",
  disabled: "text-[color:var(--runtime-muted)] pointer-events-none opacity-50"
};

/**
 * ContextDock — context-aware quick-action dock.
 *
 * Renders a horizontal action bar tied to the current page/context. Actions
 * can be navigation links (href) OR runtime commands (onSelect). Visual
 * states honour the canonical RUNTIME_STATES vocabulary; blocked + disabled
 * actions are intentionally non-clickable.
 *
 * PHKD: empty actions render an honest empty state rather than a blank dock.
 * No fabricated actions or invisible-but-broken buttons.
 */
export function ContextDock({ actions, sections, contextLabel, trailing, className }: ContextDockProps) {
  const hasSections = Boolean(sections?.length);

  return (
    <nav
      aria-label={contextLabel ?? "Context dock"}
      className={
        "flex flex-wrap items-center gap-3 rounded-2xl border px-4 py-3 " +
        "border-[color:var(--runtime-border)] bg-[color:var(--runtime-panel)] " +
        (className ?? "")
      }
    >
      {contextLabel ? (
        <span className="text-xs uppercase tracking-[0.16em] text-[color:var(--runtime-muted)] mr-2">
          {contextLabel}
        </span>
      ) : null}

      {hasSections ? (
        <div className="grid gap-3 w-full">
          {sections?.map((section) => (
            <section key={section.id} aria-label={section.label} className="grid gap-2">
              <span className="text-xs uppercase tracking-[0.16em] text-[color:var(--runtime-muted)]">
                {section.label}
              </span>
              <ContextDockActionList actions={section.actions} />
            </section>
          ))}
        </div>
      ) : actions.length === 0 ? (
        <span className="text-sm text-[color:var(--runtime-muted)]">No actions available in this context.</span>
      ) : (
        <ContextDockActionList actions={actions} />
      )}

      {trailing ? <div className="ml-auto">{trailing}</div> : null}
    </nav>
  );
}

function ContextDockActionList({ actions }: { readonly actions: ReadonlyArray<ContextDockAction> }) {
  if (actions.length === 0) {
    return <span className="text-sm text-[color:var(--runtime-muted)]">No actions in this section.</span>;
  }

  return (
    <ul className="flex flex-wrap items-center gap-2 m-0 p-0 list-none">
      {actions.map((a) => {
        const stateClass = a.state ? STATE_CLASS[a.state] : "";
        const isDisabled = a.state === "blocked" || a.state === "disabled";
        const baseClass =
          "inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm font-semibold " +
          "border-[color:var(--runtime-border)] hover:border-[color:var(--runtime-accent)] " +
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--runtime-accent)] " +
          "transition " +
          stateClass +
          " ";

        const content = (
          <>
            {a.icon ? <span aria-hidden="true">{a.icon}</span> : null}
            <span>{a.label}</span>
          </>
        );

        return (
          <li key={a.id}>
            {a.href ? (
              <a
                href={a.href}
                className={baseClass}
                aria-disabled={isDisabled || undefined}
                onClick={isDisabled ? (e) => e.preventDefault() : undefined}
              >
                {content}
              </a>
            ) : (
              <button type="button" className={baseClass} onClick={a.onSelect} disabled={isDisabled}>
                {content}
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
