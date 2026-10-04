import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type SBOMGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function SBOMGenerator(props:SBOMGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.SBOM_GENERATOR" name="SBOM Generator" {...props} />; }
