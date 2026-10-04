import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type WorkflowRecorderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function WorkflowRecorder(props:WorkflowRecorderProps) { return <ToolSurface toolId="TOOL.WORKFLOW_RECORDER" name="Workflow Recorder" {...props} />; }
