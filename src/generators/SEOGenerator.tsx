import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type SEOGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function SEOGenerator(props:SEOGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.SEO_GENERATOR" name="SEO Generator" {...props} />; }
