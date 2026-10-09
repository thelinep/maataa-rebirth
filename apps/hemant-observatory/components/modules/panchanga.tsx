import { panchangaDecisions, panchangaFields } from "@/lib/panchanga";
import { Panel, Pending } from "./shared";

export default function PanchangaModule() {
  return (
    <div className="m-grid">
      <Panel eyebrow="FIELDS · NOT COMPUTED" title="What each field measures">
        <p className="m-note">Commonly described astronomical definitions. Exact boundaries, conventions and source editions depend on the tradition, which has not been selected. No value is calculated.</p>
        <div className="m-table-wrap">
          <table className="m-table">
            <caption className="sr-only">Panchanga fields, their measured quantity, inputs and convention dependence</caption>
            <thead><tr><th scope="col">Field</th><th scope="col">Measures</th><th scope="col">Inputs</th><th scope="col">Convention-dependent</th><th scope="col">Value</th></tr></thead>
            <tbody>
              {panchangaFields.map((f) => (
                <tr key={f.key}>
                  <th scope="row"><span lang="sa">{f.devanagari}</span> · {f.name}</th>
                  <td>{f.measures}</td>
                  <td>{f.inputs.join(", ")}</td>
                  <td>{f.conventionDependent}</td>
                  <td><span className="state-pill planned">pending</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
      <Panel eyebrow="DECISIONS REQUIRED" title="Before any value is shown">
        <ol className="m-list">
          {panchangaDecisions.map((d) => <li key={d.key}><strong>{d.key}</strong> — {d.question} <span className="state-pill planned">{d.status}</span></li>)}
        </ol>
        <Pending>Every field also needs Sun and Moon longitudes from an ephemeris (ASTRONOMY-DECISION-001). Fields are added one at a time, each with independent test cases.</Pending>
      </Panel>
    </div>
  );
}
