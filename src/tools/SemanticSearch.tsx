import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type SemanticSearchProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function SemanticSearch(props:SemanticSearchProps) { return <ToolSurface toolId="TOOL.SEMANTIC_SEARCH" name="Semantic Search" {...props} />; }
