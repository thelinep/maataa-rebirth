import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type LayoutBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function LayoutBuilder(props:LayoutBuilderProps) { return <ToolSurface toolId="TOOL.LAYOUT_BUILDER" name="Layout Builder" {...props} />; }
