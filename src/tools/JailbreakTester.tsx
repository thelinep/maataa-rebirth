import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type JailbreakTesterProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function JailbreakTester(props:JailbreakTesterProps) { return <ToolSurface toolId="TOOL.JAILBREAK_TESTER" name="Jailbreak Tester" {...props} />; }
