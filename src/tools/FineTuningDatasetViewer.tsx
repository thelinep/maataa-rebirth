import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type FineTuningDatasetViewerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function FineTuningDatasetViewer(props:FineTuningDatasetViewerProps) { return <ToolSurface toolId="TOOL.FINE_TUNING_DATASET_VIEWER" name="Fine-Tuning Dataset Viewer" {...props} />; }
