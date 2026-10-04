import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ScrollToolProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ScrollTool(props:ScrollToolProps) { return <ToolSurface toolId="TOOL.SCROLL_TOOL" name="Scroll Tool" {...props} />; }
