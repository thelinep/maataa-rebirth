import assert from "node:assert/strict";
import test from "node:test";
import React, { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  Avatar, Checkbox, DateRange, DocumentCover, DocumentIndex, DocumentMachine,
  FloatingActionButton, Glossary, ImageHolder, ListCards, ListGroup, MegaMenu,
  NumberInput, Pagination, Popover, Skeleton, Spinner, TextInput, Timeline, Toggle,
} from "../dist/index.js";

test("base primitives provide semantic display, field and machine contracts", () => {
  function Fields() {
    const [checked, setChecked] = useState(false);
    const [enabled, setEnabled] = useState(false);
    const [amount, setAmount] = useState(120);
    return React.createElement("div", null,
      React.createElement(Checkbox, { label: "Require catering", checked, onCheckedChange: setChecked }),
      React.createElement(Toggle, { label: "Allow vendor access", checked: enabled, onCheckedChange: setEnabled }),
      React.createElement(TextInput, { label: "City", value: "New Delhi", readOnly: true }),
      React.createElement(NumberInput, { label: "Guest count", value: amount, onChange: setAmount, min: 1 }),
      React.createElement(DateRange, { label: "Event dates", value: { start: "2026-10-14", end: "2026-10-15" }, onChange() {} }),
    );
  }

  render(React.createElement("div", null,
    React.createElement(Avatar, { name: "Asha Patel" }),
    React.createElement(ListGroup, { label: "Planning tasks", items: [{ id: "venue", label: "Confirm venue", detail: "Due Friday" }] }),
    React.createElement(Pagination, { page: 2, pageCount: 3, onPageChange() {} }),
    React.createElement(Popover, { label: "View terms" }, "Terms apply"),
    React.createElement(MegaMenu, { label: "Explore", sections: [{ id: "plan", title: "Plan", links: [{ id: "timeline", label: "Timeline", href: "/timeline" }] }] }),
    React.createElement(Skeleton, { label: "Loading vendors" }),
    React.createElement(Spinner, { label: "Saving plan" }),
    React.createElement(Timeline, { label: "Event schedule", items: [{ id: "arrival", time: "16:00", title: "Guest arrival" }] }),
    React.createElement(ImageHolder, { label: "Venue image", src: "https://example.test/venue.jpg", alt: "Venue image" }),
    React.createElement(FloatingActionButton, { label: "Create task", onClick() {} }, "Add"),
    React.createElement(Fields),
    React.createElement(DocumentMachine, {
      cover: React.createElement(DocumentCover, { title: "Event brief", summary: "Approved scope" }),
      index: React.createElement(DocumentIndex, { items: [{ id: "overview", label: "Overview", href: "#overview" }], activeId: "overview" }),
      glossary: React.createElement(Glossary, { terms: [{ term: "ROS", definition: "Run of show" }] }),
    }, React.createElement("p", { id: "overview" }, "Event scope")),
    React.createElement(ListCards, { label: "Saved plans", cards: [{ id: "spring", title: "Spring launch", description: "120 guests" }] }),
  ));

  assert.equal(screen.getByRole("img", { name: "Asha Patel" }).textContent, "AP");
  assert.ok(screen.getByRole("list", { name: "Planning tasks" }));
  assert.equal(screen.getByRole("button", { name: "2" }).getAttribute("aria-current"), "page");
  fireEvent.click(screen.getByText("View terms"));
  assert.equal(screen.getByText("Terms apply").hidden, false);
  assert.ok(screen.getByRole("navigation", { name: "Explore" }));
  assert.ok(screen.getByRole("status", { name: "Saving plan" }));
  assert.ok(screen.getByRole("list", { name: "Event schedule" }));
  assert.equal(screen.getByRole("img", { name: "Venue image" }).tagName, "IMG");
  assert.ok(screen.getByRole("button", { name: "Create task" }));

  fireEvent.click(screen.getByLabelText("Require catering"));
  assert.equal(screen.getByLabelText("Require catering").checked, true);
  fireEvent.click(screen.getByRole("switch", { name: "Allow vendor access" }));
  assert.equal(screen.getByRole("switch", { name: "Allow vendor access" }).checked, true);
  assert.equal(screen.getByLabelText("City").value, "New Delhi");
  fireEvent.change(screen.getByLabelText("Guest count"), { target: { value: "150" } });
  assert.equal(screen.getByLabelText("Guest count").value, "150");
  assert.ok(screen.getByLabelText("Start date"));
  assert.ok(screen.getByRole("article").textContent.includes("Event brief"));
  assert.ok(screen.getByText("Run of show"));
  assert.ok(screen.getByRole("region", { name: "Saved plans" }));
});

test("HeroImage exposes supplied visual meaning through its image alternative", async () => {
  const { HeroImage } = await import("../dist/index.js");
  render(React.createElement(HeroImage, { src: "/images/hero.png", alt: "Wedding reception" }));
  assert.equal(screen.getByRole("img", { name: "Wedding reception" }).getAttribute("src"), "/images/hero.png");
});

test("HeroImage offers AVIF and WebP sources and hides the caption when asked", async () => {
  const { HeroImage } = await import("../dist/index.js");
  const { container } = render(React.createElement(HeroImage, { src: "/media/hero/a-1672.webp", alt: "Conference", avifSrcSet: "/media/hero/a-640.avif 640w", webpSrcSet: "/media/hero/a-640.webp 640w", width: 1672, height: 941, caption: false, placeholderColor: "#eeeeee" }));
  const sources = container.querySelectorAll("picture source");
  assert.equal(sources.length, 2);
  assert.equal(sources[0].getAttribute("type"), "image/avif");
  assert.equal(sources[1].getAttribute("type"), "image/webp");
  assert.equal(container.querySelector("figcaption"), null);
  assert.equal(screen.getByRole("img", { name: "Conference" }).getAttribute("loading"), "lazy");
});
