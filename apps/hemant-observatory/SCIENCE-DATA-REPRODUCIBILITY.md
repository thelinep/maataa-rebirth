# Science data reproducibility status

Updated: 2026-10-10. This note separates runnable evidence from archive access and independent qualification still required.

## Runnable in this checkout

Run from this directory:

```sh
node tests/science-reproducibility-smoke.mjs
```

The smoke gate runs the existing Mars 2020 Rust SCLK tests, builds the native shell offline, checks the pinned source-vector fixture through the shell contract, and parses the saved NASA/JPL Horizons DE441 observer fixture. It uses no network and changes no archive data.

The Mars 2020 vector is a bounded implementation of three rows from the V19 archival Type 1 correlation sample. It verifies the stated sample mapping and rejects out-of-coverage input. It does **not** parse a complete kernel, does not convert the result to UTC or TDB, and is not an independent CSPICE comparison. The fixture now explicitly records that its source SHA-256 and CSPICE differential are pending; a missing checksum must not be mistaken for a verified artifact.

The Horizons fixture is a saved public response used to check parser behavior and preserve its DE441, EOP, request, observer, and time metadata. It is not a fresh network query, calibration record, or uncertainty estimate.

## Aditya-L1 MAG L2: browser parser slice

An authenticated PRADAN session provided one MAG L2 product, `L2_AL1_MAG_20260920_V00.nc`, and the official MAG product description, version 1.2. The 251 KB NetCDF-4/HDF5 sample's archive MD5 (`e299ea359e10a6ed0982a5b0ce2a625d`) matched the downloaded bytes. The source file remains outside this repository; no permission to redistribute it is assumed.

The browser-local Aditya workbench now has a bounded `h5wasm` importer. It accepts only `.nc` files up to 20 MB, checks Aditya-L1/Magnetometer/Level 2 metadata, requires the documented one-dimensional time, quality, magnetic-field, uncertainty and position datasets, and rejects malformed shapes, unsupported time units and non-binary quality flags. It computes a SHA-256 checksum locally, summarizes GSE/GSM field values and uncertainty, and displays the UNIX-second basis and quality counts. Raw file bytes and full measurement series are not uploaded or written to localStorage; only a user-requested metadata record is saved in this browser.

`tests/e2e/aditya-mag-import.spec.ts` covers valid synthetic NetCDF-4 input, invalid file signatures and unsupported mission metadata. In this session the real PRADAN sample was also uploaded through the browser test on desktop and mobile; it rendered 8,640 records at 10-second cadence, 8,640 valid quality flags, GSE/GSM measurements and 0.5 nT uncertainty. The test sample stays in the user's Downloads folder and is not part of the repository.

The observed sample contains 8,640 records at 10-second cadence from 2026-09-20T00:00:00Z to 2026-09-20T23:59:50Z, with all sample quality flags set to valid and archive missing-data metadata of 0.0%. Those are properties of this one product, not a general guarantee. The UI retains warnings that this parser does not independently validate calibration, spacecraft attitude, UTC accuracy, or quiet-time science.

The manual lists `x_gsm` as a spacecraft coordinate but its description says “Z coordinate”; the discrepancy is preserved as a warning and must be resolved from an authoritative correction before treating that coordinate as scientifically interpreted. A browser test fixture covers parser behavior, but it does not substitute for comparison against an independent scientific reference.

Remaining Aditya parser gates:

1. Run the browser importer against the retrieved product on desktop and mobile; do not commit the archive file.
2. Compare parsed timestamps, selected values and quality semantics against an independent official reference or separately derived implementation.
3. Resolve the `x_gsm` description discrepancy and review any newly discovered data-quality caveats with the instrument guide/team.
4. Keep the mission-clock correlation, independent calibration validation and live telemetry as separate, unqualified capabilities.

## Evidence references

- [ISRO/ISSDC Aditya-L1 mission data page](https://www.issdc.gov.in/adityal1.html)
- [PRADAN Aditya-L1 instrument FAQ](https://pradan1.issdc.gov.in/al1/faq.xhtml)
- [PRADAN MAG product description, version 1.2](https://pradan1.issdc.gov.in/al1/protected/downloadFile/mag/MAG-UserManual.pdf)
- [ISRO–ESA workshop data-analysis guidance](https://events.iist.ac.in/ISRO-ESA/data_analysis.php)
- [Public ISRO–ESA hands-on materials](https://github.com/ISRO-ESA-Heliophysics-Workshop/hands-on-materials)
- [NAIF Mars 2020 SPICE archive description](https://naif.jpl.nasa.gov/pub/naif/pds/pds4/mars2020/mars2020_spice/document/spiceds_v003.html)
- [NAIF Mars 2020 V19 SCLK refit product](https://naif.jpl.nasa.gov/pub/naif/pds/pds4/mars2020/mars2020_spice/spice_kernels/sclk/m2020_168_sclkscet_refit_v19.tsc)
- [NASA/JPL Horizons system](https://ssd.jpl.nasa.gov/horizons/)

## Completion boundary

This check closes a local, offline reproducibility smoke gate for already-present NASA/JPL fixtures and the bounded Mars 2020 demonstration. The Aditya MAG L2 importer is a separate browser-local preview, not independent science validation. Neither workstream verifies flight hardware or operational telemetry.
