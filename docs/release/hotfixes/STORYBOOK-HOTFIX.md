# Alpha 8.3 Storybook dependency hotfix

Certification reached Storybook after TypeScript and Vitest passed.

The build failed resolving `@storybook/react/dist/entry-preview.mjs`.

This hotfix:

- adds `@storybook/react` 8.6.18 as a direct dev dependency;
- pins `storybook`, `@storybook/react-vite`, `@storybook/react`, `@storybook/addon-a11y`, and `@storybook/addon-essentials` to 8.6.18;
- adds `pnpm storybook:check` to verify the declared Storybook stack before build.

No MAATAA runtime/public API code is changed.
