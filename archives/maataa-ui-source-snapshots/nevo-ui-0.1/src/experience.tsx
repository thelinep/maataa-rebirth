import { useId, type AudioHTMLAttributes, type ChangeEventHandler, type ReactNode, type VideoHTMLAttributes } from "react";

const classes = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(" ");

export type ChartPoint = { label: string; value: number };
export type ChartTone = "accent" | "success" | "attention" | "danger";

function chartPoints(values: readonly ChartPoint[]) {
  const max = Math.max(...values.map(({ value }) => value), 0);
  const min = Math.min(...values.map(({ value }) => value), 0);
  const span = max - min || 1;
  return values.map(({ value }, index) => {
    const x = values.length === 1 ? 50 : 4 + (92 * index) / (values.length - 1);
    const y = 94 - ((value - min) / span) * 88;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");
}

/** Accessible SVG trend graph. The numeric summary remains available as text. */
export function TrendChart({ label, values, summary, tone = "accent", className }: { label: string; values: readonly ChartPoint[]; summary?: string; tone?: ChartTone; className?: string }) {
  const text = values.map(({ label: pointLabel, value }) => `${pointLabel}: ${value}`).join(", ");
  if (values.length === 0) return <figure className={classes("maataa-ui", "maataa-ui__chart", className)}><figcaption><strong>{label}</strong><span>No values are available.</span></figcaption></figure>;
  return <figure className={classes("maataa-ui", "maataa-ui__chart", `maataa-ui__chart--${tone}`, className)}>
    <figcaption><strong>{label}</strong><span>{summary ?? text}</span></figcaption>
    <svg viewBox="0 0 100 100" role="img" aria-label={`${label}. ${text}`} preserveAspectRatio="none">
      <path className="maataa-ui__chart-grid" d="M4 6H96M4 50H96M4 94H96" />
      <polyline className="maataa-ui__chart-line" points={chartPoints(values)} />
      {values.map((point, index) => {
        const [x, y] = chartPoints(values).split(" ")[index].split(",");
        return <circle className="maataa-ui__chart-point" cx={x} cy={y} r="2.6" key={point.label}><title>{`${point.label}: ${point.value}`}</title></circle>;
      })}
    </svg>
    <ol className="maataa-ui__chart-values" aria-label={`${label} values`}>{values.map(point => <li key={point.label}><span>{point.label}</span><b>{point.value}</b></li>)}</ol>
  </figure>;
}

/** Compact data graph with its exact values available in the DOM. */
export function BarChart({ label, values, summary, tone = "accent", className }: { label: string; values: readonly ChartPoint[]; summary?: string; tone?: ChartTone; className?: string }) {
  const maximum = Math.max(...values.map(({ value }) => value), 0) || 1;
  return <figure className={classes("maataa-ui", "maataa-ui__bar-chart", `maataa-ui__bar-chart--${tone}`, className)}>
    <figcaption><strong>{label}</strong><span>{summary ?? values.map(point => `${point.label}: ${point.value}`).join(", ")}</span></figcaption>
    <ol>{values.map(point => <li key={point.label}><span>{point.label}</span><div aria-hidden="true"><i style={{ width: `${Math.max(0, (point.value / maximum) * 100)}%` }} /></div><b>{point.value}</b></li>)}</ol>
  </figure>;
}

/** File-selection control only. Uploading or processing media remains application-owned. */
export function MediaInput({ label, kind, hint, name, id, onChange, required = false, className }: { label: string; kind: "audio" | "video"; hint?: string; name?: string; id?: string; onChange?: ChangeEventHandler<HTMLInputElement>; required?: boolean; className?: string }) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return <label htmlFor={inputId} className={classes("maataa-ui", "maataa-ui__media-input", className)}><span><strong>{label}</strong>{hint ? <small>{hint}</small> : null}</span><input id={inputId} name={name} type="file" accept={`${kind}/*`} required={required} aria-label={label} onChange={onChange} /><em>Select {kind}</em></label>;
}

/** Native accessible audio output with optional transcript access. */
export function AudioOutput({ label, transcriptHref, transcriptLabel = "Open transcript", className, ...props }: { label: string; transcriptHref?: string; transcriptLabel?: string; className?: string } & AudioHTMLAttributes<HTMLAudioElement>) {
  return <section className={classes("maataa-ui", "maataa-ui__media-output", className)} aria-label={label}><div><strong>{label}</strong><span>Audio preview</span></div><audio {...props} controls preload={props.preload ?? "metadata"}>{props.children}</audio>{transcriptHref ? <a href={transcriptHref}>{transcriptLabel}</a> : null}</section>;
}

/** Native accessible video output. Captions can be supplied as children via <track>. */
export function VideoOutput({ label, className, ...props }: { label: string; className?: string } & VideoHTMLAttributes<HTMLVideoElement>) {
  return <section className={classes("maataa-ui", "maataa-ui__media-output", className)} aria-label={label}><div><strong>{label}</strong><span>Video preview</span></div><video {...props} controls preload={props.preload ?? "metadata"}>{props.children}</video></section>;
}

export function Widget({ title, description, action, children, className }: { title: string; description?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return <aside className={classes("maataa-ui", "maataa-ui__widget", className)} aria-label={title}><header><div><strong>{title}</strong>{description ? <span>{description}</span> : null}</div>{action}</header><div>{children}</div></aside>;
}

/** Tool surface that exposes availability as data instead of implying a connected provider. */
export function ToolCard({ title, description, status = "Available in this workspace", action, children, className }: { title: string; description: string; status?: string; action?: ReactNode; children?: ReactNode; className?: string }) {
  return <section className={classes("maataa-ui", "maataa-ui__tool-card", className)}><div><span className="maataa-ui__tool-status">{status}</span><h3>{title}</h3><p>{description}</p></div>{children ? <div className="maataa-ui__tool-content">{children}</div> : null}{action ? <footer>{action}</footer> : null}</section>;
}
