import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type HumanInTheLoopEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function HumanInTheLoopEditor(props:HumanInTheLoopEditorProps) { return <ToolSurface toolId="TOOL.HUMAN_IN_THE_LOOP_EDITOR" name="Human-in-the-Loop Editor" {...props} />; }
