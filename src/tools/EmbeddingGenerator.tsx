import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type EmbeddingGeneratorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function EmbeddingGenerator(props:EmbeddingGeneratorProps) { return <ToolSurface toolId="TOOL.EMBEDDING_GENERATOR" name="Embedding Generator" {...props} />; }
