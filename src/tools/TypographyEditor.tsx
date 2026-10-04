import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type TypographyEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function TypographyEditor(props:TypographyEditorProps) { return <ToolSurface toolId="TOOL.TYPOGRAPHY_EDITOR" name="Typography Editor" {...props} />; }
