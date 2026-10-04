import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type DataClassificationToolProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function DataClassificationTool(props:DataClassificationToolProps) { return <ToolSurface toolId="TOOL.DATA_CLASSIFICATION_TOOL" name="Data Classification Tool" {...props} />; }
