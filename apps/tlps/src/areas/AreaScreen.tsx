import React, { useMemo, useState } from "react";
import { Button } from "@maataa/ui";
import { ChipPicker, pluralLabel, RecordRegister } from "@maataa/ui/compounds";
import * as Workspaces from "@maataa/ui/workspaces";
import * as TlpsAiSpaces from "../ai-spaces";
import { TLPS_OS_CATALOG, type TlpsOsId } from "../operatingSystems";
import type { TlpsView } from "../types";
import { ServicesPanel } from "../services/ServicesPanel";
import { WorkplaceDemo } from "./WorkplaceDemo";
import { TLPS_WORKPLACES } from "./workplaceModel";
import {
  AREA_DEFINITIONS,
  aiSpacesForArea,
  MAX_AREA_RECORDS,
  newAreaRecordId,
  workspacesForArea,
  type AreaRecord,
  type AreaStore,
} from "./areaModel";

type AnyComponent = React.ComponentType<Record<string, unknown>>;
const workspaceComponents = Workspaces as unknown as Record<string, AnyComponent>;
const aiComponents = TlpsAiSpaces as unknown as Record<string, AnyComponent>;
// The designers pull in the canvas library; load them only when Film OS opens.
const FlowStudio = React.lazy(() => import("./FlowStudio").then((module) => ({ default: module.FlowStudio })));

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
  const workspaces = useMemo(() => workspacesForArea(def), [def]);
  const aiSpaces = useMemo(() => aiSpacesForArea(def), [def]);
  const [workspaceId, setWorkspaceId] = useState("");
  const register = def.mode === "register";
  const save = (next: AreaRecord[]) => onStoreChange({ ...store, areas: { ...store.areas, [areaId]: next } });

  const selected = workspaces.find((item) => item.id === workspaceId);
  const SelectedWorkspace = selected ? workspaceComponents[selected.archetype] : undefined;
  const workplace = TLPS_WORKPLACES.find((item) => item.areaId === areaId && item.id === workspaceId);

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

      {!register && def.target && (
        <section className="tlps-area-panel" aria-label="Open in the planning workflow">
          <p>This area works inside the planning workflow.</p>
          <Button variant="primary" onClick={() => onOpenView(def.target!)}>Open the {def.target} step →</Button>
        </section>
      )}

      {register && (
        <section className="tlps-area-panel" aria-labelledby="tlps-area-list">
          <h2 id="tlps-area-list">{pluralLabel(def.recordLabel)}</h2>
          <RecordRegister
            recordLabel={def.recordLabel}
            fields={def.fields}
            statuses={def.statuses}
            records={records}
            onRecordsChange={save}
            samples={def.samples}
            maxRecords={MAX_AREA_RECORDS}
            createId={() => newAreaRecordId(areaId)}
          />
        </section>
      )}

      <section className="tlps-area-panel" aria-labelledby="tlps-area-workspaces">
        <h2 id="tlps-area-workspaces">Workspaces for this area</h2>
        {workspaces.length === 0 ? <p className="tlps-muted">No related workspaces.</p> : (
          <ChipPicker
            label="Workspaces for this area"
            items={workspaces.map((workspace) => ({ value: workspace.id, label: workspace.name, meta: workspace.source === "tlps" ? "TLPS" : "MAATAA" }))}
            value={workspaceId}
            onValueChange={setWorkspaceId}
          />
        )}
        {selected && SelectedWorkspace && (
          <div className="tlps-workspace-preview" data-testid="tlps-workspace-preview">
            <SelectedWorkspace
              workspaceType={selected.id}
              header={<strong>{selected.name}</strong>}
              main={<p>{register ? `${records.length} ${pluralLabel(def.recordLabel).toLowerCase()} in this browser.` : `Opens the ${def.target} step of your local plan.`}</p>}
              statusBar={<small>{selected.id} · rendered by {selected.archetype}</small>}
            />
          </div>
        )}
      </section>

      {workplace && <section className="tlps-area-panel"><h2>{workplace.name} demo workflow</h2><WorkplaceDemo key={workplace.key} workplace={workplace} /></section>}

      {areaId === "core-platform" && <ServicesPanel />}
      {areaId === "film-os" && <React.Suspense fallback={<p className="tlps-muted">Loading the designers…</p>}><FlowStudio /></React.Suspense>}

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
