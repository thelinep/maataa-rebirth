import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type QueryGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function QueryGenerator(props:QueryGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.QUERY_GENERATOR" name="Query Generator" {...props} />; }
