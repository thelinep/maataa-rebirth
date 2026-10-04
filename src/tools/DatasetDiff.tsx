import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type DatasetDiffProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function DatasetDiff(props:DatasetDiffProps) { return <ToolSurface toolId="TOOL.DATASET_DIFF" name="Dataset Diff" {...props} />; }
