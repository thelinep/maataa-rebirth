import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type DataMappingGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function DataMappingGenerator(props:DataMappingGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.DATA_MAPPING_GENERATOR" name="Data Mapping Generator" {...props} />; }
