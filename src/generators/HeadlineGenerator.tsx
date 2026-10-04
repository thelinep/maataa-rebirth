import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type HeadlineGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function HeadlineGenerator(props:HeadlineGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.HEADLINE_GENERATOR" name="Headline Generator" {...props} />; }
