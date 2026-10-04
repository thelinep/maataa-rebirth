import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ComponentGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ComponentGenerator(props:ComponentGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.COMPONENT_GENERATOR" name="Component Generator" {...props} />; }
