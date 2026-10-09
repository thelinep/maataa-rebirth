import { rashis } from "@/lib/panchanga";
import { Facts, Panel, Pending } from "./shared";

export default function SankrantiModule() {
  return (
    <div className="m-grid">
      <Panel eyebrow="DEFINITION" title="A Sankranti is a boundary crossing">
        <p className="m-note">A Sankranti is the instant the Sun's <em>sidereal</em> longitude crosses a multiple of 30°. Computing it needs the Sun's tropical longitude from an ephemeris, an ayanamsha to convert to sidereal longitude, and a root-finding step with a stated time tolerance.</p>
        <div className="m-table-wrap">
          <table className="m-table">
            <caption className="sr-only">Sidereal sign boundaries</caption>
            <thead><tr><th scope="col">Sign</th><th scope="col">Starts at sidereal longitude</th><th scope="col">Next crossing</th></tr></thead>
            <tbody>{rashis.map((r) => <tr key={r.name}><th scope="row"><span lang="sa">{r.devanagari}</span> · {r.name}</th><td>{r.startDegrees}°</td><td><span className="state-pill planned">pending</span></td></tr>)}</tbody>
          </table>
        </div>
      </Panel>
      <Panel eyebrow="THE HEMANT EPOCH" title="Relation to the selected reference">
        <Facts label="Epoch facts" rows={[["Selected reference", "1979-01-14 13:29 IST (07:59 UTC), described as Kashi Makar Sankranti"], ["Evidence", "user-selected-reference · minute precision"], ["Recomputed?", "No. The Sankranti instant has not been calculated by this app."], ["Makara boundary", "270° sidereal longitude"]]} />
        <Pending>Recomputing the 1979 Makara Sankranti instant needs the ephemeris and an ayanamsha decision. Until then the epoch stays a user-selected reference.</Pending>
      </Panel>
    </div>
  );
}
