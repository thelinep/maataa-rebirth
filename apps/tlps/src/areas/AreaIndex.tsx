import React from "react";
import { TLPS_OS_CATALOG, type TlpsOsId } from "../operatingSystems";
import { AREA_DEFINITIONS, summarizeArea, type AreaStore } from "./areaModel";

export function AreaIndex({ store, onOpen }: { store: AreaStore; onOpen: (id: TlpsOsId) => void }) {
  return (
    <main className="tlps-area" aria-labelledby="tlps-areas-title">
      <div className="tlps-title-row">
        <div>
          <p className="tlps-overline">TLPS WORK AREAS</p>
          <h1 id="tlps-areas-title">Work areas</h1>
          <p className="tlps-subtitle">Every area runs in this browser. Planning areas open the workflow; the others keep a local list you can add to.</p>
        </div>
      </div>
      <div className="tlps-os-grid tlps-area-index">
        {TLPS_OS_CATALOG.map((system) => {
          const def = AREA_DEFINITIONS[system.id];
          const count = def.mode === "register" ? summarizeArea(def, store.areas[system.id] ?? []).total : null;
          return (
            <button type="button" key={system.id} className="tlps-os-card is-available" onClick={() => onOpen(system.id)}>
              <span className="tlps-os-card-top"><strong>{system.name}</strong><small>{system.availability === "demo" ? "Planning workflow" : "Local screen"}</small></span>
              <span>{system.detail}</span>
              <b>{count === null ? "Open →" : `${count} record${count === 1 ? "" : "s"} · Open →`}</b>
            </button>
          );
        })}
      </div>
    </main>
  );
}
