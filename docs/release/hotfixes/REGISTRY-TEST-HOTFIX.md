# MAATAA UI Alpha 8.2 Registry Test Hotfix

Updates the frozen `REGISTRY_REGISTRY` test count from 212 to 217.

Reason: Alpha 7/8 added five governed package/developer registries for Redux slices, Redux selectors, type contracts, demo datasets, and demo scenarios. The runtime registry contains 217 entries, while the test fixture still expected 212.

No runtime/public API behavior is changed.
