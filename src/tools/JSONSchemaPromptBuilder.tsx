import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type JSONSchemaPromptBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function JSONSchemaPromptBuilder(props:JSONSchemaPromptBuilderProps) { return <ToolSurface toolId="TOOL.JSON_SCHEMA_PROMPT_BUILDER" name="JSON Schema Prompt Builder" {...props} />; }
