import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type TaxonomyGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function TaxonomyGenerator(props:TaxonomyGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.TAXONOMY_GENERATOR" name="Taxonomy Generator" {...props} />; }
