import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type WorkflowBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function WorkflowBuilder(props:WorkflowBuilderProps) { return <ToolSurface toolId="TOOL.WORKFLOW_BUILDER" name="Workflow Builder" {...props} />; }
