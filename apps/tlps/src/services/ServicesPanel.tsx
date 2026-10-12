import React, { useMemo, useState } from "react";
import { Button, Input } from "@maataa/ui";
import { readTlpsDraft, tlpsStorageKey } from "../workflow";
import { ServiceError, type ProjectEvent, type ServiceMode, type SessionIdentity, type StoredProject, type TlpsServices } from "./contracts";
import { createMaataaServices } from "./maataaAuthApi";
import { createMockServices } from "./mocks";

const readPlan = () => {
  try { return localStorage.getItem(tlpsStorageKey) ?? ""; } catch { return ""; }
};

export function ServicesPanel({ createServices }: { createServices?: (mode: ServiceMode) => TlpsServices }) {
  const [mode, setMode] = useState<ServiceMode>("mock");
  const services = useMemo(() => (createServices ?? ((m: ServiceMode) => m === "mock" ? createMockServices() : createMaataaServices()))(mode), [mode, createServices]);
  const [credential, setCredential] = useState("");
  const [session, setSession] = useState<SessionIdentity | null>(null);
  const [project, setProject] = useState<StoredProject | null>(null);
  const [events, setEvents] = useState<ProjectEvent[]>([]);
  const [summary, setSummary] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [mockResults, setMockResults] = useState<string[]>([]);

  const run = async (task: () => Promise<void>) => {
    setBusy(true);
    setMessage("");
    try { await task(); } catch (error) {
      setMessage(error instanceof ServiceError || error instanceof Error ? error.message : "Something went wrong.");
    } finally { setBusy(false); }
  };
  const switchMode = (next: ServiceMode) => {
    services.auth.disconnect();
    setMode(next); setSession(null); setProject(null); setEvents([]); setCredential(""); setMessage("");
  };
  const connect = () => run(async () => { setSession(await services.auth.connect(credential)); setCredential(""); setMessage("Connected."); });
  const openProject = () => run(async () => {
    const title = readTlpsDraft(readPlan() || null).project.title.trim() || "Untitled TLPS plan";
    const opened = await services.projects.open(title);
    setProject(opened); setEvents(await services.projects.events());
    setMessage(`Project ${opened.title} is at version ${opened.currentVersion}.`);
  });
  const saveVersion = () => run(async () => {
    if (!project) return;
    const plan = readPlan();
    if (!plan) throw new Error("There is no local plan to save yet.");
    const saved = await services.projects.saveVersion({ baseVersion: project.currentVersion, summary, planJson: plan });
    setProject(saved); setEvents(await services.projects.events()); setSummary("");
    setMessage(`Saved version ${saved.currentVersion}.`);
  });
  const tryMock = (label: string, task: () => Promise<{ note: string; status: string }>) => run(async () => {
    const result = await task();
    setMockResults((list) => [`${label}: ${result.status} · ${result.note}`, ...list].slice(0, 6));
  });

  return (
    <section className="tlps-area-panel" aria-labelledby="tlps-services-title">
      <h2 id="tlps-services-title">Sign-in and server storage</h2>
      <fieldset className="tlps-services-mode">
        <legend>Connection</legend>
        <label><input type="radio" name="tlps-service-mode" checked={mode === "mock"} onChange={() => switchMode("mock")} /> Local mock (in memory, for trying the flow)</label>
        <label><input type="radio" name="tlps-service-mode" checked={mode === "maataa-auth-api"} onChange={() => switchMode("maataa-auth-api")} /> MAATAA Auth API on this computer</label>
      </fieldset>
      <p className="tlps-muted">
        {mode === "mock"
          ? "The mock keeps everything in memory and forgets it on reload."
          : "Start apps/maataa-auth-api, then paste a project token issued by an administrator. The token stays in memory only. The server keeps version summaries and plan digests; the plan itself stays in this browser."}
      </p>
      {!session ? (
        <div className="tlps-area-form">
          <label htmlFor="tlps-service-credential">
            <span>{mode === "mock" ? "Your name" : "Project token"}</span>
            <Input id="tlps-service-credential" type={mode === "mock" ? "text" : "password"} autoComplete="off" value={credential} onChange={(e) => setCredential(e.target.value)} />
          </label>
          <div className="tlps-area-actions"><Button variant="primary" disabled={busy || !credential.trim()} onClick={connect}>Connect</Button></div>
        </div>
      ) : (
        <div className="tlps-services-session">
          <p><strong>{session.principalId}</strong> · {session.projectId} · {session.scopes.join(", ")}{session.expiresAt ? ` · expires ${new Date(session.expiresAt * 1000).toLocaleString()}` : ""}</p>
          <div className="tlps-area-actions">
            {!project && <Button variant="primary" disabled={busy} onClick={openProject}>Open project from my plan</Button>}
            <Button variant="secondary" onClick={() => switchMode(mode)}>Disconnect</Button>
          </div>
          {project && (
            <>
              <div className="tlps-area-form">
                <label htmlFor="tlps-service-summary"><span>What changed in this version?</span>
                  <Input id="tlps-service-summary" maxLength={280} value={summary} onChange={(e) => setSummary(e.target.value)} />
                </label>
                <div className="tlps-area-actions"><Button variant="primary" disabled={busy || !summary.trim()} onClick={saveVersion}>Save current plan as version {project.currentVersion + 1}</Button></div>
              </div>
              <div className="tlps-table-wrap">
                <table className="tlps-area-table">
                  <caption className="sr-only">Saved versions</caption>
                  <thead><tr><th scope="col">Version</th><th scope="col">Summary</th><th scope="col">Plan digest</th><th scope="col">Size</th></tr></thead>
                  <tbody>
                    {project.versions.length === 0 ? <tr><td colSpan={4}>No versions yet.</td></tr> : project.versions.map((v) => (
                      <tr key={v.version}><td>v{v.version}</td><td>{v.summary}</td><td><code>{v.planDigest.slice(0, 19)}…</code></td><td>{v.planBytes} bytes</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="tlps-muted">Activity: {events.map((event) => `${event.action} v${event.version}`).join(" · ") || "none"}</p>
            </>
          )}
        </div>
      )}
      <p className="tlps-area-boundary" role="status">{message || "Not connected."}</p>

      <h2>Bookings, payments and legal clearance</h2>
      <p className="tlps-muted">These three run as mocks in both modes. They return a draft or a waiting status and never confirm, charge or clear anything.</p>
      <div className="tlps-area-actions">
        <Button variant="secondary" disabled={busy} onClick={() => tryMock("Booking", () => services.bookings.requestHold({ resourceKind: "location", name: "Sample location", date: "2027-02-03" }))}>Try a booking hold</Button>
        <Button variant="secondary" disabled={busy} onClick={() => tryMock("Payment", () => services.payments.draftPaymentRequest({ payee: "Sample vendor", amount: 25000, currency: "INR", purpose: "Equipment advance" }))}>Try a payment request</Button>
        <Button variant="secondary" disabled={busy} onClick={() => tryMock("Legal", () => services.legal.submitForReview({ subject: "Sample location permit", kind: "location-permit" }))}>Try a clearance request</Button>
      </div>
      {mockResults.length > 0 && <ul className="tlps-mock-results">{mockResults.map((line) => <li key={line}>{line}</li>)}</ul>}
    </section>
  );
}
