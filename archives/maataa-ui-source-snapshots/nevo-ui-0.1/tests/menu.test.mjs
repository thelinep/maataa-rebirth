import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as ui from "../dist/index.js";

function BasicMenu({ onItemClick }) {
  return React.createElement(
    ui.Menu,
    null,
    React.createElement(ui.Menu.Trigger, null, "Actions"),
    React.createElement(
      ui.Menu.Popup,
      null,
      React.createElement(ui.Menu.Item, { onClick: () => onItemClick?.("edit") }, "Edit"),
      React.createElement(ui.Menu.Item, { onClick: () => onItemClick?.("duplicate") }, "Duplicate"),
      React.createElement(
        ui.Menu.Group,
        null,
        React.createElement(ui.Menu.GroupLabel, null, "Danger zone"),
        React.createElement(ui.Menu.Item, { onClick: () => onItemClick?.("delete") }, "Delete"),
      ),
    ),
  );
}

test("Menu: closed by default -- the trigger is a real button and no menu items are in the tree yet", async () => {
  const { queryByRole, getByRole, unmount } = render(React.createElement(BasicMenu));
  try {
    assert.ok(getByRole("button", { name: "Actions" }), "Menu.Trigger renders a real <button>");
    assert.equal(queryByRole("menu"), null, "the menu popup should not be in the DOM until opened");
  } finally {
    unmount();
    cleanup();
  }
});

test("Menu: clicking the trigger opens the menu and exposes its items by role", async () => {
  const { getByRole, findByRole, getAllByRole, unmount } = render(React.createElement(BasicMenu));
  try {
    await userEvent.click(getByRole("button", { name: "Actions" }));
    // Base UI's Menu positions its popup via floating-ui after mount
    // (same reasoning tooltip.test.mjs documents for its own hover-delay
    // popup), so the popup isn't necessarily present in the very next
    // microtask -- findByRole polls instead of asserting synchronously.
    assert.ok(await findByRole("menu"), "opening the trigger should render role=menu");
    const items = getAllByRole("menuitem");
    assert.equal(items.length, 3, "Edit, Duplicate, and Delete should all be exposed as menuitem");
  } finally {
    unmount();
    cleanup();
  }
});

test("Menu: Menu.GroupLabel is wired as its Menu.Group's accessible name, not just visual text", async () => {
  const { getByRole, findByRole, unmount } = render(React.createElement(BasicMenu));
  try {
    await userEvent.click(getByRole("button", { name: "Actions" }));
    await findByRole("menu");
    const group = getByRole("group", { name: "Danger zone" });
    assert.ok(group, "Menu.GroupLabel should be wired as the enclosing Menu.Group's accessible name (confirmed in menu/group-label/MenuGroupLabel.d.ts)");
  } finally {
    unmount();
    cleanup();
  }
});

test("Menu: clicking an item fires its own onClick and, by default, closes the menu", async () => {
  let clicked;
  const { getByRole, findByRole, queryByRole, unmount } = render(
    React.createElement(BasicMenu, { onItemClick: value => { clicked = value; } }),
  );
  try {
    await userEvent.click(getByRole("button", { name: "Actions" }));
    await findByRole("menu");
    await userEvent.click(getByRole("menuitem", { name: "Edit" }));
    assert.equal(clicked, "edit", "the clicked item's own onClick handler should fire");
    assert.equal(queryByRole("menu"), null, "Menu.Item's closeOnClick defaults to true (menu/item/MenuItem.d.ts), so a plain item click should close the menu");
  } finally {
    unmount();
    cleanup();
  }
});

test("Menu: Escape closes the menu and returns focus to the trigger", async () => {
  const { getByRole, findByRole, queryByRole, unmount } = render(React.createElement(BasicMenu));
  try {
    const trigger = getByRole("button", { name: "Actions" });
    await userEvent.click(trigger);
    await findByRole("menu");
    await userEvent.keyboard("{Escape}");
    assert.equal(queryByRole("menu"), null);
    assert.equal(document.activeElement, trigger, "Base UI's own focus-return behavior, with no focus-management code of Menu's own");
  } finally {
    unmount();
    cleanup();
  }
});
