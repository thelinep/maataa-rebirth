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

const aiComponentIds = new Set(["maataa.ai.context-panel", "maataa.ai.context-freshness", "maataa.ai.recommendation-card", "maataa.ai.alternative-card", "maataa.ai.risk-card", "maataa.ai.confidence-indicator", "maataa.ai.agent-plan", "maataa.ai.agent-step", "maataa.ai.tool-activity", "maataa.ai.agent-error", "maataa.ai.agent-cancel", "maataa.ai.source-reference", "maataa.ai.uncertainty", "maataa.ai.explanation", "maataa.ai.prompt-editor", "maataa.ai.prompt-history", "maataa.ai.model-selector", "maataa.ai.usage-meter", "maataa.ai.streaming-status"]);
export function createHeadlessComponent(componentId, props={}) { if(!aiComponentIds.has(componentId)) throw new Error(`UNKNOWN_AI_COMPONENT:${componentId}`); return Object.freeze({kind:"maataa.headless",componentId,props:Object.freeze({...props})}); }
