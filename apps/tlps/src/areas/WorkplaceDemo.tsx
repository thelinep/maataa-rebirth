import * as React from "react";
import { Button } from "@maataa/ui/actions/Button";
import { RecordRegister, useStoredValue } from "@maataa/ui/compounds";
import {
  advanceWorkplaceRun, emptyWorkplaceRun, emptyWorkplaceStore,
  parseWorkplaceStore, workplaceHandover, WORKPLACE_STORE_KEY,
  type Workplace, type WorkplaceRun,
} from "./workplaceModel";
import "./workplace-demo.css";

export function WorkplaceDemo({ workplace }: { workplace: Workplace }) {
  const { value, setValue, saved } = useStoredValue(WORKPLACE_STORE_KEY, parseWorkplaceStore, emptyWorkplaceStore);
  const run = value.runs[workplace.key] ?? emptyWorkplaceRun();
  const [notice, setNotice] = React.useState("");
  const save = (next: WorkplaceRun) => setValue((previous) => ({ ...previous, runs: { ...previous.runs, [workplace.key]: next } }));
  const advance = () => {
    const next = advanceWorkplaceRun(run);
    if (next === run) { setNotice("Add a record, a plan owner and a review note before checking this step."); return; }
    save(next);
    setNotice(next.step === 4 ? "Local demo complete. You can export the handover." : "Step checked locally. Continue with the next review.");
  };
  const download = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(workplaceHandover(workplace, run), null, 2)], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `tlps-${workplace.areaId}-${workplace.id.split(".").at(-1)?.toLowerCase()}-demo.json`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice("Local handover downloaded.");
  };
  return <section className="tlps-workplace-demo" aria-label={`${workplace.name} demo workflow`}>
    <p>{workplace.boundary} Sample details are synthetic. Records and review notes stay in this browser.</p>
    <p className="tlps-demo-table-hint">Scroll the records table sideways to see status and actions.</p>
    <RecordRegister
      recordLabel={workplace.recordLabel}
      fields={workplace.fields}
      statuses={workplace.statuses}
      records={run.records}
      samples={workplace.samples}
      onRecordsChange={(records) => { save({ ...run, records, step: 0 }); setNotice("Records changed. Review steps need to be checked again."); }}
    />
    <section className="tlps-demo-review" aria-label="Demo review steps">
      <h2>Walk through the demo</h2>
      <p>Checks record a rehearsal of this plan. They do not approve a real production, booking or payment.</p>
      <label className="tlps-demo-owner">Plan owner<input value={run.owner} maxLength={160} onChange={(event) => save({ ...run, owner: event.target.value, step: 0 })} /></label>
      <ol className="tlps-demo-steps">
        {workplace.steps.map((title, index) => <li key={title} aria-current={run.step === index ? "step" : undefined}>
          <div><h3>{title}</h3><span>{index < run.step ? "Checked locally" : index === run.step ? "Current step" : "Next"}</span></div>
          {index === run.step && <>
            <label>Review note<textarea rows={3} maxLength={2000} value={run.notes[index]} onChange={(event) => save({ ...run, notes: run.notes.map((note, i) => i === index ? event.target.value : note) })} /></label>
            <Button onClick={advance}>Check this step locally</Button>
          </>}
          {index < run.step && <p>{run.notes[index]}</p>}
        </li>)}
      </ol>
      <div className="tlps-demo-actions"><Button onClick={download}>Export demo handover</Button><Button variant="secondary" disabled={run.step === 0} onClick={() => { save({ ...run, step: 0 }); setNotice("Review restarted. Your records and notes are kept."); }}>Restart review</Button></div>
      <p role="status">{saved ? notice || "Saved on this device when you make changes." : "Browser storage is unavailable. Changes remain in memory; export your handover to keep them."}</p>
    </section>
  </section>;
}
