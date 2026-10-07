"use client";

import { useCallback, useEffect, useState } from "react";
import { MobileBottomDock } from "./MobileBottomDock.tsx";
import { MobileCommandOverlay } from "./MobileCommandOverlay.tsx";
import { MobileRuntimeStatus } from "./MobileRuntimeStatus.tsx";
import { useMobileSwipe } from "./gestures.ts";

const DEFAULT_API_URL = "/api";

export function MobileRuntimeShell() {
  const [commandMode, setCommandMode] = useState<"ecosystem" | "search" | null>(null);
  const [statusOpen, setStatusOpen] = useState(false);
  const apiBaseUrl =
    readPublicEnv("NEXT_PUBLIC_API_URL") ?? readPublicEnv("NEXT_PUBLIC_API_BASE_URL") ?? DEFAULT_API_URL;

  const closeSheets = useCallback(() => {
    setCommandMode(null);
    setStatusOpen(false);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSheets();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeSheets]);

  useMobileSwipe({
    onSwipe: (direction) => {
      if (direction === "down") closeSheets();
      if (direction === "up" && !commandMode && !statusOpen) setCommandMode("ecosystem");
    }
  });

  return (
    <div
      className="mobile-runtime-root"
      aria-label="Mobile Vaigyaaniq runtime shell"
      data-command-open={commandMode !== null}
      data-status-open={statusOpen}
    >
      <MobileCommandOverlay
        open={commandMode !== null}
        mode={commandMode ?? "ecosystem"}
        onClose={() => setCommandMode(null)}
      />
      <MobileRuntimeStatus apiBaseUrl={apiBaseUrl} open={statusOpen} onClose={() => setStatusOpen(false)} />
      <MobileBottomDock
        onOpenCommand={() => {
          setStatusOpen(false);
          setCommandMode("ecosystem");
        }}
        onOpenStatus={() => {
          setCommandMode(null);
          setStatusOpen(true);
        }}
      />
    </div>
  );
}

function readPublicEnv(name: string): string | undefined {
  const runtime = globalThis as { process?: { env?: Record<string, string | undefined> } };
  return runtime.process?.env?.[name];
}
