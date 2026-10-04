import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type SystemPromptGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function SystemPromptGenerator(props:SystemPromptGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.SYSTEM_PROMPT_GENERATOR" name="System Prompt Generator" {...props} />; }
