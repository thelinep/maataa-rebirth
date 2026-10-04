import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AIPolicyEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AIPolicyEditor(props:AIPolicyEditorProps) { return <ToolSurface toolId="TOOL.AI_POLICY_EDITOR" name="AI Policy Editor" {...props} />; }
