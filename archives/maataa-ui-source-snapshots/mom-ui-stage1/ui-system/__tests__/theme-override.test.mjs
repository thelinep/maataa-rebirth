/** Override re-theming test — proves ThemeProvider overrides drive component colors.
 *  Run after build: node ui-system/__tests__/theme-override.test.mjs (imports dist). */
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { foundations, components } from "../../dist/ui-system/index.js";

const h = React.createElement;
const render = (overrides) =>
  renderToStaticMarkup(
    h(
      foundations.ThemeProvider,
      { overrides },
      h(components.Card, { accent: "primaryGold", title: "T", action: "Go" }, "x")
    )
  );

const base = render(undefined);
const themed = render({ "--maataa-accent-primary": "#E11D48", "--maataa-surface-alt": "#11001a" });

let pass = 0;
// 1. base injects the canonical gold
assert.match(base, /--maataa-accent-primary:\s*#D4AF37/);
pass++;
// 2. override replaces it
assert.match(themed, /--maataa-accent-primary:\s*#E11D48/);
pass++;
assert.ok(!/--maataa-accent-primary:\s*#D4AF37/.test(themed), "override must replace base gold");
pass++;
// 3. override of surface-alt applied
assert.match(themed, /--maataa-surface-alt:\s*#11001a/);
pass++;
// 4. component still references the token (so override actually flows through)
assert.match(themed, /var\(--maataa-accent-primary\)/);
pass++;
// 5. untouched tokens keep defaults
assert.match(themed, /--maataa-status-ok:\s*#22C55E/);
pass++;

console.log(`theme-override.test: ${pass}/6 assertions PASS — overrides re-theme components`);
