import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { render, cleanup } from "@testing-library/react";
import * as ui from "../dist/index.js";

test("SpatialPreview: renders a canvas with role=img and an accessible name derived from zone and theme", () => {
  const { getByRole, unmount } = render(React.createElement(ui.SpatialPreview, { theme: "sunset", zone: "dining" }));
  const canvas = getByRole("img", { name: "dining configuration, sunset study" });
  assert.ok(canvas, "the canvas should expose role=img with a name reflecting the current zone/theme");
  assert.equal(canvas.tagName, "CANVAS");
  unmount();
  cleanup();
});

test("SpatialPreview: ariaLabel overrides the derived accessible name", () => {
  const { getByRole, unmount } = render(React.createElement(ui.SpatialPreview, { ariaLabel: "North Hall preview" }));
  assert.ok(getByRole("img", { name: "North Hall preview" }));
  unmount();
  cleanup();
});

test("SpatialPreview: shows the honest illustrative disclaimer by default, matching the ported apps/vr copy", () => {
  const { getByText, unmount } = render(React.createElement(ui.SpatialPreview, { zone: "arrival" }));
  assert.ok(
    getByText("Illustrative arrival study. It does not reflect a confirmed venue, guest count, event plan, or production run."),
    "the default per-zone disclaimer text ported from apps/vr/src/app.mjs should render by default",
  );
  unmount();
  cleanup();
});

test("SpatialPreview: showDisclaimer=false renders no disclaimer text and no aria-describedby link", () => {
  const { queryByText, getByRole, unmount } = render(React.createElement(ui.SpatialPreview, { showDisclaimer: false }));
  assert.equal(queryByText(/Illustrative/), null);
  const canvas = getByRole("img");
  assert.equal(canvas.getAttribute("aria-describedby"), null);
  unmount();
  cleanup();
});

test("SpatialPreview: disclaimerText overrides the default per-zone copy while showDisclaimer stays true", () => {
  const { getByText, unmount } = render(
    React.createElement(ui.SpatialPreview, { zone: "stage", disclaimerText: "Custom override copy." }),
  );
  assert.ok(getByText("Custom override copy."));
  unmount();
  cleanup();
});

test("SpatialPreview: mounts and unmounts without throwing when there is no 2D canvas context (this package's own jsdom setup)", () => {
  // A regression guard for the exact failure mode a naive port would hit:
  // jsdom's canvas.getContext('2d') returns null without the optional
  // `canvas` npm package (confirmed by hand against this package's own
  // dom-setup.mjs-bootstrapped jsdom), so mount/unmount must be a no-op
  // rather than a thrown TypeError from dereferencing a null context.
  const { unmount } = render(React.createElement(ui.SpatialPreview));
  unmount();
  cleanup();
});
