import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ArchitectureDocGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ArchitectureDocGenerator(props:ArchitectureDocGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.ARCHITECTURE_DOC_GENERATOR" name="Architecture Doc Generator" {...props} />; }
