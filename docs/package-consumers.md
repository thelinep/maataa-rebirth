# Packed package consumer qualification

`pnpm package:consumer` builds and packs the actual package, installs that tarball in fresh Vite and Next.js App Router fixtures, then runs strict TypeScript and production builds. Plain Node imports test the root, composer and runtime entry points without bundler resolution. Consumers import CSS, direct leaves, barrels, VisualComposer, both composition runtimes and the shared specification.

The emitted ESM finalizer resolves every relative static or dynamic import against an actual emitted JavaScript file. It refuses missing targets and preserves user-generated code strings. Compiler source-map comments are removed because rewritten offsets invalidate them. React TSX implementation entry points receive a preserved `use client` directive; pure TypeScript specification/registry modules remain usable on the server.

Next.js 16.3.8 is pinned in the fixture, using React 19. This is a tested candidate matrix, not a claim that every declared peer version has been qualified. React 18 and other Next versions require separate evidence. A PASS report is produced only after both fixtures complete; the current legacy report does not yet establish exact-commit release certification.
