# TLP Film Producer Workspace

The default local project is **30 Trillion India**, a fictional feature-film concept. Its prompt generates stage-specific story, script, production, post, and release planning drafts with a repeatable synthetic scenario dataset. Use **Generate another draft** to cycle through deterministic alternate drafts for the active stage. Open the TLP product overview with **Public surface** or visit `/?surface=tlp`; its **30 Trillion India** link opens the separate film concept page at `/?surface=film`.

The simulations are workflow fixtures only: no real budget, cast, crew, location, shoot, rights clearance, distributor, release, audience, or revenue data is connected. The title is not an economic forecast or a statement of current fact.

Standalone local app for exploring a film project through Ideation, Script, Pre production, Production, Post production, and Release.

```sh
pnpm tlp:dev
pnpm tlp:typecheck
pnpm tlp:build
```

The project name, active stage, checklist, and per-stage draft iteration persist in browser local storage. Policy, subsidy, tax, legal, market, and pricing claims from the supplied legacy timeline are not repeated as current facts; the Release stage makes verification work explicit. No backend, account, rights clearance, booking, or funding service is connected. Draft generation is deterministic fixture content; no LLM provider is called.
