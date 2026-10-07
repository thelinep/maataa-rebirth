export const policyOutcomes = Object.freeze(["allow","deny","allow_with_approval","allow_with_constraints"]);
export function canDispatch({policyDecision,approvals=[]}) {
  if (!policyDecision || policyDecision.outcome==="deny") return false;
  if (policyDecision.outcome==="allow_with_approval") {
    const approved=new Set(approvals.filter(a=>a.status==="approved").map(a=>a.id));
    return (policyDecision.requiredApprovalIds ?? []).every(id=>approved.has(id));
  }
  return true;
}
export function evidenceReceipt({actionId,evidenceIds=[],verified=false}) {
  return Object.freeze({actionId,evidenceIds:[...evidenceIds],verified,createdAt:new Date().toISOString()});
}

const governanceComponentIds = new Set(["maataa.governance.proposal-diff", "maataa.governance.policy-status", "maataa.governance.approval-gate", "maataa.governance.approval-decision", "maataa.governance.evidence-viewer", "maataa.governance.provenance-trail", "maataa.governance.audit-trail", "maataa.governance.execution-receipt", "maataa.governance.authoritative-state", "maataa.governance.stale-state-warning", "maataa.governance.conflict-state"]);
export function createHeadlessComponent(componentId, props={}) { if(!governanceComponentIds.has(componentId)) throw new Error(`UNKNOWN_GOVERNANCE_COMPONENT:${componentId}`); return Object.freeze({kind:"maataa.headless",componentId,props:Object.freeze({...props})}); }
