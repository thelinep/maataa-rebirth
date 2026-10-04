import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type KnowledgeBaseGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function KnowledgeBaseGenerator(props:KnowledgeBaseGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.KNOWLEDGE_BASE_GENERATOR" name="Knowledge Base Generator" {...props} />; }
