import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type RAGEvalProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function RAGEval(props:RAGEvalProps) { return <ToolSurface toolId="TOOL.RAG_EVAL" name="RAG Eval" {...props} />; }
