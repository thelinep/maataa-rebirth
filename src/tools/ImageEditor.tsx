import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ImageEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ImageEditor(props:ImageEditorProps) { return <ToolSurface toolId="TOOL.IMAGE_EDITOR" name="Image Editor" {...props} />; }
