import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type PromptGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function PromptGenerator(props:PromptGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.PROMPT_GENERATOR" name="Prompt Generator" {...props} />; }
