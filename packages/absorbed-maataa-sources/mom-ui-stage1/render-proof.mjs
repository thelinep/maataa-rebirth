import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { writeFileSync } from "node:fs";
const M = await import("./dist/ui-system/index.js");
const { foundations: F, components: C } = M;
const h = React.createElement;
const panel = () =>
  h("div", { style: { display: "grid", gap: 10, padding: 18 } }, [
    h("div", { key: 1 }, [
      h(C.Button, { variant: "primary" }, "Primary"),
      " ",
      h(C.Button, { variant: "secondary" }, "Secondary")
    ]),
    h("div", { key: 2 }, [h(C.Badge, { tone: "active" }, "Active"), " ", h(C.Badge, { tone: "nogo" }, "NO_GO")]),
    h(C.Card, { key: 3, title: "Card", accent: "primaryGold", action: "Open" }, "token-themed"),
    h(C.Progress, { key: 4, value: 72 })
  ]);
const make = (overrides, label) =>
  h("div", { key: label, style: { flex: 1 } }, [
    h("h3", { key: "h" }, label),
    h(F.ThemeProvider, { key: "p", overrides }, panel())
  ]);
const body = renderToStaticMarkup(
  h("div", { style: { display: "flex", gap: 20 } }, [
    make(undefined, "Default (canonical)"),
    make(
      {
        "--maataa-accent-primary": "#E11D48",
        "--maataa-accent-secondary": "#06B6D4",
        "--maataa-surface-alt": "#1b1330"
      },
      "Rethemed (overrides)"
    )
  ])
);
writeFileSync(
  new URL("../../attic/root-previews/maataa-ui-render-proof.html", import.meta.url),
  `<!doctype html><meta charset="utf-8"><style>@keyframes maataa-spin{to{transform:rotate(360deg)}}body{margin:0;background:#0A0E17;color:#e8eef6;font-family:Inter,system-ui;padding:16px}h3{font-size:13px;color:#8b9bb4}</style>` +
    body
);
const golds = (body.match(/#D4AF37/g) || []).length,
  crimson = (body.match(/#E11D48/g) || []).length;
console.log(
  "default-gold occurrences:",
  golds,
  "| rethemed-crimson occurrences:",
  crimson,
  "|",
  golds > 0 && crimson > 0 ? "SIDE-BY-SIDE OK" : "FAIL"
);
