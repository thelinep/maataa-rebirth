# MAATAA UI Alpha 8 — Typecheck Hotfix

Fixes the six TypeScript errors reported by the installed-dependency `pnpm certify` gate:

1. Listener action payload inference — use `actionCreator` listener binding.
2. AI message readonly citations vs Immer draft — clone citations before pushing.
3. Demo user readonly role/permission arrays vs Immer draft — assign a mutable clone.
4. Redux middleware tuple inference — build one concat chain without reassigning a fixed-length tuple.
5. Invalid `as const` on `.map()` result — retain literal `kind` only.
6. Dynamic heading tag widening to all JSX intrinsic elements — constrain heading tags to h1–h6.

No public package addresses or registry IDs are changed.
