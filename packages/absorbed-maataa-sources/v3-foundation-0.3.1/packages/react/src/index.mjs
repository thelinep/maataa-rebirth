export function createMaataaReact(React, services={}) {
  if (!React?.createElement || !React?.useState || !React?.useEffect) throw new Error("REACT_API_REQUIRED");
  const h=React.createElement;
  const Box=({as="div",children,...props})=>h(as,props,children);
  const Button=({children,...props})=>h("button",{type:"button",...props},children);
  const Input=(props)=>h("input",props);
  const Textarea=(props)=>h("textarea",props);
  const Select=({children,...props})=>h("select",props,children);
  const Switch=({label,...props})=>h("label",{},h("input",{type:"checkbox",role:"switch",...props}),label);
  const VisuallyHidden=({children})=>h("span",{style:{position:"absolute",width:1,height:1,padding:0,margin:-1,overflow:"hidden",clip:"rect(0,0,0,0)",whiteSpace:"nowrap",border:0}},children);
  const AriaLive=({children,politeness="polite"})=>h("div",{"aria-live":politeness,role:"status"},children);
  function useDisclosure(initial=false){const [open,setOpen]=React.useState(initial);return {open,onOpen:()=>setOpen(true),onClose:()=>setOpen(false),onToggle:()=>setOpen(v=>!v)};}
  function useMediaQuery(query){const [match,setMatch]=React.useState(()=>typeof window!=="undefined"&&window.matchMedia(query).matches);React.useEffect(()=>{if(typeof window==="undefined")return;const m=window.matchMedia(query),f=()=>setMatch(m.matches);m.addEventListener("change",f);return()=>m.removeEventListener("change",f)},[query]);return match;}
  function useService(name){const svc=services[name];if(!svc)throw new Error(`SERVICE_NOT_CONFIGURED:${name}`);return svc;}
  function useTelemetry(){return useService("telemetry");}
  function useControl(){return useService("control");}
  function useApproval(){return useService("approval");}
  function useAgent(){return useService("agent");}
  function useTheme(){return useService("theme");}
  function useToast(){return useService("toast");}
  return {Box,Button,Input,Textarea,Select,Switch,VisuallyHidden,AriaLive,useDisclosure,useMediaQuery,useTelemetry,useControl,useApproval,useAgent,useTheme,useToast};
}
