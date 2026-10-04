import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type APIDocsGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function APIDocsGenerator(props:APIDocsGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.API_DOCS_GENERATOR" name="API Docs Generator" {...props} />; }
