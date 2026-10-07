"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Hook: returns a boolean indicating whether the chrome should currently be
 * visible based on scroll direction. Default policy:
 *   - At top of page (scrollY < showAtTopThreshold): always visible
 *   - Scrolling down past hideThreshold: hide
 *   - Scrolling up: show
 *
 * SSR-safe: returns true during server render, updates after mount.
 */
function useScrollDirectionVisibility(opts?: {
  hideThreshold?: number;
  showAtTopThreshold?: number;
  rootRef?: React.RefObject<HTMLElement | null>;
}): boolean {
  const hideThreshold = opts?.hideThreshold ?? 6;
  const showAtTopThreshold = opts?.showAtTopThreshold ?? 80;
  const lastYRef = useRef<number>(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const root = opts?.rootRef?.current ?? window;
    const getY = () => (root === window ? window.scrollY : (root as HTMLElement).scrollTop);

    const onScroll = () => {
      const y = getY();
      if (y < showAtTopThreshold) {
        setVisible(true);
        lastYRef.current = y;
        return;
      }
      const delta = y - lastYRef.current;
      if (Math.abs(delta) < hideThreshold) return;
      setVisible(delta < 0); // scrolling up → show
      lastYRef.current = y;
    };

    (root as Window | HTMLElement).addEventListener("scroll", onScroll as EventListener, { passive: true });
    return () => (root as Window | HTMLElement).removeEventListener("scroll", onScroll as EventListener);
  }, [hideThreshold, showAtTopThreshold, opts?.rootRef]);

  return visible;
}

/* =============================================================
   AutoHideHeader
   ============================================================= */

export type AutoHideHeaderProps = {
  readonly children: ReactNode;
  readonly className?: string;
  /** Pixel scroll delta below which scroll events are ignored. Default 6. */
  readonly hideThreshold?: number;
  /** Always show when scrollY is below this. Default 80. */
  readonly showAtTopThreshold?: number;
  /** Optional scroll-root ref (if your page scrolls inside a container). */
  readonly rootRef?: React.RefObject<HTMLElement | null>;
};

/**
 * Fixed-position header that hides on scroll-down and shows on scroll-up.
 * Pure structural component: brings its own positioning + transition; you
 * provide the inner header content.
 */
export function AutoHideHeader({
  children,
  className,
  hideThreshold,
  showAtTopThreshold,
  rootRef
}: AutoHideHeaderProps) {
  const visible = useScrollDirectionVisibility({ hideThreshold, showAtTopThreshold, rootRef });
  return (
    <header
      role="banner"
      data-visible={visible ? "true" : "false"}
      className={
        "fixed inset-x-0 top-0 z-40 transition-transform duration-300 ease-out " +
        "border-b border-[color:var(--runtime-border)] bg-[color:var(--runtime-panel)] " +
        "backdrop-blur supports-[backdrop-filter]:bg-[color:var(--runtime-panel)]/85 " +
        (visible ? "translate-y-0 " : "-translate-y-full ") +
        (className ?? "")
      }
    >
      {children}
    </header>
  );
}

/* =============================================================
   AutoHideFooterDock
   ============================================================= */

export type AutoHideFooterDockProps = AutoHideHeaderProps;

/**
 * Fixed-position bottom dock that hides on scroll-down, shows on scroll-up.
 * Mirror of AutoHideHeader for the bottom edge. Designed for mobile/dock UX
 * patterns where the dock should stay out of the way during content scrolling.
 */
export function AutoHideFooterDock({
  children,
  className,
  hideThreshold,
  showAtTopThreshold,
  rootRef
}: AutoHideFooterDockProps) {
  const visible = useScrollDirectionVisibility({ hideThreshold, showAtTopThreshold, rootRef });
  return (
    <div
      role="contentinfo"
      data-visible={visible ? "true" : "false"}
      className={
        "fixed inset-x-3 bottom-3 z-40 transition-transform duration-300 ease-out " +
        "rounded-2xl border border-[color:var(--runtime-border)] bg-[color:var(--runtime-panel)] " +
        "backdrop-blur supports-[backdrop-filter]:bg-[color:var(--runtime-panel)]/85 " +
        (visible ? "translate-y-0 " : "translate-y-[calc(100%+1.5rem)] ") +
        (className ?? "")
      }
    >
      {children}
    </div>
  );
}
