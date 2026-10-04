import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type IssueManagerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function IssueManager(props:IssueManagerProps) { return <ToolSurface toolId="TOOL.ISSUE_MANAGER" name="Issue Manager" {...props} />; }
