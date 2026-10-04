import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type PresentationGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function PresentationGenerator(props:PresentationGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.PRESENTATION_GENERATOR" name="Presentation Generator" {...props} />; }
