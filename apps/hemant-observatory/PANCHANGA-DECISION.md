# PANCHANGA-DECISION — open

**Status:** no Panchanga ruleset is selected; every field is `pending` (`panchanga-ruleset` in the method registry).

The project records name a **Kashi (Varanasi)** reference for the Hemant epoch, but they do not name a calculation tradition, source edition, ayanamsha, sunrise rule or month system. These cannot be inferred safely, so they are product-owner decisions:

1. **Tradition and source edition** (for example, an observational *drik* school, or a named siddhantic text with edition).
2. **Location policy:** fixed Kashi coordinates (state them), or a user-selected observer.
3. **Ayanamsha:** name, definition and reference epoch.
4. **Sunrise and day boundary:** upper limb or centre, refraction model, horizon altitude.
5. **Month system:** amanta or purnimanta; adhika/kshaya maasa rules.
6. **Independent reference cases:** a published panchang (publisher, edition) for specific dates and that place, to test against.

## Implementation plan once decided

- The ruleset is a versioned record layered on the ephemeris provider (ASTRONOMY-DECISION-001); it never computes positions itself.
- Fields are added one at a time, in dependency order: tithi/paksha (Sun–Moon elongation only), then karana, then nakshatra/yoga (need ayanamsha), then vara/maasa/ritu/ayana (need sunrise and month rules).
- Each field ships with boundary cases (near-transition instants, location changes, day-boundary cases) checked against the independent reference cases.
- The UI shows the selected location and ruleset beside every value. Unimplemented fields stay `pending`.

Field definitions used on the Panchanga page are in `lib/panchanga.ts`. They describe what each field measures in its commonly stated astronomical form; they are not computed.
