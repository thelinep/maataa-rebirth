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
const services={
  telemetry:{id:"telemetry"}, control:{id:"control"}, approval:{id:"approval"}, agent:{id:"agent"},
  theme:{id:"theme"}, toast:{id:"toast"}
};

test("INV-015 React adapter rejects incomplete host contracts", () => {
  assert.throws(() => validateReactHost({ createElement() {} }), /REACT_HOST_CONTRACT_UNSATISFIED:useState,useEffect/);
});

test("React adapter declares a stable host contract and peer range", () => {
  assert.equal(REACT_ADAPTER_CONTRACT_VERSION, "1.0.0");
  assert.equal(REACT_PEER_RANGE, ">=18.2.0 <20");
});

test("M2 shipped primitive surface is present and semantic", () => {
  const ui=createMaataaReact(host(),services);
  for(const name of ["Box","Button","Input","Textarea","Select","Switch","VisuallyHidden","AriaLive"]) assert.equal(typeof ui[name],"function",name);
  assert.equal(ui.Box({children:"x"}).type,"div");
  assert.equal(ui.Button({children:"Approve"}).type,"button");
  assert.equal(ui.Button({children:"Approve"}).props.type,"button");
  assert.equal(ui.Input({"aria-label":"Command"}).type,"input");
  assert.equal(ui.Textarea({"aria-label":"Notes"}).type,"textarea");
  assert.equal(ui.Select({children:[]}).type,"select");
  const sw=ui.Switch({label:"Evidence"});
  assert.equal(sw.type,"label"); assert.equal(sw.children[0].props.role,"switch");
  assert.equal(ui.VisuallyHidden({children:"hidden"}).type,"span");
  const live=ui.AriaLive({children:"ready"});
  assert.equal(live.props.role,"status"); assert.equal(live.props["aria-live"],"polite");
});

test("M2 shipped hook surface is present and service hooks resolve injected services", () => {
  const ui=createMaataaReact(host(),services);
  for(const name of ["useDisclosure","useMediaQuery","useTelemetry","useControl","useApproval","useAgent","useTheme","useToast"]) assert.equal(typeof ui[name],"function",name);
  assert.equal(ui.useDisclosure(true).open,true);
  assert.equal(ui.useMediaQuery("(min-width: 1px)"),false);
  assert.equal(ui.useTelemetry().id,"telemetry");
  assert.equal(ui.useControl().id,"control");
  assert.equal(ui.useApproval().id,"approval");
  assert.equal(ui.useAgent().id,"agent");
  assert.equal(ui.useTheme().id,"theme");
  assert.equal(ui.useToast().id,"toast");
});

test("deferred M3 hook candidates are not accidentally shipped in M2", () => {
  const ui=createMaataaReact(host(),services);
  for(const name of ["useMaataaContext","useRecommendation","useProposal","useEvidence","useCommand","useCommandReceipt","useControlLease","useObservedState","useDeviceState","useTwin"]) assert.equal(name in ui,false,name);
});
