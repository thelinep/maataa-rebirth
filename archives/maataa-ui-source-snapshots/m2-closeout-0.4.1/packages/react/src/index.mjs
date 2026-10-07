export const REACT_ADAPTER_CONTRACT_VERSION = "1.0.0";
export const REACT_PEER_RANGE = ">=18.2.0 <20";

const REQUIRED_HOST_APIS = Object.freeze(["createElement","useState","useEffect"]);

export function validateReactHost(React) {
  const missing = REQUIRED_HOST_APIS.filter((name) => typeof React?.[name] !== "function");
  if (missing.length) throw new Error(`REACT_HOST_CONTRACT_UNSATISFIED:${missing.join(",")}`);
  return true;
}

export function createMaataaReact(React, services = {}) {
  validateReactHost(React);
  const h = React.createElement;
  const Box = ({ as = "div", children, ...props }) => h(as, props, children);
  const Button = ({ children, type = "button", ...props }) => h("button", { type, ...props }, children);
  const Input = (props) => h("input", props);
  const Textarea = (props) => h("textarea", props);
  const Select = ({ children, ...props }) => h("select", props, children);
  const Switch = ({ label, ...props }) => h("label", {}, h("input", { type: "checkbox", role: "switch", ...props }), label);
  const VisuallyHidden = ({ children }) => h("span", { style: { position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 } }, children);
  const AriaLive = ({ children, politeness = "polite" }) => h("div", { "aria-live": politeness, role: "status" }, children);

  function useDisclosure(initial = false) {
    const [open, setOpen] = React.useState(initial);
    return { open, onOpen: () => setOpen(true), onClose: () => setOpen(false), onToggle: () => setOpen((value) => !value) };
  }

  function useMediaQuery(query) {
    const [match, setMatch] = React.useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
    React.useEffect(() => {
      if (typeof window === "undefined") return undefined;
      const media = window.matchMedia(query);
      const update = () => setMatch(media.matches);
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }, [query]);
    return match;
  }

  function useService(name) {
    const service = services[name];
    if (!service) throw new Error(`SERVICE_NOT_CONFIGURED:${name}`);
    return service;
  }

  function useTelemetry() { return useService("telemetry"); }
  function useControl() { return useService("control"); }
  function useApproval() { return useService("approval"); }
  function useAgent() { return useService("agent"); }
  function useTheme() { return useService("theme"); }
  function useToast() { return useService("toast"); }

  return Object.freeze({
    Box, Button, Input, Textarea, Select, Switch, VisuallyHidden, AriaLive,
    useDisclosure, useMediaQuery, useTelemetry, useControl, useApproval, useAgent, useTheme, useToast
  });
}
