import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type DataCleanerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function DataCleaner(props:DataCleanerProps) { return <ToolSurface toolId="TOOL.DATA_CLEANER" name="Data Cleaner" {...props} />; }
