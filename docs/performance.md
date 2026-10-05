# Performance evidence

The production demo build emits `.certification/performance/topology.json` from Rollup's actual output graph. Each chunk records static/dynamic dependencies, initial reachability, raw/gzip bytes, contributing modules, rendered lengths and source importers. No chunk partitioning changed for this audit.

The first post-contract baseline contains 963,296 bytes of statically reachable initial JavaScript (171,820 gzip bytes). The composer chunk is 97,654 bytes. The largest deferred chunk is 356,527 bytes; despite its ChartPoint filename, its largest contributors are generated preview loaders, the demo application and registry metadata. The component registry's 271,760-byte chunk is initial. Module names alone do not identify bundle responsibility.

`pnpm performance:check` enforces recorded candidate regression ceilings approximately ten percent above that measured baseline. Raising a ceiling requires a documented cause and review, not blindly accepting changed output. These ceilings establish regression checks, not enterprise interaction-time or memory readiness. Route bytes, registry parse cost, time-to-interactive and memory remain NOT_RUN until separately measured. Browser network activity may load additional deferred chunks beyond the static initial closure.
