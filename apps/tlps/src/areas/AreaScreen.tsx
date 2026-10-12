import React, { useMemo, useState } from "react";
import { Button, Input } from "@maataa/ui";
import * as Workspaces from "@maataa/ui/workspaces";
import * as TlpsAiSpaces from "../ai-spaces";
import { TLPS_OS_CATALOG, type TlpsOsId } from "../operatingSystems";
import type { TlpsView } from "../types";
import { ServicesPanel } from "../services/ServicesPanel";
import {
  AREA_DEFINITIONS,
  aiSpacesForArea,
  createAreaRecord,
  MAX_AREA_RECORDS,
  nextStatus,
  sampleRecords,
  summarizeArea,
  validateAreaValues,
  workspacesForArea,
  type AreaRecord,
  type AreaStore,
} from "./areaModel";

type AnyComponent = React.ComponentType<Record<string, unknown>>;
const workspaceComponents = Workspaces as unknown as Record<string, AnyComponent>;
const aiComponents = TlpsAiSpaces as unknown as Record<string, AnyComponent>;
export const pluralLabel = (label: string) => /[^aeiou]y$/i.test(label) ? `${label.slice(0, -1)}ies` : `${label}s`;
const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export interface AreaScreenProps {
  areaId: TlpsOsId;
  store: AreaStore;
  onStoreChange: (next: AreaStore) => void;
  onOpenView: (view: TlpsView) => void;
  onBack: () => void;
}

export function AreaScreen({ areaId, store, onStoreChange, onOpenView, onBack }: AreaScreenProps) {
  const def = AREA_DEFINITIONS[areaId];
  const system = TLPS_OS_CATALOG.find((item) => item.id === areaId);
  const records = store.areas[areaId] ?? [];
  const summary = useMemo(() => summarizeArea(def, records), [def, records]);
  const workspaces = useMemo(() => workspacesForArea(def), [def]);
  const aiSpaces = useMemo(() => aiSpacesForArea(def), [def]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [issues, setIssues] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const [workspaceId, setWorkspaceId] = useState("");
  const hasMoney = def.fields.some((field) => field.money);

  const save = (next: AreaRecord[]) => onStoreChange({ ...store, areas: { ...store.areas, [areaId]: next } });
  const add = (event: React.FormEvent) => {
    event.preventDefault();
    const found = validateAreaValues(def, values);
    if (records.length >= MAX_AREA_RECORDS) found.push(`This area holds up to ${MAX_AREA_RECORDS} records.`);
    setIssues(found);
    if (found.length) return;
    save([...records, createAreaRecord(def, values)]);
    setValues({});
    setNotice(`${def.recordLabel} added.`);
  };
  const advance = (record: AreaRecord) => {
    const status = nextStatus(def, record.status);
    if (!status) return;
    save(records.map((item) => item.id === record.id ? { ...item, status, updatedAt: new Date().toISOString() } : item));
    setNotice(`Moved to ${status}.`);
  };
  const remove = (record: AreaRecord) => {
    save(records.filter((item) => item.id !== record.id));
    setNotice(`${def.recordLabel} removed.`);
  };

  const selected = workspaces.find((item) => item.id === workspaceId);
  const SelectedWorkspace = selected ? workspaceComponents[selected.archetype] : undefined;
  const register = def.mode === "register";

  return (
    <main className="tlps-area" aria-labelledby="tlps-area-title">
      <div className="tlps-title-row">
        <div>
          <p className="tlps-overline">WORK AREA · {register ? "LOCAL REGISTER" : "PLANNING WORKFLOW"}</p>
          <h1 id="tlps-area-title">{system?.name ?? areaId}</h1>
          <p className="tlps-subtitle">{system?.detail}</p>
        </div>
        <Button variant="secondary" onClick={onBack}>All work areas</Button>
      </div>
      <p className="tlps-area-boundary">{def.boundary}</p>
      <p className="sr-only" aria-live="polite">{notice}</p>

      {!register && def.target && (
        <section className="tlps-area-panel" aria-label="Open in the planning workflow">
          <p>This area works inside the planning workflow.</p>
          <Button variant="primary" onClick={() => onOpenView(def.target!)}>Open the {def.target} step →</Button>
        </section>
      )}

      {register && (
        <>
          <section className="tlps-area-summary" aria-label="Summary">
            <div><strong>{summary.total}</strong><small>{pluralLabel(def.recordLabel).toLowerCase()}</small></div>
            {hasMoney && <div><strong>{money.format(summary.moneyTotal)}</strong><small>total estimate</small></div>}
            {def.statuses.map((status) => <div key={status}><strong>{summary.byStatus[status]}</strong><small>{status}</small></div>)}
          </section>

          <section className="tlps-area-panel" aria-labelledby="tlps-area-add">
            <h2 id="tlps-area-add">Add {def.recordLabel.toLowerCase()}</h2>
            <form className="tlps-area-form" onSubmit={add} noValidate>
              {def.fields.map((field) => {
                const id = `area-${areaId}-${field.key}`;
                const label = `${field.label}${field.required ? " (required)" : ""}`;
                return field.kind === "select" ? (
                  <label key={field.key} htmlFor={id}>
                    <span>{label}</span>
                    <select id={id} className="m-select" value={values[field.key] ?? ""} onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}>
                      <option value="">Choose…</option>
                      {field.options?.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </label>
                ) : (
                  <label key={field.key} htmlFor={id}>
                    <span>{label}</span>
                    <Input id={id} type={field.kind === "number" ? "number" : field.kind === "date" ? "date" : "text"} min={field.kind === "number" ? 0 : undefined} inputMode={field.kind === "number" ? "decimal" : undefined} placeholder={field.placeholder} value={values[field.key] ?? ""} onChange={(e) => setValues({ ...values, [field.key]: e.target.value })} />
                  </label>
                );
              })}
              <div className="tlps-area-actions">
                <Button variant="primary" type="submit">Add</Button>
                {records.length === 0 && <Button variant="secondary" type="button" onClick={() => { save(sampleRecords(def)); setNotice("Sample records added."); }}>Add sample records</Button>}
              </div>
              {issues.length > 0 && <ul className="issue-list" role="alert">{issues.map((issue) => <li key={issue}>{issue}</li>)}</ul>}
            </form>
          </section>

          <section className="tlps-area-panel" aria-labelledby="tlps-area-list">
            <h2 id="tlps-area-list">{pluralLabel(def.recordLabel)}</h2>
            {records.length === 0 ? <p className="tlps-muted">Nothing here yet. Add a {def.recordLabel.toLowerCase()} or load the samples.</p> : (
              <div className="tlps-table-wrap">
                <table className="tlps-area-table">
                  <caption className="sr-only">{pluralLabel(def.recordLabel)} in {system?.name}</caption>
                  <thead><tr>{def.fields.map((field) => <th key={field.key} scope="col">{field.label}</th>)}<th scope="col">Status</th><th scope="col"><span className="sr-only">Actions</span></th></tr></thead>
                  <tbody>
                    {records.map((record) => {
                      const next = nextStatus(def, record.status);
                      return (
                        <tr key={record.id}>
                          {def.fields.map((field) => <td key={field.key}>{field.money && record.values[field.key] ? money.format(Number(record.values[field.key])) : record.values[field.key] || "—"}</td>)}
                          <td><span className="status-chip">{record.status}</span>{record.sample && <small className="tlps-sample-tag">sample</small>}</td>
                          <td><div className="tlps-row-actions">
                            {next && <Button variant="secondary" onClick={() => advance(record)} aria-label={`Move ${record.values[def.fields[0].key]} to ${next}`}>→ {next}</Button>}
                            <Button variant="secondary" onClick={() => remove(record)} aria-label={`Remove ${record.values[def.fields[0].key]}`}>Remove</Button>
                          </div></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}

      <section className="tlps-area-panel" aria-labelledby="tlps-area-workspaces">
        <h2 id="tlps-area-workspaces">Workspaces for this area</h2>
        {workspaces.length === 0 ? <p className="tlps-muted">No related workspaces.</p> : (
          <ul className="tlps-workspace-chips">
            {workspaces.map((workspace) => (
              <li key={workspace.id}><button type="button" aria-pressed={workspaceId === workspace.id} className={`tlps-workspace-chip ${workspaceId === workspace.id ? "is-selected" : ""}`} onClick={() => setWorkspaceId(workspaceId === workspace.id ? "" : workspace.id)}>
                <span>{workspace.name}</span><small>{workspace.source === "tlps" ? "TLPS" : "MAATAA"}</small>
              </button></li>
            ))}
          </ul>
        )}
        {selected && SelectedWorkspace && (
          <div className="tlps-workspace-preview" data-testid="tlps-workspace-preview">
            <SelectedWorkspace
              workspaceType={selected.id}
              header={<strong>{selected.name}</strong>}
              main={<p>{register ? `${summary.total} ${pluralLabel(def.recordLabel).toLowerCase()} in this browser.` : `Opens the ${def.target} step of your local plan.`}</p>}
              statusBar={<small>{selected.id} · rendered by {selected.archetype}</small>}
            />
          </div>
        )}
      </section>

      {areaId === "core-platform" && <ServicesPanel />}

      {aiSpaces.length > 0 && (
        <section className="tlps-area-panel" aria-labelledby="tlps-area-ai">
          <h2 id="tlps-area-ai">AI assistance</h2>
          <p className="tlps-muted">These assistant spaces are not connected to a model here. Write requests in MAATAA AI, or use Idea → Script for the reviewed Brahmini flow.</p>
          <div className="tlps-ai-grid">
            {aiSpaces.map((space) => {
              const Space = aiComponents[space.component];
              return Space ? <Space key={space.id} main={<small>Not connected · {space.id}</small>} /> : null;
            })}
          </div>
        </section>
      )}
    </main>
  );
}
