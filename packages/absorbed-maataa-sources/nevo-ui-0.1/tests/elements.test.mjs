import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { render } from "@testing-library/react";
import { Box, ButtonBase, Glyph, Heading, Picture, Region, Text, TextLink, UiLinkProvider, VarScope } from "../dist/index.js";

const h = React.createElement;

test("element primitives render the named element and add no class or style of their own", () => {
  const { container } = render(h(Region, { as: "main", id: "m" },
    h(Heading, { level: 2, className: "title" }, "Heading"),
    h(Text, null, "Para"),
    h(Text, { as: "strong" }, "Bold"),
    h(Box, { className: "row" }, h(Box, { as: "span" }, "inline")),
    h(ButtonBase, null, "Go"),
  ));
  const main = container.querySelector("main#m");
  assert.ok(main);
  assert.equal(main.querySelector("h2").className, "title");
  assert.equal(main.querySelector("p").getAttribute("class"), null);
  assert.ok(main.querySelector("strong"));
  assert.equal(main.querySelector("div.row > span").textContent, "inline");
  assert.equal(main.querySelector("button").getAttribute("type"), "button", "ButtonBase never submits by accident");
  assert.equal(main.querySelector("[style]"), null);
});

test("TextLink routes through the registered link component and keeps external links plain", () => {
  const AppLink = ({ href, children, ...rest }) => h("a", { ...rest, href: `/hi${href}`, "data-app": "1" }, children);
  const { container } = render(h(UiLinkProvider, { linkComponent: AppLink },
    h(TextLink, { href: "/pricing" }, "Pricing"),
    h(TextLink, { href: "https://example.com" }, "Out"),
    h(TextLink, { href: "#top" }, "Top"),
  ));
  const [internal, external, hash] = container.querySelectorAll("a");
  assert.equal(internal.getAttribute("href"), "/hi/pricing");
  assert.equal(internal.dataset.app, "1");
  assert.equal(external.getAttribute("href"), "https://example.com");
  assert.equal(external.dataset.app, undefined);
  assert.equal(hash.getAttribute("href"), "#top");
});

test("TextLink without a provider renders an anchor with the query serialised", () => {
  const { container } = render(h(TextLink, { href: { pathname: "/plan-event", query: { eventType: "corporate", skip: undefined } } }, "Plan"));
  assert.equal(container.querySelector("a").getAttribute("href"), "/plan-event?eventType=corporate");
});

test("Glyph is decorative by default; VarScope and Picture own their inline styles", () => {
  const { container } = render(h("div", null,
    h(Glyph, { name: "menu", size: 16 }),
    h(VarScope, { className: "scope", vars: { "--nav-h": "64px" } }, "x"),
    h(Picture, { placeholderColor: "rgb(1, 2, 3)" }),
  ));
  const svg = container.querySelector("svg");
  assert.equal(svg.getAttribute("aria-hidden"), "true");
  assert.equal(container.querySelector(".scope").style.getPropertyValue("--nav-h"), "64px");
  assert.equal(container.querySelector("picture").style.backgroundColor, "rgb(1, 2, 3)");
});
