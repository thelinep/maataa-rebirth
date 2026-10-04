import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ActionReplayProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ActionReplay(props:ActionReplayProps) { return <ToolSurface toolId="TOOL.ACTION_REPLAY" name="Action Replay" {...props} />; }
