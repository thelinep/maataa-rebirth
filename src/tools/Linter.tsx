import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type LinterProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function Linter(props:LinterProps) { return <ToolSurface toolId="TOOL.LINTER" name="Linter" {...props} />; }
