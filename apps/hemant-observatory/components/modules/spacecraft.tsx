"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useTimeResult } from "@/components/use-observatory-data";
import { emptyTelemetryTemplate, instruments, parseSpacecraftTelemetryText, type SpacecraftTelemetry } from "@/lib/spacecraft-telemetry";
import { ErrorNote, Facts, Panel, Pending } from "./shared";

export default function SpacecraftModule() {
  const [payload, setPayload] = useState(emptyTelemetryTemplate);
  const [telemetry, setTelemetry] = useState<SpacecraftTelemetry | null>(null);
  const [error, setError] = useState("");
  const [sclk, setSclk] = useState("0189345666-00000");
  const [sclkResult, setSclkResult] = useState<Record<string, unknown> | null>(null);
  const [sclkError, setSclkError] = useState("");
  const [hemantTime, convert] = useTimeResult();

  function loadSnapshot(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTelemetry(null);
    const parsed = parseSpacecraftTelemetryText(payload);
    if (!parsed.ok) {
      setError(parsed.error);
      return;
    }
    setError("");
    setTelemetry(parsed.value);
    convert(parsed.value.recorded_at.unix_nanos);
  }

  async function convertSclk(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSclkResult(null);
    setSclkError("");
    try {
      const response = await fetch(`/api/spacecraft/sclk/mars2020-demo?sclk=${encodeURIComponent(sclk)}`, { cache: "no-store" });
      const body = await response.json() as Record<string, unknown>;
      if (!response.ok) throw new Error(typeof body.error === "string" ? body.error : "This clock reading is outside the embedded archival coverage.");
      setSclkResult(body);
    } catch (cause) {
      setSclkError(cause instanceof Error ? cause.message : "Clock correlation is unavailable.");
    }
  }

  return (
    <div className="m-grid">
      <Panel title="Aditya-L1 MAG access quarantined" label="Restricted Aditya-L1 data quarantine">
        <p className="m-note">The MAG importer is not registered in this workspace. No verified written-permission token verifier or trusted signing key is configured, so setting an environment flag alone cannot authorize access or commercial use.</p>
      </Panel>
      <Panel title="Instrument catalog" label="Spacecraft instrument catalog">
        <p className="m-note">These are interfaces a flight computer may receive. Hardware depends on mission and environment; this app has no sensor connection.</p>
        <div className="m-table-wrap">
          <table className="m-table" aria-label="Candidate spacecraft instruments">
            <thead><tr><th scope="col">Instrument</th><th scope="col">Role</th><th scope="col">Where / limit</th></tr></thead>
            <tbody>{instruments.map((item) => <tr key={item.id}>
              <th scope="row">{item.name}<small className="telemetry-subline">{item.id}</small></th>
              <td>{item.role}</td>
              <td>{item.location}<small className="telemetry-subline">{item.note}</small></td>
            </tr>)}</tbody>
          </table>
        </div>
        <Pending>Hemant Samwat is the timestamp and presentation layer. It does not itself read sensors, estimate attitude, solve an orbit, or command actuators.</Pending>
      </Panel>

      <Panel title="Load a telemetry snapshot" label="Spacecraft telemetry input">
        <p className="m-note">Paste one HSTS telemetry JSON snapshot. The app validates its shape, converts its supplied timestamp through the Rust time API, and displays each measurement with its stated frame, source and uncertainty. The sender’s data class is a declaration, not proof.</p>
        <form className="m-form" onSubmit={loadSnapshot}>
          <label htmlFor="spacecraft-payload">HSTS telemetry JSON</label>
          <textarea id="spacecraft-payload" className="telemetry-editor" spellCheck={false} value={payload} onChange={(event) => setPayload(event.target.value)} aria-describedby="telemetry-limit" />
          <p id="telemetry-limit" className="m-note">Maximum 64 KB · up to 128 measurements · no navigation solution is accepted.</p>
          {error && <p className="m-error" role="alert">{error}</p>}
          <button type="submit" className="m-button">Validate and convert timestamp</button>
        </form>
        {telemetry && <div className="telemetry-results" role="status">
          <h3>Accepted input · caller-supplied record</h3>
          <Facts label="Spacecraft snapshot provenance" rows={[
            ["Vehicle", telemetry.vehicle_id],
            ["Declared data class", telemetry.data_class],
            ["Clock source", telemetry.recorded_at.clock_source],
            ["Calibration · uncertainty", `${telemetry.recorded_at.clock_calibration} · ${telemetry.recorded_at.clock_uncertainty}`],
            ["Time scale", telemetry.recorded_at.time_scale],
            ["Verification", "unverified"],
          ]} />
          {hemantTime.state === "loading" && <p role="status">Converting the supplied timestamp through Rust…</p>}
          {hemantTime.state === "error" && <ErrorNote error={hemantTime.error} />}
          {hemantTime.state === "ready" && <Facts label="Hemant time conversion" rows={[
            ["UTC representation", hemantTime.value.civil.utc],
            ["Hemant elapsed units", `${hemantTime.value.elapsed.ahoratra} ahoratra · ${hemantTime.value.elapsed.muhurta} muhurta · ${hemantTime.value.elapsed.kala} kala · ${hemantTime.value.elapsed.kastha} kastha · ${hemantTime.value.elapsed.nimesha} nimesha`],
            ["Time source status", `${hemantTime.value.reading.source_label} · ${hemantTime.value.reading.verification} · uncertainty ${hemantTime.value.reading.uncertainty}`],
          ]} />}
          <div className="m-table-wrap">
            <table className="m-table" aria-label="Validated spacecraft measurements">
              <thead><tr><th scope="col">Instrument / channel</th><th scope="col">Reading</th><th scope="col">Frame · uncertainty</th><th scope="col">Source · observed time</th></tr></thead>
              <tbody>{telemetry.measurements.map((reading, index) => <tr key={`${reading.instrument_id}-${reading.quantity}-${index}`}>
                <th scope="row">{reading.instrument_id}<small className="telemetry-subline">{reading.instrument} · {reading.quantity}</small></th>
                <td>{reading.value} {reading.unit}<small className="telemetry-subline">{reading.time_scale}</small></td>
                <td>{reading.frame}<small className="telemetry-subline">± {reading.uncertainty}</small></td>
                <td>{reading.source}<small className="telemetry-subline">{reading.observed_at_unix_nanos} ns</small></td>
              </tr>)}</tbody>
            </table>
            {telemetry.measurements.length === 0 && <p className="m-empty">No sensor measurements were supplied in this snapshot.</p>}
          </div>
          <Pending>Position, velocity, attitude and “paristhiti” are not derived from these readings. A separately specified and qualified navigation estimator is required.</Pending>
        </div>}
      </Panel>

      <Panel title="Spacecraft clock-scale example" label="Mars 2020 archival SCLK example">
        <p className="m-note">This bounded Rust/Wasm example correlates the public Mars 2020 SCLK refit V19 first two intervals to TDT seconds past J2000. The source labels it an archival refit not used during operations. It is not a general SPICE reader, operational clock, or flight-qualified adapter; values outside this subset are rejected. <a href="https://naif.jpl.nasa.gov/pub/naif/pds/pds4/mars2020/mars2020_spice/spice_kernels/sclk/m2020_168_sclkscet_refit_v19.tsc" target="_blank" rel="noreferrer">Open the NAIF source kernel</a>.</p>
        <form className="m-form" onSubmit={convertSclk}>
          <label htmlFor="mars2020-sclk">Mars 2020 onboard SCLK · SSSSSSSSSS-FFFFF</label>
          <input id="mars2020-sclk" className="m-input" value={sclk} onChange={(event) => setSclk(event.target.value)} pattern="[0-9]{10}-[0-9]{5}" required aria-describedby="sclk-source-note" />
          <p id="sclk-source-note" className="m-note">Demonstration coverage: encoded tick interval [0, 18614849830912). Output scale stays TDT; UTC and TDB are not inferred.</p>
          {sclkError && <p role="alert" className="m-error">{sclkError}</p>}
          <button type="submit" className="m-button">Correlate with Rust</button>
        </form>
        {sclkResult && <Facts label="Mars 2020 clock correlation result" rows={[
          ["Input SCLK", `${sclkResult.sclk_seconds}-${String(sclkResult.sclk_fraction).padStart(5, "0")}`],
          ["Output scale", String(sclkResult.parallel_scale)],
          ["TDT past J2000", `${String(sclkResult.tdt_nanoseconds_past_j2000)} ns`],
          ["Source SCET cross-check", String(sclkResult.reference_utc_from_source_sclk_scet || "none for this input")],
          ["Status", String(sclkResult.verification)],
          ["Kernel", String(sclkResult.kernel)],
        ]} />}
      </Panel>

      <Panel title="Flight-computer boundary" label="Flight computer boundary">
        <ul className="m-list">
          <li>Board clock and oscillator provide time ticks; calibration, synchronization and drift must accompany them.</li>
          <li>Sensors provide observations in their own frames. A versioned adapter must preserve units, calibration identity, sample time and uncertainty.</li>
          <li>Hemant converts declared instants into its current elapsed-unit convention. Panchanga fields still require an explicit calendar ruleset.</li>
          <li>Navigation estimates must come from an independent estimator with defined sensor fusion, dynamics, frame transforms and validation.</li>
          <li>Flight commands and actuator control are outside this display utility.</li>
        </ul>
      </Panel>
    </div>
  );
}
