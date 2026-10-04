import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type NavigationToolProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function NavigationTool(props:NavigationToolProps) { return <ToolSurface toolId="TOOL.NAVIGATION_TOOL" name="Navigation Tool" {...props} />; }
