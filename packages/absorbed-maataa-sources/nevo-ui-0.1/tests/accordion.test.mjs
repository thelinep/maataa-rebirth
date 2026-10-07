import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as ui from "../dist/index.js";

// Small controlled harness, same shape a real caller uses: the harness
// owns `value` (the array of expanded item values) in useState and
// reflects Accordion's onValueChange back into it, matching
// @maataa/ui's "components own no internal state" contract that
// tabs.test.mjs's own fixtures follow.
function ControlledAccordion({ onValueChange, initialValue = [], multiple = true }) {
  const [value, setValue] = React.useState(initialValue);
  return React.createElement(
    ui.Accordion,
    { value, onValueChange: (next, details) => { setValue(next); onValueChange?.(next, details); }, multiple },
    React.createElement(
      ui.Accordion.Item,
      { value: "one" },
      React.createElement(ui.Accordion.Header, null, React.createElement(ui.Accordion.Trigger, null, "Section one")),
      React.createElement(ui.Accordion.Panel, null, "Panel one content"),
    ),
    React.createElement(
      ui.Accordion.Item,
      { value: "two" },
      React.createElement(ui.Accordion.Header, null, React.createElement(ui.Accordion.Trigger, null, "Section two")),
      React.createElement(ui.Accordion.Panel, null, "Panel two content"),
    ),
  );
}

test("Accordion: renders one trigger button per item, with panels absent until expanded", () => {
  const { getAllByRole, queryByText, unmount } = render(React.createElement(ControlledAccordion));
  const buttons = getAllByRole("button");
  assert.equal(buttons.length, 2, "one trigger button per Accordion.Item");
  assert.equal(queryByText("Panel one content"), null, "a collapsed panel's content shouldn't be queryable -- keepMounted defaults to false");
  unmount();
  cleanup();
});

test("Accordion: clicking a trigger expands its panel and reports an array value, not a single value", async () => {
  let received;
  const { getAllByRole, getByText, unmount } = render(
    React.createElement(ControlledAccordion, { onValueChange: value => { received = value; } }),
  );
  const triggers = getAllByRole("button");
  await userEvent.click(triggers[0]);
  assert.deepEqual(received, ["one"], "onValueChange must report an array of expanded item values (Base UI's AccordionValue<Value> = Value[]), not a bare string/boolean");
  assert.ok(getByText("Panel one content"), "the panel should now be reachable once its item is expanded");
  unmount();
  cleanup();
});

test("Accordion: multiple=true keeps a previously expanded item open when a second one expands", async () => {
  let received;
  const { getAllByRole, getByText, unmount } = render(
    React.createElement(ControlledAccordion, { onValueChange: value => { received = value; }, initialValue: ["one"] }),
  );
  assert.ok(getByText("Panel one content"), "sanity check -- initialValue=['one'] should start item one expanded");
  const triggers = getAllByRole("button");
  await userEvent.click(triggers[1]);
  assert.deepEqual(new Set(received), new Set(["one", "two"]), "both items should be expanded at once under the default multiple=true");
  unmount();
  cleanup();
});

test("Accordion: multiple=false closes the previously open item when a new one expands", async () => {
  let received;
  const { getAllByRole, unmount } = render(
    React.createElement(ControlledAccordion, { onValueChange: value => { received = value; }, initialValue: ["one"], multiple: false }),
  );
  const triggers = getAllByRole("button");
  await userEvent.click(triggers[1]);
  assert.deepEqual(received, ["two"], "Base UI itself should close item one when multiple=false and a different item opens");
  unmount();
  cleanup();
});

test("Accordion: the trigger's own [data-panel-open] attribute reflects its item's open state", async () => {
  const { getAllByRole, unmount } = render(React.createElement(ControlledAccordion, { initialValue: ["one"] }));
  const triggers = getAllByRole("button");
  assert.ok(triggers[0].hasAttribute("data-panel-open"), "the open item's trigger should carry [data-panel-open] -- advanced.css keys the chevron rotation off this exact attribute");
  assert.equal(triggers[1].hasAttribute("data-panel-open"), false);
  unmount();
  cleanup();
});
