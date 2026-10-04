import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ServiceGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ServiceGenerator(props:ServiceGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.SERVICE_GENERATOR" name="Service Generator" {...props} />; }
