import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type RAGPlaygroundProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function RAGPlayground(props:RAGPlaygroundProps) { return <ToolSurface toolId="TOOL.RAG_PLAYGROUND" name="RAG Playground" {...props} />; }
