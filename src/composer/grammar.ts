import { COMPOSITION_RELATIONSHIPS,type CompositionRelationship } from "../registries/compositionRelationships.generated";
import { COMPONENT_REGISTRY } from "../registries/componentRegistry";
import { PAGE_TYPES } from "../registries/pageRegistry";
import { WORKSPACE_TYPES } from "../registries/workspaceRegistry";
import { LAYOUT_TYPES } from "../registries/layoutRegistry";
import { REGION_REGISTRY } from "../registries/regionRegistry";
import { ATOMIC_COMPONENT_REGISTRY } from "../registries/atomicComponentRegistry";
const catalogs: readonly (readonly {id:string}[])[]=[COMPONENT_REGISTRY,PAGE_TYPES,WORKSPACE_TYPES,LAYOUT_TYPES,REGION_REGISTRY,ATOMIC_COMPONENT_REGISTRY];
const known=new Set(catalogs.flatMap(catalog=>catalog.map(record=>record.id)));
const key=(subject:string,relationship:string,object:string)=>JSON.stringify([subject,relationship,object]);
const edges=new Map(COMPOSITION_RELATIONSHIPS.map(record=>[key(record.subjectId,record.relationship,record.objectId),record]));
export function evaluateCompositionRelationship(subjectId:string,relationship:CompositionRelationship["relationship"],objectId:string){
 const record=edges.get(key(subjectId,relationship,objectId));
 return {identitiesValid:known.has(subjectId)&&known.has(objectId),status:record?.status??"unverified" as const,evidence:record?.evidence??[],record};
}
export { COMPOSITION_RELATIONSHIPS };
export type { CompositionRelationship,CompositionRelationshipStatus } from "../registries/compositionRelationships.generated";
