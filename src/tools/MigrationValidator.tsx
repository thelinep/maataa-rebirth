import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type MigrationValidatorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function MigrationValidator(props:MigrationValidatorProps) { return <ToolSurface toolId="TOOL.MIGRATION_VALIDATOR" name="Migration Validator" {...props} />; }
