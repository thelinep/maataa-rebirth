import { useCallback, useEffect, useState } from "react";

export type UseScrollBackToTopOptions = {
  /** The scroll position, in pixels, at which the control becomes visible. Defaults to 400. */
  threshold?: number;
  /** Scroll behavior used when the returned action is called. Defaults to `smooth`. */
  behavior?: ScrollBehavior;
};

export type UseScrollBackToTopResult = {
  /** Whether a back-to-top control should be shown. */
  isVisible: boolean;
  /** Scroll the document to its top edge. Safe to call during server rendering. */
  scrollToTop: () => void;
};

/** Tracks the page scroll position and provides an action for returning to the top. */
export function useScrollBackToTop({
  threshold = 400,
  behavior = "smooth",
}: UseScrollBackToTopOptions = {}): UseScrollBackToTopResult {
  const safeThreshold = Number.isFinite(threshold) ? Math.max(0, threshold) : 400;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateVisibility = () => {
      const scrollTop = window.scrollY ?? document.documentElement.scrollTop ?? 0;
      setIsVisible(scrollTop >= safeThreshold);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, [safeThreshold]);

  const scrollToTop = useCallback(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior });
  }, [behavior]);

  return { isVisible, scrollToTop };
}
