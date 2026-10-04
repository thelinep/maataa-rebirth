import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ComponentDocsGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ComponentDocsGenerator(props:ComponentDocsGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.COMPONENT_DOCS_GENERATOR" name="Component Docs Generator" {...props} />; }
