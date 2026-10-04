import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type JudgeModelEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function JudgeModelEditor(props:JudgeModelEditorProps) { return <ToolSurface toolId="TOOL.JUDGE_MODEL_EDITOR" name="Judge Model Editor" {...props} />; }
