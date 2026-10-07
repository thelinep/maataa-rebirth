export type AuthorityClass = "advisory"|"proposal"|"approval"|"execution"|"authoritative";
export type InteractionState = "advisory"|"proposed"|"approval_required"|"authorized"|"executing"|"executed"|"verified"|"denied"|"stale"|"conflict";
export interface Provenance { sourceId:string; sourceType:string; observedAt?:string; validAt?:string; uri?:string; hash?:string; }
export interface EvidenceRef { id:string; kind:string; label:string; provenance?:Provenance; }
export interface ContextItem<T=unknown>{ key:string; value:T; source?:Provenance; sensitivity?:"public"|"internal"|"restricted"; freshness?:"current"|"stale"|"unknown"; }
export interface ProposedAction { id:string; actionType:string; summary:string; payload?:unknown; authorityClass:AuthorityClass; requiresApproval?:boolean; }
export interface Recommendation { id:string; summary:string; rationaleSummary?:string; assumptions?:string[]; alternatives?:string[]; risks?:string[]; confidence?:number; evidence?:EvidenceRef[]; proposedActions?:ProposedAction[]; }
export interface PolicyDecision { id:string; outcome:"allow"|"deny"|"allow_with_approval"|"allow_with_constraints"; reasonCodes:string[]; requiredApprovalIds?:string[]; }
export interface ApprovalRecord { id:string; status:"pending"|"approved"|"rejected"|"returned"; approverRef?:string; decidedAt?:string; comment?:string; evidence?:EvidenceRef[]; }
export interface ExecutionReceipt { id:string; actionId:string; status:"queued"|"running"|"succeeded"|"failed"; executedAt?:string; authoritativeRefreshRequired:boolean; evidence?:EvidenceRef[]; }
export interface MaataaRenderable { id:string; component:string; version:string; state?:InteractionState; props:unknown; }
