import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type KnowledgeNodeProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function KnowledgeNode(props:KnowledgeNodeProps) { return <ToolSurface toolId="TOOL.KNOWLEDGE_NODE" name="Knowledge Node" {...props} />; }
