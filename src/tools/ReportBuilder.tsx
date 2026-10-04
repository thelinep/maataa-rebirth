import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ReportBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ReportBuilder(props:ReportBuilderProps) { return <ToolSurface toolId="TOOL.REPORT_BUILDER" name="Report Builder" {...props} />; }
