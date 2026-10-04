import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type CheckpointBrowserProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function CheckpointBrowser(props:CheckpointBrowserProps) { return <ToolSurface toolId="TOOL.CHECKPOINT_BROWSER" name="Checkpoint Browser" {...props} />; }
