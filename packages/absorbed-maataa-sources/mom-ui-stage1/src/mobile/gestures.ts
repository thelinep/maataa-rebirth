"use client";

import { useEffect, useRef } from "react";
import { trackRuntimeEvent } from "../runtime/telemetry.ts";

type SwipeDirection = "left" | "right" | "up" | "down";

type SwipeOptions = {
  threshold?: number;
  onSwipe?: (direction: SwipeDirection) => void;
};

export function useMobileSwipe({ threshold = 56, onSwipe }: SwipeOptions) {
  const start = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches.item(0);
      if (!touch) return;
      start.current = { x: touch.clientX, y: touch.clientY };
    };

    const onTouchEnd = (event: TouchEvent) => {
      const origin = start.current;
      const touch = event.changedTouches.item(0);
      start.current = null;
      if (!origin || !touch) return;

      const deltaX = touch.clientX - origin.x;
      const deltaY = touch.clientY - origin.y;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      if (Math.max(absX, absY) < threshold) return;

      const direction: SwipeDirection = absX > absY ? (deltaX > 0 ? "right" : "left") : deltaY > 0 ? "down" : "up";
      onSwipe?.(direction);
      void trackRuntimeEvent("mobile_swipe", { direction });
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [onSwipe, threshold]);
}

export function mobileHaptic(style: "light" | "medium" = "light") {
  if (typeof navigator === "undefined" || !("vibrate" in navigator)) return;
  const duration = style === "medium" ? 18 : 8;
  navigator.vibrate(duration);
}
