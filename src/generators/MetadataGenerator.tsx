import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type MetadataGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function MetadataGenerator(props:MetadataGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.METADATA_GENERATOR" name="Metadata Generator" {...props} />; }
