"use client";

import { useEffect, useMemo, useState } from "react";

type RuntimePulseProps = {
  apiBaseUrl?: string;
  compact?: boolean;
};

type RuntimeState = "checking" | "operational" | "degraded";

export function RuntimePulse({ apiBaseUrl, compact = false }: RuntimePulseProps) {
  const [state, setState] = useState<RuntimeState>("checking");
  const healthUrl = useMemo(() => `${(apiBaseUrl ?? readPublicEnv("NEXT_PUBLIC_API_URL") ?? readPublicEnv("NEXT_PUBLIC_API_BASE_URL") ?? "/api").replace(/\/$/, "")}/health`, [apiBaseUrl]);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 4500);

    fetch(healthUrl, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          setState("degraded");
          return;
        }
        const body = (await response.json()) as { ok?: boolean };
        setState(body.ok ? "operational" : "degraded");
      })
      .catch(() => setState("degraded"))
      .finally(() => window.clearTimeout(timeout));

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [healthUrl]);

  return (
    <span className={`runtime-pulse runtime-pulse-${state}${compact ? " runtime-pulse-compact" : ""}`} aria-label={`Runtime status: ${state}`}>
      <span className="runtime-pulse-dot" />
      <span>{state === "checking" ? "Checking" : state === "operational" ? "Operational" : "Degraded"}</span>
    </span>
  );
}

function readPublicEnv(name: string): string | undefined {
  const runtime = globalThis as { process?: { env?: Record<string, string | undefined> } };
  return runtime.process?.env?.[name];
}
