import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type KnowledgeGraphExplorerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function KnowledgeGraphExplorer(props:KnowledgeGraphExplorerProps) { return <ToolSurface toolId="TOOL.KNOWLEDGE_GRAPH_EXPLORER" name="Knowledge Graph Explorer" {...props} />; }
