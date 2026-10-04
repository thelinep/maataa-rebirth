import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ColorPickerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ColorPicker(props:ColorPickerProps) { return <ToolSurface toolId="TOOL.COLOR_PICKER" name="Color Picker" {...props} />; }
