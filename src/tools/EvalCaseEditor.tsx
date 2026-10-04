import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type EvalCaseEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function EvalCaseEditor(props:EvalCaseEditorProps) { return <ToolSurface toolId="TOOL.EVAL_CASE_EDITOR" name="Eval Case Editor" {...props} />; }
