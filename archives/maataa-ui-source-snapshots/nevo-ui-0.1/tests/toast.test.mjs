import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { render, cleanup, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as ui from "../dist/index.js";

// A harness that exercises useToast() through real buttons rather than
// driving the manager directly from the test -- matches how a consumer
// actually uses it, and means every assertion below observes the same
// commit React itself makes on a click, no manual `act()` wrapping needed
// (see table.test.mjs, which follows the same approach for its own hooks).
function ToastHarness({ options }) {
  const { add, close } = ui.useToast();
  const idRef = React.useRef(null);
  return React.createElement(
    React.Fragment,
    null,
    React.createElement("button", { type: "button", onClick: () => { idRef.current = add(options); } }, "Add toast"),
    React.createElement("button", { type: "button", onClick: () => { if (idRef.current) close(idRef.current); } }, "Close toast"),
  );
}

// `Toast.Portal` (inside Toaster) moves the viewport to <body>, outside the
// container `render()` creates -- but Testing Library's returned queries
// are already bound to `baseElement` (document.body) by default, so no
// extra `within(document.body)` wrapping is needed to reach it.
function renderToaster(options) {
  return render(
    React.createElement(
      ui.ToastProvider,
      null,
      React.createElement(ToastHarness, { options }),
      React.createElement(ui.Toaster, null),
    ),
  );
}

test("Toaster: renders no toast (no dialog/alertdialog role) until useToast().add() is called", () => {
  const { queryByRole, unmount } = renderToaster({ title: "Changes saved", timeout: 0 });
  assert.equal(queryByRole("dialog"), null, "Toaster mounts an empty viewport -- it must not pre-render a toast");
  assert.equal(queryByRole("alertdialog"), null);
  unmount();
  cleanup();
});

test("useToast().add(): a default-priority toast is a role=\"dialog\" (confirmed in Base UI's ToastRoot source -- not the 'status'/'alert' roles some other toast libraries use), labelled by its title and described by its description", async () => {
  const { getByRole, getByText, unmount } = renderToaster({
    title: "Changes saved",
    description: "Your event details were updated.",
    timeout: 0,
  });
  await userEvent.click(getByRole("button", { name: "Add toast" }));

  const toastEl = getByRole("dialog", { name: "Changes saved" });
  const description = getByText("Your event details were updated.");
  assert.equal(description.tagName, "P", "Toast.Description renders a <p>, per its own type doc");
  assert.equal(toastEl.getAttribute("aria-describedby"), description.id, "the toast must be described by its own Toast.Description, not just carry the text as plain content");
  unmount();
  cleanup();
});

test("useToast().add({ priority: 'high' }): reports role=\"alertdialog\", not the default role=\"dialog\"", async () => {
  const { getByRole, baseElement, unmount } = renderToaster({ title: "Payment failed", priority: "high", timeout: 0 });
  await userEvent.click(getByRole("button", { name: "Add toast" }));

  // Base UI's ToastRoot marks an unfocused high-priority toast aria-hidden
  // until the toast region gains focus (see its source). That's real,
  // intentional behavior -- but it also means dom-accessibility-api (the
  // library behind Testing Library's role queries) computes an EMPTY
  // accessible name for it: per its implementation, a node referenced via
  // aria-labelledby that sits inside an aria-hidden ancestor contributes no
  // text to the name computation, even though the node is the direct
  // labelledby target (verified by hand against this exact jsdom + Testing
  // Library combination). `hidden: true` only widens which elements
  // `getByRole` considers as candidates -- it doesn't change that name
  // computation -- so `getByRole("alertdialog", { name: ... })` can never
  // match here. A direct DOM query sidesteps the accessible-name quirk
  // while still asserting the real thing this test cares about: the role
  // is "alertdialog", not "dialog", and it carries the right text.
  const toastEl = baseElement.querySelector('[role="alertdialog"]');
  assert.ok(toastEl, "a high-priority toast must render with role=\"alertdialog\"");
  assert.equal(baseElement.querySelector('[role="dialog"]'), null, "a high-priority toast must not also/instead get the default role=\"dialog\"");
  assert.match(toastEl.textContent ?? "", /Payment failed/, "the alertdialog must still contain the toast's title text");
  unmount();
  cleanup();
});

test("useToast().close(id): removes the toast from the DOM", async () => {
  const { getByRole, queryByRole, unmount } = renderToaster({ title: "Changes saved", timeout: 0 });
  await userEvent.click(getByRole("button", { name: "Add toast" }));
  getByRole("dialog", { name: "Changes saved" });

  await userEvent.click(getByRole("button", { name: "Close toast" }));
  // The removal itself waits a tick for Base UI's exit-transition-complete
  // check (which resolves immediately in jsdom, since jsdom has no Web
  // Animations API -- see useAnimationsFinished's `getAnimations` guard --
  // but still asynchronously, via a requestAnimationFrame), so this must
  // be asserted with waitFor rather than immediately after the click.
  await waitFor(() => assert.equal(queryByRole("dialog", { name: "Changes saved" }), null));
  unmount();
  cleanup();
});

test("Toaster: exposes a labelled dismiss button for keyboard and screen-reader users", async () => {
  const { getByRole, queryByRole, unmount } = renderToaster({ title: "Changes saved", timeout: 0 });
  await userEvent.click(getByRole("button", { name: "Add toast" }));
  const toast = getByRole("dialog", { name: "Changes saved" });
  await userEvent.click(within(toast).getByRole("button", { name: "Dismiss notification" }));
  await waitFor(() => assert.equal(queryByRole("dialog", { name: "Changes saved" }), null));
  unmount();
  cleanup();
});

test("Escape dismisses the focused toast (Base UI's own ToastRoot keydown handler, confirmed in source)", async () => {
  const { getByRole, queryByRole, unmount } = renderToaster({ title: "Changes saved", timeout: 0 });
  await userEvent.click(getByRole("button", { name: "Add toast" }));
  const toastEl = getByRole("dialog", { name: "Changes saved" });

  toastEl.focus();
  assert.equal(document.activeElement, toastEl, "ToastRoot is tabIndex=0 and Base UI only dismisses on Escape while focus is inside it -- not as a global shortcut");
  await userEvent.keyboard("{Escape}");
  await waitFor(() => assert.equal(queryByRole("dialog", { name: "Changes saved" }), null));
  unmount();
  cleanup();
});
