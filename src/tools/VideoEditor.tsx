import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type VideoEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function VideoEditor(props:VideoEditorProps) { return <ToolSurface toolId="TOOL.VIDEO_EDITOR" name="Video Editor" {...props} />; }
