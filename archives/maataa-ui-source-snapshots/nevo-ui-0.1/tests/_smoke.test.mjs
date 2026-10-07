import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as ui from "../dist/index.js";

// Originally written as a throwaway to prove the jsdom + Testing Library +
// `node --test` combination actually works end-to-end, before any real
// component depended on it (see dom-setup.mjs's header comment and the
// package README's testing section). Kept on permanently, renamed in
// intent rather than deleted: it's a cheap, fast canary that the whole
// harness (jsdom globals, RTL, user-event, the built dist/ output) is
// wired up correctly, independent of any one component's own tests --
// useful to have fail first and loudly if the harness itself breaks.
test("harness canary: jsdom + Testing Library can render and interact with a real @maataa/ui component", async () => {
  let clicks = 0;
  const { getByRole, unmount } = render(React.createElement(ui.Button, { onClick: () => { clicks += 1; } }, "Click me"));
  const button = getByRole("button", { name: "Click me" });
  await userEvent.click(button);
  assert.equal(clicks, 1, "a real click event should have reached the onClick handler");
  unmount();
  cleanup();
});
