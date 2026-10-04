import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ObjectGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ObjectGenerator(props:ObjectGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.OBJECT_GENERATOR" name="Object Generator" {...props} />; }
