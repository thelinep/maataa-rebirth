import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type DataQualityCheckerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function DataQualityChecker(props:DataQualityCheckerProps) { return <ToolSurface toolId="TOOL.DATA_QUALITY_CHECKER" name="Data Quality Checker" {...props} />; }
