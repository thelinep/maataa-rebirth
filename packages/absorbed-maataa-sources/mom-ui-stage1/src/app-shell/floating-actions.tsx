"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUp, ArrowDown, Activity } from "lucide-react";

/* =============================================================
   Shared FAB base
   ============================================================= */

type FabAnchor = "bottom-right" | "bottom-left" | "bottom-center";

const ANCHOR_CLASSES: Record<FabAnchor, string> = {
  "bottom-right": "bottom-5 right-5",
  "bottom-left": "bottom-5 left-5",
  "bottom-center": "bottom-5 left-1/2 -translate-x-1/2"
};

type FabBaseProps = {
  readonly visible: boolean;
  readonly anchor: FabAnchor;
  readonly label: string;
  readonly onClick: () => void;
  readonly children: ReactNode;
  readonly className?: string;
  readonly tone?: "accent" | "success" | "warning" | "error";
};

const TONE_CLASSES = {
  accent: "bg-[color:var(--runtime-accent)] text-[color:var(--runtime-bg)] border-[color:var(--runtime-accent)]",
  success: "bg-[color:var(--runtime-success)] text-[color:var(--runtime-bg)] border-[color:var(--runtime-success)]",
  warning: "bg-[color:var(--runtime-warning)] text-[color:var(--runtime-bg)] border-[color:var(--runtime-warning)]",
  error: "bg-[color:var(--runtime-error)] text-[color:var(--runtime-bg)] border-[color:var(--runtime-error)]"
} as const;

function FabBase({ visible, anchor, label, onClick, children, className, tone = "accent" }: FabBaseProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      data-visible={visible ? "true" : "false"}
      className={
        "fixed z-50 inline-flex items-center justify-center gap-2 rounded-full " +
        "px-4 py-3 text-sm font-semibold shadow-lg border transition-all duration-300 " +
        "hover:brightness-110 active:scale-95 " +
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
        "focus-visible:ring-[color:var(--runtime-accent)] focus-visible:ring-offset-[color:var(--runtime-bg)] " +
        TONE_CLASSES[tone] +
        " " +
        ANCHOR_CLASSES[anchor] +
        " " +
        (visible ? "opacity-100 scale-100 pointer-events-auto " : "opacity-0 scale-90 pointer-events-none ") +
        (className ?? "")
      }
    >
      {children}
    </button>
  );
}

/* =============================================================
   BackToTopFab
   ============================================================= */

export type BackToTopFabProps = {
  /** ScrollY threshold (px) above which the FAB appears. Default 320. */
  readonly threshold?: number;
  /** Anchor position. Default bottom-right. */
  readonly anchor?: FabAnchor;
  /** Optional custom label for the button. */
  readonly label?: string;
  /** Optional alternative target ref to scroll to. */
  readonly targetRef?: React.RefObject<HTMLElement | null>;
};

export function BackToTopFab({
  threshold = 320,
  anchor = "bottom-right",
  label = "Back to top",
  targetRef
}: BackToTopFabProps) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  const onClick = useCallback(() => {
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [targetRef]);

  return (
    <FabBase visible={visible} anchor={anchor} label={label} onClick={onClick} tone="accent">
      <ArrowUp size={16} aria-hidden="true" />
      <span>Top</span>
    </FabBase>
  );
}

/* =============================================================
   BackToLatestFab
   ============================================================= */

export type BackToLatestFabProps = {
  /** Ref to the element whose top counts as "latest". Usually a feed's latest entry. */
  readonly latestRef: React.RefObject<HTMLElement | null>;
  /** Show the FAB once the latest element is this many pixels above the viewport. Default 240. */
  readonly threshold?: number;
  readonly anchor?: FabAnchor;
  readonly label?: string;
};

export function BackToLatestFab({
  latestRef,
  threshold = 240,
  anchor = "bottom-center",
  label = "Back to latest"
}: BackToLatestFabProps) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const check = () => {
      const el = latestRef.current;
      if (!el) {
        setVisible(false);
        return;
      }
      const rect = el.getBoundingClientRect();
      /* "latest" is above the current viewport by at least the threshold */
      setVisible(rect.bottom < -threshold);
    };
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    check();
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [latestRef, threshold]);

  const onClick = useCallback(() => {
    latestRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [latestRef]);

  return (
    <FabBase visible={visible} anchor={anchor} label={label} onClick={onClick} tone="accent">
      <ArrowDown size={16} aria-hidden="true" />
      <span>Back to latest</span>
    </FabBase>
  );
}

/* =============================================================
   RuntimeStatusFab
   ============================================================= */

export type RuntimeStatusItem = {
  readonly id: string;
  readonly label: string;
  readonly state: "live" | "preview" | "experimental" | "illustrative" | "blocked" | "offline" | "degraded";
  readonly detail?: string;
};

export type RuntimeStatusFabProps = {
  readonly items: ReadonlyArray<RuntimeStatusItem>;
  readonly anchor?: FabAnchor;
  readonly label?: string;
  /** Show the FAB only when there's something interesting. Default true. */
  readonly alwaysVisible?: boolean;
};

const STATE_TONE: Record<RuntimeStatusItem["state"], "success" | "warning" | "error"> = {
  live: "success",
  preview: "warning",
  experimental: "warning",
  illustrative: "warning",
  blocked: "error",
  offline: "error",
  degraded: "warning"
};

const STATE_BADGE_CLASS: Record<RuntimeStatusItem["state"], string> = {
  live: "border-[color:var(--runtime-success)] text-[color:var(--runtime-success)]",
  preview: "border-[color:var(--runtime-warning)] text-[color:var(--runtime-warning)]",
  experimental: "border-[color:var(--runtime-warning)] text-[color:var(--runtime-warning)]",
  illustrative: "border-[color:var(--runtime-warning)] text-[color:var(--runtime-warning)]",
  blocked: "border-[color:var(--runtime-error)] text-[color:var(--runtime-error)]",
  offline: "border-[color:var(--runtime-error)] text-[color:var(--runtime-error)]",
  degraded: "border-[color:var(--runtime-warning)] text-[color:var(--runtime-warning)]"
};

export function RuntimeStatusFab({
  items,
  anchor = "bottom-right",
  label = "Runtime status",
  alwaysVisible = true
}: RuntimeStatusFabProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  /* Close popover on outside click. */
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  /* Worst-state tone drives the FAB colour for honest signalling. */
  const worst: RuntimeStatusItem["state"] =
    items.find((i) => i.state === "blocked" || i.state === "offline")?.state ??
    items.find((i) => i.state === "degraded")?.state ??
    items.find((i) => i.state === "preview" || i.state === "experimental" || i.state === "illustrative")?.state ??
    "live";

  /* Honest empty state */
  if (items.length === 0 && !alwaysVisible) return null;

  return (
    <div ref={ref}>
      <FabBase
        visible={alwaysVisible || items.length > 0}
        anchor={anchor}
        label={label}
        onClick={() => setOpen((v) => !v)}
        tone={STATE_TONE[worst]}
      >
        <Activity size={16} aria-hidden="true" />
        <span>
          {items.length} {items.length === 1 ? "runtime" : "runtimes"}
        </span>
      </FabBase>
      {open && (
        <div
          role="dialog"
          aria-label={label}
          className={
            "fixed z-50 max-h-[60vh] w-80 overflow-auto rounded-2xl border " +
            "border-[color:var(--runtime-border)] bg-[color:var(--runtime-panel)] " +
            "p-3 shadow-2xl backdrop-blur " +
            (anchor === "bottom-right"
              ? "bottom-20 right-5 "
              : anchor === "bottom-left"
                ? "bottom-20 left-5 "
                : "bottom-20 left-1/2 -translate-x-1/2 ")
          }
        >
          <div className="text-xs uppercase tracking-wider mb-2 text-[color:var(--runtime-muted)]">{label}</div>
          {items.length === 0 ? (
            <p className="text-sm text-[color:var(--runtime-muted)]">No runtimes reported.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {items.map((it) => (
                <li key={it.id} className="flex items-start gap-2 text-sm">
                  <span
                    className={
                      "shrink-0 rounded-full border px-2 py-[1px] text-[10px] uppercase tracking-wider " +
                      STATE_BADGE_CLASS[it.state]
                    }
                  >
                    {it.state}
                  </span>
                  <div>
                    <div className="text-[color:var(--runtime-ink)]">{it.label}</div>
                    {it.detail ? (
                      <div className="text-xs text-[color:var(--runtime-muted)] mt-[2px]">{it.detail}</div>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
