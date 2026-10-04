import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type NavigationBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function NavigationBuilder(props:NavigationBuilderProps) { return <ToolSurface toolId="TOOL.NAVIGATION_BUILDER" name="Navigation Builder" {...props} />; }
