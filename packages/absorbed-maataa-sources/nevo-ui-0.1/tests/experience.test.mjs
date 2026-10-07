import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { render, screen } from "@testing-library/react";
import { AudioOutput, BarChart, MediaInput, ToolCard, TrendChart, VideoOutput, Widget } from "../dist/index.js";

test("experience primitives expose graphs, media and tools through accessible HTML", () => {
  render(React.createElement("div", null,
    React.createElement(TrendChart, { label: "Guest confirmations", values: [{ label: "Monday", value: 4 }, { label: "Tuesday", value: 9 }] }),
    React.createElement(BarChart, { label: "Budget", values: [{ label: "Venue", value: 3 }] }),
    React.createElement(MediaInput, { label: "Voice brief", kind: "audio" }),
    React.createElement(AudioOutput, { label: "Voice preview" }),
    React.createElement(VideoOutput, { label: "Venue preview" }),
    React.createElement(Widget, { title: "Readiness" }, "Seven workstreams ready"),
    React.createElement(ToolCard, { title: "Brief extractor", description: "Turns selected records into a planning outline." }),
  ));

  assert.equal(screen.getByRole("img", { name: /guest confirmations/i }).tagName, "svg");
  assert.equal(screen.getByLabelText("Voice brief").getAttribute("accept"), "audio/*");
  assert.ok(screen.getByLabelText("Voice preview").querySelector("audio"));
  assert.ok(screen.getByLabelText("Venue preview").querySelector("video"));
  assert.ok(screen.getByLabelText("Readiness"));
  assert.ok(screen.getByText("Brief extractor"));
});
