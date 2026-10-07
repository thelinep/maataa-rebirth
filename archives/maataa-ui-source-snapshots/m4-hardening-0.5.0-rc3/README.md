# MAATAA UI 0.5.0-rc.3 — M4 Mock Harness & Evidence Hardening

This RC keeps the certified 11-package kernel and experimental camera domain. Software, protocol, mock-harness, browser and DPR2 evidence are executable from the tree. Final 0.5.0 remains **BLOCKED** until the external real-camera gate supplies physical-device evidence.

The real-camera gate is adapter/hardware interoperability only. Full MAATAA React governance-to-real-hardware integration is deliberately deferred to M5 / 0.6.0.

`npm run gate:camera-harness` exercises the shipped 17-step camera orchestration against a conformance-strict local test double before hardware is touched.

Run `npm run certify`. Without a configured/reachable physical camera the expected terminal result is a typed BLOCKED status and the release gate remains `NOT_RUN`; this is the intended rc.3 state.
