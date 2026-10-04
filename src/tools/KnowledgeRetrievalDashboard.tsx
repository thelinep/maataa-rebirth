import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type KnowledgeRetrievalDashboardProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function KnowledgeRetrievalDashboard(props:KnowledgeRetrievalDashboardProps) { return <ToolSurface toolId="TOOL.KNOWLEDGE_RETRIEVAL_DASHBOARD" name="Knowledge Retrieval Dashboard" {...props} />; }
