import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type AgentGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function AgentGenerator(props:AgentGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.AGENT_GENERATOR" name="Agent Generator" {...props} />; }
