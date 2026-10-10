# S-04 ephemeris differential-validation plan

**Status: open; no new scientific result is claimed here.** The committed Horizons fixture verifies parsing and replay of one provider response. It does not independently validate the ephemeris model or the apparent-coordinate implementation.

## What the current evidence proves

The saved fixture at `fixtures/jpl-observation-2026-10-10T0000Z.json` records a NASA/JPL Horizons observer-table response for the Sun and Moon, with the requested UTC instant, geocenter, apparent ecliptic-of-date quantity, and DE441/EOP response metadata. `tests/jpl-fixture-smoke.mjs` checks that the saved response still parses to its recorded angles. The live smoke test checks a fresh Horizons response and Rust/Wasm angle-bin parity when the host can reach the service. These checks establish fixture integrity, parser behavior, and arithmetic parity; they do not provide a second source for the angles.

The Rust `EphemerisProvider` remains `NoEphemeris`, which returns `Pending`. The Rust tests for tithi and Sankranti exercise arithmetic given supplied angles; they are not ephemeris validation tests.

## Required comparison tracks

Keep two different claims separate:

1. **Implementation differential test:** compare outputs from two implementations using the same pinned ephemeris data and exactly matched request semantics. A Horizons result and a local NAIF/SPICE calculation based on the same DE kernel can test that independent software paths agree. It does not independently validate the underlying DE solution.
2. **Independent model comparison:** compare against a separately produced ephemeris solution, such as a named, versioned planetary ephemeris from another provider, with its own published uncertainty and compatible time/frame conventions. Do not call two interfaces to the same DE solution independent models.

The first track is the next bounded test. The current user-visible Horizons values are *apparent* observer coordinates: the Horizons manual defines apparent coordinates as including light-time, gravitational deflection and stellar aberration, and describes the ecliptic-of-date frame separately from ICRF/J2000. A geometric state-vector result cannot be compared directly to those angles. For each fixture, record and match:

- target and observer IDs;
- UTC input and the exact converted ephemeris argument (TDB/ET), including the pinned leap-second kernel;
- requested output quantity, origin, axes/frame, and epoch of the ecliptic;
- geometric, astrometric, or apparent correction setting and its exact implementation;
- planetary SPK identity, version, coverage, and SHA-256; LSK identity/hash; and EOP identity/coverage if the selected quantity uses EOP;
- output units, raw reference output, retrieval/build metadata, and software versions.

Horizons documents that it supports distinct frames and time scales and that its defaults must be checked. NAIF's SPICE required readings document SPK state lookup and frame transformations. Therefore the fixture generator must preserve explicit settings rather than rely on defaults. See the primary-source links below.

## Vector set and acceptance rule

Start with at least three geometric state-vector epochs already identified in `ASTRONOMY-DECISION-001.md` (J2000, 2024 equinox, and the Hemant reference epoch), and include a date near the end of the selected kernel's coverage. Use the same pinned SPK and LSK on both paths. Capture Cartesian states for Earth relative to SSB, Moon relative to Earth, and Sun relative to SSB; also retain one observer-angle case only if both paths can exactly reproduce its correction/frame semantics.

Do not copy the previous `< 1 km` target tolerance as if it were source-derived. It was a planning target, not a measured or published acceptance bound. Before the test is considered qualified:

1. Capture full-precision outputs and the producing query/kernel identities from both implementations.
2. Establish numerical tolerance from the declared representation precision and documented algorithm error, separately from the physical ephemeris uncertainty.
3. Report component-wise residuals and a norm; fail on missing coverage, changed kernel identity, scale/frame mismatch, or values outside the frozen tolerance.
4. Keep the S-04 claim labelled **implementation differential test** unless a second independent ephemeris model is also compared.

No numeric tolerance is frozen by this plan because the available checked-in evidence contains only the seven-decimal-degree apparent-angle fixture and no second implementation output. Decimal print precision is not an uncertainty estimate.

## Atomic implementation tasks

1. Select a supported and licensed local SPICE implementation path (CSPICE FFI or a maintained Rust reader); record its version and build provenance.
2. Obtain the exact planetary kernel and LSK from the official NAIF archive; retain original files outside Git and record URL, version, coverage, byte size and SHA-256 in an evidence manifest.
3. Generate matched Horizons vector queries with all settings explicit; save raw requests, raw responses, response signatures, retrieval date, and reported ephemeris identity as immutable fixtures.
4. Write a small offline differential harness that consumes only the pinned kernels and saved fixtures, reports per-body residuals, and fails closed on metadata mismatch or out-of-coverage epochs.
5. Add boundary tests at kernel coverage start/end and time-scale conversion boundaries; test a deliberately mismatched frame, correction, and ephemeris identity is rejected.
6. Freeze the tolerance after observing and documenting numerical/representation error. A reviewer must approve the physical-accuracy interpretation separately.
7. Only after the above, update S-04 evidence and decide whether a distinct independent-model comparison is needed for the intended product claim.

## Explicitly not established

- No local SPICE/CSPICE runtime or DE kernel is present in the checked workspace.
- No second implementation output or independent-model reference vector is checked in.
- No tolerance for the current apparent-angle path has been demonstrated.
- No Panchanga profile, sunrise assignment, observance, spacecraft navigation, or flight qualification follows from this plan.

## Primary references

- [JPL Horizons System manual](https://ssd.jpl.nasa.gov/horizons/manual.html): supported time scales, frames, observer quantities, correction definitions and explicit-setting cautions.
- [JPL Horizons API documentation](https://ssd-api.jpl.nasa.gov/doc/horizons.html): reproducible programmatic requests and returned metadata.
- [NAIF SPICE SPK Required Reading](https://naif.jpl.nasa.gov/pub/naif/toolkit_docs/C/req/spk.html): SPK state-vector data and coverage behavior.
- [NAIF SPICE Frames Required Reading](https://naif.jpl.nasa.gov/pub/naif/toolkit_docs/C/req/frames.html): frame definitions and transformations.
- [NAIF SPICE Time Required Reading](https://naif.jpl.nasa.gov/pub/naif/toolkit_docs/C/req/time.html): time-system conversions and leap-second kernel role.
- [NAIF generic planetary SPK archive](https://naif.jpl.nasa.gov/pub/naif/generic_kernels/spk/planets/): official source for versioned planetary kernels; pin a concrete artifact and checksum before use.
