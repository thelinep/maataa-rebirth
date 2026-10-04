import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type RAGPipelineBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function RAGPipelineBuilder(props:RAGPipelineBuilderProps) { return <ToolSurface toolId="TOOL.RAG_PIPELINE_BUILDER" name="RAG Pipeline Builder" {...props} />; }
