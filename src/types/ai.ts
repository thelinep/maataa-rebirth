import type { AISpaceId, ToolId } from "./identifiers";
import type { AsyncStatus, Severity } from "./common";
import type { DemoIdentityId } from "../identity/types";
export type AIMessageRole = "system" | "user" | "assistant" | "tool";
export interface AIMessage { id: string; role: AIMessageRole; content: string; createdAt: string; citations?: readonly string[]; toolId?: ToolId; status?: AsyncStatus; }
export interface AIAgent { id: string; name: string; description: string; modelId: string; toolIds: readonly ToolId[]; knowledgeSourceIds: readonly string[]; identityId?: DemoIdentityId; status: "ready" | "running" | "paused" | "error"; }
export interface AIModel { id: string; provider: string; name: string; capabilities: readonly string[]; contextWindow: number; status: "available" | "unavailable" | "demo"; }
export interface AIEvaluation { id: string; name: string; score: number; severity: Severity; metric: string; evidence: readonly string[]; }
export interface AISpaceSelection { spaceId: AISpaceId; agentId?: string; modelId?: string; }
