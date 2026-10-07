// jsdom/WebGL boundary -- read this before "fixing" this file.
//
// jsdom (see dom-setup.mjs's own header) implements no real layout engine
// and, critically for this component, no WebGL: HTMLCanvasElement's
// getContext('webgl'/'webgl2') is "Not implemented" under jsdom, so a
// *real* `new maplibregl.Map(...)` throws "Failed to initialize WebGL"
// synchronously from inside Map's useEffect -- verified by hand against
// this exact package/jsdom combination before writing this file. Because
// that throw happens in a passive effect with no error boundary above it,
// React unmounts the whole tree in response, which means letting the real
// constructor run leaves nothing in the DOM to assert against at all --
// not even the container itself. There is no polyfill that makes WebGL
// itself meaningfully "work" under jsdom (only `canvas`-npm-package-style
// native shims could, and this package deliberately doesn't take that
// dependency just to satisfy a test).
//
// So rather than let the real, WebGL-dependent `Map`/`Marker` classes run
// (which "Do NOT try to force real map construction through jsdom" rules
// out) or leave this file unable to check anything about the rendered
// output, this file substitutes lightweight fakes for maplibre-gl's `Map`
// and `Marker` -- mutating the two constructors on the shared
// `maplibre-gl` module object *before* importing "../dist/index.js" (safe
// because it's a plain, non-frozen object; verified separately). The
// fakes implement only the exact surface map.tsx calls (per
// maplibre-gl.d.ts: `container`, `remove()`, `setCenter()`, `setZoom()`
// on Map; `setLngLat().addTo().remove()` on Marker, plus appending the
// marker's `element` into the map container the way the real Marker
// does), so what's under test is @maataa/ui's OWN wrapper logic -- mount/
// unmount lifecycle, ref wiring, className/style/aria-label forwarding,
// marker DOM structure and click delegation, and StrictMode-safe cleanup
// -- not maplibre-gl's internals, and never any tile/canvas/WebGL
// behavior. That real, end-to-end verification (actual tiles rendering,
// a real Marker's click reaching onMarkerClick) belongs in
// apps/web/stories/map/Map.stories.tsx, which Storybook runs against a
// real Playwright Chromium browser with real WebGL -- see that file's own
// header comment.
//
// One more jsdom wrinkle, unrelated to WebGL: maplibre-gl's module body
// itself (not the Map constructor) calls `window.URL.createObjectURL(...)`
// synchronously at import time, to register a worker blob -- jsdom has no
// createObjectURL, so *merely importing* maplibre-gl throws under
// dom-setup.mjs's plain jsdom window unless something polyfills it first.
// That's supplied below, before maplibre-gl is (dynamically) imported --
// it has nothing to do with WebGL and is safe/inert as a no-op stub.
import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { render, cleanup } from "@testing-library/react";

globalThis.window.URL.createObjectURL ??= () => "blob:mock";
globalThis.window.URL.revokeObjectURL ??= () => {};
globalThis.URL.createObjectURL ??= globalThis.window.URL.createObjectURL;
// maplibre-gl's real Map constructor also reads devicePixelRatio, which
// dom-setup.mjs's globals list doesn't copy (jsdom has no real rendering
// pipeline to make it meaningful) -- inert stub, same rationale.
globalThis.devicePixelRatio ??= 1;
globalThis.window.devicePixelRatio ??= 1;

// Dynamic imports (not static top-level ones) are required here: a static
// `import "maplibre-gl"` would evaluate -- and therefore run maplibre-gl's
// module-level createObjectURL call -- before the polyfills above run, and
// a static `import "../dist/index.js"` would resolve to the real,
// unpatched Map/Marker before the fakes below are installed.
const maplibregl = (await import("maplibre-gl")).default;

class FakeMapLibreMap {
  constructor(options) {
    this.options = options;
    this._removed = false;
    this._listeners = new Map();
    this._sources = new Map();
    this._layers = new Map();
    this._loaded = true; // fake never has a real async style/tile load to wait on
    FakeMapLibreMap.instances.push(this);
  }
  setCenter(center) { this.center = center; }
  setZoom(zoom) { this.zoom = zoom; }
  remove() { this._removed = true; }
  // Minimal on/off/once + source/layer surface added alongside `onMapClick`/
  // `polygon` (map.tsx) -- same "implement only the exact surface map.tsx
  // calls" rule as `setCenter`/`setZoom`/`remove` above, extended rather
  // than replaced when the wrapper's own real-maplibre-gl surface grew.
  on(event, handler) {
    const handlers = this._listeners.get(event) ?? [];
    handlers.push(handler);
    this._listeners.set(event, handlers);
  }
  off(event, handler) {
    const handlers = this._listeners.get(event) ?? [];
    this._listeners.set(event, handlers.filter(entry => entry !== handler));
  }
  once(event, handler) {
    // The fake is always "loaded" synchronously (see `loaded()` below), so
    // `map.tsx`'s `map.loaded() ? addLayers() : map.once("load", addLayers)`
    // branch always takes the synchronous path in tests -- `once` is still
    // implemented for completeness/API-shape parity, not because any test
    // here exercises the async branch.
    this.on(event, handler);
  }
  loaded() { return this._loaded; }
  // Test helper (not part of the real maplibre-gl API): lets a test fire
  // a fake map click the same way a real pointer click would, routed
  // through the same listener list `on("click", ...)` populated above.
  fireClick(lngLat, target) {
    const handlers = this._listeners.get("click") ?? [];
    handlers.forEach(handler => handler({ lngLat, originalEvent: { target: target ?? this.options.container } }));
  }
  getSource(id) { return this._sources.get(id); }
  addSource(id, definition) {
    const data = { current: definition.data };
    this._sources.set(id, { setData: next => { data.current = next; }, getData: () => data.current });
  }
  removeSource(id) { this._sources.delete(id); }
  getLayer(id) { return this._layers.get(id); }
  addLayer(definition) { this._layers.set(definition.id, definition); }
  removeLayer(id) { this._layers.delete(id); }
}
FakeMapLibreMap.instances = [];

class FakeMarker {
  constructor(options) { this.element = options.element; }
  setLngLat(lngLat) { this.lngLat = lngLat; return this; }
  addTo(map) {
    // Mirrors the real Marker: its element becomes part of the map
    // container's DOM, positioned by maplibre-gl in a real browser -- the
    // fake skips positioning (irrelevant under jsdom's no-op layout) but
    // preserves "the element is actually in the container", since that's
    // what makes it findable/clickable by the tests below.
    map.options.container.appendChild(this.element);
    this.map = map;
    return this;
  }
  remove() { this.element.remove(); return this; }
}

maplibregl.Map = FakeMapLibreMap;
maplibregl.Marker = FakeMarker;

const ui = await import("../dist/index.js");

const MARKERS = [
  { id: "a", lng: 24.94, lat: 60.17, label: "Helsinki" },
  { id: "b", lng: 18.07, lat: 59.33 },
];

test("Map: renders its container as a named landmark region by default", () => {
  const { getByRole, unmount } = render(
    React.createElement(ui.Map, { center: { lng: 24.94, lat: 60.17 }, zoom: 10 }),
  );
  assert.ok(getByRole("region", { name: "Map" }), "the container should be reachable as a region by its default accessible name");
  unmount();
  cleanup();
});

test("Map: ariaLabel overrides the default accessible name", () => {
  const { getByRole, unmount } = render(
    React.createElement(ui.Map, { center: { lng: 0, lat: 0 }, zoom: 1, ariaLabel: "Venue location" }),
  );
  assert.ok(getByRole("region", { name: "Venue location" }));
  unmount();
  cleanup();
});

test("Map: forwards className alongside the package's own class, and forwards style (the caller-owned height)", () => {
  const { getByRole, unmount } = render(
    React.createElement(ui.Map, {
      center: { lng: 0, lat: 0 },
      zoom: 1,
      className: "custom-map",
      style: { height: 400 },
    }),
  );
  const region = getByRole("region", { name: "Map" });
  assert.ok(region.className.includes("maataa-ui__map"), "package's own class must always be present");
  assert.ok(region.className.includes("custom-map"), "caller's className must be forwarded, not replaced");
  assert.equal(region.style.height, "400px", "style is forwarded verbatim -- callers are responsible for giving the map an explicit height (see the component's own doc comment)");
  unmount();
  cleanup();
});

test("Map: constructs exactly one underlying map on mount and removes it on unmount -- no leaked instance", () => {
  const before = FakeMapLibreMap.instances.length;
  const { unmount } = render(React.createElement(ui.Map, { center: { lng: 0, lat: 0 }, zoom: 1 }));
  const created = FakeMapLibreMap.instances.slice(before);
  assert.equal(created.length, 1, "mounting once should construct exactly one map");
  assert.equal(created[0]._removed, false, "should not be removed while still mounted");
  unmount();
  assert.equal(created[0]._removed, true, "unmounting must call map.remove()");
  cleanup();
});

test("Map: under StrictMode's dev-only double-invoke, every constructed map is eventually removed -- no leaked WebGL context", () => {
  const before = FakeMapLibreMap.instances.length;
  const { unmount } = render(
    React.createElement(React.StrictMode, null, React.createElement(ui.Map, { center: { lng: 0, lat: 0 }, zoom: 1 })),
  );
  const created = FakeMapLibreMap.instances.slice(before);
  assert.equal(created.length, 2, "StrictMode's double-invoke mounts, cleans up, and mounts again -- two Map instances get constructed");
  assert.equal(created[0]._removed, true, "the first (double-invoke probe) instance must already be cleaned up");
  unmount();
  assert.ok(created.every(instance => instance._removed), "every instance StrictMode constructed must be removed by the time the component is fully unmounted");
  cleanup();
});

test("Map: renders each marker as a focusable, labeled button and reports its id via onMarkerClick", () => {
  let clickedId;
  const { getByRole, unmount } = render(
    React.createElement(ui.Map, {
      center: { lng: 24.94, lat: 60.17 },
      zoom: 10,
      markers: MARKERS,
      onMarkerClick: id => { clickedId = id; },
    }),
  );
  const helsinkiButton = getByRole("button", { name: "Helsinki" });
  assert.equal(helsinkiButton.tagName, "BUTTON", "a marker must be a real, keyboard-focusable control, not a bare div");
  // Second marker has no `label` -- falls back to a coordinate-based name
  // rather than rendering as an unlabeled (inaccessible) control.
  assert.ok(getByRole("button", { name: /59\.33/ }), "an unlabeled marker still gets an accessible name, from its coordinates");
  helsinkiButton.click();
  assert.equal(clickedId, "a", "clicking a marker's button must call onMarkerClick with that marker's id");
  unmount();
  cleanup();
});

test("Map: rebuilds its marker set when the markers prop changes -- stale markers are removed, not left behind", () => {
  const { getByRole, queryByRole, rerender, unmount } = render(
    React.createElement(ui.Map, { center: { lng: 0, lat: 0 }, zoom: 1, markers: MARKERS }),
  );
  assert.ok(getByRole("button", { name: "Helsinki" }));
  rerender(
    React.createElement(ui.Map, { center: { lng: 0, lat: 0 }, zoom: 1, markers: [{ id: "c", lng: 2, lat: 48, label: "Paris" }] }),
  );
  assert.equal(queryByRole("button", { name: "Helsinki" }), null, "a marker removed from the markers prop must be removed from the DOM, not just visually stranded");
  assert.ok(getByRole("button", { name: "Paris" }), "a newly added marker must render");
  unmount();
  cleanup();
});
