import * as React from "react";
import { Button } from "@maataa/ui/actions/Button";
import { TLPS_OS_CATALOG } from "../../apps/tlps/src/operatingSystems";
import { TLPS_WORKPLACES } from "../../apps/tlps/src/areas/workplaceModel";
import { WorkplaceDemo } from "../../apps/tlps/src/areas/WorkplaceDemo";
import "./tlps-workplaces.css";

export function TlpsWorkplaces({ route, navigate }: { route: string; navigate: (path: string) => void }) {
  const [query, setQuery] = React.useState("");
  const [area, setArea] = React.useState("");
  const encoded = route.slice("/tlps/workplaces/".length);
  let key = "";
  try { if (route.startsWith("/tlps/workplaces/")) key = decodeURIComponent(encoded); } catch { key = "invalid"; }
  const selected = TLPS_WORKPLACES.find((workplace) => workplace.key === key);
  if (key) return <section className="tlps-workplaces">
    <Button variant="secondary" onClick={() => { setQuery(""); setArea(""); navigate("/tlps/workplaces"); }}>All workplaces</Button>
    {selected ? <>
      <header className="tlps-workplaces-heading"><h1>{selected.name}</h1><p>{selected.areaName} · Browser-local demo</p></header>
      <WorkplaceDemo key={selected.key} workplace={selected} />
    </> : <div><h1>Workplace not found</h1><p>Choose a workplace from the directory to open its demo.</p></div>}
  </section>;
  const filtered = TLPS_WORKPLACES.filter((workplace) => (!area || workplace.areaId === area) && `${workplace.name} ${workplace.areaName}`.toLowerCase().includes(query.trim().toLowerCase()));
  const unique = new Set(TLPS_WORKPLACES.map((workplace) => workplace.id)).size;
  return <section className="tlps-workplaces">
    <header className="tlps-workplaces-heading"><h1>Find your workplace. Try the workflow.</h1><p>Explore all {unique} workplaces across {TLPS_OS_CATALOG.length} TLPS work areas. Each area has its own demo records, review notes and handover.</p><p>These are planning rehearsals on this device. No one is hired, booked, paid or published.</p></header>
    <div className="tlps-workplaces-filters">
      <label>Find a workplace<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Casting, locations, campaign…" /></label>
      <label>Work area<select aria-label="Work area" value={area} onChange={(event) => setArea(event.target.value)}><option value="">All work areas</option>{TLPS_OS_CATALOG.map((system) => <option key={system.id} value={system.id}>{system.name}</option>)}</select></label>
    </div>
    <p role="status">{filtered.length} workplace demos shown</p>
    {TLPS_OS_CATALOG.map((system) => {
      const entries = filtered.filter((workplace) => workplace.areaId === system.id);
      return entries.length ? <section className="tlps-workplace-group" key={system.id} aria-labelledby={`workplace-${system.id}`}><h2 id={`workplace-${system.id}`}>{system.name}</h2><p>{system.detail}</p><ul>{entries.map((workplace) => <li key={workplace.key}><div><strong>{workplace.name}</strong><span>{workplace.steps[0]}</span></div><Button variant="secondary" onClick={() => navigate(`/tlps/workplaces/${encodeURIComponent(workplace.key)}`)} aria-label={`Open ${workplace.name} in ${system.name}`}>Try demo</Button></li>)}</ul></section> : null;
    })}
    {!filtered.length && <p>No workplaces match. Clear your search or choose a different area.</p>}
  </section>;
}
