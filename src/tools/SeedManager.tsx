import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type SeedManagerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function SeedManager(props:SeedManagerProps) { return <ToolSurface toolId="TOOL.SEED_MANAGER" name="Seed Manager" {...props} />; }
