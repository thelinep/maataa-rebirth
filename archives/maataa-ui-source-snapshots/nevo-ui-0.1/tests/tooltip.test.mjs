import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { render, cleanup, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as ui from "../dist/index.js";

// Base UI's default trigger hover-rest delay is 600ms (Tooltip.Trigger's
// own `delay` prop default -- see node_modules/@base-ui/react/tooltip/
// trigger/TooltipTrigger.d.ts) and `Tooltip` doesn't expose a way to
// override it, so `findByRole` is given a generous timeout rather than
// relying on Testing Library's 1000ms default racing that delay.
const HOVER_TIMEOUT = { timeout: 2000 };

function renderTooltip(content = "Saves this event") {
  return render(
    React.createElement(
      ui.Tooltip,
      { content },
      React.createElement("button", { type: "button" }, "Save"),
    ),
  );
}

test("Tooltip: the popup is not present until the trigger is activated", () => {
  const { unmount } = renderTooltip();
  assert.equal(screen.queryByRole("tooltip"), null, "no popup should be in the document before any hover/focus");
  unmount();
  cleanup();
});

test("Tooltip: hovering the trigger shows a popup with role=tooltip whose accessible text matches `content`", async () => {
  const user = userEvent.setup();
  const { unmount } = renderTooltip("Saves this event");
  const trigger = screen.getByRole("button", { name: "Save" });

  await user.hover(trigger);
  const popup = await screen.findByRole("tooltip", {}, HOVER_TIMEOUT);
  assert.equal(popup.textContent, "Saves this event", "the popup's accessible text should match the `content` prop");

  unmount();
  cleanup();
});

test("Tooltip: unhovering the trigger hides the popup again", async () => {
  const user = userEvent.setup();
  const { unmount } = renderTooltip();
  const trigger = screen.getByRole("button", { name: "Save" });

  await user.hover(trigger);
  await screen.findByRole("tooltip", {}, HOVER_TIMEOUT);

  await user.unhover(trigger);
  await waitFor(() => assert.equal(screen.queryByRole("tooltip"), null, "the popup should be removed once the trigger is no longer hovered"));

  unmount();
  cleanup();
});

test("Tooltip: focusing the trigger via the keyboard also shows the popup, and blurring hides it", async () => {
  const user = userEvent.setup();
  const { unmount } = renderTooltip();

  // Tab is the only way a keyboard-only user can reach the trigger --
  // asserting via Tab (not a direct .focus() call) keeps this test honest
  // about the actual keyboard path, matching this package's other
  // interaction tests (see table.test.mjs's use of userEvent throughout).
  await user.tab();
  const trigger = screen.getByRole("button", { name: "Save" });
  assert.equal(document.activeElement, trigger, "Tab should land on the trigger button");
  await screen.findByRole("tooltip", {}, HOVER_TIMEOUT);

  await user.tab();
  await waitFor(() => assert.equal(screen.queryByRole("tooltip"), null, "the popup should close once focus leaves the trigger"));

  unmount();
  cleanup();
});

test("Tooltip: pressing Escape while open dismisses the popup", async () => {
  // Confirmed from the installed Base UI types, not assumed: Tooltip.Root's
  // own `TooltipRootChangeEventReason` union (root/TooltipRoot.d.ts)
  // includes `REASONS.escapeKey` as a valid close reason, and TooltipRoot's
  // internal `useDismiss(...)` call (root/TooltipRoot.js) is what supplies
  // that behavior -- Escape-to-dismiss is real Base UI behavior here, not
  // an invented assumption.
  const user = userEvent.setup();
  const { unmount } = renderTooltip();
  const trigger = screen.getByRole("button", { name: "Save" });

  await user.hover(trigger);
  await screen.findByRole("tooltip", {}, HOVER_TIMEOUT);

  await user.keyboard("{Escape}");
  await waitFor(() => assert.equal(screen.queryByRole("tooltip"), null, "Escape should dismiss an open tooltip"));

  unmount();
  cleanup();
});
