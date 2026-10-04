import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type DatasetLabelerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function DatasetLabeler(props:DatasetLabelerProps) { return <ToolSurface toolId="TOOL.DATASET_LABELER" name="Dataset Labeler" {...props} />; }
