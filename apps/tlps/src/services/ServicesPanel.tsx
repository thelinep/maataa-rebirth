import React, { useMemo, useState } from "react";
import { Button } from "@maataa/ui";
import { RadioGroup } from "@maataa/ui/forms";
import { DataTable } from "@maataa/ui/data";
import { LiveStatus, readStoredText, TextField } from "@maataa/ui/compounds";
import { readTlpsDraft, tlpsStorageKey } from "../workflow";
import { ServiceError, type ProjectEvent, type ServiceMode, type SessionIdentity, type StoredProject, type TlpsServices } from "./contracts";
import { createMaataaServices } from "./maataaAuthApi";
import { createMockServices } from "./mocks";

const readPlan = () => readStoredText(tlpsStorageKey);

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
      <div className="tlps-services-mode">
        <RadioGroup label="Connection" name="tlps-service-mode" value={mode} onValueChange={(next) => switchMode(next as ServiceMode)} options={[
          { value: "mock", label: "Local mock (in memory, for trying the flow)" },
          { value: "maataa-auth-api", label: "MAATAA Auth API on this computer" },
        ]} />
      </div>
      <p className="tlps-muted">
        {mode === "mock"
          ? "The mock keeps everything in memory and forgets it on reload."
          : "Start apps/maataa-auth-api, then paste a project token issued by an administrator. The token stays in memory only. The server keeps version summaries and plan digests; the plan itself stays in this browser."}
      </p>
      {!session ? (
        <div className="tlps-area-form">
          <TextField id="tlps-service-credential" label={mode === "mock" ? "Your name" : "Project token"} type={mode === "mock" ? "text" : "password"} autoComplete="off" value={credential} onValueChange={setCredential} />
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
                <TextField id="tlps-service-summary" label="What changed in this version?" maxLength={280} value={summary} onValueChange={setSummary} />
                <div className="tlps-area-actions"><Button variant="primary" disabled={busy || !summary.trim()} onClick={saveVersion}>Save current plan as version {project.currentVersion + 1}</Button></div>
              </div>
              <DataTable
                caption="Saved versions"
                data={project.versions.map((v) => ({ ...v, id: v.version }))}
                empty="No versions yet."
                columns={[
                  { id: "version", header: "Version", accessor: (v) => `v${v.version}` },
                  { id: "summary", header: "Summary" },
                  { id: "planDigest", header: "Plan digest", accessor: (v) => <code>{v.planDigest.slice(0, 19)}…</code> },
                  { id: "planBytes", header: "Size", accessor: (v) => `${v.planBytes} bytes` },
                ]}
              />
              <p className="tlps-muted">Activity: {events.map((event) => `${event.action} v${event.version}`).join(" · ") || "none"}</p>
            </>
          )}
        </div>
      )}
      <LiveStatus visible className="tlps-area-boundary" message={message || "Not connected."} />

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
