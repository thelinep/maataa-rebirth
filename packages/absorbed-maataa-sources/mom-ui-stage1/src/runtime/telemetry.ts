export type RuntimeTelemetryEventName =
  | "mobile_command_open"
  | "mobile_command_search"
  | "mobile_dock_click"
  | "mobile_quick_action"
  | "mobile_status_open"
  | "mobile_swipe";

export type RuntimeTelemetryPayload = Record<string, string | number | boolean | null | undefined>;

export type RuntimeTelemetry = (
  name: RuntimeTelemetryEventName,
  payload?: RuntimeTelemetryPayload
) => void | Promise<void>;

export async function trackRuntimeEvent(name: RuntimeTelemetryEventName, payload: RuntimeTelemetryPayload = {}) {
  const event = {
    name,
    payload,
    path: typeof window === "undefined" ? undefined : window.location.pathname,
    ts: new Date().toISOString()
  };

  if (readPublicEnv("NODE_ENV") !== "production") {
    console.info("[maataa-ui]", event);
    return;
  }

  try {
    await fetch("/api/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(event),
      keepalive: true
    });
  } catch {
    // Runtime telemetry must never break navigation or payment flows.
  }
}

function readPublicEnv(name: string): string | undefined {
  const runtime = globalThis as { process?: { env?: Record<string, string | undefined> } };
  return runtime.process?.env?.[name];
}
