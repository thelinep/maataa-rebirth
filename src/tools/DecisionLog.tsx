import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type DecisionLogProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function DecisionLog(props:DecisionLogProps) { return <ToolSurface toolId="TOOL.DECISION_LOG" name="Decision Log" {...props} />; }
