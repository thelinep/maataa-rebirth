import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type IndexBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function IndexBuilder(props:IndexBuilderProps) { return <ToolSurface toolId="TOOL.INDEX_BUILDER" name="Index Builder" {...props} />; }
