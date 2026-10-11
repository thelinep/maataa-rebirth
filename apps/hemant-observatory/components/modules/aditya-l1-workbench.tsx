"use client";

import { useEffect, useState } from "react";
import { Button } from "@maataa/ui/actions";
import { Input, NativeSelect } from "@maataa/ui/forms";
import { Card } from "@maataa/ui/surfaces";
import { parseAdityaMagL2, type AdityaMagL2Preview } from "@/lib/aditya-mag-l2";
import { assertAdityaMagCommercialRegistrationAllowed } from "@/lib/restricted-assets";

// This importer remains unregistered until a verifiable written-permission
// token format and trusted signing key are configured. A boolean environment
// flag alone is never authorization. A commercial bundle that accidentally
// registers this component must fail during module evaluation.
assertAdityaMagCommercialRegistrationAllowed(process.env.MAATAA_COMMERCIAL_RELEASE);

const STORAGE_KEY = "hemant.aditya-l1.dataset-register.v1";

const payloads = [
  { id: "VELC", name: "Visible Emission Line Coronagraph", kind: "Remote sensing · corona imaging and spectroscopy" },
  { id: "SUIT", name: "Solar Ultraviolet Imaging Telescope", kind: "Remote sensing · photosphere and chromosphere" },
  { id: "SoLEXS", name: "Solar Low Energy X-ray Spectrometer", kind: "Remote sensing · soft X-ray" },
  { id: "HEL1OS", name: "High Energy L1 Orbiting X-ray Spectrometer", kind: "Remote sensing · hard X-ray" },
  { id: "ASPEX", name: "Aditya Solar wind Particle EXperiment", kind: "In situ · energetic particles (SWIS / STEPS)" },
  { id: "PAPA", name: "Plasma Analyzer Package for Aditya", kind: "In situ · solar-wind ions and electrons" },
  { id: "MAG", name: "Magnetometer", kind: "In situ · magnetic-field measurements" },
] as const;

type DatasetRecord = {
  id: string;
  productId: string;
  instrument: string;
  level: string;
  format: string;
  fileName: string;
  observedRange: string;
  timeBasis: string;
  source: string;
  checksum: string;
  note: string;
};

const initialFields = {
  productId: "",
  instrument: "VELC",
  level: "Not checked",
  format: "Not checked",
  fileName: "",
  observedRange: "",
  timeBasis: "Unknown — inspect product metadata",
  source: "https://pradan.issdc.gov.in/al1",
  checksum: "",
  note: "",
};

function readRecords(raw: string | null): DatasetRecord[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((row): row is DatasetRecord => Boolean(
      row && typeof row === "object" &&
      ["id", "productId", "instrument", "level", "format", "fileName", "observedRange", "timeBasis", "source", "checksum", "note"]
        .every((key) => typeof (row as Record<string, unknown>)[key] === "string"),
    ));
  } catch {
    return [];
  }
}

export default function AdityaL1Workbench() {
  const [fields, setFields] = useState(initialFields);
  const [records, setRecords] = useState<DatasetRecord[]>([]);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState("");
  const [formError, setFormError] = useState("");
  const [importPreview, setImportPreview] = useState<AdityaMagL2Preview | null>(null);
  const [importError, setImportError] = useState("");
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    try {
      setRecords(readRecords(window.localStorage.getItem(STORAGE_KEY)));
    } catch {
      setStorageError("This browser does not allow local storage. The register will not persist here.");
    }
    setReady(true);
  }, []);

  function persist(next: DatasetRecord[]) {
    setRecords(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setStorageError("");
    } catch {
      setStorageError("Could not save this register in browser storage. Export your entries before leaving this page.");
    }
  }

  function addRecord(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let sourceUrl: URL;
    try { sourceUrl = new URL(fields.source); } catch { setFormError("Enter a valid HTTPS source URL."); return; }
    if (sourceUrl.protocol !== "https:") { setFormError("Only HTTPS source links can be saved."); return; }
    setFormError("");
    const next: DatasetRecord = { ...fields, id: crypto.randomUUID() };
    persist([next, ...records]);
    setFields(initialFields);
  }

  function exportRegister() {
    const blob = new Blob([JSON.stringify({ schema: "hemant.aditya-l1-dataset-register/1", records }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "hemant-aditya-l1-dataset-register.json";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  async function importMagProduct(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";
    if (!file) return;
    setImportPreview(null);
    setImportError("");
    setImporting(true);
    try {
      setImportPreview(await parseAdityaMagL2(file));
    } catch (cause) {
      setImportError(cause instanceof Error ? cause.message : "This file could not be read as an Aditya-L1 MAG L2 product.");
    } finally {
      setImporting(false);
    }
  }

  function saveImportedMetadata(preview: AdityaMagL2Preview) {
    const record: DatasetRecord = {
      id: crypto.randomUUID(),
      productId: preview.fileName,
      instrument: "MAG",
      level: "Level 2",
      format: "NetCDF-4",
      fileName: preview.fileName,
      observedRange: `${preview.firstTimeUtc} – ${preview.lastTimeUtc}`,
      timeBasis: preview.timeBasis,
      source: "https://pradan1.issdc.gov.in/al1/protected/payload.xhtml",
      checksum: `SHA-256 ${preview.sha256}`,
      note: `Browser-local parse preview · ${preview.recordCount} records · ${preview.validQualityRecords} valid / ${preview.invalidQualityRecords} invalid quality flags. Raw file and measurement series are not stored.`,
    };
    persist([record, ...records]);
  }

  function update<K extends keyof typeof initialFields>(key: K, value: (typeof initialFields)[K]) {
    setFields((current) => ({ ...current, [key]: value }));
  }

  return (
    <section className="aditya-workbench maataa-root" data-theme="dark" aria-labelledby="aditya-title">
      <header className="aditya-heading">
        <div>
          <p className="aditya-kicker">MISSION DATA WORKSPACE · INDIA</p>
          <h2 id="aditya-title">Aditya-L1 science data</h2>
          <p>Register archive metadata locally, or inspect a MAG Level 2 NetCDF-4 product in this browser. Raw science files stay on your device and are never sent to a service.</p>
        </div>
        <span className="m-badge">Local register · {ready ? records.length : "…"} products</span>
      </header>

      <div className="aditya-sources" aria-label="Official Aditya-L1 data sources">
        <a href="https://www.issdc.gov.in/adityal1.html" target="_blank" rel="noreferrer">ISSDC mission data page ↗</a>
        <a href="https://pradan.issdc.gov.in/al1" target="_blank" rel="noreferrer">PRADAN archive ↗</a>
        <a href="https://www.isro.gov.in/media_isro/pdf/AdityaL1AO_1cycle050125.pdf" target="_blank" rel="noreferrer">ISRO data / format guidance ↗</a>
      </div>

      <p className="aditya-boundary"><strong>Access boundary:</strong> download products through the official portal under its registration and use terms. The register stores your notes and source references in this browser only. It does not contain portal credentials or the science files.</p>

      <Card className="aditya-card aditya-import" aria-label="Import an Aditya-L1 MAG L2 product">
        <div className="aditya-import-heading"><div><h3>Inspect a MAG Level 2 product</h3><p className="aditya-footnote">Select a small NetCDF-4 file downloaded from PRADAN. Parsing and the SHA-256 checksum run in this browser; no file is uploaded. Raw measurements remain in memory for this preview only.</p></div><span className="m-badge">Local file · max 20 MB</span></div>
        <label className="aditya-file-label">MAG L2 NetCDF file<input className="aditya-file-input" type="file" accept=".nc,application/x-netcdf,application/octet-stream" onChange={importMagProduct} disabled={importing} /></label>
        {importing && <p className="aditya-import-state" role="status">Reading the local product and checking its documented variables…</p>}
        {importError && <p className="aditya-alert" role="alert">{importError}</p>}
        {importPreview && <div className="aditya-preview" role="region" aria-label="Parsed MAG L2 product preview" aria-live="polite">
          <div className="aditya-preview-heading"><div><h4>{importPreview.fileName}</h4><p>{importPreview.mission} · {importPreview.instrument} · {importPreview.productLevel} · {importPreview.productVersion}</p></div><Button type="button" onClick={() => saveImportedMetadata(importPreview)}>Save metadata locally</Button></div>
          <dl className="aditya-preview-facts"><div><dt>Records · cadence</dt><dd>{importPreview.recordCount.toLocaleString()} · {importPreview.cadenceSeconds === null ? "variable" : `${importPreview.cadenceSeconds} s`}</dd></div><div><dt>Time basis</dt><dd>{importPreview.timeBasis}</dd></div><div><dt>Time range, UTC display</dt><dd>{importPreview.firstTimeUtc} – {importPreview.lastTimeUtc}</dd></div><div><dt>Quality flags</dt><dd>{importPreview.validQualityRecords.toLocaleString()} valid · {importPreview.invalidQualityRecords.toLocaleString()} invalid</dd></div><div><dt>Archive missing-data metadata</dt><dd>{importPreview.missingDataPercentage}%</dd></div><div><dt>Computed file SHA-256</dt><dd className="aditya-digest">{importPreview.sha256}</dd></div></dl>
          <div className="m-table-wrap"><table className="m-table" aria-label="MAG field preview"><thead><tr><th scope="col">Field · frame</th><th scope="col">First value · quality</th><th scope="col">Observed minimum–maximum</th><th scope="col">First uncertainty</th><th scope="col">Unit</th></tr></thead><tbody>{importPreview.fields.map((field) => <tr key={field.name}><th scope="row">{field.name}<small className="telemetry-subline">{field.frame}</small></th><td>{field.first.toPrecision(6)}<small className="telemetry-subline">{field.firstRecordQuality === 1 ? "Valid flag" : "Bad/missing flag"}</small></td><td>{field.minimum.toPrecision(6)} – {field.maximum.toPrecision(6)}</td><td>{field.uncertaintyFirst?.toPrecision(4) ?? "Not supplied"}</td><td>{field.unit}</td></tr>)}</tbody></table></div>
          <ul className="aditya-import-warnings" aria-label="Product limitations">{importPreview.warnings.map((warning) => <li key={warning}>{warning}</li>)}</ul>
          <p className="aditya-footnote">The preview does not persist the raw file or series. “Save metadata locally” stores only the product reference, range, checksum and import note in this browser.</p>
        </div>}
      </Card>

      <div className="aditya-grid">
        <Card className="aditya-card" aria-label="Aditya-L1 payload catalogue">
          <h3>Payloads in this workbench</h3>
          <ul className="aditya-payloads" aria-label="Aditya-L1 payloads">
            {payloads.map((item) => <li key={item.id}><strong>{item.id}</strong><span>{item.name}</span><small>{item.kind}</small></li>)}
          </ul>
          <p className="aditya-footnote">Payload names and roles follow the <a href="https://www.isro.gov.in/media_isro/pdf/AdityaL1_Mission_Brochure.pdf" target="_blank" rel="noreferrer">ISRO mission brochure</a>. Product availability and field meanings must be checked in each product’s own documentation.</p>
        </Card>

        <Card className="aditya-card" aria-label="Add a local Aditya-L1 product record">
          <h3>Register an archive product</h3>
          <p className="aditya-footnote">Record the product identifier and its declared metadata. Times remain verbatim until the product guide establishes their exact scale and meaning.</p>
          <form className="aditya-form" onSubmit={addRecord}>
            <label>Archive product ID<Input required maxLength={120} value={fields.productId} onChange={(e) => update("productId", e.target.value)} placeholder="Copy from the archive product label" /></label>
            <div className="aditya-form-row">
              <label>Payload<NativeSelect aria-label="Select Aditya-L1 payload" value={fields.instrument} onChange={(e) => update("instrument", e.target.value)}>{payloads.map((p) => <option key={p.id} value={p.id}>{p.id}</option>)}</NativeSelect></label>
              <label>Product level<NativeSelect value={fields.level} onChange={(e) => update("level", e.target.value)}><option>Not checked</option><option>Level 1</option><option>Level 2</option><option>Other / as published</option></NativeSelect></label>
            </div>
            <div className="aditya-form-row">
              <label>File format<NativeSelect value={fields.format} onChange={(e) => update("format", e.target.value)}><option>Not checked</option><option>CDF</option><option>FITS</option><option>Other / as published</option></NativeSelect></label>
              <label>Downloaded file name<Input maxLength={180} value={fields.fileName} onChange={(e) => update("fileName", e.target.value)} placeholder="Optional; file itself stays on your device" /></label>
            </div>
            <label>Observation time range as shown by source<Input maxLength={180} value={fields.observedRange} onChange={(e) => update("observedRange", e.target.value)} placeholder="Paste source text verbatim; do not normalize yet" /></label>
            <label>Time scale / time field from product guide<Input maxLength={120} value={fields.timeBasis} onChange={(e) => update("timeBasis", e.target.value)} /></label>
            <label>Archive source or product URL<Input type="url" maxLength={500} required value={fields.source} onChange={(e) => update("source", e.target.value)} /></label>
            <label>Checksum, if supplied by the archive<Input maxLength={180} value={fields.checksum} onChange={(e) => update("checksum", e.target.value)} placeholder="Optional · record the algorithm too" /></label>
            <label>Notes<Input maxLength={500} value={fields.note} onChange={(e) => update("note", e.target.value)} placeholder="Calibration, quality flags, or guide reference" /></label>
            {formError && <p className="aditya-alert" role="alert">{formError}</p>}
            <div className="aditya-actions"><Button type="submit" disabled={!ready}>Save metadata locally</Button><Button type="button" variant="secondary" onClick={exportRegister} disabled={!ready || records.length === 0}>Export register JSON</Button></div>
          </form>
          {storageError && <p className="aditya-alert" role="alert">{storageError}</p>}
          {!ready && <p role="status" className="aditya-footnote">Loading this browser’s local register…</p>}
          {ready && !storageError && <p role="status" className="aditya-footnote">Saved only in this browser · no shared sync · no raw science data stored.</p>}
        </Card>
      </div>

      <section className="aditya-records" aria-labelledby="aditya-records-title">
        <div className="aditya-records-heading"><h3 id="aditya-records-title">Registered products</h3><span>{records.length} saved</span></div>
        {records.length === 0 ? <p className="aditya-empty">No products registered yet. Add a product after obtaining it from the official archive.</p> : <ul className="aditya-record-list" aria-label="Registered products">{records.map((record) => <li key={record.id}>
          <div><strong>{record.productId}</strong><span>{record.instrument} · {record.level} · {record.format}</span><small>{record.fileName || "No local filename recorded"} · {record.observedRange || "Observation range not recorded"}</small><small>Time field: {record.timeBasis} · source: <a href={record.source} target="_blank" rel="noreferrer">open</a>{record.checksum ? ` · checksum ${record.checksum}` : " · checksum not recorded"}</small></div>
          <Button type="button" variant="destructive" onClick={() => persist(records.filter((item) => item.id !== record.id))} aria-label={`Remove ${record.productId}`}>Remove</Button>
        </li>)}</ul>}
      </section>

      <p className="aditya-boundary"><strong>Scientific status:</strong> the MAG importer reads documented Level 2 fields and previews supplied values; it does not independently validate calibration, attitude kernels, or quiet-time samples. It is not a live feed or Aditya spacecraft-clock adapter.</p>
    </section>
  );
}
