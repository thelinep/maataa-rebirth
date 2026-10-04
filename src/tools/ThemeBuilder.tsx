import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ThemeBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ThemeBuilder(props:ThemeBuilderProps) { return <ToolSurface toolId="TOOL.THEME_BUILDER" name="Theme Builder" {...props} />; }
