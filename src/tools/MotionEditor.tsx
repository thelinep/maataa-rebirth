import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type MotionEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function MotionEditor(props:MotionEditorProps) { return <ToolSurface toolId="TOOL.MOTION_EDITOR" name="Motion Editor" {...props} />; }
