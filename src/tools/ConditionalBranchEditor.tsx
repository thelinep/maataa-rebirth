import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ConditionalBranchEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ConditionalBranchEditor(props:ConditionalBranchEditorProps) { return <ToolSurface toolId="TOOL.CONDITIONAL_BRANCH_EDITOR" name="Conditional Branch Editor" {...props} />; }
