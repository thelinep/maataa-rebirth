import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type DevicePreviewerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function DevicePreviewer(props:DevicePreviewerProps) { return <ToolSurface toolId="TOOL.DEVICE_PREVIEWER" name="Device Previewer" {...props} />; }
