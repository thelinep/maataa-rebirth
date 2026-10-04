import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type SQLGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function SQLGenerator(props:SQLGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.SQL_GENERATOR" name="SQL Generator" {...props} />; }
