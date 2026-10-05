// Derived source facts; registry IDs remain owned by their canonical catalogues.
import { LAYOUT_TYPES } from "./layoutRegistry";
import { COMPOSITION_COMPATIBILITY_REGISTRY } from "./compositionCompatibilityRegistry";
export type CompositionRelationshipStatus="verified"|"declared"|"recommended"|"unverified"|"denied"|"deprecated";
export interface CompositionRelationship {subjectId:string;relationship:"supports-page"|"supports-layout"|"supports-region"|"contains-component"|"composes-atom";objectId:string;status:CompositionRelationshipStatus;evidence:readonly {kind:string;reference:string}[];}
const sourceRegions = ["REGION.LAYOUT.LAYOUTHEADER","REGION.LAYOUT.LAYOUTNAV","REGION.LAYOUT.LAYOUTHERO","REGION.LAYOUT.LAYOUTTOOLBAR","REGION.LAYOUT.LAYOUTSIDEBAR","REGION.LAYOUT.LAYOUTSECONDARYSIDEBAR","REGION.LAYOUT.LAYOUTRAIL","REGION.LAYOUT.LAYOUTPALETTE","REGION.LAYOUT.LAYOUTFILTERS","REGION.LAYOUT.LAYOUTLIST","REGION.LAYOUT.LAYOUTSTAGE","REGION.LAYOUT.LAYOUTCANVAS","REGION.LAYOUT.LAYOUTPREVIEW","REGION.LAYOUT.LAYOUTDETAILS","REGION.LAYOUT.LAYOUTINSPECTOR","REGION.LAYOUT.LAYOUTPROPERTIES","REGION.LAYOUT.LAYOUTTIMELINE","REGION.LAYOUT.LAYOUTDOCK","REGION.LAYOUT.LAYOUTACTIONS","REGION.LAYOUT.LAYOUTSTATUSBAR","REGION.LAYOUT.LAYOUTFOOTER","REGION.LAYOUT.LAYOUTBOTTOMNAV","REGION.LAYOUT.LAYOUTMAIN"] as const;
export const COMPOSITION_RELATIONSHIPS: readonly CompositionRelationship[] = [
 ...COMPOSITION_COMPATIBILITY_REGISTRY.flatMap(tuple=>[
  {subjectId:tuple.workspaceTypeId,relationship:"supports-page" as const,objectId:tuple.pageTypeId,status:"declared" as const,evidence:tuple.evidence},
  {subjectId:tuple.pageTypeId,relationship:"supports-layout" as const,objectId:tuple.layoutTypeId,status:"declared" as const,evidence:tuple.evidence},
 ]),
 ...LAYOUT_TYPES.flatMap(layout=>sourceRegions.map(regionId=>({subjectId:layout.id,relationship:"supports-region" as const,objectId:regionId,status:"declared" as const,evidence:[{kind:"source",reference:"src/internal/layoutPreset.tsx"}]}))),
];
