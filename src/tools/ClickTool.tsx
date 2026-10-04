import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ClickToolProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ClickTool(props:ClickToolProps) { return <ToolSurface toolId="TOOL.CLICK_TOOL" name="Click Tool" {...props} />; }
