import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import * as ui from "../dist/index.js";

test("exports the marketing-site primitives", () => {
  for (const name of ["MarketingNav", "Hero", "ThemeToggle", "Carousel", "Disclosure", "ImageCard", "Footer"]) {
    assert.equal(typeof ui[name], "function", `${name} must be exported`);
  }
});

test("keeps marketing CSS opt-in and does not style host landmarks", () => {
  const styles = readFileSync(new URL("../src/marketing.css", import.meta.url), "utf8");
  assert.match(styles, /\.maataa-ui__marketing-nav/);
  for (const forbidden of [":root", "main{", "html {"]) {
    assert.equal(styles.includes(forbidden), false, `unexpected global selector: ${forbidden}`);
  }
  assert.doesNotMatch(styles, /(?<![-\w])body\s*\{/, "unexpected unscoped body{} selector");
});

test("ThemeToggle is controlled: reflects the mode prop via aria-pressed, never owns storage", () => {
  const source = readFileSync(new URL("../src/marketing-client.tsx", import.meta.url), "utf8");
  assert.equal(source.includes("localStorage."), false, "ThemeToggle must stay controlled by the host, not call the storage API itself");
});
