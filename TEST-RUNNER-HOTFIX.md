# Alpha 8.4 test-runner isolation hotfix

Vitest and Playwright now own separate test namespaces.

- Vitest: `tests/**/*.test.ts` and `tests/**/*.test.tsx`
- Playwright: `tests/e2e/**/*.spec.ts`

This prevents `pnpm test` / `pnpm certify` from collecting Playwright specs and throwing `Playwright Test did not expect test() to be called here`.

No runtime or public UI API changed.
