const MAX_PRODUCT_BYTES = 20 * 1024 * 1024;
const MAX_RECORDS = 250_000;

const requiredVectorNames = [
  "Bx_gse", "By_gse", "Bz_gse", "Bx_gsm", "By_gsm", "Bz_gsm",
  "Bx_gse_error", "By_gse_error", "Bz_gse_error",
  "Bx_gsm_error", "By_gsm_error", "Bz_gsm_error",
  "x_gse", "y_gse", "z_gse", "x_gsm", "y_gsm", "z_gsm",
] as const;

class MagImportError extends Error {}

function hasHdf5Signature(bytes: Uint8Array): boolean {
  const signature = [0x89, 0x48, 0x44, 0x46, 0x0d, 0x0a, 0x1a, 0x0a];
  for (let offset = 0; offset + signature.length <= bytes.length; offset = offset === 0 ? 512 : offset * 2) {
    if (signature.every((byte, index) => bytes[offset + index] === byte)) return true;
  }
  return false;
}

export type MagFieldPreview = {
  name: string;
  frame: "GSE" | "GSM";
  unit: string;
  first: number;
  minimum: number;
  maximum: number;
  uncertaintyFirst?: number;
  firstRecordQuality: 0 | 1;
};

export type AdityaMagL2Preview = {
  schema: "hemant.aditya-mag-l2-preview/1";
  fileName: string;
  byteLength: number;
  sha256: string;
  mission: string;
  instrument: string;
  productLevel: string;
  productVersion: string;
  recordCount: number;
  timeBasis: string;
  cadenceSeconds: number | null;
  firstTimeUnixSeconds: number;
  lastTimeUnixSeconds: number;
  firstTimeUtc: string;
  lastTimeUtc: string;
  validQualityRecords: number;
  invalidQualityRecords: number;
  missingDataPercentage: string;
  fields: MagFieldPreview[];
  warnings: string[];
};

function scalarText(value: unknown, label: string): string {
  if (typeof value === "string" && value.trim()) return value.trim();
  throw new MagImportError(`The product is missing its declared ${label}.`);
}

function asVector(value: unknown, name: string, expectedLength: number): number[] {
  if (!ArrayBuffer.isView(value) || value instanceof DataView) {
    throw new MagImportError(`The ${name} dataset is not a supported numeric vector.`);
  }
  const values = Array.from(value as unknown as ArrayLike<number>, Number);
  if (values.length !== expectedLength) throw new MagImportError(`The ${name} dataset length does not match the time vector.`);
  return values;
}

function finiteStats(values: number[], quality: number[]): { first: number; minimum: number; maximum: number } {
  let minimum = Number.POSITIVE_INFINITY;
  let maximum = Number.NEGATIVE_INFINITY;
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (quality[index] !== 1 || !Number.isFinite(value) || value === -9999) continue;
    minimum = Math.min(minimum, value);
    maximum = Math.max(maximum, value);
  }
  if (!Number.isFinite(minimum) || !Number.isFinite(maximum)) throw new MagImportError("No valid MAG records are available for the selected product.");
  return { first: values[0], minimum, maximum };
}

function isoFromUnixSeconds(value: number): string {
  const date = new Date(value * 1000);
  if (!Number.isFinite(date.getTime())) throw new MagImportError("The product time is outside the supported UTC display range.");
  return date.toISOString();
}

/** Parse a user-selected, small MAG L2 NetCDF-4 file entirely in the browser. */
export async function parseAdityaMagL2(file: File): Promise<AdityaMagL2Preview> {
  if (file.size === 0 || file.size > MAX_PRODUCT_BYTES) {
    throw new MagImportError("Choose a non-empty NetCDF-4 product no larger than 20 MB.");
  }
  if (!file.name.toLowerCase().endsWith(".nc")) throw new MagImportError("Choose a MAG NetCDF product with an .nc filename.");

  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!hasHdf5Signature(bytes)) throw new MagImportError("The selected file does not have a NetCDF-4/HDF5 signature.");
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  const sha256 = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
  const h5wasm = await import("h5wasm");
  const { FS } = await h5wasm.ready;
  if (!FS) throw new MagImportError("The local NetCDF reader could not initialize.");
  const virtualPath = `/aditya-mag-${crypto.randomUUID()}.nc`;
  FS.writeFile(virtualPath, bytes);

  let product: InstanceType<typeof h5wasm.File> | undefined;
  try {
    try {
      product = new h5wasm.File(virtualPath, "r");
    } catch {
      throw new MagImportError("The selected file is not a readable NetCDF-4/HDF5 product.");
    }
    const attributes = product.attrs;
    const mission = scalarText(attributes.platform?.value, "mission platform");
    const instrument = scalarText(attributes.instrument?.value, "instrument");
    const productLevel = scalarText(attributes.processing_level?.value, "processing level");
    const productVersion = scalarText(attributes.product_version?.value, "product version");
    if (mission !== "Aditya-L1" || instrument !== "Magnetometer" || !/^Level\s*2$/i.test(productLevel)) {
      throw new MagImportError("This file is not a supported Aditya-L1 MAG Level 2 product.");
    }

    const timeDataset = product.get("time");
    if (!(timeDataset instanceof h5wasm.Dataset) || timeDataset.shape?.length !== 1 || timeDataset.shape[0] < 2 || timeDataset.shape[0] > MAX_RECORDS) {
      throw new MagImportError("The MAG product has no one-dimensional time dataset.");
    }
    const timeUnit = scalarText(timeDataset.attrs.units?.value, "time unit");
    if (!/UNIX\s*time/i.test(timeUnit)) throw new MagImportError(`Unsupported MAG time basis: ${timeUnit}`);
    const times = asVector(timeDataset.value, "time", timeDataset.shape[0]);
    if (times.length < 2 || times.length > MAX_RECORDS || times.some((value) => !Number.isFinite(value))) {
      throw new MagImportError("The MAG time vector has an unsupported size or contains invalid values.");
    }
    const deltas = times.slice(1).map((value, index) => value - times[index]);
    if (deltas.some((delta) => delta <= 0)) throw new MagImportError("MAG timestamps must be strictly increasing.");
    const cadenceSeconds = deltas.every((delta) => delta === deltas[0]) ? deltas[0] : null;

    const qualityDataset = product.get("Quality_flag_10s_data");
    if (!(qualityDataset instanceof h5wasm.Dataset) || qualityDataset.shape?.length !== 1 || qualityDataset.shape[0] !== times.length) {
      throw new MagImportError("The MAG product has no supported per-record quality flag.");
    }
    const quality = asVector(qualityDataset.value, "Quality_flag_10s_data", times.length);
    if (quality.some((flag) => flag !== 0 && flag !== 1)) throw new MagImportError("The MAG quality flags contain values outside the documented 0/1 range.");

    const valueVectors = new Map<string, number[]>();
    for (const name of requiredVectorNames) {
      const dataset = product.get(name);
      if (!(dataset instanceof h5wasm.Dataset) || dataset.shape?.length !== 1 || dataset.shape[0] !== times.length) {
        throw new MagImportError(`The documented MAG L2 variable ${name} is missing or has an unsupported shape.`);
      }
      const values = asVector(dataset.value, name, times.length);
      if (!scalarText(dataset.attrs.units?.value, `${name} unit`)) throw new MagImportError(`The ${name} dataset has no unit.`);
      valueVectors.set(name, values);
    }

    const fields: MagFieldPreview[] = [];
    for (const frame of ["gse", "gsm"] as const) {
      for (const component of ["Bx", "By", "Bz"] as const) {
        const name = `${component}_${frame}`;
        const uncertaintyName = `${name}_error`;
        const dataset = product.get(name) as InstanceType<typeof h5wasm.Dataset>;
        const values = valueVectors.get(name)!;
        const uncertainty = valueVectors.get(uncertaintyName)!;
        const stats = finiteStats(values, quality);
        fields.push({
          name,
          frame: frame.toUpperCase() as "GSE" | "GSM",
          unit: scalarText(dataset.attrs.units?.value, `${name} unit`),
          ...stats,
          uncertaintyFirst: uncertainty[0],
          firstRecordQuality: quality[0] as 0 | 1,
        });
      }
    }

    const warnings = [
      "UNIX seconds are preserved as declared; this preview does not apply a spacecraft-clock correlation or independently validate UTC accuracy.",
      "MAG quality flag 1 means valid by the product rule; the manual cautions that quiet-time invalid samples may still occur.",
      "The product guide's x_gsm description says Z coordinate although the variable name says x; source wording is retained pending clarification.",
    ];
    const cadence = attributes.time_coverage_resolution?.value;
    const declaredCadence = typeof cadence === "string" ? cadence.trim() : "";
    if (declaredCadence && cadenceSeconds !== null && !declaredCadence.includes(String(cadenceSeconds))) {
      warnings.push(`Observed uniform cadence (${cadenceSeconds}s) differs from the archive's cadence description (${declaredCadence}).`);
    }

    return {
      schema: "hemant.aditya-mag-l2-preview/1",
      fileName: file.name,
      byteLength: file.size,
      sha256,
      mission,
      instrument,
      productLevel,
      productVersion,
      recordCount: times.length,
      timeBasis: `${timeUnit}; original epoch values retained`,
      cadenceSeconds,
      firstTimeUnixSeconds: times[0],
      lastTimeUnixSeconds: times[times.length - 1],
      firstTimeUtc: isoFromUnixSeconds(times[0]),
      lastTimeUtc: isoFromUnixSeconds(times[times.length - 1]),
      validQualityRecords: quality.filter((flag) => flag === 1).length,
      invalidQualityRecords: quality.filter((flag) => flag === 0).length,
      missingDataPercentage: scalarText(attributes.missing_data_percentage?.value, "missing-data percentage"),
      fields,
      warnings,
    };
  } catch (cause) {
    if (cause instanceof MagImportError) throw cause;
    throw new MagImportError("The selected NetCDF-4/HDF5 product is corrupt or uses an unsupported structure.");
  } finally {
    product?.close();
    try { FS.unlink(virtualPath); } catch { /* The virtual file may not exist if parsing failed early. */ }
  }
}
