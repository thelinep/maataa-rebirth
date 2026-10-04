import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type RAGTraceProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function RAGTrace(props:RAGTraceProps) { return <ToolSurface toolId="TOOL.RAG_TRACE" name="RAG Trace" {...props} />; }
