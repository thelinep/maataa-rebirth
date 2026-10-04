import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type DatasetGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function DatasetGenerator(props:DatasetGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.DATASET_GENERATOR" name="Dataset Generator" {...props} />; }
