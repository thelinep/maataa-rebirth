import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type FAQGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function FAQGenerator(props:FAQGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.FAQ_GENERATOR" name="FAQ Generator" {...props} />; }
