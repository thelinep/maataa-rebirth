import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type EmbeddingExplorerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function EmbeddingExplorer(props:EmbeddingExplorerProps) { return <ToolSurface toolId="TOOL.EMBEDDING_EXPLORER" name="Embedding Explorer" {...props} />; }
