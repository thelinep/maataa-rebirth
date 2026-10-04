import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ContextSourceSelectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ContextSourceSelector(props:ContextSourceSelectorProps) { return <ToolSurface toolId="TOOL.CONTEXT_SOURCE_SELECTOR" name="Context Source Selector" {...props} />; }
