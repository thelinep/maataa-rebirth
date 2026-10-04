import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type MigrationPlannerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function MigrationPlanner(props:MigrationPlannerProps) { return <ToolSurface toolId="TOOL.MIGRATION_PLANNER" name="Migration Planner" {...props} />; }
