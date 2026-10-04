import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type MockDataToolProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function MockDataTool(props:MockDataToolProps) { return <ToolSurface toolId="TOOL.MOCK_DATA_TOOL" name="Mock Data Tool" {...props} />; }
