import { expect, test } from "@playwright/test";
import { File, ready } from "h5wasm/node";

async function makeMagL2Fixture(platform = "Aditya-L1"): Promise<Buffer> {
  const { FS } = await ready;
  const path = `/tmp/playwright-mag-${crypto.randomUUID()}.nc`;
  const file = new File(path, "w");
  file.create_attribute("platform", platform);
  file.create_attribute("instrument", "Magnetometer");
  file.create_attribute("processing_level", "Level 2");
  file.create_attribute("product_version", "V_00");
  file.create_attribute("missing_data_percentage", "50.0");
  file.create_attribute("time_coverage_resolution", "Minimum of 10 seconds");

  const start = Date.parse("2026-09-20T00:00:00Z") / 1000;
  const time = file.create_dataset({ name: "time", data: new Float64Array([start, start + 10]) });
  time.create_attribute("units", "Seconds (UNIX time)");
  time.create_attribute("description", "Epoch starts at Jan 1, 1970 00:00:00, bin-width = 10second");

  const quality = file.create_dataset({ name: "Quality_flag_10s_data", data: new Float32Array([1, 0]) });
  quality.create_attribute("units", "Arbitrary");
  quality.create_attribute("description", "0 = Bad/missing data; 1 = Valid data");

  for (const frame of ["gse", "gsm"]) {
    for (const [component, value] of [["Bx", -11], ["By", -2], ["Bz", 3]] as const) {
      const name = `${component}_${frame}`;
      const dataset = file.create_dataset({ name, data: new Float32Array([value, value + 1]) });
      dataset.create_attribute("units", "nano tesla - nT");
      dataset.create_attribute("description", `Field component in ${frame.toUpperCase()} frame`);
      const uncertainty = file.create_dataset({ name: `${name}_error`, data: new Float32Array([0.5, 0.6]) });
      uncertainty.create_attribute("units", "nano tesla - nT");
      uncertainty.create_attribute("description", "Uncertainty");
    }
  }
  for (const frame of ["gse", "gsm"]) {
    for (const [axis, value] of [["x", 1668], ["y", -158], ["z", 133]] as const) {
      const dataset = file.create_dataset({ name: `${axis}_${frame}`, data: new Float32Array([value, value + 1]) });
      dataset.create_attribute("units", "kilometers - km");
      dataset.create_attribute("description", `${axis.toUpperCase()} coordinate in ${frame.toUpperCase()} frame`);
    }
  }

  file.close();
  const bytes = Buffer.from(FS.readFile(path));
  FS.unlink(path);
  return bytes;
}

test("MAG L2 import parses documented fields locally and saves metadata only", async ({ page }) => {
  const bytes = await makeMagL2Fixture();
  await page.goto("/spacecraft");
  await page.getByLabel("MAG L2 NetCDF file").setInputFiles({
    name: "L2_AL1_MAG_20260920_V00.nc",
    mimeType: "application/x-netcdf",
    buffer: bytes,
  });

  const preview = page.getByRole("region", { name: "Parsed MAG L2 product preview" });
  await expect(preview).toBeVisible();
  await expect(preview).toContainText("2 · 10 s");
  await expect(preview).toContainText("1 valid · 1 invalid");
  await expect(preview).toContainText("Bx_gse");
  await expect(preview).toContainText("-11.0000");
  await expect(preview).toContainText("UNIX seconds are preserved");
  await preview.getByRole("button", { name: "Save metadata locally" }).click();
  await expect(page.getByRole("list", { name: "Registered products" })).toContainText("L2_AL1_MAG_20260920_V00.nc");
  await expect(page.locator("p.aditya-footnote[role=status]")).toContainText("no raw science data stored");
});

test("MAG importer rejects a file that is not NetCDF-4/HDF5", async ({ page }) => {
  await page.goto("/spacecraft");
  await page.getByLabel("MAG L2 NetCDF file").setInputFiles({
    name: "not-a-product.nc",
    mimeType: "application/octet-stream",
    buffer: Buffer.from("not a NetCDF-4 product"),
  });
  await expect(page.locator("p.aditya-alert[role=alert]")).toContainText("NetCDF-4/HDF5");
});

test("MAG importer rejects a readable product from an unsupported mission", async ({ page }) => {
  const bytes = await makeMagL2Fixture("Unsupported-Mission");
  await page.goto("/spacecraft");
  await page.getByLabel("MAG L2 NetCDF file").setInputFiles({
    name: "unsupported-mission.nc",
    mimeType: "application/x-netcdf",
    buffer: bytes,
  });
  await expect(page.locator("p.aditya-alert[role=alert]")).toContainText("not a supported Aditya-L1 MAG Level 2 product");
});

test("retrieved PRADAN MAG L2 sample parses in the browser when supplied locally", async ({ page }) => {
  const samplePath = process.env.ADITIYA_MAG_SAMPLE;
  test.skip(!samplePath, "Set ADITIYA_MAG_SAMPLE to a locally obtained product; archive data is not checked in.");
  await page.goto("/spacecraft");
  await page.getByLabel("MAG L2 NetCDF file").setInputFiles(samplePath!);
  const preview = page.getByRole("region", { name: "Parsed MAG L2 product preview" });
  await expect(preview).toBeVisible();
  await expect(preview).toContainText("8,640 · 10 s");
  await expect(preview).toContainText("8,640 valid · 0 invalid");
  await expect(preview).toContainText("-11.0556");
  await expect(preview).toContainText("0.5000");
  await expect(preview).toContainText("x_gsm description says Z coordinate");
});
