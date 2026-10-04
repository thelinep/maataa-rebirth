import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type KnowledgeGraphGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function KnowledgeGraphGenerator(props:KnowledgeGraphGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.KNOWLEDGE_GRAPH_GENERATOR" name="Knowledge Graph Generator" {...props} />; }
