import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type RetryPolicyEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function RetryPolicyEditor(props:RetryPolicyEditorProps) { return <ToolSurface toolId="TOOL.RETRY_POLICY_EDITOR" name="Retry Policy Editor" {...props} />; }
