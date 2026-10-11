// On-device measurement mode for the demo preview.
// Enabled only by `?measure=1` in the URL (before the `#`), e.g.
//   http://<mac-ip>:4173/?measure=1#/playground
// It never runs in normal use or in automated tests. It reads browser
// performance APIs and shows the results in a small panel the reviewer can
// copy. Nothing is sent anywhere.

type Metrics = {
  readyMs: number | null;
  verifiedInteractionMs: number | null;
  dialogTapMs: number | null;
  dialogResponseMs: number | null;
  lcpMs: number | null;
  inpMs: number | null;
  interactions: number;
  longTaskCount: number;
  longTaskTotalMs: number;
  heapBytes: number | null;
  jsBytes: number;
};

const UNSUPPORTED = "not supported in this browser";

export function isMeasureMode(): boolean {
  try {
    return new URLSearchParams(window.location.search).get("measure") === "1";
  } catch {
    return false;
  }
}

function observe(type: string, callback: (entries: PerformanceEntry[]) => void, extra: Record<string, unknown> = {}): boolean {
  const supported = (PerformanceObserver as unknown as { supportedEntryTypes?: readonly string[] }).supportedEntryTypes ?? [];
  if (!supported.includes(type)) return false;
  try {
    new PerformanceObserver((list) => callback(list.getEntries())).observe({ type, buffered: true, ...extra } as PerformanceObserverInit);
    return true;
  } catch {
    return false;
  }
}

function fmtMs(value: number | null, supported = true): string {
  if (!supported) return UNSUPPORTED;
  return value === null ? "—" : `${Math.round(value)} ms`;
}

function fmtBytes(value: number | null, supported = true): string {
  if (!supported) return UNSUPPORTED;
  return value === null ? "—" : `${(value / 1048576).toFixed(2)} MB`;
}

export function startMeasureMode(): void {
  const m: Metrics = { readyMs: null, verifiedInteractionMs: null, dialogTapMs: null, dialogResponseMs: null, lcpMs: null, inpMs: null, interactions: 0, longTaskCount: 0, longTaskTotalMs: 0, heapBytes: null, jsBytes: 0 };
  const interactionMax = new Map<number, number>();

  const lcpSupported = observe("largest-contentful-paint", (entries) => {
    const last = entries[entries.length - 1];
    if (last) m.lcpMs = last.startTime;
  });
  const longTaskSupported = observe("longtask", (entries) => {
    for (const entry of entries) {
      m.longTaskCount += 1;
      m.longTaskTotalMs += entry.duration;
    }
  });
  const inpSupported = observe(
    "event",
    (entries) => {
      for (const entry of entries as Array<PerformanceEntry & { interactionId?: number }>) {
        if (!entry.interactionId) continue;
        interactionMax.set(entry.interactionId, Math.max(interactionMax.get(entry.interactionId) ?? 0, entry.duration));
      }
      m.interactions = interactionMax.size;
      // Report the worst interaction (an upper bound of INP for short sessions).
      m.inpMs = interactionMax.size ? Math.max(...interactionMax.values()) : null;
    },
    { durationThreshold: 16 },
  );

  const memory = (performance as unknown as { memory?: { usedJSHeapSize: number } }).memory;
  const heapSupported = !!memory;

  // Record when "Open dialog" is tapped, so human reaction/scroll time can be
  // separated from the app's own response time.
  document.addEventListener(
    "click",
    (event) => {
      const button = (event.target as Element | null)?.closest?.("button");
      if (button && button.textContent?.trim() === "Open dialog" && m.verifiedInteractionMs === null) {
        m.dialogTapMs = event.timeStamp;
      }
    },
    { capture: true },
  );

  // Same milestones as scripts/measure-runtime-performance.mjs:
  // demo ready marker, then the "Keyboard dialog" opened from /#/playground.
  const domObserver = new MutationObserver(() => {
    if (m.readyMs === null && document.querySelector('[data-maataa-demo-ready="true"]')) m.readyMs = performance.now();
    if (m.verifiedInteractionMs === null) {
      const dialogs = Array.from(document.querySelectorAll('[role="dialog"]'));
      if (dialogs.some((d) => (d.getAttribute("aria-label") ?? d.textContent ?? "").includes("Keyboard dialog"))) {
        m.verifiedInteractionMs = performance.now();
        if (m.dialogTapMs !== null) m.dialogResponseMs = m.verifiedInteractionMs - m.dialogTapMs;
      }
    }
  });
  domObserver.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-maataa-demo-ready", "role"] });

  const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  const navType = nav?.type ?? "unknown";
  const cold = nav ? nav.transferSize > 0 : null;

  const panel = document.createElement("section");
  panel.setAttribute("aria-label", "Measurement results");
  panel.setAttribute("data-maataa-measure-panel", "true");
  panel.style.cssText =
    "position:fixed;left:8px;bottom:8px;z-index:2147483647;max-width:min(360px,calc(100vw - 16px));max-height:60vh;overflow:auto;" +
    "background:#111;color:#f5f5f5;border:1px solid #c9a227;border-radius:10px;padding:10px 12px;font:12px/1.45 ui-monospace,Menlo,monospace;box-shadow:0 6px 20px #0009";
  const pre = document.createElement("pre");
  pre.style.cssText = "margin:0 0 8px;white-space:pre-wrap;word-break:break-word";
  const copy = document.createElement("button");
  copy.type = "button";
  copy.textContent = "Copy results";
  const hide = document.createElement("button");
  hide.type = "button";
  hide.textContent = "Hide";
  for (const b of [copy, hide]) b.style.cssText = "margin-right:8px;padding:6px 10px;border-radius:6px;border:1px solid #c9a227;background:#2a2410;color:#f5f5f5;font:inherit";
  panel.append(pre, copy, hide);

  const text = (): string => {
    const n = navigator as Navigator & { deviceMemory?: number; connection?: { effectiveType?: string } };
    if (heapSupported && memory) m.heapBytes = memory.usedJSHeapSize;
    m.jsBytes = performance
      .getEntriesByType("resource")
      .filter((r) => r.name.split("?")[0].endsWith(".js"))
      .reduce((t, r) => t + ((r as PerformanceResourceTiming).decodedBodySize ?? 0), 0);
    return [
      "MAATAA measure mode",
      `Route: ${location.hash || "#/"}   Load: ${navType}${cold === null ? "" : cold ? " (network)" : " (cache)"}`,
      `Device: ${n.hardwareConcurrency ?? "?"} cores, ${n.deviceMemory ?? "?"} GB (reported), ${innerWidth}x${innerHeight} @${devicePixelRatio}x, net ${n.connection?.effectiveType ?? "?"}`,
      `UA: ${navigator.userAgent}`,
      "",
      `Ready (demo mounted): ${fmtMs(m.readyMs)}`,
      `Dialog response (tap to open): ${fmtMs(m.dialogResponseMs)}`,
      `Comparable to automated check (ready + response): ${m.readyMs !== null && m.dialogResponseMs !== null ? fmtMs(m.readyMs + m.dialogResponseMs) : "—"}`,
      `Raw: tap at ${fmtMs(m.dialogTapMs)}, dialog at ${fmtMs(m.verifiedInteractionMs)} (includes your own delay)`,
      `LCP: ${fmtMs(m.lcpMs, lcpSupported)}`,
      `INP (worst of ${m.interactions}): ${fmtMs(m.inpMs, inpSupported)}`,
      `Long tasks: ${longTaskSupported ? `${m.longTaskCount}, total ${Math.round(m.longTaskTotalMs)} ms` : UNSUPPORTED}`,
      `JS heap: ${fmtBytes(m.heapBytes, heapSupported)}`,
      `JS loaded: ${fmtBytes(m.jsBytes)}`,
    ].join("\n");
  };

  copy.addEventListener("click", async () => {
    const value = text();
    try {
      await navigator.clipboard.writeText(value);
      copy.textContent = "Copied";
    } catch {
      const range = document.createRange();
      range.selectNodeContents(pre);
      const selection = getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      copy.textContent = "Selected — copy manually";
    }
    setTimeout(() => (copy.textContent = "Copy results"), 2000);
  });
  hide.addEventListener("click", () => {
    const hidden = pre.style.display === "none";
    pre.style.display = hidden ? "" : "none";
    hide.textContent = hidden ? "Hide" : "Show";
  });

  const mount = () => {
    document.body.appendChild(panel);
    const tick = () => {
      if (pre.style.display !== "none") pre.textContent = text();
    };
    tick();
    setInterval(tick, 1000);
  };
  if (document.body) mount();
  else addEventListener("DOMContentLoaded", mount, { once: true });
}
