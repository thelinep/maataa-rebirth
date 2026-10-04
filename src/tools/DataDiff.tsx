import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type DataDiffProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function DataDiff(props:DataDiffProps) { return <ToolSurface toolId="TOOL.DATA_DIFF" name="Data Diff" {...props} />; }
