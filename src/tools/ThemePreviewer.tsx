import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ThemePreviewerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ThemePreviewer(props:ThemePreviewerProps) { return <ToolSurface toolId="TOOL.THEME_PREVIEWER" name="Theme Previewer" {...props} />; }
