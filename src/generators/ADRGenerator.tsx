import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ADRGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ADRGenerator(props:ADRGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.ADR_GENERATOR" name="ADR Generator" {...props} />; }
