import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ToolDefinitionGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ToolDefinitionGenerator(props:ToolDefinitionGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.TOOL_DEFINITION_GENERATOR" name="Tool Definition Generator" {...props} />; }
