import * as React from "react";
import type { LayoutPresetProps } from "../internal/layoutPreset";
import { CANONICAL_LAYOUT_LOADERS } from "./layoutLoaders.generated";

const layouts = new Map(Object.entries(CANONICAL_LAYOUT_LOADERS).map(([id,load])=>[id,React.lazy(load)]));
class LayoutErrorBoundary extends React.Component<{children:React.ReactNode},{failed:boolean}> {
  state={failed:false};
  static getDerivedStateFromError(){return {failed:true};}
  render(){return this.state.failed?<div role="alert">Selected layout could not load. Retry or choose another layout.</div>:this.props.children;}
}
export function CanonicalLayout({layoutTypeId,...props}:LayoutPresetProps&{layoutTypeId:string}) {
  const Layout=layouts.get(layoutTypeId);
  if(!Layout)return <div role="alert" data-layout-status="invalid">Unknown canonical layout: {layoutTypeId}</div>;
  return <LayoutErrorBoundary key={layoutTypeId}><React.Suspense fallback={<div role="status">Loading selected layout…</div>}>
    <Layout {...props} data-layout-id={layoutTypeId}/>
  </React.Suspense></LayoutErrorBoundary>;
}
