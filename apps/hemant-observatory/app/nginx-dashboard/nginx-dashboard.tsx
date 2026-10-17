"use client";

import { useMemo, useState } from "react";
import { Button } from "@maataa/ui/actions";
import { Card } from "@maataa/ui/surfaces";

const frames = [
  { id: "overview", label: "Overview", hint: "Service summary and request flow" },
  { id: "sites", label: "Sites", hint: "Virtual hosts and configured domains" },
  { id: "upstreams", label: "Upstreams", hint: "Backend pools and health checks" },
  { id: "tls", label: "TLS & certificates", hint: "Certificate and protocol inventory" },
  { id: "logs", label: "Access logs", hint: "Request records and filters" },
  { id: "security", label: "Security", hint: "Policies, limits and audit trail" },
  { id: "configuration", label: "Configuration", hint: "Configuration review and validation" },
  { id: "observability", label: "Observability", hint: "Metrics, logs and traces" },
  { id: "settings", label: "Settings", hint: "Runtime and operator preferences" },
] as const;

type FrameId = (typeof frames)[number]["id"];
type SiteRow = { name: string; host: string; source: string; tls: string; state: string };

const siteRows: SiteRow[] = [
  { name: "API hostname", host: "api.allb.xyz", source: "Product domain map · proposed", tls: "Not verified", state: "Unverified" },
  { name: "Web hostname", host: "www.allb.xyz", source: "Provided for this preview · config not found", tls: "Not verified", state: "Unverified" },
];

function SampleTag() {
  return <span className="nginx-sample-tag">Preview data</span>;
}

function Metric({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <div className="nginx-metric"><span>{label}</span><strong>{value}</strong><small>{detail}</small></div>;
}

function SimpleTable({ caption, columns, rows }: { caption: string; columns: string[]; rows: string[][] }) {
  return (
    <div className="nginx-table-scroll">
      <table className="nginx-table">
        <caption>{caption}</caption>
        <thead><tr>{columns.map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead>
        <tbody>{rows.map((row, index) => <tr key={`${caption}-${index}`}>{row.map((cell, cellIndex) => <td key={`${cell}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function TrafficChart({ tone = "gold" }: { tone?: "gold" | "red" | "violet" }) {
  return (
    <div className={`nginx-chart nginx-chart-${tone}`} role="img" aria-label="Illustrative sample chart">
      <div className="nginx-chart-label"><span>Illustrative request pattern</span><SampleTag /></div>
      <svg viewBox="0 0 680 170" preserveAspectRatio="none" aria-hidden="true">
        <path className="nginx-chart-fill" d="M0 132 C48 118 60 142 96 126 S151 110 184 119 S240 93 278 103 S333 68 368 82 S414 54 452 72 S511 38 544 58 S603 31 628 49 S658 42 680 27 V170 H0Z" />
        <path className="nginx-chart-line" d="M0 132 C48 118 60 142 96 126 S151 110 184 119 S240 93 278 103 S333 68 368 82 S414 54 452 72 S511 38 544 58 S603 31 628 49 S658 42 680 27" />
      </svg>
      <div className="nginx-chart-axis"><span>Earlier</span><span>Later</span></div>
    </div>
  );
}

function FrameBody({ id, siteRowsForView }: { id: FrameId; siteRowsForView: SiteRow[] }) {
  switch (id) {
    case "overview":
      return <>
        <div className="nginx-metrics">
          <Metric label="Requests" value="Sample" detail="No live counter connected" />
          <Metric label="Active connections" value="Unknown" detail="Runtime not queried" />
          <Metric label="5xx rate" value="Unknown" detail="Runtime not queried" />
          <Metric label="p95 latency" value="Unknown" detail="Runtime not queried" />
        </div>
        <div className="nginx-two-col">
          <TrafficChart />
          <SimpleTable caption="Upstream health · sample frame" columns={["Pool", "State", "Targets"]} rows={[["app-web", "Not checked", "—"], ["app-api", "Not checked", "—"], ["static", "Not checked", "—"]]} />
        </div>
      </>;
    case "sites":
      return <>
        <div className="nginx-notice" role="note">The two hostnames below were provided for this dashboard. This preview has not loaded DNS, TLS, or Nginx configuration.</div>
        <SimpleTable caption="Host inventory · configuration unverified" columns={["Site", "Host / domain", "Source", "TLS", "State"]} rows={siteRowsForView.map((row) => [row.name, row.host, row.source, row.tls, row.state])} />
        {siteRowsForView.length === 0 && <p className="nginx-empty">No hostname matches this search.</p>}
      </>;
    case "upstreams":
      return <SimpleTable caption="Backend pools · sample structure, no probes run" columns={["Pool", "Balancing", "Health check", "State", "Targets"]} rows={[["app-web", "Round robin", "Not configured", "Unknown", "—"], ["app-api", "Least connections", "Not configured", "Unknown", "—"], ["worker-pool", "IP hash", "Not configured", "Unknown", "—"]]} />;
    case "tls":
      return <>
        <SimpleTable caption="Certificate inventory · not queried" columns={["Hostname", "Issuer", "Expires", "State"]} rows={[["api.allb.xyz", "Unknown", "Unknown", "Not verified"], ["www.allb.xyz", "Unknown", "Unknown", "Not verified"]]} />
        <div className="nginx-notice" role="status">Certificate status and TLS policy have not been checked.</div>
      </>;
    case "logs":
      return <>
        <div className="nginx-filter-row"><label htmlFor="log-filter">Log source</label><input id="log-filter" value="" readOnly placeholder="No log source connected" /></div>
        <SimpleTable caption="Access log frame · no records loaded" columns={["Time", "Method", "Path", "Status", "Source"]} rows={[["—", "GET", "/", "—", "Not connected"], ["—", "POST", "/api/…", "—", "Not connected"], ["—", "GET", "/assets/…", "—", "Not connected"], ["—", "GET", "/health", "—", "Not connected"]]} />
        <p className="nginx-muted">Times, status codes, clients, and response durations are not available.</p>
      </>;
    case "security":
      return <>
        <div className="nginx-state-strip"><span>Policy state <strong>Not evaluated</strong></span><span>Audit feed <strong>Not connected</strong></span></div>
        <SimpleTable caption="Rule inventory · no active policy loaded" columns={["Rule type", "Scope", "Limit / action", "State"]} rows={[["Rate limit", "API route", "Not set", "Not configured"], ["Access policy", "Admin path", "Not set", "Not configured"], ["Request filter", "All sites", "Not set", "Not configured"]]} />
      </>;
    case "configuration":
      return <div className="nginx-two-col nginx-config-layout">
        <div className="nginx-code-panel" aria-label="Nginx configuration placeholder">
          <div className="nginx-code-title">nginx.conf <span>not loaded</span></div>
          <pre><code>{[
            "# No Nginx configuration is connected to this preview.",
            "# Hostnames supplied for review:",
            "#   api.allb.xyz",
            "#   www.allb.xyz",
            "#",
            "# Routes, upstreams, TLS policy, and certificates:",
            "#   unresolved — provide config evidence before review",
          ].join("\n")}</code></pre>
        </div>
        <div className="nginx-validation-panel"><strong>Validation not run</strong><p>This page has no Nginx process or configuration file to validate.</p><Button variant="secondary" disabled title="No Nginx service is connected">Validate config</Button></div>
      </div>;
    case "observability":
      return <>
        <div className="nginx-metrics">
          <Metric label="Requests" value="Unknown" detail="No telemetry source" />
          <Metric label="Errors" value="Unknown" detail="No telemetry source" />
          <Metric label="Latency" value="Unknown" detail="No telemetry source" />
          <Metric label="Traces" value="Not connected" detail="No trace exporter" />
        </div>
        <div className="nginx-two-col"><TrafficChart /><TrafficChart tone="red" /></div>
        <p className="nginx-muted">Charts are visual examples only; they contain no collected values.</p>
      </>;
    case "settings":
      return <>
        <div className="nginx-settings-grid">
          <div><h3>Runtime</h3><p>Service state: <strong>Not checked</strong></p><p>Config path: <code>Not supplied</code></p><Button disabled title="No service connection">Reload Nginx</Button></div>
          <div><h3>Backup &amp; restore</h3><p>No configuration backup is available in this preview.</p><Button variant="secondary" disabled>Backup config</Button></div>
          <div><h3>Access policy</h3><p>Operator roles and access records have not been loaded.</p><Button variant="secondary" disabled>Review access</Button></div>
        </div>
        <div className="nginx-notice" role="note">Controls are disabled until a reviewed service connector and an authorized operator flow exist.</div>
      </>;
  }
}

function DashboardFrame({ id, onFocus, siteRowsForView }: { id: FrameId; onFocus: (id: FrameId) => void; siteRowsForView: SiteRow[] }) {
  const frame = frames.find((item) => item.id === id)!;
  return <Card className={`nginx-frame nginx-frame-${id}`}>
    <header className="nginx-frame-header">
      <div><h2>{frame.label}</h2><p>{frame.hint}</p></div>
      <div className="nginx-frame-actions"><SampleTag /><Button variant="ghost" onClick={() => onFocus(id)} aria-label={`Focus ${frame.label} frame`}>Focus</Button></div>
    </header>
    <div className="nginx-frame-body"><FrameBody id={id} siteRowsForView={siteRowsForView} /></div>
  </Card>;
}

function FrameStates() {
  return <section className="nginx-states" aria-labelledby="nginx-states-title">
    <div className="nginx-section-heading"><div><h2 id="nginx-states-title">Frame states</h2><p>Examples shown without an active Nginx connection.</p></div></div>
    <div className="nginx-state-grid">
      <div className="nginx-state-example"><span className="state-dot" /><div><strong>Normal</strong><p>Configuration not loaded; runtime state remains unknown.</p></div></div>
      <div className="nginx-state-example"><span className="state-marker" aria-hidden="true" /><div><strong>Empty</strong><p>No sites or certificates have been imported.</p></div></div>
      <div className="nginx-state-example state-warning"><span className="state-marker" aria-hidden="true" /><div><strong>Validation warning</strong><p>Validation not run. Connect a reviewed config source first.</p></div></div>
      <div className="nginx-state-example"><span className="state-marker state-marker-outline" aria-hidden="true" /><div><strong>Confirmation frame</strong><p>A reload prompt belongs after a real service connector exists.</p></div></div>
    </div>
  </section>;
}

export default function NginxDashboard() {
  const [selected, setSelected] = useState<FrameId | "all">("all");
  const [search, setSearch] = useState("");
  const siteRowsForView = useMemo(() => {
    const query = search.trim().toLowerCase();
    return query ? siteRows.filter((row) => Object.values(row).some((value) => value.toLowerCase().includes(query))) : siteRows;
  }, [search]);
  const query = search.trim().toLowerCase();
  const visibleFrames = frames.filter((frame) => {
    if (selected !== "all" && frame.id !== selected) return false;
    if (!query) return selected === "all" || frame.id === selected;
    return frame.label.toLowerCase().includes(query)
      || frame.hint.toLowerCase().includes(query)
      || (frame.id === "sites" && siteRowsForView.length > 0);
  });

  return <main className="nginx-dashboard maataa-root" data-maataa-theme="dark">
    <header className="nginx-topbar">
      <a className="nginx-brand" href="#dashboard" aria-label="MAATAA Nginx Control overview"><span className="nginx-mark" aria-hidden="true">M</span><span>MAATAA <small>/ NGINX CONTROL</small></span></a>
      <label className="nginx-global-search"><span className="sr-only">Search frames and hostnames</span><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.3" /><path d="m15.5 15.5 4.3 4.3" /></svg><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search frames and hostnames…" /></label>
      <span className="nginx-preview-badge">Design preview · sample data</span>
    </header>
    <div className="nginx-layout" id="dashboard">
      <aside className="nginx-sidebar"><div className="nginx-sidebar-label">Workspace</div>
        <nav aria-label="Nginx dashboard frames">
          <button className={`nginx-nav-item${selected === "all" ? " is-active" : ""}`} aria-pressed={selected === "all"} onClick={() => setSelected("all")}>All frames</button>
          {frames.map((frame) => <button key={frame.id} className={`nginx-nav-item${selected === frame.id ? " is-active" : ""}`} aria-pressed={selected === frame.id} onClick={() => setSelected(frame.id)}><span className="nginx-nav-dot" aria-hidden="true" />{frame.label}</button>)}
        </nav>
        <div className="nginx-sidebar-note"><span className="nginx-status-indicator" />Preview only<p>No Nginx daemon or config file is connected.</p></div>
      </aside>
      <section className="nginx-main" aria-labelledby="nginx-title">
        <div className="nginx-page-heading"><div><h1 id="nginx-title">Infrastructure dashboard</h1><p>All frames are rendered on the server and locally navigable.</p></div><span className="nginx-runtime-state"><span className="nginx-status-indicator" />Runtime health unknown</span></div>
        <div className="nginx-host-banner" role="note"><strong>Hostnames in review</strong><span><code>api.allb.xyz</code><small>proposed in domain map; service not verified</small></span><span><code>www.allb.xyz</code><small>provided hostname; repository config not found</small></span></div>
        <div className={`nginx-frames${selected === "all" ? " nginx-frames-all" : " nginx-frames-single"}`}>
          {visibleFrames.map((frame) => <DashboardFrame key={frame.id} id={frame.id} onFocus={setSelected} siteRowsForView={siteRowsForView} />)}
        </div>
        {visibleFrames.length === 0 && <p className="nginx-empty" role="status">No dashboard frame matches “{search}”. Clear the search to see all frames.</p>}
        {selected === "all" ? <FrameStates /> : <div className="nginx-show-all"><Button variant="secondary" onClick={() => setSelected("all")}>Show all frames</Button></div>}
        <footer className="nginx-footer"><span>MAATAA UI components</span><span>Preview only · no service actions are available</span></footer>
      </section>
    </div>
  </main>;
}
