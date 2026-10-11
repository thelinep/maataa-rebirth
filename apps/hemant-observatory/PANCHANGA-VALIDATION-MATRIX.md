# Panchanga validation matrix

Status: candidates remain side-by-side options. There is no selected canonical tradition, location, ayanamsha or calendar profile. Only instantaneous tithi/paksha/karana angle classification currently runs; the remaining rows are requirements, not outputs.

| Field / layer | Current implementation | Independent evidence needed | Boundary and acceptance tests | Gate |
| --- | --- | --- | --- | --- |
| Time and ephemeris | JPL Horizons apparent geocentric Sun/Moon longitudes; host/Worker clock unverified | Same UTC/TDB instant, target, observer, frame, corrections and named ephemeris from an independent source (e.g. IMD ephemeris or qualified SPICE kernels); publish tolerance before comparison | UTC/TAI/TT/TDB conversion, leap-second boundary, provider outage, stale data, angular wrap, frame/correction mismatch rejected | OPEN |
| Tithi | Instant elongation bins of 12 degrees | Published instant or boundary from each selected authority/edition | Just before/at/after every 12-degree boundary; wrap at 0/360; exact convention for boundary inclusion | PARTIAL |
| Paksha | Derived from elongation split at 180 degrees | Same reference set as tithi | Test 0, 180 and either side; named bright/dark half mapping | PARTIAL |
| Karana | Instant 6-degree bins; name sequence exists in Rust | Authority's complete 60-half-tithi naming sequence and reference outputs | All 60 positions, repeated seven karanas, four fixed karanas, month wrap, exact boundaries | PARTIAL |
| Nakshatra | Not calculated | Selected sidereal longitude method and named ayanamsha with source/epoch; published reference longitudes | All 27 boundaries (and optional 28th scheme only as a separate profile), wrap, ayanamsha transitions, uncertainty | OPEN |
| Yoga | Not calculated | Same selected ayanamsha and independent Sun/Moon sidereal longitudes | Sum wrap, all 27 boundaries, just-before/at/after vectors | OPEN |
| Vara | Not assigned to a date | Civil-timezone policy and chosen day boundary; sunrise source and exact observer | Midnight vs local sunrise comparison, timezone/DST database updates where applicable, sunrise-day transition | OPEN |
| Sunrise/day assignment | Not implemented | Exact coordinates/elevation; upper limb/center, refraction, horizon/elevation policy from authority; solar ephemeris | Polar/high-latitude cases, elevation, atmospheric convention, local date boundary, missing sunrise | OPEN |
| Maasa | Not calculated | Amanta, purnimanta, or separate nirayana solar profile; authority's month naming and new/full moon rules | New/full moon around sunrise, month transition, regional name sequence | OPEN |
| Adhika/kshaya month | Not implemented | Explicit authority rule and reference year(s) | Cases with inserted/omitted month and edge conjunctions; no guessed fallback | OPEN |
| Ritu | Not calculated | Selected lunar/solar mapping and edition | Every seasonal boundary, year wrap, region/profile comparison | OPEN |
| Ayana | Not calculated as a Panchanga field | Keep tropical solstice and sidereal Makara ingress as independent selectable definitions | Compare event instants, explicit ayanamsha, distinct event labels, local observance separate | OPEN |
| Sankranti | JPL solar sign crossing with explicit numeric offset and one-minute samples | Named/versioned ayanamsha implementation and independent event table | 12 sign boundaries, wrap, bracket convergence, minute-resolution statement, uncertainty budget | PARTIAL |
| Local observance | Not implemented | Publisher/location-specific observance rules | Events near sunrise or local date boundary; compare published observance dates | OPEN |

## Per-profile qualification record

Every selectable track must carry: authority/publisher; title, edition/year and source URL; algorithm and version; ephemeris and time-scale/kernel identity; location coordinates/elevation and source; timezone database version; ayanamsha definition/epoch if applicable; sunrise/day and month rules; raw computed instants; uncertainty or explicit unknown; reference case and tolerance; test result; software revision. A profile with any required value absent remains `not calculated` or `not qualified`.

## Initial location cohort (provisional test plan)

The selected first comparison cohort is Delhi, Chennai, Kolkata, Mumbai, and Guwahati. Leh is included separately as an elevation/terrain stress case; it must not be labelled a 60°N high-latitude case. This selection does not set the canonical observer location. Before creating numeric sunrise vectors, resolve an exact site per city, WGS84 latitude/longitude, elevation and coordinate source, timezone handling, and the authority-specific horizon/refraction convention. Until those inputs and independent expected sunrise cases are recorded, all six locations remain `not calculated`.

## Order of work

1. Preserve the current instantaneous angle slice and validate it with independently sourced longitudes and boundary vectors.
2. Implement candidate ayanamsha transforms as separate versioned methods; compare nakshatra/yoga outputs for every selected profile.
3. Add a location model, time-zone data provenance, and sunrise calculator with the chosen limb/refraction conventions selectable per track.
4. Assign tithi, paksha and vara to civil days; compare amanta, purnimanta and solar calendars as separate profiles.
5. Add month, intercalation, ritu, ayana and local observance rules one at a time, each with published vectors.
6. Release only the profile/method versions whose entire evidence row and tests pass. Keep others visible as candidates with no numbers.

The user requested that options remain available for comparison. This matrix preserves that requirement and does not nominate a default.
