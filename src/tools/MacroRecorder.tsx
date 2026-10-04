import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type MacroRecorderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function MacroRecorder(props:MacroRecorderProps) { return <ToolSurface toolId="TOOL.MACRO_RECORDER" name="Macro Recorder" {...props} />; }
