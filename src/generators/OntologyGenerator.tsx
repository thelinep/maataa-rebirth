import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type OntologyGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function OntologyGenerator(props:OntologyGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.ONTOLOGY_GENERATOR" name="Ontology Generator" {...props} />; }
