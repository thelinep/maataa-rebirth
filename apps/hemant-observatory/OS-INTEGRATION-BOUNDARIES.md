# OS clock, Panchanga arithmetic, and restricted-data boundaries

This note distinguishes code that is present from integrations that still need external evidence.

## Clock producer

MAATAA Desktop now exposes a Tauri `read_host_clock_snapshot` command with the `maataa.clock-source/1` schema. It reads Rust `SystemTime` in the desktop process and returns the Unix nanosecond observation as a decimal string. The response is always `unverified`; `rtcBinding`, `trustedReference`, and `driftMillis` are null. The 2,000 ms field is a future policy limit, not a measured tolerance. The UI obtains its native clock display through this command and fails closed when the contract is malformed or the command fails.

No hardware RTC binding, independent trusted reference, or OS-to-Hemant IPC consumer exists here. Consequently this is a host clock observation over Tauri IPC, not a verified MAATAA OS clock bridge. Clock verification remains blocked until an identified OS timer/RTC producer and authenticated reference/correlation protocol are available and tested end-to-end. Drift must remain unavailable until such a reference exists; no client-supplied timestamp is treated as trusted.

## Panchanga angle arithmetic

The Rust core and Wasm expose instantaneous integer angle classification for tithi, nakshatra, and yoga. Nakshatra and yoga use exact rational 27-part bins; sidereal bins require an explicit ayanamsha in microdegrees. The function consumes caller/provider-supplied apparent longitudes and does not compute them. It records the numeric offset in output but the caller must retain the method ID, source, epoch, and version as provenance.

There is no Lahiri/Chitrapaksha numerical offset default in the calculation path. Selecting a named method without a cited, epoch-specific value and provenance would fabricate an input, so the UI's methods remain candidates and calculated sidereal results remain unavailable unless the caller supplies a value. Sunrise day assignment, tradition-specific observance, and independent scientific validation remain pending.

## Restricted Aditya MAG assets

The Aditya-L1 MAG importer has been removed from the spacecraft module's registration path. Its source remains in the repository but is not included by that route. An accidental import in a build marked `MAATAA_COMMERCIAL_RELEASE=true` throws `ADITYA_MAG_QUARANTINED`.

`MAATAA_ISRO_PERMITTED=true` alone is not sufficient authorization. This repository has no verifiable written-permission token format, trusted signing key, or token verifier; there is intentionally no code path that treats a self-asserted environment value as proof. The workbench must remain quarantined until legal permission and a verifiable trust anchor are supplied, reviewed, and tested. No proprietary agency connector registry was found during this change; no connector was added.
