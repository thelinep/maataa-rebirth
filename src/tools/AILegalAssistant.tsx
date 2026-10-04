import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AILegalAssistantProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AILegalAssistant(props:AILegalAssistantProps) { return <ToolSurface toolId="TOOL.AI_LEGAL_ASSISTANT" name="AI Legal Assistant" {...props} />; }
