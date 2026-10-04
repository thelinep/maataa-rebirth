import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type QuoteGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function QuoteGenerator(props:QuoteGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.QUOTE_GENERATOR" name="Quote Generator" {...props} />; }
