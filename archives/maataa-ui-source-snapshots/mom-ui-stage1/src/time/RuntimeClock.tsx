"use client";

import { formatRuntimeDate } from "@maataa/time-runtime";
import { useEffect, useState } from "react";

const PLACEHOLDER = "—";

export function RuntimeClock() {
  // Seeded null (not `new Date()`) so the server render and the client's
  // first hydration pass produce identical markup — new Date() evaluated
  // once on the server and again during client hydration are never the
  // same instant, which is a hydration mismatch. The real clock only
  // starts ticking after mount, entirely client-side.
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-zinc-300">
      <div className="text-xs font-bold uppercase tracking-[0.18em] text-amber-300">Runtime clock</div>
      <div className="mt-2 font-mono text-white">{now ? formatRuntimeDate(now, "iso") : PLACEHOLDER}</div>
      <div className="mt-1 font-mono">
        {now ? formatRuntimeDate(now, "hkd") : PLACEHOLDER} / {now ? formatRuntimeDate(now, "hemant-samwat") : PLACEHOLDER}
      </div>
    </div>
  );
}
