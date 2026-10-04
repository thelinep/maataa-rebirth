import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type PageBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function PageBuilder(props:PageBuilderProps) { return <ToolSurface toolId="TOOL.PAGE_BUILDER" name="Page Builder" {...props} />; }
