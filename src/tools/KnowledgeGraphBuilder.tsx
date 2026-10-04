import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type KnowledgeGraphBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function KnowledgeGraphBuilder(props:KnowledgeGraphBuilderProps) { return <ToolSurface toolId="TOOL.KNOWLEDGE_GRAPH_BUILDER" name="Knowledge Graph Builder" {...props} />; }
