import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type EntityGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function EntityGenerator(props:EntityGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.ENTITY_GENERATOR" name="Entity Generator" {...props} />; }
