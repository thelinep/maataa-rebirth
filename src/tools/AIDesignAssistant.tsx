import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AIDesignAssistantProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AIDesignAssistant(props:AIDesignAssistantProps) { return <ToolSurface toolId="TOOL.AI_DESIGN_ASSISTANT" name="AI Design Assistant" {...props} />; }
