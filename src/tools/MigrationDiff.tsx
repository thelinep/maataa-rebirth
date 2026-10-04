import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type MigrationDiffProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function MigrationDiff(props:MigrationDiffProps) { return <ToolSurface toolId="TOOL.MIGRATION_DIFF" name="Migration Diff" {...props} />; }
