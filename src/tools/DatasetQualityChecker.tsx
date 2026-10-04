import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type DatasetQualityCheckerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function DatasetQualityChecker(props:DatasetQualityCheckerProps) { return <ToolSurface toolId="TOOL.DATASET_QUALITY_CHECKER" name="Dataset Quality Checker" {...props} />; }
