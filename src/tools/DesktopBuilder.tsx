import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type DesktopBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function DesktopBuilder(props:DesktopBuilderProps) { return <ToolSurface toolId="TOOL.DESKTOP_BUILDER" name="Desktop Builder" {...props} />; }
