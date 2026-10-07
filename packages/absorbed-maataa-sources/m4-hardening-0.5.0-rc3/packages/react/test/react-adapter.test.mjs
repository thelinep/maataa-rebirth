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
  theme:{id:"theme"}, toast:{id:"toast"}, context:{id:"context"}, recommendation:{id:"recommendation"}, proposal:{id:"proposal"}, commandReceipt:{id:"commandReceipt"}, observedState:{id:"observedState"}, verification:{id:"verification"}, evidence:{id:"evidence"}, controlLease:{id:"controlLease"}, deviceState:{id:"deviceState"}
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

test("M3 camera-proven semantic and integration hooks resolve injected services", () => {
  const ui=createMaataaReact(host(),services);
  const names=["useMaataaContext","useRecommendation","useProposal","useCommandReceipt","useObservedState","useVerification","useEvidence","useControlLease","useDeviceState"];
  for(const name of names) assert.equal(typeof ui[name],"function",name);
  assert.equal(ui.useMaataaContext().id,"context");
  assert.equal(ui.useRecommendation().id,"recommendation");
  assert.equal(ui.useProposal().id,"proposal");
  assert.equal(ui.useCommandReceipt().id,"commandReceipt");
  assert.equal(ui.useObservedState().id,"observedState");
  assert.equal(ui.useVerification().id,"verification");
  assert.equal(ui.useEvidence().id,"evidence");
  assert.equal(ui.useControlLease().id,"controlLease");
  assert.equal(ui.useDeviceState().id,"deviceState");
});

test("still-deferred hooks remain absent after M3", () => {
  const ui=createMaataaReact(host(),services);
  for(const name of ["usePolicyDecision","useApprovalState","useAuthorizedCommand","useDispatchState","useTwin","useRegistry","useRenderer"]) assert.equal(name in ui,false,name);
});
