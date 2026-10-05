import * as React from "react";
import { LAYOUT_RUNTIME_CONTRACTS } from "./layoutContracts.generated";
import { DeviceContainerContext } from "./ResponsiveDeviceRuntime";
import { resolveDeviceRuntime } from "./deviceRuntime";
import { transformCompositionRegions } from "./responsiveTransforms";
import { CanonicalLayout } from "./CanonicalLayout";
import { composeSceneRegions } from "./sceneRegions";
import { validateComposerScene } from "../composer/validate";
import type { ComposerScene } from "../composer/types";

export interface CompositionRuntimeProps {
  scene: ComposerScene;
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  nav?: React.ReactNode;
  inspector?: React.ReactNode;
  validation?: Readonly<{ valid: boolean; compatibility?: {status:"verified"|"unverified"}; warnings?: readonly {code:string;message:string}[] }>;
}
export function CompositionRuntime({
  scene,
  header,
  sidebar,
  nav,
  inspector,
  validation: validationOverride,
}: CompositionRuntimeProps) {
  const container=React.useContext(DeviceContainerContext);
  const localValidation=validateComposerScene(scene);
  const validation=localValidation.valid?(validationOverride??localValidation):localValidation;
  const status = !validation.valid ? "invalid" : ("compatibility" in validation ? validation.compatibility?.status : undefined) ?? "unverified";
  if(!validation.valid) return <div role="alert" data-composition-status="invalid">Composition is invalid. Correct its canonical identities and scene before rendering.</div>;
  const device=resolveDeviceRuntime(scene.deviceId);
  const contract=LAYOUT_RUNTIME_CONTRACTS[scene.layoutTypeId];
  const content=composeSceneRegions(scene);
  const defaultHeader=!contract?.gridRegions.length||contract.gridRegions.includes("header")?<><strong>{scene.name}</strong><small>{scene.pageTypeId}</small></>:undefined;
  const transformed=transformCompositionRegions({...content.props,header:header??content.props.header??defaultHeader,sidebar:sidebar??content.props.sidebar,nav:nav??content.props.nav,inspector:inspector??content.props.inspector},container?.width??device?.width??1440,container?.inputModalities??device?.device.inputModalities);
  return <div className="m-composition-runtime-canonical" data-composition-status={status} data-placement-status={contract?.placementStatus??"unverified"} data-workspace={scene.workspaceTypeId} data-page={scene.pageTypeId} data-layout={scene.layoutTypeId} data-maataa-theme={scene.theme} data-density={scene.density} data-device-id={scene.deviceId} data-responsive-stack={transformed.stack||undefined} data-transformations={transformed.applied.join(" ")}>
    <div className="m-composition-evidence" role="status">Composition: {status}{content.unverified.length>0&&<span> · Region placement unverified; content is shown in the primary region.</span>}</div>
    <CanonicalLayout layoutTypeId={scene.layoutTypeId}
      {...transformed.props}/>
  </div>;
}
