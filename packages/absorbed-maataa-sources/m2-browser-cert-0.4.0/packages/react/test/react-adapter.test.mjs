import test from "node:test";
import assert from "node:assert/strict";
import { createMaataaReact, validateReactHost, REACT_ADAPTER_CONTRACT_VERSION, REACT_PEER_RANGE } from "../src/index.mjs";

function host() {
  return {
    createElement(type, props, ...children) { return { type, props: props ?? {}, children }; },
    useState(initial) { let value = typeof initial === "function" ? initial() : initial; return [value, (next) => { value = typeof next === "function" ? next(value) : next; }]; },
    useEffect(effect) { effect(); }
  };
}

test("INV-015 React adapter rejects incomplete host contracts", () => {
  assert.throws(() => validateReactHost({ createElement() {} }), /REACT_HOST_CONTRACT_UNSATISFIED:useState,useEffect/);
});

test("React adapter declares a stable host contract and peer range", () => {
  assert.equal(REACT_ADAPTER_CONTRACT_VERSION, "1.0.0");
  assert.equal(REACT_PEER_RANGE, ">=18.2.0 <20");
});

test("React adapter produces native semantic primitives through a conforming host", () => {
  const ui = createMaataaReact(host(), { control: { id: "control" } });
  assert.equal(ui.Button({ children: "Approve" }).type, "button");
  assert.equal(ui.Input({ "aria-label": "Command" }).type, "input");
  const sw = ui.Switch({ label: "Evidence" });
  assert.equal(sw.type, "label");
  assert.equal(sw.children[0].props.role, "switch");
  assert.equal(ui.useControl().id, "control");
});
