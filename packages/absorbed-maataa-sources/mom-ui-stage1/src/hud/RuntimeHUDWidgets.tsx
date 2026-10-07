"use client";

import type { RuntimeHUDWidgetProps, RuntimeHUDWidgetState } from "./types.ts";

const STATE_LABEL: Record<RuntimeHUDWidgetState, string> = {
  loading: "Loading",
  empty: "Empty",
  healthy: "Healthy",
  warning: "Warning",
  blocked: "Blocked"
};

export function RuntimeHUDWidget({
  title,
  state,
  description,
  data = [],
  emptyLabel,
  evidenceRef,
  className
}: RuntimeHUDWidgetProps) {
  return (
    <article className={["runtime-hud-widget", className ?? ""].join(" ")} data-state={state}>
      <header>
        <div>
          <p>{STATE_LABEL[state]}</p>
          <h3>{title}</h3>
        </div>
      </header>
      {description ? <div className="runtime-hud-widget-description">{description}</div> : null}
      {state === "loading" ? <p className="runtime-hud-empty">Loading runtime evidence...</p> : null}
      {state === "empty" || data.length === 0 ? (
        <p className="runtime-hud-empty">{emptyLabel ?? "No runtime data supplied."}</p>
      ) : null}
      {data.length > 0 ? (
        <dl>
          {data.map((item) => (
            <div key={item.label} data-mode={item.mode ?? state}>
              <dt>{item.label}</dt>
              <dd>{item.value ?? "No value reported"}</dd>
              {item.detail ? <small>{item.detail}</small> : null}
              {item.evidenceRef ? <code>{item.evidenceRef}</code> : null}
            </div>
          ))}
        </dl>
      ) : null}
      {evidenceRef ? <code className="runtime-hud-evidence-ref">{evidenceRef}</code> : null}
    </article>
  );
}

export function RuntimeHealthWidget(props: Omit<RuntimeHUDWidgetProps, "title"> & { readonly title?: string }) {
  return <RuntimeHUDWidget title={props.title ?? "Runtime Health"} {...props} />;
}

export function RuntimeTelemetryWidget(props: Omit<RuntimeHUDWidgetProps, "title"> & { readonly title?: string }) {
  return <RuntimeHUDWidget title={props.title ?? "Telemetry"} {...props} />;
}

export function RuntimeTopologyWidget(props: Omit<RuntimeHUDWidgetProps, "title"> & { readonly title?: string }) {
  return <RuntimeHUDWidget title={props.title ?? "Topology"} {...props} />;
}

export function RuntimeApprovalWidget(props: Omit<RuntimeHUDWidgetProps, "title"> & { readonly title?: string }) {
  return <RuntimeHUDWidget title={props.title ?? "Approvals"} {...props} />;
}

export function RuntimeRouteWidget(props: Omit<RuntimeHUDWidgetProps, "title"> & { readonly title?: string }) {
  return <RuntimeHUDWidget title={props.title ?? "Routes"} {...props} />;
}
