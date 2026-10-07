import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { render, cleanup, act, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as ui from "../dist/index.js";

// Modal is externally controlled and renders no Dialog.Trigger of its own
// (see modal.tsx's doc comment), so every test that cares about focus
// renders a real trigger button alongside it, focuses that button by hand,
// then flips `open` -- exactly the shape a real caller (a row action, a
// "New event" button elsewhere on the page, ...) would produce.
function Harness({ open, onOpenChange, description }) {
  const triggerRef = React.useRef(null);
  return React.createElement(React.Fragment, null,
    React.createElement("button", { type: "button", ref: triggerRef, onClick: () => onOpenChange(true) }, "Open modal"),
    React.createElement(ui.Modal, { open, onOpenChange, title: "Delete event", description }, "Are you sure?"),
  );
}

test("Modal: open={false} renders no dialog -- nothing accessible is left behind", () => {
  const { queryByRole, unmount } = render(
    React.createElement(ui.Modal, { open: false, onOpenChange: () => {}, title: "Delete event" }, "Are you sure?"),
  );
  assert.equal(queryByRole("dialog"), null, "a closed Modal must not render its popup at all, not just hide it visually");
  unmount();
  cleanup();
});

test("Modal: open={true} renders role=dialog with its accessible name taken from `title`", () => {
  const { getByRole, unmount } = render(
    React.createElement(ui.Modal, { open: true, onOpenChange: () => {}, title: "Delete event" }, "Are you sure?"),
  );
  const dialog = getByRole("dialog", { name: "Delete event" });
  assert.ok(dialog, "the popup's accessible name must come from `title` via Dialog.Title, not a generic label");
  unmount();
  cleanup();
});

test("Modal: description is wired as the dialog's accessible description", () => {
  const { getByRole, unmount } = render(
    React.createElement(ui.Modal, { open: true, onOpenChange: () => {}, title: "Delete event", description: "This cannot be undone." }, "Are you sure?"),
  );
  const dialog = getByRole("dialog", { name: "Delete event" });
  assert.equal(dialog.getAttribute("aria-describedby") ? true : false, true, "Dialog.Description should be wired via aria-describedby");
  unmount();
  cleanup();
});

test("Modal: opening moves focus into the popup", async () => {
  function ControlledHarness() {
    const [open, setOpen] = React.useState(false);
    return React.createElement(Harness, { open, onOpenChange: setOpen });
  }
  const { getByRole, getByText, unmount } = render(React.createElement(ControlledHarness));

  const trigger = getByText("Open modal");
  await act(async () => { trigger.focus(); });
  assert.equal(document.activeElement, trigger, "sanity check -- the trigger has focus before opening");

  await userEvent.click(trigger);

  const dialog = getByRole("dialog", { name: "Delete event" });
  assert.ok(dialog.contains(document.activeElement), "focus should have moved into the popup once it opened, not stayed on the trigger");
  assert.notEqual(document.activeElement, trigger, "focus must actually have left the trigger -- Base UI's own focus trap, not a no-op");

  unmount();
  cleanup();
});

test("Modal: pressing Escape calls onOpenChange(false)", async () => {
  let lastOpen;
  const { getByRole, unmount } = render(
    React.createElement(ui.Modal, { open: true, onOpenChange: value => { lastOpen = value; }, title: "Delete event" }, "Are you sure?"),
  );
  getByRole("dialog", { name: "Delete event" });
  await userEvent.keyboard("{Escape}");
  assert.equal(lastOpen, false, "Escape should report a close via onOpenChange -- Modal owns no open state to close on its own");
  unmount();
  cleanup();
});

test("Modal: closing returns focus to the element that had it before the modal opened", async () => {
  function ControlledHarness() {
    const [open, setOpen] = React.useState(false);
    return React.createElement(Harness, { open, onOpenChange: setOpen });
  }
  const { getByRole, getByText, queryByRole, unmount } = render(React.createElement(ControlledHarness));

  const trigger = getByText("Open modal");
  await act(async () => { trigger.focus(); });
  await userEvent.click(trigger);
  getByRole("dialog", { name: "Delete event" });

  await userEvent.keyboard("{Escape}");

  assert.equal(queryByRole("dialog"), null, "the dialog should be gone after Escape closes it");
  assert.equal(document.activeElement, trigger, "Base UI's own final-focus behavior should return focus to the trigger that opened the modal, with no focus-management code of Modal's own");

  unmount();
  cleanup();
});
