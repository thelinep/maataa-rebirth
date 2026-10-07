"use client";

import { useEffect, useMemo, useState } from "react";

type ProbeState = "checking" | "online" | "issue";

type LiveStatusMatrixProps = {
  apiBaseUrl: string;
  liveDomainCount: number;
  activeSystemCount: number;
};

export function LiveStatusMatrix({ apiBaseUrl, liveDomainCount, activeSystemCount }: LiveStatusMatrixProps) {
  const [apiState, setApiState] = useState<ProbeState>("checking");
  const healthUrl = useMemo(() => `${apiBaseUrl.replace(/\/$/, "")}/health`, [apiBaseUrl]);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 5000);

    fetch(healthUrl, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          setApiState("issue");
          return;
        }
        const data = (await response.json()) as { ok?: boolean };
        setApiState(data.ok ? "online" : "issue");
      })
      .catch(() => setApiState("issue"))
      .finally(() => window.clearTimeout(timeout));

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [healthUrl]);

  return (
    <div className="runtime-matrix-grid">
      <RuntimeStat label="API health" value={apiState === "checking" ? "Checking" : apiState === "online" ? "Online" : "Issue"} tone={apiState === "online" ? "good" : apiState === "issue" ? "risk" : "watch"} />
      <RuntimeStat label="Deployment" value="Live" tone="good" />
      <RuntimeStat label="Live domains" value={`${liveDomainCount}`} tone="good" />
      <RuntimeStat label="Active systems" value={`${activeSystemCount}`} tone="good" />
      <RuntimeStat label="Behind the scenes" value="Private" tone="watch" />
      <RuntimeStat label="Access status" value="Alpha live" tone="good" />
    </div>
  );
}

function RuntimeStat({ label, value, tone }: { label: string; value: string; tone: "good" | "watch" | "risk" }) {
  return (
    <div className={`runtime-stat runtime-stat-${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
