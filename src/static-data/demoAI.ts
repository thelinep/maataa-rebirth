import type { AIAgent, AIModel, AIEvaluation, AIMessage } from "../types/ai";
export const DEMO_MODELS: readonly AIModel[] = [
{id:"model-fast",provider:"Demo Provider",name:"Fast General Model",capabilities:["text","structured-output","tools"],contextWindow:128000,status:"demo"},
{id:"model-reason",provider:"Demo Provider",name:"Reasoning Model",capabilities:["reasoning","text","tools","vision"],contextWindow:256000,status:"demo"},
{id:"model-vision",provider:"Demo Provider",name:"Multimodal Model",capabilities:["vision","text","structured-output"],contextWindow:128000,status:"demo"}
] as const;
export const DEMO_AGENTS: readonly AIAgent[] = [
{id:"agent-brahmini",name:"Brahmini Orchestrator",description:"Coordinates demo context across MAATAA registries and workspaces.",identityId:"IDENTITY.BRAHMINI",modelId:"model-reason",toolIds:["TOOL.AI_PLANNER","TOOL.CONTEXT_BUILDER"] as any,knowledgeSourceIds:["knowledge-ui","knowledge-registry"],status:"ready"},
{id:"agent-evidence",name:"Gautama Evidence Guardian",description:"Checks claims against declared evidence and provenance.",identityId:"IDENTITY.SAPTARISHI.GAUTAMA",modelId:"model-reason",toolIds:["TOOL.AI_SEARCH","TOOL.GROUNDING_INSPECTOR"] as any,knowledgeSourceIds:["knowledge-ui","knowledge-registry"],status:"ready"},
{id:"agent-ui",name:"Shiv UI Architect",description:"Composes registered layouts, pages and workspaces.",identityId:"IDENTITY.SHIV",modelId:"model-reason",toolIds:["TOOL.COMPONENT_EXPLORER","TOOL.LAYOUT_BUILDER"] as any,knowledgeSourceIds:["knowledge-ui"],status:"ready"},
{id:"agent-experience",name:"Parvati Experience Steward",description:"Reviews UX, composition quality and hospitality-oriented surfaces.",identityId:"IDENTITY.PARVATI",modelId:"model-vision",toolIds:["TOOL.AI_DESIGN_ASSISTANT","TOOL.ACCESSIBILITY_INSPECTOR"] as any,knowledgeSourceIds:["knowledge-ui","knowledge-nevo"],status:"ready"},
{id:"agent-innovation",name:"Vishvamitra Innovation Guide",description:"Explores new registered generators, tools and experimental capabilities.",identityId:"IDENTITY.SAPTARISHI.VISHVAMITRA",modelId:"model-fast",toolIds:["TOOL.AI_RESEARCH_TOOL","TOOL.COMPONENT_PLAYGROUND"] as any,knowledgeSourceIds:["knowledge-registry"],status:"ready"},
{id:"agent-event",name:"Kashyapa NEVO Ecosystem Copilot",description:"Demo event ecosystem and vendor planning assistant.",identityId:"IDENTITY.SAPTARISHI.KASHYAPA",modelId:"model-fast",toolIds:[] as any,knowledgeSourceIds:["knowledge-nevo"],status:"ready"}
] as const;
export const DEMO_EVALUATIONS: readonly AIEvaluation[] = [
{id:"eval-01",name:"Factual support",score:0.94,severity:"success",metric:"grounded_claim_rate",evidence:["evidence-101","evidence-102"]},
{id:"eval-02",name:"Unsupported claims",score:0.03,severity:"warning",metric:"unsupported_claim_rate",evidence:["evidence-103"]},
{id:"eval-03",name:"Citation correctness",score:0.97,severity:"success",metric:"citation_precision",evidence:["evidence-104"]},
{id:"eval-04",name:"Tool execution quality",score:0.91,severity:"success",metric:"tool_success_rate",evidence:["trace-demo-001"]}
] as const;
export const DEMO_AI_MESSAGES: readonly AIMessage[] = [
{id:"msg-01",role:"system",content:"Demo mode: use static MAATAA evidence only.",createdAt:"2026-10-04T08:00:00+05:30"},
{id:"msg-02",role:"user",content:"Show the current demo workspace composition.",createdAt:"2026-10-04T08:01:00+05:30"},
{id:"msg-03",role:"assistant",content:"The active demo uses a registered workspace, page, layout and device profile. No live backend is required.",createdAt:"2026-10-04T08:01:02+05:30",citations:["REGISTRY.UI_STRUCTURE.WORKSPACE","REGISTRY.UI_STRUCTURE.PAGE","REGISTRY.UI_STRUCTURE.LAYOUT"]}
] as const;
