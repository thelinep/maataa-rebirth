import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type DatasetSplitterProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function DatasetSplitter(props:DatasetSplitterProps) { return <ToolSurface toolId="TOOL.DATASET_SPLITTER" name="Dataset Splitter" {...props} />; }
