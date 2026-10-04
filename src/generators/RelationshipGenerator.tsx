import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type RelationshipGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function RelationshipGenerator(props:RelationshipGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.RELATIONSHIP_GENERATOR" name="Relationship Generator" {...props} />; }
