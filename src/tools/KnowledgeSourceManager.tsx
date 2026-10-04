import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type KnowledgeSourceManagerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function KnowledgeSourceManager(props:KnowledgeSourceManagerProps) { return <ToolSurface toolId="TOOL.KNOWLEDGE_SOURCE_MANAGER" name="Knowledge Source Manager" {...props} />; }
