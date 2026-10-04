import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type GlossaryGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function GlossaryGenerator(props:GlossaryGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.GLOSSARY_GENERATOR" name="Glossary Generator" {...props} />; }
