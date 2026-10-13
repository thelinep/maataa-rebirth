// jsdom-based boundary tests for the Brahmini app-local pointer observer.
import { test } from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import {
  attachAppLocalPointerObserver,
  describeControl,
} from "../../examples/redux-demo/pointerContext.ts";

function setup() {
  const dom = new JSDOM(`<!doctype html><body>
    <main id="workbench">
      <label for="secret">Project brief</label><input id="secret" value="PRIVATE-VALUE-123" />
      <textarea aria-label="Notes">PRIVATE-TEXTAREA</textarea>
      <button id="go" type="button">Ask Brahmini</button>
      <p id="plain">Plain text</p>
    </main>
    <aside id="other-app"><button id="other">Other app button</button><input id="other-input" value="OTHER-SECRET"/></aside>
  </body>`);
  const { document } = dom.window;
  return { dom, document, root: document.getElementById("workbench") as HTMLElement };
}

test("describes only role and accessible label, never field values or coordinates", () => {
  const { document, root } = setup();
  const input = describeControl(document.getElementById("secret"), root);
  assert.deepEqual(input, { role: "input", label: "Project brief" });
  const textarea = describeControl(document.querySelector("textarea"), root);
  assert.deepEqual(textarea, { role: "textarea", label: "Notes" });
  for (const context of [input, textarea]) {
    assert.deepEqual(Object.keys(context!).sort(), ["label", "role"]);
    assert.doesNotMatch(JSON.stringify(context), /PRIVATE/);
  }
  assert.equal(describeControl(document.getElementById("plain"), root), null);
});

test("cannot observe controls outside its root (other app surfaces) or another document", () => {
  const { document, root } = setup();
  assert.equal(describeControl(document.getElementById("other"), root), null);
  assert.equal(describeControl(document.getElementById("other-input"), root), null);
  const foreign = new JSDOM(`<button id="x">Foreign window</button>`).window.document.getElementById("x");
  assert.equal(describeControl(foreign, root), null);
  assert.equal(describeControl(null, root), null);
});

test("observer listens on its root only and detaches cleanly", () => {
  const { dom, document, root } = setup();
  const globalListeners: string[] = [];
  const winAdd = dom.window.addEventListener.bind(dom.window);
  const docAdd = document.addEventListener.bind(document);
  dom.window.addEventListener = ((type: string, ...rest: unknown[]) => { globalListeners.push(`window:${type}`); return (winAdd as (...args: unknown[]) => unknown)(type, ...rest); }) as never;
  document.addEventListener = ((type: string, ...rest: unknown[]) => { globalListeners.push(`document:${type}`); return (docAdd as (...args: unknown[]) => unknown)(type, ...rest); }) as never;

  const seen: string[] = [];
  const detach = attachAppLocalPointerObserver(root, (ctx) => seen.push(ctx.label));
  // Only listeners installed by attach itself count; jsdom adds its own
  // internal hover listeners on first dispatch, which are not the observer's.
  const installedByObserver = [...globalListeners];
  const over = (el: Element) => el.dispatchEvent(new dom.window.Event("pointerover", { bubbles: true }));
  over(document.getElementById("go")!);
  over(document.getElementById("go")!); // de-duplicated
  over(document.getElementById("other")!); // outside root: never delivered
  document.getElementById("secret")!.dispatchEvent(new dom.window.FocusEvent("focusin", { bubbles: true }));
  assert.deepEqual(seen, ["Ask Brahmini", "Project brief"]);
  assert.deepEqual(installedByObserver, []);

  detach();
  over(document.querySelector("textarea")!);
  assert.deepEqual(seen, ["Ask Brahmini", "Project brief"]);
});

test("observation is read-only: no clicks, typing, focus moves or value changes", () => {
  const { dom, document, root } = setup();
  const proto = dom.window.HTMLElement.prototype;
  const calls: string[] = [];
  const originals = { click: proto.click, focus: proto.focus, blur: proto.blur };
  proto.click = function () { calls.push("click"); };
  proto.focus = function () { calls.push("focus"); };
  proto.blur = function () { calls.push("blur"); };
  const events: string[] = [];
  for (const type of ["click", "keydown", "keyup", "input", "change", "beforeinput"]) {
    root.addEventListener(type, () => events.push(type), true);
  }
  try {
    attachAppLocalPointerObserver(root, () => {});
    for (const el of root.querySelectorAll("button, input, textarea")) {
      el.dispatchEvent(new dom.window.Event("pointerover", { bubbles: true }));
      el.dispatchEvent(new dom.window.FocusEvent("focusin", { bubbles: true }));
    }
  } finally {
    Object.assign(proto, originals);
  }
  assert.deepEqual(calls, []);
  assert.deepEqual(events, []);
  assert.equal((document.getElementById("secret") as HTMLInputElement).value, "PRIVATE-VALUE-123");
  assert.equal(document.activeElement, document.body);
});
