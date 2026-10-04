import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type FineTuningDatasetBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function FineTuningDatasetBuilder(props:FineTuningDatasetBuilderProps) { return <ToolSurface toolId="TOOL.FINE_TUNING_DATASET_BUILDER" name="Fine-Tuning Dataset Builder" {...props} />; }
