import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AutomationBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AutomationBuilder(props:AutomationBuilderProps) { return <ToolSurface toolId="TOOL.AUTOMATION_BUILDER" name="Automation Builder" {...props} />; }
