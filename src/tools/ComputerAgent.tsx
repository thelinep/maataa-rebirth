import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ComputerAgentProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ComputerAgent(props:ComputerAgentProps) { return <ToolSurface toolId="TOOL.COMPUTER_AGENT" name="Computer Agent" {...props} />; }
