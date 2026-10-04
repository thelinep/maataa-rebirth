import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type EmbeddingDatasetGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function EmbeddingDatasetGenerator(props:EmbeddingDatasetGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.EMBEDDING_DATASET_GENERATOR" name="Embedding Dataset Generator" {...props} />; }
