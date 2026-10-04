import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type FixtureManagerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function FixtureManager(props:FixtureManagerProps) { return <ToolSurface toolId="TOOL.FIXTURE_MANAGER" name="Fixture Manager" {...props} />; }
