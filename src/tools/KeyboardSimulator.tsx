import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type KeyboardSimulatorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function KeyboardSimulator(props:KeyboardSimulatorProps) { return <ToolSurface toolId="TOOL.KEYBOARD_SIMULATOR" name="Keyboard Simulator" {...props} />; }
