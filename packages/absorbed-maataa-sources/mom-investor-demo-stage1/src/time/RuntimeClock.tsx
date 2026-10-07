"use client";

import { formatRuntimeDate } from "@maataa/time-runtime";
import { useEffect, useState } from "react";

export function RuntimeClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-zinc-300">
      <div className="text-xs font-bold uppercase tracking-[0.18em] text-amber-300">Runtime clock</div>
      <div className="mt-2 font-mono text-white">{formatRuntimeDate(now, "iso")}</div>
      <div className="mt-1 font-mono">{formatRuntimeDate(now, "hkd")} / {formatRuntimeDate(now, "hemant-samwat")}</div>
    </div>
  );
}
