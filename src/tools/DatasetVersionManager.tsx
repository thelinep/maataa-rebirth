import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type DatasetVersionManagerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function DatasetVersionManager(props:DatasetVersionManagerProps) { return <ToolSurface toolId="TOOL.DATASET_VERSION_MANAGER" name="Dataset Version Manager" {...props} />; }
