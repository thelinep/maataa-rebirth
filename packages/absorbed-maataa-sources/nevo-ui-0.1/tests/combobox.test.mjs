import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { render, cleanup, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as ui from "../dist/index.js";

const OPTIONS = [
  { value: "wedding", label: "Wedding" },
  { value: "corporate", label: "Corporate" },
  { value: "birthday", label: "Birthday" },
  { value: "closed", label: "Currently unavailable", disabled: true },
];

// A tiny controlled harness, same shape as the Storybook one -- Combobox
// itself holds no selection state, so every test needs somewhere for
// onChange to land.
function Harness({ initialValue = "", options = OPTIONS, onChangeSpy }) {
  const [value, setValue] = React.useState(initialValue);
  return React.createElement(ui.Combobox, {
    label: "Event type",
    placeholder: "Choose an event type",
    options,
    value,
    onChange: next => {
      onChangeSpy?.(next);
      setValue(next);
    },
  });
}

test("Combobox: renders a combobox input whose accessible name comes from `label`", () => {
  const { getByRole, unmount } = render(React.createElement(Harness, {}));
  const input = getByRole("combobox", { name: "Event type" });
  assert.ok(input, "the text input should be reachable by its label as an accessible name");
  unmount();
  cleanup();
});

test("Combobox: typing filters the visible option list to labels matching the query", async () => {
  const user = userEvent.setup();
  const { getByRole, queryByRole, unmount } = render(React.createElement(Harness, {}));
  const input = getByRole("combobox", { name: "Event type" });

  await user.click(input);
  await user.type(input, "wed");

  await waitFor(() => {
    const options = document.querySelectorAll('[role="option"]');
    assert.equal(options.length, 1, "only the option matching the typed query should remain visible");
    assert.equal(options[0].textContent, "Wedding");
  });
  assert.equal(queryByRole("option", { name: "Corporate" }), null, "a non-matching option must not still be rendered");

  unmount();
  cleanup();
});

test("Combobox: ArrowDown then Enter selects the highlighted item and calls onChange with its value", async () => {
  const user = userEvent.setup();
  let lastChange;
  const { getByRole, unmount } = render(React.createElement(Harness, { onChangeSpy: value => { lastChange = value; } }));
  const input = getByRole("combobox", { name: "Event type" });

  await user.click(input);
  await user.keyboard("{ArrowDown}");
  await waitFor(() => {
    assert.ok(document.querySelector('[role="option"][data-highlighted]'), "the first option should be highlighted after ArrowDown");
  });
  await user.keyboard("{Enter}");

  assert.equal(lastChange, "wedding", "Enter should select the highlighted (first) option and report its value");
  await waitFor(() => assert.equal(input.value, "Wedding", "the input should reflect the newly-selected option's label"));

  unmount();
  cleanup();
});

test("Combobox: Escape closes the popup without changing the value", async () => {
  const user = userEvent.setup();
  let lastChange;
  const { getByRole, unmount } = render(React.createElement(Harness, { onChangeSpy: value => { lastChange = value; } }));
  const input = getByRole("combobox", { name: "Event type" });

  await user.click(input);
  await user.keyboard("{ArrowDown}");
  await waitFor(() => assert.ok(document.querySelector('[role="option"]'), "the popup should be open with options visible"));

  await user.keyboard("{Escape}");

  await waitFor(() => assert.equal(document.querySelectorAll('[role="option"]').length, 0, "Escape should close the popup"));
  assert.equal(lastChange, undefined, "Escape must not select anything -- onChange should never have been called");
  assert.equal(input.value, "", "the query/value should not be committed to a selection on Escape");

  unmount();
  cleanup();
});
