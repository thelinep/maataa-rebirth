import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ETLToolProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ETLTool(props:ETLToolProps) { return <ToolSurface toolId="TOOL.ETL_TOOL" name="ETL Tool" {...props} />; }
