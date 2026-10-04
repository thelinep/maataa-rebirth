import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type RerankerToolProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function RerankerTool(props:RerankerToolProps) { return <ToolSurface toolId="TOOL.RERANKER_TOOL" name="Reranker Tool" {...props} />; }
