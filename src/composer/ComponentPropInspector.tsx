import * as React from "react";
import { COMPONENT_PROP_SCHEMAS, type ComponentPropSchema } from "./propSchemas";

export interface ComponentPropInspectorProps {
  componentName: string;
  values: Record<string, unknown>;
  onChange: (values: Record<string, unknown>) => void;
}

export function ComponentPropInspector({componentName,values,onChange}:ComponentPropInspectorProps) {
  const schema = COMPONENT_PROP_SCHEMAS[componentName];
  if (!schema?.length) return <div className="m-prop-inspector-empty">No curated prop schema yet. Runtime preview still uses the actual export.</div>;
  const set = (prop: ComponentPropSchema, value: unknown) => onChange({...values,[prop.name]:value});
  return <div className="m-prop-inspector">{schema.map((prop)=>{
    const value = values[prop.name] ?? prop.defaultValue;
    if (prop.control === "boolean") return <label key={prop.name}><span>{prop.label ?? prop.name}</span><input type="checkbox" checked={Boolean(value)} onChange={(e)=>set(prop,e.target.checked)}/></label>;
    // eslint-disable-next-line @typescript-eslint/no-base-to-string -- composer props are untyped JSON values; String() coercion of non-string values is existing behaviour (follow-up: an object value renders as [object Object])
    if (prop.control === "select") return <label key={prop.name}><span>{prop.label ?? prop.name}</span><select value={String(value ?? "")} onChange={(e)=>set(prop,e.target.value)}>{prop.options?.map((o)=><option value={o} key={o}>{o}</option>)}</select></label>;
    if (prop.control === "number") return <label key={prop.name}><span>{prop.label ?? prop.name}</span><input type="number" value={Number(value ?? 0)} onChange={(e)=>set(prop,Number(e.target.value))}/></label>;
    // eslint-disable-next-line @typescript-eslint/no-base-to-string -- composer props are untyped JSON values; String() coercion of non-string values is existing behaviour (follow-up: an object value renders as [object Object])
    return <label key={prop.name}><span>{prop.label ?? prop.name}</span><input value={String(value ?? "")} onChange={(e)=>set(prop,e.target.value)}/></label>;
  })}</div>;
}
