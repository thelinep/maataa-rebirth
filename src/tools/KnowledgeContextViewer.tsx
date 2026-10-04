import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type KnowledgeContextViewerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function KnowledgeContextViewer(props:KnowledgeContextViewerProps) { return <ToolSurface toolId="TOOL.KNOWLEDGE_CONTEXT_VIEWER" name="Knowledge Context Viewer" {...props} />; }
