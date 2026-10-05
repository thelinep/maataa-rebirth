# Device runtime and responsive transformations

Device IDs resolve through DEVICE_REGISTRY and VIEWPORT_REGISTRY. Named presets are convenience aliases. Dimensions and default orientation come from those catalogues; unknown device/viewport references produce an explicit error. DeviceContainerContext supplies measured container width, canonical capabilities and input modalities to composition.

Composition-specific CSS uses a named inline-size container. Runtime transformation selection follows actual measured width, not the host browser viewport. Four existing canonical rules have typed executable operations: sidebar→drawer, inspector→bottom-sheet drawer, navigation→bottom region, and grid→stack. Applicable rules without executable operations remain listed as unverified; descriptive metadata is never evaluated as code.

Capability declarations establish positive support. Missing declared capability evidence yields LIMITED; unknown requirements/device evidence yields UNVERIFIED. UNSUPPORTED is reserved for future explicit negative evidence and is not inferred from absence. Device metadata is declared support, not physical-hardware certification.

C1–C3 development qualification: TypeScript, 178 unit tests, production demo build and 40 desktop/mobile Chromium tests passed. All 187 devices resolve to positive viewport dimensions. A browser test proves the phone layout stacks inside a 1440px host viewport. The 100-layout derived mapping remains current. No dynamic/static collision warnings were introduced.
