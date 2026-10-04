import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type RAGPipelineGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function RAGPipelineGenerator(props:RAGPipelineGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.RAG_PIPELINE_GENERATOR" name="RAG Pipeline Generator" {...props} />; }
