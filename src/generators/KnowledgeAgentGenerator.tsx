import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type KnowledgeAgentGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function KnowledgeAgentGenerator(props:KnowledgeAgentGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.KNOWLEDGE_AGENT_GENERATOR" name="Knowledge Agent Generator" {...props} />; }
