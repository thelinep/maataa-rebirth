# Browser qualification scope

The automated matrix contains Chromium, Firefox and WebKit at desktop and mobile-sized viewports. Chromium uses Pixel emulation and WebKit uses iPhone emulation. Firefox's mobile-sized project uses a 390 × 844 viewport without claiming mobile-device emulation.

Each project executes route rendering, axe critical/serious checks, canonical catalogue selection, actual layout execution, container-responsive phone composition, keyboard/focus behavior and malformed composition refusal. The matrix qualifies these scenarios on the installed Playwright engines; it does not certify every browser release, real-device assistive technology, all canonical combinations or complete accessibility compliance.

`pnpm browser:install` installs all three engines. `pnpm browser:test` builds the production demo and executes the matrix. The preview server is launched directly so its lifecycle belongs to the browser runner. Reports must be captured in the exact-commit release evidence pack. Manual screen-reader review and real-device acceptance remain separate GA gates.
