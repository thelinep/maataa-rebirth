import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as ui from "../dist/index.js";

// DatePicker is controlled (ISO "YYYY-MM-DD" strings, same contract as
// Select) -- these tests drive it through a tiny stateful wrapper so
// selecting a day is actually reflected back into `value`, the same way a
// real consumer's own state would.
function DatePickerHarness({ initialValue = "", onChangeSpy, ...props }) {
  const [value, setValue] = React.useState(initialValue);
  return React.createElement(ui.DatePicker, {
    ...props,
    value,
    onChange: next => {
      onChangeSpy?.(next);
      setValue(next);
    },
  });
}

// Popover.Portal moves the grid to <body>, outside the `container` RTL's
// render() creates for the directly-rendered subtree -- so this must query
// `baseElement` (document.body by default), not `container`, to actually
// reach the portaled grid cells.
function focusedGridCell(baseElement) {
  return baseElement.querySelector('[role="gridcell"][tabindex="0"]');
}

test("DatePicker: opening the popup from the input shows a role=grid month view", async () => {
  const user = userEvent.setup();
  const { getByLabelText, getByRole, unmount } = render(
    React.createElement(DatePickerHarness, { label: "Event date" }),
  );
  const input = getByLabelText("Event date");
  await user.click(input);
  const grid = getByRole("grid");
  assert.ok(grid, "clicking the trigger input should open a popup containing role=grid");
  unmount();
  cleanup();
});

test("DatePicker: ArrowRight moves the roving tabindex to the next day cell", async () => {
  const user = userEvent.setup();
  const { getByLabelText, baseElement, unmount } = render(
    React.createElement(DatePickerHarness, { label: "Event date", initialValue: "2026-09-15" }),
  );
  const input = getByLabelText("Event date");
  await user.click(input);

  const before = focusedGridCell(baseElement);
  assert.ok(before, "exactly one gridcell should start out as the roving tabindex stop");
  assert.equal(before.getAttribute("aria-label")?.includes("15"), true, "the initially-focused cell should be the selected day (Sep 15)");

  await user.keyboard("{ArrowRight}");

  const after = focusedGridCell(baseElement);
  assert.ok(after, "a gridcell should still carry tabIndex=0 after the arrow key");
  assert.notEqual(after, before, "roving tabindex should have moved to a different cell");
  assert.equal(before.getAttribute("tabindex"), "-1", "the previously-focused cell must fall back to tabIndex=-1, not stay a tab stop");
  assert.equal(document.activeElement, after, "DOM focus should follow the roving tabindex to the new cell");

  unmount();
  cleanup();
});

test("DatePicker: Enter on the focused day cell selects it, calls onChange with its ISO date, and closes the popup", async () => {
  const user = userEvent.setup();
  let lastChange;
  const { getByLabelText, queryByRole, unmount } = render(
    React.createElement(DatePickerHarness, {
      label: "Event date",
      initialValue: "2026-09-15",
      onChangeSpy: value => { lastChange = value; },
    }),
  );
  const input = getByLabelText("Event date");
  await user.click(input);
  await user.keyboard("{ArrowRight}"); // roving focus: Sep 15 -> Sep 16
  await user.keyboard("{Enter}");

  assert.equal(lastChange, "2026-09-16", "Enter should call onChange with the focused (not the originally-selected) day's ISO date");
  assert.equal(queryByRole("grid"), null, "selecting a day should close the popup");

  unmount();
  cleanup();
});

test("DatePicker: Escape closes the popup and returns focus to the trigger input", async () => {
  const user = userEvent.setup();
  const { getByLabelText, queryByRole, unmount } = render(
    React.createElement(DatePickerHarness, { label: "Event date", initialValue: "2026-09-15" }),
  );
  const input = getByLabelText("Event date");
  await user.click(input);
  assert.ok(queryByRole("grid"), "popup should be open before Escape");

  await user.keyboard("{Escape}");

  assert.equal(queryByRole("grid"), null, "Escape should close the popup");
  assert.equal(document.activeElement, input, "focus should return to the trigger input, not stay in the (unmounted) popup or fall back to <body>");

  unmount();
  cleanup();
});
