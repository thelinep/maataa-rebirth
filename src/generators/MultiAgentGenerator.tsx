import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type MultiAgentGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function MultiAgentGenerator(props:MultiAgentGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.MULTI_AGENT_GENERATOR" name="Multi-Agent Generator" {...props} />; }
