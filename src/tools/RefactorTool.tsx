import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type RefactorToolProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function RefactorTool(props:RefactorToolProps) { return <ToolSurface toolId="TOOL.REFACTOR_TOOL" name="Refactor Tool" {...props} />; }
