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
