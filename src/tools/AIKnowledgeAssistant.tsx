import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AIKnowledgeAssistantProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AIKnowledgeAssistant(props:AIKnowledgeAssistantProps) { return <ToolSurface toolId="TOOL.AI_KNOWLEDGE_ASSISTANT" name="AI Knowledge Assistant" {...props} />; }
