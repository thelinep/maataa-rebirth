// Bootstraps a jsdom window/document and assigns the globals
// @testing-library/react (and any component test) needs, so
// `node --test --import ./tests/dom-setup.mjs tests/*.test.mjs` gives every
// test file a real DOM without adding a whole new test framework -- the
// package keeps using Node's own built-in test runner (see package.json's
// "test" script), this just widens what it can exercise.
//
// A deliberately small, manual setup rather than pulling in the
// `global-jsdom` package: @maataa/ui's own philosophy (see components.tsx's
// header comments) is to keep dependencies to exactly what's needed, and
// this is ~20 lines because jsdom already does the hard part.
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost/",
  pretendToBeVisual: true, // gives us requestAnimationFrame, needed by React's test utils and by Base UI's own internal scheduling
});

const { window } = dom;

// Only copy the globals that don't already exist in Node -- avoids
// clobbering Node built-ins (e.g. don't overwrite `structuredClone`,
// `fetch` if Node's own differs) with jsdom's versions unless nothing
// else provides them.
const globalsToCopy = [
  "window", "document", "navigator", "HTMLElement", "Element", "Node",
  "Event", "CustomEvent", "MouseEvent", "KeyboardEvent", "FocusEvent",
  "PointerEvent", "InputEvent", "getComputedStyle", "requestAnimationFrame",
  "cancelAnimationFrame", "DocumentFragment", "Text", "Comment",
  "SVGElement", "MutationObserver", "ResizeObserver", "NodeFilter",
];

for (const name of globalsToCopy) {
  if (window[name] === undefined) continue;
  // Node 22+ ships a few of these itself as non-writable getters
  // (navigator, in particular) -- defineProperty overrides those cleanly,
  // plain assignment throws on them.
  Object.defineProperty(globalThis, name, {
    value: window[name],
    writable: true,
    configurable: true,
  });
}

// jsdom doesn't implement ResizeObserver -- Base UI's Popover/Combobox
// positioning code (via floating-ui) checks for it defensively, but some
// consumers still expect the constructor to exist. A no-op stand-in is
// enough for interaction/state tests (real positioning is verified via
// Storybook's Playwright-backed play tests, not jsdom -- see README).
if (typeof globalThis.ResizeObserver === "undefined") {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

// maplibre-gl's module body (not the Map constructor -- see map.tsx's own
// header comment and tests/map.test.mjs) calls
// `window.URL.createObjectURL(...)` synchronously at *import* time, to
// register a worker blob. jsdom's URL has no createObjectURL, so simply
// importing "../dist/index.js" -- which every test file in this suite
// does, since map.js is part of the shared barrel -- throws before any
// test body even runs, not just in map.test.mjs. Stubbed here, once, for
// every test file, rather than duplicated per-file; it's inert (map.test.mjs
// substitutes fake Map/Marker classes before the real constructor is ever
// reached, so this stub's return value is never actually used).
globalThis.window.URL.createObjectURL ??= () => "blob:mock";
globalThis.window.URL.revokeObjectURL ??= () => {};

globalThis.window.matchMedia ??= () => ({
  matches: false,
  media: "",
  addEventListener() {},
  removeEventListener() {},
  addListener() {},
  removeListener() {},
  dispatchEvent() { return false; },
});

globalThis.IS_REACT_ACT_ENVIRONMENT = true;
