export function recommendationViewModel(recommendation, context={}) {
  return Object.freeze({
    id: recommendation.id,
    summary: recommendation.summary,
    rationaleSummary: recommendation.rationaleSummary ?? null,
    confidence: recommendation.confidence ?? null,
    evidenceIds: recommendation.evidenceIds ?? [],
    contextFreshness: context.freshness ?? "unknown",
    authorityClass: "advisory"
  });
}
export function agentStep({id,label,status="pending",tool=null,error=null}) {
  return Object.freeze({id,label,status,tool,error});
}
export function usageSnapshot({model="unknown",latencyMs=0,inputTokens=0,outputTokens=0,cost=null}) {
  return Object.freeze({model,latencyMs,inputTokens,outputTokens,cost});
}
