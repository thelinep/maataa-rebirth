import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type FineTuningManagerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function FineTuningManager(props:FineTuningManagerProps) { return <ToolSurface toolId="TOOL.FINE_TUNING_MANAGER" name="Fine-Tuning Manager" {...props} />; }
