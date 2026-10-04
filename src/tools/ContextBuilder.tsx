import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ContextBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ContextBuilder(props:ContextBuilderProps) { return <ToolSurface toolId="TOOL.CONTEXT_BUILDER" name="Context Builder" {...props} />; }
