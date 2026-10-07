import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { render, cleanup, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as ui from "../dist/index.js";

// Drawer is externally controlled and renders no Drawer.Trigger of its
// own (see drawer.tsx's doc comment), same shape as modal.test.mjs's own
// Harness: a real trigger button lives alongside it, matching how a real
// caller (a "Filter" button elsewhere on the page) would compose it.
function Harness({ open, onOpenChange, side }) {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement("button", { type: "button", onClick: () => onOpenChange(true) }, "Open drawer"),
    React.createElement(ui.Drawer, { open, onOpenChange, title: "Filter events", side }, "Filter controls"),
  );
}

test("Drawer: open={false} renders no dialog at all", () => {
  const { queryByRole, unmount } = render(
    React.createElement(ui.Drawer, { open: false, onOpenChange: () => {}, title: "Filter events" }, "Filter controls"),
  );
  assert.equal(queryByRole("dialog"), null, "a closed Drawer must not render its popup, not just hide it visually");
  unmount();
  cleanup();
});

test("Drawer: open={true} renders role=dialog with its accessible name from `title`", () => {
  const { getByRole, unmount } = render(
    React.createElement(ui.Drawer, { open: true, onOpenChange: () => {}, title: "Filter events" }, "Filter controls"),
  );
  const dialog = getByRole("dialog", { name: "Filter events" });
  assert.ok(dialog, "the popup's accessible name must come from `title` via Drawer.Title");
  unmount();
  cleanup();
});

test("Drawer: description is wired as the dialog's accessible description", () => {
  const { getByRole, unmount } = render(
    React.createElement(ui.Drawer, { open: true, onOpenChange: () => {}, title: "Filter events", description: "Refine the list below." }, "Filter controls"),
  );
  const dialog = getByRole("dialog", { name: "Filter events" });
  assert.equal(!!dialog.getAttribute("aria-describedby"), true, "Drawer.Description should be wired via aria-describedby");
  unmount();
  cleanup();
});

test("Drawer: defaults to side=\"bottom\", which maps to Base UI's own down swipe-direction data attribute", () => {
  const { getByRole, unmount } = render(
    React.createElement(ui.Drawer, { open: true, onOpenChange: () => {}, title: "Filter events" }, "Filter controls"),
  );
  const dialog = getByRole("dialog", { name: "Filter events" });
  assert.equal(dialog.className.includes("maataa-ui__drawer--bottom"), true, "the default side should apply the --bottom modifier class this package's own advanced.css positions off of");
  assert.equal(dialog.getAttribute("data-swipe-direction"), "down", "side=\"bottom\" should map to Base UI's own swipeDirection=\"down\"");
  unmount();
  cleanup();
});

test("Drawer: side=\"left\" maps to swipeDirection=\"left\" and the --left modifier class", () => {
  const { getByRole, unmount } = render(
    React.createElement(ui.Drawer, { open: true, onOpenChange: () => {}, title: "Filter events", side: "left" }, "Filter controls"),
  );
  const dialog = getByRole("dialog", { name: "Filter events" });
  assert.equal(dialog.className.includes("maataa-ui__drawer--left"), true);
  assert.equal(dialog.getAttribute("data-swipe-direction"), "left");
  unmount();
  cleanup();
});

test("Drawer: pressing Escape calls onOpenChange(false)", async () => {
  let lastOpen;
  const { getByRole, unmount } = render(
    React.createElement(ui.Drawer, { open: true, onOpenChange: value => { lastOpen = value; }, title: "Filter events" }, "Filter controls"),
  );
  getByRole("dialog", { name: "Filter events" });
  await userEvent.keyboard("{Escape}");
  assert.equal(lastOpen, false, "Escape should report a close via onOpenChange -- Drawer owns no open state to close on its own");
  unmount();
  cleanup();
});

test("Drawer: closing returns focus to the trigger that opened it", async () => {
  function ControlledHarness() {
    const [open, setOpen] = React.useState(false);
    return React.createElement(Harness, { open, onOpenChange: setOpen });
  }
  const { getByRole, getByText, queryByRole, unmount } = render(React.createElement(ControlledHarness));

  const trigger = getByText("Open drawer");
  await act(async () => { trigger.focus(); });
  await userEvent.click(trigger);
  getByRole("dialog", { name: "Filter events" });

  await userEvent.keyboard("{Escape}");

  assert.equal(queryByRole("dialog"), null, "the dialog should be gone after Escape closes it");
  assert.equal(document.activeElement, trigger, "Base UI's own final-focus behavior should return focus to the trigger, with no focus-management code of Drawer's own");

  unmount();
  cleanup();
});
