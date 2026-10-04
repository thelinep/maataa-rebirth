import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AIWorkflowBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AIWorkflowBuilder(props:AIWorkflowBuilderProps) { return <ToolSurface toolId="TOOL.AI_WORKFLOW_BUILDER" name="AI Workflow Builder" {...props} />; }
