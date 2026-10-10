# Spacecraft clock scales and adapters

Status: one bounded Rust/Wasm demonstration exists for a public Mars 2020 archival SCLK correlation. No mission-independent spacecraft clock adapter or flight-qualified software exists.

## What is implemented

The spacecraft workbench accepts caller-supplied Unix timestamps for sensor records and preserves their declared time scale, frame, calibration, source and uncertainty. It still does not ingest hardware telemetry or solve spacecraft navigation.

The new `hemant.spacecraft-clock/1` endpoint accepts a Mars 2020 SCLK string in the mission format `SSSSSSSSSS-FFFFF`, selects a version-pinned three-row subset (the first two intervals) of NAIF's V19 Type 1 table, and emits TDT integer nanoseconds past J2000. It supports only encoded ticks `[0, 18614849830912)`. Other formats, fractions outside `0..65535`, malformed tables, and readings outside that subset are rejected. The exact sample `0189345666-00000` maps to `189345666000000000` TDT nanoseconds past J2000; the source SCET table gives `2006-001T00:00:00.816 UTC` for the same SCLK count. This is a reproducible source-consistency vector, not an independent CSPICE comparison. No full kernel is bundled and no checksum has been verified for the upstream artifact.

The current NAIF archive lists `m2020_168_sclkscet_refit_v19.tsc`. Its header says this is an archival surface refit and was not used during operations. The embedded example intentionally does not label its output as UTC or TDB, and does not make a flight-readiness claim. The adapter rounds its result to integer nanoseconds; this output formatting resolution is not a bound on the source clock correlation error.

## Spacecraft time choices

Keep the input representation and the target time scale separate:

| Layer | Examples | Meaning |
| --- | --- | --- |
| Mission clock input | SCLK seconds/fraction, partitioned SCLK, mission-specific counter | Onboard count whose encoding, partitions, rollover and calibration are mission-defined. |
| Continuous reference scale | TAI, TT/TDT, TDB, UTC | Named time scales. A UTC label may require leap-second data; ephemeris time conversion commonly uses TDB. |
| Wire encoding | CCSDS CUC/CDS or another packet format | A representation of time fields; the code format alone does not establish the clock's accuracy or correlation. |

For a mission correlation, the adapter must identify the mission and spacecraft clock ID, clock format/type, partition, kernel or correlation-product identity and version, checksum, applicable range, target scale and epoch, leap-second data where required, conversion library/version, and uncertainty/freshness. Conversion outside the published coverage must fail closed. Never infer a correlation from an epoch, rate guess, device locale, or Hemant Samvat units.

## Atomic remaining gates

1. Select the mission(s) and operational versus archival products to support; obtain mission-owner-approved kernels/correlation tables and licensing/reuse conditions.
2. Pin the exact SCLK, LSK and (where needed) planetary/time kernels with immutable URLs, product versions and verified checksums. Establish a controlled update process for revised kernels.
3. Implement mission format, partition, rollover, reset and piecewise-rate parsing. Parse the source format strictly; reject unsupported SCLK kernel types.
4. Convert SCLK to TDB/TDT using the pinned correlation. Convert to UTC only through pinned leap-second data; keep scale and conversion provenance on every output.
5. Differential-test against NAIF CSPICE/SPICE for published and boundary vectors: each interval start/end, partition transitions, resets, fractional ticks, before/after coverage and round trips.
6. Propagate source correlation uncertainty, quantization, kernel age and clock drift; define stale-kernel and no-correlation behavior.
7. Add each mission adapter as a separate versioned option. Do not silently choose a mission, time scale, epoch, partition, or latest-kernel policy.
8. Qualify target hardware/compiler, memory bounds, deterministic behavior, watchdog/fault handling, telemetry transport, security and update/rollback before any flight use.

## Primary sources

- [NAIF SPICE SCLK Required Reading](https://naif.jpl.nasa.gov/pub/naif/toolkit_docs/C/req/sclk.html) — SCLK encoding, partitions, clock-specific conversion and piecewise rate behavior.
- [NAIF Mars 2020 SCLK archive directory](https://naif.jpl.nasa.gov/pub/naif/pds/pds4/mars2020/mars2020_spice/spice_kernels/sclk/) — versioned products; archive observed 2026-10-10 listed V19.
- [Mars 2020 SCLK refit V19 kernel](https://naif.jpl.nasa.gov/pub/naif/pds/pds4/mars2020/mars2020_spice/spice_kernels/sclk/m2020_168_sclkscet_refit_v19.tsc) — format, version, applicable period, SCET rows, clock ID and Type 1 coefficients.

## Panchanga validation stays separate

Panchanga profile alternatives remain selectable and assumptions-only until each is connected to named, published rules and reference cases. Finish those paths independently: source and edition per authority; observer location/height/timezone policy; ayanamsha algorithm/version; sunrise limb/refraction rule; amanta/purnimanta and intercalary-month rules; and reference vectors for tithi/day assignment, nakshatra, yoga, karana, vara, masa, ritu, ayana and Sankranti. Compare every candidate against its own authority and an independent implementation/reference, with tolerances and provenance. Do not collapse different traditions into a single “scientific Panchanga” result.
