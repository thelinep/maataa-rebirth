import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { render, cleanup, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as ui from "../dist/index.js";

// Small controlled harness, same shape a real caller uses: the harness
// owns `value` in useState and reflects Tabs' onValueChange back into it,
// matching @maataa/ui's "components own no internal state" contract that
// table.test.mjs's own fixtures follow.
function ControlledTabs({ onValueChange, initialValue = "one" }) {
  const [value, setValue] = React.useState(initialValue);
  return React.createElement(
    ui.Tabs,
    { value, onValueChange: (next, details) => { setValue(next); onValueChange?.(next, details); } },
    React.createElement(
      ui.Tabs.List,
      null,
      React.createElement(ui.Tabs.Tab, { value: "one" }, "One"),
      React.createElement(ui.Tabs.Tab, { value: "two" }, "Two"),
      React.createElement(ui.Tabs.Tab, { value: "three" }, "Three"),
    ),
    React.createElement(ui.Tabs.Panel, { value: "one" }, "Panel one content"),
    React.createElement(ui.Tabs.Panel, { value: "two" }, "Panel two content"),
    React.createElement(ui.Tabs.Panel, { value: "three" }, "Panel three content"),
  );
}

test("Tabs: renders tablist/tab/tabpanel roles, one tab per Tab and only the active panel exposed via role", () => {
  const { getByRole, getAllByRole, unmount } = render(React.createElement(ControlledTabs));
  const tablist = getByRole("tablist");
  assert.ok(tablist, "tab buttons must be grouped under role=tablist");
  const tabs = getAllByRole("tab");
  assert.equal(tabs.length, 3);
  // Base UI sets the native `hidden` attribute on an inactive TabsPanel,
  // which the accessibility tree (and so getByRole) excludes -- only the
  // active panel should be reachable by role here.
  const panel = getByRole("tabpanel");
  assert.equal(panel.textContent, "Panel one content");
  unmount();
  cleanup();
});

test("Tabs: clicking a tab flips aria-selected, calls onValueChange with that tab's value, and swaps the visible panel", async () => {
  let received;
  const { getByRole, getAllByRole, unmount } = render(
    React.createElement(ControlledTabs, { onValueChange: value => { received = value; } }),
  );
  const tabs = getAllByRole("tab");
  assert.equal(tabs[0].getAttribute("aria-selected"), "true", "the initial value's tab starts selected");
  assert.equal(tabs[1].getAttribute("aria-selected"), "false");

  await userEvent.click(tabs[1]);

  assert.equal(received, "two", "onValueChange must report the clicked tab's value, not row/index data");
  assert.equal(tabs[0].getAttribute("aria-selected"), "false", "the previously active tab is deselected");
  assert.equal(tabs[1].getAttribute("aria-selected"), "true");
  const panel = getByRole("tabpanel");
  assert.equal(panel.textContent, "Panel two content", "the matching panel becomes the only one exposed via role=tabpanel");
  unmount();
  cleanup();
});

test("Tabs: ArrowRight/ArrowLeft move roving focus between tabs (manual activation -- selection itself is unchanged)", async () => {
  const { getAllByRole, unmount } = render(React.createElement(ControlledTabs));
  const tabs = getAllByRole("tab");
  tabs[0].focus();
  assert.equal(document.activeElement, tabs[0]);

  await userEvent.keyboard("{ArrowRight}");
  assert.equal(document.activeElement, tabs[1], "ArrowRight moves roving focus to the next tab");
  // Base UI's TabsList defaults to activateOnFocus=false: arrow keys move
  // focus only, activation needs a separate Enter/Space/click -- so
  // selection must still be on the first tab after a bare ArrowRight.
  assert.equal(tabs[0].getAttribute("aria-selected"), "true", "arrow-key focus movement alone must not change selection");

  await userEvent.keyboard("{ArrowRight}");
  assert.equal(document.activeElement, tabs[2], "a second ArrowRight advances focus again");

  await userEvent.keyboard("{ArrowLeft}");
  assert.equal(document.activeElement, tabs[1], "ArrowLeft moves roving focus back to the previous tab");
  unmount();
  cleanup();
});
