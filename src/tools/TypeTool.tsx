import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type TypeToolProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function TypeTool(props:TypeToolProps) { return <ToolSurface toolId="TOOL.TYPE_TOOL" name="Type Tool" {...props} />; }
