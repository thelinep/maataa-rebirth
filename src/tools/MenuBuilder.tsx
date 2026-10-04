import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type MenuBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function MenuBuilder(props:MenuBuilderProps) { return <ToolSurface toolId="TOOL.MENU_BUILDER" name="Menu Builder" {...props} />; }
