import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ThemeEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ThemeEditor(props:ThemeEditorProps) { return <ToolSurface toolId="TOOL.THEME_EDITOR" name="Theme Editor" {...props} />; }
