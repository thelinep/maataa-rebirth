import * as React from "react";
import { ComposerRenderer } from "../composer/ComposerRenderer";
import type { ComposerScene } from "../composer/types";
import type { LayoutPresetProps } from "../internal/layoutPreset";
import { planSceneRegions } from "../composer/regionPlan";
export function composeSceneRegions(scene:ComposerScene){
 const plan=planSceneRegions(scene);const props:LayoutPresetProps={};
 for(const [slot,blocks] of plan.assignments)(props as Record<string,React.ReactNode>)[slot]=<ComposerRenderer scene={{...scene,blocks}}/>;
 return {props,unverified:plan.unverified};
}
